-- Phase 7.2: Legal Acknowledgment & Consent System
-- Migration: 20241201000220_legal_acknowledgment.sql
-- Purpose: Implement legal document acknowledgment and signature tracking for onboarding

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Legal Documents Table (version-controlled legal content)
CREATE TABLE IF NOT EXISTS legal_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('master_agreement', 'terms_of_use', 'privacy_policy', 'communications_consent', 'wireless_policy')),
    version VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    effective_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Ensure unique version per document type
    UNIQUE(document_type, version)
);

-- User Signatures Table (captures signature metadata)
CREATE TABLE IF NOT EXISTS user_signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    signature_type VARCHAR(50) NOT NULL CHECK (signature_type IN ('legal_consent', 'insurance_verification', 'compliance_agreement')),
    full_legal_name VARCHAR(255) NOT NULL,
    signature_data TEXT NOT NULL, -- Base64 encoded signature or e-sign data
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Index for quick lookups
    INDEX idx_user_signatures_user_id (user_id),
    INDEX idx_user_signatures_session_id (session_id),
    INDEX idx_user_signatures_timestamp (timestamp)
);

-- Legal Acknowledgments Table (tracks document acceptance)
CREATE TABLE IF NOT EXISTS legal_acknowledgments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    document_id UUID NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,
    signature_id UUID REFERENCES user_signatures(id) ON DELETE SET NULL,
    acknowledgment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (acknowledgment_status IN ('pending', 'accepted', 'declined', 'expired')),
    ip_address INET,
    user_agent TEXT,
    accepted_at TIMESTAMP WITH TIME ZONE,
    declined_at TIMESTAMP WITH TIME ZONE,
    decline_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Ensure one acknowledgment per user per document version
    UNIQUE(user_id, document_id),
    
    -- Indexes for performance
    INDEX idx_legal_acknowledgments_user_id (user_id),
    INDEX idx_legal_acknowledgments_document_id (document_id),
    INDEX idx_legal_acknowledgments_status (acknowledgment_status),
    INDEX idx_legal_acknowledgments_accepted_at (accepted_at)
);

-- Row Level Security Policies

-- Legal Documents RLS
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Users can read active legal documents
CREATE POLICY "Users can read active legal documents" ON legal_documents
    FOR SELECT USING (is_active = true);

-- Only super admins can manage legal documents
CREATE POLICY "Super admins can manage legal documents" ON legal_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name = 'super_admin'
        )
    );

-- User Signatures RLS
ALTER TABLE user_signatures ENABLE ROW LEVEL SECURITY;

-- Users can read their own signatures
CREATE POLICY "Users can read own signatures" ON user_signatures
    FOR SELECT USING (user_id = auth.uid());

-- Users can create their own signatures
CREATE POLICY "Users can create own signatures" ON user_signatures
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admins can read all signatures
CREATE POLICY "Admins can read all signatures" ON user_signatures
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Legal Acknowledgments RLS
ALTER TABLE legal_acknowledgments ENABLE ROW LEVEL SECURITY;

-- Users can read their own acknowledgments
CREATE POLICY "Users can read own acknowledgments" ON legal_acknowledgments
    FOR SELECT USING (user_id = auth.uid());

-- Users can create their own acknowledgments
CREATE POLICY "Users can create own acknowledgments" ON legal_acknowledgments
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own pending acknowledgments
CREATE POLICY "Users can update own pending acknowledgments" ON legal_acknowledgments
    FOR UPDATE USING (
        user_id = auth.uid() 
        AND acknowledgment_status = 'pending'
    );

-- Admins can read all acknowledgments
CREATE POLICY "Admins can read all acknowledgments" ON legal_acknowledgments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
        )
    );

-- Functions and Triggers

-- Function to update acknowledgment timestamp
CREATE OR REPLACE FUNCTION update_legal_acknowledgment_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for legal_acknowledgments
CREATE TRIGGER trigger_update_legal_acknowledgment_timestamp
    BEFORE UPDATE ON legal_acknowledgments
    FOR EACH ROW
    EXECUTE FUNCTION update_legal_acknowledgment_timestamp();

