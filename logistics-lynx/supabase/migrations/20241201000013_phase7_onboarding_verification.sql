-- Phase 7: Onboarding Verification System
-- Migration: 20241201000013_phase7_onboarding_verification.sql
-- Description: Implements Shipper, Broker, and Carrier onboarding with US DOT, FMCSA, and TIN verification

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Onboarding Audit Log Table
CREATE TABLE IF NOT EXISTS onboarding_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('shipper', 'broker', 'carrier')),
    entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    
    -- Identity Information
    legal_business_name TEXT NOT NULL,
    ein_tin TEXT,
    dot_number TEXT,
    mc_number TEXT,
    business_license_url TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    
    -- Verification Results
    fmcsa_verification_status TEXT CHECK (fmcsa_verification_status IN ('pending', 'verified', 'failed', 'not_found')),
    fmcsa_verification_details JSONB,
    tin_verification_status TEXT CHECK (tin_verification_status IN ('pending', 'verified', 'failed', 'not_found')),
    tin_verification_details JSONB,
    cross_validation_status TEXT CHECK (cross_validation_status IN ('pending', 'verified', 'failed', 'mismatch')),
    cross_validation_details JSONB,
    
    -- Overall Status
    overall_status TEXT NOT NULL DEFAULT 'pending' CHECK (overall_status IN ('pending', 'verified', 'failed', 'requires_review')),
    verification_score INTEGER CHECK (verification_score >= 0 AND verification_score <= 100),
    
    -- Compliance Flags
    has_operating_authority BOOLEAN DEFAULT FALSE,
    has_insurance_coverage BOOLEAN DEFAULT FALSE,
    has_safety_rating BOOLEAN DEFAULT FALSE,
    compliance_flags JSONB,
    
    -- Audit Trail
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    verification_attempts INTEGER DEFAULT 0,
    
    -- API Integration Details
    fmcsa_api_response JSONB,
    tin_api_response JSONB,
    api_errors JSONB,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    session_id TEXT
);

-- Verification API Configuration Table
CREATE TABLE IF NOT EXISTS verification_api_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_name TEXT NOT NULL UNIQUE,
    api_endpoint TEXT NOT NULL,
    api_key_encrypted TEXT,
    rate_limit_per_minute INTEGER DEFAULT 60,
    is_active BOOLEAN DEFAULT TRUE,
    last_health_check TIMESTAMPTZ,
    health_check_status TEXT CHECK (health_check_status IN ('healthy', 'degraded', 'down')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verification Request Queue Table
CREATE TABLE IF NOT EXISTS verification_request_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_log_id UUID REFERENCES onboarding_audit_log(id) ON DELETE CASCADE,
    api_name TEXT NOT NULL,
    request_payload JSONB NOT NULL,
    priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'retry')),
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    next_retry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    response_data JSONB,
    error_message TEXT
);

-- Compliance Documents Table
CREATE TABLE IF NOT EXISTS compliance_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('dot_authority', 'mc_authority', 'insurance_certificate', 'safety_rating', 'business_license', 'ein_letter')),
    document_number TEXT,
    document_url TEXT,
    document_hash TEXT,
    expiration_date DATE,
    verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'expired', 'invalid')),
    verification_date TIMESTAMPTZ,
    verification_source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_org_id ON onboarding_audit_log(org_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_entity_type ON onboarding_audit_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_status ON onboarding_audit_log(overall_status);
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_created_at ON onboarding_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_dot_number ON onboarding_audit_log(dot_number);
CREATE INDEX IF NOT EXISTS idx_onboarding_audit_log_ein_tin ON onboarding_audit_log(ein_tin);

CREATE INDEX IF NOT EXISTS idx_verification_request_queue_status ON verification_request_queue(status);
CREATE INDEX IF NOT EXISTS idx_verification_request_queue_priority ON verification_request_queue(priority);
CREATE INDEX IF NOT EXISTS idx_verification_request_queue_next_retry ON verification_request_queue(next_retry_at);

CREATE INDEX IF NOT EXISTS idx_compliance_documents_entity_id ON compliance_documents(entity_id);
CREATE INDEX IF NOT EXISTS idx_compliance_documents_type ON compliance_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_compliance_documents_expiration ON compliance_documents(expiration_date);

-- Row Level Security (RLS) Policies
ALTER TABLE onboarding_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_request_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for onboarding_audit_log
CREATE POLICY "Users can view their own org's onboarding audit logs" ON onboarding_audit_log
    FOR SELECT USING (
        org_id IN (
            SELECT org_id FROM user_organizations 
            WHERE user_id = auth.uid() AND role IN ('admin', 'owner', 'member')
        )
    );

CREATE POLICY "Admins can insert onboarding audit logs" ON onboarding_audit_log
    FOR INSERT WITH CHECK (
        org_id IN (
            SELECT org_id FROM user_organizations 
            WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
        )
    );

CREATE POLICY "Admins can update their org's onboarding audit logs" ON onboarding_audit_log
    FOR UPDATE USING (
        org_id IN (
            SELECT org_id FROM user_organizations 
            WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
        )
    );

-- RLS Policies for verification_api_config (Super Admin only)
CREATE POLICY "Super admins can manage verification API config" ON verification_api_config
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organizations uo
            JOIN organizations o ON uo.org_id = o.id
            WHERE uo.user_id = auth.uid() 
            AND uo.role = 'owner'
            AND o.is_super_admin = TRUE
        )
    );

-- RLS Policies for verification_request_queue (System access only)
CREATE POLICY "System can manage verification request queue" ON verification_request_queue
    FOR ALL USING (TRUE);

