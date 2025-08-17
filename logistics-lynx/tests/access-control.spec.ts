import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { accessControl, checkAccess } from '../src/lib/access-control';

// Test configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Test data
const TEST_ORG_ID = '00000000-0000-0000-0000-000000000001';
const TEST_USER_ID = '00000000-0000-0000-0000-000000000002';
const TEST_ADMIN_ID = '00000000-0000-0000-0000-000000000003';

describe('Access Control System', () => {
  beforeEach(async () => {
    // Setup test data
    await setupTestData();
  });

  afterEach(async () => {
    // Cleanup test data
    await cleanupTestData();
  });

  describe('Entitlements', () => {
    it('should allow access when organization has entitlement', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ltl'
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny access when organization lacks entitlement', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ocean'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Feature not enabled');
      expect(result.missing?.entitlement).toBe('loads.ocean');
    });

    it('should handle multiple entitlements', async () => {
      // Test with multiple entitlements
      const result1 = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'analytics.read'
      });

      const result2 = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'api_key.create'
      });

      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
    });
  });

  describe('Permissions', () => {
    it('should allow access when user has permission', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny access when user lacks permission', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'system.config'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Permission denied');
      expect(result.missing?.permission).toBe('system.config');
    });

    it('should handle role-based permissions', async () => {
      // Test broker admin permissions
      const result = await checkAccess(TEST_ORG_ID, TEST_ADMIN_ID, undefined, {
        permission: 'load.create'
      });

      expect(result.allowed).toBe(true);
    });

    it('should handle custom role permissions', async () => {
      // Create custom role and assign permissions
      await createCustomRoleWithPermissions();

      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'custom.permission'
      });

      expect(result.allowed).toBe(true);
    });
  });

  describe('ABAC (Attribute-Based Access Control)', () => {
    it('should allow access when ABAC attributes match', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'load.create',
        attributes: { lob: 'ltl', region: 'US' }
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny access when ABAC attributes do not match', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'load.create',
        attributes: { lob: 'ocean', region: 'EU' }
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('ABAC attributes not allowed');
    });

    it('should handle complex ABAC scenarios', async () => {
      // Test with multiple attributes
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'load.create',
        attributes: { 
          lob: 'ltl', 
          region: 'US', 
          carrier_type: 'asset_based' 
        }
      });

      expect(result.allowed).toBe(true);
    });
  });

  describe('Temporary Access Elevation', () => {
    it('should allow temporary access when granted', async () => {
      // Request and approve temporary access
      const requestResult = await accessControl.requestTemporaryAccess(
        TEST_ORG_ID,
        TEST_USER_ID,
        ['invoice.export'],
        'Testing temporary access',
        2
      );

      expect(requestResult.success).toBe(true);

      // Approve the request
      const approveResult = await accessControl.approveTemporaryAccess(
        requestResult.requestId!,
        TEST_ADMIN_ID,
        ['invoice.export'],
        2
      );

      expect(approveResult.success).toBe(true);

      // Check if temporary permission is active
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'invoice.export'
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny access when temporary permission expires', async () => {
      // Create expired temporary permission
      await createExpiredTemporaryPermission();

      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        permission: 'expired.permission'
      });

      expect(result.allowed).toBe(false);
    });

    it('should handle access request workflow', async () => {
      // Create access request
      const requestResult = await accessControl.requestTemporaryAccess(
        TEST_ORG_ID,
        TEST_USER_ID,
        ['payment.approve'],
        'Need to approve payments for this week',
        4
      );

      expect(requestResult.success).toBe(true);
      expect(requestResult.requestId).toBeDefined();

      // Verify request exists
      const { data: request } = await supabase
        .from('access_requests')
        .select('*')
        .eq('id', requestResult.requestId)
        .single();

      expect(request).toBeDefined();
      expect(request.status).toBe('pending');
      expect(request.requested_permissions).toContain('payment.approve');
    });
  });

  describe('API Keys', () => {
    it('should allow access when API key has permission', async () => {
      const apiKeyId = await createTestApiKey(['load.read', 'rate.read']);

      const result = await checkAccess(TEST_ORG_ID, undefined, apiKeyId, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny access when API key lacks permission', async () => {
      const apiKeyId = await createTestApiKey(['load.read']);

      const result = await checkAccess(TEST_ORG_ID, undefined, apiKeyId, {
        permission: 'load.create'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('API key permission denied');
    });

    it('should deny access when API key is inactive', async () => {
      const apiKeyId = await createInactiveApiKey(['load.read']);

      const result = await checkAccess(TEST_ORG_ID, undefined, apiKeyId, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(false);
    });

    it('should deny access when API key is expired', async () => {
      const apiKeyId = await createExpiredApiKey(['load.read']);

      const result = await checkAccess(TEST_ORG_ID, undefined, apiKeyId, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(false);
    });
  });

  describe('Combined Access Control', () => {
    it('should require both entitlement and permission', async () => {
      // Test with both entitlement and permission
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ltl',
        permission: 'load.create'
      });

      expect(result.allowed).toBe(true);
    });

    it('should deny when entitlement is missing even if permission exists', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ocean',
        permission: 'load.create'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Feature not enabled');
    });

    it('should deny when permission is missing even if entitlement exists', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ltl',
        permission: 'system.config'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Permission denied');
    });

    it('should handle complex scenarios with all three checks', async () => {
      const result = await checkAccess(TEST_ORG_ID, TEST_USER_ID, undefined, {
        entitlement: 'loads.ltl',
        permission: 'load.create',
        attributes: { lob: 'ltl', region: 'US' }
      });

      expect(result.allowed).toBe(true);
    });
  });

  describe('User Permissions', () => {
    it('should return all user permissions', async () => {
      const permissions = await accessControl.getUserPermissions(TEST_ORG_ID, TEST_USER_ID);

      expect(Array.isArray(permissions)).toBe(true);
      expect(permissions).toContain('load.read');
      expect(permissions).toContain('rate.read');
    });

    it('should include temporary permissions', async () => {
      // Grant temporary permission
      await grantTemporaryPermission(TEST_USER_ID, 'temporary.permission');

      const permissions = await accessControl.getUserPermissions(TEST_ORG_ID, TEST_USER_ID);

      expect(permissions).toContain('temporary.permission');
    });

    it('should include custom role permissions', async () => {
      // Create custom role and assign to user
      await createCustomRoleForUser();

      const permissions = await accessControl.getUserPermissions(TEST_ORG_ID, TEST_USER_ID);

      expect(permissions).toContain('custom.permission');
    });
  });

  describe('Organization Entitlements', () => {
    it('should return all organization entitlements', async () => {
      const entitlements = await accessControl.getOrganizationEntitlements(TEST_ORG_ID);

      expect(Array.isArray(entitlements)).toBe(true);
      expect(entitlements).toContain('loads.ltl');
      expect(entitlements).toContain('loads.ftl');
      expect(entitlements).toContain('analytics.read');
    });

    it('should only return active entitlements', async () => {
      // Create inactive entitlement
      await createInactiveEntitlement();

      const entitlements = await accessControl.getOrganizationEntitlements(TEST_ORG_ID);

      expect(entitlements).not.toContain('inactive.feature');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Test with invalid org ID
      const result = await checkAccess('invalid-uuid', TEST_USER_ID, undefined, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('Internal error');
    });

    it('should handle missing user gracefully', async () => {
      const result = await checkAccess(TEST_ORG_ID, 'non-existent-user', undefined, {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(false);
    });

    it('should handle missing API key gracefully', async () => {
      const result = await checkAccess(TEST_ORG_ID, undefined, 'non-existent-key', {
        permission: 'load.read'
      });

      expect(result.allowed).toBe(false);
    });
  });
});

// Helper functions for test setup
async function setupTestData() {
  // Create test organization memberships
  await supabase.from('org_memberships').upsert([
    {
      org_id: TEST_ORG_ID,
      user_id: TEST_USER_ID,
      role: 'broker_admin',
      status: 'active'
    },
    {
      org_id: TEST_ORG_ID,
      user_id: TEST_ADMIN_ID,
      role: 'admin',
      status: 'active'
    }
  ]);

  // Create test entitlements
  await supabase.from('entitlements').upsert([
    {
      org_id: TEST_ORG_ID,
      feature_key: 'loads.ltl',
      plan_tier: 'free',
      is_active: true
    },
    {
      org_id: TEST_ORG_ID,
      feature_key: 'loads.ftl',
      plan_tier: 'free',
      is_active: true
    },
    {
      org_id: TEST_ORG_ID,
      feature_key: 'analytics.read',
      plan_tier: 'free',
      is_active: true
    },
    {
      org_id: TEST_ORG_ID,
      feature_key: 'api_key.create',
      plan_tier: 'free',
      is_active: true
    }
  ]);

  // Create test ABAC scopes
  await supabase.from('permission_scopes').upsert([
    {
      org_id: TEST_ORG_ID,
      subject_type: 'role',
      subject_key: 'broker_admin',
      attribute: { lob: ['ltl', 'ftl'], region: ['US', 'CA'] }
    }
  ]);
}

async function cleanupTestData() {
  // Clean up test data
  await supabase.from('temporary_permissions').delete().eq('user_id', TEST_USER_ID);
  await supabase.from('access_requests').delete().eq('user_id', TEST_USER_ID);
  await supabase.from('user_custom_roles').delete().eq('user_id', TEST_USER_ID);
  await supabase.from('custom_roles').delete().eq('org_id', TEST_ORG_ID);
  await supabase.from('api_keys').delete().eq('org_id', TEST_ORG_ID);
  await supabase.from('permission_scopes').delete().eq('org_id', TEST_ORG_ID);
  await supabase.from('entitlements').delete().eq('org_id', TEST_ORG_ID);
  await supabase.from('org_memberships').delete().eq('org_id', TEST_ORG_ID);
}

async function createCustomRoleWithPermissions() {
  const { data: customRole } = await supabase
    .from('custom_roles')
    .insert({
      org_id: TEST_ORG_ID,
      key: 'test_custom_role',
      label: 'Test Custom Role',
      description: 'Test custom role for testing'
    })
    .select()
    .single();

  await supabase.from('custom_role_permissions').insert({
    custom_role_id: customRole.id,
    permission_key: 'custom.permission'
  });

  await supabase.from('user_custom_roles').insert({
    org_id: TEST_ORG_ID,
    user_id: TEST_USER_ID,
    custom_role_id: customRole.id
  });
}

async function createExpiredTemporaryPermission() {
  const expiredDate = new Date();
  expiredDate.setHours(expiredDate.getHours() - 1);

  await supabase.from('temporary_permissions').insert({
    user_id: TEST_USER_ID,
    permission_key: 'expired.permission',
    expires_at: expiredDate
  });
}

async function createTestApiKey(scopes: string[]) {
  const { data: apiKey } = await supabase
    .from('api_keys')
    .insert({
      org_id: TEST_ORG_ID,
      name: 'Test API Key',
      key_hash: 'test-hash',
      scopes,
      is_active: true
    })
    .select()
    .single();

  return apiKey.id;
}

async function createInactiveApiKey(scopes: string[]) {
  const { data: apiKey } = await supabase
    .from('api_keys')
    .insert({
      org_id: TEST_ORG_ID,
      name: 'Inactive API Key',
      key_hash: 'inactive-hash',
      scopes,
      is_active: false
    })
    .select()
    .single();

  return apiKey.id;
}

async function createExpiredApiKey(scopes: string[]) {
  const expiredDate = new Date();
  expiredDate.setHours(expiredDate.getHours() - 1);

  const { data: apiKey } = await supabase
    .from('api_keys')
    .insert({
      org_id: TEST_ORG_ID,
      name: 'Expired API Key',
      key_hash: 'expired-hash',
      scopes,
      is_active: true,
      expires_at: expiredDate
    })
    .select()
    .single();

  return apiKey.id;
}

async function grantTemporaryPermission(userId: string, permission: string) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 2);

  await supabase.from('temporary_permissions').insert({
    user_id: userId,
    permission_key: permission,
    expires_at: expiresAt
  });
}

async function createCustomRoleForUser() {
  const { data: customRole } = await supabase
    .from('custom_roles')
    .insert({
      org_id: TEST_ORG_ID,
      key: 'user_custom_role',
      label: 'User Custom Role',
      description: 'Custom role for user testing'
    })
    .select()
    .single();

  await supabase.from('custom_role_permissions').insert({
    custom_role_id: customRole.id,
    permission_key: 'custom.permission'
  });

  await supabase.from('user_custom_roles').insert({
    org_id: TEST_ORG_ID,
    user_id: TEST_USER_ID,
    custom_role_id: customRole.id
  });
}

async function createInactiveEntitlement() {
  await supabase.from('entitlements').insert({
    org_id: TEST_ORG_ID,
    feature_key: 'inactive.feature',
    plan_tier: 'free',
    is_active: false
  });
}
