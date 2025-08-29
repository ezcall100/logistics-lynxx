-- MCP Tasks Schema for Production
create table if not exists tasks(
  id uuid primary key default gen_random_uuid(),
  type text not null,
  status text not null default 'queued',
  priority int not null default 3,
  payload jsonb,
  retries int not null default 0,
  max_retries int not null default 3,
  idempotency_key text unique,
  correlation_id text,
  scheduled_at timestamptz,
  started_at timestamptz,
  finished_at timestamptz,
  error jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_type on tasks(type);
create index if not exists idx_tasks_created_at on tasks(created_at);
create index if not exists idx_tasks_idempotency_key on tasks(idempotency_key);
create index if not exists idx_tasks_correlation_id on tasks(correlation_id);

-- RLS policies
alter table tasks enable row level security;

-- Allow authenticated users to read their own tasks
create policy "Users can view their own tasks" on tasks
  for select using (auth.uid()::text = created_by);

-- Allow authenticated users to create tasks
create policy "Users can create tasks" on tasks
  for insert with check (auth.uid() is not null);

-- Allow authenticated users to update their own tasks
create policy "Users can update their own tasks" on tasks
  for update using (auth.uid()::text = created_by);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_tasks_updated_at
  before update on tasks
  for each row
  execute function update_updated_at_column();
