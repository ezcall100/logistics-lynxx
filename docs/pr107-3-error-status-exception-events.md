# PR-107.3: Error Status + Exception Events

## Overview

This PR enhances observability by adding proper error status and exception recording to the agent-runner. It makes failures pop in your OTEL UI with proper status, recorded exceptions, and HTTP attributes.

## What's Included

### 1. OTEL Error Helpers (`supabase/functions/_shared/otel.ts`)

Added tiny utilities to mark spans as OK/ERROR and record exceptions (PII-safe):

- `sanitizeAttrs()` - PII-safe sanitizer for sensitive fields
- `setHttpAttrs()` - Set standard HTTP attributes
- `markOk()` - Mark span as successful with optional message
- `markError()` - Record exception and set ERROR status

### 2. Agent Runner Updates (`supabase/functions/agent-runner/index.ts`)

Enhanced with proper error handling:

- `span.recordException(...)` - Record exceptions with context
- `span.setStatus(ERROR)` - Set proper error status
- `http.*` attributes - Standard HTTP response attributes
- PII-safe exception recording

### 3. Verification & Troubleshooting

60-second verification steps and troubleshooting guide included.

## Implementation Details

### Error Helpers

```typescript
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
```

### Agent Runner Error Handling

The agent-runner now properly handles errors with:

1. **Top-level span** for the entire HTTP request
2. **Execution span** for task processing
3. **Exception recording** on both spans when errors occur
4. **HTTP status attributes** for proper routing
5. **PII-safe context** in exception events

## Verification Steps

### 60-Second Verification

```bash
# Deploy edge function
supabase functions deploy agent-runner

# Trigger a canary task (your usual synthetic or via UI)

# In your OTEL backend, confirm:
# - Spans show Status = ERROR when failures occur
# - exception recorded on the function span (and parent)
# - http.response.status_code present (200 / 500 / 404 / 400)
# - Success paths show Status = OK
```

### Force Test Failure

To test error handling:

1. Insert a task with unknown `fn_name` in `agent_tasks` table
2. Trigger the agent-runner
3. Check that `agent.task.execute` span has `Status=ERROR`
4. Verify `exception.recorded` event present with message/stack
5. Confirm `http.response.status_code=500`

## Safety

- **No behavior changes** — pure observability enhancement
- **Backwards compatible** with PR-105/107.1/107.2
- **PII-safe** via `sanitizeAttrs`
- **Vendor-agnostic** OTLP semantics

## What This Unlocks

1. **Clear red bars** in trace UIs for failing tasks
2. **SLOs based on SpanStatusCode** (error budgets per function)
3. **Better triage**: jump from error to exact exception event
4. **Standard HTTP attributes** for proper routing and filtering

## Next Steps

Ready for PR-107.4: Dynamic Sampling via Feature Flags (hot-tune sample rates during incidents).

## Files Changed

- `supabase/functions/_shared/otel.ts` - Added error helpers
- `supabase/functions/agent-runner/index.ts` - Enhanced error handling
- `scripts/verify-pr107-3.sh` - Verification script
- `docs/pr107-3-error-status-exception-events.md` - This documentation
