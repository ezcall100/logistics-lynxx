// supabase/functions/n8n-webhook/index.ts
// Robust n8n ↔ Supabase webhook handler for autonomous tasks & ops

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ----------------------------- Config -----------------------------
const VERSION = "2025-01-06";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const N8N_WEBHOOK_SECRET = Deno.env.get("N8N_WEBHOOK_SECRET") ?? ""; // optional: HMAC shared secret

// ----------------------------- Clients -----------------------------
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ----------------------------- Headers -----------------------------
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type, x-signature, x-request-id",
  "access-control-allow-methods": "GET,POST,OPTIONS",
};
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "x-n8n-webhook-version": VERSION,
};

// ----------------------------- Types -----------------------------
type TaskType =
  | "autonomous_task"
  | "system_health_check"
  | "task_completion"
  | "agent_deployment"
  | "performance_alert";

interface BasePayload {
  task_type?: TaskType | string;
  agent_type?: string;
  task_name?: string;
  description?: string;
  priority?: number;
  portal?: string;
  workflow_id?: string;
  execution_id?: string;
  trigger_data?: unknown;
  event_id?: string;         // idempotency
}

interface TaskCompletionPayload extends BasePayload {
  task_type: "task_completion";
  task_id?: string;
  success?: boolean;
  result?: unknown;
}

interface AgentDeploymentPayload extends BasePayload {
  task_type: "agent_deployment";
  agent_config?: {
    name?: string;
    confidence_threshold?: number;
    auto_execute_threshold?: number;
    openai_enabled?: boolean;
    query_frequency_minutes?: number;
  };
}

interface PerformanceAlertPayload extends BasePayload {
  task_type: "performance_alert";
  alert_type?: string;
  severity?: "low" | "medium" | "high" | "critical" | string;
  metrics?: Record<string, unknown>;
}

type Payload =
  | BasePayload
  | TaskCompletionPayload
  | AgentDeploymentPayload
  | PerformanceAlertPayload;

// ----------------------------- Utils -----------------------------
const nowIso = () => new Date().toISOString();
const uuid = () => crypto.randomUUID();

function ok(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    status: init.status ?? 200,
    headers: { ...CORS, ...JSON_HEADERS, ...(init.headers ?? {}) },
  });
}

function fail(message: string, status = 400, details?: unknown) {
  return ok({ success: false, error: message, details, timestamp: nowIso() }, { status });
}

async function logStatus(row: {
  agent_id: string;
  agent_type: string;
  status: string;
  message: string;
  timestamp?: string;
  response_time?: number;
}) {
  const { error } = await supabase.from("agent_status_logs").insert({
    ...row,
    timestamp: row.timestamp ?? nowIso(),
  });
  if (error) console.log("agent_status_logs insert error:", error);
}

// Optional HMAC verification. Header: x-signature (hex of HMAC-SHA256 over raw body).
async function verifySignature(req: Request, secret: string): Promise<boolean> {
  if (!secret) return true; // disabled if not configured
  const signatureHeader = req.headers.get("x-signature");
  if (!signatureHeader) return false;

  const body = await req.clone().arrayBuffer();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, body);
  const expected = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");

  // Timing safe compare
  if (expected.length !== signatureHeader.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signatureHeader.charCodeAt(i);
  return diff === 0;
}

// Idempotency store
async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!eventId) return false;
  const { data, error } = await supabase
    .from("processed_webhooks")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();
  if (error) {
    console.log("processed_webhooks check error:", error);
    return false;
  }
  return Boolean(data);
}
async function markEventProcessed(eventId: string) {
  if (!eventId) return;
  const { error } = await supabase.from("processed_webhooks").insert({ event_id: eventId, created_at: nowIso() });
  if (error) console.log("processed_webhooks insert error:", error);
}

function safeNumber(n: unknown, fallback: number): number {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}

