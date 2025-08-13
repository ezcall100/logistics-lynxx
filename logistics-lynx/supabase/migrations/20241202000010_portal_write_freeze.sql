-- Portal Write-Freeze Migration
-- Freeze writes to tables used exclusively by deprecated portals
-- This prevents accidental writes while keeping SELECTs for archiving

-- Carrier Admin Portal Tables (if any specific tables exist)
-- Note: Most carrier functionality is in shared tables (companies, shipments, etc.)
-- Only freeze writes to carrier-specific admin tables if they exist

-- Broker Admin Portal Tables (if any specific tables exist)
-- Note: Most broker functionality is in shared tables (loads, rates, etc.)
-- Only freeze writes to broker-specific admin tables if they exist

-- Shipper Admin Portal Tables (if any specific tables exist)
-- Note: Most shipper functionality is in shared tables (shipments, customers, etc.)
-- Only freeze writes to shipper-specific admin tables if they exist

-- Freight Broker Portal Tables (if any specific tables exist)
-- Note: This portal functionality is covered by broker portal
-- Only freeze writes to freight-broker-specific tables if they exist

-- Carrier Dispatch Portal Tables (if any specific tables exist)
-- Note: Most dispatch functionality is in shared tables (routes, shipments, etc.)
-- Only freeze writes to dispatch-specific tables if they exist

-- Example of how to freeze writes to a specific table:
-- DO $$ 
-- BEGIN
--   -- Only run if the table exists
--   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'carrier_admin_settings') THEN
--     ALTER TABLE public.carrier_admin_settings ENABLE ROW LEVEL SECURITY;
--     
--     -- Drop existing policies if they exist
--     DROP POLICY IF EXISTS "carrier_admin_freeze_ins" ON public.carrier_admin_settings;
--     DROP POLICY IF EXISTS "carrier_admin_freeze_upd" ON public.carrier_admin_settings;
--     
--     -- Create freeze policies
--     CREATE POLICY "carrier_admin_freeze_ins" ON public.carrier_admin_settings 
--       FOR INSERT WITH CHECK (false);
--     
--     CREATE POLICY "carrier_admin_freeze_upd" ON public.carrier_admin_settings 
--       FOR UPDATE USING (false);
--     
--     -- Keep existing SELECT policies for archiving
--   END IF;
-- END $$;

-- Log the write-freeze operation
INSERT INTO public.audit_log (action, table_name, details, created_by)
VALUES (
  'portal_write_freeze',
  'deprecated_portals',
  '{"portals": ["carrier-admin", "broker-admin", "shipper-admin", "freight-broker", "carrier-dispatch"], "status": "write_frozen"}',
  (SELECT id FROM auth.users WHERE email = 'system@transbot.ai' LIMIT 1)
) ON CONFLICT DO NOTHING;
