#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from "node:child_process";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_URL = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

if (!DB_URL) {
  console.log("ℹ️  No DB URL set; running in lenient (DB-optional) mode.");
  process.exit(0);
}

// Create db directory if it doesn't exist
const dbDir = join(__dirname, "..", "db");
await fs.mkdir(dbDir, { recursive: true });

// Create SQL files if they don't exist
const sqlFiles = [
  {
    name: "00_core_tenancy.sql",
    content: `create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists org_memberships (
  org_id uuid references organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null,
  primary key (org_id, user_id)
);

alter table organizations enable row level security;
alter table org_memberships enable row level security;

-- RLS: require JWT org_id claim
do $$
begin
  if not exists (
    select 1 from pg_policies where polname='org_isolation' and tablename='organizations'
  ) then
    create policy org_isolation on organizations
      for select using (id::text = current_setting('request.jwt.claims', true)::jsonb->>'org_id');
  end if;

  if not exists (
    select 1 from pg_policies where polname='memberships_by_org' and tablename='org_memberships'
  ) then
    create policy memberships_by_org on org_memberships
      for all using (org_id::text = current_setting('request.jwt.claims', true)::jsonb->>'org_id');
  end if;
end$$;`
  },
  {
    name: "01_subscriptions_entitlements.sql",
    content: `create table if not exists subscriptions (
  org_id uuid primary key references organizations(id) on delete cascade,
  plan text not null check (plan in ('free','pro','enterprise','custom')),
  status text not null check (status in ('trialing','active','past_due','canceled')),
  current_period_end timestamptz,
  meta jsonb default '{}'
);

create table if not exists features (
  key text primary key,
  description text,
  unit text default 'ops'
);

create table if not exists entitlements (
  org_id uuid references organizations(id) on delete cascade,
  feature_key text references features(key) on delete cascade,
  source text not null check (source in ('plan','override')),
  enabled boolean not null default true,
  expires_at timestamptz,
  primary key (org_id, feature_key)
);

create table if not exists usage_events (
  id bigserial primary key,
  org_id uuid not null,
  feature_key text not null,
  qty numeric not null default 1,
  at timestamptz not null default now(),
  meta jsonb default '{}'
);

-- helper
create or replace function has_entitlement(p_org uuid, p_feature text)
returns boolean language sql stable as $$
  select exists (
    select 1 from entitlements e
    where e.org_id = p_org
      and e.feature_key = p_feature
      and e.enabled = true
      and coalesce(e.expires_at, now() + interval '100 years') > now()
  );
$$;`
  },
  {
    name: "02_tms_core.sql",
    content: `create table if not exists carriers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  legal_name text not null,
  dot_number text,
  mc_number text,
  created_at timestamptz default now()
);

create table if not exists shippers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  legal_name text not null,
  created_at timestamptz default now()
);

create table if not exists loads (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  lob text not null,
  origin jsonb not null,
  destination jsonb not null,
  status text not null default 'draft',
  price_cents int,
  created_at timestamptz default now()
);

alter table carriers enable row level security;
alter table shippers enable row level security;
alter table loads enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where polname='carriers_by_org') then
    create policy carriers_by_org on carriers for all using (org_id::text = current_setting('request.jwt.claims', true)::jsonb->>'org_id');
  end if;
  if not exists (select 1 from pg_policies where polname='shippers_by_org') then
    create policy shippers_by_org on shippers for all using (org_id::text = current_setting('request.jwt.claims', true)::jsonb->>'org_id');
  end if;
  if not exists (select 1 from pg_policies where polname='loads_by_org') then
    create policy loads_by_org on loads for all using (org_id::text = current_setting('request.jwt.claims', true)::jsonb->>'org_id');
  end if;
end$$;`
  },
  {
    name: "03_compliance.sql",
    content: `create table if not exists compliance_entities(
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  kind text not null check (kind in ('carrier','broker','shipper')),
  legal_name text not null,
  fein text,
  dot_number text,
  mc_number text,
  created_at timestamptz default now()
);`
  }
];

// Write SQL files
for (const file of sqlFiles) {
  const filePath = join(dbDir, file.name);
  try {
    await fs.access(filePath);
    console.log(`📜 ${file.name} already exists, skipping creation`);
  } catch {
    await fs.writeFile(filePath, file.content);
    console.log(`📜 Created ${file.name}`);
  }
}

const files = sqlFiles.map(f => f.name).filter(Boolean);

try {
  console.log("🚀 Starting database bootstrap...");
  for (const f of files) {
    console.log(`📜 applying ${f}`);
    const filePath = join(dbDir, f);
    execSync(`psql "${DB_URL}" -v ON_ERROR_STOP=1 -f "${filePath}"`, { stdio: "inherit" });
  }
  console.log("✅ DB bootstrap complete");
} catch (e) {
  console.error("❌ DB bootstrap failed:", e?.message || e);
  console.log("ℹ️  Continuing in lenient mode...");
  process.exit(0); // Don't fail the build, just continue
}
