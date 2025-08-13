-- Create a function to properly detect non-anonymous users
CREATE OR REPLACE FUNCTION public.is_authenticated_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT auth.uid() IS NOT NULL AND auth.jwt() ->> 'aud' = 'authenticated'
$function$;

-- Update all the previously created policies to use this function
-- This will fix the anonymous access warnings

-- Update CRM policies
DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM activities" ON public.crm_activities;
CREATE POLICY "Non-anonymous users can manage their CRM activities" ON public.crm_activities
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = auth.uid())
WITH CHECK (public.is_authenticated_user() AND created_by = auth.uid());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM calendar" ON public.crm_calendar;
CREATE POLICY "Non-anonymous users can manage their CRM calendar" ON public.crm_calendar
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = auth.uid() OR auth.uid() = ANY (attendees)))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM companies" ON public.crm_companies;
CREATE POLICY "Non-anonymous users can manage their CRM companies" ON public.crm_companies
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = auth.uid())
WITH CHECK (public.is_authenticated_user() AND created_by = auth.uid());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM contacts" ON public.crm_contacts;
CREATE POLICY "Non-anonymous users can manage their CRM contacts" ON public.crm_contacts
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = auth.uid())
WITH CHECK (public.is_authenticated_user() AND created_by = auth.uid());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM emails" ON public.crm_emails;
CREATE POLICY "Non-anonymous users can manage their CRM emails" ON public.crm_emails
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = auth.uid())
WITH CHECK (public.is_authenticated_user() AND created_by = auth.uid());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM leads" ON public.crm_leads;
CREATE POLICY "Non-anonymous users can manage their CRM leads" ON public.crm_leads
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = auth.uid() OR assigned_to = auth.uid()))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM opportunities" ON public.crm_opportunities;
CREATE POLICY "Non-anonymous users can manage their CRM opportunities" ON public.crm_opportunities
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = auth.uid() OR assigned_to = auth.uid()))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM projects" ON public.crm_projects;
CREATE POLICY "Non-anonymous users can manage their CRM projects" ON public.crm_projects
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = auth.uid() OR project_manager = auth.uid() OR auth.uid() = ANY (team_members)))
WITH CHECK (public.is_authenticated_user());

-- Update profile policies
DROP POLICY IF EXISTS "Non-anonymous users can view own profile" ON public.profiles;
CREATE POLICY "Non-anonymous users can view own profile" ON public.profiles
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND user_id = auth.uid());

DROP POLICY IF EXISTS "Non-anonymous users can update own profile" ON public.profiles;
CREATE POLICY "Non-anonymous users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (public.is_authenticated_user() AND user_id = auth.uid())
WITH CHECK (public.is_authenticated_user() AND user_id = auth.uid());

DROP POLICY IF EXISTS "Super admins can manage all profiles" ON public.profiles;
CREATE POLICY "Super admins can manage all profiles" ON public.profiles
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));

-- Update user roles policies
DROP POLICY IF EXISTS "Non-anonymous users can view their own roles" ON public.user_roles;
CREATE POLICY "Non-anonymous users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND user_id = auth.uid());

DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
CREATE POLICY "Super admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));