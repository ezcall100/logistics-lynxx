# Phase 4 — Polish & Scale (30–60–90 Days)
## Trans Bot AI Production-Grade Scaling Plan

### 🎯 **Goal**: Turn Phase-3 go-live into durable success and scale—without surprises.

---

## 1. Entitlements & Billing (Stripe Integration)

### **Minimal Schema**
```sql
-- Plans and Features Management
create table plans (
  id text primary key, 
  name text, 
  tier int, 
  is_active bool,
  price_monthly decimal(10,2),
  price_yearly decimal(10,2)
);

create table features (
  key text primary key, 
  description text,
  category text
);

create table plan_features (
  plan_id text references plans, 
  feature_key text references features, 
  hard_limit int, 
  soft_limit int, 
  primary key(plan_id, feature_key)
);

-- Organization Entitlements
create table org_entitlements (
  company_id uuid references companies, 
  plan_id text references plans, 
  started_at timestamptz, 
  trial_ends_at timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  primary key(company_id)
);

-- Usage Tracking
create table usage_events (
  company_id uuid, 
  feature_key text, 
  qty int, 
  occurred_at timestamptz default now(),
  metadata jsonb
);

-- Insert default plans
insert into plans (id, name, tier, is_active, price_monthly, price_yearly) values
  ('starter', 'Starter', 1, true, 99.00, 990.00),
  ('pro', 'Professional', 2, true, 299.00, 2990.00),
  ('enterprise', 'Enterprise', 3, true, 999.00, 9990.00);

-- Insert features
insert into features (key, description, category) values
  ('rates', 'Rate Management & Quotes', 'core'),
  ('directory', 'Partner Directory', 'core'),
  ('bulk_rating', 'Bulk Rate Operations', 'advanced'),
  ('api_access', 'API Access', 'advanced'),
  ('white_label', 'White Label Solution', 'enterprise'),
  ('dedicated_support', 'Dedicated Support', 'enterprise');

-- Assign features to plans
insert into plan_features (plan_id, feature_key, hard_limit, soft_limit) values
  ('starter', 'rates', 100, 50),
  ('starter', 'directory', 50, 25),
  ('pro', 'rates', 1000, 500),
  ('pro', 'directory', 500, 250),
  ('pro', 'bulk_rating', 10, 5),
  ('pro', 'api_access', 10000, 5000),
  ('enterprise', 'rates', -1, -1),
  ('enterprise', 'directory', -1, -1),
  ('enterprise', 'bulk_rating', -1, -1),
  ('enterprise', 'api_access', -1, -1),
  ('enterprise', 'white_label', 1, 1),
  ('enterprise', 'dedicated_support', 1, 1);
```

### **React Hooks for Feature Gating**
```typescript
// hooks/useEntitlement.ts
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export const useEntitlement = (featureKey: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['entitlement', featureKey, user?.company_id],
    queryFn: async () => {
      const response = await fetch(`/api/entitlements/${featureKey}`);
      return response.json();
    },
    enabled: !!user?.company_id
  });
};

export const useLimit = (featureKey: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['limit', featureKey, user?.company_id],
    queryFn: async () => {
      const response = await fetch(`/api/limits/${featureKey}`);
      return response.json();
    },
    enabled: !!user?.company_id
  });
};
```

---

## 2. Reliability & SRE

### **SLO Board**
```sql
-- Core SLOs
create table slo_targets (
  id uuid primary key default gen_random_uuid(),
  name text,
  target decimal(5,4),
  window_hours int,
  created_at timestamptz default now()
);

insert into slo_targets (name, target, window_hours) values
  ('uptime', 0.999, 24),
  ('quote_p95_latency_ms', 500, 1),
  ('agent_success_rate', 0.98, 1);

-- SLO Monitoring Views
create or replace view slo_uptime as
select 
  date_trunc('hour', created_at) as hour,
  count(*) as total_requests,
  count(*) filter (where status_code < 500) as successful_requests,
  round(count(*) filter (where status_code < 500)::decimal / count(*), 4) as uptime_ratio
from api_requests
where created_at > now() - interval '24 hours'
group by 1;

create or replace view slo_quote_latency as
select 
  date_trunc('minute', created_at) as minute,
  percentile_cont(0.95) within group (order by response_time_ms) as p95_latency
from quote_requests
where created_at > now() - interval '1 hour'
group by 1;

create or replace view slo_agent_success as
select 
  date_trunc('minute', updated_at) as minute,
  count(*) filter (where status='success')::float / nullif(count(*),0) as success_ratio
from agent_tasks
where updated_at > now() - interval '60 minutes'
group by 1;
```

