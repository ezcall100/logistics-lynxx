/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';

// Import all Super Admin pages
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import SystemAdminPage from './pages/SystemAdminPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import SystemMonitoringPage from './pages/SystemMonitoringPage';
import PortalManagementPage from './pages/PortalManagementPage';
import ReportsPage from './pages/ReportsPage';
import GlobalSettingsPage from './pages/GlobalSettingsPage';

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

const SuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['dashboard']));
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'System backup scheduled', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New user registration', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Security scan completed', time: '10 min ago' }
  ]);
  const [systemStats, setSystemStats] = useState({
    users: 2847,
    portals: 7,
    health: 99.9,
    security: 'A+',
    uptime: '99.9%',
    responseTime: '1.2s'
  });

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

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-expand current section based on location
  useEffect(() => {
    const path = location.pathname;
    const newExpanded = new Set(expandedGroups);
    
    if (path.includes('/users')) newExpanded.add('users');
    if (path.includes('/system')) newExpanded.add('system');
    if (path.includes('/security')) newExpanded.add('security');
    if (path.includes('/monitoring')) newExpanded.add('monitoring');
    if (path.includes('/portals')) newExpanded.add('portals');
    if (path.includes('/reports')) newExpanded.add('reports');
    if (path.includes('/settings')) newExpanded.add('settings');
    
    setExpandedGroups(newExpanded);
  }, [location.pathname]);

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

  const handlePortalNavigation = (url: string) => {
    navigate(url);
  };

  // Navigation structure for Super Admin
  const navigationItems: NavigationItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/super-admin',
      badge: null
    },
    {
      key: 'users',
      label: 'User Management',
      icon: '👥',
      children: [
        { key: 'all-users', label: 'All Users', icon: '👥', path: '/super-admin/users' },
        { key: 'active-users', label: 'Active Users', icon: '✅', path: '/super-admin/users/active' },
        { key: 'pending-users', label: 'Pending Approval', icon: '⏳', path: '/super-admin/users/pending' },
        { key: 'suspended-users', label: 'Suspended', icon: '❌', path: '/super-admin/users/suspended' },
        { key: 'roles', label: 'Role Management', icon: '👑', path: '/super-admin/roles' },
        { key: 'permissions', label: 'Permissions', icon: '🔒', path: '/super-admin/permissions' },
        { key: 'user-groups', label: 'User Groups', icon: '👥', path: '/super-admin/groups' }
      ]
    },
    {
      key: 'system',
      label: 'System Administration',
      icon: '⚙️',
      children: [
        { key: 'database', label: 'Database Management', icon: '🗄️', path: '/super-admin/system/database' },
        { key: 'api-management', label: 'API Management', icon: '🔌', path: '/super-admin/system/api' },
        { key: 'network-settings', label: 'Network Settings', icon: '🌍', path: '/super-admin/system/network' },
        { key: 'file-management', label: 'File Management', icon: '📁', path: '/super-admin/system/files' },
        { key: 'backup-restore', label: 'Backup & Restore', icon: '💾', path: '/super-admin/system/backup' },
        { key: 'system-updates', label: 'System Updates', icon: '🔄', path: '/super-admin/system/updates' }
      ]
    },
    {
      key: 'security',
      label: 'Security Center',
      icon: '🔒',
      children: [
        { key: 'security-audit', label: 'Security Audit', icon: '🔍', path: '/super-admin/security/audit' },
        { key: 'access-control', label: 'Access Control', icon: '🔐', path: '/super-admin/security/access' },
        { key: 'encryption', label: 'Encryption', icon: '🔒', path: '/super-admin/security/encryption' },
        { key: 'firewall', label: 'Firewall', icon: '🛡️', path: '/super-admin/security/firewall' },
        { key: 'mfa-settings', label: 'MFA Settings', icon: '🔐', path: '/super-admin/security/mfa' },
        { key: 'ip-whitelist', label: 'IP Whitelist', icon: '🌍', path: '/super-admin/security/ip' }
      ]
    },
    {
      key: 'monitoring',
      label: 'System Monitoring',
      icon: '👁️',
      children: [
        { key: 'log-analysis', label: 'Log Analysis', icon: '📝', path: '/super-admin/monitoring/logs' },
        { key: 'performance', label: 'Performance Monitoring', icon: '📈', path: '/super-admin/monitoring/performance' },
        { key: 'alerts', label: 'Alert Management', icon: '🔔', path: '/super-admin/monitoring/alerts' },
        { key: 'health-checks', label: 'Health Checks', icon: '❤️', path: '/super-admin/monitoring/health' },
        { key: 'error-tracking', label: 'Error Tracking', icon: '❌', path: '/super-admin/monitoring/errors' }
      ]
    },
    {
      key: 'portals',
      label: 'Portal Management',
      icon: '🌐',
      children: [
        { key: 'dashboard-portal', label: 'Dashboard Portal', icon: '📊', path: '/super-admin/portals/dashboard' },
        { key: 'broker-portal', label: 'Broker Portal', icon: '👥', path: '/super-admin/portals/broker' },
        { key: 'carrier-portal', label: 'Carrier Portal', icon: '🚛', path: '/super-admin/portals/carrier' },
        { key: 'driver-portal', label: 'Driver Portal', icon: '🚗', path: '/super-admin/portals/driver' },
        { key: 'shipper-portal', label: 'Shipper Portal', icon: '📦', path: '/super-admin/portals/shipper' },
        { key: 'analytics-portal', label: 'Analytics Portal', icon: '📈', path: '/super-admin/portals/analytics' },
        { key: 'autonomous-portal', label: 'Autonomous Portal', icon: '🤖', path: '/super-admin/portals/autonomous' }
      ]
    },
    {
      key: 'reports',
      label: 'Reports & Analytics',
      icon: '📋',
      children: [
        { key: 'system-reports', label: 'System Reports', icon: '📊', path: '/super-admin/reports/system' },
        { key: 'user-reports', label: 'User Reports', icon: '👥', path: '/super-admin/reports/users' },
        { key: 'security-reports', label: 'Security Reports', icon: '🔒', path: '/super-admin/reports/security' },
        { key: 'performance-reports', label: 'Performance Reports', icon: '📈', path: '/super-admin/reports/performance' },
        { key: 'audit-logs', label: 'Audit Logs', icon: '📝', path: '/super-admin/reports/audit' },
        { key: 'compliance-reports', label: 'Compliance Reports', icon: '✅', path: '/super-admin/reports/compliance' }
      ]
    },
    {
      key: 'settings',
      label: 'Global Settings',
      icon: '🔧',
      children: [
        { key: 'general-settings', label: 'General Settings', icon: '⚙️', path: '/super-admin/settings/general' },
        { key: 'appearance', label: 'Appearance', icon: '🎨', path: '/super-admin/settings/appearance' },
        { key: 'notifications', label: 'Notifications', icon: '🔔', path: '/super-admin/settings/notifications' },
        { key: 'integrations', label: 'Integrations', icon: '🔌', path: '/super-admin/settings/integrations' },
        { key: 'email-settings', label: 'Email Settings', icon: '📧', path: '/super-admin/settings/email' },
        { key: 'billing-settings', label: 'Billing Settings', icon: '💳', path: '/super-admin/settings/billing' }
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Super Admin Portal</h2>
          <p className="text-gray-600">Initializing system components...</p>
        </div>
      </div>
    );
  }

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
        className={`border-r bg-gradient-to-b from-purple-50 to-indigo-100 overflow-hidden ${
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">👑</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Super Admin</span>
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
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors group ${
                        expandedGroups.has(item.key) 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-slate-700 hover:bg-slate-200'
                      }`}
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
                            <button
                              key={child.key}
                              onClick={() => {
                                if (child.path) {
                                  handlePortalNavigation(child.path);
                                }
                                if (isMobile) closeMobileSidebar();
                              }}
                              className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors group ${
                                location.pathname === child.path
                                  ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-500'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{child.icon}</span>
                                <span className="whitespace-nowrap">{child.label}</span>
                              </div>
                              {child.badge && (
                                <span className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs bg-purple-100 text-purple-800 rounded-full px-1">
                                  {child.badge}
                                </span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Single item
                  <button
                    onClick={() => {
                      if (item.path) {
                        handlePortalNavigation(item.path);
                      }
                      if (isMobile) closeMobileSidebar();
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors group ${
                      location.pathname === item.path
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
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
                        className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs bg-purple-100 text-purple-800 rounded-full px-1"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </button>
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
            className="fixed left-4 top-20 z-30 w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
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
              <span className="text-xl lg:text-2xl">👑</span>
              <span className="text-sm font-medium hidden sm:block">Super Admin Portal</span>
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

            {/* Quick Actions */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <span>⚡</span>
                <span className="hidden sm:block">Quick Actions</span>
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
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Security Audit</button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Database Backup</button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">System Update</button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">API Management</button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Log Analysis</button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">Emergency Mode</button>
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
                {notifications.length}
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">⚙️</span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">👤</span>
              <span className="text-sm hidden sm:block">Super Admin</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage systemStats={systemStats} notifications={notifications} />} />
            <Route path="/users/*" element={<UserManagementPage />} />
            <Route path="/system/*" element={<SystemAdminPage />} />
            <Route path="/security/*" element={<SecurityCenterPage />} />
            <Route path="/monitoring/*" element={<SystemMonitoringPage />} />
            <Route path="/portals/*" element={<PortalManagementPage />} />
            <Route path="/reports/*" element={<ReportsPage />} />
            <Route path="/settings/*" element={<GlobalSettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPortal;
