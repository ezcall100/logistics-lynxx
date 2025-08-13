-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'driver',
  company_id UUID,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'carrier', 'broker', 'shipper', 'factoring'
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portals table
CREATE TABLE portals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  status TEXT DEFAULT 'active',
  color TEXT,
  gradient TEXT,
  accessible_roles TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KPIs table
CREATE TABLE kpis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL,
  title TEXT NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  change DECIMAL(10,2) DEFAULT 0,
  change_type TEXT DEFAULT 'neutral', -- 'increase', 'decrease', 'neutral'
  description TEXT,
  icon TEXT,
  role TEXT NOT NULL,
  company_id UUID REFERENCES companies(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance metrics table
CREATE TABLE performance_series (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  metric TEXT NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  role TEXT,
  company_id UUID REFERENCES companies(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL, -- 'success', 'info', 'warning', 'error', 'system'
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id),
  portal TEXT,
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System health metrics table
CREATE TABLE health_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  unit TEXT,
  status TEXT DEFAULT 'healthy', -- 'healthy', 'warning', 'critical'
  threshold_warning DECIMAL(10,2),
  threshold_critical DECIMAL(10,2),
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quick actions table
CREATE TABLE quick_actions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  portal_id UUID REFERENCES portals(id),
  label TEXT NOT NULL,
  action TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_company ON profiles(company_id);
CREATE INDEX idx_kpis_role ON kpis(role);
CREATE INDEX idx_kpis_timestamp ON kpis(timestamp);
CREATE INDEX idx_performance_series_metric ON performance_series(metric);
CREATE INDEX idx_performance_series_timestamp ON performance_series(timestamp);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_created_at ON activities(created_at);
CREATE INDEX idx_health_metrics_name ON health_metrics(name);
CREATE INDEX idx_health_metrics_timestamp ON health_metrics(timestamp);

-- Create views for easier querying
CREATE VIEW kpis_view AS
SELECT 
  k.id,
  k.key,
  k.title,
  k.value,
  k.change,
  k.change_type,
  k.description,
  k.icon,
  k.role,
  k.timestamp
FROM kpis k
ORDER BY k.timestamp DESC;

CREATE VIEW portals_view AS
SELECT 
  p.id,
  p.slug,
  p.name,
  p.description,
  p.icon,
  p.status,
  p.color,
  p.gradient,
  p.accessible_roles,
  p.order_index,
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'label', qa.label,
      'action', qa.action,
      'icon', qa.icon,
      'description', qa.description
    )
  ) FILTER (WHERE qa.id IS NOT NULL) as quick_actions
FROM portals p
LEFT JOIN quick_actions qa ON p.id = qa.portal_id
GROUP BY p.id, p.slug, p.name, p.description, p.icon, p.status, p.color, p.gradient, p.accessible_roles, p.order_index
ORDER BY p.order_index;

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_actions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Companies policies
CREATE POLICY "Users can view companies" ON companies
  FOR SELECT USING (true);

CREATE POLICY "Super admins can manage companies" ON companies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Portals policies
CREATE POLICY "Users can view portals" ON portals
  FOR SELECT USING (true);

CREATE POLICY "Super admins can manage portals" ON portals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- KPIs policies
CREATE POLICY "Users can view KPIs for their role" ON kpis
  FOR SELECT USING (
    role = (
      SELECT role FROM profiles WHERE id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can manage KPIs" ON kpis
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Performance series policies
CREATE POLICY "Users can view performance data for their role" ON performance_series
  FOR SELECT USING (
    role = (
      SELECT role FROM profiles WHERE id = auth.uid()
    )
    OR role IS NULL
    OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Activities policies
CREATE POLICY "Users can view activities" ON activities
  FOR SELECT USING (true);

CREATE POLICY "Users can create activities" ON activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Health metrics policies
CREATE POLICY "Users can view health metrics" ON health_metrics
  FOR SELECT USING (true);

CREATE POLICY "Super admins can manage health metrics" ON health_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Quick actions policies
CREATE POLICY "Users can view quick actions" ON quick_actions
  FOR SELECT USING (true);

-- Functions for real-time updates
CREATE OR REPLACE FUNCTION notify_kpi_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'kpis_changes',
    json_build_object(
      'table', TG_TABLE_NAME,
      'type', TG_OP,
      'record', row_to_json(NEW)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION notify_activity_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'activities_changes',
    json_build_object(
      'table', TG_TABLE_NAME,
      'type', TG_OP,
      'record', row_to_json(NEW)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for real-time notifications
CREATE TRIGGER kpis_notify_trigger
  AFTER INSERT OR UPDATE OR DELETE ON kpis
  FOR EACH ROW EXECUTE FUNCTION notify_kpi_change();

CREATE TRIGGER activities_notify_trigger
  AFTER INSERT ON activities
  FOR EACH ROW EXECUTE FUNCTION notify_activity_change();

-- Insert sample data
INSERT INTO companies (name, type) VALUES
  ('Logistics Lynx Corp', 'broker'),
  ('FastTrack Carriers', 'carrier'),
  ('Global Shippers Inc', 'shipper'),
  ('QuickCash Factoring', 'factoring');

INSERT INTO portals (slug, name, description, icon, status, color, gradient, accessible_roles, order_index) VALUES
  ('broker', 'Broker Portal', 'Freight brokerage management', 'package', 'active', 'blue', 'from-blue-500 to-blue-600', ARRAY['freight_broker_admin', 'super_admin'], 1),
  ('carrier', 'Carrier Portal', 'Carrier operations and dispatch', 'truck', 'active', 'green', 'from-green-500 to-green-600', ARRAY['carrier_admin', 'super_admin'], 2),
  ('driver', 'Driver Portal', 'Driver mobile app and tracking', 'user', 'active', 'purple', 'from-purple-500 to-purple-600', ARRAY['driver', 'super_admin'], 3),
  ('shipper', 'Shipper Portal', 'Shipment management and tracking', 'package', 'active', 'orange', 'from-orange-500 to-orange-600', ARRAY['shipper_admin', 'super_admin'], 4),
  ('admin', 'Admin Portal', 'System administration', 'settings', 'active', 'gray', 'from-gray-500 to-gray-600', ARRAY['admin', 'super_admin'], 5),
  ('super-admin', 'Super Admin', 'Full system control', 'shield', 'active', 'red', 'from-red-500 to-red-600', ARRAY['super_admin'], 6),
  ('analytics', 'Analytics', 'Business intelligence and reporting', 'bar-chart-3', 'active', 'indigo', 'from-indigo-500 to-indigo-600', ARRAY['analyst', 'super_admin'], 7),
  ('autonomous', 'Autonomous AI', 'AI-powered automation', 'brain', 'beta', 'pink', 'from-pink-500 to-pink-600', ARRAY['super_admin'], 8),
  ('factoring', 'Factoring', 'Invoice factoring and payments', 'dollar-sign', 'active', 'emerald', 'from-emerald-500 to-emerald-600', ARRAY['factoring_admin', 'super_admin'], 9),
  ('owner-operator', 'Owner Operator', 'Independent contractor tools', 'building', 'active', 'cyan', 'from-cyan-500 to-cyan-600', ARRAY['owner_operator', 'super_admin'], 10),
  ('owner-operator-business', 'Business Management', 'Business operations for owner operators', 'briefcase', 'active', 'teal', 'from-teal-500 to-teal-600', ARRAY['owner_operator', 'super_admin'], 11);
