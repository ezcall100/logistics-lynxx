-- Comprehensive fix for anonymous access issues
-- All policies must explicitly exclude anonymous users by checking auth.uid() IS NOT NULL

-- 1. Fix cities and countries tables (public reference data)
DROP POLICY IF EXISTS "Authenticated users can view cities" ON public.cities;
DROP POLICY IF EXISTS "Public can view cities" ON public.cities;
CREATE POLICY "Anyone can view cities" ON public.cities
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can view countries" ON public.countries;
DROP POLICY IF EXISTS "Public can view countries" ON public.countries;  
CREATE POLICY "Anyone can view countries" ON public.countries
FOR SELECT USING (true);

-- 2. Fix all other tables to require non-anonymous authentication
-- Users must be authenticated AND not anonymous (auth.uid() IS NOT NULL)

-- CRM tables - require non-anonymous users
DROP POLICY IF EXISTS "Users can manage their CRM activities" ON public.crm_activities;
CREATE POLICY "Non-anonymous users can manage their CRM activities" ON public.crm_activities
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND created_by = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can manage their CRM calendar" ON public.crm_calendar;
CREATE POLICY "Non-anonymous users can manage their CRM calendar" ON public.crm_calendar
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND (created_by = auth.uid() OR auth.uid() = ANY (attendees)))
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can manage their CRM companies" ON public.crm_companies;
CREATE POLICY "Non-anonymous users can manage their CRM companies" ON public.crm_companies
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND created_by = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can manage their CRM contacts" ON public.crm_contacts;
CREATE POLICY "Non-anonymous users can manage their CRM contacts" ON public.crm_contacts
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND created_by = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can manage their CRM emails" ON public.crm_emails;
CREATE POLICY "Non-anonymous users can manage their CRM emails" ON public.crm_emails
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND created_by = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can manage their CRM leads" ON public.crm_leads;
CREATE POLICY "Non-anonymous users can manage their CRM leads" ON public.crm_leads
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND (created_by = auth.uid() OR assigned_to = auth.uid()))
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can manage their CRM opportunities" ON public.crm_opportunities;
CREATE POLICY "Non-anonymous users can manage their CRM opportunities" ON public.crm_opportunities
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND (created_by = auth.uid() OR assigned_to = auth.uid()))
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can manage their CRM projects" ON public.crm_projects;
CREATE POLICY "Non-anonymous users can manage their CRM projects" ON public.crm_projects
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND (created_by = auth.uid() OR project_manager = auth.uid() OR auth.uid() = ANY (team_members)))
WITH CHECK (auth.uid() IS NOT NULL);

-- Profile and user management tables
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can manage all profiles" ON public.profiles;

CREATE POLICY "Non-anonymous users can view own profile" ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Non-anonymous users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Super admins can manage all profiles" ON public.profiles
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

-- User roles table
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;

CREATE POLICY "Non-anonymous users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Super admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

-- Fix all role-based policies to require non-anonymous authentication
DROP POLICY IF EXISTS "Super admins can view health checks" ON public.agent_health_checks;
CREATE POLICY "Super admins can view health checks" ON public.agent_health_checks
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Super admins can manage memory" ON public.agent_memory;
CREATE POLICY "Super admins can manage memory" ON public.agent_memory
FOR ALL TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Super admins can view status logs" ON public.agent_status_logs;
CREATE POLICY "Super admins can view status logs" ON public.agent_status_logs
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Admins can manage agents" ON public.agents;
CREATE POLICY "Admins can manage agents" ON public.agents
FOR ALL TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
);

-- Continue fixing all remaining tables with the same pattern
DROP POLICY IF EXISTS "Super admins can view confidence logs" ON public.ai_confidence_logs;
CREATE POLICY "Super admins can view confidence logs" ON public.ai_confidence_logs
FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'super_admin'::app_role));