import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  LayoutDashboard, FileText, Users, Activity, Shield, DollarSign,
  Settings, Palette, Download, Calendar, BarChart3, TrendingUp,
  TrendingDown, Eye, RefreshCw, Plus, Filter, Search, Clock,
  CheckCircle, AlertTriangle, Info, Zap, Brain, Rocket,
  BarChart3 as ChartIcon, TrendingUp as GrowthIcon, TrendingDown as DeclineIcon,
  Eye as ViewIcon, RefreshCw as RefreshIcon, Plus as AddIcon,
  Filter as FilterIcon, Search as SearchIcon, Clock as TimeIcon,
  CheckCircle as SuccessIcon, AlertTriangle as WarningIcon, Info as InfoIcon,
  Zap as PerformanceIcon, Brain as AIIcon, Rocket as LaunchIcon,
  Activity as ActivityIcon, Shield as SecurityIcon, DollarSign as FinanceIcon,
  Settings as ConfigIcon, Palette as CustomIcon, Download as ExportIcon,
  Calendar as ScheduleIcon, Users as UserIcon, FileText as ReportIcon
} from 'lucide-react';

// Import MCP Design System
import '../../styles/mcp-design-system.css';

// Import all analytics pages
import DashboardAnalyticsPage from './analytics/DashboardAnalyticsPage';
import SystemReportsPage from './analytics/SystemReportsPage';
import UserReportsPage from './analytics/UserReportsPage';
import PerformanceReportsPage from './analytics/PerformanceReportsPage';
import SecurityReportsPage from './analytics/SecurityReportsPage';
import FinancialReportsPage from './analytics/FinancialReportsPage';
import OperationalReportsPage from './analytics/OperationalReportsPage';
import CustomReportsPage from './analytics/CustomReportsPage';
import DataExportPage from './analytics/DataExportPage';
import ReportSchedulerPage from './analytics/ReportSchedulerPage';

const AnalyticsOverviewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Enhanced analytics data
  const analyticsStats = {
    totalReports: 156,
    activeReports: 142,
    scheduledReports: 23,
    failedReports: 3,
    totalExports: 2847,
    dataProcessed: '2.4TB',
    averageResponseTime: '1.2s',
    uptime: '99.98%',
    growthRate: 12.5,
    accuracy: 98.7
  };

  const recentReports = [
    {
      id: '1',
      title: 'System Performance Overview',
      category: 'System Reports',
      status: 'completed',
      lastRun: '2024-12-19 14:30:00',
      nextRun: '2024-12-20 02:00:00',
      duration: '2m 34s',
      size: '2.4MB',
      type: 'automated',
      priority: 'high'
    },
    {
      id: '2',
      title: 'User Activity Dashboard',
      category: 'User Reports',
      status: 'running',
      lastRun: '2024-12-19 15:00:00',
      nextRun: '2024-12-19 16:00:00',
      duration: '1m 12s',
      size: '1.8MB',
      type: 'scheduled',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Security Audit Report',
      category: 'Security Reports',
      status: 'failed',
      lastRun: '2024-12-19 13:00:00',
      nextRun: '2024-12-19 14:00:00',
      duration: '0s',
      size: '0MB',
      type: 'manual',
      priority: 'critical'
    },
    {
      id: '4',
      title: 'Financial Performance Q4',
      category: 'Financial Reports',
      status: 'completed',
      lastRun: '2024-12-19 12:00:00',
      nextRun: '2024-12-26 12:00:00',
      duration: '5m 23s',
      size: '4.2MB',
      type: 'scheduled',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Operational Efficiency Metrics',
      category: 'Operational Reports',
      status: 'pending',
      lastRun: '2024-12-19 11:00:00',
      nextRun: '2024-12-19 17:00:00',
      duration: '3m 45s',
      size: '3.1MB',
      type: 'automated',
      priority: 'medium'
    }
  ];

  const analyticsCategories = [
    {
      title: 'Dashboard Analytics',
      description: 'Comprehensive dashboard analytics and KPI tracking',
      icon: LayoutDashboard,
      path: '/dashboard',
      color: 'bg-blue-500',
      stats: { reports: 15, lastUpdated: '2 hours ago', growth: 8.5 },
      status: 'active'
    },
    {
      title: 'System Reports',
      description: 'System performance and infrastructure reports',
      icon: Activity,
      path: '/system-reports',
      color: 'bg-green-500',
      stats: { reports: 23, lastUpdated: '1 hour ago', growth: 12.3 },
      status: 'active'
    },
    {
      title: 'User Reports',
      description: 'User activity, engagement, and behavior analytics',
      icon: Users,
      path: '/user-reports',
      color: 'bg-purple-500',
      stats: { reports: 18, lastUpdated: '30 min ago', growth: 15.7 },
      status: 'active'
    },
    {
      title: 'Performance Reports',
      description: 'Application and system performance metrics',
      icon: TrendingUp,
      path: '/performance-reports',
      color: 'bg-orange-500',
      stats: { reports: 12, lastUpdated: '45 min ago', growth: 6.2 },
      status: 'active'
    },
    {
      title: 'Security Reports',
      description: 'Security audits, threats, and compliance reports',
      icon: Shield,
      path: '/security-reports',
      color: 'bg-red-500',
      stats: { reports: 8, lastUpdated: '1 hour ago', growth: 22.1 },
      status: 'warning'
    },
    {
      title: 'Financial Reports',
      description: 'Financial analytics, revenue tracking, and budgets',
      icon: DollarSign,
      path: '/financial-reports',
      color: 'bg-yellow-500',
      stats: { reports: 10, lastUpdated: '3 hours ago', growth: 9.8 },
      status: 'active'
    },
    {
      title: 'Operational Reports',
      description: 'Operational efficiency and process optimization',
      icon: Settings,
      path: '/operational-reports',
      color: 'bg-indigo-500',
      stats: { reports: 14, lastUpdated: '2 hours ago', growth: 11.4 },
      status: 'active'
    },
    {
      title: 'Custom Reports',
      description: 'Create and manage custom analytics reports',
      icon: Palette,
      path: '/custom-reports',
      color: 'bg-pink-500',
      stats: { reports: 7, lastUpdated: '4 hours ago', growth: 18.9 },
      status: 'active'
    },
    {
      title: 'Data Export',
      description: 'Export data in various formats and schedules',
      icon: Download,
      path: '/data-export',
      color: 'bg-teal-500',
      stats: { exports: 25, lastUpdated: '1 hour ago', growth: 14.2 },
      status: 'active'
    },
    {
      title: 'Report Scheduler',
      description: 'Schedule and automate report generation',
      icon: Calendar,
      path: '/report-scheduler',
      color: 'bg-cyan-500',
      stats: { schedules: 12, lastUpdated: '30 min ago', growth: 7.6 },
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'System Reports': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'User Reports': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Security Reports': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Financial Reports': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Operational Reports': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-8">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Analytics & Reports
                    </h1>
                    <p className="text-lg text-purple-100 mt-2">
                      Comprehensive analytics, insights, and reporting dashboard
                    </p>
                  </div>
                </div>
                
                {/* Analytics Status Indicators */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{analyticsStats.totalReports} Reports Active</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">{analyticsStats.uptime} Uptime</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm font-medium">{analyticsStats.accuracy}% Accuracy</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-5 h-5 mr-2" />
                  )}
                  {loading ? 'Refreshing...' : 'Refresh Data'}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export All
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Analytics Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <ChartIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{analyticsStats.totalReports}</p>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Reports</p>
                  <p className="text-xs text-green-600 font-medium">+{analyticsStats.growthRate}% growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <SuccessIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{analyticsStats.activeReports}</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Reports</p>
                  <p className="text-xs text-green-600 font-medium">Running smoothly</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                  <PerformanceIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{analyticsStats.averageResponseTime}</p>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg Response</p>
                  <p className="text-xs text-green-600 font-medium">Excellent performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/50">
                  <ExportIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{analyticsStats.totalExports.toLocaleString()}</p>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Data Exports</p>
                  <p className="text-xs text-green-600 font-medium">{analyticsStats.dataProcessed} processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <ChartIcon className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center space-x-2">
                  <TimeIcon className="w-4 h-4" />
                  <span>Recent Reports</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center space-x-2">
                  <FilterIcon className="w-4 h-4" />
                  <span>Categories</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2">
                  <PerformanceIcon className="w-4 h-4" />
                  <span>Performance</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Health */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <ActivityIcon className="w-5 h-5 text-green-600" />
                        <span>System Health</span>
                      </CardTitle>
                      <CardDescription>Overall analytics system performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Uptime</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {analyticsStats.uptime}
                          </Badge>
                        </div>
                        <Progress value={99.98} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Accuracy</span>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {analyticsStats.accuracy}%
                          </Badge>
                        </div>
                        <Progress value={analyticsStats.accuracy} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Response Time</span>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {analyticsStats.averageResponseTime}
                          </Badge>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Growth Metrics */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GrowthIcon className="w-5 h-5 text-blue-600" />
                        <span>Growth Metrics</span>
                      </CardTitle>
                      <CardDescription>Analytics growth and adoption trends</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{analyticsStats.growthRate}%</p>
                          <p className="text-sm text-green-600">Monthly Growth</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">156</p>
                          <p className="text-sm text-blue-600">Total Reports</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">2.4TB</p>
                          <p className="text-sm text-purple-600">Data Processed</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">2847</p>
                          <p className="text-sm text-orange-600">Exports</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Recent Reports Tab */}
              <TabsContent value="recent" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="System Reports">System Reports</SelectItem>
                        <SelectItem value="User Reports">User Reports</SelectItem>
                        <SelectItem value="Security Reports">Security Reports</SelectItem>
                        <SelectItem value="Financial Reports">Financial Reports</SelectItem>
                        <SelectItem value="Operational Reports">Operational Reports</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Recent Reports Table */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Reports</span>
                      <Badge variant="secondary">{recentReports.length} reports</Badge>
                    </CardTitle>
                    <CardDescription>Latest report executions and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                              <ReportIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <p className="font-medium">{report.title}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`text-xs ${getCategoryColor(report.category)}`}>
                                  {report.category}
                                </Badge>
                                <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>
                                  {report.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{report.duration}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{report.size}</p>
                            </div>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Report</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Download</TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analyticsCategories.map((category) => (
                    <Card key={category.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl ${category.color} text-white`}>
                            <category.icon className="w-6 h-6" />
                          </div>
                          <Badge className={category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {category.status}
                          </Badge>
                        </div>
                        <CardTitle className="mt-4">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Reports</span>
                            <span className="text-sm font-medium">{category.stats.reports || category.stats.exports || category.stats.schedules}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Growth</span>
                            <span className="text-sm font-medium text-green-600">+{category.stats.growth}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Last Updated</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{category.stats.lastUpdated}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          View Category
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PerformanceIcon className="w-5 h-5 text-blue-600" />
                        <span>Performance Metrics</span>
                      </CardTitle>
                      <CardDescription>System performance and optimization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Response Time</span>
                          <span className="text-sm font-medium">{analyticsStats.averageResponseTime}</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Data Processing</span>
                          <span className="text-sm font-medium">{analyticsStats.dataProcessed}</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Report Generation</span>
                          <span className="text-sm font-medium">2.3s avg</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Status */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <ActivityIcon className="w-5 h-5 text-green-600" />
                        <span>System Status</span>
                      </CardTitle>
                      <CardDescription>Current system health and alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">All Systems Operational</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium">3 Failed Reports</span>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">23 Scheduled Reports</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Routes for nested pages */}
        <Routes>
          <Route path="/dashboard" element={<DashboardAnalyticsPage />} />
          <Route path="/system-reports" element={<SystemReportsPage />} />
          <Route path="/user-reports" element={<UserReportsPage />} />
          <Route path="/performance-reports" element={<PerformanceReportsPage />} />
          <Route path="/security-reports" element={<SecurityReportsPage />} />
          <Route path="/financial-reports" element={<FinancialReportsPage />} />
          <Route path="/operational-reports" element={<OperationalReportsPage />} />
          <Route path="/custom-reports" element={<CustomReportsPage />} />
          <Route path="/data-export" element={<DataExportPage />} />
          <Route path="/report-scheduler" element={<ReportSchedulerPage />} />
        </Routes>
      </div>
    </TooltipProvider>
  );
};

export default AnalyticsOverviewPage;
