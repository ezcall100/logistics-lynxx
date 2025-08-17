# 🚀 AUTONOMOUS COMPLIANCE & PACKAGES SYSTEM

## 🎯 **OPERATOR PROMPT — FULL AUTHORITY COMPLIANCE & PACKAGES BUILD**

### **MISSION:**
Deliver production-grade integrations and onboarding packages for a SaaS TMS:

- **Regulatory:** US DOT/FMCSA identity & authority checks
- **Business Risk:** Insurance/COI ingestion & validation
- **Tax:** EIN/TIN verification flow
- **Onboarding:** Carrier Package, Shipper Package, Broker Package (forms, docs, e-sign, approvals)
- **Everywhere CRUD:** Create/Edit/View/Delete + imports/exports + audit trails

---

## ✅ **AUTHORITY GRANTED**

### **🏗️ DATABASE AUTHORITY:**
- ✅ Create/alter DB schemas & migrations (idempotent)
- ✅ Implement multi-tenant architecture with RLS

### **🔧 BACKEND AUTHORITY:**
- ✅ Build backend services/APIs, queues, schedulers, webhooks
- ✅ Implement adapters for DOT/FMCSA, Insurance, EIN with pluggable providers

### **📝 UI/UX AUTHORITY:**
- ✅ Generate all forms & tables (validation, file upload, e-sign placeholders)
- ✅ Add pages to all relevant portals, gating by entitlements/roles

### **🧪 TESTING & OBSERVABILITY AUTHORITY:**
- ✅ Add tests (unit/API/E2E/visual), observability (OTEL), and evidence capture
- ✅ Self-modify agent/orchestrator config

---

## 🚩 **FEATURE FLAGS (SEED)**

```sql
-- Enable compliance and packages system
INSERT INTO feature_flags_v2(key, scope, value) VALUES
('compliance.enabled', 'global', true),
('compliance.usdot.enabled', 'global', true),
('compliance.insurance.enabled', 'global', true),
('compliance.ein.enabled', 'global', true),
('packages.onboarding.enabled', 'global', true),
('autonomy.emergencyStop', 'global', false),
('obs.otelEnabled', 'global', true)
ON CONFLICT (key, scope) DO UPDATE SET value = excluded.value;
```

---

## 🔐 **ENVIRONMENT VARIABLES & SECRETS**

### **FMCSA Integration:**
- `FMCSA_API_BASE` - FMCSA API base URL
- `FMCSA_API_KEY` - FMCSA API authentication key
- `FMCSA_SANDBOX_MODE` - Enable sandbox mode for testing

### **Insurance/COI Integration:**
- `INSURANCE_API_BASE` - Insurance provider API base URL
- `INSURANCE_API_KEY` - Insurance provider API key
- `ACORD_PARSER_ENABLED` - Enable ACORD PDF parsing
- `INSURANCE_SANDBOX_MODE` - Enable sandbox mode

### **EIN/TIN Verification:**
- `TIN_API_BASE` - TIN verification API base URL
- `TIN_API_KEY` - TIN verification API key
- `TIN_SANDBOX_MODE` - Enable sandbox mode

### **Document Storage:**
- `S3_BUCKET_UPLOADS` - S3 bucket for document uploads
- `S3_SIGNING_KEY` - S3 signing key for secure URLs
- `SUPABASE_STORAGE_BUCKET` - Supabase storage bucket

---

## 🗄️ **DATA MODEL (NEW TABLES)**

### **🏢 Multi-Tenant Schema with RLS:**

