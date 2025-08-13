-- =====================================================
-- RATES PORTAL DATABASE SCHEMA
-- =====================================================

-- Core rate management tables
CREATE TABLE IF NOT EXISTS rates_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    contract_name VARCHAR(255) NOT NULL,
    contract_number VARCHAR(100) UNIQUE,
    customer_id UUID REFERENCES directory_companies(id),
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'terminated')),
    rate_type VARCHAR(50) NOT NULL CHECK (rate_type IN ('flat', 'per_mile', 'percentage')),
    base_rate DECIMAL(10,2),
    fuel_surcharge_formula_id UUID REFERENCES fuel_formulas(id),
    accessorial_rules JSONB,
    terms_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rates_contract_lanes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES rates_contracts(id) ON DELETE CASCADE,
    origin_city VARCHAR(100) NOT NULL,
    origin_state VARCHAR(2) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    destination_state VARCHAR(2) NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    rate_type VARCHAR(50) DEFAULT 'per_mile' CHECK (rate_type IN ('flat', 'per_mile', 'percentage')),
    equipment_type VARCHAR(50),
    weight_min INTEGER,
    weight_max INTEGER,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rates_spot_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    origin_city VARCHAR(100) NOT NULL,
    origin_state VARCHAR(2) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    destination_state VARCHAR(2) NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    equipment_type VARCHAR(50),
    weight INTEGER,
    quote_date TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    customer_id UUID REFERENCES directory_companies(id),
    carrier_id UUID REFERENCES directory_companies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fuel_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region VARCHAR(100) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    price_per_gallon DECIMAL(5,3) NOT NULL,
    effective_date DATE NOT NULL,
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fuel_formulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    formula_name VARCHAR(255) NOT NULL,
    base_rate DECIMAL(10,2) NOT NULL,
    fuel_surcharge_percentage DECIMAL(5,2),
    fuel_surcharge_cap DECIMAL(10,2),
    fuel_index_region VARCHAR(100),
    fuel_index_type VARCHAR(50),
    formula_expression TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accessorials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    accessorial_name VARCHAR(255) NOT NULL,
    accessorial_code VARCHAR(50) UNIQUE,
    rate_type VARCHAR(50) NOT NULL CHECK (rate_type IN ('flat', 'per_mile', 'percentage', 'per_stop')),
    rate DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    quote_number VARCHAR(100) UNIQUE NOT NULL,
    customer_id UUID REFERENCES directory_companies(id),
    origin_city VARCHAR(100) NOT NULL,
    origin_state VARCHAR(2) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    destination_state VARCHAR(2) NOT NULL,
    equipment_type VARCHAR(50),
    weight INTEGER,
    rate DECIMAL(10,2) NOT NULL,
    fuel_surcharge DECIMAL(10,2),
    accessorials_total DECIMAL(10,2),
    total_rate DECIMAL(10,2) NOT NULL,
    quote_type VARCHAR(50) DEFAULT 'spot' CHECK (quote_type IN ('spot', 'contract')),
    contract_id UUID REFERENCES rates_contracts(id),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
    valid_until TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    accepted_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS quote_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    fuel_surcharge DECIMAL(10,2),
    accessorials_total DECIMAL(10,2),
    total_rate DECIMAL(10,2) NOT NULL,
    changes_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- =====================================================
-- DIRECTORY PORTAL DATABASE SCHEMA
-- =====================================================

