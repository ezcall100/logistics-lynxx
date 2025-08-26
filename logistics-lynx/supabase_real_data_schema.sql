-- Real Data Schema Setup for TransBot AI Portals
-- This script creates the necessary tables and RLS policies for live data

-- Enable RLS on all tables
ALTER TABLE IF EXISTS carrier_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS fleet_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS carrier_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS broker_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS carrier_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS broker_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shipper_shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS shipper_stats ENABLE ROW LEVEL SECURITY;

-- Carrier Portal Tables
CREATE TABLE IF NOT EXISTS carrier_loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_number VARCHAR(50) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  cargo_type VARCHAR(100) NOT NULL,
  weight INTEGER NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'in_transit', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fleet_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_trucks INTEGER DEFAULT 0,
  available INTEGER DEFAULT 0,
  in_transit INTEGER DEFAULT 0,
  loading_unloading INTEGER DEFAULT 0,
  maintenance INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carrier_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_trucks INTEGER DEFAULT 0,
  active_loads INTEGER DEFAULT 0,
  on_time_rate DECIMAL(5,2) DEFAULT 0,
  monthly_revenue DECIMAL(12,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Broker Portal Tables
CREATE TABLE IF NOT EXISTS broker_loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_number VARCHAR(50) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  equipment_type VARCHAR(100) NOT NULL,
  weight INTEGER NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'in_transit', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carrier_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0,
  loads_completed INTEGER DEFAULT 0,
  on_time_percentage DECIMAL(5,2) DEFAULT 0,
  avatar_initials VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS broker_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_loads INTEGER DEFAULT 0,
  carrier_partners INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0,
  monthly_revenue DECIMAL(12,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipper Portal Tables
CREATE TABLE IF NOT EXISTS shipper_shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_number VARCHAR(50) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  cargo_type VARCHAR(100) NOT NULL,
  weight INTEGER NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'cancelled')),
  carrier_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shipper_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_shipments INTEGER DEFAULT 0,
  carriers_used INTEGER DEFAULT 0,
  on_time_rate DECIMAL(5,2) DEFAULT 0,
  monthly_spend DECIMAL(12,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for Carrier Portal
CREATE POLICY "carrier_loads_access" ON carrier_loads
  FOR ALL USING (auth.jwt() ->> 'role' IN ('carrier_admin', 'super_admin'));

CREATE POLICY "fleet_status_access" ON fleet_status
  FOR ALL USING (auth.jwt() ->> 'role' IN ('carrier_admin', 'super_admin'));

CREATE POLICY "carrier_stats_access" ON carrier_stats
  FOR ALL USING (auth.jwt() ->> 'role' IN ('carrier_admin', 'super_admin'));

-- RLS Policies for Broker Portal
CREATE POLICY "broker_loads_access" ON broker_loads
  FOR ALL USING (auth.jwt() ->> 'role' IN ('freight_broker_admin', 'super_admin'));

CREATE POLICY "carrier_partners_access" ON carrier_partners
  FOR ALL USING (auth.jwt() ->> 'role' IN ('freight_broker_admin', 'super_admin'));

CREATE POLICY "broker_stats_access" ON broker_stats
  FOR ALL USING (auth.jwt() ->> 'role' IN ('freight_broker_admin', 'super_admin'));

-- RLS Policies for Shipper Portal
CREATE POLICY "shipper_shipments_access" ON shipper_shipments
  FOR ALL USING (auth.jwt() ->> 'role' IN ('shipper_admin', 'super_admin'));

CREATE POLICY "shipper_stats_access" ON shipper_stats
  FOR ALL USING (auth.jwt() ->> 'role' IN ('shipper_admin', 'super_admin'));

-- Insert sample data for testing
INSERT INTO fleet_status (total_trucks, available, in_transit, loading_unloading, maintenance) 
VALUES (24, 12, 8, 3, 1) ON CONFLICT DO NOTHING;

INSERT INTO carrier_stats (active_trucks, active_loads, on_time_rate, monthly_revenue) 
VALUES (24, 18, 94.5, 127000.00) ON CONFLICT DO NOTHING;

INSERT INTO broker_stats (active_loads, carrier_partners, success_rate, monthly_revenue) 
VALUES (42, 156, 98.2, 89000.00) ON CONFLICT DO NOTHING;

INSERT INTO shipper_stats (active_shipments, carriers_used, on_time_rate, monthly_spend) 
VALUES (28, 12, 96.0, 45000.00) ON CONFLICT DO NOTHING;

-- Sample carrier loads
INSERT INTO carrier_loads (load_number, origin, destination, cargo_type, weight, rate, status) VALUES
('1001', 'Chicago, IL', 'Los Angeles, CA', 'Electronics', 45000, 2450.00, 'in_transit'),
('1002', 'Dallas, TX', 'Phoenix, AZ', 'Dry Van', 42000, 1850.00, 'in_transit'),
('1003', 'Miami, FL', 'New York, NY', 'Perishables', 38000, 3100.00, 'available') ON CONFLICT DO NOTHING;

-- Sample broker loads
INSERT INTO broker_loads (load_number, origin, destination, equipment_type, weight, rate, status) VALUES
('2001', 'Dallas, TX', 'Phoenix, AZ', 'Dry Van', 45000, 1850.00, 'available'),
('2002', 'Atlanta, GA', 'Seattle, WA', 'Reefer', 35000, 2200.00, 'available'),
('2003', 'Denver, CO', 'Portland, OR', 'Flatbed', 28000, 1950.00, 'assigned') ON CONFLICT DO NOTHING;

-- Sample carrier partners
INSERT INTO carrier_partners (name, rating, loads_completed, on_time_percentage, avatar_initials) VALUES
('ABC Trucking', 4.9, 127, 98.0, 'AT'),
('Reliable Transport', 4.8, 89, 96.0, 'RT'),
('Swift Trucking', 4.7, 156, 94.0, 'ST') ON CONFLICT DO NOTHING;

-- Sample shipper shipments
INSERT INTO shipper_shipments (shipment_number, origin, destination, cargo_type, weight, cost, status, carrier_name) VALUES
('3001', 'Atlanta, GA', 'Seattle, WA', 'Electronics', 15000, 3200.00, 'in_transit', 'ABC Trucking'),
('3002', 'Chicago, IL', 'Los Angeles, CA', 'Automotive', 22000, 2800.00, 'in_transit', 'Reliable Transport'),
('3003', 'Miami, FL', 'New York, NY', 'Perishables', 18000, 2400.00, 'pending', NULL) ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_carrier_loads_status ON carrier_loads(status);
CREATE INDEX IF NOT EXISTS idx_broker_loads_status ON broker_loads(status);
CREATE INDEX IF NOT EXISTS idx_shipper_shipments_status ON shipper_shipments(status);
CREATE INDEX IF NOT EXISTS idx_carrier_partners_rating ON carrier_partners(rating);
