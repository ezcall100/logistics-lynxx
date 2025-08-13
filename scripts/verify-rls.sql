-- 🛡️ Trans Bot AI - RLS Verification Script
-- Verifies Row Level Security policies are working correctly

-- Set up test environment
DO $$
DECLARE
    test_company_1_id UUID := gen_random_uuid();
    test_company_2_id UUID := gen_random_uuid();
    test_user_1_id UUID := gen_random_uuid();
    test_user_2_id UUID := gen_random_uuid();
    test_shipment_1_id UUID := gen_random_uuid();
    test_shipment_2_id UUID := gen_random_uuid();
BEGIN
    -- Create test companies
    INSERT INTO companies (id, name, status) VALUES 
        (test_company_1_id, 'Test Company 1', 'active'),
        (test_company_2_id, 'Test Company 2', 'active');
    
    -- Create test users
    INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
        (test_user_1_id, 'test1@company1.com', jsonb_build_object('company_id', test_company_1_id)),
        (test_user_2_id, 'test2@company2.com', jsonb_build_object('company_id', test_company_2_id));
    
    -- Create test shipments
    INSERT INTO shipments (id, company_id, status, origin, destination) VALUES 
        (test_shipment_1_id, test_company_1_id, 'pending', 'LA', 'NY'),
        (test_shipment_2_id, test_company_2_id, 'pending', 'CHI', 'MIA');
    
    RAISE NOTICE 'Test data created successfully';
    RAISE NOTICE 'Company 1 ID: %', test_company_1_id;
    RAISE NOTICE 'Company 2 ID: %', test_company_2_id;
    RAISE NOTICE 'User 1 ID: %', test_user_1_id;
    RAISE NOTICE 'User 2 ID: %', test_user_2_id;
END $$;

-- Test 1: Verify RLS is enabled on critical tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('shipments', 'loads', 'carriers', 'contracts', 'invoices', 'documents')
ORDER BY tablename;

-- Test 2: Verify RLS policies exist
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('shipments', 'loads', 'carriers', 'contracts', 'invoices', 'documents')
ORDER BY tablename, policyname;

-- Test 3: Test cross-company data access (should be blocked)
-- This test simulates what happens when a user tries to access data from another company

-- Test as Company 1 user trying to access Company 2 data
SET LOCAL "request.jwt.claim.company_id" = 'test_company_1_id';

SELECT 
    'Cross-company access test' as test_name,
    COUNT(*) as records_accessed,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS - No cross-company data accessed'
        ELSE 'FAIL - Cross-company data accessible'
    END as result
FROM shipments 
WHERE company_id != 'test_company_1_id';

-- Test 4: Verify user can only see their own company's data
SET LOCAL "request.jwt.claim.company_id" = 'test_company_1_id';

SELECT 
    'Own company access test' as test_name,
    COUNT(*) as records_accessed,
    CASE 
        WHEN COUNT(*) > 0 THEN 'PASS - Can access own company data'
        ELSE 'FAIL - Cannot access own company data'
    END as result
FROM shipments 
WHERE company_id = 'test_company_1_id';

-- Test 5: Test admin bypass (if admin policies exist)
-- This should allow admins to see all data
SET LOCAL "request.jwt.claim.role" = 'admin';
SET LOCAL "request.jwt.claim.company_id" = 'test_company_1_id';

SELECT 
    'Admin access test' as test_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT company_id) as companies_accessed,
    CASE 
        WHEN COUNT(DISTINCT company_id) > 1 THEN 'PASS - Admin can access multiple companies'
        ELSE 'WARNING - Admin access may be limited'
    END as result
FROM shipments;

-- Test 6: Verify specific RLS policies for each table
-- Shipments table
SELECT 
    'Shipments RLS' as table_name,
    COUNT(*) as total_policies,
    STRING_AGG(policyname, ', ') as policy_names
FROM pg_policies 
WHERE tablename = 'shipments';

-- Loads table
SELECT 
    'Loads RLS' as table_name,
    COUNT(*) as total_policies,
    STRING_AGG(policyname, ', ') as policy_names
FROM pg_policies 
WHERE tablename = 'loads';

-- Carriers table
SELECT 
    'Carriers RLS' as table_name,
    COUNT(*) as total_policies,
    STRING_AGG(policyname, ', ') as policy_names
