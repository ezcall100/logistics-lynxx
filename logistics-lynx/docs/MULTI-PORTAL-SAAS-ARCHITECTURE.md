# Multi-Portal SaaS Architecture for Autonomous Agents

## Overview
This document explains the comprehensive multi-portal SaaS architecture that implements portal-level and feature-level gating, quotas, and pricing. The system supports 20 portals with core functions (free) and premium add-ons (paid), with clean separation between what's included in plans vs. what requires additional purchase.

## Core Architecture Principles

### 1. Portal-Aware Pricing & Gating
- **20 Canonical Portals**: Each portal has specific features and access levels
- **Core vs Premium vs Add-on**: Clear categorization of feature types
- **Plan-Based Access**: Different subscription tiers unlock different capabilities
- **Usage-Based Billing**: Metered features with quotas and caps

### 2. Feature Classification System
- **Core Features**: Must-have functionality included in all plans
- **Premium Features**: Advanced capabilities included in higher tiers
- **Add-on Features**: Optional features that require explicit purchase

## Database Schema Architecture

### Portal Catalog & Feature Mapping
```sql
-- 20 canonical portals
create table if not exists portals (
  key text primary key,        -- 'broker','carrier','analytics','autonomous', etc.
  title text not null,
  path text not null
);

-- Portal → feature mapping with access levels
create table if not exists portal_features (
  portal_key text references portals(key) on delete cascade,
  feature_key text references features(key) on delete cascade,
  kind text not null check (kind in ('core','premium','addon')),
  primary key (portal_key, feature_key)
);
```

### Plan Components & Quotas
```sql
-- Plan components with quotas and caps
create table if not exists plan_components (
  plan text not null,
  feature_key text not null references features(key),
  included boolean not null default true,
  monthly_quota numeric,       -- null = unlimited
  soft_cap numeric,            -- alert/throttle
  hard_cap numeric,            -- block
  primary key (plan, feature_key)
);
```

### Pricing Components
```sql
-- Flexible pricing (flat/seat/usage tiers)
create table if not exists price_components (
  feature_key text references features(key) on delete cascade,
  component text not null check (component in ('flat','seat','usage')),
  currency text not null default 'usd',
  amount_cents int,            -- for 'flat' or per-seat
  tiers jsonb,                 -- for 'usage' tiers
  primary key (feature_key, component)
);
```

### Organization Add-ons & Trials
```sql
-- Add-ons purchased per organization
create table if not exists org_addons (
  org_id uuid references organizations(id) on delete cascade,
  feature_key text references features(key) on delete cascade,
  seats int default 0,
  enabled boolean not null default true,
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  primary key (org_id, feature_key)
);

-- Trials and promotions
create table if not exists org_trials (
  org_id uuid references organizations(id) on delete cascade,
  feature_key text references features(key) on delete cascade,
  ends_at timestamptz not null,
  primary key (org_id, feature_key)
);
```

## Portal Access Resolution

### Portal Access Function
```sql
-- Check if organization can access a portal
create or replace function can_access_portal(p_org uuid, p_portal text)
returns boolean language sql stable as $$
  with base as (
    select pf.feature_key, pf.kind
    from portal_features pf
    where pf.portal_key = p_portal
  )
  select exists (
    -- Core features included by plan
    select 1 from base b
    join entitlements e on e.org_id = p_org and e.feature_key = b.feature_key and e.enabled
    where b.kind = 'core'
    union
    -- Premium/addon features enabled via entitlement
    select 1 from base b
    join entitlements e on e.org_id = p_org and e.feature_key = b.feature_key and e.enabled
    where b.kind in ('premium','addon')
  );
$$;
```

### Feature Usage Function
```sql
-- Check if organization can use a specific feature
create or replace function can_use_feature(p_org uuid, p_feature text)
returns boolean language sql stable as $$
  with ent as (
    select e.enabled, e.expires_at
    from entitlements e
    where e.org_id = p_org and e.feature_key = p_feature
  ),
  trial as (
    select 1 from org_trials t
    where t.org_id = p_org and t.feature_key = p_feature and t.ends_at > now()
  ),
  caps as (
    select pc.monthly_quota, pc.hard_cap
    from subscriptions s
    join plan_components pc on pc.plan = s.plan and s.org_id = p_org and pc.feature_key = p_feature
  ),
  used as (
    select coalesce(sum(qty),0) as m
    from usage_events
    where org_id = p_org
      and feature_key = p_feature
      and date_trunc('month', at) = date_trunc('month', now())
  )
  select coalesce((select enabled from ent), false) or exists(select 1 from trial)
  and (
    (select hard_cap is null from caps) or
    ((select m from used) < (select hard_cap from caps))
  );
$$;
```

## 20 Portal Catalog

