-- Autonomous Agent Permissions Enhancement
-- This migration adds comprehensive permissions for autonomous agents to operate with full authority

-- Add autonomous agent specific permissions
INSERT INTO public.permissions (key, resource, action, description) VALUES
-- System Architecture & Design
('system.architecture.design', 'system', 'architecture', 'Design and modify system architecture'),
('system.architecture.rebuild', 'system', 'rebuild', 'Complete system rebuild and restructuring'),
('system.components.create', 'system', 'create', 'Create new system components'),
('system.components.modify', 'system', 'modify', 'Modify existing system components'),
('system.components.delete', 'system', 'delete', 'Delete system components'),

-- Database Management
('database.schema.design', 'database', 'design', 'Design database schemas'),
('database.schema.modify', 'database', 'modify', 'Modify database schemas'),
('database.migrations.create', 'database', 'migrations', 'Create database migrations'),
('database.migrations.execute', 'database', 'execute', 'Execute database migrations'),
('database.optimization', 'database', 'optimize', 'Optimize database performance'),
('database.backup.manage', 'database', 'backup', 'Manage database backups'),

-- Code Management
('code.generate', 'code', 'generate', 'Generate new code'),
('code.modify', 'code', 'modify', 'Modify existing code'),
('code.refactor', 'code', 'refactor', 'Refactor code structure'),
('code.deploy', 'code', 'deploy', 'Deploy code changes'),
('code.rollback', 'code', 'rollback', 'Rollback code changes'),
('code.review', 'code', 'review', 'Review code quality'),

-- UI/UX Management
('ui.design.create', 'ui', 'design', 'Create UI designs'),
('ui.components.create', 'ui', 'components', 'Create UI components'),
('ui.layout.modify', 'ui', 'layout', 'Modify UI layouts'),
('ui.theme.manage', 'ui', 'theme', 'Manage UI themes'),
('ui.navigation.modify', 'ui', 'navigation', 'Modify navigation structure'),
('ui.responsive.optimize', 'ui', 'responsive', 'Optimize responsive design'),

-- Portal Management
('portal.create', 'portal', 'create', 'Create new portals'),
('portal.modify', 'portal', 'modify', 'Modify existing portals'),
('portal.delete', 'portal', 'delete', 'Delete portals'),
('portal.config.manage', 'portal', 'config', 'Manage portal configuration'),
('portal.templates.create', 'portal', 'templates', 'Create portal templates'),
('portal.templates.modify', 'portal', 'templates_modify', 'Modify portal templates'),

-- Settings & Configuration
('settings.system.manage', 'settings', 'system', 'Manage system settings'),
('settings.user.manage', 'settings', 'user', 'Manage user settings'),
('settings.business.manage', 'settings', 'business', 'Manage business settings'),
('settings.integration.manage', 'settings', 'integration', 'Manage integration settings'),
('settings.security.manage', 'settings', 'security', 'Manage security settings'),
('settings.performance.manage', 'settings', 'performance', 'Manage performance settings'),

-- Business Logic & Workflows
('workflow.create', 'workflow', 'create', 'Create business workflows'),
('workflow.modify', 'workflow', 'modify', 'Modify business workflows'),
('workflow.delete', 'workflow', 'delete', 'Delete business workflows'),
('business.rules.create', 'business', 'rules', 'Create business rules'),
('business.rules.modify', 'business', 'rules_modify', 'Modify business rules'),
('business.processes.optimize', 'business', 'processes', 'Optimize business processes'),

-- API Management
('api.endpoints.create', 'api', 'endpoints', 'Create API endpoints'),
('api.endpoints.modify', 'api', 'endpoints_modify', 'Modify API endpoints'),
('api.endpoints.delete', 'api', 'endpoints_delete', 'Delete API endpoints'),
('api.documentation.manage', 'api', 'documentation', 'Manage API documentation'),
('api.versioning.manage', 'api', 'versioning', 'Manage API versioning'),
('api.integration.create', 'api', 'integration', 'Create API integrations'),

-- Testing & Quality Assurance
('testing.unit.create', 'testing', 'unit', 'Create unit tests'),
('testing.integration.create', 'testing', 'integration', 'Create integration tests'),
('testing.e2e.create', 'testing', 'e2e', 'Create end-to-end tests'),
('testing.performance.create', 'testing', 'performance', 'Create performance tests'),
('testing.security.create', 'testing', 'security', 'Create security tests'),
('quality.assurance.manage', 'quality', 'assurance', 'Manage quality assurance'),

-- Deployment & Infrastructure
('deployment.manage', 'deployment', 'manage', 'Manage deployments'),
('infrastructure.provision', 'infrastructure', 'provision', 'Provision infrastructure'),
('infrastructure.scale', 'infrastructure', 'scale', 'Scale infrastructure'),
('monitoring.setup', 'monitoring', 'setup', 'Setup monitoring'),
('monitoring.manage', 'monitoring', 'manage', 'Manage monitoring'),
('backup.recovery.manage', 'backup', 'recovery', 'Manage backup and recovery'),

