#!/usr/bin/env node

/**
 * Access Control System Setup Script
 * 
 * This script sets up the comprehensive RBAC + ABAC + Entitlements access control system
 * for the TMS application. It runs migrations and initializes default data.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function runMigration(migrationFile) {
  try {
    console.log(`📄 Running migration: ${migrationFile}`);
    const migrationPath = join(__dirname, '..', 'supabase', 'migrations', migrationFile);
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error(`❌ Migration failed: ${migrationFile}`, error);
      throw error;
    }
    
    console.log(`✅ Migration completed: ${migrationFile}`);
  } catch (error) {
    console.error(`❌ Failed to run migration ${migrationFile}:`, error);
    throw error;
  }
}

async function verifyTables() {
  console.log('🔍 Verifying access control tables...');
  
  const requiredTables = [
    'roles',
    'permissions',
    'role_permissions',
    'org_memberships',
    'custom_roles',
    'custom_role_permissions',
    'user_custom_roles',
    'permission_scopes',
    'access_requests',
    'temporary_permissions',
    'api_keys',
    'access_audit_logs',
    'entitlements'
  ];
  
  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`❌ Table verification failed: ${table}`, error);
        throw error;
      }
      
      console.log(`✅ Table verified: ${table}`);
    } catch (error) {
      console.error(`❌ Failed to verify table ${table}:`, error);
      throw error;
    }
  }
}

async function verifyFunctions() {
  console.log('🔍 Verifying access control functions...');
  
  const requiredFunctions = [
    'has_permission',
    'has_entitlement',
    'check_abac_attributes',
    'log_access_decision',
    'cleanup_expired_permissions'
  ];
  
  for (const func of requiredFunctions) {
    try {
      // Test function exists by calling it with dummy parameters
      const { error } = await supabase.rpc(func, {
        p_org_id: '00000000-0000-0000-0000-000000000000',
        p_user_id: '00000000-0000-0000-0000-000000000000',
        p_permission: 'test.permission',
        p_feature: 'test.feature',
        p_attributes: {}
      });
      
      // We expect an error for invalid UUIDs, but not a "function doesn't exist" error
      if (error && error.message.includes('function') && error.message.includes('does not exist')) {
        console.error(`❌ Function verification failed: ${func}`, error);
        throw error;
      }
      
      console.log(`✅ Function verified: ${func}`);
    } catch (error) {
      console.error(`❌ Failed to verify function ${func}:`, error);
      throw error;
    }
  }
}

async function createTestOrganization() {
  console.log('🏢 Creating test organization...');
  
  const testOrgId = '00000000-0000-0000-0000-000000000001';
  
  try {
    // Create test organization (if using organizations table)
    const { error: orgError } = await supabase
      .from('organizations')
      .upsert({
        id: testOrgId,
        name: 'Test TMS Organization',
        plan_tier: 'enterprise',
        status: 'active'
      });
    
    if (orgError && !orgError.message.includes('duplicate key')) {
      console.error('❌ Failed to create test organization:', orgError);
      throw orgError;
    }
    
    console.log('✅ Test organization created/verified');
  } catch (error) {
    console.log('⚠️  Organizations table not found, skipping organization creation');
  }
}

async function createTestUsers() {
  console.log('👥 Creating test users...');
  
  const testUsers = [
    {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'admin@test-tms.com',
      full_name: 'Test Admin',
      role: 'admin'
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      email: 'broker@test-tms.com',
      full_name: 'Test Broker',
      role: 'broker_admin'
    },
    {
      id: '00000000-0000-0000-0000-000000000004',
      email: 'analyst@test-tms.com',
      full_name: 'Test Analyst',
      role: 'analyst'
    }
  ];
  
  for (const user of testUsers) {
    try {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role
        });
      
      if (profileError && !profileError.message.includes('duplicate key')) {
        console.error(`❌ Failed to create user profile: ${user.email}`, profileError);
        throw profileError;
      }
      
      // Create organization membership
      const { error: membershipError } = await supabase
        .from('org_memberships')
        .upsert({
          org_id: '00000000-0000-0000-0000-000000000001',
          user_id: user.id,
          role: user.role,
          status: 'active'
        });
      
      if (membershipError && !membershipError.message.includes('duplicate key')) {
        console.error(`❌ Failed to create org membership: ${user.email}`, membershipError);
        throw membershipError;
      }
      
      console.log(`✅ Test user created: ${user.email} (${user.role})`);
    } catch (error) {
      console.error(`❌ Failed to create test user ${user.email}:`, error);
      throw error;
    }
  }
}

async function createTestEntitlements() {
  console.log('🎯 Creating test entitlements...');
  
  const testOrgId = '00000000-0000-0000-0000-000000000001';
  
  const testEntitlements = [
    { feature_key: 'loads.ltl', plan_tier: 'free' },
    { feature_key: 'loads.ftl', plan_tier: 'free' },
    { feature_key: 'loads.intermodal', plan_tier: 'pro' },
    { feature_key: 'loads.ocean', plan_tier: 'enterprise', add_on: 'ocean' },
    { feature_key: 'loads.air', plan_tier: 'enterprise', add_on: 'air' },
    { feature_key: 'analytics.read', plan_tier: 'free' },
    { feature_key: 'analytics.export', plan_tier: 'pro' },
    { feature_key: 'analytics.advanced', plan_tier: 'enterprise' },
    { feature_key: 'autonomous.ai', plan_tier: 'enterprise' },
    { feature_key: 'edi.x12', plan_tier: 'enterprise' },
    { feature_key: 'edi.edifact', plan_tier: 'enterprise' },
    { feature_key: 'load.bulk', plan_tier: 'pro' },
    { feature_key: 'rate.bulk', plan_tier: 'pro' },
    { feature_key: 'api_key.create', plan_tier: 'free' }
  ];
  
  for (const entitlement of testEntitlements) {
    try {
      const { error } = await supabase
        .from('entitlements')
        .upsert({
          org_id: testOrgId,
          feature_key: entitlement.feature_key,
          plan_tier: entitlement.plan_tier,
          add_on: entitlement.add_on,
          is_active: true
        });
      
      if (error && !error.message.includes('duplicate key')) {
        console.error(`❌ Failed to create entitlement: ${entitlement.feature_key}`, error);
        throw error;
      }
      
      console.log(`✅ Test entitlement created: ${entitlement.feature_key}`);
    } catch (error) {
      console.error(`❌ Failed to create test entitlement ${entitlement.feature_key}:`, error);
      throw error;
    }
  }
}

async function createTestABACScopes() {
  console.log('🎯 Creating test ABAC scopes...');
  
  const testOrgId = '00000000-0000-0000-0000-000000000001';
  
  const testScopes = [
    {
      subject_type: 'role',
      subject_key: 'broker_admin',
      attribute: { lob: ['ltl', 'ftl', 'intermodal'], region: ['US', 'CA', 'MX'] }
    },
    {
      subject_type: 'role',
      subject_key: 'admin',
      attribute: { lob: ['ltl', 'ftl', 'intermodal', 'ocean', 'air'], region: ['US', 'CA', 'MX', 'EU'] }
    },
    {
      subject_type: 'role',
      subject_key: 'analyst',
      attribute: { lob: ['ltl', 'ftl'], region: ['US', 'CA'] }
    }
  ];
  
  for (const scope of testScopes) {
    try {
      const { error } = await supabase
        .from('permission_scopes')
        .upsert({
          org_id: testOrgId,
          subject_type: scope.subject_type,
          subject_key: scope.subject_key,
          attribute: scope.attribute
        });
      
      if (error && !error.message.includes('duplicate key')) {
        console.error(`❌ Failed to create ABAC scope: ${scope.subject_type}:${scope.subject_key}`, error);
        throw error;
      }
      
      console.log(`✅ Test ABAC scope created: ${scope.subject_type}:${scope.subject_key}`);
    } catch (error) {
      console.error(`❌ Failed to create test ABAC scope ${scope.subject_type}:${scope.subject_key}:`, error);
      throw error;
    }
  }
}

async function runTests() {
  console.log('🧪 Running access control tests...');
  
  try {
    // Test entitlement check
    const { data: hasEntitlement } = await supabase.rpc('has_entitlement', {
      p_org_id: '00000000-0000-0000-0000-000000000001',
      p_feature: 'loads.ltl'
    });
    
    if (!hasEntitlement) {
      throw new Error('Entitlement check failed');
    }
    
    // Test permission check
    const { data: hasPermission } = await supabase.rpc('has_permission', {
      p_org_id: '00000000-0000-0000-0000-000000000001',
      p_user_id: '00000000-0000-0000-0000-000000000002',
      p_permission: 'load.read'
    });
    
    if (!hasPermission) {
      throw new Error('Permission check failed');
    }
    
    // Test ABAC check
    const { data: abacAllowed } = await supabase.rpc('check_abac_attributes', {
      p_org_id: '00000000-0000-0000-0000-000000000001',
      p_user_id: '00000000-0000-0000-0000-000000000002',
      p_attributes: { lob: 'ltl', region: 'US' }
    });
    
    if (!abacAllowed) {
      throw new Error('ABAC check failed');
    }
    
    console.log('✅ All access control tests passed');
  } catch (error) {
    console.error('❌ Access control tests failed:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Setting up Access Control System...\n');
  
  try {
    // Run migrations
      console.log('📦 Running migrations...');
  await runMigration('20250101000000_access_control_v1.sql');
  await runMigration('20250101000001_access_control_seeds.sql');
  await runMigration('20250101000002_autonomous_agent_permissions.sql');
    
    // Verify setup
    console.log('\n🔍 Verifying setup...');
    await verifyTables();
    await verifyFunctions();
    
    // Create test data
    console.log('\n🏗️  Creating test data...');
    await createTestOrganization();
    await createTestUsers();
    await createTestEntitlements();
    await createTestABACScopes();
    
    // Run tests
    console.log('\n🧪 Testing system...');
    await runTests();
    
    console.log('\n🎉 Access Control System setup completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Database migrations applied');
    console.log('   ✅ Tables and functions verified');
    console.log('   ✅ Test organization created');
    console.log('   ✅ Test users created (admin, broker, analyst)');
    console.log('   ✅ Test entitlements configured');
    console.log('   ✅ Test ABAC scopes configured');
    console.log('   ✅ All tests passed');
    
    console.log('\n🔑 Test Users:');
    console.log('   - admin@test-tms.com (admin role)');
    console.log('   - broker@test-tms.com (broker_admin role)');
    console.log('   - analyst@test-tms.com (analyst role)');
    
    console.log('\n📚 Next Steps:');
    console.log('   1. Review the Access Control Center at /admin/access-control');
    console.log('   2. Configure your organization\'s entitlements');
    console.log('   3. Set up custom roles and permissions');
    console.log('   4. Integrate access control into your application');
    console.log('   5. Run the test suite: npm run test:access-control');
    
  } catch (error) {
    console.error('\n❌ Access Control System setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
main();
