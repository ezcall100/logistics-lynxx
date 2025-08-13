-- Fix anonymous access issues in remaining tables

-- Update autonomous_tasks policies to explicitly target authenticated users
DROP POLICY IF EXISTS "Authenticated users can delete autonomous tasks" ON public.autonomous_tasks;
DROP POLICY IF EXISTS "Authenticated users can insert autonomous tasks" ON public.autonomous_tasks;
DROP POLICY IF EXISTS "Authenticated users can read autonomous tasks" ON public.autonomous_tasks;
DROP POLICY IF EXISTS "Authenticated users can update autonomous tasks" ON public.autonomous_tasks;

CREATE POLICY "Admins can manage autonomous tasks" ON public.autonomous_tasks
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- Cities and countries are reference data that should be publicly readable
-- but we'll update the policies to be more explicit about public access
DROP POLICY IF EXISTS "Anyone can view cities" ON public.cities;
CREATE POLICY "Public can view cities" ON public.cities
FOR SELECT TO public
USING (true);

DROP POLICY IF EXISTS "Anyone can view countries" ON public.countries;
CREATE POLICY "Public can view countries" ON public.countries
FOR SELECT TO public
USING (true);

-- Companies should require authentication
DROP POLICY IF EXISTS "Admins can manage companies" ON public.companies;
CREATE POLICY "Admins can manage companies" ON public.companies
FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);