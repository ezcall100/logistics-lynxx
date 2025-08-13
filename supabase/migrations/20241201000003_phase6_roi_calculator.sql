-- ROI Calculator Database Schema
-- Phase 6: Enterprise GTM - ROI Calculator

-- Create ROI estimates table
create table if not exists public.roi_estimates (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  contact_email text,
  monthly_quotes int not null,
  win_rate_before numeric not null,
  avg_revenue_per_load numeric not null,
  avg_margin_before numeric not null,        -- percent (e.g., 12.5)
  minutes_per_quote numeric not null,
  plan text check (plan in ('starter','pro','enterprise')) default 'starter',
  uplift_win_rate numeric default 5.0,       -- % points
  uplift_margin_pts numeric default 1.2,     -- % points
  time_reduction_pct numeric default 60.0,   -- % reduction
  labor_cost_per_hour numeric default 45.0,
  calc jsonb,                                -- full breakdown snapshot
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.roi_estimates enable row level security;

-- RLS Policies
create policy "public create roi" on public.roi_estimates
  for insert to anon with check (true);

create policy "owner read roi" on public.roi_estimates
  for select using (auth.role() = 'service_role'); -- keep private to server-side reads

-- Create indexes for performance
create index idx_roi_estimates_created_at on public.roi_estimates(created_at);
create index idx_roi_estimates_contact_email on public.roi_estimates(contact_email);
create index idx_roi_estimates_plan on public.roi_estimates(plan);

-- Create view for ROI analytics
create or replace view v_roi_analytics as
select 
  date_trunc('day', created_at) as date,
  plan,
  count(*) as submissions,
  avg((calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((calc->>'paybackDays')::numeric) as avg_payback_days,
  avg(monthly_quotes) as avg_monthly_quotes,
  avg(win_rate_before) as avg_win_rate_before
from public.roi_estimates
where created_at > now() - interval '90 days'
group by 1, 2
order by 1 desc, 2;

-- Grant access to analytics view
grant select on v_roi_analytics to authenticated;
