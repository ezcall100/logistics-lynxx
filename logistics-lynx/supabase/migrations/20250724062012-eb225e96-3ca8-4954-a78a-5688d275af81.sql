-- Fix the CRM database migration
-- Remove the problematic policies and recreate them correctly

-- Drop the problematic policies first
DROP POLICY IF EXISTS "Shipper admins can access shipper CRM data" ON public.crm_companies;
DROP POLICY IF EXISTS "Broker admins can access broker CRM data" ON public.crm_companies;
DROP POLICY IF EXISTS "Carrier admins can access carrier CRM data" ON public.crm_companies;

-- Create corrected role-specific policies for CRM companies
CREATE POLICY "Shipper admins can access shipper CRM companies" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'shipper_admin'
  ) AND (company_type = 'shipper' OR company_type = 'customer')
);

CREATE POLICY "Broker admins can access broker CRM companies" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'broker_admin'
  ) AND (company_type IN ('shipper', 'carrier', 'broker', 'customer'))
);

CREATE POLICY "Carrier admins can access carrier CRM companies" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'carrier_admin'
  ) AND (company_type = 'carrier' OR company_type = 'shipper')
);

-- Create role-specific policies for other CRM tables
CREATE POLICY "Role-based access for CRM contacts" ON public.crm_contacts
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.crm_companies cc ON cc.id = crm_contacts.company_id
    WHERE ur.user_id = auth.uid() 
    AND (
      (ur.role = 'shipper_admin' AND cc.company_type IN ('shipper', 'customer')) OR
      (ur.role = 'broker_admin' AND cc.company_type IN ('shipper', 'carrier', 'broker', 'customer')) OR
      (ur.role = 'carrier_admin' AND cc.company_type IN ('carrier', 'shipper'))
    )
  )
);

CREATE POLICY "Role-based access for CRM leads" ON public.crm_leads
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid()) OR
  (assigned_to = auth.uid())
);

CREATE POLICY "Role-based access for CRM opportunities" ON public.crm_opportunities
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid()) OR
  (assigned_to = auth.uid())
);

CREATE POLICY "Role-based access for CRM projects" ON public.crm_projects
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid()) OR
  (project_manager = auth.uid()) OR
  (auth.uid() = ANY(team_members))
);

CREATE POLICY "Role-based access for CRM activities" ON public.crm_activities
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid())
);

CREATE POLICY "Role-based access for CRM calendar" ON public.crm_calendar
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid()) OR
  (auth.uid() = ANY(attendees))
);

CREATE POLICY "Role-based access for CRM emails" ON public.crm_emails
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ) OR 
  (created_by = auth.uid())
);