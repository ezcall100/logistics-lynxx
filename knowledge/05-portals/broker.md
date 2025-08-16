---
title: Broker Portal — Operating Map
version: 1.2.0
owner: broker.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: broker
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
- Manage Carriers: `agent.fn.carrier.manage`
- Track Shipments: `agent.fn.tracking.monitor`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- Quote-to-book conversion ≥ 85%
- Carrier response time ≤ 2h

## Error taxonomy

- `BROKER-401`: RBAC denial
- `BROKER-EDI-204`: Tender failure (EDI)
- `BROKER-RATES-404`: Rate not found
- `BROKER-CARRIER-OFFLINE`: Carrier unavailable

## Golden checks

- 200 after login; spans present; SLI event persisted
- Quote creation < 1s
- EDI 204/990 cycle < 30s
