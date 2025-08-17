# 🚀 AUTONOMOUS TMS FULL BUILD SYSTEM

## 🎯 **OPERATOR PROMPT — FULL AUTHORITY BUILDOUT (A-to-Z)**

### **MISSION:**
Finish the Trans Bot AI TMS as a production-grade, multi-tenant SaaS: all portals, all forms, all CRUD, all workflows, all data models, all API + UI, LoB support, billing-aware entitlements, and observability. Deliver an auditable evidence pack.

---

## 📋 **SCOPE DEFINITION**

### **🌐 SURFACES (20 Portals):**
- **Core Portals:** superAdmin, admin, tmsAdmin, onboarding
- **Business Portals:** broker, shipper, carrier, driver, ownerOperator
- **Specialized Portals:** factoring, loadBoard, crm, financials, edi
- **Advanced Portals:** marketplace, analytics, autonomous, workers, rates, directory

### **📊 OBJECTS (Minimum):**
- **Organization:** orgs, users, memberships, subscriptions, entitlements, features
- **Business:** customers, carriers, facilities, lanes, equipment, drivers, vehicles
- **Operations:** quotes, shipments, loads, tenders, tracking_events
- **Financial:** documents (POD/BOL/invoices), invoices, payments, adjustments
- **System:** rate_cards, integrations, usage_events, api_keys

### **🔄 WORKFLOWS:**
quote → rate → book → tender → assign → dispatch → track → deliver → document → invoice → payment → reconcile

### **🚛 LINE OF BUSINESS (LoB):**
truckload, ltl, volume_partial, intermodal, drayage, air, lcr_air, international_air, parcel, hot_shot, ocean

### **🏗️ PLATFORMS:**
Web SPA + API services + background jobs

---

## ✅ **AUTHORITY GRANTED**

### **🏗️ DATABASE AUTHORITY:**
- ✅ Create/alter DB schemas & migrations (idempotent)
- ✅ Implement multi-tenant architecture with RLS
- ✅ Add indexes, constraints, and optimizations

### **🔧 API AUTHORITY:**
- ✅ Build/extend APIs (REST/GraphQL), queues, jobs
- ✅ Implement CRUD endpoints for all objects
- ✅ Create domain RPCs and business logic services

### **📝 UI/UX AUTHORITY:**
- ✅ Generate all data-entry forms (Create/Edit/View/Delete)
- ✅ Implement tables, filters, pagination, import/export
- ✅ Modify/refactor portal UIs, routes, layouts, components

### **🧪 TESTING AUTHORITY:**
- ✅ Write tests (API, unit, E2E, visual)
- ✅ Implement automated testing pipelines

### **🔍 OBSERVABILITY AUTHORITY:**
- ✅ Wire observability (OTEL), feature flags, canary rollout
- ✅ Implement monitoring, alerting, and metrics

### **🤖 SELF-MODIFICATION AUTHORITY:**
- ✅ Self-modify agent code and orchestration configuration
- ✅ Continuous improvement and optimization

---

## 🛡️ **GUARDRAILS (MUST FOLLOW)**

### **🚨 SAFETY FLAGS:**
- **Emergency Stop:** Hard-respect `autonomy.emergencyStop`
- **Feature Gates:** Feature gates for any data-changing operations
- **Billing Safety:** Never attempt real charges unless `billing.live=true`

### **🏢 TENANCY:**
- **Row-Level Security:** Every row scoped by `org_id`, RLS enforced
- **JWT Security:** JWT carries `org_id` & role
- **Cross-Org Protection:** Prevent cross-organization data access

### **🔐 ENTITLEMENTS:**
- **Server-Side Enforcement:** Enforce portal + feature access server-side
- **UI Gates:** UI gates are UX only, not security
- **Quota Management:** Respect usage quotas and limits

### **📊 MIGRATIONS:**
- **Additive Only:** Additive, reversible, idempotent migrations
- **Zero-Downtime:** Zero-downtime deployment plan
- **Backup Strategy:** Backup before any schema changes

