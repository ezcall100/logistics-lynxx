# PR-107.2: Span Naming & Semantic Conventions

## Overview

PR-107.2 implements consistent span naming and semantic conventions for agent traces. This provides cleaner, searchable traces with standardized attributes that work across any OTEL backend.

## 🎯 Key Features

### 🔍 Consistent Span Names
- **Canonical Names**: `agent.task.execute`, `agent.fn.rates.price_one`
- **Action-First**: Clear, searchable span names
- **Hierarchical**: Logical grouping of related operations

### 🏷️ Semantic Attributes
- **OTEL Compliant**: Standard attribute names and values
- **PII-Safe**: Only tenant/task/function IDs, no sensitive data
- **Searchable**: Consistent attributes across all traces

### 📊 Standardized Events
- **Task Lifecycle**: `agent.task.start`, `agent.task.finish`
- **Function Events**: `agent.fn.complete`
- **Consistent Naming**: All events follow the same pattern

## 📁 Files Changed

### Backend
- `supabase/functions/_shared/otel.ts` - Added span naming helpers and semantic attributes
- `supabase/functions/agent-runner/index.ts` - Updated to use new naming conventions

### Documentation
- `docs/pr107_2-span-naming-conventions.md` - This comprehensive guide

## 🚀 Quick Start

### 1. Deploy Backend Updates

```bash
# Deploy agent-runner with new span naming
supabase functions deploy agent-runner
```

### 2. Verify Tracing is Enabled

```bash
# Ensure OTEL is enabled (if not already from PR-107)
psql "$SUPABASE_DB_URL" -c "UPDATE public.feature_flags_v2 SET value=true WHERE key='obs.otelEnabled';"
```

### 3. Test and Verify

```bash
# Trigger a canary task (your usual synthetic or via UI)
# Then check your OTEL backend for the new span names
```

## 🔧 Configuration

### Span Names

```typescript
// Canonical span names
export const spanNames = {
  agent: {
    task: {
      execute: "agent.task.execute",  // Main task execution
      claim:   "agent.task.claim",    // Task claiming
      update:  "agent.task.update",   // Task status updates
    },
    fn: (fnName: string) => `agent.fn.${fnName}`, // Function-specific spans
  },
};
```

### Semantic Attributes

```typescript
// Common attributes for agent traces
export function agentAttrs(input: {
  env?: string;
  companyId?: string;
  taskId?: string;
  fnName?: string;
  runner?: "edge" | "worker" | "cron";
  component?: string;
}) {
  return {
    "service.name": "transbot-edge",
    "deployment.environment": "production",
    "tenant.id": input.companyId ?? "",
    "agent.task_id": input.taskId ?? "",
    "agent.fn_name": input.fnName ?? "",
    "agent.runner": input.runner ?? "edge",
    "code.component": input.component ?? "agent-runner",
    "otel.library.name": "transbot-otel",
    "otel.library.version": "1",
  };
}
```

## 📊 Trace Structure

### Before PR-107.2
```
agent-runner.handle
├── app.task_id: "123"
├── app.company_id: "456"
├── app.fn_name: "rates.price_one"
└── task_completed event
```

### After PR-107.2
```
agent.task.execute
├── service.name: "transbot-edge"
├── deployment.environment: "production"
├── tenant.id: "456"
├── agent.task_id: "123"
├── agent.fn_name: "rates.price_one"
├── agent.runner: "edge"
├── code.component: "agent-runner"
├── agent.task.start event
└── agent.task.finish event
```

## 🔍 Usage Examples

### 1. Search by Function Name

In your OTEL backend, search for:
```
agent.fn_name = "rates.price_one"
```

### 2. Filter by Tenant

Search for all traces for a specific company:
```
tenant.id = "company-uuid-here"
```

### 3. Find Failed Tasks

Search for failed task executions:
```
span.name = "agent.task.execute" AND agent.task.finish.status = "failed"
```

### 4. Performance Analysis

