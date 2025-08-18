import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// Import enhanced Radix UI components
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
  useToast
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

const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'user-management']);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [sidebarWidth, setSidebarWidth] = useState(280);

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
    <TooltipProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Enhanced Sidebar with Context Menu */}
        <ContextMenu>
          <ContextMenuTrigger>
            <motion.div
              initial={{ width: sidebarWidth }}
              animate={{ width: sidebarCollapsed ? 80 : sidebarWidth }}
              className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl relative"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-700">
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
                      <p className="text-slate-400 text-xs">System Control Center</p>
                    </div>
                  </motion.div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="text-slate-400 hover:text-white"
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
                              ? 'bg-slate-700 text-white'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
                                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">System Status</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-sm">Operational</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              {sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setSidebarWidth(320)}>
              Increase Width
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setSidebarWidth(240)}>
              Decrease Width
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => setSystemTheme(systemTheme === 'light' ? 'dark' : 'light')}>
              Toggle Theme
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header with Navigation Menu and Menubar */}
          <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Enhanced Radix UI
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Navigation Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>System</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  System Overview
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Complete system control and monitoring dashboard.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <div className="space-y-1">
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/system-monitoring"
                              >
                                <div className="text-sm font-medium leading-none">Monitoring</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Real-time system monitoring and alerts.
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/security-center"
                              >
                                <div className="text-sm font-medium leading-none">Security</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Security monitoring and access controls.
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/reports"
                              >
                                <div className="text-sm font-medium leading-none">Reports</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Comprehensive reporting and analytics.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Global Settings
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Configure system-wide settings and preferences.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <div className="space-y-1">
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/global-settings"
                              >
                                <div className="text-sm font-medium leading-none">Configuration</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  System configuration and preferences.
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/portal-management"
                              >
                                <div className="text-sm font-medium leading-none">Portals</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Manage all system portals and access.
                                </p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="/super-admin/system-admin"
                              >
                                <div className="text-sm font-medium leading-none">Administration</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  System administration and maintenance.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Enhanced Menubar */}
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => setSystemTheme('light')}>
                        Light Theme
                      </MenubarItem>
                      <MenubarItem onClick={() => setSystemTheme('dark')}>
                        Dark Theme
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                        {sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Help</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Documentation</MenubarItem>
                      <MenubarItem>Support</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>About</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>

                {/* Theme Toggle */}
                <ToggleGroup type="single" value={systemTheme} onValueChange={(value) => value && setSystemTheme(value as 'light' | 'dark')}>
                  <ToggleGroupItem value="light" aria-label="Light theme">
                    ☀️
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" aria-label="Dark theme">
                    🌙
                  </ToggleGroupItem>
                </ToggleGroup>

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
    </TooltipProvider>
  );
};

export default EnhancedSuperAdminPortal;
