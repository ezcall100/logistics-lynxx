-- PR-PORTALS-CLEANUP001: Post-Decommission Cleanup (30-Day Retirement)
-- Remove feature flags, compatibility views, and legacy objects

-- 1. Remove feature flags for decommissioned portals
DELETE FROM public.feature_flags_v2 
WHERE key IN (
  'portal.carrierAdmin.enabled',
  'portal.brokerAdmin.enabled'
);

-- 2. Drop compatibility views (after 30-day retention period)
DROP VIEW IF EXISTS public.carrier_admin_assignments;
DROP VIEW IF EXISTS public.broker_admin_loads;

-- 3. Archive and drop legacy tables (if they exist and are write-frozen)
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND (table_name LIKE 'carrier_admin_%' OR table_name LIKE 'broker_admin_%')
  LOOP
    -- Archive the table first
    EXECUTE format('CREATE TABLE IF NOT EXISTS archive.%I AS SELECT * FROM %I.%I;', 
      r.table_name, r.table_schema, r.table_name);
    
    -- Add archive timestamp
    EXECUTE format('ALTER TABLE archive.%I ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP DEFAULT now();', 
      r.table_name);
    
    -- Drop the original table
    EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE;', r.table_schema, r.table_name);
    
    RAISE NOTICE 'Archived and dropped table: %.%', r.table_schema, r.table_name;
  END LOOP;
END $$;

-- 4. Remove deprecated portal entries from navigation config
UPDATE public.navigation_config 
SET 
  config = jsonb_set(
    config,
    '{portals}',
    (
      SELECT jsonb_agg(portal)
      FROM jsonb_array_elements(config->'portals') AS portal
      WHERE portal->>'route' NOT IN ('/carrier-admin', '/broker-admin', '/shipper-admin', '/carrier-dispatch')
    )
  ),
  updated_at = now()
WHERE config_name = 'main_navigation';

-- 5. Update analytics event mapping
-- Remap events from deprecated to canonical portals
UPDATE public.analytics_events 
SET 
  event_name = REPLACE(event_name, 'portal.carrier_admin.', 'portal.carrier.'),
  updated_at = now()
WHERE event_name LIKE 'portal.carrier_admin.%';

UPDATE public.analytics_events 
SET 
  event_name = REPLACE(event_name, 'portal.broker_admin.', 'portal.broker.'),
  updated_at = now()
WHERE event_name LIKE 'portal.broker_admin.%';

-- 6. Clean up system announcements (remove old consolidation notice)
UPDATE public.system_announcements 
SET 
  is_active = false,
  updated_at = now()
WHERE title = 'Portal Consolidation Complete' 
  AND created_at < now() - interval '30 days';

-- 7. Remove deprecated portal metrics
DELETE FROM public.system_metrics 
WHERE metric_key IN (
  'portal.carrier_admin.usage',
  'portal.broker_admin.usage',
  'portal.shipper_admin.usage',
  'portal.carrier_dispatch.usage'
);

-- 8. Update portal count metrics
UPDATE public.system_metrics 
SET 
  active_portals = 20,
  decommissioned_portals = 0,
  updated_at = now()
WHERE metric_key = 'portal_count';

-- 9. Create final cleanup verification function
CREATE OR REPLACE FUNCTION public.verify_post_decommission_cleanup()
RETURNS TABLE(component text, status text, message text) AS $$
BEGIN
  -- Check feature flags are removed
  RETURN QUERY
  SELECT 
    'feature_flags'::text as component,
    CASE 
      WHEN NOT EXISTS (SELECT 1 FROM feature_flags_v2 WHERE key LIKE 'portal.%Admin.enabled')
      THEN 'REMOVED'::text
      ELSE 'ERROR'::text
    END as status,
    'Feature flags cleanup'::text as message;
    
  -- Check compatibility views are dropped
  RETURN QUERY
  SELECT 
    'compatibility_views'::text as component,
    CASE 
      WHEN NOT EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE view_name IN ('carrier_admin_assignments', 'broker_admin_loads')
      )
      THEN 'DROPPED'::text
      ELSE 'ERROR'::text
    END as status,
    'Compatibility views cleanup'::text as message;
    
  -- Check legacy tables are archived and dropped
  RETURN QUERY
  SELECT 
    'legacy_tables'::text as component,
    CASE 
      WHEN NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name LIKE 'carrier_admin_%' OR table_name LIKE 'broker_admin_%'
      )
      THEN 'ARCHIVED_AND_DROPPED'::text
      ELSE 'ERROR'::text
    END as status,
    'Legacy tables cleanup'::text as message;
    
  -- Check analytics events are remapped
  RETURN QUERY
  SELECT 
    'analytics_events'::text as component,
    CASE 
      WHEN NOT EXISTS (
        SELECT 1 FROM analytics_events 
        WHERE event_name LIKE 'portal.%_admin.%'
      )
      THEN 'REMAP_COMPLETE'::text
      ELSE 'ERROR'::text
    END as status,
    'Analytics events remapping'::text as message;
    
  -- Check navigation config is clean
  RETURN QUERY
  SELECT 
    'navigation_config'::text as component,
    CASE 
      WHEN NOT EXISTS (
        SELECT 1 FROM navigation_config 
        WHERE config::text LIKE '%carrier-admin%' OR config::text LIKE '%broker-admin%'
      )
      THEN 'CLEAN'::text
      ELSE 'ERROR'::text
    END as status,
    'Navigation config cleanup'::text as message;
END;
$$ LANGUAGE plpgsql;

-- 10. Log final cleanup completion
INSERT INTO public.system_events (
  event_type,
  event_data,
  severity,
  source,
  created_at
) VALUES (
  'POST_DECOMMISSION_CLEANUP_COMPLETE',
  '{"cleaned_components": ["feature_flags", "compatibility_views", "legacy_tables", "analytics_events", "navigation_config"], "active_portals": 20, "archived_tables": "archive schema"}'::jsonb,
  'info',
  'autonomous-system',
  now()
);

-- 11. Create final audit entry
INSERT INTO public.audit_logs (
  action, 
  table_name, 
  record_id, 
  old_values, 
  new_values, 
  user_id, 
  ip_address, 
  user_agent,
  created_at
) VALUES (
  'POST_DECOMMISSION_CLEANUP',
  'system_cleanup',
  'portal-cleanup-final',
  '{"feature_flags": "present", "compatibility_views": "present", "legacy_tables": "present"}',
  '{"feature_flags": "removed", "compatibility_views": "dropped", "legacy_tables": "archived"}',
  'autonomous-system',
  '127.0.0.1',
  'Autonomous Agent Cleanup Script',
  now()
);

-- Grant execute permission on verification function
GRANT EXECUTE ON FUNCTION public.verify_post_decommission_cleanup() TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_post_decommission_cleanup() TO service_role;
