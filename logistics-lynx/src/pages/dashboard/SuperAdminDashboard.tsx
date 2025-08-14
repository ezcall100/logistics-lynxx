
import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  BarChart3, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  Settings,
  Shield,
  FileText,
  Database,
  CreditCard,
  MessageSquare,
  Globe,
  Monitor,
  Activity,
  Zap,
  Target,
  Layers,
  Command
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { name: 'Platform Uptime', value: 99.9, percentage: 99.9 },
    { name: 'User Satisfaction', value: 95, percentage: 95 },
    { name: 'System Performance', value: 88, percentage: 88 },
    { name: 'Revenue Growth', value: 112, percentage: 90 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'AI Agent Optimization Complete',
      description: 'EDI 214 processing improved by 34% through ML enhancement',
      time: '15 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'Multi-Portal Security Audit',
      description: 'Comprehensive security scan completed - zero vulnerabilities',
      time: '2 hours ago',
      icon: 'alert',
    },
    {
      id: '3',
      title: 'Global Revenue Milestone',
      description: 'Platform crossed $2.5M monthly recurring revenue',
      time: '1 day ago',
      icon: 'truck',
    },
  ];

  const platformMetrics = [
    { title: 'Global Companies', value: '3,247', change: '+18%', icon: Building2, trend: 'up' },
    { title: 'Active Users', value: '18,934', change: '+12%', icon: Users, trend: 'up' },
    { title: 'Monthly Revenue', value: '$2.5M', change: '+24%', icon: DollarSign, trend: 'up' },
    { title: 'System Health', value: '99.2%', change: '+0.8%', icon: Activity, trend: 'up' },
  ];

  const ediMetrics = [
    { type: '204', name: 'Load Tenders', volume: '12,847', efficiency: '98.2%', trend: '+5.2%' },
    { type: '214', name: 'Status Updates', volume: '45,231', efficiency: '99.1%', trend: '+2.1%' },
    { type: '210', name: 'Invoices', volume: '8,934', efficiency: '97.8%', trend: '+3.4%' },
    { type: '216', name: 'Pickup Notices', volume: '6,789', efficiency: '98.7%', trend: '+1.8%' },
  ];

  const roleDistribution = [
    { role: 'Carrier Admins', count: 456, active: 398, growth: '+15%', color: 'bg-blue-500' },
    { role: 'Broker Admins', count: 234, active: 216, growth: '+12%', color: 'bg-green-500' },
    { role: 'Shipper Admins', count: 123, active: 108, growth: '+22%', color: 'bg-purple-500' },
    { role: 'Drivers', count: 3421, active: 2987, growth: '+8%', color: 'bg-orange-500' },
    { role: 'Owner Operators', count: 567, active: 498, growth: '+28%', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Command className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Global Command Center
                </h1>
                <p className="text-slate-600 font-medium">
                  Enterprise TMS Platform • Real-time Oversight & Analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <Monitor className="h-3 w-3 mr-2" />
                All Systems Operational
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Zap className="h-3 w-3 mr-2" />
                AI-Powered Analytics
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {platformMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-600">{metric.change}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <Target className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="edi" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <MessageSquare className="h-4 w-4 mr-2" />
              EDI Hub
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <CreditCard className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="reports" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Performance Chart */}
              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Platform Performance Intelligence
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Real-time analytics powered by AI-driven insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <PerformanceChart
                    title=""
                    subtitle=""
                    data={performanceData}
                  />
                </CardContent>
              </Card>

              {/* Enhanced Activity Feed */}
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Activity className="h-5 w-5 text-green-600" />
                    Global Activity Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ActivityFeed
                    title=""
                    activities={activityData}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="edi" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Layers className="h-5 w-5 text-purple-600" />
                  EDI Intelligence Center
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Real-time EDI message processing with AI-powered optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ediMetrics.map((edi) => (
                    <div key={edi.type} className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{edi.type}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{edi.name}</p>
                          <p className="text-sm text-slate-600">{edi.volume} processed</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Efficiency</span>
                          <span className="text-sm font-semibold text-emerald-600">{edi.efficiency}</span>
                        </div>
                        <Progress value={parseFloat(edi.efficiency)} className="h-2" />
                        <p className="text-xs text-emerald-600 font-medium">{edi.trend} this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5 text-orange-600" />
                  Global User Intelligence
                </CardTitle>
                <CardDescription className="text-slate-600">
                  User distribution and engagement across all portal types
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {roleDistribution.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className={`h-4 w-4 rounded-full ${role.color}`}></div>
                        <div>
                          <p className="font-semibold text-slate-900">{role.role}</p>
                          <p className="text-sm text-slate-600">{role.active} active of {role.count} total</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900">{role.count}</p>
                          <p className="text-sm text-emerald-600 font-medium">{role.growth} growth</p>
                        </div>
                        <div className="w-32">
                          <Progress value={(role.active / role.count) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Monthly Revenue</p>
                      <p className="text-3xl font-bold">$2.5M</p>
                      <p className="text-emerald-100 text-sm">+24% vs last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-emerald-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Active Subscriptions</p>
                      <p className="text-3xl font-bold">1,247</p>
                      <p className="text-blue-100 text-sm">+15% new this month</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Avg Revenue Per User</p>
                      <p className="text-3xl font-bold">$132</p>
                      <p className="text-purple-100 text-sm">+8% improvement</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Churn Rate</p>
                      <p className="text-3xl font-bold">2.1%</p>
                      <p className="text-orange-100 text-sm">-0.8% improvement</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Security Status</p>
                      <p className="text-sm text-slate-600">All systems secure</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">100%</p>
                  <p className="text-sm text-slate-600">Last audit: 2 hours ago</p>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Threat Detection</p>
                      <p className="text-sm text-slate-600">AI-powered monitoring</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-2">0</p>
                  <p className="text-sm text-slate-600">Active threats detected</p>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Data Integrity</p>
                      <p className="text-sm text-slate-600">Backup status</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">✓</p>
                  <p className="text-sm text-slate-600">Last backup: 4 hours ago</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Advanced Analytics Hub
                </CardTitle>
                <CardDescription className="text-slate-600">
                  AI-powered insights and predictive analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'User Behavior Analytics', icon: Users, color: 'from-blue-500 to-cyan-500' },
                    { title: 'Revenue Intelligence', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
                    { title: 'Load Volume Insights', icon: Package, color: 'from-purple-500 to-violet-500' },
                    { title: 'Fleet Performance', icon: Truck, color: 'from-orange-500 to-red-500' },
                    { title: 'Platform Usage Metrics', icon: Globe, color: 'from-pink-500 to-rose-500' },
                    { title: 'Growth Forecasting', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
                  ].map((report, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col gap-3 bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`h-8 w-8 bg-gradient-to-br ${report.color} rounded-lg flex items-center justify-center`}>
                        <report.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-900">{report.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
