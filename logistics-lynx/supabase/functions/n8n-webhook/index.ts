import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse the request body
    const body = await req.json()
    console.log('Received webhook payload:', body)

    // Validate the payload
    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid payload format',
          timestamp: new Date().toISOString()
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Extract task information
    const {
      task_type,
      agent_type,
      task_name,
      description,
      priority = 5,
      workflow_id,
      execution_id,
      trigger_type,
      goal,
      prompt,
      action,
      confidence,
      success,
      metadata,
      timestamp = new Date().toISOString(),
      test = false
    } = body

    // Create task record
    const taskData = {
      task_type: task_type || 'autonomous_task',
      agent_type: agent_type || 'n8n_webhook_agent',
      task_name: task_name || 'N8N Webhook Task',
      description: description || 'Task created via N8N webhook',
      priority,
      workflow_id: workflow_id || 'n8n_workflow',
      execution_id: execution_id || `exec_${Date.now()}`,
      trigger_type: trigger_type || 'webhook',
      goal: goal || 'Process webhook data',
      prompt: prompt || 'Execute webhook task',
      action: action || 'Webhook task executed',
      confidence: confidence || 0.8,
      success: success !== undefined ? success : true,
      metadata: metadata || {},
      timestamp,
      test,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Insert task into database
    const { data: insertedTask, error: insertError } = await supabase
      .from('autonomous_tasks')
      .insert([taskData])
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Database error: ${insertError.message}`,
          timestamp: new Date().toISOString()
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create webhook log entry
    const logData = {
      webhook_type: 'n8n',
      payload: body,
      task_id: insertedTask.id,
      status: 'success',
      response_time: Date.now(),
      created_at: new Date().toISOString()
    }

    // Insert log entry (optional - only if table exists)
    try {
      await supabase
        .from('webhook_logs')
        .insert([logData])
    } catch (logError) {
      console.warn('Could not log webhook (table may not exist):', logError)
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'N8N webhook processed successfully',
        task_id: insertedTask.id,
        task: insertedTask,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Webhook processing error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: `Webhook processing failed: ${error.message}`,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
