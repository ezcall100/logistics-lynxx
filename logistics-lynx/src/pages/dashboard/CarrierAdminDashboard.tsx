/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  Package, 
  MapPin,
  DollarSign,
  Fuel,
  Clock,
  AlertTriangle,
  FileText,
  Wrench,
  CheckSquare,
  Route,
  MessageSquare,
  Building,
  CreditCard,
  TrendingUp,
  Shield,
  Monitor,
  Zap,
  Activity
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const CarrierAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [businessType, setBusinessType] = useState('truckload');

  const performanceData = [
    { name: 'Fleet Utilization', value: 85, percentage: 85 },
    { name: 'On-Time Delivery', value: 92, percentage: 92 },
    { name: 'Driver Satisfaction', value: 88, percentage: 88 },
    { name: 'Fuel Efficiency', value: 78, percentage: 78 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'Load Tender Received',
      description: 'Load #TL-2024-001 from Chicago to Atlanta - $2,850',
      time: '15 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'ELD Compliance Alert',
      description: 'Driver John Smith approaching HOS limit',
      time: '45 minutes ago',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'Maintenance Scheduled',
      description: 'Truck #456 scheduled for PM service tomorrow',
      time: '2 hours ago',
      icon: 'alert',
    },
  ];

  const loadManagement = [
    { id: 'TL-001', shipper: 'ABC Manufacturing', route: 'Chicago → Atlanta', status: 'pending', rate: '$2,850', type: 'Truckload' },
    { id: 'TL-002', shipper: 'XYZ Corp', route: 'Dallas → Denver', status: 'accepted', rate: '$1,950', type: 'Truckload' },
    { id: 'LTL-003', shipper: 'DEF Industries', route: 'Miami → Tampa', status: 'in_transit', rate: '$650', type: 'LTL' },
    { id: 'IM-004', shipper: 'Port Authority', route: 'Port → Yard', status: 'delivered', rate: '$425', type: 'Intermodal' },
  ];

  const fleetData = [
    { id: 'TRK-001', driver: 'John Smith', status: 'in_transit', location: 'I-75, GA', maintenance: 'current', load: 'TL-002' },
    { id: 'TRK-002', driver: 'Sarah Johnson', status: 'available', location: 'Terminal A', maintenance: 'due_soon', load: null },
    { id: 'TRK-003', driver: 'Mike Wilson', status: 'maintenance', location: 'Shop Bay 2', maintenance: 'in_progress', load: null },
    { id: 'TRK-004', driver: 'Lisa Davis', status: 'delivering', location: 'Atlanta, GA', maintenance: 'current', load: 'TL-001' },
  ];

  const driverData = [
    { name: 'John Smith', license: 'CDL-A-123456', hoursToday: 8.5, hoursWeek: 42, status: 'driving', safetyScore: 98 },
    { name: 'Sarah Johnson', license: 'CDL-A-789012', hoursToday: 0, hoursWeek: 38, status: 'available', safetyScore: 95 },
    { name: 'Mike Wilson', license: 'CDL-A-345678', hoursToday: 0, hoursWeek: 0, status: 'off_duty', safetyScore: 92 },
    { name: 'Lisa Davis', license: 'CDL-A-901234', hoursToday: 6.5, hoursWeek: 39, status: 'driving', safetyScore: 99 },
  ];

  const accountingData = [
    { category: 'Receivables', amount: '$485,230', status: 'current', change: '+12%' },
    { category: 'Payables', amount: '$298,450', status: 'current', change: '-5%' },
    { category: 'Fuel Costs', amount: '$156,780', status: 'weekly', change: '+8%' },
    { category: 'Maintenance', amount: '$45,200', status: 'monthly', change: '-2%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': case 'current': case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'in_transit': case 'driving': case 'accepted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': case 'due_soon': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'maintenance': case 'in_progress': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Carrier Operations Hub
                </h1>
                <p className="text-slate-600 font-medium">
                  Fleet Management • Load Operations • ELD Compliance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <Truck className="h-3 w-3 mr-2" />
                45 Trucks Active
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Activity className="h-3 w-3 mr-2" />
                {businessType.charAt(0).toUpperCase() + businessType.slice(1)}
              </Badge>
              <select 
                value={businessType} 
                onChange={(e) => setBusinessType(e.target.value)}
                className="px-3 py-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg text-sm font-medium shadow-sm"
              >
                <option value="truckload">Truckload</option>
                <option value="ltl">LTL</option>
                <option value="intermodal">Intermodal</option>
                <option value="drayage">Drayage</option>
                <option value="vehicle_transport">Vehicle Transport</option>
              </select>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Active Trucks</p>
                    <p className="text-3xl font-bold text-slate-900">45</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">2 more than yesterday</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Available Drivers</p>
                    <p className="text-3xl font-bold text-slate-900">38</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">3 on duty</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">In Transit</p>
                    <p className="text-3xl font-bold text-slate-900">27</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">5 delivered today</span>
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
                    <p className="text-sm font-medium text-slate-600">Weekly Revenue</p>
                    <p className="text-3xl font-bold text-slate-900">$485,230</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">12% from last week</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
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
          <TabsList className="grid w-full grid-cols-7 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="loads" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <Package className="h-4 w-4 mr-2" />
              Loads
            </TabsTrigger>
            <TabsTrigger value="fleet" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <Truck className="h-4 w-4 mr-2" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="drivers" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <Users className="h-4 w-4 mr-2" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="accounting" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <CreditCard className="h-4 w-4 mr-2" />
              Accounting
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="dispatch" className="rounded-xl data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">
              <Building className="h-4 w-4 mr-2" />
              Dispatch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Performance Chart */}
              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Fleet Performance Intelligence
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Real-time analytics for fleet optimization and efficiency
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
                    Fleet Activity Stream
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

          <TabsContent value="loads" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Package className="h-5 w-5 text-purple-600" />
                  Load Management Hub
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Accept/reject load tenders and update shipment statuses
                </CardDescription>
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadManagement.map((load) => (
                  <div key={load.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{load.id}</Badge>
                      <div>
                        <p className="font-medium">{load.shipper}</p>
                        <p className="text-sm text-muted-foreground">{load.route} • {load.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{load.rate}</span>
                      <Badge className={getStatusColor(load.status)}>
                        {load.status.replace('_', ' ')}
                      </Badge>
                      {load.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Accept</Button>
                          <Button size="sm" variant="outline">Reject</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="fleet" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Fleet Management Center
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Track trucks, trailers, and maintenance schedules
                </CardDescription>
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fleetData.map((truck) => (
                  <div key={truck.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{truck.id}</Badge>
                      <div>
                        <p className="font-medium">{truck.driver}</p>
                        <p className="text-sm text-muted-foreground">{truck.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(truck.status)}>
                        {truck.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getStatusColor(truck.maintenance)}>
                        {truck.maintenance.replace('_', ' ')}
                      </Badge>
                      {truck.load && <span className="text-sm">Load: {truck.load}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="drivers" className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5 text-green-600" />
                  Driver Management Center
                </CardTitle>
                <CardDescription className="text-slate-600">
                  ELD compliance, safety tracking, and driver assignments
                </CardDescription>
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverData.map((driver) => (
                  <div key={driver.license} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">{driver.license}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">Hours Today</p>
                        <p className="text-lg">{driver.hoursToday}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Hours Week</p>
                        <p className="text-lg">{driver.hoursWeek}/70</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Safety Score</p>
                        <p className="text-lg text-green-600">{driver.safetyScore}%</p>
                      </div>
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Accounting & Billing
              </CardTitle>
              <CardDescription>
                Receivables, payables, and financial management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountingData.map((item) => (
                  <div key={item.category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{item.category}</h3>
                      <Badge variant="outline" className="text-green-600">
                        {item.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{item.amount}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Management
              </CardTitle>
              <CardDescription>
                BOLs, delivery receipts, and compliance documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Bills of Lading</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <CheckSquare className="h-5 w-5" />
                  <span>Delivery Receipts</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Insurance Certificates</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Wrench className="h-5 w-5" />
                  <span>Maintenance Records</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Fuel className="h-5 w-5" />
                  <span>Fuel Receipts</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span>Driver Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dispatch" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Dispatch Operations
              </CardTitle>
              <CardDescription>
                Terminal, yard, and ramp activity management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Terminal Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Trucks at Terminal</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loading Bays</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Dwell Time</span>
                      <span className="font-medium">2.5h</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Yard Management</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Available Trailers</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chassis Pool</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yard Utilization</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">EDI Messages</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>204 Received</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>214 Sent</span>
                      <span className="font-medium">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>210 Processed</span>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarrierAdminDashboard;
