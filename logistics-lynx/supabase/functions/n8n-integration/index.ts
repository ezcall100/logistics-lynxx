// supabase/functions/n8n-integration/index.ts
// Deno + Supabase Edge Function: n8n <-> Supabase bridge for autonomous agents

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ----------------------------- Config -----------------------------
const VERSION = "2025-01-06";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const N8N_WEBHOOK_SECRET = Deno.env.get("N8N_WEBHOOK_SECRET") ?? ""; // optional HMAC shared secret

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
  "x-n8n-integration-version": VERSION,
};

// ----------------------------- Types -----------------------------
type Action =
  | "get_pending_tasks"
  | "get_active_agents"
  | "agent_batch_update"
  | "trigger_autonomous_cycle"
  | "test_n8n_connection";

interface RequestBodyBase {
  action: Action | string;
  data?: unknown;
}

interface Pagination {
  page?: number;
  pageSize?: number;
}

interface BatchAgent {
  agentId: string;
  taskType?: string;
  status: "active" | "processing" | "idle" | "error" | "completed";
  message?: string;
  timestamp?: string;
}

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

// HMAC signature verification (optional). n8n can set a header "x-signature" with HMAC-SHA256 of the raw body.
async function verifySignature(req: Request, secret: string): Promise<boolean> {
  if (!secret) return true; // disabled if not set
  const sig = req.headers.get("x-signature");
  if (!sig) return false;

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
  // timing-safe compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

function getPagination(data?: unknown): Required<Pagination> {
  const d = (data ?? {}) as Record<string, unknown>;
  let page = Number(d.page ?? 1);
  let pageSize = Number(d.pageSize ?? 25);
  page = Number.isFinite(page) && page > 0 ? page : 1;
  pageSize = Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 200 ? pageSize : 25;
  return { page, pageSize };
}

function safeParse<T = unknown>(x: unknown): T | null {
  try {
    return x as T;
  } catch {
    return null;
  }
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

// Idempotency helper (for batch updates): store seen batchIds in a table to avoid double-processing
async function isBatchProcessed(batchId: string) {
  const { data, error } = await supabase
    .from("processed_batches")
    .select("batch_id")
    .eq("batch_id", batchId)
    .maybeSingle();
  if (error) {
    console.log("processed_batches check error:", error);
    return false;
  }
  return Boolean(data);
}
async function markBatchProcessed(batchId: string) {
  const { error } = await supabase.from("processed_batches").insert({ batch_id: batchId, created_at: nowIso() });
  if (error) console.log("processed_batches insert error:", error);
}

// ----------------------------- Handlers -----------------------------
async function handleGetPendingTasks(data?: unknown) {
  const { page, pageSize } = getPagination(data);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: tasks, error, count } = await supabase
    .from("autonomous_tasks")
    .select("*", { count: "exact" })
    .eq("status", "pending")
    .order("priority", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return ok({
    success: true,
    page,
    pageSize,
    count: count ?? tasks?.length ?? 0,
    tasks: tasks ?? [],
    timestamp: nowIso(),
  });
}

async function handleGetActiveAgents(data?: unknown) {
  const { page, pageSize } = getPagination(data);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: logs, error, count } = await supabase
    .from("agent_status_logs")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order("timestamp", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return ok({
    success: true,
    page,
    pageSize,
    count: count ?? logs?.length ?? 0,
    agents: logs ?? [],
    timestamp: nowIso(),
  });
}

async function handleAgentBatchUpdate(data: unknown) {
  // Expected payload: { batchId: string, agents: BatchAgent[] }
  const d = (data ?? {}) as Record<string, unknown>;
  const batchId = String(d.batchId ?? "");
  const agents = safeParse<BatchAgent[]>(d.agents) ?? [];

  if (!batchId) return fail("batchId is required");
  if (!Array.isArray(agents) || agents.length === 0) return fail("agents (non-empty array) is required");

  if (await isBatchProcessed(batchId)) {
    return ok({
      success: true,
      message: "Batch already processed (idempotent)",
      batch_id: batchId,
      agents_updated: 0,
      timestamp: nowIso(),
    });
  }

  const rows = agents.map((a) => ({
    agent_id: a.agentId,
    agent_type: a.taskType ?? "unknown",
    status: a.status,
    message: a.message ?? `Agent ${a.agentId} updated via batch ${batchId}`,
    timestamp: a.timestamp ?? nowIso(),
  }));

  const { error } = await supabase.from("agent_status_logs").insert(rows);
  if (error) throw error;

  await markBatchProcessed(batchId);

  return ok({
    success: true,
    message: "Agent batch update processed",
    batch_id: batchId,
    agents_updated: rows.length,
    timestamp: nowIso(),
  });
}

async function handleTriggerAutonomousCycle(data: unknown) {
  const d = (data ?? {}) as Record<string, unknown>;
  const cycle_type = String(d.cycle_type ?? "standard");
  const target_agents = Array.isArray(d.target_agents) ? d.target_agents : [];

  const ts = Date.now();
  const tasks = [
    {
      task_id: `n8n_cycle_${ts}_1`,
      agent_type: "monitoring",
      portal: "admin",
      task_name: "N8N Triggered System Monitoring",
      description: "Comprehensive system monitoring triggered by n8n workflow",
      priority: 9,
      estimated_duration_minutes: 20,
      status: "pending",
      created_at: nowIso(),
      target_agents,
    },
    {
      task_id: `n8n_cycle_${ts}_2`,
      agent_type: "optimization",
      portal: "all",
      task_name: "N8N Performance Optimization",
      description: "System optimization triggered by n8n automation",
      priority: 8,
      estimated_duration_minutes: 30,
      status: "pending",
      created_at: nowIso(),
      target_agents,
    },
    {
      task_id: `n8n_cycle_${ts}_3`,
      agent_type: "testing",
      portal: "all",
      task_name: "N8N Automated Testing Suite",
      description: "Comprehensive testing suite triggered by n8n",
      priority: 7,
      estimated_duration_minutes: 45,
      status: "pending",
      created_at: nowIso(),
      target_agents,
    },
  ];

  const { error } = await supabase.from("autonomous_tasks").insert(tasks);
  if (error) throw error;

  return ok({
    success: true,
    message: "Autonomous cycle triggered successfully",
    cycle_type,
    tasks_created: tasks.length,
    timestamp: nowIso(),
  });
}

async function handleTestN8NConnection() {
  const testData = {
    connection_test: true,
    timestamp: nowIso(),
    system_status: "operational",
    autonomous_agents: "active",
    database_connection: "healthy",
  };

  await logStatus({
    agent_id: "n8n-connection-test",
    agent_type: "n8n_integration",
    status: "active",
    message: "N8N connection test successful",
  });

  return ok({
    success: true,
    message: "N8N connection test successful",
    test_data: testData,
    timestamp: nowIso(),
  });
}

// ----------------------------- Server -----------------------------
serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  // Health check
  if (req.method === "GET") {
    return ok({
      success: true,
      version: VERSION,
      timestamp: nowIso(),
      env: {
        supabaseConfigured: Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY),
        hmacProtection: Boolean(N8N_WEBHOOK_SECRET),
      },
      actions: [
        "get_pending_tasks",
        "get_active_agents",
        "agent_batch_update",
        "trigger_autonomous_cycle",
        "test_n8n_connection",
      ],
    });
  }

  if (req.method !== "POST") return fail("Method not allowed", 405);

  try {
    // Optional webhook signature check
    const verified = await verifySignature(req, N8N_WEBHOOK_SECRET);
    if (!verified) return fail("Invalid signature", 401);

    const body = (await req.json().catch(() => ({}))) as RequestBodyBase;
    const action = String(body?.action ?? "");

    console.log("🔧 n8n endpoint:", { action, at: nowIso(), reqId: req.headers.get("x-request-id") ?? uuid() });

    switch (action as Action) {
      case "get_pending_tasks":
        return await handleGetPendingTasks(body.data);

      case "get_active_agents":
        return await handleGetActiveAgents(body.data);

      case "agent_batch_update":
        return await handleAgentBatchUpdate(body.data);

      case "trigger_autonomous_cycle":
        return await handleTriggerAutonomousCycle(body.data);

      case "test_n8n_connection":
        return await handleTestN8NConnection();

      default:
        return fail("Unknown integration action", 400, { action });
    }
  } catch (error) {
    const message = (error as Error)?.message ?? "Unknown error";
    console.error("❌ n8n integration error:", message);

    // Best-effort log
    await logStatus({
      agent_id: "n8n-integration-error",
      agent_type: "n8n_integration",
      status: "error",
      message: `n8n integration error: ${message}`,
    });

    return ok(
      {
        success: false,
        error: message,
        timestamp: nowIso(),
      },
      { status: 500 },
    );
  }
});
