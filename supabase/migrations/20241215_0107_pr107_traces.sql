-- PR-107: Super-Admin Traces Page - Database Migration
-- Adds trace_id storage + admin RPC for deep-linking to OTEL backend

-- Add trace_id to tasks/logs (idempotent)
alter table public.agent_tasks add column if not exists trace_id text;
create index if not exists idx_agent_tasks_trace on public.agent_tasks(trace_id);

alter table public.agent_logs add column if not exists trace_id text;
create index if not exists idx_agent_logs_trace on public.agent_logs(trace_id);

-- Super-admin check (idempotent)
create or replace function public.is_super_admin()
returns boolean language sql stable as $$
  select exists(
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'super_admin'
  );
$$;

-- Recent traces view (last 24h) - leverages existing RLS on base tables
create or replace view public.v_recent_traces as
select t.company_id, t.id as task_id, t.fn_name, t.status, t.updated_at, t.trace_id
from public.agent_tasks t
where t.updated_at > now() - interval '24 hours' and t.trace_id is not null
union all
select l.company_id, l.task_id, null::text as fn_name, 'log'::text as status, l.ts as updated_at, l.trace_id
from public.agent_logs l
where l.ts > now() - interval '24 hours' and l.trace_id is not null;

-- Admin RPC: cross-tenant (security definer + guard)
create or replace function public.admin_recent_traces(
  _company uuid default null,
  _since interval default '24 hours'
)
returns table(company_id uuid, task_id uuid, fn_name text, status text, updated_at timestamptz, trace_id text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_super_admin() then
    raise exception 'forbidden';
  end if;

  return query
  select company_id, task_id, fn_name, status, updated_at, trace_id
  from v_recent_traces
  where updated_at > now() - _since
    and (_company is null or company_id = _company)
  order by updated_at desc
  limit 500;
end $$;

revoke all on function public.admin_recent_traces(uuid, interval) from public;
grant execute on function public.admin_recent_traces(uuid, interval) to authenticated;

-- Feature flag for page visibility (PR-101 infra)
insert into public.feature_flags_v2(key, scope, value, reason, owner_name)
values ('obs.tracesPageEnabled', 'global', false, 'Gate Super-Admin Traces page', 'pr107')
on conflict (key, scope) do nothing;
