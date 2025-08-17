# Lines of Business (LoB) Configuration Execution Brief

## 🎯 **OPERATOR PROMPT**
**"Configure advanced Lines of Business (LoB) for first-time TMS setup"**

## 🚀 **MISSION**
Implement a comprehensive, declarative Lines of Business configuration system that enables multi-modal transportation management with clean data models, strict validation, portal/plan mapping, workflow differences, compliance, pricing hooks, and monitoring.

## 🧠 **MENTAL MODEL (Keep it Simple)**

- **LoB** = a commercial product you sell (Truckload, LTL, Ocean...)
- **Mode** = how it moves (truck/rail/air/ocean)
- **Service options** = speed/quality add-ons (expedited, white-glove...)
- **Equipment** = the physical asset (53' dry van, 40' container, sprinter...)
- **"All"** = a UI filter only (never stored)

## 📋 **IMPLEMENTATION SPECIFICATIONS**

### 1. **CANONICAL LOBS (Normalized)**

Use a small, explicit list; keep labels separate for i18n.

```typescript
export const LOB = [
  "truckload",          // FTL
  "ltl",                // Less Than Truckload
  "volume_partial",     // 8–18 pallets
  "intermodal",         // rail + dray legs
  "drayage",
  "air",
  "lcr_air",            // low-cost regional air
  "international_air",
  "parcel",
  "hot_shot",           // expedited pickup trailers/sprinter
  "ocean"               // FCL/LCL
] as const;
export type LobKey = typeof LOB[number];
```

### 2. **DATABASE SCHEMA**

```sql
create table if not exists lob (
  key text primary key,                -- e.g., 'intermodal'
  mode text not null,                  -- 'truck'|'rail'|'air'|'ocean'|'mixed'
  active boolean default true
);

insert into lob(key, mode) values
('truckload','truck'),
('ltl','truck'),
('volume_partial','truck'),
('intermodal','mixed'),
('drayage','truck'),
('air','air'),
('lcr_air','air'),
('international_air','air'),
('parcel','truck'),
('hot_shot','truck'),
('ocean','ocean')
on conflict (key) do nothing;
```

### 3. **LOB RULES (Declarative Rules)**

Declarative rules drive UI, validation, pricing, docs, and workflows.

```typescript
type RequiredField = "pieces"|"weight"|"dims"|"nmfc"|"hazmat"|"equipment"|
                     "origin"|"destination"|"incoterms"|"portLoad"|"portDischarge"|
                     "customsBroker"|"containerType"|"awbill"|"proNumber"|"isf"|"vgm";

export const LOB_RULES: Record<LobKey, {
  required: RequiredField[];
  defaults?: Record<string, unknown>;
  docs?: string[]; // human short-codes for UI (MAWB/HAWB, ISF, VGM, BOL, PRO…)
  workflowAddOns?: string[]; // steps to add in execution
}> = {
  truckload: {
    required: ["weight","equipment","origin","destination"],
    docs: ["BOL"], defaults: { equipment: "dry_van_53" }
  },
  ltl: {
    required: ["pieces","weight","dims","nmfc","origin","destination"],
    docs: ["BOL","PRO"], workflowAddOns: ["terminalConsolidation"]
  },
  volume_partial: {
    required: ["pieces","weight","dims","origin","destination"],
    docs: ["BOL"], workflowAddOns: ["sharedCapacityMatch"]
  },
  intermodal: {
    required: ["origin","destination","containerType"],
    docs: ["BOL","GateIn/Out"], workflowAddOns: ["originDray","railLineHaul","destDray"]
  },
  drayage: {
    required: ["origin","destination","containerType"],
    docs: ["BOL","GatePass"], workflowAddOns: ["terminalAppt","chassisAlloc"]
  },
  air: {
    required: ["pieces","weight","dims","origin","destination","awbill"],
    docs: ["MAWB/HAWB"], defaults: { service: "standard" }
  },
  lcr_air: {
    required: ["pieces","weight","dims","origin","destination","awbill"],
    docs: ["MAWB/HAWB"], defaults: { service: "economy" }
  },
  international_air: {
    required: ["pieces","weight","dims","origin","destination","awbill","incoterms","customsBroker"],
    docs: ["MAWB/HAWB","CommercialInvoice","PackingList","CustomsDocs"]
  },
  parcel: {
    required: ["pieces","weight","dims","origin","destination"],
    docs: ["Label"], workflowAddOns: ["labelPurchase","pickupSchedule"]
  },
  hot_shot: {
    required: ["pieces","weight","dims","origin","destination"],
    docs: ["BOL"], defaults: { equipment: "gooseneck" }, workflowAddOns: ["expediteClock"]
  },
  ocean: {
    required: ["origin","destination","containerType","incoterms","customsBroker","portLoad","portDischarge","isf","vgm"],
    docs: ["Booking","ISF","VGM","B/L","CommercialInvoice","PackingList"],
    workflowAddOns: ["booking","containerRelease","vesselDeparture","arrivalNotice"]
  }
};
```

