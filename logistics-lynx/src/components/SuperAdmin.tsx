import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Settings, Shield, Activity, Globe,
  BarChart3, Brain, Briefcase, Code, Menu, X, Search,
  Bell, User, LogOut, Moon, Sun, ChevronRight, ChevronDown,
  Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw,
  TrendingUp, DollarSign, AlertTriangle, Database, Server,
  Cpu, FileText, Network, Zap, Lock, CheckCircle, XCircle,
  AlertCircle, Info, HelpCircle, Settings as SettingsIcon
} from 'lucide-react';

// Modern Super Admin Component
const SuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation menu structure
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/super-admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      label: 'User Management',
      icon: <Users className="h-5 w-5" />,
      items: [
        { label: 'All Users', path: '/super-admin/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Roles & Permissions', path: '/super-admin/roles', icon: <Shield className="h-4 w-4" /> },
        { label: 'User Groups', path: '/super-admin/groups', icon: <Users className="h-4 w-4" /> },
        { label: 'Access Control', path: '/super-admin/access', icon: <Lock className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Administration',
      icon: <Settings className="h-5 w-5" />,
      items: [
        { label: 'Database Management', path: '/super-admin/database', icon: <Database className="h-4 w-4" /> },
        { label: 'API Management', path: '/super-admin/api', icon: <Server className="h-4 w-4" /> },
        { label: 'Server Monitoring', path: '/super-admin/monitoring', icon: <Cpu className="h-4 w-4" /> },
        { label: 'Configuration', path: '/super-admin/config', icon: <Settings className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Security Center',
      icon: <Shield className="h-5 w-5" />,
      items: [
        { label: 'Security Audit', path: '/super-admin/security/audit', icon: <Shield className="h-4 w-4" /> },
        { label: 'Access Logs', path: '/super-admin/security/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Data Protection', path: '/super-admin/security/data', icon: <Lock className="h-4 w-4" /> },
        { label: 'Compliance', path: '/super-admin/security/compliance', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      label: 'System Monitoring',
      icon: <Activity className="h-5 w-5" />,
      items: [
        { label: 'Performance', path: '/super-admin/monitoring/performance', icon: <Activity className="h-4 w-4" /> },
        { label: 'Error Tracking', path: '/super-admin/monitoring/errors', icon: <AlertTriangle className="h-4 w-4" /> },
        { label: 'Log Analysis', path: '/super-admin/monitoring/logs', icon: <FileText className="h-4 w-4" /> },
        { label: 'Health Checks', path: '/super-admin/monitoring/health', icon: <CheckCircle className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Portal Management',
      icon: <Globe className="h-5 w-5" />,
      items: [
        { label: 'Portal Overview', path: '/super-admin/portals', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'Portal Configuration', path: '/super-admin/portals/config', icon: <Settings className="h-4 w-4" /> },
        { label: 'User Access', path: '/super-admin/portals/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Analytics', path: '/super-admin/portals/analytics', icon: <BarChart3 className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Analytics & Reports',
      icon: <BarChart3 className="h-5 w-5" />,
      items: [
        { label: 'Business Analytics', path: '/super-admin/analytics/business', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'User Analytics', path: '/super-admin/analytics/users', icon: <Users className="h-4 w-4" /> },
        { label: 'Performance Reports', path: '/super-admin/analytics/performance', icon: <Activity className="h-4 w-4" /> },
        { label: 'Financial Reports', path: '/super-admin/analytics/financial', icon: <DollarSign className="h-4 w-4" /> }
      ]
    },
    {
      label: 'MCP Control Center',
      icon: <Brain className="h-5 w-5" />,
      items: [
        { label: 'System Overview', path: '/super-admin/mcp/overview', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'Agent Management', path: '/super-admin/mcp/agents', icon: <Users className="h-4 w-4" /> },
        { label: 'AI Models', path: '/super-admin/mcp/models', icon: <Brain className="h-4 w-4" /> },
        { label: 'Data Pipeline', path: '/super-admin/mcp/pipeline', icon: <Database className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Business Operations',
      icon: <Briefcase className="h-5 w-5" />,
      items: [
        { label: 'Customer Management', path: '/super-admin/business/customers', icon: <Users className="h-4 w-4" /> },
        { label: 'Sales Pipeline', path: '/super-admin/business/sales', icon: <TrendingUp className="h-4 w-4" /> },
        { label: 'Billing & Invoicing', path: '/super-admin/business/billing', icon: <DollarSign className="h-4 w-4" /> },
        { label: 'Support Management', path: '/super-admin/business/support', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      label: 'Development & DevOps',
      icon: <Code className="h-5 w-5" />,
      items: [
        { label: 'Code Repository', path: '/super-admin/devops/repo', icon: <Code className="h-4 w-4" /> },
        { label: 'CI/CD Pipeline', path: '/super-admin/devops/pipeline', icon: <Zap className="h-4 w-4" /> },
        { label: 'Testing', path: '/super-admin/devops/testing', icon: <Activity className="h-4 w-4" /> },
        { label: 'Environment Management', path: '/super-admin/devops/environments', icon: <Settings className="h-4 w-4" /> }
      ]
    }
  ];

  // Dashboard data
  const statsData = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: <Users className="h-6 w-6" />, color: 'blue' },
    { title: 'System Uptime', value: '99.9%', change: '+0.1%', icon: <Activity className="h-6 w-6" />, color: 'green' },
    { title: 'Monthly Revenue', value: '$847K', change: '+8%', icon: <DollarSign className="h-6 w-6" />, color: 'purple' },
    { title: 'Active Portals', value: '156', change: '+3', icon: <Globe className="h-6 w-6" />, color: 'orange' }
  ];

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new portal', time: '2 min ago', status: 'success' },
    { id: 2, user: 'Sarah Johnson', action: 'Updated user permissions', time: '5 min ago', status: 'info' },
    { id: 3, user: 'Mike Wilson', action: 'Deployed new version', time: '10 min ago', status: 'success' },
    { id: 4, user: 'Lisa Brown', action: 'Security alert resolved', time: '15 min ago', status: 'warning' },
    { id: 5, user: 'David Lee', action: 'Database backup completed', time: '20 min ago', status: 'success' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
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
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`sidebar transition-all duration-300 ${
          sidebarOpen ? 'w-72' : 'w-16'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-7 w-7 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">Super Admin</h2>
                    <p className="text-sm text-text-muted">Enterprise Platform</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-bg-tertiary lg:block hidden transition-colors"
              >
                <Menu className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.items ? (
                  <div className="space-y-1">
                    <button className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-text-secondary hover:bg-bg-tertiary rounded-xl transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        {sidebarOpen && <span>{item.label}</span>}
                      </div>
                      {sidebarOpen && <ChevronDown className="h-4 w-4" />}
                    </button>
                    {sidebarOpen && (
                      <div className="ml-6 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => navigate(subItem.path)}
                            className="w-full flex items-center space-x-3 p-3 text-sm text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary rounded-lg transition-all duration-200"
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center space-x-3 p-3 text-sm font-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded-xl transition-all duration-200"
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
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
          <header className="header px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-bg-tertiary lg:hidden transition-colors"
                >
                  <Menu className="h-5 w-5 text-text-secondary" />
                </button>
                
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-text-muted">
                  <span className="text-text-primary font-semibold">Super Admin</span>
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
                    className="pl-10 pr-4 py-2 bg-bg-elevated border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent w-64 transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-bg-tertiary transition-colors">
                  <Bell className="h-5 w-5 text-text-secondary" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">3</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-text-secondary" /> : <Moon className="h-5 w-5 text-text-secondary" />}
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-text-primary">Admin User</p>
                    <p className="text-xs text-text-muted">admin@company.com</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="main-content flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8 fade-in">
                  {/* Page Header */}
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-text-primary">Dashboard</h1>
                    <p className="text-lg text-text-secondary">
                      Welcome to the Enterprise Super Admin Dashboard. Monitor your system performance and manage your platform.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                      <div key={index} className={`stats-card ${stat.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-text-muted">{stat.title}</p>
                            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                            <p className="text-xs text-green-600 font-semibold">{stat.change} from last month</p>
                          </div>
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="text-xl font-semibold text-text-primary">Recent Activity</h3>
                          <p className="text-sm text-text-muted">Latest system activities and user actions</p>
                        </div>
                        <div className="card-content">
                          <div className="space-y-4">
                            {recentActivity.map((activity) => (
                              <div key={activity.id} className="activity-item">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {getStatusIcon(activity.status)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-text-primary">{activity.user}</p>
                                    <p className="text-sm text-text-secondary">{activity.action}</p>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <p className="text-xs text-text-muted">{activity.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* System Alerts */}
                    <div className="card">
                      <div className="card-header">
                        <h3 className="text-xl font-semibold text-text-primary">System Alerts</h3>
                        <p className="text-sm text-text-muted">Active system notifications</p>
                      </div>
                      <div className="card-content">
                        <div className="space-y-4">
                          {systemAlerts.map((alert) => (
                            <div key={alert.id} className="activity-item">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-text-primary">{alert.message}</p>
                                  <p className="text-xs text-text-muted mt-1">{alert.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="text-xl font-semibold text-text-primary">Quick Actions</h3>
                      <p className="text-sm text-text-muted">Common administrative tasks</p>
                    </div>
                    <div className="card-content">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <button 
                          className="quick-action blue"
                          onClick={() => navigate('/super-admin/users')}
                        >
                          <Users className="h-10 w-10 text-blue-600 mb-3" />
                          <span className="text-sm font-semibold text-text-primary">Manage Users</span>
                        </button>
                        <button 
                          className="quick-action green"
                          onClick={() => navigate('/super-admin/security/audit')}
                        >
                          <Shield className="h-10 w-10 text-green-600 mb-3" />
                          <span className="text-sm font-semibold text-text-primary">Security Audit</span>
                        </button>
                        <button 
                          className="quick-action purple"
                          onClick={() => navigate('/super-admin/monitoring/health')}
                        >
                          <Activity className="h-10 w-10 text-purple-600 mb-3" />
                          <span className="text-sm font-semibold text-text-primary">System Health</span>
                        </button>
                        <button 
                          className="quick-action orange"
                          onClick={() => navigate('/super-admin/analytics/business')}
                        >
                          <BarChart3 className="h-10 w-10 text-orange-600 mb-3" />
                          <span className="text-sm font-semibold text-text-primary">View Analytics</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* Other Routes */}
              <Route path="/*" element={
                <div className="space-y-8 fade-in">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-text-primary">Page Under Development</h1>
                    <p className="text-lg text-text-secondary">
                      This page is currently being developed as part of the enterprise implementation.
                    </p>
                  </div>
                  
                  <div className="card">
                    <div className="card-content">
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                          <Code className="h-12 w-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-text-primary">Development in Progress</h3>
                          <p className="text-text-secondary mt-2 max-w-md mx-auto">
                            This feature is being built with enterprise-grade standards and will be available soon.
                          </p>
                        </div>
                        <button 
                          onClick={() => navigate('/super-admin')}
                          className="btn btn-primary"
                        >
                          Back to Dashboard
                        </button>
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

export default SuperAdmin;