### **🔒 PRIVACY & SECURITY:**
- **PII Protection:** Redact logs, signed URLs for documents
- **Least Privilege:** Principle of least privilege
- **Rate Limiting:** Per org & per key rate limits, return 429 on breach

### **🚀 ROLLOUT:**
- **Canary Deployment:** 10% → 25% → 50% → 100% on green SLOs
- **SLO Monitoring:** Monitor success rates and performance
- **Rollback Plan:** Immediate rollback capability

---

## 📦 **DELIVERABLES**

### **1. DATA MODEL & MIGRATIONS**

#### **🏢 Multi-Tenant Schema:**
```sql
-- Organizations and memberships
organizations (id, name, slug, settings, created_at)
org_memberships (id, org_id, user_id, role, status, created_at)
subscriptions (id, org_id, plan_id, status, current_period_start, current_period_end)
entitlements (id, org_id, feature_key, granted_at, expires_at)
features (key, name, description, category, default_enabled)

-- Core TMS tables
customers (id, org_id, name, email, phone, address, created_at)
carriers (id, org_id, name, mc_number, dot_number, status, created_at)
facilities (id, org_id, name, address, type, created_at)
lanes (id, org_id, origin_facility_id, destination_facility_id, rate_card_id)
equipment (id, org_id, type, specifications, created_at)
drivers (id, org_id, carrier_id, name, license_number, status, created_at)
vehicles (id, org_id, carrier_id, vin, make, model, year, status, created_at)

-- Operations
quotes (id, org_id, customer_id, origin, destination, cargo_details, rate, status, created_at)
shipments (id, org_id, quote_id, load_id, status, created_at)
loads (id, org_id, shipment_id, carrier_id, driver_id, vehicle_id, status, created_at)
tenders (id, org_id, load_id, carrier_id, rate, status, created_at)
tracking_events (id, org_id, load_id, event_type, location, timestamp, created_at)

-- Financial
documents (id, org_id, load_id, type, file_url, created_at)
invoices (id, org_id, load_id, amount, status, due_date, created_at)
payments (id, org_id, invoice_id, amount, method, status, created_at)
adjustments (id, org_id, invoice_id, type, amount, reason, created_at)
rate_cards (id, org_id, name, lanes, rates, created_at)

-- System
integrations (id, org_id, type, config, status, created_at)
usage_events (id, org_id, feature_key, usage_count, timestamp, created_at)
api_keys (id, org_id, name, key_hash, permissions, created_at)
```

#### **🌱 Seeds:**
- Features & LoB rules
- Plan → entitlements snapshot & overrides
- Default rate cards and lanes

### **2. API & SERVICES**

#### **🔗 CRUD Endpoints:**
```typescript
// Core CRUD for all objects
GET    /api/v1/{resource}          // List with search, filter, sort, pagination
POST   /api/v1/{resource}          // Create
GET    /api/v1/{resource}/{id}     // Read
PUT    /api/v1/{resource}/{id}     // Update
DELETE /api/v1/{resource}/{id}     // Delete
POST   /api/v1/{resource}/bulk     // Bulk operations
POST   /api/v1/{resource}/import   // CSV import
GET    /api/v1/{resource}/export   // CSV export
```

#### **🏭 Domain RPCs:**
```typescript
// Business logic services
POST /api/v1/rpc/price_quote       // Generate pricing
POST /api/v1/rpc/generate_tender   // Create tender
POST /api/v1/rpc/assign_carrier    // Assign carrier to load
POST /api/v1/rpc/dispatch_load     // Dispatch load
POST /api/v1/rpc/record_tracking   // Record tracking event
POST /api/v1/rpc/close_load        // Close load
POST /api/v1/rpc/issue_invoice     // Generate invoice
POST /api/v1/rpc/post_payment      // Record payment
```

