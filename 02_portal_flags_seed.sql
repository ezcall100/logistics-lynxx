-- 02_portal_flags_seed.sql
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
  ('portal.superAdmin.enabled','global',true,'seed','ops'),
  ('portal.admin.enabled','global',true,'seed','ops'),
  ('portal.tmsAdmin.enabled','global',true,'seed','ops'),
  ('portal.onboarding.enabled','global',true,'seed','ops'),
  ('portal.broker.enabled','global',true,'seed','ops'),
  ('portal.shipper.enabled','global',true,'seed','ops'),
  ('portal.carrier.enabled','global',true,'seed','ops'),
  ('portal.driver.enabled','global',true,'seed','ops'),
  ('portal.ownerOperator.enabled','global',true,'seed','ops'),
  ('portal.factoring.enabled','global',true,'seed','ops'),
  ('portal.loadBoard.enabled','global',true,'seed','ops'),
  ('portal.crm.enabled','global',true,'seed','ops'),
  ('portal.financials.enabled','global',true,'seed','ops'),
  ('portal.edi.enabled','global',true,'seed','ops'),
  ('portal.marketplace.enabled','global',true,'seed','ops'),
  ('portal.analytics.enabled','global',true,'seed','ops'),
  ('portal.autonomous.enabled','global',true,'seed','ops'),
  ('portal.workers.enabled','global',true,'seed','ops'),
  ('portal.rates.enabled','global',true,'seed','ops'),
  ('portal.directory.enabled','global',true,'seed','ops'),
  -- autonomy rails
  ('autonomy.emergencyStop','global',false,'go-live','ops'),
  ('autonomy.mode','global','FULL','go-live','ops'),
  ('agents.autonomousEnabled','global',true,'go-live','ops'),
  ('obs.otelEnabled','global',true,'go-live','ops')
on conflict (key, scope) do update set value=excluded.value;
