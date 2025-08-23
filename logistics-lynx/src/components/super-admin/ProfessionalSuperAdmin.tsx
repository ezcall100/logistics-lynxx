import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  LayoutDashboard, Users, Settings, Shield, Activity, Globe,
  BarChart3, Brain, Briefcase, Code, Menu, TrendingUp,
  UserCheck, DollarSign, AlertTriangle, Database, Server,
  Cpu, FileText, Network, Zap, Lock, Bell,
  Building2, Truck, Package, Calculator, FileSpreadsheet,
  Search, Filter, Download, Upload, RefreshCw, ChevronRight,
  ChevronDown, MoreHorizontal, Plus, Edit, Trash2, Eye,
  Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle,
  XCircle, AlertCircle, Info, Settings as SettingsIcon,
  LogOut, Moon, Sun, Bell as BellIcon, HelpCircle
} from 'lucide-react';

// Enterprise Super Admin Portal
const ProfessionalSuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Enterprise Menu Structure
  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/super-admin',
      badge: null
    },
    {
      name: 'User Management',
      icon: Users,
      path: '/super-admin/users',
      badge: '12',
      submenu: [
        { name: 'All Users', path: '/super-admin/users/all', icon: Users },
        { name: 'User Roles', path: '/super-admin/users/roles', icon: Shield },
        { name: 'User Groups', path: '/super-admin/users/groups', icon: Building2 },
        { name: 'Access Control', path: '/super-admin/users/access', icon: Lock },
        { name: 'User Analytics', path: '/super-admin/users/analytics', icon: BarChart3 },
        { name: 'Billing Management', path: '/super-admin/users/billing', icon: DollarSign },
        { name: 'Support Tickets', path: '/super-admin/users/support', icon: FileText },
        { name: 'User Onboarding', path: '/super-admin/users/onboarding', icon: UserCheck }
      ]
    },
    {
      name: 'System Administration',
      icon: Settings,
      path: '/super-admin/system',
      badge: null,
      submenu: [
        { name: 'Database Management', path: '/super-admin/system/database', icon: Database },
        { name: 'API Management', path: '/super-admin/system/api', icon: Server },
        { name: 'Server Monitoring', path: '/super-admin/system/monitoring', icon: Cpu },
        { name: 'Deployment', path: '/super-admin/system/deployment', icon: Zap },
        { name: 'Configuration', path: '/super-admin/system/config', icon: Settings },
        { name: 'Backup & Recovery', path: '/super-admin/system/backup', icon: Database },
        { name: 'Security Settings', path: '/super-admin/system/security', icon: Shield },
        { name: 'Integration Hub', path: '/super-admin/system/integrations', icon: Network },
        { name: 'File Storage', path: '/super-admin/system/storage', icon: FileText },
        { name: 'Email Services', path: '/super-admin/system/email', icon: FileText }
      ]
    },
    {
      name: 'Security Center',
      icon: Shield,
      path: '/super-admin/security',
      badge: '3',
      submenu: [
        { name: 'Security Audit', path: '/super-admin/security/audit', icon: Shield },
        { name: 'Access Logs', path: '/super-admin/security/logs', icon: FileText },
        { name: 'Data Protection', path: '/super-admin/security/data', icon: Lock },
        { name: 'API Security', path: '/super-admin/security/api', icon: Server },
        { name: 'User Permissions', path: '/super-admin/security/permissions', icon: Users },
        { name: 'Security Policies', path: '/super-admin/security/policies', icon: Shield },
        { name: 'Incident Response', path: '/super-admin/security/incidents', icon: AlertTriangle },
        { name: 'Compliance', path: '/super-admin/security/compliance', icon: FileText }
      ]
    },
    {
      name: 'System Monitoring',
      icon: Activity,
      path: '/super-admin/monitoring',
      badge: null,
      submenu: [
        { name: 'Performance Monitoring', path: '/super-admin/monitoring/performance', icon: Activity },
        { name: 'Error Tracking', path: '/super-admin/monitoring/errors', icon: AlertTriangle },
        { name: 'Log Analysis', path: '/super-admin/monitoring/logs', icon: FileText },
        { name: 'Alert Management', path: '/super-admin/monitoring/alerts', icon: Bell },
        { name: 'Uptime Monitoring', path: '/super-admin/monitoring/uptime', icon: Activity },
        { name: 'Resource Usage', path: '/super-admin/monitoring/resources', icon: Cpu },
        { name: 'Network Monitoring', path: '/super-admin/monitoring/network', icon: Network },
        { name: 'Health Checks', path: '/super-admin/monitoring/health', icon: Activity }
      ]
    },
    {
      name: 'Portal Management',
      icon: Globe,
      path: '/super-admin/portals',
      badge: null,
      submenu: [
        { name: 'Portal Overview', path: '/super-admin/portals/overview', icon: LayoutDashboard },
        { name: 'Portal Configuration', path: '/super-admin/portals/config', icon: Settings },
        { name: 'User Access', path: '/super-admin/portals/users', icon: Users },
        { name: 'Feature Management', path: '/super-admin/portals/features', icon: Zap },
        { name: 'Analytics', path: '/super-admin/portals/analytics', icon: BarChart3 },
        { name: 'Billing', path: '/super-admin/portals/billing', icon: DollarSign },
        { name: 'Support', path: '/super-admin/portals/support', icon: FileText },
        { name: 'Integration', path: '/super-admin/portals/integrations', icon: Network },
        { name: 'Backup', path: '/super-admin/portals/backup', icon: Database },
        { name: 'Security', path: '/super-admin/portals/security', icon: Shield },
        { name: 'Compliance', path: '/super-admin/portals/compliance', icon: FileText },
        { name: 'Deployment', path: '/super-admin/portals/deployment', icon: Zap }
      ]
    },
    {
      name: 'Analytics & Reports',
      icon: BarChart3,
      path: '/super-admin/analytics',
      badge: null,
      submenu: [
        { name: 'Business Analytics', path: '/super-admin/analytics/business', icon: TrendingUp },
        { name: 'User Analytics', path: '/super-admin/analytics/users', icon: Users },
        { name: 'Performance Reports', path: '/super-admin/analytics/performance', icon: Activity },
        { name: 'Security Reports', path: '/super-admin/analytics/security', icon: Shield },
        { name: 'Financial Reports', path: '/super-admin/analytics/financial', icon: DollarSign },
        { name: 'Operational Reports', path: '/super-admin/analytics/operational', icon: Settings },
        { name: 'Custom Reports', path: '/super-admin/analytics/custom', icon: BarChart3 },
        { name: 'Data Export', path: '/super-admin/analytics/export', icon: FileText },
        { name: 'Dashboard Builder', path: '/super-admin/analytics/dashboard', icon: LayoutDashboard },
        { name: 'Scheduled Reports', path: '/super-admin/analytics/scheduled', icon: Bell }
      ]
    },
    {
      name: 'MCP Control Center',
      icon: Brain,
      path: '/super-admin/mcp',
      badge: 'AI',
      submenu: [
        { name: 'System Overview', path: '/super-admin/mcp/overview', icon: LayoutDashboard },
        { name: 'Agent Management', path: '/super-admin/mcp/agents', icon: Users },
        { name: 'AI Models', path: '/super-admin/mcp/models', icon: Brain },
        { name: 'Data Pipeline', path: '/super-admin/mcp/pipeline', icon: Database },
        { name: 'Machine Learning', path: '/super-admin/mcp/ml', icon: Brain },
        { name: 'AI Analytics', path: '/super-admin/mcp/analytics', icon: BarChart3 },
        { name: 'Automation Rules', path: '/super-admin/mcp/rules', icon: Zap },
        { name: 'Integration Hub', path: '/super-admin/mcp/integrations', icon: Network },
        { name: 'Monitoring', path: '/super-admin/mcp/monitoring', icon: Activity },
        { name: 'Compliance', path: '/super-admin/mcp/compliance', icon: Shield },
        { name: 'Documentation', path: '/super-admin/mcp/docs', icon: FileText },
        { name: 'Support', path: '/super-admin/mcp/support', icon: FileText }
      ]
    },
    {
      name: 'Business Operations',
      icon: Briefcase,
      path: '/super-admin/business',
      badge: null,
      submenu: [
        { name: 'Customer Management', path: '/super-admin/business/customers', icon: Users },
        { name: 'Sales Pipeline', path: '/super-admin/business/sales', icon: TrendingUp },
        { name: 'Billing & Invoicing', path: '/super-admin/business/billing', icon: DollarSign },
        { name: 'Support Management', path: '/super-admin/business/support', icon: FileText },
        { name: 'Documentation', path: '/super-admin/business/docs', icon: FileText },
        { name: 'Marketing Tools', path: '/super-admin/business/marketing', icon: BarChart3 },
        { name: 'Partner Management', path: '/super-admin/business/partners', icon: Building2 },
        { name: 'Legal & Compliance', path: '/super-admin/business/legal', icon: Shield }
      ]
    },
    {
      name: 'Development & DevOps',
      icon: Code,
      path: '/super-admin/devops',
      badge: null,
      submenu: [
        { name: 'Code Repository', path: '/super-admin/devops/repo', icon: Code },
        { name: 'CI/CD Pipeline', path: '/super-admin/devops/pipeline', icon: Zap },
        { name: 'Testing', path: '/super-admin/devops/testing', icon: Activity },
        { name: 'Environment Management', path: '/super-admin/devops/environments', icon: Settings },
        { name: 'Performance Testing', path: '/super-admin/devops/performance', icon: Activity },
        { name: 'Security Testing', path: '/super-admin/devops/security', icon: Shield },
        { name: 'Documentation', path: '/super-admin/devops/docs', icon: FileText },
        { name: 'Release Management', path: '/super-admin/devops/releases', icon: Zap }
      ]
    }
  ];

  // Sample data for enterprise dashboard
  const statsData = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'System Uptime', value: '99.9%', change: '+0.1%', icon: Activity, color: 'text-green-600' },
    { title: 'Monthly Revenue', value: '$847K', change: '+8%', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Active Portals', value: '156', change: '+3', icon: Globe, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new portal', time: '2 minutes ago', status: 'success' },
    { id: 2, user: 'Sarah Johnson', action: 'Updated user permissions', time: '5 minutes ago', status: 'info' },
    { id: 3, user: 'Mike Wilson', action: 'Deployed new version', time: '10 minutes ago', status: 'success' },
    { id: 4, user: 'Lisa Brown', action: 'Security alert resolved', time: '15 minutes ago', status: 'warning' },
    { id: 5, user: 'David Lee', action: 'Database backup completed', time: '20 minutes ago', status: 'success' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-background">
        {/* Enterprise Sidebar */}
        <div className={`layout-sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Super Admin</h2>
                    <p className="text-xs text-muted-foreground">Enterprise Platform</p>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-1">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`w-full justify-start h-10 text-sm ${
                    location.pathname === item.path ? 'bg-secondary text-secondary-foreground' : ''
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {sidebarOpen && (
                    <div className="flex items-center justify-between w-full">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Enterprise Header */}
          <header className="layout-header">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Breadcrumbs */}
                <nav className="breadcrumb">
                  <div className="breadcrumb-item">
                    <span className="breadcrumb-link">Super Admin</span>
                  </div>
                  <ChevronRight className="h-4 w-4 breadcrumb-separator" />
                  <div className="breadcrumb-item">
                    <span className="breadcrumb-current">Dashboard</span>
                  </div>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 input w-64"
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">3</Badge>
                </Button>

                {/* Theme Toggle */}
                <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@company.com</p>
                  </div>
                  <Button variant="ghost" size="sm" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="layout-content p-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  {/* Page Header */}
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                      Welcome to the Enterprise Super Admin Dashboard. Monitor your system performance and manage your platform.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                              <stat.icon className="h-6 w-6" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest system activities and user actions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary">
                              <div className="flex-shrink-0">
                                {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                                {activity.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                                {activity.status === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{activity.user}</p>
                                <p className="text-sm text-muted-foreground">{activity.action}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* System Alerts */}
                    <Card>
                      <CardHeader>
                        <CardTitle>System Alerts</CardTitle>
                        <CardDescription>Active system notifications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {systemAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                              <div className="flex-shrink-0 mt-0.5">
                                {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                                {alert.type === 'info' && <Info className="h-4 w-4 text-blue-600" />}
                                {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground">{alert.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => navigate('/super-admin/users/all')}>
                          <Users className="h-6 w-6" />
                          <span className="text-sm">Manage Users</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => navigate('/super-admin/security/audit')}>
                          <Shield className="h-6 w-6" />
                          <span className="text-sm">Security Audit</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => navigate('/super-admin/monitoring/health')}>
                          <Activity className="h-6 w-6" />
                          <span className="text-sm">System Health</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => navigate('/super-admin/analytics/business')}>
                          <BarChart3 className="h-6 w-6" />
                          <span className="text-sm">View Analytics</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              } />

              {/* Other Routes */}
              <Route path="/*" element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Page Under Development</h1>
                    <p className="text-muted-foreground mt-2">
                      This page is currently being developed as part of the enterprise implementation.
                    </p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto">
                          <Code className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Development in Progress</h3>
                          <p className="text-muted-foreground">
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

export default ProfessionalSuperAdmin;
