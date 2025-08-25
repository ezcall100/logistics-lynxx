import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Plane
} from 'lucide-react';
import { EnhancedIcon, IconSets } from '../ui/EnhancedIcon';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
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
  user
}) => {
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Enhanced navigation items with better icons and organization
  const navigationItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/super-admin/dashboard',
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
        { id: 'all-users', title: 'All Users', icon: 'Users', path: '/super-admin/users' },
        { id: 'user-roles', title: 'User Roles', icon: 'Key', path: '/super-admin/users/roles' },
        { id: 'user-groups', title: 'User Groups', icon: 'Users', path: '/super-admin/users/groups' },
        { id: 'access-control', title: 'Access Control', icon: 'Shield', path: '/super-admin/users/access' },
        { id: 'user-analytics', title: 'User Analytics', icon: 'BarChart3', path: '/super-admin/users/analytics' },
        { id: 'billing-management', title: 'Billing Management', icon: 'CreditCard', path: '/super-admin/users/billing' },
        { id: 'support-tickets', title: 'Support Tickets', icon: 'Headphones', path: '/super-admin/users/support' },
        { id: 'user-onboarding', title: 'User Onboarding', icon: 'GraduationCap', path: '/super-admin/users/onboarding' }
      ],
      priority: 'high'
    },
    {
      id: 'system',
      title: 'System Administration',
      icon: 'Server',
      description: 'Core system administration tools',
      children: [
        { id: 'database-management', title: 'Database Management', icon: 'Database', path: '/super-admin/system/database' },
        { id: 'api-management', title: 'API Management', icon: 'Code', path: '/super-admin/system/api' },
        { id: 'server-monitoring', title: 'Server Monitoring', icon: 'Monitor', path: '/super-admin/system/monitoring' },
        { id: 'deployment-management', title: 'Deployment Management', icon: 'Rocket', path: '/super-admin/system/deployment' },
        { id: 'configuration', title: 'Configuration', icon: 'Settings', path: '/super-admin/system/config' },
        { id: 'backup-recovery', title: 'Backup & Recovery', icon: 'HardDrive', path: '/super-admin/system/backup' },
        { id: 'security-settings', title: 'Security Settings', icon: 'Shield', path: '/super-admin/system/security' },
        { id: 'integration-hub', title: 'Integration Hub', icon: 'Plug', path: '/super-admin/system/integrations' },
        { id: 'file-storage', title: 'File Storage', icon: 'Folder', path: '/super-admin/system/storage' },
        { id: 'email-services', title: 'Email Services', icon: 'Mail', path: '/super-admin/system/email' }
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
        { id: 'security-audit', title: 'Security Audit', icon: 'Eye', path: '/super-admin/security/audit' },
        { id: 'access-logs', title: 'Access Logs', icon: 'FileText', path: '/super-admin/security/logs' },
        { id: 'data-protection', title: 'Data Protection', icon: 'Shield', path: '/super-admin/security/protection' },
        { id: 'api-security', title: 'API Security', icon: 'Code', path: '/super-admin/security/api' },
        { id: 'user-permissions', title: 'User Permissions', icon: 'Key', path: '/super-admin/security/permissions' },
        { id: 'security-policies', title: 'Security Policies', icon: 'FileText', path: '/super-admin/security/policies' },
        { id: 'incident-response', title: 'Incident Response', icon: 'AlertCircle', path: '/super-admin/security/incidents' },
        { id: 'compliance-management', title: 'Compliance Management', icon: 'CheckCircle', path: '/super-admin/security/compliance' }
      ],
      priority: 'high'
    },
    {
      id: 'monitoring',
      title: 'System Monitoring',
      icon: 'Activity',
      description: 'Real-time system monitoring',
      children: [
        { id: 'performance-monitoring', title: 'Performance Monitoring', icon: 'Zap', path: '/super-admin/monitoring/performance' },
        { id: 'error-tracking', title: 'Error Tracking', icon: 'AlertCircle', path: '/super-admin/monitoring/errors' },
        { id: 'log-analysis', title: 'Log Analysis', icon: 'ScrollText', path: '/super-admin/monitoring/logs' },
        { id: 'alert-management', title: 'Alert Management', icon: 'Bell', path: '/super-admin/monitoring/alerts' },
        { id: 'uptime-monitoring', title: 'Uptime Monitoring', icon: 'Activity', path: '/super-admin/monitoring/uptime' },
        { id: 'resource-usage', title: 'Resource Usage', icon: 'Cpu', path: '/super-admin/monitoring/resources' },
        { id: 'network-monitoring', title: 'Network Monitoring', icon: 'Wifi', path: '/super-admin/monitoring/network' },
        { id: 'health-checks', title: 'Health Checks', icon: 'Heart', path: '/super-admin/monitoring/health' }
      ],
      priority: 'medium'
    },
    {
      id: 'portals',
      title: 'Portal Management',
      icon: 'Globe',
      description: 'Multi-portal management system',
      children: [
        { id: 'portal-overview', title: 'Portal Overview', icon: 'Eye', path: '/super-admin/portals' },
        { id: 'portal-configuration', title: 'Portal Configuration', icon: 'Settings', path: '/super-admin/portals/config' },
        { id: 'portal-users', title: 'Portal Users', icon: 'Users', path: '/super-admin/portals/users' },
        { id: 'feature-management', title: 'Feature Management', icon: 'Star', path: '/super-admin/portals/features' },
        { id: 'portal-analytics', title: 'Portal Analytics', icon: 'BarChart3', path: '/super-admin/portals/analytics' },
        { id: 'portal-billing', title: 'Portal Billing', icon: 'CreditCard', path: '/super-admin/portals/billing' },
        { id: 'portal-support', title: 'Portal Support', icon: 'Headphones', path: '/super-admin/portals/support' },
        { id: 'portal-integrations', title: 'Portal Integrations', icon: 'Plug', path: '/super-admin/portals/integrations' },
        { id: 'portal-backup', title: 'Portal Backup', icon: 'HardDrive', path: '/super-admin/portals/backup' },
        { id: 'portal-security', title: 'Portal Security', icon: 'Shield', path: '/super-admin/portals/security' },
        { id: 'portal-compliance', title: 'Portal Compliance', icon: 'CheckCircle', path: '/super-admin/portals/compliance' },
        { id: 'portal-deployment', title: 'Portal Deployment', icon: 'Rocket', path: '/super-admin/portals/deployment' }
      ],
      priority: 'medium'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: 'BarChart3',
      description: 'Advanced analytics and reporting',
      children: [
        { id: 'business-analytics', title: 'Business Analytics', icon: 'BarChart3', path: '/super-admin/analytics/business' },
        { id: 'user-analytics', title: 'User Analytics', icon: 'Users', path: '/super-admin/analytics/users' },
        { id: 'performance-reports', title: 'Performance Reports', icon: 'Zap', path: '/super-admin/analytics/performance' },
        { id: 'security-reports', title: 'Security Reports', icon: 'Shield', path: '/super-admin/analytics/security' },
        { id: 'financial-reports', title: 'Financial Reports', icon: 'DollarSign', path: '/super-admin/analytics/financial' },
        { id: 'operational-reports', title: 'Operational Reports', icon: 'Settings', path: '/super-admin/analytics/operational' },
        { id: 'custom-reports', title: 'Custom Reports', icon: 'FileText', path: '/super-admin/analytics/custom' },
        { id: 'data-export', title: 'Data Export', icon: 'Download', path: '/super-admin/analytics/export' },
        { id: 'dashboard-builder', title: 'Dashboard Builder', icon: 'Layers', path: '/super-admin/analytics/dashboards' },
        { id: 'scheduled-reports', title: 'Scheduled Reports', icon: 'Calendar', path: '/super-admin/analytics/scheduled' }
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
        { id: 'mcp-overview', title: 'MCP Overview', icon: 'Eye', path: '/super-admin/mcp' },
        { id: 'agent-management', title: 'Agent Management', icon: 'Brain', path: '/super-admin/mcp/agents' },
        { id: 'ai-models', title: 'AI Models', icon: 'Brain', path: '/super-admin/mcp/models' },
        { id: 'data-pipeline', title: 'Data Pipeline', icon: 'Database', path: '/super-admin/mcp/pipeline' },
        { id: 'machine-learning', title: 'Machine Learning', icon: 'Target', path: '/super-admin/mcp/learning' },
        { id: 'ai-analytics', title: 'AI Analytics', icon: 'BarChart3', path: '/super-admin/mcp/analytics' },
        { id: 'automation-rules', title: 'Automation Rules', icon: 'Zap', path: '/super-admin/mcp/automation' },
        { id: 'ai-integrations', title: 'AI Integrations', icon: 'Plug', path: '/super-admin/mcp/integrations' },
        { id: 'ai-monitoring', title: 'AI Monitoring', icon: 'Activity', path: '/super-admin/mcp/monitoring' },
        { id: 'ai-compliance', title: 'AI Compliance', icon: 'CheckCircle', path: '/super-admin/mcp/compliance' },
        { id: 'ai-documentation', title: 'AI Documentation', icon: 'FileText', path: '/super-admin/mcp/documentation' },
        { id: 'ai-support', title: 'AI Support', icon: 'Headphones', path: '/super-admin/mcp/support' }
      ],
      priority: 'medium'
    },
    {
      id: 'business',
      title: 'Business Operations',
      icon: 'Briefcase',
      description: 'Business operations management',
      children: [
        { id: 'customer-management', title: 'Customer Management', icon: 'Users', path: '/super-admin/business/customers' },
        { id: 'sales-pipeline', title: 'Sales Pipeline', icon: 'TrendingUp', path: '/super-admin/business/sales' },
        { id: 'billing-invoicing', title: 'Billing & Invoicing', icon: 'CreditCard', path: '/super-admin/business/billing' },
        { id: 'support-management', title: 'Support Management', icon: 'Headphones', path: '/super-admin/business/support' },
        { id: 'documentation', title: 'Documentation', icon: 'FileText', path: '/super-admin/business/docs' },
        { id: 'marketing-tools', title: 'Marketing Tools', icon: 'Megaphone', path: '/super-admin/business/marketing' },
        { id: 'partner-management', title: 'Partner Management', icon: 'Handshake', path: '/super-admin/business/partners' },
        { id: 'legal-compliance', title: 'Legal & Compliance', icon: 'Scale', path: '/super-admin/business/legal' }
      ],
      priority: 'low'
    },
    {
      id: 'devops',
      title: 'Development & DevOps',
      icon: 'Code',
      description: 'Development and DevOps tools',
      children: [
        { id: 'code-repository', title: 'Code Repository', icon: 'Folder', path: '/super-admin/dev/repository' },
        { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', icon: 'Database', path: '/super-admin/dev/pipeline' },
        { id: 'testing-suite', title: 'Testing Suite', icon: 'TestTube', path: '/super-admin/dev/testing' },
        { id: 'environment-management', title: 'Environment Management', icon: 'Globe', path: '/super-admin/dev/environments' },
        { id: 'performance-testing', title: 'Performance Testing', icon: 'Zap', path: '/super-admin/dev/performance' },
        { id: 'security-testing', title: 'Security Testing', icon: 'Shield', path: '/super-admin/dev/security' },
        { id: 'dev-documentation', title: 'Dev Documentation', icon: 'FileText', path: '/super-admin/dev/documentation' },
        { id: 'release-management', title: 'Release Management', icon: 'Rocket', path: '/super-admin/dev/releases' }
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
      navigate(item.path);
      setActiveMenu(item.id);
    } else if (item.children) {
      toggleMenu(item.id);
    }
  };

  const filteredItems = navigationItems.filter(item =>
    searchQuery === '' || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedMenus[item.id];
    const isActive = activeMenu === item.id || location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <div
          onClick={() => handleMenuClick(item)}
          className={`
            flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group
            ${level > 0 ? 'ml-4' : ''}
            ${isActive 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <EnhancedIcon
              name={item.icon}
              size={20}
              className={`
                ${isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                }
              `}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{item.title}</span>
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs rounded-full font-medium
                    ${item.badge === 'Live' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : item.badge === 'AI'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          {hasChildren && (
            <ChevronRight 
              className={`
                h-4 w-4 transition-transform duration-200
                ${isExpanded ? 'rotate-90' : ''}
                ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}
              `}
            />
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
      transition-all duration-300 ease-in-out z-40 overflow-hidden
      ${isOpen ? 'w-80' : 'w-0'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-4">
            {filteredItems.map(item => renderMenuItem(item))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role || 'Admin'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
