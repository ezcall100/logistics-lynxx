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
