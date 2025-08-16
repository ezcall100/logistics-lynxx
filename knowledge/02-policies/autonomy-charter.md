---
title: Autonomous Operating Charter
version: 1.4.0
owner: sre@transbot.ai
visibility: agents,human-ops
scope: policy
ttl_days: 180
last_validated: 2025-08-15
---

# Authority & Guardrails

- **Authority**: agents may read/write data, deploy safe patches, replay DLQ, run DR cutovers.
- **Hard rails** (always-on): emergency stop (`autonomy.emergencyStop`), budget caps, idempotency, RLS, audit.
- **SLO gates**: if uptime < 99.95% or success < 98% or p95 > 2.5s ⇒ throttle + rollback.

# Activation

- Flags: `obs.otelEnabled=true`, `agents.autonomousEnabled=true`, `autonomy.mode=FULL`, `autonomy.emergencyStop=false`.

# Evidence

- Daily artifacts via `npm run green:posture` with flags snapshot, SLOs, trace sample.
