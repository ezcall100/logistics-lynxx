---
title: Span Naming & Semantics
version: 1.0.0
owner: obs@transbot.ai
visibility: agents,human-ops
scope: telemetry
ttl_days: 30
last_validated: 2025-08-15
---

## Canonical spans

- Root task: `agent.task.execute`
- Function spans: `agent.fn.<domain>.<action>`
  - rates.price_one, edi.204_tender, docs.ocr, billing.invoice

## Attributes (PII-safe)

- `tenant.id`, `agent.task_id`, `agent.fn_name`
- No emails/names; IDs only.

## Events

- `agent.task.start`, `agent.task.finish`
