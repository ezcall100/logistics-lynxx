# PR-107.1: Slack Error Pings with Trace Links

## Overview

PR-107.1 extends PR-107 by adding trace ID deep-links to Slack error notifications and the DLQ Admin UI. This enables one-click debugging from error notifications directly to your OTEL backend.

## 🎯 Key Features

### 🔗 Slack Integration
- **Trace Links in Notifications**: Failed agent tasks include trace IDs and deep-links
- **Interactive Buttons**: "Open Trace" button in Slack messages
- **Fallback Support**: Graceful degradation when trace links aren't available
- **Vendor-Agnostic**: Works with any OTEL backend

### 🛠️ DLQ Admin Enhancement
- **Trace Column**: New trace ID column in DLQ admin table
- **Deep-Links**: Clickable trace IDs that open in OTEL backend
- **Backwards Compatible**: Gracefully handles missing trace IDs

### 🔧 Server-Side Trace Links
- **Edge Function Support**: Deno-compatible trace link builder
- **Environment Configuration**: Server-side URL templates
- **Consistent Behavior**: Matches web-side trace link generation

## 📁 New Files Added

### Backend
- `supabase/functions/_shared/trace_link.ts` - Deno/Edge-safe trace link builder
- `supabase/functions/agent-runner/lib/slack.ts` - Enhanced Slack error notifications

### Database
- `supabase/migrations/20241215_0108_pr107_1_dlq_trace_links.sql` - DLQ admin trace_id support

### Frontend
- Enhanced `logistics-lynx/src/pages/super-admin/dlq/index.tsx` - Added trace links

### Documentation
- `docs/pr107_1-slack-trace-links.md` - This comprehensive guide

## 🚀 Quick Start

### 1. Deploy Database Changes

```bash
# Apply the migration
supabase db push
```

### 2. Deploy Backend Updates

```bash
# Deploy agent-runner with Slack trace links
supabase functions deploy agent-runner
```

### 3. Configure Environment Variables

Add to your `.env` or `.env.local`:

```bash
# Server-side trace link template (for Slack notifications)
OTEL_TRACES_URL_TEMPLATE=https://otel.yourcompany.com/trace/{TRACE_ID}

# Or fallback base URL
OTEL_UI_BASE=https://otel.yourcompany.com

# Web-side trace link template (already configured in PR-107)
VITE_TRACES_URL_TEMPLATE=https://otel.yourcompany.com/trace/{TRACE_ID}
```

### 4. Deploy Frontend

```bash
npm run build && npm run deploy
```

## 🔧 Configuration

### Environment Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `OTEL_TRACES_URL_TEMPLATE` | string | Server-side URL template | `https://otel.example.com/trace/{TRACE_ID}` |
| `OTEL_UI_BASE` | string | Server-side base URL fallback | `https://otel.example.com` |
| `N8N_AGENT_LOG_WEBHOOK` | string | Slack webhook URL | `https://hooks.slack.com/...` |

### Vendor-Specific Templates

Common OTEL backend templates for server-side:

```bash
# Jaeger
OTEL_TRACES_URL_TEMPLATE=http://localhost:16686/trace/{TRACE_ID}

# Tempo
OTEL_TRACES_URL_TEMPLATE=http://localhost:3200/trace/{TRACE_ID}

# Honeycomb
OTEL_TRACES_URL_TEMPLATE=https://ui.honeycomb.io/{DATASET}/datasets/{TRACE_ID}

# Grafana Cloud
OTEL_TRACES_URL_TEMPLATE=https://grafana.example.com/explore?orgId=1&left=%5B%22now-1h%22,%22now%22,%22tempo%22,%7B%22query%22:%22%7BTRACE_ID%7D%22%7D%5D

# Datadog
OTEL_TRACES_URL_TEMPLATE=https://app.datadoghq.com/apm/trace/{TRACE_ID}
```

## 📊 Database Schema

### Updated DLQ Admin Function

