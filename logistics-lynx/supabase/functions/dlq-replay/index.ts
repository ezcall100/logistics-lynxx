import { createClient } from '@supabase/supabase-js';

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
}

Deno.serve(async (req) => {
  try {
    const { dlq_ids, company_id, error_type, force = false }: ReplayRequest = await req.json();
    
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
    
    const { data: dlqItems, error } = await query.order('priority', { ascending: true }).limit(50);
    
    if (error) {
      console.error('Failed to fetch DLQ items:', error);
      return new Response(JSON.stringify({ error: 'Database error' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!dlqItems || dlqItems.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No retryable DLQ items found',
        count: 0 
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const results = [];
    let successCount = 0;
    let failureCount = 0;
    
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
          results.push({
            dlq_id: item.id,
            original_task_id: item.original_task_id,
            status: 'retry_failed',
            message: retryResult.error,
            next_retry_at: nextRetryAt
          });
        }
      } catch (error) {
        console.error(`Failed to retry DLQ item ${item.id}:`, error);
        failureCount++;
        results.push({
          dlq_id: item.id,
          original_task_id: item.original_task_id,
          status: 'retry_error',
          message: error.message
        });
      }
    }
    
    // Send Slack notification if configured
    if (Deno.env.get('SLACK_WEBHOOK_URL')) {
      await sendSlackNotification({
        text: `DLQ Replay Complete: ${successCount} successful, ${failureCount} failed`,
        attachments: [{
          fields: [
            { title: 'Success Count', value: successCount.toString(), short: true },
            { title: 'Failure Count', value: failureCount.toString(), short: true },
            { title: 'Total Processed', value: dlqItems.length.toString(), short: true }
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
