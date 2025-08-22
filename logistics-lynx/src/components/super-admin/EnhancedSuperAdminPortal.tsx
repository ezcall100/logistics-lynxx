import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { useTheme } from '@/components/theme-provider';

// Import MCP Design System
import '@/styles/mcp-design-system.css';
import '@/styles/super-admin-colors.css';

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

// Icons from lucide-react
import { 
  Brain, Shield, Users, Settings, Database, Globe, Activity, 
  BarChart3, Lock, Search, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Server, Network, Zap, Eye, EyeOff, RefreshCw,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  LogOut, Sun, Moon, ChevronDown, ChevronLeft, ChevronRight,
  Home, Building2, Phone, Mail, MapPin, Calendar, DollarSign,
  Truck, Package, Car, Briefcase, Calculator, FileText,
  ShieldCheck, Key, Fingerprint, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Folder, Cog, Wrench, UserCheck, UserX, ShieldX,
  ArrowUpRight, ArrowDownRight, Minus, XCircle,
  Link, Heart, TrendingDown, PieChart,
  LineChart, BarChart4, ScatterChart, ActivitySquare,
  CalendarDays, Target, Award, Trophy,
  Share, Unlock, Settings2,
     LayoutDashboard, Code, Bug, Palette, Maximize2, Menu,
   CircuitBoard, BookOpen, HelpCircle, Rocket, Command
} from 'lucide-react';

// Custom Logo Components
import TransBotLogo from '../ui/TransBotLogo';
import TransBotHeaderLogo from './ui/TransBotHeaderLogo';

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

// Import engineering agent pages
import FrontendDeveloperPage from './pages/FrontendDeveloperPage';
import BackendAPIPage from './pages/BackendAPIPage';
import QATestingPage from './pages/QATestingPage';
import UIUXDesignerPage from './pages/UIUXDesignerPage';
import DevOpsPage from './pages/DevOpsPage';
import DatabaseOptimizerPage from './pages/DatabaseOptimizerPage';
import SecurityScannerPage from './pages/SecurityScannerPage';
import PerformanceMonitorPage from './pages/PerformanceMonitorPage';

// Import autonomous dashboard page
import AutonomousDashboardPage from '../../pages/AutonomousDashboardPage';

// Import user management page
import UserManagementPage from '../../pages/super-admin/UserManagementPage';
import AllUsersPage from './pages/user-management/AllUsersPage';
import ColorTestPage from './pages/ColorTestPage';
import FABTestPage from './pages/FABTestPage';
import UIComponentsDemoPage from './pages/UIComponentsDemoPage';
import ComponentPlaygroundPage from './pages/ComponentPlaygroundPage';

// Import Floating Action Button
import { FloatingActionButton } from '../admin/FloatingActionButton';

// Import system control pages
import SystemHealthPage from '../../pages/SystemHealthPage';
import DatabaseAdminPage from '../../pages/super-admin/DatabaseAdminPage';
import NetworkConfigPage from '../../pages/super-admin/NetworkConfigPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import BackupRestorePage from './pages/system-admin/BackupRestorePage';
import PortalOverviewPage from './pages/PortalOverviewPage';
import AllPortalsPage from './pages/AllPortalsPage';
import PortalCategoriesPage from './pages/PortalCategoriesPage';
import PortalMonitoringPage from './pages/PortalMonitoringPage';
import PortalSettingsPage from './pages/PortalSettingsPage';
import PortalAnalyticsPage from './pages/PortalAnalyticsPage';
import PortalSecurityPage from './pages/PortalSecurityPage';
import PortalBackupPage from './pages/PortalBackupPage';
import PortalUsersPage from './pages/PortalUsersPage';
import PortalConfigurationsPage from './pages/PortalConfigurationsPage';
import AnalyticsReportsPage from './pages/AnalyticsReportsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MCPControlCenter from './pages/MCPControlCenter';
import MCPIntroductionPage from './pages/MCPIntroductionPage';
import MCPFeaturesPage from './pages/MCPFeaturesPage';
import MCPIntegrationsPage from './pages/MCPIntegrationsPage';
import MCPDocumentationPage from './pages/MCPDocumentationPage';
import MCPSupportPage from './pages/MCPSupportPage';
import MCPAgentRegistryPage from './pages/MCPAgentRegistryPage';
import MCPSystemMonitorPage from './pages/MCPSystemMonitorPage';
import MCPSecurityHubPage from './pages/MCPSecurityHubPage';
import MCPPerformanceAnalyticsPage from './pages/MCPPerformanceAnalyticsPage';
import MCPConfigurationManagerPage from './pages/MCPConfigurationManagerPage';
import MCPBackupRecoveryPage from './pages/MCPBackupRecoveryPage';
import MCPAPIGatewayPage from './pages/MCPAPIGatewayPage';
import MCPLogManagementPage from './pages/MCPLogManagementPage';
import MCPAlertCenterPage from './pages/MCPAlertCenterPage';
import MCPDeploymentManagerPage from './pages/MCPDeploymentManagerPage';
import MCPCommanderPage from './pages/MCPCommanderPage';

