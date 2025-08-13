-- Phase 4: Entitlements & Billing System
-- Trans Bot AI Production-Grade Scaling

-- Plans and Features Management
create table if not exists plans (
  id text primary key, 
  name text, 
  tier int, 
  is_active bool default true,
  price_monthly decimal(10,2),
  price_yearly decimal(10,2),
  created_at timestamptz default now()
);

create table if not exists features (
  key text primary key, 
  description text,
  category text,
  created_at timestamptz default now()
);

create table if not exists plan_features (
  plan_id text references plans(id), 
  feature_key text references features(key), 
  hard_limit int, 
  soft_limit int, 
  primary key(plan_id, feature_key)
);

-- Organization Entitlements
create table if not exists org_entitlements (
  company_id uuid references companies(id), 
  plan_id text references plans(id), 
  started_at timestamptz default now(), 
  trial_ends_at timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  primary key(company_id)
);

-- Usage Tracking
create table if not exists usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id), 
  feature_key text references features(key), 
  qty int default 1, 
  occurred_at timestamptz default now(),
  metadata jsonb default '{}'::jsonb
);

-- Insert default plans
insert into plans (id, name, tier, is_active, price_monthly, price_yearly) values
  ('starter', 'Starter', 1, true, 99.00, 990.00),
  ('pro', 'Professional', 2, true, 299.00, 2990.00),
  ('enterprise', 'Enterprise', 3, true, 999.00, 9990.00)
on conflict (id) do nothing;

-- Insert features
insert into features (key, description, category) values
  ('rates', 'Rate Management & Quotes', 'core'),
  ('directory', 'Partner Directory', 'core'),
  ('bulk_rating', 'Bulk Rate Operations', 'advanced'),
  ('api_access', 'API Access', 'advanced'),
  ('white_label', 'White Label Solution', 'enterprise'),
  ('dedicated_support', 'Dedicated Support', 'enterprise')
on conflict (key) do nothing;

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
  ('enterprise', 'dedicated_support', 1, 1)
on conflict (plan_id, feature_key) do nothing;

-- SLO Monitoring
create table if not exists slo_targets (
  id uuid primary key default gen_random_uuid(),
  name text unique,
  target decimal(5,4),
  window_hours int,
  created_at timestamptz default now()
);

insert into slo_targets (name, target, window_hours) values
  ('uptime', 0.999, 24),
  ('quote_p95_latency_ms', 500, 1),
  ('agent_success_rate', 0.98, 1)
on conflict (name) do nothing;

-- Audit logging
create table if not exists audit_log (
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

-- Event tracking
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id),
  user_id uuid references users(id),
  event_name text,
  properties jsonb default '{}'::jsonb,
  occurred_at timestamptz default now()
);

-- Public partner directory
create table if not exists public_partners (
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

-- Create indexes for performance
create index if not exists idx_usage_events_company_feature on usage_events(company_id, feature_key);
create index if not exists idx_usage_events_occurred_at on usage_events(occurred_at);
create index if not exists idx_audit_log_company_ts on audit_log(company_id, ts);
create index if not exists idx_audit_log_actor_ts on audit_log(actor, ts);
create index if not exists idx_audit_log_action_ts on audit_log(action, ts);
create index if not exists idx_events_company_occurred on events(company_id, occurred_at);
create index if not exists idx_events_name_occurred on events(event_name, occurred_at);

-- RLS Policies
alter table plans enable row level security;
alter table features enable row level security;
alter table plan_features enable row level security;
alter table org_entitlements enable row level security;
alter table usage_events enable row level security;
alter table slo_targets enable row level security;
alter table audit_log enable row level security;
alter table events enable row level security;
alter table public_partners enable row level security;

-- Allow read access to plans and features for all authenticated users
create policy "Allow read access to plans" on plans for select using (true);
create policy "Allow read access to features" on features for select using (true);
create policy "Allow read access to plan_features" on plan_features for select using (true);

-- Company-specific access to entitlements and usage
create policy "Company access to entitlements" on org_entitlements 
  for all using (company_id = (select company_id from users where id = auth.uid()));

create policy "Company access to usage events" on usage_events 
  for all using (company_id = (select company_id from users where id = auth.uid()));

-- Read-only access to SLOs for all users
create policy "Allow read access to SLOs" on slo_targets for select using (true);

-- Audit log access (company-specific)
create policy "Company access to audit log" on audit_log 
  for select using (company_id = (select company_id from users where id = auth.uid()));

-- Event tracking (company-specific)
create policy "Company access to events" on events 
  for all using (company_id = (select company_id from users where id = auth.uid()));

-- Public partners (read-only for all, write for company)
create policy "Allow read access to public partners" on public_partners for select using (true);
create policy "Company access to public partners" on public_partners 
  for all using (company_id = (select company_id from users where id = auth.uid()));
