-- =============================================================================
-- AUTONOMOUS OPERATING CHARTER - FEATURE FLAGS SETUP
-- =============================================================================
-- This script implements the complete feature flags system for autonomous operation
-- Run this to enable full autonomous authority across all portals and systems

-- =============================================================================
-- 1. GLOBAL MODE & KILL SWITCH
-- =============================================================================

-- Enable full autonomous mode
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('autonomy.emergencyStop','global',false,'enable autonomy','system'),
('autonomy.mode','global','FULL','full authority mode','system'),
('agents.autonomousEnabled','global',true,'run agents','system'),
('obs.otelEnabled','global',true,'tracing on','system')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 2. BUDGETS & SAFETY RAILS
-- =============================================================================

-- Set budget and rate limiting controls
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('budget.agents.maxConcurrent','global',150,'concurrency cap','autopilot'),
('budget.replay.maxBatch','global',50,'dlq cap','dlq'),
('budget.replay.maxPayloadMB','global',2,'payload cap','dlq'),
('rate.replay.per5m','global',3,'rate limit','dlq')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 3. PORTAL AUTHORITY GRANTS (20 Canonical Portals)
-- =============================================================================

-- Grant autonomous authority to all portals
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

-- =============================================================================
-- 4. WEBSITE AUTHORITY GRANTS
-- =============================================================================

-- Grant autonomous authority to website operations
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('website.content.autonomous','global',true,'website content generation','agents'),
('website.seo.autonomous','global',true,'website SEO optimization','agents'),
('website.images.autonomous','global',true,'website image generation','agents'),
('website.structured_data.autonomous','global',true,'website structured data','agents'),
('website.analytics.autonomous','global',true,'website analytics','agents'),
('website.performance.autonomous','global',true,'website performance optimization','agents'),
('website.accessibility.autonomous','global',true,'website accessibility compliance','agents'),
('website.mobile.autonomous','global',true,'website mobile optimization','agents')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 5. OPERATIONAL CONTROLS
-- =============================================================================

-- Enable operational features
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('ops.dlq.replay.enabled','global',true,'DLQ replay functionality','dlq'),
('ops.outbox.enabled','global',true,'event outbox processing','agents'),
('ops.audit.enabled','global',true,'comprehensive audit logging','system'),
('ops.monitoring.enabled','global',true,'real-time monitoring','autopilot'),
('ops.health_checks.enabled','global',true,'health check system','ci'),
('ops.auto_rollback.enabled','global',true,'automatic rollback on failure','ci'),
('ops.slo_gates.enabled','global',true,'SLO-based gating','autopilot'),
('ops.canary.enabled','global',true,'canary deployment','autopilot')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 6. SECURITY & COMPLIANCE
-- =============================================================================

-- Enable security features
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('security.pii_redaction.enabled','global',true,'PII redaction in logs','system'),
('security.idempotency.enabled','global',true,'idempotency controls','system'),
('security.audit.enabled','global',true,'audit trail','system'),
('security.rls.enabled','global',true,'row level security','system'),
('security.hmac.enabled','global',true,'HMAC authentication','system'),
('security.jwt.enabled','global',true,'JWT token validation','system'),
('security.csp.enabled','global',true,'content security policy','system'),
('security.cors.enabled','global',true,'CORS protection','system')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 7. ANALYTICS & MONITORING
-- =============================================================================

-- Enable analytics and monitoring
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('analytics.realtime.enabled','global',true,'real-time analytics','agents'),
('analytics.predictive.enabled','global',true,'predictive analytics','agents'),
('analytics.kpi.enabled','global',true,'KPI tracking','agents'),
('analytics.funnel.enabled','global',true,'funnel analysis','agents'),
('analytics.slo.enabled','global',true,'SLO tracking','autopilot'),
('analytics.exemplars.enabled','global',true,'trace exemplars','autopilot'),
('monitoring.uptime.enabled','global',true,'uptime monitoring','autopilot'),
('monitoring.performance.enabled','global',true,'performance monitoring','autopilot'),
('monitoring.errors.enabled','global',true,'error tracking','autopilot'),
('monitoring.traces.enabled','global',true,'distributed tracing','autopilot')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 8. INTEGRATION & WORKFLOW
-- =============================================================================

-- Enable integrations and workflows
insert into feature_flags_v2(key,scope,value,reason,owner_name) values
('integration.n8n.enabled','global',true,'n8n workflow integration','n8n'),
('integration.stripe.enabled','global',true,'Stripe payment integration','agents'),
('integration.crm.enabled','global',true,'CRM integration','agents'),
('integration.edi.enabled','global',true,'EDI integration','agents'),
('integration.slack.enabled','global',true,'Slack notifications','agents'),
('integration.email.enabled','global',true,'email notifications','agents'),
('workflow.autonomous.enabled','global',true,'autonomous workflows','agents'),
('workflow.approval.enabled','global',true,'approval workflows','agents'),
('workflow.escalation.enabled','global',true,'escalation workflows','agents'),
('workflow.notification.enabled','global',true,'notification workflows','agents')
on conflict (key,scope) do update set value=excluded.value;

-- =============================================================================
-- 9. VERIFICATION QUERIES
-- =============================================================================

-- Verify the setup
SELECT 'AUTONOMOUS FEATURE FLAGS SETUP COMPLETE' as status;

-- Check key flags
SELECT key, value, reason 
FROM feature_flags_v2 
WHERE key IN (
  'autonomy.emergencyStop',
  'autonomy.mode', 
  'agents.autonomousEnabled',
  'obs.otelEnabled'
) 
ORDER BY key;

-- Count total flags
SELECT COUNT(*) as total_flags FROM feature_flags_v2 WHERE scope = 'global';

-- Check portal flags
SELECT COUNT(*) as portal_flags 
FROM feature_flags_v2 
WHERE key LIKE 'portal.%' AND scope = 'global';

-- Check website flags
SELECT COUNT(*) as website_flags 
FROM feature_flags_v2 
WHERE key LIKE 'website.%' AND scope = 'global';

-- =============================================================================
-- 10. EMERGENCY STOP COMMAND (for reference)
-- =============================================================================

-- To stop all autonomous operations:
-- UPDATE feature_flags_v2 SET value = true WHERE key = 'autonomy.emergencyStop' AND scope = 'global';

-- To resume autonomous operations:
-- UPDATE feature_flags_v2 SET value = false WHERE key = 'autonomy.emergencyStop' AND scope = 'global';

-- =============================================================================
-- SETUP COMPLETE
-- =============================================================================

-- The autonomous system is now configured with full authority across all portals
-- and systems, with comprehensive guardrails and monitoring in place.
