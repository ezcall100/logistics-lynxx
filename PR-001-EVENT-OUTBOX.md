# PR-001: Event Outbox Implementation
## Durable Event Publishing for Autonomous TMS

### 🎯 **Goal**
Add durable event publishing to prevent missed webhooks/Realtime when networks blip. Guarantees no lost events during network partitions.

### 📋 **Files to Create/Modify**

#### **1. Database Migration**
```sql
-- supabase/migrations/20241201_001_event_outbox.sql
CREATE TABLE IF NOT EXISTS public.event_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  topic TEXT NOT NULL, -- 'agent_task_completed', 'rate_quote_ready', 'load_matched'
  payload JSONB NOT NULL,
  idempotency_key TEXT UNIQUE,
  target_system TEXT NOT NULL, -- 'n8n', 'realtime', 'slack'
  processed_at TIMESTAMPTZ,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  next_retry_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_outbox_unprocessed 
ON public.event_outbox (target_system, created_at) 
WHERE processed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_event_outbox_retryable 
ON public.event_outbox (next_retry_at, target_system) 
WHERE processed_at IS NULL AND next_retry_at <= NOW();

CREATE INDEX IF NOT EXISTS idx_event_outbox_idempotency 
ON public.event_outbox (idempotency_key) 
WHERE idempotency_key IS NOT NULL;

-- RLS for multi-tenant
ALTER TABLE public.event_outbox ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their company's outbox events" ON public.event_outbox
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Service role can manage all outbox events" ON public.event_outbox
  FOR ALL USING (auth.role() = 'service_role');

-- Add to realtime publication
INSERT INTO supabase_realtime.subscription (entity, filters, claims)
VALUES ('public.event_outbox', 'company_id=eq.' || auth.jwt() ->> 'company_id', '{"role": "authenticated"}')
ON CONFLICT DO NOTHING;
```

#### **2. Edge Function Worker**
```typescript
// supabase/functions/outbox-worker/index.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface OutboxEvent {
  id: string;
  company_id: string;
  event_type: string;
  topic: string;
  payload: any;
  target_system: 'n8n' | 'realtime' | 'slack';
  attempts: number;
  max_attempts: number;
  next_retry_at: string;
}

Deno.serve(async (req) => {
  try {
    // Poll unprocessed events that are ready for retry
    const { data: events, error } = await supabase
      .from('event_outbox')
      .select('*')
      .is('processed_at', null)
      .lte('next_retry_at', new Date().toISOString())
      .lt('attempts', 3)
      .order('created_at', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Failed to fetch outbox events:', error);
      return new Response('Database error', { status: 500 });
    }

    const results = [];
    for (const event of events || []) {
      try {
        await publishEvent(event);
        
        // Mark as processed
        await supabase
          .from('event_outbox')
          .update({ 
            processed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', event.id);
        
        results.push({ id: event.id, status: 'success' });
      } catch (error) {
        // Increment attempts and schedule retry
        const nextAttempt = event.attempts + 1;
        const backoffMinutes = Math.pow(2, nextAttempt); // Exponential backoff
        const nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000);
        
        await supabase
          .from('event_outbox')
          .update({ 
            attempts: nextAttempt,
            next_retry_at: nextRetryAt.toISOString(),
            error_message: error.message,
            updated_at: new Date().toISOString()
          })
          .eq('id', event.id);
        
        results.push({ id: event.id, status: 'retry', error: error.message });
      }
    }

    return new Response(JSON.stringify({ 
      processed: results.length,
      results 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Outbox worker error:', error);
    return new Response('Internal error', { status: 500 });
  }
});

async function publishEvent(event: OutboxEvent) {
  switch (event.target_system) {
    case 'n8n':
      const n8nResponse = await fetch(Deno.env.get('N8N_WEBHOOK_URL')!, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Event-Type': event.event_type,
          'X-Idempotency-Key': event.idempotency_key || event.id
        },
        body: JSON.stringify({
          topic: event.topic,
          payload: event.payload,
          company_id: event.company_id,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!n8nResponse.ok) {
        throw new Error(`n8n webhook failed: ${n8nResponse.status}`);
      }
      break;

    case 'realtime':
      await supabase.channel('events').send({
        type: 'broadcast',
        event: event.event_type,
        payload: {
          topic: event.topic,
          data: event.payload,
          company_id: event.company_id,
          timestamp: new Date().toISOString()
        }
      });
      break;

    case 'slack':
      if (Deno.env.get('SLACK_WEBHOOK_URL')) {
        const slackResponse = await fetch(Deno.env.get('SLACK_WEBHOOK_URL')!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `[${event.topic}] ${event.event_type}`,
            attachments: [{
              fields: [
                { title: 'Company ID', value: event.company_id, short: true },
                { title: 'Event Type', value: event.event_type, short: true },
                { title: 'Payload', value: JSON.stringify(event.payload, null, 2) }
              ]
            }]
          })
        });
        
        if (!slackResponse.ok) {
          throw new Error(`Slack webhook failed: ${slackResponse.status}`);
        }
      }
      break;

    default:
      throw new Error(`Unknown target system: ${event.target_system}`);
  }
}
```

