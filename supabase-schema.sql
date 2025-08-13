-- =====================================================
-- AUTONOMOUS TMS SYSTEM - SUPABASE SCHEMA
-- Phase 2: Core Schema + RLS (multi-tenant, portal-ready)
-- =====================================================

-- Helper function: is the current user in the same company as the row?
create or replace function public.is_company_member(target_company uuid)
returns boolean language sql stable as $$
  select exists (
    select 1
    from public.user_profiles up
    where up.user_id = auth.uid() and up.company_id = target_company
  );
$$;

-- Convenience view for current user's company
create or replace view public.v_current_user as
select up.user_id, up.company_id, up.role
from public.user_profiles up
where up.user_id = auth.uid();

-- =====================================================
-- OPERATIONAL TABLES (minimal columns to run the loop)
-- =====================================================

-- Carriers & drivers (minimal)
create table if not exists public.carriers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  name text not null,
  mc_number text,
  equipment text[],              -- ['van','reefer','flatbed']
  lanes jsonb default '[]',      -- [{origin:'CA', dest:'TX'}]
  created_at timestamptz default now()
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  carrier_id uuid references public.carriers(id) on delete set null,
  name text not null,
  phone text,
  status text check (status in ('available','assigned','off')) default 'available',
  created_at timestamptz default now()
);

-- Loads (shipments)
create table if not exists public.loads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  reference text unique,
  status text check (status in ('new','quoted','booked','dispatched','in_transit','delivered','invoiced','closed')) default 'new',
  equipment text,                 -- required equipment
  pickup jsonb not null,          -- {city:'LA', state:'CA', date:'2025-08-14'}
  dropoff jsonb not null,         -- {city:'Dallas', state:'TX', date:'2025-08-16'}
  rate numeric,                   -- customer rate
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Recommendations from AI
create table if not exists public.carrier_recommendations (
  id uuid primary key default gen_random_uuid(),
  load_id uuid not null references public.loads(id) on delete cascade,
  carrier_id uuid not null references public.carriers(id),
  score numeric not null,         -- 0..1
  rationale text,
  created_at timestamptz default now()
);

-- Assignments & tracking
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  load_id uuid not null references public.loads(id) on delete cascade,
  carrier_id uuid not null references public.carriers(id),
  driver_id uuid references public.drivers(id),
  status text check (status in ('proposed','accepted','dispatched','picked_up','delivered','failed')) default 'proposed',
  agreed_rate numeric,
  created_at timestamptz default now()
);

create table if not exists public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  load_id uuid not null references public.loads(id) on delete cascade,
  type text,                      -- 'pickup','pod','location','exception'
  details jsonb,
  event_time timestamptz default now()
);

-- Docs & billing (lean)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  load_id uuid references public.loads(id) on delete cascade,
  kind text check (kind in ('bol','pod','invoice','ratecon','other')),
  url text not null,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  load_id uuid not null references public.loads(id) on delete cascade,
  amount numeric not null,
  status text check (status in ('created','sent','paid','void')) default 'created',
  due_date date,
  created_at timestamptz default now()
);

-- =====================================================
-- AUTONOMOUS AGENT ORCHESTRATOR TABLES
-- =====================================================

create table if not exists public.agent_functions (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,              -- e.g., 'load_match','route_plan','invoice_emit'
  target text not null,                   -- 'supabase_function' | 'n8n_webhook' | 'http'
  endpoint text not null,                 -- function name or URL
  created_at timestamptz default now()
);

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  fn_name text not null references public.agent_functions(name),
  payload jsonb not null,
  status text check (status in ('queued','running','success','error','quarantined')) default 'queued',
  attempts int default 0,
  last_error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.agent_tasks(id) on delete cascade,
  started_at timestamptz default now(),
  finished_at timestamptz,
  log text
);

-- =====================================================
-- RLS POLICIES (company-scoped by default)
-- =====================================================

-- Enable RLS on all tables
alter table public.carriers          enable row level security;
alter table public.drivers           enable row level security;
alter table public.loads             enable row level security;
alter table public.carrier_recommendations enable row level security;
alter table public.assignments       enable row level security;
alter table public.tracking_events   enable row level security;
alter table public.documents         enable row level security;
alter table public.invoices          enable row level security;
alter table public.agent_functions   enable row level security;
alter table public.agent_tasks       enable row level security;
alter table public.agent_runs        enable row level security;

-- Generic read/write patterns
create policy r_carriers on public.carriers
  for select using (public.is_company_member(company_id));
create policy w_carriers on public.carriers
  for insert with check (public.is_company_member(company_id));

create policy r_drivers on public.drivers
  for select using (public.is_company_member(company_id));
create policy w_drivers on public.drivers
  for insert with check (public.is_company_member(company_id));

create policy r_loads on public.loads
  for select using (public.is_company_member(company_id));
create policy w_loads on public.loads
  for insert with check (public.is_company_member(company_id));

create policy r_recs on public.carrier_recommendations
  for select using (public.is_company_member((select l.company_id from public.loads l where l.id = load_id)));
create policy w_recs on public.carrier_recommendations
  for insert with check (public.is_company_member((select l.company_id from public.loads l where l.id = load_id)));

create policy r_assign on public.assignments
  for select using (public.is_company_member(company_id));
create policy w_assign on public.assignments
  for insert with check (public.is_company_member(company_id));

create policy r_track on public.tracking_events
  for select using (public.is_company_member(company_id));
create policy w_track on public.tracking_events
  for insert with check (public.is_company_member(company_id));

create policy r_docs on public.documents
  for select using (public.is_company_member(company_id));
create policy w_docs on public.documents
  for insert with check (public.is_company_member(company_id));

create policy r_invoices on public.invoices
  for select using (public.is_company_member(company_id));
create policy w_invoices on public.invoices
  for insert with check (public.is_company_member(company_id));

-- Agent function policies
create policy r_fn on public.agent_functions for select using (true); -- read-only catalog
create policy r_tasks on public.agent_tasks for select using (public.is_company_member(company_id));
create policy w_tasks on public.agent_tasks for insert with check (public.is_company_member(company_id));
create policy r_runs on public.agent_runs for select using (true);
create policy w_runs on public.agent_runs for insert using (true);

-- =====================================================
-- SEED DATA FOR AUTONOMOUS FUNCTIONS
-- =====================================================

insert into public.agent_functions (name, target, endpoint) values
  ('load_match','supabase_function','ai-load-matcher'),
  ('notify_ops','n8n_webhook','https://YOUR_N8N/webhook/ops-notify'),
  ('route_optimize','supabase_function','ai-route-optimizer'),
  ('invoice_generate','supabase_function','ai-invoice-generator')
on conflict (name) do nothing;

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Sample carrier and driver (run after user registration)
-- insert into public.carriers (company_id, name, equipment, lanes)
-- select company_id, 'Acme Logistics', array['van'], '[{"origin":"CA","dest":"TX"}]'::jsonb
-- from public.user_profiles limit 1;

-- insert into public.drivers (company_id, name, status)
-- select company_id, 'John Driver','available' from public.user_profiles limit 1;
