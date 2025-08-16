---
title: /readyz returns 503
version: 1.0.1
owner: sre@transbot.ai
visibility: agents,human-ops
scope: runbook
ttl_days: 30
last_validated: 2025-08-15
---

## Symptoms

- `/readyz` 503 in strict mode.
- Health `/healthz` 200.

## Likely causes

- Missing `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY`
- DB auth revoked; network ACL change
- Agents not yet booted (lenient would pass; strict won't)

## Actions (in order)

1. Check flags: `obs.otelEnabled`, `agents.autonomousEnabled`.
2. Validate env: `echo $SUPABASE_URL` (must be supabase.co), key not empty.
3. Failover: toggle `READYZ_MODE=lenient` for ≤15m while restoring DB creds.
4. Prove: re-enable strict; run `npm run smoke:test`.

## Exit criteria

- `/readyz` 200 (strict), p95 guardrails nominal, artifacts captured.