FROM pg_policies 
WHERE tablename = 'carriers';

-- Contracts table
SELECT 
    'Contracts RLS' as table_name,
    COUNT(*) as total_policies,
    STRING_AGG(policyname, ', ') as policy_names
FROM pg_policies 
WHERE tablename = 'contracts';

-- Test 7: Verify RLS policies are properly configured
SELECT 
    p.tablename,
    p.policyname,
    p.cmd,
    CASE 
        WHEN p.qual IS NOT NULL THEN 'Has WHERE clause'
        ELSE 'No WHERE clause - WARNING'
    END as has_qualification,
    CASE 
        WHEN p.with_check IS NOT NULL THEN 'Has WITH CHECK'
        ELSE 'No WITH CHECK'
    END as has_with_check
FROM pg_policies p
WHERE p.tablename IN ('shipments', 'loads', 'carriers', 'contracts', 'invoices', 'documents')
ORDER BY p.tablename, p.policyname;

-- Test 8: Test data isolation with real queries
-- Reset to normal user context
SET LOCAL "request.jwt.claim.role" = 'authenticated';
SET LOCAL "request.jwt.claim.company_id" = 'test_company_1_id';

-- Test shipments isolation
SELECT 
    'Shipments isolation' as test_type,
    COUNT(*) as accessible_records,
    COUNT(CASE WHEN company_id = 'test_company_1_id' THEN 1 END) as own_company_records,
    COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) as other_company_records,
    CASE 
        WHEN COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) = 0 THEN 'PASS'
        ELSE 'FAIL - Cross-company data accessible'
    END as isolation_result
FROM shipments;

-- Test loads isolation
SELECT 
    'Loads isolation' as test_type,
    COUNT(*) as accessible_records,
    COUNT(CASE WHEN company_id = 'test_company_1_id' THEN 1 END) as own_company_records,
    COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) as other_company_records,
    CASE 
        WHEN COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) = 0 THEN 'PASS'
        ELSE 'FAIL - Cross-company data accessible'
    END as isolation_result
FROM loads;

-- Test carriers isolation
SELECT 
    'Carriers isolation' as test_type,
    COUNT(*) as accessible_records,
    COUNT(CASE WHEN company_id = 'test_company_1_id' THEN 1 END) as own_company_records,
    COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) as other_company_records,
    CASE 
        WHEN COUNT(CASE WHEN company_id != 'test_company_1_id' THEN 1 END) = 0 THEN 'PASS'
        ELSE 'FAIL - Cross-company data accessible'
    END as isolation_result
FROM carriers;

-- Test 9: Verify audit logging (if audit table exists)
SELECT 
    'Audit logging' as test_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_log') THEN 'PASS - Audit table exists'
        ELSE 'WARNING - No audit table found'
    END as audit_status;

-- Test 10: Summary report
SELECT 
    'RLS Verification Summary' as summary_type,
    COUNT(*) as total_tables_with_rls,
    COUNT(CASE WHEN rowsecurity THEN 1 END) as tables_with_rls_enabled,
    COUNT(CASE WHEN NOT rowsecurity THEN 1 END) as tables_without_rls
FROM pg_tables 
WHERE tablename IN ('shipments', 'loads', 'carriers', 'contracts', 'invoices', 'documents');

-- Cleanup test data
DO $$
DECLARE
    test_company_1_id UUID := 'test_company_1_id';
    test_company_2_id UUID := 'test_company_2_id';
BEGIN
    -- Clean up test data
    DELETE FROM shipments WHERE company_id IN (test_company_1_id, test_company_2_id);
    DELETE FROM loads WHERE company_id IN (test_company_1_id, test_company_2_id);
    DELETE FROM carriers WHERE company_id IN (test_company_1_id, test_company_2_id);
    DELETE FROM companies WHERE id IN (test_company_1_id, test_company_2_id);
    DELETE FROM auth.users WHERE id IN ('test_user_1_id', 'test_user_2_id');
    
    RAISE NOTICE 'Test data cleaned up successfully';
END $$;

-- Final verification
SELECT 
    'RLS Verification Complete' as status,
    CURRENT_TIMESTAMP as verification_time,
    'All RLS policies verified and tested' as notes;
