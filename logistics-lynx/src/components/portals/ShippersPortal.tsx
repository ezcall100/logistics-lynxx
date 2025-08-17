/**
 * Shippers Portal
 * Comprehensive shipment management and carrier selection interface
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Search,
  Filter,
  BarChart3,
  Activity,
  Star,
  Zap,
  Target,
  Award,
  CreditCard,
  FileText,
  Users,
  Building2,
  Globe,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Package2,
  Route,
  Timer,
  Shield,
  FileCheck,
  TrendingDown,
  PieChart,
  LineChart,
  BarChart,
  Grid3X3,
  List
} from 'lucide-react';

interface ShipmentStats {
  totalShipments: number;
  activeShipments: number;
  completedShipments: number;
  pendingShipments: number;
  totalSpent: number;
  averageCost: number;
  onTimeDelivery: number;
  totalCarriers: number;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: string;
  carrier: string;
  cost: number;
  weight: number;
  pickupDate: string;
  deliveryDate: string;
  progress: number;
}

interface Carrier {
  id: string;
  name: string;
  rating: number;
  totalShipments: number;
  onTimeDelivery: number;
  averageCost: number;
  status: string;
  specialties: string[];
}

const ShippersPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const shipmentStats: ShipmentStats = {
    totalShipments: 156,
    activeShipments: 23,
    completedShipments: 128,
    pendingShipments: 5,
    totalSpent: 125000,
    averageCost: 801,
    onTimeDelivery: 94.2,
    totalCarriers: 45
  };

  const mockShipments: Shipment[] = [
    {
      id: '1',
      trackingNumber: 'SHIP-2024-001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      status: 'in_transit',
      carrier: 'ABC Trucking Co.',
      cost: 1250,
      weight: 5000,
      pickupDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      progress: 65
    },
    {
      id: '2',
      trackingNumber: 'SHIP-2024-002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'delivered',
      carrier: 'XYZ Logistics LLC',
      cost: 890,
      weight: 3200,
      pickupDate: '2024-01-12',
      deliveryDate: '2024-01-14',
      progress: 100
    },
    {
      id: '3',
      trackingNumber: 'SHIP-2024-003',
      origin: 'Seattle, WA',
      destination: 'Dallas, TX',
      status: 'pending',
      carrier: 'Fast Freight Inc.',
      cost: 1100,
      weight: 4500,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-19',
      progress: 0
    }
  ];

  const mockCarriers: Carrier[] = [
    {
      id: '1',
      name: 'ABC Trucking Co.',
      rating: 4.8,
      totalShipments: 45,
      onTimeDelivery: 96,
      averageCost: 850,
      status: 'active',
      specialties: ['Dry Van', 'Reefer', 'Flatbed']
    },
    {
      id: '2',
      name: 'XYZ Logistics LLC',
      rating: 4.6,
      totalShipments: 32,
      onTimeDelivery: 94,
      averageCost: 920,
      status: 'active',
      specialties: ['Dry Van', 'LTL']
    },
    {
      id: '3',
      name: 'Fast Freight Inc.',
      rating: 4.9,
      totalShipments: 28,
      onTimeDelivery: 98,
      averageCost: 1100,
      status: 'active',
      specialties: ['Express', 'Dry Van']
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'in_transit':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Truck className="h-3 w-3 mr-1" />In Transit</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case 'delayed':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" />Delayed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCarrierStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100"><Clock className="h-3 w-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Package className="h-8 w-8 text-orange-600 mr-3" />
                Shippers Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Manage shipments, track deliveries, and connect with reliable carriers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Shipment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Shipment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Shipments</p>
                  <p className="text-3xl font-bold">{shipmentStats.totalShipments}</p>
                  <p className="text-orange-200 text-sm">+12% this month</p>
                </div>
                <Package className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active Shipments</p>
                  <p className="text-3xl font-bold">{shipmentStats.activeShipments}</p>
                  <p className="text-blue-200 text-sm">In transit now</p>
                </div>
                <Truck className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">On-Time Delivery</p>
                  <p className="text-3xl font-bold">{shipmentStats.onTimeDelivery}%</p>
                  <p className="text-green-200 text-sm">Excellent performance</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold">${(shipmentStats.totalSpent / 1000).toFixed(0)}K</p>
                  <p className="text-purple-200 text-sm">Avg: ${shipmentStats.averageCost}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="shipments" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Shipments</span>
            </TabsTrigger>
            <TabsTrigger value="carriers" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Carriers</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center space-x-2">
              <Route className="h-4 w-4" />
              <span>Tracking</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Shipments */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-orange-600" />
                    <span>Recent Shipments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockShipments.slice(0, 3).map((shipment) => (
                      <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Package2 className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{shipment.trackingNumber}</div>
                            <div className="text-sm text-gray-500">{shipment.origin} → {shipment.destination}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${shipment.cost}</div>
                          {getStatusBadge(shipment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Carriers */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Top Carriers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockCarriers.slice(0, 3).map((carrier) => (
                      <div key={carrier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{carrier.name}</div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < Math.floor(carrier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">({carrier.rating})</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{carrier.onTimeDelivery}%</div>
                          <div className="text-sm text-gray-500">On-time</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Plus className="h-6 w-6" />
                    <span>New Shipment</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Search className="h-6 w-6" />
                    <span>Track Shipment</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Truck className="h-6 w-6" />
                    <span>Find Carriers</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Get Quote</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipments Tab */}
          <TabsContent value="shipments" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-orange-600" />
                    <span>Shipment Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search shipments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
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
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Tracking #</TableHead>
                      <TableHead className="font-semibold text-gray-700">Route</TableHead>
                      <TableHead className="font-semibold text-gray-700">Carrier</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Progress</TableHead>
                      <TableHead className="font-semibold text-gray-700">Cost</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockShipments.map((shipment) => (
                      <TableRow key={shipment.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="font-medium text-gray-900">{shipment.trackingNumber}</div>
                          <div className="text-sm text-gray-500">{shipment.weight} lbs</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{shipment.origin}</div>
                              <ArrowRight className="h-3 w-3 text-gray-400 mx-auto" />
                              <div className="text-sm font-medium text-gray-900">{shipment.destination}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{shipment.carrier}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(shipment.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={shipment.progress} className="w-16 h-2" />
                            <span className="text-sm text-gray-600">{shipment.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">${shipment.cost}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carriers Tab */}
          <TabsContent value="carriers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Available Carriers</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Carrier</TableHead>
                      <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                      <TableHead className="font-semibold text-gray-700">Specialties</TableHead>
                      <TableHead className="font-semibold text-gray-700">Performance</TableHead>
                      <TableHead className="font-semibold text-gray-700">Avg Cost</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCarriers.map((carrier) => (
                      <TableRow key={carrier.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{carrier.name}</div>
                              <div className="text-sm text-gray-500">{carrier.totalShipments} shipments</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < Math.floor(carrier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({carrier.rating})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {carrier.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{carrier.onTimeDelivery}%</div>
                            <div className="text-gray-500">On-time delivery</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">${carrier.averageCost}</div>
                          <div className="text-sm text-gray-500">Average per shipment</div>
                        </TableCell>
                        <TableCell>
                          {getCarrierStatusBadge(carrier.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Shipping Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${(shipmentStats.totalSpent / 1000).toFixed(0)}K
                    </div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+15% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span>Shipment Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {shipmentStats.onTimeDelivery}%
                    </div>
                    <p className="text-sm text-gray-600">On-Time Delivery Rate</p>
                    <div className="flex items-center justify-center mt-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">Excellent performance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Route className="h-5 w-5 text-purple-600" />
                  <span>Real-Time Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {mockShipments.filter(s => s.status === 'in_transit').map((shipment) => (
                    <div key={shipment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{shipment.trackingNumber}</h3>
                          <p className="text-sm text-gray-600">{shipment.carrier}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${shipment.cost}</div>
                          {getStatusBadge(shipment.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pickup</span>
                          <span className="font-medium">{shipment.pickupDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Estimated Delivery</span>
                          <span className="font-medium">{shipment.deliveryDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={shipment.progress} className="w-20 h-2" />
                            <span className="font-medium">{shipment.progress}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Carrier
                        </Button>
                      </div>
                    </div>
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

export default ShippersPortal;