CREATE TABLE IF NOT EXISTS directory_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_type VARCHAR(50) NOT NULL CHECK (company_type IN ('carrier', 'shipper', 'broker', 'warehouse', 'factoring', 'other')),
    dba_name VARCHAR(255),
    mc_number VARCHAR(20),
    dot_number VARCHAR(20),
    tax_id VARCHAR(20),
    website VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'USA',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    company_size VARCHAR(50),
    annual_revenue DECIMAL(15,2),
    year_established INTEGER,
    services_offered TEXT[],
    equipment_types TEXT[],
    service_areas TEXT[],
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    verification_date TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS directory_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    directory_company_id UUID REFERENCES directory_companies(id) ON DELETE CASCADE,
    facility_name VARCHAR(255) NOT NULL,
    facility_type VARCHAR(50) NOT NULL CHECK (facility_type IN ('warehouse', 'distribution_center', 'terminal', 'cross_dock', 'fulfillment_center')),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    country VARCHAR(100) DEFAULT 'USA',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    phone VARCHAR(20),
    email VARCHAR(255),
    contact_person VARCHAR(255),
    square_footage INTEGER,
    dock_doors INTEGER,
    storage_capacity DECIMAL(15,2),
    services_offered TEXT[],
    operating_hours JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directory_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    directory_company_id UUID REFERENCES directory_companies(id) ON DELETE CASCADE,
    equipment_type VARCHAR(50) NOT NULL,
    equipment_subtype VARCHAR(50),
    quantity INTEGER NOT NULL,
    specifications JSONB,
    availability_status VARCHAR(50) DEFAULT 'available' CHECK (availability_status IN ('available', 'in_use', 'maintenance', 'out_of_service')),
    location_city VARCHAR(100),
    location_state VARCHAR(2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directory_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    directory_company_id UUID REFERENCES directory_companies(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    email VARCHAR(255),
    is_primary_contact BOOLEAN DEFAULT FALSE,
    contact_type VARCHAR(50) DEFAULT 'general' CHECK (contact_type IN ('general', 'dispatch', 'billing', 'operations', 'sales')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directory_scorecards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    directory_company_id UUID NOT NULL REFERENCES directory_companies(id) ON DELETE CASCADE,
    scorecard_type VARCHAR(50) NOT NULL CHECK (scorecard_type IN ('carrier', 'shipper', 'broker', 'warehouse')),
    overall_rating DECIMAL(3,2),
    on_time_delivery_rate DECIMAL(5,2),
    claims_rate DECIMAL(5,2),
    communication_rating DECIMAL(3,2),
    cost_effectiveness_rating DECIMAL(3,2),
    safety_rating DECIMAL(3,2),
    total_loads INTEGER DEFAULT 0,
    successful_loads INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    average_rate DECIMAL(10,2),
    last_activity_date TIMESTAMP WITH TIME ZONE,
    review_period_start DATE,
    review_period_end DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directory_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    list_name VARCHAR(255) NOT NULL,
    list_type VARCHAR(50) NOT NULL CHECK (list_type IN ('preferred', 'blocked', 'watch', 'custom')),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS directory_list_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    list_id UUID NOT NULL REFERENCES directory_lists(id) ON DELETE CASCADE,
    directory_company_id UUID NOT NULL REFERENCES directory_companies(id) ON DELETE CASCADE,
    added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    added_by UUID REFERENCES users(id),
    notes TEXT,
    UNIQUE(list_id, directory_company_id)
);

CREATE TABLE IF NOT EXISTS directory_docs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id_owner UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    directory_company_id UUID NOT NULL REFERENCES directory_companies(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('coi', 'w9', 'contract', 'license', 'permit', 'other')),
    document_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expiry_date DATE,
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    verification_date TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Rates Portal Indexes
CREATE INDEX IF NOT EXISTS idx_rates_contracts_company_id ON rates_contracts(company_id);
CREATE INDEX IF NOT EXISTS idx_rates_contracts_status ON rates_contracts(status);
CREATE INDEX IF NOT EXISTS idx_rates_contract_lanes_contract_id ON rates_contract_lanes(contract_id);
CREATE INDEX IF NOT EXISTS idx_rates_contract_lanes_route ON rates_contract_lanes(origin_city, origin_state, destination_city, destination_state);
CREATE INDEX IF NOT EXISTS idx_rates_spot_history_company_id ON rates_spot_history(company_id);
CREATE INDEX IF NOT EXISTS idx_rates_spot_history_route ON rates_spot_history(origin_city, origin_state, destination_city, destination_state);
CREATE INDEX IF NOT EXISTS idx_quotes_company_id ON quotes(company_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_id ON quotes(customer_id);

-- Directory Portal Indexes
CREATE INDEX IF NOT EXISTS idx_directory_companies_owner ON directory_companies(company_id_owner);
CREATE INDEX IF NOT EXISTS idx_directory_companies_type ON directory_companies(company_type);
CREATE INDEX IF NOT EXISTS idx_directory_companies_verification ON directory_companies(verification_status);
CREATE INDEX IF NOT EXISTS idx_directory_facilities_owner ON directory_facilities(company_id_owner);
CREATE INDEX IF NOT EXISTS idx_directory_facilities_company ON directory_facilities(directory_company_id);
CREATE INDEX IF NOT EXISTS idx_directory_contacts_company ON directory_contacts(directory_company_id);
CREATE INDEX IF NOT EXISTS idx_directory_scorecards_company ON directory_scorecards(directory_company_id);
CREATE INDEX IF NOT EXISTS idx_directory_list_members_list ON directory_list_members(list_id);
CREATE INDEX IF NOT EXISTS idx_directory_docs_company ON directory_docs(directory_company_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE rates_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rates_contract_lanes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rates_spot_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_versions ENABLE ROW LEVEL SECURITY;

ALTER TABLE directory_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_list_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_docs ENABLE ROW LEVEL SECURITY;

-- Rates Portal RLS Policies
CREATE POLICY "Users can view rates for their company" ON rates_contracts
    FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can manage rates for their company" ON rates_contracts
    FOR ALL USING (is_company_member(company_id));

CREATE POLICY "Users can view contract lanes for their company" ON rates_contract_lanes
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM rates_contracts 
        WHERE rates_contracts.id = rates_contract_lanes.contract_id 
        AND is_company_member(rates_contracts.company_id)
    ));

CREATE POLICY "Users can view spot history for their company" ON rates_spot_history
    FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can view quotes for their company" ON quotes
    FOR SELECT USING (is_company_member(company_id));

-- Directory Portal RLS Policies
CREATE POLICY "Users can view companies they own" ON directory_companies
    FOR SELECT USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can view public companies" ON directory_companies
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage companies they own" ON directory_companies
    FOR ALL USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can view facilities they own" ON directory_facilities
    FOR SELECT USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can view public facilities" ON directory_facilities
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view contacts for companies they own" ON directory_contacts
    FOR SELECT USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can view scorecards for companies they own" ON directory_scorecards
    FOR SELECT USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can view lists they own" ON directory_lists
    FOR SELECT USING (company_id_owner = auth.jwt() ->> 'company_id'::text);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to calculate fuel surcharge
CREATE OR REPLACE FUNCTION calculate_fuel_surcharge(
    base_rate DECIMAL,
    fuel_formula_id UUID,
    distance_miles INTEGER
) RETURNS DECIMAL AS $$
DECLARE
    formula_record RECORD;
    fuel_price DECIMAL;
    surcharge DECIMAL;
BEGIN
    -- Get fuel formula
    SELECT * INTO formula_record FROM fuel_formulas WHERE id = fuel_formula_id;
    
    IF NOT FOUND THEN
        RETURN 0;
    END IF;
    
    -- Get current fuel price (simplified - would need actual fuel index lookup)
    SELECT price_per_gallon INTO fuel_price 
    FROM fuel_index 
    WHERE region = formula_record.fuel_index_region 
    AND fuel_type = formula_record.fuel_index_type
    ORDER BY effective_date DESC LIMIT 1;
    
    IF fuel_price IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Calculate surcharge (simplified formula)
    surcharge := (fuel_price - formula_record.base_rate) * formula_record.fuel_surcharge_percentage / 100 * distance_miles;
    
    -- Apply cap if specified
    IF formula_record.fuel_surcharge_cap IS NOT NULL AND surcharge > formula_record.fuel_surcharge_cap THEN
        surcharge := formula_record.fuel_surcharge_cap;
    END IF;
    
    RETURN GREATEST(surcharge, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get company rating
CREATE OR REPLACE FUNCTION get_company_rating(company_uuid UUID) RETURNS DECIMAL AS $$
DECLARE
    avg_rating DECIMAL;
BEGIN
    SELECT AVG(overall_rating) INTO avg_rating
    FROM directory_scorecards
    WHERE directory_company_id = company_uuid
    AND overall_rating IS NOT NULL;
    
    RETURN COALESCE(avg_rating, 0);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_rates_contracts_updated_at BEFORE UPDATE ON rates_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rates_contract_lanes_updated_at BEFORE UPDATE ON rates_contract_lanes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fuel_formulas_updated_at BEFORE UPDATE ON fuel_formulas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accessorials_updated_at BEFORE UPDATE ON accessorials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_companies_updated_at BEFORE UPDATE ON directory_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_facilities_updated_at BEFORE UPDATE ON directory_facilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_equipment_updated_at BEFORE UPDATE ON directory_equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_contacts_updated_at BEFORE UPDATE ON directory_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_scorecards_updated_at BEFORE UPDATE ON directory_scorecards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_directory_lists_updated_at BEFORE UPDATE ON directory_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
