---
title: Shipper Portal — Operating Map
version: 1.1.0
owner: shipper.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: shipper
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/shipper`
- Feature flag: `portal.shipper.enabled`
- Roles: `shipper_admin`, `shipper_user`, `owner`, `admin`

## Key actions (with spans)

- Create Shipment: `agent.fn.shipment.create`
- Track Delivery: `agent.fn.tracking.view`
- View Invoices: `agent.fn.billing.view`
- Manage Addresses: `agent.fn.addresses.manage`
- Request Quote: `agent.fn.rates.request`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- Shipment creation < 2min
- Invoice accuracy ≥ 99%

## Error taxonomy

- `SHIPPER-401`: RBAC denial
- `SHIPPER-SHIPMENT-404`: Shipment not found
- `SHIPPER-ADDRESS-INVALID`: Invalid address format
- `SHIPPER-RATE-UNAVAILABLE`: No rates available

## Golden checks

- 200 after login; spans present; SLI event persisted
- Shipment creation < 30s
- Rate request < 5s
