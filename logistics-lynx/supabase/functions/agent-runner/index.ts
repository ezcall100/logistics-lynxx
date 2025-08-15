import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { runEnsurePortal } from "./lib/portalDev.ts";

const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

function ghCtx() {
  return {
    token: Deno.env.get("GITHUB_TOKEN")!,
    owner: Deno.env.get("GITHUB_OWNER")!,
    repo: Deno.env.get("GITHUB_REPO")!,
    defaultBranch: Deno.env.get("GITHUB_DEFAULT_BRANCH") ?? "main",
  };
}

// Simple logging functions
async function agentInfo(companyId: string, taskId: string, message: string, meta?: unknown) {
  console.log(`[INFO] ${companyId}/${taskId}: ${message}`, meta ? JSON.stringify(meta) : '');
  try {
    await supa.from("agent_logs").insert({
      company_id: companyId,
      task_id: taskId,
      level: "info",
      message,
      metadata: meta || {}
    });
  } catch (e) {
    console.error("Failed to log agent info:", e);
  }
}

async function agentError(companyId: string, taskId: string, message: string, meta?: unknown) {
  console.error(`[ERROR] ${companyId}/${taskId}: ${message}`, meta ? JSON.stringify(meta) : '');
  try {
    await supa.from("agent_logs").insert({
      company_id: companyId,
      task_id: taskId,
      level: "error",
      message,
      metadata: meta || {}
    });
  } catch (e) {
    console.error("Failed to log agent error:", e);
  }
}

async function agentSlackError(params: { companyId: string; taskId: string; msg: string; meta?: unknown }) {
  // Placeholder for Slack integration
  console.error(`[SLACK] ${params.companyId}/${params.taskId}: ${params.msg}`, params.meta ? JSON.stringify(params.meta) : '');
}

serve(async (req) => {
  try {
    const { task_id } = await req.json();
    const { data: task, error } = await supa.from("agent_tasks").select("*").eq("id", task_id).single();
    if (error || !task) return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });

    const { company_id, fn_name, payload } = task;
    await agentInfo(company_id, task_id, `Starting task: ${fn_name}`, { payload });

    try {
      const result = await dispatch(fn_name, payload);
      await agentInfo(company_id, task_id, `Task completed: ${fn_name}`, { result });
      await supa.from("agent_tasks").update({ status: "done", result, updated_at: new Date().toISOString() }).eq("id", task_id);
      return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await agentError(company_id, task_id, `Task failed: ${fn_name} - ${msg}`, { stack: (err as Error)?.stack, fn_name, payload });
      await agentSlackError({ companyId: company_id, taskId: task_id, msg: `Task failed: ${fn_name} - ${msg}`, meta: { fn_name, payload } });
      await supa.from("agent_tasks").update({ status: "failed", error: msg, updated_at: new Date().toISOString() }).eq("id", task_id);
      return new Response(JSON.stringify({ error: msg }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 400 });
  }
});

async function dispatch(fn_name: string, payload: unknown) {
  switch (fn_name) {
    case "rates.price_one":
      return await handleRatesPricing(payload);

    // NEW: portal development agent action
    case "portal.ensure_portal": {
      // Guard by feature flag (fetch from DB or environment if you cache flags server-side)
      // Minimal in-function guard: require env token present (prevents unsafe execution if not configured)
      if (!Deno.env.get("GITHUB_TOKEN")) throw new Error("GITHUB_TOKEN not configured");
      const ctx = { gh: ghCtx(), dryRun: !!payload?.dryRun, allowPaths: undefined as string[] | undefined };
      return await runEnsurePortal(ctx, {
        portalKey: payload?.portalKey,
        openPR: payload?.openPR ?? true,
        dryRun: payload?.dryRun ?? false,
      });
    }

    default:
      throw new Error(`Unknown function: ${fn_name}`);
  }
}

async function handleRatesPricing(payload: unknown) {
  return { price: 150.0, currency: "USD", input: payload };
}