-- RLS Policies for compliance_documents
CREATE POLICY "Users can view their org's compliance documents" ON compliance_documents
    FOR SELECT USING (
        org_id IN (
            SELECT org_id FROM user_organizations 
            WHERE user_id = auth.uid() AND role IN ('admin', 'owner', 'member')
        )
    );

CREATE POLICY "Admins can manage their org's compliance documents" ON compliance_documents
    FOR ALL USING (
        org_id IN (
            SELECT org_id FROM user_organizations 
            WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
        )
    );

-- Functions for Verification Logic
CREATE OR REPLACE FUNCTION calculate_verification_score(
    fmcsa_status TEXT,
    tin_status TEXT,
    cross_validation_status TEXT,
    has_operating_authority BOOLEAN,
    has_insurance_coverage BOOLEAN,
    has_safety_rating BOOLEAN
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- FMCSA Verification (30 points)
    CASE fmcsa_status
        WHEN 'verified' THEN score := score + 30;
        WHEN 'not_found' THEN score := score + 15;
        WHEN 'failed' THEN score := score + 0;
        ELSE score := score + 0;
    END CASE;
    
    -- TIN Verification (25 points)
    CASE tin_status
        WHEN 'verified' THEN score := score + 25;
        WHEN 'not_found' THEN score := score + 10;
        WHEN 'failed' THEN score := score + 0;
        ELSE score := score + 0;
    END CASE;
    
    -- Cross Validation (20 points)
    CASE cross_validation_status
        WHEN 'verified' THEN score := score + 20;
        WHEN 'mismatch' THEN score := score + 5;
        WHEN 'failed' THEN score := score + 0;
        ELSE score := score + 0;
    END CASE;
    
    -- Compliance Flags (25 points)
    IF has_operating_authority THEN score := score + 10; END IF;
    IF has_insurance_coverage THEN score := score + 10; END IF;
    IF has_safety_rating THEN score := score + 5; END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to update verification status
CREATE OR REPLACE FUNCTION update_verification_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate verification score
    NEW.verification_score := calculate_verification_score(
        NEW.fmcsa_verification_status,
        NEW.tin_verification_status,
        NEW.cross_validation_status,
        NEW.has_operating_authority,
        NEW.has_insurance_coverage,
        NEW.has_safety_rating
    );
    
    -- Determine overall status based on score
    IF NEW.verification_score >= 80 THEN
        NEW.overall_status := 'verified';
        NEW.verified_at := NOW();
    ELSIF NEW.verification_score >= 50 THEN
        NEW.overall_status := 'requires_review';
    ELSE
        NEW.overall_status := 'failed';
    END IF;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update verification status
CREATE TRIGGER trigger_update_verification_status
    BEFORE UPDATE ON onboarding_audit_log
    FOR EACH ROW
    EXECUTE FUNCTION update_verification_status();

-- Function to queue verification requests
CREATE OR REPLACE FUNCTION queue_verification_requests(audit_log_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Queue FMCSA verification
    INSERT INTO verification_request_queue (audit_log_id, api_name, request_payload, priority)
    VALUES (
        audit_log_id,
        'fmcsa',
        jsonb_build_object(
            'dot_number', (SELECT dot_number FROM onboarding_audit_log WHERE id = audit_log_id),
            'business_name', (SELECT legal_business_name FROM onboarding_audit_log WHERE id = audit_log_id)
        ),
        8
    );
    
    -- Queue TIN verification
    INSERT INTO verification_request_queue (audit_log_id, api_name, request_payload, priority)
    VALUES (
        audit_log_id,
        'tin',
        jsonb_build_object(
            'ein_tin', (SELECT ein_tin FROM onboarding_audit_log WHERE id = audit_log_id),
            'business_name', (SELECT legal_business_name FROM onboarding_audit_log WHERE id = audit_log_id)
        ),
        7
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically queue verification requests on new audit log entry
CREATE OR REPLACE FUNCTION trigger_queue_verification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.overall_status = 'pending' THEN
        PERFORM queue_verification_requests(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_queue_verification_requests
    AFTER INSERT ON onboarding_audit_log
    FOR EACH ROW
    EXECUTE FUNCTION trigger_queue_verification();

-- Seed initial verification API configurations
INSERT INTO verification_api_config (api_name, api_endpoint, rate_limit_per_minute, is_active) VALUES
('fmcsa', 'https://safer.fmcsa.dot.gov/api/v1', 100, TRUE),
('tin', 'https://api.irs.gov/tin-matching', 50, TRUE),
('alloy', 'https://api.alloy.com/v1', 200, TRUE),
('plaid', 'https://api.plaid.com', 300, TRUE);

-- Create views for easier querying
CREATE VIEW onboarding_verification_summary AS
SELECT 
    oal.id,
    oal.org_id,
    oal.entity_type,
    oal.legal_business_name,
    oal.overall_status,
    oal.verification_score,
    oal.fmcsa_verification_status,
    oal.tin_verification_status,
    oal.cross_validation_status,
    oal.has_operating_authority,
    oal.has_insurance_coverage,
    oal.has_safety_rating,
    oal.created_at,
    oal.verified_at,
    oal.verification_attempts,
    o.name as organization_name
FROM onboarding_audit_log oal
JOIN organizations o ON oal.org_id = o.id;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON onboarding_audit_log TO authenticated;
GRANT SELECT ON verification_api_config TO authenticated;
GRANT SELECT, INSERT, UPDATE ON verification_request_queue TO authenticated;
GRANT SELECT, INSERT, UPDATE ON compliance_documents TO authenticated;
GRANT SELECT ON onboarding_verification_summary TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
