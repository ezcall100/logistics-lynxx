-- Comprehensive User Control & Access Control (RBAC + ABAC + Entitlements)
-- Migration: access_control_v1
-- Date: 2025-01-01

-- 1. Base RBAC Tables

-- Roles table (system-wide default roles)
CREATE TABLE IF NOT EXISTS public.roles (
  key TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  is_system_role BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permissions table (granular permissions)
CREATE TABLE IF NOT EXISTS public.permissions (
  key TEXT PRIMARY KEY,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role-Permission mapping
CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_key TEXT REFERENCES public.roles(key) ON DELETE CASCADE,
  permission_key TEXT REFERENCES public.permissions(key) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (role_key, permission_key)
);

-- 2. Organization Membership (extends existing)
-- Assuming org_memberships table exists, if not create it:
CREATE TABLE IF NOT EXISTS public.org_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- 3. Custom Roles (per organization)
CREATE TABLE IF NOT EXISTS public.custom_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  key TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(org_id, key)
);

-- Custom role permissions
CREATE TABLE IF NOT EXISTS public.custom_role_permissions (
  custom_role_id UUID REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  permission_key TEXT REFERENCES public.permissions(key) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (custom_role_id, permission_key)
);

-- User custom role assignments
CREATE TABLE IF NOT EXISTS public.user_custom_roles (
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  custom_role_id UUID REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (org_id, user_id, custom_role_id)
);

-- 4. Attribute-Based Access Control (ABAC)
CREATE TABLE IF NOT EXISTS public.permission_scopes (
  id BIGSERIAL PRIMARY KEY,
  org_id UUID NOT NULL,
  subject_type TEXT NOT NULL CHECK (subject_type IN ('role', 'custom_role', 'user')),
  subject_key TEXT NOT NULL,
  attribute JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Temporary Access & Elevation
CREATE TABLE IF NOT EXISTS public.access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_permissions TEXT[] NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'expired')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Temporary permissions granted
CREATE TABLE IF NOT EXISTS public.temporary_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_request_id UUID REFERENCES public.access_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  permission_key TEXT REFERENCES public.permissions(key) ON DELETE CASCADE,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(user_id, permission_key, access_request_id)
);

-- 6. API Keys with scoped permissions
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  scopes TEXT[] NOT NULL,
  metadata JSONB DEFAULT '{}',
  rate_limit_per_minute INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 7. Audit Logging
CREATE TABLE IF NOT EXISTS public.access_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  org_id UUID,
  user_id UUID REFERENCES auth.users(id),
  api_key_id UUID REFERENCES public.api_keys(id),
  permission TEXT,
  entitlement TEXT,
  resource TEXT,
  action TEXT,
  attributes JSONB,
  result TEXT NOT NULL CHECK (result IN ('allow', 'deny')),
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  trace_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Entitlements (plan-based features)
CREATE TABLE IF NOT EXISTS public.entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  feature_key TEXT NOT NULL,
  plan_tier TEXT NOT NULL,
  add_on TEXT,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(org_id, feature_key)
);

-- 9. Indexes for Performance
CREATE INDEX idx_org_memberships_org_user ON public.org_memberships(org_id, user_id);
CREATE INDEX idx_org_memberships_role ON public.org_memberships(role);
CREATE INDEX idx_custom_roles_org ON public.custom_roles(org_id);
CREATE INDEX idx_user_custom_roles_user ON public.user_custom_roles(user_id);
CREATE INDEX idx_permission_scopes_org ON public.permission_scopes(org_id);
CREATE INDEX idx_access_requests_org_user ON public.access_requests(org_id, user_id);
CREATE INDEX idx_access_requests_status ON public.access_requests(status);
CREATE INDEX idx_temporary_permissions_user ON public.temporary_permissions(user_id);
CREATE INDEX idx_temporary_permissions_expires ON public.temporary_permissions(expires_at);
CREATE INDEX idx_api_keys_org ON public.api_keys(org_id);
CREATE INDEX idx_api_keys_hash ON public.api_keys(key_hash);
CREATE INDEX idx_access_audit_logs_org ON public.access_audit_logs(org_id);
CREATE INDEX idx_access_audit_logs_user ON public.access_audit_logs(user_id);
CREATE INDEX idx_access_audit_logs_created ON public.access_audit_logs(created_at);
CREATE INDEX idx_entitlements_org ON public.entitlements(org_id);
CREATE INDEX idx_entitlements_feature ON public.entitlements(feature_key);

-- 10. Enable RLS on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_scopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temporary_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- 11. Helper Functions

