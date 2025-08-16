/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { 
  MapPin, 
  Clock, 
  Fuel, 
  Package,
  Route,
  AlertCircle,
  CheckCircle,
  Truck,
  TrendingUp,
  Activity,
  Navigation,
  Shield,
  FileText,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const DriverDashboard = () => {
  const performanceData = [
    { name: 'On-Time Delivery', value: 98, percentage: 98 },
    { name: 'Fuel Efficiency', value: 82, percentage: 82 },
    { name: 'Safety Score', value: 95, percentage: 95 },
    { name: 'Hours Compliance', value: 88, percentage: 88 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'New dispatch received',
      description: 'Load pickup scheduled for 2:00 PM',
      time: '30 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'Vehicle inspection completed',
      description: 'Pre-trip inspection passed',
      time: '2 hours ago',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'Delivery completed',
      description: 'Chicago delivery completed on time',
      time: '4 hours ago',
      icon: 'alert',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Driver Mobile Hub
                </h1>
                <p className="text-slate-600 font-medium">
                  Trip Management • ELD Compliance • Route Navigation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-2" />
                On Duty
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Shield className="h-3 w-3 mr-2" />
                HOS Compliant
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Current Load</p>
                    <p className="text-2xl font-bold text-slate-900">Load #12345</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Due: 6:00 PM EST</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Hours Today</p>
                    <p className="text-3xl font-bold text-slate-900">6.5</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">4.5 hours remaining</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={59} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Miles to Destination</p>
                    <p className="text-3xl font-bold text-slate-900">156</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">ETA: 5:30 PM</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Fuel Level</p>
                    <p className="text-3xl font-bold text-slate-900">68%</p>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">Good for 420 miles</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Fuel className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Performance Chart */}
          <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Activity className="h-5 w-5 text-cyan-600" />
                Driver Performance Metrics
              </CardTitle>
              <CardDescription className="text-slate-600">
                Your performance metrics this month
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
                Recent Activity
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

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Truck className="h-5 w-5 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-slate-600">
                Essential driver tools and functions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 shadow-lg">
                  <Navigation className="h-6 w-6" />
                  <span>GPS Navigation</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg">
                  <FileText className="h-6 w-6" />
                  <span>Log Inspection</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0 shadow-lg">
                  <Phone className="h-6 w-6" />
                  <span>Contact Dispatch</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg">
                  <AlertCircle className="h-6 w-6" />
                  <span>Report Issue</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="mt-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Shield className="h-5 w-5 text-indigo-600" />
                Status Overview
              </CardTitle>
              <CardDescription className="text-slate-600">
                Current trip and compliance status
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">Trip Status</h3>
                      <p className="text-green-100 text-sm">En Route</p>
                    </div>
                  </div>
                  <p className="text-green-100">On schedule for delivery</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">HOS Status</h3>
                      <p className="text-blue-100 text-sm">Compliant</p>
                    </div>
                  </div>
                  <p className="text-blue-100">4.5 hours driving time left</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-8 w-8" />
                    <div>
                      <h3 className="font-semibold">Safety Score</h3>
                      <p className="text-purple-100 text-sm">Excellent</p>
                    </div>
                  </div>
                  <p className="text-purple-100">No violations this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;