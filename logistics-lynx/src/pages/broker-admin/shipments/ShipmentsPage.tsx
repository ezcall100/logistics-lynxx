/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package,
  Truck,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Plus,
  Search,
  Filter,
  BarChart3,
  Target,
  Bell,
  ArrowUpRight,
  Timer,
  Gauge
} from 'lucide-react';

const ShipmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for shipments overview
  const shipmentStats = [
    { label: 'Total Active', value: '1,247', icon: Package, change: '+12%', trend: 'up' },
    { label: 'In Transit', value: '823', icon: Truck, change: '+8%', trend: 'up' },
    { label: 'Pending Pickup', value: '186', icon: Clock, change: '-3%', trend: 'down' },
    { label: 'Delivered Today', value: '94', icon: CheckCircle, change: '+15%', trend: 'up' },
    { label: 'Issues/Delays', value: '12', icon: AlertTriangle, change: '-20%', trend: 'down' },
    { label: 'On-Time Rate', value: '94.2%', icon: Target, change: '+2.1%', trend: 'up' }
  ];

  const recentShipments = [
    {
      id: 'SH-2024-001',
      customer: 'ABC Manufacturing',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      carrier: 'Swift Transport',
      status: 'In Transit',
      progress: 65,
      eta: '2024-01-15 14:30',
      value: '$2,450'
    },
    {
      id: 'SH-2024-002',
      customer: 'XYZ Logistics',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      carrier: 'Desert Express',
      status: 'Delivered',
      progress: 100,
      eta: 'Completed',
      value: '$1,875'
    },
    {
      id: 'SH-2024-003',
      customer: 'Global Supply Co',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      carrier: 'Mountain Freight',
      status: 'Pending Pickup',
      progress: 10,
      eta: '2024-01-16 09:00',
      value: '$3,220'
    }
  ];

  const quickActions = [
    { title: 'Create Shipment', icon: Plus, path: '/create', color: 'bg-blue-500' },
    { title: 'Live Tracking', icon: MapPin, path: '/live-tracking', color: 'bg-green-500' },
    { title: 'Dispatch Center', icon: Users, path: '/dispatch', color: 'bg-purple-500' },
    { title: 'Documentation', icon: Package, path: '/documentation', color: 'bg-orange-500' },
    { title: 'Analytics', icon: BarChart3, path: '/analytics', color: 'bg-indigo-500' },
    { title: 'Billing', icon: DollarSign, path: '/billing', color: 'bg-emerald-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending Pickup': return 'bg-yellow-100 text-yellow-800';
      case 'Issues': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipments Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all your shipments in real-time
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {shipmentStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-sm">
                    <span className={`${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">vs last week</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Fast access to frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
              >
                <div className={`h-8 w-8 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Shipments</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Shipments</CardTitle>
                  <CardDescription>Latest shipment activity and status updates</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shipments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{shipment.id}</h3>
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{shipment.customer}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {shipment.origin} → {shipment.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            {shipment.carrier}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="h-4 w-4" />
                            ETA: {shipment.eta}
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold">{shipment.value}</p>
                        <div className="w-32">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{shipment.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all"
                              style={{ width: `${shipment.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts & Notifications</CardTitle>
              <CardDescription>Issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium">Shipment SH-2024-045 Delayed</p>
                    <p className="text-sm text-muted-foreground">Weather conditions causing 4-hour delay</p>
                  </div>
                  <Button size="sm" variant="outline">Resolve</Button>
                </div>
                <div className="flex items-center gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium">Documentation Missing</p>
                    <p className="text-sm text-muted-foreground">POD required for SH-2024-038</p>
                  </div>
                  <Button size="sm" variant="outline">Upload</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                    <p className="text-2xl font-bold">94.2%</p>
                  </div>
                  <Gauge className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Transit Time</p>
                    <p className="text-2xl font-bold">2.3 days</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer Rating</p>
                    <p className="text-2xl font-bold">4.8/5.0</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Issue Rate</p>
                    <p className="text-2xl font-bold">1.2%</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">$847,200</p>
                    <p className="text-sm text-green-600">+12% vs last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Margin</p>
                    <p className="text-2xl font-bold">18.5%</p>
                    <p className="text-sm text-green-600">+2.1% improvement</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Loads</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-green-600">+8% vs last month</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShipmentsPage;