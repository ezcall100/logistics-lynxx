import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
  ArrowUpRight, ArrowDownRight, Target, PieChart, LineChart
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

// Modern Super Admin Component with Shadcn/ui
const SuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation menu items
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/super-admin',
      items: [
        { label: 'Overview', icon: <Home className="h-4 w-4" />, path: '/super-admin' },
        { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/analytics' },
        { label: 'Performance', icon: <TrendingUp className="h-4 w-4" />, path: '/super-admin/performance' },
      ]
    },
    {
      label: 'User Management',
      icon: <Users className="h-5 w-5" />,
      path: '/super-admin/users',
      items: [
        { label: 'All Users', icon: <Users className="h-4 w-4" />, path: '/super-admin/users' },
        { label: 'Roles & Permissions', icon: <Shield className="h-4 w-4" />, path: '/super-admin/roles' },
        { label: 'User Groups', icon: <Building2 className="h-4 w-4" />, path: '/super-admin/groups' },
        { label: 'Access Control', icon: <Lock className="h-4 w-4" />, path: '/super-admin/access' },
      ]
    },
    {
      label: 'System Administration',
      icon: <Settings className="h-5 w-5" />,
      path: '/super-admin/system',
      items: [
        { label: 'Database', icon: <Database className="h-4 w-4" />, path: '/super-admin/database' },
        { label: 'API Management', icon: <Code className="h-4 w-4" />, path: '/super-admin/api' },
        { label: 'Server Monitoring', icon: <Server className="h-4 w-4" />, path: '/super-admin/servers' },
        { label: 'Deployment', icon: <Upload className="h-4 w-4" />, path: '/super-admin/deployment' },
      ]
    },
    {
      label: 'Security Center',
      icon: <Shield className="h-5 w-5" />,
      path: '/super-admin/security',
      items: [
        { label: 'Security Audit', icon: <Shield className="h-4 w-4" />, path: '/super-admin/security/audit' },
        { label: 'Access Logs', icon: <FileText className="h-4 w-4" />, path: '/super-admin/security/logs' },
        { label: 'Data Protection', icon: <Lock className="h-4 w-4" />, path: '/super-admin/security/data' },
        { label: 'Incident Response', icon: <AlertTriangle className="h-4 w-4" />, path: '/super-admin/security/incidents' },
      ]
    },
    {
      label: 'Portal Management',
      icon: <Globe className="h-5 w-5" />,
      path: '/super-admin/portals',
      items: [
        { label: 'Portal Overview', icon: <Globe className="h-4 w-4" />, path: '/super-admin/portals' },
        { label: 'Portal Configuration', icon: <Settings className="h-4 w-4" />, path: '/super-admin/portals/config' },
        { label: 'User Access', icon: <Users className="h-4 w-4" />, path: '/super-admin/portals/users' },
        { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/super-admin/portals/analytics' },
      ]
    },
    {
      label: 'MCP Control Center',
      icon: <Brain className="h-5 w-5" />,
      path: '/super-admin/mcp',
      items: [
        { label: 'System Overview', icon: <Brain className="h-4 w-4" />, path: '/super-admin/mcp' },
        { label: 'Agent Management', icon: <Users className="h-4 w-4" />, path: '/super-admin/mcp/agents' },
        { label: 'AI Models', icon: <Cpu className="h-4 w-4" />, path: '/super-admin/mcp/models' },
        { label: 'Automation Rules', icon: <Zap className="h-4 w-4" />, path: '/super-admin/mcp/automation' },
      ]
    },
    {
      label: 'Business Operations',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/super-admin/business',
      items: [
        { label: 'Customer Management', icon: <Users className="h-4 w-4" />, path: '/super-admin/business/customers' },
        { label: 'Billing & Invoicing', icon: <CreditCard className="h-4 w-4" />, path: '/super-admin/business/billing' },
        { label: 'Support Management', icon: <MessageSquare className="h-4 w-4" />, path: '/super-admin/business/support' },
        { label: 'Partner Management', icon: <Building2 className="h-4 w-4" />, path: '/super-admin/business/partners' },
      ]
    },
  ];

  // Dashboard data
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: '+8.2%',
      trend: 'up',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
    },
    {
      title: 'Active Portals',
      value: '156',
      change: '+3.2%',
      trend: 'up',
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Updated portal configuration',
      status: 'success',
      time: '2 minutes ago'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Created new user group',
      status: 'success',
      time: '5 minutes ago'
    },
    {
      id: 3,
      user: 'Mike Wilson',
      action: 'Deployed new version',
      status: 'info',
      time: '10 minutes ago'
    },
    {
      id: 4,
      user: 'Lisa Brown',
      action: 'Security audit completed',
      status: 'success',
      time: '15 minutes ago'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      message: 'Database backup completed successfully',
      type: 'success',
      time: '1 hour ago'
    },
    {
      id: 2,
      message: 'New user registration spike detected',
      type: 'info',
      time: '2 hours ago'
    },
    {
      id: 3,
      message: 'API rate limit approaching threshold',
      type: 'warning',
      time: '3 hours ago'
    }
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: <Plus className="h-6 w-6" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/super-admin/users/new'
    },
    {
      title: 'System Backup',
      description: 'Create system backup',
      icon: <Download className="h-6 w-6" />,
      color: 'bg-green-500 hover:bg-green-600',
      path: '/super-admin/system/backup'
    },
    {
      title: 'Security Scan',
      description: 'Run security audit',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/super-admin/security/scan'
    },
    {
      title: 'View Analytics',
      description: 'Check system performance',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/super-admin/analytics'
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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Super Admin</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enterprise Platform</p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:block hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.items ? (
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        {sidebarOpen && <span>{item.label}</span>}
                      </div>
                      {sidebarOpen && <ChevronDown className="h-4 w-4" />}
                    </Button>
                    {sidebarOpen && (
                      <div className="ml-6 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            onClick={() => navigate(subItem.path)}
                            className="w-full justify-start text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="flex items-center space-x-3">
                              {subItem.icon}
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
                    className="w-full justify-start text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
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
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-gray-900 dark:text-white font-semibold">Super Admin</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Dashboard</span>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all"
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">3</span>
                </Button>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
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

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8">
                  {/* Page Header */}
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Welcome to the Enterprise Super Admin Dashboard. Monitor your system performance and manage your platform.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                              {stat.icon}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
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
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.user}</p>
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
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{alert.message}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-24 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition-all duration-200"
                            onClick={() => navigate(action.path)}
                          >
                            <div className={`p-2 rounded-lg ${action.color} text-white`}>
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

              {/* Other Routes */}
              <Route path="/*" element={
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Under Development</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      This page is currently being developed as part of the enterprise implementation.
                    </p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <Code className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Development in Progress</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
                            This feature is being built with enterprise-grade standards and will be available soon.
                          </p>
                        </div>
                        <Button onClick={() => navigate('/super-admin')}>
                          Back to Dashboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
