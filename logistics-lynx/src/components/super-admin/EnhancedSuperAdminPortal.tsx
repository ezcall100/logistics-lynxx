import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// UI Components
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

// Icons from lucide-react
import { 
  Brain, Shield, Users, Settings, Database, Globe, Activity, 
  BarChart3, Lock, Search, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Server, Network, Zap, Eye, EyeOff, RefreshCw,
  Play, Pause, Stop, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  LogOut, Sun, Moon, ChevronDown, ChevronLeft, ChevronRight,
  Home, Building2, Phone, Mail, MapPin, Calendar, DollarSign,
  Truck, Package, Car, Briefcase, Calculator, FileText,
  ShieldCheck, Key, Fingerprint, Wifi, HardDrive, Cpu,
  Memory, HardDriveIcon, WifiOff, AlertCircle, Info,
  ExternalLink, Copy, Share2, Maximize2, Minimize2
} from 'lucide-react';

// Custom Logo Component
import TransBotLogo from '../ui/TransBotLogo';

// Autonomous System Integration
const AutonomousSystem = {
  status: 'operational',
  agents: {
    total: 24,
    active: 22,
    idle: 2,
    error: 0
  },
  performance: {
    cpu: 68,
    memory: 72,
    storage: 45,
    network: 89
  },
  alerts: [
    { id: 1, type: 'info', message: 'System optimization in progress', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '10 min ago' }
  ]
};

// Enhanced Super Admin Portal
const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'autonomous']);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('super-admin-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('super-admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Navigation structure with autonomous focus
  const navigationItems = [
    {
      id: 'dashboard',
      title: 'Command Center',
      icon: Brain,
      path: '/super-admin',
      description: 'System overview and autonomous status'
    },
    {
      id: 'autonomous',
      title: 'Autonomous System',
      icon: Zap,
      path: '/super-admin/autonomous',
      description: 'AI agents and autonomous operations',
      subItems: [
        { title: 'Agent Dashboard', path: '/super-admin/autonomous/agents', icon: Brain },
        { title: 'Performance Monitor', path: '/super-admin/autonomous/performance', icon: Activity },
        { title: 'Learning Models', path: '/super-admin/autonomous/models', icon: TrendingUp },
        { title: 'Decision Logs', path: '/super-admin/autonomous/decisions', icon: FileText },
        { title: 'Auto-Scaling', path: '/super-admin/autonomous/scaling', icon: Maximize2 }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      path: '/super-admin/users',
      description: 'Manage users, roles, and permissions',
      subItems: [
        { title: 'All Users', path: '/super-admin/users/all', icon: Users },
        { title: 'Role Management', path: '/super-admin/users/roles', icon: Shield },
        { title: 'Access Control', path: '/super-admin/users/access', icon: Lock },
        { title: 'User Analytics', path: '/super-admin/users/analytics', icon: BarChart3 }
      ]
    },
    {
      id: 'system',
      title: 'System Control',
      icon: Settings,
      path: '/super-admin/system',
      description: 'System configuration and monitoring',
      subItems: [
        { title: 'System Health', path: '/super-admin/system/health', icon: Activity },
        { title: 'Database Admin', path: '/super-admin/system/database', icon: Database },
        { title: 'Network Config', path: '/super-admin/system/network', icon: Network },
        { title: 'Security Center', path: '/super-admin/system/security', icon: ShieldCheck },
        { title: 'Backup & Restore', path: '/super-admin/system/backup', icon: Save }
      ]
    },
    {
      id: 'portals',
      title: 'Portal Management',
      icon: Building2,
      path: '/super-admin/portals',
      description: 'Manage all system portals'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: BarChart3,
      path: '/super-admin/analytics',
      description: 'Comprehensive system analytics'
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Main Dashboard Component
  const DashboardPage = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Super Admin Command Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Autonomous TMS System Control & Monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            System Operational
          </Badge>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Autonomous System Status */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <TransBotLogo size="md" animated={true} />
            <div>
              <CardTitle className="text-xl">Autonomous System Status</CardTitle>
              <CardDescription>Real-time AI agent monitoring and control</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Agent Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Agents</span>
                <Badge variant="outline">{AutonomousSystem.agents.active}/{AutonomousSystem.agents.total}</Badge>
              </div>
              <Progress value={(AutonomousSystem.agents.active / AutonomousSystem.agents.total) * 100} />
            </div>

            {/* Performance Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm font-bold">{AutonomousSystem.performance.cpu}%</span>
              </div>
              <Progress value={AutonomousSystem.performance.cpu} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm font-bold">{AutonomousSystem.performance.memory}%</span>
              </div>
              <Progress value={AutonomousSystem.performance.memory} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network</span>
                <span className="text-sm font-bold">{AutonomousSystem.performance.network}%</span>
              </div>
              <Progress value={AutonomousSystem.performance.network} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/super-admin/autonomous/agents')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Agent Management</CardTitle>
                <CardDescription>Monitor and control AI agents</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/super-admin/users/all')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">User Management</CardTitle>
                <CardDescription>Manage users and permissions</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/super-admin/system/health')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">System Health</CardTitle>
                <CardDescription>Monitor system performance</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Recent System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {AutonomousSystem.alerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                <div className={`p-1 rounded-full ${
                  alert.type === 'success' ? 'bg-green-100' :
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {alert.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                   alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                   <Info className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
                <TransBotLogo size="sm" animated={true} />
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Super Admin
                  </h1>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Command Center</p>
                </div>
              </motion.div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="transition-all duration-300"
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleGroup(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        expandedGroups.includes(item.id)
                          ? 'bg-blue-100 text-blue-900 shadow-lg' 
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        {!sidebarCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          expandedGroups.includes(item.id) ? 'rotate-180' : ''
                        }`} />
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
                              className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-300 ${
                                location.pathname === subItem.path
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'hover:bg-slate-100'
                              }`}
                            >
                              <subItem.icon className="w-4 h-4" />
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
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-900 shadow-lg' 
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* System Status Footer */}
          {!sidebarCollapsed && (
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            } flex-shrink-0`}>
              <div className="text-center">
                <p className="text-xs text-slate-500">System Status</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 text-sm font-medium">Operational</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className={`shadow-lg border-b transition-all duration-500 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } flex-shrink-0`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">
                  {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Enhanced UI
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="transition-all duration-300"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="flex items-center gap-3 p-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Super Administrator</p>
                        <p className="text-xs text-muted-foreground">system@transbot.ai</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-2 space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        System Preferences
                      </Button>
                      <Separator />
                      <Button variant="ghost" className="w-full justify-start text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
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
                  <Route path="/autonomous/*" element={<DashboardPage />} />
                  <Route path="/users/*" element={<DashboardPage />} />
                  <Route path="/system/*" element={<DashboardPage />} />
                  <Route path="/portals" element={<DashboardPage />} />
                  <Route path="/analytics" element={<DashboardPage />} />
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