```sql
-- Core compliance entities
CREATE TABLE IF NOT EXISTS compliance_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  kind VARCHAR(20) NOT NULL CHECK (kind IN ('carrier', 'broker', 'shipper')),
  legal_name VARCHAR(255) NOT NULL,
  dba VARCHAR(255),
  fein VARCHAR(20),
  dot_number VARCHAR(20),
  mc_number VARCHAR(20),
  country VARCHAR(3) DEFAULT 'USA',
  address JSONB,
  phone VARCHAR(50),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- US DOT/FMCSA profiles
CREATE TABLE IF NOT EXISTS usdot_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES compliance_entities(id),
  dot_number VARCHAR(20) NOT NULL,
  mc_number VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  authority JSONB,
  safety JSONB,
  last_checked_at TIMESTAMP DEFAULT NOW(),
  source_meta JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insurance policies
CREATE TABLE IF NOT EXISTS insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES compliance_entities(id),
  provider VARCHAR(255) NOT NULL,
  policy_number VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('auto_liability', 'cargo', 'workers_comp')),
  limits JSONB,
  effective_from DATE NOT NULL,
  effective_to DATE NOT NULL,
  active BOOLEAN DEFAULT true,
  last_verified_at TIMESTAMP DEFAULT NOW(),
  source_meta JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- COI documents
CREATE TABLE IF NOT EXISTS coi_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES compliance_entities(id),
  storage_url TEXT NOT NULL,
  hash VARCHAR(64) NOT NULL,
  parsed JSONB,
  valid_from DATE,
  valid_to DATE,
  extracted_limits JSONB,
  issuer VARCHAR(255),
  errors JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- EIN verifications
CREATE TABLE IF NOT EXISTS ein_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES compliance_entities(id),
  fein VARCHAR(20) NOT NULL,
  legal_name_claimed VARCHAR(255) NOT NULL,
  result VARCHAR(20) NOT NULL CHECK (result IN ('match', 'no_match', 'error', 'pending')),
  checked_at TIMESTAMP DEFAULT NOW(),
  provider_meta JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding packages
CREATE TABLE IF NOT EXISTS onboarding_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES compliance_entities(id),
  package_type VARCHAR(20) NOT NULL CHECK (package_type IN ('carrier', 'shipper', 'broker')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  risk_score NUMERIC(5,2),
  checklist JSONB,
  submitted_at TIMESTAMP,
  decided_at TIMESTAMP,
  decided_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding steps
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES onboarding_packages(id),
  code VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'skipped')),
  data JSONB,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  actor_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  diff JSONB,
  ip INET,
  ua TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE compliance_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE usdot_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE coi_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ein_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

---

## 🔌 **PROVIDER ADAPTERS (PLUGGABLE)**

### **DOT/FMCSA Provider Interface:**
```typescript
export interface FmcsaProvider {
  getCompanyByDOT(dot: string): Promise<{
    legalName: string;
    dba?: string;
    dot: string;
    mc?: string;
    authority: {
      common?: string;
      contract?: string;
      broker?: string;
      status: 'active' | 'inactive' | 'not_found';
    };
    safety?: {
      outOfService?: boolean;
      oosDate?: string;
      inspections?: number;
      crashes?: number;
    };
    address?: {
      line1: string;
      city: string;
      state: string;
      zip: string;
    };
    source: {
      provider: 'api' | 'snapshot';
      fetchedAt: string;
    };
  }>;
}
```

### **Insurance/COI Provider Interface:**
```typescript
export interface InsuranceProvider {
  getActivePolicies(entity: {
    legalName: string;
    fein?: string;
    dot?: string;
  }): Promise<Policy[]>;
  
  validateCOI(file: Buffer): Promise<{
    valid: boolean;
    extracted: {
      limits: any;
      insured: string;
      insurer: string;
      period: {
        from: string;
        to: string;
      };
    };
  }>;
}
```

### **EIN/TIN Provider Interface:**
```typescript
export interface TinProvider {
  verify(fein: string, legalName: string): Promise<{
    result: 'match' | 'no_match' | 'error';
    ref?: string;
  }>;
}
```

### **Adapter Implementations:**
- **Sandbox Adapters:** Fake data + deterministic scenarios
- **REST Adapters:** Configurable API base/key
- **HTML/Snapshot Adapters:** Cache + parser with ToS-safe throttling

---

## 🔗 **API ENDPOINTS (SERVER)**

### **Compliance Endpoints:**
```typescript
// US DOT/FMCSA Lookup
POST /api/compliance/usdot/lookup
// Inputs: {dot|mc|legalName}
// Writes: usdot_profiles
// Returns: canonical company snapshot

