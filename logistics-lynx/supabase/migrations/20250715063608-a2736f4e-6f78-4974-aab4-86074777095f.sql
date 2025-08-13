-- Enhance the shipments table with additional required fields for a complete TMS
ALTER TABLE public.shipments 
ADD COLUMN IF NOT EXISTS customer_reference TEXT,
ADD COLUMN IF NOT EXISTS equipment_type TEXT DEFAULT 'dry_van',
ADD COLUMN IF NOT EXISTS temperature_range JSONB,
ADD COLUMN IF NOT EXISTS hazmat_info JSONB,
ADD COLUMN IF NOT EXISTS pickup_window JSONB,
ADD COLUMN IF NOT EXISTS delivery_window JSONB,
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id);

-- Create shipment status history table for tracking
CREATE TABLE IF NOT EXISTS public.shipment_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  status_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  location TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shipment documents table
CREATE TABLE IF NOT EXISTS public.shipment_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.shipment_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for shipment_status_history
CREATE POLICY "Authorized users can view shipment status history"
ON public.shipment_status_history FOR SELECT
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role) OR 
  has_role(auth.uid(), 'driver'::app_role)
);

CREATE POLICY "Authorized users can insert shipment status history"
ON public.shipment_status_history FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'driver'::app_role)
);

-- Create RLS policies for shipment_documents
CREATE POLICY "Authorized users can manage shipment documents"
ON public.shipment_documents FOR ALL
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR 
  has_role(auth.uid(), 'carrier_admin'::app_role) OR 
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR 
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_shipment_id ON public.shipment_status_history(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_status_date ON public.shipment_status_history(status_date);
CREATE INDEX IF NOT EXISTS idx_shipment_documents_shipment_id ON public.shipment_documents(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_created_by ON public.shipments(created_by);

-- Create updated_at trigger for new tables
CREATE TRIGGER update_shipment_status_history_updated_at
  BEFORE UPDATE ON public.shipment_status_history
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add some sample equipment types and status values as comments for reference
COMMENT ON COLUMN public.shipments.equipment_type IS 'Equipment types: dry_van, refrigerated, flatbed, step_deck, lowboy, tanker, container';
COMMENT ON COLUMN public.shipments.status IS 'Status values: pending, assigned, picked_up, in_transit, delivered, cancelled';
COMMENT ON COLUMN public.shipment_status_history.status IS 'Status values: pending, assigned, picked_up, in_transit, delivered, cancelled, delayed, exception';