# 🚀 Phase-2 Implementation: Strict Readiness + Autonomous Portal Builder

## Overview

This document provides a complete guide for implementing **Phase-2** of the TMS system, which includes:

1. **Strict /readyz endpoint** with Supabase credential validation
2. **Autonomous Portal Builder** that creates all 20 canonical portals
3. **Production-ready smoke tests** and validation scripts

## A) Strict Readiness Implementation

### 1. Environment Configuration

#### Local Development (.env)
```bash
# Supabase (strict readiness needs these)
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...   # service role (server only)
SUPABASE_ANON_KEY=eyJhbGciOiJI...           # optional (browser/public)

# Readiness policy
READYZ_MODE=strict

# OTEL (optional now, great in prod)
OTEL_ENABLED=true
OTEL_SERVICE_NAME=transbotai
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.yourdomain.com/v1/traces
```

#### GitHub Actions (CLI quick set)
```bash
gh secret set SUPABASE_URL --repo ezcall100/logistics-lynx --body "https://YOUR-PROJECT.supabase.co"
gh secret set SUPABASE_SERVICE_ROLE_KEY --repo ezcall100/logistics-lynx --body "YOUR_SERVICE_ROLE"
gh secret set SUPABASE_ANON_KEY --repo ezcall100/logistics-lynx --body "YOUR_ANON"   # optional

gh variable set READYZ_MODE --repo ezcall100/logistics-lynx --body "strict"
gh variable set PROD_HOST  --repo ezcall100/logistics-lynx --body "app.yourdomain.com"
```

### 2. Quick Verification

#### Start Health Server
```bash
# Start everything locally (web + agents + health)
npm run start:autonomous:full
```

#### Test Endpoints
```bash
# Health check (should always pass)
curl -fsS http://localhost:8089/healthz && echo "OK"

# Readiness check (strict mode with Supabase validation)
curl -fsS http://localhost:8089/readyz | jq
```

**Expected Output:**
```json
{
  "ready": true,
  "mode": "strict",
  "agentsOk": true,
  "credentialsOk": true,
  "dbOk": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

### 3. Production Smoke Test

```bash
# Run comprehensive smoke test
npm run smoke:test
```

**Expected Output:**
```
🚀 Starting Production Smoke Test...
   Host: localhost:8089
   Timeout: 5000ms

🏥 Testing /healthz endpoint...
✅ /healthz: PASSED (45ms)

🔍 Testing /readyz endpoint...
✅ /readyz: PASSED (123ms)
   Mode: strict
   Ready: true

📊 Smoke Test Results:
   Total Time: 168ms
   /healthz: ✅ PASS
   /readyz: ✅ PASS
   Overall: ✅ PASS

🎉 All smoke tests passed! System is ready for production.
```

## B) Phase-2 Autonomous Portal Builder

### 1. Portal Registry

The system uses a centralized registry at `src/portals/registry.ts` that defines all 20 canonical portals:

```typescript
export const PORTALS: PortalDef[] = [
  { 
    key: "superAdmin", 
    title: "Super Admin", 
    path: "/super-admin", 
    featureFlag: "portal.superAdmin.enabled", 
    roles: ["super_admin"],
    status: "active",
    description: "Complete system administration and oversight",
    icon: "Settings",
    color: "bg-purple-500",
    features: ["System Management", "User Administration", "Global Analytics", "Security Controls"]
  },
  // ... 19 more portals
];
```

### 2. Build All Portals

```bash
# Build all 20 portals with auth + RBAC + feature flags
npm run build:portals
```

**Expected Output:**
```
🤖 Autonomous Portal Builder - Phase 2
=====================================
Building 20 portals...

📦 Generating shared components...
   ✅ Created ProtectedRoute: src/components/auth/ProtectedRoute.tsx
   ✅ Created middleware: src/middleware/deprecated-routes.ts
   ✅ Created OTEL utilities: src/utils/otel.ts

[1/20]
🔨 Building Super Admin (/super-admin)...
   ✅ Created page: src/pages/super-admin/index.tsx
   ✅ Created component: src/components/super-admin/index.tsx
   ✅ Super Admin portal built successfully

[2/20]
🔨 Building Admin (/admin)...
   ✅ Created page: src/pages/admin/index.tsx
   ✅ Created component: src/components/admin/index.tsx
   ✅ Admin portal built successfully

...

📊 Build Summary
================
Total Portals: 20
✅ Created: 42
🔄 Updated: 0
❌ Errors: 0

🎉 All portals built successfully!
✅ Ready for testing and deployment

Next steps:
1. Run: npm run check:portals
2. Run: npm run smoke:test
3. Test each portal manually
```

### 3. Portal Validation

```bash
# Check all portals are properly configured
npm run check:portals
```

**Expected Output:**
```
🔍 Portal Configuration Check
============================
Checking 20 portals...

✅ 1. Super Admin (/super-admin)
✅ 2. Admin (/admin)
✅ 3. TMS Admin (/tms-admin)
...

📊 Portal Check Results
======================
Total Portals: 20
✅ Passed: 20
❌ Failed: 0
🔄 Deprecated Routes: ✅ Valid

