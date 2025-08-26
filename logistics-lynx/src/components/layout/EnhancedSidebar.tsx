import React, { useState } from 'react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronDown, 
  Search,
  Plus,
  Settings,
  Bell,
  Zap,
  Shield,
  Activity,
  Server,
  Users,
  BarChart3,
  Briefcase,
  Code,
  Globe,
  Database,
  FileText,
  CreditCard,
  Headphones,
  GraduationCap,
  Key,
  Monitor,
  Wifi,
  ScrollText,
  Heart,
  AlertCircle,
  Bell as BellIcon,
  Rocket,
  HardDrive,
  Mail,
  Folder,
  Plug,
  Crown,
  Target,
  TrendingUp,
  PieChart,
  LineChart,
  Brain,
  Wrench,
  TestTube,
  Layers,
  Eye,
  ExternalLink,
  Archive,
  Calendar,
  MessageSquare,
  Phone,
  Star,
  Award,
  DollarSign,
  Clock,
  Route,
  Navigation,
  MapPin,
  Package,
  Truck,
  Building2,
  Ship,
  Train,
  Plane,
  Sun,
  Moon
} from 'lucide-react';
import { EnhancedIcon, IconSets } from '../ui/EnhancedIcon';

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
  onToggle,
  isDarkMode,
  onThemeToggle,
  user
}) => {
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug current location
  console.log('🔍 Current location:', location.pathname);

  // Enhanced navigation items with better icons and organization
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
        { id: 'security-audit', title: 'Security Audit', icon: 'Eye', path: 'security/audit' },
        { id: 'access-logs', title: 'Access Logs', icon: 'FileText', path: 'security/logs' },
        { id: 'data-protection', title: 'Data Protection', icon: 'Shield', path: 'security/protection' },
        { id: 'api-security', title: 'API Security', icon: 'Code', path: 'security/api' },
        { id: 'user-permissions', title: 'User Permissions', icon: 'Key', path: 'security/permissions' },
        { id: 'security-policies', title: 'Security Policies', icon: 'FileText', path: 'security/policies' },
        { id: 'incident-response', title: 'Incident Response', icon: 'AlertCircle', path: 'security/incidents' },
        { id: 'compliance-management', title: 'Compliance Management', icon: 'CheckCircle', path: 'security/compliance' }
      ],
      priority: 'high'
    },
    {
      id: 'monitoring',
      title: 'System Monitoring',
      icon: 'Activity',
      description: 'Real-time system monitoring',
      children: [
        { id: 'performance-monitoring', title: 'Performance Monitoring', icon: 'Zap', path: 'monitoring/performance' },
        { id: 'error-tracking', title: 'Error Tracking', icon: 'AlertCircle', path: 'monitoring/errors' },
        { id: 'log-analysis', title: 'Log Analysis', icon: 'ScrollText', path: 'monitoring/logs' },
        { id: 'alert-management', title: 'Alert Management', icon: 'Bell', path: 'monitoring/alerts' },
        { id: 'uptime-monitoring', title: 'Uptime Monitoring', icon: 'Activity', path: 'monitoring/uptime' },
        { id: 'resource-usage', title: 'Resource Usage', icon: 'Cpu', path: 'monitoring/resources' },
        { id: 'network-monitoring', title: 'Network Monitoring', icon: 'Wifi', path: 'monitoring/network' },
        { id: 'health-checks', title: 'Health Checks', icon: 'Heart', path: 'monitoring/health' }
      ],
      priority: 'medium'
    },
    {
      id: 'portals',
      title: 'Portal Management',
      icon: 'Globe',
      description: 'Multi-portal management system',
      children: [
        { id: 'portal-overview', title: 'Portal Overview', icon: 'Eye', path: 'portals' },
        { id: 'portal-configuration', title: 'Portal Configuration', icon: 'Settings', path: 'portals/config' },
        { id: 'portal-users', title: 'Portal Users', icon: 'Users', path: 'portals/users' },
        { id: 'feature-management', title: 'Feature Management', icon: 'Star', path: 'portals/features' },
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
      description: 'Advanced analytics and reporting',
      children: [
        { id: 'business-analytics', title: 'Business Analytics', icon: 'BarChart3', path: 'analytics/business' },
        { id: 'user-analytics', title: 'User Analytics', icon: 'Users', path: 'analytics/users' },
        { id: 'performance-reports', title: 'Performance Reports', icon: 'Zap', path: 'analytics/performance' },
        { id: 'security-reports', title: 'Security Reports', icon: 'Shield', path: 'analytics/security' },
        { id: 'financial-reports', title: 'Financial Reports', icon: 'DollarSign', path: 'analytics/financial' },
        { id: 'operational-reports', title: 'Operational Reports', icon: 'Settings', path: 'analytics/operational' },
        { id: 'custom-reports', title: 'Custom Reports', icon: 'FileText', path: 'analytics/custom' },
        { id: 'data-export', title: 'Data Export', icon: 'Download', path: 'analytics/export' },
        { id: 'dashboard-builder', title: 'Dashboard Builder', icon: 'Layers', path: 'analytics/dashboards' },
        { id: 'scheduled-reports', title: 'Scheduled Reports', icon: 'Calendar', path: 'analytics/scheduled' }
      ],
      priority: 'medium'
    },
    {
      id: 'mcp',
      title: 'MCP Control Center',
      icon: 'Brain',
      badge: 'AI',
      description: 'AI and autonomous system control',
      children: [
        { id: 'mcp-overview', title: 'MCP Overview', icon: 'Eye', path: 'mcp' },
        { id: 'agent-management', title: 'Agent Management', icon: 'Brain', path: 'mcp/agents' },
        { id: 'ai-models', title: 'AI Models', icon: 'Brain', path: 'mcp/models' },
        { id: 'data-pipeline', title: 'Data Pipeline', icon: 'Database', path: 'mcp/pipeline' },
        { id: 'machine-learning', title: 'Machine Learning', icon: 'Target', path: 'mcp/learning' },
        { id: 'ai-analytics', title: 'AI Analytics', icon: 'BarChart3', path: 'mcp/analytics' },
        { id: 'automation-rules', title: 'Automation Rules', icon: 'Zap', path: 'mcp/automation' },
        { id: 'ai-integrations', title: 'AI Integrations', icon: 'Plug', path: 'mcp/integrations' },
        { id: 'ai-monitoring', title: 'AI Monitoring', icon: 'Activity', path: 'mcp/monitoring' },
        { id: 'ai-compliance', title: 'AI Compliance', icon: 'CheckCircle', path: 'mcp/compliance' },
        { id: 'ai-documentation', title: 'AI Documentation', icon: 'FileText', path: 'mcp/documentation' },
        { id: 'ai-support', title: 'AI Support', icon: 'Headphones', path: 'mcp/support' }
      ],
      priority: 'medium'
    },
    {
      id: 'business',
      title: 'Business Operations',
      icon: 'Briefcase',
      description: 'Business operations management',
      children: [
        { id: 'customer-management', title: 'Customer Management', icon: 'Users', path: 'business/customers' },
        { id: 'sales-pipeline', title: 'Sales Pipeline', icon: 'TrendingUp', path: 'business/sales' },
        { id: 'billing-invoicing', title: 'Billing & Invoicing', icon: 'CreditCard', path: 'business/billing' },
        { id: 'support-management', title: 'Support Management', icon: 'Headphones', path: 'business/support' },
        { id: 'documentation', title: 'Documentation', icon: 'FileText', path: 'business/docs' },
        { id: 'marketing-tools', title: 'Marketing Tools', icon: 'Megaphone', path: 'business/marketing' },
        { id: 'partner-management', title: 'Partner Management', icon: 'Handshake', path: 'business/partners' },
        { id: 'legal-compliance', title: 'Legal & Compliance', icon: 'Scale', path: 'business/legal' }
      ],
      priority: 'low'
    },
    {
      id: 'devops',
      title: 'Development & DevOps',
      icon: 'Code',
      description: 'Development and DevOps tools',
      children: [
        { id: 'code-repository', title: 'Code Repository', icon: 'Folder', path: 'dev/repository' },
        { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', icon: 'Database', path: 'dev/pipeline' },
        { id: 'testing-suite', title: 'Testing Suite', icon: 'TestTube', path: 'dev/testing' },
        { id: 'environment-management', title: 'Environment Management', icon: 'Globe', path: 'dev/environments' },
        { id: 'performance-testing', title: 'Performance Testing', icon: 'Zap', path: 'dev/performance' },
        { id: 'security-testing', title: 'Security Testing', icon: 'Shield', path: 'dev/security' },
        { id: 'dev-documentation', title: 'Dev Documentation', icon: 'FileText', path: 'dev/documentation' },
        { id: 'release-management', title: 'Release Management', icon: 'Rocket', path: 'dev/releases' }
      ],
      priority: 'low'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'Settings',
      description: 'System and user preferences',
      children: [
        { id: 'settings-overview', title: 'Settings Overview', icon: 'Settings', path: 'settings' },
        { id: 'profile-settings', title: 'Profile Settings', icon: 'User', path: 'settings/profile' },
        { id: 'system-settings', title: 'System Settings', icon: 'Server', path: 'settings/system' },
        { id: 'user-preferences', title: 'User Preferences', icon: 'UserCheck', path: 'settings/preferences' },
        { id: 'security-settings', title: 'Security Settings', icon: 'Shield', path: 'settings/security' }
      ],
      priority: 'medium'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'User',
      description: 'Personal profile management',
      children: [
        { id: 'profile-overview', title: 'Profile Overview', icon: 'User', path: 'profile' },
        { id: 'personal-information', title: 'Personal Information', icon: 'UserCheck', path: 'profile/personal' },
        { id: 'avatar-media', title: 'Avatar & Media', icon: 'Image', path: 'profile/avatar' },
        { id: 'user-preferences', title: 'User Preferences', icon: 'Settings', path: 'profile/preferences' },
        { id: 'activity-history', title: 'Activity History', icon: 'Activity', path: 'profile/activity' },
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
      badge: 'New',
      description: 'Floating Action Button management',
      children: [
        { id: 'fab-overview', title: 'FAB Overview', icon: 'Plus', path: 'fab' },
        { id: 'fab-actions', title: 'FAB Actions', icon: 'Zap', path: 'fab/actions' },
        { id: 'fab-customization', title: 'FAB Customization', icon: 'Palette', path: 'fab/customization' },
        { id: 'fab-templates', title: 'FAB Templates', icon: 'Copy', path: 'fab/templates' },
        { id: 'fab-analytics', title: 'FAB Analytics', icon: 'BarChart3', path: 'fab/analytics' },
        { id: 'fab-integrations', title: 'FAB Integrations', icon: 'Plug', path: 'fab/integrations' }
      ],
      priority: 'medium'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: 'Smartphone',
      description: 'Mobile app management',
      children: [
        { id: 'mobile-overview', title: 'Mobile Overview', icon: 'Smartphone', path: 'mobile' },
        { id: 'mobile-settings', title: 'Mobile Settings', icon: 'Settings', path: 'mobile/settings' },
        { id: 'mobile-sync', title: 'Mobile Sync', icon: 'RefreshCw', path: 'mobile/sync' },
        { id: 'mobile-devices', title: 'Mobile Devices', icon: 'Devices', path: 'mobile/devices' }
      ],
            priority: 'low'
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      console.log('🔍 Navigating to:', item.path);
      // Use absolute navigation to ensure proper routing
      navigate(item.path);
      setActiveMenu(item.id);
    } else if (item.children) {
      toggleMenu(item.id);
    }
  };

  const handleSubMenuClick = (item: MenuItem) => {
    if (item.path) {
      console.log('🔍 Navigating to sub-menu:', item.path);
      // Use absolute navigation to ensure proper routing
      navigate(item.path);
      setActiveMenu(item.id);
    }
  };

  const filteredItems = navigationItems.filter(item =>
    searchQuery === '' || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedMenus[item.id] || false;
    const hasChildren = item.children && item.children.length > 0;

    // For items with children, use button (expandable)
    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => level === 0 ? handleMenuClick(item) : handleSubMenuClick(item)}
            className={`
              w-full flex items-center justify-between py-3 rounded-lg cursor-pointer transition-all duration-200 group
              ${isOpen ? 'px-4' : 'px-2 justify-center'}
              ${level > 0 && isOpen ? 'ml-4' : ''}
              ${isDarkMode
                ? 'text-slate-300 hover:bg-slate-700/50'
                : 'text-slate-700 hover:bg-slate-50'
              }
            `}
          >
                      <div className="flex items-center space-x-3">
              <EnhancedIcon
                name={item.icon}
                size={20}
                className={`
                  ${isDarkMode 
                    ? 'text-slate-400 group-hover:text-slate-300' 
                    : 'text-slate-500 group-hover:text-slate-700'
                  }
                `}
              />
            {isOpen && (
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-0.5 text-xs rounded-full font-medium
                      ${item.badge === 'Live' 
                        ? isDarkMode 
                          ? 'bg-emerald-900/30 text-emerald-400' 
                          : 'bg-emerald-100 text-emerald-800'
                        : item.badge === 'AI'
                        ? isDarkMode 
                          ? 'bg-purple-900/30 text-purple-400' 
                          : 'bg-purple-100 text-purple-800'
                        : isDarkMode 
                          ? 'bg-indigo-900/30 text-indigo-400' 
                          : 'bg-indigo-100 text-indigo-800'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </div>
          {hasChildren && isOpen && (
            <ChevronRight 
              className={`
                h-4 w-4 transition-transform duration-200
                ${isExpanded ? 'rotate-90' : ''}
                ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
              `}
            />
          )}
        </button>
        
        {hasChildren && isExpanded && isOpen && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
    }

    // For items without children, use NavLink (navigable)
    return (
      <div key={item.id}>
        <NavLink
          to={item.path}
          className={({ isActive }) => `
            w-full flex items-center justify-between py-3 rounded-lg cursor-pointer transition-all duration-200 group
            ${isOpen ? 'px-4' : 'px-2 justify-center'}
            ${level > 0 && isOpen ? 'ml-4' : ''}
            ${isActive 
              ? isDarkMode
                ? 'bg-indigo-900/30 text-indigo-300 border-l-4 border-indigo-500'
                : 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
              : isDarkMode
                ? 'text-slate-300 hover:bg-slate-700/50'
                : 'text-slate-700 hover:bg-slate-50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <EnhancedIcon
              name={item.icon}
              size={20}
              className={({ isActive }) => `
                ${isActive 
                  ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  : isDarkMode 
                    ? 'text-slate-400 group-hover:text-slate-300' 
                    : 'text-slate-500 group-hover:text-slate-700'
                }
              `}
            />
            {isOpen && (
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-0.5 text-xs rounded-full font-medium
                      ${item.badge === 'Live' 
                        ? isDarkMode 
                          ? 'bg-emerald-900/30 text-emerald-400' 
                          : 'bg-emerald-100 text-emerald-800'
                        : item.badge === 'AI'
                        ? isDarkMode 
                          ? 'bg-purple-900/30 text-purple-400' 
                          : 'bg-purple-100 text-purple-800'
                        : isDarkMode 
                          ? 'bg-indigo-900/30 text-indigo-400' 
                          : 'bg-indigo-100 text-indigo-800'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <div className={`
      sidebar-responsive h-full overflow-hidden flex-shrink-0
      ${isOpen ? 'w-80' : 'w-20'}
      ${isDarkMode 
        ? 'bg-slate-800 border-r border-slate-700' 
        : 'bg-white border-r border-slate-200'
      }
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 border-b transition-colors duration-200
          ${isDarkMode 
            ? 'border-slate-700' 
            : 'border-slate-200'
          }
        `}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            {isOpen && (
              <div>
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  Admin Panel
                </h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Super Admin
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className={`
              p-2 rounded-lg transition-colors duration-200 ${!isOpen ? 'mx-auto' : ''}
              ${isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600' 
                : 'bg-slate-100 hover:bg-slate-200'
              }
            `}
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <ChevronRight className={`
              h-4 w-4 transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}
              ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
            `} />
          </button>
        </div>

        {/* Search */}
        {isOpen && (
          <div className={`
            p-4 border-b transition-colors duration-200
            ${isDarkMode 
              ? 'border-slate-700' 
              : 'border-slate-200'
            }
          `}>
            <div className="relative">
              <Search className={`
                absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4
                ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
              `} />
              <input
                type="text"
                placeholder="Search menus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm
                  transition-colors duration-200
                  ${isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500'
                  }
                `}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className={`space-y-1 ${isOpen ? 'px-4' : 'px-2'}`}>
            {filteredItems.map(item => renderMenuItem(item))}
          </div>
        </div>

        {/* Footer */}
        <div className={`
          p-4 border-t transition-colors duration-200
          ${isDarkMode 
            ? 'border-slate-700' 
            : 'border-slate-200'
          }
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              {isOpen && (
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {user?.name || 'User'}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {user?.role || 'Admin'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className={`
                  p-2 rounded-lg transition-all duration-200 group
                  ${isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600' 
                    : 'bg-slate-100 hover:bg-slate-200'
                  }
                `}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className={`
                    h-4 w-4 transition-colors duration-200
                    ${isDarkMode 
                      ? 'text-slate-400 group-hover:text-yellow-400' 
                      : 'text-slate-600 group-hover:text-yellow-600'
                    }
                  `} />
                ) : (
                  <Moon className={`
                    h-4 w-4 transition-colors duration-200
                    ${isDarkMode 
                      ? 'text-slate-400 group-hover:text-blue-400' 
                      : 'text-slate-600 group-hover:text-blue-600'
                    }
                  `} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
