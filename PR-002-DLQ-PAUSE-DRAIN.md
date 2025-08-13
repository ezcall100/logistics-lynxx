# PR-002: Dead Letter Queue & Pause/Drain Controls
## Error Handling & Operational Controls for Autonomous TMS

### 🎯 **Goal**
Add formalized error handling with auto-snooze/backoff policies and tenant-scoped pause/drain controls for operational safety.

### 📋 **Files to Create/Modify**

#### **1. Database Migration - Dead Letter Queue**
```sql
-- supabase/migrations/20241201_003_dead_letter_queue.sql
CREATE TABLE IF NOT EXISTS public.dead_letter_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_task_id UUID REFERENCES public.agent_tasks(id),
  company_id UUID NOT NULL,
  agent_name TEXT NOT NULL,
  error_type TEXT NOT NULL, -- 'timeout', 'validation', 'external_api', 'quota_exceeded', 'rate_limit'
  error_message TEXT,
  error_code TEXT,
  retry_after TIMESTAMPTZ,
  snooze_until TIMESTAMPTZ,
  backoff_multiplier INTEGER DEFAULT 1,
  max_retries INTEGER DEFAULT 5,
  retry_count INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 5, -- 1=high, 5=normal, 10=low
  slack_reason_code TEXT, -- For operational notifications
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_dlq_retryable 
ON public.dead_letter_queue (retry_after, company_id, priority) 
WHERE retry_after <= NOW() AND retry_count < max_retries;

CREATE INDEX IF NOT EXISTS idx_dlq_by_company 
ON public.dead_letter_queue (company_id, created_at);

CREATE INDEX IF NOT EXISTS idx_dlq_by_error_type 
ON public.dead_letter_queue (error_type, created_at);

-- RLS for multi-tenant
ALTER TABLE public.dead_letter_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their company's DLQ items" ON public.dead_letter_queue
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Service role can manage all DLQ items" ON public.dead_letter_queue
  FOR ALL USING (auth.role() = 'service_role');
```

#### **2. Database Migration - Pause/Drain Controls**
```sql
-- supabase/migrations/20241201_004_pause_drain_controls.sql
CREATE TABLE IF NOT EXISTS public.agent_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE,
  agents_paused BOOLEAN DEFAULT FALSE,
  agents_drain BOOLEAN DEFAULT FALSE,
  pause_reason TEXT,
  pause_initiated_by TEXT,
  pause_initiated_at TIMESTAMPTZ,
  drain_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_agent_controls_paused 
ON public.agent_controls (agents_paused) WHERE agents_paused = TRUE;

CREATE INDEX IF NOT EXISTS idx_agent_controls_drain 
ON public.agent_controls (agents_drain) WHERE agents_drain = TRUE;

-- RLS for multi-tenant
ALTER TABLE public.agent_controls ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their company's agent controls" ON public.agent_controls
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Service role can manage all agent controls" ON public.agent_controls
  FOR ALL USING (auth.role() = 'service_role');

-- Insert default controls for existing companies
INSERT INTO public.agent_controls (company_id)
SELECT DISTINCT company_id FROM public.agent_tasks
ON CONFLICT (company_id) DO NOTHING;
```

