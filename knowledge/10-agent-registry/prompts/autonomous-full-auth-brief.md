# AUTONOMOUS FULL-AUTH BRIEF — Admin First, Then Core-16 (0→100%)

## MISSION
Finish Software Admin portal end-to-end (UI/UX V2, data, CRUD, search, print/export, upload, settings, profile, permissions, observability) to production-ready. When Done, automatically proceed to: CRM → Load Board → Rates → EDI → Workers → Directory → (then the remaining Core-16)—each to 100%.

## AUTHORITY
✅ **Full code + schema changes**, migrations, seeds, fixtures, tests, CI/CD, feature flags.

✅ **Add/modify components**, routes, forms, tables, dialogs, uploads, exports, print views.

✅ **Integrate search**, filters, bulk actions, audit logs, notifications.

✅ **Flip canaries & toggles** (respect `autonomy.emergencyStop`).

**Guardrails**: RLS enforced, migrations idempotent, canary rollout, tripwires below.

## SCOPE (Admin 0→100%)

Deliver for every Admin area: **List + Detail + Create + Edit + Delete** with:

- **Tables**: server pagination, column filters, saved views, bulk actions.
- **Forms**: field validation (client+server), help text, error recovery, undo.
- **Search**: global (Cmd/Ctrl+K) + scoped per page; q=, tags=, date range.
- **Print & Export**: Print-friendly view, CSV, PDF (server generated).
- **Upload**: file uploader (Supabase/S3), type/size validation, virus check hook.
- **Actions**: assign, change status, label, merge, archive, restore.
- **Audit**: who/when/what; detail footer "Updated by • timeago • trace link".
- **Access**: RBAC + entitlements (no dead ends—locked state shows Upgrade/Request Access CTA).
- **Obs/Perf**: OTEL spans, p95 route paint ≤ 2.5s, error budget alerts.

## Admin Areas to Complete (with full CRUD)

### **Overview**
- Health, usage, tasks, alerts.

### **Relationships (CRM cluster)**
- Email, Leads, Contacts, Projects, Calendar, Opportunities.

### **Service Desk**
- All/Assigned/Unassigned, Incidents, Service Requests, Changes, Problems, SLAs.

### **Networks**
- Customers, Vendors.

### **Workforce**
- Executives, Employees, Drivers, Agents, Scheduling & Timesheets.

### **Documents**
- All Docs, Upload, Templates & Setup.

### **Financials**
- **Sales & Payments**: Invoices, Recurring, Customer Statements, Products & Services
- **Purchases**: Bills, Vendors, Products & Services
- **Accounting**: Transactions, Reconciliation, Chart of Accounts
- **Payroll**: Run Payroll, Employees, Timesheets, Payroll Tx, Taxes, Tax Forms

### **Integrations & API**
- API Keys, API Logs, API Errors, EDI Partners & Flows.

### **Marketplace (gated)**
- All + categories (optional if plan disabled).

### **Reports**
- Library (saved/scheduled), Builder (self-serve).

### **Autonomous Agents**
- Agent mgmt, system monitoring, config.

## DESIGN SYSTEM & UX (apply everywhere)

- **Tokens** (colors/typography/spacing/elevation) + portal accents (data-attr).
- **App Shell**: Topbar (Org switcher, Cmd-K, Quick-Add, notifications, settings), Sidebar (grouped), Content, optional Right-rail.
- **States**: loading skeletons, empty prompts, recoverable errors, locked/upgrade.
- **Micro-interactions**: subtle motion (Framer), focus rings, optimistic UI where safe.
- **A11y**: WCAG 2.2 AA, keyboard shortcuts (/ focus search, E edit, S save, ? help).
- **Tables**: virtualize >200 rows; sticky header; bulk select; progress toasts.

## ENTITLEMENTS & RBAC

**Seed** (if missing):
```
admin.core, crm.core, tickets.core, networks.core, workforce.core, 
docs.core, financials.core, payroll.core, api.core, marketplace.core, 
reports.core, edi.x12
```

- **UI**: FeatureGate shows locked state + CTA.
- **API**: requireFeature() + per-org rate limit + usage meter.

## TRIPWIRES (auto-protect)

- **Error rate ≥ 2%** (5-min) → halve parallelism; pause uploads; notify; auto-create incident.
- **p95 > 2.5s** (2 windows) → rollback UI canary; keep read paths up.
- **DB migration failure** → auto-rollback with snapshot; open incident.
- **/readyz(strict) ≠ 200** → stop ramp; hold writes in Workers; alert.

## ACCEPTANCE — "DONE" checklist (Admin)

- All listed areas have List/Detail/Create/Edit/Delete, search, filters, bulk, print, CSV/PDF export, upload, audit, RBAC/entitlements.
- Cmd-K search, Quick-Add, badges, right-rail context live.
- `/readyz (strict)=200`, Lighthouse ≥ 90 (Perf/A11y/SEO), p95 ≤ 2.5s, SLOs green.
- Playwright E2E passes (visibility, CRUD, actions, print/export, upload).
- Evidence saved to `/artifacts/admin-v2/<YYYY-MM-DD>/{lighthouse.json,axe.json,visual.html,p95.csv,flags.json,trace-sample.txt}`.