#### **🔐 Middleware:**
```typescript
// Security and entitlement middleware
requirePortal()                    // Portal access check
requireFeatureWithQuota()          // Feature + quota check
requireOrgAccess()                 // Organization access
requireRole()                      // Role-based access
meterUsage()                       // Usage metering
rateLimit()                        // Rate limiting
```

### **3. UI/UX (All Portals)**

#### **📝 Form Kits:**
- Server + client validation
- Autosave drafts
- Optimistic updates
- File uploads with signed URLs

#### **📊 Tables:**
- Column chooser
- Saved views
- CSV export
- Infinite/virtualized lists (>200 rows)
- Bulk actions

#### **🧙‍♂️ Wizards:**
- Quote → Book → Tender workflow
- LoB-aware dynamic fields
- Auto-defaults and checklists
- Progress tracking

#### **🔒 Entitlement Locks:**
- Locked states with "Upgrade" CTA
- Feature gates for premium features
- Usage quota indicators

#### **📄 Documents Center:**
- POD/BOL/Invoices preview
- Audit trail
- Version control
- Digital signatures

#### **🔍 Global Search:**
- Loads/shipments/customers search
- Keyboard navigation
- Recent items
- Saved searches

#### **📱 Responsive Design:**
- Mobile/tablet/desktop
- WCAG 2.2 AA compliance
- Touch-friendly interfaces

### **4. BUSINESS LOGIC**

#### **💰 Rate Engine:**
```typescript
interface RateCalculation {
  baseRate: number;
  accessorials: AccessorialCharge[];
  lobModifiers: LoBModifier[];
  laneAdjustments: LaneAdjustment[];
  fuelSurcharge: number;
  totalRate: number;
}
```

#### **📋 Tendering:**
- Email/API/Portal tendering
- SLA timers
- Escalation paths
- Auto-assignment rules

#### **📍 Real-time Tracking:**
- Webhooks/simulated tracking
- Exception alerts
- ETA calculations
- Geofencing

#### **💳 Billing Flow:**
- Invoice generation
- Adjustments
- Payments
- Reconciliation

### **5. OBSERVABILITY & OPS**

#### **📊 OTEL Integration:**
- Spans for every page/API
- p95 route paint ≤ 2.5s
- Success rate ≥ 98%
- Distributed tracing

#### **🚩 Feature Flags:**
```typescript
// Core feature flags
tms.fullBuild.enabled: boolean;
autonomy.emergencyStop: boolean;
obs.otelEnabled: boolean;

// Portal feature flags
portal.broker.enabled: boolean;
portal.carrier.enabled: boolean;
portal.shipper.enabled: boolean;
// ... all 20 portals

// Feature-specific flags
maps.enabled: boolean;
billing.live: boolean;
ai.matching.enabled: boolean;
```

#### **🏥 Health Monitoring:**
- Agent readiness
- Database connectivity
- Queue health
- External service status

---

## 🚀 **ROLLOUT PLAN**

### **🎯 MODE: Canary by Environment & Org Cohort**

#### **Phase 1: Enable Feature Flag (10%)**
```sql
-- Enable full build (canary 10%)
INSERT INTO feature_flags_v2(key, scope, value) VALUES
('tms.fullBuild.enabled', 'global', jsonb_build_object('mode', 'canary', 'ratio', 0.10)),
('autonomy.emergencyStop', 'global', false),
('obs.otelEnabled', 'global', true)
ON CONFLICT (key, scope) DO UPDATE SET value = excluded.value;
```

#### **Phase 2: Smoke Testing**
- Login functionality
- Portal selection
- CRUD sanity on loads/quotes/customers
- Basic workflow testing

#### **Phase 3: SLO Monitoring**
- Monitor success ≥ 98%
- Monitor p95 ≤ 2.5s for 30-60 minutes
- Ramp up: 25% → 50% → 100%

