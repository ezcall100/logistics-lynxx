-- Create EDI Trading Partners table
CREATE TABLE IF NOT EXISTS public.edi_trading_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_name TEXT NOT NULL,
  partner_type TEXT NOT NULL CHECK (partner_type IN ('carrier', 'shipper', 'broker', 'customer', 'vendor')),
  edi_id TEXT NOT NULL UNIQUE, -- Trading partner EDI identifier
  qualification TEXT NOT NULL, -- e.g., 'ZZ', 'DUNS', 'SCAC'
  company_id UUID REFERENCES public.companies(id),
  contact_info JSONB DEFAULT '{}',
  supported_transaction_sets TEXT[] DEFAULT '{}', -- e.g., ['204', '214', '210', '990']
  communication_method TEXT DEFAULT 'VAN' CHECK (communication_method IN ('VAN', 'AS2', 'FTP', 'SFTP', 'HTTP')),
  connection_details JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Document Types table
CREATE TABLE IF NOT EXISTS public.edi_document_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_set_code TEXT NOT NULL UNIQUE, -- e.g., '204', '214', '210'
  document_name TEXT NOT NULL, -- e.g., 'Motor Carrier Load Tender', 'Transportation Carrier Shipment Status'
  description TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound', 'both')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Documents table
CREATE TABLE IF NOT EXISTS public.edi_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_number TEXT NOT NULL,
  transaction_set_code TEXT NOT NULL,
  trading_partner_id UUID REFERENCES public.edi_trading_partners(id),
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'error', 'acknowledged', 'rejected')),
  edi_content TEXT, -- Raw EDI content
  json_content JSONB, -- Parsed EDI content in JSON format
  load_id UUID, -- Reference to loads table if applicable
  shipment_id UUID, -- Reference to shipments table if applicable
  invoice_id UUID, -- Reference to invoices table if applicable
  error_details JSONB,
  processing_notes TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  received_at TIMESTAMP WITH TIME ZONE,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Mappings table for data transformation
CREATE TABLE IF NOT EXISTS public.edi_mappings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mapping_name TEXT NOT NULL,
  transaction_set_code TEXT NOT NULL,
  trading_partner_id UUID REFERENCES public.edi_trading_partners(id),
  mapping_type TEXT DEFAULT 'inbound' CHECK (mapping_type IN ('inbound', 'outbound')),
  field_mappings JSONB NOT NULL DEFAULT '{}', -- JSON mapping rules
  transformation_rules JSONB DEFAULT '{}',
  validation_rules JSONB DEFAULT '{}',
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.edi_trading_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_mappings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for EDI Trading Partners
DROP POLICY IF EXISTS "Super admins can manage all EDI trading partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Broker admins can manage EDI trading partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Carrier admins can view and manage carrier-related EDI partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Shipper admins can view and manage shipper-related EDI partners" ON public.edi_trading_partners;

CREATE POLICY "Super admins can manage all EDI trading partners"
ON public.edi_trading_partners
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Broker admins can manage EDI trading partners"
ON public.edi_trading_partners
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'freight_broker_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carrier admins can view and manage carrier-related EDI partners"
ON public.edi_trading_partners
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND 
  (partner_type = 'carrier' OR partner_type = 'broker' OR partner_type = 'shipper')
)
WITH CHECK (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND 
  partner_type = 'carrier'
);

CREATE POLICY "Shipper admins can view and manage shipper-related EDI partners"
ON public.edi_trading_partners
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND 
  (partner_type = 'shipper' OR partner_type = 'carrier' OR partner_type = 'broker')
)
WITH CHECK (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND 
  partner_type = 'shipper'
);

-- RLS Policies for EDI Document Types
DROP POLICY IF EXISTS "Admins can manage EDI document types" ON public.edi_document_types;
CREATE POLICY "Admins can manage EDI document types"
ON public.edi_document_types
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

-- Insert sample EDI document types
INSERT INTO public.edi_document_types (transaction_set_code, document_name, description, direction) VALUES
('204', 'Motor Carrier Load Tender', 'Load tender from shipper/broker to carrier', 'outbound'),
('214', 'Transportation Carrier Shipment Status Message', 'Status updates from carrier to shipper/broker', 'inbound'),
('210', 'Motor Carrier Freight Details and Invoice', 'Invoice from carrier to shipper/broker', 'inbound'),
('990', 'Response to a Load Tender', 'Carrier response to load tender', 'inbound'),
('997', 'Functional Acknowledgment', 'EDI transaction acknowledgment', 'both'),
('856', 'Ship Notice/Manifest', 'Advance ship notice', 'both'),
('850', 'Purchase Order', 'Purchase order document', 'outbound'),
('810', 'Invoice', 'Invoice document', 'inbound')
ON CONFLICT (transaction_set_code) DO NOTHING;