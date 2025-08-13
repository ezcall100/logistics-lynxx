# PR-105: OpenTelemetry End-to-End Tracing Deployment Guide

## Overview

This PR implements vendor-agnostic OpenTelemetry (OTEL) end-to-end tracing with:
- **Edge Function Instrumentation**: Deno-safe OTLP/HTTP tracing
- **Browser Tracing**: Automatic fetch instrumentation
- **Feature Flag Control**: Hierarchical flag system (PR-101)
- **Zero Breaking Changes**: Safe rollout with gradual enablement

## Environment Configuration

### Server/Edge Functions (.env)
```ini
OTEL_ENABLED=true
OTEL_SERVICE_NAME=transbot-ai
OTEL_ENVIRONMENT=production
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel-collector.example.com/v1/traces
OTEL_EXPORTER_OTLP_HEADERS=x-honeycomb-team=...,authorization=Bearer ...
OTEL_SAMPLING_RATIO=0.05
```

### Web Application (.env.local)
```ini
VITE_OTEL_ENABLED=true
VITE_OTEL_SERVICE_NAME=transbot-ai-web
VITE_OTEL_ENVIRONMENT=production
VITE_OTEL_EXPORTER_OTLP_ENDPOINT=https://otel-collector.example.com/v1/traces
VITE_OTEL_SAMPLING_RATIO=0.05
```

## Feature Flag Setup

Enable OTEL using the hierarchical feature flag system:

```sql
-- Enable globally (optional)
INSERT INTO public.feature_flags_v2(key, scope, value, reason, owner_name)
VALUES ('obs.otelEnabled', 'global', true, 'Enable OTEL globally', 'platform');

-- Enable per environment (recommended)
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason, owner_name)
VALUES ('obs.otelEnabled', 'env', 'staging', true, 'Enable OTEL in staging', 'platform');

INSERT INTO public.feature_flags_v2(key, scope, env, value, reason, owner_name)
VALUES ('obs.otelEnabled', 'env', 'production', true, 'Enable OTEL in production', 'platform');
```

## Deployment Steps

### 1. Deploy Edge Functions
```bash
# Deploy shared OTEL helper
supabase functions deploy _shared

# Deploy instrumented agent-runner
supabase functions deploy agent-runner
```

### 2. Deploy Frontend
```bash
# Rebuild with OTEL browser tracing
cd logistics-lynx
npm run build
```

### 3. Verify Deployment
```bash
# Run verification script
./scripts/verify-otel.sh
```

## Architecture Components

### Edge Function Tracing (`supabase/functions/_shared/otel.ts`)
- **Deno-compatible**: Uses esm.sh with `?target=deno`
- **OTLP/HTTP**: Vendor-agnostic protocol
- **Context Propagation**: W3C trace context headers
- **Batch Processing**: Efficient span batching

### Browser Tracing (`logistics-lynx/src/otel/browser.ts`)
- **Automatic Instrumentation**: Fetch API tracing
- **Dynamic Imports**: Conditional loading based on env vars
- **CORS Support**: Configurable domain restrictions
- **Performance Optimized**: Minimal bundle impact

### Feature Flag Integration (`supabase/functions/_shared/flags.ts`)
- **Hierarchical Resolution**: Global → Environment → Company
- **Safe Defaults**: Graceful fallback to disabled state
- **Error Handling**: Non-blocking flag resolution

## Verification Checklist

### ✅ Edge Function Spans
- [ ] `agent-runner.handle` spans appear in OTEL backend
- [ ] Attributes: `app.task_id`, `app.fn_name`, `app.company_id`
- [ ] Events: `task_completed` with status information
- [ ] Error handling: Exceptions recorded in spans

### ✅ Browser Spans
- [ ] `service.name=transbot-ai-web` spans visible
- [ ] Fetch requests automatically traced
- [ ] W3C headers propagated to backend
- [ ] Page load performance metrics captured

### ✅ Feature Flag Control
- [ ] OTEL disabled when `obs.otelEnabled=false`
- [ ] Environment-specific flag resolution works
- [ ] No errors when flag resolution fails
- [ ] Graceful fallback to disabled state

### ✅ Performance Impact
- [ ] No regression in Live Feed metrics
- [ ] Edge function response times unchanged
- [ ] Browser bundle size increase < 50KB
- [ ] Sampling rate controls trace volume

## Troubleshooting

### No Traces Appearing
1. **Check Environment Variables**: Verify OTEL_ENABLED=true
2. **Verify Feature Flag**: `SELECT * FROM feature_flags_v2 WHERE key = 'obs.otelEnabled'`
3. **Check Endpoint**: Ensure OTEL_EXPORTER_OTLP_ENDPOINT is accessible
4. **Review Headers**: Verify authentication headers if required

### Browser Tracing Issues
1. **Check Vite Config**: Ensure `@vite-ignore` comments work
2. **CORS Issues**: Verify domain restrictions in FetchInstrumentation
3. **Bundle Size**: Check for OpenTelemetry modules in build output
4. **Console Errors**: Look for OTEL initialization errors

### Edge Function Errors
1. **Import Issues**: Verify esm.sh URLs are accessible
2. **Deno Compatibility**: Check for `?target=deno` parameters
3. **Memory Usage**: Monitor for excessive span accumulation
4. **Network Issues**: Check OTLP endpoint connectivity

## Rollback Plan

### Immediate Disable
```sql
-- Disable OTEL immediately
UPDATE public.feature_flags_v2 
SET value = false 
WHERE key = 'obs.otelEnabled';
```

### Environment Variables
```bash
# Set to false in environment
OTEL_ENABLED=false
VITE_OTEL_ENABLED=false
```

### Code Rollback
```bash
# Revert to previous agent-runner version
git checkout HEAD~1 -- supabase/functions/agent-runner/index.ts

# Remove browser OTEL import
# Remove import '@/otel/browser' from main.tsx
```

## Monitoring & Alerts

### Key Metrics to Monitor
- **Trace Volume**: Spans per minute by service
- **Error Rate**: Failed span exports
- **Latency Impact**: Response time changes
- **Memory Usage**: Span processor memory consumption

### Alert Thresholds
- **High Error Rate**: >5% span export failures
- **Memory Spike**: >100MB span processor memory
- **Latency Degradation**: >20% response time increase
- **Missing Traces**: Zero spans for >5 minutes

## Next Steps

### PR-106: CI "Secure-by-Default" Bundle
- Automated security scanning
- Dependency vulnerability checks
- Secure deployment pipelines

### Super-Admin Traces Page
- Deep-link integration with OTEL backend
- Trace ID lookup and display
- Performance analytics dashboard
- Error correlation tools

## Support

For issues or questions:
1. Check this deployment guide
2. Review OTEL backend documentation
3. Consult feature flag system (PR-101)
4. Contact platform team

---

**Status**: ✅ Ready for deployment
**Risk Level**: 🟢 Low (feature-flagged, gradual rollout)
**Testing**: ✅ Verified in staging environment
