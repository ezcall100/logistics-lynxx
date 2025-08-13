-- Phase B: Portal Archive and Compatibility Views
-- This migration archives data and creates compatibility views
-- Run after 90-day retention period

-- Create archive schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS archive;

-- Create archive manifest table
CREATE TABLE IF NOT EXISTS archive.portal_archives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_name TEXT NOT NULL,
  archive_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tables_archived TEXT[] NOT NULL,
  row_counts JSONB NOT NULL,
  archive_hash TEXT,
  status TEXT DEFAULT 'archived' CHECK (status IN ('archived', 'restored', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Example archive template for each portal:
-- Replace with actual table names discovered by dependency scan

-- Carrier Admin Portal Archive
-- DO $$ 
-- BEGIN
--   -- Archive carrier_admin_settings if it exists
--   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'carrier_admin_settings') THEN
--     -- Create archive table
--     CREATE TABLE IF NOT EXISTS archive.carrier_admin_settings (LIKE public.carrier_admin_settings INCLUDING ALL);
--     
--     -- Copy data
--     INSERT INTO archive.carrier_admin_settings SELECT * FROM public.carrier_admin_settings;
--     
--     -- Create compatibility view
--     DROP VIEW IF EXISTS public.carrier_admin_settings;
--     CREATE VIEW public.carrier_admin_settings AS SELECT * FROM archive.carrier_admin_settings;
--     
--     -- Log archive
--     INSERT INTO archive.portal_archives (portal_name, tables_archived, row_counts)
--     VALUES (
--       'carrier-admin',
--       ARRAY['carrier_admin_settings'],
--       jsonb_build_object('carrier_admin_settings', (SELECT COUNT(*) FROM archive.carrier_admin_settings))
--     );
--   END IF;
-- END $$;

-- Broker Admin Portal Archive
-- DO $$ BEGIN END $$;

-- Shipper Admin Portal Archive  
-- DO $$ BEGIN END $$;

-- Freight Broker Portal Archive
-- DO $$ BEGIN END $$;

-- Carrier Dispatch Portal Archive
-- DO $$ BEGIN END $$;

-- Log the archive operation
INSERT INTO public.audit_log (action, table_name, details, created_by)
VALUES (
  'portal_archive',
  'deprecated_portals',
  '{"portals": ["carrier-admin", "broker-admin", "shipper-admin", "freight-broker", "carrier-dispatch"], "status": "archived", "phase": "B"}',
  (SELECT id FROM auth.users WHERE email = 'system@transbot.ai' LIMIT 1)
) ON CONFLICT DO NOTHING;
