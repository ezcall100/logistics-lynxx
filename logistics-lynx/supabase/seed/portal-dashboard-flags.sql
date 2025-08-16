-- Auto-generated feature flags for portal dashboards
-- Generated on: 2025-08-16T21:39:42.637Z

INSERT INTO feature_flags (key, scope, enabled, description, created_by) VALUES
('portal.superAdmin.dashboard.enabled', 'global', true, 'Enable dashboard for superAdmin portal', 'autonomous'),
('portal.broker.dashboard.enabled', 'global', true, 'Enable dashboard for broker portal', 'autonomous'),
('portal.carrier.dashboard.enabled', 'global', true, 'Enable dashboard for carrier portal', 'autonomous'),
('portal.shipper.dashboard.enabled', 'global', true, 'Enable dashboard for shipper portal', 'autonomous'),
('portal.driver.dashboard.enabled', 'global', true, 'Enable dashboard for driver portal', 'autonomous'),
('portal.ownerOperator.dashboard.enabled', 'global', true, 'Enable dashboard for ownerOperator portal', 'autonomous'),
('portal.dispatcher.dashboard.enabled', 'global', true, 'Enable dashboard for dispatcher portal', 'autonomous'),
('portal.accountant.dashboard.enabled', 'global', true, 'Enable dashboard for accountant portal', 'autonomous'),
('portal.compliance.dashboard.enabled', 'global', true, 'Enable dashboard for compliance portal', 'autonomous'),
('portal.safety.dashboard.enabled', 'global', true, 'Enable dashboard for safety portal', 'autonomous'),
('portal.maintenance.dashboard.enabled', 'global', true, 'Enable dashboard for maintenance portal', 'autonomous'),
('portal.fuel.dashboard.enabled', 'global', true, 'Enable dashboard for fuel portal', 'autonomous'),
('portal.insurance.dashboard.enabled', 'global', true, 'Enable dashboard for insurance portal', 'autonomous'),
('portal.hr.dashboard.enabled', 'global', true, 'Enable dashboard for hr portal', 'autonomous'),
('portal.it.dashboard.enabled', 'global', true, 'Enable dashboard for it portal', 'autonomous'),
('portal.marketing.dashboard.enabled', 'global', true, 'Enable dashboard for marketing portal', 'autonomous'),
('portal.sales.dashboard.enabled', 'global', true, 'Enable dashboard for sales portal', 'autonomous'),
('portal.customerService.dashboard.enabled', 'global', true, 'Enable dashboard for customerService portal', 'autonomous'),
('portal.analytics.dashboard.enabled', 'global', true, 'Enable dashboard for analytics portal', 'autonomous')
ON CONFLICT (key) DO UPDATE SET
  enabled = EXCLUDED.enabled,
  updated_at = NOW();
