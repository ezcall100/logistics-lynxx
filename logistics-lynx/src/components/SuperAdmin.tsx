import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  // Core Icons
  LayoutDashboard, Users, Settings, Shield, Activity, Globe,
  BarChart3, Brain, Briefcase, Code, Menu, X, Search,
  Bell, User, LogOut, Moon, Sun, ChevronRight, ChevronDown,
  Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw,
  TrendingUp, DollarSign, AlertTriangle, Database, Server,
  Cpu, FileText, Network, Zap, Lock, CheckCircle, XCircle,
  AlertCircle, Info, HelpCircle, Settings as SettingsIcon,
  
  // Navigation Icons
  Home, Building2, Truck, Package, CreditCard, Calendar,
  MessageSquare, Phone, Mail, MapPin, Clock, Star,
  ArrowUpRight, ArrowDownRight, Target, PieChart, LineChart,
  
  // Business Icons
  ShoppingCart, Receipt, Users2, UserCheck, UserX, UserPlus,
  Building, Store, ShoppingBag, Tag, Percent, Award,
  
  // System Icons
  HardDrive, Cloud, Wifi, Signal, Battery, Power,
  Monitor, Smartphone, Tablet, Laptop,
  
  // Security Icons
  Key, Fingerprint, EyeOff, ShieldCheck, ShieldX, ShieldAlert,
  LockKeyhole, Unlock, KeyRound, BadgeCheck, BadgeX,
  
  // Analytics Icons
  TrendingDown, Minus, Equal, BarChart, PieChart as PieChartIcon,
  LineChart as LineChartIcon, ScatterChart, AreaChart,
  
  // Development Icons
  GitBranch, GitCommit, GitPullRequest, GitMerge, GitCompare,
  Terminal, Command, Code2, Brackets, Braces, Parentheses,
  
  // MCP Icons
  Bot, Cpu as CpuIcon, HardDrive as HardDriveIcon,
  Network as NetworkIcon, Zap as ZapIcon, Brain as BrainIcon,
  
  // Portal Icons
  Globe as GlobeIcon, Map, Navigation, Compass,
  Layers, Grid, Columns, Rows, Layout, Sidebar,
  
  // Support Icons
  LifeBuoy, Headphones, MessageCircle, Mail as MailIcon,
  Phone as PhoneIcon, Video, Camera, Mic, MicOff,
  
  // Finance Icons
  Wallet, CreditCard as CreditCardIcon, Banknote, Coins,
  PiggyBank, Calculator, TrendingUp as TrendingUpIcon,
  
  // Operations Icons
  Clipboard, ClipboardCheck, ClipboardList, ClipboardX,
  FileText as FileTextIcon, File, Folder, FolderOpen,
  
  // Monitoring Icons
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
const SuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      label: '📊 Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/super-admin',
      items: [
        { label: 'System Overview', icon: <Home className="h-4 w-4" />, path: '/super-admin' },
        { label: 'Active Users', icon: <Users className="h-4 w-4" />, path: '/super-admin/dashboard/users' },
        { label: 'Revenue Metrics', icon: <DollarSign className="h-4 w-4" />, path: '/super-admin/dashboard/revenue' },
        { label: 'System Alerts', icon: <AlertTriangle className="h-4 w-4" />, path: '/super-admin/dashboard/alerts' },
      ]
    },
    {
      label: '👥 User Management',
      icon: <Users className="h-5 w-5" />,
      path: '/super-admin/users',
      items: [
        { label: 'All Users', icon: <Users className="h-4 w-4" />, path: '/super-admin/users' },
        { label: 'User Roles', icon: <Shield className="h-4 w-4" />, path: '/super-admin/users/roles' },
        { label: 'User Groups', icon: <Building2 className="h-4 w-4" />, path: '/super-admin/users/groups' },
        { label: 'Access Control', icon: <Lock className="h-4 w-4" />, path: '/super-admin/users/access' },
        { label: 'User Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/users/analytics' },
        { label: 'Billing Management', icon: <CreditCard className="h-4 w-4" />, path: '/super-admin/users/billing' },
        { label: 'Support Tickets', icon: <MessageSquare className="h-4 w-4" />, path: '/super-admin/users/support' },
        { label: 'User Onboarding', icon: <UserPlus className="h-4 w-4" />, path: '/super-admin/users/onboarding' },
      ]
    },
    {
      label: '⚙️ System Administration',
      icon: <Settings className="h-5 w-5" />,
      path: '/super-admin/system',
      items: [
        { label: 'Database Management', icon: <Database className="h-4 w-4" />, path: '/super-admin/system/database' },
        { label: 'API Management', icon: <Code className="h-4 w-4" />, path: '/super-admin/system/api' },
        { label: 'Server Monitoring', icon: <Server className="h-4 w-4" />, path: '/super-admin/system/servers' },
        { label: 'Deployment', icon: <Upload className="h-4 w-4" />, path: '/super-admin/system/deployment' },
        { label: 'Configuration', icon: <Settings className="h-4 w-4" />, path: '/super-admin/system/config' },
        { label: 'Backup & Recovery', icon: <Download className="h-4 w-4" />, path: '/super-admin/system/backup' },
        { label: 'Security Settings', icon: <Shield className="h-4 w-4" />, path: '/super-admin/system/security' },
        { label: 'Integration Hub', icon: <Network className="h-4 w-4" />, path: '/super-admin/system/integrations' },
        { label: 'File Storage', icon: <HardDrive className="h-4 w-4" />, path: '/super-admin/system/storage' },
        { label: 'Email Services', icon: <Mail className="h-4 w-4" />, path: '/super-admin/system/email' },
      ]
    },
    {
      label: '🔒 Security Center',
      icon: <Shield className="h-5 w-5" />,
      path: '/super-admin/security',
      items: [
        { label: 'Security Audit', icon: <Shield className="h-4 w-4" />, path: '/super-admin/security/audit' },
        { label: 'Access Logs', icon: <FileText className="h-4 w-4" />, path: '/super-admin/security/logs' },
        { label: 'Data Protection', icon: <Lock className="h-4 w-4" />, path: '/super-admin/security/data' },
        { label: 'API Security', icon: <Code className="h-4 w-4" />, path: '/super-admin/security/api' },
        { label: 'User Permissions', icon: <Key className="h-4 w-4" />, path: '/super-admin/security/permissions' },
        { label: 'Security Policies', icon: <ShieldCheck className="h-4 w-4" />, path: '/super-admin/security/policies' },
        { label: 'Incident Response', icon: <AlertTriangle className="h-4 w-4" />, path: '/super-admin/security/incidents' },
        { label: 'Compliance', icon: <CheckCircle className="h-4 w-4" />, path: '/super-admin/security/compliance' },
      ]
    },
    {
      label: '👁️ System Monitoring',
      icon: <Activity className="h-5 w-5" />,
      path: '/super-admin/monitoring',
      items: [
        { label: 'Performance Monitoring', icon: <TrendingUp className="h-4 w-4" />, path: '/super-admin/monitoring/performance' },
        { label: 'Error Tracking', icon: <AlertCircle className="h-4 w-4" />, path: '/super-admin/monitoring/errors' },
        { label: 'Log Analysis', icon: <FileText className="h-4 w-4" />, path: '/super-admin/monitoring/logs' },
        { label: 'Alert Management', icon: <Bell className="h-4 w-4" />, path: '/super-admin/monitoring/alerts' },
        { label: 'Uptime Monitoring', icon: <CheckCircle className="h-4 w-4" />, path: '/super-admin/monitoring/uptime' },
        { label: 'Resource Usage', icon: <Cpu className="h-4 w-4" />, path: '/super-admin/monitoring/resources' },
        { label: 'Network Monitoring', icon: <Network className="h-4 w-4" />, path: '/super-admin/monitoring/network' },
        { label: 'Health Checks', icon: <Heart className="h-4 w-4" />, path: '/super-admin/monitoring/health' },
      ]
    },
    {
      label: '🌐 Portal Management',
      icon: <Globe className="h-5 w-5" />,
      path: '/super-admin/portals',
      items: [
        { label: 'Portal Overview', icon: <Globe className="h-4 w-4" />, path: '/super-admin/portals' },
        { label: 'Portal Configuration', icon: <Settings className="h-4 w-4" />, path: '/super-admin/portals/config' },
        { label: 'User Access', icon: <Users className="h-4 w-4" />, path: '/super-admin/portals/users' },
        { label: 'Feature Management', icon: <Zap className="h-4 w-4" />, path: '/super-admin/portals/features' },
        { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/portals/analytics' },
        { label: 'Billing', icon: <CreditCard className="h-4 w-4" />, path: '/super-admin/portals/billing' },
        { label: 'Support', icon: <MessageSquare className="h-4 w-4" />, path: '/super-admin/portals/support' },
        { label: 'Integration', icon: <Network className="h-4 w-4" />, path: '/super-admin/portals/integrations' },
        { label: 'Backup', icon: <Download className="h-4 w-4" />, path: '/super-admin/portals/backup' },
        { label: 'Security', icon: <Shield className="h-4 w-4" />, path: '/super-admin/portals/security' },
        { label: 'Compliance', icon: <CheckCircle className="h-4 w-4" />, path: '/super-admin/portals/compliance' },
        { label: 'Deployment', icon: <Upload className="h-4 w-4" />, path: '/super-admin/portals/deployment' },
      ]
    },
    {
      label: '📋 Analytics & Reports',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/super-admin/analytics',
      items: [
        { label: 'Business Analytics', icon: <TrendingUp className="h-4 w-4" />, path: '/super-admin/analytics/business' },
        { label: 'User Analytics', icon: <Users className="h-4 w-4" />, path: '/super-admin/analytics/users' },
        { label: 'Performance Reports', icon: <Activity className="h-4 w-4" />, path: '/super-admin/analytics/performance' },
        { label: 'Security Reports', icon: <Shield className="h-4 w-4" />, path: '/super-admin/analytics/security' },
        { label: 'Financial Reports', icon: <DollarSign className="h-4 w-4" />, path: '/super-admin/analytics/financial' },
        { label: 'Operational Reports', icon: <Clipboard className="h-4 w-4" />, path: '/super-admin/analytics/operational' },
        { label: 'Custom Reports', icon: <FileText className="h-4 w-4" />, path: '/super-admin/analytics/custom' },
        { label: 'Data Export', icon: <Download className="h-4 w-4" />, path: '/super-admin/analytics/export' },
        { label: 'Dashboard Builder', icon: <LayoutDashboard className="h-4 w-4" />, path: '/super-admin/analytics/dashboard' },
        { label: 'Scheduled Reports', icon: <Calendar className="h-4 w-4" />, path: '/super-admin/analytics/scheduled' },
      ]
    },
    {
      label: '🤖 MCP Control Center',
      icon: <Brain className="h-5 w-5" />,
      path: '/super-admin/mcp',
      items: [
        { label: 'System Overview', icon: <Brain className="h-4 w-4" />, path: '/super-admin/mcp' },
        { label: 'Agent Management', icon: <Bot className="h-4 w-4" />, path: '/super-admin/mcp/agents' },
        { label: 'AI Models', icon: <Cpu className="h-4 w-4" />, path: '/super-admin/mcp/models' },
        { label: 'Data Pipeline', icon: <Database className="h-4 w-4" />, path: '/super-admin/mcp/pipeline' },
        { label: 'Machine Learning', icon: <Brain className="h-4 w-4" />, path: '/super-admin/mcp/ml' },
        { label: 'AI Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/mcp/analytics' },
        { label: 'Automation Rules', icon: <Zap className="h-4 w-4" />, path: '/super-admin/mcp/automation' },
        { label: 'Integration Hub', icon: <Network className="h-4 w-4" />, path: '/super-admin/mcp/integrations' },
        { label: 'Monitoring', icon: <Activity className="h-4 w-4" />, path: '/super-admin/mcp/monitoring' },
        { label: 'Compliance', icon: <Shield className="h-4 w-4" />, path: '/super-admin/mcp/compliance' },
        { label: 'Documentation', icon: <FileText className="h-4 w-4" />, path: '/super-admin/mcp/docs' },
        { label: 'Support', icon: <HelpCircle className="h-4 w-4" />, path: '/super-admin/mcp/support' },
      ]
    },
    {
      label: '💼 Business Operations',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/super-admin/business',
      items: [
        { label: 'Customer Management', icon: <Users className="h-4 w-4" />, path: '/super-admin/business/customers' },
        { label: 'Sales Pipeline', icon: <TrendingUp className="h-4 w-4" />, path: '/super-admin/business/sales' },
        { label: 'Billing & Invoicing', icon: <CreditCard className="h-4 w-4" />, path: '/super-admin/business/billing' },
        { label: 'Support Management', icon: <MessageSquare className="h-4 w-4" />, path: '/super-admin/business/support' },
        { label: 'Documentation', icon: <FileText className="h-4 w-4" />, path: '/super-admin/business/docs' },
        { label: 'Marketing Tools', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/business/marketing' },
        { label: 'Partner Management', icon: <Building2 className="h-4 w-4" />, path: '/super-admin/business/partners' },
        { label: 'Legal & Compliance', icon: <Shield className="h-4 w-4" />, path: '/super-admin/business/legal' },
      ]
    },
    {
      label: '🔧 Development & DevOps',
      icon: <Code className="h-5 w-5" />,
      path: '/super-admin/devops',
      items: [
        { label: 'Code Repository', icon: <GitBranch className="h-4 w-4" />, path: '/super-admin/devops/repo' },
        { label: 'CI/CD Pipeline', icon: <Zap className="h-4 w-4" />, path: '/super-admin/devops/pipeline' },
        { label: 'Testing', icon: <CheckCircle className="h-4 w-4" />, path: '/super-admin/devops/testing' },
        { label: 'Environment Management', icon: <Settings className="h-4 w-4" />, path: '/super-admin/devops/environments' },
        { label: 'Performance Testing', icon: <Activity className="h-4 w-4" />, path: '/super-admin/devops/performance' },
        { label: 'Security Testing', icon: <Shield className="h-4 w-4" />, path: '/super-admin/devops/security' },
        { label: 'Documentation', icon: <FileText className="h-4 w-4" />, path: '/super-admin/devops/docs' },
        { label: 'Release Management', icon: <Upload className="h-4 w-4" />, path: '/super-admin/devops/releases' },
      ]
    },
  ];

  // Enhanced Dashboard Data with Dark Mode Support
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
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      description: 'Last 30 days uptime'
    },
    {
      title: 'Active Portals',
      value: '156',
      change: '+3.2%',
      trend: 'up',
      icon: <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      description: 'Customer portals'
    },
    {
      title: 'MCP Agents',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: <Bot className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      color: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50',
      description: 'Active autonomous agents'
    },
    {
      title: 'Security Score',
      value: '98.5',
      change: '+1.2%',
      trend: 'up',
      icon: <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      color: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
      description: 'Overall security rating'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Updated portal configuration',
      status: 'success',
      time: '2 minutes ago',
      module: 'Portal Management'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Created new user group',
      status: 'success',
      time: '5 minutes ago',
      module: 'User Management'
    },
    {
      id: 3,
      user: 'MCP Agent #7',
      action: 'Automated security scan completed',
      status: 'info',
      time: '10 minutes ago',
      module: 'MCP Control Center'
    },
    {
      id: 4,
      user: 'Mike Wilson',
      action: 'Deployed new version',
      status: 'success',
      time: '15 minutes ago',
      module: 'System Administration'
    },
    {
      id: 5,
      user: 'Lisa Brown',
      action: 'Security audit completed',
      status: 'success',
      time: '20 minutes ago',
      module: 'Security Center'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      message: 'Database backup completed successfully',
      type: 'success',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      id: 2,
      message: 'New user registration spike detected',
      type: 'info',
      time: '2 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      message: 'API rate limit approaching threshold',
      type: 'warning',
      time: '3 hours ago',
      priority: 'high'
    },
    {
      id: 4,
      message: 'MCP Agent #12 performance optimization completed',
      type: 'success',
      time: '4 hours ago',
      priority: 'low'
    }
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800',
      path: '/super-admin/users/new'
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
      title: 'MCP Agent Status',
      description: 'Check autonomous agents',
      icon: <Bot className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800',
      path: '/super-admin/mcp/agents'
    },
    {
      title: 'View Analytics',
      description: 'Check system performance',
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800',
      path: '/super-admin/analytics'
    },
    {
      title: 'Portal Management',
      description: 'Manage customer portals',
      icon: <Globe className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800',
      path: '/super-admin/portals'
    }
  ];

  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return <Badge variant="outline" className="text-xs">Low</Badge>;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Sidebar */}
        <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto shadow-lg`}>
          
          {/* Enhanced Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-7 w-7 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Super Admin</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Platform</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">System Online</span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:block hidden hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.items ? (
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                      className={`w-full justify-between text-sm font-medium transition-all duration-200 ${
                        expandedMenu === item.label 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${expandedMenu === item.label ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-all duration-200`}>
                          {item.icon}
                        </div>
                        {sidebarOpen && <span>{item.label}</span>}
                      </div>
                      {sidebarOpen && (
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMenu === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </Button>
                    {sidebarOpen && expandedMenu === item.label && (
                      <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.items.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            onClick={() => navigate(subItem.path)}
                            className={`w-full justify-start text-sm transition-all duration-200 ${
                              location.pathname === subItem.path
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-1.5 rounded-lg ${location.pathname === subItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} transition-all duration-200`}>
                                {subItem.icon}
                              </div>
                              <span>{subItem.label}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => navigate(item.path)}
                    className={`w-full justify-start text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${location.pathname === item.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-all duration-200`}>
                        {item.icon}
                      </div>
                      {sidebarOpen && <span>{item.label}</span>}
                    </div>
                  </Button>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Enhanced Breadcrumbs */}
                <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-gray-900 dark:text-white font-semibold hidden sm:inline">Super Admin</span>
                  <span className="text-gray-900 dark:text-white font-semibold sm:hidden">Admin</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Home</span>
                </nav>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Enhanced Search */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 transition-all"
                  />
                </div>

                {/* Enhanced Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:bg-blue-100 dark:hover:bg-gray-700">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">3</span>
                </Button>

                {/* Enhanced Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                {/* Enhanced User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 sm:space-x-3 hover:bg-blue-100 dark:hover:bg-gray-700">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-sm">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">admin@company.com</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Enhanced Main Content Area */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8">
                  {/* Enhanced Page Header */}
                  <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Enterprise Dashboard</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                      Welcome to the Professional Super Admin Dashboard. Monitor your system performance, manage users, and control autonomous agents.
                    </p>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {statsData.map((stat, index) => (
                      <Card key={index} className={`${stat.color} border-2`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                              <div className="flex items-center space-x-1">
                                {stat.trend === 'up' ? (
                                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                                )}
                                <p className="text-sm font-semibold text-green-600">{stat.change} from last month</p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                            </div>
                            <div className={`p-3 ${stat.iconBg} rounded-lg shadow-sm`}>
                              {stat.icon}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Enhanced Main Content Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Enhanced Recent Activity */}
                    <div className="xl:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>Latest system activities and user actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recentActivity.map((activity) => (
                              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getStatusIcon(activity.status)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.user}</p>
                                    <Badge variant="outline" className="text-xs">{activity.module}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                                </div>
                                <div className="flex-shrink-0">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* System Alerts */}
                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>System Alerts</CardTitle>
                          <CardDescription>Active system notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {systemAlerts.map((alert) => (
                              <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{alert.message}</p>
                                    {getPriorityBadge(alert.priority)}
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Enhanced Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-700"
                            onClick={() => navigate(action.path)}
                          >
                            <div className={`p-2 rounded-lg ${action.color} shadow-sm`}>
                              {action.icon}
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              } />

              {/* All Other Routes - Use SuperAdminRoutes */}
              <Route path="/*" element={<SuperAdminRoutes />} />
            </Routes>
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
                onClick={() => navigate('/super-admin/users/new')}
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
                onClick={() => navigate('/super-admin/analytics')}
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

export default SuperAdmin;
