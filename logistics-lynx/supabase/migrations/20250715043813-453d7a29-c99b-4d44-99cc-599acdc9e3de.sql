-- Comprehensive Security Fix for Supabase Security Advisor Warnings

-- 1. Enable RLS on all tables that don't have it
ALTER TABLE public.agent_health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_status_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_confidence_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_agent_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- 2. Create secure service functions for autonomous operations
CREATE OR REPLACE FUNCTION public.autonomous_system_operation()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT true
$$;

-- 3. Add system-level policies for autonomous agents
-- Allow autonomous system to insert agent memory without user authentication
DROP POLICY IF EXISTS "System can insert agent memory" ON public.agent_memory;
CREATE POLICY "Autonomous system can insert agent memory" ON public.agent_memory
FOR INSERT TO service_role
WITH CHECK (true);

-- Allow autonomous system to insert health checks
DROP POLICY IF EXISTS "Admins can manage agent health checks" ON public.agent_health_checks;
CREATE POLICY "System can manage agent health checks" ON public.agent_health_checks
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view agent health checks" ON public.agent_health_checks
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Allow autonomous system to insert status logs
DROP POLICY IF EXISTS "Admins can manage agent status logs" ON public.agent_status_logs;
CREATE POLICY "System can manage agent status logs" ON public.agent_status_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view agent status logs" ON public.agent_status_logs
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Allow autonomous system to manage AI confidence logs
DROP POLICY IF EXISTS "Admins can manage AI confidence logs" ON public.ai_confidence_logs;
CREATE POLICY "System can manage AI confidence logs" ON public.ai_confidence_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view AI confidence logs" ON public.ai_confidence_logs
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Allow autonomous system to manage AI decisions
DROP POLICY IF EXISTS "Admins can manage AI decisions" ON public.ai_decisions;
CREATE POLICY "System can manage AI decisions" ON public.ai_decisions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view AI decisions" ON public.ai_decisions
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Allow autonomous system to manage task completions
DROP POLICY IF EXISTS "Admins can manage task completions" ON public.task_completions;
CREATE POLICY "System can manage task completions" ON public.task_completions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view task completions" ON public.task_completions
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 4. Add performance indexes for security and efficiency
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_created_at ON public.agent_memory(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_health_checks_agent_type ON public.agent_health_checks(agent_type);
CREATE INDEX IF NOT EXISTS idx_agent_health_checks_timestamp ON public.agent_health_checks(timestamp);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent_id ON public.agent_status_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_timestamp ON public.agent_status_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_decision_type ON public.ai_confidence_logs(decision_type);
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_created_at ON public.ai_confidence_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_status ON public.autonomous_tasks(status);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_agent_type ON public.autonomous_tasks(agent_type);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_created_at ON public.autonomous_tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- 5. Secure functions with proper search paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, login_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    NEW.email
  );
  RETURN NEW;
END;
$function$;

-- 6. Add constraint validations for data integrity
ALTER TABLE public.autonomous_tasks 
ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed', 'failed'));

ALTER TABLE public.autonomous_tasks 
ADD CONSTRAINT valid_priority CHECK (priority >= 1 AND priority <= 10);

ALTER TABLE public.alerts 
ADD CONSTRAINT valid_severity CHECK (severity IN ('low', 'medium', 'high', 'critical'));

ALTER TABLE public.alerts 
ADD CONSTRAINT valid_status CHECK (status IN ('active', 'acknowledged', 'resolved'));

-- 7. Add NOT NULL constraints where appropriate
ALTER TABLE public.autonomous_tasks ALTER COLUMN task_id SET NOT NULL;
ALTER TABLE public.autonomous_tasks ALTER COLUMN agent_type SET NOT NULL;
ALTER TABLE public.autonomous_tasks ALTER COLUMN portal SET NOT NULL;
ALTER TABLE public.autonomous_tasks ALTER COLUMN task_name SET NOT NULL;
ALTER TABLE public.autonomous_tasks ALTER COLUMN description SET NOT NULL;

-- 8. Create autonomous system service account policy
CREATE POLICY "Service role full access" ON public.autonomous_tasks
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- 9. Ensure proper RLS for CRM tables with user isolation
-- These tables already have proper RLS but let's ensure consistency
CREATE POLICY "Service role CRM access" ON public.crm_activities
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM companies access" ON public.crm_companies
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM contacts access" ON public.crm_contacts
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM emails access" ON public.crm_emails
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM leads access" ON public.crm_leads
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM opportunities access" ON public.crm_opportunities
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM projects access" ON public.crm_projects
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role CRM calendar access" ON public.crm_calendar
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- 10. Grant necessary permissions to service role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;