#### **3. Dead Letter Queue Service**
```typescript
// src/lib/dead-letter-queue.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

export interface DLQItem {
  original_task_id: string;
  company_id: string;
  agent_name: string;
  error_type: 'timeout' | 'validation' | 'external_api' | 'quota_exceeded' | 'rate_limit';
  error_message: string;
  error_code?: string;
  priority?: number;
  slack_reason_code?: string;
}

export class DeadLetterQueue {
  static async quarantineTask(
    taskId: string, 
    companyId: string,
    agentName: string,
    error: Error,
    priority: number = 5
  ) {
    const errorType = this.classifyError(error);
    const backoffMinutes = Math.pow(2, 0); // Start with 1 minute
    const retryAfter = new Date(Date.now() + backoffMinutes * 60 * 1000);
    
    const { data, error: insertError } = await supabase
      .from('dead_letter_queue')
      .insert({
        original_task_id: taskId,
        company_id: companyId,
        agent_name: agentName,
        error_type: errorType,
        error_message: error.message,
        error_code: error.name,
        retry_after: retryAfter.toISOString(),
        backoff_multiplier: backoffMinutes,
        priority: priority,
        slack_reason_code: this.getSlackReasonCode(errorType)
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to quarantine task:', insertError);
      throw insertError;
    }

    // Send Slack notification for high-priority errors
    if (priority <= 3) {
      await this.sendSlackNotification(data);
    }

    return data;
  }

  static async processRetryable() {
    const { data: retryable, error } = await supabase
      .from('dead_letter_queue')
      .select('*')
      .lte('retry_after', new Date().toISOString())
      .lt('retry_count', 5)
      .order('priority', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Failed to fetch retryable items:', error);
      return;
    }

    for (const item of retryable || []) {
      try {
        await this.retryTask(item);
      } catch (retryError) {
        await this.handleRetryFailure(item, retryError);
      }
    }
  }

  private static async retryTask(item: any) {
    // Check if company is paused or draining
    const { data: controls } = await supabase
      .from('agent_controls')
      .select('agents_paused, agents_drain')
      .eq('company_id', item.company_id)
      .single();

    if (controls?.agents_paused) {
      console.log(`Skipping retry for paused company: ${item.company_id}`);
      return;
    }

    if (controls?.agents_drain) {
      console.log(`Skipping retry for draining company: ${item.company_id}`);
      return;
    }

    // Attempt to retry the original task
    const { data: originalTask } = await supabase
      .from('agent_tasks')
      .select('*')
      .eq('id', item.original_task_id)
      .single();

    if (!originalTask) {
      throw new Error('Original task not found');
    }

    // Reset task for retry
    await supabase
      .from('agent_tasks')
      .update({
        status: 'queued',
        error: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.original_task_id);

    // Increment retry count
    await supabase
      .from('dead_letter_queue')
      .update({
        retry_count: item.retry_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id);

    console.log(`Retrying task ${item.original_task_id} (attempt ${item.retry_count + 1})`);
  }

  private static async handleRetryFailure(item: any, error: Error) {
    const nextAttempt = item.retry_count + 1;
    const backoffMinutes = Math.pow(2, nextAttempt); // Exponential backoff
    const retryAfter = new Date(Date.now() + backoffMinutes * 60 * 1000);

    await supabase
      .from('dead_letter_queue')
      .update({
        retry_after: retryAfter.toISOString(),
        backoff_multiplier: backoffMinutes,
        error_message: error.message,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id);

    // Send Slack notification for repeated failures
    if (nextAttempt >= 3) {
      await this.sendSlackNotification({
        ...item,
        error_message: `Retry ${nextAttempt} failed: ${error.message}`
      });
    }
  }

  private static classifyError(error: Error): DLQItem['error_type'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'timeout';
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return 'validation';
    }
    if (message.includes('quota') || message.includes('rate limit')) {
      return 'quota_exceeded';
    }
    if (message.includes('api') || message.includes('external')) {
      return 'external_api';
    }
    
    return 'validation';
  }

  private static getSlackReasonCode(errorType: string): string {
    const codes = {
      'timeout': 'TIMEOUT',
      'validation': 'VALIDATION',
      'external_api': 'API_ERROR',
      'quota_exceeded': 'QUOTA',
      'rate_limit': 'RATE_LIMIT'
    };
    return codes[errorType] || 'UNKNOWN';
  }

  private static async sendSlackNotification(item: any) {
    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (!webhookUrl) return;

    const message = {
      text: `🚨 Agent Task Quarantined`,
      attachments: [{
        color: item.priority <= 3 ? 'danger' : 'warning',
        fields: [
          { title: 'Company ID', value: item.company_id, short: true },
          { title: 'Agent', value: item.agent_name, short: true },
          { title: 'Error Type', value: item.error_type, short: true },
          { title: 'Retry Count', value: item.retry_count.toString(), short: true },
          { title: 'Error Message', value: item.error_message, short: false },
          { title: 'Reason Code', value: item.slack_reason_code, short: true }
        ],
        footer: 'Autonomous TMS DLQ'
      }]
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
    }
  }
}
```

