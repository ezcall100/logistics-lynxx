-- Portal Decommission Feature Flags
-- Disable extra portals instantly (read by UI, Edge, agents)

-- Ensure feature_flags table exists
CREATE TABLE IF NOT EXISTS public.feature_flags (
  key TEXT PRIMARY KEY,
  value_json JSONB NOT NULL DEFAULT 'false',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert flags to disable extra portals
INSERT INTO public.feature_flags (key, value_json, description)
VALUES
  ('portal.carrier-admin.enabled', 'false', 'Carrier Admin Portal - Deprecated'),
  ('portal.broker-admin.enabled', 'false', 'Broker Admin Portal - Deprecated'),
  ('portal.shipper-admin.enabled', 'false', 'Shipper Admin Portal - Deprecated'),
  ('portal.freight-broker.enabled', 'false', 'Freight Broker Portal - Deprecated'),
  ('portal.carrier-dispatch.enabled', 'false', 'Carrier Dispatch Portal - Deprecated')
ON CONFLICT (key) DO UPDATE SET 
  value_json = excluded.value_json,
  description = excluded.description,
  updated_at = now();

-- Add RLS policies for feature_flags
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Feature flags are readable by authenticated users" ON public.feature_flags
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only super admins can modify feature flags" ON public.feature_flags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'super_admin'::app_role
    )
  );