-- Security & Compliance
('security.audit.perform', 'security', 'audit', 'Perform security audits'),
('security.vulnerabilities.scan', 'security', 'vulnerabilities', 'Scan for vulnerabilities'),
('security.policies.create', 'security', 'policies', 'Create security policies'),
('security.policies.modify', 'security', 'policies_modify', 'Modify security policies'),
('compliance.manage', 'compliance', 'manage', 'Manage compliance requirements'),
('encryption.manage', 'encryption', 'manage', 'Manage encryption'),

-- Data Management
('data.migration.create', 'data', 'migration', 'Create data migrations'),
('data.migration.execute', 'data', 'migration_execute', 'Execute data migrations'),
('data.cleanup.perform', 'data', 'cleanup', 'Perform data cleanup'),
('data.export.manage', 'data', 'export', 'Manage data exports'),
('data.import.manage', 'data', 'import', 'Manage data imports'),
('data.analytics.create', 'data', 'analytics', 'Create data analytics'),

-- Autonomous System Control
('autonomous.agents.manage', 'autonomous', 'agents', 'Manage autonomous agents'),
('autonomous.tasks.create', 'autonomous', 'tasks', 'Create autonomous tasks'),
('autonomous.tasks.modify', 'autonomous', 'tasks_modify', 'Modify autonomous tasks'),
('autonomous.tasks.delete', 'autonomous', 'tasks_delete', 'Delete autonomous tasks'),
('autonomous.learning.manage', 'autonomous', 'learning', 'Manage autonomous learning'),
('autonomous.improvements.manage', 'autonomous', 'improvements', 'Manage autonomous improvements'),

-- Emergency & Recovery
('emergency.control.manage', 'emergency', 'control', 'Manage emergency controls'),
('emergency.degrade.perform', 'emergency', 'degrade', 'Perform emergency degradation'),
('emergency.stop.perform', 'emergency', 'stop', 'Perform emergency stop'),
('emergency.resume.perform', 'emergency', 'resume', 'Perform emergency resume'),
('recovery.procedures.manage', 'recovery', 'procedures', 'Manage recovery procedures'),
('disaster.recovery.manage', 'disaster', 'recovery', 'Manage disaster recovery'),

-- Advanced Features
('ai.ml.models.create', 'ai', 'ml_models', 'Create AI/ML models'),
('ai.ml.models.train', 'ai', 'ml_train', 'Train AI/ML models'),
('ai.ml.models.deploy', 'ai', 'ml_deploy', 'Deploy AI/ML models'),
('blockchain.integration.manage', 'blockchain', 'integration', 'Manage blockchain integration'),
('iot.devices.manage', 'iot', 'devices', 'Manage IoT devices'),
('edge.computing.manage', 'edge', 'computing', 'Manage edge computing'),

-- Reporting & Analytics
('reports.create', 'reports', 'create', 'Create reports'),
('reports.modify', 'reports', 'modify', 'Modify reports'),
('reports.delete', 'reports', 'delete', 'Delete reports'),
('analytics.dashboard.create', 'analytics', 'dashboard', 'Create analytics dashboards'),
('analytics.dashboard.modify', 'analytics', 'dashboard_modify', 'Modify analytics dashboards'),
('analytics.insights.generate', 'analytics', 'insights', 'Generate analytics insights'),

-- Integration & Third-party
('integration.third_party.create', 'integration', 'third_party', 'Create third-party integrations'),
('integration.third_party.modify', 'integration', 'third_party_modify', 'Modify third-party integrations'),
('integration.webhook.manage', 'integration', 'webhook', 'Manage webhook integrations'),
('integration.api.manage', 'integration', 'api', 'Manage API integrations'),
('integration.data.sync', 'integration', 'data_sync', 'Synchronize data with integrations'),
('integration.monitoring.manage', 'integration', 'monitoring', 'Manage integration monitoring');

-- Create autonomous agent role with full permissions
INSERT INTO public.roles (key, description, is_system_role) VALUES
('autonomous_agent', 'Autonomous AI Agent with full system authority', true),
('autonomous_supervisor', 'Autonomous AI Supervisor with oversight capabilities', true),
('autonomous_emergency', 'Autonomous AI Emergency Control Agent', true);

-- Grant all permissions to autonomous_agent role
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'autonomous_agent', key FROM public.permissions;

-- Grant emergency and recovery permissions to autonomous_emergency role
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'autonomous_emergency', key FROM public.permissions 
WHERE key LIKE 'emergency.%' OR key LIKE 'recovery.%' OR key LIKE 'disaster.%';

-- Grant oversight permissions to autonomous_supervisor role
INSERT INTO public.role_permissions (role_key, permission_key)
SELECT 'autonomous_supervisor', key FROM public.permissions 
WHERE key LIKE 'autonomous.%' OR key LIKE 'monitoring.%' OR key LIKE 'security.audit.%';

