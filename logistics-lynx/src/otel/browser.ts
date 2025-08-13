if (import.meta.env.VITE_OTEL_ENABLED === "true") {
  import("/* @vite-ignore */https://esm.sh/@opentelemetry/api@1.9.0").then(async ({ diag, DiagConsoleLogger, DiagLogLevel }) => {
    const [{ WebTracerProvider }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/sdk-trace-web@1.15.2?target=deno"),
    ]);
    const [{ BatchSpanProcessor }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/sdk-trace-base@1.25.1?target=deno"),
    ]);
    const [{ Resource }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/resources@1.25.1?target=deno"),
    ]);
    const [{ OTLPTraceExporter }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/exporter-trace-otlp-http@0.53.1?target=deno"),
    ]);
    const [{ W3CTraceContextPropagator }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/core@1.25.1?target=deno"),
    ]);
    const [{ FetchInstrumentation }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/instrumentation-fetch@0.53.1?target=deno"),
    ]);
    const [{ registerInstrumentations }] = await Promise.all([
      import("/* @vite-ignore */https://esm.sh/@opentelemetry/instrumentation@0.53.1?target=deno"),
    ]);

    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

    const provider = new WebTracerProvider({
      resource: new Resource({
        "service.name": import.meta.env.VITE_OTEL_SERVICE_NAME || "transbot-ai-web",
        "deployment.environment": import.meta.env.VITE_OTEL_ENVIRONMENT || "development",
      }),
    });

    const exporter = new OTLPTraceExporter({
      url: import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT,
    });

    provider.addSpanProcessor(new BatchSpanProcessor(exporter));
    provider.register({ propagator: new W3CTraceContextPropagator() });

    registerInstrumentations({
      tracerProvider: provider,
      instrumentations: [
        new FetchInstrumentation({
          propagateTraceHeaderCorsUrls: [/./], // add your domains if you want to restrict
        }),
      ],
    });

    console.log('✅ OpenTelemetry browser tracing initialized');
  }).catch(error => {
    console.warn('Failed to initialize OpenTelemetry browser tracing:', error);
  });
}
