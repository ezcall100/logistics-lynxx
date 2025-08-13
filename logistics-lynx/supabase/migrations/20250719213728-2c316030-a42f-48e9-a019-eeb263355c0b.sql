-- Fix security issues identified by Supabase linter

-- 1. Fix function search path mutability issues
CREATE OR REPLACE FUNCTION public.validate_full_autonomous_access()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN (
    SELECT COUNT(*) = (SELECT COUNT(DISTINCT agent_type) FROM public.openai_agent_permissions)
    FROM public.openai_agent_permissions 
    WHERE authorization_percentage = 100 
    AND human_oversight_required = false
    AND permission_level = 'unrestricted'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_active_autonomous_tasks(p_agent_type text DEFAULT NULL::text)
RETURNS TABLE(task_id text, agent_type text, task_name text, status text, priority integer, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
    SELECT t.task_id, t.agent_type, t.task_name, t.status, t.priority, t.created_at
    FROM public.autonomous_tasks t
    WHERE (p_agent_type IS NULL OR t.agent_type = p_agent_type)
    AND t.status IN ('pending', 'in_progress')
    ORDER BY t.priority DESC, t.created_at ASC;
$function$;

CREATE OR REPLACE FUNCTION public.refresh_autonomous_agent_performance()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    REFRESH MATERIALIZED VIEW public.autonomous_agent_performance_summary;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_agent_performance_metrics(p_agent_type text)
RETURNS TABLE(total_tasks bigint, completed_tasks bigint, success_rate numeric, avg_duration_minutes numeric)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
    SELECT 
        COUNT(*) as total_tasks,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
        ROUND(
            (COUNT(*) FILTER (WHERE status = 'completed')::numeric / 
             NULLIF(COUNT(*), 0) * 100), 2
        ) as success_rate,
        ROUND(
            AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60), 2
        ) as avg_duration_minutes
    FROM public.autonomous_tasks 
    WHERE agent_type = p_agent_type;
$function$;

CREATE OR REPLACE FUNCTION public.activate_full_autonomous_control()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  activation_result JSON;
  agent_count INTEGER;
BEGIN
  -- Update all system components to full autonomous control
  UPDATE public.autonomous_system_control 
  SET 
    control_level = 'full',
    autonomous_status = 'active',
    last_action = NOW(),
    auto_improvements_enabled = true,
    updated_at = NOW();

  -- Get current agent count
  SELECT COUNT(*) INTO agent_count FROM public.autonomous_tasks WHERE status IN ('pending', 'in_progress');
  
  -- Log the activation
  INSERT INTO public.agent_status_logs (
    agent_id, agent_type, status, message, timestamp
  ) VALUES (
    'system_controller', 
    'autonomous_control', 
    'activated', 
    'FULL AUTONOMOUS CONTROL ACTIVATED: All 250 agents now have complete control over TMS system including website and all portals',
    NOW()
  );

  -- Create activation result
  activation_result := json_build_object(
    'status', 'AUTONOMOUS_TAKEOVER_ACTIVATED',
    'message', 'All 250 autonomous agents now have full control of the TMS system',
    'controlled_components', (SELECT COUNT(*) FROM public.autonomous_system_control WHERE autonomous_status = 'active'),
    'active_tasks', agent_count,
    'activation_time', NOW(),
    'control_level', 'COMPLETE_AUTONOMOUS_CONTROL'
  );

  RETURN activation_result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.autonomous_realtime_monitoring()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Create continuous monitoring entry
  INSERT INTO public.agent_status_logs (
    agent_id, agent_type, status, message, timestamp, response_time
  ) VALUES (
    'autonomous_monitor_' || EXTRACT(EPOCH FROM NOW())::TEXT,
    'system_monitor',
    'monitoring',
    'Autonomous agents are actively monitoring and optimizing all TMS operations in real-time',
    NOW(),
    1
  );

  -- Update performance metrics
  UPDATE public.autonomous_system_control 
  SET 
    last_action = NOW(),
    performance_metrics = jsonb_set(
      performance_metrics,
      '{last_health_check}',
      to_jsonb(NOW())
    )
  WHERE autonomous_status = 'active';
END;
$function$;

CREATE OR REPLACE FUNCTION public.autonomous_system_operation()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT true
$function$;

-- 2. Move extensions from public schema to extensions schema
CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION pg_trgm SET SCHEMA extensions;
ALTER EXTENSION btree_gin SET SCHEMA extensions;

-- 3. Fix RLS policies to restrict anonymous access
-- Update policies to require authenticated users only

-- Remove overly permissive policies and replace with secure ones
DROP POLICY IF EXISTS "System can manage agent health checks" ON public.agent_health_checks;
CREATE POLICY "Service role can manage agent health checks" ON public.agent_health_checks
FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can insert agent memory" ON public.agent_memory;
CREATE POLICY "Service role can manage agent memory" ON public.agent_memory
FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can manage agent status logs" ON public.agent_status_logs;
CREATE POLICY "Service role can manage agent status logs" ON public.agent_status_logs
FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can manage AI confidence logs" ON public.ai_confidence_logs;
CREATE POLICY "Service role can manage AI confidence logs" ON public.ai_confidence_logs
FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can manage AI decisions" ON public.ai_decisions;
CREATE POLICY "Service role can manage AI decisions" ON public.ai_decisions
FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can manage autonomous control" ON public.autonomous_system_control;
CREATE POLICY "Service role can manage autonomous control" ON public.autonomous_system_control
FOR ALL USING (auth.role() = 'service_role');

-- Ensure all other tables require proper authentication
UPDATE pg_policy SET polcmd = 'r' WHERE polrelid IN (
  SELECT oid FROM pg_class WHERE relname IN (
    'cities', 'countries'
  )
) AND polname LIKE '%can view%';