# User Control & Access Control (RBAC + ABAC + Entitlements) Execution Brief

## 🎯 **OPERATOR PROMPT**
**"Implement production-grade User Control & Access Control system"**

## 🚀 **MISSION**
Implement a comprehensive, production-grade access control system that provides tenant isolation, role-based access control (RBAC), attribute-based access control (ABAC), plan entitlements, temporary elevation, comprehensive audits, and secure API access.

## 🛡️ **PRINCIPLES**

- **Tenant-first isolation** (org_id + RLS everywhere)
- **Least privilege by default; deny by default**
- **Two dimensions of access**:
  - Who you are (role/permissions) → RBAC/ABAC
  - What you paid for (plan/licensing) → Entitlements
- **One enforcement path**: UI hints for UX, server is the source of truth
- **Everything is auditable** (who/what/when/why)

## 📋 **IMPLEMENTATION SPECIFICATIONS**

### 1. **ROLES, PERMISSIONS, AND ENTITLEMENTS**

#### Default Roles (per org)
| Role | Purpose |
|------|---------|
| owner | Full org control |
| admin | Users, billing, settings |
| broker_admin | Brokerage ops, pricing |
| shipper_admin | Shipper ops |
| carrier_admin | Carrier ops |
| driver | Driver app |
| analyst | Read/analytics |
| ops | Dispatch/operations |
| billing_admin | Invoices/payments |
| auditor | Read-only + exports |
| read_only | View only |

**Support custom roles per org, with override capabilities.**

#### Permission Verbs & Resources
**Verbs**: read, create, update, delete, manage, approve, export, configure

**Resources**: portal, load, tender, rate, invoice, payment, document, user, api_key, feature_flag

#### Entitlements (by plan/add-ons)
- Plan decides feature availability (e.g., analytics.advanced, edi.x12, autonomous.ai)
- Role decides what you can do with that feature
- LoB access is mapped to features (e.g., loads.ocean, loads.air)

### 2. **DATA MODEL (Postgres)**

```sql
-- Base RBAC
create table if not exists roles (
  key text primary key,                 -- 'admin', 'driver', ...
  description text
);

create table if not exists permissions (
  key text primary key,                 -- 'load.create', 'invoice.export', ...
  resource text not null,
  action text not null
);

create table if not exists role_permissions (
  role_key text references roles(key) on delete cascade,
  permission_key text references permissions(key) on delete cascade,
  primary key (role_key, permission_key)
);

-- User membership (you already have)
-- org_memberships(org_id uuid, user_id uuid, role text)

-- Optional: Custom roles & overrides (per org)
create table if not exists custom_roles (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  key text not null,
  label text not null,
  unique(org_id, key)
);

create table if not exists custom_role_permissions (
  custom_role_id uuid references custom_roles(id) on delete cascade,
  permission_key text references permissions(key) on delete cascade,
  primary key (custom_role_id, permission_key)
);

-- Attribute-based controls (ABAC) for scoping by LoB/region
create table if not exists permission_scopes (
  id bigserial primary key,
  org_id uuid not null,
  subject_type text not null check (subject_type in ('role','custom_role','user')),
  subject_key text not null,           -- role key OR custom_role_id OR user_id
  attribute jsonb not null             -- e.g., {"lob":["ltl","ocean"],"region":["US","CA"]}
);

-- Entitlements (plan/add-ons) - you already seed via 'features'/'entitlements'
-- API keys (scoped) - you already have api_keys with scopes[]

-- Temporary elevation requests
create table if not exists access_requests (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  user_id uuid not null,
  requested_permissions text[] not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending','approved','denied','expired')),
  expires_at timestamp with time zone,
  approved_by uuid,
  approved_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- User custom roles assignment
create table if not exists user_custom_roles(
  org_id uuid not null,
  user_id uuid not null,
  custom_role_id uuid references custom_roles(id) on delete cascade,
  primary key(org_id, user_id, custom_role_id)
);
```

### 3. **HELPER FUNCTIONS**

```sql
-- Has a named permission? (RBAC/custom role/direct grant)
create or replace function has_permission(p_org uuid, p_user uuid, p_permission text)
returns boolean language sql stable as $$
  with mem as (
    select m.role from org_memberships m where m.org_id=p_org and m.user_id=p_user
  ),
  role_ok as (
    select 1 from role_permissions rp
    join mem on rp.role_key = mem.role
    where rp.permission_key = p_permission
  ),
  custom_ok as (
    select 1 from custom_role_permissions crp
    join custom_roles cr on crp.custom_role_id=cr.id and cr.org_id=p_org
    join user_custom_roles ucr on ucr.custom_role_id=cr.id and ucr.user_id=p_user
    where crp.permission_key = p_permission
  )
  select exists(select 1 from role_ok)
      or exists(select 1 from custom_ok);
$$;

-- Entitlement check (already similar): has_entitlement(p_org, 'loads.ocean')
```

