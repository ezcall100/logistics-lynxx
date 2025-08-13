-- Funnel & Ops Views for ROI Calculator
-- Phase 6: Sales Pipeline Analytics

-- Leads from ROI (last 30d) by plan
create or replace view roi_leads_30d as
select 
  plan, 
  count(*) as leads,
  avg((calc->>'monthlyImpact')::numeric) as avg_monthly_impact,
  avg((calc->>'paybackDays')::numeric) as avg_payback_days
from roi_estimates
where created_at > now() - interval '30 days'
group by 1
order by 2 desc;

-- ROI -> Trial conversion (email joined to Stripe/companies)
create or replace view roi_to_trial as
select 
  r.contact_email, 
  r.company_name,
  c.id as company_id, 
  r.created_at as roi_at, 
  c.created_at as trial_at,
  extract(epoch from (c.created_at - r.created_at))/3600 as hours_to_trial,
  r.calc->>'monthlyImpact' as monthly_impact,
  r.calc->>'paybackDays' as payback_days,
  r.plan as selected_plan
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
where c.created_at is not null
order by r.created_at desc;

-- Trial -> Paid (requires stripe_customer_id on companies)
create or replace view trial_to_paid as
select 
  c.id company_id,
  c.company_name,
  e.plan_id, 
  e.started_at,
  e.trial_ends_at,
  case 
    when e.trial_ends_at is null then 'paid'
    when e.trial_ends_at > now() then 'trial'
    else 'expired'
  end as status
from companies c
join org_entitlements e on e.company_id = c.id
where e.plan_id in ('starter','pro','enterprise')
order by e.started_at desc;

-- Complete funnel view
create or replace view roi_funnel_complete as
select 
  date_trunc('day', r.created_at) as date,
  count(*) as roi_submissions,
  count(distinct case when c.id is not null then r.contact_email end) as trials_created,
  count(distinct case when e.plan_id is not null and e.trial_ends_at is null then c.id end) as paid_conversions,
  round(
    (count(distinct case when c.id is not null then r.contact_email end)::numeric / 
     nullif(count(*), 0)) * 100, 2
  ) as roi_to_trial_rate,
  round(
    (count(distinct case when e.plan_id is not null and e.trial_ends_at is null then c.id end)::numeric / 
     nullif(count(distinct case when c.id is not null then r.contact_email end), 0)) * 100, 2
  ) as trial_to_paid_rate,
  round(
    (count(distinct case when e.plan_id is not null and e.trial_ends_at is null then c.id end)::numeric / 
     nullif(count(*), 0)) * 100, 2
  ) as overall_conversion_rate
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
left join org_entitlements e on e.company_id = c.id and e.trial_ends_at is null
where r.created_at > now() - interval '90 days'
group by 1
order by 1 desc;

-- UTM performance by source
create or replace view utm_performance as
select 
  utm_source,
  utm_medium,
  utm_campaign,
  count(*) as submissions,
  count(distinct case when c.id is not null then r.contact_email end) as trials,
  count(distinct case when e.plan_id is not null and e.trial_ends_at is null then c.id end) as paid,
  round(
    (count(distinct case when c.id is not null then r.contact_email end)::numeric / 
     nullif(count(*), 0)) * 100, 2
  ) as trial_rate,
  round(
    (count(distinct case when e.plan_id is not null and e.trial_ends_at is null then c.id end)::numeric / 
     nullif(count(distinct case when c.id is not null then r.contact_email end), 0)) * 100, 2
  ) as conversion_rate,
  avg((r.calc->>'monthlyImpact')::numeric) as avg_monthly_impact
from roi_estimates r
left join companies c on lower(c.contact_email) = lower(r.contact_email)
left join org_entitlements e on e.company_id = c.id and e.trial_ends_at is null
where r.created_at > now() - interval '90 days'
  and utm_source is not null
group by 1, 2, 3
order by 4 desc;

-- Grant access to all funnel views
grant select on roi_leads_30d to authenticated;
grant select on roi_to_trial to authenticated;
grant select on trial_to_paid to authenticated;
grant select on roi_funnel_complete to authenticated;
grant select on utm_performance to authenticated;
