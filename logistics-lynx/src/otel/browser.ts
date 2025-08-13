// OpenTelemetry browser configuration
// This is conditionally loaded only when VITE_OTEL_ENABLED is true
const otelEnabled = import.meta.env.VITE_OTEL_ENABLED === "true";

if (otelEnabled) {
  // Use dynamic imports with error handling to prevent build failures
  const initializeOtel = async () => {
    try {
      // Import OpenTelemetry packages dynamically
      const { diag, DiagConsoleLogger, DiagLogLevel } = await import("@opentelemetry/api");
      const { WebTracerProvider } = await import("@opentelemetry/sdk-trace-web");
      const { BatchSpanProcessor } = await import("@opentelemetry/sdk-trace-base");
      const { Resource } = await import("@opentelemetry/resources");
      const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");
      const { W3CTraceContextPropagator } = await import("@opentelemetry/core");
      const { FetchInstrumentation } = await import("@opentelemetry/instrumentation-fetch");
      const { registerInstrumentations } = await import("@opentelemetry/instrumentation");

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
    } catch (error) {
      console.warn('Failed to initialize OpenTelemetry browser tracing:', error);
      console.log('OpenTelemetry packages not available - continuing without tracing');
    }
  };

  // Initialize OpenTelemetry
  initializeOtel();
} else {
  console.log('OpenTelemetry disabled - set VITE_OTEL_ENABLED=true to enable');
}
