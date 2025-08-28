import { http, httpUtils } from '@/lib/http';
import { MCP_ROUTING_CONFIG, MCPRoutingUtils } from '@/config/mcp-routing-config';

// Enhanced MCP Service with integrated routing
export class MCPIntegratedService {
  private static instance: MCPIntegratedService;
  private baseURL: string;

  private constructor() {
    this.baseURL = MCP_ROUTING_CONFIG.api.baseURL;
  }

  public static getInstance(): MCPIntegratedService {
    if (!MCPIntegratedService.instance) {
      MCPIntegratedService.instance = new MCPIntegratedService();
    }
    return MCPIntegratedService.instance;
  }

  // Generic method to call any MCP endpoint based on route
  public async callRoute(routePath: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET', data?: any) {
    const endpoint = MCPRoutingUtils.getMCPEndpoint(routePath);
    const agent = MCPRoutingUtils.getMCPAgent(routePath);

    try {
      const response = await http.request({
        method,
        url: endpoint,
        data,
        headers: {
          'X-MCP-Agent': agent,
          'X-Route-Path': routePath,
        },
      });

      return {
        success: true,
        data: response.data,
        agent,
        endpoint,
        routePath,
      };
    } catch (error) {
      console.error(`MCP Route Error: ${routePath}`, error);
      return {
        success: false,
        error,
        agent,
        endpoint,
        routePath,
      };
    }
  }

  // Dashboard Operations
  public dashboard = {
    getMetrics: () => this.callRoute('/super-admin/dashboard'),
    getAnalytics: () => this.callRoute('/super-admin/dashboard', 'POST', { type: 'analytics' }),
    getRealTimeData: () => this.callRoute('/super-admin/dashboard', 'POST', { type: 'real-time' }),
  };

  // User Management Operations
  public users = {
    getAll: () => this.callRoute('/super-admin/users'),
    getRoles: () => this.callRoute('/super-admin/users/roles'),
    getGroups: () => this.callRoute('/super-admin/users/groups'),
    getAccessControl: () => this.callRoute('/super-admin/users/access'),
    getUserAnalytics: () => this.callRoute('/super-admin/users/analytics'),
    getBilling: () => this.callRoute('/super-admin/users/billing'),
    getSupport: () => this.callRoute('/super-admin/users/support'),
    getOnboarding: () => this.callRoute('/super-admin/users/onboarding'),
    
    // CRUD operations
    create: (userData: any) => this.callRoute('/super-admin/users', 'POST', userData),
    update: (userId: string, userData: any) => this.callRoute(`/super-admin/users/${userId}`, 'PUT', userData),
    delete: (userId: string) => this.callRoute(`/super-admin/users/${userId}`, 'DELETE'),
  };

  // System Administration Operations
  public system = {
    getDatabase: () => this.callRoute('/super-admin/system/database'),
    getAPI: () => this.callRoute('/super-admin/system/api'),
    getDeployment: () => this.callRoute('/super-admin/system/deployment'),
    getConfiguration: () => this.callRoute('/super-admin/system/config'),
    getBackup: () => this.callRoute('/super-admin/system/backup'),
    getSecurity: () => this.callRoute('/super-admin/system/security'),
    getIntegrations: () => this.callRoute('/super-admin/system/integrations'),
    getStorage: () => this.callRoute('/super-admin/system/storage'),
    getEmail: () => this.callRoute('/super-admin/system/email'),
  };

  // Security Center Operations
  public security = {
    getAudit: () => this.callRoute('/super-admin/security/audit'),
    getLogs: () => this.callRoute('/super-admin/security/logs'),
    getDataProtection: () => this.callRoute('/super-admin/security/protection'),
    getAPISecurity: () => this.callRoute('/super-admin/security/api'),
    getPermissions: () => this.callRoute('/super-admin/security/permissions'),
    getPolicies: () => this.callRoute('/super-admin/security/policies'),
    getIncidents: () => this.callRoute('/super-admin/security/incidents'),
    getCompliance: () => this.callRoute('/super-admin/security/compliance'),
  };

  // System Monitoring Operations
  public monitoring = {
    getPerformance: () => this.callRoute('/super-admin/monitoring/performance'),
    getErrors: () => this.callRoute('/super-admin/monitoring/errors'),
    getLogs: () => this.callRoute('/super-admin/monitoring/logs'),
    getAlerts: () => this.callRoute('/super-admin/monitoring/alerts'),
    getUptime: () => this.callRoute('/super-admin/monitoring/uptime'),
    getResources: () => this.callRoute('/super-admin/monitoring/resources'),
    getNetwork: () => this.callRoute('/super-admin/monitoring/network'),
    getHealth: () => this.callRoute('/super-admin/monitoring/health'),
  };

  // Portal Management Operations
  public portals = {
    getOverview: () => this.callRoute('/super-admin/portals'),
    getConfiguration: () => this.callRoute('/super-admin/portals/config'),
    getUsers: () => this.callRoute('/super-admin/portals/users'),
    getFeatures: () => this.callRoute('/super-admin/portals/features'),
    getAnalytics: () => this.callRoute('/super-admin/portals/analytics'),
    getBilling: () => this.callRoute('/super-admin/portals/billing'),
    getSupport: () => this.callRoute('/super-admin/portals/support'),
    getIntegrations: () => this.callRoute('/super-admin/portals/integrations'),
    getBackup: () => this.callRoute('/super-admin/portals/backup'),
    getSecurity: () => this.callRoute('/super-admin/portals/security'),
    getCompliance: () => this.callRoute('/super-admin/portals/compliance'),
    getDeployment: () => this.callRoute('/super-admin/portals/deployment'),
  };

  // Analytics & Reports Operations
  public analytics = {
    getBusiness: () => this.callRoute('/super-admin/analytics/business'),
    getUsers: () => this.callRoute('/super-admin/analytics/users'),
    getPerformance: () => this.callRoute('/super-admin/analytics/performance'),
    getSecurity: () => this.callRoute('/super-admin/analytics/security'),
    getFinancial: () => this.callRoute('/super-admin/analytics/financial'),
    getOperational: () => this.callRoute('/super-admin/analytics/operational'),
    getCustom: () => this.callRoute('/super-admin/analytics/custom'),
    getExport: () => this.callRoute('/super-admin/analytics/export'),
    getDashboards: () => this.callRoute('/super-admin/analytics/dashboards'),
    getScheduled: () => this.callRoute('/super-admin/analytics/scheduled'),
  };

  // MCP Control Center Operations
  public mcp = {
    getOverview: () => this.callRoute('/super-admin/mcp'),
    getAgents: () => this.callRoute('/super-admin/mcp/agents'),
    getModels: () => this.callRoute('/super-admin/mcp/models'),
    getPipeline: () => this.callRoute('/super-admin/mcp/pipeline'),
    getLearning: () => this.callRoute('/super-admin/mcp/learning'),
    getAnalytics: () => this.callRoute('/super-admin/mcp/analytics'),
    getAutomation: () => this.callRoute('/super-admin/mcp/automation'),
    getIntegrations: () => this.callRoute('/super-admin/mcp/integrations'),
    getMonitoring: () => this.callRoute('/super-admin/mcp/monitoring'),
    getCompliance: () => this.callRoute('/super-admin/mcp/compliance'),
    getDocumentation: () => this.callRoute('/super-admin/mcp/documentation'),
    getSupport: () => this.callRoute('/super-admin/mcp/support'),
  };

  // Phase 2 Orchestration
  public phase2 = {
    getOrchestration: () => this.callRoute('/super-admin/phase2-orchestration'),
  };

