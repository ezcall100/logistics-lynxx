-- Create comprehensive TMS schema for all portals

-- CRM Tables
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_type TEXT DEFAULT 'shipper',
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  billing_address JSONB DEFAULT '{}',
  shipping_address JSONB DEFAULT '{}',
  payment_terms TEXT DEFAULT 'NET30',
  credit_limit NUMERIC DEFAULT 0,
  customer_status TEXT DEFAULT 'active',
  sales_rep_id UUID,
  customer_since DATE DEFAULT CURRENT_DATE,
  preferred_payment_method TEXT,
  tax_id TEXT,
  industry TEXT,
  company_size TEXT,
  annual_revenue NUMERIC,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_name TEXT NOT NULL,
  vendor_type TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  billing_address JSONB DEFAULT '{}',
  payment_terms TEXT DEFAULT 'NET30',
  tax_id TEXT,
  vendor_status TEXT DEFAULT 'active',
  services_provided TEXT[] DEFAULT '{}',
  contract_details JSONB DEFAULT '{}',
  performance_rating NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.terminals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terminal_name TEXT NOT NULL,
  terminal_code TEXT UNIQUE,
  terminal_type TEXT DEFAULT 'warehouse',
  address JSONB NOT NULL,
  contact_info JSONB DEFAULT '{}',
  operating_hours JSONB DEFAULT '{}',
  capacity_info JSONB DEFAULT '{}',
  equipment_available TEXT[] DEFAULT '{}',
  dock_count INTEGER DEFAULT 0,
  security_level TEXT DEFAULT 'standard',
  temperature_controlled BOOLEAN DEFAULT false,
  hazmat_capable BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_name TEXT NOT NULL,
  location_type TEXT DEFAULT 'pickup_delivery',
  address JSONB NOT NULL,
  coordinates JSONB,
  contact_info JSONB DEFAULT '{}',
  access_instructions TEXT,
  operating_hours JSONB DEFAULT '{}',
  appointment_required BOOLEAN DEFAULT false,
  dock_available BOOLEAN DEFAULT true,
  forklift_available BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Employee & Agent Tables
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  hire_date DATE DEFAULT CURRENT_DATE,
  job_title TEXT,
  department TEXT,
  manager_id UUID,
  employment_status TEXT DEFAULT 'active',
  employment_type TEXT DEFAULT 'full_time',
  salary NUMERIC,
  hourly_rate NUMERIC,
  address JSONB,
  emergency_contact JSONB,
  benefits_eligible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id),
  agent_type TEXT DEFAULT 'dispatcher',
  specialization TEXT[] DEFAULT '{}',
  territory JSONB DEFAULT '{}',
  performance_metrics JSONB DEFAULT '{}',
  commission_rate NUMERIC DEFAULT 0,
  active_loads_limit INTEGER DEFAULT 50,
  current_load_count INTEGER DEFAULT 0,
  certification_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Asset Tables