-- Check if user has a specific permission
CREATE OR REPLACE FUNCTION public.has_permission(
  p_org_id UUID,
  p_user_id UUID,
  p_permission TEXT
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  WITH user_roles AS (
    -- Get user's role from org_memberships
    SELECT role FROM public.org_memberships 
    WHERE org_id = p_org_id AND user_id = p_user_id AND status = 'active'
  ),
  role_perms AS (
    -- Check role-based permissions
    SELECT 1 FROM public.role_permissions rp
    JOIN user_roles ur ON rp.role_key = ur.role
    WHERE rp.permission_key = p_permission
  ),
  custom_perms AS (
    -- Check custom role permissions
    SELECT 1 FROM public.custom_role_permissions crp
    JOIN public.custom_roles cr ON crp.custom_role_id = cr.id AND cr.org_id = p_org_id
    JOIN public.user_custom_roles ucr ON ucr.custom_role_id = cr.id AND ucr.user_id = p_user_id
    WHERE crp.permission_key = p_permission
  ),
  temp_perms AS (
    -- Check temporary permissions (not expired)
    SELECT 1 FROM public.temporary_permissions tp
    WHERE tp.user_id = p_user_id 
      AND tp.permission_key = p_permission
      AND tp.expires_at > NOW()
  )
  SELECT EXISTS(SELECT 1 FROM role_perms)
      OR EXISTS(SELECT 1 FROM custom_perms)
      OR EXISTS(SELECT 1 FROM temp_perms);
$$;

-- Check if organization has entitlement
CREATE OR REPLACE FUNCTION public.has_entitlement(
  p_org_id UUID,
  p_feature TEXT
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.entitlements 
    WHERE org_id = p_org_id 
      AND feature_key = p_feature 
      AND is_active = true
  );
$$;

-- Check ABAC attributes
CREATE OR REPLACE FUNCTION public.check_abac_attributes(
  p_org_id UUID,
  p_user_id UUID,
  p_attributes JSONB
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  WITH user_scopes AS (
    -- Get user's role-based scopes
    SELECT ps.attribute
    FROM public.permission_scopes ps
    JOIN public.org_memberships om ON om.org_id = ps.org_id AND om.user_id = p_user_id
    WHERE ps.org_id = p_org_id 
      AND ps.subject_type = 'role' 
      AND ps.subject_key = om.role
    UNION ALL
    -- Get user's custom role scopes
    SELECT ps.attribute
    FROM public.permission_scopes ps
    JOIN public.user_custom_roles ucr ON ucr.org_id = ps.org_id AND ucr.user_id = p_user_id
    JOIN public.custom_roles cr ON cr.id = ucr.custom_role_id
    WHERE ps.org_id = p_org_id 
      AND ps.subject_type = 'custom_role' 
      AND ps.subject_key = cr.id::text
    UNION ALL
    -- Get user's direct scopes
    SELECT ps.attribute
    FROM public.permission_scopes ps
    WHERE ps.org_id = p_org_id 
      AND ps.subject_type = 'user' 
      AND ps.subject_key = p_user_id::text
  )
  SELECT EXISTS(
    SELECT 1 FROM user_scopes us
    WHERE us.attribute @> p_attributes
  );
$$;

-- Log access decision
CREATE OR REPLACE FUNCTION public.log_access_decision(
  p_org_id UUID,
  p_user_id UUID,
  p_api_key_id UUID,
  p_permission TEXT,
  p_entitlement TEXT,
  p_resource TEXT,
  p_action TEXT,
  p_attributes JSONB,
  p_result TEXT,
  p_reason TEXT,
  p_ip_address INET,
  p_user_agent TEXT,
  p_trace_id TEXT
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
SET search_path TO public
AS $$
  INSERT INTO public.access_audit_logs (
    org_id, user_id, api_key_id, permission, entitlement, 
    resource, action, attributes, result, reason, 
    ip_address, user_agent, trace_id
  ) VALUES (
    p_org_id, p_user_id, p_api_key_id, p_permission, p_entitlement,
    p_resource, p_action, p_attributes, p_result, p_reason,
    p_ip_address, p_user_agent, p_trace_id
  );
$$;

-- Clean up expired temporary permissions
CREATE OR REPLACE FUNCTION public.cleanup_expired_permissions()
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
SET search_path TO public
AS $$
  WITH deleted AS (
    DELETE FROM public.temporary_permissions 
    WHERE expires_at < NOW()
    RETURNING 1
  )
  SELECT COUNT(*) FROM deleted;
$$;

-- 12. RLS Policies

-- Roles: Read-only for authenticated users
CREATE POLICY "Authenticated users can view roles" ON public.roles
  FOR SELECT TO authenticated USING (true);

-- Permissions: Read-only for authenticated users
CREATE POLICY "Authenticated users can view permissions" ON public.permissions
  FOR SELECT TO authenticated USING (true);

-- Role permissions: Read-only for authenticated users
CREATE POLICY "Authenticated users can view role permissions" ON public.role_permissions
  FOR SELECT TO authenticated USING (true);

-- Org memberships: Users can view their own memberships, admins can manage
CREATE POLICY "Users can view own memberships" ON public.org_memberships
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can manage memberships" ON public.org_memberships
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = org_memberships.org_id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin')
    )
  );

-- Custom roles: Org-scoped access
CREATE POLICY "Org members can view custom roles" ON public.custom_roles
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = custom_roles.org_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage custom roles" ON public.custom_roles
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = custom_roles.org_id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin')
    )
  );

-- API keys: Org-scoped access
CREATE POLICY "Org members can view API keys" ON public.api_keys
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = api_keys.org_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage API keys" ON public.api_keys
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = api_keys.org_id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin')
    )
  );

-- Audit logs: Admins can view
CREATE POLICY "Admins can view audit logs" ON public.access_audit_logs
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships 
      WHERE org_id = access_audit_logs.org_id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin', 'auditor')
    )
  );

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs" ON public.access_audit_logs
  FOR INSERT TO service_role WITH CHECK (true);

-- 13. Triggers for automatic cleanup
CREATE OR REPLACE FUNCTION public.auto_cleanup_expired_permissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  -- Clean up expired temporary permissions every hour
  IF (EXTRACT(EPOCH FROM (NOW() - (SELECT MAX(created_at) FROM public.access_audit_logs))) > 3600) THEN
    PERFORM public.cleanup_expired_permissions();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_auto_cleanup_permissions
  AFTER INSERT ON public.access_audit_logs
  FOR EACH ROW EXECUTE FUNCTION public.auto_cleanup_expired_permissions();

-- 14. Update triggers for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON public.roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_roles_updated_at
  BEFORE UPDATE ON public.custom_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_permission_scopes_updated_at
  BEFORE UPDATE ON public.permission_scopes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_access_requests_updated_at
  BEFORE UPDATE ON public.access_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_entitlements_updated_at
  BEFORE UPDATE ON public.entitlements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
