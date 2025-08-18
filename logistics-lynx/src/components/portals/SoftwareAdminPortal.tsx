import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingActionButton from '../admin/FloatingActionButton';

// Type definitions
interface NavigationChild {
  key: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
}

interface NavigationItem {
  key: string;
  label: string;
  icon: string;
  path?: string;
  badge?: string | null;
  children?: NavigationChild[];
}

export default function SoftwareAdminPortal() {
  console.log('SoftwareAdminPortal component loaded successfully!');
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['overview']));
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleGroup = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarMobileOpen(!sidebarMobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setSidebarMobileOpen(false);
  };

  const navigationItems: NavigationItem[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: '📊',
      path: '/admin/overview',
      badge: null
    },
    {
      key: 'crm',
      label: 'CRM',
      icon: '👥',
      children: [
        { key: 'email', label: 'Email', icon: '📧', path: '/admin/crm/email' },
        { key: 'leads', label: 'Leads', icon: '🎯', path: '/admin/crm/leads' },
        { key: 'contacts', label: 'Contacts', icon: '👤', path: '/admin/crm/contacts' },
        { key: 'projects', label: 'Projects', icon: '📁', path: '/admin/crm/projects' },
        { key: 'calendar', label: 'Calendar', icon: '📅', path: '/admin/crm/calendar' },
        { key: 'opportunities', label: 'Opportunities', icon: '💼', path: '/admin/crm/opportunities' }
      ]
    },
    {
      key: 'desk',
      label: 'Service Desk',
      icon: '🛟',
      children: [
        { key: 'all-tickets', label: 'All Tickets', icon: '📋', path: '/admin/tickets', badge: '156' },
        { key: 'assigned', label: 'Assigned', icon: '👤', path: '/admin/tickets/assigned', badge: '89' },
        { key: 'unassigned', label: 'Unassigned', icon: '❓', path: '/admin/tickets/unassigned', badge: '67' },
        { key: 'incidents', label: 'Incidents', icon: '🚨', path: '/admin/tickets/incidents' },
        { key: 'service-requests', label: 'Service Requests', icon: '📝', path: '/admin/tickets/requests' },
        { key: 'changes', label: 'Changes', icon: '🔄', path: '/admin/tickets/changes' },
        { key: 'problems', label: 'Problems', icon: '⚠️', path: '/admin/tickets/problems' }
      ]
    },
    {
      key: 'networks',
      label: 'Networks',
      icon: '🌐',
      children: [
        { key: 'customers', label: 'Customers', icon: '🏢', path: '/admin/networks/customers' },
        { key: 'vendors', label: 'Vendors', icon: '🏭', path: '/admin/networks/vendors' }
      ]
    },
    {
      key: 'workforce',
      label: 'Workforce',
      icon: '👷',
      children: [
        { key: 'executives', label: 'Executives', icon: '👔', path: '/admin/workforce/executives' },
        { key: 'employees', label: 'Employees', icon: '👥', path: '/admin/workforce/employees' },
        { key: 'drivers', label: 'Drivers', icon: '🚗', path: '/admin/workforce/drivers' },
        { key: 'agents', label: 'Agents', icon: '🤖', path: '/admin/workforce/agents' },
        { key: 'scheduling', label: 'Scheduling & Timesheets', icon: '⏰', path: '/admin/workforce/scheduling' }
      ]
    },
    {
      key: 'docs',
      label: 'Documents',
      icon: '📄',
      children: [
        { key: 'all-docs', label: 'All Documents', icon: '📁', path: '/admin/documents' },
        { key: 'upload', label: 'Upload', icon: '📤', path: '/admin/documents/upload' },
        { key: 'templates', label: 'Templates & Setup', icon: '📋', path: '/admin/documents/templates' }
      ]
    },
    {
      key: 'fin',
      label: 'Financials',
      icon: '💰',
      children: [
        { key: 'sales', label: 'Sales & Payments', icon: '💳', path: '/admin/financials/sales' },
        { key: 'purchases', label: 'Purchases', icon: '🛒', path: '/admin/financials/purchases' },
        { key: 'accounting', label: 'Accounting', icon: '📊', path: '/admin/financials/accounting' },
        { key: 'payroll', label: 'Payroll', icon: '💵', path: '/admin/financials/payroll' }
      ]
    },
    {
      key: 'api',
      label: 'Integrations & API',
      icon: '🔌',
      children: [
        { key: 'api-keys', label: 'API Keys', icon: '🔑', path: '/admin/api/keys' },
        { key: 'api-logs', label: 'API Logs', icon: '📝', path: '/admin/api/logs' },
        { key: 'api-errors', label: 'API Errors', icon: '❌', path: '/admin/api/errors' },
        { key: 'edi', label: 'EDI Partners & Flows', icon: '📡', path: '/admin/edi' }
      ]
    },
    {
      key: 'market',
      label: 'Marketplace',
      icon: '🛒',
      children: [
        { key: 'all-market', label: 'All', icon: '📦', path: '/admin/marketplace' },
        { key: 'accounting-market', label: 'Accounting', icon: '📊', path: '/admin/marketplace/accounting' },
        { key: 'compliance', label: 'Carrier Compliance', icon: '✅', path: '/admin/marketplace/compliance' },
        { key: 'api-market', label: 'API', icon: '🔌', path: '/admin/marketplace/api' },
        { key: 'edi-market', label: 'EDI', icon: '📡', path: '/admin/marketplace/edi' },
        { key: 'elds', label: 'ELDs', icon: '📱', path: '/admin/marketplace/elds' },
        { key: 'factoring', label: 'Factoring', icon: '💳', path: '/admin/marketplace/factoring' },
        { key: 'fuel-cards', label: 'Fuel Cards', icon: '⛽', path: '/admin/marketplace/fuel' },
        { key: 'load-board', label: 'Load Board', icon: '📋', path: '/admin/marketplace/loadboard' },
        { key: 'mileage', label: 'Mileage', icon: '🛣️', path: '/admin/marketplace/mileage' },
        { key: 'payments', label: 'Payments', icon: '💸', path: '/admin/marketplace/payments' },
        { key: 'tolls', label: 'Tolls', icon: '🛣️', path: '/admin/marketplace/tolls' },
        { key: 'visibility', label: 'Visibility', icon: '👁️', path: '/admin/marketplace/visibility' }
      ]
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: '📊',
      path: '/admin/reports',
      badge: null
    },
    {
      key: 'autonomous',
      label: 'Autonomous Agents',
      icon: '🤖',
      children: [
        { key: 'agent-management', label: 'Agent Management', icon: '🤖', path: '/admin/autonomous/management' },
        { key: 'system-monitoring', label: 'System Monitoring', icon: '📊', path: '/admin/autonomous/monitoring' },
        { key: 'development', label: 'Development', icon: '🔧', path: '/admin/autonomous/development' },
        { key: 'configuration', label: 'Configuration', icon: '⚙️', path: '/admin/autonomous/config' }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isMobile ? (sidebarMobileOpen ? 280 : 0) : (sidebarCollapsed ? 64 : 288),
          x: isMobile ? (sidebarMobileOpen ? 0 : -280) : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`border-r bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden ${
          isMobile ? 'fixed left-0 top-0 h-full z-50' : 'relative'
        }`}
      >
        <div className="p-4 space-y-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
        <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: (sidebarCollapsed && !isMobile) ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">⚙️</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Software Admin</span>
            </motion.div>
            
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <motion.span
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
                className="text-lg"
              >
                {sidebarCollapsed ? '◀' : '▶'}
              </motion.span>
            </button>
                    </div>
          
          {/* Navigation */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.key} className="space-y-1">
                {item.children ? (
                  // Group with children
                  <div>
                    <button
                      onClick={() => toggleGroup(item.key)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon}</span>
                        <motion.span
                          animate={{ opacity: (sidebarCollapsed && !isMobile) ? 0 : 1 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                    </div>
                      <motion.span
                        animate={{ 
                          rotate: expandedGroups.has(item.key) ? 180 : 0,
                          opacity: (sidebarCollapsed && !isMobile) ? 0 : 1
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-xs"
                      >
                        ▼
                      </motion.span>
                    </button>
                    
                    <AnimatePresence>
                      {expandedGroups.has(item.key) && (!sidebarCollapsed || isMobile) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 space-y-1 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <a
                              key={child.key}
                              href={child.path}
                              className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors group"
                              onClick={isMobile ? closeMobileSidebar : undefined}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{child.icon}</span>
                                <span className="whitespace-nowrap">{child.label}</span>
                  </div>
                              {child.badge && (
                                <span className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs bg-blue-100 text-blue-800 rounded-full px-1">
                                  {child.badge}
                                </span>
                              )}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                ) : (
                  // Single item
                  <a
                    href={item.path}
                    className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors group"
                    onClick={isMobile ? closeMobileSidebar : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <motion.span
                        animate={{ opacity: (sidebarCollapsed && !isMobile) ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    </div>
                    {item.badge && (
                      <motion.span
                        animate={{ opacity: (sidebarCollapsed && !isMobile) ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs bg-blue-100 text-blue-800 rounded-full px-1"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </a>
                )}
                  </div>
            ))}
          </nav>

          {/* Bottom Rail */}
          <motion.div 
            className="pt-4 border-t border-slate-200"
            animate={{ opacity: (sidebarCollapsed && !isMobile) ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex gap-2">
                <a href="/learn" className="hover:text-slate-700 transition-colors">Learn</a>
                <a href="/help" className="hover:text-slate-700 transition-colors">Help</a>
                    </div>
              <button className="hover:text-slate-700 transition-colors">🌓</button>
                    </div>
          </motion.div>
                  </div>
      </motion.aside>

      {/* Floating Toggle Button for Collapsed Sidebar */}
      <AnimatePresence>
        {sidebarCollapsed && !isMobile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
            className="fixed left-4 top-20 z-30 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            title="Expand Sidebar"
          >
            <span className="text-lg">▶</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b bg-white px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors lg:hidden"
              >
                <span className="text-lg">☰</span>
              </button>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-xl lg:text-2xl">🌐</span>
              <span className="text-sm font-medium hidden sm:block">Trans Bot AI</span>
              <span className="text-slate-400 hidden lg:block">▼</span>
                    </div>
                  </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Command Palette */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
              <span>🔍</span>
              <span className="hidden md:block">Search...</span>
              <kbd className="text-xs bg-slate-200 px-1 rounded hidden lg:block">⌘K</kbd>
            </button>

            {/* Quick Add */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <span>➕</span>
                <span className="hidden sm:block">Quick Add</span>
              </button>
              <AnimatePresence>
                {showQuickAdd && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg py-1 z-50"
                  >
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Lead</a>
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Contact</a>
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Opportunity</a>
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Ticket</a>
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Invoice</a>
                    <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Load</a>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">⚙️</span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">👤</span>
              <span className="text-sm hidden sm:block">Admin</span>
            </button>
                    </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 lg:p-6 text-white">
            <h1 className="text-xl lg:text-2xl font-bold mb-2">Welcome to Software Admin</h1>
            <p className="text-blue-100 text-sm lg:text-base">Full autonomous agent authority enabled. System running at peak performance.</p>
                    </div>

          {/* System Health Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">System Status</p>
                  <p className="text-lg font-semibold text-green-600">Healthy</p>
                </div>
              </div>
                    </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-lg">📊</span>
                    </div>
                <div>
                  <p className="text-sm text-slate-600">Uptime</p>
                  <p className="text-lg font-semibold text-blue-600">99.9%</p>
                  </div>
                    </div>
                    </div>
                    
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Agents</p>
                  <p className="text-lg font-semibold text-purple-600">250+</p>
                </div>
              </div>
                    </div>
                    
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-lg">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Alerts</p>
                  <p className="text-lg font-semibold text-orange-600">3</p>
                </div>
                    </div>
                  </div>
              </div>

              {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
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

          {/* Autonomous Agent Status */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold mb-4">Autonomous Agent Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <span className="text-2xl lg:text-3xl">📈</span>
                <p className="text-xl lg:text-2xl font-bold text-green-600">250+</p>
                <p className="text-sm text-green-700">Active Agents</p>
                  </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <span className="text-2xl lg:text-3xl">⚡</span>
                <p className="text-xl lg:text-2xl font-bold text-blue-600">98.5%</p>
                <p className="text-sm text-blue-700">Success Rate</p>
            </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <span className="text-2xl lg:text-3xl">📊</span>
                <p className="text-xl lg:text-2xl font-bold text-purple-600">~150ms</p>
                <p className="text-sm text-purple-700">Response Time</p>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        userRole="admin"
        userEntitlements={['admin.core', 'crm.core', 'tickets.core', 'networks.core', 'workforce.core', 'docs.core', 'financials.core', 'payroll.core', 'api.core', 'marketplace.core', 'reports.core', 'edi.x12']}
        isAdmin={true}
      />
            </div>
  );
}
