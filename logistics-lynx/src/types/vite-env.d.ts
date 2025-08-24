/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_USE_SUPABASE: string
  readonly VITE_OTEL_ENABLED: string
  readonly VITE_OTEL_SERVICE_NAME: string
  readonly VITE_OTEL_ENVIRONMENT: string
  readonly VITE_OTEL_EXPORTER_OTLP_ENDPOINT: string
  readonly VITE_TRACES_URL_TEMPLATE: string
  readonly VITE_OTEL_UI_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
