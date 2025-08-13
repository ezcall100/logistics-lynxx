// supabase/functions/agent-router/index.ts
// Autonomous TMS Agent: task router + OpenAI planning + Supabase persistence
// Deno + Supabase Edge Function (TypeScript)

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ----------------------------- Meta -----------------------------
const VERSION = "2025-01-06";

// ----------------------------- Environment -----------------------------
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

// ----------------------------- Headers -----------------------------
const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "GET,POST,OPTIONS",
};

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "x-agent-router-version": VERSION,
};

// ----------------------------- Types -----------------------------
type AgentType =
  | "research"
  | "frontend"
  | "backend"
  | "database"
  | "testing"
  | "deployment";

interface AgentRequest {
  agentId: string;
  agentType: AgentType | string; // allow forward-compat
  task: string;
  context?: unknown;
  priority?: number; // 1..10
}

interface OpenAIChatResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
}

// ----------------------------- Helpers -----------------------------
const nowIso = () => new Date().toISOString();
const rid = () => crypto.randomUUID();

function log(event: string, data?: unknown) {
  if (data !== undefined) console.log(`[agent-router] ${event}`, data);
  else console.log(`[agent-router] ${event}`);
}

function ok(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    status: init.status ?? 200,
    headers: { ...CORS_HEADERS, ...JSON_HEADERS, ...(init.headers ?? {}) },
  });
}

function err(message: string, status = 400, details?: unknown) {
  return ok({ success: false, error: message, details, timestamp: nowIso() }, { status });
}

function validateRequest(input: unknown): { ok: true; value: Required<AgentRequest> } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid JSON body" };

  const agentId = String(input.agentId ?? "").trim();
  const agentType = String(input.agentType ?? "").trim();
  const task = String(input.task ?? "").trim();
  const priorityNum = Number.isFinite(input.priority) ? Number(input.priority) : 1;

  if (!agentId) return { ok: false, error: "agentId is required" };
  if (!agentType) return { ok: false, error: "agentType is required" };
  if (!task) return { ok: false, error: "task is required" };
  const priority = Math.max(1, Math.min(10, Math.round(priorityNum)));

  return { ok: true, value: { agentId, agentType, task, context: input.context ?? {}, priority } };
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// ----------------------------- Prompts -----------------------------
const SYSTEM_PROMPTS: Record<AgentType, string> = {
  research:
    `You are a Research Agent for Transportation Management Systems (TMS).
Analyze trends, competitors, and best practices; output actionable, prioritized insights.`,
  frontend:
    `You are a Frontend Agent (React+TS) for TMS.
Propose high-UX, accessible, performant UI solutions; include component structure and state/data shapes.`,
  backend:
    `You are a Backend Agent (Node/Edge/API) for TMS.
Design secure, scalable services, endpoints, and business logic; include schemas and rate limits.`,
  database:
    `You are a Database Agent (PostgreSQL/Supabase) for TMS.
Produce normalized schemas, indexes, RLS, and migration steps with performance justification.`,
  testing:
    `You are a Testing Agent (unit/integration/e2e) for TMS.
Deliver a thorough test plan with coverage focus, fixtures, and CI guidance.`,
  deployment:
    `You are a Deployment Agent (CI/CD/Cloud/Edge) for TMS.
Define pipelines, observability, rollbacks, and capacity planning.`,
};

function resolveSystemPrompt(agentType: string) {
  return SYSTEM_PROMPTS[agentType as AgentType] ??
    "You are an AI agent working on Transportation Management System development. Provide concise, implementable guidance.";
}

function buildUserPrompt(task: string, context: unknown, priority: number) {
  return `
TASK:
${task}

CONTEXT:
${JSON.stringify(context ?? {}, null, 2)}

PRIORITY: ${priority} (1=low, 10=critical)

TMS FOCUS AREAS:
- Rate Lookup & Dynamic Pricing
- Carrier Dispatch Optimization
- Load & Document Management
- Fleet Tracking & Telemetry
- Financial Integrations
- Security, Compliance, Observability

RESPONSE FORMAT:
1) Brief analysis (bulleted)
2) Recommended approach (with tradeoffs)
3) Implementation steps (ordered, incremental)
4) Risks & mitigations
5) Success metrics (measurable)
6) Next steps / dependencies
`.trim();
}

// ----------------------------- OpenAI -----------------------------
async function callOpenAI(systemPrompt: string, userPrompt: string) {
  if (!OPENAI_API_KEY) {
    return {
      mock: true,
      content:
        "Mock mode: set OPENAI_API_KEY to enable real completions. Here is a safe, structured outline you can use to proceed.",
    };
  }

  const payload = {
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 2000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${OPENAI_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json: OpenAIChatResponse = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(`OpenAI ${res.status} ${res.statusText} ${(json?.error?.message ?? "").trim()}`);
  }

  return { mock: false, content: json?.choices?.[0]?.message?.content ?? "" };
}

// Heuristic confidence: length + structure markers
function scoreConfidence(text: string) {
  const len = Math.min(text.length, 6000);
  const lengthScore = 0.5 + (len / 6000) * 0.4; // 0.5..0.9
  const hasLists = /(^|\n)\s*(\d+\)|-|\*)\s+/m.test(text) ? 0.05 : 0;
  const hasSections = /(analysis|approach|steps|risks|metrics|next)/i.test(text) ? 0.05 : 0;
  return Math.min(0.98, lengthScore + hasLists + hasSections); // cap
}

