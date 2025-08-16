---
title: Autonomous Knowledge Root
version: 1.0.0
owner: platform@transbot.ai
visibility: agents,human-ops
scope: reference
---

# Trans Bot AI — Autonomous Knowledge Working Tree

This repository is the single source of truth for how agents run the platform end-to-end:

- **Policies**: autonomy, security, observability, budgets & SLOs
- **Playbooks**: step-by-step "how to do it" flows
- **Runbooks**: "how to fix it" when things break
- **Portals**: specs per canonical portal (RBAC, flags, endpoints, KPIs)
- **Domains**: pricing, matching, billing, EDI, etc.
- **Systems**: feature flags, schedulers, CI/CD, DR
- **Telemetry**: span names, SLI events, p95 guardrails
- **APIs & Data**: contracts, models, idempotency/signing
- **Agent Registry**: machine-readable tasks & prompts

### Ingestion rules

Agents ingest files with valid front-matter (`---`) and `visibility` containing `agents`. Files missing front-matter are ignored by default.

### Change control

- Minor updates: PR + label `doc:minor` → auto-merge
- Material updates to policies/SLOs: `doc:policy` → requires 2 approvals
- Agent behavior changes: link to affected prompts/tasks in `/10-agent-registry`
