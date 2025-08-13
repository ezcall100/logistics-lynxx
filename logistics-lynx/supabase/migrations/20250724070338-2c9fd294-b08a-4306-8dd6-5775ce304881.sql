-- ===============================
-- DASHBOARD SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.dashboard_widgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  widget_name TEXT NOT NULL,
  widget_type TEXT NOT NULL CHECK (widget_type IN ('chart', 'metric', 'table', 'map', 'calendar', 'list')),
  widget_config JSONB NOT NULL DEFAULT '{}',
  data_source TEXT NOT NULL,
  refresh_interval_minutes INTEGER DEFAULT 15,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.dashboard_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  dashboard_name TEXT NOT NULL,
  layout_config JSONB NOT NULL DEFAULT '{}',
  widget_positions JSONB NOT NULL DEFAULT '{}',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- SHIPMENTS HUB SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_number TEXT NOT NULL UNIQUE,
  load_id UUID, -- Reference to loads table
  shipper_id UUID REFERENCES public.companies(id),
  consignee_id UUID REFERENCES public.companies(id),
  carrier_id UUID REFERENCES public.companies(id),
  broker_id UUID REFERENCES public.companies(id),
  origin_address JSONB NOT NULL,
  destination_address JSONB NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_pickup TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  shipment_status TEXT DEFAULT 'pending' CHECK (shipment_status IN ('pending', 'assigned', 'in_transit', 'delivered', 'cancelled', 'on_hold')),
  cargo_details JSONB DEFAULT '{}',
  weight_lbs NUMERIC,
  dimensions JSONB DEFAULT '{}',
  special_instructions TEXT,
  tracking_number TEXT,
  temperature_controlled BOOLEAN DEFAULT false,
  hazmat BOOLEAN DEFAULT false,
  insurance_value NUMERIC DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.shipment_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) NOT NULL,
  location JSONB NOT NULL,
  status_update TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  driver_notes TEXT,
  photos JSONB DEFAULT '[]',
  signature_data JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- LOAD BOARD SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.loads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  load_number TEXT NOT NULL UNIQUE,
  shipper_id UUID REFERENCES public.companies(id),
  broker_id UUID REFERENCES public.companies(id),
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip TEXT,
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip TEXT,
  pickup_date TIMESTAMP WITH TIME ZONE NOT NULL,
  delivery_date TIMESTAMP WITH TIME ZONE NOT NULL,
  equipment_type TEXT NOT NULL,
  weight_lbs NUMERIC,
  length_ft NUMERIC,
  load_description TEXT,
  rate_amount NUMERIC NOT NULL,
  rate_type TEXT DEFAULT 'flat' CHECK (rate_type IN ('flat', 'per_mile', 'hourly')),
  miles INTEGER,
  special_requirements JSONB DEFAULT '{}',
  load_status TEXT DEFAULT 'posted' CHECK (load_status IN ('posted', 'assigned', 'in_transit', 'delivered', 'cancelled')),
  assigned_carrier_id UUID REFERENCES public.companies(id),
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.load_bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  load_id UUID REFERENCES public.loads(id) NOT NULL,
  carrier_id UUID REFERENCES public.companies(id) NOT NULL,
  bid_amount NUMERIC NOT NULL,
  bid_notes TEXT,
  bid_status TEXT DEFAULT 'pending' CHECK (bid_status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  bid_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  response_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- NETWORKS SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.network_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  partner_company_id UUID REFERENCES public.companies(id) NOT NULL,
  partnership_type TEXT NOT NULL CHECK (partnership_type IN ('carrier_network', 'broker_network', 'shipper_preferred', 'strategic_alliance')),
  relationship_status TEXT DEFAULT 'active' CHECK (relationship_status IN ('active', 'inactive', 'pending', 'suspended')),
  partnership_terms JSONB DEFAULT '{}',
  preferred_lanes JSONB DEFAULT '{}',
  commission_rate NUMERIC,
  performance_metrics JSONB DEFAULT '{}',
  established_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id, partner_company_id)
);

