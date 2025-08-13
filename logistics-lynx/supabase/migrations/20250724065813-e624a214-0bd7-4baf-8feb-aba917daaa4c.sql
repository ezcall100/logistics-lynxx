-- Create EDI Trading Partners table (if not exists)
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

-- Create EDI Document Types table (if not exists)
CREATE TABLE IF NOT EXISTS public.edi_document_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_set_code TEXT NOT NULL, -- e.g., '204', '214', '210'
  document_name TEXT NOT NULL, -- e.g., 'Motor Carrier Load Tender', 'Transportation Carrier Shipment Status'
  description TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound', 'both')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Documents table (if not exists)
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

-- Create EDI Mappings table for data transformation (if not exists)
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

-- Create EDI Error Log table (if not exists)
CREATE TABLE IF NOT EXISTS public.edi_error_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  error_type TEXT NOT NULL, -- e.g., 'parsing_error', 'validation_error', 'transmission_error'
  error_code TEXT,
  error_message TEXT NOT NULL,
  document_id UUID REFERENCES public.edi_documents(id),
  transaction_id UUID REFERENCES public.edi_transactions(id),
  trading_partner_id UUID REFERENCES public.edi_trading_partners(id),
  error_details JSONB,
  resolution_status TEXT DEFAULT 'open' CHECK (resolution_status IN ('open', 'investigating', 'resolved', 'closed')),
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables (only if they don't already have RLS)
DO $$
BEGIN
  IF NOT (SELECT ROW_SECURITY FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edi_trading_partners') THEN
    ALTER TABLE public.edi_trading_partners ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT (SELECT ROW_SECURITY FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edi_document_types') THEN
    ALTER TABLE public.edi_document_types ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT (SELECT ROW_SECURITY FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edi_documents') THEN
    ALTER TABLE public.edi_documents ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT (SELECT ROW_SECURITY FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edi_mappings') THEN
    ALTER TABLE public.edi_mappings ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT (SELECT ROW_SECURITY FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edi_error_logs') THEN
    ALTER TABLE public.edi_error_logs ENABLE ROW LEVEL SECURITY;
  END IF;
END
$$;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Super admins can manage all EDI trading partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Broker admins can manage EDI trading partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Carrier admins can view and manage carrier-related EDI partners" ON public.edi_trading_partners;
DROP POLICY IF EXISTS "Shipper admins can view and manage shipper-related EDI partners" ON public.edi_trading_partners;

-- RLS Policies for EDI Trading Partners
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

-- RLS Policies for EDI Documents
DROP POLICY IF EXISTS "Super admins can manage all EDI documents" ON public.edi_documents;
DROP POLICY IF EXISTS "Broker admins can manage all EDI documents" ON public.edi_documents;
DROP POLICY IF EXISTS "Carrier admins can manage carrier EDI documents" ON public.edi_documents;
DROP POLICY IF EXISTS "Shipper admins can manage shipper EDI documents" ON public.edi_documents;

CREATE POLICY "Super admins can manage all EDI documents"
ON public.edi_documents
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Broker admins can manage all EDI documents"
ON public.edi_documents
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'freight_broker_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carrier admins can manage carrier EDI documents"
ON public.edi_documents
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = trading_partner_id 
    AND tp.partner_type IN ('carrier', 'broker', 'shipper')
  )
)
WITH CHECK (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = trading_partner_id 
    AND tp.partner_type = 'carrier'
  )
);

CREATE POLICY "Shipper admins can manage shipper EDI documents"
ON public.edi_documents
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = trading_partner_id 
    AND tp.partner_type IN ('shipper', 'carrier', 'broker')
  )
)
WITH CHECK (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = trading_partner_id 
    AND tp.partner_type = 'shipper'
  )
);

-- Create indexes for better performance (if not exist)
CREATE INDEX IF NOT EXISTS idx_edi_documents_trading_partner ON public.edi_documents(trading_partner_id);
CREATE INDEX IF NOT EXISTS idx_edi_documents_transaction_set ON public.edi_documents(transaction_set_code);
CREATE INDEX IF NOT EXISTS idx_edi_documents_status ON public.edi_documents(status);
CREATE INDEX IF NOT EXISTS idx_edi_documents_created_at ON public.edi_documents(created_at);

-- Create triggers for updated_at columns (check if not exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_edi_trading_partners_updated_at') THEN
    CREATE TRIGGER update_edi_trading_partners_updated_at
      BEFORE UPDATE ON public.edi_trading_partners
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_edi_document_types_updated_at') THEN
    CREATE TRIGGER update_edi_document_types_updated_at
      BEFORE UPDATE ON public.edi_document_types
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_edi_documents_updated_at') THEN
    CREATE TRIGGER update_edi_documents_updated_at
      BEFORE UPDATE ON public.edi_documents
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_edi_mappings_updated_at') THEN
    CREATE TRIGGER update_edi_mappings_updated_at
      BEFORE UPDATE ON public.edi_mappings
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_edi_error_logs_updated_at') THEN
    CREATE TRIGGER update_edi_error_logs_updated_at
      BEFORE UPDATE ON public.edi_error_logs
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;