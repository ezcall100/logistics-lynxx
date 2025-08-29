import { useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { ChevronRight, Search, Brain, Settings, Zap } from 'lucide-react';
import { EnhancedIcon } from '../ui/EnhancedIcon';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle?: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | undefined;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  badge?: string;
  description?: string;
  children?: MenuItem[];
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

export const EnhancedSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle
}) => {
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug current location
  console.log('🔍 Current location:', location.pathname);

  // Enhanced navigation items with ALL original menus restored
  const navigationItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'LayoutDashboard',
      path: 'dashboard',
      badge: 'Live',
      description: 'System overview and analytics',
      priority: 'high'
    },
    {
      id: 'ui-playground',
      title: 'UI Playground',
      icon: 'Palette',
      path: 'ui-playground',
      badge: 'New',
      description: 'Test and demonstrate enterprise UI components',
      priority: 'high'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: 'Users',
      badge: '8',
      description: 'Manage all users across the platform',
      children: [
        { id: 'all-users', title: 'All Users', icon: 'Users', path: 'users' },
        { id: 'user-roles', title: 'User Roles', icon: 'Key', path: 'users/roles' },
        { id: 'user-groups', title: 'User Groups', icon: 'Users', path: 'users/groups' },
        { id: 'access-control', title: 'Access Control', icon: 'Shield', path: 'users/access' },
        { id: 'user-analytics', title: 'User Analytics', icon: 'BarChart3', path: 'users/analytics' },
        { id: 'billing-management', title: 'Billing Management', icon: 'CreditCard', path: 'users/billing' },
        { id: 'support-tickets', title: 'Support Tickets', icon: 'Headphones', path: 'users/support' },
        { id: 'user-onboarding', title: 'User Onboarding', icon: 'GraduationCap', path: 'users/onboarding' }
      ],
      priority: 'high'
    },
    {
      id: 'system',
      title: 'System Administration',
      icon: 'Server',
      description: 'Core system administration tools',
      children: [
        { id: 'database-management', title: 'Database Management', icon: 'Database', path: 'system/database' },
        { id: 'api-management', title: 'API Management', icon: 'Code', path: 'system/api' },
        { id: 'server-monitoring', title: 'Server Monitoring', icon: 'Monitor', path: 'system/monitoring' },
        { id: 'deployment-management', title: 'Deployment Management', icon: 'Rocket', path: 'system/deployment' },
        { id: 'configuration', title: 'Configuration', icon: 'Settings', path: 'system/config' },
        { id: 'backup-recovery', title: 'Backup & Recovery', icon: 'HardDrive', path: 'system/backup' },
        { id: 'security-settings', title: 'Security Settings', icon: 'Shield', path: 'system/security' },
        { id: 'integration-hub', title: 'Integration Hub', icon: 'Plug', path: 'system/integrations' },
        { id: 'file-storage', title: 'File Storage', icon: 'Folder', path: 'system/storage' },
        { id: 'email-services', title: 'Email Services', icon: 'Mail', path: 'system/email' }
      ],
      priority: 'high'
    },
    {
      id: 'security',
      title: 'Security Center',
      icon: 'Shield',
      badge: 'Live',
      description: 'Security monitoring and management',
      children: [
        { id: 'security-audit', title: 'Security Audit', icon: 'ShieldCheck', path: 'security/audit' },
        { id: 'access-logs', title: 'Access Logs', icon: 'FileText', path: 'security/logs' },
        { id: 'data-protection', title: 'Data Protection', icon: 'Lock', path: 'security/protection' },
        { id: 'api-security', title: 'API Security', icon: 'Shield', path: 'security/api' },
        { id: 'user-permissions', title: 'User Permissions', icon: 'Key', path: 'security/permissions' },
        { id: 'security-policies', title: 'Security Policies', icon: 'FileCheck', path: 'security/policies' },
        { id: 'incident-response', title: 'Incident Response', icon: 'AlertTriangle', path: 'security/incidents' },
        { id: 'compliance-management', title: 'Compliance Management', icon: 'CheckCircle', path: 'security/compliance' }
      ],
      priority: 'high'
    },
    {
      id: 'monitoring',
      title: 'System Monitoring',
      icon: 'Activity',
      badge: 'Live',
      description: 'Real-time system monitoring',
      children: [
        { id: 'performance-monitoring', title: 'Performance Monitoring', icon: 'Gauge', path: 'monitoring/performance' },
        { id: 'error-tracking', title: 'Error Tracking', icon: 'AlertCircle', path: 'monitoring/errors' },
        { id: 'log-analysis', title: 'Log Analysis', icon: 'FileText', path: 'monitoring/logs' },
        { id: 'alert-management', title: 'Alert Management', icon: 'Bell', path: 'monitoring/alerts' },
        { id: 'uptime-monitoring', title: 'Uptime Monitoring', icon: 'Clock', path: 'monitoring/uptime' },
        { id: 'resource-usage', title: 'Resource Usage', icon: 'Cpu', path: 'monitoring/resources' },
        { id: 'network-monitoring', title: 'Network Monitoring', icon: 'Network', path: 'monitoring/network' },
        { id: 'health-checks', title: 'Health Checks', icon: 'Heart', path: 'monitoring/health' }
      ],
      priority: 'high'
    },
    {
      id: 'portals',
      title: 'Portal Management',
      icon: 'Globe',
      description: 'Portal configuration and management',
      children: [
        { id: 'portal-overview', title: 'Portal Overview', icon: 'Eye', path: 'portals' },
        { id: 'portal-configuration', title: 'Portal Configuration', icon: 'Settings', path: 'portals/config' },
        { id: 'portal-users', title: 'Portal Users', icon: 'Users', path: 'portals/users' },
        { id: 'feature-management', title: 'Feature Management', icon: 'ToggleLeft', path: 'portals/features' },
        { id: 'portal-analytics', title: 'Portal Analytics', icon: 'BarChart3', path: 'portals/analytics' },
        { id: 'portal-billing', title: 'Portal Billing', icon: 'CreditCard', path: 'portals/billing' },
        { id: 'portal-support', title: 'Portal Support', icon: 'Headphones', path: 'portals/support' },
        { id: 'portal-integrations', title: 'Portal Integrations', icon: 'Plug', path: 'portals/integrations' },
        { id: 'portal-backup', title: 'Portal Backup', icon: 'HardDrive', path: 'portals/backup' },
        { id: 'portal-security', title: 'Portal Security', icon: 'Shield', path: 'portals/security' },
        { id: 'portal-compliance', title: 'Portal Compliance', icon: 'CheckCircle', path: 'portals/compliance' },
        { id: 'portal-deployment', title: 'Portal Deployment', icon: 'Rocket', path: 'portals/deployment' }
      ],
      priority: 'medium'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: 'BarChart3',
      description: 'Business intelligence and reporting',
      children: [
        { id: 'business-analytics', title: 'Business Analytics', icon: 'TrendingUp', path: 'analytics/business' },
        { id: 'user-analytics', title: 'User Analytics', icon: 'Users', path: 'analytics/users' },
        { id: 'performance-reports', title: 'Performance Reports', icon: 'Gauge', path: 'analytics/performance' },
        { id: 'security-reports', title: 'Security Reports', icon: 'Shield', path: 'analytics/security' },
        { id: 'financial-reports', title: 'Financial Reports', icon: 'DollarSign', path: 'analytics/financial' },
        { id: 'operational-reports', title: 'Operational Reports', icon: 'ClipboardList', path: 'analytics/operational' },
        { id: 'custom-reports', title: 'Custom Reports', icon: 'FileText', path: 'analytics/custom' },
        { id: 'data-export', title: 'Data Export', icon: 'Download', path: 'analytics/export' },
        { id: 'dashboard-builder', title: 'Dashboard Builder', icon: 'LayoutDashboard', path: 'analytics/dashboards' },
        { id: 'scheduled-reports', title: 'Scheduled Reports', icon: 'Clock', path: 'analytics/scheduled' }
      ],
      priority: 'medium'
    },
    {
      id: 'mcp',
      title: 'MCP Control Center',
      icon: 'Brain',
      badge: 'AI',
      description: 'AI agent management and control',
      children: [
        { id: 'mcp-overview', title: 'MCP Overview', icon: 'Eye', path: 'mcp' },
        { id: 'agent-management', title: 'Agent Management', icon: 'Users', path: 'mcp/agents' },
        { id: 'ai-models', title: 'AI Models', icon: 'Brain', path: 'mcp/models' },
        { id: 'data-pipeline', title: 'Data Pipeline', icon: 'Database', path: 'mcp/pipeline' },
        { id: 'machine-learning', title: 'Machine Learning', icon: 'Zap', path: 'mcp/learning' },
        { id: 'ai-analytics', title: 'AI Analytics', icon: 'BarChart3', path: 'mcp/analytics' },
        { id: 'automation-rules', title: 'Automation Rules', icon: 'Settings', path: 'mcp/automation' },
        { id: 'ai-integrations', title: 'AI Integrations', icon: 'Plug', path: 'mcp/integrations' },
        { id: 'ai-monitoring', title: 'AI Monitoring', icon: 'Activity', path: 'mcp/monitoring' },
        { id: 'ai-compliance', title: 'AI Compliance', icon: 'CheckCircle', path: 'mcp/compliance' },
        { id: 'ai-documentation', title: 'AI Documentation', icon: 'FileText', path: 'mcp/documentation' },
        { id: 'ai-support', title: 'AI Support', icon: 'Headphones', path: 'mcp/support' }
      ],
      priority: 'high'
    },
    {
      id: 'business',
      title: 'Business Operations',
      icon: 'Briefcase',
      description: 'Business process management',
      children: [
        { id: 'customer-management', title: 'Customer Management', icon: 'Users', path: 'business/customers' },
        { id: 'sales-pipeline', title: 'Sales Pipeline', icon: 'TrendingUp', path: 'business/sales' },
        { id: 'marketing-tools', title: 'Marketing Tools', icon: 'Megaphone', path: 'business/marketing' },
        { id: 'partner-management', title: 'Partner Management', icon: 'Handshake', path: 'business/partners' },
        { id: 'support-management', title: 'Support Management', icon: 'Headphones', path: 'business/support' },
        { id: 'billing-invoicing', title: 'Billing & Invoicing', icon: 'CreditCard', path: 'business/billing' },
        { id: 'legal-compliance', title: 'Legal & Compliance', icon: 'Scale', path: 'business/legal' },
        { id: 'documentation', title: 'Documentation', icon: 'FileText', path: 'business/docs' }
      ],
      priority: 'medium'
    },
    {
      id: 'development',
      title: 'Development & DevOps',
      icon: 'Code',
      description: 'Development and deployment tools',
      children: [
        { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', icon: 'GitBranch', path: 'dev/pipeline' },
        { id: 'code-repository', title: 'Code Repository', icon: 'GitCommit', path: 'dev/repository' },
        { id: 'testing-suite', title: 'Testing Suite', icon: 'TestTube', path: 'dev/testing' },
        { id: 'environment-management', title: 'Environment Management', icon: 'Server', path: 'dev/environments' },
        { id: 'release-management', title: 'Release Management', icon: 'Tag', path: 'dev/releases' },
        { id: 'performance-testing', title: 'Performance Testing', icon: 'Gauge', path: 'dev/performance' },
        { id: 'security-testing', title: 'Security Testing', icon: 'Shield', path: 'dev/security' },
        { id: 'dev-documentation', title: 'Dev Documentation', icon: 'FileText', path: 'dev/documentation' }
      ],
      priority: 'low'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'Settings',
      description: 'Application and user settings',
      children: [
        { id: 'settings-overview', title: 'Settings Overview', icon: 'Settings', path: 'settings' },
        { id: 'profile-settings', title: 'Profile Settings', icon: 'User', path: 'settings/profile' },
        { id: 'system-settings', title: 'System Settings', icon: 'Server', path: 'settings/system' },
        { id: 'user-preferences', title: 'User Preferences', icon: 'UserCheck', path: 'settings/preferences' },
        { id: 'security-settings-page', title: 'Security Settings', icon: 'Shield', path: 'settings/security' }
      ],
      priority: 'medium'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'User',
      description: 'User profile and account management',
      children: [
        { id: 'profile-overview', title: 'Profile Overview', icon: 'User', path: 'profile' },
        { id: 'personal-information', title: 'Personal Information', icon: 'UserCheck', path: 'profile/personal' },
        { id: 'avatar-media', title: 'Avatar & Media', icon: 'Image', path: 'profile/avatar' },
        { id: 'user-preferences-profile', title: 'User Preferences', icon: 'Settings', path: 'profile/preferences' },
        { id: 'activity-history', title: 'Activity History', icon: 'Clock', path: 'profile/activity' },
        { id: 'active-sessions', title: 'Active Sessions', icon: 'Monitor', path: 'profile/sessions' },
        { id: 'account-verification', title: 'Account Verification', icon: 'CheckCircle', path: 'profile/verification' },
        { id: 'account-deletion', title: 'Account Deletion', icon: 'Trash2', path: 'profile/delete' }
      ],
      priority: 'medium'
    },
    {
      id: 'fab',
      title: 'FAB Actions',
      icon: 'Plus',
      description: 'Floating Action Button management',
      children: [
        { id: 'fab-overview', title: 'FAB Overview', icon: 'Eye', path: 'fab' },
        { id: 'fab-actions', title: 'FAB Actions', icon: 'Zap', path: 'fab/actions' },
        { id: 'fab-customization', title: 'FAB Customization', icon: 'Settings', path: 'fab/customization' }
      ],
      priority: 'low'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: 'Smartphone',
      description: 'Mobile app management and settings',
      children: [
        { id: 'mobile-overview', title: 'Mobile Overview', icon: 'Eye', path: 'mobile' },
        { id: 'mobile-settings', title: 'Mobile Settings', icon: 'Settings', path: 'mobile/settings' },
        { id: 'mobile-analytics', title: 'Mobile Analytics', icon: 'BarChart3', path: 'mobile/analytics' },
        { id: 'mobile-push', title: 'Push Notifications', icon: 'Bell', path: 'mobile/push' },
        { id: 'mobile-updates', title: 'App Updates', icon: 'Download', path: 'mobile/updates' }
      ],
            priority: 'low'
    }
  ];

  const toggleMenu = (menuId: string) => {
    console.log('🔄 Toggling menu:', menuId);
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleNavigation = (path: string) => {
    console.log('🧭 Navigating to:', path);
    navigate(path);
  };

  const filteredItems = navigationItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.children?.some(child => child.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <aside className={`
      fixed left-0 top-16 h-full z-30 transition-all duration-300 ease-in-out
      ${isOpen ? 'w-80' : 'w-0'}
    `}>
      <div className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
        {/* Enhanced Sidebar Header */}
        <div className="p-4 border-b border-gray-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Navigation
            </h2>
            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          {/* Enhanced Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Enhanced Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="space-y-1">
                {/* Main Menu Item */}
                <div className="relative">
          <button
                    onClick={() => {
                      if (item.children) {
                        toggleMenu(item.id);
                      } else if (item.path) {
                        handleNavigation(item.path);
                      }
                    }}
            className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${item.children ? 'cursor-pointer' : 'cursor-pointer'}
                      ${location.pathname.includes(item.path || '') && !item.children ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100/50 dark:hover:bg-slate-700/50'}
            `}
          >
                      <div className="flex items-center space-x-3">
                      <div className="relative">
              <EnhancedIcon
                name={item.icon}
                          className={`h-5 w-5 transition-colors duration-200 ${location.pathname.includes(item.path || '') && !item.children ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}
                        />
                  {item.badge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                      <div className="text-left">
                        <span className={`text-sm font-medium transition-colors duration-200 ${location.pathname.includes(item.path || '') && !item.children ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                          {item.title}
                        </span>
                {item.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                    {item.description}
                  </p>
                )}
              </div>
          </div>
                    
                    {item.children && (
            <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${expandedMenus[item.id] ? 'rotate-90' : ''} ${location.pathname.includes(item.path || '') && !item.children ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
            />
          )}
        </button>
      </div>

                {/* Submenu Items */}
                {item.children && expandedMenus[item.id] && (
                  <div className="ml-6 space-y-1" style={{ animation: 'slideInLeft 0.3s ease-in-out forwards' }}>
                    {item.children
                      .filter(child => 
                        !searchQuery || 
                        child.title.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((child) => (
        <NavLink
                          key={child.id}
                          to={child.path || '#'}
          className={({ isActive }) => `
                            flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group
                            ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100/50 dark:hover:bg-slate-700/50'}
                          `}
                        >
            <EnhancedIcon
                            name={child.icon} 
                            className={`h-4 w-4 transition-colors duration-200 ${location.pathname.includes(child.path || '') ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}
                          />
                          <span className={`text-sm transition-colors duration-200 ${location.pathname.includes(child.path || '') ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                            {child.title}
                    </span>
                        </NavLink>
                      ))}
                </div>
                )}
              </div>
            ))}
          </nav>
      </div>

        {/* Enhanced Sidebar Footer */}
        <div className="p-4 border-t border-gray-200/50 dark:border-slate-700/50">
          <div className="space-y-3">
            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-200/50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors duration-200">
                  <Zap className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs font-medium">Quick Start</span>
                </button>
                <button className="p-2 bg-green-100/50 dark:bg-green-900/20 hover:bg-green-200/50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg transition-colors duration-200">
                  <Settings className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs font-medium">Settings</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                System Status
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">System</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 dark:text-green-400 font-medium">Online</span>
          </div>
        </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">MCP Agents</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">24 Active</span>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