#### **3. Client Library**
```typescript
// src/lib/event-outbox.ts
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

export interface OutboxEvent {
  company_id: string;
  event_type: string;
  topic: string;
  payload: any;
  target_system: 'n8n' | 'realtime' | 'slack';
  idempotency_key?: string;
}

export class EventOutbox {
  static async publish(event: OutboxEvent) {
    const idempotencyKey = event.idempotency_key || `${event.topic}-${event.company_id}-${uuidv4()}`;
    
    const { data, error } = await supabase
      .from('event_outbox')
      .insert({
        company_id: event.company_id,
        event_type: event.event_type,
        topic: event.topic,
        payload: event.payload,
        target_system: event.target_system,
        idempotency_key: idempotencyKey,
        next_retry_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      // Handle duplicate idempotency key gracefully
      if (error.code === '23505') { // Unique violation
        console.log(`Event already queued with idempotency key: ${idempotencyKey}`);
        return data;
      }
      throw error;
    }

    return data;
  }

  static async publishAgentTaskCompleted(taskId: string, companyId: string, result: any) {
    return this.publish({
      company_id: companyId,
      event_type: 'agent_task_completed',
      topic: 'agent_tasks',
      payload: { task_id: taskId, result },
      target_system: 'realtime',
      idempotency_key: `task-completed-${taskId}`
    });
  }

  static async publishRateQuoteReady(quoteId: string, companyId: string, quote: any) {
    return this.publish({
      company_id: companyId,
      event_type: 'rate_quote_ready',
      topic: 'rates',
      payload: { quote_id: quoteId, quote },
      target_system: 'n8n',
      idempotency_key: `quote-ready-${quoteId}`
    });
  }
}
```

#### **4. Update Agent Runner**
```typescript
// supabase/functions/agent-runner/index.ts - Add to existing function
// ... existing code ...

// After task completion, publish event
if (task.status === 'done') {
  await EventOutbox.publishAgentTaskCompleted(task.id, task.company_id, task.result);
}

// ... existing code ...
```

#### **5. Cron Job Setup**
```sql
-- supabase/migrations/20241201_002_outbox_cron.sql
-- Schedule outbox worker to run every 30 seconds
SELECT cron.schedule(
  'outbox-worker',
  '*/30 * * * * *', -- Every 30 seconds
  'SELECT net.http_post(
    url := ''https://your-project.supabase.co/functions/v1/outbox-worker'',
    headers := ''{"Authorization": "Bearer " || current_setting(''app.settings.service_role_key'')}''::jsonb
  );'
);
```

