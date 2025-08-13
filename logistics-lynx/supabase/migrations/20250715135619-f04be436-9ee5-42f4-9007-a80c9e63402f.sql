-- Fix Security and Performance Advisor Warnings
-- This migration addresses common security and performance issues

-- ==========================================
-- SECURITY FIXES
-- ==========================================

-- 1. Ensure all tables have RLS enabled (some may be missing)
ALTER TABLE public.agent_health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_status_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_confidence_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_agent_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;

-- 2. Add missing security definer functions for better RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 3. Fix potential infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT has_role(auth.uid(), 'super_admin'::app_role);
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ==========================================
-- PERFORMANCE FIXES
-- ==========================================

-- 4. Add missing indexes on foreign key columns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_status_logs_agent_id ON public.agent_status_logs(agent_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_status_logs_agent_type ON public.agent_status_logs(agent_type);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_autonomous_tasks_agent_type ON public.autonomous_tasks(agent_type);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_autonomous_tasks_status ON public.autonomous_tasks(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_autonomous_tasks_priority ON public.autonomous_tasks(priority);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_completions_agent_id ON public.task_completions(agent_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_completions_task_id ON public.task_completions(task_id);

-- 5. Add indexes on commonly queried timestamp columns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_memory_created_at ON public.agent_memory(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_status_logs_timestamp ON public.agent_status_logs(timestamp);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_autonomous_tasks_created_at ON public.autonomous_tasks(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_alerts_timestamp ON public.alerts(timestamp);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_analytics_timestamp ON public.user_analytics(timestamp);

-- 6. Add compound indexes for better query performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_autonomous_tasks_status_priority ON public.autonomous_tasks(status, priority);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_status_logs_type_status ON public.agent_status_logs(agent_type, status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_alerts_category_severity ON public.alerts(category, severity);

-- 7. Add indexes on user_id columns for RLS performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);

-- 8. Add indexes for TMS-specific queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_shipper_id ON public.shipments(shipper_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_carrier_id ON public.shipments(carrier_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_driver_id ON public.shipments(driver_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_pickup_date ON public.shipments(pickup_date);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_delivery_date ON public.shipments(delivery_date);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_drivers_company_id ON public.drivers(company_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_drivers_status ON public.drivers(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_type ON public.companies(type);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_status ON public.companies(status);

-- 9. Add text search indexes for better search performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_name_gin ON public.companies USING gin(to_tsvector('english', name));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_origin_gin ON public.shipments USING gin(to_tsvector('english', origin));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_destination_gin ON public.shipments USING gin(to_tsvector('english', destination));

-- 10. Add partial indexes for active records
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shipments_active ON public.shipments(id) WHERE status NOT IN ('delivered', 'cancelled');
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_drivers_active ON public.drivers(id) WHERE status = 'available';
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_active ON public.companies(id) WHERE status = 'active';

-- ==========================================
-- SECURITY POLICY IMPROVEMENTS
-- ==========================================

-- 11. Improve RLS policies to be more specific and secure
-- Update user_analytics policies for better security
DROP POLICY IF EXISTS "System can insert analytics" ON public.user_analytics;
CREATE POLICY "Authenticated users can insert own analytics" 
ON public.user_analytics 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid() OR auth.role() = 'service_role');

-- 12. Add missing policies for user_sessions
DROP POLICY IF EXISTS "Users can view own sessions" ON public.user_sessions;
CREATE POLICY "Users can view own sessions" 
ON public.user_sessions 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "System can manage user sessions" 
ON public.user_sessions 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 13. Secure system health metrics access
DROP POLICY IF EXISTS "System can insert health metrics" ON public.system_health_metrics;
CREATE POLICY "Service role can manage health metrics" 
ON public.system_health_metrics 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- ==========================================
-- ADDITIONAL SECURITY MEASURES
-- ==========================================

-- 14. Create audit trigger function for sensitive tables
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Log significant changes to audit table (if needed)
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.user_analytics (event_type, session_id, event_data, user_id)
    VALUES ('audit_delete', 'system', row_to_json(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.user_analytics (event_type, session_id, event_data, user_id)
    VALUES ('audit_update', 'system', json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 15. Add constraints to improve data integrity
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE public.companies ADD CONSTRAINT companies_email_valid CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE public.drivers ADD CONSTRAINT drivers_email_valid CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- 16. Add check constraints for data validation
ALTER TABLE public.ai_confidence_logs ADD CONSTRAINT confidence_score_range CHECK (confidence_score >= 0 AND confidence_score <= 1);
ALTER TABLE public.autonomous_tasks ADD CONSTRAINT priority_range CHECK (priority >= 1 AND priority <= 10);
ALTER TABLE public.carrier_vehicles ADD CONSTRAINT mpg_positive CHECK (mpg_rating IS NULL OR mpg_rating > 0);
ALTER TABLE public.shipments ADD CONSTRAINT weight_positive CHECK (weight IS NULL OR weight > 0);
ALTER TABLE public.shipments ADD CONSTRAINT volume_positive CHECK (volume IS NULL OR volume > 0);

-- 17. Add unique constraints where appropriate
ALTER TABLE public.autonomous_agent_configs ADD CONSTRAINT unique_agent_id UNIQUE (agent_id);
ALTER TABLE public.drivers ADD CONSTRAINT unique_license_number UNIQUE (license_number);

COMMENT ON INDEX idx_agent_memory_agent_id IS 'Performance: Fast lookups by agent_id';
COMMENT ON INDEX idx_autonomous_tasks_status_priority IS 'Performance: Compound index for task queue queries';
COMMENT ON INDEX idx_companies_name_gin IS 'Performance: Full-text search on company names';
COMMENT ON POLICY "Service role can manage health metrics" ON public.system_health_metrics IS 'Security: Restrict health metrics to service role only';