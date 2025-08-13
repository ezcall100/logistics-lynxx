-- Driver Portal Complete Database Schema
-- Creating comprehensive tables for 100% Driver Portal functionality

-- Driver Load Assignments Table
CREATE TABLE IF NOT EXISTS public.driver_loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  load_id UUID NOT NULL,
  assignment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  load_status TEXT CHECK (load_status IN ('assigned', 'en_route_pickup', 'picked_up', 'en_route_delivery', 'delivered', 'completed')) DEFAULT 'assigned',
  miles_driven DECIMAL(10,2),
  fuel_consumed DECIMAL(8,2),
  route_data JSONB,
  estimated_earnings DECIMAL(10,2),
  actual_earnings DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Performance Metrics Table
CREATE TABLE IF NOT EXISTS public.driver_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  total_miles DECIMAL(10,2) DEFAULT 0,
  total_loads INTEGER DEFAULT 0,
  on_time_deliveries INTEGER DEFAULT 0,
  late_deliveries INTEGER DEFAULT 0,
  fuel_efficiency DECIMAL(8,4),
  safety_score DECIMAL(5,2),
  earnings_total DECIMAL(10,2) DEFAULT 0,
  hours_driven DECIMAL(8,2),
  performance_rating DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time Driver Location Tracking
CREATE TABLE IF NOT EXISTS public.driver_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  speed DECIMAL(5,2),
  heading DECIMAL(5,2),
  altitude DECIMAL(8,2),
  accuracy DECIMAL(6,2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_driving BOOLEAN DEFAULT false,
  location_source TEXT DEFAULT 'gps'
);

-- Driver Communication & Messages
CREATE TABLE IF NOT EXISTS public.driver_communications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  sender_role TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('text', 'alert', 'instruction', 'emergency')) DEFAULT 'text',
  subject TEXT,
  message TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  reply_to UUID,
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Documents & Inspections
CREATE TABLE IF NOT EXISTS public.driver_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  document_type TEXT CHECK (document_type IN ('license', 'medical_certificate', 'inspection_report', 'delivery_receipt', 'incident_report', 'logbook_entry')) NOT NULL,
  document_name TEXT NOT NULL,
  document_url TEXT,
  document_data JSONB,
  expiry_date DATE,
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'expired')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Earnings & Payments
CREATE TABLE IF NOT EXISTS public.driver_earnings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  base_pay DECIMAL(10,2) DEFAULT 0,
  mileage_pay DECIMAL(10,2) DEFAULT 0,
  bonus_pay DECIMAL(10,2) DEFAULT 0,
  overtime_pay DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  gross_pay DECIMAL(10,2) DEFAULT 0,
  net_pay DECIMAL(10,2) DEFAULT 0,
  payment_status TEXT CHECK (payment_status IN ('pending', 'processing', 'paid', 'failed')) DEFAULT 'pending',
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Route Optimization Data
CREATE TABLE IF NOT EXISTS public.driver_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL,
  load_id UUID NOT NULL,
  route_name TEXT NOT NULL,
  origin_coordinates POINT NOT NULL,
  destination_coordinates POINT NOT NULL,
  waypoints JSONB,
  optimized_route JSONB,
  estimated_duration_minutes INTEGER,
  estimated_distance_miles DECIMAL(8,2),
  actual_duration_minutes INTEGER,
  actual_distance_miles DECIMAL(8,2),
  fuel_efficiency DECIMAL(8,4),
  traffic_conditions JSONB,
  weather_conditions JSONB,
  route_status TEXT CHECK (route_status IN ('planned', 'active', 'completed', 'modified')) DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.driver_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_routes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Driver Portal
CREATE POLICY "Drivers can view own loads" ON public.driver_loads FOR SELECT USING (driver_id = auth.uid());
CREATE POLICY "Drivers can update own load status" ON public.driver_loads FOR UPDATE USING (driver_id = auth.uid());

CREATE POLICY "Drivers can view own performance" ON public.driver_performance FOR SELECT USING (driver_id = auth.uid());

CREATE POLICY "Drivers can insert own location" ON public.driver_locations FOR INSERT WITH CHECK (driver_id = auth.uid());
CREATE POLICY "Drivers can view own location" ON public.driver_locations FOR SELECT USING (driver_id = auth.uid());

CREATE POLICY "Drivers can view own communications" ON public.driver_communications FOR SELECT USING (driver_id = auth.uid());
CREATE POLICY "Drivers can send messages" ON public.driver_communications FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Drivers can manage own documents" ON public.driver_documents FOR ALL USING (driver_id = auth.uid());

CREATE POLICY "Drivers can view own earnings" ON public.driver_earnings FOR SELECT USING (driver_id = auth.uid());

CREATE POLICY "Drivers can view own routes" ON public.driver_routes FOR SELECT USING (driver_id = auth.uid());
CREATE POLICY "Drivers can update own routes" ON public.driver_routes FOR UPDATE USING (driver_id = auth.uid());

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_driver_loads_driver_id ON public.driver_loads(driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_loads_status ON public.driver_loads(load_status);
CREATE INDEX IF NOT EXISTS idx_driver_performance_driver_date ON public.driver_performance(driver_id, date);
CREATE INDEX IF NOT EXISTS idx_driver_locations_driver_timestamp ON public.driver_locations(driver_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_driver_communications_driver_id ON public.driver_communications(driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_documents_driver_type ON public.driver_documents(driver_id, document_type);
CREATE INDEX IF NOT EXISTS idx_driver_earnings_driver_period ON public.driver_earnings(driver_id, pay_period_start, pay_period_end);
CREATE INDEX IF NOT EXISTS idx_driver_routes_driver_load ON public.driver_routes(driver_id, load_id);

-- Real-time sync trigger for driver locations
CREATE OR REPLACE FUNCTION public.notify_driver_location_update()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('driver_location_update', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER driver_location_realtime_trigger
  AFTER INSERT OR UPDATE ON public.driver_locations
  FOR EACH ROW EXECUTE FUNCTION notify_driver_location_update();

-- Auto-update timestamps
CREATE TRIGGER update_driver_loads_updated_at BEFORE UPDATE ON public.driver_loads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_driver_performance_updated_at BEFORE UPDATE ON public.driver_performance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_driver_documents_updated_at BEFORE UPDATE ON public.driver_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_driver_earnings_updated_at BEFORE UPDATE ON public.driver_earnings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_driver_routes_updated_at BEFORE UPDATE ON public.driver_routes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();