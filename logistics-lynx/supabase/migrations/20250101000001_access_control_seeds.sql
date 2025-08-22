-- Access Control Seed Data
-- Migration: access_control_seeds
-- Date: 2025-01-01

-- 1. Default Roles
INSERT INTO public.roles (key, description, is_system_role) VALUES
  ('owner', 'Full organization control and ownership', true),
  ('admin', 'Users, billing, settings management', true),
  ('broker_admin', 'Brokerage operations and pricing', true),
  ('shipper_admin', 'Shipper operations management', true),
  ('carrier_admin', 'Carrier operations management', true),
  ('driver', 'Driver app access', true),
  ('analyst', 'Read access and analytics', true),
  ('ops', 'Dispatch and operations', true),
  ('billing_admin', 'Invoices and payments management', true),
  ('auditor', 'Read-only access with export capabilities', true),
  ('read_only', 'View-only access', true),
  ('super_admin', 'Platform-wide super administrator', true),
  ('factoring_admin', 'Factoring and financial operations', true),
  ('owner_operator', 'Independent contractor access', true);

-- 2. Permissions Catalog
INSERT INTO public.permissions (key, resource, action, description) VALUES
  -- Portal Access
  ('portal.broker', 'portal', 'read', 'Access broker portal'),
  ('portal.carrier', 'portal', 'read', 'Access carrier portal'),
  ('portal.shipper', 'portal', 'read', 'Access shipper portal'),
  ('portal.driver', 'portal', 'read', 'Access driver portal'),
  ('portal.admin', 'portal', 'read', 'Access admin portal'),
  ('portal.super_admin', 'portal', 'read', 'Access super admin portal'),
  ('portal.analytics', 'portal', 'read', 'Access analytics portal'),
  ('portal.autonomous', 'portal', 'read', 'Access autonomous AI portal'),
  ('portal.factoring', 'portal', 'read', 'Access factoring portal'),
  ('portal.owner_operator', 'portal', 'read', 'Access owner operator portal'),

  -- MCP (Master Control Program) Permissions
  ('mcp.access', 'mcp', 'read', 'Access MCP Control Center'),
  ('mcp.configuration.manage', 'mcp', 'manage', 'Manage MCP system configuration'),
  ('mcp.configuration.read', 'mcp', 'read', 'Read MCP configuration'),
  ('mcp.configuration.write', 'mcp', 'write', 'Write MCP configuration'),
  ('mcp.deployment.manage', 'mcp', 'manage', 'Manage MCP deployments'),
  ('mcp.deployment.read', 'mcp', 'read', 'Read MCP deployment status'),
  ('mcp.deployment.write', 'mcp', 'write', 'Write MCP deployment settings'),
  ('mcp.logs.manage', 'mcp', 'manage', 'Manage MCP log management'),
  ('mcp.logs.read', 'mcp', 'read', 'Read MCP logs'),
  ('mcp.logs.write', 'mcp', 'write', 'Write MCP log settings'),
  ('mcp.alerts.manage', 'mcp', 'manage', 'Manage MCP alert center'),
  ('mcp.alerts.read', 'mcp', 'read', 'Read MCP alerts'),
  ('mcp.alerts.write', 'mcp', 'write', 'Write MCP alert settings'),
  ('mcp.agents.manage', 'mcp', 'manage', 'Manage MCP agent registry'),
  ('mcp.agents.read', 'mcp', 'read', 'Read MCP agent status'),
  ('mcp.agents.write', 'mcp', 'write', 'Write MCP agent settings'),
  ('mcp.system.monitor', 'mcp', 'read', 'Monitor MCP system status'),
  ('mcp.security.manage', 'mcp', 'manage', 'Manage MCP security hub'),
  ('mcp.security.read', 'mcp', 'read', 'Read MCP security status'),
  ('mcp.security.write', 'mcp', 'write', 'Write MCP security settings'),
  ('mcp.performance.manage', 'mcp', 'manage', 'Manage MCP performance analytics'),
  ('mcp.performance.read', 'mcp', 'read', 'Read MCP performance data'),
  ('mcp.performance.write', 'mcp', 'write', 'Write MCP performance settings'),
  ('mcp.backup.manage', 'mcp', 'manage', 'Manage MCP backup and recovery'),
  ('mcp.backup.read', 'mcp', 'read', 'Read MCP backup status'),
  ('mcp.backup.write', 'mcp', 'write', 'Write MCP backup settings'),
  ('mcp.api.manage', 'mcp', 'manage', 'Manage MCP API gateway'),
  ('mcp.api.read', 'mcp', 'read', 'Read MCP API status'),
  ('mcp.api.write', 'mcp', 'write', 'Write MCP API settings'),
  ('mcp.emergency.control', 'mcp', 'manage', 'Emergency control over MCP system'),
  ('mcp.full.authority', 'mcp', 'manage', 'Full authority over MCP system'),

  -- Load Management
  ('load.read', 'load', 'read', 'View loads'),
  ('load.create', 'load', 'create', 'Create new loads'),
  ('load.update', 'load', 'update', 'Update existing loads'),
  ('load.delete', 'load', 'delete', 'Delete loads'),
  ('load.approve', 'load', 'approve', 'Approve loads'),
  ('load.export', 'load', 'export', 'Export load data'),
  ('load.bulk', 'load', 'bulk', 'Bulk load operations'),

  -- Tender Management
  ('tender.read', 'tender', 'read', 'View tenders'),
  ('tender.create', 'tender', 'create', 'Create tenders'),
  ('tender.update', 'tender', 'update', 'Update tenders'),
  ('tender.delete', 'tender', 'delete', 'Delete tenders'),
  ('tender.approve', 'tender', 'approve', 'Approve tenders'),

  -- Rate Management
  ('rate.read', 'rate', 'read', 'View rates'),
  ('rate.create', 'rate', 'create', 'Create rates'),
  ('rate.update', 'rate', 'update', 'Update rates'),
  ('rate.delete', 'rate', 'delete', 'Delete rates'),
  ('rate.bulk', 'rate', 'bulk', 'Bulk rate operations'),

  -- Invoice Management
  ('invoice.read', 'invoice', 'read', 'View invoices'),
  ('invoice.create', 'invoice', 'create', 'Create invoices'),
  ('invoice.update', 'invoice', 'update', 'Update invoices'),
  ('invoice.delete', 'invoice', 'delete', 'Delete invoices'),
  ('invoice.approve', 'invoice', 'approve', 'Approve invoices'),
  ('invoice.export', 'invoice', 'export', 'Export invoice data'),

  -- Payment Management
  ('payment.read', 'payment', 'read', 'View payments'),
  ('payment.create', 'payment', 'create', 'Create payments'),
  ('payment.update', 'payment', 'update', 'Update payments'),
  ('payment.approve', 'payment', 'approve', 'Approve payments'),
  ('payment.export', 'payment', 'export', 'Export payment data'),

  -- Document Management
  ('document.read', 'document', 'read', 'View documents'),
  ('document.create', 'document', 'create', 'Upload documents'),
  ('document.update', 'document', 'update', 'Update documents'),
  ('document.delete', 'document', 'delete', 'Delete documents'),

  -- User Management
  ('user.read', 'user', 'read', 'View users'),
  ('user.create', 'user', 'create', 'Create users'),
  ('user.update', 'user', 'update', 'Update users'),
  ('user.delete', 'user', 'delete', 'Delete users'),
  ('user.manage_roles', 'user', 'manage_roles', 'Manage user roles'),

  -- API Management
  ('api_key.read', 'api_key', 'read', 'View API keys'),
  ('api_key.create', 'api_key', 'create', 'Create API keys'),
  ('api_key.update', 'api_key', 'update', 'Update API keys'),
  ('api_key.delete', 'api_key', 'delete', 'Delete API keys'),

  -- Feature Flags
  ('feature_flag.read', 'feature_flag', 'read', 'View feature flags'),
  ('feature_flag.configure', 'feature_flag', 'configure', 'Configure feature flags'),

  -- Analytics
  ('analytics.read', 'analytics', 'read', 'View analytics'),
  ('analytics.export', 'analytics', 'export', 'Export analytics data'),
  ('analytics.advanced', 'analytics', 'advanced', 'Advanced analytics features'),

  -- Autonomous AI
  ('autonomous.ai', 'autonomous', 'ai', 'Access autonomous AI features'),
  ('autonomous.configure', 'autonomous', 'configure', 'Configure autonomous agents'),

  -- EDI Integration
  ('edi.x12', 'edi', 'x12', 'EDI X12 integration'),
  ('edi.edifact', 'edi', 'edifact', 'EDI EDIFACT integration'),

  -- Line of Business (LoB) specific
  ('loads.ltl', 'loads', 'ltl', 'Less-than-truckload operations'),
  ('loads.ftl', 'loads', 'ftl', 'Full truckload operations'),
  ('loads.ocean', 'loads', 'ocean', 'Ocean freight operations'),
  ('loads.air', 'loads', 'air', 'Air freight operations'),
  ('loads.intermodal', 'loads', 'intermodal', 'Intermodal operations'),

  -- System Administration
  ('system.config', 'system', 'config', 'System configuration'),
  ('system.audit', 'system', 'audit', 'System audit logs'),
  ('system.backup', 'system', 'backup', 'System backup operations'),

  -- Billing and Subscription
  ('billing.read', 'billing', 'read', 'View billing information'),
  ('billing.manage', 'billing', 'manage', 'Manage billing and subscriptions'),
  ('billing.export', 'billing', 'export', 'Export billing data');

