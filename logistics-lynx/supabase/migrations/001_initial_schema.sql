-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    portal_access TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portals table
CREATE TABLE IF NOT EXISTS public.portals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dashboards table
CREATE TABLE IF NOT EXISTS public.dashboards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    portal_key TEXT REFERENCES public.portals(key) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    widgets JSONB DEFAULT '[]',
    layout JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Autonomous Agents table
CREATE TABLE IF NOT EXISTS public.autonomous_agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'idle',
    current_task TEXT,
    progress INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    specializations TEXT[] DEFAULT '{}',
    portal_key TEXT REFERENCES public.portals(key) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Autonomous Updates table
CREATE TABLE IF NOT EXISTS public.autonomous_updates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    component TEXT NOT NULL,
    change TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'pending',
    type TEXT NOT NULL,
    impact TEXT NOT NULL DEFAULT 'low',
    agent_id UUID REFERENCES public.autonomous_agents(id) ON DELETE CASCADE,
    portal_key TEXT REFERENCES public.portals(key) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Pages table
CREATE TABLE IF NOT EXISTS public.website_pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    portal_key TEXT REFERENCES public.portals(key) ON DELETE CASCADE,
    path TEXT NOT NULL,
    title TEXT NOT NULL,
    content JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(portal_key, path)
);

-- Feature Flags table
CREATE TABLE IF NOT EXISTS public.feature_flags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    scope TEXT NOT NULL DEFAULT 'global',
    enabled BOOLEAN DEFAULT false,
    description TEXT,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portals_key ON public.portals(key);
CREATE INDEX IF NOT EXISTS idx_portals_active ON public.portals(is_active);
CREATE INDEX IF NOT EXISTS idx_dashboards_portal ON public.dashboards(portal_key);
CREATE INDEX IF NOT EXISTS idx_agents_portal ON public.autonomous_agents(portal_key);
CREATE INDEX IF NOT EXISTS idx_agents_status ON public.autonomous_agents(status);
CREATE INDEX IF NOT EXISTS idx_updates_portal ON public.autonomous_updates(portal_key);
CREATE INDEX IF NOT EXISTS idx_updates_timestamp ON public.autonomous_updates(timestamp);
CREATE INDEX IF NOT EXISTS idx_pages_portal ON public.website_pages(portal_key);
CREATE INDEX IF NOT EXISTS idx_pages_path ON public.website_pages(path);
CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON public.feature_flags(key);
CREATE INDEX IF NOT EXISTS idx_feature_flags_scope ON public.feature_flags(scope);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portals_updated_at BEFORE UPDATE ON public.portals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dashboards_updated_at BEFORE UPDATE ON public.dashboards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.autonomous_agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.website_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON public.feature_flags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autonomous_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Portals policies
CREATE POLICY "Anyone can view active portals" ON public.portals FOR SELECT USING (is_active = true);
CREATE POLICY "Super admins can manage all portals" ON public.portals FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Dashboards policies
CREATE POLICY "Anyone can view active dashboards" ON public.dashboards FOR SELECT USING (is_active = true);
CREATE POLICY "Portal users can manage their dashboards" ON public.dashboards FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND portal_key = ANY(portal_access)
    )
);

-- Autonomous agents policies
CREATE POLICY "Anyone can view active agents" ON public.autonomous_agents FOR SELECT USING (status != 'error');
CREATE POLICY "Super admins can manage all agents" ON public.autonomous_agents FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Autonomous updates policies
CREATE POLICY "Anyone can view updates" ON public.autonomous_updates FOR SELECT USING (true);
CREATE POLICY "Agents can create updates" ON public.autonomous_updates FOR INSERT WITH CHECK (true);

-- Website pages policies
CREATE POLICY "Anyone can view published pages" ON public.website_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Portal users can manage their pages" ON public.website_pages FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() 
        AND portal_key = ANY(portal_access)
    )
);

