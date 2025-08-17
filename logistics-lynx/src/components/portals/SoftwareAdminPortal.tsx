/**
 * Modern Software Admin Portal
 * Comprehensive system administration with autonomous agent monitoring
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '../ui/dashboard-layout';
import { EnhancedCard } from '../ui/enhanced-card';
import { 
  LayoutDashboard, Users, LifeBuoy, Network, BriefcaseBusiness, 
  FileStack, Wallet, PlugZap, Store, BarChart4, Search, Plus,
  Bell, Settings, User, ChevronDown, Globe, Zap, Shield, 
  Activity, TrendingUp, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';

// Types for the admin system
export type Entitlement = 
  | "crm.core" | "tickets.core" | "networks.core" | "workforce.core"
  | "docs.core" | "financials.core" | "payroll.core"
  | "api.core" | "marketplace.core" | "reports.core"
  | "edi.x12" | "autonomous.full" | "admin.super";

export type Role =
  | "owner" | "admin" | "manager" | "ops" | "finance" | "sre" | "sales" | "autonomous";

export interface NavItem {
  key: string;
  title: string;
  icon?: React.ComponentType<any>;
  path?: string;
  children?: NavItem[];
  roles?: Role[];
  feature?: Entitlement;
  badgeKey?: string;
  order?: number;
  autonomous?: boolean; // Special flag for autonomous agent access
}

// Navigation Registry
export const ADMIN_NAV: NavItem[] = [
  { 
    key: "overview", 
    title: "Overview", 
    icon: LayoutDashboard, 
    path: "/admin/software-admin", 
    order: 10 
  },
  {
    key: "relationships", 
    title: "Relationships", 
    icon: Users, 
    order: 20, 
    feature: "crm.core",
    children: [
      { key: "rel-overview", title: "Overview", path: "/admin/relationships" },
      { key: "email", title: "Email", path: "/admin/relationships/email" },
      { key: "leads", title: "Leads", path: "/admin/relationships/leads" },
      { key: "contacts", title: "Contacts", path: "/admin/relationships/contacts" },
      { key: "projects", title: "Projects", path: "/admin/relationships/projects" },
      { key: "calendar", title: "Calendar", path: "/admin/relationships/calendar" },
      { key: "opportunities", title: "Opportunities", path: "/admin/relationships/opportunities" },
    ],
  },
  {
    key: "desk", 
    title: "Service Desk", 
    icon: LifeBuoy, 
    order: 30, 
    feature: "tickets.core",
    children: [
      { key: "all", title: "All Tickets", path: "/admin/tickets", badgeKey: "tickets:all" },
      { key: "assigned", title: "Assigned", path: "/admin/tickets/assigned", badgeKey: "tickets:assigned" },
      { key: "unassigned", title: "Unassigned", path: "/admin/tickets/unassigned", badgeKey: "tickets:unassigned" },
      { key: "incidents", title: "Incidents", path: "/admin/tickets/incidents" },
      { key: "service-requests", title: "Service Requests", path: "/admin/tickets/requests" },
      { key: "changes", title: "Changes", path: "/admin/tickets/changes" },
      { key: "problems", title: "Problems", path: "/admin/tickets/problems" },
    ],
  },
  {
    key: "networks", 
    title: "Networks", 
    icon: Network, 
    order: 40, 
    feature: "networks.core",
    children: [
      { key: "customers", title: "Customers", path: "/admin/networks/customers" },
      { key: "vendors", title: "Vendors", path: "/admin/networks/vendors" },
    ],
  },
  {
    key: "workforce", 
    title: "Workforce", 
    icon: BriefcaseBusiness, 
    order: 50, 
    feature: "workforce.core",
    children: [
      { key: "exec", title: "Executives", path: "/admin/workforce/executives" },
      { key: "emp", title: "Employees", path: "/admin/workforce/employees" },
      { key: "drivers", title: "Drivers", path: "/admin/workforce/drivers" },
      { key: "agents", title: "Agents", path: "/admin/workforce/agents" },
      { key: "scheduling", title: "Scheduling & Timesheets", path: "/admin/workforce/scheduling" },
    ],
  },
  {
    key: "docs", 
    title: "Documents", 
    icon: FileStack, 
    order: 60, 
    feature: "docs.core",
    children: [
      { key: "all-docs", title: "All Documents", path: "/admin/documents" },
      { key: "upload", title: "Upload", path: "/admin/documents/upload" },
      { key: "setup", title: "Templates & Setup", path: "/admin/documents/setup" },
    ],
  },
  {
    key: "fin", 
    title: "Financials", 
    icon: Wallet, 
    order: 70, 
    feature: "financials.core",
    children: [
      { key: "sales", title: "Sales & Payments", path: "/admin/financials/sales" },
      { key: "purchases", title: "Purchases", path: "/admin/financials/purchases" },
      { key: "accounting", title: "Accounting", path: "/admin/financials/accounting" },
      { key: "payroll", title: "Payroll", path: "/admin/financials/payroll", feature: "payroll.core" },
    ],
  },
  {
    key: "api", 
    title: "Integrations & API", 
    icon: PlugZap, 
    order: 80, 
    feature: "api.core",
    children: [
      { key: "keys", title: "API Keys", path: "/admin/api/keys" },
      { key: "logs", title: "API Logs", path: "/admin/api/logs" },
      { key: "errors", title: "API Errors", path: "/admin/api/errors" },
      { key: "edi", title: "EDI Partners & Flows", path: "/admin/edi", feature: "edi.x12" },
    ],
  },
  {
    key: "market", 
    title: "Marketplace", 
    icon: Store, 
    order: 90, 
    feature: "marketplace.core",
    children: [
      { key: "all", title: "All", path: "/admin/marketplace" },
      { key: "acct", title: "Accounting", path: "/admin/marketplace/accounting" },
      { key: "compliance", title: "Carrier Compliance", path: "/admin/marketplace/compliance" },
      { key: "api-cat", title: "API", path: "/admin/marketplace/api" },
      { key: "edi-cat", title: "EDI", path: "/admin/marketplace/edi" },
      { key: "elds", title: "ELDs", path: "/admin/marketplace/elds" },
      { key: "factoring", title: "Factoring", path: "/admin/marketplace/factoring" },
      { key: "fuel", title: "Fuel Cards", path: "/admin/marketplace/fuel" },
      { key: "loadboard", title: "Load Board", path: "/admin/marketplace/loadboard" },
      { key: "mileage", title: "Mileage", path: "/admin/marketplace/mileage" },
      { key: "payments", title: "Payments", path: "/admin/marketplace/payments" },
      { key: "tolls", title: "Tolls", path: "/admin/marketplace/tolls" },
      { key: "visibility", title: "Visibility", path: "/admin/marketplace/visibility" },
    ],
  },
  { 
    key: "reports", 
    title: "Reports", 
    icon: BarChart4, 
    path: "/admin/reports", 
    order: 100, 
    feature: "reports.core" 
  },
  {
    key: "autonomous", 
    title: "Autonomous Agents", 
    icon: Zap, 
    order: 110, 
    feature: "autonomous.full",
    autonomous: true,
    children: [
      { key: "agents", title: "Agent Management", path: "/admin/autonomous/agents" },
      { key: "monitoring", title: "System Monitoring", path: "/admin/autonomous/monitoring" },
      { key: "development", title: "Development", path: "/admin/autonomous/development" },
      { key: "configuration", title: "Configuration", path: "/admin/autonomous/config" },
    ],
  },
];

// Mock data for demonstration
const mockUser = {
  role: "admin" as Role,
  entitlements: [
    "crm.core", "tickets.core", "networks.core", "workforce.core",
    "docs.core", "financials.core", "payroll.core", "api.core", 
    "marketplace.core", "reports.core", "edi.x12", "autonomous.full"
  ]
};

const mockBadges = {
  "tickets:all": 156,
  "tickets:assigned": 89,
  "tickets:unassigned": 67,
  "autonomous:active": 250,
  "system:alerts": 3
};

// Utility functions
function hasEntitlement(feature?: Entitlement): boolean {
  if (!feature) return true;
  return mockUser.entitlements.includes(feature);
}

function allow(item: NavItem, role: string, has: (f?: Entitlement) => boolean): boolean {
  const roleOk = !item.roles || item.roles.includes(role as any) || item.roles.includes("owner");
  const featOk = !item.feature || has(item.feature);
  return roleOk && featOk;
}

function getBadge(key: string): number | undefined {
  return mockBadges[key as keyof typeof mockBadges];
}

// Sidebar Component
function Sidebar() {
  const role = mockUser.role;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['overview']));

  const items = useMemo(() => {
    const walk = (list: NavItem[]): NavItem[] =>
      list
        .filter(i => allow(i, role, hasEntitlement))
        .map(i => i.children ? { ...i, children: walk(i.children) } : i)
        .filter(i => i.path || (i.children && i.children.length))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return walk(ADMIN_NAV);
  }, [role]);

  const toggleGroup = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <aside className="w-72 border-r bg-gradient-to-b from-slate-50 to-slate-100 p-4 space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Shield className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-semibold text-slate-700">Software Admin</span>
      </div>
      
      <nav className="space-y-2">
        {items.map(group => (
          <div key={group.key} className="space-y-1">
            {group.children ? (
              <>
                <button
                  onClick={() => toggleGroup(group.key)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {group.icon && <group.icon className="h-4 w-4" />}
                    <span>{group.title}</span>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedGroups.has(group.key) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {expandedGroups.has(group.key) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 space-y-1"
                    >
                      {group.children.map((item) => (
                        <a
                          key={item.key}
                          href={item.path}
                          className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          <span>{item.title}</span>
                          {item.badgeKey && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {getBadge(item.badgeKey)}
                            </span>
                          )}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <a
                href={group.path}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              >
                {group.icon && <group.icon className="h-4 w-4" />}
                <span>{group.title}</span>
              </a>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Rail */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex gap-2">
            <a href="/learn" className="hover:text-slate-700">Learn</a>
            <a href="/help" className="hover:text-slate-700">Help</a>
          </div>
          <button className="hover:text-slate-700">🌓</button>
        </div>
      </div>
    </aside>
  );
}

