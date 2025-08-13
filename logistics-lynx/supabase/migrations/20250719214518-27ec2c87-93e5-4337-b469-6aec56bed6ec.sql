-- Continue fixing remaining RLS policies for anonymous access issues
-- Part 2: Fix all remaining tables

-- AI and system tables
DROP POLICY IF EXISTS "Super admins can view AI decisions" ON public.ai_decisions;
CREATE POLICY "Super admins can view AI decisions" ON public.ai_decisions
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Authorized users can view AI metrics" ON public.ai_performance_metrics;
DROP POLICY IF EXISTS "Super admins can insert AI metrics" ON public.ai_performance_metrics;

CREATE POLICY "Authorized users can view AI metrics" ON public.ai_performance_metrics
FOR SELECT TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

CREATE POLICY "Super admins can insert AI metrics" ON public.ai_performance_metrics
FOR INSERT TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

-- Alerts table
DROP POLICY IF EXISTS "Authorized users can manage alerts" ON public.alerts;
CREATE POLICY "Authorized users can manage alerts" ON public.alerts
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

-- API tables
DROP POLICY IF EXISTS "Super admins can manage API integrations" ON public.api_integrations;
CREATE POLICY "Super admins can manage API integrations" ON public.api_integrations
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Super admins can view API logs" ON public.api_logs;
CREATE POLICY "Super admins can view API logs" ON public.api_logs
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

-- Autonomous system tables
DROP POLICY IF EXISTS "Super admins can manage agent configs" ON public.autonomous_agent_configs;
CREATE POLICY "Super admins can manage agent configs" ON public.autonomous_agent_configs
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Authorized admins can manage tasks" ON public.autonomous_tasks;
CREATE POLICY "Authorized admins can manage tasks" ON public.autonomous_tasks
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

-- Carrier tables
DROP POLICY IF EXISTS "Authorized users can manage carrier certifications" ON public.carrier_certifications;
DROP POLICY IF EXISTS "Authorized users can view carrier certifications" ON public.carrier_certifications;
DROP POLICY IF EXISTS "Companies can manage own certifications" ON public.carrier_certifications;

CREATE POLICY "Authorized users can manage carrier certifications" ON public.carrier_certifications
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role)
  )
);

DROP POLICY IF EXISTS "Authorized users can manage carrier rates" ON public.carrier_rates;
DROP POLICY IF EXISTS "Authorized users can view carrier rates" ON public.carrier_rates;
DROP POLICY IF EXISTS "Companies can manage own rates" ON public.carrier_rates;

CREATE POLICY "Authorized users can manage carrier rates" ON public.carrier_rates
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
);

DROP POLICY IF EXISTS "Authorized users can manage carrier vehicles" ON public.carrier_vehicles;
DROP POLICY IF EXISTS "Authorized users can view carrier vehicles" ON public.carrier_vehicles;

CREATE POLICY "Authorized users can manage carrier vehicles" ON public.carrier_vehicles
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role)
  )
);

-- Companies table
DROP POLICY IF EXISTS "Admins can manage companies" ON public.companies;
CREATE POLICY "Admins can manage companies" ON public.companies
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'carrier_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);