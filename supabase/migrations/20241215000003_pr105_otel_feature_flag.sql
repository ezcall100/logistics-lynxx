-- PR-105: OpenTelemetry Feature Flag
-- Enable OTEL tracing with hierarchical feature flag control

-- Enable OTEL globally (default: disabled for safety)
INSERT INTO public.feature_flags_v2(key, scope, value, reason, owner_name, created_at, updated_at)
VALUES (
  'obs.otelEnabled', 
  'global', 
  false, 
  'Enable OpenTelemetry end-to-end tracing globally', 
  'platform',
  NOW(),
  NOW()
) ON CONFLICT (key, scope, env, company_id) DO NOTHING;

-- Enable OTEL in staging environment
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason, owner_name, created_at, updated_at)
VALUES (
  'obs.otelEnabled', 
  'env', 
  'staging', 
  true, 
  'Enable OTEL tracing in staging environment for testing', 
  'platform',
  NOW(),
  NOW()
) ON CONFLICT (key, scope, env, company_id) DO NOTHING;

-- Enable OTEL in development environment
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason, owner_name, created_at, updated_at)
VALUES (
  'obs.otelEnabled', 
  'env', 
  'development', 
  true, 
  'Enable OTEL tracing in development environment', 
  'platform',
  NOW(),
  NOW()
) ON CONFLICT (key, scope, env, company_id) DO NOTHING;

-- Production remains disabled by default (enable manually when ready)
-- To enable in production, run:
-- UPDATE public.feature_flags_v2 
-- SET value = true, updated_at = NOW() 
-- WHERE key = 'obs.otelEnabled' AND scope = 'env' AND env = 'production';
