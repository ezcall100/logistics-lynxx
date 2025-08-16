---
title: <Portal Name> Portal — Operating Map
version: 1.0.0
owner: <team>@transbot.ai
visibility: agents,human-ops
scope: portal
portal: <key> # e.g., broker
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/broker`
- Feature flag: `portal.broker.enabled`
- Roles: `broker_admin`, `broker_user`, `owner`, `admin`

## Key actions (with spans)

- Create Quote: `agent.fn.rates.price_one`
- Post Load: `agent.fn.load.post`
- Tender 204: `agent.fn.edi.204_tender`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%

## Error taxonomy

- `BROKER-401`: RBAC denial
- `BROKER-EDI-204`: Tender failure (EDI)

## Golden checks

- 200 after login; spans present; SLI event persisted.
