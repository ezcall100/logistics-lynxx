-- Autonomous Tasks Management System
create table if not exists public.autonomous_tasks (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('development', 'testing', 'deployment', 'monitoring', 'optimization')),
  priority integer not null default 1,
  payload jsonb default '{}'::jsonb,
  status text not null check (status in ('pending', 'running', 'completed', 'failed')) default 'pending',
  result jsonb,
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  completed_at timestamptz
);

-- Performance indexes
create index if not exists idx_autonomous_tasks_type_status on public.autonomous_tasks(type, status);
create index if not exists idx_autonomous_tasks_priority on public.autonomous_tasks(priority desc);
create index if not exists idx_autonomous_tasks_created_at on public.autonomous_tasks(created_at desc);

-- RLS policies
alter table public.autonomous_tasks enable row level security;

create policy autonomous_tasks_read on public.autonomous_tasks
  for select using (true);

create policy autonomous_tasks_insert on public.autonomous_tasks
  for insert with check (true);

create policy autonomous_tasks_update on public.autonomous_tasks
  for update using (true);

-- Metrics view
create or replace view public.v_autonomous_metrics as
select
  type,
  count(*) as total_tasks,
  count(*) filter (where status = 'completed') as completed_tasks,
  count(*) filter (where status = 'failed') as failed_tasks,
  round(100.0 * count(*) filter (where status = 'completed') / nullif(count(*), 0), 2) as success_rate_pct,
  avg(extract(epoch from (updated_at - created_at))) as avg_duration_seconds
from public.autonomous_tasks
where created_at >= now() - interval '24 hours'
group by type;

-- Updated trigger
create trigger trg_autonomous_tasks_updated_at
  before update on public.autonomous_tasks
  for each row execute function public.touch_updated_at();
