/**
 * Carriers Portal
 * Comprehensive fleet management and load booking interface
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
  Truck, 
  Package, 
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
  Route,
  Timer,
  Shield,
  FileCheck,
  TrendingDown,
  PieChart,
  LineChart,
  BarChart,
  Grid3X3,
  List,
  UserCheck,
  Wrench,
  Fuel,
  Gauge,
  Car,
  Navigation,
  Clipboard,
  FileSpreadsheet,
  Calculator,
  MessageSquare,
  Settings
} from 'lucide-react';

interface CarrierStats {
  totalLoads: number;
  activeLoads: number;
  completedLoads: number;
  pendingLoads: number;
  totalRevenue: number;
  averageRate: number;
  onTimeDelivery: number;
  totalDrivers: number;
  totalTrucks: number;
  fuelEfficiency: number;
}

interface Load {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  status: string;
  equipment: string;
  weight: number;
  rate: number;
  pickupDate: string;
  deliveryDate: string;
  broker: string;
  progress: number;
  driver?: string;
  truck?: string;
}

interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  status: string;
  rating: number;
  totalLoads: number;
  onTimeDelivery: number;
  currentLocation: string;
  hoursRemaining: number;
  licenseExpiry: string;
}

interface Truck {
  id: string;
  truckNumber: string;
  make: string;
  model: string;
  year: number;
  status: string;
  currentLocation: string;
  fuelLevel: number;
  mileage: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

const CarriersPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const carrierStats: CarrierStats = {
    totalLoads: 89,
    activeLoads: 12,
    completedLoads: 77,
    pendingLoads: 3,
    totalRevenue: 234000,
    averageRate: 2629,
    onTimeDelivery: 96.2,
    totalDrivers: 8,
    totalTrucks: 12,
    fuelEfficiency: 7.2
  };

  const mockLoads: Load[] = [
    {
      id: '1',
      loadNumber: 'LOAD-2024-001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      status: 'in_progress',
      equipment: 'Dry Van',
      weight: 45000,
      rate: 2800,
      pickupDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      broker: 'ABC Brokerage',
      progress: 65,
      driver: 'John Smith',
      truck: 'TRK-001'
    },
    {
      id: '2',
      loadNumber: 'LOAD-2024-002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'completed',
      equipment: 'Reefer',
      weight: 38000,
      rate: 2200,
      pickupDate: '2024-01-12',
      deliveryDate: '2024-01-14',
      broker: 'XYZ Logistics',
      progress: 100,
      driver: 'Mike Johnson',
      truck: 'TRK-002'
    },
    {
      id: '3',
      loadNumber: 'LOAD-2024-003',
      origin: 'Seattle, WA',
      destination: 'Dallas, TX',
      status: 'pending',
      equipment: 'Flatbed',
      weight: 52000,
      rate: 3100,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-19',
      broker: 'Fast Freight Broker',
      progress: 0
    }
  ];

  const mockDrivers: Driver[] = [
    {
      id: '1',
      name: 'John Smith',
      licenseNumber: 'DL-123456789',
      status: 'active',
      rating: 4.8,
      totalLoads: 45,
      onTimeDelivery: 96,
      currentLocation: 'Kansas City, MO',
      hoursRemaining: 8.5,
      licenseExpiry: '2025-06-15'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      licenseNumber: 'DL-987654321',
      status: 'active',
      rating: 4.6,
      totalLoads: 32,
      onTimeDelivery: 94,
      currentLocation: 'Miami, FL',
      hoursRemaining: 2.0,
      licenseExpiry: '2024-12-20'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      licenseNumber: 'DL-456789123',
      status: 'off_duty',
      rating: 4.9,
      totalLoads: 28,
      onTimeDelivery: 98,
      currentLocation: 'Seattle, WA',
      hoursRemaining: 0,
      licenseExpiry: '2025-03-10'
    }
  ];

  const mockTrucks: Truck[] = [
    {
      id: '1',
      truckNumber: 'TRK-001',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      status: 'in_use',
      currentLocation: 'Kansas City, MO',
      fuelLevel: 75,
      mileage: 125000,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    },
    {
      id: '2',
      truckNumber: 'TRK-002',
      make: 'Peterbilt',
      model: '579',
      year: 2021,
      status: 'available',
      currentLocation: 'Miami, FL',
      fuelLevel: 45,
      mileage: 98000,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05'
    },
    {
      id: '3',
      truckNumber: 'TRK-003',
      make: 'Kenworth',
      model: 'T680',
      year: 2023,
      status: 'maintenance',
      currentLocation: 'Seattle, WA',
      fuelLevel: 20,
      mileage: 45000,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-01-25'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Truck className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDriverStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'off_duty':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100"><Clock className="h-3 w-3 mr-1" />Off Duty</Badge>;
      case 'rest':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Timer className="h-3 w-3 mr-1" />Rest</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTruckStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Available</Badge>;
      case 'in_use':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Truck className="h-3 w-3 mr-1" />In Use</Badge>;
      case 'maintenance':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><Wrench className="h-3 w-3 mr-1" />Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Truck className="h-8 w-8 text-green-600 mr-3" />
                Carriers Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your fleet, drivers, and load operations efficiently
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
                Book Load
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Carrier Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Loads</p>
                  <p className="text-3xl font-bold">{carrierStats.totalLoads}</p>
                  <p className="text-green-200 text-sm">+15% this month</p>
                </div>
                <Package className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">On-Time Delivery</p>
                  <p className="text-3xl font-bold">{carrierStats.onTimeDelivery}%</p>
                  <p className="text-blue-200 text-sm">Excellent performance</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold">${(carrierStats.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-purple-200 text-sm">Avg: ${carrierStats.averageRate}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Fleet Size</p>
                  <p className="text-3xl font-bold">{carrierStats.totalTrucks}</p>
                  <p className="text-orange-200 text-sm">{carrierStats.totalDrivers} drivers</p>
                </div>
                <Truck className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="loads" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Loads</span>
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Drivers</span>
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Fleet</span>
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center space-x-2">
              <Clipboard className="h-4 w-4" />
              <span>Booking</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center space-x-2">
              <Wrench className="h-4 w-4" />
              <span>Maintenance</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Loads */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-green-600" />
                    <span>Active Loads</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockLoads.filter(load => load.status === 'in_progress').map((load) => (
                      <div key={load.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{load.loadNumber}</div>
                            <div className="text-sm text-gray-500">{load.origin} → {load.destination}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${load.rate}</div>
                          <div className="text-sm text-gray-500">{load.driver}</div>
                          {getStatusBadge(load.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fleet Status */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Fleet Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">Available Trucks</div>
                          <div className="text-sm text-gray-500">Ready for new loads</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{mockTrucks.filter(t => t.status === 'available').length}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">In Use</div>
                          <div className="text-sm text-gray-500">Currently on loads</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{mockTrucks.filter(t => t.status === 'in_use').length}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Wrench className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium text-gray-900">Maintenance</div>
                          <div className="text-sm text-gray-500">Under service</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{mockTrucks.filter(t => t.status === 'maintenance').length}</div>
                      </div>
                    </div>
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
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Clipboard className="h-6 w-6" />
                    <span>Book Load</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Drivers</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Truck className="h-6 w-6" />
                    <span>Fleet Management</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Wrench className="h-6 w-6" />
                    <span>Maintenance</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loads Tab */}
          <TabsContent value="loads" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-green-600" />
                    <span>Load Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search loads..."
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
                      Book Load
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Load #</TableHead>
                      <TableHead className="font-semibold text-gray-700">Route</TableHead>
                      <TableHead className="font-semibold text-gray-700">Broker</TableHead>
                      <TableHead className="font-semibold text-gray-700">Rate</TableHead>
                      <TableHead className="font-semibold text-gray-700">Driver</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLoads.map((load) => (
                      <TableRow key={load.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="font-medium text-gray-900">{load.loadNumber}</div>
                          <div className="text-sm text-gray-500">{load.weight.toLocaleString()} lbs</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{load.origin}</div>
                              <ArrowRight className="h-3 w-3 text-gray-400 mx-auto" />
                              <div className="text-sm font-medium text-gray-900">{load.destination}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{load.broker}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">${load.rate}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{load.driver || 'Unassigned'}</div>
                          <div className="text-sm text-gray-500">{load.truck || 'No truck'}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(load.status)}
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

          {/* Drivers Tab */}
          <TabsContent value="drivers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Driver Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Driver
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Driver</TableHead>
                      <TableHead className="font-semibold text-gray-700">License</TableHead>
                      <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Location</TableHead>
                      <TableHead className="font-semibold text-gray-700">Hours</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDrivers.map((driver) => (
                      <TableRow key={driver.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{driver.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{driver.name}</div>
                              <div className="text-sm text-gray-500">{driver.totalLoads} loads</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{driver.licenseNumber}</div>
                          <div className="text-xs text-gray-500">Expires: {driver.licenseExpiry}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < Math.floor(driver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({driver.rating})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getDriverStatusBadge(driver.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{driver.currentLocation}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{driver.hoursRemaining}h</div>
                            <div className="text-gray-500">remaining</div>
                          </div>
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

          {/* Fleet Tab */}
          <TabsContent value="fleet" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>Fleet Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Truck
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Truck</TableHead>
                      <TableHead className="font-semibold text-gray-700">Model</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Location</TableHead>
                      <TableHead className="font-semibold text-gray-700">Fuel</TableHead>
                      <TableHead className="font-semibold text-gray-700">Mileage</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTrucks.map((truck) => (
                      <TableRow key={truck.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Truck className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{truck.truckNumber}</div>
                              <div className="text-sm text-gray-500">{truck.year}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{truck.make} {truck.model}</div>
                        </TableCell>
                        <TableCell>
                          {getTruckStatusBadge(truck.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{truck.currentLocation}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={truck.fuelLevel} className="w-16 h-2" />
                            <span className="text-sm text-gray-600">{truck.fuelLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{truck.mileage.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">miles</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                              <Wrench className="h-4 w-4" />
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

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Clipboard className="h-5 w-5 text-purple-600" />
                  <span>Available Loads</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {mockLoads.filter(load => load.status === 'pending').map((load) => (
                    <div key={load.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{load.loadNumber}</h3>
                          <p className="text-sm text-gray-600">{load.broker}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${load.rate}</div>
                          <Badge variant="outline">{load.equipment}</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Route</span>
                          <span className="font-medium">{load.origin} → {load.destination}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Weight</span>
                          <span className="font-medium">{load.weight.toLocaleString()} lbs</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pickup Date</span>
                          <span className="font-medium">{load.pickupDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Delivery Date</span>
                          <span className="font-medium">{load.deliveryDate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Clipboard className="h-4 w-4 mr-2" />
                          Book Load
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <span>Revenue Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${(carrierStats.totalRevenue / 1000).toFixed(0)}K
                    </div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
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
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {carrierStats.onTimeDelivery}%
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

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  <span>Maintenance Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockTrucks.filter(truck => truck.status === 'maintenance').map((truck) => (
                    <div key={truck.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Wrench className="h-5 w-5 text-red-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{truck.truckNumber}</h3>
                          <p className="text-sm text-gray-600">{truck.make} {truck.model}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">Next: {truck.nextMaintenance}</div>
                        <div className="text-sm text-gray-500">Last: {truck.lastMaintenance}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Schedule</Button>
                        <Button size="sm">Complete</Button>
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

export default CarriersPortal;
