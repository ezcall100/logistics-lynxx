/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Truck, 
  Calendar,
  Download,
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Route,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteHistory {
  id: string;
  routeId: string;
  startDate: string;
  endDate: string;
  origin: string;
  destination: string;
  totalMiles: number;
  totalStops: number;
  completionTime: string;
  status: 'completed' | 'cancelled' | 'delayed';
  earnings: number;
  fuelCost: number;
  rating: number;
  notes?: string;
}

const RouteHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');
  const [selectedRoute, setSelectedRoute] = useState<RouteHistory | null>(null);

  const routeHistory: RouteHistory[] = [
    {
      id: "1",
      routeId: "RT-2025-001246",
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      origin: "Dallas, TX",
      destination: "Denver, CO",
      totalMiles: 925,
      totalStops: 4,
      completionTime: "3d 8h 15m",
      status: "completed",
      earnings: 2850.00,
      fuelCost: 425.50,
      rating: 4.8,
      notes: "Smooth delivery, great customer service feedback"
    },
    {
      id: "2",
      routeId: "RT-2025-001245",
      startDate: "2025-01-10",
      endDate: "2025-01-13",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      totalMiles: 1150,
      totalStops: 6,
      completionTime: "3d 12h 45m",
      status: "completed",
      earnings: 3200.00,
      fuelCost: 520.75,
      rating: 5.0,
      notes: "Perfect on-time delivery, bonus earned"
    },
    {
      id: "3",
      routeId: "RT-2025-001244",
      startDate: "2025-01-05",
      endDate: "2025-01-08",
      origin: "San Antonio, TX",
      destination: "Las Vegas, NV",
      totalMiles: 1089,
      totalStops: 3,
      completionTime: "3d 6h 30m",
      status: "delayed",
      earnings: 2950.00,
      fuelCost: 485.25,
      rating: 4.2,
      notes: "Weather delay in New Mexico"
    },
    {
      id: "4",
      routeId: "RT-2024-001243",
      startDate: "2024-12-28",
      endDate: "2025-01-02",
      origin: "Austin, TX",
      destination: "Seattle, WA",
      totalMiles: 2050,
      totalStops: 8,
      completionTime: "4d 10h 20m",
      status: "completed",
      earnings: 4500.00,
      fuelCost: 825.00,
      rating: 4.9,
      notes: "Long haul completed ahead of schedule"
    },
    {
      id: "5",
      routeId: "RT-2024-001242",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      origin: "Fort Worth, TX",
      destination: "Kansas City, MO",
      totalMiles: 650,
      totalStops: 2,
      completionTime: "2d 4h 15m",
      status: "completed",
      earnings: 1850.00,
      fuelCost: 285.50,
      rating: 4.6
    },
    {
      id: "6",
      routeId: "RT-2024-001241",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      origin: "Dallas, TX",
      destination: "Atlanta, GA",
      totalMiles: 925,
      totalStops: 5,
      completionTime: "2d 18h 45m",
      status: "cancelled",
      earnings: 0,
      fuelCost: 125.00,
      rating: 0,
      notes: "Cancelled due to equipment failure"
    }
  ];

  const filteredRoutes = routeHistory.filter(route => {
    const matchesSearch = route.routeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
    
    const now = new Date();
    const routeDate = new Date(route.startDate);
    const daysAgo = parseInt(dateFilter);
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const matchesDate = routeDate >= cutoffDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'bg-green-100 text-green-700 border-green-200',
      'cancelled': 'bg-red-100 text-red-700 border-red-200',
      'delayed': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  const totalEarnings = filteredRoutes.reduce((sum, route) => sum + route.earnings, 0);
  const totalMiles = filteredRoutes.reduce((sum, route) => sum + route.totalMiles, 0);
  const completedRoutes = filteredRoutes.filter(route => route.status === 'completed').length;
  const averageRating = filteredRoutes.filter(route => route.rating > 0)
    .reduce((sum, route, _, arr) => sum + route.rating / arr.length, 0);

  const handleExportData = () => {
    try {
      // Create CSV headers
      const headers = [
        'Route ID',
        'Start Date',
        'End Date',
        'Origin',
        'Destination',
        'Total Miles',
        'Total Stops',
        'Completion Time',
        'Status',
        'Earnings',
        'Fuel Cost',
        'Rating',
        'Notes'
      ];

      // Convert data to CSV format
      const csvData = [
        headers.join(','),
        ...filteredRoutes.map(route => [
          route.routeId,
          route.startDate,
          route.endDate,
          `"${route.origin}"`,
          `"${route.destination}"`,
          route.totalMiles,
          route.totalStops,
          route.completionTime,
          route.status,
          route.earnings,
          route.fuelCost,
          route.rating,
          `"${route.notes || ''}"`
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `route_history_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Route history data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="w-full max-w-none p-6 space-y-8 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* AI-Enhanced Hero Header */}
      <div className="glass-ultra rounded-3xl p-8 border border-border/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5" />
        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                    Route History
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Performance analytics and completed routes
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-medium">
                  {filteredRoutes.length} Routes Found
                </Badge>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Performance Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  Real-time Analytics
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="btn-premium hover:scale-105 transition-transform">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <Button onClick={handleExportData} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 btn-premium">
                <Download className="w-4 h-4 mr-2" />
                Export Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Enhanced Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-l-4 border-l-green-500 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Earnings</p>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(totalEarnings)}</p>
                  <div className="text-xs text-muted-foreground">
                    Avg: {formatCurrency(totalEarnings / (completedRoutes || 1))} per route
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-l-4 border-l-blue-500 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Distance</p>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-blue-600">{totalMiles.toLocaleString()}</p>
                  <div className="text-xs text-muted-foreground">
                    Avg: {Math.round(totalMiles / (completedRoutes || 1))} miles per route
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Route className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-l-4 border-l-purple-500 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Routes Completed</p>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-purple-600">{completedRoutes}</p>
                  <div className="text-xs text-muted-foreground">
                    {((completedRoutes / filteredRoutes.length) * 100).toFixed(0)}% success rate
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-l-4 border-l-yellow-500 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Performance Rating</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                    <div className="flex">{renderStars(Math.round(averageRating))}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based on {filteredRoutes.filter(r => r.rating > 0).length} ratings
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Search & Filters */}
      <Card className="glass border border-border/50">
        <CardHeader className="bg-gradient-to-r from-muted/30 to-background rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Smart Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="AI-powered search: Route ID, locations, dates, earnings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gradient-to-r from-background to-muted/10 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">✅ Completed</SelectItem>
                  <SelectItem value="delayed">⚠️ Delayed</SelectItem>
                  <SelectItem value="cancelled">❌ Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">📅 Last 7 days</SelectItem>
                  <SelectItem value="30">📅 Last 30 days</SelectItem>
                  <SelectItem value="90">📅 Last 90 days</SelectItem>
                  <SelectItem value="365">📅 Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2">
              <Button variant="outline" className="w-full btn-premium">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              High Earnings ($3K+)
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Route className="w-3 h-3 mr-1" />
              Long Haul (1000+ mi)
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Star className="w-3 h-3 mr-1" />
              5-Star Rated
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              On-Time Delivery
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Route History Table */}
      <Card className="glass-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Route History ({filteredRoutes.length} routes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route ID</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Miles</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoutes.map((route) => (
                  <TableRow key={route.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{route.routeId}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(route.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(route.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{route.origin}</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {route.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Route className="w-4 h-4 text-muted-foreground" />
                        {route.totalMiles.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {route.completionTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(route.status)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(route.earnings)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {route.rating > 0 ? (
                          <>
                            <span className="text-sm font-medium">{route.rating}</span>
                            <div className="flex">
                              {renderStars(route.rating)}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedRoute(route)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Route Details - {route.routeId}</DialogTitle>
                          </DialogHeader>
                          {selectedRoute && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Origin</label>
                                  <p className="text-lg">{selectedRoute.origin}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Destination</label>
                                  <p className="text-lg">{selectedRoute.destination}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Total Miles</label>
                                  <p className="text-lg">{selectedRoute.totalMiles.toLocaleString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Total Stops</label>
                                  <p className="text-lg">{selectedRoute.totalStops}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Completion Time</label>
                                  <p className="text-lg">{selectedRoute.completionTime}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                                  <div className="mt-1">
                                    {getStatusBadge(selectedRoute.status)}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Earnings</label>
                                  <p className="text-lg font-semibold text-green-600">
                                    {formatCurrency(selectedRoute.earnings)}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Fuel Cost</label>
                                  <p className="text-lg">{formatCurrency(selectedRoute.fuelCost)}</p>
                                </div>
                              </div>
                              
                              {selectedRoute.rating > 0 && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-medium">{selectedRoute.rating}</span>
                                    <div className="flex">
                                      {renderStars(selectedRoute.rating)}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {selectedRoute.notes && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                                  <p className="text-sm mt-1 p-3 bg-muted rounded-lg">
                                    {selectedRoute.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No routes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteHistoryPage;