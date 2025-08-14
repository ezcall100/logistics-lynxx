import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  DollarSign, 
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Building2,
  Users,
  BarChart3,
  Activity,
  Zap,
  Monitor,
  Send,
  Eye,
  Star,
  Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const ShipperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { name: 'On-Time Delivery Rate', value: 96, percentage: 96 },
    { name: 'Cost Efficiency', value: 84, percentage: 84 },
    { name: 'Carrier Performance', value: 91, percentage: 91 },
    { name: 'Customer Satisfaction', value: 93, percentage: 93 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'Shipment created',
      description: 'Order #12345 - Electronics to Miami',
      time: '20 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'Carrier assigned',
      description: 'Express Logistics assigned to shipment',
      time: '1 hour ago',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'Delivery confirmed',
      description: 'Shipment #98765 delivered successfully',
      time: '3 hours ago',
      icon: 'alert',
    },
  ];

  const shipmentData = [
    { id: 'SH-001', destination: 'Miami, FL', carrier: 'Express Logistics', status: 'in_transit', value: '$12,500', priority: 'high' },
    { id: 'SH-002', destination: 'Dallas, TX', carrier: 'Fast Freight', status: 'delivered', value: '$8,750', priority: 'standard' },
    { id: 'SH-003', destination: 'Seattle, WA', carrier: 'Coast Transport', status: 'pending', value: '$15,200', priority: 'urgent' },
    { id: 'SH-004', destination: 'Chicago, IL', carrier: 'Midwest Haul', status: 'pickup', value: '$9,800', priority: 'standard' },
  ];

  const carrierNetwork = [
    { name: 'Express Logistics', rating: 4.8, loads: 234, onTime: 98, cost: '$2.45/mi' },
    { name: 'Fast Freight Co', rating: 4.6, loads: 189, onTime: 95, cost: '$2.38/mi' },
    { name: 'Coast Transport', rating: 4.9, loads: 156, onTime: 99, cost: '$2.52/mi' },
    { name: 'Midwest Haul', rating: 4.7, loads: 201, onTime: 96, cost: '$2.41/mi' },
  ];

  const invoiceData = [
    { id: 'INV-2024-001', carrier: 'Express Logistics', amount: '$12,500', dueDate: '2025-01-20', status: 'pending' },
    { id: 'INV-2024-002', carrier: 'Fast Freight Co', amount: '$8,750', dueDate: '2025-01-18', status: 'paid' },
    { id: 'INV-2024-003', carrier: 'Coast Transport', amount: '$15,200', dueDate: '2025-01-25', status: 'overdue' },
    { id: 'INV-2024-004', carrier: 'Midwest Haul', amount: '$9,800', dueDate: '2025-01-22', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': case 'paid': case 'high': return 'bg-green-50 text-green-700 border-green-200';
      case 'in_transit': case 'pending': case 'standard': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pickup': case 'urgent': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Shipper Command Center
                </h1>
                <p className="text-slate-600 font-medium">
                  Logistics Management • Carrier Network • Supply Chain
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-2" />
                89 Active Shipments
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Activity className="h-3 w-3 mr-2" />
                Real-time Tracking
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Active Shipments</p>
                    <p className="text-3xl font-bold text-slate-900">89</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">12 new today</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Delivered This Week</p>
                    <p className="text-3xl font-bold text-slate-900">234</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">18% more than last week</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Shipping Costs</p>
                    <p className="text-3xl font-bold text-slate-900">$89,450</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">5% under budget</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Delayed Shipments</p>
                    <p className="text-3xl font-bold text-slate-900">7</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">3 fewer than yesterday</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="shipments" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <Package className="h-4 w-4 mr-2" />
              Shipments
            </TabsTrigger>
            <TabsTrigger value="carriers" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <Truck className="h-4 w-4 mr-2" />
              Carriers
            </TabsTrigger>
            <TabsTrigger value="tracking" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <MapPin className="h-4 w-4 mr-2" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <FileText className="h-4 w-4 mr-2" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Performance Chart */}
              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Shipping Performance Intelligence
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Real-time analytics for supply chain optimization
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
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Shipping Activity Stream
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

          <TabsContent value="shipments" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                      <Package className="h-5 w-5 text-purple-600" />
                      Shipment Management Hub
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Create, track, and manage all shipments
                    </CardDescription>
                  </div>
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Plus className="h-4 w-4" />
                    Create Shipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {shipmentData.map((shipment) => (
                    <div key={shipment.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{shipment.id}</Badge>
                        <div>
                          <p className="font-medium">{shipment.destination}</p>
                          <p className="text-sm text-muted-foreground">Carrier: {shipment.carrier}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-lg">{shipment.value}</p>
                          <Badge className={getStatusColor(shipment.priority)} variant="outline">
                            {shipment.priority}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex flex-col gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carriers" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Carrier Network Management
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Manage carrier relationships and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {carrierNetwork.map((carrier) => (
                    <div key={carrier.name} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{carrier.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(carrier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{carrier.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">Loads Done</p>
                          <p className="text-lg">{carrier.loads}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">On-Time</p>
                          <p className="text-lg text-green-600">{carrier.onTime}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Rate</p>
                          <p className="text-lg">{carrier.cost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  Real-time Shipment Tracking
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Live tracking with automated status updates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
                    <h3 className="font-medium text-green-100">In Transit</h3>
                    <p className="text-3xl font-bold">27</p>
                    <p className="text-green-100 text-sm">Active shipments</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-lg">
                    <h3 className="font-medium text-blue-100">Delivered Today</h3>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-blue-100 text-sm">On-time deliveries</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl shadow-lg">
                    <h3 className="font-medium text-purple-100">Pickup Scheduled</h3>
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-purple-100 text-sm">Tomorrow</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl shadow-lg">
                    <h3 className="font-medium text-orange-100">Delayed</h3>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-orange-100 text-sm">Requires attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <FileText className="h-5 w-5 text-yellow-600" />
                  Invoice Management
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Track payments and manage carrier invoices
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {invoiceData.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{invoice.id}</Badge>
                        <div>
                          <p className="font-medium">{invoice.carrier}</p>
                          <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-lg">{invoice.amount}</p>
                        </div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Advanced Shipping Analytics
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Comprehensive analytics and performance insights
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Cost Analysis', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
                    { title: 'Route Optimization', icon: MapPin, color: 'from-blue-500 to-cyan-500' },
                    { title: 'Carrier Performance', icon: Truck, color: 'from-purple-500 to-violet-500' },
                    { title: 'Delivery Analytics', icon: Package, color: 'from-orange-500 to-red-500' },
                    { title: 'Time Intelligence', icon: Clock, color: 'from-pink-500 to-rose-500' },
                    { title: 'Predictive Insights', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
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

export default ShipperAdminDashboard;