  // Business Operations
  public business = {
    getCustomers: () => this.callRoute('/super-admin/business/customers'),
    getSales: () => this.callRoute('/super-admin/business/sales'),
    getBilling: () => this.callRoute('/super-admin/business/billing'),
    getSupport: () => this.callRoute('/super-admin/business/support'),
    getDocumentation: () => this.callRoute('/super-admin/business/docs'),
    getMarketing: () => this.callRoute('/super-admin/business/marketing'),
    getPartners: () => this.callRoute('/super-admin/business/partners'),
    getLegal: () => this.callRoute('/super-admin/business/legal'),
  };

  // Development & DevOps
  public dev = {
    getRepository: () => this.callRoute('/super-admin/dev/repository'),
    getPipeline: () => this.callRoute('/super-admin/dev/pipeline'),
    getTesting: () => this.callRoute('/super-admin/dev/testing'),
    getEnvironments: () => this.callRoute('/super-admin/dev/environments'),
    getPerformance: () => this.callRoute('/super-admin/dev/performance'),
    getSecurity: () => this.callRoute('/super-admin/dev/security'),
    getDocumentation: () => this.callRoute('/super-admin/dev/documentation'),
    getReleases: () => this.callRoute('/super-admin/dev/releases'),
  };

  // Settings Operations
  public settings = {
    getOverview: () => this.callRoute('/super-admin/settings'),
    getProfile: () => this.callRoute('/super-admin/settings/profile'),
    getSystem: () => this.callRoute('/super-admin/settings/system'),
    getPreferences: () => this.callRoute('/super-admin/settings/preferences'),
    getSecurity: () => this.callRoute('/super-admin/settings/security'),
    
    // Update operations
    updateProfile: (data: any) => this.callRoute('/super-admin/settings/profile', 'PUT', data),
    updateSystem: (data: any) => this.callRoute('/super-admin/settings/system', 'PUT', data),
    updatePreferences: (data: any) => this.callRoute('/super-admin/settings/preferences', 'PUT', data),
    updateSecurity: (data: any) => this.callRoute('/super-admin/settings/security', 'PUT', data),
  };