### Portal Definitions
```sql
insert into portals(key,title,path) values
('superAdmin','Super Admin','/super-admin'),
('admin','Admin','/admin'),
('tmsAdmin','TMS Admin','/tms-admin'),
('onboarding','Onboarding','/onboarding'),
('broker','Broker','/broker'),
('shipper','Shipper','/shipper'),
('carrier','Carrier','/carrier'),
('driver','Driver','/driver'),
('ownerOperator','Owner Operator','/owner-operator'),
('factoring','Factoring','/factoring'),
('loadBoard','Load Board','/load-board'),
('crm','CRM','/crm'),
('financials','Financials','/financials'),
('edi','EDI','/edi'),
('marketplace','Marketplace','/marketplace'),
('analytics','Analytics','/analytics'),
('autonomous','Autonomous AI','/autonomous'),
('workers','Workers','/workers'),
('rates','Rates','/rates'),
('directory','Directory','/directory');
```

### Feature Classification by Portal

#### Core Features (Free in all tiers)
- **Broker Portal**: `broker.core` - Basic broker operations
- **Shipper Portal**: `shipper.core` - Basic shipper operations  
- **Carrier Portal**: `carrier.core` - Basic carrier operations
- **Driver Portal**: `driver.core` - Driver mobile operations
- **CRM Portal**: `crm.core` - CRM basics
- **Marketplace Portal**: `marketplace.post` - Basic posting

#### Premium Features (Included in Pro/Enterprise)
- **CRM Portal**: `crm.advanced` - CRM automation
- **Analytics Portal**: `analytics.realtime` - Real-time analytics
- **Rates Portal**: `rates.dynamic` - Dynamic rating
- **Directory Portal**: `directory.enriched` - Enriched directory data
- **Load Board Portal**: `loadboard.priority` - Priority load board
- **Workers Portal**: `workers.optimizer` - Route/shift optimizer

#### Add-on Features (Explicit purchase required)
- **EDI Portal**: `edi.x12` - EDI X12 flows
- **Rates Portal**: `rates.predict` - Predictive pricing
- **Autonomous Portal**: `autonomous.ai` - Autonomous AI
- **Financials Portal**: `financials.ap`, `financials.ar` - AP/AR modules

## Plan Structure & Quotas

### Free Tier
- **Core Portals**: Broker, Shipper, Carrier, Driver, CRM basics
- **Quotas**: 1,000 operations per month per core feature
- **Limitations**: No premium features, basic support

### Professional Tier ($99-299/month)
- **Includes**: All core + most premium features
- **Quotas**: 5,000-10,000 operations per month
- **Features**: CRM automation, real-time analytics, dynamic rating

### Enterprise Tier ($499-999/month)
- **Includes**: Everything except add-ons
- **Quotas**: Unlimited for most features
- **Features**: Full TMS functionality, white-label options

### Custom Tier
- **Add-ons**: EDI, predictive pricing, autonomous AI
- **Pricing**: Usage-based or flat rate
- **Support**: Dedicated account management

## Backend Implementation

### Portal Access Middleware
```typescript
// Portal access control
export function requirePortal(portalKey: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.auth?.org_id;
    if (!orgId) return res.status(401).json({ error: "unauthorized" });

    const { data, error } = await req.db.rpc("can_access_portal", { 
      p_org: orgId, 
      p_portal: portalKey 
    });
    
    if (error) return res.status(500).json({ error: "rpc_failed" });
    if (!data) return res.status(402).json({ error: "portal_locked", portal: portalKey });

    return next();
  };
}
```

### Feature Quota Middleware
```typescript
// Feature usage with quota enforcement
export function requireFeatureWithQuota(featureKey: string, qty = 1) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.auth?.org_id;
    if (!orgId) return res.status(401).json({ error: "unauthorized" });

    const { data: ok } = await req.db.rpc("can_use_feature", { 
      p_org: orgId, 
      p_feature: featureKey 
    });
    
    if (!ok) return res.status(402).json({ error: "feature_locked_or_capped" });

    // Meter usage
    await req.db.from("usage_events").insert({ 
      org_id: orgId, 
      feature_key: featureKey, 
      qty, 
      meta: { path: req.path }
    });
    
    return next();
  };
}
```

## Frontend Implementation

### Portal Access API
```typescript
// GET /api/me/portals
interface PortalAccess {
  key: string;
  path: string;
  access: 'included' | 'addon' | 'trial' | 'locked';
  features: {
    key: string;
    access: 'included' | 'addon' | 'trial' | 'locked';
    usage?: {
      used: number;
      quota: number;
      unit: string;
    };
  }[];
}
```

### Portal Card Gate Component
```typescript
export function PortalCardGate({
  portal,
  access,
  path,
}: { 
  portal: string; 
  access: 'included' | 'addon' | 'trial' | 'locked'; 
  path: string; 
}) {
  if (access === "included") {
    return <Button asChild><a href={path}>Open {portal}</a></Button>;
  }
  
  if (access === "trial") {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="default">Trial</Badge>
        <Button asChild><a href={path}>Try now</a></Button>
        <Button variant="outline" asChild><a href="/billing/upgrade">Upgrade</a></Button>
      </div>
    );
  }
  
  if (access === "addon") {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Add-on</Badge>
        <Button asChild><a href={`/billing/manage?feature=${portal}`}>Enable</a></Button>
        <Button variant="outline" asChild><a href="/docs/pricing">Pricing</a></Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline">Locked</Badge>
      <Button asChild><a href="/billing/upgrade">Upgrade</a></Button>
      <Button variant="ghost" asChild><a href="/contact/sales">Talk to Sales</a></Button>
    </div>
  );
}
```