// Enhanced Super Admin Portal
const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'autonomous']);
  const { theme, setTheme, isDark } = useTheme();
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);

  // Desktop persistent sidebar behavior
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
      setIsDesktop(matches);
      setMobileSidebarOpen(false);
    };
    handler(mq);
    mq.addEventListener('change', handler as (ev: MediaQueryListEvent) => void);
    return () => mq.removeEventListener('change', handler as (ev: MediaQueryListEvent) => void);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const toggleButton = document.getElementById('mobile-toggle');
      if (sidebar && !sidebar.contains(event.target as Node) && 
          toggleButton && !toggleButton.contains(event.target as Node)) {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      id: 'engineering',
      title: 'Engineering Suite',
      icon: LayoutDashboard,
      path: '/super-admin/engineering',
      description: 'End-to-end engineering operations',
      subItems: [
        { title: 'Frontend Developer', path: '/super-admin/engineering/frontend', icon: Code },
        { title: 'Backend API Agent', path: '/super-admin/engineering/backend', icon: Server },
        { title: 'QA Testing Agent', path: '/super-admin/engineering/qa', icon: Bug },
        { title: 'UI/UX Designer', path: '/super-admin/engineering/design', icon: Palette },
        { title: 'DevOps Agent', path: '/super-admin/engineering/devops', icon: Settings },
        { title: 'Database Optimizer', path: '/super-admin/engineering/database', icon: Database },
        { title: 'Security Scanner', path: '/super-admin/engineering/security', icon: ShieldCheck },
        { title: 'Performance Monitor', path: '/super-admin/engineering/performance', icon: Activity }
      ]
    },
    {
      id: 'autonomous',
      title: 'Autonomous System',
      icon: Zap,
      path: '/super-admin/autonomous',
      description: 'AI agents and autonomous operations',
      subItems: [
        { title: 'Agent Dashboard', path: '/super-admin/autonomous/agent-dashboard', icon: Brain },
        { title: 'Performance Monitor', path: '/super-admin/autonomous/performance-monitor', icon: Activity },
        { title: 'Learning Models', path: '/super-admin/autonomous/learning-models', icon: TrendingUp },
        { title: 'Decision Logs', path: '/super-admin/autonomous/decision-logs', icon: FileText },
        { title: 'Auto-Scaling', path: '/super-admin/autonomous/auto-scaling', icon: Maximize2 }
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
      description: 'Manage all system portals',
      subItems: [
        { title: 'Portal Overview', path: '/super-admin/portals/overview', icon: LayoutDashboard },
        { title: 'All Portals', path: '/super-admin/portals/all', icon: Globe },
        { title: 'Portal Categories', path: '/super-admin/portals/categories', icon: Folder },
        { title: 'Portal Monitoring', path: '/super-admin/portals/monitoring', icon: Activity },
        { title: 'Portal Settings', path: '/super-admin/portals/settings', icon: Settings },
        { title: 'Portal Analytics', path: '/super-admin/portals/analytics', icon: BarChart3 },
        { title: 'Portal Security', path: '/super-admin/portals/security', icon: Shield },
        { title: 'Portal Backup', path: '/super-admin/portals/backup', icon: Database },
        { title: 'Portal Users', path: '/super-admin/portals/users', icon: Users },
        { title: 'Portal Configurations', path: '/super-admin/portals/configurations', icon: Cog }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: BarChart3,
      path: '/super-admin/analytics',
      description: 'Comprehensive system analytics',
      subItems: [
        { title: 'Dashboard Analytics', path: '/super-admin/analytics/dashboard', icon: LayoutDashboard },
        { title: 'System Reports', path: '/super-admin/analytics/system-reports', icon: BarChart3 },
        { title: 'User Reports', path: '/super-admin/analytics/user-reports', icon: Users },
        { title: 'Performance Reports', path: '/super-admin/analytics/performance-reports', icon: TrendingUp },
        { title: 'Security Reports', path: '/super-admin/analytics/security-reports', icon: Shield },
        { title: 'Financial Reports', path: '/super-admin/analytics/financial-reports', icon: DollarSign },
        { title: 'Operational Reports', path: '/super-admin/analytics/operational-reports', icon: Activity },
        { title: 'Custom Reports', path: '/super-admin/analytics/custom-reports', icon: FileText },
        { title: 'Data Export', path: '/super-admin/analytics/data-export', icon: Download },
        { title: 'Report Scheduler', path: '/super-admin/analytics/report-scheduler', icon: Calendar }
      ]
    },
    {
      id: 'mcp',
      title: 'MCP Control Center',
      icon: CircuitBoard,
      path: '/super-admin/mcp',
      description: 'Master Control Program - System Management',
      subItems: [
        { title: 'Control Center', path: '/super-admin/mcp', icon: LayoutDashboard },
        { title: 'Introduction', path: '/super-admin/mcp/introduction', icon: Info },
        { title: 'Features', path: '/super-admin/mcp/features', icon: Zap },
        { title: 'Integrations', path: '/super-admin/mcp/integrations', icon: Link },
        { title: 'Documentation', path: '/super-admin/mcp/documentation', icon: BookOpen },
        { title: 'Support', path: '/super-admin/mcp/support', icon: HelpCircle },
        { title: 'Agent Registry', path: '/super-admin/mcp/agent-registry', icon: Users },
        { title: 'System Monitor', path: '/super-admin/mcp/system-monitor', icon: Activity },
        { title: 'Security Hub', path: '/super-admin/mcp/security-hub', icon: Shield },
        { title: 'Performance Analytics', path: '/super-admin/mcp/performance-analytics', icon: TrendingUp },
        { title: 'Configuration Manager', path: '/super-admin/mcp/configuration', icon: Settings },
        { title: 'Backup & Recovery', path: '/super-admin/mcp/backup-recovery', icon: Save },
        { title: 'API Gateway', path: '/super-admin/mcp/api-gateway', icon: Network },
        { title: 'Log Management', path: '/super-admin/mcp/log-management', icon: FileText },
        { title: 'Alert Center', path: '/super-admin/mcp/alert-center', icon: Bell },
                 { title: 'Deployment Manager', path: '/super-admin/mcp/deployment', icon: Rocket },
         { title: 'Commander', path: '/super-admin/mcp/commander', icon: Command }
      ]
    },
                      {
                    id: 'ui-demo',
                    title: 'UI Components Demo',
                    icon: BarChart3,
                    path: '/super-admin/ui-demo',
                    description: 'Showcase enhanced UI components and design patterns'
                  },
                  {
                    id: 'playground',
                    title: 'Component Playground',
                    icon: Settings,
                    path: '/super-admin/playground',
                    description: 'Interactive playground for testing all UI components and variants'
                  }
  ];

  const toggleGroup = (groupId: string) => {
    console.log('Toggling group:', groupId);
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Main Dashboard Component
  const DashboardPage = () => (
    <div className="p-6 md:p-8 space-y-8">
             {/* Hero Section with Live Status */}
      <div className="relative overflow-hidden rounded-lg bg-slate-900 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                                 <div className="relative">
                  <TransBotLogo size="lg" animated={false} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                 </div>
        <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Command Center
          </h1>
                  <p className="text-lg text-slate-300 mt-2">
                    Autonomous TMS System Control & Monitoring Hub
          </p>
        </div>
              </div>
              
              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Operational</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium">24/7 Monitoring</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm font-medium">AI Agents Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
          <Button 
                variant="outline" 
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={() => window.location.reload()}
          >
                <RefreshCw className="w-5 h-5 mr-2 text-blue-400" />
            Refresh
          </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => navigate('/super-admin/mcp')}
              >
                <CircuitBoard className="w-5 h-5 mr-2 text-yellow-400" />
                MCP Control
              </Button>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
              >
                <Activity className="w-5 h-5 mr-2 text-green-400" />
                Live View
          </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time System Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main System Status */}
        <div className="xl:col-span-3">
          <Card className={`border-0 shadow-2xl ${
        isDark 
              ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
              : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
      }`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
                                     <div className={`p-2 rounded-xl ${
                     isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                   }`}>
            <TransBotLogo size="md" animated={true} />
                   </div>
            <div>
                    <CardTitle className={`text-2xl ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Autonomous System Status</CardTitle>
              <CardDescription className={
                isDark ? 'text-slate-300' : 'text-slate-600'
              }>Real-time AI agent monitoring and control</CardDescription>
            </div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  All Systems Green
                </Badge>
          </div>
        </CardHeader>
        <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Agent Status */}
                <div className="space-y-4">
              <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>Active Agents</span>
                <Badge variant="outline" className={
                  isDark ? 'border-slate-600 text-slate-300' : ''
                }>{AutonomousSystem.agents.active}/{AutonomousSystem.agents.total}</Badge>
              </div>
                  <div className="space-y-2">
                    <Progress value={(AutonomousSystem.agents.active / AutonomousSystem.agents.total) * 100} className="h-3" />
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>AI Agents Operational</p>
                  </div>
            </div>

                {/* CPU Usage */}
                <div className="space-y-4">
              <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>CPU Usage</span>
                    <span className={`text-lg font-bold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>{AutonomousSystem.performance.cpu}%</span>
              </div>
                  <div className="space-y-2">
                    <Progress value={AutonomousSystem.performance.cpu} className="h-3" />
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>Optimal Performance</p>
                  </div>
            </div>

                {/* Memory Usage */}
                <div className="space-y-4">
              <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>Memory</span>
                    <span className={`text-lg font-bold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>{AutonomousSystem.performance.memory}%</span>
              </div>
                  <div className="space-y-2">
                    <Progress value={AutonomousSystem.performance.memory} className="h-3" />
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>Efficient Usage</p>
                  </div>
            </div>

                {/* Network */}
                <div className="space-y-4">
              <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>Network</span>
                    <span className={`text-lg font-bold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>{AutonomousSystem.performance.network}%</span>
              </div>
                  <div className="space-y-2">
                    <Progress value={AutonomousSystem.performance.network} className="h-3" />
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>High Bandwidth</p>
                  </div>
            </div>
          </div>
        </CardContent>
      </Card>
        </div>

        {/* Quick Actions Panel */}
        <Card className={`border-0 shadow-xl ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center space-x-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Zap className="w-6 h-6 text-yellow-500" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription className={
              isDark ? 'text-slate-300' : 'text-slate-600'
            }>Common system operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/super-admin/autonomous/agent-dashboard')}
            >
                             <Brain className="w-5 h-5 mr-3 text-purple-500" />
              <div>
                <div className="font-medium">Agent Dashboard</div>
                <div className="text-xs text-muted-foreground">Monitor AI agents</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/super-admin/system/health')}
            >
                             <Activity className="w-5 h-5 mr-3 text-green-500" />
              <div>
                <div className="font-medium">System Health</div>
                <div className="text-xs text-muted-foreground">Check performance</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/super-admin/users/all')}
            >
                             <Users className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <div className="font-medium">User Management</div>
                <div className="text-xs text-muted-foreground">Manage access</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/super-admin/analytics')}
            >
                             <BarChart3 className="w-5 h-5 mr-3 text-cyan-500" />
              <div>
                <div className="font-medium">Analytics Hub</div>
                <div className="text-xs text-muted-foreground">View reports</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-blue-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">127</p>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Active Reports</p>
                <p className="text-xs text-green-600 font-medium">+12% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-green-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-green-900/30' : 'bg-green-100'
              }`}>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">98.5%</p>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>System Uptime</p>
                <p className="text-xs text-green-600 font-medium">+2.3% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-purple-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">12</p>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Scheduled Tasks</p>
                <p className="text-xs text-blue-600 font-medium">3 running now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-orange-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-orange-900/30' : 'bg-orange-100'
              }`}>
                <Download className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">256</p>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Data Exports</p>
                <p className="text-xs text-orange-600 font-medium">+8 today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Monitoring & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced System Alerts */}
        <Card className={`border-0 shadow-xl ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center space-x-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Bell className="w-6 h-6 text-orange-500" />
              <span>Live System Alerts</span>
            </CardTitle>
            <CardDescription className={
              isDark ? 'text-slate-300' : 'text-slate-600'
            }>Real-time system notifications and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {AutonomousSystem.alerts.map((alert) => (
                <div key={alert.id} className={`flex items-center space-x-4 p-4 rounded-xl border ${
                  isDark ? 'border-slate-600 bg-slate-700' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className={`p-2 rounded-full ${
                    alert.type === 'success' ? (isDark ? 'bg-green-900/30' : 'bg-green-100') :
                    alert.type === 'warning' ? (isDark ? 'bg-yellow-900/30' : 'bg-yellow-100') :
                    (isDark ? 'bg-blue-900/30' : 'bg-blue-100')
                  }`}>
                    {alert.type === 'success' ? <CheckCircle className={`w-5 h-5 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} /> :
                     alert.type === 'warning' ? <AlertTriangle className={`w-5 h-5 ${
                       isDark ? 'text-yellow-400' : 'text-yellow-600'
                     }`} /> :
                     <Info className={`w-5 h-5 ${
                       isDark ? 'text-blue-400' : 'text-blue-600'
                     }`} />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-900'
                    }`}>{alert.message}</p>
                    <p className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Performance Metrics */}
        <Card className={`border-0 shadow-xl ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center space-x-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span>Performance Analytics</span>
            </CardTitle>
            <CardDescription className={
              isDark ? 'text-slate-300' : 'text-slate-600'
            }>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>Response Time</span>
                  <span className={`text-lg font-bold ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>45ms</span>
                </div>
                <Progress value={85} className="h-3" />
                <p className="text-xs text-green-600 font-medium">Excellent performance</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>Throughput</span>
                  <span className={`text-lg font-bold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>2.4k req/s</span>
                </div>
                <Progress value={92} className="h-3" />
                <p className="text-xs text-blue-600 font-medium">High capacity</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>Error Rate</span>
                  <span className={`text-lg font-bold ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`}>0.02%</span>
                </div>
                <Progress value={98} className="h-3" />
                <p className="text-xs text-red-600 font-medium">Minimal errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Access Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className={`border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-102 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'
        }`} onClick={() => navigate('/super-admin/autonomous/agent-dashboard')}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                                 <Brain className={`w-8 h-8 ${
                   isDark ? 'text-purple-400' : 'text-purple-600'
                 }`} />
              </div>
              <div>
                <CardTitle className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Agent Management</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Monitor and control AI agents</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Active Agents: 22/24</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-green-50'
        }`} onClick={() => navigate('/super-admin/users/all')}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-green-900/30' : 'bg-green-100'
              }`}>
                                 <Users className={`w-8 h-8 ${
                   isDark ? 'text-blue-400' : 'text-blue-600'
                 }`} />
              </div>
              <div>
                <CardTitle className={`text-xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>User Management</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Manage users and permissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Total Users: 1,247</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-purple-50'
        }`} onClick={() => navigate('/super-admin/system/health')}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                                 <Activity className={`w-8 h-8 ${
                   isDark ? 'text-green-400' : 'text-green-600'
                 }`} />
              </div>
              <div>
                <CardTitle className={`text-xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>System Health</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Monitor system performance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Health Score: 98.5%</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
      </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-orange-50'
        }`} onClick={() => navigate('/super-admin/analytics')}>
        <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-orange-900/30' : 'bg-orange-100'
              }`}>
                                 <BarChart3 className={`w-8 h-8 ${
                   isDark ? 'text-cyan-400' : 'text-cyan-600'
                 }`} />
              </div>
              <div>
                <CardTitle className={`text-xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Analytics Hub</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Comprehensive system analytics</CardDescription>
              </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Reports: 127 Active</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-indigo-50'
        }`} onClick={() => navigate('/super-admin/engineering')}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'
              }`}>
                <Code className={`w-8 h-8 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                </div>
              <div>
                <CardTitle className={`text-xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Engineering Suite</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Development and deployment tools</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Tools: 8 Available</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
                </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-pink-50'
        }`} onClick={() => navigate('/super-admin/portals')}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-pink-900/30' : 'bg-pink-100'
              }`}>
                <Building2 className={`w-8 h-8 ${
                  isDark ? 'text-pink-400' : 'text-pink-600'
                }`} />
              </div>
              <div>
                <CardTitle className={`text-xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Portal Management</CardTitle>
                <CardDescription className={
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }>Manage all system portals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Portals: 15 Active</span>
              <ArrowUpRight className={`w-5 h-5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className={`flex h-screen transition-all duration-700 ${
        isDark 
          ? 'dark bg-slate-900 text-slate-100' 
          : 'bg-slate-50 text-slate-900'
      }`}>
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && !isDesktop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Enhanced Sidebar */}
        <motion.div
          id="mobile-sidebar"
          initial={{ x: isDesktop ? 0 : -320 }}
          animate={{ 
            x: isDesktop ? 0 : (mobileSidebarOpen ? 0 : -320),
            width: sidebarCollapsed ? 88 : 320 
          }}
          className={`${isDesktop ? 'relative' : 'fixed'} z-50 ${
            isDark 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } shadow-lg flex flex-col border-r transition-all duration-700 h-full`}
        >
          {/* Enhanced Header */}
          <div className={`p-6 border-b ${
            isDark ? 'border-slate-700' : 'border-slate-200'
          } flex-shrink-0 bg-white dark:bg-slate-800`}>
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                className="flex items-center space-x-4"
              >
                <div className="relative">
                  <TransBotLogo size="sm" animated={false} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div>
                  <h1 className={`font-bold text-lg ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                     Trans Bot AI
                  </h1>
                  <p className={`text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                   }`}>Super Admin Portal</p>
                </div>
              </motion.div>
              
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`transition-all duration-300 rounded-md p-2 ${
                  isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
            </div>
          </div>

          {/* Enhanced Navigation with Radix Accordion */}
          <nav className="p-6 space-y-3 flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <Accordion 
                    type="single" 
                    collapsible 
                    value={expandedGroups.includes(item.id) ? item.id : undefined}
                    onValueChange={(value) => {
                      if (value === item.id) {
                        setExpandedGroups(prev => [...prev, item.id]);
                      } else {
                        setExpandedGroups(prev => prev.filter(id => id !== item.id));
                      }
                    }}
                  >
                    <AccordionItem value={item.id} className="border-none">
                      <AccordionTrigger className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group hover:no-underline ${
                            expandedGroups.includes(item.id)
                          ? isDark 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-blue-600 text-white shadow-md'
                          : isDark
                                ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-md transition-all duration-300 ${
                            expandedGroups.includes(item.id)
                              ? 'bg-white/20'
                              : isDark
                                ? 'bg-slate-700 group-hover:bg-slate-600'
                                : 'bg-slate-100 group-hover:bg-slate-200'
                          }`}>
                        <item.icon className={`w-5 h-5 ${
                          item.id === 'dashboard' ? 'text-blue-500' :
                          item.id === 'engineering' ? 'text-indigo-500' :
                          item.id === 'autonomous' ? 'text-purple-500' :
                          item.id === 'user-management' ? 'text-green-500' :
                          item.id === 'system' ? 'text-orange-500' :
                          item.id === 'portals' ? 'text-pink-500' :
                          item.id === 'analytics' ? 'text-cyan-500' :
                          item.id === 'mcp' ? 'text-yellow-500' :
                          'text-slate-600'
                        }`} />
                          </div>
                          {!sidebarCollapsed && (
                            <div className="text-left">
                              <span className="font-semibold text-sm">{item.title}</span>
                              <p className={`text-xs mt-1 ${
                                expandedGroups.includes(item.id)
                                  ? 'text-white/80'
                                  : isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="ml-8 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                                <button
                              key={subItem.path}
                              onClick={() => {
                                console.log('Navigating to:', subItem.path);
                                navigate(subItem.path);
                                setMobileSidebarOpen(false);
                              }}
                            className={`w-full flex items-center space-x-3 p-2 rounded-md text-sm transition-all duration-300 group ${
                                    location.pathname === subItem.path
                                ? isDark 
                                      ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-blue-600 text-white shadow-md'
                                : isDark
                                        ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                  }`}
                                >
                            <div className={`p-1.5 rounded-md transition-all duration-300 ${
                              location.pathname === subItem.path
                                ? isDark ? 'bg-blue-500/30' : 'bg-blue-200'
                                : isDark ? 'bg-slate-700 group-hover:bg-slate-600' : 'bg-slate-100 group-hover:bg-slate-200'
                            }`}>
                              <subItem.icon className={`w-4 h-4 ${
                                subItem.title.includes('Frontend') ? 'text-blue-500' :
                                subItem.title.includes('Backend') ? 'text-indigo-500' :
                                subItem.title.includes('QA') ? 'text-green-500' :
                                subItem.title.includes('UI/UX') ? 'text-purple-500' :
                                subItem.title.includes('DevOps') ? 'text-orange-500' :
                                subItem.title.includes('Database') ? 'text-cyan-500' :
                                subItem.title.includes('Security') ? 'text-red-500' :
                                subItem.title.includes('Performance') ? 'text-yellow-500' :
                                subItem.title.includes('Agent') ? 'text-purple-500' :
                                subItem.title.includes('Monitor') ? 'text-blue-500' :
                                subItem.title.includes('Learning') ? 'text-green-500' :
                                subItem.title.includes('Decision') ? 'text-orange-500' :
                                subItem.title.includes('Auto-Scaling') ? 'text-pink-500' :
                                subItem.title.includes('All Users') ? 'text-blue-500' :
                                subItem.title.includes('Role') ? 'text-purple-500' :
                                subItem.title.includes('Access') ? 'text-red-500' :
                                subItem.title.includes('Analytics') ? 'text-cyan-500' :
                                subItem.title.includes('Health') ? 'text-green-500' :
                                subItem.title.includes('Network') ? 'text-blue-500' :
                                subItem.title.includes('Backup') ? 'text-orange-500' :
                                subItem.title.includes('Overview') ? 'text-blue-500' :
                                subItem.title.includes('Categories') ? 'text-purple-500' :
                                subItem.title.includes('Monitoring') ? 'text-green-500' :
                                subItem.title.includes('Settings') ? 'text-orange-500' :
                                subItem.title.includes('Security') ? 'text-red-500' :
                                subItem.title.includes('Users') ? 'text-blue-500' :
                                subItem.title.includes('Configurations') ? 'text-cyan-500' :
                                subItem.title.includes('Dashboard') ? 'text-blue-500' :
                                subItem.title.includes('Reports') ? 'text-green-500' :
                                subItem.title.includes('Export') ? 'text-orange-500' :
                                subItem.title.includes('Scheduler') ? 'text-purple-500' :
                                subItem.title.includes('Introduction') ? 'text-blue-500' :
                                subItem.title.includes('Features') ? 'text-green-500' :
                                subItem.title.includes('Integrations') ? 'text-purple-500' :
                                subItem.title.includes('Documentation') ? 'text-orange-500' :
                                subItem.title.includes('Support') ? 'text-cyan-500' :
                                subItem.title.includes('Registry') ? 'text-blue-500' :
                                subItem.title.includes('Hub') ? 'text-red-500' :
                                subItem.title.includes('Manager') ? 'text-purple-500' :
                                subItem.title.includes('Gateway') ? 'text-blue-500' :
                                subItem.title.includes('Log') ? 'text-orange-500' :
                                subItem.title.includes('Alert') ? 'text-red-500' :
                                subItem.title.includes('Deployment') ? 'text-green-500' :
                                subItem.title.includes('Commander') ? 'text-yellow-500' :
                                'text-slate-600'
                              }`} />
                            </div>
                            <span className="font-medium">{subItem.title}</span>
                                </button>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                      <button
                    onClick={() => {
                      console.log('Navigating to main item:', item.path);
                      navigate(item.path);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === item.path
                        ? isDark 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-blue-600 text-white shadow-md'
                        : isDark
                              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                                         <div className={`p-2 rounded-md transition-all duration-300 ${
                       location.pathname === item.path
                         ? 'bg-white/20'
                         : isDark
                           ? 'bg-slate-700 group-hover:bg-slate-600'
                           : 'bg-slate-100 group-hover:bg-slate-200'
                     }`}>
                    <item.icon className={`w-5 h-5 ${
                      item.id === 'dashboard' ? 'text-blue-500' :
                      item.id === 'engineering' ? 'text-indigo-500' :
                      item.id === 'autonomous' ? 'text-purple-500' :
                      item.id === 'user-management' ? 'text-green-500' :
                      item.id === 'system' ? 'text-orange-500' :
                      item.id === 'portals' ? 'text-pink-500' :
                      item.id === 'analytics' ? 'text-cyan-500' :
                      item.id === 'mcp' ? 'text-yellow-500' :
                      'text-slate-600'
                    }`} />
                    </div>
                        {!sidebarCollapsed && (
                      <div className="text-left">
                        <span className="font-semibold text-sm">{item.title}</span>
                        <p className={`text-xs mt-1 ${
                          location.pathname === item.path
                            ? 'text-white/80'
                            : isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                        )}
                      </button>
                )}
              </div>
            ))}
          </nav>

          {/* System Status Footer */}
          {!sidebarCollapsed && (
            <div className={`p-4 border-t ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            } flex-shrink-0`}>
              <div className="text-center">
                <p className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>System Status</p>
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
          {/* Enhanced Header with Gradient Background */}
          <header className={`shadow-lg border-b transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-slate-700 text-slate-100' 
              : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 text-slate-900'
          } flex-shrink-0 relative overflow-hidden`}>
            {/* Subtle background pattern */}
            <div className={`absolute inset-0 opacity-5 ${
              isDark ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]' 
              : 'bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)]'
            } bg-[length:20px_20px]`}></div>
            <div className="flex items-center justify-between p-6 relative z-10">
              <div className="flex items-center space-x-6">
                {/* Mobile Menu Button */}
                <Button
                  id="mobile-toggle"
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="lg:hidden rounded-md p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                
                                 <TransBotHeaderLogo showText={true} />
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                <h2 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
                </h2>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {navigationItems.find(item => location.pathname.startsWith(item.path))?.description || 'System Administration & Control'}
                    </p>
                  </div>
                <Badge variant="secondary" className={`${
                    isDark ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-800 border border-green-200'
                  } font-medium px-3 py-1 rounded-md shadow-sm`}>
                  Enhanced UI
                </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced User Menu with Radix DropdownMenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`header-user-menu relative h-10 w-10 rounded-md transition-all duration-300 border shadow-sm hover:scale-105 ${
                      isDark 
                        ? 'hover:bg-slate-700 text-slate-100 border-slate-600 bg-slate-800' 
                        : 'hover:bg-slate-100 text-slate-900 border-slate-200 bg-white'
                    }`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-bold text-lg shadow-inner">SA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    side="bottom" 
                    sideOffset={8}
                    className={`z-50 min-w-[12rem] rounded-md shadow-lg border ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-slate-100' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <DropdownMenuLabel className="font-normal p-4">
                      <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                        }`}>Super Administrator</p>
                        <p className={`text-xs ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>system@transbot.ai</p>
                      </div>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className={isDark ? 'bg-slate-700' : 'bg-slate-200'} />
                    <DropdownMenuItem 
                      className={`px-3 py-2 cursor-pointer rounded ${
                        isDark 
                          ? 'hover:bg-slate-700 text-slate-100' 
                          : 'hover:bg-slate-100 text-slate-900'
                         }`}
                         onClick={() => navigate('/super-admin/profile')}
                       >
                                                 <User className="w-4 h-4 mr-2 text-blue-500" />
                        Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`px-3 py-2 cursor-pointer rounded ${
                        isDark 
                          ? 'hover:bg-slate-700 text-slate-100' 
                          : 'hover:bg-slate-100 text-slate-900'
                         }`}
                         onClick={() => navigate('/super-admin/settings')}
                       >
                                                 <Settings className="w-4 h-4 mr-2 text-orange-500" />
                         System Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={isDark ? 'bg-slate-700' : 'bg-slate-200'} />
                    {/* Theme Toggle in Dropdown */}
                    <DropdownMenuItem 
                      className={`px-3 py-2 cursor-pointer rounded ${
                        isDark 
                          ? 'hover:bg-slate-700 text-slate-100' 
                          : 'hover:bg-slate-100 text-slate-900'
                      }`}
                      onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    >
                                             {isDark ? <Sun className="w-4 h-4 mr-2 text-yellow-500" /> : <Moon className="w-4 h-4 mr-2 text-purple-500" />}
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={isDark ? 'bg-slate-700' : 'bg-slate-200'} />
                    <DropdownMenuItem 
                      className={`px-3 py-2 cursor-pointer rounded text-red-600 ${
                        isDark 
                          ? 'hover:bg-red-900/20' 
                          : 'hover:bg-red-50'
                      }`}
                    >
                                                 <LogOut className="w-4 h-4 mr-2 text-red-500" />
                        Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 overflow-auto ${
            isDark ? 'bg-slate-900' : 'bg-slate-50'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="h-full"
              >
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/autonomous/*" element={
                    <AuthProvider>
                      <AutonomousDashboardPage />
                    </AuthProvider>
                  } />
                  <Route path="/users/*" element={<UserManagementPage />} />
                  <Route path="/users/all" element={<AllUsersPage />} />
                                          <Route path="/color-test" element={<ColorTestPage />} />
                        <Route path="/fab-test" element={<FABTestPage />} />
                        <Route path="/ui-demo" element={<UIComponentsDemoPage />} />
                        <Route path="/playground" element={<ComponentPlaygroundPage />} />
                        <Route path="/portals/overview" element={<PortalOverviewPage />} />
                  <Route path="/portals/all" element={<AllPortalsPage />} />
                  <Route path="/portals/categories" element={<PortalCategoriesPage />} />
                  <Route path="/portals/monitoring" element={<PortalMonitoringPage />} />
                  <Route path="/portals/settings" element={<PortalSettingsPage />} />
                  <Route path="/portals/analytics" element={<PortalAnalyticsPage />} />
                  <Route path="/portals/security" element={<PortalSecurityPage />} />
                  <Route path="/portals/backup" element={<PortalBackupPage />} />
                  <Route path="/portals/users" element={<PortalUsersPage />} />
                  <Route path="/portals/configurations" element={<PortalConfigurationsPage />} />
                  <Route path="/portals" element={<PortalOverviewPage />} />
                  <Route path="/analytics/*" element={<AnalyticsReportsPage />} />
                  {/* System Control Pages */}
                  <Route path="/system" element={<DashboardPage />} />
                  <Route path="/system/health" element={<SystemHealthPage />} />
                  <Route path="/system/database" element={<DatabaseAdminPage />} />
                  <Route path="/system/network" element={<NetworkConfigPage />} />
                  <Route path="/system/security" element={<SecurityCenterPage />} />
                  <Route path="/system/backup" element={<BackupRestorePage />} />
                  {/* Engineering Suite Pages */}
                  <Route path="/engineering" element={<DashboardPage />} />
                  <Route path="/engineering/frontend" element={<FrontendDeveloperPage />} />
                  <Route path="/engineering/backend" element={<BackendAPIPage />} />
                  <Route path="/engineering/qa" element={<QATestingPage />} />
                  <Route path="/engineering/design" element={<UIUXDesignerPage />} />
                  <Route path="/engineering/devops" element={<DevOpsPage />} />
                  <Route path="/engineering/database" element={<DatabaseOptimizerPage />} />
                  <Route path="/engineering/security" element={<SecurityScannerPage />} />
                  <Route path="/engineering/performance" element={<PerformanceMonitorPage />} />
                   {/* Profile and Settings Pages */}
                           <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mcp" element={<MCPControlCenter />} />
        <Route path="/mcp/introduction" element={<MCPIntroductionPage />} />
        <Route path="/mcp/features" element={<MCPFeaturesPage />} />
        <Route path="/mcp/integrations" element={<MCPIntegrationsPage />} />
        <Route path="/mcp/documentation" element={<MCPDocumentationPage />} />
        <Route path="/mcp/support" element={<MCPSupportPage />} />
                  <Route path="/mcp/agent-registry" element={<MCPAgentRegistryPage />} />
          <Route path="/mcp/system-monitor" element={<MCPSystemMonitorPage />} />
          <Route path="/mcp/security-hub" element={<MCPSecurityHubPage />} />
          <Route path="/mcp/performance-analytics" element={<MCPPerformanceAnalyticsPage />} />
          <Route path="/mcp/configuration" element={<MCPConfigurationManagerPage />} />
          <Route path="/mcp/backup-recovery" element={<MCPBackupRecoveryPage />} />
          <Route path="/mcp/api-gateway" element={<MCPAPIGatewayPage />} />
          <Route path="/mcp/log-management" element={<MCPLogManagementPage />} />
          <Route path="/mcp/alert-center" element={<MCPAlertCenterPage />} />
                     <Route path="/mcp/deployment" element={<MCPDeploymentManagerPage />} />
           <Route path="/mcp/commander" element={<MCPCommanderPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        userRole="super_admin"
        userEntitlements={['super_admin.core', 'system.admin', 'user.admin', 'portal.admin', 'security.admin']}
        isAdmin={true}
      />
    </TooltipProvider>
  );
};

export default EnhancedSuperAdminPortal;

