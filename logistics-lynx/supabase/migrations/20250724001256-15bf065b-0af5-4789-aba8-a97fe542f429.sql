-- Create EDI Configuration table for company-specific settings
CREATE TABLE public.edi_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  company_type TEXT NOT NULL CHECK (company_type IN ('carrier', 'broker', 'shipper')),
  edi_enabled BOOLEAN NOT NULL DEFAULT false,
  connection_type TEXT NOT NULL DEFAULT 'api' CHECK (connection_type IN ('api', 'ftp', 'sftp', 'as2', 'van')),
  connection_settings JSONB NOT NULL DEFAULT '{}',
  transaction_sets_enabled TEXT[] NOT NULL DEFAULT '{}',
  test_mode BOOLEAN NOT NULL DEFAULT true,
  auto_acknowledgment BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Partnerships table for trading partner relationships
CREATE TABLE public.edi_partnerships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  initiator_company_id UUID NOT NULL,
  partner_company_id UUID NOT NULL,
  partnership_type TEXT NOT NULL CHECK (partnership_type IN ('carrier_broker', 'broker_shipper', 'carrier_shipper')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
  edi_standard TEXT NOT NULL DEFAULT 'x12' CHECK (edi_standard IN ('x12', 'edifact', 'tradacoms')),
  interchange_id_qualifier TEXT,
  interchange_id TEXT,
  group_id TEXT,
  partnership_agreement JSONB DEFAULT '{}',
  document_types_enabled TEXT[] NOT NULL DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(initiator_company_id, partner_company_id)
);

-- Create EDI Document Templates table
CREATE TABLE public.edi_document_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('204', '990', '214', '210', '997', '824', '856', '850', '855')),
  document_name TEXT NOT NULL,
  template_version TEXT NOT NULL DEFAULT '1.0',
  template_content JSONB NOT NULL,
  field_mappings JSONB NOT NULL DEFAULT '{}',
  validation_rules JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Transactions table for all EDI communications
CREATE TABLE public.edi_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL UNIQUE,
  partnership_id UUID NOT NULL REFERENCES public.edi_partnerships(id),
  document_type TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  sender_company_id UUID NOT NULL,
  receiver_company_id UUID NOT NULL,
  load_id UUID,
  shipment_id UUID,
  invoice_id UUID,
  raw_content TEXT,
  parsed_content JSONB,
  processing_status TEXT NOT NULL DEFAULT 'received' CHECK (processing_status IN ('received', 'processing', 'processed', 'failed', 'acknowledged')),
  error_details JSONB,
  acknowledgment_status TEXT CHECK (acknowledgment_status IN ('pending', 'sent', 'received', 'failed')),
  acknowledgment_details JSONB,
  transmission_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Failed Transactions table for tracking failures
CREATE TABLE public.edi_failed_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.edi_transactions(id),
  failure_type TEXT NOT NULL CHECK (failure_type IN ('tender_rejection', 'invoice_rejection', 'parsing_error', 'validation_error', 'transmission_error')),
  failure_category TEXT NOT NULL CHECK (failure_category IN ('technical', 'business', 'compliance')),
  error_code TEXT,
  error_message TEXT NOT NULL,
  error_details JSONB,
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  resolution_status TEXT NOT NULL DEFAULT 'open' CHECK (resolution_status IN ('open', 'investigating', 'resolved', 'closed')),
  resolution_notes TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  last_retry_at TIMESTAMP WITH TIME ZONE,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  assigned_to UUID,
  resolved_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Matching Rules table for automated processing
CREATE TABLE public.edi_matching_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  rule_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('load_matching', 'rate_matching', 'invoice_matching', 'shipment_matching')),
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  priority INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  auto_execute BOOLEAN NOT NULL DEFAULT false,
  success_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  last_executed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EDI Audit Log table for compliance tracking
CREATE TABLE public.edi_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.edi_transactions(id),
  action_type TEXT NOT NULL CHECK (action_type IN ('create', 'update', 'delete', 'send', 'receive', 'process', 'acknowledge')),
  user_id UUID,
  user_role TEXT,
  company_id UUID NOT NULL,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.edi_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_transactions ENABLE ROW LEVEL SECURITY;