-- 3. Role-Permission Mappings

-- Owner: Full access
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'owner', key FROM public.permissions;

-- Super Admin: Full access
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'super_admin', key FROM public.permissions;

-- Admin: Most permissions except super admin specific
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'admin', key FROM public.permissions 
WHERE key NOT IN ('portal.super_admin', 'system.backup');

-- Broker Admin: Broker-specific permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('broker_admin', 'portal.broker'),
  ('broker_admin', 'load.read'), ('broker_admin', 'load.create'), ('broker_admin', 'load.update'),
  ('broker_admin', 'tender.read'), ('broker_admin', 'tender.create'), ('broker_admin', 'tender.update'),
  ('broker_admin', 'rate.read'), ('broker_admin', 'rate.create'), ('broker_admin', 'rate.update'),
  ('broker_admin', 'invoice.read'), ('broker_admin', 'invoice.create'), ('broker_admin', 'invoice.update'),
  ('broker_admin', 'payment.read'), ('broker_admin', 'payment.create'),
  ('broker_admin', 'document.read'), ('broker_admin', 'document.create'),
  ('broker_admin', 'user.read'), ('broker_admin', 'user.create'), ('broker_admin', 'user.update'),
  ('broker_admin', 'api_key.read'), ('broker_admin', 'api_key.create'),
  ('broker_admin', 'analytics.read'), ('broker_admin', 'analytics.export'),
  ('broker_admin', 'billing.read'), ('broker_admin', 'billing.export');