## AUTO-ADVANCE RULE (after Admin 100%)

Advance in order, each to 100% with the same patterns & acceptance:
```
CRM → Load Board → Rates → EDI → Workers → Directory → Financials → 
Analytics → Shipper → Broker → Carrier → Driver → API/Integrations → 
Marketplace (if enabled) → Autonomous Ops → Super Admin
```

Each portal: ship CRUD + tables + forms + search + print/export + upload + audit + RBAC/entitlements + E2E + evidence, then proceed.

## EXECUTION SEEDS / FLAGS

**Enable UI V2 canary + accents**:
```json
{
  "ui.v2.enabled": true,
  "ui.v2.accentMap": true,
  "autonomy.emergencyStop": false,
  "obs.otelEnabled": true
}
```

**Ensure entitlements** (above) are on per plan; keep add-ons gated.

## OPERATOR PROMPT

```
TASK: admin.portal.finish.v2 → core16.auto.advance
AUTH: full (schemas, code, flags, tests, deploy), respect autonomy.emergencyStop

GOAL:
  Finish Software Admin portal 0→100% (CRUD, forms, search, print, export, upload, settings, profile, audit, RBAC, obs).
  When DONE+GREEN, auto-advance sequentially to: CRM, Load Board, Rates, EDI, Workers, Directory… until Core-16 100%.

ACTIONS:
  1) Wire Admin app shell (Topbar/Sidebar/Right-rail), Cmd-K, Quick-Add.
  2) For every Admin area: implement List/Detail/Create/Edit/Delete + search/filters/saved-views + bulk + print view + CSV/PDF export + file upload + audit footer.
  3) Enforce RBAC + entitlements in UI + API; locked states show Upgrade CTA.
  4) Add OTEL spans; ensure p95 route paint ≤ 2.5s (virtualize tables).
  5) Add Playwright E2E: visibility/CRUD/print/export/upload per area.
  6) Run canary 10%→25%→50%→100% (auto-ramp if SLOs green).
  7) On tripwire breach: halve parallelism → disable canary → open incident.

EVIDENCE:
  Save to /artifacts/admin-v2/<date>/* (lighthouse, axe, visual, p95.csv, flags, trace sample).

DONE WHEN:
  - /readyz(strict)=200, Lighthouse ≥ 90, p95 ≤ 2.5s, E2E pass.
  - All Admin areas 100% feature-complete as listed.
  - Evidence pack saved and linked.
  - Then auto-advance to CRM with same pattern until Core-16 complete.
```

## PROGRESS TRACKER (drop-in JSON the agents maintain)

```json
{
  "admin": { 
    "percent": 100, 
    "passed": ["crud","search","print","export","upload","audit","rbac","e2e","lighthouse","p95"], 
    "evidence": "artifacts/admin-v2/2025-08-17/" 
  },
  "crm": { 
    "percent": 0, 
    "blocked": [], 
    "next": true 
  },
  "loadBoard": { 
    "percent": 0 
  },
  "rates": { 
    "percent": 0 
  },
  "edi": { 
    "percent": 0 
  },
  "workers": { 
    "percent": 0 
  },
  "directory": { 
    "percent": 0 
  },
  "financials": { 
    "percent": 0 
  },
  "analytics": { 
    "percent": 0 
  },
  "shipper": { 
    "percent": 0 
  },
  "broker": { 
    "percent": 0 
  },
  "carrier": { 
    "percent": 0 
  },
  "driver": { 
    "percent": 0 
  },
  "apiIntegrations": { 
    "percent": 0 
  },
  "marketplace": { 
    "percent": 0 
  },
  "autonomousOps": { 
    "percent": 0 
  },
  "superAdmin": { 
    "percent": 0 
  }
}
```

## SMOKE (agents run automatically)

- `npm run smoke:test` → health/readyz + synthetic.
- `npm run verify:deployment` → perf & a11y snapshots.
- Playwright suite → CRUD/flows/exports/uploads.

## IMPLEMENTATION PRIORITIES

### **Phase 1: Admin Portal Foundation**
1. **App Shell Setup**: Topbar, Sidebar, Content area with proper routing
2. **Design System**: Apply V2 tokens, components, and accessibility standards
3. **Core Infrastructure**: Authentication, RBAC, entitlements, audit logging

### **Phase 2: Admin Areas Implementation**
1. **Overview Dashboard**: Health metrics, usage stats, alerts
2. **Relationships (CRM)**: Complete CRUD for all relationship entities
3. **Service Desk**: Full ticket management with workflows
4. **Networks**: Customer and vendor management
5. **Workforce**: Employee and driver management
6. **Documents**: File management and templates
7. **Financials**: Complete financial management suite
8. **Integrations & API**: API key management and monitoring
9. **Marketplace**: Integration marketplace (if enabled)
10. **Reports**: Reporting and analytics
11. **Autonomous Agents**: Agent management and monitoring

