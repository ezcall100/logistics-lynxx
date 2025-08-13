-- Final Security and Data Integrity Fixes - Corrected
-- Addressing remaining security warnings (avoiding duplicate constraints)

-- ==========================================
-- SECURITY POLICY COMPLETIONS
-- ==========================================

-- 1. Add missing RLS policies for remaining tables
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

-- 4. Add missing constraints for data integrity (avoiding duplicates)
DO $$
BEGIN
  -- Phone number validation
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_phone_format') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'companies_phone_format') THEN
    ALTER TABLE public.companies ADD CONSTRAINT companies_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'drivers_phone_format') THEN
    ALTER TABLE public.drivers ADD CONSTRAINT drivers_phone_format CHECK (phone IS NULL OR phone ~ '^\+?[\d\s\-\(\)]{7,20}$');
  END IF;

  -- Status value validation
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'shipments_status_valid') THEN
    ALTER TABLE public.shipments ADD CONSTRAINT shipments_status_valid CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled', 'delayed'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'drivers_status_valid') THEN
    ALTER TABLE public.drivers ADD CONSTRAINT drivers_status_valid CHECK (status IN ('available', 'busy', 'offline', 'on_break'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'companies_status_valid') THEN
    ALTER TABLE public.companies ADD CONSTRAINT companies_status_valid CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));
  END IF;

  -- Date validation
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'shipments_date_logical') THEN
    ALTER TABLE public.shipments ADD CONSTRAINT shipments_date_logical CHECK (delivery_date IS NULL OR pickup_date IS NULL OR delivery_date >= pickup_date);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cert_date_logical') THEN
    ALTER TABLE public.carrier_certifications ADD CONSTRAINT cert_date_logical CHECK (expiry_date IS NULL OR issue_date IS NULL OR expiry_date > issue_date);
  END IF;

  -- Scoring validation
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_score_range') THEN
    ALTER TABLE public.crm_leads ADD CONSTRAINT leads_score_range CHECK (lead_score IS NULL OR (lead_score >= 0 AND lead_score <= 100));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_probability_range') THEN
    ALTER TABLE public.crm_opportunities ADD CONSTRAINT opportunities_probability_range CHECK (probability IS NULL OR (probability >= 0 AND probability <= 100));
  END IF;
END $$;

-- 5. Create security function for user context
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

-- 6. Add table-level security settings
ALTER TABLE public.agent_memory FORCE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ai_decisions FORCE ROW LEVEL SECURITY;