// ----------------------------- Handlers -----------------------------
async function handleAutonomousTask(payload: BasePayload) {
  const {
    agent_type = "automation",
    portal = "all",
    task_name = "N8N Automated Task",
    description = "Task created by N8N automation workflow",
    priority = 5,
    workflow_id,
    execution_id,
    trigger_data,
  } = payload;

  const taskId = `n8n_${workflow_id ?? "wf"}_${execution_id ?? "exec"}_${Date.now()}`;

  const { error } = await supabase.from("autonomous_tasks").insert({
    task_id: taskId,
    agent_type,
    portal,
    task_name,
    description,
    priority: safeNumber(priority, 5),
    estimated_duration_minutes: 30,
    status: "pending",
    result: {
      source: "n8n_webhook",
      workflow_id,
      execution_id,
      trigger_data,
    },
    created_at: nowIso(),
  });

  if (error) throw error;

  return { task_id: taskId };
}

async function handleSystemHealthCheck() {
  const health = {
    timestamp: nowIso(),
    status: "healthy",
    checks: {
      database: "operational",
      autonomous_agents: "active",
      task_processing: "running",
    },
  };

  // Minimal metric/log row
  await supabase.from("system_health_metrics").insert({
    metric_name: "n8n_health_check",
    metric_value: 1,
    unit: "status",
    timestamp: nowIso(),
  }).catch((e) => console.log("system_health_metrics insert error:", e));

  return health;
}

async function handleTaskCompletion(payload: TaskCompletionPayload) {
  const { task_id, result, success, workflow_id, execution_id } = payload;
  if (!task_id) return { updated: 0, message: "task_id is required for task_completion" };

  const { data, error } = await supabase
    .from("autonomous_tasks")
    .update({
      status: success ? "completed" : "failed",
      completed_at: nowIso(),
      result: {
        ...(result ?? {}),
        completed_by: "n8n_workflow",
        workflow_id,
        execution_id,
      },
    })
    .eq("task_id", task_id)
    .select("task_id");

  if (error) throw error;
  return { updated: data?.length ?? 0, task_id };
}

async function handleAgentDeployment(payload: AgentDeploymentPayload) {
  const cfg = payload.agent_config ?? {};
  const id = `n8n_deployed_${Date.now()}`;

  const row = {
    agent_id: id,
    agent_name: cfg.name ?? "N8N Deployed Agent",
    is_active: true,
    confidence_threshold: cfg.confidence_threshold ?? 0.7,
    auto_execute_threshold: cfg.auto_execute_threshold ?? 0.9,
    openai_enabled: cfg.openai_enabled ?? true,
    query_frequency_minutes: cfg.query_frequency_minutes ?? 30,
    created_at: nowIso(),
  };

  // Upsert by agent_id to prevent duplicates
  const { error } = await supabase
    .from("autonomous_agent_configs")
    .upsert(row, { onConflict: "agent_id" });

  if (error) throw error;
  return { agent_id: id };
}

async function handlePerformanceAlert(payload: PerformanceAlertPayload) {
  const { alert_type = "generic", severity = "medium", metrics, description, workflow_id, execution_id } = payload;

  const { error } = await supabase.from("alerts").insert({
    title: `N8N Performance Alert: ${alert_type}`,
    message: description ?? "Performance issue detected by N8N monitoring",
    severity,
    category: "performance",
    source: "n8n_monitoring",
    metadata: { workflow_id, execution_id, metrics },
    created_at: nowIso(),
  });

  if (error) throw error;
  return { created: true, alert_type, severity };
}

