-- PR-PORTAL-DEV-AGENT: feature flags & budgets
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
  ('agents.portalDev.enabled','global',true,'Enable portal-dev autonomous agent','autonomous'),
  ('budget.portalDev.maxPRsPerHour','global',8,'PR throttle to protect CI','autonomous')
on conflict (key,scope) do update set value = excluded.value;

-- optional: log
do $$
begin
  if exists (select 1 from auth.users where email='system@transbotai.com') then
    insert into public.audit_log(action, table_name, details, created_by)
    values('portal_dev_agent_enabled','agent_system',
      jsonb_build_object('flags', array['agents.portalDev.enabled','budget.portalDev.maxPRsPerHour']),
      (select id from auth.users where email='system@transbotai.com' limit 1));
  end if;
end $$;
