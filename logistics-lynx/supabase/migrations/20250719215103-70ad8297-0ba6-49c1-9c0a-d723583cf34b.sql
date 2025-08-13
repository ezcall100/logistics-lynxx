-- Fix RLS performance issues by optimizing auth function calls
-- Replace auth.uid() with (SELECT auth.uid()) to evaluate once per query instead of per row

-- Update ai_decisions policies
DROP POLICY IF EXISTS "Super admins can view AI decisions" ON public.ai_decisions;
CREATE POLICY "Super admins can view AI decisions" ON public.ai_decisions
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update ai_performance_metrics policies
DROP POLICY IF EXISTS "Authorized users can view AI metrics" ON public.ai_performance_metrics;
DROP POLICY IF EXISTS "Super admins can insert AI metrics" ON public.ai_performance_metrics;

CREATE POLICY "Authorized users can view AI metrics" ON public.ai_performance_metrics
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

CREATE POLICY "Super admins can insert AI metrics" ON public.ai_performance_metrics
FOR INSERT TO authenticated
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update api_integrations policies
DROP POLICY IF EXISTS "Super admins can manage API integrations" ON public.api_integrations;
CREATE POLICY "Super admins can manage API integrations" ON public.api_integrations
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update api_logs policies
DROP POLICY IF EXISTS "Super admins can view API logs" ON public.api_logs;
CREATE POLICY "Super admins can view API logs" ON public.api_logs
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update agent health checks policies
DROP POLICY IF EXISTS "Super admins can view health checks" ON public.agent_health_checks;
CREATE POLICY "Super admins can view health checks" ON public.agent_health_checks
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update agent memory policies
DROP POLICY IF EXISTS "Super admins can manage memory" ON public.agent_memory;
CREATE POLICY "Super admins can manage memory" ON public.agent_memory
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update agent status logs policies
DROP POLICY IF EXISTS "Super admins can view status logs" ON public.agent_status_logs;
CREATE POLICY "Super admins can view status logs" ON public.agent_status_logs
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update ai_confidence_logs policies
DROP POLICY IF EXISTS "Super admins can view confidence logs" ON public.ai_confidence_logs;
CREATE POLICY "Super admins can view confidence logs" ON public.ai_confidence_logs
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update agents policies
DROP POLICY IF EXISTS "Admins can manage agents" ON public.agents;
CREATE POLICY "Admins can manage agents" ON public.agents
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

-- Update alerts policies
DROP POLICY IF EXISTS "Authorized users can manage alerts" ON public.alerts;
CREATE POLICY "Authorized users can manage alerts" ON public.alerts
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

-- Update autonomous_agent_configs policies
DROP POLICY IF EXISTS "Super admins can manage agent configs" ON public.autonomous_agent_configs;
CREATE POLICY "Super admins can manage agent configs" ON public.autonomous_agent_configs
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));