-- ===============================
-- ASSETS SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_number TEXT NOT NULL UNIQUE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('truck', 'trailer', 'container', 'equipment', 'facility')),
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  make TEXT,
  model TEXT,
  year INTEGER,
  vin_serial TEXT,
  license_plate TEXT,
  current_location JSONB,
  asset_status TEXT DEFAULT 'available' CHECK (asset_status IN ('available', 'in_use', 'maintenance', 'out_of_service', 'retired')),
  specifications JSONB DEFAULT '{}',
  maintenance_schedule JSONB DEFAULT '{}',
  insurance_info JSONB DEFAULT '{}',
  purchase_date DATE,
  purchase_price NUMERIC,
  current_value NUMERIC,
  assigned_driver_id UUID,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.asset_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) NOT NULL,
  maintenance_type TEXT NOT NULL CHECK (maintenance_type IN ('preventive', 'corrective', 'inspection', 'repair')),
  description TEXT NOT NULL,
  scheduled_date DATE,
  completed_date DATE,
  maintenance_status TEXT DEFAULT 'scheduled' CHECK (maintenance_status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  cost NUMERIC DEFAULT 0,
  service_provider TEXT,
  notes TEXT,
  documents JSONB DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- QUOTES SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.companies(id) NOT NULL,
  quote_type TEXT NOT NULL CHECK (quote_type IN ('spot', 'contract', 'lane')),
  origin_address JSONB NOT NULL,
  destination_address JSONB NOT NULL,
  equipment_type TEXT NOT NULL,
  service_type TEXT NOT NULL,
  cargo_details JSONB DEFAULT '{}',
  estimated_weight NUMERIC,
  estimated_dimensions JSONB DEFAULT '{}',
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  quoted_rate NUMERIC NOT NULL,
  rate_breakdown JSONB DEFAULT '{}',
  quote_status TEXT DEFAULT 'draft' CHECK (quote_status IN ('draft', 'sent', 'accepted', 'rejected', 'expired', 'converted')),
  valid_until TIMESTAMP WITH TIME ZONE,
  terms_conditions TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- WORKERS SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_id TEXT NOT NULL UNIQUE,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  worker_type TEXT NOT NULL CHECK (worker_type IN ('driver', 'dispatcher', 'mechanic', 'admin', 'manager', 'customer_service')),
  employment_status TEXT DEFAULT 'active' CHECK (employment_status IN ('active', 'inactive', 'on_leave', 'terminated')),
  hire_date DATE,
  license_info JSONB DEFAULT '{}',
  certifications JSONB DEFAULT '{}',
  contact_info JSONB DEFAULT '{}',
  emergency_contact JSONB DEFAULT '{}',
  performance_metrics JSONB DEFAULT '{}',
  pay_rate NUMERIC,
  pay_type TEXT CHECK (pay_type IN ('hourly', 'salary', 'per_mile', 'commission')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- DOCUMENTS HUB SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('contract', 'invoice', 'bol', 'pod', 'certificate', 'permit', 'insurance', 'other')),
  file_path TEXT,
  file_size INTEGER,
  mime_type TEXT,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('company', 'shipment', 'load', 'asset', 'worker', 'quote')),
  entity_id UUID NOT NULL,
  document_status TEXT DEFAULT 'active' CHECK (document_status IN ('active', 'archived', 'expired', 'superseded')),
  expiry_date DATE,
  tags JSONB DEFAULT '[]',
  access_level TEXT DEFAULT 'private' CHECK (access_level IN ('public', 'private', 'restricted')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- MARKETPLACE SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_title TEXT NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('service', 'equipment', 'load', 'capacity')),
  seller_id UUID REFERENCES public.companies(id) NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC,
  price_type TEXT CHECK (price_type IN ('fixed', 'negotiable', 'auction')),
  location JSONB,
  availability JSONB DEFAULT '{}',
  listing_status TEXT DEFAULT 'active' CHECK (listing_status IN ('active', 'inactive', 'sold', 'expired')),
  images JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- REPORTS HUB SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('operational', 'financial', 'performance', 'compliance', 'custom')),
  report_category TEXT NOT NULL,
  data_source TEXT NOT NULL,
  query_config JSONB NOT NULL DEFAULT '{}',
  parameters JSONB DEFAULT '{}',
  schedule_config JSONB DEFAULT '{}',
  is_scheduled BOOLEAN DEFAULT false,
  output_format TEXT DEFAULT 'pdf' CHECK (output_format IN ('pdf', 'excel', 'csv', 'json')),
  recipients JSONB DEFAULT '[]',
  last_run TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- FINANCIALS SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  invoice_type TEXT NOT NULL CHECK (invoice_type IN ('carrier_invoice', 'customer_invoice', 'vendor_invoice')),
  entity_id UUID NOT NULL, -- Reference to company
  load_id UUID REFERENCES public.loads(id),
  shipment_id UUID REFERENCES public.shipments(id),
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  paid_amount NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'overdue', 'cancelled')),
  payment_terms TEXT,
  line_items JSONB DEFAULT '[]',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_number TEXT NOT NULL UNIQUE,
  invoice_id UUID REFERENCES public.invoices(id),
  payer_id UUID NOT NULL, -- Reference to company or user
  payment_method TEXT NOT NULL CHECK (payment_method IN ('check', 'ach', 'wire', 'credit_card', 'factoring')),
  payment_amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  reference_number TEXT,
  payment_status TEXT DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================
-- API DASHBOARD SYSTEM
-- ===============================

CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key_name TEXT NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  key_type TEXT DEFAULT 'standard' CHECK (key_type IN ('standard', 'premium', 'enterprise')),
  permissions JSONB DEFAULT '{}',
  rate_limit_per_hour INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.api_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_id UUID REFERENCES public.api_keys(id),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  request_data JSONB,
  response_status INTEGER,
  response_time_ms INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);