### 4. **PORTAL MAPPING + ENTITLEMENTS**

Don't hardcode plans—tie LoBs to features so you can promo/override per org.

**Default enablement (typical):**
- **Shipper**: truckload, ltl, volume_partial, intermodal, drayage, parcel, air, lcr_air, international_air, ocean
- **Broker**: truckload, ltl, volume_partial, intermodal, air, lcr_air, international_air, hot_shot, ocean
- **Carrier**: truckload, ltl, intermodal, drayage, parcel, hot_shot, ocean

**Plan → entitlement examples:**
- **Free**: loads.core → truckload, ltl, drayage
- **Pro**: + loads.intermodal, loads.volume_partial, loads.parcel
- **Enterprise**: + loads.air, loads.ocean, loads.international_air
- **Add-ons**: edi.x12, air.awb.issuance, ocean.isf.vgm, autonomous.ai

### 5. **API GATE EXAMPLE**

```typescript
app.post("/api/loads", requireFeature("loads.core"), requireLobAccess(), createLoad);

function requireLobAccess() {
  return async (req,res,next) => {
    const lob: LobKey = req.body.lob;
    const featureMap: Record<LobKey,string> = {
      truckload: "loads.core",
      ltl: "loads.core",
      volume_partial: "loads.intermodal",
      intermodal: "loads.intermodal",
      drayage: "loads.core",
      parcel: "loads.parcel",
      air: "loads.air",
      lcr_air: "loads.air",
      international_air: "loads.air",
      hot_shot: "loads.core",
      ocean: "loads.ocean"
    };
    const feat = featureMap[lob];
    if (!await hasEntitlement(req.orgId, feat)) return res.status(402).json({ error: "feature_not_enabled", feature: feat });
    return next();
  };
}
```

### 6. **UI BEHAVIORS (Zero Confusion)**

- **Selecting a LoB** dynamically reveals only the fields from `LOB_RULES[lob].required`
- **Auto-defaults**: pre-fill equipment/service if rules provide defaults
- **Docs checklist**: render docs per LoB; mark complete when uploaded/emitted
- **Workflows**: show additional steps (e.g., Intermodal displays Origin Dray → Rail → Dest Dray)
- **"All"** = quick switch that disables LoB filtering in tables. No persistence.

### 7. **ROUTING TEMPLATES**

- **Intermodal** = Dray (A) → Rail → Dray (B)
- **Ocean FCL** = Dray (A) → Port Load → Vessel → Port Discharge → Dray (B)
- **Air Intl** = Pickup → Export → MAWB/HAWB → Flight → Import → Delivery

### 8. **COMPLIANCE MATRIX (Quick Ref)**

