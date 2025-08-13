import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface DLQItem {
  id: string;
  original_task_id: string;
  company_id: string;
  agent_name: string;
  error_type: string;
  error_message: string;
  retry_count: number;
  max_retries: number;
  retry_after: string;
  priority: number;
}

interface ReplayRequest {
  dlq_ids?: string[];
  company_id?: string;
  error_type?: string;
  force?: boolean;
  max?: number;
  idempotency_key?: string;
  dry_run?: boolean;
}

interface ReplayRun {
  id: string;
  idempotency_key: string;
  company_id: string;
  requested_at: string;
  actor: string;
  payload_hash: string;
  status: 'pending' | 'completed' | 'failed';
  total_processed: number;
  successful: number;
  failed: number;
}

Deno.serve(async (req) => {
  try {
    // 1. AUTHZ GUARD
    const authResult = await validateAuthorization(req);
    if (!authResult.authorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { dlq_ids, company_id, error_type, force = false, max = 50, idempotency_key, dry_run = false }: ReplayRequest = await req.json();
    
    // 2. RATE LIMIT & BUDGET
    const rateLimitResult = await checkRateLimit(authResult.actor, company_id, req.headers.get('x-forwarded-for') || 'unknown');
    if (!rateLimitResult.allowed) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded', 
        retry_after: rateLimitResult.retry_after 
      }), { 
        status: 429,
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': rateLimitResult.retry_after.toString()
        }
      });
    }

    // 3. REPLAY IDEMPOTENCY
    if (idempotency_key) {
      const existingRun = await checkReplayIdempotency(idempotency_key, company_id);
      if (existingRun) {
        return new Response(JSON.stringify({
          message: 'Replay already processed',
          replay_run: existingRun
        }), { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Create replay run record
    const replayRunId = await createReplayRun({
      idempotency_key: idempotency_key || `replay-${Date.now()}`,
      company_id: company_id || 'all',
      requested_at: new Date().toISOString(),
      actor: authResult.actor,
      payload_hash: await hashPayload({ dlq_ids, company_id, error_type, force, max })
    });

    // Build query for retryable DLQ items
    let query = supabase
      .from('dead_letter_queue')
      .select('*')
      .lte('retry_after', new Date().toISOString())
      .lt('retry_count', 'max_retries');
    
    if (dlq_ids && dlq_ids.length > 0) {
      query = query.in('id', dlq_ids);
    } else if (company_id) {
      query = query.eq('company_id', company_id);
    } else if (error_type) {
      query = query.eq('error_type', error_type);
    }
    
    if (!force) {
      query = query.lte('retry_after', new Date().toISOString());
    }
    
    const { data: dlqItems, error } = await query.order('priority', { ascending: true }).limit(max);
    
    if (error) {
      console.error('Failed to fetch DLQ items:', error);
      await updateReplayRun(replayRunId, 'failed', 0, 0, 0);
      return new Response(JSON.stringify({ error: 'Database error' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!dlqItems || dlqItems.length === 0) {
      await updateReplayRun(replayRunId, 'completed', 0, 0, 0);
      return new Response(JSON.stringify({ 
        message: 'No retryable DLQ items found',
        count: 0,
        replay_run_id: replayRunId
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. SAFETY RAILS
    const totalBytes = JSON.stringify(dlqItems).length;
    if (totalBytes > 2 * 1024 * 1024) { // 2MB limit
      await updateReplayRun(replayRunId, 'failed', 0, 0, 0);
      return new Response(JSON.stringify({ error: 'Payload too large (max 2MB)' }), { 
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (dry_run) {
      await updateReplayRun(replayRunId, 'completed', dlqItems.length, 0, 0);
      return new Response(JSON.stringify({
        message: 'Dry run completed',
        items_found: dlqItems.length,
        replay_run_id: replayRunId,
        preview: dlqItems.slice(0, 5).map(item => ({
          id: item.id,
          company_id: item.company_id,
          error_type: item.error_type,
          retry_count: item.retry_count
        }))
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const results = [];
    let successCount = 0;
    let failureCount = 0;
    let immediateFailCount = 0;
    
    for (const item of dlqItems) {
      try {
        // Attempt to retry the original task
        const retryResult = await retryTask(item);
        
        if (retryResult.success) {
          // Mark DLQ item as resolved
          await supabase
            .from('dead_letter_queue')
            .update({ 
              retry_count: item.retry_count + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', item.id);
          
          successCount++;
          results.push({
            dlq_id: item.id,
            original_task_id: item.original_task_id,
            status: 'retried_successfully',
            message: 'Task retried and completed successfully'
          });
        } else {
          // Update retry count and set next retry time
          const nextRetryAt = calculateNextRetry(item.retry_count + 1);
          await supabase
            .from('dead_letter_queue')
            .update({ 
              retry_count: item.retry_count + 1,
              retry_after: nextRetryAt,
              updated_at: new Date().toISOString()
            })
            .eq('id', item.id);
          
          failureCount++;
          immediateFailCount++;
          results.push({
            dlq_id: item.id,
            original_task_id: item.original_task_id,
            status: 'retry_failed',
            message: retryResult.error,
            next_retry_at: nextRetryAt
          });
        }

        // Safety rail: stop if >20% immediate fails
        if (immediateFailCount > dlqItems.length * 0.2) {
          console.warn(`Stopping replay due to high failure rate: ${immediateFailCount}/${dlqItems.length}`);
          break;
        }
      } catch (error) {
        console.error(`Failed to retry DLQ item ${item.id}:`, error);
        failureCount++;
        immediateFailCount++;
        results.push({
          dlq_id: item.id,
          original_task_id: item.original_task_id,
          status: 'retry_error',
          message: error.message
        });
      }
    }
    
    // Update replay run with final results
    await updateReplayRun(replayRunId, 'completed', dlqItems.length, successCount, failureCount);
    
    // Write audit log
    await writeAuditLog({
      actor: authResult.actor,
      action: 'dlq_replay',
      scope: company_id || 'all',
      target_count: dlqItems.length,
      success_count: successCount,
      failure_count: failureCount,
      replay_run_id: replayRunId
    });
    
    // Send Slack notification if configured
    if (Deno.env.get('SLACK_WEBHOOK_URL')) {
      await sendSlackNotification({
        text: `DLQ Replay Complete: ${successCount} successful, ${failureCount} failed`,
        attachments: [{
          fields: [
            { title: 'Success Count', value: successCount.toString(), short: true },
            { title: 'Failure Count', value: failureCount.toString(), short: true },
            { title: 'Total Processed', value: dlqItems.length.toString(), short: true },
            { title: 'Actor', value: authResult.actor, short: true },
            { title: 'Replay Run ID', value: replayRunId, short: true }
          ]
        }]
      });
    }
    
    return new Response(JSON.stringify({
      message: 'DLQ replay completed',
      summary: {
        total_processed: dlqItems.length,
        successful: successCount,
        failed: failureCount
      },
      replay_run_id: replayRunId,
      results
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('DLQ replay error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// AUTHZ GUARD: Validate HMAC signature or JWT
async function validateAuthorization(req: Request): Promise<{ authorized: boolean; actor: string }> {
  const signature = req.headers.get('x-transbot-signature');
  const authHeader = req.headers.get('authorization');
  
  // Option 1: HMAC signature validation
  if (signature) {
    const body = await req.clone().text();
    const expectedSignature = createHmac('sha256', Deno.env.get('DLQ_REPLAY_SECRET') || 'default-secret')
      .update(body)
      .digest('hex');
    
    if (signature === expectedSignature) {
      return { authorized: true, actor: 'hmac-authenticated' };
    }
  }
  
  // Option 2: JWT validation for super-admin or tenant admin
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return { authorized: false, actor: 'unknown' };
      }
      
      // Check if user is super admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role === 'super_admin') {
        return { authorized: true, actor: `super_admin:${user.id}` };
      }
      
      // For tenant-specific replays, check if user is company admin
      const body = await req.clone().json();
      if (body.company_id) {
        const isAdmin = await checkCompanyAdmin(user.id, body.company_id);
        if (isAdmin) {
          return { authorized: true, actor: `company_admin:${user.id}` };
        }
      }
    } catch (error) {
      console.error('JWT validation error:', error);
    }
  }
  
  return { authorized: false, actor: 'unknown' };
}

// RATE LIMIT: Check edge rate limits
async function checkRateLimit(actor: string, company_id: string, ip: string): Promise<{ allowed: boolean; retry_after: number }> {
  const key = `replay:${company_id}:${ip}`;
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 3;
  
  try {
    // Get current rate limit state
    const { data: rateLimit } = await supabase
      .from('edge_rate_limits')
      .select('*')
      .eq('key', key)
      .single();
    
    if (!rateLimit) {
      // First request
      await supabase
        .from('edge_rate_limits')
        .insert({
          key,
          requests: 1,
          window_start: new Date(now).toISOString(),
          window_end: new Date(now + windowMs).toISOString()
        });
      return { allowed: true, retry_after: 0 };
    }
    
    // Check if window has expired
    if (new Date(rateLimit.window_end).getTime() < now) {
      // Reset window
      await supabase
        .from('edge_rate_limits')
        .update({
          requests: 1,
          window_start: new Date(now).toISOString(),
          window_end: new Date(now + windowMs).toISOString()
        })
        .eq('key', key);
      return { allowed: true, retry_after: 0 };
    }
    
    // Check if limit exceeded
    if (rateLimit.requests >= maxRequests) {
      const retryAfter = Math.ceil((new Date(rateLimit.window_end).getTime() - now) / 1000);
      return { allowed: false, retry_after: retryAfter };
    }
    
    // Increment request count
    await supabase
      .from('edge_rate_limits')
      .update({ requests: rateLimit.requests + 1 })
      .eq('key', key);
    
    return { allowed: true, retry_after: 0 };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open if rate limiting fails
    return { allowed: true, retry_after: 0 };
  }
}

// REPLAY IDEMPOTENCY: Check for existing replay runs
async function checkReplayIdempotency(idempotency_key: string, company_id: string): Promise<ReplayRun | null> {
  try {
    const { data: existingRun } = await supabase
      .from('replay_runs')
      .select('*')
      .eq('idempotency_key', idempotency_key)
      .eq('company_id', company_id)
      .single();
    
    return existingRun;
  } catch (error) {
    return null;
  }
}

// Create replay run record
async function createReplayRun(run: Omit<ReplayRun, 'id' | 'status' | 'total_processed' | 'successful' | 'failed'>): Promise<string> {
  const { data, error } = await supabase
    .from('replay_runs')
    .insert({
      ...run,
      status: 'pending',
      total_processed: 0,
      successful: 0,
      failed: 0
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

// Update replay run with results
async function updateReplayRun(id: string, status: string, total: number, successful: number, failed: number): Promise<void> {
  await supabase
    .from('replay_runs')
    .update({
      status,
      total_processed: total,
      successful,
      failed,
      completed_at: new Date().toISOString()
    })
    .eq('id', id);
}

// Write audit log
async function writeAuditLog(log: {
  actor: string;
  action: string;
  scope: string;
  target_count: number;
  success_count: number;
  failure_count: number;
  replay_run_id: string;
}): Promise<void> {
  await supabase
    .from('audit_logs')
    .insert({
      actor: log.actor,
      action: log.action,
      scope: log.scope,
      target_count: log.target_count,
      success_count: log.success_count,
      failure_count: log.failure_count,
      metadata: { replay_run_id: log.replay_run_id },
      created_at: new Date().toISOString()
    });
}

// Hash payload for idempotency
async function hashPayload(payload: any): Promise<string> {
  const payloadStr = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const data = encoder.encode(payloadStr);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if user is company admin
async function checkCompanyAdmin(userId: string, companyId: string): Promise<boolean> {
  try {
    const { data: membership } = await supabase
      .from('company_memberships')
      .select('role')
      .eq('user_id', userId)
      .eq('company_id', companyId)
      .single();
    
    return membership?.role === 'admin';
  } catch (error) {
    return false;
  }
}

async function retryTask(dlqItem: DLQItem): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the original task details
    const { data: originalTask, error: taskError } = await supabase
      .from('agent_tasks')
      .select('*')
      .eq('id', dlqItem.original_task_id)
      .single();
    
    if (taskError || !originalTask) {
      return { success: false, error: 'Original task not found' };
    }
    
    // Check if company is paused
    const { data: controls } = await supabase
      .from('agent_controls')
      .select('agents_paused, agents_drain')
      .eq('company_id', dlqItem.company_id)
      .single();
    
    if (controls?.agents_paused) {
      return { success: false, error: 'Company agents are paused' };
    }
    
    // Retry the task by calling the agent-runner
    const n8nBaseUrl = Deno.env.get('N8N_BASE_URL');
    const n8nApiKey = Deno.env.get('N8N_API_KEY');
    
    if (!n8nBaseUrl || !n8nApiKey) {
      return { success: false, error: 'N8N configuration missing' };
    }
    
    const response = await fetch(`${n8nBaseUrl}/webhook/agent-runner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${n8nApiKey}`
      },
      body: JSON.stringify({
        task_id: originalTask.id,
        company_id: originalTask.company_id,
        agent_name: originalTask.agent_name,
        payload: originalTask.payload,
        is_retry: true,
        dlq_item_id: dlqItem.id
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `N8N request failed: ${errorText}` };
    }
    
    return { success: true };
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function calculateNextRetry(retryCount: number): string {
  // Exponential backoff: 1min, 2min, 4min, 8min, 16min
  const backoffMinutes = Math.min(Math.pow(2, retryCount - 1), 16);
  const nextRetry = new Date();
  nextRetry.setMinutes(nextRetry.getMinutes() + backoffMinutes);
  return nextRetry.toISOString();
}

async function sendSlackNotification(message: any): Promise<void> {
  try {
    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (!webhookUrl) return;
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}
