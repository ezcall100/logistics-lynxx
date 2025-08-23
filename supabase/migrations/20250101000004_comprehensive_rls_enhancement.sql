-- Comprehensive RLS Enhancement Migration
-- Fixes existing policies and adds missing security for all tables
-- Date: 2025-01-01

-- =====================================================
-- FIX EXISTING POLICIES
-- =====================================================

-- Fix bulk rating policies to use correct function
DROP POLICY IF EXISTS "Users can view their company's bulk rating requests" ON bulk_rating_requests;
DROP POLICY IF EXISTS "Users can create bulk rating requests for their company" ON bulk_rating_requests;
DROP POLICY IF EXISTS "Users can update their company's bulk rating requests" ON bulk_rating_requests;

CREATE POLICY "Users can view their company's bulk rating requests" ON bulk_rating_requests
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can create bulk rating requests for their company" ON bulk_rating_requests
  FOR INSERT WITH CHECK (is_company_member(company_id));

CREATE POLICY "Users can update their company's bulk rating requests" ON bulk_rating_requests
  FOR UPDATE USING (is_company_member(company_id));

-- Fix bulk rating jobs policies
DROP POLICY IF EXISTS "Users can view their company's bulk rating jobs" ON bulk_rating_jobs;
DROP POLICY IF EXISTS "Users can create bulk rating jobs for their company" ON bulk_rating_jobs;
DROP POLICY IF EXISTS "Users can update their company's bulk rating jobs" ON bulk_rating_jobs;

CREATE POLICY "Users can view their company's bulk rating jobs" ON bulk_rating_jobs
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can create bulk rating jobs for their company" ON bulk_rating_jobs
  FOR INSERT WITH CHECK (is_company_member(company_id));

CREATE POLICY "Users can update their company's bulk rating jobs" ON bulk_rating_jobs
  FOR UPDATE USING (is_company_member(company_id));

-- Fix usage events policies
DROP POLICY IF EXISTS "Users can view their company's usage events" ON usage_events;
DROP POLICY IF EXISTS "Users can create usage events for their company" ON usage_events;

CREATE POLICY "Users can view their company's usage events" ON usage_events
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can create usage events for their company" ON usage_events
  FOR INSERT WITH CHECK (is_company_member(company_id));

-- Fix audit logs policies
DROP POLICY IF EXISTS "Users can view their company's audit logs" ON audit_logs;
DROP POLICY IF EXISTS "System can create audit logs" ON audit_logs;

CREATE POLICY "Users can view their company's audit logs" ON audit_logs
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Fix billing events policies
DROP POLICY IF EXISTS "Users can view their company's billing events" ON billing_events;
DROP POLICY IF EXISTS "Service role can manage billing events" ON billing_events;

CREATE POLICY "Users can view their company's billing events" ON billing_events
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Service role can manage billing events" ON billing_events
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- ADD MISSING RLS POLICIES
-- =====================================================

-- Enable RLS on subscription_limits (if not already enabled)
ALTER TABLE subscription_limits ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for subscription_limits
CREATE POLICY "Subscription limits are readable by authenticated users" ON subscription_limits
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Subscription limits are manageable by super admins" ON subscription_limits
  FOR ALL USING (is_super_admin());

-- =====================================================
-- ENHANCE EXISTING POLICIES WITH ROLE-BASED ACCESS
-- =====================================================

-- Enhanced company policies with role-based access
DROP POLICY IF EXISTS "Companies are viewable by members" ON public.companies;
DROP POLICY IF EXISTS "Companies are manageable by super admins" ON public.companies;

CREATE POLICY "Companies are viewable by members" ON public.companies
  FOR SELECT USING (
    is_company_member(id) OR 
    is_super_admin() OR
    has_role(id, 'admin') OR
    has_role(id, 'owner')
  );

CREATE POLICY "Companies are manageable by super admins and owners" ON public.companies
  FOR ALL USING (
    is_super_admin() OR
    has_role(id, 'owner')
  );

-- Enhanced profile policies
DROP POLICY IF EXISTS "Profiles are viewable by company members" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are insertable by super admins" ON public.profiles;

CREATE POLICY "Profiles are viewable by company members" ON public.profiles
  FOR SELECT USING (
    is_company_member(company_id) OR 
    is_super_admin()
  );

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profiles are insertable by super admins and company admins" ON public.profiles
  FOR INSERT WITH CHECK (
    is_super_admin() OR
    has_role(company_id, 'admin') OR
    has_role(company_id, 'owner')
  );

-- Enhanced role policies
DROP POLICY IF EXISTS "Roles are viewable by company members" ON public.roles;
DROP POLICY IF EXISTS "Roles are manageable by company admins" ON public.roles;

CREATE POLICY "Roles are viewable by company members" ON public.roles
  FOR SELECT USING (
    is_company_member(company_id) OR 
    is_super_admin()
  );

CREATE POLICY "Roles are manageable by company admins and super admins" ON public.roles
  FOR ALL USING (
    has_role(company_id, 'admin') OR 
    has_role(company_id, 'owner') OR 
    is_super_admin()
  );

-- =====================================================
-- ADD SECURITY FUNCTIONS FOR ENHANCED ACCESS CONTROL
-- =====================================================

