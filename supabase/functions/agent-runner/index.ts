import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { initTracerIfEnabled, injectHeaders, getTraceId, spanNames, agentAttrs, getTracer, markOk, markError, setHttpAttrs } from "../_shared/otel.ts";
import { resolveFlag } from "../_shared/flags.ts";
import { agentSlackError } from "./lib/slack.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api";

const tracer = getTracer();

const supa = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  // enable OTEL if flag is on (global/env scope)
  const otelEnabled = await resolveFlag("obs.otelEnabled", true); // default true in staging
  initTracerIfEnabled(otelEnabled);

  // Top-level span for the whole request (optional but helpful)
  return await tracer.startActiveSpan(
    "agent.http.invoke",
    { attributes: { "http.request.method": req.method, "code.component": "agent-runner" } },
    async (root) => {
      try {
        // Pick a small batch to avoid thundering herd
        const { data: tasks, error: tasksError } = await supa
          .from('agent_tasks')
          .select('id, company_id, fn_name, payload, attempts')
          .eq('status','queued')
          .lt('attempts', 5)
          .limit(5);

        if (tasksError) {
          setHttpAttrs(root, 500);
          markError(root, tasksError, { where: "db_query" });
          return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
        }

        if (!tasks?.length) {
          console.log('No tasks to process');
          setHttpAttrs(root, 200);
          markOk(root, "no tasks");
          return new Response('no-tasks', { status: 200 });
        }

        console.log(`Processing ${tasks.length} tasks`);
        root.setAttribute("agent.tasks_count", tasks.length);

        // Get function definitions
        const { data: fns, error: fnsError } = await supa.from('agent_functions').select('*');
        
        if (fnsError) {
          setHttpAttrs(root, 500);
          markError(root, fnsError, { where: "functions_query" });
          return new Response(JSON.stringify({ error: "Functions query error" }), { status: 500 });
        }

        const fnMap = new Map(fns?.map(f => [f.name, f]) as any);

        // Execution span (from PR-107.2)
        return await tracer.startActiveSpan(
          spanNames.agent.task.execute,
          { attributes: agentAttrs({ companyId: "batch", taskId: "batch", fnName: "batch" }) },
          async (span) => {
            span.addEvent("agent.task.start", { "agent.tasks_count": tasks.length });

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
              await supa.from('agent_tasks').update({ 
                status:'running', 
                attempts: task.attempts + 1, 
                updated_at: new Date().toISOString(),
                trace_id: traceId
              }).eq('id', task.id);

              const fn = fnMap.get(task.fn_name);
              let ok = false, log = '', response = null;

              try {
                if (!fn) {
                  throw new Error(`Unknown function: ${task.fn_name}`);
                }

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
                  throw new Error(`Unknown function target: ${fn.target}`);
                }
              } catch (e) { 
                log = `Error: ${String(e)}`;
                ok = false;
                // Record exception on the span
                markError(span, e, { fn_name: task.fn_name, task_id: task.id, where: "function_execution" });
              }

              // Log the run
              await supa.from('agent_runs').insert({ 
                task_id: task.id, 
                log, 
                finished_at: new Date().toISOString() 
              });

              // Update task status with trace ID
              const finalStatus = ok ? 'success' : (task.attempts + 1 >= 5 ? 'quarantined' : 'queued');
              await supa.from('agent_tasks').update({ 
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
                success: ok,
                task_id: task.id
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

            span.addEvent("agent.task.finish", { 
              processed: tasks.length,
              successful: results.filter(r => r.success).length
            });
            setHttpAttrs(span, 200);
            markOk(span, `processed ${tasks.length} tasks`);
            setHttpAttrs(root, 200);
            markOk(root);
            
            return new Response(JSON.stringify({
              processed: tasks.length,
              results,
              timestamp: new Date().toISOString()
            }), { 
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        );
      } catch (error) {
        console.error('Agent Runner Error:', error);
        setHttpAttrs(root, 500);
        markError(root, error, { where: "http_handler" });
        return new Response(JSON.stringify({ 
          error: String(error),
          timestamp: new Date().toISOString()
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      } finally {
        root.end();
      }
    }
  );
});
