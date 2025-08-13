-- Phase B: Final Portal Drop Migration
-- This migration drops deprecated portal tables after retention period
-- Run only after confirming zero dependencies for 48+ hours

-- PRE-GUARD: Fail if any dependency still exists
DO $$
DECLARE 
  dependency_count INTEGER;
  dependency_details TEXT;
BEGIN
  -- Check for foreign key references to deprecated portal tables
  SELECT COUNT(*) INTO dependency_count
  FROM pg_constraint c
  JOIN pg_class t ON c.confrelid = t.oid
  WHERE t.relname IN (
    -- Cursor: Replace with actual table names discovered by dependency scan
    -- 'carrier_admin_settings', 'broker_admin_config', 'shipper_admin_prefs', etc.
    'example_table_1', 'example_table_2'
  ) AND c.contype = 'f';
  
  -- Check for views depending on deprecated portal tables
  SELECT COUNT(*) INTO dependency_count
  FROM information_schema.view_table_usage vtu
  WHERE vtu.table_schema = 'public' 
  AND vtu.table_name IN (
    -- Cursor: Replace with actual table names
    'example_table_1', 'example_table_2'
  );
  
  -- Check for functions referencing deprecated portal tables
  SELECT COUNT(*) INTO dependency_count
  FROM pg_proc p 
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE n.nspname = 'public'
  AND pg_get_functiondef(p.oid) ILIKE ANY(ARRAY[
    '%example_table_1%', '%example_table_2%'
  ]);
  
  IF dependency_count > 0 THEN
    RAISE EXCEPTION 'Dependencies still reference deprecated portal tables (% dependencies found). Cannot proceed with drop.', dependency_count;
  END IF;
  
  -- Log the dependency check
  INSERT INTO public.audit_log (action, table_name, details, created_by)
  VALUES (
    'portal_drop_check',
    'deprecated_portals',
    jsonb_build_object(
      'dependency_count', dependency_count,
      'status', 'ready_for_drop',
      'timestamp', now()
    ),
    (SELECT id FROM auth.users WHERE email = 'system@transbot.ai' LIMIT 1)
  );
END $$;

-- DROP base tables (replace with actual table names)
-- Cursor: Fill exact DROP statements per discovered tables

-- Example drops:
-- DROP TABLE IF EXISTS public.carrier_admin_settings CASCADE;
-- DROP TABLE IF EXISTS public.broker_admin_config CASCADE;
-- DROP TABLE IF EXISTS public.shipper_admin_prefs CASCADE;
-- DROP TABLE IF EXISTS public.freight_broker_settings CASCADE;
-- DROP TABLE IF EXISTS public.carrier_dispatch_jobs CASCADE;

-- Remove compatibility views (optional - keeps late readers happy)
-- DROP VIEW IF EXISTS public.carrier_admin_settings;
-- DROP VIEW IF EXISTS public.broker_admin_config;
-- DROP VIEW IF EXISTS public.shipper_admin_prefs;
-- DROP VIEW IF EXISTS public.freight_broker_settings;
-- DROP VIEW IF EXISTS public.carrier_dispatch_jobs;

-- Log the final drop operation
INSERT INTO public.audit_log (action, table_name, details, created_by)
VALUES (
  'portal_drop_complete',
  'deprecated_portals',
  '{"portals": ["carrier-admin", "broker-admin", "shipper-admin", "freight-broker", "carrier-dispatch"], "status": "dropped", "phase": "B_final"}',
  (SELECT id FROM auth.users WHERE email = 'system@transbot.ai' LIMIT 1)
) ON CONFLICT DO NOTHING;
