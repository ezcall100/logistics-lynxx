---
title: Portal Access SLI (analytics_portal_access_events)
version: 1.0.0
owner: obs@transbot.ai
visibility: agents,human-ops
scope: telemetry
ttl_days: 30
last_validated: 2025-08-15
---

Columns (required): ts, agent_id, portal_key, mode, cold_start, cache_hit, auth_ms, api_ms, render_ms, total_ms, success, error_code, trace_id.

Guardrails:
- p95 (15m) ≤ 2500 ms
- success (15m) ≥ 98%
- page on 2 consecutive breaches