### 4. **ENFORCEMENT (Backend)**

```typescript
// requireEntitlement + requirePermission + optional ABAC attributes (e.g., LoB)
export function requireAccess({
  entitlement,                 // e.g. 'loads.ocean'
  permission,                  // e.g. 'load.create'
  attrs                        // e.g. { lob:'ocean', region:'US' }
}: { entitlement?: string; permission?: string; attrs?: Record<string,unknown> }) {
  return async (req, res, next) => {
    const orgId = req.auth?.org_id;
    const userId = req.auth?.sub;
    if (!orgId || !userId) return res.status(401).json({ error: "unauthorized" });

    if (entitlement) {
      const ok = await req.db.rpc("has_entitlement", { p_org: orgId, p_feature: entitlement });
      if (!ok?.data) return res.status(402).json({ error: "feature_not_enabled", feature: entitlement });
    }

    if (permission) {
      const ok = await req.db.rpc("has_permission", { p_org: orgId, p_user: userId, p_permission: permission });
      if (!ok?.data) return res.status(403).json({ error: "forbidden", permission });
    }

    if (attrs && !(await abacAllowed(req, orgId, userId, attrs))) {
      return res.status(403).json({ error: "forbidden_attr", attrs });
    }

    return next();
  };
}

// Example: create load for Ocean
app.post("/api/loads",
  requireAccess({ entitlement: "loads.ocean", permission: "load.create", attrs: { lob: "ocean" } }),
  createLoadHandler
);

// ABAC evaluation (sketch)
async function abacAllowed(req, orgId, userId, attrs) {
  // Query permission_scopes for user -> custom_role -> role in that org
  // Ensure requested attrs (e.g., {lob:'ocean'}) are subset of granted scopes
  return true; // implement per your store
}
```

### 5. **ENFORCEMENT (Frontend UX)**

Portal selection: hide or gray-out cards the user lacks entitlement for; add Upgrade CTA.

Feature UI: wrap panels with a FeatureGate and PermissionGate.

Inline locked state: show what's missing ("Requires: Enterprise + Ocean add-on").

Just-In-Time access: "Request access" opens an approval ticket.

```typescript
<FeatureGate feature="loads.ocean" fallback={<UpgradeCTA plan="enterprise" addon="ocean" />}>
  <PermissionGate permission="load.create">
    <OceanBookingForm />
  </PermissionGate>
</FeatureGate>
```

### 6. **TEMPORARY ELEVATION & APPROVALS**

**Use cases**: auditor read, emergency ops, support impersonation (read-only), one-off export.

**Flow**: user requests → approver (owner/admin) approves → time-boxed grant (e.g., 2 hours) → auto-revoke.

**Tables**: access_requests(org_id, user_id, requested_permissions[], reason, status, expires_at) + audit_log.

**Break-glass (production)**: opens read-only superview with extra MFA + Slack broadcast; auto-expires.

### 7. **SERVICE ACCOUNTS & API KEYS**

API keys scoped to org with scopes[] mapping to permission keys; optional LoB/region ABAC in key metadata.

Per-minute rate limits by key; 401 for invalid, 429 on breach; log to usage_events.

### 8. **AUDITS & ATTESTATIONS**

Log every allow/deny decision: {who, org, permission, entitlement, attrs, resource, result, trace_id}.

Quarterly access reviews: export per-org report of users → roles → elevated grants; owners must attest.

Evidence pack: store as daily JSON under /artifacts/access/.

### 9. **PORTALS × ROLES × ENTITLEMENTS (Quick Map)**

**Portal requires entitlement (plan)**:
- /autonomous → autonomous.ai
- /edi → edi.x12
- /analytics → analytics.advanced
- /ocean flows → loads.ocean, etc.

**Portal requires role (capability)**:
- /admin → admin|owner
- /super-admin → internal only (platform ops)

**Both must pass**: entitlement and permission.

## 📁 **FILES TO CREATE**

### Database Migrations
- `supabase/migrations/20241201000011_access_control_schema.sql`
- `supabase/seed/roles_permissions.sql`

### TypeScript Types & Constants
- `src/types/access-control.ts`
- `src/constants/roles-permissions.ts`

### Backend API & Middleware
- `src/middleware/access-control.ts`
- `src/middleware/abac.ts`
- `src/api/access-control/roles.ts`
- `src/api/access-control/permissions.ts`
- `src/api/access-control/elevation.ts`

### Frontend Components
- `src/components/access-control/FeatureGate.tsx`
- `src/components/access-control/PermissionGate.tsx`
- `src/components/access-control/AccessControlCenter.tsx`
- `src/components/access-control/TemporaryAccess.tsx`
- `src/components/access-control/ApiKeyManager.tsx`