-- Feature flags policies
CREATE POLICY "Anyone can view feature flags" ON public.feature_flags FOR SELECT USING (true);
CREATE POLICY "Super admins can manage feature flags" ON public.feature_flags FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Insert default data
INSERT INTO public.portals (key, name, description, features) VALUES
('superAdmin', 'Super Admin Portal', 'System administration and monitoring', ARRAY['dashboard', 'users', 'settings', 'monitoring']),
('broker', 'Broker Portal', 'Load management and carrier relationships', ARRAY['dashboard', 'loads', 'carriers', 'quotes']),
('carrier', 'Carrier Portal', 'Fleet operations and performance', ARRAY['dashboard', 'fleet', 'drivers', 'loads']),
('shipper', 'Shipper Portal', 'Shipment tracking and cost management', ARRAY['dashboard', 'shipments', 'tracking', 'costs']),
('driver', 'Driver Portal', 'Personal performance and earnings', ARRAY['dashboard', 'loads', 'earnings', 'performance']),
('ownerOperator', 'Owner Operator Portal', 'Fleet management and revenue', ARRAY['dashboard', 'fleet', 'revenue', 'maintenance']),
('dispatcher', 'Dispatcher Portal', 'Load assignment and coordination', ARRAY['dashboard', 'assignments', 'coordination', 'efficiency']),
('accountant', 'Accountant Portal', 'Financial reporting and analysis', ARRAY['dashboard', 'finance', 'reports', 'transactions']),
('compliance', 'Compliance Portal', 'Regulatory monitoring and audits', ARRAY['dashboard', 'compliance', 'audits', 'certifications']),
('safety', 'Safety Portal', 'Incident tracking and training', ARRAY['dashboard', 'safety', 'incidents', 'training']),
('maintenance', 'Maintenance Portal', 'Vehicle maintenance and work orders', ARRAY['dashboard', 'maintenance', 'vehicles', 'workorders']),
('fuel', 'Fuel Portal', 'Fuel consumption and cost tracking', ARRAY['dashboard', 'fuel', 'consumption', 'costs']),
('insurance', 'Insurance Portal', 'Policy management and claims', ARRAY['dashboard', 'insurance', 'policies', 'claims']),
('hr', 'HR Portal', 'Employee management and hiring', ARRAY['dashboard', 'hr', 'employees', 'hiring']),
('it', 'IT Portal', 'System monitoring and support', ARRAY['dashboard', 'it', 'systems', 'support']),
('marketing', 'Marketing Portal', 'Lead generation and campaigns', ARRAY['dashboard', 'marketing', 'leads', 'campaigns']),
('sales', 'Sales Portal', 'Revenue tracking and opportunities', ARRAY['dashboard', 'sales', 'revenue', 'opportunities']),
('customerService', 'Customer Service Portal', 'Support ticket management', ARRAY['dashboard', 'support', 'tickets', 'satisfaction']),
('analytics', 'Analytics Portal', 'Business intelligence and metrics', ARRAY['dashboard', 'analytics', 'metrics', 'insights'])
ON CONFLICT (key) DO NOTHING;

-- Insert default feature flags
INSERT INTO public.feature_flags (key, scope, enabled, description, created_by) VALUES
('portal.superAdmin.dashboard.enabled', 'global', true, 'Enable dashboard for super admin portal', 'system'),
('portal.broker.dashboard.enabled', 'global', true, 'Enable dashboard for broker portal', 'system'),
('portal.carrier.dashboard.enabled', 'global', true, 'Enable dashboard for carrier portal', 'system'),
('portal.shipper.dashboard.enabled', 'global', true, 'Enable dashboard for shipper portal', 'system'),
('portal.driver.dashboard.enabled', 'global', true, 'Enable dashboard for driver portal', 'system'),
('portal.ownerOperator.dashboard.enabled', 'global', true, 'Enable dashboard for owner operator portal', 'system'),
('portal.dispatcher.dashboard.enabled', 'global', true, 'Enable dashboard for dispatcher portal', 'system'),
('portal.accountant.dashboard.enabled', 'global', true, 'Enable dashboard for accountant portal', 'system'),
('portal.compliance.dashboard.enabled', 'global', true, 'Enable dashboard for compliance portal', 'system'),
('portal.safety.dashboard.enabled', 'global', true, 'Enable dashboard for safety portal', 'system'),
('portal.maintenance.dashboard.enabled', 'global', true, 'Enable dashboard for maintenance portal', 'system'),
('portal.fuel.dashboard.enabled', 'global', true, 'Enable dashboard for fuel portal', 'system'),
('portal.insurance.dashboard.enabled', 'global', true, 'Enable dashboard for insurance portal', 'system'),
('portal.hr.dashboard.enabled', 'global', true, 'Enable dashboard for hr portal', 'system'),
('portal.it.dashboard.enabled', 'global', true, 'Enable dashboard for it portal', 'system'),
('portal.marketing.dashboard.enabled', 'global', true, 'Enable dashboard for marketing portal', 'system'),
('portal.sales.dashboard.enabled', 'global', true, 'Enable dashboard for sales portal', 'system'),
('portal.customerService.dashboard.enabled', 'global', true, 'Enable dashboard for customer service portal', 'system'),
('portal.analytics.dashboard.enabled', 'global', true, 'Enable dashboard for analytics portal', 'system'),
('autonomous.agents.enabled', 'global', true, 'Enable autonomous agents', 'system'),
('autonomous.updates.enabled', 'global', true, 'Enable autonomous updates', 'system'),
('website.pages.enabled', 'global', true, 'Enable website pages', 'system')
ON CONFLICT (key) DO NOTHING;

-- Insert default autonomous agents
INSERT INTO public.autonomous_agents (name, type, status, current_task, specializations) VALUES
('UI Design Agent', 'design', 'active', 'Enhancing website design', ARRAY['color-schemes', 'typography', 'spacing', 'visual-hierarchy']),
('Layout Engineer Agent', 'layout', 'active', 'Optimizing layouts', ARRAY['responsive-design', 'grid-systems', 'flexbox', 'css-grid']),
('Interaction Designer Agent', 'interaction', 'active', 'Improving interactions', ARRAY['animations', 'transitions', 'hover-effects', 'micro-interactions']),
('Performance Optimizer Agent', 'performance', 'active', 'Optimizing performance', ARRAY['rendering-optimization', 'memory-management', 'bundle-optimization']),
('Accessibility Specialist Agent', 'accessibility', 'active', 'Improving accessibility', ARRAY['aria-labels', 'keyboard-navigation', 'screen-reader-support', 'color-contrast'])
ON CONFLICT DO NOTHING;