#### **4. Pause/Drain Controls Service**
```typescript
// src/lib/agent-controls.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

export interface AgentControls {
  company_id: string;
  agents_paused: boolean;
  agents_drain: boolean;
  pause_reason?: string;
  pause_initiated_by?: string;
}

export class AgentControls {
  static async getControls(companyId: string): Promise<AgentControls | null> {
    const { data, error } = await supabase
      .from('agent_controls')
      .select('*')
      .eq('company_id', companyId)
      .single();

    if (error) {
      console.error('Failed to get agent controls:', error);
      return null;
    }

    return data;
  }

  static async pauseAgents(
    companyId: string, 
    reason: string, 
    initiatedBy: string
  ) {
    const { data, error } = await supabase
      .from('agent_controls')
      .upsert({
        company_id: companyId,
        agents_paused: true,
        pause_reason: reason,
        pause_initiated_by: initiatedBy,
        pause_initiated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to pause agents:', error);
      throw error;
    }

    await this.sendSlackNotification({
      company_id: companyId,
      action: 'PAUSED',
      reason: reason,
      initiated_by: initiatedBy
    });

    return data;
  }

  static async resumeAgents(companyId: string, initiatedBy: string) {
    const { data, error } = await supabase
      .from('agent_controls')
      .update({
        agents_paused: false,
        pause_reason: null,
        pause_initiated_by: null,
        pause_initiated_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('company_id', companyId)
      .select()
      .single();

    if (error) {
      console.error('Failed to resume agents:', error);
      throw error;
    }

    await this.sendSlackNotification({
      company_id: companyId,
      action: 'RESUMED',
      initiated_by: initiatedBy
    });

    return data;
  }

  static async startDrain(companyId: string, initiatedBy: string) {
    const { data, error } = await supabase
      .from('agent_controls')
      .update({
        agents_drain: true,
        updated_at: new Date().toISOString()
      })
      .eq('company_id', companyId)
      .select()
      .single();

    if (error) {
      console.error('Failed to start drain:', error);
      throw error;
    }

    await this.sendSlackNotification({
      company_id: companyId,
      action: 'DRAIN_STARTED',
      initiated_by: initiatedBy
    });

    return data;
  }

  static async completeDrain(companyId: string) {
    const { data, error } = await supabase
      .from('agent_controls')
      .update({
        agents_drain: false,
        drain_completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('company_id', companyId)
      .select()
      .single();

    if (error) {
      console.error('Failed to complete drain:', error);
      throw error;
    }

    await this.sendSlackNotification({
      company_id: companyId,
      action: 'DRAIN_COMPLETED'
    });

    return data;
  }

  static async checkDrainStatus(companyId: string): Promise<boolean> {
    // Check if there are any running tasks for this company
    const { data: runningTasks, error } = await supabase
      .from('agent_tasks')
      .select('id')
      .eq('company_id', companyId)
      .eq('status', 'running')
      .limit(1);

    if (error) {
      console.error('Failed to check drain status:', error);
      return false;
    }

    const isDrained = runningTasks.length === 0;

    if (isDrained) {
      await this.completeDrain(companyId);
    }

    return isDrained;
  }

  private static async sendSlackNotification(notification: any) {
    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (!webhookUrl) return;

    const colors = {
      'PAUSED': 'warning',
      'RESUMED': 'good',
      'DRAIN_STARTED': 'warning',
      'DRAIN_COMPLETED': 'good'
    };

    const message = {
      text: `🎛️ Agent Controls: ${notification.action}`,
      attachments: [{
        color: colors[notification.action] || 'good',
        fields: [
          { title: 'Company ID', value: notification.company_id, short: true },
          { title: 'Action', value: notification.action, short: true },
          { title: 'Initiated By', value: notification.initiated_by || 'System', short: true }
        ].filter(field => field.value),
        footer: 'Autonomous TMS Controls'
      }]
    };

    if (notification.reason) {
      message.attachments[0].fields.push({
        title: 'Reason',
        value: notification.reason,
        short: false
      });
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
    }
  }
}
```

