-- Phase 7.3: Compliant Risk Management Framework for Carrier & Broker Onboarding
-- Comprehensive database schema for enterprise-grade onboarding protocols

-- Create company_profile table for detailed company information
CREATE TABLE IF NOT EXISTS public.company_profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES public.companies(id),
  
  -- Legal Information
  legal_business_name TEXT NOT NULL,
  dba_name TEXT,
  ein_tin TEXT NOT NULL,
  tin_verified BOOLEAN DEFAULT FALSE,
  tin_verification_date TIMESTAMP WITH TIME ZONE,
  
  -- FMCSA Information
  dot_number TEXT,
  mc_number TEXT,
  fmcsa_verified BOOLEAN DEFAULT FALSE,
  fmcsa_verification_date TIMESTAMP WITH TIME ZONE,
  fmcsa_safety_rating TEXT CHECK (fmcsa_safety_rating IN ('satisfactory', 'conditional', 'unsatisfactory')),
  fmcsa_snapshot_url TEXT,
  fmcsa_last_checked TIMESTAMP WITH TIME ZONE,
  
  -- Business Information
  business_type TEXT,
  industry TEXT,
  years_in_business INTEGER,
  annual_revenue NUMERIC,
  number_of_employees INTEGER,
  
  -- Address Information
  address JSONB NOT NULL,
  
  -- Contact Information
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  website TEXT,
  
  -- Primary Contact
  primary_contact JSONB,
  
  -- Emergency Contact
  emergency_contact JSONB,
  
  -- Onboarding Status
  onboarding_status TEXT DEFAULT 'pending' CHECK (onboarding_status IN ('pending', 'in_progress', 'completed', 'rejected', 'approved')),
  onboarding_score INTEGER DEFAULT 0,
  onboarding_completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Audit Information
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_ein_tin CHECK (ein_tin ~ '^[0-9]{2}-[0-9]{7}$'),
  CONSTRAINT valid_dot_number CHECK (dot_number IS NULL OR dot_number ~ '^[0-9]+$'),
  CONSTRAINT valid_mc_number CHECK (mc_number IS NULL OR mc_number ~ '^MC[0-9]+$')
);

-- Create insurance_certificates table
CREATE TABLE IF NOT EXISTS public.insurance_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Insurance Details
  insurance_type TEXT NOT NULL CHECK (insurance_type IN ('auto_liability', 'cargo', 'workers_comp', 'general_liability', 'umbrella')),
  insurance_provider TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  coverage_amount NUMERIC NOT NULL,
  deductible_amount NUMERIC,
  
  -- Certificate Details
  certificate_number TEXT,
  certificate_url TEXT,
  certificate_uploaded_at TIMESTAMP WITH TIME ZONE,
  
  -- Dates
  effective_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  
  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional Information
  certificate_holder TEXT,
  additional_insured TEXT[],
  waiver_of_subrogation BOOLEAN DEFAULT FALSE,
  broker_listed_as_certificate_holder BOOLEAN DEFAULT FALSE,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending_verification')),
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_coverage_amount CHECK (coverage_amount > 0),
  CONSTRAINT valid_dates CHECK (effective_date <= expiration_date)
);

-- Create legal_acknowledgments table
CREATE TABLE IF NOT EXISTS public.legal_acknowledgments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Agreement Details
  agreement_type TEXT NOT NULL CHECK (agreement_type IN (
    'broker_carrier_agreement', 
    'terms_of_use', 
    'privacy_policy', 
    'communications_consent', 
    'wireless_policy',
    'rate_confirmation_template'
  )),
  agreement_version TEXT NOT NULL,
  agreement_content TEXT,
  agreement_url TEXT,
  
  -- Signature Information
  signed_by UUID NOT NULL REFERENCES auth.users(id),
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  signature_ip TEXT,
  signature_user_agent TEXT,
  
  -- Digital Signature
  digital_signature_hash TEXT,
  signature_verified BOOLEAN DEFAULT FALSE,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'superseded')),
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create equipment_inventory table
CREATE TABLE IF NOT EXISTS public.equipment_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Equipment Information
  equipment_type TEXT NOT NULL CHECK (equipment_type IN (
    'dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'tanker', 
    'box_truck', 'power_only', 'straight_truck', 'other'
  )),
  equipment_count INTEGER NOT NULL DEFAULT 1,
  equipment_details JSONB,
  
  -- Driver Information
  driver_count INTEGER DEFAULT 0,
  driver_qualification_file_url TEXT,
  
  -- Fleet Information
  fleet_size_category TEXT CHECK (fleet_size_category IN ('small', 'medium', 'large')),
  operating_radius_miles INTEGER,
  preferred_lanes TEXT[],
  
  -- Technology
  has_eld BOOLEAN DEFAULT FALSE,
  has_gps_tracking BOOLEAN DEFAULT FALSE,
  has_24_7_dispatch BOOLEAN DEFAULT FALSE,
  has_digital_document_capability BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_equipment_count CHECK (equipment_count > 0),
  CONSTRAINT valid_driver_count CHECK (driver_count >= 0)
);

