// supabase/functions/coding-assistant/index.ts
// Deno + Supabase Edge Function: Context-aware coding assistant for a TMS stack

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ----------------------------- Config -----------------------------
const VERSION = "2025-01-06";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Model: small, fast, and cheap. Swap to 'gpt-4o' if you need richer reasoning.
const OPENAI_MODEL = "gpt-4o-mini";

// ----------------------------- Clients -----------------------------
const supabase = (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

// ----------------------------- Headers -----------------------------
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "GET,POST,OPTIONS",
};
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "x-coding-assistant-version": VERSION,
};

// ----------------------------- Types -----------------------------
type CodeType =
  | "react"
  | "typescript"
  | "node"
  | "sql"
  | "supabase"
  | "tailwind"
  | "testing"
  | "general";

interface AssistantInput {
  prompt: string;
  context?: unknown;
  codeType?: CodeType | string;
  userRole?: string;
  currentFile?: string;
  errorMessage?: string;
}

interface OpenAIChatResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
  usage?: unknown;
}

// ----------------------------- Utils -----------------------------
const nowIso = () => new Date().toISOString();

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

function safePreview(s?: string, len = 180) {
  if (!s) return "";
  return s.length > len ? `${s.slice(0, len)}…` : s;
}

function validate(input: unknown): { ok: true; value: Required<AssistantInput> } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid JSON body" };
  const prompt = String(input.prompt ?? "").trim();
  if (!prompt) return { ok: false, error: "Field 'prompt' is required" };

  const codeType = (input.codeType ?? "general") as string;
  const userRole = String(input.userRole ?? "developer");
  const context = input.context ?? {};
  const currentFile = typeof input.currentFile === "string" ? input.currentFile : "";
  const errorMessage = typeof input.errorMessage === "string" ? input.errorMessage : "";

  return { ok: true, value: { prompt, codeType, userRole, context, currentFile, errorMessage } };
}

function buildSystemPrompt(payload: Required<AssistantInput>) {
  const { userRole, codeType, context, currentFile, errorMessage } = payload;

  const base = `You are an expert coding assistant specialized in Transportation Management Systems (TMS).
You provide concise, practical code solutions and explanations.

Stack Context:
- Primary: React, TypeScript, Tailwind CSS, Supabase, Node.js
- Secondary: SQL (PostgreSQL), testing, deployment (Vite), shadcn/ui

User Role: ${userRole}
Code Type: ${codeType}

Guidelines:
- Write clean, production-ready code with TypeScript types
- Prefer functional React patterns and hooks
- Use Tailwind classes; keep styles semantic and accessible
- Be pragmatic: show only the essential code; include comments for tricky parts
- When debugging: (1) explain cause, (2) show minimal fix, (3) add guard rails
- Include error handling where it matters
- Keep responses concise but complete`;

  const extras: string[] = [];
  if (context && Object.keys(context as object).length) {
    extras.push(`Additional Context:\n${JSON.stringify(context, null, 2)}`);
  }
  if (currentFile) {
    // Provide trimmed file content to the model, but warn about size.
    const trimmed = currentFile.length > 12000 ? `${currentFile.slice(0, 12000)}\n/* truncated */` : currentFile;
    extras.push(`Current File Content:\n${trimmed}`);
  }
  if (errorMessage) {
    extras.push(`Error to Debug:\n${errorMessage}`);
  }

  return [base, ...extras].join("\n\n");
}

// Simple heuristic confidence
function scoreConfidence(text: string) {
  const l = Math.min(text.length, 6000);
  const lengthScore = 0.5 + (l / 6000) * 0.4; // 0.5..0.9
  const hasCodeFence = /```/.test(text) ? 0.04 : 0;
  const hasSections = /(fix|solution|why|steps|code)/i.test(text) ? 0.04 : 0;
  const hasTypes = /:\s*[A-Z][A-Za-z0-9_<>?,\s[\]]+/.test(text) ? 0.02 : 0;
  return Math.min(0.98, lengthScore + hasCodeFence + hasSections + hasTypes);
}

// ----------------------------- OpenAI -----------------------------
async function callOpenAI(systemPrompt: string, userPrompt: string) {
  if (!OPENAI_API_KEY) {
    return { mock: true, content: `Mock mode enabled (no OPENAI_API_KEY).
Here's a suggested outline:\n\n- Analysis\n- Root cause / constraints\n- Minimal fix\n- Final code block\n- Tests / follow-ups` };
  }

  const body = {
    model: OPENAI_MODEL,
    temperature: 0.2,
    max_tokens: 2000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${OPENAI_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const json: OpenAIChatResponse = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || `${res.status} ${res.statusText}`;
    throw new Error(`OpenAI API error: ${msg}`);
  }

  const content = json?.choices?.[0]?.message?.content ?? "";
  return { mock: false, content, usage: (json as { usage?: unknown })?.usage };
}

// ----------------------------- Telemetry (optional) -----------------------------
async function logRequest(payload: Required<AssistantInput>, requestId: string) {
  if (!supabase) return;
  const { error } = await supabase.from("assistant_logs").insert({
    request_id: requestId,
    code_type: payload.codeType,
    user_role: payload.userRole,
    has_error: Boolean(payload.errorMessage),
    created_at: nowIso(),
  });
  if (error) console.log("assistant_logs insert error:", error);
}

async function logOutcome(requestId: string, confidence: number) {
  if (!supabase) return;
  const { error } = await supabase.from("assistant_logs").update({
    completed_at: nowIso(),
    confidence,
  }).eq("request_id", requestId);
  if (error) console.log("assistant_logs update error:", error);
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
        openaiConfigured: Boolean(OPENAI_API_KEY),
        supabaseConfigured: Boolean(supabase),
      },
      usage: {
        POST: {
          path: "/",
          body: {
            prompt: "string (required)",
            context: "any",
            codeType: "react|typescript|node|sql|supabase|tailwind|testing|general",
            userRole: "string",
            currentFile: "string",
            errorMessage: "string",
          },
        },
      },
    });
  }

  if (req.method !== "POST") return fail("Method not allowed", 405);

  const requestId = crypto.randomUUID();

  try {
    const json = await req.json().catch(() => ({}));
    const validated = validate(json);
    if (!validated.ok) return fail(validated.error, 400);

    const payload = validated.value;

    // Safe server logs (avoid dumping full file contents)
    console.log("Coding Assistant Request:", {
      requestId,
      codeType: payload.codeType,
      userRole: payload.userRole,
      hasError: Boolean(payload.errorMessage),
      currentFilePreview: safePreview(payload.currentFile, 120),
    });

    await logRequest(payload, requestId);

    const systemPrompt = buildSystemPrompt(payload);

    const { mock, content, usage } = await callOpenAI(systemPrompt, payload.prompt);

    const confidence = scoreConfidence(content);

    await logOutcome(requestId, confidence);

    console.log("Assistant Response preview:", safePreview(content, 220));

    return ok({
      success: true,
      requestId,
      version: VERSION,
      response: content,
      confidence,
      mock,
      usage: usage ?? undefined,
      timestamp: nowIso(),
    });
  } catch (e) {
    console.error("coding-assistant error:", e);
    return ok(
      {
        success: false,
        error: (e as Error)?.message ?? "Unknown error",
        details: "Failed to process coding assistance request",
        timestamp: nowIso(),
      },
      { status: 500 },
    );
  }
});
