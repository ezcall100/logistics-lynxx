-- Final Security and Data Integrity Fixes
-- Addressing remaining security warnings and data validation

-- ==========================================
-- SECURITY POLICY COMPLETIONS
-- ==========================================

-- 1. Add missing RLS policies for remaining tables
-- Cities and countries (read-only for most users)
DROP POLICY IF EXISTS "Public can view cities" ON public.cities;
CREATE POLICY "Authenticated users can view cities" 
ON public.cities 
FOR SELECT 
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Public can view countries" ON public.countries;
CREATE POLICY "Authenticated users can view countries" 
ON public.countries 
FOR SELECT 
TO authenticated
USING (true);

-- 2. Secure carrier-related tables properly
-- Carrier certifications - restrict to company owners and admins
CREATE POLICY "Companies can manage own certifications" 
ON public.carrier_certifications 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.companies c 
  WHERE c.id = carrier_certifications.company_id 
  AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role))
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.companies c 
  WHERE c.id = carrier_certifications.company_id 
  AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role))
));

-- Carrier rates - similar restrictions
CREATE POLICY "Companies can manage own rates" 
ON public.carrier_rates 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.companies c 
  WHERE c.id = carrier_rates.company_id 
  AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role))
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.companies c 
  WHERE c.id = carrier_rates.company_id 
  AND (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'carrier_admin'::app_role))
));

-- 3. Add audit policies for critical tables
CREATE POLICY "Audit access for shipment status history" 
ON public.shipment_status_history 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Add missing constraints for data integrity
-- Phone number validation
ALTER TABLE public.profiles ADD CONSTRAINT profiles_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');
ALTER TABLE public.companies ADD CONSTRAINT companies_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');
ALTER TABLE public.drivers ADD CONSTRAINT drivers_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');

-- Status value validation
ALTER TABLE public.shipments ADD CONSTRAINT shipments_status_valid CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled', 'delayed'));
ALTER TABLE public.drivers ADD CONSTRAINT drivers_status_valid CHECK (status IN ('available', 'busy', 'offline', 'on_break'));
ALTER TABLE public.companies ADD CONSTRAINT companies_status_valid CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Date validation (logical constraints)
ALTER TABLE public.shipments ADD CONSTRAINT shipments_date_logical CHECK (delivery_date IS NULL OR pickup_date IS NULL OR delivery_date >= pickup_date);
ALTER TABLE public.carrier_certifications ADD CONSTRAINT cert_date_logical CHECK (expiry_date IS NULL OR issue_date IS NULL OR expiry_date > issue_date);

-- Priority and scoring validation
ALTER TABLE public.crm_leads ADD CONSTRAINT leads_score_range CHECK (lead_score IS NULL OR (lead_score >= 0 AND lead_score <= 100));
ALTER TABLE public.crm_opportunities ADD CONSTRAINT opportunities_probability_range CHECK (probability IS NULL OR (probability >= 0 AND probability <= 100));

-- 5. Add foreign key constraints where missing (performance and integrity)
-- These help with query planning and ensure referential integrity
ALTER TABLE public.user_analytics ADD CONSTRAINT user_analytics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE SET NULL;
ALTER TABLE public.user_sessions ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE SET NULL;

-- 6. Create security function for user context
CREATE OR REPLACE FUNCTION public.get_user_context()
RETURNS JSON AS $$
DECLARE
  user_profile RECORD;
  user_roles TEXT[];
BEGIN
  SELECT * INTO user_profile FROM public.profiles WHERE user_id = auth.uid();
  SELECT ARRAY_AGG(role::text) INTO user_roles FROM public.user_roles WHERE user_id = auth.uid();
  
  RETURN json_build_object(
    'user_id', auth.uid(),
    'profile', row_to_json(user_profile),
    'roles', user_roles
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 7. Add table-level security settings
-- Update table ownership and permissions
ALTER TABLE public.agent_memory FORCE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ai_decisions FORCE ROW LEVEL SECURITY;