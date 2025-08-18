import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, LifeBuoy, Network, BriefcaseBusiness,
  FileStack, Wallet, PlugZap, Store, BarChart4, Search, Plus,
  Bell, Settings, User, ChevronDown, Globe, Zap, Shield,
  Activity, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Menu, X, ChevronRight, Home, Mail, Target, Calendar,
  FolderOpen, Briefcase, MessageSquare, Phone, Video,
  FileText, HelpCircle, Database, CreditCard, ShoppingCart,
  PieChart, Cog, LogOut, UserCheck, ShieldCheck, Globe2
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string;
  children?: SidebarItem[];
  isActive?: boolean;
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userRole?: string;
  userEntitlements?: string[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggle,
  userRole = 'admin',
  userEntitlements = []
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['overview']));
  const [activeItem, setActiveItem] = useState('overview');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Add navigation logic here
    console.log(`Navigating to: ${itemId}`);
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard size={20} />,
      href: '/admin/overview',
      isActive: activeItem === 'overview'
    },
    {
      id: 'relationships',
      label: 'Relationships',
      icon: <Users size={20} />,
      children: [
        {
          id: 'email',
          label: 'Email',
          icon: <Mail size={16} />,
          href: '/admin/relationships/email',
          badge: '12'
        },
        {
          id: 'leads',
          label: 'Leads',
          icon: <Target size={16} />,
          href: '/admin/relationships/leads',
          badge: '5'
        },
        {
          id: 'contacts',
          label: 'Contacts',
          icon: <User size={16} />,
          href: '/admin/relationships/contacts',
          badge: '24'
        },
        {
          id: 'projects',
          label: 'Projects',
          icon: <FolderOpen size={16} />,
          href: '/admin/relationships/projects'
        },
        {
          id: 'calendar',
          label: 'Calendar',
          icon: <Calendar size={16} />,
          href: '/admin/relationships/calendar'
        },
        {
          id: 'opportunities',
          label: 'Opportunities',
          icon: <Briefcase size={16} />,
          href: '/admin/relationships/opportunities',
          badge: '8'
        }
      ]
    },
    {
      id: 'service-desk',
      label: 'Service Desk',
      icon: <LifeBuoy size={20} />,
      children: [
        {
          id: 'tickets',
          label: 'Tickets',
          icon: <MessageSquare size={16} />,
          href: '/admin/service-desk/tickets',
          badge: '15'
        },
        {
          id: 'calls',
          label: 'Calls',
          icon: <Phone size={16} />,
          href: '/admin/service-desk/calls'
        },
        {
          id: 'video-support',
          label: 'Video Support',
          icon: <Video size={16} />,
          href: '/admin/service-desk/video'
        },
        {
          id: 'knowledge-base',
          label: 'Knowledge Base',
          icon: <FileText size={16} />,
          href: '/admin/service-desk/knowledge'
        },
        {
          id: 'help-desk',
          label: 'Help Desk',
          icon: <HelpCircle size={16} />,
          href: '/admin/service-desk/help'
        }
      ]
    },
    {
      id: 'networks',
      label: 'Networks',
      icon: <Network size={20} />,
      children: [
        {
          id: 'customers',
          label: 'Customers',
          icon: <Users size={16} />,
          href: '/admin/networks/customers',
          badge: '156'
        },
        {
          id: 'partners',
          label: 'Partners',
          icon: <UserCheck size={16} />,
          href: '/admin/networks/partners',
          badge: '23'
        },
        {
          id: 'vendors',
          label: 'Vendors',
          icon: <BriefcaseBusiness size={16} />,
          href: '/admin/networks/vendors',
          badge: '12'
        },
        {
          id: 'suppliers',
          label: 'Suppliers',
          icon: <Store size={16} />,
          href: '/admin/networks/suppliers',
          badge: '8'
        }
      ]
    },
    {
      id: 'workforce',
      label: 'Workforce',
      icon: <BriefcaseBusiness size={20} />,
      children: [
        {
          id: 'employees',
          label: 'Employees',
          icon: <Users size={16} />,
          href: '/admin/workforce/employees',
          badge: '45'
        },
        {
          id: 'contractors',
          label: 'Contractors',
          icon: <UserCheck size={16} />,
          href: '/admin/workforce/contractors',
          badge: '12'
        },
        {
          id: 'departments',
          label: 'Departments',
          icon: <FolderOpen size={16} />,
          href: '/admin/workforce/departments'
        },
        {
          id: 'roles',
          label: 'Roles & Permissions',
          icon: <ShieldCheck size={16} />,
          href: '/admin/workforce/roles'
        }
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileStack size={20} />,
      children: [
        {
          id: 'files',
          label: 'Files',
          icon: <FileText size={16} />,
          href: '/admin/documents/files',
          badge: '234'
        },
        {
          id: 'templates',
          label: 'Templates',
          icon: <FileStack size={16} />,
          href: '/admin/documents/templates'
        },
        {
          id: 'contracts',
          label: 'Contracts',
          icon: <Briefcase size={16} />,
          href: '/admin/documents/contracts',
          badge: '18'
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: <BarChart4 size={16} />,
          href: '/admin/documents/reports'
        }
      ]
    },
    {
      id: 'financials',
      label: 'Financials',
      icon: <Wallet size={20} />,
      children: [
        {
          id: 'invoices',
          label: 'Invoices',
          icon: <FileText size={16} />,
          href: '/admin/financials/invoices',
          badge: '67'
        },
        {
          id: 'payments',
          label: 'Payments',
          icon: <CreditCard size={16} />,
          href: '/admin/financials/payments',
          badge: '34'
        },
        {
          id: 'expenses',
          label: 'Expenses',
          icon: <Wallet size={16} />,
          href: '/admin/financials/expenses'
        },
        {
          id: 'budgets',
          label: 'Budgets',
          icon: <PieChart size={16} />,
          href: '/admin/financials/budgets'
        }
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <PlugZap size={20} />,
      children: [
        {
          id: 'api',
          label: 'API Management',
          icon: <Globe2 size={16} />,
          href: '/admin/integrations/api'
        },
        {
          id: 'webhooks',
          label: 'Webhooks',
          icon: <Zap size={16} />,
          href: '/admin/integrations/webhooks'
        },
        {
          id: 'third-party',
          label: 'Third Party',
          icon: <Globe size={16} />,
          href: '/admin/integrations/third-party'
        },
        {
          id: 'data-sync',
          label: 'Data Sync',
          icon: <Database size={16} />,
          href: '/admin/integrations/data-sync'
        }
      ]
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: <Store size={20} />,
      children: [
        {
          id: 'products',
          label: 'Products',
          icon: <ShoppingCart size={16} />,
          href: '/admin/marketplace/products',
          badge: '89'
        },
        {
          id: 'orders',
          label: 'Orders',
          icon: <Briefcase size={16} />,
          href: '/admin/marketplace/orders',
          badge: '23'
        },
        {
          id: 'catalog',
          label: 'Catalog',
          icon: <Store size={16} />,
          href: '/admin/marketplace/catalog'
        }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart4 size={20} />,
      children: [
        {
          id: 'analytics',
          label: 'Analytics',
          icon: <TrendingUp size={16} />,
          href: '/admin/reports/analytics'
        },
        {
          id: 'performance',
          label: 'Performance',
          icon: <Activity size={16} />,
          href: '/admin/reports/performance'
        },
        {
          id: 'insights',
          label: 'Insights',
          icon: <PieChart size={16} />,
          href: '/admin/reports/insights'
        }
      ]
    },
    {
      id: 'autonomous-agents',
      label: 'Autonomous Agents',
      icon: <Zap size={20} />,
      badge: '250+',
      children: [
        {
          id: 'agent-status',
          label: 'Agent Status',
          icon: <Activity size={16} />,
          href: '/admin/agents/status'
        },
        {
          id: 'agent-config',
          label: 'Configuration',
          icon: <Settings size={16} />,
          href: '/admin/agents/config'
        },
        {
          id: 'agent-logs',
          label: 'Logs',
          icon: <FileText size={16} />,
          href: '/admin/agents/logs'
        }
      ]
    }
  ];

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.has(item.id);
    const isActive = activeItem === item.id;
    const paddingLeft = level * 16;

    return (
      <div key={item.id} className="space-y-1">
        <motion.div
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
            isActive
              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleGroup(item.id);
            } else {
              handleItemClick(item.id);
            }
          }}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium truncate">{item.label}</span>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} className="text-slate-400" />
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {hasChildren && !isCollapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1">
                  {item.children!.map((child) => renderSidebarItem(child, level + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 288 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Software Admin</h1>
              <p className="text-xs text-slate-500 capitalize">{userRole}</p>
            </div>
          </motion.div>
        )}
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => renderSidebarItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
                <p className="text-xs text-slate-500">admin@company.com</p>
              </div>
            </div>
            
            <div className="flex gap-1">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <button className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Settings">
              <Settings size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
