-- Website Builder Database Tables
-- Trans Bot AI TMS Software Company

-- Pages table (RLS: company_id for multi-tenant; drop company_id if single-tenant)
create table if not exists public.website_pages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  slug text unique,
  page_type text check (page_type in ('home','about','tms-software','features','pricing','contact','blog','solutions','resources','support','careers','demo','api','integrations')),
  title text,
  seo_score int,
  word_count int,
  image_count int,
  build_started_at timestamptz not null default now(),
  build_finished_at timestamptz,
  build_ms int generated always as (extract(epoch from (coalesce(build_finished_at, now()) - build_started_at))*1000)::int stored,
  status text check (status in ('queued','building','done','error')) not null default 'queued',
  meta jsonb default '{}'::jsonb
);

-- Logs / progress
create table if not exists public.website_builder_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  page_id uuid references public.website_pages(id) on delete cascade,
  ts timestamptz not null default now(),
  level text check (level in ('info','warn','error')) not null,
  msg text not null,
  meta jsonb default '{}'::jsonb
);

-- Indexes
create index if not exists idx_wp_company_ts on public.website_pages(company_id, build_started_at desc);
create index if not exists idx_wbl_company_ts on public.website_builder_logs(company_id, ts desc);
create index if not exists idx_wp_status on public.website_pages(status);
create index if not exists idx_wp_type on public.website_pages(page_type);

-- RLS (mirror your existing helpers)
alter table public.website_pages enable row level security;
alter table public.website_builder_logs enable row level security;

-- RLS policies for website_pages
create policy wp_read on public.website_pages for select using (
  company_id is null or public.is_company_member(company_id)
);

create policy wp_client_insert_deny on public.website_pages for insert with check (false);
create policy wp_client_update_deny on public.website_pages for update using (false);
create policy wp_client_delete_deny on public.website_pages for delete using (false);

-- RLS policies for website_builder_logs
create policy wbl_read on public.website_builder_logs for select using (
  company_id is null or public.is_company_member(company_id)
);

create policy wbl_client_insert_deny on public.website_builder_logs for insert with check (false);
create policy wbl_client_update_deny on public.website_builder_logs for update using (false);
create policy wbl_client_delete_deny on public.website_builder_logs for delete using (false);

-- Realtime publication (safe/no-op if already added)
do $$
begin
  begin 
    alter publication supabase_realtime add table public.website_pages; 
  exception when duplicate_object then 
    null; 
  end;
  begin 
    alter publication supabase_realtime add table public.website_builder_logs; 
  exception when duplicate_object then 
    null; 
  end;
end $$;

-- Helper functions for website builder
create or replace function public.get_website_builder_stats()
returns table (
  pages_done_2m bigint,
  avg_seo numeric,
  avg_ms numeric,
  events_60s bigint
) as $$
begin
  return query
  select
    count(*) filter (where status='done' and build_finished_at > now()-interval '2 minutes') as pages_done_2m,
    round(avg(seo_score), 1) as avg_seo,
    round(avg(build_ms), 1) as avg_ms,
    (select count(*) from public.website_builder_logs where ts > now() - interval '60 seconds') as events_60s
  from public.website_pages
  where build_started_at > now() - interval '2 minutes';
end;
$$ language plpgsql security definer;

-- Function to get recent pages
create or replace function public.get_recent_pages(limit_count int default 20)
returns table (
  id uuid,
  slug text,
  page_type text,
  title text,
  seo_score int,
  word_count int,
  image_count int,
  build_ms int,
  status text,
  build_started_at timestamptz,
  build_finished_at timestamptz
) as $$
begin
  return query
  select 
    wp.id,
    wp.slug,
    wp.page_type,
    wp.title,
    wp.seo_score,
    wp.word_count,
    wp.image_count,
    wp.build_ms,
    wp.status,
    wp.build_started_at,
    wp.build_finished_at
  from public.website_pages wp
  where wp.company_id is null or public.is_company_member(wp.company_id)
  order by wp.build_started_at desc
  limit limit_count;
end;
$$ language plpgsql security definer;

-- Function to get recent logs
create or replace function public.get_recent_logs(limit_count int default 50)
returns table (
  id uuid,
  page_id uuid,
  ts timestamptz,
  level text,
  msg text,
  meta jsonb
) as $$
begin
  return query
  select 
    wbl.id,
    wbl.page_id,
    wbl.ts,
    wbl.level,
    wbl.msg,
    wbl.meta
  from public.website_builder_logs wbl
  where wbl.company_id is null or public.is_company_member(wbl.company_id)
  order by wbl.ts desc
  limit limit_count;
end;
$$ language plpgsql security definer;

-- Insert some sample data for testing
insert into public.website_pages (slug, page_type, title, seo_score, word_count, image_count, status, build_finished_at) values
('home-demo', 'home', 'Trans Bot AI Home Page', 85, 150, 3, 'done', now() - interval '5 minutes'),
('about-demo', 'about', 'About Trans Bot AI', 82, 200, 2, 'done', now() - interval '4 minutes'),
('tms-software-demo', 'tms-software', 'TMS Software Features', 88, 180, 4, 'done', now() - interval '3 minutes'),
('features-demo', 'features', 'TMS Features Overview', 90, 120, 2, 'done', now() - interval '2 minutes'),
('pricing-demo', 'pricing', 'TMS Pricing Plans', 85, 100, 1, 'done', now() - interval '1 minute')
on conflict (slug) do nothing;

-- Insert sample logs
insert into public.website_builder_logs (level, msg, meta) values
('info', 'Website builder started', '{"action": "start", "timestamp": "' || now()::text || '"}'),
('info', 'Sample pages created for testing', '{"action": "sample_data", "count": 5}'),
('info', 'Trans Bot AI TMS website builder operational', '{"status": "operational", "company": "Trans Bot AI"}')
on conflict do nothing;