Find slow function executions:
```
span.name = "agent.fn.rates.price_one" AND duration > 5s
```

## 🛡️ Security Considerations

### Data Privacy
- **PII-Safe**: Only tenant/task/function IDs, no sensitive data
- **No User Data**: No emails, names, or personal information
- **Safe for Logging**: All attributes are safe to include in logs

### Access Control
- **Tenant Isolation**: `tenant.id` allows filtering by company
- **Task-Level**: `agent.task_id` for specific task debugging
- **Function-Level**: `agent.fn_name` for function-specific analysis

## 🔧 Troubleshooting

### Common Issues

#### Spans Not Appearing
```bash
# Check if OTEL is enabled
SELECT value FROM public.feature_flags_v2 WHERE key = 'obs.otelEnabled';

# Verify agent-runner deployment
supabase functions logs agent-runner --follow
```

#### Wrong Span Names
```bash
# Check the deployed function
supabase functions deploy agent-runner --dry-run

# Verify imports are correct
# Should include: spanNames, agentAttrs
```

#### Missing Attributes
```bash
# Check environment variables
echo $OTEL_SERVICE_NAME
echo $DEPLOY_ENV

# Verify agentAttrs function is being called
# Look for span.setAttributes(agentAttrs(...)) in logs
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=pr107_2:spans

# Check agent-runner logs
supabase functions logs agent-runner --follow
```

## 📈 Benefits

### Immediate Value
1. **Faster Debugging**: Consistent names make traces easier to find
2. **Better Search**: Semantic attributes enable powerful filtering
3. **SLO Tracking**: Standard names enable consistent SLO definitions
4. **Cross-Tenant Analysis**: `tenant.id` enables multi-tenant insights

### Long-Term Value
1. **Observability Standards**: OTEL-compliant attributes work with any backend
2. **Automated Analysis**: Consistent structure enables automated trace analysis
3. **Team Onboarding**: Standard names make traces easier to understand
4. **Vendor Flexibility**: Works with Jaeger, Tempo, Honeycomb, etc.

## 🔄 Migration Guide

### From PR-107.1

1. **Deploy Backend**:
   ```bash
   supabase functions deploy agent-runner
   ```

2. **Verify Deployment**:
   ```bash
   # Check function logs
   supabase functions logs agent-runner --follow
   ```

3. **Test New Names**:
   ```bash
   # Trigger a test task
   # Check OTEL backend for new span names
   ```

### Rollback Plan

If issues arise:

```bash
# Revert to previous version
supabase functions deploy agent-runner --no-verify-jwt

# Or disable OTEL temporarily
psql "$SUPABASE_DB_URL" -c "UPDATE public.feature_flags_v2 SET value=false WHERE key='obs.otelEnabled';"
```

## 🎯 Next Steps

### Immediate Actions (Week 1)
1. ✅ Deploy PR-107.2 to staging
2. ✅ Test new span names in OTEL backend
3. ✅ Verify semantic attributes are present
4. ✅ Update any existing dashboards/queries

### Short Term (Week 2-4)
1. 🔄 Create SLOs based on new span names
2. 🔄 Set up alerts for slow function executions
3. 🔄 Build dashboards using semantic attributes
4. 🔄 Train team on new trace structure

### Long Term (Month 2-3)
1. 🚀 Extend naming conventions to other services
2. 🚀 Implement automated trace analysis
3. 🚀 Add more semantic attributes as needed
4. 🚀 Create trace-based alerting rules

## 📞 Support

For questions or issues with PR-107.2:

1. **Documentation**: Check this guide first
2. **GitHub Issues**: Create an issue with `pr107_2` label
3. **Operations Team**: Contact ops team for trace analysis
4. **Slack**: Use `#traces-debugging` channel

---

**PR-107.2 Status**: ✅ Ready for deployment  
**Security Level**: 🔒 PII-safe attributes only  
**Vendor Support**: 🌐 Any OTEL backend  
**Last Updated**: 2024-12-15
