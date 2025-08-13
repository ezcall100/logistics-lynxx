// Deno-friendly OpenTelemetry setup (OTLP/HTTP)
import { diag, DiagConsoleLogger, DiagLogLevel, context as otCtx, propagation, trace, SpanStatusCode } from "https://esm.sh/@opentelemetry/api@1.9.0";
import { BasicTracerProvider, BatchSpanProcessor } from "https://esm.sh/@opentelemetry/sdk-trace-base@1.25.1?target=deno";
import { Resource } from "https://esm.sh/@opentelemetry/resources@1.25.1?target=deno";
import { W3CTraceContextPropagator } from "https://esm.sh/@opentelemetry/core@1.25.1?target=deno";
import { OTLPTraceExporter } from "https://esm.sh/@opentelemetry/exporter-trace-otlp-http@0.53.1?target=deno";

let initialized = false;

export function initTracerIfEnabled(flagEnabled: boolean) {
  if (initialized || !flagEnabled || Deno.env.get("OTEL_ENABLED") !== "true") return;

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

  const resource = new Resource({
    "service.name": Deno.env.get("OTEL_SERVICE_NAME") || "transbot-ai",
    "deployment.environment": Deno.env.get("OTEL_ENVIRONMENT") || "development",
    "telemetry.sdk.language": "deno",
  });

  const provider = new BasicTracerProvider({ resource });
  const headers = Object.fromEntries(
    (Deno.env.get("OTEL_EXPORTER_OTLP_HEADERS") || "")
      .split(",")
      .map((kv) => kv.trim())
      .filter(Boolean)
      .map((kv) => {
        const i = kv.indexOf("=");
        return i > 0 ? [kv.slice(0, i).trim(), kv.slice(i + 1).trim()] : [kv, ""];
      }),
  );

  const exporter = new OTLPTraceExporter({
    url: Deno.env.get("OTEL_EXPORTER_OTLP_ENDPOINT"),
    headers,
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register({
    propagator: new W3CTraceContextPropagator(),
  });

  initialized = true;
}

export function tracer() {
  return trace.getTracer(Deno.env.get("OTEL_SERVICE_NAME") ?? "transbot-ai");
}

export function getTracer() {
  return trace.getTracer(Deno.env.get("OTEL_SERVICE_NAME") ?? "transbot-ai");
}

// Extract incoming trace context from Request headers
export function ctxFromRequest(req: Request) {
  const carrier: Record<string, string> = {};
  req.headers.forEach((v, k) => (carrier[k.toLowerCase()] = v));
  return propagation.extract(otCtx.active(), carrier);
}

// Helper to run a function inside a span
export async function withSpan<T>(
  name: string,
  req: Request | null,
  fn: (span: import("https://esm.sh/@opentelemetry/api@1.9.0").Span) => Promise<T> | T,
) {
  const parent = req ? ctxFromRequest(req) : otCtx.active();
  const span = tracer().startSpan(name, undefined, parent);
  try {
    const result = await fn(span);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (e) {
    span.recordException(e as Error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: (e as Error)?.message });
    throw e;
  } finally {
    span.end();
  }
}

// Inject traceparent header on outgoing fetch
export function injectHeaders(init?: RequestInit): RequestInit {
  const carrier: Record<string, string> = {};
  propagation.inject(otCtx.active(), carrier);
  return {
    ...(init || {}),
    headers: { ...(init?.headers || {}), ...carrier },
  };
}

// Get current trace ID for storage
export async function getTraceId(): Promise<string | null> {
  try {
    // Deno + npm interop; safe if OTEL is disabled
    const api = await import("npm:@opentelemetry/api");
    const span = api.trace.getSpan(api.context.active());
    return span?.spanContext().traceId ?? null;
  } catch {
    return null;
  }
}

// PII-safe sanitizer (noop for non-PII fields)
export function sanitizeAttrs<T extends Record<string, unknown>>(obj?: T): T {
  const clone = structuredClone(obj ?? {}) as any;
  if (clone?.email)   clone.email   = "[redacted]";
  if (clone?.doc_url) clone.doc_url = "[redacted]";
  if (clone?.name)    clone.name    = "[redacted]";
  return clone as T;
}

export function setHttpAttrs(span: Span, code: number, route = "agent-runner") {
  span.setAttribute("http.route", route);
  span.setAttribute("http.response.status_code", code);
}

export function markOk(span: Span, msg?: string) {
  if (msg) span.addEvent("ok", { message: msg });
  span.setStatus({ code: SpanStatusCode.OK });
}

export function markError(span: Span, err: unknown, extra?: Record<string, unknown>) {
  const e = err instanceof Error ? err : new Error(String(err));
  // OTEL recommended: recordException + ERROR status
  span.recordException(e, sanitizeAttrs(extra));
  span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
  span.addEvent("exception.recorded", { message: e.message });
}

// Canonical span names (short, action-first, consistent)
export const spanNames = {
  agent: {
    task: {
      execute: "agent.task.execute",
      claim:   "agent.task.claim",
      update:  "agent.task.update",
    },
    fn: (fnName: string) => `agent.fn.${fnName}`, // e.g. agent.fn.rates.price_one
  },
};

// Common attributes for agent traces (PII-safe)
export function agentAttrs(input: {
  env?: string;
  companyId?: string;
  taskId?: string;
  fnName?: string;
  runner?: "edge" | "worker" | "cron";
  component?: string; // default: "agent-runner"
}) {
  return {
    "service.name": Deno.env.get("OTEL_SERVICE_NAME") || "transbot-edge",
    "deployment.environment": input.env ?? (Deno.env.get("DEPLOY_ENV") || "production"),
    "tenant.id": input.companyId ?? "",
    "agent.task_id": input.taskId ?? "",
    "agent.fn_name": input.fnName ?? "",
    "agent.runner": input.runner ?? "edge",
    "code.component": input.component ?? "agent-runner",
    // OTEL semconv-aligned hints
    "otel.library.name": "transbot-otel",
    "otel.library.version": "1",
  };
}
