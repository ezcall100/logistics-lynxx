// MCP Routing Configuration - Comprehensive mapping for all super admin pages
// API Port: 3001 - Unified configuration for all MCP agent integrations

export const MCP_ROUTING_CONFIG = {
  // Base API Configuration
  api: {
    baseURL: import.meta.env.VITE_MCP_API_URL || 'http://localhost:3001/api',
    port: 3001,
    timeout: 30000,
    retries: 3,
  },

  // N8N Webhook Configuration
  n8n: {
    webhookUrl: 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
    status: 'working',
    responseTime: 200,
    testResults: {
      basic: 'success',
      autonomous: 'success',
      health: 'success',
      complex: 'success'
    }
  },

  // Super Admin Dashboard Routes
  dashboard: {
    path: '/super-admin/dashboard',
    mcpEndpoint: '/mcp/dashboard',
    agent: 'dashboard-analytics-agent',
    features: ['metrics', 'analytics', 'real-time-monitoring'],
  },

  // User Management Routes
  userManagement: {
    base: '/super-admin/users',
    mcpBase: '/mcp/users',
    agent: 'user-management-agent',
    routes: {
      allUsers: {
        path: '/super-admin/users',
        mcpEndpoint: '/mcp/users',
        agent: 'user-management-agent',
      },
      roles: {
        path: '/super-admin/users/roles',
        mcpEndpoint: '/mcp/users/roles',
        agent: 'role-management-agent',
      },
      groups: {
        path: '/super-admin/users/groups',
        mcpEndpoint: '/mcp/users/groups',
        agent: 'group-management-agent',
      },
      access: {
        path: '/super-admin/users/access',
        mcpEndpoint: '/mcp/users/access-control',
        agent: 'access-control-agent',
      },
      analytics: {
        path: '/super-admin/users/analytics',
        mcpEndpoint: '/mcp/users/analytics',
        agent: 'user-analytics-agent',
      },
      billing: {
        path: '/super-admin/users/billing',
        mcpEndpoint: '/mcp/users/billing',
        agent: 'billing-management-agent',
      },
      support: {
        path: '/super-admin/users/support',
        mcpEndpoint: '/mcp/users/support',
        agent: 'support-management-agent',
      },
      onboarding: {
        path: '/super-admin/users/onboarding',
        mcpEndpoint: '/mcp/users/onboarding',
        agent: 'onboarding-agent',
      },
    },
  },

  // System Administration Routes
  systemAdmin: {
    base: '/super-admin/system',
    mcpBase: '/mcp/system',
    agent: 'system-administration-agent',
    routes: {
      database: {
        path: '/super-admin/system/database',
        mcpEndpoint: '/mcp/system/database',
        agent: 'database-management-agent',
      },
      api: {
        path: '/super-admin/system/api',
        mcpEndpoint: '/mcp/system/api',
        agent: 'api-management-agent',
      },
      deployment: {
        path: '/super-admin/system/deployment',
        mcpEndpoint: '/mcp/system/deployment',
        agent: 'deployment-agent',
      },
      config: {
        path: '/super-admin/system/config',
        mcpEndpoint: '/mcp/system/configuration',
        agent: 'configuration-agent',
      },
      backup: {
        path: '/super-admin/system/backup',
        mcpEndpoint: '/mcp/system/backup',
        agent: 'backup-recovery-agent',
      },
      security: {
        path: '/super-admin/system/security',
        mcpEndpoint: '/mcp/system/security',
        agent: 'security-agent',
      },
      integrations: {
        path: '/super-admin/system/integrations',
        mcpEndpoint: '/mcp/system/integrations',
        agent: 'integration-agent',
      },
      storage: {
        path: '/super-admin/system/storage',
        mcpEndpoint: '/mcp/system/storage',
        agent: 'storage-agent',
      },
      email: {
        path: '/super-admin/system/email',
        mcpEndpoint: '/mcp/system/email',
        agent: 'email-services-agent',
      },
    },
  },

  // Security Center Routes
  securityCenter: {
    base: '/super-admin/security',
    mcpBase: '/mcp/security',
    agent: 'security-center-agent',
    routes: {
      audit: {
        path: '/super-admin/security/audit',
        mcpEndpoint: '/mcp/security/audit',
        agent: 'security-audit-agent',
      },
      logs: {
        path: '/super-admin/security/logs',
        mcpEndpoint: '/mcp/security/logs',
        agent: 'access-logs-agent',
      },
      protection: {
        path: '/super-admin/security/protection',
        mcpEndpoint: '/mcp/security/data-protection',
        agent: 'data-protection-agent',
      },
      api: {
        path: '/super-admin/security/api',
        mcpEndpoint: '/mcp/security/api',
        agent: 'api-security-agent',
      },
      permissions: {
        path: '/super-admin/security/permissions',
        mcpEndpoint: '/mcp/security/permissions',
        agent: 'permissions-agent',
      },
      policies: {
        path: '/super-admin/security/policies',
        mcpEndpoint: '/mcp/security/policies',
        agent: 'security-policies-agent',
      },
      incidents: {
        path: '/super-admin/security/incidents',
        mcpEndpoint: '/mcp/security/incidents',
        agent: 'incident-response-agent',
      },
      compliance: {
        path: '/super-admin/security/compliance',
        mcpEndpoint: '/mcp/security/compliance',
        agent: 'compliance-agent',
      },
    },
  },

  // System Monitoring Routes
  systemMonitoring: {
    base: '/super-admin/monitoring',
    mcpBase: '/mcp/monitoring',
    agent: 'system-monitoring-agent',
    routes: {
      performance: {
        path: '/super-admin/monitoring/performance',
        mcpEndpoint: '/mcp/monitoring/performance',
        agent: 'performance-monitoring-agent',
      },
      errors: {
        path: '/super-admin/monitoring/errors',
        mcpEndpoint: '/mcp/monitoring/errors',
        agent: 'error-tracking-agent',
      },
      logs: {
        path: '/super-admin/monitoring/logs',
        mcpEndpoint: '/mcp/monitoring/logs',
        agent: 'log-analysis-agent',
      },
      alerts: {
        path: '/super-admin/monitoring/alerts',
        mcpEndpoint: '/mcp/monitoring/alerts',
        agent: 'alert-management-agent',
      },
      uptime: {
        path: '/super-admin/monitoring/uptime',
        mcpEndpoint: '/mcp/monitoring/uptime',
        agent: 'uptime-monitoring-agent',
      },
      resources: {
        path: '/super-admin/monitoring/resources',
        mcpEndpoint: '/mcp/monitoring/resources',
        agent: 'resource-usage-agent',
      },
      network: {
        path: '/super-admin/monitoring/network',
        mcpEndpoint: '/mcp/monitoring/network',
        agent: 'network-monitoring-agent',
      },
      health: {
        path: '/super-admin/monitoring/health',
        mcpEndpoint: '/mcp/monitoring/health',
        agent: 'health-checks-agent',
      },
    },
  },

  // Portal Management Routes
  portalManagement: {
    base: '/super-admin/portals',
    mcpBase: '/mcp/portals',
    agent: 'portal-management-agent',
    routes: {
      overview: {
        path: '/super-admin/portals',
        mcpEndpoint: '/mcp/portals',
        agent: 'portal-overview-agent',
      },
      config: {
        path: '/super-admin/portals/config',
        mcpEndpoint: '/mcp/portals/configuration',
        agent: 'portal-config-agent',
      },
      users: {
        path: '/super-admin/portals/users',
        mcpEndpoint: '/mcp/portals/users',
        agent: 'portal-users-agent',
      },
      features: {
        path: '/super-admin/portals/features',
        mcpEndpoint: '/mcp/portals/features',
        agent: 'feature-management-agent',
      },
      analytics: {
        path: '/super-admin/portals/analytics',
        mcpEndpoint: '/mcp/portals/analytics',
        agent: 'portal-analytics-agent',
      },
      billing: {
        path: '/super-admin/portals/billing',
        mcpEndpoint: '/mcp/portals/billing',
        agent: 'portal-billing-agent',
      },
      support: {
        path: '/super-admin/portals/support',
        mcpEndpoint: '/mcp/portals/support',
        agent: 'portal-support-agent',
      },
      integrations: {
        path: '/super-admin/portals/integrations',
        mcpEndpoint: '/mcp/portals/integrations',
        agent: 'portal-integrations-agent',
      },
      backup: {
        path: '/super-admin/portals/backup',
        mcpEndpoint: '/mcp/portals/backup',
        agent: 'portal-backup-agent',
      },
      security: {
        path: '/super-admin/portals/security',
        mcpEndpoint: '/mcp/portals/security',
        agent: 'portal-security-agent',
      },
      compliance: {
        path: '/super-admin/portals/compliance',
        mcpEndpoint: '/mcp/portals/compliance',
        agent: 'portal-compliance-agent',
      },
      deployment: {
        path: '/super-admin/portals/deployment',
        mcpEndpoint: '/mcp/portals/deployment',
        agent: 'portal-deployment-agent',
      },
    },
  },

  // Analytics & Reports Routes
  analyticsReports: {
    base: '/super-admin/analytics',
    mcpBase: '/mcp/analytics',
    agent: 'analytics-reports-agent',
    routes: {
      business: {
        path: '/super-admin/analytics/business',
        mcpEndpoint: '/mcp/analytics/business',
        agent: 'business-analytics-agent',
      },
      users: {
        path: '/super-admin/analytics/users',
        mcpEndpoint: '/mcp/analytics/users',
        agent: 'user-analytics-agent',
      },
      performance: {
        path: '/super-admin/analytics/performance',
        mcpEndpoint: '/mcp/analytics/performance',
        agent: 'performance-reports-agent',
      },
      security: {
        path: '/super-admin/analytics/security',
        mcpEndpoint: '/mcp/analytics/security',
        agent: 'security-reports-agent',
      },
      financial: {
        path: '/super-admin/analytics/financial',
        mcpEndpoint: '/mcp/analytics/financial',
        agent: 'financial-reports-agent',
      },
      operational: {
        path: '/super-admin/analytics/operational',
        mcpEndpoint: '/mcp/analytics/operational',
        agent: 'operational-reports-agent',
      },
      custom: {
        path: '/super-admin/analytics/custom',
        mcpEndpoint: '/mcp/analytics/custom',
        agent: 'custom-reports-agent',
      },
      export: {
        path: '/super-admin/analytics/export',
        mcpEndpoint: '/mcp/analytics/export',
        agent: 'data-export-agent',
      },
      dashboards: {
        path: '/super-admin/analytics/dashboards',
        mcpEndpoint: '/mcp/analytics/dashboards',
        agent: 'dashboard-builder-agent',
      },
      scheduled: {
        path: '/super-admin/analytics/scheduled',
        mcpEndpoint: '/mcp/analytics/scheduled',
        agent: 'scheduled-reports-agent',
      },
    },
  },

  // MCP Control Center Routes
  mcpControlCenter: {
    base: '/super-admin/mcp',
    mcpBase: '/mcp/control-center',
    agent: 'mcp-control-center-agent',
    routes: {
      overview: {
        path: '/super-admin/mcp',
        mcpEndpoint: '/mcp/control-center',
        agent: 'mcp-overview-agent',
      },
      agents: {
        path: '/super-admin/mcp/agents',
        mcpEndpoint: '/mcp/control-center/agents',
        agent: 'agent-management-agent',
      },
      models: {
        path: '/super-admin/mcp/models',
        mcpEndpoint: '/mcp/control-center/models',
        agent: 'ai-models-agent',
      },
      pipeline: {
        path: '/super-admin/mcp/pipeline',
        mcpEndpoint: '/mcp/control-center/pipeline',
        agent: 'data-pipeline-agent',
      },
      learning: {
        path: '/super-admin/mcp/learning',
        mcpEndpoint: '/mcp/control-center/learning',
        agent: 'machine-learning-agent',
      },
      analytics: {
        path: '/super-admin/mcp/analytics',
        mcpEndpoint: '/mcp/control-center/analytics',
        agent: 'ai-analytics-agent',
      },
      automation: {
        path: '/super-admin/mcp/automation',
        mcpEndpoint: '/mcp/control-center/automation',
        agent: 'automation-rules-agent',
      },
      integrations: {
        path: '/super-admin/mcp/integrations',
        mcpEndpoint: '/mcp/control-center/integrations',
        agent: 'ai-integrations-agent',
      },
      monitoring: {
        path: '/super-admin/mcp/monitoring',
        mcpEndpoint: '/mcp/control-center/monitoring',
        agent: 'ai-monitoring-agent',
      },
      compliance: {
        path: '/super-admin/mcp/compliance',
        mcpEndpoint: '/mcp/control-center/compliance',
        agent: 'ai-compliance-agent',
      },
      documentation: {
        path: '/super-admin/mcp/documentation',
        mcpEndpoint: '/mcp/control-center/documentation',
        agent: 'ai-documentation-agent',
      },
      support: {
        path: '/super-admin/mcp/support',
        mcpEndpoint: '/mcp/control-center/support',
        agent: 'ai-support-agent',
      },
    },
  },

  // Phase 2 Orchestration
  phase2Orchestration: {
    path: '/super-admin/phase2-orchestration',
    mcpEndpoint: '/mcp/phase2-orchestration',
    agent: 'phase2-orchestration-agent',
  },

  // Business Operations Routes
  businessOperations: {
    base: '/super-admin/business',
    mcpBase: '/mcp/business',
    agent: 'business-operations-agent',
    routes: {
      customers: {
        path: '/super-admin/business/customers',
        mcpEndpoint: '/mcp/business/customers',
        agent: 'customer-management-agent',
      },
      sales: {
        path: '/super-admin/business/sales',
        mcpEndpoint: '/mcp/business/sales',
        agent: 'sales-pipeline-agent',
      },
      billing: {
        path: '/super-admin/business/billing',
        mcpEndpoint: '/mcp/business/billing',
        agent: 'billing-invoicing-agent',
      },
      support: {
        path: '/super-admin/business/support',
        mcpEndpoint: '/mcp/business/support',
        agent: 'support-management-agent',
      },
      docs: {
        path: '/super-admin/business/docs',
        mcpEndpoint: '/mcp/business/documentation',
        agent: 'documentation-agent',
      },
      marketing: {
        path: '/super-admin/business/marketing',
        mcpEndpoint: '/mcp/business/marketing',
        agent: 'marketing-tools-agent',
      },
      partners: {
        path: '/super-admin/business/partners',
        mcpEndpoint: '/mcp/business/partners',
        agent: 'partner-management-agent',
      },
      legal: {
        path: '/super-admin/business/legal',
        mcpEndpoint: '/mcp/business/legal',
        agent: 'legal-compliance-agent',
      },
    },
  },

  // Development & DevOps Routes
  developmentDevOps: {
    base: '/super-admin/dev',
    mcpBase: '/mcp/dev',
    agent: 'development-devops-agent',
    routes: {
      repository: {
        path: '/super-admin/dev/repository',
        mcpEndpoint: '/mcp/dev/repository',
        agent: 'code-repository-agent',
      },
      pipeline: {
        path: '/super-admin/dev/pipeline',
        mcpEndpoint: '/mcp/dev/pipeline',
        agent: 'cicd-pipeline-agent',
      },
      testing: {
        path: '/super-admin/dev/testing',
        mcpEndpoint: '/mcp/dev/testing',
        agent: 'testing-suite-agent',
      },
      environments: {
        path: '/super-admin/dev/environments',
        mcpEndpoint: '/mcp/dev/environments',
        agent: 'environment-management-agent',
      },
      performance: {
        path: '/super-admin/dev/performance',
        mcpEndpoint: '/mcp/dev/performance',
        agent: 'performance-testing-agent',
      },
      security: {
        path: '/super-admin/dev/security',
        mcpEndpoint: '/mcp/dev/security',
        agent: 'security-testing-agent',
      },
      documentation: {
        path: '/super-admin/dev/documentation',
        mcpEndpoint: '/mcp/dev/documentation',
        agent: 'dev-documentation-agent',
      },
      releases: {
        path: '/super-admin/dev/releases',
        mcpEndpoint: '/mcp/dev/releases',
        agent: 'release-management-agent',
      },
    },
  },

  // Settings Routes
  settings: {
    base: '/super-admin/settings',
    mcpBase: '/mcp/settings',
    agent: 'settings-agent',
    routes: {
      overview: {
        path: '/super-admin/settings',
        mcpEndpoint: '/mcp/settings',
        agent: 'settings-overview-agent',
      },
      profile: {
        path: '/super-admin/settings/profile',
        mcpEndpoint: '/mcp/settings/profile',
        agent: 'profile-settings-agent',
      },
      system: {
        path: '/super-admin/settings/system',
        mcpEndpoint: '/mcp/settings/system',
        agent: 'system-settings-agent',
      },
      preferences: {
        path: '/super-admin/settings/preferences',
        mcpEndpoint: '/mcp/settings/preferences',
        agent: 'user-preferences-agent',
      },
      security: {
        path: '/super-admin/settings/security',
        mcpEndpoint: '/mcp/settings/security',
        agent: 'security-settings-agent',
      },
    },
  },

  // Profile Routes
  profile: {
    base: '/super-admin/profile',
    mcpBase: '/mcp/profile',
    agent: 'profile-agent',
    routes: {
      overview: {
        path: '/super-admin/profile',
        mcpEndpoint: '/mcp/profile',
        agent: 'profile-overview-agent',
      },
      personal: {
        path: '/super-admin/profile/personal',
        mcpEndpoint: '/mcp/profile/personal',
        agent: 'personal-information-agent',
      },
      avatar: {
        path: '/super-admin/profile/avatar',
        mcpEndpoint: '/mcp/profile/avatar',
        agent: 'avatar-media-agent',
      },
      preferences: {
        path: '/super-admin/profile/preferences',
        mcpEndpoint: '/mcp/profile/preferences',
        agent: 'user-preferences-profile-agent',
      },
      activity: {
        path: '/super-admin/profile/activity',
        mcpEndpoint: '/mcp/profile/activity',
        agent: 'activity-history-agent',
      },
      delete: {
        path: '/super-admin/profile/delete',
        mcpEndpoint: '/mcp/profile/delete',
        agent: 'account-deletion-agent',
      },
    },
  },

  // FAB (Floating Action Button) Routes
  fab: {
    base: '/super-admin/fab',
    mcpBase: '/mcp/fab',
    agent: 'fab-agent',
    routes: {
      overview: {
        path: '/super-admin/fab',
        mcpEndpoint: '/mcp/fab',
        agent: 'fab-overview-agent',
      },
      actions: {
        path: '/super-admin/fab/actions',
        mcpEndpoint: '/mcp/fab/actions',
        agent: 'fab-actions-agent',
      },
      customization: {
        path: '/super-admin/fab/customization',
        mcpEndpoint: '/mcp/fab/customization',
        agent: 'fab-customization-agent',
      },
    },
  },

  // MCP Agent Types and Capabilities
  agentTypes: {
    autonomous: {
      capabilities: ['self-managing', 'decision-making', 'continuous-learning'],
      endpoints: ['/mcp/agents/autonomous'],
    },
    assistant: {
      capabilities: ['user-interaction', 'task-execution', 'context-awareness'],
      endpoints: ['/mcp/agents/assistant'],
    },
    analytics: {
      capabilities: ['data-analysis', 'reporting', 'insights-generation'],
      endpoints: ['/mcp/agents/analytics'],
    },
    automation: {
      capabilities: ['workflow-automation', 'rule-execution', 'process-optimization'],
      endpoints: ['/mcp/agents/automation'],
    },
    monitoring: {
      capabilities: ['system-monitoring', 'alerting', 'performance-tracking'],
      endpoints: ['/mcp/agents/monitoring'],
    },
  },

  // UI Component Mappings
  uiComponents: {
    dashboard: {
      components: ['EnhancedCard', 'EnhancedTable', 'EnhancedProgress', 'EnhancedBadge'],
      mcpEndpoint: '/mcp/ui/dashboard',
      agent: 'ui-dashboard-agent',
    },
    forms: {
      components: ['EnhancedForm', 'EnhancedInput', 'EnhancedSelect', 'EnhancedButton'],
      mcpEndpoint: '/mcp/ui/forms',
      agent: 'ui-forms-agent',
    },
    navigation: {
      components: ['EnhancedSidebar', 'EnhancedNavbar', 'EnhancedBreadcrumb'],
      mcpEndpoint: '/mcp/ui/navigation',
      agent: 'ui-navigation-agent',
    },
    data: {
      components: ['EnhancedTable', 'EnhancedChart', 'EnhancedDataGrid'],
      mcpEndpoint: '/mcp/ui/data',
      agent: 'ui-data-agent',
    },
  },

  // Authentication and Authorization
  auth: {
    login: {
      path: '/login',
      mcpEndpoint: '/mcp/auth/login',
      agent: 'auth-agent',
    },
    logout: {
      path: '/logout',
      mcpEndpoint: '/mcp/auth/logout',
      agent: 'auth-agent',
    },
    refresh: {
      mcpEndpoint: '/mcp/auth/refresh',
      agent: 'auth-agent',
    },
    permissions: {
      mcpEndpoint: '/mcp/auth/permissions',
      agent: 'permissions-agent',
    },
  },

  // Error Handling and Fallbacks
  errorHandling: {
    notFound: {
      path: '/404',
      mcpEndpoint: '/mcp/errors/not-found',
      agent: 'error-handling-agent',
    },
    unauthorized: {
      path: '/401',
      mcpEndpoint: '/mcp/errors/unauthorized',
      agent: 'error-handling-agent',
    },
    serverError: {
      path: '/500',
      mcpEndpoint: '/mcp/errors/server-error',
      agent: 'error-handling-agent',
    },
  },
};