-- Create payment_setup table
CREATE TABLE IF NOT EXISTS public.payment_setup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Banking Information
  bank_name TEXT,
  account_number_hash TEXT, -- Stored as hash for security
  routing_number TEXT,
  account_type TEXT CHECK (account_type IN ('checking', 'savings')),
  voided_check_url TEXT,
  
  -- Factoring Information
  factoring_company TEXT,
  factoring_letter_url TEXT,
  factoring_account_number TEXT,
  
  -- Remittance Information
  remittance_contact JSONB,
  billing_email TEXT,
  billing_phone TEXT,
  
  -- Payment Preferences
  preferred_payment_method TEXT DEFAULT 'ach' CHECK (preferred_payment_method IN ('ach', 'wire', 'check')),
  payment_terms_days INTEGER DEFAULT 30,
  
  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create compliance_scoring table
CREATE TABLE IF NOT EXISTS public.compliance_scoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Scoring Categories (120 points total)
  fmcsa_match_score INTEGER DEFAULT 0, -- Max 20
  tin_verified_score INTEGER DEFAULT 0, -- Max 15
  company_profile_score INTEGER DEFAULT 0, -- Max 10
  document_uploads_score INTEGER DEFAULT 0, -- Max 10
  insurance_verification_score INTEGER DEFAULT 0, -- Max 20
  legal_consent_score INTEGER DEFAULT 0, -- Max 10
  safety_record_score INTEGER DEFAULT 0, -- Max 10
  equipment_drivers_score INTEGER DEFAULT 0, -- Max 5
  payment_info_score INTEGER DEFAULT 0, -- Max 5
  technology_compliance_score INTEGER DEFAULT 0, -- Max 10
  optional_addons_score INTEGER DEFAULT 0, -- Max 5
  
  -- Total Score
  total_score INTEGER DEFAULT 0,
  
  -- Approval Status
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'auto_approved', 'manual_review', 'rejected')),
  approval_reason TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Risk Assessment
  risk_level TEXT DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high')),
  risk_factors TEXT[],
  
  -- Scoring Details
  scoring_details JSONB,
  last_scored_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_total_score CHECK (total_score >= 0 AND total_score <= 120),
  CONSTRAINT valid_category_scores CHECK (
    fmcsa_match_score >= 0 AND fmcsa_match_score <= 20 AND
    tin_verified_score >= 0 AND tin_verified_score <= 15 AND
    company_profile_score >= 0 AND company_profile_score <= 10 AND
    document_uploads_score >= 0 AND document_uploads_score <= 10 AND
    insurance_verification_score >= 0 AND insurance_verification_score <= 20 AND
    legal_consent_score >= 0 AND legal_consent_score <= 10 AND
    safety_record_score >= 0 AND safety_record_score <= 10 AND
    equipment_drivers_score >= 0 AND equipment_drivers_score <= 5 AND
    payment_info_score >= 0 AND payment_info_score <= 5 AND
    technology_compliance_score >= 0 AND technology_compliance_score <= 10 AND
    optional_addons_score >= 0 AND optional_addons_score <= 5
  )
);

