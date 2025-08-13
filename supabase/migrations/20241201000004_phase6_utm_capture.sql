-- UTM Capture for ROI Calculator
-- Phase 6: Enhanced Lead Attribution

-- Add UTM fields to roi_estimates table
alter table public.roi_estimates 
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists utm_term text,
add column if not exists utm_content text,
add column if not exists referrer text,
add column if not exists user_agent text;

-- Create index for UTM analysis
create index if not exists idx_roi_estimates_utm on public.roi_estimates(utm_source, utm_medium, utm_campaign);

-- Enhanced ROI analytics view with UTM data
create or replace view v_roi_analytics_utm as
select 
  date_trunc('day', created_at) as date,
  plan,
  utm_source,
  utm_medium,
  utm_campaign,
  count(*) as submissions,
  avg((calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((calc->>'paybackDays')::numeric) as avg_payback_days,
  avg(monthly_quotes) as avg_monthly_quotes,
  avg(win_rate_before) as avg_win_rate_before
from public.roi_estimates
where created_at > now() - interval '90 days'
group by 1, 2, 3, 4, 5
order by 1 desc, 2, 3, 4, 5;

-- Grant access to enhanced analytics view
grant select on v_roi_analytics_utm to authenticated;
