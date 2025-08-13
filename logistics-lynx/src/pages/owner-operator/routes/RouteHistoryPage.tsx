import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  Package, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Filter,
  Search,
  TrendingUp,
  Eye,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface RouteHistory {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalDistance: number;
  revenue: number;
  fuelCost: number;
  driverName: string;
  vehicleNumber: string;
  customerName: string;
  status: 'completed' | 'cancelled' | 'partial';
  deliveryTime: 'on_time' | 'early' | 'late';
  delayReason?: string;
  rating: number;
  notes: string;
  actualDuration: number; // in hours
  plannedDuration: number; // in hours
  fuelEfficiency: number; // mpg
  tollCosts: number;
  maintenanceCosts: number;
  netProfit: number;
}

const RouteHistoryPage: React.FC = () => {
  const [routes] = useState<RouteHistory[]>([
    {
      id: 'RH-001',
      loadNumber: 'LD-48001',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      startDate: '2024-01-15T08:00:00Z',
      endDate: '2024-01-16T14:30:00Z',
      totalDistance: 587,
      revenue: 2847,
      fuelCost: 425,
      driverName: 'Mike Johnson',
      vehicleNumber: 'TRK-001',
      customerName: 'Walmart Distribution',
      status: 'completed',
      deliveryTime: 'on_time',
      rating: 5,
      notes: 'Smooth delivery, customer satisfied',
      actualDuration: 30.5,
      plannedDuration: 32,
      fuelEfficiency: 7.2,
      tollCosts: 85,
      maintenanceCosts: 0,
      netProfit: 2337
    },
    {
      id: 'RH-002',
      loadNumber: 'LD-48002',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      startDate: '2024-01-14T06:00:00Z',
      endDate: '2024-01-14T18:45:00Z',
      totalDistance: 372,
      revenue: 1650,
      fuelCost: 310,
      driverName: 'Sarah Davis',
      vehicleNumber: 'TRK-002',
      customerName: 'Target Corp',
      status: 'completed',
      deliveryTime: 'late',
      delayReason: 'Traffic congestion',
      rating: 4,
      notes: '2-hour delay due to traffic on I-10',
      actualDuration: 14.75,
      plannedDuration: 12,
      fuelEfficiency: 6.8,
      tollCosts: 25,
      maintenanceCosts: 150,
      netProfit: 1165
    },
    {
      id: 'RH-003',
      loadNumber: 'LD-48003',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      startDate: '2024-01-13T09:30:00Z',
      endDate: '2024-01-13T14:15:00Z',
      totalDistance: 239,
      revenue: 890,
      fuelCost: 180,
      driverName: 'Carlos Martinez',
      vehicleNumber: 'TRK-003',
      customerName: 'Amazon Logistics',
      status: 'completed',
      deliveryTime: 'early',
      rating: 5,
      notes: 'Early delivery, excellent performance',
      actualDuration: 4.75,
      plannedDuration: 5.5,
      fuelEfficiency: 8.1,
      tollCosts: 15,
      maintenanceCosts: 0,
      netProfit: 695
    },
    {
      id: 'RH-004',
      loadNumber: 'LD-48004',
      origin: 'Miami, FL',
      destination: 'Orlando, FL',
      startDate: '2024-01-12T07:00:00Z',
      endDate: '2024-01-12T11:30:00Z',
      totalDistance: 235,
      revenue: 780,
      fuelCost: 165,
      driverName: 'Lisa Wong',
      vehicleNumber: 'TRK-004',
      customerName: 'Home Depot',
      status: 'completed',
      deliveryTime: 'on_time',
      rating: 5,
      notes: 'Perfect delivery timing',
      actualDuration: 4.5,
      plannedDuration: 4.5,
      fuelEfficiency: 7.9,
      tollCosts: 20,
      maintenanceCosts: 75,
      netProfit: 520
    },
    {
      id: 'RH-005',
      loadNumber: 'LD-48005',
      origin: 'Denver, CO',
      destination: 'Kansas City, MO',
      startDate: '2024-01-11T10:00:00Z',
      endDate: '2024-01-12T08:30:00Z',
      totalDistance: 558,
      revenue: 2150,
      fuelCost: 390,
      driverName: 'Robert Chen',
      vehicleNumber: 'TRK-005',
      customerName: 'Costco Wholesale',
      status: 'completed',
      deliveryTime: 'on_time',
      rating: 4,
      notes: 'Weather delays but managed on-time delivery',
      actualDuration: 22.5,
      plannedDuration: 24,
      fuelEfficiency: 6.9,
      tollCosts: 45,
      maintenanceCosts: 0,
      netProfit: 1715
    },
    {
      id: 'RH-006',
      loadNumber: 'LD-48006',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      startDate: '2024-01-10T15:00:00Z',
      endDate: '2024-01-10T18:45:00Z',
      totalDistance: 173,
      revenue: 650,
      fuelCost: 125,
      driverName: 'Jennifer Park',
      vehicleNumber: 'TRK-006',
      customerName: 'Nordstrom',
      status: 'cancelled',
      deliveryTime: 'on_time',
      delayReason: 'Customer request',
      rating: 3,
      notes: 'Cancelled due to customer inventory issues',
      actualDuration: 3.75,
      plannedDuration: 4,
      fuelEfficiency: 7.5,
      tollCosts: 0,
      maintenanceCosts: 0,
      netProfit: 525
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<RouteHistory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<unknown>(null);

  // Filter and sort routes
  const filteredAndSortedRoutes = useMemo(() => {
    const filtered = routes.filter(route => {
      const matchesSearch = 
        route.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
      const matchesDeliveryTime = deliveryTimeFilter === 'all' || route.deliveryTime === deliveryTimeFilter;
      
      const matchesDateRange = !dateRange?.from || !dateRange?.to || 
        (new Date(route.startDate) >= dateRange.from && new Date(route.startDate) <= dateRange.to);
      
      return matchesSearch && matchesStatus && matchesDeliveryTime && matchesDateRange;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.startDate).getTime();
          bValue = new Date(b.startDate).getTime();
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'distance':
          aValue = a.totalDistance;
          bValue = b.totalDistance;
          break;
        case 'profit':
          aValue = a.netProfit;
          bValue = b.netProfit;
          break;
        default:
          aValue = a.loadNumber;
          bValue = b.loadNumber;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [routes, searchTerm, statusFilter, deliveryTimeFilter, sortBy, sortOrder, dateRange]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const completedRoutes = filteredAndSortedRoutes.filter(r => r.status === 'completed');
    
    return {
      totalRoutes: filteredAndSortedRoutes.length,
      completedRoutes: completedRoutes.length,
      totalRevenue: completedRoutes.reduce((sum, r) => sum + r.revenue, 0),
      totalDistance: completedRoutes.reduce((sum, r) => sum + r.totalDistance, 0),
      totalProfit: completedRoutes.reduce((sum, r) => sum + r.netProfit, 0),
      averageRating: completedRoutes.length > 0 ? 
        completedRoutes.reduce((sum, r) => sum + r.rating, 0) / completedRoutes.length : 0,
      onTimePercentage: completedRoutes.length > 0 ? 
        (completedRoutes.filter(r => r.deliveryTime === 'on_time' || r.deliveryTime === 'early').length / completedRoutes.length) * 100 : 0,
      averageMPG: completedRoutes.length > 0 ?
        completedRoutes.reduce((sum, r) => sum + r.fuelEfficiency, 0) / completedRoutes.length : 0
    };
  }, [filteredAndSortedRoutes]);

  // Chart data for performance analytics
  const performanceData = useMemo(() => {
    const last30Days = routes
      .filter(r => {
        const routeDate = new Date(r.startDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return routeDate >= thirtyDaysAgo && r.status === 'completed';
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .map(route => ({
        date: new Date(route.startDate).toLocaleDateString(),
        revenue: route.revenue,
        profit: route.netProfit,
        distance: route.totalDistance,
        mpg: route.fuelEfficiency
      }));
    
    return last30Days;
  }, [routes]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDeliveryTimeColor = (deliveryTime: string) => {
    switch (deliveryTime) {
      case 'early': return 'text-green-600';
      case 'on_time': return 'text-blue-600';
      case 'late': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleExport = () => {
    const csvContent = [
      ['Load Number', 'Origin', 'Destination', 'Start Date', 'End Date', 'Distance', 'Revenue', 'Profit', 'Status', 'Rating'].join(','),
      ...filteredAndSortedRoutes.map(route => [
        route.loadNumber,
        route.origin,
        route.destination,
        route.startDate,
        route.endDate,
        route.totalDistance,
        route.revenue,
        route.netProfit,
        route.status,
        route.rating
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'route-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Route history exported successfully');
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route History</h1>
          <p className="text-muted-foreground">
            Review and analyze your completed transportation routes
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalRoutes}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.completedRoutes} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summaryStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ${summaryStats.totalProfit.toLocaleString()} profit
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.onTimePercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Delivery performance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fuel Efficiency</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.averageMPG.toFixed(1)} MPG
            </div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.totalDistance.toLocaleString()} total miles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Analytics (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'revenue' || name === 'profit') return [`$${value}`, name];
                    if (name === 'distance') return [`${value} mi`, name];
                    if (name === 'mpg') return [`${value} MPG`, name];
                    return [value, name];
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={deliveryTimeFilter} onValueChange={setDeliveryTimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Delivery Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Times</SelectItem>
                <SelectItem value="early">Early</SelectItem>
                <SelectItem value="on_time">On Time</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Routes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route History ({filteredAndSortedRoutes.length} routes)</CardTitle>
          <CardDescription>Complete history of your transportation routes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Load #</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedRoutes.map((route) => (
                <TableRow key={route.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{route.loadNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{route.origin}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {route.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{new Date(route.startDate).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">
                        to {new Date(route.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{route.driverName}</div>
                      <div className="text-xs text-muted-foreground">{route.vehicleNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{route.totalDistance} mi</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${route.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-blue-600 font-medium">
                    ${route.netProfit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(route.status)}>
                      {route.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={getDeliveryTimeColor(route.deliveryTime)}>
                    {route.deliveryTime.replace('_', ' ')}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{getRatingStars(route.rating)}</div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedRoute(route)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Route Details Dialog */}
      <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Route Details - {selectedRoute?.loadNumber}</DialogTitle>
            <DialogDescription>
              Complete information for this completed route
            </DialogDescription>
          </DialogHeader>
          
          {selectedRoute && (
            <div className="space-y-6">
              {/* Route Overview */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Route Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Load Number:</span>
                      <span className="font-mono">{selectedRoute.loadNumber}</span>
                      <span className="font-medium">Origin:</span>
                      <span>{selectedRoute.origin}</span>
                      <span className="font-medium">Destination:</span>
                      <span>{selectedRoute.destination}</span>
                      <span className="font-medium">Customer:</span>
                      <span>{selectedRoute.customerName}</span>
                      <span className="font-medium">Driver:</span>
                      <span>{selectedRoute.driverName}</span>
                      <span className="font-medium">Vehicle:</span>
                      <span>{selectedRoute.vehicleNumber}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusColor(selectedRoute.status)}>
                        {selectedRoute.status}
                      </Badge>
                      <span className="font-medium">Delivery Time:</span>
                      <span className={getDeliveryTimeColor(selectedRoute.deliveryTime)}>
                        {selectedRoute.deliveryTime.replace('_', ' ')}
                      </span>
                      <span className="font-medium">Rating:</span>
                      <span>{getRatingStars(selectedRoute.rating)}</span>
                      <span className="font-medium">Distance:</span>
                      <span>{selectedRoute.totalDistance} miles</span>
                      <span className="font-medium">Fuel Efficiency:</span>
                      <span>{selectedRoute.fuelEfficiency} MPG</span>
                      <span className="font-medium">Duration:</span>
                      <span>{selectedRoute.actualDuration}h (planned: {selectedRoute.plannedDuration}h)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Financial Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Revenue & Costs</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>Revenue:</span>
                        <span className="text-green-600 font-medium">${selectedRoute.revenue.toLocaleString()}</span>
                        <span>Fuel Cost:</span>
                        <span className="text-red-600">-${selectedRoute.fuelCost.toLocaleString()}</span>
                        <span>Toll Costs:</span>
                        <span className="text-red-600">-${selectedRoute.tollCosts.toLocaleString()}</span>
                        <span>Maintenance:</span>
                        <span className="text-red-600">-${selectedRoute.maintenanceCosts.toLocaleString()}</span>
                        <hr className="col-span-2" />
                        <span className="font-medium">Net Profit:</span>
                        <span className="text-blue-600 font-bold">${selectedRoute.netProfit.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>Revenue per Mile:</span>
                        <span>${(selectedRoute.revenue / selectedRoute.totalDistance).toFixed(2)}</span>
                        <span>Profit Margin:</span>
                        <span>{((selectedRoute.netProfit / selectedRoute.revenue) * 100).toFixed(1)}%</span>
                        <span>Cost per Mile:</span>
                        <span>${((selectedRoute.revenue - selectedRoute.netProfit) / selectedRoute.totalDistance).toFixed(2)}</span>
                        <span>Efficiency Rate:</span>
                        <span>{((selectedRoute.plannedDuration / selectedRoute.actualDuration) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Route Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="text-sm">
                        <strong>Started:</strong> {new Date(selectedRoute.startDate).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="text-sm">
                        <strong>Completed:</strong> {new Date(selectedRoute.endDate).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <div className="text-sm">
                        <strong>Total Duration:</strong> {selectedRoute.actualDuration} hours
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Notes & Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes & Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Route Notes</h4>
                      <p className="text-sm text-muted-foreground">{selectedRoute.notes}</p>
                    </div>
                    
                    {selectedRoute.delayReason && (
                      <div>
                        <h4 className="font-medium mb-2">Delay Reason</h4>
                        <p className="text-sm text-red-600">{selectedRoute.delayReason}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RouteHistoryPage;