### **Error Budget Policy**
```typescript
// utils/errorBudget.ts
export const checkErrorBudget = async () => {
  const sloData = await fetch('/api/slo/current').then(r => r.json());
  
  const errorBudget = {
    uptime: 1 - sloData.uptime.target,
    quoteLatency: sloData.quoteLatency.target,
    agentSuccess: 1 - sloData.agentSuccess.target
  };
  
  const consumed = {
    uptime: (1 - sloData.uptime.current) / errorBudget.uptime,
    quoteLatency: sloData.quoteLatency.current / errorBudget.quoteLatency,
    agentSuccess: (1 - sloData.agentSuccess.current) / errorBudget.agentSuccess
  };
  
  // If >50% error budget consumed, freeze releases
  if (Object.values(consumed).some(v => v > 0.5)) {
    await notifyOnCall('Error budget exceeded 50% - freezing releases');
    return false;
  }
  
  return true;
};
```

---

## 3. Security & Compliance

### **Audit Trail**
```sql
-- Comprehensive audit logging
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor uuid references users(id),
  company_id uuid references companies(id),
  action text,
  target text,
  payload jsonb,
  ip_address inet,
  user_agent text,
  ts timestamptz default now()
);

create index on audit_log (company_id, ts);
create index on audit_log (actor, ts);
create index on audit_log (action, ts);

-- Audit trigger function
create or replace function audit_trigger()
returns trigger as $$
begin
  insert into audit_log (actor, company_id, action, target, payload)
  values (
    auth.uid(),
    (select company_id from users where id = auth.uid()),
    tg_op,
    tg_table_name,
    case 
      when tg_op = 'DELETE' then row_to_json(old)
      else row_to_json(new)
    end
  );
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

-- Apply audit triggers to sensitive tables
create trigger audit_companies after insert or update or delete on companies
  for each row execute function audit_trigger();

create trigger audit_quotes after insert or update or delete on quotes
  for each row execute function audit_trigger();
```

### **Data Portability & Deletion**
```sql
-- GDPR/DSR Compliance
create or replace function delete_company(company_id uuid)
returns void as $$
begin
  -- Soft delete company data
  update companies set deleted_at = now() where id = company_id;
  update users set deleted_at = now() where company_id = company_id;
  update quotes set deleted_at = now() where company_id = company_id;
  update directory_companies set deleted_at = now() where company_id = company_id;
  
  -- Log deletion
  insert into audit_log (company_id, action, target, payload)
  values (company_id, 'DELETE', 'company', jsonb_build_object('reason', 'GDPR request'));
end;
$$ language plpgsql security definer;

-- Data export function
create or replace function export_company_data(company_id uuid)
returns jsonb as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'company', row_to_json(c),
    'users', (select jsonb_agg(row_to_json(u)) from users u where u.company_id = c.id),
    'quotes', (select jsonb_agg(row_to_json(q)) from quotes q where q.company_id = c.id),
    'directory', (select jsonb_agg(row_to_json(d)) from directory_companies d where d.company_id = c.id)
  ) into result
  from companies c
  where c.id = company_id;
  
  return result;
end;
$$ language plpgsql security definer;
```

---

## 4. Data & Analytics

### **Core KPIs**
```sql
-- Quote → Book conversion (last 30d)
create or replace view kpi_quote_book as
select
  date_trunc('day', created_at) d,
  count(*) filter (where status in ('sent','accepted')) as quotes,
  count(*) filter (where status='accepted') as accepted,
  round(100.0 * count(*) filter (where status='accepted') / nullif(count(*) filter (where status in ('sent','accepted')),0), 2) as conv_pct
from quotes
where created_at > now() - interval '30 days'
group by 1;

-- Directory invite → onboard conversion
create or replace view kpi_directory_onboard as
select
  count(*) filter (where status='invited') as invited,
  count(*) filter (where status='onboarded') as onboarded,
  round(100.0 * count(*) filter (where status='onboarded') / nullif(count(*) filter (where status='invited'),0), 2) as conv_pct
from directory_companies;

-- Trial to paid conversion
create or replace view kpi_trial_conversion as
select
  date_trunc('week', trial_ends_at) as week,
  count(*) as trials_ended,
  count(*) filter (where stripe_subscription_id is not null) as converted,
  round(100.0 * count(*) filter (where stripe_subscription_id is not null) / count(*), 2) as conv_pct
from org_entitlements
where trial_ends_at > now() - interval '90 days'
group by 1;

-- Feature usage by plan
create or replace view kpi_feature_usage as
select
  oe.plan_id,
  ue.feature_key,
  count(*) as usage_count,
  avg(ue.qty) as avg_quantity
from usage_events ue
join org_entitlements oe on ue.company_id = oe.company_id
where ue.occurred_at > now() - interval '30 days'
group by 1, 2;
```