```sql
-- Updated materialized view with trace_id
create materialized view if not exists public.mv_dlq_items as
select
  null::uuid                    as id,
  null::uuid                    as company_id,
  now()                         as created_at,
  now()                         as last_error_at,
  0::int                        as attempts,
  ''::text                      as last_error,
  0::int                        as payload_bytes,
  'failed'::text                as status,
  null::text                    as trace_id
where false;

-- Updated DLQ admin list function
create or replace function public.dlq_admin_list(_company uuid, _limit int default 50, _status text default null)
returns table(
  id uuid,
  company_id uuid,
  created_at timestamptz,
  last_error_at timestamptz,
  attempts int,
  last_error text,
  payload_bytes int,
  status text,
  trace_id text
)
language sql
security definer
set search_path = public
as $$
  select id, company_id, created_at, last_error_at, attempts, last_error, payload_bytes, status, trace_id
  from public.mv_dlq_items
  where (_company is null or company_id = _company)
    and (_status is null or status = _status)
  order by created_at asc
  limit greatest(1, least(coalesce(_limit,50), 200));
$$;
```

## 🎨 Frontend Components

### Server-Side Trace Link Builder

```typescript
// Deno/Edge-safe trace link builder
export function buildTraceLink(traceId?: string | null): string | null {
  if (!traceId) return null;
  
  // Try URL template first
  const tmpl = Deno.env.get("OTEL_TRACES_URL_TEMPLATE") || "";
  if (tmpl.includes("{TRACE_ID}")) {
    return tmpl.replace("{TRACE_ID}", traceId);
  }
  
  // Fallback to base URL
  const base = Deno.env.get("OTEL_UI_BASE") || "";
  if (base) {
    return `${base.replace(/\/+$/, '')}/trace/${traceId}`;
  }
  
  return null;
}
```

### Enhanced Slack Notifications

```typescript
export async function agentSlackError(p: Payload) {
  const hook = Deno.env.get("N8N_AGENT_LOG_WEBHOOK") || "";
  if (!hook) return;

  const traceUrl = buildTraceLink(p.trace_id);

  const body = {
    level: "error",
    timestamp: new Date().toISOString(),
    ...p,
    trace_url: traceUrl ?? undefined,
    // Slack-friendly fallback text
    text: `[ERROR] ${p.msg}` + (traceUrl ? ` | trace: ${traceUrl}` : ""),
    // Block Kit for rich formatting
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Agent Error* — \`${p.task_id}\`\n${p.msg}` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `*Company:* \`${p.company_id}\`` },
          { type: "mrkdwn", text: `*Trace:* \`${p.trace_id ?? "n/a"}\`` }
        ]
      },
      ...(traceUrl
        ? [{ type: "actions", elements: [{ type: "button", text: { type: "plain_text", text: "Open Trace" }, url: traceUrl }] }]
        : [])
    ]
  };

  await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}
```

### DLQ Admin Trace Links

```typescript
// Enhanced DLQ table with trace links
<td className="p-2">
  {it.trace_id ? (
    <a 
      className="text-blue-600 hover:text-blue-800 underline font-mono text-xs" 
      href={buildTraceLink(it.trace_id) || "#"} 
      target="_blank" 
      rel="noreferrer"
      title="Open in OTEL backend"
    >
      {it.trace_id}
    </a>
  ) : (
    <span className="text-muted-foreground text-xs">n/a</span>
  )}
</td>
```

## 🔍 Usage Examples

### 1. Slack Error Notifications

When an agent task fails:

1. **Slack Message Arrives**: Rich notification with error details
2. **Trace ID Displayed**: Shows the trace ID in the message
3. **Open Trace Button**: Click to open the trace in your OTEL backend
4. **Fallback Text**: Plain text includes trace URL if button isn't available

### 2. DLQ Admin Trace Links

In the DLQ Admin UI:

1. **Navigate to DLQ**: Go to `/super-admin/dlq`
2. **View Trace Column**: New column shows trace IDs
3. **Click Trace Link**: Opens the trace in your OTEL backend
4. **Debug Failed Tasks**: Analyze the full trace for failed operations

### 3. Debugging Workflow

Complete debugging workflow:

1. **Error Occurs**: Agent task fails and sends Slack notification
2. **Click Trace Link**: From Slack, open the trace in OTEL backend
3. **Analyze Trace**: Review spans, errors, and performance
4. **Check DLQ**: View the same trace ID in DLQ admin
5. **Replay if Needed**: Use DLQ admin to replay failed tasks

## 🛡️ Security Considerations

### Access Control
- **Super-Admin Only**: DLQ admin requires super-admin role
- **Secure RPC**: Database functions use security definer
- **Environment Isolation**: Separate templates per environment

### Data Privacy
- **Trace ID Only**: No sensitive data in trace IDs
- **Slack Integration**: Uses existing webhook infrastructure
- **Audit Trail**: All access logged through existing systems

### Environment Isolation
- **Staging/Production**: Separate environment variables per environment
- **URL Templates**: Environment-specific OTEL backends
- **Webhook Security**: Uses existing secure webhook infrastructure

## 🔧 Troubleshooting

### Common Issues

#### Slack Notifications Not Working
```bash
# Check webhook configuration
echo $N8N_AGENT_LOG_WEBHOOK