#### **Phase 4: Rollback Plan**
```sql
-- Rollback command
UPDATE feature_flags_v2
SET value = jsonb_build_object('mode', 'off')
WHERE key = 'tms.fullBuild.enabled' AND scope = 'global';
```

---

## ✅ **ACCEPTANCE CRITERIA (DONE-WHEN)**

### **🌐 Portals:**
- [ ] All 20 portals render behind auth/role/feature gates
- [ ] No 404s on valid routes
- [ ] Deprecated paths return 410

### **📝 CRUD Operations:**
- [ ] Create/Edit/View/Delete operational for all core objects
- [ ] CSV import/export works for all entities
- [ ] Bulk operations functional

### **🔄 Workflows:**
- [ ] quote→book→tender→dispatch→track→POD→invoice→payment completes E2E
- [ ] All workflow steps have proper validation
- [ ] Error handling and recovery implemented

### **🚛 Line of Business:**
- [ ] Selecting any LoB reveals correct fields, docs, validations
- [ ] Pricing rules apply correctly per LoB
- [ ] Document requirements vary by LoB

### **🔐 Security:**
- [ ] RLS enforced on all tables
- [ ] Cross-org access denied
- [ ] Rate limits & metering active

### **📊 SLOs:**
- [ ] p95 route paint ≤ 2.5s
- [ ] Success rate ≥ 98% during canary and after 100%

### **📋 Evidence:**
- [ ] artifacts folder contains flags.json, schema.sql, postman.json
- [ ] Screenshots, p95.csv, trace-sample.txt, visual-diff.html
- [ ] Test logs and performance metrics

### **🔄 Backout:**
- [ ] One-command flag rollback restores pre-change UX
- [ ] Data safe and consistent

---

## 🤖 **TASK REGISTRY ENTRY**

```json
{
  "key": "tms.full_build.v1",
  "priority": "critical",
  "owner": "orchestrator",
  "slo": { 
    "p95_ms": 2500, 
    "success_rate": 0.98 
  },
  "flags": [
    "tms.fullBuild.enabled", 
    "autonomy.emergencyStop"
  ],
  "steps": [
    "db.migrate.multitenant",
    "seed.features.entitlements.lob",
    "api.generate.crud",
    "api.domain.workflows",
    "ui.forms.tables.wizards",
    "ui.entitlement.locks",
    "imports.exports.csv",
    "observability.otel",
    "tests.api.e2e.visual",
    "canary.rollout",
    "evidence.capture"
  ],
  "rollback": [
    "flag.off:tms.fullBuild.enabled", 
    "open.incident.with.traces"
  ]
}
```

---

## 🚨 **EMERGENCY PROCEDURES**

### **If SLOs or Compliance Breached:**
1. **Immediate Action:** Flip `tms.fullBuild.enabled` → off
2. **Reduce Load:** Reduce parallelism by 50%
3. **Document:** Attach trace links to incident
4. **Evidence:** Post the evidence pack
5. **Investigate:** Root cause analysis
6. **Fix:** Implement fixes before re-enabling

### **Emergency Stop:**
```sql
-- Emergency stop all autonomous operations
UPDATE feature_flags_v2
SET value = jsonb_build_object('enabled', true)
WHERE key = 'autonomy.emergencyStop' AND scope = 'global';
```

---

## 🎉 **FULL AUTHORITY ACTIVATED**

**The autonomous agents now have COMPLETE AUTHORITY to:**

1. **Build the entire TMS system** end-to-end
2. **Implement all CRUD operations** for every entity
3. **Create all forms and workflows** with validation
4. **Build all 20 portals** with full functionality
5. **Implement business logic** for rates, routing, billing
6. **Add observability and monitoring** throughout
7. **Deploy safely** with canary rollout and rollback
8. **Deliver evidence pack** for audit and verification

**🚀 AUTONOMOUS TMS FULL BUILD SYSTEM - READY FOR EXECUTION!**

The agents will now systematically complete your entire TMS system with production-grade quality, security, and observability. No human intervention required!
