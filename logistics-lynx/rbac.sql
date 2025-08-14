-- Roles catalog (global & tenant-scoped)
create table if not exists public.roles (
  key text primary key,            -- e.g. 'super_admin', 'tenant_owner', 'broker_user'
  scope text not null check (scope in ('global','tenant')),
  description text
);

-- User profiles (assumes Supabase Auth users)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  company_id uuid,                 -- nullable for global users
  full_name text,
  created_at timestamptz default now()
);

-- Role assignments (many-to-many)
create table if not exists public.user_roles (
  user_id uuid references auth.users(id) on delete cascade,
  role_key text references public.roles(key) on delete restrict,
  company_id uuid,                 -- required when role.scope='tenant'; null when 'global'
  granted_by uuid,                 -- profiles.user_id or NULL (system)
  granted_at timestamptz default now(),
  primary key (user_id, role_key, company_id)
);

-- Helper to check tenant membership
create or replace function public.is_company_member(_company uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.company_id = _company
  );
$$;

-- Helper to check role (global or tenant)
create or replace function public.has_role(_role text, _company uuid default null)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.user_roles ur
    join public.roles r on r.key=ur.role_key
    where ur.user_id = auth.uid()
      and ur.role_key = _role
      and (
        (r.scope='global') or
        (r.scope='tenant' and ur.company_id = coalesce(_company, ur.company_id))
      )
  );
$$;

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- RLS: users can read their own profile; admins/service role can read all
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles
  for select using (auth.uid() = user_id or has_role('super_admin'));

-- RLS: role reads are allowed to the user; writes by super_admin or service role only
drop policy if exists user_roles_read on public.user_roles;
create policy user_roles_read on public.user_roles
  for select using (auth.uid() = user_id or has_role('super_admin'));

drop policy if exists user_roles_write on public.user_roles;
create policy user_roles_write on public.user_roles
  for insert with check (has_role('super_admin'))
  to authenticated;

-- Seed roles (idempotent)
insert into public.roles(key, scope, description) values
('super_admin','global','Platform superuser (break-glass)'),
('env_admin','global','Environment admin (prod/staging ops)'),
('tenant_owner','tenant','Tenant owner'),
('tenant_admin','tenant','Tenant admin'),
('tms_admin','tenant','TMS configuration admin'),
('ops_manager','tenant','Ops manager'),
('broker_user','tenant','Broker portal user'),
('carrier_user','tenant','Carrier portal user'),
('shipper_user','tenant','Shipper portal user'),
('driver','tenant','Driver portal user'),
('owner_operator','tenant','Owner-operator user'),
('finance_ar','tenant','AR/Invoices'),
('finance_ap','tenant','AP/Settlements'),
('edi_operator','tenant','EDI operations'),
('analytics_viewer','tenant','Analytics access'),
('marketplace_manager','tenant','Marketplace management'),
('worker_dispatcher','tenant','Workers scheduling'),
('rates_analyst','tenant','Rates portal'),
('directory_editor','tenant','Directory curation'),
('viewer','tenant','Read-only')
on conflict (key) do nothing;

-- Portal access mapping table
create table if not exists public.portal_access (
  portal_key text not null,
  role_key text not null references public.roles(key),
  access_level text not null check (access_level in ('read','write','admin')),
  created_at timestamptz default now(),
  primary key (portal_key, role_key)
);

-- Portal access mappings
insert into public.portal_access(portal_key, role_key, access_level) values
-- Super Admin Portal
('superAdmin', 'super_admin', 'admin'),
('superAdmin', 'env_admin', 'admin'),

-- Admin Portal
('admin', 'tenant_owner', 'admin'),
('admin', 'tenant_admin', 'admin'),

-- TMS Admin
('tmsAdmin', 'tms_admin', 'admin'),
('tmsAdmin', 'ops_manager', 'write'),

-- Onboarding
('onboarding', 'tenant_owner', 'admin'),
('onboarding', 'tenant_admin', 'admin'),

-- Broker
('broker', 'broker_user', 'write'),
('broker', 'ops_manager', 'write'),
('broker', 'tenant_admin', 'admin'),

-- Shipper
('shipper', 'shipper_user', 'write'),

-- Carrier
('carrier', 'carrier_user', 'write'),
('carrier', 'ops_manager', 'write'),

-- Driver
('driver', 'driver', 'write'),

-- Owner Operator
('ownerOperator', 'owner_operator', 'write'),

-- Factoring
('factoring', 'finance_ar', 'write'),
('factoring', 'finance_ap', 'write'),
('factoring', 'tenant_admin', 'admin'),

-- Load Board
('loadBoard', 'broker_user', 'write'),
('loadBoard', 'carrier_user', 'write'),
('loadBoard', 'ops_manager', 'write'),

-- CRM
('crm', 'broker_user', 'write'),
('crm', 'tenant_admin', 'admin'),

-- Financials
('financials', 'finance_ar', 'write'),
('financials', 'finance_ap', 'write'),
('financials', 'tenant_admin', 'admin'),

-- EDI
('edi', 'edi_operator', 'write'),
('edi', 'tms_admin', 'admin'),

-- Marketplace
('marketplace', 'marketplace_manager', 'write'),
('marketplace', 'tenant_admin', 'admin'),

-- Analytics
('analytics', 'analytics_viewer', 'read'),
('analytics', 'tenant_admin', 'admin'),

-- Autonomous
('autonomous', 'tenant_admin', 'read'),
('autonomous', 'ops_manager', 'read'),

-- Workers
('workers', 'worker_dispatcher', 'write'),
('workers', 'ops_manager', 'write'),

-- Rates
('rates', 'rates_analyst', 'write'),
('rates', 'broker_user', 'read'),

-- Directory
('directory', 'directory_editor', 'write'),
('directory', 'tenant_admin', 'admin')
on conflict (portal_key, role_key) do update set access_level = excluded.access_level;

-- Function to check portal access
create or replace function public.can_access_portal(_portal text, _company uuid default null)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.portal_access pa
    join public.user_roles ur on ur.role_key = pa.role_key
    join public.roles r on r.key = ur.role_key
    where ur.user_id = auth.uid()
      and pa.portal_key = _portal
      and (
        (r.scope = 'global') or
        (r.scope = 'tenant' and ur.company_id = coalesce(_company, ur.company_id))
      )
  );
$$;

-- Function to get user's accessible portals
create or replace function public.get_user_portals(_company uuid default null)
returns table(portal_key text, access_level text) language sql stable as $$
  select distinct pa.portal_key, pa.access_level
  from public.portal_access pa
  join public.user_roles ur on ur.role_key = pa.role_key
  join public.roles r on r.key = ur.role_key
  where ur.user_id = auth.uid()
    and (
      (r.scope = 'global') or
      (r.scope = 'tenant' and ur.company_id = coalesce(_company, ur.company_id))
    )
  order by pa.portal_key;
$$;
