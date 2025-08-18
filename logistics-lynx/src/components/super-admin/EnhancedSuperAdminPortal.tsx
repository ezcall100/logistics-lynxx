import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';

// Import enhanced UI components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ToggleGroup,
  ToggleGroupItem,
  Slider,
  RadioGroup,
  RadioGroupItem,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
  Separator,
  Switch,
  useToast,
  toast,
} from '@/components/ui/enhanced-ui-index';

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

const EnhancedSuperAdminPortal = () => {
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
  }, [location.pathname, expandedGroups]);

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

  const navigationItems: NavigationItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/super-admin'
    },
    {
      key: 'users',
      label: 'User Management',
      icon: '👥',
      children: [
        { key: 'all-users', label: 'All Users', icon: '👤', path: '/super-admin/users' },
        { key: 'active-users', label: 'Active Users', icon: '✅', path: '/super-admin/users/active' },
        { key: 'pending-users', label: 'Pending Users', icon: '⏳', path: '/super-admin/users/pending' },
        { key: 'suspended-users', label: 'Suspended Users', icon: '❌', path: '/super-admin/users/suspended' },
        { key: 'roles', label: 'Role Management', icon: '🔐', path: '/super-admin/users/roles' },
        { key: 'permissions', label: 'Permissions', icon: '🔑', path: '/super-admin/users/permissions' },
        { key: 'user-groups', label: 'User Groups', icon: '👥', path: '/super-admin/users/groups' }
      ]
    },
    {
      key: 'system',
      label: 'System Administration',
      icon: '⚙️',
      children: [
        { key: 'database', label: 'Database Management', icon: '🗄️', path: '/super-admin/system/database' },
        { key: 'api', label: 'API Management', icon: '🔌', path: '/super-admin/system/api' },
        { key: 'network', label: 'Network Settings', icon: '🌐', path: '/super-admin/system/network' },
        { key: 'files', label: 'File Management', icon: '📁', path: '/super-admin/system/files' },
        { key: 'backup', label: 'Backup & Restore', icon: '💾', path: '/super-admin/system/backup' },
        { key: 'updates', label: 'System Updates', icon: '🔄', path: '/super-admin/system/updates' }
      ]
    },
    {
      key: 'security',
      label: 'Security Center',
      icon: '🔒',
      children: [
        { key: 'audit', label: 'Security Audit', icon: '🔍', path: '/super-admin/security/audit' },
        { key: 'access-control', label: 'Access Control', icon: '🚪', path: '/super-admin/security/access-control' },
        { key: 'encryption', label: 'Encryption', icon: '🔐', path: '/super-admin/security/encryption' },
        { key: 'firewall', label: 'Firewall', icon: '🔥', path: '/super-admin/security/firewall' },
        { key: 'mfa', label: 'MFA Settings', icon: '📱', path: '/super-admin/security/mfa' },
        { key: 'ip-whitelist', label: 'IP Whitelist', icon: '🌍', path: '/super-admin/security/ip-whitelist' }
      ]
    },
    {
      key: 'monitoring',
      label: 'System Monitoring',
      icon: '📈',
      path: '/super-admin/monitoring'
    },
    {
      key: 'portals',
      label: 'Portal Management',
      icon: '🌐',
      path: '/super-admin/portals'
    },
    {
      key: 'reports',
      label: 'Reports & Analytics',
      icon: '📊',
      path: '/super-admin/reports'
    },
    {
      key: 'settings',
      label: 'Global Settings',
      icon: '⚙️',
      path: '/super-admin/settings'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-purple-600 font-medium">Loading Super Admin Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Enhanced Top Navigation Bar */}
        <header className="h-16 border-b bg-white/80 backdrop-blur-sm px-4 lg:px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors lg:hidden"
              >
                <span className="text-lg">☰</span>
              </Button>
            )}
            
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/crown-icon.png" alt="Super Admin" />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  👑
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <span className="text-sm font-medium">Super Admin Portal</span>
                <span className="text-slate-400 hidden lg:block text-xs">▼</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Enhanced Command Palette */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <span>🔍</span>
                  <span className="hidden md:block">Search...</span>
                  <kbd className="text-xs bg-slate-200 px-1 rounded hidden lg:block">⌘K</kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search across all systems</p>
              </TooltipContent>
            </Tooltip>

            {/* Enhanced Quick Actions */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>⚡</span>
                  <span className="hidden sm:block">Quick Actions</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">Security Audit</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Database Backup</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">System Update</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">API Management</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Log Analysis</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Emergency Mode</Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Enhanced Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                  <span className="text-lg">🔔</span>
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                    {notifications.length}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Notifications</h4>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
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
              </PopoverContent>
            </Popover>

            {/* Enhanced Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="text-lg">⚙️</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            {/* Enhanced Profile */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/admin-avatar.png" alt="Super Admin" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden sm:block">Super Admin</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.png" alt="Super Admin" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Super Admin</p>
                      <p className="text-xs text-slate-500">superadmin@company.com</p>
                    </div>
                  </div>
                  <Separator />
                  <Button variant="ghost" size="sm" className="w-full justify-start">Profile Settings</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Security Settings</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <div className="flex">
          {/* Enhanced Sidebar */}
          <motion.aside
            initial={false}
            animate={{
              width: sidebarCollapsed ? '4rem' : '16rem',
              opacity: sidebarMobileOpen ? 1 : isMobile ? 0 : 1,
              x: sidebarMobileOpen ? 0 : isMobile ? '-100%' : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed lg:relative z-40 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* System Stats Cards */}
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <Card className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-green-100 rounded">
                          <span className="text-green-600 text-xs">✅</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium">System Health</p>
                          <p className="text-xs text-green-600">{systemStats.health}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-blue-100 rounded">
                          <span className="text-blue-600 text-xs">👥</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Active Users</p>
                          <p className="text-xs text-blue-600">{systemStats.users}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.key}>
                    {item.children ? (
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            expandedGroups.has(item.key) ? 'bg-purple-50 text-purple-700' : ''
                          }`}
                          onClick={() => toggleGroup(item.key)}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {!sidebarCollapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              <span className={`transform transition-transform ${
                                expandedGroups.has(item.key) ? 'rotate-180' : ''
                              }`}>
                                ▼
                              </span>
                            </>
                          )}
                        </Button>
                        
                        <AnimatePresence>
                          {expandedGroups.has(item.key) && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 space-y-1 mt-1"
                            >
                              {item.children.map((child) => (
                                <Button
                                  key={child.key}
                                  variant="ghost"
                                  size="sm"
                                  className={`w-full justify-start text-xs ${
                                    location.pathname === child.path ? 'bg-purple-100 text-purple-700' : ''
                                  }`}
                                  onClick={() => navigate(child.path)}
                                >
                                  <span className="mr-2">{child.icon}</span>
                                  <span className="flex-1 text-left">{child.label}</span>
                                  {child.badge && (
                                    <Badge variant="secondary" className="ml-auto text-xs">
                                      {child.badge}
                                    </Badge>
                                  )}
                                </Button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-sm ${
                          location.pathname === item.path ? 'bg-purple-100 text-purple-700' : ''
                        }`}
                        onClick={() => navigate(item.path || '/super-admin')}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {!sidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
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
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedSuperAdminPortal;
