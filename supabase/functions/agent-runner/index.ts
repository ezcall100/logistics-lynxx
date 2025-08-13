import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initTracerIfEnabled, withSpan, injectHeaders, getTraceId, spanNames, agentAttrs } from "../_shared/otel.ts";
import { resolveFlag } from "../_shared/flags.ts";
import { agentSlackError } from "./lib/slack.ts";

serve(async (req) => {
  // enable OTEL if flag is on (global/env scope)
  const otelEnabled = await resolveFlag("obs.otelEnabled", true); // default true in staging
  initTracerIfEnabled(otelEnabled);

  return await withSpan(spanNames.agent.task.execute, req, async (span) => {
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    // Pick a small batch to avoid thundering herd
    const { data: tasks } = await supabase
      .from('agent_tasks')
      .select('id, company_id, fn_name, payload, attempts')
      .eq('status','queued')
      .lt('attempts', 5)
      .limit(5);

    if (!tasks?.length) {
      console.log('No tasks to process');
      return new Response('no-tasks', { status: 200 });
    }

    console.log(`Processing ${tasks.length} tasks`);
    span.setAttribute("agent.tasks_count", tasks.length);

    // Get function definitions
    const { data: fns } = await supabase.from('agent_functions').select('*');
    const fnMap = new Map(fns?.map(f => [f.name, f]) as any);

    const results = [];

    for (const task of tasks) {
      console.log(`Processing task ${task.id} (${task.fn_name})`);
      
      // Get trace ID for this task
      const traceId = await getTraceId();
      
      // Set span attributes for this task using semantic conventions
      span.setAttributes(agentAttrs({
        companyId: task.company_id,
        taskId: task.id,
        fnName: task.fn_name,
        runner: "edge"
      }));
      
      // Add task start event
      span.addEvent("agent.task.start", { "agent.fn_name": task.fn_name });
      
      // Update task status to running with trace ID
      await supabase.from('agent_tasks').update({ 
        status:'running', 
        attempts: task.attempts + 1, 
        updated_at: new Date().toISOString(),
        trace_id: traceId
      }).eq('id', task.id);

      const fn = fnMap.get(task.fn_name);
      let ok = false, log = '', response = null;

      try {
        if (fn.target === 'supabase_function') {
          // Call Supabase Edge Function
          const res = await fetch(`${Deno.env.get("SUPABASE_URL")!}/functions/v1/${fn.endpoint}`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}` 
            },
            body: JSON.stringify(task.payload)
          });
          
          response = await res.text();
          log = `Status: ${res.status}, Response: ${response}`;
          ok = res.ok;
          
        } else if (fn.target === 'n8n_webhook' || fn.target === 'http') {
          // Call external webhook/HTTP endpoint with trace propagation
          const res = await fetch(fn.endpoint, injectHeaders({ 
            method: 'POST', 
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify(task.payload) 
          }));
          
          response = await res.text();
          log = `Status: ${res.status}, Response: ${response}`;
          ok = res.ok;
        } else {
          log = `Unknown function target: ${fn.target}`;
          ok = false;
        }
      } catch (e) { 
        log = `Error: ${String(e)}`;
        ok = false;
      }

      // Log the run
      await supabase.from('agent_runs').insert({ 
        task_id: task.id, 
        log, 
        finished_at: new Date().toISOString() 
      });

      // Update task status with trace ID
      const finalStatus = ok ? 'success' : (task.attempts + 1 >= 5 ? 'quarantined' : 'queued');
      await supabase.from('agent_tasks').update({ 
        status: finalStatus, 
        last_error: ok ? null : log, 
        updated_at: new Date().toISOString(),
        trace_id: traceId
      }).eq('id', task.id);

      // Send Slack notification for failed tasks
      if (!ok) {
        await agentSlackError({
          company_id: task.company_id,
          task_id: task.id,
          msg: `Task failed: ${task.fn_name} - ${log}`,
          meta: { fn_name: task.fn_name, payload: task.payload },
          trace_id: traceId
        });
      }

      // Add span event for task completion
      span.addEvent("agent.task.finish", { 
        status: finalStatus, 
        success: ok 
      });

      results.push({
        task_id: task.id,
        fn_name: task.fn_name,
        status: finalStatus,
        success: ok,
        log: log.substring(0, 200) // Truncate long logs
      });

      console.log(`Task ${task.id} completed with status: ${finalStatus}`);
    }

    return new Response(JSON.stringify({
      processed: tasks.length,
      results,
      timestamp: new Date().toISOString()
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Agent Runner Error:', error);
    span.recordException(error as Error);
    return new Response(JSON.stringify({ 
      error: String(error),
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  });
});
