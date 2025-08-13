-- Final comprehensive fix for anonymous access
-- Create a function to properly detect non-anonymous users and fix all remaining policies

-- Create function to check if user is non-anonymous
CREATE OR REPLACE FUNCTION public.is_authenticated_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT auth.uid() IS NOT NULL AND auth.jwt() ->> 'aud' = 'authenticated'
$function$;

-- Now update ALL remaining policies to use this function or restrict to service role

-- 1. Drop all remaining problematic policies and recreate them properly

-- Compliance records
DROP POLICY IF EXISTS "Authorized users can manage compliance" ON public.compliance_records;
CREATE POLICY "Authorized users can manage compliance" ON public.compliance_records
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role)
  )
);

-- Customers
DROP POLICY IF EXISTS "Authorized users can manage customers" ON public.customers;
CREATE POLICY "Authorized users can manage customers" ON public.customers
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

-- Document fields and templates - restrict to service role for system operations
DROP POLICY IF EXISTS "Authorized users can manage document fields" ON public.document_fields;
DROP POLICY IF EXISTS "Authorized users can view document fields" ON public.document_fields;
DROP POLICY IF EXISTS "Service role full access document fields" ON public.document_fields;

CREATE POLICY "Service role can manage document fields" ON public.document_fields
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Authorized users can view document fields" ON public.document_fields
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

-- Document templates
DROP POLICY IF EXISTS "Authorized users can manage document templates" ON public.document_templates;
DROP POLICY IF EXISTS "Authorized users can view document templates" ON public.document_templates;

CREATE POLICY "Service role can manage document templates" ON public.document_templates
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Authorized users can view document templates" ON public.document_templates
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

-- Fix system health and analytics tables to use the function
DROP POLICY IF EXISTS "Admins can view system health" ON public.system_health_metrics;
CREATE POLICY "Admins can view system health" ON public.system_health_metrics
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all analytics" ON public.user_analytics;
CREATE POLICY "Admins can view all analytics" ON public.user_analytics
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Admins can view task completions" ON public.task_completions;
CREATE POLICY "Admins can view task completions" ON public.task_completions
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));

-- User sessions
DROP POLICY IF EXISTS "Admins can view all sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "System can manage sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can view own sessions" ON public.user_sessions;

CREATE POLICY "Admins can view all sessions" ON public.user_sessions
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "System can manage sessions" ON public.user_sessions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Fix OpenAI agent permissions to service role only
DROP POLICY IF EXISTS "Service role can manage OpenAI permissions" ON public.openai_agent_permissions;
CREATE POLICY "Service role can manage OpenAI permissions" ON public.openai_agent_permissions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Update all remaining business logic tables to use the proper function
-- (continuing with tables that might not have been covered yet)

-- Employees
DROP POLICY IF EXISTS "Admins can manage employees" ON public.employees;
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;

CREATE POLICY "Admins can manage employees" ON public.employees
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role)
  )
);

CREATE POLICY "Employees can view own data" ON public.employees
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND user_id = auth.uid());

-- Drivers
DROP POLICY IF EXISTS "Admins and drivers can manage drivers" ON public.drivers;
CREATE POLICY "Admins and drivers can manage drivers" ON public.drivers
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    user_id = auth.uid()
  )
);