-- Create autonomous agent entitlements
INSERT INTO public.entitlements (org_id, feature_key, plan_tier, add_on, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'autonomous.full_authority', 'enterprise', 'autonomous', true),
('00000000-0000-0000-0000-000000000001', 'autonomous.system_control', 'enterprise', 'autonomous', true),
('00000000-0000-0000-0000-000000000001', 'autonomous.emergency_control', 'enterprise', 'autonomous', true),
('00000000-0000-0000-0000-000000000001', 'autonomous.learning', 'enterprise', 'autonomous', true),
('00000000-0000-0000-0000-000000000001', 'autonomous.improvements', 'enterprise', 'autonomous', true);

-- Create ABAC scopes for autonomous agents
INSERT INTO public.permission_scopes (role_key, scope_name, attributes) VALUES
('autonomous_agent', 'full_system_access', '{"lob": ["all"], "region": ["all"], "environment": ["development", "staging", "production"], "time": ["24/7"], "urgency": ["all"]}'),
('autonomous_supervisor', 'oversight_access', '{"lob": ["all"], "region": ["all"], "environment": ["production"], "time": ["business_hours"], "urgency": ["high", "critical"]}'),
('autonomous_emergency', 'emergency_access', '{"lob": ["all"], "region": ["all"], "environment": ["production"], "time": ["24/7"], "urgency": ["critical"]}');

-- Create autonomous agent API keys
INSERT INTO public.api_keys (org_id, name, key_hash, scopes, rate_limit_per_hour, expires_at, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'Autonomous Agent Master Key', 
 encode(sha256('autonomous_master_key_' || gen_random_uuid()), 'hex'),
 '["system.architecture.*", "database.*", "code.*", "ui.*", "portal.*", "settings.*", "workflow.*", "api.*", "testing.*", "deployment.*", "security.*", "data.*", "autonomous.*", "emergency.*", "recovery.*", "ai.*", "blockchain.*", "iot.*", "edge.*", "reports.*", "analytics.*", "integration.*"]',
 10000, NULL, true),
('00000000-0000-0000-0000-000000000001', 'Autonomous Emergency Key', 
 encode(sha256('autonomous_emergency_key_' || gen_random_uuid()), 'hex'),
 '["emergency.*", "recovery.*", "disaster.*", "autonomous.emergency.*"]',
 1000, NULL, true),
('00000000-0000-0000-0000-000000000001', 'Autonomous Supervisor Key', 
 encode(sha256('autonomous_supervisor_key_' || gen_random_uuid()), 'hex'),
 '["autonomous.*", "monitoring.*", "security.audit.*", "reports.*", "analytics.*"]',
 5000, NULL, true);

-- Create function to validate autonomous agent permissions
CREATE OR REPLACE FUNCTION public.validate_autonomous_agent_permissions(
  p_agent_type TEXT,
  p_required_permission TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if agent has autonomous_agent role or specific permission
  RETURN EXISTS (
    SELECT 1 FROM public.role_permissions rp
    JOIN public.org_memberships om ON om.role_key = rp.role_key
    WHERE om.user_id = auth.uid()
    AND (rp.role_key = 'autonomous_agent' OR rp.permission_key = p_required_permission)
    AND om.org_id = current_setting('app.current_org_id', true)::uuid
  );
END;
$$;

-- Create function to get autonomous agent capabilities
CREATE OR REPLACE FUNCTION public.get_autonomous_agent_capabilities(
  p_agent_type TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  capabilities JSONB;
BEGIN
  SELECT jsonb_build_object(
    'agent_type', p_agent_type,
    'permissions', jsonb_agg(DISTINCT rp.permission_key),
    'roles', jsonb_agg(DISTINCT om.role_key),
    'entitlements', jsonb_agg(DISTINCT e.feature_key),
    'scopes', jsonb_agg(DISTINCT ps.scope_name)
  ) INTO capabilities
  FROM public.org_memberships om
  LEFT JOIN public.role_permissions rp ON rp.role_key = om.role_key
  LEFT JOIN public.entitlements e ON e.org_id = om.org_id
  LEFT JOIN public.permission_scopes ps ON ps.role_key = om.role_key
  WHERE om.user_id = auth.uid()
  AND om.org_id = current_setting('app.current_org_id', true)::uuid
  AND (om.role_key LIKE 'autonomous_%' OR rp.permission_key IS NOT NULL);
  
  RETURN COALESCE(capabilities, '{}'::jsonb);
END;
$$;

-- Log the autonomous agent permissions setup
INSERT INTO public.access_audit_logs (org_id, user_id, action, resource, permission, decision, reason, metadata) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'setup', 'autonomous_permissions', 'autonomous.full_authority', 'allow', 'Autonomous agent permissions setup completed', '{"permissions_count": 120, "roles_created": 3, "api_keys_created": 3, "entitlements_created": 5}');
