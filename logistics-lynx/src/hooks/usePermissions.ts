import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for feature-level permission checking
 * Use this in components to conditionally render UI elements based on permissions
 */
export const usePermissions = () => {
  const { hasPermissions, hasRole, hasFeature } = useAuth();

  return {
    // Permission checks
    canReadUsers: hasPermissions(['users:read']),
    canWriteUsers: hasPermissions(['users:write']),
    canDeleteUsers: hasPermissions(['users:delete']),
    canManageSystem: hasPermissions(['system:admin']),
    canManageSecurity: hasPermissions(['security:admin']),
    canManageMCP: hasPermissions(['mcp:admin']),
    canReadAnalytics: hasPermissions(['analytics:read']),
    canWriteAnalytics: hasPermissions(['analytics:write']),
    canManageSettings: hasPermissions(['settings:admin']),
    canManagePortals: hasPermissions(['portals:admin']),
    canManageBusiness: hasPermissions(['business:admin']),
    canReadInvoices: hasPermissions(['invoices:read']),
    canWriteInvoices: hasPermissions(['invoices:write']),
    canReadReports: hasPermissions(['reports:read']),
    canWriteReports: hasPermissions(['reports:write']),

    // Role checks
    isSuperAdmin: hasRole('super-admin'),
    isAdmin: hasRole('admin'),
    isManager: hasRole('manager'),
    isUser: hasRole('user'),

    // Feature flag checks
    hasFabDispatch: hasFeature('fab.dispatch'),
    hasAIAgents: hasFeature('ai.agents'),
    hasAdvancedAnalytics: hasFeature('advanced.analytics'),
    hasMultiTenant: hasFeature('multi.tenant'),

    // Generic permission checker
    hasPermissions,
    hasRole,
    hasFeature,

    // Convenience methods
    canManageUsers: hasPermissions(['users:read', 'users:write']),
    canViewAnalytics: hasPermissions(['analytics:read']),
    canManageAll: hasRole('super-admin'),
    canAccessAdmin: hasRole('super-admin') || hasRole('admin'),
  };
};

/**
 * Hook for checking if user can perform a specific action
 * @param action - The action to check (e.g., 'create', 'edit', 'delete', 'view')
 * @param resource - The resource to check (e.g., 'users', 'invoices', 'reports')
 */
export const useCanPerform = (action: string, resource: string) => {
  const { hasPermissions } = useAuth();
  
  const permissionMap: Record<string, Record<string, string[]>> = {
    users: {
      create: ['users:write'],
      edit: ['users:write'],
      delete: ['users:delete'],
      view: ['users:read'],
    },
    invoices: {
      create: ['invoices:write'],
      edit: ['invoices:write'],
      delete: ['invoices:write'],
      view: ['invoices:read'],
    },
    reports: {
      create: ['reports:write'],
      edit: ['reports:write'],
      delete: ['reports:write'],
      view: ['reports:read'],
    },
    system: {
      manage: ['system:admin'],
      view: ['system:read'],
    },
    security: {
      manage: ['security:admin'],
      view: ['security:read'],
    },
    mcp: {
      manage: ['mcp:admin'],
      view: ['mcp:read'],
    },
  };

  const permissions = permissionMap[resource]?.[action] || [];
  return hasPermissions(permissions);
};

/**
 * Hook for checking if user can access a specific route
 * @param route - The route path to check
 */
export const useCanAccessRoute = (route: string) => {
  const { hasPermissions, hasRole } = useAuth();

  // Route-specific permission mapping
  const routePermissions: Record<string, { roles?: string[], permissions?: string[] }> = {
    '/super-admin/users': { permissions: ['users:read'] },
    '/super-admin/system': { permissions: ['system:admin'] },
    '/super-admin/security': { permissions: ['security:admin'] },
    '/super-admin/mcp': { permissions: ['mcp:admin'] },
    '/super-admin/analytics': { permissions: ['analytics:read'] },
    '/super-admin/settings': { permissions: ['settings:admin'] },
    '/super-admin/portals': { permissions: ['portals:admin'] },
    '/super-admin/business': { permissions: ['business:admin'] },
  };

  const routeConfig = routePermissions[route];
  if (!routeConfig) return true; // No restrictions if not specified

  const hasRequiredRole = !routeConfig.roles || routeConfig.roles.some(role => hasRole(role));
  const hasRequiredPermissions = !routeConfig.permissions || hasPermissions(routeConfig.permissions);

  return hasRequiredRole && hasRequiredPermissions;
};
