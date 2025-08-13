-- Migration: 001_initial_schema.down.sql
-- Description: Rollback script for initial dashboard schema
-- Created: 2024-01-01
-- Author: Logistics Lynx Team

-- Drop triggers first
DROP TRIGGER IF EXISTS kpis_notify_trigger ON kpis;
DROP TRIGGER IF EXISTS activities_notify_trigger ON activities;

-- Drop functions
DROP FUNCTION IF EXISTS notify_kpi_change();
DROP FUNCTION IF EXISTS notify_activity_change();

-- Drop views
DROP VIEW IF EXISTS portals_view;
DROP VIEW IF EXISTS kpis_view;

-- Drop indexes
DROP INDEX IF EXISTS idx_health_metrics_timestamp;
DROP INDEX IF EXISTS idx_health_metrics_name;
DROP INDEX IF EXISTS idx_activities_created_at;
DROP INDEX IF EXISTS idx_activities_type;
DROP INDEX IF EXISTS idx_performance_series_timestamp;
DROP INDEX IF EXISTS idx_performance_series_metric;
DROP INDEX IF EXISTS idx_kpis_timestamp;
DROP INDEX IF EXISTS idx_kpis_role;
DROP INDEX IF EXISTS idx_profiles_company;
DROP INDEX IF EXISTS idx_profiles_role;

-- Drop tables (in reverse dependency order)
DROP TABLE IF EXISTS quick_actions CASCADE;
DROP TABLE IF EXISTS health_metrics CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS performance_series CASCADE;
DROP TABLE IF EXISTS kpis CASCADE;
DROP TABLE IF EXISTS portals CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Log rollback completion
DO $$
BEGIN
  RAISE NOTICE 'Migration 001_initial_schema.down.sql completed successfully - schema rolled back';
END $$;
