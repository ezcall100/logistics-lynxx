-- Fix Security and Performance Advisor Warnings - Part 1: Security Fixes
-- This migration addresses security issues first

-- ==========================================
-- SECURITY FIXES
-- ==========================================

-- 1. Ensure all tables have RLS enabled
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

-- 4. Improve RLS policies to be more specific and secure
DROP POLICY IF EXISTS "System can insert analytics" ON public.user_analytics;
CREATE POLICY "Authenticated users can insert own analytics" 
ON public.user_analytics 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid() OR auth.role() = 'service_role');

-- 5. Add missing policies for user_sessions
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

-- 6. Secure system health metrics access
DROP POLICY IF EXISTS "System can insert health metrics" ON public.system_health_metrics;
CREATE POLICY "Service role can manage health metrics" 
ON public.system_health_metrics 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 7. Create audit trigger function for sensitive tables
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