-- Fix ALL remaining RLS performance issues - Complete optimization
-- Part 1: Fix cities, countries, and document templates that still have unoptimized auth calls

-- Cities and countries
DROP POLICY IF EXISTS "Only super admins can modify cities" ON public.cities;
CREATE POLICY "Only super admins can modify cities" ON public.cities
FOR ALL TO authenticated
USING (has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (has_role((SELECT auth.uid()), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Only super admins can modify countries" ON public.countries;
CREATE POLICY "Only super admins can modify countries" ON public.countries
FOR ALL TO authenticated
USING (has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Document fields - fix the ones that weren't updated
DROP POLICY IF EXISTS "Authorized users can manage document fields" ON public.document_fields;
CREATE POLICY "Authorized users can manage document fields" ON public.document_fields
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

-- Document templates - fix the ones that weren't updated
DROP POLICY IF EXISTS "Authorized users can manage document templates" ON public.document_templates;
CREATE POLICY "Authorized users can manage document templates" ON public.document_templates
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

-- Drivers table
DROP POLICY IF EXISTS "Admins and drivers can manage drivers" ON public.drivers;
CREATE POLICY "Admins and drivers can manage drivers" ON public.drivers
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

-- Generated documents
DROP POLICY IF EXISTS "Authorized users can manage generated documents" ON public.generated_documents;
CREATE POLICY "Authorized users can manage generated documents" ON public.generated_documents
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
)
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

DROP POLICY IF EXISTS "Authorized users can view generated documents" ON public.generated_documents;
CREATE POLICY "Authorized users can view generated documents" ON public.generated_documents
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

-- Profiles - fix the one that wasn't updated
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (public.is_authenticated_user() AND user_id = (SELECT auth.uid()));

-- Routes
DROP POLICY IF EXISTS "Authorized users can manage routes" ON public.routes;
CREATE POLICY "Authorized users can manage routes" ON public.routes
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);