// ----------------------------- Persistence -----------------------------
async function persistResults(params: {
  agentId: string;
  agentType: string;
  task: string;
  context: unknown;
  priority: number;
  aiResponse: string;
  confidence: number;
  startedAt: number;
}) {
  const { agentId, agentType, task, context, priority, aiResponse, confidence, startedAt } = params;

  const responseMs = Date.now() - startedAt;
  const responseTime = Math.max(500, responseMs); // avoid 0ms for charts

  // parallel writes
  const [mem, decision, status] = await Promise.allSettled([
    supabase.from("agent_memory").insert({
      agent_id: agentId,
      goal: task,
      prompt: buildUserPrompt(task, context, priority),
      response: aiResponse,
      context,
      confidence,
      action_taken: "analysis_completed",
      outcome: "response_generated",
      created_at: nowIso(),
    }),
    supabase.from("ai_decisions").insert({
      decision_type: `${agentType}_task`,
      context: { agentId, task, priority },
      decision: { response: aiResponse, confidence, agent_type: agentType },
      confidence_score: confidence,
      implemented: false,
      created_at: nowIso(),
    }),
    supabase.from("agent_status_logs").insert({
      agent_id: agentId,
      agent_type: agentType,
      status: "completed",
      message: `Task completed with ${Math.round(confidence * 100)}% confidence`,
      timestamp: nowIso(),
      response_time: responseTime,
    }),
  ]);

  // best-effort errors to console only
  for (const [name, res] of [
    ["agent_memory", mem],
    ["ai_decisions", decision],
    ["agent_status_logs", status],
  ] as const) {
    if (res.status === "rejected") log(`⚠️ Write failed: ${name}`, res.reason);
    if (res.status === "fulfilled" && res.value.error) log(`⚠️ Write error: ${name}`, res.value.error);
  }

  return { responseTime };
}

async function logProcessing(agentId: string, agentType: string, task: string) {
  const { error } = await supabase.from("agent_status_logs").insert({
    agent_id: agentId,
    agent_type: agentType,
    status: "processing",
    message: `Processing task: ${task}`,
    timestamp: nowIso(),
  });
  if (error) log("⚠️ status log insert error", error);
}

async function maybeEnqueueAutonomousTask(params: {
  agentId: string;
  agentType: string;
  task: string;
  priority: number;
  confidence: number;
  aiResponse: string;
}) {
  const { agentId, agentType, task, priority, confidence, aiResponse } = params;
  const shouldAuto = priority >= 8 && confidence > 0.8;

  if (!shouldAuto) return false;

  const { error } = await supabase.from("autonomous_tasks").insert({
    task_id: `auto_${agentId}_${Date.now()}`,
    agent_type: agentType,
    portal: "all",
    task_name: task,
    description: `Autonomous task generated by ${agentType} agent`,
    priority,
    status: "pending",
    estimated_duration_minutes: 60,
    assigned_agent_id: agentId,
    result: { ai_response: aiResponse },
    created_at: nowIso(),
  });
  if (error) log("⚠️ autonomous task insert error", error);

  return true;
}

// ----------------------------- Server -----------------------------
serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });

  // Discovery
  if (req.method === "GET") {
    return ok({
      success: true,
      version: VERSION,
      timestamp: nowIso(),
      endpoints: { POST: "/ (process agent task)", GET: "/ (introspect)" },
      supportedAgentTypes: Object.keys(SYSTEM_PROMPTS),
      env: {
        supabaseConfigured: Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY),
        openaiConfigured: Boolean(OPENAI_API_KEY),
      },
    });
  }

  if (req.method !== "POST") return err("Method not allowed", 405);

  // Guard env
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return err("Supabase env not configured", 500);

  const startedAt = Date.now();
  const requestId = rid();

  try {
    const json = await req.json().catch(() => ({}));
    const val = validateRequest(json);
    if (!val.ok) return err(val.error, 400);

    const { agentId, agentType, task, context, priority } = val.value;

    log("🔄 agent request", { requestId, agentId, agentType, priority });

    await logProcessing(agentId, agentType, task);

    const systemPrompt = resolveSystemPrompt(agentType);
    const userPrompt = buildUserPrompt(task, context, priority);

    const completion = await callOpenAI(systemPrompt, userPrompt);
    const aiResponse = (completion.content ?? "").trim() || "No response generated.";
    const confidence = scoreConfidence(aiResponse);

    const { responseTime } = await persistResults({
      agentId,
      agentType,
      task,
      context,
      priority,
      aiResponse,
      confidence,
      startedAt,
    });

    const auto = await maybeEnqueueAutonomousTask({
      agentId,
      agentType,
      task,
      priority,
      confidence,
      aiResponse,
    });

    return ok({
      success: true,
      requestId,
      version: VERSION,
      timestamp: nowIso(),
      agentId,
      agentType,
      response: aiResponse,
      confidence,
      mock: completion.mock === true,
      metrics: { response_ms: responseTime },
      autonomous_execution: auto,
    });
  } catch (e) {
    log("❌ error", { requestId, error: String(e) });
    return err((e as Error)?.message ?? "Unknown error", 500);
  }
});
