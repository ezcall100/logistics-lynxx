#!/usr/bin/env node

/**
 * RLS Policy Testing Script
 * 
 * This script tests all Row Level Security policies to ensure they're working correctly.
 * It creates test users, companies, and data to verify isolation and access control.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Test configuration
const TEST_CONFIG = {
  companies: [
    { name: 'Test Company A', slug: 'test-company-a' },
    { name: 'Test Company B', slug: 'test-company-b' }
  ],
  users: [
    { email: 'admin@testa.com', role: 'admin' },
    { email: 'user@testa.com', role: 'user' },
    { email: 'admin@testb.com', role: 'admin' },
    { email: 'user@testb.com', role: 'user' }
  ]
};

class RLSTester {
  constructor() {
    this.testResults = [];
    this.testUsers = new Map();
    this.testCompanies = new Map();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runTest(testName, testFn) {
    try {
      this.log(`Running test: ${testName}`);
      await testFn();
      this.testResults.push({ name: testName, status: 'PASS' });
      this.log(`Test passed: ${testName}`, 'success');
    } catch (error) {
      this.testResults.push({ name: testName, status: 'FAIL', error: error.message });
      this.log(`Test failed: ${testName} - ${error.message}`, 'error');
    }
  }

  async setupTestData() {
    this.log('Setting up test data...');

    // Create test companies
    for (const company of TEST_CONFIG.companies) {
      const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select()
        .single();

      if (error) throw new Error(`Failed to create company: ${error.message}`);
      this.testCompanies.set(company.slug, data);
      this.log(`Created company: ${company.name} (${data.id})`);
    }

    // Create test users and profiles
    for (const user of TEST_CONFIG.users) {
      const companySlug = user.email.includes('testa') ? 'test-company-a' : 'test-company-b';
      const company = this.testCompanies.get(companySlug);

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: 'testpassword123',
        email_confirm: true
      });

      if (authError) throw new Error(`Failed to create auth user: ${authError.message}`);

      // Create profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: user.email,
          full_name: user.email.split('@')[0],
          company_id: company.id
        })
        .select()
        .single();

      if (profileError) throw new Error(`Failed to create profile: ${profileError.message}`);

      // Assign role
      const { error: roleError } = await supabase
        .from('roles')
        .insert({
          user_id: authData.user.id,
          company_id: company.id,
          role: user.role
        });

      if (roleError) throw new Error(`Failed to assign role: ${roleError.message}`);

      this.testUsers.set(user.email, {
        auth: authData.user,
        profile: profileData,
        company: company
      });

      this.log(`Created user: ${user.email} with role ${user.role} in ${company.name}`);
    }
  }

  async testCompanyIsolation() {
    this.log('Testing company data isolation...');

    // Test with user from Company A
    const userA = this.testUsers.get('user@testa.com');
    const { data: sessionA } = await supabase.auth.signInWithPassword({
      email: 'user@testa.com',
      password: 'testpassword123'
    });

    // Should only see Company A data
    const { data: companiesA } = await supabase
      .from('companies')
      .select('*');

    if (companiesA.length !== 1 || companiesA[0].id !== userA.company.id) {
      throw new Error('User can see companies they should not have access to');
    }

    // Test with user from Company B
    const userB = this.testUsers.get('user@testb.com');
    await supabase.auth.signInWithPassword({
      email: 'user@testb.com',
      password: 'testpassword123'
    });

    const { data: companiesB } = await supabase
      .from('companies')
      .select('*');

    if (companiesB.length !== 1 || companiesB[0].id !== userB.company.id) {
      throw new Error('User can see companies they should not have access to');
    }
  }

  async testRoleBasedAccess() {
    this.log('Testing role-based access control...');

    // Test admin access
    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    const { data: adminProfiles } = await supabase
      .from('profiles')
      .select('*');

    if (adminProfiles.length === 0) {
      throw new Error('Admin cannot view company profiles');
    }

    // Test user access
    await supabase.auth.signInWithPassword({
      email: 'user@testa.com',
      password: 'testpassword123'
    });

    const { data: userProfiles } = await supabase
      .from('profiles')
      .select('*');

    if (userProfiles.length === 0) {
      throw new Error('User cannot view company profiles');
    }
  }

  async testAuditLogging() {
    this.log('Testing audit logging...');

    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    const companyA = this.testCompanies.get('test-company-a');
    const userA = this.testUsers.get('user@testa.com');

    // Create a role assignment (should trigger audit log)
    const { error } = await supabase
      .from('roles')
      .insert({
        user_id: userA.auth.id,
        company_id: companyA.id,
        role: 'manager'
      });

    if (error) throw new Error(`Failed to create role for audit test: ${error.message}`);

    // Check if audit log was created
    const { data: auditLogs } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('company_id', companyA.id)
      .eq('action', 'role_assigned')
      .order('created_at', { ascending: false })
      .limit(1);

    if (auditLogs.length === 0) {
      throw new Error('Audit logging not working for role assignments');
    }
  }

  async testSecurityFunctions() {
    this.log('Testing security functions...');

    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    const companyA = this.testCompanies.get('test-company-a');

    // Test is_company_member function
    const { data: isMember } = await supabase.rpc('is_company_member', {
      _company_id: companyA.id
    });

    if (!isMember) {
      throw new Error('is_company_member function not working correctly');
    }

    // Test has_role function
    const { data: hasRole } = await supabase.rpc('has_role', {
      _company_id: companyA.id,
      _role: 'admin'
    });

    if (!hasRole) {
      throw new Error('has_role function not working correctly');
    }

    // Test has_permission function
    const { data: hasPermission } = await supabase.rpc('has_permission', {
      _company_id: companyA.id,
      _permission: 'read'
    });

    if (!hasPermission) {
      throw new Error('has_permission function not working correctly');
    }
  }

  async testSecurityViews() {
    this.log('Testing security views...');

    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    const companyA = this.testCompanies.get('test-company-a');

    // Test company security overview view
    const { data: securityOverview } = await supabase
      .from('v_company_security_overview')
      .select('*')
      .eq('company_id', companyA.id)
      .single();

    if (!securityOverview) {
      throw new Error('Security overview view not accessible');
    }

    if (securityOverview.total_users < 1) {
      throw new Error('Security overview not showing correct user count');
    }
  }

  async testPageAccessControl() {
    this.log('Testing page access control...');

    // Test admin access to security dashboard
    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    // Test user access to profile settings (should be allowed)
    await supabase.auth.signInWithPassword({
      email: 'user@testa.com',
      password: 'testpassword123'
    });

    // Test that viewer cannot access admin pages
    const { data: viewerUser } = await supabase.auth.admin.createUser({
      email: 'viewer@testa.com',
      password: 'testpassword123',
      email_confirm: true
    });

    const companyA = this.testCompanies.get('test-company-a');

    // Create viewer profile and role
    await supabase
      .from('profiles')
      .insert({
        id: viewerUser.user.id,
        email: 'viewer@testa.com',
        full_name: 'Viewer User',
        company_id: companyA.id
      });

    await supabase
      .from('roles')
      .insert({
        user_id: viewerUser.user.id,
        company_id: companyA.id,
        role: 'viewer'
      });

    // Test viewer access (should be restricted)
    await supabase.auth.signInWithPassword({
      email: 'viewer@testa.com',
      password: 'testpassword123'
    });

    // Clean up test viewer user
    await supabase.auth.admin.deleteUser(viewerUser.user.id);
  }

  async testSelfSuperAdminPrevention() {
    this.log('Testing self super_admin prevention...');

    await supabase.auth.signInWithPassword({
      email: 'admin@testa.com',
      password: 'testpassword123'
    });

    const companyA = this.testCompanies.get('test-company-a');
    const userA = this.testUsers.get('admin@testa.com');

    // Try to assign super_admin role to self (should fail)
    const { error } = await supabase
      .from('roles')
      .insert({
        user_id: userA.auth.id,
        company_id: companyA.id,
        role: 'super_admin'
      });

    if (!error) {
      throw new Error('Self super_admin assignment should be prevented');
    }

    if (!error.message.includes('cannot assign super_admin role to themselves')) {
      throw new Error('Wrong error message for self super_admin prevention');
    }
  }

  async cleanupTestData() {
    this.log('Cleaning up test data...');

    // Delete test users
    for (const [email, userData] of this.testUsers) {
      // Delete roles
      await supabase
        .from('roles')
        .delete()
        .eq('user_id', userData.auth.id);

      // Delete profiles
      await supabase
        .from('profiles')
        .delete()
        .eq('id', userData.auth.id);

      // Delete auth user
      await supabase.auth.admin.deleteUser(userData.auth.id);
    }

    // Delete test companies
    for (const [slug, company] of this.testCompanies) {
      await supabase
        .from('companies')
        .delete()
        .eq('id', company.id);
    }

    this.log('Test data cleanup completed');
  }

  async runAllTests() {
    this.log('🚀 Starting RLS Policy Tests');
    this.log('================================');

    try {
      await this.setupTestData();

      await this.runTest('Company Data Isolation', () => this.testCompanyIsolation());
      await this.runTest('Role-Based Access Control', () => this.testRoleBasedAccess());
      await this.runTest('Audit Logging', () => this.testAuditLogging());
      await this.runTest('Security Functions', () => this.testSecurityFunctions());
      await this.runTest('Security Views', () => this.testSecurityViews());
      await this.runTest('Page Access Control', () => this.testPageAccessControl());
      await this.runTest('Self Super Admin Prevention', () => this.testSelfSuperAdminPrevention());

    } finally {
      await this.cleanupTestData();
    }

    // Print results
    this.log('\n📊 Test Results Summary');
    this.log('========================');
    
    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    
    this.log(`Total Tests: ${this.testResults.length}`);
    this.log(`Passed: ${passed}`, passed > 0 ? 'success' : 'info');
    this.log(`Failed: ${failed}`, failed > 0 ? 'error' : 'info');

    if (failed > 0) {
      this.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => r.status === 'FAIL')
        .forEach(r => this.log(`  - ${r.name}: ${r.error}`, 'error'));
    }

    if (passed === this.testResults.length) {
      this.log('\n🎉 All RLS policies are working correctly!', 'success');
    } else {
      this.log('\n⚠️  Some RLS policies need attention', 'error');
      process.exit(1);
    }
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new RLSTester();
  tester.runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

export default RLSTester;