-- Shipper Admin: Shipper-specific permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('shipper_admin', 'portal.shipper'),
  ('shipper_admin', 'load.read'), ('shipper_admin', 'load.create'), ('shipper_admin', 'load.update'),
  ('shipper_admin', 'tender.read'), ('shipper_admin', 'tender.create'),
  ('shipper_admin', 'rate.read'),
  ('shipper_admin', 'invoice.read'), ('shipper_admin', 'invoice.export'),
  ('shipper_admin', 'payment.read'),
  ('shipper_admin', 'document.read'), ('shipper_admin', 'document.create'),
  ('shipper_admin', 'analytics.read'), ('shipper_admin', 'analytics.export'),
  ('shipper_admin', 'billing.read');

-- Carrier Admin: Carrier-specific permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('carrier_admin', 'portal.carrier'),
  ('carrier_admin', 'load.read'), ('carrier_admin', 'load.update'),
  ('carrier_admin', 'tender.read'), ('carrier_admin', 'tender.update'),
  ('carrier_admin', 'rate.read'), ('carrier_admin', 'rate.create'), ('carrier_admin', 'rate.update'),
  ('carrier_admin', 'invoice.read'), ('carrier_admin', 'invoice.create'), ('carrier_admin', 'invoice.update'),
  ('carrier_admin', 'payment.read'), ('carrier_admin', 'payment.create'),
  ('carrier_admin', 'document.read'), ('carrier_admin', 'document.create'),
  ('carrier_admin', 'user.read'), ('carrier_admin', 'user.create'), ('carrier_admin', 'user.update'),
  ('carrier_admin', 'analytics.read'),
  ('carrier_admin', 'billing.read');

