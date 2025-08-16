/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
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

  // Enhanced Icons with better visual hierarchy
  const Icons = {
    Dashboard: '📊',
    Users: '👥',
    System: '⚙️',
    Security: '🔒',
    Analytics: '📈',
    Settings: '🔧',
    Reports: '📋',
    Monitoring: '👁️',
    Backup: '💾',
    Update: '🔄',
    API: '🔌',
    Logs: '📝',
    Emergency: '🚨',
    Portal: '🌐',
    Database: '🗄️',
    Network: '🌍',
    Files: '📁',
    Notifications: '🔔',
    Profile: '👤',
    Help: '❓',
    Logout: '🚪',
    Search: '🔍',
    Bell: '🔔',
    Home: '🏠',
    ArrowDown: '⬇️',
    ArrowRight: '➡️',
    Check: '✅',
    Warning: '⚠️',
    Error: '❌',
    Info: 'ℹ️',
    Star: '⭐',
    Fire: '🔥',
    Rocket: '🚀',
    Shield: '🛡️',
    Brain: '🧠',
    Lightning: '⚡',
    Crown: '👑',
    Target: '🎯',
    Clock: '⏰',
    Chart: '📊',
    Globe: '🌐',
    Key: '🔑',
    Lock: '🔐',
    Unlock: '🔓',
    Eye: '👁️',
    Heart: '❤️',
    Zap: '⚡',
    Trophy: '🏆',
    Medal: '🥇',
    Diamond: '💎',
    Sparkles: '✨',
    Factoring: '💼',
    OwnerOperator: '👨‍💼'
  };

