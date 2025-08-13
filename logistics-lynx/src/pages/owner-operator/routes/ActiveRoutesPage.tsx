import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Phone,
  MessageSquare,
  Route,
  Fuel,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ActiveRoute {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  currentLocation: string;
  progress: number;
  estimatedArrival: string;
  actualDistance: number;
  remainingDistance: number;
  status: 'en_route' | 'at_pickup' | 'at_delivery' | 'delayed' | 'completed';
  priority: 'high' | 'medium' | 'low';
  revenue: number;
  fuelLevel: number;
  driverName: string;
  vehicleNumber: string;
  customerName: string;
  nextStop: string;
  weather: string;
  trafficCondition: 'light' | 'moderate' | 'heavy';
  lastUpdate: string;
  notes: string;
  contacts: {
    dispatcher: string;
    customer: string;
  };
}

const ActiveRoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<ActiveRoute[]>([
    {
      id: 'AR-001',
      loadNumber: 'LD-48291',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      currentLocation: 'Indianapolis, IN',
      progress: 45,
      estimatedArrival: '2024-01-20 14:30',
      actualDistance: 587,
      remainingDistance: 324,
      status: 'en_route',
      priority: 'high',
      revenue: 2847,
      fuelLevel: 68,
      driverName: 'Mike Johnson',
      vehicleNumber: 'TRK-001',
      customerName: 'Walmart Distribution',
      nextStop: 'Atlanta Hub',
      weather: 'Clear',
      trafficCondition: 'light',
      lastUpdate: '5 minutes ago',
      notes: 'On schedule, no issues reported',
      contacts: {
        dispatcher: '+1-555-0123',
        customer: '+1-555-0456'
      }
    },
    {
      id: 'AR-002',
      loadNumber: 'LD-48292',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      currentLocation: 'Riverside, CA',
      progress: 25,
      estimatedArrival: '2024-01-20 18:45',
      actualDistance: 372,
      remainingDistance: 279,
      status: 'delayed',
      priority: 'medium',
      revenue: 1650,
      fuelLevel: 85,
      driverName: 'Sarah Davis',
      vehicleNumber: 'TRK-002',
      customerName: 'Target Corp',
      nextStop: 'Phoenix Warehouse',
      weather: 'Sunny',
      trafficCondition: 'heavy',
      lastUpdate: '12 minutes ago',
      notes: 'Traffic delay on I-10, ETA updated',
      contacts: {
        dispatcher: '+1-555-0789',
        customer: '+1-555-0321'
      }
    },
    {
      id: 'AR-003',
      loadNumber: 'LD-48293',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      currentLocation: 'Houston Loading Dock',
      progress: 0,
      estimatedArrival: '2024-01-20 21:15',
      actualDistance: 239,
      remainingDistance: 239,
      status: 'at_pickup',
      priority: 'low',
      revenue: 890,
      fuelLevel: 92,
      driverName: 'Carlos Martinez',
      vehicleNumber: 'TRK-003',
      customerName: 'Amazon Logistics',
      nextStop: 'Dallas Distribution',
      weather: 'Partly Cloudy',
      trafficCondition: 'moderate',
      lastUpdate: '2 minutes ago',
      notes: 'Waiting for load confirmation',
      contacts: {
        dispatcher: '+1-555-0654',
        customer: '+1-555-0987'
      }
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<ActiveRoute | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredRoutes = routes.filter(route => {
    const matchesStatus = filterStatus === 'all' || route.status === filterStatus;
    const matchesSearch = 
      route.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route': return 'bg-blue-500';
      case 'at_pickup': return 'bg-yellow-500';
      case 'at_delivery': return 'bg-purple-500';
      case 'delayed': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300';
    }
  };

  const getTrafficColor = (condition: string) => {
    switch (condition) {
      case 'light': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'heavy': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    toast.success('Routes updated successfully');
  };

  const handleUpdateStatus = (routeId: string, newStatus: string) => {
    setRoutes(prev => prev.map(route => 
      route.id === routeId ? { ...route, status: newStatus as unknown } : route
    ));
    toast.success(`Route status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleContactDriver = (route: ActiveRoute) => {
    toast.success(`Calling ${route.driverName}...`);
  };

  const handleContactCustomer = (route: ActiveRoute) => {
    toast.success(`Calling ${route.customerName}...`);
  };

  const RouteCard = ({ route }: { route: ActiveRoute }) => (
    <Card className={`border-l-4 ${getPriorityColor(route.priority)} hover:shadow-lg transition-all duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">{route.loadNumber}</Badge>
            <Badge className={getStatusColor(route.status)}>
              {route.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className={`${route.priority === 'high' ? 'border-red-500 text-red-700' : route.priority === 'medium' ? 'border-yellow-500 text-yellow-700' : 'border-green-500 text-green-700'}`}>
              {route.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">${route.revenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">${(route.revenue / route.actualDistance).toFixed(2)}/mile</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Route Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Route Progress</span>
            <span>{route.progress}% Complete</span>
          </div>
          <Progress value={route.progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{route.actualDistance - route.remainingDistance} miles traveled</span>
            <span>{route.remainingDistance} miles remaining</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-blue-500" />
              Origin
            </div>
            <div className="pl-6 text-sm text-muted-foreground">{route.origin}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Navigation className="h-4 w-4 text-orange-500" />
              Current Location
            </div>
            <div className="pl-6 text-sm text-muted-foreground">{route.currentLocation}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Destination
            </div>
            <div className="pl-6 text-sm text-muted-foreground">{route.destination}</div>
          </div>
        </div>

        {/* Status Information */}
        <div className="grid md:grid-cols-4 gap-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Clock className="h-3 w-3" />
              ETA
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(route.estimatedArrival).toLocaleString()}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Fuel className="h-3 w-3" />
              Fuel
            </div>
            <div className="text-xs text-muted-foreground mt-1">{route.fuelLevel}%</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Route className="h-3 w-3" />
              Traffic
            </div>
            <div className={`text-xs mt-1 font-medium ${getTrafficColor(route.trafficCondition)}`}>
              {route.trafficCondition}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Truck className="h-3 w-3" />
              Driver
            </div>
            <div className="text-xs text-muted-foreground mt-1">{route.driverName}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" onClick={() => setSelectedRoute(route)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Button size="sm" variant="outline" onClick={() => handleContactDriver(route)}>
            <Phone className="h-4 w-4 mr-2" />
            Call Driver
          </Button>
          
          <Button size="sm" variant="outline" onClick={() => handleContactCustomer(route)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Customer
          </Button>
          
          <Select onValueChange={(value) => handleUpdateStatus(route.id, value)}>
            <SelectTrigger className="w-40 h-8">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en_route">En Route</SelectItem>
              <SelectItem value="at_pickup">At Pickup</SelectItem>
              <SelectItem value="at_delivery">At Delivery</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes */}
        {route.notes && (
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
            <strong>Notes:</strong> {route.notes}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Last updated: {route.lastUpdate}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Routes</h1>
          <p className="text-muted-foreground">
            Monitor and manage your currently active transportation routes
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Updating...' : 'Refresh Routes'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routes.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${routes.reduce((sum, route) => sum + route.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {routes.filter(r => r.status !== 'delayed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {routes.length} routes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {routes.filter(r => r.status === 'delayed' || r.fuelLevel < 25).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by load number, origin, destination, or driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Routes</SelectItem>
            <SelectItem value="en_route">En Route</SelectItem>
            <SelectItem value="at_pickup">At Pickup</SelectItem>
            <SelectItem value="at_delivery">At Delivery</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Routes Display */}
      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Active Routes Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load #</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-mono">{route.loadNumber}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{route.origin}</div>
                          <div className="text-xs text-muted-foreground">to {route.destination}</div>
                        </div>
                      </TableCell>
                      <TableCell>{route.driverName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={route.progress} className="w-16 h-2" />
                          <div className="text-xs text-center">{route.progress}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(route.estimatedArrival).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        ${route.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
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
      </Tabs>

      {/* Route Details Dialog */}
      <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Route Details - {selectedRoute?.loadNumber}</DialogTitle>
            <DialogDescription>
              Complete information for this active route
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
                      <span className="font-medium">Origin:</span>
                      <span>{selectedRoute.origin}</span>
                      <span className="font-medium">Destination:</span>
                      <span>{selectedRoute.destination}</span>
                      <span className="font-medium">Current Location:</span>
                      <span>{selectedRoute.currentLocation}</span>
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
                    <CardTitle className="text-lg">Progress & Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Route Progress</span>
                        <span>{selectedRoute.progress}%</span>
                      </div>
                      <Progress value={selectedRoute.progress} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Distance:</span>
                      <span>{selectedRoute.actualDistance} miles</span>
                      <span className="font-medium">Remaining:</span>
                      <span>{selectedRoute.remainingDistance} miles</span>
                      <span className="font-medium">Fuel Level:</span>
                      <span>{selectedRoute.fuelLevel}%</span>
                      <span className="font-medium">Weather:</span>
                      <span>{selectedRoute.weather}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Dispatcher</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedRoute.contacts.dispatcher}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Customer</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedRoute.contacts.customer}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes & Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">{selectedRoute.notes}</p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {selectedRoute.lastUpdate}
                    </p>
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

export default ActiveRoutesPage;