### Services & Utilities
- `src/services/access-control.ts`
- `src/hooks/useAccessControl.ts`
- `src/utils/audit-logger.ts`
- `src/utils/access-validator.ts`

### Files to Modify
- `src/App.tsx` (add access control routes)
- `src/components/PortalDashboards.tsx` (integrate access control)
- `src/api/routes.ts` (add access control endpoints)
- `src/middleware/auth.ts` (add access control middleware)
- `src/services/entitlements.ts` (integrate with access control)

## 🎯 **SUCCESS METRICS**

### Security
- **Tenant-first isolation with org_id + RLS everywhere**
- **Least privilege by default; deny by default**
- **Everything is auditable (who/what/when/why)**

### Functionality
- **Portal cards reflect entitlements; locked states offer upgrade**
- **API enforces entitlements + permissions + ABAC (LoB/region)**
- **Temporary elevation works end-to-end with auto-revoke**

### Compliance
- **Audit & reports generated; tests pass**
- **Quarterly access reviews with attestation**
- **Daily evidence packs stored**

### User Experience
- **UI hints for UX, server is the source of truth**
- **Just-In-Time access request workflow**
- **Clear upgrade paths for locked features**

## 🧪 **TESTING SCENARIOS**

1. **Free org: cannot open /analytics (UI locked, API 402)**
2. **Pro org: can open /analytics, but cannot export invoices without invoice.export (403)**
3. **Enterprise org + ocean add-on: can create Ocean loads (200), others denied by LoB ABAC**
4. **Temporary elevation: grant invoice.export for 2h → succeeds then auto-revokes**
5. **API key with load.read only: list loads OK, create returns 403**

## 🚀 **AUTONOMOUS AGENT INSTRUCTIONS**

### TASK: `access.control.v1`
### SCOPE: API + portals + admin center
### ACTIONS:

1. **Seed roles, permissions, role_permissions** - Create database schema and default permissions
2. **Create custom_roles, custom_role_permissions, user_custom_roles** - Support custom roles per org
3. **Add permission_scopes (ABAC: lob/region)** - Implement attribute-based access control
4. **Implement SQL: has_permission(p_org,p_user,p_permission)** - Reuse has_entitlement
5. **Middleware requireAccess({entitlement,permission,attrs})** - Wire on sensitive routes
6. **Front-end FeatureGate + PermissionGate** - With locked states & upgrade CTA
7. **Admin "Access Control Center"** - People, Roles, Custom Roles, Temporary Access, API Keys, Audit
8. **Temporary elevation workflow** - access_requests with approvals + auto-expiry
9. **Emit audit events** - For every allow/deny; daily evidence pack
10. **Playwright tests** - Entitlements, permissions, ABAC, elevation, API keys

### ACCEPTANCE:
- Portal cards reflect entitlements; locked states offer upgrade
- API enforces entitlements + permissions + ABAC (LoB/region)
- Temporary elevation works end-to-end with auto-revoke
- Audit & reports generated; tests pass

### DONE WHEN:
- Portal cards reflect entitlements; locked states offer upgrade
- API enforces entitlements + permissions + ABAC (LoB/region)
- Temporary elevation works end-to-end with auto-revoke
- Audit & reports generated; tests pass

## 🎨 **DESIGN AUTHORITY**

The autonomous agents have **COMPLETE AUTHORITY** to:
- ✅ Redesign access control interfaces
- ✅ Modify permission and role management UI
- ✅ Add Floating Action Buttons for quick access requests
- ✅ Implement modern audit and reporting interfaces
- ✅ Create intuitive temporary elevation workflows
- ✅ Design responsive mobile interfaces for access control
- ✅ Add animations and micro-interactions
- ✅ Implement accessibility improvements

## 📊 **MONITORING REQUIREMENTS**

### Audit Events
- **Every allow/deny decision** with full context
- **Access request lifecycle** (request, approval, expiration)
- **Permission changes** (role assignments, custom roles)
- **API key usage** and rate limiting events

### Performance Metrics
- **Access control overhead** < 50ms per request
- **Audit log performance** - real-time logging without impact
- **Permission cache hit rates** - optimize for frequent checks

### Compliance Metrics
- **Quarterly access reviews** with attestation reports
- **Daily evidence packs** stored as JSON
- **Real-time access violation alerts**
- **Comprehensive audit trail** for all access decisions

---

**Status**: 🎯 Ready for autonomous agent implementation
**Priority**: 🔥 Critical - Security and compliance foundation
**Timeline**: ⏱️ 3-4 weeks for complete implementation
**Authority**: 🎨 Full UI/UX design authority granted
**Scope**: 🛡️ Complete access control system with RBAC, ABAC, entitlements, and audit
