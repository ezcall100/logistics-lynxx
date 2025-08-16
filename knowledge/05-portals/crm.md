---
title: CRM Portal — Operating Map
version: 1.0.0
owner: crm.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: crm
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/crm`
- Feature flag: `portal.crm.enabled`
- Roles: `crm_admin`, `crm_user`, `admin`, `owner`

## Key actions (with spans)

- Contact Management: `agent.fn.crm.contacts.manage`
- Lead Tracking: `agent.fn.crm.leads.track`
- Opportunity Management: `agent.fn.crm.opportunities.manage`
- Sales Pipeline: `agent.fn.crm.pipeline.view`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- Contact creation < 3s
- Lead conversion rate ≥ 15%

## Error taxonomy

- `CRM-401`: RBAC denial
- `CRM-CONTACT-DUPLICATE`: Duplicate contact
- `CRM-LEAD-INVALID`: Invalid lead data

## Golden checks

- 200 after login; spans present; SLI event persisted
- Contact creation < 2s
- Lead assignment < 1s
