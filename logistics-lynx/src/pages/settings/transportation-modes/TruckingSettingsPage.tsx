/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Truck, Settings, Shield, Fuel, Calendar, MapPin, Users, Edit, Trash2, Plus, Save, AlertTriangle, CheckCircle, Clock, TrendingUp, DollarSign } from 'lucide-react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { toast } from 'sonner';

interface TruckSettings {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: 'active' | 'maintenance' | 'out_of_service';
  fuelType: string;
  maxWeight: number;
  currentDriver?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  mileage: number;
}

const TruckingSettingsPage = () => {
  const [trucks, setTrucks] = useState<TruckSettings[]>([
    {
      id: 'TRK-001',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      vin: '1FUJGHDV8NLAA1234',
      licensePlate: 'TRK-001-TX',
      status: 'active',
      fuelType: 'Diesel',
      maxWeight: 80000,
      currentDriver: 'John Smith',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      location: 'Dallas, TX',
      mileage: 125000
    },
    {
      id: 'TRK-002',
      make: 'Volvo',
      model: 'VNL',
      year: 2021,
      vin: '4V4NC9GH5MN567890',
      licensePlate: 'TRK-002-TX',
      status: 'maintenance',
      fuelType: 'Diesel',
      maxWeight: 80000,
      currentDriver: undefined,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: 'Houston, TX',
      mileage: 98000
    },
    {
      id: 'TRK-003',
      make: 'Peterbilt',
      model: '579',
      year: 2023,
      vin: '1XPWD40X1ED901234',
      licensePlate: 'TRK-003-TX',
      status: 'active',
      fuelType: 'Diesel',
      maxWeight: 80000,
      currentDriver: 'Mike Johnson',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-05-20',
      location: 'Austin, TX',
      mileage: 45000
    }
  ]);

  const [selectedTruck, setSelectedTruck] = useState<TruckSettings | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<TruckSettings>>({});

  const [fleetSettings, setFleetSettings] = useState({
    autoDispatch: true,
    maintenanceAlerts: true,
    fuelTracking: true,
    gpsTracking: true,
    documentScanning: false,
    driverScoring: true
  });

  const handleEditTruck = (truck: TruckSettings) => {
    setSelectedTruck(truck);
    setEditForm(truck);
    setIsEditDialogOpen(true);
  };

  const handleDeleteTruck = (truckId: string) => {
    setTrucks(trucks.filter(t => t.id !== truckId));
    toast.success('Truck removed successfully');
  };

  const handleSaveTruck = () => {
    if (selectedTruck && editForm.id) {
      setTrucks(trucks.map(t => t.id === editForm.id ? { ...t, ...editForm } as TruckSettings : t));
      toast.success('Truck updated successfully');
    } else if (editForm.make && editForm.model) {
      const newTruck: TruckSettings = {
        id: `TRK-${String(trucks.length + 1).padStart(3, '0')}`,
        make: editForm.make,
        model: editForm.model || '',
        year: editForm.year || new Date().getFullYear(),
        vin: editForm.vin || '',
        licensePlate: editForm.licensePlate || '',
        status: editForm.status || 'active',
        fuelType: editForm.fuelType || 'Diesel',
        maxWeight: editForm.maxWeight || 80000,
        currentDriver: editForm.currentDriver,
        lastMaintenance: editForm.lastMaintenance || new Date().toISOString().split('T')[0],
        nextMaintenance: editForm.nextMaintenance || new Date().toISOString().split('T')[0],
        location: editForm.location || '',
        mileage: editForm.mileage || 0
      };
      setTrucks([...trucks, newTruck]);
      toast.success('New truck added successfully');
    }
    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
    setEditForm({});
    setSelectedTruck(null);
  };

  const handleSettingChange = (key: keyof typeof fleetSettings, value: boolean) => {
    setFleetSettings(prev => ({ ...prev, [key]: value }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"><Clock className="w-3 h-3 mr-1" />Maintenance</Badge>;
      case 'out_of_service':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Out of Service</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <CarrierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trucking Settings</h1>
            <p className="text-muted-foreground">Manage your fleet, vehicles, and trucking operations</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Truck
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Truck</DialogTitle>
                  <DialogDescription>Enter the details for the new truck</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Input 
                      value={editForm.make || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, make: e.target.value }))}
                      placeholder="Freightliner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input 
                      value={editForm.model || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="Cascadia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input 
                      type="number"
                      value={editForm.year || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      placeholder="2023"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>VIN</Label>
                    <Input 
                      value={editForm.vin || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, vin: e.target.value }))}
                      placeholder="1FUJGHDV8NLAA1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>License Plate</Label>
                    <Input 
                      value={editForm.licensePlate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, licensePlate: e.target.value }))}
                      placeholder="TRK-001-TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="out_of_service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Weight (lbs)</Label>
                    <Input 
                      type="number"
                      value={editForm.maxWeight || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, maxWeight: parseInt(e.target.value) }))}
                      placeholder="80000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={editForm.location || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Dallas, TX"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveTruck}>Add Truck</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="fleet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fleet" className="gap-2">
              <Truck className="h-4 w-4" />
              Fleet Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Fleet Settings
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="fuel" className="gap-2">
              <Fuel className="h-4 w-4" />
              Fuel Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fleet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Fleet Overview
                </CardTitle>
                <CardDescription>Manage your truck fleet and vehicle assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Truck className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Trucks</p>
                          <p className="text-2xl font-bold">{trucks.length}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active</p>
                          <p className="text-2xl font-bold">{trucks.filter(t => t.status === 'active').length}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Maintenance</p>
                          <p className="text-2xl font-bold">{trucks.filter(t => t.status === 'maintenance').length}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Assigned</p>
                          <p className="text-2xl font-bold">{trucks.filter(t => t.currentDriver).length}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Truck ID</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Mileage</TableHead>
                        <TableHead>Next Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trucks.map((truck) => (
                        <TableRow key={truck.id}>
                          <TableCell className="font-medium">{truck.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{truck.make} {truck.model}</p>
                              <p className="text-sm text-muted-foreground">{truck.year} • {truck.licensePlate}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(truck.status)}</TableCell>
                          <TableCell>{truck.currentDriver || 'Unassigned'}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {truck.location}
                          </TableCell>
                          <TableCell>{truck.mileage.toLocaleString()} mi</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {truck.nextMaintenance}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditTruck(truck)}>
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
                                    <AlertDialogTitle>Delete Truck</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove {truck.make} {truck.model} ({truck.id}) from your fleet?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteTruck(truck.id)}>
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
                </div>
              </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Truck: {selectedTruck?.id}</DialogTitle>
                  <DialogDescription>Update truck information and settings</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Input 
                      value={editForm.make || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, make: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input 
                      value={editForm.model || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, model: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="out_of_service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={editForm.location || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Driver</Label>
                    <Input 
                      value={editForm.currentDriver || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, currentDriver: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mileage</Label>
                    <Input 
                      type="number"
                      value={editForm.mileage || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveTruck}>
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
                  <Settings className="h-5 w-5" />
                  Fleet Automation Settings
                </CardTitle>
                <CardDescription>Configure automated features for your trucking operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Auto Dispatch</Label>
                      <p className="text-sm text-muted-foreground">Automatically assign loads to available drivers</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.autoDispatch} 
                      onCheckedChange={(checked) => handleSettingChange('autoDispatch', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send notifications for scheduled maintenance</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.maintenanceAlerts} 
                      onCheckedChange={(checked) => handleSettingChange('maintenanceAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Fuel Tracking</Label>
                      <p className="text-sm text-muted-foreground">Monitor fuel consumption and costs</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.fuelTracking} 
                      onCheckedChange={(checked) => handleSettingChange('fuelTracking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">GPS Tracking</Label>
                      <p className="text-sm text-muted-foreground">Real-time vehicle location monitoring</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.gpsTracking} 
                      onCheckedChange={(checked) => handleSettingChange('gpsTracking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Document Scanning</Label>
                      <p className="text-sm text-muted-foreground">Automatic BOL and receipt processing</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.documentScanning} 
                      onCheckedChange={(checked) => handleSettingChange('documentScanning', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Driver Scoring</Label>
                      <p className="text-sm text-muted-foreground">Track driver performance metrics</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.driverScoring} 
                      onCheckedChange={(checked) => handleSettingChange('driverScoring', checked)}
                    />
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save All Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  DOT Compliance & Safety
                </CardTitle>
                <CardDescription>Ensure your fleet meets all regulatory requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">DOT Inspections</p>
                        <p className="text-lg font-bold">98% Pass Rate</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Safety Score</p>
                        <p className="text-lg font-bold">4.8/5.0</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Violations</p>
                        <p className="text-lg font-bold">2 Open</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Annual DOT Inspection</h4>
                      <p className="text-sm text-muted-foreground">Next inspection due: March 15, 2024</p>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-600">Due Soon</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Driver Qualification Files</h4>
                      <p className="text-sm text-muted-foreground">All files up to date</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Hours of Service Compliance</h4>
                      <p className="text-sm text-muted-foreground">ELD data synced and compliant</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600">Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fuel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Fuel Management
                </CardTitle>
                <CardDescription>Monitor fuel consumption, costs, and efficiency across your fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Fuel className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Fuel Cost</p>
                        <p className="text-lg font-bold">$12,450</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg MPG</p>
                        <p className="text-lg font-bold">6.2</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Fuel className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gallons Used</p>
                        <p className="text-lg font-bold">3,240</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost per Mile</p>
                        <p className="text-lg font-bold">$0.62</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Truck ID</TableHead>
                      <TableHead>Current MPG</TableHead>
                      <TableHead>Monthly Gallons</TableHead>
                      <TableHead>Fuel Cost</TableHead>
                      <TableHead>Efficiency Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TRK-001</TableCell>
                      <TableCell>6.8 MPG</TableCell>
                      <TableCell>1,200 gal</TableCell>
                      <TableCell>$4,560</TableCell>
                      <TableCell><Badge className="bg-emerald-500/10 text-emerald-600">Excellent</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRK-002</TableCell>
                      <TableCell>5.9 MPG</TableCell>
                      <TableCell>980 gal</TableCell>
                      <TableCell>$3,724</TableCell>
                      <TableCell><Badge className="bg-blue-500/10 text-blue-600">Good</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRK-003</TableCell>
                      <TableCell>6.0 MPG</TableCell>
                      <TableCell>1,060 gal</TableCell>
                      <TableCell>$4,028</TableCell>
                      <TableCell><Badge className="bg-blue-500/10 text-blue-600">Good</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CarrierLayout>
  );
};

export default TruckingSettingsPage;