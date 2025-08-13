# PR-107: Super-Admin Traces Page

## Overview

PR-107 implements a Super-Admin "Traces" page that provides deep-linking into your OTEL backend. This feature-flagged, vendor-agnostic solution allows operations teams to quickly navigate from application data to distributed traces for debugging and monitoring.

## 🎯 Key Features

### 🔗 Deep-Link Integration
- **Vendor-Agnostic**: Supports any OTEL backend (Jaeger, Tempo, Honeycomb, etc.)
- **Configurable Templates**: URL templates for custom trace link formats
- **Fallback Support**: Base URL + standard path fallback

### 🛡️ Security & Access Control
- **Super-Admin Only**: Restricted to super-admin users
- **Feature Flagged**: `obs.tracesPageEnabled` controls visibility
- **Cross-Tenant Access**: Secure RPC with proper authorization

### 📊 Trace Data Management
- **Automatic Capture**: Trace IDs stored in `agent_tasks` and `agent_logs`
- **Recent Traces View**: Last 24 hours with configurable time ranges
- **Filtering**: By company ID and time period

## 📁 New Files Added

### Database
- `supabase/migrations/20241215_0107_pr107_traces.sql` - Database schema and RPC functions

### Backend
- `supabase/functions/_shared/otel.ts` - Enhanced with `getTraceId()` helper
- `supabase/functions/agent-runner/index.ts` - Updated to capture and store trace IDs

### Frontend
- `logistics-lynx/src/lib/otelLinks.ts` - Trace link builder utility
- `logistics-lynx/src/pages/super-admin/traces/index.tsx` - Super-Admin Traces page

### Documentation
- `docs/pr107-traces-page.md` - This comprehensive guide

## 🚀 Quick Start

### 1. Deploy Database Changes

```bash
# Apply the migration
supabase db push
```

### 2. Deploy Backend Updates

```bash
# Deploy agent-runner with trace ID capture
supabase functions deploy agent-runner
```

### 3. Configure Environment Variables

Add to your `.env` or `.env.local`:

```bash
# Option 1: URL Template (preferred)
VITE_TRACES_URL_TEMPLATE=https://otel.yourcompany.com/trace/{TRACE_ID}

# Option 2: Base URL (fallback)
VITE_OTEL_UI_BASE=https://otel.yourcompany.com
```

### 4. Enable Feature Flag

```sql
-- Enable in staging first
UPDATE public.feature_flags_v2 
SET value = true 
WHERE key = 'obs.tracesPageEnabled' AND scope = 'global';
```

### 5. Deploy Frontend

```bash
npm run build && npm run deploy
```

## 🔧 Configuration

### Environment Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `VITE_TRACES_URL_TEMPLATE` | string | URL template with `{TRACE_ID}` placeholder | `https://otel.example.com/trace/{TRACE_ID}` |
| `VITE_OTEL_UI_BASE` | string | Base URL for fallback trace links | `https://otel.example.com` |

### Vendor-Specific Templates

Common OTEL backend templates:

```bash
# Jaeger
VITE_TRACES_URL_TEMPLATE=http://localhost:16686/trace/{TRACE_ID}

# Tempo
VITE_TRACES_URL_TEMPLATE=http://localhost:3200/trace/{TRACE_ID}

# Honeycomb
VITE_TRACES_URL_TEMPLATE=https://ui.honeycomb.io/{DATASET}/datasets/{TRACE_ID}

# Grafana Cloud
VITE_TRACES_URL_TEMPLATE=https://grafana.example.com/explore?orgId=1&left=%5B%22now-1h%22,%22now%22,%22tempo%22,%7B%22query%22:%22%7BTRACE_ID%7D%22%7D%5D

# Datadog
VITE_TRACES_URL_TEMPLATE=https://app.datadoghq.com/apm/trace/{TRACE_ID}
```

## 📊 Database Schema

### New Columns

```sql
-- agent_tasks table
ALTER TABLE public.agent_tasks ADD COLUMN trace_id text;
CREATE INDEX idx_agent_tasks_trace ON public.agent_tasks(trace_id);

-- agent_logs table  
ALTER TABLE public.agent_logs ADD COLUMN trace_id text;
CREATE INDEX idx_agent_logs_trace ON public.agent_logs(trace_id);
```

### New Functions

```sql
-- Super-admin check
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.role = 'super_admin'
  );
$$;

-- Recent traces view
CREATE OR REPLACE VIEW public.v_recent_traces AS
SELECT t.company_id, t.id as task_id, t.fn_name, t.status, t.updated_at, t.trace_id
FROM public.agent_tasks t
WHERE t.updated_at > now() - interval '24 hours' AND t.trace_id IS NOT NULL
UNION ALL
SELECT l.company_id, l.task_id, null::text as fn_name, 'log'::text as status, l.ts as updated_at, l.trace_id
FROM public.agent_logs l
WHERE l.ts > now() - interval '24 hours' AND l.trace_id IS NOT NULL;

-- Admin RPC function
CREATE OR REPLACE FUNCTION public.admin_recent_traces(
  _company uuid DEFAULT null,
  _since interval DEFAULT '24 hours'
)
RETURNS TABLE(company_id uuid, task_id uuid, fn_name text, status text, updated_at timestamptz, trace_id text)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NOT is_super_admin() THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  RETURN QUERY
  SELECT company_id, task_id, fn_name, status, updated_at, trace_id
  FROM v_recent_traces
  WHERE updated_at > now() - _since
    AND (_company IS NULL OR company_id = _company)
  ORDER BY updated_at DESC
  LIMIT 500;
END $$;
```

## 🎨 Frontend Components

### Trace Link Builder