-- Function to check if user has specific permission
CREATE OR REPLACE FUNCTION public.has_permission(_company_id UUID, _permission TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.roles r
    WHERE r.company_id = _company_id 
    AND r.user_id = auth.uid() 
    AND (
      r.role = 'owner' OR
      r.role = 'admin' OR
      (r.role = 'manager' AND _permission IN ('read', 'write')) OR
      (r.role = 'user' AND _permission = 'read') OR
      (r.role = 'viewer' AND _permission = 'read')
    )
  ) OR is_super_admin();
$$;

-- Function to check if user can manage company settings
CREATE OR REPLACE FUNCTION public.can_manage_company(_company_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT has_role(_company_id, 'admin') OR 
         has_role(_company_id, 'owner') OR 
         is_super_admin();
$$;

-- Function to check if user can view sensitive data
CREATE OR REPLACE FUNCTION public.can_view_sensitive_data(_company_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT has_role(_company_id, 'admin') OR 
         has_role(_company_id, 'owner') OR 
         has_role(_company_id, 'manager') OR 
         is_super_admin();
$$;

-- Function to check if user can perform financial operations
CREATE OR REPLACE FUNCTION public.can_perform_financial_ops(_company_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT has_role(_company_id, 'admin') OR 
         has_role(_company_id, 'owner') OR 
         is_super_admin();
$$;

-- =====================================================
-- ADD AUDIT LOGGING FOR SENSITIVE OPERATIONS
-- =====================================================

-- Function to log sensitive operations
CREATE OR REPLACE FUNCTION public.log_sensitive_operation(
  _company_id UUID,
  _action TEXT,
  _resource_type TEXT,
  _resource_id TEXT,
  _details JSONB DEFAULT '{}'
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.audit_logs (
    company_id,
    user_id,
    action,
    resource_type,
    resource_id,
    details,
    ip_address,
    user_agent
  ) VALUES (
    _company_id,
    auth.uid(),
    _action,
    _resource_type,
    _resource_id,
    _details,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;

-- =====================================================
-- ADD TRIGGERS FOR AUTOMATIC AUDIT LOGGING
-- =====================================================

-- Trigger function for role changes
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.log_sensitive_operation(
      NEW.company_id,
      'role_assigned',
      'role',
      NEW.id::text,
      jsonb_build_object(
        'user_id', NEW.user_id,
        'role', NEW.role,
        'company_id', NEW.company_id
      )
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM public.log_sensitive_operation(
      OLD.company_id,
      'role_removed',
      'role',
      OLD.id::text,
      jsonb_build_object(
        'user_id', OLD.user_id,
        'role', OLD.role,
        'company_id', OLD.company_id
      )
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for role changes
CREATE TRIGGER audit_role_changes_trigger
  AFTER INSERT OR DELETE ON public.roles
  FOR EACH ROW EXECUTE FUNCTION public.audit_role_changes();

-- =====================================================
-- ADD SECURITY VIEWS FOR ADMIN DASHBOARDS
-- =====================================================

-- View for company security overview
CREATE OR REPLACE VIEW v_company_security_overview AS
SELECT 
  c.id as company_id,
  c.name as company_name,
  c.slug,
  c.subscription_tier,
  COUNT(DISTINCT p.id) as total_users,
  COUNT(DISTINCT CASE WHEN r.role IN ('admin', 'owner') THEN r.user_id END) as admin_users,
  COUNT(DISTINCT CASE WHEN r.role = 'manager' THEN r.user_id END) as manager_users,
  COUNT(DISTINCT CASE WHEN r.role = 'user' THEN r.user_id END) as regular_users,
  COUNT(DISTINCT CASE WHEN r.role = 'viewer' THEN r.user_id END) as viewer_users,
  MAX(al.created_at) as last_audit_activity,
  COUNT(DISTINCT al.id) as audit_events_last_30_days
FROM public.companies c
LEFT JOIN public.profiles p ON p.company_id = c.id
LEFT JOIN public.roles r ON r.company_id = c.id
LEFT JOIN public.audit_logs al ON al.company_id = c.id 
  AND al.created_at > now() - interval '30 days'
GROUP BY c.id, c.name, c.slug, c.subscription_tier;

-- Grant access to security overview
GRANT SELECT ON v_company_security_overview TO authenticated;

-- =====================================================
-- ADD SECURITY CONSTRAINTS
-- =====================================================

-- Ensure users can't assign super_admin role to themselves
CREATE OR REPLACE FUNCTION public.prevent_self_super_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'super_admin' AND NEW.user_id = auth.uid() THEN
    RAISE EXCEPTION 'Users cannot assign super_admin role to themselves';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent self-super-admin assignment
CREATE TRIGGER prevent_self_super_admin_trigger
  BEFORE INSERT OR UPDATE ON public.roles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_super_admin();

-- =====================================================
-- ADD SECURITY INDEXES
-- =====================================================

-- Indexes for security queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_company_user_action ON audit_logs(company_id, user_id, action);
CREATE INDEX IF NOT EXISTS idx_roles_company_user ON roles(company_id, user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_company ON profiles(company_id);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Query to verify all tables have RLS enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename NOT LIKE 'pg_%'
  AND tablename NOT LIKE 'sql_%'
ORDER BY tablename;

-- Query to list all RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
