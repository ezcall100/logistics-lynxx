import { 
  Activity, 
  Briefcase, 
  Users, 
  Banknote, 
  FileText, 
  Zap, 
  Settings, 
  LifeBuoy,
  Truck,
  MapPin,
  Calendar,
  BarChart3,
  CreditCard,
  Receipt,
  FolderOpen,
  Upload,
  FileCheck,
  Workflow,
  Bot,
  Shield,
  Key,
  Bell,
  HelpCircle,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import type { EnhancedSidebarItem, SidebarSection } from './EnhancedSidebar';

// TMS Enterprise Sidebar Configuration
export const tmsSidebarConfig: SidebarSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    items: [
      {
        id: 'overview',
        title: 'Overview',
        path: '/dashboard',
        icon: Activity,
        aiInsights: {
          isRecommended: true,
          recommendation: 'Most visited page - shows key metrics',
          frequency: 15
        }
      },
      {
        id: 'analytics',
        title: 'Analytics',
        path: '/dashboard/analytics',
        icon: BarChart3,
        badge: {
          count: 3,
          variant: 'secondary'
        },
        aiInsights: {
          isRecommended: true,
          recommendation: 'New insights available',
          frequency: 8
        }
      },
      {
        id: 'reports',
        title: 'Reports',
        path: '/dashboard/reports',
        icon: FileText,
        subItems: [
          {
            id: 'financial-reports',
            title: 'Financial Reports',
            path: '/dashboard/reports/financial',
            icon: Banknote
          },
          {
            id: 'operational-reports',
            title: 'Operational Reports',
            path: '/dashboard/reports/operational',
            icon: Briefcase
          },
          {
            id: 'compliance-reports',
            title: 'Compliance Reports',
            path: '/dashboard/reports/compliance',
            icon: Shield
          }
        ]
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations',
    items: [
      {
        id: 'shipments',
        title: 'Shipments',
        path: '/operations/shipments',
        icon: Truck,
        badge: {
          count: 12,
          variant: 'destructive'
        },
        aiInsights: {
          isRecommended: true,
          recommendation: '3 shipments need attention',
          frequency: 25
        }
      },
      {
        id: 'dispatch',
        title: 'Dispatch',
        path: '/operations/dispatch',
        icon: MapPin,
        badge: {
          count: 5,
          variant: 'secondary'
        }
      },
      {
        id: 'deliveries',
        title: 'Deliveries',
        path: '/operations/deliveries',
        icon: CheckCircle,
        aiInsights: {
          frequency: 18
        }
      },
      {
        id: 'scheduling',
        title: 'Scheduling',
        path: '/operations/scheduling',
        icon: Calendar,
        subItems: [
          {
            id: 'driver-schedule',
            title: 'Driver Schedule',
            path: '/operations/scheduling/drivers',
            icon: Users
          },
          {
            id: 'vehicle-schedule',
            title: 'Vehicle Schedule',
            path: '/operations/scheduling/vehicles',
            icon: Truck
          },
          {
            id: 'route-optimization',
            title: 'Route Optimization',
            path: '/operations/scheduling/routes',
            icon: MapPin
          }
        ]
      }
    ]
  },
  {
    id: 'crm',
    title: 'CRM',
    items: [
      {
        id: 'contacts',
        title: 'Contacts',
        path: '/crm/contacts',
        icon: Users,
        badge: {
          count: 2,
          variant: 'secondary'
        }
      },
      {
        id: 'leads',
        title: 'Leads',
        path: '/crm/leads',
        icon: TrendingUp,
        aiInsights: {
          isRecommended: true,
          recommendation: '5 new leads to follow up',
          frequency: 12
        }
      },
      {
        id: 'opportunities',
        title: 'Opportunities',
        path: '/crm/opportunities',
        icon: Briefcase
      },
      {
        id: 'customers',
        title: 'Customers',
        path: '/crm/customers',
        icon: Users,
        subItems: [
          {
            id: 'customer-profiles',
            title: 'Customer Profiles',
            path: '/crm/customers/profiles',
            icon: Users
          },
          {
            id: 'customer-history',
            title: 'Customer History',
            path: '/crm/customers/history',
            icon: Clock
          }
        ]
      }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    items: [
      {
        id: 'invoices',
        title: 'Invoices',
        path: '/finance/invoices',
        icon: Receipt,
        badge: {
          count: 8,
          variant: 'destructive'
        },
        aiInsights: {
          isRecommended: true,
          recommendation: '3 overdue invoices',
          frequency: 20
        }
      },
      {
        id: 'payments',
        title: 'Payments',
        path: '/finance/payments',
        icon: CreditCard
      },
      {
        id: 'expenses',
        title: 'Expenses',
        path: '/finance/expenses',
        icon: Banknote
      },
      {
        id: 'reports',
        title: 'Financial Reports',
        path: '/finance/reports',
        icon: BarChart3,
        subItems: [
          {
            id: 'profit-loss',
            title: 'Profit & Loss',
            path: '/finance/reports/profit-loss',
            icon: BarChart3
          },
          {
            id: 'cash-flow',
            title: 'Cash Flow',
            path: '/finance/reports/cash-flow',
            icon: TrendingUp
          },
          {
            id: 'tax-reports',
            title: 'Tax Reports',
            path: '/finance/reports/tax',
            icon: FileText
          }
        ]
      }
    ]
  },
  {
    id: 'documents',
    title: 'Documents',
    items: [
      {
        id: 'uploads',
        title: 'Uploads',
        path: '/documents/uploads',
        icon: Upload,
        badge: {
          count: 15,
          variant: 'secondary'
        }
      },
      {
        id: 'scans',
        title: 'Scans',
        path: '/documents/scans',
        icon: FileCheck
      },
      {
        id: 'templates',
        title: 'Templates',
        path: '/documents/templates',
        icon: FolderOpen
      },
      {
        id: 'signed-docs',
        title: 'Signed Documents',
        path: '/documents/signed',
        icon: FileCheck,
        aiInsights: {
          frequency: 10
        }
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    items: [
      {
        id: 'triggers',
        title: 'Triggers',
        path: '/automation/triggers',
        icon: Zap,
        aiInsights: {
          isRecommended: true,
          recommendation: 'New automation opportunities detected',
          frequency: 6
        }
      },
      {
        id: 'rules',
        title: 'Rules',
        path: '/automation/rules',
        icon: Workflow
      },
      {
        id: 'workflows',
        title: 'Workflows',
        path: '/automation/workflows',
        icon: Bot
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    items: [
      {
        id: 'preferences',
        title: 'Preferences',
        path: '/settings/preferences',
        icon: Settings
      },
      {
        id: 'api-keys',
        title: 'API Keys',
        path: '/settings/api-keys',
        icon: Key
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        path: '/settings/roles',
        icon: Shield,
        subItems: [
          {
            id: 'user-roles',
            title: 'User Roles',
            path: '/settings/roles/users',
            icon: Users
          },
          {
            id: 'permission-groups',
            title: 'Permission Groups',
            path: '/settings/roles/groups',
            icon: Shield
          }
        ]
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'help-center',
        title: 'Help Center',
        path: '/support/help',
        icon: HelpCircle
      },
      {
        id: 'chat',
        title: 'Live Chat',
        path: '/support/chat',
        icon: MessageSquare,
        badge: {
          count: 1,
          variant: 'destructive'
        }
      },
      {
        id: 'feedback',
        title: 'Feedback',
        path: '/support/feedback',
        icon: Bell
      },
      {
        id: 'audit-logs',
        title: 'Audit Logs',
        path: '/support/audit-logs',
        icon: BookOpen,
        aiInsights: {
          frequency: 3
        }
      }
    ]
  }
];

// Super Admin specific configuration
export const superAdminSidebarConfig: SidebarSection[] = [
  {
    id: 'super-admin',
    title: 'Super Admin',
    items: [
      {
        id: 'portal-management',
        title: 'Portal Management',
        path: '/super-admin/portals',
        icon: Briefcase,
        badge: {
          count: 5,
          variant: 'secondary'
        }
      },
      {
        id: 'user-management',
        title: 'User Management',
        path: '/super-admin/users',
        icon: Users,
        aiInsights: {
          isRecommended: true,
          recommendation: '3 pending user approvals',
          frequency: 12
        }
      },
      {
        id: 'system-health',
        title: 'System Health',
        path: '/super-admin/health',
        icon: Activity,
        badge: {
          count: 2,
          variant: 'destructive'
        }
      },
      {
        id: 'compliance',
        title: 'Compliance',
        path: '/super-admin/compliance',
        icon: Shield,
        subItems: [
          {
            id: 'audit-trails',
            title: 'Audit Trails',
            path: '/super-admin/compliance/audit',
            icon: FileCheck
          },
          {
            id: 'certifications',
            title: 'Certifications',
            path: '/super-admin/compliance/certifications',
            icon: CheckCircle
          }
        ]
      }
    ]
  },
  ...tmsSidebarConfig
];

// Helper function to get sidebar config based on user role
export const getSidebarConfig = (userRole?: string): SidebarSection[] => {
  if (userRole === 'super_admin') {
    return superAdminSidebarConfig;
  }
  return tmsSidebarConfig;
};

// Helper function to get default favorites based on user role
export const getDefaultFavorites = (userRole?: string): string[] => {
  const baseFavorites = ['overview', 'shipments', 'invoices'];
  
  if (userRole === 'super_admin') {
    return ['portal-management', 'user-management', 'system-health', ...baseFavorites];
  }
  
  return baseFavorites;
};

// Helper function to get recent items based on user role
export const getDefaultRecentItems = (userRole?: string): string[] => {
  const baseRecent = ['overview', 'shipments'];
  
  if (userRole === 'super_admin') {
    return ['portal-management', 'user-management', ...baseRecent];
  }
  
  return baseRecent;
};
