-- MCP (Master Control Program) System Tables
-- Migration: mcp_system_tables
-- Date: 2025-01-01

-- 1. MCP System Configuration Table
CREATE TABLE IF NOT EXISTS public.mcp_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('system', 'security', 'database', 'deployment', 'monitoring', 'api')),
  category TEXT NOT NULL,
  key_name TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  is_sensitive BOOLEAN DEFAULT false,
  version TEXT DEFAULT '1.0.0',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MCP System Settings Table
CREATE TABLE IF NOT EXISTS public.mcp_system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  setting_type TEXT NOT NULL CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')),
  category TEXT NOT NULL,
  description TEXT,
  is_editable BOOLEAN DEFAULT true,
  is_required BOOLEAN DEFAULT false,
  default_value JSONB,
  validation_rules JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MCP User Permissions Table
CREATE TABLE IF NOT EXISTS public.mcp_user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL,
  permission_key TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, permission_key, resource_type, resource_id)
);

-- 4. MCP Audit Logs Table
CREATE TABLE IF NOT EXISTS public.mcp_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  org_id UUID NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MCP Deployment History Table
CREATE TABLE IF NOT EXISTS public.mcp_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_name TEXT NOT NULL,
  deployment_type TEXT NOT NULL CHECK (deployment_type IN ('configuration', 'code', 'database', 'system')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'rolled_back')),
  environment TEXT NOT NULL CHECK (environment IN ('development', 'staging', 'production')),
  version TEXT NOT NULL,
  description TEXT,
  configuration_snapshot JSONB,
  deployed_by UUID REFERENCES auth.users(id),
  deployed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  rollback_to UUID REFERENCES public.mcp_deployments(id),
  logs JSONB,
  metadata JSONB
);

-- 6. MCP System Health Table
CREATE TABLE IF NOT EXISTS public.mcp_system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('healthy', 'warning', 'critical', 'offline')),
  health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  metrics JSONB NOT NULL,
  last_check_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_check_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MCP Alerts Table
