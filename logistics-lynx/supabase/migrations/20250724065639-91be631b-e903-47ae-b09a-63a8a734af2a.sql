-- Create EDI Trading Partners table
CREATE TABLE public.edi_trading_partners (
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
CREATE TABLE public.edi_document_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_set_code TEXT NOT NULL, -- e.g., '204', '214', '210'
  document_name TEXT NOT NULL, -- e.g., 'Motor Carrier Load Tender', 'Transportation Carrier Shipment Status'
  description TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound', 'both')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Documents table
CREATE TABLE public.edi_documents (
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

-- Create EDI Transactions table
CREATE TABLE public.edi_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL UNIQUE,
  trading_partner_id UUID REFERENCES public.edi_trading_partners(id),
  document_count INTEGER DEFAULT 0,
  batch_size INTEGER DEFAULT 1,
  transmission_status TEXT DEFAULT 'pending' CHECK (transmission_status IN ('pending', 'sent', 'received', 'acknowledged', 'error')),
  control_number TEXT,
  interchange_control_number TEXT,
  functional_group_control_number TEXT,
  transmission_date TIMESTAMP WITH TIME ZONE,
  acknowledgment_received BOOLEAN DEFAULT false,
  error_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  total_segments INTEGER DEFAULT 0,
  processing_time_ms INTEGER,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Mappings table for data transformation
CREATE TABLE public.edi_mappings (
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

-- Create EDI Configuration table
CREATE TABLE public.edi_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_name TEXT NOT NULL,
  config_type TEXT NOT NULL CHECK (config_type IN ('global', 'partner_specific', 'document_specific')),
  entity_id UUID, -- Could reference trading_partner_id or document_type_id
  configuration JSONB NOT NULL DEFAULT '{}',
  environment TEXT DEFAULT 'production' CHECK (environment IN ('development', 'testing', 'production')),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Audit Log table
CREATE TABLE public.edi_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- e.g., 'document_sent', 'document_received', 'mapping_updated'
  entity_type TEXT NOT NULL, -- e.g., 'document', 'trading_partner', 'mapping'
  entity_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Error Log table
CREATE TABLE public.edi_error_logs (
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

-- Enable RLS on all tables
ALTER TABLE public.edi_trading_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_error_logs ENABLE ROW LEVEL SECURITY;

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

-- RLS Policies for EDI Transactions
CREATE POLICY "Admins can manage EDI transactions based on partner access"
ON public.edi_transactions
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    EXISTS (
      SELECT 1 FROM public.edi_trading_partners tp 
      WHERE tp.id = trading_partner_id 
      AND tp.partner_type IN ('carrier', 'broker', 'shipper')
    )
  ) OR
  (
    has_role(auth.uid(), 'shipper_admin'::app_role) AND
    EXISTS (
      SELECT 1 FROM public.edi_trading_partners tp 
      WHERE tp.id = trading_partner_id 
      AND tp.partner_type IN ('shipper', 'carrier', 'broker')
    )
  )
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- RLS Policies for EDI Mappings
CREATE POLICY "Admins can manage EDI mappings"
ON public.edi_mappings
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
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- RLS Policies for EDI Configurations
CREATE POLICY "Admins can manage EDI configurations"
ON public.edi_configurations
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

-- RLS Policies for EDI Audit Logs
CREATE POLICY "Admins can view EDI audit logs"
ON public.edi_audit_logs
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

CREATE POLICY "System can insert EDI audit logs"
ON public.edi_audit_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for EDI Error Logs
CREATE POLICY "Admins can manage EDI error logs"
ON public.edi_error_logs
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
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- Create indexes for better performance
CREATE INDEX idx_edi_documents_trading_partner ON public.edi_documents(trading_partner_id);
CREATE INDEX idx_edi_documents_transaction_set ON public.edi_documents(transaction_set_code);
CREATE INDEX idx_edi_documents_status ON public.edi_documents(status);
CREATE INDEX idx_edi_documents_created_at ON public.edi_documents(created_at);
CREATE INDEX idx_edi_transactions_partner ON public.edi_transactions(trading_partner_id);
CREATE INDEX idx_edi_transactions_status ON public.edi_transactions(transmission_status);
CREATE INDEX idx_edi_audit_logs_entity ON public.edi_audit_logs(entity_type, entity_id);
CREATE INDEX idx_edi_error_logs_status ON public.edi_error_logs(resolution_status);

-- Create triggers for updated_at columns
CREATE TRIGGER update_edi_trading_partners_updated_at
  BEFORE UPDATE ON public.edi_trading_partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_document_types_updated_at
  BEFORE UPDATE ON public.edi_document_types
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_documents_updated_at
  BEFORE UPDATE ON public.edi_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_transactions_updated_at
  BEFORE UPDATE ON public.edi_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_mappings_updated_at
  BEFORE UPDATE ON public.edi_mappings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_configurations_updated_at
  BEFORE UPDATE ON public.edi_configurations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_error_logs_updated_at
  BEFORE UPDATE ON public.edi_error_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();