import React from 'react';
import { 
  Truck, 
  DollarSign, 
  Fuel, 
  Package,
  Wrench,
  BarChart3,
  TrendingUp,
  Calendar,
  Activity,
  Target,
  PieChart,
  CreditCard,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const OwnerOperatorDashboard = () => {
  const performanceData = [
    { name: 'Revenue per Mile', value: 2.85, percentage: 85 },
    { name: 'Operating Ratio', value: 78, percentage: 78 },
    { name: 'Load Acceptance', value: 92, percentage: 92 },
    { name: 'Customer Rating', value: 96, percentage: 96 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'Load opportunity',
      description: 'High-paying load to California - $3,500',
      time: '15 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'Maintenance reminder',
      description: 'Truck service due in 2,500 miles',
      time: '1 hour ago',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'Payment received',
      description: '$2,850 deposited for load #67890',
      time: '6 hours ago',
      icon: 'alert',
    },
  ];

  const businessMetrics = [
    { title: 'Monthly Profit', value: '$8,450', change: '+15%', trend: 'up', icon: DollarSign },
    { title: 'Operating Costs', value: '$12,200', change: '-8%', trend: 'down', icon: CreditCard },
    { title: 'Miles Driven', value: '18,500', change: '+12%', trend: 'up', icon: MapPin },
    { title: 'Load Completion', value: '98.5%', change: '+2%', trend: 'up', icon: CheckCircle },
  ];

  const loadOpportunities = [
    { id: 'LO-001', origin: 'Dallas, TX', destination: 'Los Angeles, CA', rate: '$3,500', miles: 1420, commodity: 'Electronics' },
    { id: 'LO-002', origin: 'Chicago, IL', destination: 'Atlanta, GA', rate: '$2,850', miles: 720, commodity: 'Auto Parts' },
    { id: 'LO-003', origin: 'Phoenix, AZ', destination: 'Denver, CO', rate: '$2,200', miles: 860, commodity: 'Consumer Goods' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Owner Operator Business Hub
                </h1>
                <p className="text-slate-600 font-medium">
                  Business Intelligence • Load Opportunities • Fleet Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <TrendingUp className="h-3 w-3 mr-2" />
                Profit Up 15%
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Activity className="h-3 w-3 mr-2" />
                2 Active Loads
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Weekly Revenue</p>
                    <p className="text-3xl font-bold text-slate-900">$4,250</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">15% above target</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Active Loads</p>
                    <p className="text-3xl font-bold text-slate-900">2</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">1 pickup tomorrow</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Fuel Costs</p>
                    <p className="text-3xl font-bold text-slate-900">$890</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">8% under budget</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <Fuel className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Next Maintenance</p>
                    <p className="text-3xl font-bold text-slate-900">2,500 mi</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">Service in 10 days</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Performance Chart */}
          <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                Business Performance Intelligence
              </CardTitle>
              <CardDescription className="text-slate-600">
                Key business metrics for your operation
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
                Business Activity Stream
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

        {/* Business Metrics Grid */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <PieChart className="h-5 w-5 text-blue-600" />
              Business Analytics Dashboard
            </CardTitle>
            <CardDescription className="text-slate-600">
              Comprehensive business performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessMetrics.map((metric, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Load Opportunities */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Package className="h-5 w-5 text-purple-600" />
              Available Load Opportunities
            </CardTitle>
            <CardDescription className="text-slate-600">
              High-value loads matching your route preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {loadOpportunities.map((load) => (
                <div key={load.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{load.id}</Badge>
                    <div>
                      <p className="font-medium">{load.origin} → {load.destination}</p>
                      <p className="text-sm text-muted-foreground">{load.commodity} • {load.miles} miles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-lg text-green-600">{load.rate}</p>
                      <p className="text-sm text-muted-foreground">${(parseFloat(load.rate.replace('$', '').replace(',', '')) / load.miles).toFixed(2)}/mile</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Accept Load
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Target className="h-5 w-5 text-indigo-600" />
                Business Management Tools
              </CardTitle>
              <CardDescription className="text-slate-600">
                Essential tools for managing your business
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg">
                  <DollarSign className="h-6 w-6" />
                  <span>Financial Reports</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 shadow-lg">
                  <FileText className="h-6 w-6" />
                  <span>Tax Documents</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0 shadow-lg">
                  <Wrench className="h-6 w-6" />
                  <span>Maintenance Log</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg">
                  <Fuel className="h-6 w-6" />
                  <span>Fuel Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerOperatorDashboard;