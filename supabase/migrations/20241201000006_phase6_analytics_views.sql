-- Phase 6: Analytics Views for ROI Funnel Tracking
-- Enhanced dashboard views for executive reporting

-- ROI → Trial Conversion (30d)
create or replace view v_roi_to_trial_30d as
select
  date_trunc('day', r.created_at) as d,
  count(*) as roi_submits,
  count(*) filter (where c.id is not null) as trials,
  round(
    (count(*) filter (where c.id is not null)::decimal / count(*)::decimal) * 100, 
    2
  ) as conversion_rate
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
where r.created_at > now() - interval '30 days'
group by 1 
order by 1 desc;

-- Trial → Paid by Plan
create or replace view v_trial_to_paid as
select 
  e.plan_id, 
  count(distinct e.company_id) as paid_customers,
  count(distinct e.company_id) filter (where e.trial_ends_at is null) as active_trials,
  count(distinct e.company_id) filter (where e.trial_ends_at < now()) as expired_trials
from org_entitlements e
where e.plan_id in ('starter','pro','enterprise')
group by 1
order by 1;

-- ROI Lead Scoring Distribution
create or replace view v_roi_lead_scores as
select
  case 
    when (calc->>'monthlyImpact')::numeric >= 5000 then 'High Impact ($5k+)'
    when (calc->>'monthlyImpact')::numeric >= 2000 then 'Medium Impact ($2k-5k)'
    else 'Low Impact (<$2k)'
  end as impact_tier,
  case 
    when (calc->>'paybackDays')::numeric <= 30 then 'Fast Payback (≤30d)'
    when (calc->>'paybackDays')::numeric <= 90 then 'Medium Payback (31-90d)'
    else 'Slow Payback (>90d)'
  end as payback_tier,
  plan,
  count(*) as lead_count,
  avg((calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((calc->>'paybackDays')::numeric) as avg_payback_days
from roi_estimates
where created_at > now() - interval '90 days'
group by 1, 2, 3
order by 1, 2, 3;

-- UTM Source Performance
create or replace view v_utm_performance as
select
  utm_source,
  utm_medium,
  utm_campaign,
  count(*) as roi_submissions,
  count(*) filter (where c.id is not null) as trials_created,
  round(
    (count(*) filter (where c.id is not null)::decimal / count(*)::decimal) * 100, 
    2
  ) as trial_conversion_rate,
  avg((calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((calc->>'paybackDays')::numeric) as avg_payback_days
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
where r.created_at > now() - interval '90 days'
  and utm_source is not null
group by 1, 2, 3
order by roi_submissions desc;

-- Daily ROI Funnel Summary
create or replace view v_daily_roi_funnel as
select
  date_trunc('day', r.created_at) as date,
  count(*) as roi_submissions,
  count(*) filter (where c.id is not null) as trials_created,
  count(*) filter (where e.plan_id is not null) as paid_conversions,
  round(
    (count(*) filter (where c.id is not null)::decimal / count(*)::decimal) * 100, 
    2
  ) as roi_to_trial_rate,
  round(
    (count(*) filter (where e.plan_id is not null)::decimal / 
     nullif(count(*) filter (where c.id is not null)::decimal, 0)) * 100, 
    2
  ) as trial_to_paid_rate,
  avg((r.calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  sum((r.calc->>'monthlyImpact')::numeric) as total_potential_revenue
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
left join org_entitlements e on e.company_id = c.id
where r.created_at > now() - interval '30 days'
group by 1
order by 1 desc;

-- Plan Performance by ROI Score
create or replace view v_plan_performance as
select
  r.plan,
  count(*) as total_leads,
  count(*) filter (where c.id is not null) as trials_created,
  count(*) filter (where e.plan_id is not null) as paid_conversions,
  avg((r.calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((r.calc->>'paybackDays')::numeric) as avg_payback_days,
  round(
    (count(*) filter (where c.id is not null)::decimal / count(*)::decimal) * 100, 
    2
  ) as trial_conversion_rate,
  round(
    (count(*) filter (where e.plan_id is not null)::decimal / 
     nullif(count(*) filter (where c.id is not null)::decimal, 0)) * 100, 
    2
  ) as paid_conversion_rate
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
left join org_entitlements e on e.company_id = c.id
where r.created_at > now() - interval '90 days'
group by 1
order by total_leads desc;

-- Grant access to analytics views
grant select on v_roi_to_trial_30d to authenticated;
grant select on v_trial_to_paid to authenticated;
grant select on v_roi_lead_scores to authenticated;
grant select on v_utm_performance to authenticated;
grant select on v_daily_roi_funnel to authenticated;
grant select on v_plan_performance to authenticated;
