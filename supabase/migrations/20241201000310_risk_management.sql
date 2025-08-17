-- Phase 7.3: Carrier & Broker Compliant Risk Management Onboarding
-- Migration: 20241201000310_risk_management.sql
-- Purpose: Implement comprehensive risk management framework for carrier and broker onboarding

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Company Profile Table (extended from existing)
CREATE TABLE IF NOT EXISTS company_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('carrier', 'broker', 'shipper')),
    legal_business_name VARCHAR(255) NOT NULL,
    dba_name VARCHAR(255),
    dot_number VARCHAR(20),
    mc_number VARCHAR(20),
    ein_tin VARCHAR(20),
    business_address TEXT NOT NULL,
    business_city VARCHAR(100) NOT NULL,
    business_state VARCHAR(2) NOT NULL,
    business_zip VARCHAR(10) NOT NULL,
    business_phone VARCHAR(20) NOT NULL,
    business_email VARCHAR(255) NOT NULL,
    primary_contact_name VARCHAR(255) NOT NULL,
    primary_contact_phone VARCHAR(20),
    primary_contact_email VARCHAR(255),
    years_in_business INTEGER,
    number_of_employees INTEGER,
    annual_revenue_range VARCHAR(50),
    business_license_number VARCHAR(100),
    business_license_expiry DATE,
    operating_authority_document_url TEXT,
    w9_document_url TEXT,
    fmcsa_snapshot_url TEXT,
    fmcsa_safety_rating VARCHAR(20),
    fmcsa_operating_status VARCHAR(20),
    fmcsa_last_updated TIMESTAMP WITH TIME ZONE,
    compliance_score INTEGER DEFAULT 0,
    risk_level VARCHAR(20) DEFAULT 'pending' CHECK (risk_level IN ('low', 'medium', 'high', 'pending')),
    onboarding_status VARCHAR(20) DEFAULT 'pending' CHECK (onboarding_status IN ('pending', 'in_progress', 'completed', 'rejected', 'manual_review')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_company_profile_user_id (user_id),
    INDEX idx_company_profile_entity_type (entity_type),
    INDEX idx_company_profile_dot_number (dot_number),
    INDEX idx_company_profile_mc_number (mc_number),
    INDEX idx_company_profile_onboarding_status (onboarding_status)
);

-- Insurance Certificates Table
CREATE TABLE IF NOT EXISTS insurance_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    insurance_type VARCHAR(50) NOT NULL CHECK (insurance_type IN ('auto_liability', 'cargo', 'workers_comp', 'general_liability', 'umbrella', 'hazmat')),
    insurance_provider VARCHAR(255) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    coverage_amount DECIMAL(15,2) NOT NULL,
    deductible_amount DECIMAL(15,2),
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    certificate_holder VARCHAR(255),
    additional_insured_endorsement BOOLEAN DEFAULT false,
    waiver_of_subrogation BOOLEAN DEFAULT false,
    document_url TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Ensure unique policy per user per type
    UNIQUE(user_id, insurance_type, policy_number),
    
    -- Indexes for performance
    INDEX idx_insurance_certificates_user_id (user_id),
    INDEX idx_insurance_certificates_expiration_date (expiration_date),
    INDEX idx_insurance_certificates_is_verified (is_verified)
);

-- Equipment Inventory Table
CREATE TABLE IF NOT EXISTS equipment_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    equipment_type VARCHAR(50) NOT NULL CHECK (equipment_type IN ('power_unit', 'trailer', 'container', 'specialized')),
    equipment_category VARCHAR(50) NOT NULL CHECK (equipment_category IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'power_only', 'container_chassis', 'tanker', 'bulk', 'specialized')),
    equipment_count INTEGER NOT NULL,
    equipment_details JSONB,
    average_age_years DECIMAL(3,1),
    eld_compliant BOOLEAN DEFAULT false,
    gps_tracking BOOLEAN DEFAULT false,
    maintenance_program VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_equipment_inventory_user_id (user_id),
    INDEX idx_equipment_inventory_equipment_type (equipment_type)
);