// Top Bar Component
function TopBar() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium">Trans Bot AI</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Command Palette */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="text-xs bg-slate-200 px-1 rounded">⌘K</kbd>
        </button>

        {/* Quick Add */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Quick Add</span>
          </button>
          {showQuickAdd && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Lead</a>
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Contact</a>
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Opportunity</a>
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Ticket</a>
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Invoice</a>
              <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Load</a>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Bell className="h-5 w-5" />
          {mockBadges["system:alerts"] > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {mockBadges["system:alerts"]}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
          <Settings className="h-5 w-5" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
          <User className="h-5 w-5" />
          <span className="text-sm">Admin</span>
        </button>
      </div>
    </header>
  );
}

// Main Dashboard Content
function DashboardContent() {
  const systemHealth = {
    status: 'healthy',
    uptime: '99.9%',
    responseTime: '150ms',
    activeAgents: 250,
    alerts: 3
  };

  const recentActivity = [
    { id: 1, type: 'ticket', message: 'New support ticket created', time: '2 min ago', status: 'pending' },
    { id: 2, type: 'agent', message: 'Autonomous agent completed task', time: '5 min ago', status: 'success' },
    { id: 3, type: 'system', message: 'System backup completed', time: '15 min ago', status: 'success' },
    { id: 4, type: 'alert', message: 'High CPU usage detected', time: '1 hour ago', status: 'warning' }
  ];

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Software Admin</h1>
        <p className="text-blue-100">Full autonomous agent authority enabled. System running at peak performance.</p>
      </div>

      {/* System Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EnhancedCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">System Status</p>
              <p className="text-lg font-semibold text-green-600">{systemHealth.status}</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Uptime</p>
              <p className="text-lg font-semibold text-blue-600">{systemHealth.uptime}</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Agents</p>
              <p className="text-lg font-semibold text-purple-600">{systemHealth.activeAgents}+</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Alerts</p>
              <p className="text-lg font-semibold text-orange-600">{systemHealth.alerts}</p>
            </div>
          </div>
        </EnhancedCard>
      </div>

      {/* Recent Activity */}
      <EnhancedCard className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.status === 'success' ? 'bg-green-100' :
                activity.status === 'warning' ? 'bg-orange-100' :
                'bg-blue-100'
              }`}>
                {activity.status === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                 activity.status === 'warning' ? <AlertTriangle className="h-4 w-4 text-orange-600" /> :
                 <Clock className="h-4 w-4 text-blue-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </EnhancedCard>

      {/* Autonomous Agent Status */}
      <EnhancedCard className="p-6">
        <h2 className="text-lg font-semibold mb-4">Autonomous Agent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">250+</p>
            <p className="text-sm text-green-700">Active Agents</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">98.5%</p>
            <p className="text-sm text-blue-700">Success Rate</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">~150ms</p>
            <p className="text-sm text-purple-700">Response Time</p>
          </div>
        </div>
      </EnhancedCard>
    </div>
  );
}

// Main Software Admin Portal Component
export default function SoftwareAdminPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Software Admin Portal</h1>
              <p className="text-slate-600 mt-2">Full autonomous agent authority enabled</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Agents</p>
                <p className="text-2xl font-bold text-blue-600">250+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">⚡</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Response Time</p>
                <p className="text-2xl font-bold text-purple-600">~150ms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Alerts</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Access</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-blue-600">👥</span>
                <span className="font-medium">Relationships</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-green-600">🛟</span>
                <span className="font-medium">Service Desk</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-purple-600">🌐</span>
                <span className="font-medium">Networks</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-orange-600">👷</span>
                <span className="font-medium">Workforce</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Services</span>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Autonomous Agents</span>
                <span className="text-sm font-medium text-green-600">250+ Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Real-time Updates</span>
                <span className="text-sm font-medium text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New support ticket created</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Autonomous agent completed task</p>
                <p className="text-xs text-slate-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-slate-500">15 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
