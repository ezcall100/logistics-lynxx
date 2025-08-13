
import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Handshake,
  MapPin,
  Clock,
  AlertCircle,
  MessageSquare,
  FileText,
  Calculator,
  Building2,
  Truck,
  CheckCircle,
  XCircle,
  Star,
  Filter,
  Search,
  Send,
  Eye,
  Edit,
  Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ActivityFeed, { ActivityItem } from '@/components/dashboard/ActivityFeed';

const BrokerAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLoad, setSelectedLoad] = useState(null);

  const performanceData = [
    { name: 'Load Matching Rate', value: 89, percentage: 89 },
    { name: 'Customer Satisfaction', value: 94, percentage: 94 },
    { name: 'Carrier Network Growth', value: 76, percentage: 76 },
    { name: 'Quote-to-Book Ratio', value: 68, percentage: 68 },
  ];

  const activityData: ActivityItem[] = [
    {
      id: '1',
      title: 'Load Tender Sent (204 EDI)',
      description: 'Chicago to Atlanta - Auto parts - $2,850',
      time: '15 minutes ago',
      icon: 'package',
    },
    {
      id: '2',
      title: 'Carrier Acceptance (990 EDI)',
      description: 'ABC Trucking accepted load #BK-2024-001',
      time: '45 minutes ago',
      icon: 'truck',
    },
    {
      id: '3',
      title: 'Invoice Generated (210 EDI)',
      description: 'Invoice #INV-2024-456 sent to customer',
      time: '2 hours ago',
      icon: 'alert',
    },
  ];

  const loadTenders = [
    {
      id: 'BK-2024-001',
      shipper: 'AutoParts Corp',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      commodity: 'Auto Parts',
      weight: '45,000 lbs',
      pickupDate: '2025-01-15',
      deliveryDate: '2025-01-17',
      rate: '$2,850',
      status: 'pending',
      carriers: ['ABC Trucking', 'XYZ Transport', 'Fast Freight'],
      ediSent: true,
      responses: 0
    },
    {
      id: 'BK-2024-002',
      shipper: 'Steel Industries',
      origin: 'Pittsburgh, PA',
      destination: 'Dallas, TX',
      commodity: 'Steel Coils',
      weight: '48,000 lbs',
      pickupDate: '2025-01-16',
      deliveryDate: '2025-01-19',
      rate: '$3,200',
      status: 'accepted',
      carriers: ['Heavy Haul LLC'],
      ediSent: true,
      responses: 1
    },
    {
      id: 'BK-2024-003',
      shipper: 'Food Distributors',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      commodity: 'Refrigerated Food',
      weight: '40,000 lbs',
      pickupDate: '2025-01-14',
      deliveryDate: '2025-01-15',
      rate: '$1,850',
      status: 'in_transit',
      carriers: ['Cool Transport'],
      ediSent: true,
      responses: 1
    }
  ];

  const carrierNetwork = [
    {
      id: 'CAR-001',
      name: 'ABC Trucking LLC',
      mcNumber: 'MC-123456',
      dotNumber: 'DOT-789012',
      rating: 4.8,
      fleetSize: 45,
      specialties: ['Dry Van', 'Refrigerated'],
      compliance: 'Excellent',
      loadsCompleted: 234,
      onTimeRate: 98,
      status: 'active',
      preferredLanes: ['Chicago-Atlanta', 'Dallas-Houston']
    },
    {
      id: 'CAR-002',
      name: 'Heavy Haul LLC',
      mcNumber: 'MC-654321',
      dotNumber: 'DOT-345678',
      rating: 4.6,
      fleetSize: 23,
      specialties: ['Heavy Haul', 'Oversized'],
      compliance: 'Good',
      loadsCompleted: 89,
      onTimeRate: 95,
      status: 'active',
      preferredLanes: ['Pittsburgh-Dallas', 'Detroit-Memphis']
    },
    {
      id: 'CAR-003',
      name: 'Fast Freight Express',
      mcNumber: 'MC-789123',
      dotNumber: 'DOT-456789',
      rating: 4.9,
      fleetSize: 67,
      specialties: ['Expedited', 'Time Critical'],
      compliance: 'Excellent',
      loadsCompleted: 445,
      onTimeRate: 99,
      status: 'active',
      preferredLanes: ['All Major Lanes']
    }
  ];

  const rateManagement = [
    {
      lane: 'Chicago, IL → Atlanta, GA',
      baseRate: '$2,500',
      currentRate: '$2,850',
      margin: '14%',
      volume: 45,
      trend: 'up',
      carriers: 12,
      avgTransitTime: '2 days'
    },
    {
      lane: 'Los Angeles, CA → Phoenix, AZ',
      baseRate: '$1,200',
      currentRate: '$1,850',
      margin: '54%',
      volume: 23,
      trend: 'up',
      carriers: 8,
      avgTransitTime: '1 day'
    },
    {
      lane: 'Dallas, TX → Houston, TX',
      baseRate: '$800',
      currentRate: '$950',
      margin: '19%',
      volume: 67,
      trend: 'stable',
      carriers: 15,
      avgTransitTime: '6 hours'
    }
  ];

  const invoiceTracking = [
    {
      invoiceNumber: 'INV-2024-456',
      loadId: 'BK-2024-001',
      customer: 'AutoParts Corp',
      amount: '$2,850',
      dateSent: '2025-01-12',
      dueDate: '2025-01-27',
      status: 'sent',
      ediStatus: '210 Sent',
      paymentTerms: 'Net 15'
    },
    {
      invoiceNumber: 'INV-2024-457',
      loadId: 'BK-2024-002',
      customer: 'Steel Industries',
      amount: '$3,200',
      dateSent: '2025-01-10',
      dueDate: '2025-01-25',
      status: 'paid',
      ediStatus: '210 Acknowledged',
      paymentTerms: 'Net 15'
    },
    {
      invoiceNumber: 'INV-2024-458',
      loadId: 'BK-2024-003',
      customer: 'Food Distributors',
      amount: '$1,850',
      dateSent: '2025-01-08',
      dueDate: '2025-01-23',
      status: 'overdue',
      ediStatus: '210 Sent',
      paymentTerms: 'Net 15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': case 'paid': case 'active': case 'excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': case 'sent': case 'good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_transit': case 'stable': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'overdue': case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'up': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <MapPin className="h-3 w-3" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Freight Broker Portal</h1>
          <p className="text-muted-foreground">
            Load tendering, carrier management, and comprehensive freight brokerage operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Package className="h-3 w-3 mr-1" />
            156 Active Loads
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="h-3 w-3 mr-1" />
            892 Carriers
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            EDI Integrated
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Loads"
          value="156"
          icon={<Package className="h-6 w-6" />}
          change={{ value: "8 new today", isPositive: true }}
        />
        <StatCard
          title="Carrier Network"
          value="892"
          icon={<Users className="h-6 w-6" />}
          change={{ value: "15 new this week", isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$1.2M"
          icon={<DollarSign className="h-6 w-6" />}
          change={{ value: "18% from last month", isPositive: true }}
        />
        <StatCard
          title="Avg Margin"
          value="24.5%"
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: "2.1% improvement", isPositive: true }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tendering">Load Tendering</TabsTrigger>
          <TabsTrigger value="carriers">Carrier Network</TabsTrigger>
          <TabsTrigger value="rates">Rate Management</TabsTrigger>
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          <TabsTrigger value="tracking">Shipment Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <PerformanceChart
              title="Brokerage Performance"
              subtitle="Key metrics for freight brokerage operations"
              data={performanceData}
              className="lg:col-span-2"
            />
            <ActivityFeed
              title="EDI & Brokerage Activity"
              activities={activityData}
            />
          </div>
        </TabsContent>

        <TabsContent value="tendering" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Load Tendering & 204 EDI Management
                  </CardTitle>
                  <CardDescription>
                    Create, send, and manage load tenders with automatic EDI 204 message generation
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Load
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadTenders.map((load) => (
                  <div key={load.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{load.id}</Badge>
                      <div>
                        <p className="font-medium">{load.shipper}</p>
                        <p className="text-sm text-muted-foreground">
                          {load.origin} → {load.destination} • {load.commodity}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Pickup: {load.pickupDate} • Delivery: {load.deliveryDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-lg">{load.rate}</p>
                        <p className="text-xs text-muted-foreground">{load.weight}</p>
                      </div>
                      <div className="text-center">
                        <Badge className={getStatusColor(load.status)}>
                          {load.status.replace('_', ' ')}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {load.ediSent ? '204 Sent' : 'Pending EDI'}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Send 204
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Carrier Network Management
                  </CardTitle>
                  <CardDescription>
                    Manage carrier relationships, compliance, and performance metrics
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Search carriers..." className="w-64" />
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carrierNetwork.map((carrier) => (
                  <div key={carrier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{carrier.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {carrier.mcNumber} • {carrier.dotNumber}
                        </p>
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
                        <p className="text-sm font-medium">Fleet Size</p>
                        <p className="text-lg">{carrier.fleetSize}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Loads Done</p>
                        <p className="text-lg">{carrier.loadsCompleted}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">On-Time</p>
                        <p className="text-lg text-green-600">{carrier.onTimeRate}%</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getStatusColor(carrier.compliance.toLowerCase())}>
                          {carrier.compliance}
                        </Badge>
                        <Badge className={getStatusColor(carrier.status)}>
                          {carrier.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Rate Management & Pricing Intelligence
              </CardTitle>
              <CardDescription>
                Monitor lane rates, margins, and market pricing trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rateManagement.map((lane, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{lane.lane}</p>
                        <p className="text-sm text-muted-foreground">
                          {lane.volume} loads this month • {lane.carriers} carriers • Avg: {lane.avgTransitTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Base Rate</p>
                        <p className="font-medium">{lane.baseRate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Current Rate</p>
                        <p className="font-medium text-lg">{lane.currentRate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Margin</p>
                        <p className="font-medium text-green-600">{lane.margin}</p>
                      </div>
                      <Badge className={getStatusColor(lane.trend)}>
                        {getTrendIcon(lane.trend)}
                        <span className="ml-1">{lane.trend}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoicing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoice Generation & 210 EDI Processing
              </CardTitle>
              <CardDescription>
                Automated invoice generation with EDI 210 integration and payment tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoiceTracking.map((invoice) => (
                  <div key={invoice.invoiceNumber} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{invoice.invoiceNumber}</Badge>
                      <div>
                        <p className="font-medium">{invoice.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          Load: {invoice.loadId} • Terms: {invoice.paymentTerms}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sent: {invoice.dateSent} • Due: {invoice.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-lg">{invoice.amount}</p>
                        <p className="text-xs text-muted-foreground">{invoice.ediStatus}</p>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {invoice.status === 'overdue' && <XCircle className="h-3 w-3 mr-1" />}
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

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipment Tracking & 214 EDI Status Updates
              </CardTitle>
              <CardDescription>
                Real-time shipment tracking with automated 214 EDI status updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-green-600">In Transit</h3>
                  <p className="text-2xl font-bold">27</p>
                  <p className="text-sm text-muted-foreground">214 Status: Moving</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-blue-600">Delivered Today</h3>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">214 Status: Delivered</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-yellow-600">Delayed</h3>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">214 Status: Delayed</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Avg Transit Time</h3>
                  <p className="text-2xl font-bold">2.1 days</p>
                  <p className="text-sm text-muted-foreground">12% improvement</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">On-Time Rate</h3>
                  <p className="text-2xl font-bold text-green-600">96.8%</p>
                  <p className="text-sm text-muted-foreground">Above target</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Customer Satisfaction</h3>
                  <p className="text-2xl font-bold text-green-600">4.7/5</p>
                  <p className="text-sm text-muted-foreground">Based on 156 reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrokerAdminDashboard;