#### **6. Post-Deploy Verification**
```bash
# scripts/verify-outbox.sh
#!/bin/bash
set -euo pipefail

echo "🔍 Verifying Event Outbox implementation..."

# 1. Check table exists
psql "$SUPABASE_DB_URL" -c "
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'event_outbox'
);" | grep -q t
echo "✅ Event outbox table exists"

# 2. Check indexes
psql "$SUPABASE_DB_URL" -c "
SELECT indexname FROM pg_indexes 
WHERE tablename = 'event_outbox' 
AND indexname IN ('idx_event_outbox_unprocessed', 'idx_event_outbox_retryable');" | grep -q idx_event_outbox
echo "✅ Required indexes exist"

# 3. Check RLS policies
psql "$SUPABASE_DB_URL" -c "
SELECT policyname FROM pg_policies 
WHERE tablename = 'event_outbox';" | grep -q "Users can view"
echo "✅ RLS policies configured"

# 4. Test event publishing
echo "🧪 Testing event publishing..."
TASK_ID=$(psql "$SUPABASE_DB_URL" -Atc "
INSERT INTO public.agent_tasks (company_id, fn_name, payload, status)
VALUES ('00000000-0000-4000-8000-000000000001', 'test.outbox', '{}', 'done')
RETURNING id;")

# Publish test event
curl -s -X POST "$SUPABASE_URL/functions/v1/outbox-worker" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json"

# Wait for processing
sleep 5

# Verify event was processed
PROCESSED=$(psql "$SUPABASE_DB_URL" -Atc "
SELECT COUNT(*) FROM public.event_outbox 
WHERE payload->>'task_id' = '$TASK_ID' 
AND processed_at IS NOT NULL;")

if [[ "$PROCESSED" -gt 0 ]]; then
  echo "✅ Event processing works"
else
  echo "❌ Event processing failed"
  exit 1
fi

echo "🎉 Event Outbox verification complete!"
```

### 🎯 **Acceptance Criteria**

#### **Functional Tests**
- [ ] Outbox lag < 2s @ steady load
- [ ] Duplicate events de-duped via idempotency keys
- [ ] Exponential backoff works (1min, 2min, 4min)
- [ ] Events published to n8n, realtime, and Slack
- [ ] RLS prevents cross-tenant access

#### **Performance Tests**
- [ ] 100 events/second throughput
- [ ] < 50ms publish latency
- [ ] < 2s processing lag under load
- [ ] Index usage verified

#### **Reliability Tests**
- [ ] Network partition simulation
- [ ] n8n webhook failure recovery
- [ ] Database connection failure handling
- [ ] Service role key rotation

### 🚀 **Deployment Steps**

1. **Deploy Migration**
   ```bash
   supabase db push
   ```

2. **Deploy Edge Function**
   ```bash
   supabase functions deploy outbox-worker
   ```

3. **Set Environment Variables**
   ```bash
   supabase secrets set N8N_WEBHOOK_URL=https://your-n8n.com/webhook
   supabase secrets set SLACK_WEBHOOK_URL=https://hooks.slack.com/...
   ```

4. **Run Verification**
   ```bash
   chmod +x scripts/verify-outbox.sh
   ./scripts/verify-outbox.sh
   ```

5. **Monitor Metrics**
   ```sql
   -- Check outbox lag
   SELECT 
     AVG(EXTRACT(EPOCH FROM (NOW() - created_at))) as avg_lag_seconds,
     COUNT(*) as unprocessed_count
   FROM public.event_outbox 
   WHERE processed_at IS NULL;
   ```

### 📊 **Success Metrics**

- **Outbox Lag**: < 2 seconds average
- **Processing Success Rate**: > 99.9%
- **Duplicate Prevention**: 100% via idempotency keys
- **Recovery Time**: < 5 minutes after network partition

### 🔄 **Rollback Plan**

If issues occur:
1. Disable cron job: `SELECT cron.unschedule('outbox-worker');`
2. Events will queue but not process
3. Manual processing available via edge function
4. No data loss - events remain in outbox table

---

**🎉 This PR delivers bulletproof event publishing with zero data loss!**