const SuperAdminPortal = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubmenu, setActiveSubmenu] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'System backup scheduled', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New user registration', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Security scan completed', time: '10 min ago' }
  ]);
  const [systemStats, setSystemStats] = useState({
    users: 2847,
    portals: 8,
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
    admin: '/admin',
    superAdmin: '/super-admin',
    analytics: '/analytics',
    autonomous: '/autonomous',
    factoring: '/factoring',
    ownerOperator: '/owner-operator'
  };

  // Enhanced menu structure with better organization
  const menuStructure = {
    dashboard: {
      icon: Icons.Dashboard,
      label: 'Dashboard',
      color: 'from-blue-500 to-cyan-500',
      submenus: {
        overview: { label: 'System Overview', icon: Icons.Info, color: 'text-blue-600' },
        metrics: { label: 'Performance Metrics', icon: Icons.Chart, color: 'text-green-600' },
        alerts: { label: 'Active Alerts', icon: Icons.Warning, color: 'text-orange-600' }
      }
    },
    users: {
      icon: Icons.Users,
      label: 'User Management',
      color: 'from-purple-500 to-pink-500',
      submenus: {
        allUsers: { 
          label: 'All Users', 
          icon: Icons.Users,
          color: 'text-purple-600',
          subSubmenus: {
            active: { label: 'Active Users', icon: Icons.Check, color: 'text-green-600' },
            pending: { label: 'Pending Approval', icon: Icons.Clock, color: 'text-yellow-600' },
            suspended: { label: 'Suspended', icon: Icons.Error, color: 'text-red-600' }
          }
        },
        roles: { 
          label: 'Role Management', 
          icon: Icons.Crown,
          color: 'text-purple-600',
          subSubmenus: {
            create: { label: 'Create Role', icon: Icons.Star, color: 'text-blue-600' },
            assign: { label: 'Assign Roles', icon: Icons.ArrowRight, color: 'text-green-600' },
            permissions: { label: 'Permissions', icon: Icons.Shield, color: 'text-orange-600' }
          }
        },
        groups: { label: 'User Groups', icon: Icons.Users, color: 'text-purple-600' }
      }
    },
    system: {
      icon: Icons.System,
      label: 'System Administration',
      color: 'from-green-500 to-emerald-500',
      submenus: {
        database: { 
          label: 'Database Management', 
          icon: Icons.Database,
          color: 'text-green-600',
          subSubmenus: {
            status: { label: 'Database Status', icon: Icons.Check, color: 'text-green-600' },
            backup: { label: 'Backup & Restore', icon: Icons.Backup, color: 'text-blue-600' },
            maintenance: { label: 'Maintenance', icon: Icons.Settings, color: 'text-orange-600' }
          }
        },
        api: { 
          label: 'API Management', 
          icon: Icons.API,
          color: 'text-green-600',
          subSubmenus: {
            keys: { label: 'API Keys', icon: Icons.Key, color: 'text-blue-600' },
            endpoints: { label: 'Endpoints', icon: Icons.API, color: 'text-green-600' },
            monitoring: { label: 'API Monitoring', icon: Icons.Eye, color: 'text-purple-600' }
          }
        },
        network: { label: 'Network Settings', icon: Icons.Network, color: 'text-green-600' },
        files: { label: 'File Management', icon: Icons.Files, color: 'text-green-600' }
      }
    },
    security: {
      icon: Icons.Security,
      label: 'Security Center',
      color: 'from-red-500 to-pink-500',
      submenus: {
        audit: { 
          label: 'Security Audit', 
          icon: Icons.Shield,
          color: 'text-red-600',
          subSubmenus: {
            scan: { label: 'Vulnerability Scan', icon: Icons.Search, color: 'text-blue-600' },
            report: { label: 'Security Report', icon: Icons.Reports, color: 'text-green-600' },
            compliance: { label: 'Compliance Check', icon: Icons.Check, color: 'text-purple-600' }
          }
        },
        access: { 
          label: 'Access Control', 
          icon: Icons.Lock,
          color: 'text-red-600',
          subSubmenus: {
            mfa: { label: 'MFA Settings', icon: Icons.Security, color: 'text-blue-600' },
            ip: { label: 'IP Whitelist', icon: Icons.Network, color: 'text-green-600' },
            sessions: { label: 'Active Sessions', icon: Icons.Users, color: 'text-orange-600' }
          }
        },
        encryption: { label: 'Encryption', icon: Icons.Lock, color: 'text-red-600' },
        firewall: { label: 'Firewall', icon: Icons.Shield, color: 'text-red-600' }
      }
    },
    monitoring: {
      icon: Icons.Monitoring,
      label: 'System Monitoring',
      color: 'from-orange-500 to-yellow-500',
      submenus: {
        logs: { 
          label: 'Log Analysis', 
          icon: Icons.Logs,
          color: 'text-orange-600',
          subSubmenus: {
            system: { label: 'System Logs', icon: Icons.Logs, color: 'text-blue-600' },
            error: { label: 'Error Logs', icon: Icons.Error, color: 'text-red-600' },
            access: { label: 'Access Logs', icon: Icons.Users, color: 'text-green-600' }
          }
        },
        performance: { 
          label: 'Performance Monitoring', 
          icon: Icons.Chart,
          color: 'text-orange-600',
          subSubmenus: {
            cpu: { label: 'CPU Usage', icon: Icons.Chart, color: 'text-blue-600' },
            memory: { label: 'Memory Usage', icon: Icons.Chart, color: 'text-green-600' },
            disk: { label: 'Disk Usage', icon: Icons.Chart, color: 'text-purple-600' }
          }
        },
        alerts: { label: 'Alert Management', icon: Icons.Bell, color: 'text-orange-600' }
      }
    },
    portals: {
      icon: Icons.Portal,
      label: 'Portal Management',
      color: 'from-indigo-500 to-purple-500',
      submenus: {
        dashboard: { label: 'Dashboard Portal', icon: Icons.Dashboard, url: portalUrls.dashboard, color: 'text-indigo-600' },
        broker: { label: 'Broker Portal', icon: Icons.Users, url: portalUrls.broker, color: 'text-indigo-600' },
        carrier: { label: 'Carrier Portal', icon: Icons.Users, url: portalUrls.carrier, color: 'text-indigo-600' },
        driver: { label: 'Driver Portal', icon: Icons.Users, url: portalUrls.driver, color: 'text-indigo-600' },
        shipper: { label: 'Shipper Portal', icon: Icons.Users, url: portalUrls.shipper, color: 'text-indigo-600' },
        admin: { label: 'Admin Portal', icon: Icons.Settings, url: portalUrls.admin, color: 'text-indigo-600' },
        superAdmin: { label: 'Super Admin Portal', icon: Icons.Crown, url: portalUrls.superAdmin, color: 'text-indigo-600' },
        analytics: { label: 'Analytics Portal', icon: Icons.Analytics, url: portalUrls.analytics, color: 'text-indigo-600' },
        autonomous: { label: 'Autonomous Portal', icon: Icons.Brain, url: portalUrls.autonomous, color: 'text-indigo-600' },
        factoring: { label: 'Factoring Portal', icon: Icons.Factoring, url: portalUrls.factoring, color: 'text-indigo-600' },
        ownerOperator: { label: 'Owner-Operator Portal', icon: Icons.OwnerOperator, url: portalUrls.ownerOperator, color: 'text-indigo-600' }
      }
    },
    reports: {
      icon: Icons.Reports,
      label: 'Reports & Analytics',
      color: 'from-teal-500 to-cyan-500',
      submenus: {
        system: { label: 'System Reports', icon: Icons.Reports, color: 'text-teal-600' },
        user: { label: 'User Reports', icon: Icons.Users, color: 'text-teal-600' },
        security: { label: 'Security Reports', icon: Icons.Security, color: 'text-teal-600' },
        performance: { label: 'Performance Reports', icon: Icons.Chart, color: 'text-teal-600' }
      }
    },
    settings: {
      icon: Icons.Settings,
      label: 'Global Settings',
      color: 'from-gray-500 to-slate-500',
      submenus: {
        general: { label: 'General Settings', icon: Icons.Settings, color: 'text-gray-600' },
        appearance: { label: 'Appearance', icon: Icons.Settings, color: 'text-gray-600' },
        notifications: { label: 'Notifications', icon: Icons.Bell, color: 'text-gray-600' },
        integrations: { label: 'Integrations', icon: Icons.API, color: 'text-gray-600' }
      }
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (menuKey: string) => {
    setActiveMenu(menuKey);
    setActiveSubmenu('');
  };

  const handleSubmenuClick = (submenuKey: string) => {
    setActiveSubmenu(activeSubmenu === submenuKey ? '' : submenuKey);
  };

  const handlePortalNavigation = (url: string) => {
    navigate(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Super Admin Portal</h2>
          <p className="text-gray-600">Initializing system components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              <span className="text-xl">{Icons.Settings}</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">SA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Super Admin Portal</h1>
                <p className="text-sm text-gray-600">Complete System Control</p>
              </div>
            </div>
          </div>

          {/* Center - Enhanced Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search functions, users, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">{Icons.Search}</span>
              <div className="absolute right-4 top-3.5">
                <Badge variant="secondary" className="text-xs">⌘K</Badge>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 relative group">
              <span className="text-xl">{Icons.Bell}</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
              {/* Notification dropdown */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  {notifications.map(notification => (
                    <div key={notification.id} className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-b-0">
                      <span className={`text-sm ${notification.type === 'warning' ? 'text-yellow-500' : notification.type === 'success' ? 'text-green-500' : 'text-blue-500'}`}>
                        {notification.type === 'warning' ? Icons.Warning : notification.type === 'success' ? Icons.Check : Icons.Info}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <span className="text-xl">{Icons.Settings}</span>
            </button>
            <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">SA</span>
              </div>
              <div>
                <p className="text-sm font-medium">Super Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <span className="text-gray-400">{Icons.ArrowDown}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar with Glassmorphism */}
        <aside className={`bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'} sticky top-20 h-screen overflow-y-auto`}>
          <nav className="p-4">
            {Object.entries(menuStructure).map(([key, menu]) => (
              <div key={key} className="mb-2">
                <button
                  onClick={() => handleMenuClick(key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                    activeMenu === key 
                      ? `bg-gradient-to-r ${menu.color} text-white shadow-lg` 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{menu.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{menu.label}</span>
                      {Object.keys(menu.submenus).length > 0 && (
                        <span className="ml-auto">{Icons.ArrowRight}</span>
                      )}
                    </>
                  )}
                </button>

                {/* Enhanced Submenus */}
                {activeMenu === key && !sidebarCollapsed && Object.entries(menu.submenus).map(([subKey, submenu]) => (
                  <div key={subKey} className="ml-6 mt-2">
                    <button
                      onClick={() => {
                        if (submenu.url) {
                          handlePortalNavigation(submenu.url);
                        } else {
                          handleSubmenuClick(subKey);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                        activeSubmenu === subKey 
                          ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500' 
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className={`text-lg ${submenu.color}`}>{submenu.icon}</span>
                      <span className="font-medium">{submenu.label}</span>
                      {submenu.subSubmenus && !submenu.url && (
                        <span className="ml-auto">{Icons.ArrowDown}</span>
                      )}
                      {submenu.url && (
                        <span className="ml-auto text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">→</span>
                      )}
                    </button>

                    {/* Enhanced Sub-submenus */}
                    {activeSubmenu === subKey && submenu.subSubmenus && Object.entries(submenu.subSubmenus).map(([subSubKey, subSubmenu]) => (
                      <div key={subSubKey} className="ml-6 mt-1">
                        <button className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 ${subSubmenu.color}`}>
                          <span className="text-sm">{subSubmenu.icon}</span>
                          <span className="text-sm font-medium">{subSubmenu.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Breadcrumb */}
            <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-blue-500">{Icons.Home}</span>
              <span className="text-gray-400">{Icons.ArrowRight}</span>
              <span className="font-medium text-gray-900">
                {menuStructure[activeMenu as keyof typeof menuStructure]?.label}
              </span>
              {activeSubmenu && (
                <>
                  <span className="text-gray-400">{Icons.ArrowRight}</span>
                  <span className="font-medium text-gray-900">
                    {menuStructure[activeMenu as keyof typeof menuStructure]?.submenus[activeSubmenu]?.label}
                  </span>
                </>
              )}
            </div>

            {/* Enhanced System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">System</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{systemStats.users.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">↗</span>
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Portals</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Live</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{systemStats.portals}/{systemStats.portals}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">{Icons.Check}</span>
                    All systems operational
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Badge variant="default" className="bg-green-500">Excellent</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{systemStats.health}%</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">{Icons.Clock}</span>
                    Uptime this month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">Protected</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{systemStats.security}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">{Icons.Shield}</span>
                    No vulnerabilities detected
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Portal Navigation Cards */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{Icons.Portal}</span>
                  Portal Navigation
                  <Badge variant="secondary" className="ml-2">Quick Access</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(portalUrls).map(([key, url]) => {
                    const portalConfig = {
                      dashboard: { icon: Icons.Dashboard, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
                      broker: { icon: Icons.Users, label: 'Broker', color: 'from-purple-500 to-pink-500' },
                      carrier: { icon: Icons.Users, label: 'Carrier', color: 'from-green-500 to-emerald-500' },
                      driver: { icon: Icons.Users, label: 'Driver', color: 'from-orange-500 to-yellow-500' },
                      shipper: { icon: Icons.Users, label: 'Shipper', color: 'from-red-500 to-pink-500' },
                      admin: { icon: Icons.Settings, label: 'Admin', color: 'from-gray-500 to-slate-500' },
                      superAdmin: { icon: Icons.Crown, label: 'Super Admin', color: 'from-purple-500 to-violet-500' },
                      analytics: { icon: Icons.Analytics, label: 'Analytics', color: 'from-teal-500 to-cyan-500' },
                      autonomous: { icon: Icons.Brain, label: 'Autonomous', color: 'from-indigo-500 to-purple-500' },
                      factoring: { icon: Icons.Factoring, label: 'Factoring', color: 'from-blue-500 to-indigo-500' },
                      ownerOperator: { icon: Icons.OwnerOperator, label: 'Owner Operator', color: 'from-indigo-500 to-blue-500' }
                    }[key];

                    // Skip rendering if portal config is not found
                    if (!portalConfig) {
                      console.warn(`Portal configuration not found for key: ${key}`);
                      return null;
                    }

                    return (
                      <Button 
                        key={key}
                        variant="outline" 
                        className="h-20 flex-col bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-purple-300"
                        onClick={() => navigate(url)}
                      >
                        <span className="text-2xl mb-1">{portalConfig.icon}</span>
                        <span className="text-sm font-medium">{portalConfig.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{Icons.Rocket}</span>
                  Quick Actions
                  <Badge variant="secondary" className="ml-2">Power Tools</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="default" className="h-20 flex-col bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg">
                    <span className="text-xl mb-1">{Icons.Security}</span>
                    <span className="text-sm font-medium">Security Audit</span>
                    <span className="text-xs opacity-90">System Security</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                    <span className="text-xl mb-1">{Icons.Backup}</span>
                    <span className="text-sm font-medium">Database Backup</span>
                    <span className="text-xs opacity-90">Data Protection</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                    <span className="text-xl mb-1">{Icons.Update}</span>
                    <span className="text-sm font-medium">System Update</span>
                    <span className="text-xs opacity-90">Version Control</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                    <span className="text-xl mb-1">{Icons.API}</span>
                    <span className="text-sm font-medium">API Management</span>
                    <span className="text-xs opacity-90">Integration Control</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                    <span className="text-xl mb-1">{Icons.Logs}</span>
                    <span className="text-sm font-medium">Log Analysis</span>
                    <span className="text-xs opacity-90">System Monitoring</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                    <span className="text-xl mb-1">{Icons.Emergency}</span>
                    <span className="text-sm font-medium">Emergency Mode</span>
                    <span className="text-xs opacity-90">Crisis Management</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">© 2024 TMS Super Admin Portal</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Version 2.1.0</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Port: 8080</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                System Online
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Help}</span>
                <span>Help</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Settings}</span>
                <span>Settings</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-red-600 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Logout}</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperAdminPortal;
