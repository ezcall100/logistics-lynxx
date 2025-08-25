import { useNavigate } from "react-router-dom";

export function useAdminNav() {
  const navigate = useNavigate();
  const base = "/super-admin";
  
  return {
    // Dashboard routes
    toDashboard: () => navigate(`${base}/dashboard`),
    toSystemOverview: () => navigate(`${base}/dashboard`),
    toActiveUsers: () => navigate(`${base}/dashboard/users`),
    
    // User Management routes
    toUsers: () => navigate(`${base}/users`),
    toUserRoles: () => navigate(`${base}/users/roles`),
    toUserGroups: () => navigate(`${base}/users/groups`),
    toAccessControl: () => navigate(`${base}/users/access`),
    toUserAnalytics: () => navigate(`${base}/users/analytics`),
    toBillingManagement: () => navigate(`${base}/users/billing`),
    toSupportTickets: () => navigate(`${base}/users/support`),
    toUserOnboarding: () => navigate(`${base}/users/onboarding`),
    
    // System Administration routes
    toSystemDatabase: () => navigate(`${base}/system/database`),
    toSystemApi: () => navigate(`${base}/system/api`),
    toSystemMonitoring: () => navigate(`${base}/system/monitoring`),
    toSystemDeployment: () => navigate(`${base}/system/deployment`),
    toSystemConfig: () => navigate(`${base}/system/config`),
    toSystemBackup: () => navigate(`${base}/system/backup`),
    toSystemSecurity: () => navigate(`${base}/system/security`),
    toSystemIntegrations: () => navigate(`${base}/system/integrations`),
    toSystemStorage: () => navigate(`${base}/system/storage`),
    toSystemEmail: () => navigate(`${base}/system/email`),
    
    // Security Center routes
    toSecurityAudit: () => navigate(`${base}/security/audit`),
    toSecurityLogs: () => navigate(`${base}/security/logs`),
    toSecurityProtection: () => navigate(`${base}/security/protection`),
    toSecurityApi: () => navigate(`${base}/security/api`),
    toSecurityPermissions: () => navigate(`${base}/security/permissions`),
    toSecurityPolicies: () => navigate(`${base}/security/policies`),
    toSecurityIncidents: () => navigate(`${base}/security/incidents`),
    toSecurityCompliance: () => navigate(`${base}/security/compliance`),
    
    // System Monitoring routes
    toMonitoringPerformance: () => navigate(`${base}/monitoring/performance`),
    toMonitoringErrors: () => navigate(`${base}/monitoring/errors`),
    toMonitoringLogs: () => navigate(`${base}/monitoring/logs`),
    toMonitoringAlerts: () => navigate(`${base}/monitoring/alerts`),
    toMonitoringUptime: () => navigate(`${base}/monitoring/uptime`),
    toMonitoringResources: () => navigate(`${base}/monitoring/resources`),
    toMonitoringNetwork: () => navigate(`${base}/monitoring/network`),
    toMonitoringHealth: () => navigate(`${base}/monitoring/health`),
    
    // Portal Management routes
    toPortals: () => navigate(`${base}/portals`),
    toPortalConfig: () => navigate(`${base}/portals/config`),
    toPortalUsers: () => navigate(`${base}/portals/users`),
    toPortalFeatures: () => navigate(`${base}/portals/features`),
    toPortalAnalytics: () => navigate(`${base}/portals/analytics`),
    toPortalBilling: () => navigate(`${base}/portals/billing`),
    toPortalSupport: () => navigate(`${base}/portals/support`),
    toPortalIntegrations: () => navigate(`${base}/portals/integrations`),
    toPortalBackup: () => navigate(`${base}/portals/backup`),
    toPortalSecurity: () => navigate(`${base}/portals/security`),
    toPortalCompliance: () => navigate(`${base}/portals/compliance`),
    toPortalDeployment: () => navigate(`${base}/portals/deployment`),
    
    // Analytics & Reports routes
    toAnalyticsBusiness: () => navigate(`${base}/analytics/business`),
    toAnalyticsUsers: () => navigate(`${base}/analytics/users`),
    toAnalyticsPerformance: () => navigate(`${base}/analytics/performance`),
    toAnalyticsSecurity: () => navigate(`${base}/analytics/security`),
    toAnalyticsFinancial: () => navigate(`${base}/analytics/financial`),
    toAnalyticsOperational: () => navigate(`${base}/analytics/operational`),
    toAnalyticsCustom: () => navigate(`${base}/analytics/custom`),
    toAnalyticsExport: () => navigate(`${base}/analytics/export`),
    toAnalyticsDashboards: () => navigate(`${base}/analytics/dashboards`),
    toAnalyticsScheduled: () => navigate(`${base}/analytics/scheduled`),
    
    // MCP Control Center routes
    toMcp: () => navigate(`${base}/mcp`),
    toMcpAgents: () => navigate(`${base}/mcp/agents`),
    toMcpModels: () => navigate(`${base}/mcp/models`),
    toMcpPipeline: () => navigate(`${base}/mcp/pipeline`),
    toMcpLearning: () => navigate(`${base}/mcp/learning`),
    toMcpAnalytics: () => navigate(`${base}/mcp/analytics`),
    toMcpAutomation: () => navigate(`${base}/mcp/automation`),
    toMcpIntegrations: () => navigate(`${base}/mcp/integrations`),
    toMcpMonitoring: () => navigate(`${base}/mcp/monitoring`),
    toMcpCompliance: () => navigate(`${base}/mcp/compliance`),
    toMcpDocumentation: () => navigate(`${base}/mcp/documentation`),
    toMcpSupport: () => navigate(`${base}/mcp/support`),
    
    // Business Operations routes
    toBusinessCustomers: () => navigate(`${base}/business/customers`),
    toBusinessSales: () => navigate(`${base}/business/sales`),
    toBusinessBilling: () => navigate(`${base}/business/billing`),
    toBusinessSupport: () => navigate(`${base}/business/support`),
    toBusinessDocs: () => navigate(`${base}/business/docs`),
    toBusinessMarketing: () => navigate(`${base}/business/marketing`),
    toBusinessPartners: () => navigate(`${base}/business/partners`),
    toBusinessLegal: () => navigate(`${base}/business/legal`),
    
    // Development & DevOps routes
    toDevRepository: () => navigate(`${base}/dev/repository`),
    toDevPipeline: () => navigate(`${base}/dev/pipeline`),
    toDevTesting: () => navigate(`${base}/dev/testing`),
    toDevEnvironments: () => navigate(`${base}/dev/environments`),
    toDevPerformance: () => navigate(`${base}/dev/performance`),
    toDevSecurity: () => navigate(`${base}/dev/security`),
    toDevDocumentation: () => navigate(`${base}/dev/documentation`),
    toDevReleases: () => navigate(`${base}/dev/releases`),
    
    // Settings routes
    toSettings: () => navigate(`${base}/settings`),
    toSettingsProfile: () => navigate(`${base}/settings/profile`),
    toSettingsSystem: () => navigate(`${base}/settings/system`),
    toSettingsPreferences: () => navigate(`${base}/settings/preferences`),
    toSettingsSecurity: () => navigate(`${base}/settings/security`),
    
    // Utility functions
    goBack: () => navigate(-1),
    goHome: () => navigate(base),
    goTo: (path: string) => navigate(`${base}/${path}`),
  };
}
