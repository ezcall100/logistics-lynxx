-- Fix remaining public role policies and optimize auth calls - Part 2
-- All tables with 'public' role need to be changed to 'authenticated' and optimized

-- Employees table
DROP POLICY IF EXISTS "Admins can manage employees" ON public.employees;
DROP POLICY IF EXISTS "Employees can view own data" ON public.employees;

CREATE POLICY "Admins can manage employees" ON public.employees
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

CREATE POLICY "Employees can view own data" ON public.employees
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND ((SELECT auth.uid())::text = (id)::text));

-- Fleet tracker
DROP POLICY IF EXISTS "Authorized users can view fleet tracker" ON public.fleet_tracker;
CREATE POLICY "Authorized users can view fleet tracker" ON public.fleet_tracker
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Freight agreements
DROP POLICY IF EXISTS "Authorized users can manage agreements" ON public.freight_agreements;
CREATE POLICY "Authorized users can manage agreements" ON public.freight_agreements
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Freight call logs
DROP POLICY IF EXISTS "Admins can manage call logs" ON public.freight_call_logs;
CREATE POLICY "Admins can manage call logs" ON public.freight_call_logs
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

-- Freight carriers
DROP POLICY IF EXISTS "Carriers can view own profile" ON public.freight_carriers;
DROP POLICY IF EXISTS "Freight brokers can manage carriers" ON public.freight_carriers;
DROP POLICY IF EXISTS "Super admins can manage all carriers" ON public.freight_carriers;

CREATE POLICY "Carriers can view own profile" ON public.freight_carriers
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'carrier_admin'::app_role));

CREATE POLICY "Freight brokers can manage carriers" ON public.freight_carriers
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role));

CREATE POLICY "Super admins can manage all carriers" ON public.freight_carriers
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Freight invoices
DROP POLICY IF EXISTS "Authorized users can manage invoices" ON public.freight_invoices;
CREATE POLICY "Authorized users can manage invoices" ON public.freight_invoices
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Freight rates
DROP POLICY IF EXISTS "Admins can manage rates" ON public.freight_rates;
CREATE POLICY "Admins can manage rates" ON public.freight_rates
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

-- Fuel audit
DROP POLICY IF EXISTS "Authorized users can manage fuel audit" ON public.fuel_audit;
CREATE POLICY "Authorized users can manage fuel audit" ON public.fuel_audit
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Loads
DROP POLICY IF EXISTS "Carriers can view assigned loads" ON public.loads;
DROP POLICY IF EXISTS "Freight brokers can manage loads" ON public.loads;
DROP POLICY IF EXISTS "Super admins can manage all loads" ON public.loads;

CREATE POLICY "Carriers can view assigned loads" ON public.loads
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

CREATE POLICY "Freight brokers can manage loads" ON public.loads
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role));

CREATE POLICY "Super admins can manage all loads" ON public.loads
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));