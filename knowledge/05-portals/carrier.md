---
title: Carrier Portal — Operating Map
version: 1.1.0
owner: carrier.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: carrier
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/carrier`
- Feature flag: `portal.carrier.enabled`
- Roles: `carrier_admin`, `carrier_user`, `driver`, `owner`, `admin`

## Key actions (with spans)

- Accept Load: `agent.fn.load.accept`
- Update Status: `agent.fn.tracking.update`
- Submit POD: `agent.fn.docs.pod_upload`
- Manage Equipment: `agent.fn.equipment.manage`
- View Pay: `agent.fn.payroll.view`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- Load acceptance rate ≥ 90%
- POD submission < 24h after delivery

## Error taxonomy

- `CARRIER-401`: RBAC denial
- `CARRIER-LOAD-404`: Load not found
- `CARRIER-POD-UPLOAD`: POD upload failure
- `CARRIER-EQUIPMENT-OFFLINE`: Equipment tracking offline

## Golden checks

- 200 after login; spans present; SLI event persisted
- Load acceptance < 30s
- POD upload < 10s