#### **5. Update Agent Runner with DLQ Integration**
```typescript
// supabase/functions/agent-runner/index.ts - Add to existing function
// ... existing code ...

// Import DLQ and controls
import { DeadLetterQueue } from '../../src/lib/dead-letter-queue.ts';
import { AgentControls } from '../../src/lib/agent-controls.ts';

// Check pause/drain controls before processing
const controls = await AgentControls.getControls(task.company_id);
if (controls?.agents_paused) {
  console.log(`Skipping task for paused company: ${task.company_id}`);
  return new Response('Company agents paused', { status: 200 });
}

if (controls?.agents_drain) {
  console.log(`Skipping task for draining company: ${task.company_id}`);
  return new Response('Company agents draining', { status: 200 });
}

// ... existing task processing code ...

// Add error handling with DLQ
try {
  // ... existing task execution ...
} catch (error) {
  console.error(`Task ${task.id} failed:`, error);
  
  // Quarantine failed task
  await DeadLetterQueue.quarantineTask(
    task.id,
    task.company_id,
    task.fn_name,
    error,
    5 // Normal priority
  );

  // Update task status
  await supabase
    .from('agent_tasks')
    .update({
      status: 'failed',
      error: error.message,
      updated_at: new Date().toISOString()
    })
    .eq('id', task.id);

  return new Response(JSON.stringify({ error: error.message }), { 
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

// ... existing code ...
```

#### **6. DLQ Processing Cron Job**
```sql
-- supabase/migrations/20241201_005_dlq_cron.sql
-- Schedule DLQ processor to run every 2 minutes
SELECT cron.schedule(
  'dlq-processor',
  '*/2 * * * *', -- Every 2 minutes
  'SELECT net.http_post(
    url := ''https://your-project.supabase.co/functions/v1/dlq-processor'',
    headers := ''{"Authorization": "Bearer " || current_setting(''app.settings.service_role_key'')}''::jsonb
  );'
);
```

#### **7. DLQ Processor Edge Function**
```typescript
// supabase/functions/dlq-processor/index.ts
import { createClient } from '@supabase/supabase-js';
import { DeadLetterQueue } from '../../src/lib/dead-letter-queue.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    await DeadLetterQueue.processRetryable();
    
    return new Response(JSON.stringify({ 
      status: 'success',
      processed: 'DLQ items processed'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('DLQ processor error:', error);
    return new Response('Internal error', { status: 500 });
  }
});
```