-- Driver: Limited permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('driver', 'portal.driver'),
  ('driver', 'load.read'),
  ('driver', 'document.read'), ('driver', 'document.create');

-- Analyst: Read and export permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('analyst', 'portal.analytics'),
  ('analyst', 'load.read'), ('analyst', 'load.export'),
  ('analyst', 'tender.read'),
  ('analyst', 'rate.read'),
  ('analyst', 'invoice.read'), ('analyst', 'invoice.export'),
  ('analyst', 'payment.read'), ('analyst', 'payment.export'),
  ('analyst', 'analytics.read'), ('analyst', 'analytics.export'),
  ('analyst', 'billing.read'), ('analyst', 'billing.export');

-- Ops: Operations permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('ops', 'portal.carrier'),
  ('ops', 'load.read'), ('ops', 'load.update'),
  ('ops', 'tender.read'), ('ops', 'tender.update'),
  ('ops', 'rate.read'),
  ('ops', 'document.read'), ('ops', 'document.create'),
  ('ops', 'analytics.read');

-- Billing Admin: Billing-specific permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('billing_admin', 'portal.factoring'),
  ('billing_admin', 'invoice.read'), ('billing_admin', 'invoice.create'), ('billing_admin', 'invoice.update'),
  ('billing_admin', 'payment.read'), ('billing_admin', 'payment.create'), ('billing_admin', 'payment.approve'),
  ('billing_admin', 'billing.read'), ('billing_admin', 'billing.manage'), ('billing_admin', 'billing.export'),
  ('billing_admin', 'analytics.read'), ('billing_admin', 'analytics.export');

-- Auditor: Read-only with export
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('auditor', 'load.read'), ('auditor', 'load.export'),
  ('auditor', 'tender.read'),
  ('auditor', 'rate.read'),
  ('auditor', 'invoice.read'), ('auditor', 'invoice.export'),
  ('auditor', 'payment.read'), ('auditor', 'payment.export'),
  ('auditor', 'analytics.read'), ('auditor', 'analytics.export'),
  ('auditor', 'billing.read'), ('auditor', 'billing.export'),
  ('auditor', 'system.audit');

-- Read Only: Minimal read access
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('read_only', 'load.read'),
  ('read_only', 'tender.read'),
  ('read_only', 'rate.read'),
  ('read_only', 'invoice.read'),
  ('read_only', 'payment.read'),
  ('read_only', 'document.read');

-- Factoring Admin: Factoring-specific permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('factoring_admin', 'portal.factoring'),
  ('factoring_admin', 'invoice.read'), ('factoring_admin', 'invoice.create'), ('factoring_admin', 'invoice.update'),
  ('factoring_admin', 'payment.read'), ('factoring_admin', 'payment.create'), ('factoring_admin', 'payment.approve'),
  ('factoring_admin', 'billing.read'), ('factoring_admin', 'billing.manage'),
  ('factoring_admin', 'analytics.read'), ('factoring_admin', 'analytics.export');

-- Owner Operator: Independent contractor permissions
INSERT INTO public.role_permissions (role_key, permission_key) VALUES
  ('owner_operator', 'portal.owner_operator'),
  ('owner_operator', 'load.read'), ('owner_operator', 'load.update'),
  ('owner_operator', 'tender.read'), ('owner_operator', 'tender.update'),
  ('owner_operator', 'rate.read'), ('owner_operator', 'rate.create'),
  ('owner_operator', 'invoice.read'), ('owner_operator', 'invoice.create'),
  ('owner_operator', 'payment.read'),
  ('owner_operator', 'document.read'), ('owner_operator', 'document.create'),
  ('owner_operator', 'analytics.read'),
  ('owner_operator', 'billing.read');

