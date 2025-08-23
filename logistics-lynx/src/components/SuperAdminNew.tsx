import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, Settings, Shield, Activity, Globe,
  BarChart3, Brain, Briefcase, Code, Menu, X, Search,
  Bell, User, LogOut, Moon, Sun, ChevronRight, ChevronDown,
  Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw,
  TrendingUp, DollarSign, AlertTriangle, Database, Server,
  Cpu, FileText, Network, Zap, Lock, CheckCircle, XCircle,
  AlertCircle, Info, HelpCircle, Settings as SettingsIcon,
  Home, Building2, Truck, Package, CreditCard, Calendar,
  MessageSquare, Phone, Mail, MapPin, Clock, Star,
  ArrowUpRight, ArrowDownRight, Target, PieChart, LineChart,
  ShoppingCart, Receipt, Users2, UserCheck, UserX, UserPlus,
  Building, Store, ShoppingBag, Tag, Percent, Award,
  HardDrive, Cloud, Wifi, Signal, Battery, Power,
  Monitor, Smartphone, Tablet, Laptop,
  Key, Fingerprint, EyeOff, ShieldCheck, ShieldX, ShieldAlert,
  LockKeyhole, Unlock, KeyRound, BadgeCheck, BadgeX,
  TrendingDown, Minus, Equal, BarChart, PieChart as PieChartIcon,
  LineChart as LineChartIcon, ScatterChart, AreaChart,
  GitBranch, GitCommit, GitPullRequest, GitMerge, GitCompare,
  Terminal, Command, Code2, Brackets, Braces, Parentheses,
  Bot, Cpu as CpuIcon, HardDrive as HardDriveIcon,
  Network as NetworkIcon, Zap as ZapIcon, Brain as BrainIcon,
  Globe as GlobeIcon, Map, Navigation, Compass,
  Layers, Grid, Columns, Rows, Layout, Sidebar,
  LifeBuoy, Headphones, MessageCircle, Mail as MailIcon,
  Phone as PhoneIcon, Video, Camera, Mic, MicOff,
  Wallet, CreditCard as CreditCardIcon, Banknote, Coins,
  PiggyBank, Calculator, TrendingUp as TrendingUpIcon,
  Clipboard, ClipboardCheck, ClipboardList, ClipboardX,
  FileText as FileTextIcon, File, Folder, FolderOpen,
  Activity as ActivityIcon, Heart, Thermometer,
  Gauge, Timer, Clock as ClockIcon, Calendar as CalendarIcon
} from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import SuperAdminRoutes from '../pages/super-admin/SuperAdminRoutes';