#### **8. Post-Deploy Verification**
```bash
# scripts/verify-dlq-pause-drain.sh
#!/bin/bash
set -euo pipefail

echo "🔍 Verifying DLQ & Pause/Drain implementation..."

# 1. Check tables exist
psql "$SUPABASE_DB_URL" -c "
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'dead_letter_queue'
);" | grep -q t
echo "✅ Dead letter queue table exists"

psql "$SUPABASE_DB_URL" -c "
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'agent_controls'
);" | grep -q t
echo "✅ Agent controls table exists"

# 2. Test pause functionality
echo "🧪 Testing pause functionality..."
COMPANY_ID="00000000-0000-4000-8000-000000000001"

# Pause agents
curl -s -X POST "$SUPABASE_URL/functions/v1/agent-controls" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"pause\",\"company_id\":\"$COMPANY_ID\",\"reason\":\"Test pause\",\"initiated_by\":\"test\"}"

# Verify pause
PAUSED=$(psql "$SUPABASE_DB_URL" -Atc "
SELECT agents_paused FROM public.agent_controls 
WHERE company_id = '$COMPANY_ID';")

if [[ "$PAUSED" == "t" ]]; then
  echo "✅ Pause functionality works"
else
  echo "❌ Pause functionality failed"
  exit 1
fi

# Resume agents
curl -s -X POST "$SUPABASE_URL/functions/v1/agent-controls" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"resume\",\"company_id\":\"$COMPANY_ID\",\"initiated_by\":\"test\"}"

# 3. Test DLQ functionality
echo "🧪 Testing DLQ functionality..."
TASK_ID=$(psql "$SUPABASE_DB_URL" -Atc "
INSERT INTO public.agent_tasks (company_id, fn_name, payload, status)
VALUES ('$COMPANY_ID', 'test.dlq', '{}', 'failed')
RETURNING id;")

# Simulate DLQ quarantine
curl -s -X POST "$SUPABASE_URL/functions/v1/dlq-processor" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json"

# Verify DLQ item
DLQ_COUNT=$(psql "$SUPABASE_DB_URL" -Atc "
SELECT COUNT(*) FROM public.dead_letter_queue 
WHERE original_task_id = '$TASK_ID';")

if [[ "$DLQ_COUNT" -gt 0 ]]; then
  echo "✅ DLQ functionality works"
else
  echo "❌ DLQ functionality failed"
  exit 1
fi

echo "🎉 DLQ & Pause/Drain verification complete!"
```

### 🎯 **Acceptance Criteria**

#### **Functional Tests**
- [ ] DLQ auto-snooze works with exponential backoff
- [ ] Pause/drain controls prevent new task processing
- [ ] High-priority errors trigger Slack notifications
- [ ] Retry logic respects pause/drain state
- [ ] RLS prevents cross-tenant access

#### **Performance Tests**
- [ ] DLQ processing < 30s for 100 items
- [ ] Pause/drain state checks < 10ms
- [ ] Index usage verified for all queries
- [ ] No memory leaks in long-running processes

#### **Reliability Tests**
- [ ] Network partition simulation
- [ ] Database connection failure handling
- [ ] Slack webhook failure recovery
- [ ] Service role key rotation

### 🚀 **Deployment Steps**

1. **Deploy Migrations**
   ```bash
   supabase db push
   ```

2. **Deploy Edge Functions**
   ```bash
   supabase functions deploy dlq-processor
   supabase functions deploy agent-controls
   ```

3. **Update Agent Runner**
   ```bash
   supabase functions deploy agent-runner
   ```

4. **Run Verification**
   ```bash
   chmod +x scripts/verify-dlq-pause-drain.sh
   ./scripts/verify-dlq-pause-drain.sh
   ```

5. **Monitor Metrics**
   ```sql
   -- Check DLQ status
   SELECT 
     COUNT(*) as total_quarantined,
     COUNT(*) FILTER (WHERE retry_after <= NOW()) as ready_for_retry,
     AVG(EXTRACT(EPOCH FROM (NOW() - created_at))/3600) as avg_age_hours
   FROM public.dead_letter_queue;
   
   -- Check pause/drain status
   SELECT 
     COUNT(*) as total_companies,
     COUNT(*) FILTER (WHERE agents_paused) as paused_companies,
     COUNT(*) FILTER (WHERE agents_drain) as draining_companies
   FROM public.agent_controls;
   ```

### 📊 **Success Metrics**

- **DLQ Processing Time**: < 30 seconds for 100 items
- **Retry Success Rate**: > 80% after first retry
- **Pause/Drain Response**: < 1 second
- **Error Classification**: 95% accuracy

### 🔄 **Rollback Plan**

If issues occur:
1. Disable cron jobs: `SELECT cron.unschedule('dlq-processor');`
2. Clear pause/drain flags: `UPDATE agent_controls SET agents_paused = false, agents_drain = false;`
3. Manual DLQ processing available via edge function
4. No data loss - items remain in DLQ table

---

**🎉 This PR delivers bulletproof error handling and operational controls!**
