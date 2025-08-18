/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Activity,
  CheckCircle,
  Clock,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

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

  // Portal URLs
  const portalUrls = {
    dashboard: '/',
    broker: '/broker',
    carrier: '/carrier',
    driver: '/driver',
    shipper: '/shipper',
    superAdmin: '/super-admin',
    analytics: '/analytics',
    autonomous: '/autonomous',
    factoring: '/factoring',
    ownerOperator: '/owner-operator'
  };

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
        { key: 'file-management', label: 'File Management', icon: '📁', path: '/super-admin/system/files' }
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
        { key: 'firewall', label: 'Firewall', icon: '🛡️', path: '/super-admin/security/firewall' }
      ]
    },
    {
      key: 'monitoring',
      label: 'System Monitoring',
      icon: '👁️',
      children: [
        { key: 'log-analysis', label: 'Log Analysis', icon: '📝', path: '/super-admin/monitoring/logs' },
        { key: 'performance', label: 'Performance Monitoring', icon: '📈', path: '/super-admin/monitoring/performance' },
        { key: 'alerts', label: 'Alert Management', icon: '🔔', path: '/super-admin/monitoring/alerts' }
      ]
    },
    {
      key: 'portals',
      label: 'Portal Management',
      icon: '🌐',
      children: [
        { key: 'dashboard-portal', label: 'Dashboard Portal', icon: '📊', path: '/' },
        { key: 'broker-portal', label: 'Broker Portal', icon: '👥', path: '/broker' },
        { key: 'carrier-portal', label: 'Carrier Portal', icon: '🚛', path: '/carrier' },
        { key: 'driver-portal', label: 'Driver Portal', icon: '🚗', path: '/driver' },
        { key: 'shipper-portal', label: 'Shipper Portal', icon: '📦', path: '/shipper' },
        { key: 'analytics-portal', label: 'Analytics Portal', icon: '📈', path: '/analytics' },
        { key: 'autonomous-portal', label: 'Autonomous Portal', icon: '🤖', path: '/autonomous' }
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
        { key: 'performance-reports', label: 'Performance Reports', icon: '📈', path: '/super-admin/reports/performance' }
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
        { key: 'integrations', label: 'Integrations', icon: '🔌', path: '/super-admin/settings/integrations' }
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
                            <button
                              key={child.key}
                              onClick={() => {
                                if (child.path) {
                                  handlePortalNavigation(child.path);
                                }
                                if (isMobile) closeMobileSidebar();
                              }}
                              className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors group"
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

        {/* Dashboard Content */}
        <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-4 lg:p-6 text-white">
            <h1 className="text-xl lg:text-2xl font-bold mb-2">Welcome to Super Admin Portal</h1>
            <p className="text-purple-100 text-sm lg:text-base">Complete system control with full administrative authority. All systems operational.</p>
          </div>

          {/* System Health Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-lg">👥</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Users</p>
                  <p className="text-lg font-semibold text-purple-600">{systemStats.users.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-lg">🌐</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Portals</p>
                  <p className="text-lg font-semibold text-blue-600">{systemStats.portals}/{systemStats.portals}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">System Health</p>
                  <p className="text-lg font-semibold text-green-600">{systemStats.health}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-lg">🛡️</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Security Score</p>
                  <p className="text-lg font-semibold text-orange-600">{systemStats.security}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Portal Navigation Cards */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold mb-4">Portal Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(portalUrls).map(([key, url]) => {
                const portalConfig = {
                  dashboard: { icon: '📊', label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
                  broker: { icon: '👥', label: 'Broker', color: 'from-purple-500 to-pink-500' },
                  carrier: { icon: '🚛', label: 'Carrier', color: 'from-green-500 to-emerald-500' },
                  driver: { icon: '🚗', label: 'Driver', color: 'from-orange-500 to-yellow-500' },
                  shipper: { icon: '📦', label: 'Shipper', color: 'from-red-500 to-pink-500' },
                  superAdmin: { icon: '👑', label: 'Super Admin', color: 'from-purple-500 to-violet-500' },
                  analytics: { icon: '📈', label: 'Analytics', color: 'from-teal-500 to-cyan-500' },
                  autonomous: { icon: '🤖', label: 'Autonomous', color: 'from-indigo-500 to-purple-500' },
                  factoring: { icon: '💼', label: 'Factoring', color: 'from-blue-500 to-indigo-500' },
                  ownerOperator: { icon: '👨‍💼', label: 'Owner Operator', color: 'from-indigo-500 to-blue-500' }
                }[key];

                if (!portalConfig) return null;

                return (
                  <button
                    key={key}
                    onClick={() => handlePortalNavigation(url)}
                    className="h-20 flex-col bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-purple-300 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-2xl mb-1">{portalConfig.icon}</span>
                    <span className="text-sm font-medium">{portalConfig.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="h-20 flex-col bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg rounded-lg flex items-center justify-center text-white">
                <span className="text-xl mb-1">🔒</span>
                <span className="text-sm font-medium">Security Audit</span>
                <span className="text-xs opacity-90">System Security</span>
              </button>
              <button className="h-20 flex-col bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-lg flex items-center justify-center">
                <span className="text-xl mb-1">💾</span>
                <span className="text-sm font-medium">Database Backup</span>
                <span className="text-xs opacity-90">Data Protection</span>
              </button>
              <button className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-lg flex items-center justify-center">
                <span className="text-xl mb-1">🔄</span>
                <span className="text-sm font-medium">System Update</span>
                <span className="text-xs opacity-90">Version Control</span>
              </button>
              <button className="h-20 flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-lg flex items-center justify-center">
                <span className="text-xl mb-1">🔌</span>
                <span className="text-sm font-medium">API Management</span>
                <span className="text-xs opacity-90">Integration Control</span>
              </button>
              <button className="h-20 flex-col bg-gradient-to-br from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-lg flex items-center justify-center">
                <span className="text-xl mb-1">📝</span>
                <span className="text-sm font-medium">Log Analysis</span>
                <span className="text-xs opacity-90">System Monitoring</span>
              </button>
              <button className="h-20 flex-col bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-lg flex items-center justify-center">
                <span className="text-xl mb-1">🚨</span>
                <span className="text-sm font-medium">Emergency Mode</span>
                <span className="text-xs opacity-90">Crisis Management</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'warning' ? 'bg-yellow-500' : 
                    notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-slate-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPortal;
