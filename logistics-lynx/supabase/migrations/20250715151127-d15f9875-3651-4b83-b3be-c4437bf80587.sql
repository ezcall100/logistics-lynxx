-- Create Document Templates System for Logistics & Trucking
-- This will support Invoice, BOL, and other logistics documentation

-- ==========================================
-- 1. DOCUMENT TEMPLATES TABLE
-- ==========================================

CREATE TABLE public.document_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL, -- 'invoice', 'bol', 'pod', 'rate_confirmation', etc.
  category TEXT NOT NULL DEFAULT 'logistics', -- 'logistics', 'financial', 'compliance', 'operational'
  description TEXT,
  template_data JSONB NOT NULL DEFAULT '{}', -- Template structure and fields
  html_template TEXT, -- HTML template for rendering
  css_styles TEXT, -- CSS styles for the template
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Constraints
  CONSTRAINT template_type_valid CHECK (template_type IN (
    'invoice', 'bill_of_lading', 'delivery_receipt', 'proof_of_delivery',
    'rate_confirmation', 'freight_bill', 'shippers_letter', 'packing_list',
    'commercial_invoice', 'customs_declaration', 'inspection_report',
    'damage_report', 'detention_invoice', 'fuel_surcharge_invoice',
    'accessorial_charges_invoice', 'load_tender', 'carrier_agreement',
    'insurance_certificate', 'safety_audit', 'compliance_report'
  )),
  
  CONSTRAINT category_valid CHECK (category IN (
    'logistics', 'financial', 'compliance', 'operational', 'legal', 'safety'
  ))
);

-- ==========================================
-- 2. GENERATED DOCUMENTS TABLE
-- ==========================================

CREATE TABLE public.generated_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES public.document_templates(id),
  document_number TEXT NOT NULL,
  document_type TEXT NOT NULL,
  shipment_id UUID REFERENCES public.shipments(id),
  company_id UUID REFERENCES public.companies(id),
  generated_data JSONB NOT NULL DEFAULT '{}',
  rendered_html TEXT,
  pdf_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'sent', 'archived')),
  generated_by UUID,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Unique document numbers per type
  UNIQUE(document_type, document_number)
);

-- ==========================================
-- 3. DOCUMENT FIELDS CONFIGURATION
-- ==========================================

CREATE TABLE public.document_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES public.document_templates(id),
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN (
    'text', 'number', 'date', 'currency', 'boolean', 'select', 'textarea',
    'address', 'phone', 'email', 'signature', 'image', 'barcode', 'qr_code'
  )),
  field_label TEXT NOT NULL,
  is_required BOOLEAN DEFAULT false,
  default_value TEXT,
  validation_rules JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ==========================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ==========================================

ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_fields ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 5. CREATE RLS POLICIES
-- ==========================================

-- Document Templates Policies
CREATE POLICY "Authorized users can view document templates" 
ON public.document_templates 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

CREATE POLICY "Authorized users can manage document templates" 
ON public.document_templates 
FOR ALL 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
);

-- Generated Documents Policies
CREATE POLICY "Authorized users can view generated documents" 
ON public.generated_documents 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
    has_role(auth.uid(), 'shipper_admin'::app_role) OR
    has_role(auth.uid(), 'driver'::app_role)
  )
);

CREATE POLICY "Authorized users can manage generated documents" 
ON public.generated_documents 
FOR ALL 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'driver'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
    has_role(auth.uid(), 'driver'::app_role)
  )
);

-- Document Fields Policies
CREATE POLICY "Authorized users can view document fields" 
ON public.document_fields 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
    has_role(auth.uid(), 'shipper_admin'::app_role)
  )
);

CREATE POLICY "Authorized users can manage document fields" 
ON public.document_fields 
FOR ALL 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'super_admin'::app_role) OR 
    has_role(auth.uid(), 'carrier_admin'::app_role) OR 
    has_role(auth.uid(), 'freight_broker_admin'::app_role)
  )
);