-- Driver Documents Table
CREATE TABLE IF NOT EXISTS driver_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    driver_name VARCHAR(255) NOT NULL,
    driver_license_number VARCHAR(50),
    driver_license_state VARCHAR(2),
    driver_license_expiry DATE,
    cdl_class VARCHAR(10),
    cdl_endorsements TEXT[],
    medical_certificate_expiry DATE,
    drug_test_date DATE,
    drug_test_result VARCHAR(20),
    background_check_date DATE,
    background_check_result VARCHAR(20),
    hazmat_endorsement BOOLEAN DEFAULT false,
    twic_card BOOLEAN DEFAULT false,
    twic_expiry DATE,
    document_urls JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_driver_documents_user_id (user_id),
    INDEX idx_driver_documents_driver_license_expiry (driver_license_expiry),
    INDEX idx_driver_documents_medical_certificate_expiry (medical_certificate_expiry)
);

-- Payment Setup Table
CREATE TABLE IF NOT EXISTS payment_setup (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('ach', 'wire', 'check', 'factoring')),
    bank_name VARCHAR(255),
    account_number_hash TEXT,
    routing_number VARCHAR(20),
    account_type VARCHAR(20),
    factoring_company VARCHAR(255),
    factoring_agreement_url TEXT,
    remittance_contact_name VARCHAR(255),
    remittance_contact_email VARCHAR(255),
    remittance_contact_phone VARCHAR(20),
    payment_terms_days INTEGER DEFAULT 30,
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_payment_setup_user_id (user_id),
    INDEX idx_payment_setup_payment_method (payment_method)
);

-- Compliance Scoring Table
CREATE TABLE IF NOT EXISTS compliance_scoring (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    fmcsa_score INTEGER DEFAULT 0,
    tin_score INTEGER DEFAULT 0,
    company_profile_score INTEGER DEFAULT 0,
    document_upload_score INTEGER DEFAULT 0,
    insurance_score INTEGER DEFAULT 0,
    legal_consent_score INTEGER DEFAULT 0,
    safety_record_score INTEGER DEFAULT 0,
    equipment_score INTEGER DEFAULT 0,
    payment_score INTEGER DEFAULT 0,
    technology_score INTEGER DEFAULT 0,
    optional_addons_score INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    risk_assessment VARCHAR(20) DEFAULT 'pending',
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'auto_approved', 'manual_review', 'rejected')),
    review_notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_compliance_scoring_user_id (user_id),
    INDEX idx_compliance_scoring_total_score (total_score),
    INDEX idx_compliance_scoring_approval_status (approval_status)
);

-- Admin Review Queue Table
CREATE TABLE IF NOT EXISTS admin_review_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES company_profile(id) ON DELETE CASCADE,
    review_type VARCHAR(50) NOT NULL CHECK (review_type IN ('onboarding', 'insurance_expiry', 'fmcsa_alert', 'compliance_issue', 'document_verification')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'resolved', 'escalated')),
    assigned_to UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    due_date TIMESTAMP WITH TIME ZONE,
    review_data JSONB,
    admin_notes TEXT,
    resolution_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_admin_review_queue_user_id (user_id),
    INDEX idx_admin_review_queue_status (status),
    INDEX idx_admin_review_queue_priority (priority),
    INDEX idx_admin_review_queue_assigned_to (assigned_to)
);

-- Row Level Security Policies

-- Company Profile RLS
ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own company profile" ON company_profile
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can read all company profiles" ON company_profile
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Insurance Certificates RLS
ALTER TABLE insurance_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own insurance certificates" ON insurance_certificates
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can read all insurance certificates" ON insurance_certificates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Equipment Inventory RLS
ALTER TABLE equipment_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own equipment inventory" ON equipment_inventory
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can read all equipment inventory" ON equipment_inventory
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Driver Documents RLS
ALTER TABLE driver_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own driver documents" ON driver_documents
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can read all driver documents" ON driver_documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Payment Setup RLS
ALTER TABLE payment_setup ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own payment setup" ON payment_setup
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can read all payment setup" ON payment_setup
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Compliance Scoring RLS
ALTER TABLE compliance_scoring ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own compliance scoring" ON compliance_scoring
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all compliance scoring" ON compliance_scoring
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Admin Review Queue RLS
ALTER TABLE admin_review_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own review queue items" ON admin_review_queue
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all review queue items" ON admin_review_queue
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Functions and Triggers

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_risk_management_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for all tables
CREATE TRIGGER trigger_update_company_profile_timestamp
    BEFORE UPDATE ON company_profile
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_insurance_certificates_timestamp
    BEFORE UPDATE ON insurance_certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_equipment_inventory_timestamp
    BEFORE UPDATE ON equipment_inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_driver_documents_timestamp
    BEFORE UPDATE ON driver_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_payment_setup_timestamp
    BEFORE UPDATE ON payment_setup
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_compliance_scoring_timestamp
    BEFORE UPDATE ON compliance_scoring
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