// Utility functions for MCP routing
export const MCPRoutingUtils = {
  // Get MCP endpoint for a given route
  getMCPEndpoint: (routePath: string): string => {
    const path = routePath.toLowerCase();
    
    // Search through all route configurations
    for (const [section, config] of Object.entries(MCP_ROUTING_CONFIG)) {
      if (section === 'api' || section === 'agentTypes' || section === 'uiComponents' || 
          section === 'auth' || section === 'errorHandling') continue;
      
      if (typeof config === 'object' && 'routes' in config) {
        for (const [routeName, routeConfig] of Object.entries(config.routes)) {
          if (routeConfig.path.toLowerCase() === path) {
            return routeConfig.mcpEndpoint;
          }
        }
      } else if (typeof config === 'object' && 'path' in config) {
        if (config.path.toLowerCase() === path) {
          return config.mcpEndpoint;
        }
      }
    }
    
    return '/mcp/fallback';
  },

  // Get MCP agent for a given route
  getMCPAgent: (routePath: string): string => {
    const path = routePath.toLowerCase();
    
    for (const [section, config] of Object.entries(MCP_ROUTING_CONFIG)) {
      if (section === 'api' || section === 'agentTypes' || section === 'uiComponents' || 
          section === 'auth' || section === 'errorHandling') continue;
      
      if (typeof config === 'object' && 'routes' in config) {
        for (const [routeName, routeConfig] of Object.entries(config.routes)) {
          if (routeConfig.path.toLowerCase() === path) {
            return routeConfig.agent;
          }
        }
      } else if (typeof config === 'object' && 'path' in config) {
        if (config.path.toLowerCase() === path) {
          return config.agent;
        }
      }
    }
    
    return 'fallback-agent';
  },

  // Get all routes for a specific section
  getSectionRoutes: (sectionName: string): Record<string, any> => {
    const section = MCP_ROUTING_CONFIG[sectionName as keyof typeof MCP_ROUTING_CONFIG];
    if (section && typeof section === 'object' && 'routes' in section) {
      return section.routes;
    }
    return {};
  },

  // Validate route configuration
  validateRoute: (routePath: string): boolean => {
    return MCPRoutingUtils.getMCPEndpoint(routePath) !== '/mcp/fallback';
  },

  // Get all available routes
  getAllRoutes: (): string[] => {
    const routes: string[] = [];
    
    for (const [section, config] of Object.entries(MCP_ROUTING_CONFIG)) {
      if (section === 'api' || section === 'agentTypes' || section === 'uiComponents' || 
          section === 'auth' || section === 'errorHandling') continue;
      
      if (typeof config === 'object' && 'routes' in config) {
        for (const [routeName, routeConfig] of Object.entries(config.routes)) {
          routes.push(routeConfig.path);
        }
      } else if (typeof config === 'object' && 'path' in config) {
        routes.push(config.path);
      }
    }
    
    return routes;
  },
};

export default MCP_ROUTING_CONFIG;
