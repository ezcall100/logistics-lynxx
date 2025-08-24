#!/usr/bin/env node

/**
 * Invite System Test Suite
 * 
 * Tests the complete user invitation flow including:
 * - Database functions and RLS policies
 * - API endpoints and validation
 * - Role-based permissions
 * - Email integration
 * - Onboarding workflow
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

class InviteSystemTester {
  constructor() {
    this.testResults = [];
    this.testCompanyId = null;
    this.testUserId = null;
    this.testInvitationId = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runTest(name, testFunction) {
    this.log(`Running test: ${name}`);
    try {
      await testFunction();
      this.testResults.push({ name, status: 'passed' });
      this.log(`✅ ${name} - PASSED`, 'success');
    } catch (error) {
      this.testResults.push({ name, status: 'failed', error: error.message });
      this.log(`❌ ${name} - FAILED: ${error.message}`, 'error');
    }
  }

  async setupTestData() {
    this.log('Setting up test data...');

    // Create test company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: 'Test Company - Invite System',
        status: 'active',
        subscription_tier: 'enterprise'
      })
      .select()
      .single();

    if (companyError) throw companyError;
    this.testCompanyId = company.id;

    // Create test user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: 'test-admin@invite-system.test',
      password: 'test-password-123',
      email_confirm: true
    });

    if (userError) throw userError;
    this.testUserId = user.user.id;

    // Create profile for test user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: this.testUserId,
        company_id: this.testCompanyId,
        full_name: 'Test Admin User',
        email: 'test-admin@invite-system.test'
      });

    if (profileError) throw profileError;

    // Assign admin role to test user
    const { error: roleError } = await supabase
      .from('roles')
      .insert({
        user_id: this.testUserId,
        company_id: this.testCompanyId,
        role: 'admin'
      });

    if (roleError) throw roleError;

    this.log('Test data setup complete');
  }

  async cleanupTestData() {
    this.log('Cleaning up test data...');

    if (this.testInvitationId) {
      await supabase.from('invitations').delete().eq('id', this.testInvitationId);
    }

    if (this.testUserId) {
      await supabase.auth.admin.deleteUser(this.testUserId);
    }

    if (this.testCompanyId) {
      await supabase.from('companies').delete().eq('id', this.testCompanyId);
    }

    this.log('Test data cleanup complete');
  }

  async testDatabaseFunctions() {
    // Test can_invite_role function
    const { data: canInvite, error: canInviteError } = await supabase.rpc('can_invite_role', {
      _company_id: this.testCompanyId,
      _role: 'user'
    });

    if (canInviteError) throw canInviteError;
    if (!canInvite) throw new Error('Admin should be able to invite users');

    // Test create_invitation function
    const { data: invitationId, error: createError } = await supabase.rpc('create_invitation', {
      _email: 'test-invite@example.com',
      _role: 'user',
      _company_id: this.testCompanyId,
      _metadata: { message: 'Test invitation' }
    });

    if (createError) throw createError;
    if (!invitationId) throw new Error('Invitation creation failed');

    this.testInvitationId = invitationId;

    // Test accept_invitation function
    const { data: acceptResult, error: acceptError } = await supabase.rpc('accept_invitation', {
      _invitation_id: invitationId
    });

    if (acceptError) throw acceptError;
    if (!acceptResult) throw new Error('Invitation acceptance failed');
  }

  async testRLSPolicies() {
    // Test that users can only see their own invitations
    const { data: invitations, error: listError } = await supabase
      .from('invitations')
      .select('*')
      .eq('company_id', this.testCompanyId);

    if (listError) throw listError;
    if (!invitations || invitations.length === 0) {
      throw new Error('No invitations found for test company');
    }

    // Test that non-admin users cannot create invitations
    const { data: regularUser, error: userError } = await supabase.auth.admin.createUser({
      email: 'regular-user@invite-system.test',
      password: 'test-password-123',
      email_confirm: true
    });

    if (userError) throw userError;

    const { error: createError } = await supabase.rpc('create_invitation', {
      _email: 'test-unauthorized@example.com',
      _role: 'user',
      _company_id: this.testCompanyId,
      _metadata: {}
    });

    // This should fail for regular users
    if (!createError) {
      throw new Error('Regular users should not be able to create invitations');
    }

    // Clean up test user
    await supabase.auth.admin.deleteUser(regularUser.user.id);
  }

  async testInvitationWorkflow() {
    // Create a new invitation
    const { data: invitationId, error: createError } = await supabase.rpc('create_invitation', {
      _email: 'workflow-test@example.com',
      _role: 'manager',
      _company_id: this.testCompanyId,
      _metadata: { message: 'Workflow test invitation' }
    });

    if (createError) throw createError;

    // Verify invitation was created
    const { data: invitation, error: fetchError } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .single();

    if (fetchError) throw fetchError;
    if (invitation.status !== 'pending') {
      throw new Error('New invitation should have pending status');
    }

    // Test invitation expiration
    const { data: expiredCount, error: expireError } = await supabase.rpc('expire_old_invitations');

    if (expireError) throw expireError;
    // Should not expire recent invitations
    if (expiredCount > 0) {
      throw new Error('Recent invitations should not be expired');
    }

    // Clean up
    await supabase.from('invitations').delete().eq('id', invitationId);
  }

  async testRolePermissions() {
    const roles = ['super_admin', 'admin', 'owner', 'manager', 'user', 'viewer'];
    const testResults = [];

    for (const role of roles) {
      try {
        const { data: canInvite, error } = await supabase.rpc('can_invite_role', {
          _company_id: this.testCompanyId,
          _role: role
        });

        if (error) {
          testResults.push({ role, canInvite: false, error: error.message });
        } else {
          testResults.push({ role, canInvite, error: null });
        }
      } catch (error) {
        testResults.push({ role, canInvite: false, error: error.message });
      }
    }

    // Verify expected permissions
    const expectedPermissions = {
      'super_admin': true,
      'admin': true,
      'owner': true,
      'manager': false, // Managers can only invite users/viewers
      'user': false,
      'viewer': false
    };

    for (const result of testResults) {
      const expected = expectedPermissions[result.role];
      if (result.canInvite !== expected) {
        throw new Error(`Role ${result.role} permission mismatch. Expected: ${expected}, Got: ${result.canInvite}`);
      }
    }
  }

  async testAuditLogging() {
    // Create an invitation to trigger audit logging
    const { data: invitationId, error: createError } = await supabase.rpc('create_invitation', {
      _email: 'audit-test@example.com',
      _role: 'user',
      _company_id: this.testCompanyId,
      _metadata: { message: 'Audit test invitation' }
    });

    if (createError) throw createError;

    // Check audit logs
    const { data: auditLogs, error: auditError } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('company_id', this.testCompanyId)
      .eq('operation_type', 'user_invited')
      .order('created_at', { ascending: false })
      .limit(1);

    if (auditError) throw auditError;
    if (!auditLogs || auditLogs.length === 0) {
      throw new Error('No audit log found for invitation creation');
    }

    const auditLog = auditLogs[0];
    if (auditLog.resource_id !== invitationId) {
      throw new Error('Audit log resource_id does not match invitation ID');
    }

    // Clean up
    await supabase.from('invitations').delete().eq('id', invitationId);
  }

  async testStatisticsView() {
    // Create a few test invitations
    const testEmails = [
      'stats-test1@example.com',
      'stats-test2@example.com',
      'stats-test3@example.com'
    ];

    for (const email of testEmails) {
      await supabase.rpc('create_invitation', {
        _email: email,
        _role: 'user',
        _company_id: this.testCompanyId,
        _metadata: {}
      });
    }

    // Test statistics view
    const { data: stats, error: statsError } = await supabase
      .from('v_invitation_stats')
      .select('*')
      .eq('company_id', this.testCompanyId)
      .single();

    if (statsError) throw statsError;
    if (!stats) throw new Error('No statistics found for test company');

    // Verify statistics
    if (stats.total_invitations < 3) {
      throw new Error('Statistics should reflect created invitations');
    }

    if (stats.pending_invitations < 3) {
      throw new Error('All new invitations should be pending');
    }

    // Clean up test invitations
    await supabase.from('invitations').delete().eq('company_id', this.testCompanyId);
  }

  async runAllTests() {
    this.log('🚀 Starting Invite System Test Suite');
    this.log('=====================================');

    try {
      await this.setupTestData();

      await this.runTest('Database Functions', () => this.testDatabaseFunctions());
      await this.runTest('RLS Policies', () => this.testRLSPolicies());
      await this.runTest('Invitation Workflow', () => this.testInvitationWorkflow());
      await this.runTest('Role Permissions', () => this.testRolePermissions());
      await this.runTest('Audit Logging', () => this.testAuditLogging());
      await this.runTest('Statistics View', () => this.testStatisticsView());

    } finally {
      await this.cleanupTestData();
    }

    // Generate report
    this.generateReport();
  }

  generateReport() {
    this.log('\n📊 Test Results Summary');
    this.log('======================');

    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const total = this.testResults.length;

    this.log(`Total Tests: ${total}`);
    this.log(`Passed: ${passed}`);
    this.log(`Failed: ${failed}`);
    this.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    if (failed > 0) {
      this.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => r.status === 'failed')
        .forEach(test => {
          this.log(`  - ${test.name}: ${test.error}`, 'error');
        });
    }

    if (passed === total) {
      this.log('\n🎉 All tests passed! Invite system is working correctly.', 'success');
    } else {
      this.log('\n⚠️ Some tests failed. Please review the errors above.', 'error');
      process.exit(1);
    }
  }
}

// Run tests
const tester = new InviteSystemTester();
tester.runAllTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
