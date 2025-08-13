-- Add missing RLS policies for EDI Documents
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
    WHERE tp.id = edi_documents.trading_partner_id 
    AND tp.partner_type IN ('carrier', 'broker', 'shipper')
  )
)
WITH CHECK (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = edi_documents.trading_partner_id 
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
    WHERE tp.id = edi_documents.trading_partner_id 
    AND tp.partner_type IN ('shipper', 'carrier', 'broker')
  )
)
WITH CHECK (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  EXISTS (
    SELECT 1 FROM public.edi_trading_partners tp 
    WHERE tp.id = edi_documents.trading_partner_id 
    AND tp.partner_type = 'shipper'
  )
);

-- Add missing RLS policies for EDI Mappings
DROP POLICY IF EXISTS "Admins can manage EDI mappings" ON public.edi_mappings;
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

-- Add RLS policies for existing EDI tables that might be missing policies
ALTER TABLE public.edi_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edi_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for existing EDI Transactions
DROP POLICY IF EXISTS "Admins can manage EDI transactions" ON public.edi_transactions;
CREATE POLICY "Admins can manage EDI transactions"
ON public.edi_transactions
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

-- RLS Policies for existing EDI Configurations
DROP POLICY IF EXISTS "Admins can manage EDI configurations" ON public.edi_configurations;
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

-- RLS Policies for existing EDI Audit Logs
DROP POLICY IF EXISTS "Admins can view EDI audit logs" ON public.edi_audit_logs;
DROP POLICY IF EXISTS "System can insert EDI audit logs" ON public.edi_audit_logs;

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_edi_documents_trading_partner ON public.edi_documents(trading_partner_id);
CREATE INDEX IF NOT EXISTS idx_edi_documents_transaction_set ON public.edi_documents(transaction_set_code);
CREATE INDEX IF NOT EXISTS idx_edi_documents_status ON public.edi_documents(status);
CREATE INDEX IF NOT EXISTS idx_edi_documents_created_at ON public.edi_documents(created_at);
CREATE INDEX IF NOT EXISTS idx_edi_trading_partners_type ON public.edi_trading_partners(partner_type);
CREATE INDEX IF NOT EXISTS idx_edi_trading_partners_status ON public.edi_trading_partners(status);
CREATE INDEX IF NOT EXISTS idx_edi_mappings_partner ON public.edi_mappings(trading_partner_id);