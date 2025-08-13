-- Comprehensive Security and Performance Fix - Additional Issues
-- Addressing remaining Supabase advisor warnings

-- ==========================================
-- ADDITIONAL SECURITY FIXES
-- ==========================================

-- 1. Add missing RLS policies for tables that may not have complete coverage
-- Ensure crm_activities has proper policies
DROP POLICY IF EXISTS "Users can manage their CRM activities" ON public.crm_activities;
CREATE POLICY "Users can manage their CRM activities" 
ON public.crm_activities 
FOR ALL 
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- Ensure crm_contacts has proper policies  
DROP POLICY IF EXISTS "Users can manage their CRM contacts" ON public.crm_contacts;
CREATE POLICY "Users can manage their CRM contacts" 
ON public.crm_contacts 
FOR ALL 
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- Ensure crm_companies has proper policies
DROP POLICY IF EXISTS "Users can manage their CRM companies" ON public.crm_companies;
CREATE POLICY "Users can manage their CRM companies" 
ON public.crm_companies 
FOR ALL 
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- Fix shipment_documents policies to be more restrictive
DROP POLICY IF EXISTS "Authorized users can manage shipment documents" ON public.shipment_documents;
CREATE POLICY "Authorized users can view shipment documents" 
ON public.shipment_documents 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role) OR has_role(auth.uid(), 'freight_broker_admin'::app_role) OR has_role(auth.uid(), 'shipper_admin'::app_role));

CREATE POLICY "Authorized users can insert shipment documents" 
ON public.shipment_documents 
FOR INSERT 
TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role) OR has_role(auth.uid(), 'freight_broker_admin'::app_role));

-- 2. Add service role policies where missing
CREATE POLICY "Service role full access crm_activities" 
ON public.crm_activities 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access crm_contacts" 
ON public.crm_contacts 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access crm_companies" 
ON public.crm_companies 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Secure tracking_events with better policies
DROP POLICY IF EXISTS "Authorized users can manage tracking events" ON public.tracking_events;
CREATE POLICY "Authorized users can view tracking events" 
ON public.tracking_events 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role) OR has_role(auth.uid(), 'freight_broker_admin'::app_role) OR has_role(auth.uid(), 'shipper_admin'::app_role) OR has_role(auth.uid(), 'driver'::app_role));

CREATE POLICY "System can insert tracking events" 
ON public.tracking_events 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- 4. Add missing NOT NULL constraints for security
ALTER TABLE public.profiles ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.user_analytics ALTER COLUMN session_id SET NOT NULL;
ALTER TABLE public.autonomous_tasks ALTER COLUMN task_id SET NOT NULL;
ALTER TABLE public.agent_memory ALTER COLUMN agent_id SET NOT NULL;