-- Create driver_documents table
CREATE TABLE IF NOT EXISTS public.driver_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Driver Information
  driver_name TEXT NOT NULL,
  driver_license_number TEXT,
  driver_license_state TEXT,
  driver_license_expiry DATE,
  
  -- Documents
  driver_qualification_file_url TEXT,
  medical_certificate_url TEXT,
  drug_test_results_url TEXT,
  background_check_url TEXT,
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional Information
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_review_queue table
CREATE TABLE IF NOT EXISTS public.admin_review_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Review Information
  review_type TEXT NOT NULL CHECK (review_type IN ('manual_approval', 'insurance_review', 'legal_audit', 'compliance_check')),
  review_reason TEXT NOT NULL,
  review_priority TEXT DEFAULT 'normal' CHECK (review_priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE,
  
  -- Review Status
  review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'in_progress', 'completed', 'escalated')),
  review_notes TEXT,
  review_decision TEXT CHECK (review_decision IN ('approved', 'rejected', 'requires_changes')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create compliance_snapshots table for FMCSA record archiving
CREATE TABLE IF NOT EXISTS public.compliance_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.company_profile(id) ON DELETE CASCADE,
  
  -- Snapshot Information
  snapshot_type TEXT NOT NULL CHECK (snapshot_type IN ('fmcsa', 'insurance', 'legal', 'compliance')),
  snapshot_data JSONB NOT NULL,
  snapshot_url TEXT,
  
  -- Verification
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  snapshot_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expiration_date TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_setup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_scoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_review_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_snapshots ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for company_profile
CREATE POLICY "Users can view their own company profile" ON public.company_profile
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own company profile" ON public.company_profile
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own company profile" ON public.company_profile
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all company profiles" ON public.company_profile
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

-- Create RLS policies for insurance_certificates
CREATE POLICY "Users can manage their insurance certificates" ON public.insurance_certificates
  FOR ALL USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all insurance certificates" ON public.insurance_certificates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

-- Create RLS policies for legal_acknowledgments
CREATE POLICY "Users can manage their legal acknowledgments" ON public.legal_acknowledgments
  FOR ALL USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all legal acknowledgments" ON public.legal_acknowledgments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

-- Create RLS policies for equipment_inventory
CREATE POLICY "Users can manage their equipment inventory" ON public.equipment_inventory
  FOR ALL USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for payment_setup
CREATE POLICY "Users can manage their payment setup" ON public.payment_setup
  FOR ALL USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for compliance_scoring
CREATE POLICY "Users can view their own compliance scoring" ON public.compliance_scoring
  FOR SELECT USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all compliance scoring" ON public.compliance_scoring
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

-- Create RLS policies for driver_documents
CREATE POLICY "Users can manage their driver documents" ON public.driver_documents
  FOR ALL USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for admin_review_queue
CREATE POLICY "Admins can manage review queue" ON public.admin_review_queue
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

CREATE POLICY "Users can view their own review queue items" ON public.admin_review_queue
  FOR SELECT USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for compliance_snapshots
CREATE POLICY "Users can view their own compliance snapshots" ON public.compliance_snapshots
  FOR SELECT USING (
    company_profile_id IN (
      SELECT id FROM public.company_profile WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all compliance snapshots" ON public.compliance_snapshots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'broker_admin')
    )
  );

-- Create indexes for performance
CREATE INDEX idx_company_profile_user_id ON public.company_profile(user_id);
CREATE INDEX idx_company_profile_entity_id ON public.company_profile(entity_id);
CREATE INDEX idx_company_profile_onboarding_status ON public.company_profile(onboarding_status);
CREATE INDEX idx_insurance_certificates_company_profile_id ON public.insurance_certificates(company_profile_id);
CREATE INDEX idx_insurance_certificates_expiration_date ON public.insurance_certificates(expiration_date);
CREATE INDEX idx_legal_acknowledgments_company_profile_id ON public.legal_acknowledgments(company_profile_id);
CREATE INDEX idx_compliance_scoring_company_profile_id ON public.compliance_scoring(company_profile_id);
CREATE INDEX idx_compliance_scoring_approval_status ON public.compliance_scoring(approval_status);
CREATE INDEX idx_admin_review_queue_status ON public.admin_review_queue(review_status);
CREATE INDEX idx_admin_review_queue_assigned_to ON public.admin_review_queue(assigned_to);

-- Create functions for automated scoring
CREATE OR REPLACE FUNCTION public.calculate_compliance_score(p_company_profile_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_score INTEGER := 0;
  fmcsa_score INTEGER := 0;
  tin_score INTEGER := 0;
  profile_score INTEGER := 0;
  docs_score INTEGER := 0;
  insurance_score INTEGER := 0;
  legal_score INTEGER := 0;
  safety_score INTEGER := 0;
  equipment_score INTEGER := 0;
  payment_score INTEGER := 0;
  tech_score INTEGER := 0;
  addons_score INTEGER := 0;
BEGIN
  -- FMCSA Match Score (20 points)
  SELECT 
    CASE 
      WHEN fmcsa_verified = true AND fmcsa_safety_rating = 'satisfactory' THEN 20
      WHEN fmcsa_verified = true AND fmcsa_safety_rating = 'conditional' THEN 15
      WHEN fmcsa_verified = true THEN 10
      ELSE 0
    END INTO fmcsa_score
  FROM public.company_profile 
  WHERE id = p_company_profile_id;
  
  -- TIN Verification Score (15 points)
  SELECT 
    CASE 
      WHEN tin_verified = true THEN 15
      ELSE 0
    END INTO tin_score
  FROM public.company_profile 
  WHERE id = p_company_profile_id;
  
  -- Company Profile Score (10 points)
  SELECT 
    CASE 
      WHEN legal_business_name IS NOT NULL AND ein_tin IS NOT NULL AND contact_email IS NOT NULL THEN 10
      WHEN legal_business_name IS NOT NULL OR ein_tin IS NOT NULL OR contact_email IS NOT NULL THEN 5
      ELSE 0
    END INTO profile_score
  FROM public.company_profile 
  WHERE id = p_company_profile_id;
  
  -- Document Uploads Score (10 points)
  SELECT 
    CASE 
      WHEN EXISTS (SELECT 1 FROM public.legal_acknowledgments WHERE company_profile_id = p_company_profile_id) THEN 10
      ELSE 0
    END INTO docs_score
  FROM public.company_profile 
  WHERE id = p_company_profile_id;
  
  -- Insurance Verification Score (20 points)
  SELECT 
    COALESCE(SUM(
      CASE 
        WHEN insurance_type = 'auto_liability' AND coverage_amount >= 1000000 THEN 10
        WHEN insurance_type = 'cargo' AND coverage_amount >= 100000 THEN 5
        WHEN insurance_type = 'general_liability' AND coverage_amount >= 1000000 THEN 5
        ELSE 0
      END
    ), 0) INTO insurance_score
  FROM public.insurance_certificates 
  WHERE company_profile_id = p_company_profile_id AND status = 'active';
  
  -- Legal Consent Score (10 points)
  SELECT 
    CASE 
      WHEN COUNT(*) >= 3 THEN 10
      WHEN COUNT(*) >= 1 THEN 5
      ELSE 0
    END INTO legal_score
  FROM public.legal_acknowledgments 
  WHERE company_profile_id = p_company_profile_id AND status = 'active';
  
  -- Safety Record Score (10 points)
  SELECT 
    CASE 
      WHEN fmcsa_safety_rating = 'satisfactory' THEN 10
      WHEN fmcsa_safety_rating = 'conditional' THEN 5
      ELSE 0
    END INTO safety_score
  FROM public.company_profile 
  WHERE id = p_company_profile_id;
  
  -- Equipment & Drivers Score (5 points)
  SELECT 
    CASE 
      WHEN equipment_count > 0 THEN 5
      ELSE 0
    END INTO equipment_score
  FROM public.equipment_inventory 
  WHERE company_profile_id = p_company_profile_id;
  
  -- Payment Info Score (5 points)
  SELECT 
    CASE 
      WHEN voided_check_url IS NOT NULL OR factoring_letter_url IS NOT NULL THEN 5
      ELSE 0
    END INTO payment_score
  FROM public.payment_setup 
  WHERE company_profile_id = p_company_profile_id;
  
  -- Technology Compliance Score (10 points)
  SELECT 
    CASE 
      WHEN has_eld = true AND has_gps_tracking = true THEN 10
      WHEN has_eld = true OR has_gps_tracking = true THEN 5
      ELSE 0
    END INTO tech_score
  FROM public.equipment_inventory 
  WHERE company_profile_id = p_company_profile_id;
  
  -- Optional Add-ons Score (5 points)
  SELECT 
    CASE 
      WHEN driver_qualification_file_url IS NOT NULL THEN 5
      ELSE 0
    END INTO addons_score
  FROM public.driver_documents 
  WHERE company_profile_id = p_company_profile_id;
  
  -- Calculate total score
  total_score := fmcsa_score + tin_score + profile_score + docs_score + insurance_score + 
                 legal_score + safety_score + equipment_score + payment_score + tech_score + addons_score;
  
  -- Update compliance scoring table
  INSERT INTO public.compliance_scoring (
    company_profile_id,
    fmcsa_match_score,
    tin_verified_score,
    company_profile_score,
    document_uploads_score,
    insurance_verification_score,
    legal_consent_score,
    safety_record_score,
    equipment_drivers_score,
    payment_info_score,
    technology_compliance_score,
    optional_addons_score,
    total_score,
    last_scored_at
  ) VALUES (
    p_company_profile_id,
    fmcsa_score,
    tin_score,
    profile_score,
    docs_score,
    insurance_score,
    legal_score,
    safety_score,
    equipment_score,
    payment_score,
    tech_score,
    addons_score,
    total_score,
    now()
  )
  ON CONFLICT (company_profile_id) DO UPDATE SET
    fmcsa_match_score = EXCLUDED.fmcsa_match_score,
    tin_verified_score = EXCLUDED.tin_verified_score,
    company_profile_score = EXCLUDED.company_profile_score,
    document_uploads_score = EXCLUDED.document_uploads_score,
    insurance_verification_score = EXCLUDED.insurance_verification_score,
    legal_consent_score = EXCLUDED.legal_consent_score,
    safety_record_score = EXCLUDED.safety_record_score,
    equipment_drivers_score = EXCLUDED.equipment_drivers_score,
    payment_info_score = EXCLUDED.payment_info_score,
    technology_compliance_score = EXCLUDED.technology_compliance_score,
    optional_addons_score = EXCLUDED.optional_addons_score,
    total_score = EXCLUDED.total_score,
    last_scored_at = EXCLUDED.last_scored_at;
  
  RETURN total_score;
END;
$$;

-- Create function to check insurance expiration
CREATE OR REPLACE FUNCTION public.check_insurance_expiration()
RETURNS TABLE(
  company_profile_id UUID,
  insurance_id UUID,
  insurance_type TEXT,
  expiration_date DATE,
  days_until_expiry INTEGER
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    ic.company_profile_id,
    ic.id as insurance_id,
    ic.insurance_type,
    ic.expiration_date,
    ic.expiration_date - CURRENT_DATE as days_until_expiry
  FROM public.insurance_certificates ic
  WHERE ic.status = 'active' 
    AND ic.expiration_date <= CURRENT_DATE + INTERVAL '30 days'
    AND ic.expiration_date > CURRENT_DATE;
$$;

-- Create function to auto-approve based on score
CREATE OR REPLACE FUNCTION public.auto_approve_onboarding(p_company_profile_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_score INTEGER;
  approval_status TEXT;
BEGIN
  -- Get current score
  SELECT total_score INTO current_score
  FROM public.compliance_scoring
  WHERE company_profile_id = p_company_profile_id;
  
  -- Determine approval status based on score
  IF current_score >= 100 THEN
    approval_status := 'auto_approved';
  ELSIF current_score >= 70 THEN
    approval_status := 'manual_review';
  ELSE
    approval_status := 'rejected';
  END IF;
  
  -- Update approval status
  UPDATE public.compliance_scoring
  SET 
    approval_status = approval_status,
    approval_reason = CASE 
      WHEN current_score >= 100 THEN 'Auto-approved based on high compliance score'
      WHEN current_score >= 70 THEN 'Requires manual review'
      ELSE 'Score below minimum threshold'
    END
  WHERE company_profile_id = p_company_profile_id;
  
  -- Update company profile status
  UPDATE public.company_profile
  SET 
    onboarding_status = CASE 
      WHEN current_score >= 100 THEN 'approved'
      WHEN current_score >= 70 THEN 'in_progress'
      ELSE 'rejected'
    END,
    onboarding_completed_at = CASE 
      WHEN current_score >= 100 THEN now()
      ELSE NULL
    END
  WHERE id = p_company_profile_id;
  
  -- Add to review queue if manual review needed
  IF current_score >= 70 AND current_score < 100 THEN
    INSERT INTO public.admin_review_queue (
      company_profile_id,
      review_type,
      review_reason,
      review_priority
    ) VALUES (
      p_company_profile_id,
      'manual_approval',
      'Score between 70-99 requires manual review',
      'normal'
    );
  END IF;
  
  RETURN approval_status;
END;
$$;

-- Create triggers for automatic scoring
CREATE OR REPLACE FUNCTION public.trigger_compliance_scoring()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.calculate_compliance_score(NEW.company_profile_id);
  RETURN NEW;
END;
$$;

-- Create triggers for various tables
CREATE TRIGGER trigger_company_profile_scoring
  AFTER INSERT OR UPDATE ON public.company_profile
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_compliance_scoring();

CREATE TRIGGER trigger_insurance_scoring
  AFTER INSERT OR UPDATE ON public.insurance_certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_compliance_scoring();

CREATE TRIGGER trigger_legal_scoring
  AFTER INSERT OR UPDATE ON public.legal_acknowledgments
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_compliance_scoring();

CREATE TRIGGER trigger_equipment_scoring
  AFTER INSERT OR UPDATE ON public.equipment_inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_compliance_scoring();

CREATE TRIGGER trigger_payment_scoring
  AFTER INSERT OR UPDATE ON public.payment_setup
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_compliance_scoring();

-- Create trigger for automatic approval
CREATE OR REPLACE FUNCTION public.trigger_auto_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.total_score >= 100 AND OLD.total_score < 100 THEN
    PERFORM public.auto_approve_onboarding(NEW.company_profile_id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_auto_approval
  AFTER UPDATE ON public.compliance_scoring
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_auto_approval();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
