-- Fix remaining anonymous access issues in RLS policies

-- Update alerts table policy to require authentication and specific roles
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.alerts;
CREATE POLICY "Authorized users can manage alerts" ON public.alerts
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- Update ai_performance_metrics policies to use proper role checking
DROP POLICY IF EXISTS "Admins can view AI metrics" ON public.ai_performance_metrics;
DROP POLICY IF EXISTS "System can insert AI metrics" ON public.ai_performance_metrics;

CREATE POLICY "Admins can view AI metrics" ON public.ai_performance_metrics
FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

CREATE POLICY "Admins can insert AI metrics" ON public.ai_performance_metrics
FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Update system_health_metrics policies to use proper role checking
DROP POLICY IF EXISTS "Admins can view system health" ON public.system_health_metrics;
DROP POLICY IF EXISTS "System can insert health metrics" ON public.system_health_metrics;

CREATE POLICY "Admins can view system health" ON public.system_health_metrics
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "System can insert health metrics" ON public.system_health_metrics
FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- Update user_analytics policies to use proper role checking
DROP POLICY IF EXISTS "Admins can view all analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "System can insert analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;

CREATE POLICY "Admins can view all analytics" ON public.user_analytics
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "System can insert analytics" ON public.user_analytics
FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

-- Update user_sessions policies to use proper role checking
DROP POLICY IF EXISTS "Admins can view all sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "System can manage sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.user_sessions;

CREATE POLICY "Admins can view all sessions" ON public.user_sessions
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "System can manage sessions" ON public.user_sessions
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));