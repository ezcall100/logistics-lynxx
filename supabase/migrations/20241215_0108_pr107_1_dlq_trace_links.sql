-- PR-107.1: Add trace_id to DLQ admin for deep-linking
-- Updates DLQ admin function to include trace_id for UI deep-links

-- Update the materialized view to include trace_id
drop materialized view if exists public.mv_dlq_items;
create materialized view if not exists public.mv_dlq_items as
select
  null::uuid                    as id,
  null::uuid                    as company_id,
  now()                         as created_at,
  now()                         as last_error_at,
  0::int                        as attempts,
  ''::text                      as last_error,
  0::int                        as payload_bytes,
  'failed'::text                as status,
  null::text                    as trace_id
where false;

create index if not exists idx_mv_dlq_items_company on public.mv_dlq_items(company_id);

-- Update the DLQ admin list function to include trace_id
create or replace function public.dlq_admin_list(_company uuid, _limit int default 50, _status text default null)
returns table(
  id uuid,
  company_id uuid,
  created_at timestamptz,
  last_error_at timestamptz,
  attempts int,
  last_error text,
  payload_bytes int,
  status text,
  trace_id text
)
language sql
security definer
set search_path = public
as $$
  select id, company_id, created_at, last_error_at, attempts, last_error, payload_bytes, status, trace_id
  from public.mv_dlq_items
  where (_company is null or company_id = _company)
    and (_status is null or status = _status)
  order by created_at asc
  limit greatest(1, least(coalesce(_limit,50), 200));
$$;
