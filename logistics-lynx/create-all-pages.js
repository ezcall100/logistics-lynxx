const fs = require('fs');
const path = require('path');

// Define all the pages to create
const pages = [
  // System Monitoring Pages
  {
    name: 'PerformanceMonitoring',
    title: 'Performance Monitoring',
    path: 'system-monitoring/PerformanceMonitoring.tsx',
    description: 'Real-time system performance monitoring and metrics'
  },
  {
    name: 'ErrorTracking',
    title: 'Error Tracking',
    path: 'system-monitoring/ErrorTracking.tsx',
    description: 'Track and analyze system errors and exceptions'
  },
  {
    name: 'LogAnalysis',
    title: 'Log Analysis',
    path: 'system-monitoring/LogAnalysis.tsx',
    description: 'Advanced log analysis and search capabilities'
  },
  {
    name: 'AlertManagement',
    title: 'Alert Management',
    path: 'system-monitoring/AlertManagement.tsx',
    description: 'Manage system alerts and notifications'
  },
  {
    name: 'UptimeMonitoring',
    title: 'Uptime Monitoring',
    path: 'system-monitoring/UptimeMonitoring.tsx',
    description: 'Monitor system uptime and availability'
  },
  {
    name: 'ResourceUsage',
    title: 'Resource Usage',
    path: 'system-monitoring/ResourceUsage.tsx',
    description: 'Track system resource consumption'
  },
  {
    name: 'NetworkMonitoring',
    title: 'Network Monitoring',
    path: 'system-monitoring/NetworkMonitoring.tsx',
    description: 'Monitor network performance and connectivity'
  },
  {
    name: 'HealthChecks',
    title: 'Health Checks',
    path: 'system-monitoring/HealthChecks.tsx',
    description: 'System health monitoring and diagnostics'
  },

  // Portal Management Pages
  {
    name: 'PortalOverview',
    title: 'Portal Overview',
    path: 'portal-management/PortalOverview.tsx',
    description: 'Overview of all portal configurations'
  },
  {
    name: 'PortalConfiguration',
    title: 'Portal Configuration',
    path: 'portal-management/PortalConfiguration.tsx',
    description: 'Configure portal settings and features'
  },
  {
    name: 'PortalUsers',
    title: 'Portal Users',
    path: 'portal-management/PortalUsers.tsx',
    description: 'Manage users across all portals'
  },
  {
    name: 'FeatureManagement',
    title: 'Feature Management',
    path: 'portal-management/FeatureManagement.tsx',
    description: 'Manage portal features and capabilities'
  },
  {
    name: 'PortalAnalytics',
    title: 'Portal Analytics',
    path: 'portal-management/PortalAnalytics.tsx',
    description: 'Analytics for portal performance'
  },
  {
    name: 'PortalBilling',
    title: 'Portal Billing',
    path: 'portal-management/PortalBilling.tsx',
    description: 'Billing management for portals'
  },
  {
    name: 'PortalSupport',
    title: 'Portal Support',
    path: 'portal-management/PortalSupport.tsx',
    description: 'Support management for portals'
  },
  {
    name: 'PortalIntegrations',
    title: 'Portal Integrations',
    path: 'portal-management/PortalIntegrations.tsx',
    description: 'Manage portal integrations'
  },
  {
    name: 'PortalBackup',
    title: 'Portal Backup',
    path: 'portal-management/PortalBackup.tsx',
    description: 'Backup and restore portal data'
  },
  {
    name: 'PortalSecurity',
    title: 'Portal Security',
    path: 'portal-management/PortalSecurity.tsx',
    description: 'Security settings for portals'
  },
  {
    name: 'PortalCompliance',
    title: 'Portal Compliance',
    path: 'portal-management/PortalCompliance.tsx',
    description: 'Compliance management for portals'
  },
  {
    name: 'PortalDeployment',
    title: 'Portal Deployment',
    path: 'portal-management/PortalDeployment.tsx',
    description: 'Deploy and manage portal updates'
  },

  // Analytics & Reports Pages
  {
    name: 'BusinessAnalytics',
    title: 'Business Analytics',
    path: 'analytics-reports/BusinessAnalytics.tsx',
    description: 'Comprehensive business analytics dashboard'
  },
  {
    name: 'AnalyticsUserAnalytics',
    title: 'User Analytics',
    path: 'analytics-reports/UserAnalytics.tsx',
    description: 'User behavior and engagement analytics'
  },
  {
    name: 'PerformanceReports',
    title: 'Performance Reports',
    path: 'analytics-reports/PerformanceReports.tsx',
    description: 'System performance reports and insights'
  },
  {
    name: 'SecurityReports',
    title: 'Security Reports',
    path: 'analytics-reports/SecurityReports.tsx',
    description: 'Security incident and threat reports'
  },
  {
    name: 'FinancialReports',
    title: 'Financial Reports',
    path: 'analytics-reports/FinancialReports.tsx',
    description: 'Financial performance and revenue reports'
  },
  {
    name: 'OperationalReports',
    title: 'Operational Reports',
    path: 'analytics-reports/OperationalReports.tsx',
    description: 'Operational efficiency and metrics reports'
  },
  {
    name: 'CustomReports',
    title: 'Custom Reports',
    path: 'analytics-reports/CustomReports.tsx',
    description: 'Create and manage custom reports'
  },
  {
    name: 'DataExport',
    title: 'Data Export',
    path: 'analytics-reports/DataExport.tsx',
    description: 'Export data in various formats'
  },
  {
    name: 'DashboardBuilder',
    title: 'Dashboard Builder',
    path: 'analytics-reports/DashboardBuilder.tsx',
    description: 'Build custom analytics dashboards'
  },
  {
    name: 'ScheduledReports',
    title: 'Scheduled Reports',
    path: 'analytics-reports/ScheduledReports.tsx',
    description: 'Schedule and automate report generation'
  },

  // MCP Control Center Pages
  {
    name: 'MCPOverview',
    title: 'MCP Overview',
    path: 'mcp-control-center/MCPOverview.tsx',
    description: 'Overview of MCP agents and AI systems'
  },
  {
    name: 'AgentManagement',
    title: 'Agent Management',
    path: 'mcp-control-center/AgentManagement.tsx',
    description: 'Manage AI agents and their configurations'
  },
  {
    name: 'AIModels',
    title: 'AI Models',
    path: 'mcp-control-center/AIModels.tsx',
    description: 'Manage AI models and their versions'
  },
  {
    name: 'DataPipeline',
    title: 'Data Pipeline',
    path: 'mcp-control-center/DataPipeline.tsx',
    description: 'Manage data pipelines and workflows'
  },
  {
    name: 'MachineLearning',
    title: 'Machine Learning',
    path: 'mcp-control-center/MachineLearning.tsx',
    description: 'Machine learning model training and deployment'
  },
  {
    name: 'AIAnalytics',
    title: 'AI Analytics',
    path: 'mcp-control-center/AIAnalytics.tsx',
    description: 'Analytics for AI performance and insights'
  },
  {
    name: 'AutomationRules',
    title: 'Automation Rules',
    path: 'mcp-control-center/AutomationRules.tsx',
    description: 'Manage automation rules and workflows'
  },
  {
    name: 'AIIntegrations',
    title: 'AI Integrations',
    path: 'mcp-control-center/AIIntegrations.tsx',
    description: 'Manage AI system integrations'
  },
  {
    name: 'AIMonitoring',
    title: 'AI Monitoring',
    path: 'mcp-control-center/AIMonitoring.tsx',
    description: 'Monitor AI system performance and health'
  },
  {
    name: 'AICompliance',
    title: 'AI Compliance',
    path: 'mcp-control-center/AICompliance.tsx',
    description: 'AI compliance and governance management'
  },
  {
    name: 'AIDocumentation',
    title: 'AI Documentation',
    path: 'mcp-control-center/AIDocumentation.tsx',
    description: 'AI system documentation and guides'
  },
  {
    name: 'AISupport',
    title: 'AI Support',
    path: 'mcp-control-center/AISupport.tsx',
    description: 'AI system support and troubleshooting'
  },

  // Business Operations Pages
  {
    name: 'CustomerManagement',
    title: 'Customer Management',
    path: 'business-operations/CustomerManagement.tsx',
    description: 'Manage customer relationships and data'
  },
  {
    name: 'SalesPipeline',
    title: 'Sales Pipeline',
    path: 'business-operations/SalesPipeline.tsx',
    description: 'Track and manage sales opportunities'
  },
  {
    name: 'BillingInvoicing',
    title: 'Billing & Invoicing',
    path: 'business-operations/BillingInvoicing.tsx',
    description: 'Manage billing and invoicing processes'
  },
  {
    name: 'SupportManagement',
    title: 'Support Management',
    path: 'business-operations/SupportManagement.tsx',
    description: 'Manage customer support operations'
  },
  {
    name: 'Documentation',
    title: 'Documentation',
    path: 'business-operations/Documentation.tsx',
    description: 'Manage business documentation'
  },
  {
    name: 'MarketingTools',
    title: 'Marketing Tools',
    path: 'business-operations/MarketingTools.tsx',
    description: 'Marketing campaign management tools'
  },
  {
    name: 'PartnerManagement',
    title: 'Partner Management',
    path: 'business-operations/PartnerManagement.tsx',
    description: 'Manage business partnerships'
  },
  {
    name: 'LegalCompliance',
    title: 'Legal & Compliance',
    path: 'business-operations/LegalCompliance.tsx',
    description: 'Legal and compliance management'
  },

  // Development & DevOps Pages
  {
    name: 'CodeRepository',
    title: 'Code Repository',
    path: 'development-devops/CodeRepository.tsx',
    description: 'Manage code repositories and version control'
  },
  {
    name: 'CICDPipeline',
    title: 'CI/CD Pipeline',
    path: 'development-devops/CICDPipeline.tsx',
    description: 'Continuous integration and deployment pipeline'
  },
  {
    name: 'TestingSuite',
    title: 'Testing Suite',
    path: 'development-devops/TestingSuite.tsx',
    description: 'Automated testing and quality assurance'
  },
  {
    name: 'EnvironmentManagement',
    title: 'Environment Management',
    path: 'development-devops/EnvironmentManagement.tsx',
    description: 'Manage development and production environments'
  },
  {
    name: 'PerformanceTesting',
    title: 'Performance Testing',
    path: 'development-devops/PerformanceTesting.tsx',
    description: 'Performance testing and optimization'
  },
  {
    name: 'SecurityTesting',
    title: 'Security Testing',
    path: 'development-devops/SecurityTesting.tsx',
    description: 'Security testing and vulnerability assessment'
  },
  {
    name: 'DevDocumentation',
    title: 'Dev Documentation',
    path: 'development-devops/DevDocumentation.tsx',
    description: 'Developer documentation and guides'
  },
  {
    name: 'ReleaseManagement',
    title: 'Release Management',
    path: 'development-devops/ReleaseManagement.tsx',
    description: 'Software release management and deployment'
  },

  // Settings Pages
  {
    name: 'SettingsOverview',
    title: 'Settings Overview',
    path: 'settings/SettingsOverview.tsx',
    description: 'Overview of all system settings'
  },
  {
    name: 'ProfileSettings',
    title: 'Profile Settings',
    path: 'settings/ProfileSettings.tsx',
    description: 'User profile and account settings'
  },
  {
    name: 'SystemSettings',
    title: 'System Settings',
    path: 'settings/SystemSettings.tsx',
    description: 'System-wide configuration settings'
  },
  {
    name: 'UserPreferences',
    title: 'User Preferences',
    path: 'settings/UserPreferences.tsx',
    description: 'User interface and experience preferences'
  },
  {
    name: 'SecuritySettings',
    title: 'Security Settings',
    path: 'settings/SecuritySettings.tsx',
    description: 'Security and privacy settings'
  },
  {
    name: 'NotificationSettings',
    title: 'Notification Settings',
    path: 'settings/NotificationSettings.tsx',
    description: 'Notification preferences and settings'
  },
  {
    name: 'AppearanceSettings',
    title: 'Appearance Settings',
    path: 'settings/AppearanceSettings.tsx',
    description: 'UI appearance and theme settings'
  },
  {
    name: 'LanguageSettings',
    title: 'Language Settings',
    path: 'settings/LanguageSettings.tsx',
    description: 'Language and localization settings'
  },
  {
    name: 'AccessibilitySettings',
    title: 'Accessibility Settings',
    path: 'settings/AccessibilitySettings.tsx',
    description: 'Accessibility and usability settings'
  },
  {
    name: 'PrivacySettings',
    title: 'Privacy Settings',
    path: 'settings/PrivacySettings.tsx',
    description: 'Privacy and data protection settings'
  },
  {
    name: 'IntegrationSettings',
    title: 'Integration Settings',
    path: 'settings/IntegrationSettings.tsx',
    description: 'Third-party integration settings'
  },
  {
    name: 'BackupSettings',
    title: 'Backup Settings',
    path: 'settings/BackupSettings.tsx',
    description: 'Backup and recovery settings'
  },
  {
    name: 'AdvancedSettings',
    title: 'Advanced Settings',
    path: 'settings/AdvancedSettings.tsx',
    description: 'Advanced system configuration'
  },
  {
    name: 'AboutSettings',
    title: 'About Settings',
    path: 'settings/AboutSettings.tsx',
    description: 'System information and about details'
  },

  // Profile Pages
  {
    name: 'ProfileOverview',
    title: 'Profile Overview',
    path: 'profile/ProfileOverview.tsx',
    description: 'User profile overview and summary'
  },
  {
    name: 'PersonalInformation',
    title: 'Personal Information',
    path: 'profile/PersonalInformation.tsx',
    description: 'Manage personal information and details'
  },
  {
    name: 'AvatarMedia',
    title: 'Avatar & Media',
    path: 'profile/AvatarMedia.tsx',
    description: 'Manage profile avatar and media'
  },
  {
    name: 'ProfileUserPreferences',
    title: 'Profile Preferences',
    path: 'profile/UserPreferences.tsx',
    description: 'User-specific preferences and settings'
  },
  {
    name: 'ActivityHistory',
    title: 'Activity History',
    path: 'profile/ActivityHistory.tsx',
    description: 'User activity history and logs'
  },
  {
    name: 'ActiveSessions',
    title: 'Active Sessions',
    path: 'profile/ActiveSessions.tsx',
    description: 'Manage active user sessions'
  },
  {
    name: 'AccountVerification',
    title: 'Account Verification',
    path: 'profile/AccountVerification.tsx',
    description: 'Account verification and security'
  },
  {
    name: 'AccountDeletion',
    title: 'Account Deletion',
    path: 'profile/AccountDeletion.tsx',
    description: 'Account deletion and data removal'
  },

  // FAB Pages
  {
    name: 'FABOverview',
    title: 'FAB Overview',
    path: 'fab/FABOverview.tsx',
    description: 'Floating Action Button overview and management'
  },
  {
    name: 'FABActions',
    title: 'FAB Actions',
    path: 'fab/FABActions.tsx',
    description: 'Manage FAB actions and shortcuts'
  },
  {
    name: 'FABCustomization',
    title: 'FAB Customization',
    path: 'fab/FABCustomization.tsx',
    description: 'Customize FAB appearance and behavior'
  },
  {
    name: 'FABTemplates',
    title: 'FAB Templates',
    path: 'fab/FABTemplates.tsx',
    description: 'FAB templates and presets'
  },
  {
    name: 'FABAnalytics',
    title: 'FAB Analytics',
    path: 'fab/FABAnalytics.tsx',
    description: 'FAB usage analytics and insights'
  },
  {
    name: 'FABIntegrations',
    title: 'FAB Integrations',
    path: 'fab/FABIntegrations.tsx',
    description: 'FAB integration management'
  },

  // Mobile Pages
  {
    name: 'MobileOverview',
    title: 'Mobile Overview',
    path: 'mobile/MobileOverview.tsx',
    description: 'Mobile app overview and management'
  },
  {
    name: 'MobileSettings',
    title: 'Mobile Settings',
    path: 'mobile/MobileSettings.tsx',
    description: 'Mobile app settings and configuration'
  },
  {
    name: 'MobileSync',
    title: 'Mobile Sync',
    path: 'mobile/MobileSync.tsx',
    description: 'Mobile data synchronization'
  },
  {
    name: 'MobileDevices',
    title: 'Mobile Devices',
    path: 'mobile/MobileDevices.tsx',
    description: 'Manage mobile devices and apps'
  }
];

