import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// Import basic UI components that we know exist
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

// Import all Super Admin pages
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import SystemAdminPage from './pages/SystemAdminPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import SystemMonitoringPage from './pages/SystemMonitoringPage';
import PortalManagementPage from './pages/PortalManagementPage';
import ReportsPage from './pages/ReportsPage';
import GlobalSettingsPage from './pages/GlobalSettingsPage';

const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'user-management']);
  
  // Fixed dark mode with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('super-admin-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('super-admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Navigation structure with Radix-style icons
  const navigationItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      path: '/super-admin',
      description: 'System overview and key metrics'
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: '👥',
      path: '/super-admin/user-management',
      description: 'Manage users, roles, and permissions',
      subItems: [
        { title: 'All Users', path: '/super-admin/user-management/all-users', icon: '👤' },
        { title: 'Active Users', path: '/super-admin/user-management/active-users', icon: '✅' },
        { title: 'Pending Users', path: '/super-admin/user-management/pending-users', icon: '⏳' },
        { title: 'Suspended Users', path: '/super-admin/user-management/suspended-users', icon: '🚫' },
        { title: 'Role Management', path: '/super-admin/user-management/role-management', icon: '🎭' },
        { title: 'Permissions', path: '/super-admin/user-management/permissions', icon: '🔐' },
        { title: 'User Groups', path: '/super-admin/user-management/user-groups', icon: '🏢' }
      ]
    },
    {
      id: 'system-admin',
      title: 'System Admin',
      icon: '⚙️',
      path: '/super-admin/system-admin',
      description: 'System configuration and administration',
      subItems: [
        { title: 'Database Management', path: '/super-admin/system-admin/database', icon: '🗄️' },
        { title: 'API Management', path: '/super-admin/system-admin/api', icon: '🔌' },
        { title: 'Network Settings', path: '/super-admin/system-admin/network', icon: '🌐' },
        { title: 'File Management', path: '/super-admin/system-admin/files', icon: '📁' },
        { title: 'Backup & Restore', path: '/super-admin/system-admin/backup', icon: '💾' },
        { title: 'System Updates', path: '/super-admin/system-admin/updates', icon: '🔄' }
      ]
    },
    {
      id: 'security-center',
      title: 'Security Center',
      icon: '🔒',
      path: '/super-admin/security-center',
      description: 'Security monitoring and controls',
      subItems: [
        { title: 'Security Audit', path: '/super-admin/security-center/audit', icon: '🔍' },
        { title: 'Access Control', path: '/super-admin/security-center/access-control', icon: '🚪' },
        { title: 'Encryption', path: '/super-admin/security-center/encryption', icon: '🔐' },
        { title: 'Firewall', path: '/super-admin/security-center/firewall', icon: '🔥' },
        { title: 'MFA Settings', path: '/super-admin/security-center/mfa', icon: '📱' },
        { title: 'IP Whitelist', path: '/super-admin/security-center/ip-whitelist', icon: '🌍' }
      ]
    },
    {
      id: 'system-monitoring',
      title: 'System Monitoring',
      icon: '📈',
      path: '/super-admin/system-monitoring',
      description: 'Real-time system monitoring and alerts'
    },
    {
      id: 'portal-management',
      title: 'Portal Management',
      icon: '🏛️',
      path: '/super-admin/portal-management',
      description: 'Manage all system portals and access'
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: '📊',
      path: '/super-admin/reports',
      description: 'Comprehensive reporting and analytics'
    },
    {
      id: 'global-settings',
      title: 'Global Settings',
      icon: '🎛️',
      path: '/super-admin/global-settings',
      description: 'Global system configuration'
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  useEffect(() => {
    // Auto-expand the current section
    const currentPath = location.pathname;
    const currentGroup = navigationItems.find(item => 
      currentPath.startsWith(item.path)
    );
    
    if (currentGroup && !expandedGroups.includes(currentGroup.id)) {
      setExpandedGroups(prev => [...prev, currentGroup.id]);
    }
  }, [location.pathname, expandedGroups]);

  return (
    <TooltipProvider>
      <div className={`flex h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'dark bg-slate-900 text-slate-100' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900'
      }`}>
        {/* Enhanced Sidebar */}
        <motion.div
          initial={{ width: 280 }}
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className={`${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } shadow-2xl flex flex-col border-r transition-all duration-500`}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className={`p-4 border-b ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          } flex-shrink-0`}>
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Super Admin</h1>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Command Center</p>
                </div>
              </motion.div>
              
              {/* Enhanced Toggle Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    } transition-all duration-300 rounded-lg p-2`}
                  >
                    <motion.div
                      animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg"
                    >
                      {sidebarCollapsed ? '◀' : '▶'}
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleGroup(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                            expandedGroups.includes(item.id)
                              ? isDarkMode 
                                ? 'bg-slate-700 text-white shadow-lg' 
                                : 'bg-slate-100 text-slate-900 shadow-lg'
                              : isDarkMode
                                ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            {!sidebarCollapsed && (
                              <span className="font-medium">{item.title}</span>
                            )}
                          </div>
                          {!sidebarCollapsed && (
                            <motion.span
                              animate={{ rotate: expandedGroups.includes(item.id) ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-sm"
                            >
                              ▼
                            </motion.span>
                          )}
                        </button>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                    
                    <AnimatePresence>
                      {expandedGroups.includes(item.id) && !sidebarCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-8 mt-2 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <Tooltip key={subItem.path}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => navigate(subItem.path)}
                                  className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-300 ${
                                    location.pathname === subItem.path
                                      ? 'bg-blue-600 text-white shadow-md'
                                      : isDarkMode
                                        ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                  }`}
                                >
                                  <span className="text-lg">{subItem.icon}</span>
                                  <span>{subItem.title}</span>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{subItem.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? isDarkMode 
                              ? 'bg-slate-700 text-white shadow-lg' 
                              : 'bg-slate-100 text-slate-900 shadow-lg'
                            : isDarkMode
                              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {!sidebarCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </button>
                    </TooltipTrigger>
                    {sidebarCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </div>
            ))}
          </nav>

          {/* Enhanced System Status Footer */}
          {!sidebarCollapsed && (
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            } flex-shrink-0`}>
              <div className="text-center">
                <p className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>System Status</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-400 text-sm font-medium">Operational</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className={`shadow-lg border-b transition-all duration-500 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } flex-shrink-0`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
                </h2>
                <Badge variant="secondary" className={`${
                  isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                } font-medium`}>
                  Enhanced UI
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Theme Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`${
                        isDarkMode 
                          ? 'text-slate-300 hover:bg-slate-700' 
                          : 'text-slate-600 hover:bg-slate-100'
                      } transition-all duration-300 rounded-lg p-2`}
                    >
                      <motion.div
                        animate={{ rotate: isDarkMode ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl"
                      >
                        {isDarkMode ? '☀️' : '🌙'}
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Enhanced User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className={`relative h-10 w-10 rounded-full transition-all duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-slate-700' 
                        : 'hover:bg-slate-100'
                    }`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end" forceMount>
                    <div className="flex items-center justify-start gap-3 p-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-semibold leading-none">Super Administrator</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          system@logistics-lynx.com
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-1 p-2">
                      <Button variant="ghost" className="justify-start hover:bg-slate-100 dark:hover:bg-slate-700">
                        👤 Profile Settings
                      </Button>
                      <Button variant="ghost" className="justify-start hover:bg-slate-100 dark:hover:bg-slate-700">
                        ⚙️ System Preferences
                      </Button>
                      <Separator />
                      <Button variant="ghost" className="justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        🚪 Sign Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/user-management/*" element={<UserManagementPage />} />
                  <Route path="/system-admin/*" element={<SystemAdminPage />} />
                  <Route path="/security-center/*" element={<SecurityCenterPage />} />
                  <Route path="/system-monitoring" element={<SystemMonitoringPage />} />
                  <Route path="/portal-management" element={<PortalManagementPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/global-settings" element={<GlobalSettingsPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedSuperAdminPortal;
