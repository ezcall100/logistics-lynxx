-- Autonomous Operating Charter - Feature Flags Setup
-- Run this to enable full autonomous authority

-- Global mode & kill switch
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('portal.shipper_admin.autonomous','global',true,'Shipper Admin Portal autonomous control','agents'),
('portal.broker_admin.autonomous','global',true,'Broker Admin Portal autonomous control','agents'),
('portal.carrier_admin.autonomous','global',true,'Carrier Admin Portal autonomous control','agents'),
('autonomy.emergencyStop','global',false,'enable autonomy','system'),
('autonomy.mode','global','FULL','full authority mode','system'),
('agents.autonomousEnabled','global',true,'run agents','system'),
('obs.otelEnabled','global',true,'tracing on','system')
on conflict (key,scope) do update set value=excluded.value;

-- Budgets / safety rails
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('budget.agents.maxConcurrent','global',150,'concurrency cap','autopilot'),
('budget.replay.maxBatch','global',50,'dlq cap','dlq'),
('budget.replay.maxPayloadMB','global',2,'payload cap','dlq'),
('rate.replay.per5m','global',3,'rate limit','dlq')
on conflict (key,scope) do update set value=excluded.value;

-- Portal authority grants (20 canonical portals)
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('portal.super_admin.autonomous','global',true,'super admin portal control','agents'),
('portal.admin.autonomous','global',true,'admin portal control','agents'),
('portal.tms_admin.autonomous','global',true,'TMS admin portal control','agents'),
('portal.onboarding.autonomous','global',true,'onboarding portal control','agents'),
('portal.broker.autonomous','global',true,'broker portal control','agents'),
('portal.shipper.autonomous','global',true,'shipper portal control','agents'),
('portal.carrier.autonomous','global',true,'carrier portal control','agents'),
('portal.driver.autonomous','global',true,'driver portal control','agents'),
('portal.owner_operator.autonomous','global',true,'owner operator portal control','agents'),
('portal.factoring.autonomous','global',true,'factoring portal control','agents'),
('portal.load_board.autonomous','global',true,'load board portal control','agents'),
('portal.crm.autonomous','global',true,'CRM portal control','agents'),
('portal.financials.autonomous','global',true,'financials portal control','agents'),
('portal.edi.autonomous','global',true,'EDI portal control','agents'),
('portal.marketplace.autonomous','global',true,'marketplace portal control','agents'),
('portal.analytics.autonomous','global',true,'analytics portal control','agents'),
('portal.autonomous.autonomous','global',true,'autonomous portal control','agents'),
('portal.workers.autonomous','global',true,'workers portal control','agents'),
('portal.rates.autonomous','global',true,'rates portal control','agents'),
('portal.directory.autonomous','global',true,'directory portal control','agents')
on conflict (key,scope) do update set value=excluded.value;

-- Website authority
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('website.content.autonomous','global',true,'website content generation','agents'),
('website.seo.autonomous','global',true,'website SEO optimization','agents'),
('website.images.autonomous','global',true,'website image generation','agents'),
('website.structured_data.autonomous','global',true,'website structured data','agents'),
('website.analytics.autonomous','global',true,'website analytics','agents')
on conflict (key,scope) do update set value=excluded.value;

-- Autonomous Agent System Setup
-- Feature flags for autonomous control across all portals

-- Enable autonomous features for all portals
INSERT INTO feature_flags_v2 (flag_key, scope, enabled, description, category) VALUES
('portal.super_admin.autonomous','global',true,'Super Admin Portal autonomous control','agents'),
('portal.admin.autonomous','global',true,'Admin Portal autonomous control','agents'),
('portal.tms_admin.autonomous','global',true,'TMS Admin Portal autonomous control','agents'),
('portal.onboarding.autonomous','global',true,'Onboarding Portal autonomous control','agents'),
('portal.broker.autonomous','global',true,'Broker Portal autonomous control','agents'),
('portal.shipper.autonomous','global',true,'Shipper Portal autonomous control','agents'),
('portal.carrier.autonomous','global',true,'Carrier Portal autonomous control','agents'),
('portal.driver.autonomous','global',true,'Driver Portal autonomous control','agents'),
('portal.owner_operator.autonomous','global',true,'Owner Operator Portal autonomous control','agents'),
('portal.factoring.autonomous','global',true,'Factoring Portal autonomous control','agents'),
('portal.load_board.autonomous','global',true,'Load Board Portal autonomous control','agents'),
('portal.crm.autonomous','global',true,'CRM Portal autonomous control','agents'),
('portal.financials.autonomous','global',true,'Financials Portal autonomous control','agents'),
('portal.edi.autonomous','global',true,'EDI Portal autonomous control','agents'),
('portal.marketplace.autonomous','global',true,'Marketplace Portal autonomous control','agents'),
('portal.analytics.autonomous','global',true,'Analytics Portal autonomous control','agents'),
('portal.autonomous.autonomous','global',true,'Autonomous AI Portal autonomous control','agents'),
('portal.workers.autonomous','global',true,'Workers Portal autonomous control','agents'),
('portal.rates.autonomous','global',true,'Rates Portal autonomous control','agents'),
('portal.directory.autonomous','global',true,'Directory Portal autonomous control','agents'),
('ui.v2.enabled','global',false,'UI v2 Design System rollout - canary flag','ui'),
('ui.v2.accentMap','global',true,'UI v2 Portal accent color mapping','ui'),
('obs.otelEnabled','global',true,'OpenTelemetry observability enabled','observability'),
('autonomy.emergencyStop','global',false,'Emergency stop for autonomous agents','safety')
ON CONFLICT (flag_key) DO UPDATE SET 
enabled = EXCLUDED.enabled,
description = EXCLUDED.description,
updated_at = NOW();

-- Emergency stop command (for reference):
-- update feature_flags_v2 set value=true where key='autonomy.emergencyStop' and scope='global';
