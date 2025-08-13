import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Package, Warehouse, Truck, Clock, Edit, Trash2, Plus, Save, AlertTriangle, CheckCircle, Activity, Globe, Users, BarChart3 } from 'lucide-react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { toast } from 'sonner';

interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'distribution' | 'fulfillment' | 'cross_dock' | 'storage';
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'maintenance' | 'inactive';
  manager: string;
  phone: string;
  operatingHours: string;
}

interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedTime: string;
  vehicleType: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'on_demand';
  cost: number;
  status: 'active' | 'suspended' | 'planning';
}

const LogisticsSettingsPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: 'WH-001',
      name: 'Dallas Distribution Center',
      address: '1234 Industrial Blvd',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      type: 'distribution',
      capacity: 500000,
      currentUtilization: 375000,
      status: 'active',
      manager: 'Sarah Johnson',
      phone: '(214) 555-0101',
      operatingHours: '24/7'
    },
    {
      id: 'WH-002',
      name: 'Houston Fulfillment Hub',
      address: '5678 Warehouse Way',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      type: 'fulfillment',
      capacity: 750000,
      currentUtilization: 525000,
      status: 'active',
      manager: 'Mike Rodriguez',
      phone: '(713) 555-0102',
      operatingHours: 'Mon-Fri 6AM-10PM'
    },
    {
      id: 'WH-003',
      name: 'Austin Cross Dock',
      address: '9012 Logistics Lane',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      type: 'cross_dock',
      capacity: 200000,
      currentUtilization: 120000,
      status: 'maintenance',
      manager: 'Emily Chen',
      phone: '(512) 555-0103',
      operatingHours: 'Mon-Sat 5AM-11PM'
    }
  ]);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 'RT-001',
      name: 'Dallas-Houston Express',
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      distance: 240,
      estimatedTime: '4.5 hours',
      vehicleType: 'Tractor-Trailer',
      frequency: 'daily',
      cost: 480,
      status: 'active'
    },
    {
      id: 'RT-002',
      name: 'Houston-Austin Direct',
      origin: 'Houston, TX',
      destination: 'Austin, TX',
      distance: 165,
      estimatedTime: '3 hours',
      vehicleType: 'Box Truck',
      frequency: 'weekly',
      cost: 330,
      status: 'active'
    },
    {
      id: 'RT-003',
      name: 'Austin-San Antonio Loop',
      origin: 'Austin, TX',
      destination: 'San Antonio, TX',
      distance: 80,
      estimatedTime: '1.5 hours',
      vehicleType: 'Delivery Van',
      frequency: 'daily',
      cost: 160,
      status: 'planning'
    }
  ]);

  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isWarehouseDialogOpen, setIsWarehouseDialogOpen] = useState(false);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [warehouseForm, setWarehouseForm] = useState<Partial<Warehouse>>({});
  const [routeForm, setRouteForm] = useState<Partial<Route>>({});

  const [logisticsSettings, setLogisticsSettings] = useState({
    realTimeTracking: true,
    automaticRouting: true,
    inventorySync: true,
    demandForecasting: false,
    crossDocking: true,
    returnProcessing: true,
    qualityControl: false,
    performanceAnalytics: true
  });

  const handleEditWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseForm(warehouse);
    setIsWarehouseDialogOpen(true);
  };

  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route);
    setRouteForm(route);
    setIsRouteDialogOpen(true);
  };

  const handleDeleteWarehouse = (warehouseId: string) => {
    setWarehouses(warehouses.filter(w => w.id !== warehouseId));
    toast.success('Warehouse removed successfully');
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(routes.filter(r => r.id !== routeId));
    toast.success('Route removed successfully');
  };

  const handleSaveWarehouse = () => {
    if (selectedWarehouse && warehouseForm.id) {
      setWarehouses(warehouses.map(w => w.id === warehouseForm.id ? { ...w, ...warehouseForm } as Warehouse : w));
      toast.success('Warehouse updated successfully');
    } else if (warehouseForm.name && warehouseForm.address) {
      const newWarehouse: Warehouse = {
        id: `WH-${String(warehouses.length + 1).padStart(3, '0')}`,
        name: warehouseForm.name,
        address: warehouseForm.address || '',
        city: warehouseForm.city || '',
        state: warehouseForm.state || '',
        zipCode: warehouseForm.zipCode || '',
        type: warehouseForm.type || 'distribution',
        capacity: warehouseForm.capacity || 100000,
        currentUtilization: warehouseForm.currentUtilization || 0,
        status: warehouseForm.status || 'active',
        manager: warehouseForm.manager || '',
        phone: warehouseForm.phone || '',
        operatingHours: warehouseForm.operatingHours || '9AM-5PM'
      };
      setWarehouses([...warehouses, newWarehouse]);
      toast.success('New warehouse added successfully');
    }
    setIsWarehouseDialogOpen(false);
    setIsAddWarehouseOpen(false);
    setWarehouseForm({});
    setSelectedWarehouse(null);
  };

  const handleSaveRoute = () => {
    if (selectedRoute && routeForm.id) {
      setRoutes(routes.map(r => r.id === routeForm.id ? { ...r, ...routeForm } as Route : r));
      toast.success('Route updated successfully');
    } else if (routeForm.name && routeForm.origin) {
      const newRoute: Route = {
        id: `RT-${String(routes.length + 1).padStart(3, '0')}`,
        name: routeForm.name,
        origin: routeForm.origin || '',
        destination: routeForm.destination || '',
        distance: routeForm.distance || 0,
        estimatedTime: routeForm.estimatedTime || '',
        vehicleType: routeForm.vehicleType || 'Truck',
        frequency: routeForm.frequency || 'weekly',
        cost: routeForm.cost || 0,
        status: routeForm.status || 'planning'
      };
      setRoutes([...routes, newRoute]);
      toast.success('New route added successfully');
    }
    setIsRouteDialogOpen(false);
    setIsAddRouteOpen(false);
    setRouteForm({});
    setSelectedRoute(null);
  };

  const handleSettingChange = (key: keyof typeof logisticsSettings, value: boolean) => {
    setLogisticsSettings(prev => ({ ...prev, [key]: value }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`);
  };

  const getStatusBadge = (status: string, type: 'warehouse' | 'route') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"><Clock className="w-3 h-3 mr-1" />Maintenance</Badge>;
      case 'inactive':
      case 'suspended':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><AlertTriangle className="w-3 h-3 mr-1" />{status === 'inactive' ? 'Inactive' : 'Suspended'}</Badge>;
      case 'planning':
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"><Activity className="w-3 h-3 mr-1" />Planning</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUtilizationPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <CarrierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Logistics Settings</h1>
            <p className="text-muted-foreground">Manage warehouses, routes, and logistics operations</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Warehouse
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Warehouse</DialogTitle>
                  <DialogDescription>Configure a new warehouse or facility</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={warehouseForm.name || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Dallas Distribution Center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={warehouseForm.type} onValueChange={(value) => setWarehouseForm(prev => ({ ...prev, type: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distribution">Distribution</SelectItem>
                        <SelectItem value="fulfillment">Fulfillment</SelectItem>
                        <SelectItem value="cross_dock">Cross Dock</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Address</Label>
                    <Input 
                      value={warehouseForm.address || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="1234 Industrial Blvd"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input 
                      value={warehouseForm.city || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Dallas"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input 
                      value={warehouseForm.state || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity (sq ft)</Label>
                    <Input 
                      type="number"
                      value={warehouseForm.capacity || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      placeholder="500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Manager</Label>
                    <Input 
                      value={warehouseForm.manager || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, manager: e.target.value }))}
                      placeholder="Sarah Johnson"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddWarehouseOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveWarehouse}>Add Warehouse</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Route
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Configure a new transportation route</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Route Name</Label>
                    <Input 
                      value={routeForm.name || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Dallas-Houston Express"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Origin</Label>
                    <Input 
                      value={routeForm.origin || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, origin: e.target.value }))}
                      placeholder="Dallas, TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input 
                      value={routeForm.destination || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, destination: e.target.value }))}
                      placeholder="Houston, TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Distance (miles)</Label>
                    <Input 
                      type="number"
                      value={routeForm.distance || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                      placeholder="240"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select value={routeForm.vehicleType} onValueChange={(value) => setRouteForm(prev => ({ ...prev, vehicleType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tractor-Trailer">Tractor-Trailer</SelectItem>
                        <SelectItem value="Box Truck">Box Truck</SelectItem>
                        <SelectItem value="Delivery Van">Delivery Van</SelectItem>
                        <SelectItem value="Flatbed">Flatbed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={routeForm.frequency} onValueChange={(value) => setRouteForm(prev => ({ ...prev, frequency: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="on_demand">On Demand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Cost ($)</Label>
                    <Input 
                      type="number"
                      value={routeForm.cost || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                      placeholder="480"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveRoute}>Add Route</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="warehouses" className="gap-2">
              <Warehouse className="h-4 w-4" />
              Warehouses
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2">
              <MapPin className="h-4 w-4" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Globe className="h-4 w-4" />
              Network Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Warehouse className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Warehouses</p>
                    <p className="text-2xl font-bold">{warehouses.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Routes</p>
                    <p className="text-2xl font-bold">{routes.filter(r => r.status === 'active').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Utilization</p>
                    <p className="text-2xl font-bold">
                      {Math.round(warehouses.reduce((acc, w) => acc + getUtilizationPercentage(w.currentUtilization, w.capacity), 0) / warehouses.length)}%
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Truck className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Routes</p>
                    <p className="text-2xl font-bold">{routes.filter(r => r.frequency === 'daily').length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Utilization</CardTitle>
                  <CardDescription>Current capacity usage across facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {warehouses.map((warehouse) => {
                      const utilization = getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity);
                      return (
                        <div key={warehouse.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{warehouse.name}</span>
                            <span className="text-muted-foreground">{utilization}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                utilization > 90 ? 'bg-red-500' :
                                utilization > 75 ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${utilization}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Route Performance</CardTitle>
                  <CardDescription>Cost efficiency and frequency analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routes.slice(0, 3).map((route) => (
                      <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{route.name}</p>
                          <p className="text-sm text-muted-foreground">{route.distance} miles • {route.frequency}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${route.cost}</p>
                          <p className="text-sm text-muted-foreground">${(route.cost / route.distance).toFixed(2)}/mi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="warehouses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Warehouse Management
                </CardTitle>
                <CardDescription>Manage your warehouse facilities and distribution centers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouses.map((warehouse) => {
                      const utilization = getUtilizationPercentage(warehouse.currentUtilization, warehouse.capacity);
                      return (
                        <TableRow key={warehouse.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{warehouse.name}</p>
                              <p className="text-sm text-muted-foreground">{warehouse.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{warehouse.city}, {warehouse.state}</p>
                              <p className="text-sm text-muted-foreground">{warehouse.address}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{warehouse.type.replace('_', ' ')}</Badge>
                          </TableCell>
                          <TableCell>{warehouse.capacity.toLocaleString()} sq ft</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-secondary rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    utilization > 90 ? 'bg-red-500' :
                                    utilization > 75 ? 'bg-amber-500' :
                                    'bg-emerald-500'
                                  }`}
                                  style={{ width: `${utilization}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">{utilization}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(warehouse.status, 'warehouse')}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{warehouse.manager}</p>
                              <p className="text-sm text-muted-foreground">{warehouse.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditWarehouse(warehouse)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Warehouse</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove {warehouse.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteWarehouse(warehouse.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Warehouse Dialog */}
            <Dialog open={isWarehouseDialogOpen} onOpenChange={setIsWarehouseDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Warehouse: {selectedWarehouse?.name}</DialogTitle>
                  <DialogDescription>Update warehouse information and settings</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={warehouseForm.name || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={warehouseForm.type} onValueChange={(value) => setWarehouseForm(prev => ({ ...prev, type: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distribution">Distribution</SelectItem>
                        <SelectItem value="fulfillment">Fulfillment</SelectItem>
                        <SelectItem value="cross_dock">Cross Dock</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={warehouseForm.status} onValueChange={(value) => setWarehouseForm(prev => ({ ...prev, status: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Manager</Label>
                    <Input 
                      value={warehouseForm.manager || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, manager: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity (sq ft)</Label>
                    <Input 
                      type="number"
                      value={warehouseForm.capacity || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Utilization (sq ft)</Label>
                    <Input 
                      type="number"
                      value={warehouseForm.currentUtilization || ''} 
                      onChange={(e) => setWarehouseForm(prev => ({ ...prev, currentUtilization: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsWarehouseDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveWarehouse}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Route Management
                </CardTitle>
                <CardDescription>Configure and optimize transportation routes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{route.name}</p>
                            <p className="text-sm text-muted-foreground">{route.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{route.origin}</p>
                            <p className="text-sm text-muted-foreground">→ {route.destination}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{route.distance} mi</p>
                            <p className="text-sm text-muted-foreground">{route.estimatedTime}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{route.vehicleType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{route.frequency.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${route.cost}</p>
                            <p className="text-sm text-muted-foreground">${(route.cost / route.distance).toFixed(2)}/mi</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(route.status, 'route')}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditRoute(route)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Route</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove the route {route.name}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteRoute(route.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Route Dialog */}
            <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Route: {selectedRoute?.name}</DialogTitle>
                  <DialogDescription>Update route information and settings</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Route Name</Label>
                    <Input 
                      value={routeForm.name || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Origin</Label>
                    <Input 
                      value={routeForm.origin || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, origin: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input 
                      value={routeForm.destination || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, destination: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Distance (miles)</Label>
                    <Input 
                      type="number"
                      value={routeForm.distance || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={routeForm.status} onValueChange={(value) => setRouteForm(prev => ({ ...prev, status: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cost ($)</Label>
                    <Input 
                      type="number"
                      value={routeForm.cost || ''} 
                      onChange={(e) => setRouteForm(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={routeForm.frequency} onValueChange={(value) => setRouteForm(prev => ({ ...prev, frequency: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="on_demand">On Demand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRouteDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveRoute}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Logistics Network Settings
                </CardTitle>
                <CardDescription>Configure automation and optimization features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Real-Time Tracking</Label>
                      <p className="text-sm text-muted-foreground">Live GPS tracking for all shipments and vehicles</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.realTimeTracking} 
                      onCheckedChange={(checked) => handleSettingChange('realTimeTracking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Automatic Routing</Label>
                      <p className="text-sm text-muted-foreground">AI-powered route optimization and scheduling</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.automaticRouting} 
                      onCheckedChange={(checked) => handleSettingChange('automaticRouting', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Inventory Synchronization</Label>
                      <p className="text-sm text-muted-foreground">Real-time inventory updates across all locations</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.inventorySync} 
                      onCheckedChange={(checked) => handleSettingChange('inventorySync', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Demand Forecasting</Label>
                      <p className="text-sm text-muted-foreground">Predictive analytics for capacity planning</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.demandForecasting} 
                      onCheckedChange={(checked) => handleSettingChange('demandForecasting', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Cross-Docking Operations</Label>
                      <p className="text-sm text-muted-foreground">Automated cross-dock scheduling and management</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.crossDocking} 
                      onCheckedChange={(checked) => handleSettingChange('crossDocking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Return Processing</Label>
                      <p className="text-sm text-muted-foreground">Automated returns handling and processing</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.returnProcessing} 
                      onCheckedChange={(checked) => handleSettingChange('returnProcessing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Quality Control</Label>
                      <p className="text-sm text-muted-foreground">Automated quality checks and inspections</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.qualityControl} 
                      onCheckedChange={(checked) => handleSettingChange('qualityControl', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Performance Analytics</Label>
                      <p className="text-sm text-muted-foreground">Real-time KPI monitoring and reporting</p>
                    </div>
                    <Switch 
                      checked={logisticsSettings.performanceAnalytics} 
                      onCheckedChange={(checked) => handleSettingChange('performanceAnalytics', checked)}
                    />
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Network Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CarrierLayout>
  );
};

export default LogisticsSettingsPage;