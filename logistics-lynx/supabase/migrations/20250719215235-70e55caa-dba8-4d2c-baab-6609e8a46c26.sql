-- Final batch of RLS performance optimizations - Part 3
-- Update all remaining user-related and CRM policies

-- Update CRM policies to use optimized auth calls
DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM activities" ON public.crm_activities;
CREATE POLICY "Non-anonymous users can manage their CRM activities" ON public.crm_activities
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = (SELECT auth.uid()))
WITH CHECK (public.is_authenticated_user() AND created_by = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM calendar" ON public.crm_calendar;
CREATE POLICY "Non-anonymous users can manage their CRM calendar" ON public.crm_calendar
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = (SELECT auth.uid()) OR (SELECT auth.uid()) = ANY (attendees)))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM companies" ON public.crm_companies;
CREATE POLICY "Non-anonymous users can manage their CRM companies" ON public.crm_companies
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = (SELECT auth.uid()))
WITH CHECK (public.is_authenticated_user() AND created_by = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM contacts" ON public.crm_contacts;
CREATE POLICY "Non-anonymous users can manage their CRM contacts" ON public.crm_contacts
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = (SELECT auth.uid()))
WITH CHECK (public.is_authenticated_user() AND created_by = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM emails" ON public.crm_emails;
CREATE POLICY "Non-anonymous users can manage their CRM emails" ON public.crm_emails
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND created_by = (SELECT auth.uid()))
WITH CHECK (public.is_authenticated_user() AND created_by = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM leads" ON public.crm_leads;
CREATE POLICY "Non-anonymous users can manage their CRM leads" ON public.crm_leads
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = (SELECT auth.uid()) OR assigned_to = (SELECT auth.uid())))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM opportunities" ON public.crm_opportunities;
CREATE POLICY "Non-anonymous users can manage their CRM opportunities" ON public.crm_opportunities
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = (SELECT auth.uid()) OR assigned_to = (SELECT auth.uid())))
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Non-anonymous users can manage their CRM projects" ON public.crm_projects;
CREATE POLICY "Non-anonymous users can manage their CRM projects" ON public.crm_projects
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND (created_by = (SELECT auth.uid()) OR project_manager = (SELECT auth.uid()) OR (SELECT auth.uid()) = ANY (team_members)))
WITH CHECK (public.is_authenticated_user());

-- Update profile policies
DROP POLICY IF EXISTS "Non-anonymous users can view own profile" ON public.profiles;
CREATE POLICY "Non-anonymous users can view own profile" ON public.profiles
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Non-anonymous users can update own profile" ON public.profiles;
CREATE POLICY "Non-anonymous users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (public.is_authenticated_user() AND user_id = (SELECT auth.uid()))
WITH CHECK (public.is_authenticated_user() AND user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Super admins can manage all profiles" ON public.profiles;
CREATE POLICY "Super admins can manage all profiles" ON public.profiles
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update user roles policies
DROP POLICY IF EXISTS "Non-anonymous users can view their own roles" ON public.user_roles;
CREATE POLICY "Non-anonymous users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
CREATE POLICY "Super admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update system health and analytics policies
DROP POLICY IF EXISTS "Admins can view system health" ON public.system_health_metrics;
CREATE POLICY "Admins can view system health" ON public.system_health_metrics
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all analytics" ON public.user_analytics;
CREATE POLICY "Admins can view all analytics" ON public.user_analytics
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

DROP POLICY IF EXISTS "Admins can view task completions" ON public.task_completions;
CREATE POLICY "Admins can view task completions" ON public.task_completions
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Update user sessions policies
DROP POLICY IF EXISTS "Admins can view all sessions" ON public.user_sessions;
CREATE POLICY "Admins can view all sessions" ON public.user_sessions
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));