# Verify trace link template
echo $OTEL_TRACES_URL_TEMPLATE

# Test webhook manually
curl -X POST $N8N_AGENT_LOG_WEBHOOK \
  -H "Content-Type: application/json" \
  -d '{"text":"Test message"}'
```

#### Trace Links Not Generating
```bash
# Check server-side environment variables
echo $OTEL_TRACES_URL_TEMPLATE
echo $OTEL_UI_BASE

# Verify template format
# Should contain {TRACE_ID} placeholder
```

#### DLQ Trace Column Empty
```bash
# Check if trace IDs are being captured
SELECT trace_id FROM public.agent_tasks WHERE trace_id IS NOT NULL LIMIT 5;

# Verify DLQ admin function
SELECT * FROM public.dlq_admin_list(null, 5) LIMIT 1;
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=pr107_1:slack

# Check agent-runner logs
supabase functions logs agent-runner --follow
```

## 📈 Monitoring & Metrics

### Key Metrics to Track

1. **Slack Notification Success Rate**: Percentage of successful webhook calls
2. **Trace Link Clicks**: Usage of trace links from Slack
3. **DLQ Trace Link Usage**: Clicks on trace links in DLQ admin
4. **Error Resolution Time**: Time from notification to resolution

### Dashboard Setup

Create a monitoring dashboard for:
- Slack notification delivery rates
- Trace link click-through rates
- DLQ admin usage patterns
- Error resolution metrics

## 🔄 Migration Guide

### From PR-107

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
   # Add server-side trace template
   echo "OTEL_TRACES_URL_TEMPLATE=https://your-otel-backend.com/trace/{TRACE_ID}" >> .env
   ```

4. **Deploy Frontend**:
   ```bash
   npm run build && npm run deploy
   ```

### Rollback Plan

If issues arise:

```bash
# Disable Slack notifications (temporary)
unset N8N_AGENT_LOG_WEBHOOK

# Revert agent-runner (if needed)
supabase functions deploy agent-runner --no-verify-jwt

# Disable trace links in DLQ (temporary)
# Remove trace_id column from DLQ admin function
```

## 🎯 Next Steps

### Immediate Actions (Week 1)
1. ✅ Deploy PR-107.1 to staging
2. ✅ Configure server-side trace link templates
3. ✅ Test Slack error notifications with trace links
4. ✅ Validate DLQ admin trace link functionality

### Short Term (Week 2-4)
1. 🔄 Train operations team on new debugging workflow
2. 🔄 Set up monitoring for notification success rates
3. 🔄 Optimize trace link templates for your OTEL backend
4. 🔄 Add trace correlation to error logs

### Long Term (Month 2-3)
1. 🚀 Integrate with other notification channels (email, PagerDuty)
2. 🚀 Add trace analytics dashboard
3. 🚀 Implement automated error correlation
4. 🚀 Add trace-based alerting rules

## 📞 Support

For questions or issues with PR-107.1:

1. **Documentation**: Check this guide first
2. **GitHub Issues**: Create an issue with `pr107_1` label
3. **Operations Team**: Contact ops team for debugging workflow
4. **Slack**: Use `#traces-debugging` channel

---

**PR-107.1 Status**: ✅ Ready for deployment  
**Security Level**: 🔒 Super-admin restricted  
**Vendor Support**: 🌐 Any OTEL backend  
**Last Updated**: 2024-12-15