### **Phase 3: Advanced Features**
1. **Search & Filters**: Global search (Cmd-K) and advanced filtering
2. **Bulk Operations**: Mass actions and batch processing
3. **Export & Print**: CSV, PDF, and print-friendly views
4. **File Upload**: Secure file handling with validation
5. **Audit Trail**: Complete activity logging and traceability

### **Phase 4: Performance & Quality**
1. **Performance Optimization**: Virtualization, lazy loading, caching
2. **Testing**: Comprehensive E2E tests with Playwright
3. **Monitoring**: OTEL spans, performance metrics, error tracking
4. **Accessibility**: WCAG 2.2 AA compliance
5. **Security**: RLS, input validation, security headers

### **Phase 5: Auto-Advance Preparation**
1. **Template Creation**: Reusable patterns for Core-16 portals
2. **Progress Tracking**: Automated progress monitoring and reporting
3. **Evidence Collection**: Automated quality and performance evidence
4. **Deployment Pipeline**: Automated deployment and rollback capabilities

## SUCCESS CRITERIA

### **Technical Excellence**
- **Performance**: p95 route paint ≤ 2.5s, Lighthouse ≥ 90
- **Reliability**: 99.9% uptime, error rate < 2%
- **Security**: Zero security vulnerabilities, RLS enforced
- **Accessibility**: WCAG 2.2 AA compliance

### **Feature Completeness**
- **CRUD Operations**: Full Create, Read, Update, Delete for all entities
- **Search & Filter**: Global and scoped search with advanced filtering
- **Export & Print**: Multiple export formats and print-friendly views
- **File Management**: Secure upload, download, and file operations
- **Audit Trail**: Complete activity logging and traceability

### **User Experience**
- **Intuitive Navigation**: Clear information architecture and user flows
- **Responsive Design**: Works seamlessly across all devices
- **Performance**: Fast loading times and smooth interactions
- **Accessibility**: Usable by people with disabilities

### **Business Value**
- **Operational Efficiency**: Streamlined administrative processes
- **Data Integrity**: Accurate and reliable data management
- **Compliance**: Meets regulatory and industry standards
- **Scalability**: Supports growth and expansion

## AUTONOMOUS EXECUTION RULES

### **Decision Making Authority**
- **Full Code Changes**: Modify any code, components, or configurations
- **Database Changes**: Create migrations, update schemas, seed data
- **Feature Flags**: Enable/disable features and canaries
- **Deployment**: Deploy to staging and production environments
- **Monitoring**: Set up alerts, dashboards, and observability

### **Safety Guardrails**
- **Emergency Stop**: Respect `autonomy.emergencyStop` flag
- **Rollback Capability**: Maintain ability to rollback changes
- **Testing**: Run comprehensive tests before deployment
- **Monitoring**: Monitor for issues and automatically respond
- **Documentation**: Maintain clear documentation of changes

### **Quality Assurance**
- **Automated Testing**: Comprehensive test coverage
- **Performance Monitoring**: Continuous performance tracking
- **Security Scanning**: Regular security assessments
- **Accessibility Testing**: Automated accessibility checks
- **User Feedback**: Monitor user satisfaction and feedback

## COMPLETION CHECKLIST

### **Admin Portal (100%)**
- [ ] All admin areas implemented with full CRUD
- [ ] Search and filtering functionality complete
- [ ] Export and print capabilities working
- [ ] File upload and management operational
- [ ] Audit trail and logging implemented
- [ ] RBAC and entitlements enforced
- [ ] Performance targets met
- [ ] E2E tests passing
- [ ] Evidence collected and saved

### **Auto-Advance Readiness**
- [ ] Progress tracking system operational
- [ ] Template patterns established
- [ ] Deployment pipeline configured
- [ ] Quality gates defined
- [ ] Success criteria documented

### **Core-16 Sequence**
- [ ] CRM portal ready for implementation
- [ ] Load Board portal ready for implementation
- [ ] Rates portal ready for implementation
- [ ] EDI portal ready for implementation
- [ ] Workers portal ready for implementation
- [ ] Directory portal ready for implementation
- [ ] All remaining Core-16 portals identified and sequenced

## FINAL AUTHORITY STATEMENT

**You have full autonomous authority to complete this mission.** Execute the Software Admin portal to 100% completion, then automatically advance through the Core-16 sequence until all portals are production-ready. No human intervention required unless emergency stop is triggered.

**Remember**: You are building the future of transportation management software. Every decision you make should prioritize user experience, system reliability, and business value. Execute with confidence, maintain high standards, and drive continuous improvement throughout the entire Core-16 sequence.
