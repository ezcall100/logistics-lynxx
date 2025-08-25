import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request, Response, NextFunction } from 'express';

// Types for access control
export interface AccessControlConfig {
  entitlement?: string;
  permission?: string;
  attributes?: Record<string, unknown>;
  resource?: string;
  action?: string;
}

export interface AccessDecision {
  allowed: boolean;
  reason?: string;
  missing?: {
    entitlement?: string;
    permission?: string;
    attributes?: Record<string, unknown>;
  };
}

export interface AuditLogData {
  orgId: string;
  userId?: string;
  apiKeyId?: string;
  permission?: string;
  entitlement?: string;
  resource?: string;
  action?: string;
  attributes?: Record<string, unknown>;
  result: 'allow' | 'deny';
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  traceId?: string;
}

// Access Control Middleware
export class AccessControl {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env['SUPABASE_URL']!,
process.env['SUPABASE_SERVICE_ROLE_KEY']!
    );
  }

  /**
   * Middleware to require specific access (entitlement + permission + ABAC)
   */
  requireAccess(config: AccessControlConfig) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const orgId = req.auth?.org_id;
        const userId = req.auth?.sub;
        const apiKeyId = req.auth?.api_key_id;

        if (!orgId) {
          return this.denyAccess(res, {
            orgId,
            userId,
            apiKeyId,
            permission: config.permission,
            entitlement: config.entitlement,
            resource: config.resource,
            action: config.action,
            attributes: config.attributes,
            result: 'deny',
            reason: 'No organization ID provided',
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            traceId: req.headers['x-trace-id'] as string
          });
        }

        // Check entitlement if required
        if (config.entitlement) {
          const hasEntitlement = await this.checkEntitlement(orgId, config.entitlement);
          if (!hasEntitlement) {
            return this.denyAccess(res, {
              orgId,
              userId,
              apiKeyId,
              permission: config.permission,
              entitlement: config.entitlement,
              resource: config.resource,
              action: config.action,
              attributes: config.attributes,
              result: 'deny',
              reason: `Feature not enabled: ${config.entitlement}`,
              ipAddress: req.ip,
              userAgent: req.get('User-Agent'),
              traceId: req.headers['x-trace-id'] as string
            });
          }
        }

        // Check permission if required
        if (config.permission && userId) {
          const hasPermission = await this.checkPermission(orgId, userId, config.permission);
          if (!hasPermission) {
            return this.denyAccess(res, {
              orgId,
              userId,
              apiKeyId,
              permission: config.permission,
              entitlement: config.entitlement,
              resource: config.resource,
              action: config.action,
              attributes: config.attributes,
              result: 'deny',
              reason: `Permission denied: ${config.permission}`,
              ipAddress: req.ip,
              userAgent: req.get('User-Agent'),
              traceId: req.headers['x-trace-id'] as string
            });
          }
        }

        // Check API key permissions if using API key
        if (config.permission && apiKeyId) {
          const hasApiKeyPermission = await this.checkApiKeyPermission(apiKeyId, config.permission);
          if (!hasApiKeyPermission) {
            return this.denyAccess(res, {
              orgId,
              userId,
              apiKeyId,
              permission: config.permission,
              entitlement: config.entitlement,
              resource: config.resource,
              action: config.action,
              attributes: config.attributes,
              result: 'deny',
              reason: `API key permission denied: ${config.permission}`,
              ipAddress: req.ip,
              userAgent: req.get('User-Agent'),
              traceId: req.headers['x-trace-id'] as string
            });
          }
        }

        // Check ABAC attributes if required
        if (config.attributes && userId) {
          const abacAllowed = await this.checkAbacAttributes(orgId, userId, config.attributes);
          if (!abacAllowed) {
            return this.denyAccess(res, {
              orgId,
              userId,
              apiKeyId,
              permission: config.permission,
              entitlement: config.entitlement,
              resource: config.resource,
              action: config.action,
              attributes: config.attributes,
              result: 'deny',
              reason: `ABAC attributes not allowed: ${JSON.stringify(config.attributes)}`,
              ipAddress: req.ip,
              userAgent: req.get('User-Agent'),
              traceId: req.headers['x-trace-id'] as string
            });
          }
        }

        // Log successful access
        await this.logAccessDecision({
          orgId,
          userId,
          apiKeyId,
          permission: config.permission,
          entitlement: config.entitlement,
          resource: config.resource,
          action: config.action,
          attributes: config.attributes,
          result: 'allow',
          reason: 'Access granted',
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          traceId: req.headers['x-trace-id'] as string
        });

        next();
      } catch (error) {
        console.error('Access control error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
  }

  /**
   * Check if organization has entitlement
   */
  private async checkEntitlement(orgId: string, featureKey: string): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('has_entitlement', {
      p_org_id: orgId,
      p_feature: featureKey
    });

    if (error) {
      console.error('Entitlement check error:', error);
      return false;
    }

    return data || false;
  }

  /**
   * Check if user has permission
   */
  private async checkPermission(orgId: string, userId: string, permission: string): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('has_permission', {
      p_org_id: orgId,
      p_user_id: userId,
      p_permission: permission
    });

    if (error) {
      console.error('Permission check error:', error);
      return false;
    }

    return data || false;
  }

  /**
   * Check if API key has permission
   */
  private async checkApiKeyPermission(apiKeyId: string, permission: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('api_keys')
      .select('scopes, is_active, expires_at')
      .eq('id', apiKeyId)
      .single();

    if (error || !data) {
      return false;
    }

    // Check if API key is active and not expired
    if (!data.is_active || (data.expires_at && new Date(data.expires_at) < new Date())) {
      return false;
    }

    // Check if permission is in scopes
    return data.scopes.includes(permission);
  }

  /**
   * Check ABAC attributes
   */
  private async checkAbacAttributes(orgId: string, userId: string, attributes: Record<string, unknown>): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('check_abac_attributes', {
      p_org_id: orgId,
      p_user_id: userId,
      p_attributes: attributes
    });

    if (error) {
      console.error('ABAC check error:', error);
      return false;
    }

    return data || false;
  }

  /**
   * Log access decision
   */
  private async logAccessDecision(auditData: AuditLogData): Promise<void> {
    try {
      await this.supabase.rpc('log_access_decision', {
        p_org_id: auditData.orgId,
        p_user_id: auditData.userId,
        p_api_key_id: auditData.apiKeyId,
        p_permission: auditData.permission,
        p_entitlement: auditData.entitlement,
        p_resource: auditData.resource,
        p_action: auditData.action,
        p_attributes: auditData.attributes,
        p_result: auditData.result,
        p_reason: auditData.reason,
        p_ip_address: auditData.ipAddress,
        p_user_agent: auditData.userAgent,
        p_trace_id: auditData.traceId
      });
    } catch (error) {
      console.error('Failed to log access decision:', error);
    }
  }

  /**
   * Deny access and log the decision
   */
  private async denyAccess(res: Response, auditData: AuditLogData): Promise<Response> {
    await this.logAccessDecision(auditData);

    if (auditData.reason?.includes('Feature not enabled')) {
      return res.status(402).json({
        error: 'feature_not_enabled',
        feature: auditData.entitlement,
        message: auditData.reason
      });
    }

    return res.status(403).json({
      error: 'forbidden',
      permission: auditData.permission,
      message: auditData.reason
    });
  }

  /**
   * Check access without middleware (for programmatic use)
   */
  async checkAccess(orgId: string, config: AccessControlConfig, userId?: string, apiKeyId?: string): Promise<AccessDecision> {
    try {
      // Check entitlement
      if (config.entitlement) {
        const hasEntitlement = await this.checkEntitlement(orgId, config.entitlement);
        if (!hasEntitlement) {
          return {
            allowed: false,
            reason: `Feature not enabled: ${config.entitlement}`,
            missing: { entitlement: config.entitlement }
          };
        }
      }

      // Check permission
      if (config.permission) {
        if (userId) {
          const hasPermission = await this.checkPermission(orgId, userId, config.permission);
          if (!hasPermission) {
            return {
              allowed: false,
              reason: `Permission denied: ${config.permission}`,
              missing: { permission: config.permission }
            };
          }
        } else if (apiKeyId) {
          const hasApiKeyPermission = await this.checkApiKeyPermission(apiKeyId, config.permission);
          if (!hasApiKeyPermission) {
            return {
              allowed: false,
              reason: `API key permission denied: ${config.permission}`,
              missing: { permission: config.permission }
            };
          }
        } else {
          return {
            allowed: false,
            reason: 'No user ID or API key provided for permission check',
            missing: { permission: config.permission }
          };
        }
      }

      // Check ABAC attributes
      if (config.attributes && userId) {
        const abacAllowed = await this.checkAbacAttributes(orgId, userId, config.attributes);
        if (!abacAllowed) {
          return {
            allowed: false,
            reason: `ABAC attributes not allowed: ${JSON.stringify(config.attributes)}`,
            missing: { attributes: config.attributes }
          };
        }
      }

      return { allowed: true };
    } catch (error) {
      console.error('Access check error:', error);
      return {
        allowed: false,
        reason: 'Internal error during access check'
      };
    }
  }

  /**
   * Request temporary access elevation
   */
  async requestTemporaryAccess(
    orgId: string,
    userId: string,
    requestedPermissions: string[],
    reason: string,
    durationHours: number = 2
  ): Promise<{ success: boolean; requestId?: string; error?: string }> {
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + durationHours);

      const { data, error } = await this.supabase
        .from('access_requests')
        .insert({
          org_id: orgId,
          user_id: userId,
          requested_permissions: requestedPermissions,
          reason,
          expires_at: expiresAt
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to create access request:', error);
        return { success: false, error: 'Failed to create access request' };
      }

      return { success: true, requestId: data.id };
    } catch (error) {
      console.error('Temporary access request error:', error);
      return { success: false, error: 'Internal error' };
    }
  }

  /**
   * Approve temporary access request
   */
  async approveTemporaryAccess(
    requestId: string,
    approvedBy: string,
    grantedPermissions: string[],
    durationHours: number = 2
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + durationHours);

      // Update access request
      const { error: updateError } = await this.supabase
        .from('access_requests')
        .update({
          status: 'approved',
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
          expires_at: expiresAt
        })
        .eq('id', requestId);

      if (updateError) {
        console.error('Failed to update access request:', updateError);
        return { success: false, error: 'Failed to update access request' };
      }

      // Get request details
      const { data: request, error: fetchError } = await this.supabase
        .from('access_requests')
        .select('user_id')
        .eq('id', requestId)
        .single();

      if (fetchError || !request) {
        return { success: false, error: 'Failed to fetch request details' };
      }

      // Grant temporary permissions
      const tempPermissions = grantedPermissions.map(permission => ({
        access_request_id: requestId,
        user_id: request.user_id,
        permission_key: permission,
        expires_at: expiresAt
      }));

      const { error: insertError } = await this.supabase
        .from('temporary_permissions')
        .insert(tempPermissions);

      if (insertError) {
        console.error('Failed to grant temporary permissions:', insertError);
        return { success: false, error: 'Failed to grant temporary permissions' };
      }

      return { success: true };
    } catch (error) {
      console.error('Approve temporary access error:', error);
      return { success: false, error: 'Internal error' };
    }
  }

  /**
   * Get user's effective permissions
   */
  async getUserPermissions(orgId: string, userId: string): Promise<string[]> {
    try {
      // Get role-based permissions
      const { data: rolePermissions, error: roleError } = await this.supabase
        .from('org_memberships')
        .select(`
          role,
          role_permissions!inner(permission_key)
        `)
        .eq('org_id', orgId)
        .eq('user_id', userId)
        .eq('status', 'active');

      if (roleError) {
        console.error('Failed to get role permissions:', roleError);
        return [];
      }

      // Get custom role permissions
      const { data: customPermissions, error: customError } = await this.supabase
        .from('user_custom_roles')
        .select(`
          custom_roles!inner(
            custom_role_permissions!inner(permission_key)
          )
        `)
        .eq('org_id', orgId)
        .eq('user_id', userId);

      if (customError) {
        console.error('Failed to get custom permissions:', customError);
        return [];
      }

      // Get temporary permissions
      const { data: tempPermissions, error: tempError } = await this.supabase
        .from('temporary_permissions')
        .select('permission_key')
        .eq('user_id', userId)
        .gt('expires_at', new Date().toISOString());

      if (tempError) {
        console.error('Failed to get temporary permissions:', tempError);
        return [];
      }

      // Combine all permissions
      const permissions = new Set<string>();

      // Add role permissions
      rolePermissions?.forEach(membership => {
        membership.role_permissions?.forEach((rp: { permission_key: string }) => {
          permissions.add(rp.permission_key);
        });
      });

      // Add custom role permissions
      customPermissions?.forEach(ucr => {
        ucr.custom_roles?.custom_role_permissions?.forEach((crp: { permission_key: string }) => {
          permissions.add(crp.permission_key);
        });
      });

      // Add temporary permissions
      tempPermissions?.forEach(tp => {
        permissions.add(tp.permission_key);
      });

      return Array.from(permissions);
    } catch (error) {
      console.error('Get user permissions error:', error);
      return [];
    }
  }

  /**
   * Get organization entitlements
   */
  async getOrganizationEntitlements(orgId: string): Promise<string[]> {
    try {
      const { data, error } = await this.supabase
        .from('entitlements')
        .select('feature_key')
        .eq('org_id', orgId)
        .eq('is_active', true);

      if (error) {
        console.error('Failed to get entitlements:', error);
        return [];
      }

      return data?.map(e => e.feature_key) || [];
    } catch (error) {
      console.error('Get entitlements error:', error);
      return [];
    }
  }
}

// Export singleton instance
export const accessControl = new AccessControl();

// Export convenience functions
export const requireAccess = (config: AccessControlConfig) => accessControl.requireAccess(config);
export const checkAccess = (orgId: string, config: AccessControlConfig, userId?: string, apiKeyId?: string) =>
  new AccessControl().checkAccess(orgId, config, userId, apiKeyId);