### **Event Tracking Schema**
```sql
-- Event tracking for analytics
create table events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id),
  user_id uuid references users(id),
  event_name text,
  properties jsonb,
  occurred_at timestamptz default now()
);

create index on events (company_id, occurred_at);
create index on events (event_name, occurred_at);

-- Core events to track
insert into events (company_id, user_id, event_name, properties) values
  (company_id, user_id, 'quote_created', '{"amount": 1500, "lanes": 3}'),
  (company_id, user_id, 'quote_sent', '{"recipients": 5}'),
  (company_id, user_id, 'quote_accepted', '{"acceptance_time_hours": 2.5}'),
  (company_id, user_id, 'load_booked', '{"booking_value": 2500}'),
  (company_id, user_id, 'directory_invited', '{"partner_type": "carrier"}'),
  (company_id, user_id, 'directory_onboarded', '{"onboarding_time_days": 3}');
```

---

## 5. Product & CX

### **In-App Tours**
```typescript
// components/onboarding/FeatureTour.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export const FeatureTour = ({ feature }: { feature: string }) => {
  const { user } = useAuth();
  const [hasSeenTour, setHasSeenTour] = useState(false);
  
  useEffect(() => {
    const tourKey = `${feature}_tour_${user?.id}`;
    const seen = localStorage.getItem(tourKey);
    if (!seen) {
      setHasSeenTour(false);
    }
  }, [feature, user]);
  
  const completeTour = () => {
    const tourKey = `${feature}_tour_${user?.id}`;
    localStorage.setItem(tourKey, 'completed');
    setHasSeenTour(true);
  };
  
  if (hasSeenTour) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          Welcome to {feature}!
        </h3>
        <p className="text-gray-600 mb-4">
          Let's take a quick tour of the key features...
        </p>
        <button 
          onClick={completeTour}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Tour
        </button>
      </div>
    </div>
  );
};
```

### **Support SLA Management**
```typescript
// utils/support.ts
export const createSupportTicket = async (priority: 'P1' | 'P2' | 'P3', issue: string) => {
  const slaHours = {
    P1: 4,
    P2: 24,
    P3: 72
  };
  
  const ticket = await fetch('/api/support/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priority,
      issue,
      sla_hours: slaHours[priority],
      created_at: new Date().toISOString()
    })
  }).then(r => r.json());
  
  // Auto-escalate P1 tickets after 2 hours
  if (priority === 'P1') {
    setTimeout(() => {
      escalateTicket(ticket.id);
    }, 2 * 60 * 60 * 1000);
  }
  
  return ticket;
};
```

---

## 6. Growth Levers

### **Public Rate Calculator**
```typescript
// components/marketing/RateCalculator.tsx
export const RateCalculator = () => {
  const [email, setEmail] = useState('');
  const [lanes, setLanes] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create trial account
    const trial = await fetch('/api/trials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, lanes })
    }).then(r => r.json());
    
    // Redirect to trial setup
    window.location.href = `/signup?trial=${trial.id}`;
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Calculate Your Savings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Number of lanes"
          value={lanes}
          onChange={(e) => setLanes(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-semibold"
        >
          Calculate & Start Free Trial
        </button>
      </form>
    </div>
  );
};
```

