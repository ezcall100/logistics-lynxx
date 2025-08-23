import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Users, Settings, Shield, Activity, Globe,
  BarChart3, Brain, Briefcase, Code, Menu, TrendingUp,
  UserCheck, DollarSign, AlertTriangle, Database, Server,
  Cpu, FileText, Network, Zap, Eye, Lock, Bell,
  Building2, Truck, Package, Calculator, FileSpreadsheet,
  Plus, Search, Filter, Download, Upload, RefreshCw,
  ChevronRight, Star, Award, Target, Rocket, Sparkles
} from 'lucide-react';

// Professional Super Admin Portal with Modern Redesign
const ProfessionalSuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFAB = () => setFabOpen(!fabOpen);

  // Enhanced Menu Structure with Categories
  const menuCategories = [
    {
      category: 'Core Operations',
      items: [
        {
          name: '📊 Dashboard',
          icon: LayoutDashboard,
          path: '/super-admin',
          color: 'from-blue-500 to-cyan-500',
          submenu: [
            { name: 'System Overview', path: '/super-admin/dashboard/overview', icon: Activity },
            { name: 'Active Users', path: '/super-admin/dashboard/users', icon: UserCheck },
            { name: 'Revenue Metrics', path: '/super-admin/dashboard/revenue', icon: DollarSign },
            { name: 'System Alerts', path: '/super-admin/dashboard/alerts', icon: AlertTriangle }
          ]
        },
        {
          name: '👥 User Management',
          icon: Users,
          path: '/super-admin/users',
          color: 'from-green-500 to-emerald-500',
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
        }
      ]
    },
    {
      category: 'System & Security',
      items: [
        {
          name: '⚙️ System Administration',
          icon: Settings,
          path: '/super-admin/system',
          color: 'from-purple-500 to-violet-500',
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
          name: '🔒 Security Center',
          icon: Shield,
          path: '/super-admin/security',
          color: 'from-red-500 to-pink-500',
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
          name: '👁️ System Monitoring',
          icon: Activity,
          path: '/super-admin/monitoring',
          color: 'from-orange-500 to-amber-500',
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
        }
      ]
    },
    {
      category: 'Business & Analytics',
      items: [
        {
          name: '🌐 Portal Management',
          icon: Globe,
          path: '/super-admin/portals',
          color: 'from-indigo-500 to-blue-500',
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
          name: '📋 Analytics & Reports',
          icon: BarChart3,
          path: '/super-admin/analytics',
          color: 'from-teal-500 to-cyan-500',
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
          name: '💼 Business Operations',
          icon: Briefcase,
          path: '/super-admin/business',
          color: 'from-emerald-500 to-green-500',
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
        }
      ]
    },
    {
      category: 'Advanced Features',
      items: [
        {
          name: '🤖 MCP Control Center',
          icon: Brain,
          path: '/super-admin/mcp',
          color: 'from-violet-500 to-purple-500',
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
          name: '🔧 Development & DevOps',
          icon: Code,
          path: '/super-admin/devops',
          color: 'from-slate-500 to-gray-500',
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
      ]
    }
  ];

  // Quick Actions for FAB
  const quickActions = [
    { name: 'Add User', icon: UserCheck, action: () => navigate('/super-admin/users/all'), color: 'bg-green-500' },
    { name: 'System Health', icon: Activity, action: () => navigate('/super-admin/monitoring/health'), color: 'bg-blue-500' },
    { name: 'Security Scan', icon: Shield, action: () => navigate('/super-admin/security/audit'), color: 'bg-red-500' },
    { name: 'Analytics', icon: BarChart3, action: () => navigate('/super-admin/analytics/business'), color: 'bg-purple-500' },
    { name: 'MCP Control', icon: Brain, action: () => navigate('/super-admin/mcp/overview'), color: 'bg-indigo-500' },
    { name: 'Portal Config', icon: Globe, action: () => navigate('/super-admin/portals/config'), color: 'bg-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-screen">
        {/* Modern Sidebar with Categories */}
        <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 shadow-2xl`}>
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Super Admin</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Professional Platform</p>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-120px)]">
            {menuCategories.map((category) => (
              <div key={category.category} className="space-y-3">
                {sidebarOpen && (
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
                    {category.category}
                  </h3>
                )}
                <div className="space-y-2">
                  {category.items.map((menu) => (
                    <div key={menu.name} className="space-y-1">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-12 text-sm font-medium group hover:bg-gradient-to-r ${menu.color} hover:text-white transition-all duration-300 ${
                          location.pathname === menu.path ? `bg-gradient-to-r ${menu.color} text-white shadow-lg` : ''
                        }`}
                        onClick={() => navigate(menu.path)}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${menu.color} flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-300`}>
                          <menu.icon className="h-4 w-4" />
                        </div>
                        {sidebarOpen && (
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span>{menu.name}</span>
                              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        )}
                      </Button>
                      {sidebarOpen && menu.submenu && (
                        <div className="ml-11 space-y-1">
                          {menu.submenu.slice(0, 4).map((submenu) => (
                            <Button
                              key={submenu.path}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start h-8 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                              onClick={() => navigate(submenu.path)}
                            >
                              <submenu.icon className="h-3 w-3 mr-2" />
                              {submenu.name}
                            </Button>
                          ))}
                          {menu.submenu.length > 4 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start h-8 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              onClick={() => navigate(menu.path)}
                            >
                              +{menu.submenu.length - 4} more
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Modern Header with Search */}
          <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-blue-500" />
                    Professional Software Super Admin
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Complete control over your TMS software platform
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    System Online
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    <Star className="h-3 w-3 mr-1" />
                    Professional Edition
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-8">
            <Routes>
              <Route path="/" element={
                <div className="container mx-auto">
                  {/* Welcome Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                          Welcome to Professional Software Super Admin
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                          Complete control over your TMS software platform with professional-grade tools and analytics
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100">Total Users</p>
                            <p className="text-3xl font-bold">2,847</p>
                            <p className="text-blue-100 text-sm">+12% from last month</p>
                          </div>
                          <Users className="h-12 w-12 text-blue-200" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100">System Uptime</p>
                            <p className="text-3xl font-bold">99.9%</p>
                            <p className="text-green-100 text-sm">Last 30 days</p>
                          </div>
                          <Activity className="h-12 w-12 text-green-200" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100">Revenue</p>
                            <p className="text-3xl font-bold">$847K</p>
                            <p className="text-purple-100 text-sm">+8% from last month</p>
                          </div>
                          <DollarSign className="h-12 w-12 text-purple-200" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-100">Active Portals</p>
                            <p className="text-3xl font-bold">156</p>
                            <p className="text-orange-100 text-sm">+3 new this week</p>
                          </div>
                          <Globe className="h-12 w-12 text-orange-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuCategories.flatMap(category => category.items).slice(0, 6).map((menu, index) => (
                      <Card key={menu.name} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${menu.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <menu.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{menu.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {menu.submenu?.length || 0} features available
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                            {menu.name.includes('Dashboard') && 'Real-time system health, uptime, and performance metrics'}
                            {menu.name.includes('User Management') && 'Complete user database with roles, permissions, and analytics'}
                            {menu.name.includes('System Administration') && 'Database, API, server monitoring, and deployment tools'}
                            {menu.name.includes('Security Center') && 'Comprehensive security audit, compliance, and incident response'}
                            {menu.name.includes('Portal Management') && 'Multi-tenant portal management with customization and analytics'}
                            {menu.name.includes('Analytics') && 'Business intelligence, user analytics, and custom reporting'}
                          </p>
                          <Button 
                            className={`w-full bg-gradient-to-r ${menu.color} hover:shadow-lg transition-all duration-300`}
                            onClick={() => navigate(menu.path)}
                          >
                            Access {menu.name.split(' ')[1]}
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              } />

              {/* Add routes for all submenus here */}
              <Route path="/*" element={
                <div className="container mx-auto">
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                          <Code className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">🚧 Page Under Development</CardTitle>
                          <CardDescription className="text-lg">
                            This page is being developed as part of the fresh start implementation
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                        We're building a professional-grade Super Admin portal with the optimal structure for your TMS software platform.
                      </p>
                      <div className="flex gap-4">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg"
                          onClick={() => navigate('/super-admin')}
                        >
                          <Rocket className="h-4 w-4 mr-2" />
                          Back to Dashboard
                        </Button>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Check Progress
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Quick Actions */}
          {fabOpen && (
            <div className="absolute bottom-16 right-0 mb-4 space-y-3">
              {quickActions.map((action, index) => (
                <div
                  key={action.name}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-white shadow-lg transform transition-all duration-300 ${
                    fabOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    backgroundColor: action.color.replace('bg-', '')
                  }}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm font-medium whitespace-nowrap">{action.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Main FAB */}
          <Button
            onClick={toggleFAB}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
              fabOpen 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
            }`}
          >
            <Plus className={`h-6 w-6 transition-transform duration-300 ${fabOpen ? 'rotate-45' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSuperAdmin;
