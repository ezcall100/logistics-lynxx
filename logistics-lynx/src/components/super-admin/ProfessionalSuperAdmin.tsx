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
  Building2, Truck, Package, Calculator, FileSpreadsheet
} from 'lucide-react';

// Professional Super Admin Portal with MCP Integration
const ProfessionalSuperAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Professional Software Company Menu Structure with MCP Integration
  const professionalMenus = [
    {
      name: '📊 Dashboard',
      icon: LayoutDashboard,
      path: '/super-admin',
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
      name: '⚙️ System Administration',
      icon: Settings,
      path: '/super-admin/system',
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
      name: '🌐 Portal Management',
      icon: Globe,
      path: '/super-admin/portals',
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
      name: '🤖 MCP Control Center',
      icon: Brain,
      path: '/super-admin/mcp',
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
      name: '💼 Business Operations',
      icon: Briefcase,
      path: '/super-admin/business',
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
      name: '🔧 Development & DevOps',
      icon: Code,
      path: '/super-admin/devops',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-screen">
        {/* Professional Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-xl`}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">🏢 Super Admin</h2>
              <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Professional Software Platform</p>
          </div>
          
          <div className="p-4 space-y-2">
            {professionalMenus.map((menu) => (
              <div key={menu.name} className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 text-sm font-medium"
                  onClick={() => navigate(menu.path)}
                >
                  <menu.icon className="h-4 w-4 mr-3" />
                  {sidebarOpen && menu.name}
                </Button>
                {sidebarOpen && menu.submenu && (
                  <div className="ml-6 space-y-1">
                    {menu.submenu.map((submenu) => (
                      <Button
                        key={submenu.path}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-8 text-xs"
                        onClick={() => navigate(submenu.path)}
                      >
                        <submenu.icon className="h-3 w-3 mr-2" />
                        {submenu.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Professional Header */}
          <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    🏢 Professional Software Super Admin
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Complete control over your TMS software platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  System Online
                </Badge>
                <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
                  Professional Edition
                </Badge>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-8">
            <Routes>
              <Route path="/" element={
                <div className="container mx-auto">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                      Welcome to Professional Software Super Admin
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Complete control over your TMS software platform with professional-grade tools and analytics
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <LayoutDashboard className="w-5 h-5 text-blue-600" />
                          <CardTitle>System Overview</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Real-time system health, uptime, and performance metrics
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/dashboard/overview')}>
                          View Dashboard
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-green-600" />
                          <CardTitle>User Management</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Complete user database with roles, permissions, and analytics
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/users/all')}>
                          Manage Users
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-purple-600" />
                          <CardTitle>Portal Management</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Multi-tenant portal management with customization and analytics
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/portals/overview')}>
                          Manage Portals
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-red-600" />
                          <CardTitle>Security Center</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Comprehensive security audit, compliance, and incident response
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/security/audit')}>
                          Security Center
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-indigo-600" />
                          <CardTitle>MCP Control Center</CardTitle>
                          <Badge variant="secondary">AI-Powered</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          AI system management, autonomous agents, and machine learning
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/mcp/overview')}>
                          Launch MCP
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-5 h-5 text-orange-600" />
                          <CardTitle>Analytics & Reports</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Business intelligence, user analytics, and custom reporting
                        </CardDescription>
                        <Button className="w-full" onClick={() => navigate('/super-admin/analytics/business')}>
                          View Analytics
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              } />
              
              {/* Add routes for all submenus here */}
              <Route path="/*" element={
                <div className="container mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>🚧 Page Under Development</CardTitle>
                      <CardDescription>
                        This page is being developed as part of the fresh start implementation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        We're building a professional-grade Super Admin portal with the optimal structure for your TMS software platform.
                      </p>
                      <Button onClick={() => navigate('/super-admin')}>
                        Back to Dashboard
                      </Button>
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
