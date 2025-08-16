---
title: Analytics Portal — Operating Map
version: 1.0.0
owner: analytics.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: analytics
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/analytics`
- Feature flag: `portal.analytics.enabled`
- Roles: `analytics_admin`, `analytics_user`, `admin`, `owner`

## Key actions (with spans)

- Dashboard Views: `agent.fn.analytics.dashboard.view`
- Report Generation: `agent.fn.analytics.reports.generate`
- Data Export: `agent.fn.analytics.export.data`
- KPI Monitoring: `agent.fn.analytics.kpis.monitor`

## KPIs

- p95 ≤ 3.0s, success ≥ 98%
- Dashboard load < 5s
- Report generation < 30s

## Error taxonomy

- `ANALYTICS-401`: RBAC denial
- `ANALYTICS-QUERY-TIMEOUT`: Query timeout
- `ANALYTICS-DATA-UNAVAILABLE`: Data not available

## Golden checks

- 200 after login; spans present; SLI event persisted
- Dashboard load < 3s
- Report generation < 15s
