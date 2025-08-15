-- Enables canonical portals globally (safe to re-run)
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('portal.superAdmin.enabled','global',true,'canon portals','ops'),
('portal.admin.enabled','global',true,'canon portals','ops'),
('portal.tmsAdmin.enabled','global',true,'canon portals','ops'),
('portal.onboarding.enabled','global',true,'canon portals','ops'),
('portal.broker.enabled','global',true,'canon portals','ops'),
('portal.shipper.enabled','global',true,'canon portals','ops'),
('portal.carrier.enabled','global',true,'canon portals','ops'),
('portal.driver.enabled','global',true,'canon portals','ops'),
('portal.ownerOperator.enabled','global',true,'canon portals','ops'),
('portal.factoring.enabled','global',true,'canon portals','ops'),
('portal.loadBoard.enabled','global',true,'canon portals','ops'),
('portal.crm.enabled','global',true,'canon portals','ops'),
('portal.financials.enabled','global',true,'canon portals','ops'),
('portal.edi.enabled','global',true,'canon portals','ops'),
('portal.marketplace.enabled','global',true,'canon portals','ops'),
('portal.analytics.enabled','global',true,'canon portals','ops'),
('portal.autonomous.enabled','global',true,'canon portals','ops'),
('portal.workers.enabled','global',true,'canon portals','ops'),
('portal.rates.enabled','global',true,'canon portals','ops'),
('portal.directory.enabled','global',true,'canon portals','ops')
on conflict (key, scope) do update set value=excluded.value;
