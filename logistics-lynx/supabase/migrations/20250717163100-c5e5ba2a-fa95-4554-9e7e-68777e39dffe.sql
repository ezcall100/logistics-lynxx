-- Create loads table for shipment management
CREATE TABLE public.loads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  load_number TEXT NOT NULL UNIQUE,
  shipper_id UUID REFERENCES public.companies(id),
  carrier_id UUID REFERENCES public.companies(id),
  broker_id UUID REFERENCES public.companies(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  pickup_window JSONB,
  delivery_window JSONB,
  commodity_type TEXT,
  weight NUMERIC,
  volume NUMERIC,
  equipment_type TEXT,
  rate NUMERIC,
  fuel_surcharge NUMERIC,
  accessorial_charges NUMERIC,
  total_cost NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  distance_miles NUMERIC,
  special_instructions TEXT,
  shipper_reference TEXT,
  carrier_reference TEXT,
  temperature_range JSONB,
  hazmat_info JSONB,
  ai_extracted_data JSONB,
  dispatch_notes TEXT,
  assigned_dispatcher UUID,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create carriers table (enhanced from existing companies)
CREATE TABLE public.freight_carriers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id),
  carrier_name TEXT NOT NULL,
  mc_number TEXT UNIQUE,
  dot_number TEXT UNIQUE,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  emergency_contact TEXT,
  equipment_types TEXT[] DEFAULT '{}',
  operating_regions TEXT[] DEFAULT '{}',
  service_areas JSONB,
  capacity_constraints JSONB,
  preferred_lanes TEXT[] DEFAULT '{}',
  insurance_provider TEXT,
  insurance_expiry DATE,
  safety_rating TEXT DEFAULT 'satisfactory',
  performance_score NUMERIC DEFAULT 0,
  availability_status TEXT DEFAULT 'available',
  onboarding_status TEXT DEFAULT 'pending',
  onboarding_date DATE,
  last_load_date DATE,
  total_loads_completed INTEGER DEFAULT 0,
  average_rating NUMERIC DEFAULT 0,
  certifications JSONB DEFAULT '{}',
  banking_info JSONB,
  contract_rates JSONB DEFAULT '{}',
  fuel_card_info JSONB,
  tracking_capabilities JSONB DEFAULT '{}',
  communication_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rates table for dynamic pricing
CREATE TABLE public.freight_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rate_name TEXT NOT NULL,
  origin_zone TEXT NOT NULL,
  destination_zone TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  mode_of_transport TEXT NOT NULL DEFAULT 'truckload',
  base_rate NUMERIC NOT NULL,
  rate_per_mile NUMERIC,
  minimum_rate NUMERIC,
  fuel_surcharge_rate NUMERIC DEFAULT 0,
  accessorial_rates JSONB DEFAULT '{}',
  weight_breaks JSONB DEFAULT '{}',
  distance_breaks JSONB DEFAULT '{}',
  seasonal_adjustments JSONB DEFAULT '{}',
  customer_specific BOOLEAN DEFAULT false,
  customer_id UUID,
  carrier_specific BOOLEAN DEFAULT false,
  carrier_id UUID,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  rate_type TEXT DEFAULT 'standard',
  commodity_restrictions TEXT[] DEFAULT '{}',
  service_level TEXT DEFAULT 'standard',
  transit_time_days INTEGER,
  created_by UUID,
  approved_by UUID,
  approval_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create agreements table for contract management
CREATE TABLE public.freight_agreements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agreement_number TEXT NOT NULL UNIQUE,
  load_id UUID REFERENCES public.loads(id),
  carrier_id UUID REFERENCES public.freight_carriers(id),
  shipper_id UUID REFERENCES public.companies(id),
  broker_id UUID REFERENCES public.companies(id),
  agreement_type TEXT NOT NULL DEFAULT 'load_confirmation',
  template_id TEXT,
  contract_terms JSONB NOT NULL DEFAULT '{}',
  rate_confirmation JSONB,
  pickup_details JSONB,
  delivery_details JSONB,
  liability_coverage JSONB,
  payment_terms JSONB,
  special_conditions TEXT,
  hellosign_request_id TEXT,
  hellosign_signature_request_id TEXT,
  document_url TEXT,
  signed_document_url TEXT,
  signature_status TEXT DEFAULT 'pending',
  signed_date TIMESTAMP WITH TIME ZONE,
  signers JSONB DEFAULT '[]',
  signature_events JSONB DEFAULT '[]',
  expiry_date DATE,
  auto_renewal BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  created_by UUID,
  sent_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table for billing management
CREATE TABLE public.freight_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  load_id UUID REFERENCES public.loads(id),
  carrier_id UUID REFERENCES public.freight_carriers(id),
  shipper_id UUID REFERENCES public.companies(id),
  broker_id UUID REFERENCES public.companies(id),
  invoice_type TEXT NOT NULL DEFAULT 'freight_bill',
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  payment_terms TEXT DEFAULT 'NET30',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  amount_paid NUMERIC DEFAULT 0,
  balance_due NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  line_items JSONB NOT NULL DEFAULT '[]',
  tax_details JSONB DEFAULT '{}',
  billing_address JSONB,
  shipping_address JSONB,
  payment_method TEXT,
  payment_reference TEXT,
  payment_date DATE,
  payment_status TEXT DEFAULT 'pending',
  invoice_status TEXT DEFAULT 'draft',
  pdf_url TEXT,
  sent_date TIMESTAMP WITH TIME ZONE,
  last_reminder_date TIMESTAMP WITH TIME ZONE,
  reminder_count INTEGER DEFAULT 0,
  collection_status TEXT,
  dispute_status TEXT,
  dispute_notes TEXT,
  quickbooks_id TEXT,
  sage_id TEXT,
  external_invoice_id TEXT,
  notes TEXT,
  created_by UUID,
  approved_by UUID,
  approval_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create call_logs table for communication tracking
