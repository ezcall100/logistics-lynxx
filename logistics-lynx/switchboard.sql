-- Global kill-switch: must be FALSE to run autonomous mode
insert into public.feature_flags_v2(key, scope, value, reason, owner_name)
values
('autonomy.emergencyStop', 'global', false, 'Full authority mode', 'autonomous'),
('autonomy.mode', 'global', 'FULL', 'Agents control all portals', 'autonomous'),

-- Portal access (20 canonical)
('portal.superAdmin.enabled','global',true,'Canonical portals','autonomous'),
('portal.admin.enabled','global',true,'','autonomous'),
('portal.tmsAdmin.enabled','global',true,'','autonomous'),
('portal.onboarding.enabled','global',true,'','autonomous'),
('portal.broker.enabled','global',true,'','autonomous'),
('portal.shipper.enabled','global',true,'','autonomous'),
('portal.carrier.enabled','global',true,'','autonomous'),
('portal.driver.enabled','global',true,'','autonomous'),
('portal.ownerOperator.enabled','global',true,'','autonomous'),
('portal.factoring.enabled','global',true,'','autonomous'),
('portal.loadBoard.enabled','global',true,'','autonomous'),
('portal.crm.enabled','global',true,'','autonomous'),
('portal.financials.enabled','global',true,'','autonomous'),
('portal.edi.enabled','global',true,'','autonomous'),
('portal.marketplace.enabled','global',true,'','autonomous'),
('portal.analytics.enabled','global',true,'','autonomous'),
('portal.autonomous.enabled','global',true,'','autonomous'),
('portal.workers.enabled','global',true,'','autonomous'),
('portal.rates.enabled','global',true,'','autonomous'),
('portal.directory.enabled','global',true,'','autonomous'),

-- Autonomy & observability
('agents.autonomousEnabled','global',true,'','autonomous'),
('obs.otelEnabled','global',true,'','autonomous'),
('obs.tracesPageEnabled','global',true,'','autonomous'),

-- Replay & budget rails (allow high, still bounded)
('ops.dlqAdminUIEnabled','global',true,'','autonomous'),
('budget.replay.maxBatch','global',50,'','autonomous'),
('budget.replay.maxPayloadMB','global',2,'','autonomous'),
('rate.roi.perMin','global',10,'','autonomous'),
('rate.checkout.perMin','global',5,'','autonomous'),
('rate.replay.per5m','global',3,'','autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- Ensure autonomy applies to every tenant (inherit global)
-- (No-op if env/tenant overrides already exist)