- **Air**: MAWB/HAWB, security screening, IATA codes
- **Intl Air**: + Commercial Invoice, Packing List, Incoterms, Customs broker
- **Ocean**: Booking, ISF, VGM, B/L, ports (UN/LOCODE)
- **LTL**: NMFC/Class, PRO
- **Dray**: Gate passes, chassis, terminal appointments
- **Parcel**: label purchase + pickup

### 9. **MONITORING (Per LoB)**

Emit SLI events: `lob.quote`, `lob.book`, `lob.doc.ready`, `lob.dispatch`, `lob.pod`, `lob.invoice`.
Watch success ≥ 98%, p95 route paint ≤ 2.5s, doc readiness SLA (e.g., ISF < 24h before vessel).

### 10. **FIRST-TIME SETUP WIZARD (Admin-Friendly)**

**Step 1**: Company profile (shipper/broker/carrier; equipment owned; lanes)
**Step 2**: Select LoBs (checklist; "All" as a view filter only)
**Step 3**: Required add-ons (show what's needed per LoB—e.g., Ocean → ISF/VGM module)
**Step 4**: Compliance (upload templates, broker of record, customs broker)
**Step 5**: Pricing sources (rate cards, APIs: LTL/SMC3, Air/IATA, Ocean/Freightos)
**Step 6**: Go-live tests (post a sample load per LoB; label/booking; docs emitted)

## 📁 **FILES TO CREATE**

### Database Migrations
- `supabase/migrations/20241201000010_lob_schema.sql`
- `supabase/seed/lob_data.sql`

### TypeScript Types & Constants
- `src/types/lob.ts`
- `src/constants/lob-rules.ts`

### Backend API & Middleware
- `src/middleware/lob-access.ts`
- `src/api/lob/rules.ts`
- `src/api/lob/validation.ts`

### Frontend Components
- `src/components/lob/LobSelector.tsx`
- `src/components/lob/LoadForm.tsx`
- `src/components/lob/WorkflowSteps.tsx`
- `src/components/lob/ComplianceMatrix.tsx`
- `src/components/lob/FirstTimeSetup.tsx`

### Services & Utilities
- `src/services/lob-service.ts`
- `src/hooks/useLobRules.ts`
- `src/utils/lob-validation.ts`
- `src/utils/lob-routing.ts`

### Files to Modify
- `src/App.tsx` (add LoB routes)
- `src/components/PortalDashboards.tsx` (integrate LoB components)
- `src/api/routes.ts` (add LoB endpoints)
- `src/middleware/auth.ts` (add LoB access control)
- `src/services/entitlements.ts` (add LoB entitlement mapping)

## 🎯 **SUCCESS METRICS**

### Functionality
- **All LoBs can be enabled per tenant via entitlements**
- **Creating loads enforces required fields per LoB**
- **All LoB workflows and routing templates implemented**
- **Portal mapping and entitlement system working**

### Performance
- **API 402 when not entitled for specific LoBs**
- **p95 & success SLOs pass for all LoB operations**
- **Fast load form rendering with dynamic fields**

### Compliance
- **All LoB compliance requirements implemented**
- **Document generation working per LoB**
- **Workflow steps properly sequenced**

### User Experience
- **Zero confusion UI with dynamic field revelation**
- **Auto-defaults working correctly**
- **"All" filter functioning as UI-only**
- **First-time setup wizard guides users effectively**

## 🧪 **TESTING SCENARIOS**

1. **Post sample load per LoB type** - Verify each LoB creates loads correctly
2. **Verify required fields enforcement** - Test validation for each LoB
3. **Test API 402 for unauthorized LoB access** - Ensure proper entitlement checking
4. **Validate workflow steps per LoB** - Check workflow templates work correctly
5. **Test compliance document requirements** - Verify document generation
6. **Verify All filter functionality (UI only)** - Ensure no persistence of "All"
7. **Test entitlement-based LoB access** - Validate portal mapping

## 🎨 **UI EXAMPLES**

### Front-end Select (LoB aware):
```typescript
<Select
  label="Line of Business"
  options={[
    { label: "Truckload (FTL)", value: "truckload" },
    { label: "LTL (Less Than Truckload)", value: "ltl" },
    { label: "Volume Partial", value: "volume_partial" },
    { label: "Intermodal (Rail + Dray)", value: "intermodal" },
    { label: "Drayage", value: "drayage" },
    { label: "Air", value: "air" },
    { label: "LCR Air (Economy)", value: "lcr_air" },
    { label: "International Air", value: "international_air" },
    { label: "Ocean (FCL/LCL)", value: "ocean" },
    { label: "Parcel", value: "parcel" },
    { label: "Hot Shot", value: "hot_shot" }
  ]}
/>
```

### Create-load payload (example Ocean FCL):
```json
{
  "lob": "ocean",
  "containerType": "40ft",
  "incoterms": "FOB",
  "portLoad": "USLAX",
  "portDischarge": "CNSHA",
  "origin": {"type": "facility", "code": "LAX-WH1"},
  "destination": {"type": "facility", "code": "SHA-DC1"},
  "customsBroker": "ACME Customs",
  "isf": {"filedAt": "2025-08-15T10:00:00Z"},
  "vgm": {"weightKg": 27650},
  "pieces": 20,
  "weight": {"value": 21000, "unit": "kg"}
}
```

## 🚀 **AUTONOMOUS AGENT INSTRUCTIONS**

### TASK: `lob.configure.v1`
### SCOPE: website + shipper/broker/carrier portals + API
### ACTIONS:

1. **Seed lob table and LOB_RULES map** - Create database schema and TypeScript constants
2. **Add REST /api/lob/rules for UI** - Expose LoB rules to frontend
3. **Wire requireLobAccess() middleware** - Implement entitlement mapping (loads.*)
4. **Implement load form field logic** - Use LOB_RULES.required with validation & docs checklist
5. **Add routing templates** - Implement Intermodal/Ocean/Air workflows
6. **Update portal selection & search filters** - Ensure "All" is UI only
7. **Add SLI events for LoB lifecycle** - Extend p95 monitor per LoB

### ACCEPTANCE:
- Post a sample load per LoB
- Docs required appear
- API 402 when not entitled

### DONE WHEN:
- All LoBs can be enabled per tenant via entitlements
- Creating loads enforces required fields per LoB
- "All" works as UI filter only
- p95 & success SLOs pass; evidence saved

## 🎨 **DESIGN AUTHORITY**

The autonomous agents have **COMPLETE AUTHORITY** to:
- ✅ Redesign LoB selection interfaces
- ✅ Modify form layouts and field arrangements
- ✅ Add Floating Action Buttons for quick LoB selection
- ✅ Implement modern workflow visualization
- ✅ Create intuitive compliance checklists
- ✅ Design responsive mobile interfaces
- ✅ Add animations and micro-interactions
- ✅ Implement accessibility improvements

## 📊 **MONITORING REQUIREMENTS**

### SLI Events
- `lob.quote` - LoB quote generation
- `lob.book` - LoB booking creation
- `lob.doc.ready` - Document readiness
- `lob.dispatch` - Load dispatch
- `lob.pod` - Proof of delivery
- `lob.invoice` - Invoice generation

### Performance Metrics
- **Success rate ≥ 98% per LoB**
- **p95 route paint ≤ 2.5s per LoB**
- **Document readiness SLA monitoring**
- **LoB-specific performance metrics**

---

**Status**: 🎯 Ready for autonomous agent implementation
**Priority**: 🔥 Critical - Multi-modal transportation management
**Timeline**: ⏱️ 2-3 weeks for complete implementation
**Authority**: 🎨 Full UI/UX design authority granted
**Scope**: 🚛 Complete LoB configuration system with declarative rules and workflow automation
