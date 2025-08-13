-- Continue fixing RLS performance issues - Part 2
-- Update remaining policies to optimize auth function calls

-- Update autonomous_tasks policies
DROP POLICY IF EXISTS "Authorized admins can manage tasks" ON public.autonomous_tasks;
CREATE POLICY "Authorized admins can manage tasks" ON public.autonomous_tasks
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

-- Update carrier certifications policies
DROP POLICY IF EXISTS "Authorized users can manage carrier certifications" ON public.carrier_certifications;
CREATE POLICY "Authorized users can manage carrier certifications" ON public.carrier_certifications
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Update carrier rates policies
DROP POLICY IF EXISTS "Authorized users can manage carrier rates" ON public.carrier_rates;
CREATE POLICY "Authorized users can manage carrier rates" ON public.carrier_rates
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

-- Update carrier vehicles policies
DROP POLICY IF EXISTS "Authorized users can manage carrier vehicles" ON public.carrier_vehicles;
CREATE POLICY "Authorized users can manage carrier vehicles" ON public.carrier_vehicles
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Update companies policies
DROP POLICY IF EXISTS "Admins can manage companies" ON public.companies;
CREATE POLICY "Admins can manage companies" ON public.companies
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

-- Update compliance records policies
DROP POLICY IF EXISTS "Authorized users can manage compliance" ON public.compliance_records;
CREATE POLICY "Authorized users can manage compliance" ON public.compliance_records
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Update customers policies
DROP POLICY IF EXISTS "Authorized users can manage customers" ON public.customers;
CREATE POLICY "Authorized users can manage customers" ON public.customers
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

-- Update document fields policies
DROP POLICY IF EXISTS "Authorized users can view document fields" ON public.document_fields;
CREATE POLICY "Authorized users can view document fields" ON public.document_fields
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

-- Update document templates policies
DROP POLICY IF EXISTS "Authorized users can view document templates" ON public.document_templates;
CREATE POLICY "Authorized users can view document templates" ON public.document_templates
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);