// Professional Super Admin Component with Complete MCP Integration
const SuperAdminNew: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Complete Navigation Menu Structure
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/super-admin/dashboard',
      submenus: [
        { label: 'System Overview', path: '/super-admin/dashboard', icon: <Activity className="h-4 w-4" /> },
        { label: 'Active Users', path: '/super-admin/dashboard/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Revenue Metrics', path: '/super-admin/dashboard/revenue', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'System Alerts', path: '/super-admin/dashboard/alerts', icon: <AlertTriangle className="h-4 w-4" /> }
      ]
    },
    {
      label: 'User Management',
      icon: <Users className="h-5 w-5" />,
      path: '/super-admin/users',
      submenus: [
        { label: 'All Users', path: '/super-admin/users', icon: <Users className="h-4 w-4" /> },
        { label: 'User Roles', path: '/super-admin/users/roles', icon: <Shield className="h-4 w-4" /> },
        { label: 'User Groups', path: '/super-admin/users/groups', icon: <Users2 className="h-4 w-4" /> },
        { label: 'Access Control', path: '/super-admin/users/access', icon: <Key className="h-4 w-4" /> },
        { label: 'User Analytics', path: '/super-admin/users/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Billing Management', path: '/super-admin/users/billing', icon: <CreditCard className="h-4 w-4" /> },
        { label: 'Support Tickets', path: '/super-admin/users/support', icon: <Headphones className="h-4 w-4" /> },
        { label: 'User Onboarding', path: '/super-admin/users/onboarding', icon: <UserPlus className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Administration',
      icon: <Settings className="h-5 w-5" />,
      path: '/super-admin/system',
      submenus: [
        { label: 'Database Management', path: '/super-admin/system/database', icon: <Database className="h-4 w-4" /> },
        { label: 'API Management', path: '/super-admin/system/api', icon: <Code className="h-4 w-4" /> },
        { label: 'Server Monitoring', path: '/super-admin/system/monitoring', icon: <Monitor className="h-4 w-4" /> },
        { label: 'Deployment Management', path: '/super-admin/system/deployment', icon: <Upload className="h-4 w-4" /> },
        { label: 'Configuration', path: '/super-admin/system/config', icon: <Settings className="h-4 w-4" /> },
        { label: 'Backup & Recovery', path: '/super-admin/system/backup', icon: <HardDrive className="h-4 w-4" /> },
        { label: 'Security Settings', path: '/super-admin/system/security', icon: <ShieldCheck className="h-4 w-4" /> },
        { label: 'Integration Hub', path: '/super-admin/system/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'File Storage', path: '/super-admin/system/storage', icon: <Folder className="h-4 w-4" /> },
        { label: 'Email Services', path: '/super-admin/system/email', icon: <Mail className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Security Center',
      icon: <Shield className="h-5 w-5" />,
      path: '/super-admin/security',
      submenus: [
        { label: 'Security Audit', path: '/super-admin/security/audit', icon: <Search className="h-4 w-4" /> },
        { label: 'Access Logs', path: '/super-admin/security/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Data Protection', path: '/super-admin/security/protection', icon: <Lock className="h-4 w-4" /> },
        { label: 'API Security', path: '/super-admin/security/api', icon: <Shield className="h-4 w-4" /> },
        { label: 'User Permissions', path: '/super-admin/security/permissions', icon: <Key className="h-4 w-4" /> },
        { label: 'Security Policies', path: '/super-admin/security/policies', icon: <FileText className="h-4 w-4" /> },
        { label: 'Incident Response', path: '/super-admin/security/incidents', icon: <AlertCircle className="h-4 w-4" /> },
        { label: 'Compliance Management', path: '/super-admin/security/compliance', icon: <CheckCircle className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Monitoring',
      icon: <Activity className="h-5 w-5" />,
      path: '/super-admin/monitoring',
      submenus: [
        { label: 'Performance Monitoring', path: '/super-admin/monitoring/performance', icon: <Zap className="h-4 w-4" /> },
        { label: 'Error Tracking', path: '/super-admin/monitoring/errors', icon: <AlertCircle className="h-4 w-4" /> },
        { label: 'Log Analysis', path: '/super-admin/monitoring/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Alert Management', path: '/super-admin/monitoring/alerts', icon: <Bell className="h-4 w-4" /> },
        { label: 'Uptime Monitoring', path: '/super-admin/monitoring/uptime', icon: <Activity className="h-4 w-4" /> },
        { label: 'Resource Usage', path: '/super-admin/monitoring/resources', icon: <Cpu className="h-4 w-4" /> },
        { label: 'Network Monitoring', path: '/super-admin/monitoring/network', icon: <Wifi className="h-4 w-4" /> },
        { label: 'Health Checks', path: '/super-admin/monitoring/health', icon: <Heart className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Portal Management',
      icon: <Globe className="h-5 w-5" />,
      path: '/super-admin/portals',
      submenus: [
        { label: 'Portal Overview', path: '/super-admin/portals', icon: <Globe className="h-4 w-4" /> },
        { label: 'Portal Configuration', path: '/super-admin/portals/config', icon: <Settings className="h-4 w-4" /> },
        { label: 'Portal Users', path: '/super-admin/portals/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Feature Management', path: '/super-admin/portals/features', icon: <Flag className="h-4 w-4" /> },
        { label: 'Portal Analytics', path: '/super-admin/portals/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Portal Billing', path: '/super-admin/portals/billing', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Portal Support', path: '/super-admin/portals/support', icon: <Headphones className="h-4 w-4" /> },
        { label: 'Portal Integrations', path: '/super-admin/portals/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'Portal Backup', path: '/super-admin/portals/backup', icon: <HardDrive className="h-4 w-4" /> },
        { label: 'Portal Security', path: '/super-admin/portals/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Portal Compliance', path: '/super-admin/portals/compliance', icon: <CheckCircle className="h-4 w-4" /> },
        { label: 'Portal Deployment', path: '/super-admin/portals/deployment', icon: <Upload className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Analytics & Reports',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/super-admin/analytics',
      submenus: [
        { label: 'Business Analytics', path: '/super-admin/analytics/business', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'User Analytics', path: '/super-admin/analytics/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Performance Reports', path: '/super-admin/analytics/performance', icon: <Zap className="h-4 w-4" /> },
        { label: 'Security Reports', path: '/super-admin/analytics/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Financial Reports', path: '/super-admin/analytics/financial', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Operational Reports', path: '/super-admin/analytics/operational', icon: <Settings className="h-4 w-4" /> },
        { label: 'Custom Reports', path: '/super-admin/analytics/custom', icon: <PieChart className="h-4 w-4" /> },
        { label: 'Data Export', path: '/super-admin/analytics/export', icon: <Download className="h-4 w-4" /> },
        { label: 'Dashboard Builder', path: '/super-admin/analytics/dashboards', icon: <Layout className="h-4 w-4" /> },
        { label: 'Scheduled Reports', path: '/super-admin/analytics/scheduled', icon: <Calendar className="h-4 w-4" /> }
      ]
    },
    {
      label: 'MCP Control Center',
      icon: <Bot className="h-5 w-5" />,
      path: '/super-admin/mcp',
      submenus: [
        { label: 'MCP Overview', path: '/super-admin/mcp', icon: <Bot className="h-4 w-4" /> },
        { label: 'Agent Management', path: '/super-admin/mcp/agents', icon: <Settings className="h-4 w-4" /> },
        { label: 'AI Models', path: '/super-admin/mcp/models', icon: <Brain className="h-4 w-4" /> },
        { label: 'Data Pipeline', path: '/super-admin/mcp/pipeline', icon: <GitBranch className="h-4 w-4" /> },
        { label: 'Machine Learning', path: '/super-admin/mcp/learning', icon: <Target className="h-4 w-4" /> },
        { label: 'AI Analytics', path: '/super-admin/mcp/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Automation Rules', path: '/super-admin/mcp/automation', icon: <Zap className="h-4 w-4" /> },
        { label: 'AI Integrations', path: '/super-admin/mcp/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'AI Monitoring', path: '/super-admin/mcp/monitoring', icon: <Monitor className="h-4 w-4" /> },
        { label: 'AI Compliance', path: '/super-admin/mcp/compliance', icon: <CheckCircle className="h-4 w-4" /> },
        { label: 'AI Documentation', path: '/super-admin/mcp/documentation', icon: <FileText className="h-4 w-4" /> },
        { label: 'AI Support', path: '/super-admin/mcp/support', icon: <Headphones className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Business Operations',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/super-admin/business',
      submenus: [
        { label: 'Customer Management', path: '/super-admin/business/customers', icon: <Users className="h-4 w-4" /> },
        { label: 'Sales Pipeline', path: '/super-admin/business/sales', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'Billing & Invoicing', path: '/super-admin/business/billing', icon: <FileText className="h-4 w-4" /> },
        { label: 'Support Management', path: '/super-admin/business/support', icon: <Headphones className="h-4 w-4" /> },
        { label: 'Documentation', path: '/super-admin/business/docs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Marketing Tools', path: '/super-admin/business/marketing', icon: <Megaphone className="h-4 w-4" /> },
        { label: 'Partner Management', path: '/super-admin/business/partners', icon: <Handshake className="h-4 w-4" /> },
        { label: 'Legal & Compliance', path: '/super-admin/business/legal', icon: <Scale className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Development & DevOps',
      icon: <Code className="h-5 w-5" />,
      path: '/super-admin/dev',
      submenus: [
        { label: 'Code Repository', path: '/super-admin/dev/repository', icon: <GitBranch className="h-4 w-4" /> },
        { label: 'CI/CD Pipeline', path: '/super-admin/dev/pipeline', icon: <GitCommit className="h-4 w-4" /> },
        { label: 'Testing Suite', path: '/super-admin/dev/testing', icon: <TestTube className="h-4 w-4" /> },
        { label: 'Environment Management', path: '/super-admin/dev/environments', icon: <Layers className="h-4 w-4" /> },
        { label: 'Performance Testing', path: '/super-admin/dev/performance', icon: <Gauge className="h-4 w-4" /> },
        { label: 'Security Testing', path: '/super-admin/dev/security', icon: <ShieldCheck className="h-4 w-4" /> },
        { label: 'Dev Documentation', path: '/super-admin/dev/documentation', icon: <FileCode className="h-4 w-4" /> },
        { label: 'Release Management', path: '/super-admin/dev/releases', icon: <Package className="h-4 w-4" /> }
      ]
    }
  ];

  // Enhanced Stats Data
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />,
      color: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700',
      iconBg: 'bg-green-100 dark:bg-green-900/50',
      description: 'Monthly recurring revenue'
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      description: 'Concurrent active users'
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      description: 'Last 30 days uptime'
    },
    {
      title: 'MCP Agents',
      value: '47',
      change: '+3',
      trend: 'up',
      icon: <Bot className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      color: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50',
      description: 'Active autonomous agents'
    },
    {
      title: 'Security Score',
      value: '98.5',
      change: '+2.1',
      trend: 'up',
      icon: <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      color: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
      description: 'Overall security rating'
    },
    {
      title: 'API Calls',
      value: '2.4M',
      change: '+15.3%',
      trend: 'up',
      icon: <Network className="h-8 w-8 text-teal-600 dark:text-teal-400" />,
      color: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-700',
      iconBg: 'bg-teal-100 dark:bg-teal-900/50',
      description: 'Daily API requests'
    }
  ];

  // Quick Actions Data
  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800',
      path: '/super-admin/users'
    },
    {
      title: 'System Backup',
      description: 'Create system backup',
      icon: <Download className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800',
      path: '/super-admin/system/backup'
    },
    {
      title: 'Security Scan',
      description: 'Run security audit',
      icon: <Shield className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800',
      path: '/super-admin/security/audit'
    },
    {
      title: 'MCP Agents',
      description: 'Manage AI agents',
      icon: <Bot className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800',
      path: '/super-admin/mcp/agents'
    },
    {
      title: 'Analytics',
      description: 'View reports',
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800',
      path: '/super-admin/analytics/business'
    },
    {
      title: 'Portal Config',
      description: 'Configure portals',
      icon: <Globe className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800',
      path: '/super-admin/portals/config'
    }
  ];

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Toggle menu expansion
  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Render sidebar
  const renderSidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Super Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              {/* Main Menu Item */}
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${location.pathname.startsWith(item.path) ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-all duration-200`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.submenus && (
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedMenu === item.label ? 'rotate-90' : ''}`} />
                )}
              </button>

              {/* Submenu Items */}
              {item.submenus && expandedMenu === item.label && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.submenus.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => navigate(subItem.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        location.pathname === subItem.path
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${location.pathname === subItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} transition-all duration-200`}>
                        {subItem.icon}
                      </div>
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );

  // Render header
  const renderHeader = () => (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:flex items-center space-x-4">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </Button>

        {/* Dark mode toggle */}
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                {user?.name || user?.email || 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        {renderSidebar()}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          {renderHeader()}

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <SuperAdminRoutes />
          </main>
        </div>

        {/* Enhanced FAB Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`transition-all duration-300 ${fabOpen ? 'scale-100' : 'scale-0'}`}>
            {/* FAB Menu Items */}
            <div className="absolute bottom-16 right-0 space-y-3 mb-3">
              <Button
                variant="default"
                size="icon"
                onClick={() => navigate('/super-admin/users')}
                className="w-12 h-12 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                title="Add New User"
              >
                <UserPlus className="h-5 w-5" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                onClick={() => navigate('/super-admin/system/backup')}
                className="w-12 h-12 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                title="System Backup"
              >
                <Download className="h-5 w-5" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                onClick={() => navigate('/super-admin/security/audit')}
                className="w-12 h-12 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                title="Security Scan"
              >
                <Shield className="h-5 w-5" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                onClick={() => navigate('/super-admin/mcp/agents')}
                className="w-12 h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                title="MCP Agents"
              >
                <Bot className="h-5 w-5" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                onClick={() => navigate('/super-admin/analytics/business')}
                className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                title="Analytics"
              >
                <BarChart3 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Main FAB Button */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setFabOpen(!fabOpen)}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`transition-transform duration-300 ${fabOpen ? 'rotate-45' : 'rotate-0'}`}>
              <Plus className="h-6 w-6" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNew;
