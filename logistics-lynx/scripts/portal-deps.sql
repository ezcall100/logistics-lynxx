-- Portal Dependency Discovery Script
-- Run this to find all dependencies for deprecated portals
-- Replace <TABLE_PATTERN> with actual table names

-- 1. Find all tables that might belong to deprecated portals
SELECT 
  table_schema,
  table_name,
  'table' as object_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%carrier_admin%'
   OR table_name LIKE '%broker_admin%'
   OR table_name LIKE '%shipper_admin%'
   OR table_name LIKE '%freight_broker%'
   OR table_name LIKE '%carrier_dispatch%'
ORDER BY table_name;

-- 2. Find views depending on these tables
SELECT 
  vtu.view_schema,
  vtu.view_name,
  vtu.table_schema,
  vtu.table_name,
  'view_dependency' as dependency_type
FROM information_schema.view_table_usage vtu
WHERE vtu.table_schema = 'public' 
AND (
  vtu.table_name LIKE '%carrier_admin%'
  OR vtu.table_name LIKE '%broker_admin%'
  OR vtu.table_name LIKE '%shipper_admin%'
  OR vtu.table_name LIKE '%freight_broker%'
  OR vtu.table_name LIKE '%carrier_dispatch%'
)
ORDER BY vtu.table_name, vtu.view_name;

-- 3. Find foreign keys referencing these tables
SELECT 
  c.conname as constraint_name,
  c.conrelid::regclass as referencing_table,
  c.confrelid::regclass as referenced_table,
  'foreign_key' as dependency_type
FROM pg_constraint c
WHERE c.contype = 'f' 
AND c.confrelid::regclass::text LIKE '%carrier_admin%'
   OR c.confrelid::regclass::text LIKE '%broker_admin%'
   OR c.confrelid::regclass::text LIKE '%shipper_admin%'
   OR c.confrelid::regclass::text LIKE '%freight_broker%'
   OR c.confrelid::regclass::text LIKE '%carrier_dispatch%'
ORDER BY c.confrelid::regclass::text;

-- 4. Find functions referencing these tables
SELECT 
  n.nspname as schema_name,
  p.proname as function_name,
  'function_reference' as dependency_type
FROM pg_proc p 
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND (
  pg_get_functiondef(p.oid) ILIKE '%carrier_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%broker_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%shipper_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%freight_broker%'
  OR pg_get_functiondef(p.oid) ILIKE '%carrier_dispatch%'
)
ORDER BY p.proname;

-- 5. Find triggers on these tables
SELECT 
  t.tgname as trigger_name,
  c.relname as table_name,
  'trigger' as dependency_type
FROM pg_trigger t
JOIN pg_class c ON c.oid = t.tgrelid
WHERE c.relname LIKE '%carrier_admin%'
   OR c.relname LIKE '%broker_admin%'
   OR c.relname LIKE '%shipper_admin%'
   OR c.relname LIKE '%freight_broker%'
   OR c.relname LIKE '%carrier_dispatch%'
AND NOT t.tgisinternal
ORDER BY c.relname, t.tgname;

-- 6. Find RLS policies on these tables
SELECT 
  schemaname,
  tablename,
  policyname,
  'rls_policy' as dependency_type
FROM pg_policies
WHERE tablename LIKE '%carrier_admin%'
   OR tablename LIKE '%broker_admin%'
   OR tablename LIKE '%shipper_admin%'
   OR tablename LIKE '%freight_broker%'
   OR tablename LIKE '%carrier_dispatch%'
ORDER BY tablename, policyname;

-- 7. Summary count by dependency type
SELECT 
  'Total Tables' as object_type,
  COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (
  table_name LIKE '%carrier_admin%'
  OR table_name LIKE '%broker_admin%'
  OR table_name LIKE '%shipper_admin%'
  OR table_name LIKE '%freight_broker%'
  OR table_name LIKE '%carrier_dispatch%'
)

UNION ALL

SELECT 
  'Foreign Key References' as object_type,
  COUNT(*) as count
FROM pg_constraint c
WHERE c.contype = 'f' 
AND (
  c.confrelid::regclass::text LIKE '%carrier_admin%'
  OR c.confrelid::regclass::text LIKE '%broker_admin%'
  OR c.confrelid::regclass::text LIKE '%shipper_admin%'
  OR c.confrelid::regclass::text LIKE '%freight_broker%'
  OR c.confrelid::regclass::text LIKE '%carrier_dispatch%'
)

UNION ALL

SELECT 
  'Function References' as object_type,
  COUNT(*) as count
FROM pg_proc p 
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND (
  pg_get_functiondef(p.oid) ILIKE '%carrier_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%broker_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%shipper_admin%'
  OR pg_get_functiondef(p.oid) ILIKE '%freight_broker%'
  OR pg_get_functiondef(p.oid) ILIKE '%carrier_dispatch%'
);