CREATE TABLE public.units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_number TEXT NOT NULL UNIQUE,
  unit_type TEXT NOT NULL,
  make TEXT,
  model TEXT,
  year INTEGER,
  vin TEXT UNIQUE,
  license_plate TEXT,
  owner_type TEXT DEFAULT 'company',
  owner_id UUID,
  current_driver_id UUID,
  current_location JSONB,
  mileage INTEGER DEFAULT 0,
  fuel_type TEXT DEFAULT 'diesel',
  capacity_weight NUMERIC,
  capacity_volume NUMERIC,
  equipment_features TEXT[] DEFAULT '{}',
  maintenance_schedule JSONB DEFAULT '{}',
  insurance_info JSONB DEFAULT '{}',
  registration_expiry DATE,
  inspection_expiry DATE,
  dot_inspection_date DATE,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.fleet_tracker (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_id UUID REFERENCES public.units(id),
  driver_id UUID REFERENCES public.drivers(id),
  location JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  speed NUMERIC,
  heading NUMERIC,
  odometer NUMERIC,
  fuel_level NUMERIC,
  engine_status TEXT,
  eld_status TEXT,
  hours_of_service JSONB,
  alerts JSONB DEFAULT '[]',
  geofence_events JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.compliance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  compliance_type TEXT NOT NULL,
  document_type TEXT,
  document_url TEXT,
  issue_date DATE,
  expiry_date DATE,
  issuing_authority TEXT,
  compliance_status TEXT DEFAULT 'active',
  renewal_alerts_enabled BOOLEAN DEFAULT true,
  notes TEXT,
  verification_status TEXT DEFAULT 'pending',
  verified_by UUID,
  verified_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.fuel_audit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_id UUID REFERENCES public.units(id),
  driver_id UUID REFERENCES public.drivers(id),
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location JSONB,
  fuel_station TEXT,
  gallons_purchased NUMERIC NOT NULL,
  price_per_gallon NUMERIC NOT NULL,
  total_cost NUMERIC NOT NULL,
  odometer_reading NUMERIC,
  fuel_card_number TEXT,
  receipt_url TEXT,
  transaction_type TEXT DEFAULT 'purchase',
  mpg_calculated NUMERIC,
  trip_id UUID,
  approved_by UUID,
  approval_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Operational Tables
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id),
  load_id UUID REFERENCES public.loads(id),
  shipment_status TEXT DEFAULT 'pending',
  pickup_location_id UUID REFERENCES public.locations(id),
  delivery_location_id UUID REFERENCES public.locations(id),
  pickup_appointment TIMESTAMP WITH TIME ZONE,
  delivery_appointment TIMESTAMP WITH TIME ZONE,
  actual_pickup_time TIMESTAMP WITH TIME ZONE,
  actual_delivery_time TIMESTAMP WITH TIME ZONE,
  commodity_description TEXT,
  total_weight NUMERIC,
  total_pieces INTEGER,
  special_instructions TEXT,
  customer_reference TEXT,
  pro_number TEXT,
  bol_number TEXT,
  tracking_number TEXT,
  insurance_required BOOLEAN DEFAULT false,
  insurance_amount NUMERIC,
  temperature_requirements JSONB,
  created_by UUID,
  assigned_agent_id UUID REFERENCES public.agents(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id),
  quote_type TEXT DEFAULT 'freight',
  pickup_location JSONB NOT NULL,
  delivery_location JSONB NOT NULL,
  service_type TEXT DEFAULT 'truckload',
  equipment_type TEXT,
  commodity_details JSONB,
  weight NUMERIC,
  dimensions JSONB,
  pickup_date DATE,
  delivery_date DATE,
  quoted_rate NUMERIC NOT NULL,
  fuel_surcharge NUMERIC DEFAULT 0,
  accessorial_charges JSONB DEFAULT '{}',
  total_quote NUMERIC NOT NULL,
  quote_validity_days INTEGER DEFAULT 30,
  quote_status TEXT DEFAULT 'pending',
  created_by UUID,
  approved_by UUID,
  approval_date TIMESTAMP WITH TIME ZONE,
  converted_to_load BOOLEAN DEFAULT false,
  load_id UUID REFERENCES public.loads(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  ticket_type TEXT DEFAULT 'support',
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  customer_id UUID REFERENCES public.customers(id),
  load_id UUID REFERENCES public.loads(id),
  shipment_id UUID REFERENCES public.shipments(id),
  subject TEXT NOT NULL,
  description TEXT,
  category TEXT,
  subcategory TEXT,
  assigned_to UUID REFERENCES public.employees(id),
  reported_by UUID,
  resolution TEXT,
  resolution_date TIMESTAMP WITH TIME ZONE,
  escalation_level INTEGER DEFAULT 1,
  due_date TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  customer_satisfaction_rating INTEGER,
  internal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Financial Tables
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_number TEXT NOT NULL UNIQUE,
  invoice_id UUID REFERENCES public.freight_invoices(id),
  customer_id UUID REFERENCES public.customers(id),
  payment_type TEXT DEFAULT 'check',
  payment_method TEXT,
  amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL,
  reference_number TEXT,
  bank_info JSONB,
  processing_fee NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'processed',
  reconciliation_status TEXT DEFAULT 'pending',
  reconciled_date DATE,
  reconciled_by UUID,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.payroll (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id),
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  regular_hours NUMERIC DEFAULT 0,
  overtime_hours NUMERIC DEFAULT 0,
  regular_rate NUMERIC NOT NULL,
  overtime_rate NUMERIC,
  gross_pay NUMERIC NOT NULL,
  federal_tax NUMERIC DEFAULT 0,
  state_tax NUMERIC DEFAULT 0,
  social_security NUMERIC DEFAULT 0,
  medicare NUMERIC DEFAULT 0,
  health_insurance NUMERIC DEFAULT 0,
  retirement_contribution NUMERIC DEFAULT 0,
  other_deductions NUMERIC DEFAULT 0,
  net_pay NUMERIC NOT NULL,
  pay_date DATE,
  pay_method TEXT DEFAULT 'direct_deposit',
  pay_status TEXT DEFAULT 'pending',
  processed_by UUID,
  processed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- API & Integration Tables
CREATE TABLE public.api_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_name TEXT NOT NULL,
  integration_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  api_endpoint TEXT,
  api_version TEXT,
  authentication_type TEXT DEFAULT 'api_key',
  credentials JSONB,
  configuration JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  rate_limit_info JSONB,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_frequency TEXT DEFAULT 'real_time',
  error_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.api_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_id UUID REFERENCES public.api_integrations(id),
  request_type TEXT NOT NULL,
  endpoint TEXT,
  request_payload JSONB,
  response_payload JSONB,
  response_status INTEGER,
  response_time_ms INTEGER,
  error_message TEXT,
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.marketplace_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_category TEXT NOT NULL,
  service_type TEXT,
  provider_name TEXT NOT NULL,
  provider_contact JSONB,
  service_description TEXT,
  pricing_model TEXT DEFAULT 'per_transaction',
  base_price NUMERIC,
  pricing_tiers JSONB DEFAULT '[]',
  coverage_area JSONB,
  features JSONB DEFAULT '{}',
  integration_available BOOLEAN DEFAULT false,
  api_documentation_url TEXT,
  onboarding_requirements JSONB DEFAULT '{}',
  service_status TEXT DEFAULT 'active',
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_customers_status ON public.customers(customer_status);
CREATE INDEX idx_customers_sales_rep ON public.customers(sales_rep_id);
CREATE INDEX idx_employees_department ON public.employees(department);
CREATE INDEX idx_employees_manager ON public.employees(manager_id);
CREATE INDEX idx_units_status ON public.units(status);
CREATE INDEX idx_units_owner ON public.units(owner_id);
CREATE INDEX idx_fleet_tracker_unit_timestamp ON public.fleet_tracker(unit_id, timestamp);
CREATE INDEX idx_compliance_entity ON public.compliance_records(entity_type, entity_id);
CREATE INDEX idx_compliance_expiry ON public.compliance_records(expiry_date);
CREATE INDEX idx_shipments_status ON public.shipments(shipment_status);
CREATE INDEX idx_shipments_customer ON public.shipments(customer_id);
CREATE INDEX idx_quotes_status ON public.quotes(quote_status);
CREATE INDEX idx_quotes_customer ON public.quotes(customer_id);
CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_tickets_assigned ON public.tickets(assigned_to);
CREATE INDEX idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX idx_payroll_employee_period ON public.payroll(employee_id, pay_period_start);
CREATE INDEX idx_api_logs_integration_timestamp ON public.api_logs(integration_id, timestamp);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terminals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for CRM tables
CREATE POLICY "Authorized users can manage customers" ON public.customers
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

CREATE POLICY "Authorized users can manage vendors" ON public.vendors
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

CREATE POLICY "Authorized users can view terminals" ON public.terminals
FOR SELECT USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'driver'::app_role)
);