CREATE TABLE IF NOT EXISTS public.mcp_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL CHECK (alert_type IN ('info', 'warning', 'error', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  component TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_by UUID REFERENCES auth.users(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. MCP Agent Registry Table
CREATE TABLE IF NOT EXISTS public.mcp_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL UNIQUE,
  agent_type TEXT NOT NULL,
  agent_version TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'error', 'maintenance')),
  capabilities JSONB,
  configuration JSONB,
  last_heartbeat TIMESTAMP WITH TIME ZONE,
  health_status JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. MCP Performance Metrics Table
CREATE TABLE IF NOT EXISTS public.mcp_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  component TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- 10. MCP API Gateway Logs Table
CREATE TABLE IF NOT EXISTS public.mcp_api_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time INTEGER,
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  request_body JSONB,
  response_body JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mcp_configurations_type ON public.mcp_configurations(type);
CREATE INDEX IF NOT EXISTS idx_mcp_configurations_category ON public.mcp_configurations(category);
CREATE INDEX IF NOT EXISTS idx_mcp_configurations_active ON public.mcp_configurations(is_active);

CREATE INDEX IF NOT EXISTS idx_mcp_audit_logs_user_id ON public.mcp_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mcp_audit_logs_action ON public.mcp_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_mcp_audit_logs_created_at ON public.mcp_audit_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_mcp_deployments_status ON public.mcp_deployments(status);
CREATE INDEX IF NOT EXISTS idx_mcp_deployments_environment ON public.mcp_deployments(environment);
CREATE INDEX IF NOT EXISTS idx_mcp_deployments_deployed_at ON public.mcp_deployments(deployed_at);

CREATE INDEX IF NOT EXISTS idx_mcp_alerts_status ON public.mcp_alerts(status);
CREATE INDEX IF NOT EXISTS idx_mcp_alerts_severity ON public.mcp_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_mcp_alerts_created_at ON public.mcp_alerts(created_at);

CREATE INDEX IF NOT EXISTS idx_mcp_agents_status ON public.mcp_agents(status);
CREATE INDEX IF NOT EXISTS idx_mcp_agents_type ON public.mcp_agents(agent_type);

CREATE INDEX IF NOT EXISTS idx_mcp_performance_metrics_component ON public.mcp_performance_metrics(component);
CREATE INDEX IF NOT EXISTS idx_mcp_performance_metrics_timestamp ON public.mcp_performance_metrics(timestamp);

CREATE INDEX IF NOT EXISTS idx_mcp_api_logs_endpoint ON public.mcp_api_logs(endpoint);
CREATE INDEX IF NOT EXISTS idx_mcp_api_logs_status_code ON public.mcp_api_logs(status_code);
CREATE INDEX IF NOT EXISTS idx_mcp_api_logs_created_at ON public.mcp_api_logs(created_at);

-- Row Level Security (RLS) Policies
ALTER TABLE public.mcp_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_api_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for super_admin access
CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_configurations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_user_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_audit_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_deployments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_system_health
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_agents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_performance_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "super_admin_mcp_full_access" ON public.mcp_api_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Functions for MCP operations
CREATE OR REPLACE FUNCTION public.mcp_create_configuration(
  p_name TEXT,
  p_type TEXT,
  p_category TEXT,
  p_key_name TEXT,
  p_value JSONB,
  p_description TEXT DEFAULT NULL,
  p_is_sensitive BOOLEAN DEFAULT false
) RETURNS UUID AS $$
DECLARE
  v_config_id UUID;
BEGIN
  INSERT INTO public.mcp_configurations (
    name, type, category, key_name, value, description, is_sensitive, created_by
  ) VALUES (
    p_name, p_type, p_category, p_key_name, p_value, p_description, p_is_sensitive, auth.uid()
  ) RETURNING id INTO v_config_id;
  
  -- Log the action
  INSERT INTO public.mcp_audit_logs (
    user_id, org_id, action, resource_type, resource_id, new_values
  ) VALUES (
    auth.uid(), (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() LIMIT 1),
    'create', 'mcp_configuration', v_config_id::TEXT, p_value
  );
  
  RETURN v_config_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.mcp_update_configuration(
  p_config_id UUID,
  p_value JSONB,
  p_description TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  v_old_value JSONB;
BEGIN
  SELECT value INTO v_old_value FROM public.mcp_configurations WHERE id = p_config_id;
  
  UPDATE public.mcp_configurations 
  SET value = p_value, description = p_description, updated_by = auth.uid(), updated_at = NOW()
  WHERE id = p_config_id;
  
  -- Log the action
  INSERT INTO public.mcp_audit_logs (
    user_id, org_id, action, resource_type, resource_id, old_values, new_values
  ) VALUES (
    auth.uid(), (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() LIMIT 1),
    'update', 'mcp_configuration', p_config_id::TEXT, v_old_value, p_value
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.mcp_create_deployment(
  p_name TEXT,
  p_type TEXT,
  p_environment TEXT,
  p_version TEXT,
  p_description TEXT DEFAULT NULL,
  p_configuration JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_deployment_id UUID;
BEGIN
  INSERT INTO public.mcp_deployments (
    deployment_name, deployment_type, status, environment, version, description, configuration_snapshot, deployed_by
  ) VALUES (
    p_name, p_type, 'pending', p_environment, p_version, p_description, p_configuration, auth.uid()
  ) RETURNING id INTO v_deployment_id;
  
  -- Log the action
  INSERT INTO public.mcp_audit_logs (
    user_id, org_id, action, resource_type, resource_id, new_values
  ) VALUES (
    auth.uid(), (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() LIMIT 1),
    'create', 'mcp_deployment', v_deployment_id::TEXT, p_configuration
  );
  
  RETURN v_deployment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed data for MCP system
INSERT INTO public.mcp_system_settings (setting_key, setting_value, setting_type, category, description, is_editable, is_required) VALUES
  ('mcp.system.name', '"Trans Bot AI MCP System"', 'string', 'system', 'MCP System Name', true, true),
  ('mcp.system.version', '"2.1.0"', 'string', 'system', 'MCP System Version', false, true),
  ('mcp.system.environment', '"development"', 'string', 'system', 'Current Environment', false, true),
  ('mcp.security.jwt_expiry', '3600', 'number', 'security', 'JWT Token Expiry (seconds)', true, true),
  ('mcp.security.mfa_required', 'true', 'boolean', 'security', 'MFA Required for Admin Access', true, false),
  ('mcp.database.connection_pool', '20', 'number', 'database', 'Database Connection Pool Size', true, true),
  ('mcp.monitoring.health_check_interval', '300', 'number', 'monitoring', 'Health Check Interval (seconds)', true, true),
  ('mcp.api.rate_limit', '1000', 'number', 'api', 'API Rate Limit (requests per minute)', true, true),
  ('mcp.deployment.auto_rollback', 'true', 'boolean', 'deployment', 'Auto Rollback on Failure', true, false),
  ('mcp.alerts.notification_channels', '["email", "slack"]', 'array', 'alerts', 'Alert Notification Channels', true, false);

-- Insert default MCP agents
INSERT INTO public.mcp_agents (agent_name, agent_type, agent_version, status, capabilities, configuration) VALUES
  ('Configuration Manager', 'system', '1.0.0', 'active', '{"config_management": true, "validation": true}', '{"auto_save": true, "backup_enabled": true}'),
  ('Deployment Manager', 'deployment', '1.0.0', 'active', '{"deployment": true, "rollback": true}', '{"staging_required": true, "health_checks": true}'),
  ('Log Manager', 'monitoring', '1.0.0', 'active', '{"log_collection": true, "analysis": true}', '{"retention_days": 30, "compression": true}'),
  ('Alert Manager', 'monitoring', '1.0.0', 'active', '{"alert_generation": true, "notification": true}', '{"escalation_enabled": true, "quiet_hours": false}'),
  ('Security Monitor', 'security', '1.0.0', 'active', '{"threat_detection": true, "compliance": true}', '{"real_time_scanning": true, "reporting": true}'),
  ('Performance Analyzer', 'monitoring', '1.0.0', 'active', '{"metrics_collection": true, "optimization": true}', '{"sampling_rate": 0.1, "storage_optimized": true}');
