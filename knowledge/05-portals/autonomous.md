---
title: Autonomous Portal — Operating Map
version: 1.0.0
owner: autonomous.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: autonomous
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/autonomous`
- Feature flag: `portal.autonomous.enabled`
- Roles: `autonomous_admin`, `autonomous_user`, `admin`, `owner`

## Key actions (with spans)

- Agent Management: `agent.fn.autonomous.agents.manage`
- Task Monitoring: `agent.fn.autonomous.tasks.monitor`
- Performance Analytics: `agent.fn.autonomous.performance.view`
- System Health: `agent.fn.autonomous.health.check`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- Agent response time < 1s
- Task completion rate ≥ 95%

## Error taxonomy

- `AUTONOMOUS-401`: RBAC denial
- `AUTONOMOUS-AGENT-OFFLINE`: Agent offline
- `AUTONOMOUS-TASK-FAILED`: Task execution failed

## Golden checks

- 200 after login; spans present; SLI event persisted
- Agent status check < 500ms
- Task monitoring < 2s
