import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const { pathname } = useLocation();
  
  // Skip if we're not in the super-admin section
  if (!pathname.startsWith('/super-admin')) {
    return null;
  }
  
  // Parse the pathname into breadcrumb segments
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .slice(1); // Remove 'super-admin' from the beginning
  
  // Define friendly names for route segments
  const getFriendlyName = (segment: string): string => {
    const friendlyNames: Record<string, string> = {
      'super-admin': 'Super Admin',
      'dashboard': 'Dashboard',
      'users': 'User Management',
      'roles': 'User Roles',
      'groups': 'User Groups',
      'access': 'Access Control',
      'analytics': 'Analytics',
      'billing': 'Billing Management',
      'support': 'Support Tickets',
      'onboarding': 'User Onboarding',
      'system': 'System Administration',
      'database': 'Database Management',
      'api': 'API Management',
      'monitoring': 'System Monitoring',
      'deployment': 'Deployment Management',
      'config': 'Configuration',
      'backup': 'Backup & Recovery',
      'security': 'Security Center',
      'integrations': 'Integration Hub',
      'storage': 'File Storage',
      'email': 'Email Services',
      'audit': 'Security Audit',
      'logs': 'Access Logs',
      'protection': 'Data Protection',
      'permissions': 'User Permissions',
      'policies': 'Security Policies',
      'incidents': 'Incident Response',
      'compliance': 'Compliance Management',
      'performance': 'Performance Monitoring',
      'errors': 'Error Tracking',
      'alerts': 'Alert Management',
      'uptime': 'Uptime Monitoring',
      'resources': 'Resource Usage',
      'network': 'Network Monitoring',
      'health': 'Health Checks',
      'portals': 'Portal Management',
      'features': 'Feature Management',
      'business': 'Business Analytics',
      'financial': 'Financial Reports',
      'operational': 'Operational Reports',
      'custom': 'Custom Reports',
      'export': 'Data Export',
      'dashboards': 'Dashboard Builder',
      'scheduled': 'Scheduled Reports',
      'mcp': 'MCP Control Center',
      'agents': 'Agent Management',
      'models': 'AI Models',
      'pipeline': 'Data Pipeline',
      'learning': 'Machine Learning',
      'automation': 'Automation Rules',
      'documentation': 'AI Documentation',
      'customers': 'Customer Management',
      'sales': 'Sales Pipeline',
      'docs': 'Documentation',
      'marketing': 'Marketing Tools',
      'partners': 'Partner Management',
      'legal': 'Legal & Compliance',
      'dev': 'Development & DevOps',
      'repository': 'Code Repository',
      'testing': 'Testing Suite',
      'environments': 'Environment Management',
      'releases': 'Release Management',
      'settings': 'Settings',
      'profile': 'Profile Settings',
      'preferences': 'User Preferences',
    };
    
    return friendlyNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };
  
  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const path = `/super-admin/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    
    return {
      name: getFriendlyName(segment),
      path,
      isLast,
    };
  });
  
  if (breadcrumbItems.length === 0) {
    return null;
  }
  
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/super-admin"
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbItems.map((item) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.name}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