## Operations & Management

### Trial Management
```sql
-- Start a trial for a feature
create or replace function start_trial(p_org uuid, p_feature text, p_days int default 14)
returns void language plpgsql as $$
begin
  insert into org_trials(org_id, feature_key, ends_at)
  values (p_org, p_feature, now() + (p_days || ' days')::interval)
  on conflict (org_id, feature_key) do update
    set ends_at = excluded.ends_at;
end$$;
```

### Add-on Management
```sql
-- Enable an add-on with optional seats
create or replace function enable_addon(p_org uuid, p_feature text, p_seats int default 0)
returns void language sql as $$
  insert into org_addons(org_id, feature_key, seats, enabled)
  values (p_org, p_feature, p_seats, true)
  on conflict (org_id, feature_key) do update
    set seats = excluded.seats, enabled = true, expires_at = null;
$$;
```

## Autonomous Agent Implementation Tasks

### 1. Database Schema Implementation
- **Task**: `saas.portals.catalog.seed`
- **Description**: Seed portals + portal_features for all 20 portals
- **Priority**: High

### 2. Plan Components Setup
- **Task**: `saas.plans.components.seed`
- **Description**: Seed plan_components with quotas & caps
- **Priority**: High

### 3. Pricing Implementation
- **Task**: `saas.pricing.seed`
- **Description**: Seed price_components (flat/seat/usage tiers)
- **Priority**: High

### 4. API Route Protection
- **Task**: `saas.portalgate.api`
- **Description**: Add requirePortal() to all portal server routes
- **Priority**: High

### 5. Feature Quota Implementation
- **Task**: `saas.feature.quota.api`
- **Description**: Swap sensitive endpoints to requireFeatureWithQuota()
- **Priority**: High

### 6. Portal Selection API
- **Task**: `saas.portalselect.api`
- **Description**: Build /api/me/portals resolver returning access state
- **Priority**: Medium

### 7. Trial & Add-on Management
- **Task**: `saas.trials.addon.ops`
- **Description**: Implement start_trial() & enable_addon() flows + UI
- **Priority**: Medium

### 8. Billing Reconciliation
- **Task**: `saas.billing.reconciliation`
- **Description**: Nightly usage → invoice draft
- **Priority**: Low

### 9. Performance Monitoring
- **Task**: `saas.slo.portal`
- **Description**: p95 per portal + quota warnings
- **Priority**: Medium

## Success Criteria

### Free Organization
- ✅ Can access Broker/Carrier/Shipper/Driver portals
- ✅ Premium tabs show as "Locked" with upgrade CTAs
- ✅ API returns 402 for gated features
- ✅ Basic quotas enforced

### Professional Organization
- ✅ Premium features included
- ✅ Higher quotas (5,000-10,000 ops/month)
- ✅ p95 ≤ 2.5s across portals
- ✅ Real-time analytics available

### Enterprise Organization
- ✅ Everything included except add-ons
- ✅ Unlimited quotas for most features
- ✅ White-label options available
- ✅ Dedicated support

### Trial & Add-on Features
- ✅ Trial flips card state to "Trial"
- ✅ API returns 200 until trial expires
- ✅ Add-on purchase immediately unlocks features
- ✅ Usage metered and visible in billing

## Implementation Guidelines for Autonomous Agents

### 1. Always Consider Multi-Tenancy
- Every portal must respect organization boundaries
- Feature access must be checked at both portal and feature levels
- Usage must be tracked per organization

### 2. Implement Clean Gating
- Portal-level gating controls overall access
- Feature-level gating controls specific capabilities
- Quota enforcement prevents abuse

### 3. Focus on User Experience
- Clear indication of what's available vs. locked
- Smooth upgrade paths for premium features
- Trial experiences that showcase value

### 4. Maintain Performance
- Efficient database queries for access checks
- Caching where appropriate
- Monitor and alert on performance issues

### 5. Ensure Scalability
- Design for thousands of organizations
- Efficient usage tracking and billing
- Horizontal scaling capabilities

## Conclusion

This multi-portal SaaS architecture provides:

1. **Clear Business Model**: Core features free, premium features paid
2. **Flexible Pricing**: Flat, seat-based, and usage-based pricing
3. **Scalable Architecture**: Multi-tenant with proper isolation
4. **User-Friendly Experience**: Clear upgrade paths and trial options
5. **Comprehensive Monitoring**: Usage tracking and performance monitoring

The autonomous agents should implement this architecture to create a proper software company platform that serves multiple customer types with different pricing tiers and feature access levels.

**Status**: ✅ Multi-portal SaaS architecture defined
**System**: 🟢 Ready for implementation
**Scope**: 📊 20 portals with portal-level and feature-level gating
