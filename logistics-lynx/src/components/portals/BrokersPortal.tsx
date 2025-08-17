/**
 * Brokers Portal
 * Comprehensive load management and carrier matching interface
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
  Building2, 
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
  Package,
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
  Handshake,
  Percent,
  Calculator,
  MessageSquare
} from 'lucide-react';

interface BrokerStats {
  totalLoads: number;
  activeLoads: number;
  completedLoads: number;
  pendingLoads: number;
  totalRevenue: number;
  averageRate: number;
  successRate: number;
  totalCarriers: number;
  profitMargin: number;
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
  carrier?: string;
  progress: number;
  profit: number;
}

interface Carrier {
  id: string;
  name: string;
  rating: number;
  totalLoads: number;
  onTimeDelivery: number;
  averageRate: number;
  status: string;
  specialties: string[];
  location: string;
}

const BrokersPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const brokerStats: BrokerStats = {
    totalLoads: 234,
    activeLoads: 45,
    completedLoads: 189,
    pendingLoads: 12,
    totalRevenue: 450000,
    averageRate: 1923,
    successRate: 96.8,
    totalCarriers: 67,
    profitMargin: 18.5
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
      carrier: 'ABC Trucking Co.',
      progress: 65,
      profit: 420
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
      carrier: 'XYZ Logistics LLC',
      progress: 100,
      profit: 330
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
      progress: 0,
      profit: 465
    }
  ];

  const mockCarriers: Carrier[] = [
    {
      id: '1',
      name: 'ABC Trucking Co.',
      rating: 4.8,
      totalLoads: 45,
      onTimeDelivery: 96,
      averageRate: 1850,
      status: 'active',
      specialties: ['Dry Van', 'Reefer', 'Flatbed'],
      location: 'Los Angeles, CA'
    },
    {
      id: '2',
      name: 'XYZ Logistics LLC',
      rating: 4.6,
      totalLoads: 32,
      onTimeDelivery: 94,
      averageRate: 1950,
      status: 'active',
      specialties: ['Dry Van', 'LTL'],
      location: 'Chicago, IL'
    },
    {
      id: '3',
      name: 'Fast Freight Inc.',
      rating: 4.9,
      totalLoads: 28,
      onTimeDelivery: 98,
      averageRate: 2100,
      status: 'active',
      specialties: ['Express', 'Dry Van'],
      location: 'Seattle, WA'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                Brokers Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Manage loads, match carriers, and optimize your brokerage operations
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
                Post Load
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Broker Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Loads</p>
                  <p className="text-3xl font-bold">{brokerStats.totalLoads}</p>
                  <p className="text-blue-200 text-sm">+18% this month</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold">{brokerStats.successRate}%</p>
                  <p className="text-green-200 text-sm">Excellent performance</p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold">${(brokerStats.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-purple-200 text-sm">Avg: ${brokerStats.averageRate}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Profit Margin</p>
                  <p className="text-3xl font-bold">{brokerStats.profitMargin}%</p>
                  <p className="text-orange-200 text-sm">Strong profitability</p>
                </div>
                <Percent className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="loads" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Loads</span>
            </TabsTrigger>
            <TabsTrigger value="carriers" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Carriers</span>
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center space-x-2">
              <Handshake className="h-4 w-4" />
              <span>Matching</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="negotiations" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Negotiations</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Loads */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span>Recent Loads</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockLoads.slice(0, 3).map((load) => (
                      <div key={load.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{load.loadNumber}</div>
                            <div className="text-sm text-gray-500">{load.origin} → {load.destination}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${load.rate}</div>
                          <div className="text-sm text-green-600">+${load.profit}</div>
                          {getStatusBadge(load.status)}
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
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>Top Carriers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockCarriers.slice(0, 3).map((carrier) => (
                      <div key={carrier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-green-600" />
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
                    <span>Post Load</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Handshake className="h-6 w-6" />
                    <span>Match Carriers</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Calculator className="h-6 w-6" />
                    <span>Rate Calculator</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Generate Reports</span>
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
                    <Package className="h-5 w-5 text-blue-600" />
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
                      Post Load
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
                      <TableHead className="font-semibold text-gray-700">Equipment</TableHead>
                      <TableHead className="font-semibold text-gray-700">Rate</TableHead>
                      <TableHead className="font-semibold text-gray-700">Profit</TableHead>
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
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                            {load.equipment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">${load.rate}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-green-600">+${load.profit}</div>
                          <div className="text-sm text-gray-500">{((load.profit / load.rate) * 100).toFixed(1)}% margin</div>
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

          {/* Carriers Tab */}
          <TabsContent value="carriers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>Available Carriers</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Carrier
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Carrier</TableHead>
                      <TableHead className="font-semibold text-gray-700">Location</TableHead>
                      <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                      <TableHead className="font-semibold text-gray-700">Specialties</TableHead>
                      <TableHead className="font-semibold text-gray-700">Performance</TableHead>
                      <TableHead className="font-semibold text-gray-700">Avg Rate</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCarriers.map((carrier) => (
                      <TableRow key={carrier.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{carrier.name}</div>
                              <div className="text-sm text-gray-500">{carrier.totalLoads} loads</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{carrier.location}</div>
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
                          <div className="font-medium text-gray-900">${carrier.averageRate}</div>
                          <div className="text-sm text-gray-500">Average per load</div>
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

          {/* Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Handshake className="h-5 w-5 text-purple-600" />
                  <span>Load-Carrier Matching</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {mockLoads.filter(load => load.status === 'pending').map((load) => (
                    <div key={load.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{load.loadNumber}</h3>
                          <p className="text-sm text-gray-600">{load.origin} → {load.destination}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${load.rate}</div>
                          <Badge variant="outline">{load.equipment}</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
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
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">Recommended Carriers</h4>
                        <div className="space-y-2">
                          {mockCarriers.slice(0, 3).map((carrier) => (
                            <div key={carrier.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">{carrier.name}</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(carrier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Contact</Button>
                                <Button size="sm">Assign</Button>
                              </div>
                            </div>
                          ))}
                        </div>
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
                      ${(brokerStats.totalRevenue / 1000).toFixed(0)}K
                    </div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+18% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Success Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {brokerStats.successRate}%
                    </div>
                    <p className="text-sm text-gray-600">Load Success Rate</p>
                    <div className="flex items-center justify-center mt-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">Excellent performance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Negotiations Tab */}
          <TabsContent value="negotiations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <span>Rate Negotiations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">LOAD-2024-001</h3>
                      <p className="text-sm text-gray-600">Los Angeles, CA → New York, NY</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">$2,800</div>
                      <div className="text-sm text-gray-500">Original Rate</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Counter</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">LOAD-2024-003</h3>
                      <p className="text-sm text-gray-600">Seattle, WA → Dallas, TX</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">$3,100</div>
                      <div className="text-sm text-gray-500">Negotiated Rate</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Review</Button>
                      <Button size="sm">Finalize</Button>
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

export default BrokersPortal;