```typescript
// Build trace deep-links for any vendor
export function buildTraceLink(traceId?: string | null): string | null {
  if (!traceId) return null;
  
  // Try URL template first
  const tmpl = import.meta.env.VITE_TRACES_URL_TEMPLATE || "";
  if (tmpl.includes("{TRACE_ID}")) {
    return tmpl.replace("{TRACE_ID}", traceId);
  }
  
  // Fallback to base URL
  const base = import.meta.env.VITE_OTEL_UI_BASE || "";
  if (base) {
    return `${base.replace(/\/+$/, '')}/trace/${traceId}`;
  }
  
  return null;
}
```

### Super-Admin Traces Page

Features:
- **Feature Flag Gated**: Only visible when `obs.tracesPageEnabled` is true
- **Company Filtering**: Filter traces by specific company ID
- **Time Range Selection**: 15 minutes to 7 days
- **Status Badges**: Color-coded status indicators
- **Deep Links**: Click trace IDs to open in OTEL backend
- **Responsive Design**: Works on desktop and mobile

## 🔍 Usage Examples

### 1. View Recent Traces

Navigate to `/super-admin/traces` and see:
- All traces from the last 24 hours
- Company ID, task ID, function name, status
- Clickable trace IDs that open in your OTEL backend

### 2. Filter by Company

Enter a company UUID to see only traces for that tenant:
```
Company ID: 123e4567-e89b-12d3-a456-426614174000
```

### 3. Adjust Time Range

Select different time periods:
- 15 minutes (for recent issues)
- 1 hour (for current session)
- 24 hours (default)
- 7 days (for historical analysis)

### 4. Debug with Deep Links

1. Find a failed task in the traces table
2. Click the trace ID link
3. Opens your OTEL backend showing the full trace
4. Analyze spans, errors, and performance

## 🛡️ Security Considerations

### Access Control
- **Super-Admin Only**: Page requires `super_admin` role
- **Database Level**: RPC function checks permissions
- **Feature Flag**: Can be disabled without code changes

### Data Privacy
- **Cross-Tenant Access**: Super-admins can see all company traces
- **Trace ID Only**: No sensitive data in trace IDs
- **Audit Trail**: All access logged through Supabase

### Environment Isolation
- **Staging/Production**: Separate feature flags per environment
- **URL Templates**: Environment-specific OTEL backends
- **Data Retention**: Traces follow your OTEL backend retention policy

## 🔧 Troubleshooting

### Common Issues

#### Trace Links Not Working
```bash
# Check environment variable
echo $VITE_TRACES_URL_TEMPLATE

# Verify template format
# Should contain {TRACE_ID} placeholder
```

#### No Traces Showing
```bash
# Check if OTEL is enabled
SELECT value FROM public.feature_flags_v2 WHERE key = 'obs.otelEnabled';

# Verify trace IDs are being captured
SELECT trace_id FROM public.agent_tasks WHERE trace_id IS NOT NULL LIMIT 5;
```

#### Permission Denied
```bash
# Check user role
SELECT role FROM public.profiles WHERE user_id = auth.uid();

# Verify feature flag
SELECT value FROM public.feature_flags_v2 WHERE key = 'obs.tracesPageEnabled';
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=pr107:traces

# Check browser console for trace link generation
```

## 📈 Monitoring & Metrics

### Key Metrics to Track

1. **Trace Link Clicks**: Usage of deep-link functionality
2. **Page Load Times**: Performance of traces page
3. **Error Rates**: Failed trace link generations
4. **User Adoption**: Super-admin usage patterns

### Dashboard Setup

Create a monitoring dashboard for:
- Traces page access frequency
- Most clicked trace links
- Common filtering patterns
- Error rates and performance

## 🔄 Migration Guide

### From No Traces Page

1. **Deploy Database**:
   ```bash
   supabase db push
   ```

2. **Deploy Backend**:
   ```bash
   supabase functions deploy agent-runner
   ```

3. **Configure Environment**:
   ```bash
   # Add to .env
   VITE_TRACES_URL_TEMPLATE=https://your-otel-backend.com/trace/{TRACE_ID}
   ```

4. **Enable Feature Flag**:
   ```sql
   UPDATE public.feature_flags_v2 
   SET value = true 
   WHERE key = 'obs.tracesPageEnabled';
   ```

5. **Deploy Frontend**:
   ```bash
   npm run build && npm run deploy
   ```

### Rollback Plan

If issues arise:

```bash
# Disable feature flag
UPDATE public.feature_flags_v2 
SET value = false 
WHERE key = 'obs.tracesPageEnabled';

# Revert database (if needed)
supabase db reset --linked
```

## 🎯 Next Steps

### Immediate Actions (Week 1)
1. ✅ Deploy PR-107 to staging
2. ✅ Configure OTEL backend URL template
3. ✅ Test trace ID capture and storage
4. ✅ Validate deep-link functionality

### Short Term (Week 2-4)
1. 🔄 Train operations team on traces page
2. 🔄 Set up monitoring and alerting
3. 🔄 Optimize trace link templates
4. 🔄 Add trace ID to error notifications

### Long Term (Month 2-3)
1. 🚀 Integrate with Slack error pings
2. 🚀 Add trace ID to DLQ admin table
3. 🚀 Implement trace analytics dashboard
4. 🚀 Add trace correlation to logs

## 📞 Support

For questions or issues with PR-107:

1. **Documentation**: Check this guide first
2. **GitHub Issues**: Create an issue with `pr107` label
3. **Operations Team**: Contact ops team for trace debugging
4. **Slack**: Use `#traces-debugging` channel

---

**PR-107 Status**: ✅ Ready for deployment  
**Security Level**: 🔒 Super-admin restricted  
**Vendor Support**: 🌐 Any OTEL backend  
**Last Updated**: 2024-12-15