-- Create helper function to get user's company access
CREATE OR REPLACE FUNCTION public.get_user_company_access()
RETURNS TABLE(company_id UUID, company_type TEXT)
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.type 
  FROM public.companies c
  JOIN public.profiles p ON p.user_id = auth.uid()
  WHERE (
    (p.role = 'carrier_admin' AND c.type = 'carrier') OR
    (p.role = 'freight_broker_admin' AND c.type = 'broker') OR
    (p.role = 'shipper_admin' AND c.type = 'shipper') OR
    p.role = 'super_admin'
  );
$$;

ALTER TABLE public.edi_failed_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_matching_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for EDI Configurations
CREATE POLICY "Companies can manage their EDI configurations"
ON public.edi_configurations
FOR ALL
USING (
  is_authenticated_user() AND 
  company_id IN (SELECT company_id FROM public.get_user_company_access())
);

-- Create RLS Policies for EDI Partnerships
CREATE POLICY "Companies can manage their EDI partnerships"
ON public.edi_partnerships
FOR ALL
USING (
  is_authenticated_user() AND (
    initiator_company_id IN (SELECT company_id FROM public.get_user_company_access()) OR
    partner_company_id IN (SELECT company_id FROM public.get_user_company_access())
  )
);

-- Create RLS Policies for EDI Document Templates
CREATE POLICY "Companies can manage their EDI templates"
ON public.edi_document_templates
FOR ALL
USING (
  is_authenticated_user() AND 
  company_id IN (SELECT company_id FROM public.get_user_company_access())
);

-- Create RLS Policies for EDI Transactions
CREATE POLICY "Companies can view their EDI transactions"
ON public.edi_transactions
FOR SELECT
USING (
  is_authenticated_user() AND (
    sender_company_id IN (SELECT company_id FROM public.get_user_company_access()) OR
    receiver_company_id IN (SELECT company_id FROM public.get_user_company_access())
  )
);

-- Create RLS Policies for EDI Failed Transactions
CREATE POLICY "Companies can manage their failed EDI transactions"
ON public.edi_failed_transactions
FOR ALL
USING (
  is_authenticated_user() AND EXISTS (
    SELECT 1 FROM public.edi_transactions t
    WHERE t.id = transaction_id AND (
      t.sender_company_id IN (SELECT company_id FROM public.get_user_company_access()) OR
      t.receiver_company_id IN (SELECT company_id FROM public.get_user_company_access())
    )
  )
);

-- Create RLS Policies for EDI Matching Rules
CREATE POLICY "Companies can manage their EDI matching rules"
ON public.edi_matching_rules
FOR ALL
USING (
  is_authenticated_user() AND 
  company_id IN (SELECT company_id FROM public.get_user_company_access())
);

-- Create RLS Policies for EDI Audit Logs
CREATE POLICY "Companies can view their EDI audit logs"
ON public.edi_audit_logs
FOR SELECT
USING (
  is_authenticated_user() AND 
  company_id IN (SELECT company_id FROM public.get_user_company_access())
);

-- Create indexes for better performance
CREATE INDEX idx_edi_configurations_company ON public.edi_configurations(company_id);
CREATE INDEX idx_edi_partnerships_companies ON public.edi_partnerships(initiator_company_id, partner_company_id);
CREATE INDEX idx_edi_transactions_companies ON public.edi_transactions(sender_company_id, receiver_company_id);
CREATE INDEX idx_edi_transactions_status ON public.edi_transactions(processing_status);
CREATE INDEX idx_edi_transactions_timestamp ON public.edi_transactions(transmission_timestamp);
CREATE INDEX idx_edi_failed_status ON public.edi_failed_transactions(resolution_status);
CREATE INDEX idx_edi_matching_company ON public.edi_matching_rules(company_id);
CREATE INDEX idx_edi_audit_company_timestamp ON public.edi_audit_logs(company_id, timestamp);

-- Create triggers for updated_at columns
CREATE TRIGGER update_edi_configurations_updated_at
  BEFORE UPDATE ON public.edi_configurations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_partnerships_updated_at
  BEFORE UPDATE ON public.edi_partnerships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_document_templates_updated_at
  BEFORE UPDATE ON public.edi_document_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_transactions_updated_at
  BEFORE UPDATE ON public.edi_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_failed_transactions_updated_at
  BEFORE UPDATE ON public.edi_failed_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_edi_matching_rules_updated_at
  BEFORE UPDATE ON public.edi_matching_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();