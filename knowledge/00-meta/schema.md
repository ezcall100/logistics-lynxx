# Metadata Schema (Front-Matter)

Required keys:
- `title`: Human-readable title
- `version`: Semver
- `owner`: Email or team handle
- `visibility`: CSV of `agents`, `human-ops`, `public`
- `scope`: e.g., policy | playbook | runbook | portal | domain | system | telemetry
- `portal` (optional): portal key if applicable
- `ttl_days` (optional): rotate/review schedule
- `last_validated`: ISO date of last hands-on validation

Example:
```yaml
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
```