-- Function to calculate legal consent score
CREATE OR REPLACE FUNCTION calculate_legal_consent_score(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    total_documents INTEGER;
    accepted_documents INTEGER;
    score INTEGER;
BEGIN
    -- Count total required documents for user's entity type
    SELECT COUNT(*) INTO total_documents
    FROM legal_documents ld
    WHERE ld.is_active = true
    AND ld.document_type IN ('master_agreement', 'terms_of_use', 'privacy_policy', 'communications_consent', 'wireless_policy');
    
    -- Count accepted documents
    SELECT COUNT(*) INTO accepted_documents
    FROM legal_acknowledgments la
    JOIN legal_documents ld ON la.document_id = ld.id
    WHERE la.user_id = user_uuid
    AND la.acknowledgment_status = 'accepted'
    AND ld.is_active = true;
    
    -- Calculate score (10 points max, proportional to acceptance)
    IF total_documents > 0 THEN
        score := ROUND((accepted_documents::DECIMAL / total_documents) * 10);
    ELSE
        score := 0;
    END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has completed legal consent
CREATE OR REPLACE FUNCTION has_completed_legal_consent(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    required_count INTEGER;
    accepted_count INTEGER;
BEGIN
    -- Count required documents
    SELECT COUNT(*) INTO required_count
    FROM legal_documents ld
    WHERE ld.is_active = true
    AND ld.document_type IN ('master_agreement', 'terms_of_use', 'privacy_policy', 'communications_consent', 'wireless_policy');
    
    -- Count accepted documents
    SELECT COUNT(*) INTO accepted_count
    FROM legal_acknowledgments la
    JOIN legal_documents ld ON la.document_id = ld.id
    WHERE la.user_id = user_uuid
    AND la.acknowledgment_status = 'accepted'
    AND ld.is_active = true;
    
    RETURN accepted_count >= required_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get legal consent status for user
CREATE OR REPLACE FUNCTION get_legal_consent_status(user_uuid UUID)
RETURNS TABLE(
    document_type VARCHAR(50),
    document_title VARCHAR(255),
    version VARCHAR(20),
    status VARCHAR(20),
    accepted_at TIMESTAMP WITH TIME ZONE,
    signature_id UUID
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ld.document_type,
        ld.title,
        ld.version,
        COALESCE(la.acknowledgment_status, 'pending') as status,
        la.accepted_at,
        la.signature_id
    FROM legal_documents ld
    LEFT JOIN legal_acknowledgments la ON ld.id = la.document_id AND la.user_id = user_uuid
    WHERE ld.is_active = true
    AND ld.document_type IN ('master_agreement', 'terms_of_use', 'privacy_policy', 'communications_consent', 'wireless_policy')
    ORDER BY ld.document_type;
END;
$$ LANGUAGE plpgsql;

-- View for legal audit summary
CREATE OR REPLACE VIEW legal_audit_summary AS
SELECT 
    u.email,
    u.id as user_id,
    u.created_at as user_created_at,
    COUNT(la.id) as total_acknowledgments,
    COUNT(CASE WHEN la.acknowledgment_status = 'accepted' THEN 1 END) as accepted_count,
    COUNT(CASE WHEN la.acknowledgment_status = 'declined' THEN 1 END) as declined_count,
    COUNT(CASE WHEN la.acknowledgment_status = 'pending' THEN 1 END) as pending_count,
    MAX(la.accepted_at) as last_accepted_at,
    MAX(la.updated_at) as last_updated_at,
    calculate_legal_consent_score(u.id) as legal_consent_score,
    has_completed_legal_consent(u.id) as consent_completed
FROM auth.users u
LEFT JOIN legal_acknowledgments la ON u.id = la.user_id
GROUP BY u.id, u.email, u.created_at;

-- Insert initial legal documents
INSERT INTO legal_documents (document_type, version, title, content, effective_date) VALUES
(
    'master_agreement',
    '1.0.0',
    'Master Transportation Services Agreement',
    'This Master Transportation Services Agreement ("Agreement") is entered into as of the date of acceptance by and between [Company Name] ("Customer") and Logistics Lynx ("Provider")...',
    NOW()
),
(
    'terms_of_use',
    '1.0.0',
    'Terms of Use',
    'These Terms of Use ("Terms") govern your use of the Logistics Lynx platform and services. By accessing or using our services, you agree to be bound by these Terms...',
    NOW()
),
(
    'privacy_policy',
    '1.0.0',
    'Privacy Policy',
    'This Privacy Policy describes how Logistics Lynx collects, uses, and protects your personal information when you use our platform and services...',
    NOW()
),
(
    'communications_consent',
    '1.0.0',
    'Communications Consent',
    'By accepting this Communications Consent, you authorize Logistics Lynx to send you communications related to your account, services, and important updates...',
    NOW()
),
(
    'wireless_policy',
    '1.0.0',
    'Wireless Communications Policy',
    'This Wireless Communications Policy outlines the terms and conditions for wireless communications, including SMS, push notifications, and mobile alerts...',
    NOW()
);

-- Grant necessary permissions
GRANT SELECT ON legal_documents TO authenticated;
GRANT SELECT, INSERT ON user_signatures TO authenticated;
GRANT SELECT, INSERT, UPDATE ON legal_acknowledgments TO authenticated;
GRANT SELECT ON legal_audit_summary TO authenticated;

-- Grant admin permissions
GRANT ALL ON legal_documents TO service_role;
GRANT ALL ON user_signatures TO service_role;
GRANT ALL ON legal_acknowledgments TO service_role;
GRANT SELECT ON legal_audit_summary TO service_role;

-- Create indexes for performance
CREATE INDEX idx_legal_documents_type_active ON legal_documents(document_type, is_active);
CREATE INDEX idx_legal_acknowledgments_user_status ON legal_acknowledgments(user_id, acknowledgment_status);
CREATE INDEX idx_user_signatures_type_timestamp ON user_signatures(signature_type, timestamp);
