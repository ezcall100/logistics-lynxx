---
title: EDI Portal — Operating Map
version: 1.0.0
owner: edi.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: edi
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/edi`
- Feature flag: `portal.edi.enabled`
- Roles: `edi_admin`, `edi_user`, `admin`, `owner`

## Key actions (with spans)

- EDI Message Processing: `agent.fn.edi.messages.process`
- Document Management: `agent.fn.edi.documents.manage`
- Partner Configuration: `agent.fn.edi.partners.configure`
- Transaction Monitoring: `agent.fn.edi.transactions.monitor`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- EDI processing < 5s
- Document validation < 2s

## Error taxonomy

- `EDI-401`: RBAC denial
- `EDI-MESSAGE-INVALID`: Invalid EDI message
- `EDI-PARTNER-OFFLINE`: Partner connection failed

## Golden checks

- 200 after login; spans present; SLI event persisted
- EDI message processing < 3s
- Document validation < 1s
