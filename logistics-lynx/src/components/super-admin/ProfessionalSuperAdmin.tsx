import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { DropdownMenu } from '../../components/ui/dropdown-menu';
import { Accordion } from '../../components/ui/accordion';
import { StatCard } from '../dashboard/StatCard';
import { ActivityFeed } from '../dashboard/ActivityFeed';
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
  LogOut, Moon, Sun, Bell as BellIcon, HelpCircle,
  Home, Grid, PieChart, Target, Rocket, Star
} from 'lucide-react';

// Professional Enterprise Super Admin Portal
const ProfessionalSuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Professional Menu Structure
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/super-admin',
      icon: <LayoutDashboard className="h-4 w-4" />
    },
    {
      label: 'User Management',
      icon: <Users className="h-4 w-4" />,
      items: [
        { label: 'All Users', path: '/super-admin/users/all', icon: <Users className="h-4 w-4" /> },
        { label: 'User Roles', path: '/super-admin/users/roles', icon: <Shield className="h-4 w-4" /> },
        { label: 'User Groups', path: '/super-admin/users/groups', icon: <Building2 className="h-4 w-4" /> },
        { label: 'Access Control', path: '/super-admin/users/access', icon: <Lock className="h-4 w-4" /> },
        { label: 'User Analytics', path: '/super-admin/users/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Billing Management', path: '/super-admin/users/billing', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Support Tickets', path: '/super-admin/users/support', icon: <FileText className="h-4 w-4" /> },
        { label: 'User Onboarding', path: '/super-admin/users/onboarding', icon: <UserCheck className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Administration',
      icon: <Settings className="h-4 w-4" />,
      items: [
        { label: 'Database Management', path: '/super-admin/system/database', icon: <Database className="h-4 w-4" /> },
        { label: 'API Management', path: '/super-admin/system/api', icon: <Server className="h-4 w-4" /> },
        { label: 'Server Monitoring', path: '/super-admin/system/monitoring', icon: <Cpu className="h-4 w-4" /> },
        { label: 'Deployment', path: '/super-admin/system/deployment', icon: <Zap className="h-4 w-4" /> },
        { label: 'Configuration', path: '/super-admin/system/config', icon: <Settings className="h-4 w-4" /> },
        { label: 'Backup & Recovery', path: '/super-admin/system/backup', icon: <Database className="h-4 w-4" /> },
        { label: 'Security Settings', path: '/super-admin/system/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Integration Hub', path: '/super-admin/system/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'File Storage', path: '/super-admin/system/storage', icon: <FileText className="h-4 w-4" /> },
        { label: 'Email Services', path: '/super-admin/system/email', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Security Center',
      icon: <Shield className="h-4 w-4" />,
      items: [
        { label: 'Security Audit', path: '/super-admin/security/audit', icon: <Shield className="h-4 w-4" /> },
        { label: 'Access Logs', path: '/super-admin/security/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Data Protection', path: '/super-admin/security/data', icon: <Lock className="h-4 w-4" /> },
        { label: 'API Security', path: '/super-admin/security/api', icon: <Server className="h-4 w-4" /> },
        { label: 'User Permissions', path: '/super-admin/security/permissions', icon: <Users className="h-4 w-4" /> },
        { label: 'Security Policies', path: '/super-admin/security/policies', icon: <Shield className="h-4 w-4" /> },
        { label: 'Incident Response', path: '/super-admin/security/incidents', icon: <AlertTriangle className="h-4 w-4" /> },
        { label: 'Compliance', path: '/super-admin/security/compliance', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Monitoring',
      icon: <Activity className="h-4 w-4" />,
      items: [
        { label: 'Performance Monitoring', path: '/super-admin/monitoring/performance', icon: <Activity className="h-4 w-4" /> },
        { label: 'Error Tracking', path: '/super-admin/monitoring/errors', icon: <AlertTriangle className="h-4 w-4" /> },
        { label: 'Log Analysis', path: '/super-admin/monitoring/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Alert Management', path: '/super-admin/monitoring/alerts', icon: <Bell className="h-4 w-4" /> },
        { label: 'Uptime Monitoring', path: '/super-admin/monitoring/uptime', icon: <Activity className="h-4 w-4" /> },
        { label: 'Resource Usage', path: '/super-admin/monitoring/resources', icon: <Cpu className="h-4 w-4" /> },
        { label: 'Network Monitoring', path: '/super-admin/monitoring/network', icon: <Network className="h-4 w-4" /> },
        { label: 'Health Checks', path: '/super-admin/monitoring/health', icon: <Activity className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Portal Management',
      icon: <Globe className="h-4 w-4" />,
      items: [
        { label: 'Portal Overview', path: '/super-admin/portals/overview', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'Portal Configuration', path: '/super-admin/portals/config', icon: <Settings className="h-4 w-4" /> },
        { label: 'User Access', path: '/super-admin/portals/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Feature Management', path: '/super-admin/portals/features', icon: <Zap className="h-4 w-4" /> },
        { label: 'Analytics', path: '/super-admin/portals/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Billing', path: '/super-admin/portals/billing', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Support', path: '/super-admin/portals/support', icon: <FileText className="h-4 w-4" /> },
        { label: 'Integration', path: '/super-admin/portals/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'Backup', path: '/super-admin/portals/backup', icon: <Database className="h-4 w-4" /> },
        { label: 'Security', path: '/super-admin/portals/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Compliance', path: '/super-admin/portals/compliance', icon: <FileText className="h-4 w-4" /> },
        { label: 'Deployment', path: '/super-admin/portals/deployment', icon: <Zap className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Analytics & Reports',
      icon: <BarChart3 className="h-4 w-4" />,
      items: [
        { label: 'Business Analytics', path: '/super-admin/analytics/business', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'User Analytics', path: '/super-admin/analytics/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Performance Reports', path: '/super-admin/analytics/performance', icon: <Activity className="h-4 w-4" /> },
        { label: 'Security Reports', path: '/super-admin/analytics/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Financial Reports', path: '/super-admin/analytics/financial', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Operational Reports', path: '/super-admin/analytics/operational', icon: <Settings className="h-4 w-4" /> },
        { label: 'Custom Reports', path: '/super-admin/analytics/custom', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Data Export', path: '/super-admin/analytics/export', icon: <FileText className="h-4 w-4" /> },
        { label: 'Dashboard Builder', path: '/super-admin/analytics/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'Scheduled Reports', path: '/super-admin/analytics/scheduled', icon: <Bell className="h-4 w-4" /> }
      ]
    },
    {
      label: 'MCP Control Center',
      icon: <Brain className="h-4 w-4" />,
      items: [
        { label: 'System Overview', path: '/super-admin/mcp/overview', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'Agent Management', path: '/super-admin/mcp/agents', icon: <Users className="h-4 w-4" /> },
        { label: 'AI Models', path: '/super-admin/mcp/models', icon: <Brain className="h-4 w-4" /> },
        { label: 'Data Pipeline', path: '/super-admin/mcp/pipeline', icon: <Database className="h-4 w-4" /> },
        { label: 'Machine Learning', path: '/super-admin/mcp/ml', icon: <Brain className="h-4 w-4" /> },
        { label: 'AI Analytics', path: '/super-admin/mcp/analytics', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Automation Rules', path: '/super-admin/mcp/rules', icon: <Zap className="h-4 w-4" /> },
        { label: 'Integration Hub', path: '/super-admin/mcp/integrations', icon: <Network className="h-4 w-4" /> },
        { label: 'Monitoring', path: '/super-admin/mcp/monitoring', icon: <Activity className="h-4 w-4" /> },
        { label: 'Compliance', path: '/super-admin/mcp/compliance', icon: <Shield className="h-4 w-4" /> },
        { label: 'Documentation', path: '/super-admin/mcp/docs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Support', path: '/super-admin/mcp/support', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Business Operations',
      icon: <Briefcase className="h-4 w-4" />,
      items: [
        { label: 'Customer Management', path: '/super-admin/business/customers', icon: <Users className="h-4 w-4" /> },
        { label: 'Sales Pipeline', path: '/super-admin/business/sales', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'Billing & Invoicing', path: '/super-admin/business/billing', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Support Management', path: '/super-admin/business/support', icon: <FileText className="h-4 w-4" /> },
        { label: 'Documentation', path: '/super-admin/business/docs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Marketing Tools', path: '/super-admin/business/marketing', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'Partner Management', path: '/super-admin/business/partners', icon: <Building2 className="h-4 w-4" /> },
        { label: 'Legal & Compliance', path: '/super-admin/business/legal', icon: <Shield className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Development & DevOps',
      icon: <Code className="h-4 w-4" />,
      items: [
        { label: 'Code Repository', path: '/super-admin/devops/repo', icon: <Code className="h-4 w-4" /> },
        { label: 'CI/CD Pipeline', path: '/super-admin/devops/pipeline', icon: <Zap className="h-4 w-4" /> },
        { label: 'Testing', path: '/super-admin/devops/testing', icon: <Activity className="h-4 w-4" /> },
        { label: 'Environment Management', path: '/super-admin/devops/environments', icon: <Settings className="h-4 w-4" /> },
        { label: 'Performance Testing', path: '/super-admin/devops/performance', icon: <Activity className="h-4 w-4" /> },
        { label: 'Security Testing', path: '/super-admin/devops/security', icon: <Shield className="h-4 w-4" /> },
        { label: 'Documentation', path: '/super-admin/devops/docs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Release Management', path: '/super-admin/devops/releases', icon: <Zap className="h-4 w-4" /> }
      ]
    }
  ];

  // Professional Dashboard Data
  const statsData = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12%', 
      changeType: 'positive' as const, 
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      title: 'System Uptime', 
      value: '99.9%', 
      change: '+0.1%', 
      changeType: 'positive' as const, 
      icon: <Activity className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$847K', 
      change: '+8%', 
      changeType: 'positive' as const, 
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      title: 'Active Portals', 
      value: '156', 
      change: '+3', 
      changeType: 'positive' as const, 
      icon: <Globe className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new portal', time: '2 minutes ago', status: 'success' as const },
    { id: 2, user: 'Sarah Johnson', action: 'Updated user permissions', time: '5 minutes ago', status: 'info' as const },
    { id: 3, user: 'Mike Wilson', action: 'Deployed new version', time: '10 minutes ago', status: 'success' as const },
    { id: 4, user: 'Lisa Brown', action: 'Security alert resolved', time: '15 minutes ago', status: 'warning' as const },
    { id: 5, user: 'David Lee', action: 'Database backup completed', time: '20 minutes ago', status: 'success' as const }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
  ];

  const userDropdownItems = [
    { label: 'Profile Settings', icon: <User className="h-4 w-4" />, onClick: () => {} },
    { label: 'Account Settings', icon: <Settings className="h-4 w-4" />, onClick: () => {} },
    { label: '', separator: true },
    { label: 'Help & Support', icon: <HelpCircle className="h-4 w-4" />, onClick: () => {} },
    { label: 'Sign Out', icon: <LogOut className="h-4 w-4" />, onClick: () => {} }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-background">
        {/* Professional Sidebar */}
        <aside className={`bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-lg font-bold text-text">Super Admin</h2>
                    <p className="text-xs text-text-muted">Enterprise Platform</p>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-1 lg:block hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <nav className="p-4">
            <Accordion 
              items={menuItems} 
              onItemClick={(path) => {
                navigate(path);
                setMobileMenuOpen(false);
              }}
            />
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Professional Header */}
          <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-text-muted">
                  <span className="text-text font-medium">Super Admin</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Dashboard</span>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 transition-all"
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">3</Badge>
                </Button>

                {/* Theme Toggle */}
                <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                {/* User Menu */}
                <DropdownMenu
                  trigger={
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-text">Admin User</p>
                        <p className="text-xs text-text-muted">admin@company.com</p>
                      </div>
                    </div>
                  }
                  items={userDropdownItems}
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-background p-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8">
                  {/* Page Header */}
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-text">Dashboard</h1>
                    <p className="text-text-muted text-lg">
                      Welcome to the Enterprise Super Admin Dashboard. Monitor your system performance and manage your platform.
                    </p>
                  </div>

                  {/* Professional Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                      <div key={index} className="group">
                        <div className={`${stat.bgColor} p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-text-muted">{stat.title}</p>
                              <p className="text-3xl font-bold text-text">{stat.value}</p>
                              <p className={`text-xs font-medium ${
                                stat.changeType === 'positive' ? 'text-success' : 
                                stat.changeType === 'negative' ? 'text-error' : 'text-text-muted'
                              }`}>
                                {stat.change} from last month
                              </p>
                            </div>
                            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                              {stat.icon}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                      <ActivityFeed items={recentActivity} />
                    </div>

                    {/* System Alerts */}
                    <div className="bg-card border border-border rounded-2xl shadow-sm">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-semibold text-text">System Alerts</h3>
                        <p className="text-sm text-text-muted mt-1">Active system notifications</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {systemAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-start space-x-3 p-4 rounded-xl border border-border hover:bg-surface transition-colors">
                              <div className="flex-shrink-0 mt-0.5">
                                {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                                {alert.type === 'info' && <Info className="h-4 w-4 text-info" />}
                                {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-text font-medium">{alert.message}</p>
                                <p className="text-xs text-text-muted mt-1">{alert.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-card border border-border rounded-2xl shadow-sm">
                    <div className="p-6 border-b border-border">
                      <h3 className="text-lg font-semibold text-text">Quick Actions</h3>
                      <p className="text-sm text-text-muted mt-1">Common administrative tasks</p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button 
                          variant="outline" 
                          className="h-24 flex-col space-y-3 hover:bg-blue-50 hover:border-blue-200 transition-all" 
                          onClick={() => navigate('/super-admin/users/all')}
                        >
                          <Users className="h-8 w-8 text-blue-600" />
                          <span className="text-sm font-medium">Manage Users</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-24 flex-col space-y-3 hover:bg-green-50 hover:border-green-200 transition-all" 
                          onClick={() => navigate('/super-admin/security/audit')}
                        >
                          <Shield className="h-8 w-8 text-green-600" />
                          <span className="text-sm font-medium">Security Audit</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-24 flex-col space-y-3 hover:bg-purple-50 hover:border-purple-200 transition-all" 
                          onClick={() => navigate('/super-admin/monitoring/health')}
                        >
                          <Activity className="h-8 w-8 text-purple-600" />
                          <span className="text-sm font-medium">System Health</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-24 flex-col space-y-3 hover:bg-orange-50 hover:border-orange-200 transition-all" 
                          onClick={() => navigate('/super-admin/analytics/business')}
                        >
                          <BarChart3 className="h-8 w-8 text-orange-600" />
                          <span className="text-sm font-medium">View Analytics</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* Other Routes */}
              <Route path="/*" element={
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-text">Page Under Development</h1>
                    <p className="text-text-muted text-lg">
                      This page is currently being developed as part of the enterprise implementation.
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-2xl shadow-sm">
                    <div className="p-12">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <Code className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-text">Development in Progress</h3>
                          <p className="text-text-muted mt-2 max-w-md mx-auto">
                            This feature is being built with enterprise-grade standards and will be available soon.
                          </p>
                        </div>
                        <Button 
                          onClick={() => navigate('/super-admin')}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          Back to Dashboard
                        </Button>
                      </div>
                    </div>
                  </div>
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
