-- PR-104: Agent Logs Partitioning + Hot Indexes (+ rotation)
-- Safe to re-run. Requires pg_cron (already used in earlier phases).

-- 1) Guard rails: ensure source table exists
do $$
begin
  if not exists (select 1 from information_schema.tables
                 where table_schema='public' and table_name='agent_logs') then
    raise notice 'agent_logs does not exist yet; skipping partition migration.';
    return;
  end if;
end $$;

-- 2) Create partitioned parent (shadow) with identical shape
create table if not exists public.agent_logs_p (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.agent_tasks(id) on delete cascade,
  company_id uuid not null,
  ts timestamptz not null default now(),
  level text not null check (level in ('debug','info','warn','error')),
  msg text not null,
  meta jsonb default '{}'::jsonb
) partition by range (ts);

-- RLS mirror
alter table public.agent_logs_p enable row level security;

create or replace function public.is_company_member(_company uuid)
returns boolean language sql stable as $$
  select exists(select 1 from public.profiles p
                where p.user_id = auth.uid() and p.company_id = _company);
$$;

do $$
begin
  -- SELECT policy (same as before)
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='agent_logs_p' and policyname='agent_logs_p_read') then
    create policy agent_logs_p_read on public.agent_logs_p for select using (public.is_company_member(company_id));
  end if;

  -- INSERT policy (deny from clients; service role bypasses)
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='agent_logs_p' and policyname='agent_logs_p_insert') then
    create policy agent_logs_p_insert on public.agent_logs_p for insert with check (false);
  end if;
end $$;

-- 3) Helper: make N monthly partitions around "now"
create or replace function public._ensure_agent_logs_month_part(_month_start date)
returns void language plpgsql as $$
declare
  part_name text := 'agent_logs_p_'||to_char(_month_start,'YYYYMM');
  sql text;
begin
  -- partition for [_month_start, _month_start + 1 month)
  if not exists (select 1 from pg_class where relname = part_name) then
    sql := format($f$
      create table public.%I partition of public.agent_logs_p
      for values from (%L) to (%L);
    $f$, part_name, _month_start::timestamptz, (_month_start + interval '1 month')::timestamptz);
    execute sql;

    -- HOT indexes for this partition
    execute format('create index if not exists %I on public.%I (company_id, ts desc);', 'idx_'||part_name||'_company_ts', part_name);
    execute format('create index if not exists %I on public.%I (task_id);', 'idx_'||part_name||'_task', part_name);
    execute format('create index if not exists %I on public.%I using brin (ts);', 'idx_'||part_name||'_ts_brin', part_name);
  end if;
end $$;

-- 4) Create recent/backfill partitions: prev 2, current, next 3
do $$
declare m date;
begin
  for m in select date_trunc('month', now())::date + (i || ' month')::interval
           from generate_series(-2, 3) as g(i)
  loop
    perform public._ensure_agent_logs_month_part(m::date);
  end loop;
end $$;

-- Optional default partition for out-of-range writes
create table if not exists public.agent_logs_p_default partition of public.agent_logs_p default;
create index if not exists idx_agent_logs_p_default_company_ts on public.agent_logs_p_default(company_id, ts desc);
create index if not exists idx_agent_logs_p_default_task on public.agent_logs_p_default(task_id);
create index if not exists idx_agent_logs_p_default_ts_brin on public.agent_logs_p_default using brin(ts);

-- 5) Realtime + replica identity safety
do $$
begin
  begin
    alter publication supabase_realtime add table public.agent_logs_p;
  exception when duplicate_object then null; end;
end $$;

-- 6) Backfill (coarse; OK for modest volumes; for very large, use batch job)
-- Skip if we already swapped
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='agent_logs_legacy')
  then
    raise notice 'agent_logs already swapped; skip backfill.';
    return;
  end if;

  insert into public.agent_logs_p (id, task_id, company_id, ts, level, msg, meta)
  select id, task_id, company_id, ts, level, msg, meta
  from public.agent_logs a
  on conflict do nothing;
end $$;

-- 7) Fast swap (milliseconds): rename old→legacy, parent→current name; restore policies/indexes/publication
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='agent_logs_legacy') then
    -- already swapped
    return;
  end if;

  -- keep a tiny lock window
  execute 'alter table public.agent_logs rename to agent_logs_legacy';
  execute 'alter table public.agent_logs_p rename to agent_logs';

  -- re-add to publication under the new name
  begin
    alter publication supabase_realtime add table public.agent_logs;
  exception when duplicate_object then null; end;

  -- mirror RLS policies name (optional cosmetic)
  begin
    drop policy if exists agent_logs_read on public.agent_logs;
  exception when undefined_object then null; end;
  begin
    create policy agent_logs_read on public.agent_logs for select using (public.is_company_member(company_id));
  exception when duplicate_object then null; end;

  begin
    drop policy if exists agent_logs_insert on public.agent_logs;
  exception when undefined_object then null; end;
  begin
    create policy agent_logs_insert on public.agent_logs for insert with check (false);
  exception when duplicate_object then null; end;
end $$;

-- 8) Rotation: create next month partition daily; drop partitions older than 13 months
create extension if not exists pg_cron;

create or replace function public._agent_logs_rotate()
returns void language plpgsql as $$
declare
  next_month date := date_trunc('month', now())::date + interval '1 month';
  drop_before date := date_trunc('month', now())::date - interval '13 months';
  part_to_drop record;
begin
  -- ensure next month partition exists
  perform public._ensure_agent_logs_month_part(next_month);

  -- drop older than 13 months (by partition name)
  for part_to_drop in
    select c.relname
    from pg_class c
    join pg_inherits i on i.inhrelid = c.oid
    join pg_class p on p.oid = i.inhparent and p.relname='agent_logs'
    where c.relname like 'agent_logs_%'
  loop
    begin
      if substring(part_to_drop.relname from 'agent_logs_(\d{6})') is not null then
        if to_date(substring(part_to_drop.relname from 'agent_logs_(\d{6})'), 'YYYYMM') < drop_before then
          execute format('drop table if exists public.%I cascade;', part_to_drop.relname);
        end if;
      end if;
    exception when others then null;
    end;
  end loop;
end $$;

select cron.schedule('agent_logs_rotate_daily', '15 3 * * *', $$ select public._agent_logs_rotate(); $$);

-- 9) Metrics view remains valid (relies on agent_tasks). No change needed.

-- 10) Audit (guarded)
do $$
begin
  if exists (select 1 from auth.users where email='system@transbotai.com') then
    insert into public.audit_log(action, table_name, details, created_by)
    values ('agent_logs_partitioned', 'agent_logs',
            jsonb_build_object('strategy','monthly_range','retention_months', 13,
                               'indexes','(company_id, ts desc), task_id, brin(ts)'),
            (select id from auth.users where email='system@transbotai.com' limit 1));
  end if;
end $$;