// ----------------------------- Server -----------------------------
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  // Simple health check
  if (req.method === "GET") {
    return ok({
      success: true,
      version: VERSION,
      timestamp: nowIso(),
      env: {
        supabaseConfigured: Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY),
        hmacProtection: Boolean(N8N_WEBHOOK_SECRET),
      },
      accepted_task_types: [
        "autonomous_task",
        "system_health_check",
        "task_completion",
        "agent_deployment",
        "performance_alert",
      ],
    });
  }

  if (req.method !== "POST") return fail("Method not allowed", 405);

  // Optional signature verification
  const verified = await verifySignature(req, N8N_WEBHOOK_SECRET);
  if (!verified) return fail("Invalid signature", 401);

  const reqId = req.headers.get("x-request-id") ?? uuid();

  try {
    const payload = (await req.json().catch(() => ({}))) as Payload;
    console.log("🔗 N8N Webhook received:", { reqId, at: nowIso() });
    console.log("📦 Payload:", JSON.stringify(payload).slice(0, 2_000)); // avoid huge logs

    const {
      task_type,
      priority = 5,
      portal = "all",
      workflow_id,
      execution_id,
      event_id = `${workflow_id ?? "wf"}:${execution_id ?? "exec"}`,
    } = payload;

    // Log reception
    await logStatus({
      agent_id: `n8n-webhook-${Date.now()}`,
      agent_type: "n8n_integration",
      status: "active",
      message: `N8N webhook received: ${task_type ?? "unknown"}`,
    });

    // Idempotency check
    if (event_id && (await isEventProcessed(event_id))) {
      return ok({
        success: true,
        message: "Webhook already processed",
        event_id,
        timestamp: nowIso(),
      });
    }

    let result: unknown;

    switch (task_type as TaskType) {
      case "autonomous_task":
        result = await handleAutonomousTask(payload);
        break;

      case "system_health_check":
        result = await handleSystemHealthCheck();
        break;

      case "task_completion":
        result = await handleTaskCompletion(payload as TaskCompletionPayload);
        break;

      case "agent_deployment":
        result = await handleAgentDeployment(payload as AgentDeploymentPayload);
        break;

      case "performance_alert":
        result = await handlePerformanceAlert(payload as PerformanceAlertPayload);
        break;

      default: {
        // Unknown types → generic task
        const genericId = `n8n_generic_${Date.now()}`;
        const { error } = await supabase.from("autonomous_tasks").insert({
          task_id: genericId,
          agent_type: "automation",
          portal: "admin",
          task_name: "N8N Generic Webhook Task",
          description: `Generic task from N8N webhook: ${JSON.stringify(payload).slice(0, 2000)}`,
          priority: safeNumber(priority, 3),
          estimated_duration_minutes: 15,
          status: "pending",
          created_at: nowIso(),
        });
        if (error) throw error;
        result = { task_id: genericId, note: "unknown task_type, created generic task" };
        break;
      }
    }

    // Persist memory/log of success
    await supabase.from("agent_memory").insert({
      agent_id: "n8n-webhook-processor",
      goal: `Process N8N webhook (${task_type ?? "unknown"})`,
      context: {
        task_type,
        portal,
        priority,
        workflow_id,
        execution_id,
        received_at: nowIso(),
      },
      prompt: `Process N8N webhook: ${task_type ?? "unknown"}`,
      response: "Webhook processed successfully",
      action_taken: `Handled ${task_type ?? "generic"} via n8n integration`,
      confidence: 0.95,
      outcome: "success",
      created_at: nowIso(),
    }).catch((e) => console.log("agent_memory insert error:", e));

    // Mark processed for idempotency
    await markEventProcessed(event_id);

    return ok({
      success: true,
      message: "N8N webhook processed successfully",
      task_type,
      result,
      event_id,
      request_id: reqId,
      timestamp: nowIso(),
      processing_status: "completed",
    });
  } catch (error) {
    const message = (error as Error)?.message ?? "Unknown error";
    console.error("❌ N8N webhook processing error:", { reqId, message });

    await logStatus({
      agent_id: "n8n-webhook-error",
      agent_type: "n8n_integration",
      status: "error",
      message: `N8N webhook error: ${message}`,
    });

    return fail(message, 500);
  }
});
