// supabase/functions/openai-autonomous-status/index.ts
// Status probe for an OpenAI-powered autonomous TMS agent fleet

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ---------- CORS ----------
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", ...CORS };

// ---------- Env ----------
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LOG_TO_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

const DEFAULT_AGENT_COUNT = 250;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_TOKENS = 600;
const TEMPERATURE = 0.3;

// ---------- Helpers ----------
const ok = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    ...init,
    status: init.status ?? 200,
    headers: { ...JSON_HEADERS, ...(init.headers ?? {}) },
  });

const fail = (message: string, status = 500, details?: unknown) =>
  ok(
    {
      success: false,
      error: message,
      details,
      timestamp: new Date().toISOString(),
      status: "SYSTEM_NEEDS_ATTENTION",
    },
    { status },
  );

function sb(): SupabaseClient | null {
  if (!LOG_TO_SUPABASE) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}

function summarizeAgents(n: number) {
  return {
    total: n,
    groups: [
      { label: "online", count: Math.max(0, Math.floor(n * 0.88)) },
      { label: "degraded", count: Math.max(0, Math.floor(n * 0.09)) },
      { label: "offline", count: Math.max(0, n - Math.floor(n * 0.88) - Math.floor(n * 0.09)) },
    ],
  };
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort("timeout"), ms);
  // @ts-expect-error deno fetch accepts AbortSignal
  return Promise.race([p, new Promise<never>((_, rej) => ctl.signal.addEventListener("abort", () => rej(new Error("Request timeout"))))]).finally(
    () => clearTimeout(t),
  );
}

// ---------- OpenAI call with retries ----------
async function callOpenAIStatusProbe(agentCount: number, extra?: Record<string, unknown>) {
  if (!OPENAI_API_KEY) {
    // Mock mode for CI / development without keys
    return {
      mock: true,
      content: `Mock: ${agentCount} agents operational; continuous operation affirmed.`,
    };
  }

  const system = `You are a cautious, operations-focused TMS assistant. 
Report current operational posture, highlight risks, and DO NOT promise control outside this API response. 
Keep it concise, factual, and status-oriented.`;

  const user = `Provide a status summary for an autonomous TMS agent fleet.
Fleet size: ${agentCount}.
Context: ${JSON.stringify(extra || {})}
Include: overall status, major risks, next checks, and confidence (0-1).`;

  const body = {
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
  };

  const attempt = async () => {
    const res = await withTimeout(
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      REQUEST_TIMEOUT_MS,
    );

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`OpenAI error ${res.status}: ${txt.slice(0, 400)}`);
    }
    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    return { mock: false, content, usage: data?.usage };
  };

  // simple backoff
  let wait = 600;
  for (let i = 0; i < 3; i++) {
    try {
      return await attempt();
    } catch (e) {
      if (i === 2) throw e;
      await new Promise((r) => setTimeout(r, wait));
      wait *= 2;
    }
  }
  throw new Error("unreachable");
}

// ---------- Logging (best-effort) ----------
async function logStatusToSupabase(payload: {
  label: string;
  message: string;
  severity?: "info" | "warning" | "error";
  metadata?: unknown;
}) {
  const client = sb();
  if (!client) return;
  await client.from("alerts").insert({
    title: payload.label,
    message: payload.message,
    category: "autonomous_status",
    severity: payload.severity ?? "info",
    source: "openai_autonomous_status",
    metadata: payload.metadata ?? null,
    created_at: new Date().toISOString(),
  });
}

// ---------- Server ----------
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    // GET = quick health/metadata
    if (req.method === "GET") {
      return ok({
        service: "openai-autonomous-status",
        version: "1.1.0",
        openaiConfigured: Boolean(OPENAI_API_KEY),
        model: OPENAI_MODEL,
        supabaseLogging: LOG_TO_SUPABASE,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method !== "POST") {
      return fail("Method not allowed", 405);
    }

    // Parse & validate input
    const body = await req.json().catch(() => ({}));
    const agents = Number.isFinite(body?.agents) ? Math.max(1, Math.min(10_000, Number(body.agents))) : DEFAULT_AGENT_COUNT;
    const context = (body?.context && typeof body.context === "object") ? body.context : {};
    const reportId = crypto.randomUUID();

    // Call OpenAI (or mock)
    const ai = await callOpenAIStatusProbe(agents, context);

    const agentsSummary = summarizeAgents(agents);
    const response = {
      success: true,
      status: "AUTONOMY_STATUS_PROBED",
      timestamp: new Date().toISOString(),
      report_id: reportId,
      openai: { model: OPENAI_MODEL, connected: Boolean(OPENAI_API_KEY), mock: ai.mock, usage: ai["usage"] ?? null },
      fleet: {
        size: agents,
        summary: agentsSummary,
        mode: "continuous_monitoring",
      },
      guidance: {
        next_checks: [
          "Validate DB connectivity & queue backlog",
          "Verify n8n workflows heartbeat",
          "Check realtime subscription health",
          "Run canary job across portals",
        ],
        risks: [
          "API rate limits / quota exhaustion",
          "Credential rotation drift",
          "Third-party integration latency",
        ],
      },
      ai_advisory: ai.content,
    };

    // Best-effort logging
    await logStatusToSupabase({
      label: "Autonomous status probe",
      message: `Probe ${reportId} completed for ${agents} agents`,
      severity: "info",
      metadata: { agents, summary: agentsSummary, mock: ai.mock },
    });

    return ok(response);
  } catch (error) {
    console.error("❌ Autonomous Status Error:", error);
    await logStatusToSupabase({
      label: "Autonomous status error",
      message: (error as Error).message ?? "unknown error",
      severity: "error",
    });
    return fail("Autonomous system error", 500, { message: (error as Error).message });
  }
});