-- 4. Sample Entitlements by Plan Tier

-- Free Plan Entitlements (example org_id: 00000000-0000-0000-0000-000000000001)
INSERT INTO public.entitlements (org_id, feature_key, plan_tier, add_on, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001', 'loads.ltl', 'free', NULL, true),
  ('00000000-0000-0000-0000-000000000001', 'loads.ftl', 'free', NULL, true),
  ('00000000-0000-0000-0000-000000000001', 'analytics.read', 'free', NULL, true),
  ('00000000-0000-0000-0000-000000000001', 'api_key.create', 'free', NULL, true);

-- Pro Plan Entitlements (example org_id: 00000000-0000-0000-0000-000000000002)
INSERT INTO public.entitlements (org_id, feature_key, plan_tier, add_on, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002', 'loads.ltl', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'loads.ftl', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'loads.intermodal', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'analytics.read', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'analytics.export', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'api_key.create', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'load.bulk', 'pro', NULL, true),
  ('00000000-0000-0000-0000-000000000002', 'rate.bulk', 'pro', NULL, true);

-- Enterprise Plan Entitlements (example org_id: 00000000-0000-0000-0000-000000000003)
INSERT INTO public.entitlements (org_id, feature_key, plan_tier, add_on, is_active) VALUES
  ('00000000-0000-0000-0000-000000000003', 'loads.ltl', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'loads.ftl', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'loads.intermodal', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'loads.ocean', 'enterprise', 'ocean', true),
  ('00000000-0000-0000-0000-000000000003', 'loads.air', 'enterprise', 'air', true),
  ('00000000-0000-0000-0000-000000000003', 'analytics.read', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'analytics.export', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'analytics.advanced', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'api_key.create', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'load.bulk', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'rate.bulk', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'autonomous.ai', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'edi.x12', 'enterprise', NULL, true),
  ('00000000-0000-0000-0000-000000000003', 'edi.edifact', 'enterprise', NULL, true);

-- 5. Sample ABAC Permission Scopes

-- Ocean freight scope for Enterprise orgs
INSERT INTO public.permission_scopes (org_id, subject_type, subject_key, attribute) VALUES
  ('00000000-0000-0000-0000-000000000003', 'role', 'broker_admin', '{"lob": ["ocean"], "region": ["US", "CA", "MX"]}'),
  ('00000000-0000-0000-0000-000000000003', 'role', 'shipper_admin', '{"lob": ["ocean"], "region": ["US", "CA"]}');

-- Air freight scope for Enterprise orgs
INSERT INTO public.permission_scopes (org_id, subject_type, subject_key, attribute) VALUES
  ('00000000-0000-0000-0000-000000000003', 'role', 'broker_admin', '{"lob": ["air"], "region": ["US", "CA", "EU"]}'),
  ('00000000-0000-0000-0000-000000000003', 'role', 'shipper_admin', '{"lob": ["air"], "region": ["US"]}');

-- Regional restrictions for Pro orgs
INSERT INTO public.permission_scopes (org_id, subject_type, subject_key, attribute) VALUES
  ('00000000-0000-0000-0000-000000000002', 'role', 'broker_admin', '{"region": ["US", "CA"]}'),
  ('00000000-0000-0000-0000-000000000002', 'role', 'shipper_admin', '{"region": ["US"]}');

-- 6. Sample API Keys (hashed values for demonstration)
INSERT INTO public.api_keys (org_id, name, key_hash, scopes, metadata, rate_limit_per_minute, created_by) VALUES
  ('00000000-0000-0000-0000-000000000003', 'Production API Key', 'hashed_key_1', ARRAY['load.read', 'load.create', 'rate.read'], '{"environment": "production", "team": "engineering"}', 5000, NULL),
  ('00000000-0000-0000-0000-000000000003', 'Analytics API Key', 'hashed_key_2', ARRAY['analytics.read', 'analytics.export'], '{"environment": "production", "team": "data"}', 1000, NULL),
  ('00000000-0000-0000-0000-000000000002', 'Development API Key', 'hashed_key_3', ARRAY['load.read', 'rate.read'], '{"environment": "development", "team": "engineering"}', 1000, NULL);