CREATE POLICY "Authorized users can view locations" ON public.locations
FOR SELECT USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'driver'::app_role)
);

-- RLS Policies for Employee tables
CREATE POLICY "Admins can manage employees" ON public.employees
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

CREATE POLICY "Employees can view own data" ON public.employees
FOR SELECT USING (
  auth.uid()::text = id::text
);

CREATE POLICY "Admins can manage agents" ON public.agents
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

-- RLS Policies for Asset tables
CREATE POLICY "Admins can manage units" ON public.units
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

CREATE POLICY "Drivers can view assigned units" ON public.units
FOR SELECT USING (
  has_role(auth.uid(), 'driver'::app_role) AND current_driver_id = auth.uid()
);

CREATE POLICY "Authorized users can view fleet tracker" ON public.fleet_tracker
FOR SELECT USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

CREATE POLICY "System can insert fleet tracker data" ON public.fleet_tracker
FOR INSERT WITH CHECK (true);

CREATE POLICY "Authorized users can manage compliance" ON public.compliance_records
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

CREATE POLICY "Authorized users can manage fuel audit" ON public.fuel_audit
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

-- RLS Policies for CRM operational tables
CREATE POLICY "Authorized users can manage shipments" ON public.shipments
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

CREATE POLICY "Authorized users can manage quotes" ON public.quotes
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

CREATE POLICY "Authorized users can manage tickets" ON public.tickets
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role)
);

-- RLS Policies for Financial tables
CREATE POLICY "Authorized users can manage payments" ON public.payments
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role)
);

CREATE POLICY "Admins can manage payroll" ON public.payroll
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Employees can view own payroll" ON public.payroll
FOR SELECT USING (
  employee_id = auth.uid()
);

-- RLS Policies for API tables
CREATE POLICY "Admins can manage API integrations" ON public.api_integrations
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Admins can view API logs" ON public.api_logs
FOR SELECT USING (
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "System can insert API logs" ON public.api_logs
FOR INSERT WITH CHECK (true);

CREATE POLICY "All users can view marketplace services" ON public.marketplace_services
FOR SELECT USING (service_status = 'active');

CREATE POLICY "Admins can manage marketplace services" ON public.marketplace_services
FOR ALL USING (
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Create update triggers for updated_at timestamps
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON public.vendors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_terminals_updated_at
  BEFORE UPDATE ON public.terminals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_units_updated_at
  BEFORE UPDATE ON public.units
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_records_updated_at
  BEFORE UPDATE ON public.compliance_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fuel_audit_updated_at
  BEFORE UPDATE ON public.fuel_audit
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payroll_updated_at
  BEFORE UPDATE ON public.payroll
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_api_integrations_updated_at
  BEFORE UPDATE ON public.api_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_services_updated_at
  BEFORE UPDATE ON public.marketplace_services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();