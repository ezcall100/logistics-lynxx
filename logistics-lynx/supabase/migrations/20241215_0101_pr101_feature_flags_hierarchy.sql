-- === PR-101: Hierarchical Feature Flags (+ audit) ============================
-- Safe, idempotent migration: creates enums, tables, indexes, RLS, RPCs, audit

-- 0) prerequisites
create extension if not exists pgcrypto;

-- 1) enums
do $$ begin
  if not exists (select 1 from pg_type where typname = 'flag_scope') then
    create type public.flag_scope as enum ('global','env','tenant');
  end if;
end $$;

-- 2) main table
create table if not exists public.feature_flags_v2 (
  id           uuid primary key default gen_random_uuid(),
  key          text not null,
  scope        public.flag_scope not null default 'global',
  env          text null,                                -- e.g. 'development'|'staging'|'production'
  company_id   uuid null references public.companies(id) on delete cascade,
  value        boolean not null default false,           -- on/off
  payload      jsonb not null default '{}'::jsonb,       -- optional extra config
  reason       text null,
  owner_user   uuid null,                                -- auth.users.id (if known)
  owner_name   text null,                                -- human label when user is svc
  expires_at   timestamptz null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 3) uniqueness (normalized)" (key, scope, env?, company?) must be unique
-- Use functional unique index to treat NULLs as empty
create unique index if not exists uq_feature_flags_v2_identity
  on public.feature_flags_v2 (key, scope, coalesce(env,'') , coalesce(company_id::text,''));

-- 4) speed paths
create index if not exists idx_feature_flags_v2_key_scope on public.feature_flags_v2(key, scope);
create index if not exists idx_feature_flags_v2_company on public.feature_flags_v2(company_id);
create index if not exists idx_feature_flags_v2_expires on public.feature_flags_v2(expires_at);

-- 5) RLS
alter table public.feature_flags_v2 enable row level security;

-- Read: allow authenticated users to read global/env; tenant-scoped only if they belong to tenant
create or replace function public.is_company_member(_company uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.company_id = _company
  );
$$;

do $$ begin
  if not exists (
    select 1 from pg_policies where polname = 'feature_flags_v2_select'
      and tablename = 'feature_flags_v2'
  ) then
    create policy feature_flags_v2_select on public.feature_flags_v2
      for select
      using (
        scope in ('global','env')
        or (scope = 'tenant' and company_id is not null and is_company_member(company_id))
      );
  end if;
end $$;

-- Writes are via service role / admin UI; keep client writes off by default
do $$ begin
  if not exists (
    select 1 from pg_policies where polname = 'feature_flags_v2_write'
      and tablename = 'feature_flags_v2'
  ) then
    create policy feature_flags_v2_write on public.feature_flags_v2
      for all
      using (false) with check (false);
  end if;
end $$;

-- 6) audit table
create table if not exists public.feature_flags_audit (
  id           uuid primary key default gen_random_uuid(),
  flag_id      uuid null,
  key          text not null,
  action       text not null check (action in ('insert','update','delete')),
  old_row      jsonb null,
  new_row      jsonb null,
  reason       text null,
  actor_user   uuid null,
  actor_email  text null,
  created_at   timestamptz not null default now()
);

create index if not exists idx_feature_flags_audit_key_time
  on public.feature_flags_audit(key, created_at desc);

-- 7) audit trigger
create or replace function public.tg_feature_flags_v2_audit()
returns trigger language plpgsql as $$
declare
  v_actor uuid := null;
  v_email text := null;
begin
  -- capture actor if session has JWT; tolerate null for service-role writes
  begin
    v_actor := auth.uid();
  exception when others then
    v_actor := null;
  end;

  -- try to resolve email (best-effort)
  if v_actor is not null then
    select email into v_email from auth.users where id = v_actor;
  end if;

  if TG_OP = 'INSERT' then
    insert into public.feature_flags_audit(flag_id, key, action, old_row, new_row, reason, actor_user, actor_email)
    values (NEW.id, NEW.key, 'insert', null, to_jsonb(NEW), NEW.reason, v_actor, coalesce(v_email, NEW.owner_name));
    return NEW;
  elsif TG_OP = 'UPDATE' then
    insert into public.feature_flags_audit(flag_id, key, action, old_row, new_row, reason, actor_user, actor_email)
    values (NEW.id, NEW.key, 'update', to_jsonb(OLD), to_jsonb(NEW), NEW.reason, v_actor, coalesce(v_email, NEW.owner_name));
    NEW.updated_at := now();
    return NEW;
  elsif TG_OP = 'DELETE' then
    insert into public.feature_flags_audit(flag_id, key, action, old_row, new_row, reason, actor_user, actor_email)
    values (OLD.id, OLD.key, 'delete', to_jsonb(OLD), null, OLD.reason, v_actor, v_email);
    return OLD;
  end if;
  return null;
end $$;

drop trigger if exists trg_feature_flags_v2_audit on public.feature_flags_v2;
create trigger trg_feature_flags_v2_audit
  after insert or update or delete on public.feature_flags_v2
  for each row execute function public.tg_feature_flags_v2_audit();

-- 8) resolver RPC (single key)
create or replace function public.resolve_feature_flag(_company uuid, _env text, _key text)
returns table (
  key text,
  value boolean,
  payload jsonb,
  resolved_scope public.flag_scope,
  source_id uuid,
  expires_at timestamptz
) language sql stable as $$
  with candidates as (
    select *, 1 as prio
      from public.feature_flags_v2
     where key = _key and scope = 'tenant' and company_id = _company and env = _env
       and (expires_at is null or expires_at > now())
    union all
    select *, 2 as prio
      from public.feature_flags_v2
     where key = _key and scope = 'tenant' and company_id = _company and env is null
       and (expires_at is null or expires_at > now())
    union all
    select *, 3 as prio
      from public.feature_flags_v2
     where key = _key and scope = 'env' and env = _env
       and (expires_at is null or expires_at > now())
    union all
    select *, 4 as prio
      from public.feature_flags_v2
     where key = _key and scope = 'global'
       and (expires_at is null or expires_at > now())
  )
  select c.key, c.value, c.payload, c.scope, c.id, c.expires_at
    from candidates c
order by c.prio asc, c.updated_at desc
   limit 1;
$$;

revoke all on function public.resolve_feature_flag(uuid, text, text) from public;
grant execute on function public.resolve_feature_flag(uuid, text, text) to authenticated;

-- 9) convenience view to see effective flags per tenant/env (for admin UI)
create or replace view public.v_feature_flags_effective as
select distinct on (k.key, scope_order)
  k.key,
  res.value,
  res.payload,
  res.resolved_scope,
  res.source_id,
  res.expires_at
from (
  select key,
         unnest(array['tenant_env','tenant','env','global']) as scope_order
  from (select distinct key from public.feature_flags_v2) t
) k
left join lateral (
  select * from public.resolve_feature_flag(null, current_setting('app.env', true), k.key)
) res on true;

-- 10) seed (optional/safe)
insert into public.feature_flags_v2(key, scope, value, reason)
select 'agents.autonomousProcessing', 'global', true, 'default on'
where not exists (select 1 from public.feature_flags_v2 where key='agents.autonomousProcessing' and scope='global');

-- 11) audit marker (guarded)
do $$ begin
  if exists (select 1 from auth.users where email='system@transbotai.com') then
    insert into public.feature_flags_audit(key, action, new_row, actor_user, actor_email)
      values ('__migration_pr101__', 'insert', jsonb_build_object('version','pr101'), 
              (select id from auth.users where email='system@transbotai.com' limit 1),
              'system@transbotai.com');
  end if;
end $$;