// Template for creating a modern page component
function createPageTemplate(page) {
  return `import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Zap,
  Database,
  Server,
  Shield,
  Globe,
  Brain,
  Briefcase,
  Code,
  Settings,
  User,
  Star,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  X
} from 'lucide-react';

const ${page.name}: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for demonstration
  const mockData = [
    { id: 1, name: 'Item 1', status: 'active', value: 100, date: '2024-01-15' },
    { id: 2, name: 'Item 2', status: 'inactive', value: 200, date: '2024-01-16' },
    { id: 3, name: 'Item 3', status: 'active', value: 150, date: '2024-01-17' },
    { id: 4, name: 'Item 4', status: 'pending', value: 300, date: '2024-01-18' },
    { id: 5, name: 'Item 5', status: 'active', value: 250, date: '2024-01-19' },
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ${page.title}
              </h1>
              <p className="text-lg text-gray-600">
                ${page.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{data.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.filter(item => item.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.filter(item => item.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Data Overview</h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${getStatusColor(item.status)}\`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Create New</p>
                <p className="text-sm text-gray-500">Add a new item</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-green-100 rounded-lg">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Import Data</p>
                <p className="text-sm text-gray-500">Bulk import items</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Generate Report</p>
                <p className="text-sm text-gray-500">Create detailed report</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Configure</p>
                <p className="text-sm text-gray-500">Settings & preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${page.name};
`;
}

// Create directories and files
pages.forEach(page => {
  const dirPath = path.join(__dirname, 'src/pages/super-admin', path.dirname(page.path));
  const filePath = path.join(__dirname, 'src/pages/super-admin', page.path);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
  
  // Create the file
  fs.writeFileSync(filePath, createPageTemplate(page));
  console.log(`Created page: ${page.name} at ${filePath}`);
});

console.log(`\n✅ Successfully created ${pages.length} Super Admin pages!\n`);
console.log('Pages created:');
pages.forEach(page => {
  console.log(`  - ${page.name} (${page.title})`);
});
