import { useState, useEffect, useCallback } from 'react';
import { mcpService } from '@/services/mcp-integrated';

// Hook for using MCP service in React components
export const useMCP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic method to call any MCP route
  const callRoute = useCallback(async (
    routePath: string, 
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET', 
    data?: any
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await mcpService.callRoute(routePath, method, data);
      
      if (!result.success) {
        throw new Error(result.error?.message || 'MCP operation failed');
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Dashboard operations
  const dashboard = {
    getMetrics: () => callRoute('/super-admin/dashboard'),
    getAnalytics: () => callRoute('/super-admin/dashboard', 'POST', { type: 'analytics' }),
    getRealTimeData: () => callRoute('/super-admin/dashboard', 'POST', { type: 'real-time' }),
  };

  // User management operations
  const users = {
    getAll: () => callRoute('/super-admin/users'),
    getRoles: () => callRoute('/super-admin/users/roles'),
    getGroups: () => callRoute('/super-admin/users/groups'),
    getAccessControl: () => callRoute('/super-admin/users/access'),
    getUserAnalytics: () => callRoute('/super-admin/users/analytics'),
    getBilling: () => callRoute('/super-admin/users/billing'),
    getSupport: () => callRoute('/super-admin/users/support'),
    getOnboarding: () => callRoute('/super-admin/users/onboarding'),
    
    create: (userData: any) => callRoute('/super-admin/users', 'POST', userData),
    update: (userId: string, userData: any) => callRoute(`/super-admin/users/${userId}`, 'PUT', userData),
    delete: (userId: string) => callRoute(`/super-admin/users/${userId}`, 'DELETE'),
  };

  // System administration operations
  const system = {
    getDatabase: () => callRoute('/super-admin/system/database'),
    getAPI: () => callRoute('/super-admin/system/api'),
    getDeployment: () => callRoute('/super-admin/system/deployment'),
    getConfiguration: () => callRoute('/super-admin/system/config'),
    getBackup: () => callRoute('/super-admin/system/backup'),
    getSecurity: () => callRoute('/super-admin/system/security'),
    getIntegrations: () => callRoute('/super-admin/system/integrations'),
    getStorage: () => callRoute('/super-admin/system/storage'),
    getEmail: () => callRoute('/super-admin/system/email'),
  };

  // Security center operations
  const security = {
    getAudit: () => callRoute('/super-admin/security/audit'),
    getLogs: () => callRoute('/super-admin/security/logs'),
    getDataProtection: () => callRoute('/super-admin/security/protection'),
    getAPISecurity: () => callRoute('/super-admin/security/api'),
    getPermissions: () => callRoute('/super-admin/security/permissions'),
    getPolicies: () => callRoute('/super-admin/security/policies'),
    getIncidents: () => callRoute('/super-admin/security/incidents'),
    getCompliance: () => callRoute('/super-admin/security/compliance'),
  };

  // System monitoring operations
  const monitoring = {
    getPerformance: () => callRoute('/super-admin/monitoring/performance'),
    getErrors: () => callRoute('/super-admin/monitoring/errors'),
    getLogs: () => callRoute('/super-admin/monitoring/logs'),
    getAlerts: () => callRoute('/super-admin/monitoring/alerts'),
    getUptime: () => callRoute('/super-admin/monitoring/uptime'),
    getResources: () => callRoute('/super-admin/monitoring/resources'),
    getNetwork: () => callRoute('/super-admin/monitoring/network'),
    getHealth: () => callRoute('/super-admin/monitoring/health'),
  };

  // Portal management operations
  const portals = {
    getOverview: () => callRoute('/super-admin/portals'),
    getConfiguration: () => callRoute('/super-admin/portals/config'),
    getUsers: () => callRoute('/super-admin/portals/users'),
    getFeatures: () => callRoute('/super-admin/portals/features'),
    getAnalytics: () => callRoute('/super-admin/portals/analytics'),
    getBilling: () => callRoute('/super-admin/portals/billing'),
    getSupport: () => callRoute('/super-admin/portals/support'),
    getIntegrations: () => callRoute('/super-admin/portals/integrations'),
    getBackup: () => callRoute('/super-admin/portals/backup'),
    getSecurity: () => callRoute('/super-admin/portals/security'),
    getCompliance: () => callRoute('/super-admin/portals/compliance'),
    getDeployment: () => callRoute('/super-admin/portals/deployment'),
  };

  // Analytics & reports operations
  const analytics = {
    getBusiness: () => callRoute('/super-admin/analytics/business'),
    getUsers: () => callRoute('/super-admin/analytics/users'),
    getPerformance: () => callRoute('/super-admin/analytics/performance'),
    getSecurity: () => callRoute('/super-admin/analytics/security'),
    getFinancial: () => callRoute('/super-admin/analytics/financial'),
    getOperational: () => callRoute('/super-admin/analytics/operational'),
    getCustom: () => callRoute('/super-admin/analytics/custom'),
    getExport: () => callRoute('/super-admin/analytics/export'),
    getDashboards: () => callRoute('/super-admin/analytics/dashboards'),
    getScheduled: () => callRoute('/super-admin/analytics/scheduled'),
  };

  // MCP control center operations
  const mcp = {
    getOverview: () => callRoute('/super-admin/mcp'),
    getAgents: () => callRoute('/super-admin/mcp/agents'),
    getModels: () => callRoute('/super-admin/mcp/models'),
    getPipeline: () => callRoute('/super-admin/mcp/pipeline'),
    getLearning: () => callRoute('/super-admin/mcp/learning'),
    getAnalytics: () => callRoute('/super-admin/mcp/analytics'),
    getAutomation: () => callRoute('/super-admin/mcp/automation'),
    getIntegrations: () => callRoute('/super-admin/mcp/integrations'),
    getMonitoring: () => callRoute('/super-admin/mcp/monitoring'),
    getCompliance: () => callRoute('/super-admin/mcp/compliance'),
    getDocumentation: () => callRoute('/super-admin/mcp/documentation'),
    getSupport: () => callRoute('/super-admin/mcp/support'),
  };

  // Phase 2 orchestration
  const phase2 = {
    getOrchestration: () => callRoute('/super-admin/phase2-orchestration'),
  };

  // Business operations
  const business = {
    getCustomers: () => callRoute('/super-admin/business/customers'),
    getSales: () => callRoute('/super-admin/business/sales'),
    getBilling: () => callRoute('/super-admin/business/billing'),
    getSupport: () => callRoute('/super-admin/business/support'),
    getDocumentation: () => callRoute('/super-admin/business/docs'),
    getMarketing: () => callRoute('/super-admin/business/marketing'),
    getPartners: () => callRoute('/super-admin/business/partners'),
    getLegal: () => callRoute('/super-admin/business/legal'),
  };

  // Development & DevOps
  const dev = {
    getRepository: () => callRoute('/super-admin/dev/repository'),
    getPipeline: () => callRoute('/super-admin/dev/pipeline'),
    getTesting: () => callRoute('/super-admin/dev/testing'),
    getEnvironments: () => callRoute('/super-admin/dev/environments'),
    getPerformance: () => callRoute('/super-admin/dev/performance'),
    getSecurity: () => callRoute('/super-admin/dev/security'),
    getDocumentation: () => callRoute('/super-admin/dev/documentation'),
    getReleases: () => callRoute('/super-admin/dev/releases'),
  };

  // Settings operations
  const settings = {
    getOverview: () => callRoute('/super-admin/settings'),
    getProfile: () => callRoute('/super-admin/settings/profile'),
    getSystem: () => callRoute('/super-admin/settings/system'),
    getPreferences: () => callRoute('/super-admin/settings/preferences'),
    getSecurity: () => callRoute('/super-admin/settings/security'),
    
    updateProfile: (data: any) => callRoute('/super-admin/settings/profile', 'PUT', data),
    updateSystem: (data: any) => callRoute('/super-admin/settings/system', 'PUT', data),
    updatePreferences: (data: any) => callRoute('/super-admin/settings/preferences', 'PUT', data),
    updateSecurity: (data: any) => callRoute('/super-admin/settings/security', 'PUT', data),
  };

  // Profile operations
  const profile = {
    getOverview: () => callRoute('/super-admin/profile'),
    getPersonal: () => callRoute('/super-admin/profile/personal'),
    getAvatar: () => callRoute('/super-admin/profile/avatar'),
    getPreferences: () => callRoute('/super-admin/profile/preferences'),
    getActivity: () => callRoute('/super-admin/profile/activity'),
    getDelete: () => callRoute('/super-admin/profile/delete'),
    
    updatePersonal: (data: any) => callRoute('/super-admin/profile/personal', 'PUT', data),
    updatePreferences: (data: any) => callRoute('/super-admin/profile/preferences', 'PUT', data),
    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return callRoute('/super-admin/profile/avatar', 'POST', formData);
    },
    deleteAccount: () => callRoute('/super-admin/profile/delete', 'DELETE'),
  };

  // FAB operations
  const fab = {
    getOverview: () => callRoute('/super-admin/fab'),
    getActions: () => callRoute('/super-admin/fab/actions'),
    getCustomization: () => callRoute('/super-admin/fab/customization'),
    
    updateActions: (data: any) => callRoute('/super-admin/fab/actions', 'PUT', data),
    updateCustomization: (data: any) => callRoute('/super-admin/fab/customization', 'PUT', data),
  };

  // Authentication operations
  const auth = {
    login: (credentials: any) => callRoute('/login', 'POST', credentials),
    logout: () => callRoute('/logout', 'POST'),
    refresh: () => callRoute('/auth/refresh', 'POST'),
    getPermissions: () => callRoute('/auth/permissions'),
  };

  // UI component operations
  const ui = {
    getDashboardComponents: () => callRoute('/mcp/ui/dashboard'),
    getFormComponents: () => callRoute('/mcp/ui/forms'),
    getNavigationComponents: () => callRoute('/mcp/ui/navigation'),
    getDataComponents: () => callRoute('/mcp/ui/data'),
  };

  // Error handling
  const errors = {
    getNotFound: () => callRoute('/404'),
    getUnauthorized: () => callRoute('/401'),
    getServerError: () => callRoute('/500'),
  };

  // Agent management
  const agents = {
    getAll: () => mcpService.agents.getAll(),
    getById: (id: string) => mcpService.agents.getById(id),
    create: (agentData: any) => mcpService.agents.create(agentData),
    update: (id: string, agentData: any) => mcpService.agents.update(id, agentData),
    delete: (id: string) => mcpService.agents.delete(id),
    getStatus: (id: string) => mcpService.agents.getStatus(id),
    restart: (id: string) => mcpService.agents.restart(id),
    getLogs: (id: string) => mcpService.agents.getLogs(id),
  };

  // Task management
  const tasks = {
    getAll: () => mcpService.tasks.getAll(),
    getById: (id: string) => mcpService.tasks.getById(id),
    create: (taskData: any) => mcpService.tasks.create(taskData),
    update: (id: string, taskData: any) => mcpService.tasks.update(id, taskData),
    delete: (id: string) => mcpService.tasks.delete(id),
    cancel: (id: string) => mcpService.tasks.cancel(id),
    getProgress: (id: string) => mcpService.tasks.getProgress(id),
  };

  // Logs and monitoring
  const logs = {
    getAll: (params?: any) => mcpService.logs.getAll(params),
    getByLevel: (level: string) => mcpService.logs.getByLevel(level),
    getByAgent: (agentId: string) => mcpService.logs.getByAgent(agentId),
    stream: (params?: any) => mcpService.logs.stream(params),
  };

  // Metrics and analytics
  const metrics = {
    getSystem: () => mcpService.metrics.getSystem(),
    getAgents: () => mcpService.metrics.getAgents(),
    getTasks: () => mcpService.metrics.getTasks(),
    getCustom: (metricName: string) => mcpService.metrics.getCustom(metricName),
  };

  // Health and status
  const health = {
    check: () => mcpService.health.check(),
    getStatus: () => mcpService.health.getStatus(),
    getVersion: () => mcpService.health.getVersion(),
  };

  // Utility methods
  const utils = {
    getRouteInfo: (routePath: string) => mcpService.utils.getRouteInfo(routePath),
    getAllRoutes: () => mcpService.utils.getAllRoutes(),
    getSectionRoutes: (sectionName: string) => mcpService.utils.getSectionRoutes(sectionName),
    retry: <T>(operation: () => Promise<T>, maxRetries: number = 3) => 
      mcpService.utils.retry(operation, maxRetries),
    handleError: (error: any, context: string = 'MCP operation') => 
      mcpService.utils.handleError(error, context),
  };

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    loading,
    error,
    clearError,

    // Generic method
    callRoute,

    // Service methods
    dashboard,
    users,
    system,
    security,
    monitoring,
    portals,
    analytics,
    mcp,
    phase2,
    business,
    dev,
    settings,
    profile,
    fab,
    auth,
    ui,
    errors,
    agents,
    tasks,
    logs,
    metrics,
    health,
    utils,
  };
};

// Hook for using MCP service with data fetching
export const useMCPData = <T>(
  routePath: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  data?: any,
  dependencies: any[] = []
) => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.callRoute(routePath, method, data);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'MCP operation failed');
      }

      setResult(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [routePath, method, data, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: result,
    loading,
    error,
    refetch,
  };
};

// Hook for using MCP service with real-time updates
export const useMCPRealtime = <T>(
  routePath: string,
  interval: number = 5000,
  dependencies: any[] = []
) => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      if (!mounted) return;

      setLoading(true);
      setError(null);

      try {
        const response = await mcpService.callRoute(routePath);
        
        if (!mounted) return;

        if (!response.success) {
          throw new Error(response.error?.message || 'MCP operation failed');
        }

        setResult(response.data);
      } catch (err) {
        if (!mounted) return;

        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for real-time updates
    if (interval > 0) {
      intervalId = setInterval(fetchData, interval);
    }

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [routePath, interval, ...dependencies]);

  return {
    data: result,
    loading,
    error,
  };
};

export default useMCP;
