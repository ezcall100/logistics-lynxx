-- Fix RLS policies to restrict anonymous access

-- Drop and recreate policies to ensure no anonymous access
-- Only allow service_role and authenticated users with proper roles

-- 1. agent_health_checks - restrict to service role and super admins
DROP POLICY IF EXISTS "Service role can manage agent health checks" ON public.agent_health_checks;
DROP POLICY IF EXISTS "Admins can view agent health checks" ON public.agent_health_checks;

CREATE POLICY "Service role only access" ON public.agent_health_checks
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Super admins can view health checks" ON public.agent_health_checks
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 2. agent_memory - restrict to service role and super admins
DROP POLICY IF EXISTS "Service role can manage agent memory" ON public.agent_memory;
DROP POLICY IF EXISTS "Super admins can manage agent memory" ON public.agent_memory;

CREATE POLICY "Service role only access" ON public.agent_memory
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Super admins can manage memory" ON public.agent_memory
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- 3. agent_status_logs - restrict to service role and super admins
DROP POLICY IF EXISTS "Service role can manage agent status logs" ON public.agent_status_logs;
DROP POLICY IF EXISTS "Admins can view agent status logs" ON public.agent_status_logs;

CREATE POLICY "Service role only access" ON public.agent_status_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Super admins can view status logs" ON public.agent_status_logs
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 4. ai_confidence_logs - restrict to service role and super admins
DROP POLICY IF EXISTS "Service role can manage AI confidence logs" ON public.ai_confidence_logs;
DROP POLICY IF EXISTS "Admins can view AI confidence logs" ON public.ai_confidence_logs;

CREATE POLICY "Service role only access" ON public.ai_confidence_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Super admins can view confidence logs" ON public.ai_confidence_logs
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 5. ai_decisions - restrict to service role and super admins
DROP POLICY IF EXISTS "Service role can manage AI decisions" ON public.ai_decisions;
DROP POLICY IF EXISTS "Admins can view AI decisions" ON public.ai_decisions;

CREATE POLICY "Service role only access" ON public.ai_decisions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Super admins can view AI decisions" ON public.ai_decisions
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 6. autonomous_system_control - restrict to service role only
DROP POLICY IF EXISTS "Service role can manage autonomous control" ON public.autonomous_system_control;

CREATE POLICY "Service role only access" ON public.autonomous_system_control
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- 7. Update existing policies on other tables to ensure no anonymous access
-- agents table
DROP POLICY IF EXISTS "Admins can manage agents" ON public.agents;
CREATE POLICY "Admins can manage agents" ON public.agents
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

-- ai_performance_metrics table
DROP POLICY IF EXISTS "Admins can view AI metrics" ON public.ai_performance_metrics;
DROP POLICY IF EXISTS "Admins can insert AI metrics" ON public.ai_performance_metrics;

CREATE POLICY "Authorized users can view AI metrics" ON public.ai_performance_metrics
FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

CREATE POLICY "Super admins can insert AI metrics" ON public.ai_performance_metrics
FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- alerts table
DROP POLICY IF EXISTS "Authorized users can manage alerts" ON public.alerts;
CREATE POLICY "Authorized users can manage alerts" ON public.alerts
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- api_integrations table
DROP POLICY IF EXISTS "Admins can manage API integrations" ON public.api_integrations;
CREATE POLICY "Super admins can manage API integrations" ON public.api_integrations
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- api_logs table
DROP POLICY IF EXISTS "Admins can view API logs" ON public.api_logs;
DROP POLICY IF EXISTS "System can insert API logs" ON public.api_logs;

CREATE POLICY "Super admins can view API logs" ON public.api_logs
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Service role can insert API logs" ON public.api_logs
FOR INSERT TO service_role
WITH CHECK (true);

-- autonomous_agent_configs table
DROP POLICY IF EXISTS "Admins can manage agent configs" ON public.autonomous_agent_configs;
CREATE POLICY "Super admins can manage agent configs" ON public.autonomous_agent_configs
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- autonomous_tasks table
DROP POLICY IF EXISTS "Service role full access" ON public.autonomous_tasks;
DROP POLICY IF EXISTS "Admins can manage autonomous tasks" ON public.autonomous_tasks;

CREATE POLICY "Service role only access" ON public.autonomous_tasks
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Authorized admins can manage tasks" ON public.autonomous_tasks
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);