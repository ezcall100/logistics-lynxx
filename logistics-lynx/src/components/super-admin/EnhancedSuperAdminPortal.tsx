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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Navigation structure
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
        { title: 'Role Management', path: '/super-admin/user-management/role-management', icon: '🔐' },
        { title: 'Permissions', path: '/super-admin/user-management/permissions', icon: '🔑' },
        { title: 'User Groups', path: '/super-admin/user-management/user-groups', icon: '👥' }
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
      icon: '⚙️',
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
    <div className={`flex h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Enhanced Sidebar */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className={`${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'} text-white shadow-xl`}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-slate-700'}`}>
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Super Admin</h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`}>System Control Center</p>
              </div>
            </motion.div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {sidebarCollapsed ? '→' : '←'}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.id}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      expandedGroups.includes(item.id)
                        ? `${isDarkMode ? 'bg-gray-700' : 'bg-slate-700'} text-white`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-slate-300 hover:bg-slate-800'} hover:text-white`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      <span className={`transition-transform duration-200 ${
                        expandedGroups.includes(item.id) ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedGroups.includes(item.id) && !sidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-8 mt-2 space-y-1"
                      >
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => navigate(subItem.path)}
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-200 ${
                              location.pathname === subItem.path
                                ? 'bg-blue-600 text-white'
                                : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-400 hover:bg-slate-800'} hover:text-white`
                            }`}
                          >
                            <span>{subItem.icon}</span>
                            <span>{subItem.title}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? `${isDarkMode ? 'bg-gray-700' : 'bg-slate-700'} text-white`
                      : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-slate-300 hover:bg-slate-800'} hover:text-white`
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-slate-700'}`}>
            <div className="text-center">
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`}>System Status</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm">Operational</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className={`shadow-sm border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
              </h2>
              <Badge variant="secondary" className={`${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                Enhanced UI
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </Button>

              {/* User Menu */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Super Administrator</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        system@logistics-lynx.com
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-1 p-2">
                    <Button variant="ghost" className="justify-start">
                      Profile Settings
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      System Preferences
                    </Button>
                    <Separator />
                    <Button variant="ghost" className="justify-start text-red-600">
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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
  );
};

export default EnhancedSuperAdminPortal;