-- Service role full access
CREATE POLICY "Service role full access document templates" 
ON public.document_templates 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access generated documents" 
ON public.generated_documents 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access document fields" 
ON public.document_fields 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- ==========================================
-- 6. CREATE INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX idx_document_templates_type ON public.document_templates(template_type);
CREATE INDEX idx_document_templates_category ON public.document_templates(category);
CREATE INDEX idx_document_templates_active ON public.document_templates(is_active) WHERE is_active = true;
CREATE INDEX idx_generated_documents_template ON public.generated_documents(template_id);
CREATE INDEX idx_generated_documents_shipment ON public.generated_documents(shipment_id);
CREATE INDEX idx_generated_documents_company ON public.generated_documents(company_id);
CREATE INDEX idx_generated_documents_type ON public.generated_documents(document_type);
CREATE INDEX idx_generated_documents_status ON public.generated_documents(status);
CREATE INDEX idx_document_fields_template ON public.document_fields(template_id);
CREATE INDEX idx_document_fields_order ON public.document_fields(template_id, display_order);

-- ==========================================
-- 7. CREATE AUTONOMOUS AGENT TASKS
-- ==========================================

-- Task for creating invoice templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_invoice_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Invoice Templates for Logistics Operations',
  'Generate comprehensive invoice templates for freight billing, fuel surcharges, accessorial charges, and detention fees. Include proper formatting, calculations, and compliance requirements.',
  9,
  90,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for creating Bill of Lading templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_bol_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Bill of Lading (BOL) Templates',
  'Generate standard and custom Bill of Lading templates with proper legal language, shipper/consignee details, commodity information, and hazmat compliance fields.',
  10,
  120,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for creating delivery and proof of delivery templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_delivery_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Delivery & Proof of Delivery Templates',
  'Generate delivery receipt and proof of delivery templates with signature fields, damage reporting, delivery conditions, and timestamp tracking.',
  9,
  75,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for creating rate confirmation templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_rate_confirmation_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Rate Confirmation Templates',
  'Generate rate confirmation templates with pricing details, accessorial charges, payment terms, and carrier-broker agreement terms.',
  8,
  60,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for creating compliance and safety templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_compliance_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Compliance & Safety Documentation Templates',
  'Generate templates for inspection reports, damage reports, customs declarations, insurance certificates, and safety audit documents.',
  8,
  90,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for creating operational templates
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'create_operational_templates_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Create Operational Documentation Templates',
  'Generate templates for packing lists, commercial invoices, load tenders, carrier agreements, and shipper letter of instructions.',
  7,
  105,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- Task for template system maintenance
INSERT INTO public.autonomous_tasks (
  task_id, 
  agent_type, 
  portal, 
  task_name, 
  description, 
  priority, 
  estimated_duration_minutes,
  status
) VALUES (
  'maintain_template_system_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'template_generator',
  'admin',
  'Maintain and Update Document Template System',
  'Continuously monitor, update, and improve document templates based on regulatory changes, user feedback, and industry best practices.',
  6,
  45,
  'pending'
) ON CONFLICT (task_id) DO NOTHING;

-- ==========================================
-- 8. UPDATE TRIGGERS
-- ==========================================

-- Update timestamp trigger for document_templates
CREATE TRIGGER update_document_templates_updated_at
BEFORE UPDATE ON public.document_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update timestamp trigger for generated_documents
CREATE TRIGGER update_generated_documents_updated_at
BEFORE UPDATE ON public.generated_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- 9. ADD COMMENTS FOR DOCUMENTATION
-- ==========================================

COMMENT ON TABLE public.document_templates IS 'Document templates for logistics operations including invoices, BOL, POD, etc.';
COMMENT ON TABLE public.generated_documents IS 'Generated documents from templates with specific data';
COMMENT ON TABLE public.document_fields IS 'Field configuration for document templates';
COMMENT ON COLUMN public.document_templates.template_type IS 'Type of document: invoice, bill_of_lading, proof_of_delivery, etc.';
COMMENT ON COLUMN public.document_templates.template_data IS 'JSON structure defining template fields and layout';
COMMENT ON COLUMN public.generated_documents.document_number IS 'Unique document number for tracking';
COMMENT ON COLUMN public.generated_documents.generated_data IS 'Populated data for the generated document';