### **Partner Directory Listing**
```sql
-- Public partner directory
create table public_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id),
  company_name text,
  description text,
  services text[],
  regions text[],
  contact_email text,
  website text,
  is_public bool default false,
  created_at timestamptz default now()
);

-- Partner search API
create or replace function search_partners(
  service text default null,
  region text default null
)
returns table (
  company_name text,
  description text,
  services text[],
  regions text[]
) as $$
begin
  return query
  select 
    pp.company_name,
    pp.description,
    pp.services,
    pp.regions
  from public_partners pp
  where pp.is_public = true
    and (service is null or service = any(pp.services))
    and (region is null or region = any(pp.regions));
end;
$$ language plpgsql security definer;
```

---

## 7. Control Room: Day-0/1/7 Checklist

### **Day-0 Checklist**
- [ ] Run smoke tests + post-deploy verification
- [ ] Enable canary tenants (5% traffic)
- [ ] Watch SLOs hourly
- [ ] Review RLS script output (zero cross-tenant rows)
- [ ] Verify error budget is healthy

### **Day-1 Checklist**
- [ ] Enable 50% of tenants
- [ ] Monitor agent-runner queue (target <60s wait)
- [ ] Review quote variance vs actual (±2-3%)
- [ ] Check feature usage patterns
- [ ] Verify billing integration

### **Day-7 Checklist**
- [ ] Full rollout (100% of tenants)
- [ ] Create 30-day OKRs
- [ ] Schedule pen test (T+30 days)
- [ ] Schedule first DR restore drill
- [ ] Review all SLOs and error budgets

---

## 8. Quick Implementation Scripts

### **API Rate Limiting**
```typescript
// utils/rateLimit.ts
export const rateLimit = async (req: Request, key: string) => {
  const windowMs = 60_000; // 1 minute
  const max = 120; // 120 requests per minute
  
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
  const bucket = await caches.open('ratelimit');
  
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  
  const cacheKey = `${hash}-${windowStart}`;
  const current = await bucket.match(cacheKey);
  
  if (current) {
    const count = parseInt(await current.text());
    if (count >= max) {
      return false; // Rate limited
    }
    await bucket.put(cacheKey, new Response((count + 1).toString()));
  } else {
    await bucket.put(cacheKey, new Response('1'));
  }
  
  return true;
};
```

### **Feature Flags**
```typescript
// lib/featureFlags.ts
export type FeatureKey = 'rates' | 'directory' | 'bulk_rating' | 'invite_auto_approve';
export type Flag = { key: FeatureKey; enabled: boolean; tenants?: string[] };

export const flags: Flag[] = [
  { key: 'rates', enabled: true },
  { key: 'directory', enabled: true },
  { key: 'bulk_rating', enabled: false, tenants: ['transbotai-demo'] },
  { key: 'invite_auto_approve', enabled: false }
];

export const isFeatureEnabled = (feature: FeatureKey, tenantId?: string): boolean => {
  const flag = flags.find(f => f.key === feature);
  if (!flag) return false;
  
  if (!flag.enabled) return false;
  if (flag.tenants && tenantId && !flag.tenants.includes(tenantId)) return false;
  
  return true;
};
```

### **Directory Freshness Alert**
```sql
-- Monitor directory document freshness
create or replace view directory_freshness_alerts as
select 
  dc.company_name,
  dd.kind,
  dd.expires_at,
  case 
    when dd.expires_at < now() then 'expired'
    when dd.expires_at < now() + interval '7 days' then 'expiring_soon'
    else 'valid'
  end as status
from directory_docs dd
join directory_companies dc on dd.company_id = dc.company_id
where dd.expires_at < now() + interval '7 days'
order by dd.expires_at;

-- Alert function
create or replace function check_directory_freshness()
returns void as $$
declare
  alert_count int;
begin
  select count(*) into alert_count
  from directory_freshness_alerts
  where status in ('expired', 'expiring_soon');
  
  if alert_count > 0 then
    -- Send alert to ops team
    perform pg_notify('directory_alerts', json_build_object(
      'count', alert_count,
      'timestamp', now()
    )::text);
  end if;
end;
$$ language plpgsql;
```

---

## 🚀 **Next Steps**

1. **Load the entitlements schema** and wire plan gates around Rates & Directory screens
2. **Publish the Exec dashboard** (3 KPIs + 3 SLOs) using the views above
3. **Schedule the pen test** and add the finding-to-fix SLA to your runbook
4. **Implement the rate calculator** for lead generation
5. **Set up monitoring alerts** for SLO violations

This Phase 4 implementation will transform your Trans Bot AI platform into a production-grade, scalable, and compliant enterprise solution! 🎯
