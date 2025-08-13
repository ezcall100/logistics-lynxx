-- PR-103: DLQ Admin UI — helpers, controls, and secure RPCs

-- Controls table (pause/drain per tenant)
create table if not exists public.dlq_controls (
  company_id uuid primary key,
  paused boolean not null default false,
  drained_at timestamptz
);

alter table public.dlq_controls enable row level security;

-- Claim-aware super admin helper (safe re-create)
create or replace function public.is_super_admin()
returns boolean
language plpgsql
stable
as $$
declare
  claims jsonb;
  role_txt text;
begin
  begin
    claims := auth.jwt();
  exception when others then
    claims := '{}'::jsonb;
  end;
  role_txt := coalesce(claims->>'role','');
  if role_txt = 'super_admin' then
    return true;
  end if;
  -- optional fallback to profiles table (keep harmless if not present)
  return exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'super_admin'
  );
end
$$;

-- Super-admin-only policies for dlq_controls (reads via RPCs, writes via definer)
drop policy if exists dlq_controls_select on public.dlq_controls;
create policy dlq_controls_select on public.dlq_controls
  for select using ( public.is_super_admin() );

drop policy if exists dlq_controls_update on public.dlq_controls;
create policy dlq_controls_update on public.dlq_controls
  for update using ( public.is_super_admin() )
  with check ( public.is_super_admin() );

-- MATERIALIZED VIEW (optional): compact list of DLQ items (non-destructive placeholder)
-- If you already have a DLQ table, point the SELECT to it; otherwise read-only stub returns zero rows.
create materialized view if not exists public.mv_dlq_items as
select
  null::uuid                    as id,
  null::uuid                    as company_id,
  now()                         as created_at,
  now()                         as last_error_at,
  0::int                        as attempts,
  ''::text                      as last_error,
  0::int                        as payload_bytes,
  'failed'::text                as status
where false;

create index if not exists idx_mv_dlq_items_company on public.mv_dlq_items(company_id);

-- SECURE RPCs (security definer) for Admin UI
create or replace function public.dlq_admin_list(_company uuid, _limit int default 50, _status text default null)
returns table(
  id uuid,
  company_id uuid,
  created_at timestamptz,
  last_error_at timestamptz,
  attempts int,
  last_error text,
  payload_bytes int,
  status text
)
language sql
security definer
set search_path = public
as $$
  select id, company_id, created_at, last_error_at, attempts, last_error, payload_bytes, status
  from public.mv_dlq_items
  where (_company is null or company_id = _company)
    and (_status is null or status = _status)
  order by created_at asc
  limit greatest(1, least(coalesce(_limit,50), 200));
$$;

revoke all on function public.dlq_admin_list(uuid, int, text) from public;
grant execute on function public.dlq_admin_list(uuid, int, text) to authenticated;

-- Pause / Unpause
create or replace function public.dlq_admin_pause_company(_company uuid, _pause boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then
    raise exception 'not_authorized';
  end if;
  insert into public.dlq_controls(company_id, paused)
  values (_company, _pause)
  on conflict (company_id) do update set paused = excluded.paused;
end
$$;

revoke all on function public.dlq_admin_pause_company(uuid, boolean) from public;
grant execute on function public.dlq_admin_pause_company(uuid, boolean) to authenticated;

-- Drain marker (ops intent)
create or replace function public.dlq_admin_drain_company(_company uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then
    raise exception 'not_authorized';
  end if;
  insert into public.dlq_controls(company_id, paused, drained_at)
  values (_company, true, now())
  on conflict (company_id) do update set paused = true, drained_at = now();
end
$$;

revoke all on function public.dlq_admin_drain_company(uuid) from public;
grant execute on function public.dlq_admin_drain_company(uuid) to authenticated;
