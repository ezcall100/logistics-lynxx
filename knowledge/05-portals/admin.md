---
title: Admin Portal — Operating Map
version: 1.0.0
owner: admin.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: admin
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/admin`
- Feature flag: `portal.admin.enabled`
- Roles: `admin`, `owner`

## Key actions (with spans)

- User Management: `agent.fn.admin.users.manage`
- System Configuration: `agent.fn.admin.config.manage`
- Audit Logs: `agent.fn.admin.audit.view`
- Feature Flags: `agent.fn.admin.flags.manage`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- User management operations < 5s
- Configuration changes < 10s

## Error taxonomy

- `ADMIN-401`: RBAC denial
- `ADMIN-USER-NOT-FOUND`: User not found
- `ADMIN-CONFIG-INVALID`: Invalid configuration

## Golden checks

- 200 after login; spans present; SLI event persisted
- User creation < 3s
- Config update < 5s