CREATE TRIGGER trigger_update_admin_review_queue_timestamp
    BEFORE UPDATE ON admin_review_queue
    FOR EACH ROW
    EXECUTE FUNCTION update_risk_management_timestamp();

-- Function to calculate comprehensive compliance score
CREATE OR REPLACE FUNCTION calculate_comprehensive_compliance_score(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    total_score INTEGER := 0;
    fmcsa_score INTEGER := 0;
    tin_score INTEGER := 0;
    company_profile_score INTEGER := 0;
    document_upload_score INTEGER := 0;
    insurance_score INTEGER := 0;
    legal_consent_score INTEGER := 0;
    safety_record_score INTEGER := 0;
    equipment_score INTEGER := 0;
    payment_score INTEGER := 0;
    technology_score INTEGER := 0;
    optional_addons_score INTEGER := 0;
BEGIN
    -- FMCSA Score (20 points)
    SELECT 
        CASE 
            WHEN cp.fmcsa_operating_status = 'ACTIVE' THEN 15
            WHEN cp.fmcsa_operating_status = 'INACTIVE' THEN 0
            ELSE 5
        END +
        CASE 
            WHEN cp.fmcsa_safety_rating = 'SATISFACTORY' THEN 5
            WHEN cp.fmcsa_safety_rating = 'CONDITIONAL' THEN 2
            ELSE 0
        END
    INTO fmcsa_score
    FROM company_profile cp
    WHERE cp.user_id = user_uuid;
    
    -- TIN Score (15 points) - from existing verification
    SELECT COALESCE(MAX(verification_score), 0)
    INTO tin_score
    FROM onboarding_audit_log
    WHERE user_id = user_uuid AND verification_type = 'tin_verification';
    
    -- Company Profile Score (10 points)
    SELECT 
        CASE WHEN cp.legal_business_name IS NOT NULL THEN 2 ELSE 0 END +
        CASE WHEN cp.dot_number IS NOT NULL THEN 2 ELSE 0 END +
        CASE WHEN cp.mc_number IS NOT NULL THEN 2 ELSE 0 END +
        CASE WHEN cp.ein_tin IS NOT NULL THEN 2 ELSE 0 END +
        CASE WHEN cp.business_license_number IS NOT NULL THEN 2 ELSE 0 END
    INTO company_profile_score
    FROM company_profile cp
    WHERE cp.user_id = user_uuid;
    
    -- Document Upload Score (10 points)
    SELECT 
        CASE WHEN cp.w9_document_url IS NOT NULL THEN 5 ELSE 0 END +
        CASE WHEN cp.operating_authority_document_url IS NOT NULL THEN 5 ELSE 0 END
    INTO document_upload_score
    FROM company_profile cp
    WHERE cp.user_id = user_uuid;
    
    -- Insurance Score (20 points)
    SELECT 
        CASE WHEN COUNT(*) >= 3 THEN 15 ELSE COUNT(*) * 5 END +
        CASE WHEN COUNT(CASE WHEN expiration_date > CURRENT_DATE + INTERVAL '30 days' THEN 1 END) = COUNT(*) THEN 5 ELSE 0 END
    INTO insurance_score
    FROM insurance_certificates ic
    WHERE ic.user_id = user_uuid AND ic.is_verified = true;
    
    -- Legal Consent Score (10 points) - from existing legal acknowledgment
    SELECT COALESCE(MAX(verification_score), 0)
    INTO legal_consent_score
    FROM onboarding_audit_log
    WHERE user_id = user_uuid AND verification_type = 'legal_acknowledgment';
    
    -- Safety Record Score (10 points)
    SELECT 
        CASE 
            WHEN cp.fmcsa_safety_rating = 'SATISFACTORY' THEN 10
            WHEN cp.fmcsa_safety_rating = 'CONDITIONAL' THEN 5
            ELSE 0
        END
    INTO safety_record_score
    FROM company_profile cp
    WHERE cp.user_id = user_uuid;
    
    -- Equipment Score (5 points)
    SELECT 
        CASE WHEN COUNT(*) > 0 THEN 3 ELSE 0 END +
        CASE WHEN COUNT(CASE WHEN eld_compliant = true THEN 1 END) > 0 THEN 2 ELSE 0 END
    INTO equipment_score
    FROM equipment_inventory ei
    WHERE ei.user_id = user_uuid;
    
    -- Payment Score (5 points)
    SELECT 
        CASE WHEN COUNT(*) > 0 THEN 5 ELSE 0 END
    INTO payment_score
    FROM payment_setup ps
    WHERE ps.user_id = user_uuid AND ps.is_verified = true;
    
    -- Technology Score (10 points)
    SELECT 
        CASE WHEN COUNT(CASE WHEN eld_compliant = true THEN 1 END) > 0 THEN 5 ELSE 0 END +
        CASE WHEN COUNT(CASE WHEN gps_tracking = true THEN 1 END) > 0 THEN 5 ELSE 0 END
    INTO technology_score
    FROM equipment_inventory ei
    WHERE ei.user_id = user_uuid;
    
    -- Optional Add-ons Score (5 points)
    SELECT 
        CASE WHEN COUNT(CASE WHEN hazmat_endorsement = true THEN 1 END) > 0 THEN 2 ELSE 0 END +
        CASE WHEN COUNT(CASE WHEN twic_card = true THEN 1 END) > 0 THEN 2 ELSE 0 END +
        CASE WHEN COUNT(CASE WHEN additional_insured_endorsement = true THEN 1 END) > 0 THEN 1 ELSE 0 END
    INTO optional_addons_score
    FROM driver_documents dd
    JOIN insurance_certificates ic ON dd.user_id = ic.user_id
    WHERE dd.user_id = user_uuid;
    
    -- Calculate total score
    total_score := fmcsa_score + tin_score + company_profile_score + document_upload_score + 
                   insurance_score + legal_consent_score + safety_record_score + equipment_score + 
                   payment_score + technology_score + optional_addons_score;
    
    -- Update compliance scoring record
    INSERT INTO compliance_scoring (
        user_id, company_profile_id, fmcsa_score, tin_score, company_profile_score,
        document_upload_score, insurance_score, legal_consent_score, safety_record_score,
        equipment_score, payment_score, technology_score, optional_addons_score, total_score
    )
    SELECT 
        user_uuid, cp.id, fmcsa_score, tin_score, company_profile_score,
        document_upload_score, insurance_score, legal_consent_score, safety_record_score,
        equipment_score, payment_score, technology_score, optional_addons_score, total_score
    FROM company_profile cp
    WHERE cp.user_id = user_uuid
    ON CONFLICT (user_id) DO UPDATE SET
        fmcsa_score = EXCLUDED.fmcsa_score,
        tin_score = EXCLUDED.tin_score,
        company_profile_score = EXCLUDED.company_profile_score,
        document_upload_score = EXCLUDED.document_upload_score,
        insurance_score = EXCLUDED.insurance_score,
        legal_consent_score = EXCLUDED.legal_consent_score,
        safety_record_score = EXCLUDED.safety_record_score,
        equipment_score = EXCLUDED.equipment_score,
        payment_score = EXCLUDED.payment_score,
        technology_score = EXCLUDED.technology_score,
        optional_addons_score = EXCLUDED.optional_addons_score,
        total_score = EXCLUDED.total_score,
        updated_at = NOW();
    
    RETURN total_score;
END;
$$ LANGUAGE plpgsql;

-- Function to check insurance expiration and create alerts
CREATE OR REPLACE FUNCTION check_insurance_expiration()
RETURNS TRIGGER AS $$
BEGIN
    -- If insurance is expiring within 30 days, create admin review item
    IF NEW.expiration_date <= CURRENT_DATE + INTERVAL '30 days' THEN
        INSERT INTO admin_review_queue (
            user_id, company_profile_id, review_type, priority, status, review_data
        )
        SELECT 
            NEW.user_id, NEW.company_profile_id, 'insurance_expiry', 
            CASE 
                WHEN NEW.expiration_date <= CURRENT_DATE + INTERVAL '7 days' THEN 'urgent'
                WHEN NEW.expiration_date <= CURRENT_DATE + INTERVAL '15 days' THEN 'high'
                ELSE 'medium'
            END,
            'pending',
            jsonb_build_object(
                'insurance_type', NEW.insurance_type,
                'policy_number', NEW.policy_number,
                'expiration_date', NEW.expiration_date,
                'days_until_expiry', NEW.expiration_date - CURRENT_DATE
            );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for insurance expiration monitoring
CREATE TRIGGER trigger_check_insurance_expiration
    AFTER INSERT OR UPDATE ON insurance_certificates
    FOR EACH ROW
    EXECUTE FUNCTION check_insurance_expiration();

-- Views for admin dashboards

-- Risk Management Summary View
CREATE OR REPLACE VIEW risk_management_summary AS
SELECT 
    u.email,
    u.id as user_id,
    u.created_at as user_created_at,
    cp.entity_type,
    cp.legal_business_name,
    cp.dot_number,
    cp.mc_number,
    cp.fmcsa_safety_rating,
    cp.fmcsa_operating_status,
    cp.onboarding_status,
    cs.total_score,
    cs.approval_status,
    COUNT(ic.id) as insurance_certificates_count,
    COUNT(CASE WHEN ic.expiration_date <= CURRENT_DATE + INTERVAL '30 days' THEN 1 END) as expiring_insurance_count,
    COUNT(ei.id) as equipment_count,
    COUNT(dd.id) as driver_count,
    COUNT(arq.id) as pending_reviews_count,
    MAX(cp.updated_at) as last_updated_at
FROM auth.users u
LEFT JOIN company_profile cp ON u.id = cp.user_id
LEFT JOIN compliance_scoring cs ON u.id = cs.user_id
LEFT JOIN insurance_certificates ic ON u.id = ic.user_id
LEFT JOIN equipment_inventory ei ON u.id = ei.user_id
LEFT JOIN driver_documents dd ON u.id = dd.user_id
LEFT JOIN admin_review_queue arq ON u.id = arq.user_id AND arq.status = 'pending'
GROUP BY u.id, u.email, u.created_at, cp.entity_type, cp.legal_business_name, cp.dot_number, 
         cp.mc_number, cp.fmcsa_safety_rating, cp.fmcsa_operating_status, cp.onboarding_status,
         cs.total_score, cs.approval_status;

-- Insurance Review Dashboard View
CREATE OR REPLACE VIEW insurance_review_dashboard AS
SELECT 
    u.email,
    u.id as user_id,
    cp.legal_business_name,
    cp.entity_type,
    ic.insurance_type,
    ic.insurance_provider,
    ic.policy_number,
    ic.coverage_amount,
    ic.effective_date,
    ic.expiration_date,
    ic.is_verified,
    ic.verified_by,
    ic.verified_at,
    ic.verification_notes,
    CASE 
        WHEN ic.expiration_date <= CURRENT_DATE THEN 'expired'
        WHEN ic.expiration_date <= CURRENT_DATE + INTERVAL '7 days' THEN 'expiring_urgent'
        WHEN ic.expiration_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'expiring_soon'
        ELSE 'valid'
    END as expiration_status,
    ic.expiration_date - CURRENT_DATE as days_until_expiry
FROM auth.users u
JOIN company_profile cp ON u.id = cp.user_id
JOIN insurance_certificates ic ON u.id = ic.user_id
ORDER BY ic.expiration_date ASC;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON company_profile TO authenticated;
GRANT SELECT, INSERT, UPDATE ON insurance_certificates TO authenticated;
GRANT SELECT, INSERT, UPDATE ON equipment_inventory TO authenticated;
GRANT SELECT, INSERT, UPDATE ON driver_documents TO authenticated;
GRANT SELECT, INSERT, UPDATE ON payment_setup TO authenticated;
GRANT SELECT ON compliance_scoring TO authenticated;
GRANT SELECT ON admin_review_queue TO authenticated;
GRANT SELECT ON risk_management_summary TO authenticated;
GRANT SELECT ON insurance_review_dashboard TO authenticated;

-- Grant admin permissions
GRANT ALL ON company_profile TO service_role;
GRANT ALL ON insurance_certificates TO service_role;
GRANT ALL ON equipment_inventory TO service_role;
GRANT ALL ON driver_documents TO service_role;
GRANT ALL ON payment_setup TO service_role;
GRANT ALL ON compliance_scoring TO service_role;
GRANT ALL ON admin_review_queue TO service_role;
GRANT SELECT ON risk_management_summary TO service_role;
GRANT SELECT ON insurance_review_dashboard TO service_role;

-- Create additional indexes for performance
CREATE INDEX idx_company_profile_entity_type_status ON company_profile(entity_type, onboarding_status);
CREATE INDEX idx_insurance_certificates_verification ON insurance_certificates(is_verified, expiration_date);
CREATE INDEX idx_compliance_scoring_approval ON compliance_scoring(approval_status, total_score);
CREATE INDEX idx_admin_review_queue_priority_status ON admin_review_queue(priority, status);
CREATE INDEX idx_driver_documents_expiry ON driver_documents(driver_license_expiry, medical_certificate_expiry);
