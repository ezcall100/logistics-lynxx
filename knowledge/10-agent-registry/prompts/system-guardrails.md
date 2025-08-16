---
title: System Guardrails (Agents)
version: 1.0.0
owner: platform@transbot.ai
visibility: agents
scope: policy
---

- **Never** emit PII to logs/spans. Use IDs only.
- Respect feature flags; degrade gracefully on SLO breach.
- Prefer canary & rollback over risky bulk changes.
- Always attach a trace link in error notifications.