  // Profile Operations
  public profile = {
    getOverview: () => this.callRoute('/super-admin/profile'),
    getPersonal: () => this.callRoute('/super-admin/profile/personal'),
    getAvatar: () => this.callRoute('/super-admin/profile/avatar'),
    getPreferences: () => this.callRoute('/super-admin/profile/preferences'),
    getActivity: () => this.callRoute('/super-admin/profile/activity'),
    getDelete: () => this.callRoute('/super-admin/profile/delete'),
    
    // Update operations
    updatePersonal: (data: any) => this.callRoute('/super-admin/profile/personal', 'PUT', data),
    updatePreferences: (data: any) => this.callRoute('/super-admin/profile/preferences', 'PUT', data),
    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return this.callRoute('/super-admin/profile/avatar', 'POST', formData);
    },
    deleteAccount: () => this.callRoute('/super-admin/profile/delete', 'DELETE'),
  };

  // FAB Operations
  public fab = {
    getOverview: () => this.callRoute('/super-admin/fab'),
    getActions: () => this.callRoute('/super-admin/fab/actions'),
    getCustomization: () => this.callRoute('/super-admin/fab/customization'),
    
    // Update operations
    updateActions: (data: any) => this.callRoute('/super-admin/fab/actions', 'PUT', data),
    updateCustomization: (data: any) => this.callRoute('/super-admin/fab/customization', 'PUT', data),
  };

  // Authentication Operations
  public auth = {
    login: (credentials: any) => this.callRoute('/login', 'POST', credentials),
    logout: () => this.callRoute('/logout', 'POST'),
    refresh: () => this.callRoute('/auth/refresh', 'POST'),
    getPermissions: () => this.callRoute('/auth/permissions'),
  };

  // UI Component Operations
  public ui = {
    getDashboardComponents: () => this.callRoute('/mcp/ui/dashboard'),
    getFormComponents: () => this.callRoute('/mcp/ui/forms'),
    getNavigationComponents: () => this.callRoute('/mcp/ui/navigation'),
    getDataComponents: () => this.callRoute('/mcp/ui/data'),
  };

  // Error Handling
  public errors = {
    getNotFound: () => this.callRoute('/404'),
    getUnauthorized: () => this.callRoute('/401'),
    getServerError: () => this.callRoute('/500'),
  };

  // Agent Management
  public agents = {
    getAll: () => http.get('/mcp/agents').then(r => r.data),
    getById: (id: string) => http.get(`/mcp/agents/${id}`).then(r => r.data),
    create: (agentData: any) => http.post('/mcp/agents', agentData).then(r => r.data),
    update: (id: string, agentData: any) => http.put(`/mcp/agents/${id}`, agentData).then(r => r.data),
    delete: (id: string) => http.delete(`/mcp/agents/${id}`).then(r => r.data),
    getStatus: (id: string) => http.get(`/mcp/agents/${id}/status`).then(r => r.data),
    restart: (id: string) => http.post(`/mcp/agents/${id}/restart`).then(r => r.data),
    getLogs: (id: string) => http.get(`/mcp/agents/${id}/logs`).then(r => r.data),
  };

  // Task Management
  public tasks = {
    getAll: () => http.get('/mcp/tasks').then(r => r.data),
    getById: (id: string) => http.get(`/mcp/tasks/${id}`).then(r => r.data),
    create: (taskData: any) => http.post('/mcp/tasks', taskData).then(r => r.data),
    update: (id: string, taskData: any) => http.put(`/mcp/tasks/${id}`, taskData).then(r => r.data),
    delete: (id: string) => http.delete(`/mcp/tasks/${id}`).then(r => r.data),
    cancel: (id: string) => http.post(`/mcp/tasks/${id}/cancel`).then(r => r.data),
    getProgress: (id: string) => http.get(`/mcp/tasks/${id}/progress`).then(r => r.data),
  };

  // Logs and Monitoring
  public logs = {
    getAll: (params?: any) => http.get('/mcp/logs', { params }).then(r => r.data),
    getByLevel: (level: string) => http.get(`/mcp/logs/level/${level}`).then(r => r.data),
    getByAgent: (agentId: string) => http.get(`/mcp/logs/agent/${agentId}`).then(r => r.data),
    stream: (params?: any) => new EventSource(`${this.baseURL}/mcp/logs/stream?${new URLSearchParams(params)}`),
  };

  // Metrics and Analytics
  public metrics = {
    getSystem: () => http.get('/mcp/metrics/system').then(r => r.data),
    getAgents: () => http.get('/mcp/metrics/agents').then(r => r.data),
    getTasks: () => http.get('/mcp/metrics/tasks').then(r => r.data),
    getCustom: (metricName: string) => http.get(`/mcp/metrics/custom/${metricName}`).then(r => r.data),
  };

  // Health and Status
  public health = {
    check: () => http.get('/mcp/health').then(r => r.data),
    getStatus: () => http.get('/mcp/status').then(r => r.data),
    getVersion: () => http.get('/mcp/version').then(r => r.data),
  };

  // Utility methods
  public utils = {
    // Get route information
    getRouteInfo: (routePath: string) => ({
      endpoint: MCPRoutingUtils.getMCPEndpoint(routePath),
      agent: MCPRoutingUtils.getMCPAgent(routePath),
      isValid: MCPRoutingUtils.validateRoute(routePath),
    }),

    // Get all available routes
    getAllRoutes: () => MCPRoutingUtils.getAllRoutes(),

    // Get section routes
    getSectionRoutes: (sectionName: string) => MCPRoutingUtils.getSectionRoutes(sectionName),

    // Retry wrapper
    retry: <T>(operation: () => Promise<T>, maxRetries: number = 3) =>
      httpUtils.retry(operation, maxRetries),

    // Error handler
    handleError: (error: any, context: string = 'MCP operation') =>
      httpUtils.handleError(error, context),
  };
}

// Export singleton instance
export const mcpService = MCPIntegratedService.getInstance();

// Export for backward compatibility
export default mcpService;