CREATE TABLE public.freight_call_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id TEXT UNIQUE,
  twilio_call_sid TEXT UNIQUE,
  caller_number TEXT NOT NULL,
  receiver_number TEXT,
  call_type TEXT DEFAULT 'inbound',
  call_status TEXT,
  call_duration INTEGER,
  call_start_time TIMESTAMP WITH TIME ZONE,
  call_end_time TIMESTAMP WITH TIME ZONE,
  recording_url TEXT,
  recording_duration INTEGER,
  transcription_text TEXT,
  transcription_status TEXT DEFAULT 'pending',
  whisper_transcription JSONB,
  ai_extracted_data JSONB,
  openai_response JSONB,
  extracted_load_details JSONB,
  confidence_score NUMERIC,
  lead_id UUID,
  customer_id UUID REFERENCES public.companies(id),
  load_created BOOLEAN DEFAULT false,
  load_id UUID REFERENCES public.loads(id),
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  call_disposition TEXT,
  agent_notes TEXT,
  call_quality_score INTEGER,
  sentiment_analysis JSONB,
  keywords_extracted TEXT[] DEFAULT '{}',
  priority_level TEXT DEFAULT 'normal',
  callback_requested BOOLEAN DEFAULT false,
  callback_number TEXT,
  callback_time TIMESTAMP WITH TIME ZONE,
  processed_by_ai BOOLEAN DEFAULT false,
  processing_status TEXT DEFAULT 'pending',
  error_messages TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_loads_status ON public.loads(status);
CREATE INDEX idx_loads_pickup_date ON public.loads(pickup_date);
CREATE INDEX idx_loads_carrier_id ON public.loads(carrier_id);
CREATE INDEX idx_loads_shipper_id ON public.loads(shipper_id);
CREATE INDEX idx_loads_load_number ON public.loads(load_number);

CREATE INDEX idx_freight_carriers_mc_number ON public.freight_carriers(mc_number);
CREATE INDEX idx_freight_carriers_availability ON public.freight_carriers(availability_status);
CREATE INDEX idx_freight_carriers_equipment ON public.freight_carriers USING GIN(equipment_types);

CREATE INDEX idx_freight_rates_origin_dest ON public.freight_rates(origin_zone, destination_zone);
CREATE INDEX idx_freight_rates_equipment ON public.freight_rates(equipment_type);
CREATE INDEX idx_freight_rates_effective_date ON public.freight_rates(effective_date);

CREATE INDEX idx_freight_agreements_load_id ON public.freight_agreements(load_id);
CREATE INDEX idx_freight_agreements_status ON public.freight_agreements(signature_status);

CREATE INDEX idx_freight_invoices_payment_status ON public.freight_invoices(payment_status);
CREATE INDEX idx_freight_invoices_due_date ON public.freight_invoices(due_date);
CREATE INDEX idx_freight_invoices_load_id ON public.freight_invoices(load_id);

CREATE INDEX idx_freight_call_logs_caller_number ON public.freight_call_logs(caller_number);
CREATE INDEX idx_freight_call_logs_call_start_time ON public.freight_call_logs(call_start_time);
CREATE INDEX idx_freight_call_logs_transcription_status ON public.freight_call_logs(transcription_status);

-- Enable Row Level Security
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freight_carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freight_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freight_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freight_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freight_call_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loads
CREATE POLICY "Super admins can manage all loads" ON public.loads
FOR ALL USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Freight brokers can manage loads" ON public.loads
FOR ALL USING (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carriers can view assigned loads" ON public.loads
FOR SELECT USING (
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'driver'::app_role)
);

-- RLS Policies for freight_carriers
CREATE POLICY "Super admins can manage all carriers" ON public.freight_carriers
FOR ALL USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Freight brokers can manage carriers" ON public.freight_carriers
FOR ALL USING (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carriers can view own profile" ON public.freight_carriers
FOR SELECT USING (has_role(auth.uid(), 'carrier_admin'::app_role));

-- RLS Policies for freight_rates
CREATE POLICY "Admins can manage rates" ON public.freight_rates
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

-- RLS Policies for freight_agreements
CREATE POLICY "Authorized users can manage agreements" ON public.freight_agreements
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

-- RLS Policies for freight_invoices
CREATE POLICY "Authorized users can manage invoices" ON public.freight_invoices
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

-- RLS Policies for freight_call_logs
CREATE POLICY "Admins can manage call logs" ON public.freight_call_logs
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

-- Create update triggers for updated_at timestamps
CREATE TRIGGER update_loads_updated_at
  BEFORE UPDATE ON public.loads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freight_carriers_updated_at
  BEFORE UPDATE ON public.freight_carriers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freight_rates_updated_at
  BEFORE UPDATE ON public.freight_rates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freight_agreements_updated_at
  BEFORE UPDATE ON public.freight_agreements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freight_invoices_updated_at
  BEFORE UPDATE ON public.freight_invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_freight_call_logs_updated_at
  BEFORE UPDATE ON public.freight_call_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();