🎉 All portals are properly configured!
✅ Ready for Phase-2 autonomous portal build
```

## C) Portal Features

Each portal includes:

### 1. Authentication & Authorization
- **ProtectedRoute** component with role-based access control
- **Feature flag** validation
- **Automatic redirect** to login/portal-selection

### 2. Dashboard Components
- **Real-time metrics** with sample data
- **Recent activity** feed
- **Status indicators** and badges
- **Responsive grid** layout

### 3. CRUD Operations
- **Create, Read, Update, Delete** templates
- **Error handling** and loading states
- **Optimistic updates** patterns

### 4. Observability
- **OTEL spans** with portal attributes
- **Error tracking** and status codes
- **Performance monitoring** hooks

### 5. Deprecated Route Handling
- **410 status codes** for old routes
- **JSON mapping** to canonical paths
- **Graceful degradation** patterns

## D) One-Liner Commands

### Quick Start
```bash
# Start everything locally
npm run start:autonomous:full

# Build all portals
npm run build:portals

# Validate portal configuration
npm run check:portals

# Run smoke tests
npm run smoke:test
```

### Production Verification
```bash
# Quick health check
curl -fsS http://localhost:8089/healthz && echo "OK"

# Strict readiness check
curl -fsS http://localhost:8089/readyz | jq

# Full smoke test
npm run smoke:test
```

## E) Portal URLs

Once built, all 20 portals are accessible at:

| Portal | URL | Roles | Status |
|--------|-----|-------|--------|
| Super Admin | `/super-admin` | `super_admin` | Active |
| Admin | `/admin` | `owner, admin` | Active |
| TMS Admin | `/tms-admin` | `owner, admin` | Active |
| Onboarding | `/onboarding` | `owner, admin, manager` | Active |
| Broker | `/broker` | `broker_admin, broker_user, owner, admin` | Active |
| Shipper | `/shipper` | `shipper_admin, shipper_user, owner, admin` | Active |
| Carrier | `/carrier` | `carrier_admin, carrier_user, owner, admin` | Active |
| Driver | `/driver` | `driver, carrier_admin, owner, admin` | Active |
| Owner Operator | `/owner-operator` | `owner_operator, owner, admin` | Active |
| Factoring | `/factoring` | `finance_admin, owner, admin` | Active |
| Load Board | `/load-board` | `broker_admin, carrier_user, owner, admin` | Active |
| CRM | `/crm` | `sales, owner, admin` | Active |
| Financials | `/financials` | `finance_admin, owner, admin` | Active |
| EDI | `/edi` | `edi_admin, owner, admin` | Active |
| Marketplace | `/marketplace` | `owner, admin, manager` | Active |
| Analytics | `/analytics` | `owner, admin, manager, analyst` | Active |
| Autonomous AI | `/autonomous` | `owner, admin, sre` | Active |
| Workers | `/workers` | `ops, owner, admin` | Active |
| Rates | `/rates` | `pricing, broker_admin, owner, admin` | Active |
| Directory | `/directory` | `owner, admin, manager, ops` | Active |

## F) Deprecated Routes

The following routes return 410 status codes with JSON mapping:

| Deprecated Route | Canonical Route | Status |
|------------------|-----------------|--------|
| `/carrier-admin` | `/carrier` | 410 Decommissioned |
| `/broker-admin` | `/broker` | 410 Decommissioned |
| `/shipper-admin` | `/shipper` | 410 Decommissioned |
| `/carrier-dispatch` | `/load-board` | 410 Decommissioned |

## G) Acceptance Criteria

### ✅ Strict Readiness
- [ ] `/healthz` returns 200 with version info
- [ ] `/readyz` returns 200 in strict mode with Supabase validation
- [ ] Credential validation works correctly
- [ ] Database connectivity verified
- [ ] Smoke tests pass in CI/CD

### ✅ Portal Build
- [ ] All 20 portals scaffolded with proper structure
- [ ] ProtectedRoute component with RBAC
- [ ] Feature flag integration
- [ ] Dashboard components with sample data
- [ ] CRUD operation templates
- [ ] OTEL span integration
- [ ] Error handling and loading states

### ✅ Portal Validation
- [ ] All portal files exist and are properly configured
- [ ] Deprecated routes return 410 with JSON mapping
- [ ] Portal registry validation passes
- [ ] Role and feature flag configuration correct

### ✅ Testing
- [ ] Smoke tests pass locally
- [ ] Portal check script validates all portals
- [ ] Each portal loads behind authentication
- [ ] Role-based access control works
- [ ] Feature flags enable/disable portals correctly

## H) Troubleshooting

### Readiness Check Fails
```bash
# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
echo $READYZ_MODE

# Test database connectivity manually
node -e "
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
sb.from('feature_flags_v2').select('key', { head: true }).then(console.log).catch(console.error);
"
```

### Portal Build Errors
```bash
# Check TypeScript compilation
npm run type-check

# Check for missing dependencies
npm install

# Rebuild specific portal
npm run build:portals
```

### Portal Validation Issues
```bash
# Check portal registry
cat src/portals/registry.ts

# Validate file structure
find src/pages -name "index.tsx" | wc -l
find src/components -name "index.tsx" | wc -l
```

## I) Next Steps

After successful Phase-2 implementation:

1. **Deploy to staging** and run full integration tests
2. **Implement real data** connections for each portal
3. **Add comprehensive** CRUD operations
4. **Set up monitoring** and alerting
5. **Configure production** environment variables
6. **Deploy to production** with rollback procedures

---

**🎉 Congratulations! Your TMS system now has strict readiness checks and all 20 portals are ready for autonomous operation!**