// Insurance Verification
POST /api/compliance/insurance/verify
// Inputs: {entityId}
// Action: pulls policies, upserts insurance_policies

// COI Upload
POST /api/compliance/coi/upload (multipart)
// Action: virus scan → store → parse ACORD → save coi_documents

// EIN Verification
POST /api/compliance/ein/verify
// Inputs: {entityId, fein, legalName}
// Writes: ein_verifications

// Compliance Status
GET /api/compliance/status?entityId=...
// Returns: merged DOT/FMCSA + Insurance + EIN summary + risk_score
```

### **Onboarding Package Endpoints:**
```typescript
// Create Package
POST /api/packages/:type(carrier|shipper|broker)/create
// Creates: onboarding_packages + default onboarding_steps

// Submit Package
POST /api/packages/:id/submit
// Action: validate required docs, lock forms, set submitted

// Decision (Admin only)
POST /api/packages/:id/decision
// Action: approve/reject + reasons
```

### **CRUD Endpoints:**
- Full CRUD for `compliance_entities` and all supporting tables
- All write endpoints instrumented with `requireFeatureWithQuota` and metering
- Webhooks: `/webhooks/insurance`, `/webhooks/ein` for async provider callbacks

---

## 🎨 **UI FLOWS (FORMS & PAGES)**

### **Carrier Package (Carrier Portal + SuperAdmin):**

#### **Steps:**
1. **Company Identity**
   - Legal name, DBA, FEIN, DOT/MC
   - EIN verify button with result badge

2. **FMCSA Snapshot**
   - Preview card with out-of-service banner
   - Authority chips (Common/Contract/Broker)

3. **Insurance & COI**
   - Upload COI with drag-drop
   - Parse limits, show "Meets minimums?" check

4. **Banking & W-9**
   - File upload interface

5. **Safety & Compliance**
   - Policies, driver list placeholder, certificates

6. **Review & Submit**
   - Summary, risk score, e-sign placeholder

### **Shipper Package:**
- Company identity + EIN verify
- Liability requirements (set minimums)
- NDA/e-sign placeholder
- Payment terms, contacts
- Review & Submit

### **Broker Package:**
- Company identity + MC authority check
- Trust/surety bond document upload
- Insurance & COI
- EIN verify
- Review & Submit

### **Reusable Components:**
- `ComplianceStatusCard` - Badges: EIN, FMCSA, Insurance, COI, Risk
- `COIUploadCard` - Drag-drop, parse results, extracted limits table
- `AuthorityChipSet` - Common/Contract/Broker Active/Inactive
- `RiskScoreGauge` - Visual risk indicator
- `ChecklistPanel` - Driven by onboarding_steps

### **Tables & CRUD:**
- Entities, policies, docs with CSV import/export
- Filters, saved views, audit log side-drawer

---

## ⏰ **SCHEDULERS & JOBS**

### **Automated Tasks:**
- **Weekly FMCSA re-check** for active carriers (backoff + cache)
- **Monthly EIN re-check** for deltas (or only on profile change)
- **Policy expiry watchdog** (D-30, D-7, D-0 alerts)
- **COI re-parse** on upload with hash dedupe

### **SLI Events:**
- `compliance.lookup.usdot`
- `insurance.verify`
- `ein.verify`
- `package.submit`

---

## 🛡️ **SECURITY & COMPLIANCE GUARDS**

### **Privacy & Consent:**
- Consent & permissible purpose screen before external checks
- PII: FEIN encryption at rest, never log full, mask UI

### **Document Security:**
- Signed URLs for document access
- Anti-virus scan on uploads
- Content-type checks and size limits

### **Provider Compliance:**
- Respect provider ToS
- Throttle requests appropriately
- No scraping against disallowed sources

### **Access Control:**
- RLS + least privilege service roles
- Rate limits per org & per feature
- 429 response on rate limit breach

### **Audit Trail:**
- Audit logs for every decision & data change
- Complete audit trail for compliance

---

## 📊 **OBSERVABILITY & SLOs**

### **OpenTelemetry Integration:**
- OTEL spans labeled with org_id, entity_id, provider, result
- SLO: success ≥ 98%, p95 endpoint ≤ 2500ms
- Error budget alerts

### **Dashboards:**
- Verifications per day
- COI validity percentage
- Authority changes
- Upcoming policy expirations

---

## 🚀 **ROLLOUT & BACKOUT**

### **Canary Deployment:**
Enable `compliance.enabled` for 10% of orgs → 25% → 50% → 100% when SLO green for 60 minutes.

### **Backout (One-liner):**
```sql
UPDATE feature_flags_v2 
SET value = jsonb_build_object('mode', 'off')
WHERE key IN ('compliance.enabled', 'packages.onboarding.enabled') 
AND scope = 'global';
```

---

## ✅ **ACCEPTANCE CRITERIA (DONE-WHEN)**

### **Package Functionality:**
- [ ] All three packages (carrier/shipper/broker) can be created, edited, submitted, approved
- [ ] EIN verify, US DOT/FMCSA snapshot, Insurance/COI work in sandbox
- [ ] Production guarded by `billing.live=true`

### **Compliance Features:**
- [ ] Unified Compliance Status visible in Admin + relevant portals
- [ ] Risk score computed and displayed
- [ ] Full CRUD + tables + CSV import/export
- [ ] Document uploads parsed & stored
- [ ] Audit logs populated

### **Automation:**
- [ ] Schedulers re-check data
- [ ] Alerts for expirations
- [ ] SLOs met

### **Evidence:**
- [ ] Evidence pack saved at `artifacts/compliance/<YYYY-MM-DD>/`
- [ ] Includes: flags.json, schema.sql, postman_collection.json, sample payloads, screenshots, visual-diff.html, p95.csv, trace-sample.txt, test logs

---

## 🤖 **TASK REGISTRY ENTRY**

```json
{
  "key": "compliance.integrations.v1",
  "priority": "critical",
  "flags": [
    "compliance.enabled",
    "packages.onboarding.enabled",
    "autonomy.emergencyStop"
  ],
  "steps": [
    "db.migrate.compliance",
    "adapters.fmcsa.install",
    "adapters.insurance.install",
    "adapters.tin.install",
    "api.endpoints.compliance",
    "ui.packages.build",
    "jobs.schedulers.setup",
    "obs.slo.dashboards",
    "tests.api.e2e.visual",
    "canary.rollout",
    "evidence.capture"
  ],
  "slo": {
    "p95_ms": 2500,
    "success_rate": 0.98
  },
  "rollback": [
    "flag.off:compliance.enabled",
    "flag.off:packages.onboarding.enabled"
  ]
}
```

---

## 📝 **AGENT NOTES**

### **Provider Integration:**
- Use sandbox connectors until prod credentials are present
- Surface "Not Authorized" for TIN where applicable
- Normalize DOT/MC formatting
- De-dupe entities by DOT+EIN where safe

### **Document Processing:**
- Parse ACORD PDFs to extract limits/dates
- Mark expiring soon (≤30 days)
- Cache FMCSA responses
- Avoid hammering public endpoints

### **User Experience:**
- All flows must be replayable
- Produce clear audit trail
- Surface clear, human-actionable status (Pending, Needs Attention, Provider Error)
- Allow manual document upload as fallback (keeps onboarding unblocked)

---

## 🎉 **FULL AUTHORITY ACTIVATED**

**The autonomous agents now have COMPLETE AUTHORITY to:**

1. **Build US DOT/FMCSA integration** with pluggable providers
2. **Implement Insurance/COI validation** with ACORD parsing
3. **Create EIN/TIN verification** with multiple providers
4. **Build Carrier/Shipper/Broker packages** with full onboarding flows
5. **Implement comprehensive CRUD** for all compliance entities
6. **Add security and audit trails** throughout the system
7. **Deploy with canary rollout** and rollback capabilities
8. **Deliver evidence pack** for audit and verification

**🚀 AUTONOMOUS COMPLIANCE & PACKAGES SYSTEM - READY FOR EXECUTION!**

The agents will now systematically complete your entire compliance and onboarding system with production-grade quality, security, and observability. No human intervention required!
