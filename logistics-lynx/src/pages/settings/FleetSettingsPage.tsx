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
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Truck, Settings, Shield, Fuel, Calendar, MapPin, Users, Edit, Trash2, Plus, Save, AlertTriangle, CheckCircle, Clock, TrendingUp, DollarSign, Wrench, BarChart3, Navigation, FileText, Zap, AlertCircle, Activity, Target, Globe } from 'lucide-react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { toast } from 'sonner';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: 'active' | 'maintenance' | 'out_of_service' | 'retired';
  vehicleType: 'truck' | 'trailer' | 'van' | 'refrigerated';
  fuelType: string;
  maxWeight: number;
  capacity: number;
  currentDriver?: string;
  assignedRoute?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  mileage: number;
  fuelEfficiency: number;
  insuranceExpiry: string;
  registrationExpiry: string;
  inspectionExpiry: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  maintenanceCost: number;
  fuelCost: number;
  gpsEnabled: boolean;
  eldCompliant: boolean;
  telematics: boolean;
}

interface MaintenanceSchedule {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  scheduledDate: string;
  estimatedCost: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  provider: string;
  notes: string;
  completed: boolean;
  completedDate?: string;
  actualCost?: number;
}

interface FleetMetrics {
  totalVehicles: number;
  activeVehicles: number;
  utilizationRate: number;
  avgFuelEfficiency: number;
  totalMaintenanceCost: number;
  avgVehicleAge: number;
  complianceRate: number;
  safetyScore: number;
}

const FleetSettingsPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'VEH-001',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      vin: '1FUJGHDV8NLAA1234',
      licensePlate: 'TRK-001-TX',
      status: 'active',
      vehicleType: 'truck',
      fuelType: 'Diesel',
      maxWeight: 80000,
      capacity: 53,
      currentDriver: 'John Smith',
      assignedRoute: 'TX-CA-001',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      location: 'Dallas, TX',
      mileage: 125000,
      fuelEfficiency: 6.8,
      insuranceExpiry: '2024-12-31',
      registrationExpiry: '2024-08-15',
      inspectionExpiry: '2024-06-30',
      purchaseDate: '2022-03-15',
      purchasePrice: 180000,
      currentValue: 145000,
      maintenanceCost: 12500,
      fuelCost: 45000,
      gpsEnabled: true,
      eldCompliant: true,
      telematics: true
    },
    {
      id: 'VEH-002',
      make: 'Volvo',
      model: 'VNL',
      year: 2021,
      vin: '4V4NC9GH5MN567890',
      licensePlate: 'TRK-002-TX',
      status: 'maintenance',
      vehicleType: 'truck',
      fuelType: 'Diesel',
      maxWeight: 80000,
      capacity: 53,
      currentDriver: undefined,
      assignedRoute: undefined,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: 'Houston, TX',
      mileage: 98000,
      fuelEfficiency: 7.2,
      insuranceExpiry: '2024-12-31',
      registrationExpiry: '2024-09-20',
      inspectionExpiry: '2024-07-15',
      purchaseDate: '2021-05-20',
      purchasePrice: 175000,
      currentValue: 135000,
      maintenanceCost: 8500,
      fuelCost: 38000,
      gpsEnabled: true,
      eldCompliant: true,
      telematics: false
    }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState<MaintenanceSchedule[]>([
    {
      id: 'MAINT-001',
      vehicleId: 'VEH-001',
      type: 'Preventive',
      description: 'Oil change and filter replacement',
      scheduledDate: '2024-04-15',
      estimatedCost: 250,
      priority: 'medium',
      provider: 'Fleet Service Center',
      notes: 'Regular maintenance',
      completed: false
    },
    {
      id: 'MAINT-002',
      vehicleId: 'VEH-002',
      type: 'Repair',
      description: 'Brake system inspection and repair',
      scheduledDate: '2024-02-10',
      estimatedCost: 1200,
      priority: 'high',
      provider: 'Brake Specialists Inc',
      notes: 'Safety critical repair',
      completed: false
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceSchedule | null>(null);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false);
  const [vehicleForm, setVehicleForm] = useState<Partial<Vehicle>>({});
  const [maintenanceForm, setMaintenanceForm] = useState<Partial<MaintenanceSchedule>>({});

  const [fleetSettings, setFleetSettings] = useState({
    autoDispatch: true,
    maintenanceAlerts: true,
    fuelTracking: true,
    gpsTracking: true,
    eldMonitoring: true,
    telematics: true,
    predictiveMaintenance: false,
    routeOptimization: true,
    driverScoring: true,
    realTimeTracking: true,
    geofencing: false,
    idleTimeTracking: true,
    speedMonitoring: true,
    harshDrivingAlerts: true,
    documentScanning: false,
    complianceChecks: true
  });

  const fleetMetrics: FleetMetrics = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active').length,
    utilizationRate: 85,
    avgFuelEfficiency: vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length,
    totalMaintenanceCost: vehicles.reduce((sum, v) => sum + v.maintenanceCost, 0),
    avgVehicleAge: vehicles.reduce((sum, v) => sum + (2024 - v.year), 0) / vehicles.length,
    complianceRate: 98,
    safetyScore: 92
  };

  const handleVehicleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleForm(vehicle);
    setIsVehicleDialogOpen(true);
  };

  const handleMaintenanceEdit = (maintenance: MaintenanceSchedule) => {
    setSelectedMaintenance(maintenance);
    setMaintenanceForm(maintenance);
    setIsMaintenanceDialogOpen(true);
  };

  const handleVehicleSave = () => {
    if (selectedVehicle && vehicleForm.id) {
      setVehicles(vehicles.map(v => v.id === vehicleForm.id ? { ...v, ...vehicleForm } as Vehicle : v));
      toast.success('Vehicle updated successfully');
    } else if (vehicleForm.make && vehicleForm.model) {
      const newVehicle: Vehicle = {
        id: `VEH-${String(vehicles.length + 1).padStart(3, '0')}`,
        make: vehicleForm.make,
        model: vehicleForm.model || '',
        year: vehicleForm.year || new Date().getFullYear(),
        vin: vehicleForm.vin || '',
        licensePlate: vehicleForm.licensePlate || '',
        status: vehicleForm.status || 'active',
        vehicleType: vehicleForm.vehicleType || 'truck',
        fuelType: vehicleForm.fuelType || 'Diesel',
        maxWeight: vehicleForm.maxWeight || 80000,
        capacity: vehicleForm.capacity || 53,
        currentDriver: vehicleForm.currentDriver,
        assignedRoute: vehicleForm.assignedRoute,
        lastMaintenance: vehicleForm.lastMaintenance || new Date().toISOString().split('T')[0],
        nextMaintenance: vehicleForm.nextMaintenance || new Date().toISOString().split('T')[0],
        location: vehicleForm.location || '',
        mileage: vehicleForm.mileage || 0,
        fuelEfficiency: vehicleForm.fuelEfficiency || 7.0,
        insuranceExpiry: vehicleForm.insuranceExpiry || '',
        registrationExpiry: vehicleForm.registrationExpiry || '',
        inspectionExpiry: vehicleForm.inspectionExpiry || '',
        purchaseDate: vehicleForm.purchaseDate || '',
        purchasePrice: vehicleForm.purchasePrice || 0,
        currentValue: vehicleForm.currentValue || 0,
        maintenanceCost: vehicleForm.maintenanceCost || 0,
        fuelCost: vehicleForm.fuelCost || 0,
        gpsEnabled: vehicleForm.gpsEnabled || false,
        eldCompliant: vehicleForm.eldCompliant || false,
        telematics: vehicleForm.telematics || false
      };
      setVehicles([...vehicles, newVehicle]);
      toast.success('New vehicle added successfully');
    }
    setIsVehicleDialogOpen(false);
    setIsAddVehicleOpen(false);
    setVehicleForm({});
    setSelectedVehicle(null);
  };

  const handleMaintenanceSave = () => {
    if (selectedMaintenance && maintenanceForm.id) {
      setMaintenanceSchedule(maintenanceSchedule.map(m => m.id === maintenanceForm.id ? { ...m, ...maintenanceForm } as MaintenanceSchedule : m));
      toast.success('Maintenance record updated successfully');
    } else if (maintenanceForm.vehicleId && maintenanceForm.type) {
      const newMaintenance: MaintenanceSchedule = {
        id: `MAINT-${String(maintenanceSchedule.length + 1).padStart(3, '0')}`,
        vehicleId: maintenanceForm.vehicleId,
        type: maintenanceForm.type,
        description: maintenanceForm.description || '',
        scheduledDate: maintenanceForm.scheduledDate || '',
        estimatedCost: maintenanceForm.estimatedCost || 0,
        priority: maintenanceForm.priority || 'medium',
        provider: maintenanceForm.provider || '',
        notes: maintenanceForm.notes || '',
        completed: false
      };
      setMaintenanceSchedule([...maintenanceSchedule, newMaintenance]);
      toast.success('New maintenance scheduled successfully');
    }
    setIsMaintenanceDialogOpen(false);
    setIsAddMaintenanceOpen(false);
    setMaintenanceForm({});
    setSelectedMaintenance(null);
  };

  const handleVehicleDelete = (vehicleId: string) => {
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
    toast.success('Vehicle removed successfully');
  };

  const handleMaintenanceDelete = (maintenanceId: string) => {
    setMaintenanceSchedule(maintenanceSchedule.filter(m => m.id !== maintenanceId));
    toast.success('Maintenance record deleted successfully');
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
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"><Wrench className="w-3 h-3 mr-1" />Maintenance</Badge>;
      case 'out_of_service':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Out of Service</Badge>;
      case 'retired':
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20"><Clock className="w-3 h-3 mr-1" />Retired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><AlertCircle className="w-3 h-3 mr-1" />Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"><AlertTriangle className="w-3 h-3 mr-1" />High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"><Clock className="w-3 h-3 mr-1" />Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20"><CheckCircle className="w-3 h-3 mr-1" />Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <CarrierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
            <p className="text-muted-foreground">Comprehensive fleet operations, maintenance, and analytics</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddMaintenanceOpen} onOpenChange={setIsAddMaintenanceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule Maintenance</DialogTitle>
                  <DialogDescription>Add new maintenance task for fleet vehicles</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle</Label>
                    <Select value={maintenanceForm.vehicleId} onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, vehicleId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.id} - {vehicle.make} {vehicle.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={maintenanceForm.type} onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Preventive">Preventive</SelectItem>
                        <SelectItem value="Repair">Repair</SelectItem>
                        <SelectItem value="Inspection">Inspection</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Description</Label>
                    <Input 
                      value={maintenanceForm.description || ''} 
                      onChange={(e) => setMaintenanceForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Maintenance description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Scheduled Date</Label>
                    <Input 
                      type="date"
                      value={maintenanceForm.scheduledDate || ''} 
                      onChange={(e) => setMaintenanceForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Cost</Label>
                    <Input 
                      type="number"
                      value={maintenanceForm.estimatedCost || ''} 
                      onChange={(e) => setMaintenanceForm(prev => ({ ...prev, estimatedCost: parseFloat(e.target.value) }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={maintenanceForm.priority} onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, priority: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Service Provider</Label>
                    <Input 
                      value={maintenanceForm.provider || ''} 
                      onChange={(e) => setMaintenanceForm(prev => ({ ...prev, provider: e.target.value }))}
                      placeholder="Service provider name"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Notes</Label>
                    <Textarea 
                      value={maintenanceForm.notes || ''} 
                      onChange={(e) => setMaintenanceForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddMaintenanceOpen(false)}>Cancel</Button>
                  <Button onClick={handleMaintenanceSave}>Schedule Maintenance</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                  <DialogDescription>Enter comprehensive vehicle details</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Input 
                      value={vehicleForm.make || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, make: e.target.value }))}
                      placeholder="Freightliner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input 
                      value={vehicleForm.model || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="Cascadia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input 
                      type="number"
                      value={vehicleForm.year || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      placeholder="2023"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>VIN</Label>
                    <Input 
                      value={vehicleForm.vin || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, vin: e.target.value }))}
                      placeholder="1FUJGHDV8NLAA1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>License Plate</Label>
                    <Input 
                      value={vehicleForm.licensePlate || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, licensePlate: e.target.value }))}
                      placeholder="TRK-001-TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select value={vehicleForm.vehicleType} onValueChange={(value) => setVehicleForm(prev => ({ ...prev, vehicleType: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="trailer">Trailer</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={vehicleForm.status} onValueChange={(value) => setVehicleForm(prev => ({ ...prev, status: value as unknown }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="out_of_service">Out of Service</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Weight (lbs)</Label>
                    <Input 
                      type="number"
                      value={vehicleForm.maxWeight || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, maxWeight: parseInt(e.target.value) }))}
                      placeholder="80000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity (ft³)</Label>
                    <Input 
                      type="number"
                      value={vehicleForm.capacity || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      placeholder="53"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Input 
                      type="date"
                      value={vehicleForm.purchaseDate || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Price</Label>
                    <Input 
                      type="number"
                      value={vehicleForm.purchasePrice || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) }))}
                      placeholder="180000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Value</Label>
                    <Input 
                      type="number"
                      value={vehicleForm.currentValue || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, currentValue: parseFloat(e.target.value) }))}
                      placeholder="145000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Insurance Expiry</Label>
                    <Input 
                      type="date"
                      value={vehicleForm.insuranceExpiry || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, insuranceExpiry: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Expiry</Label>
                    <Input 
                      type="date"
                      value={vehicleForm.registrationExpiry || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, registrationExpiry: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Inspection Expiry</Label>
                    <Input 
                      type="date"
                      value={vehicleForm.inspectionExpiry || ''} 
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, inspectionExpiry: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={vehicleForm.gpsEnabled || false} 
                        onCheckedChange={(checked) => setVehicleForm(prev => ({ ...prev, gpsEnabled: checked }))}
                      />
                      <Label>GPS Enabled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={vehicleForm.eldCompliant || false} 
                        onCheckedChange={(checked) => setVehicleForm(prev => ({ ...prev, eldCompliant: checked }))}
                      />
                      <Label>ELD Compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={vehicleForm.telematics || false} 
                        onCheckedChange={(checked) => setVehicleForm(prev => ({ ...prev, telematics: checked }))}
                      />
                      <Label>Telematics</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddVehicleOpen(false)}>Cancel</Button>
                  <Button onClick={handleVehicleSave}>Add Vehicle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Fleet Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold">{fleetMetrics.totalVehicles}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Activity className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utilization Rate</p>
                <p className="text-2xl font-bold">{fleetMetrics.utilizationRate}%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Fuel className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg MPG</p>
                <p className="text-2xl font-bold">{fleetMetrics.avgFuelEfficiency.toFixed(1)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Target className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-2xl font-bold">{fleetMetrics.safetyScore}%</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="vehicles" className="gap-2">
              <Truck className="h-4 w-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="gap-2">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Fleet</CardTitle>
                <CardDescription>Manage your vehicle inventory and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle ID</TableHead>
                      <TableHead>Vehicle Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead>Next Maintenance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                            <p className="text-sm text-muted-foreground">{vehicle.year} • {vehicle.licensePlate}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                        <TableCell>{vehicle.currentDriver || 'Unassigned'}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {vehicle.location}
                        </TableCell>
                        <TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {vehicle.nextMaintenance}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleVehicleEdit(vehicle)}>
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
                                  <AlertDialogTitle>Remove Vehicle</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {vehicle.make} {vehicle.model} ({vehicle.id}) from your fleet?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleVehicleDelete(vehicle.id)}>
                                    Remove
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
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Track and manage vehicle maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Maintenance ID</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Estimated Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceSchedule.map((maintenance) => {
                      const vehicle = vehicles.find(v => v.id === maintenance.vehicleId);
                      return (
                        <TableRow key={maintenance.id}>
                          <TableCell className="font-medium">{maintenance.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vehicle?.id}</p>
                              <p className="text-sm text-muted-foreground">{vehicle?.make} {vehicle?.model}</p>
                            </div>
                          </TableCell>
                          <TableCell>{maintenance.type}</TableCell>
                          <TableCell>{maintenance.description}</TableCell>
                          <TableCell>{maintenance.scheduledDate}</TableCell>
                          <TableCell>{getPriorityBadge(maintenance.priority)}</TableCell>
                          <TableCell>${maintenance.estimatedCost.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleMaintenanceEdit(maintenance)}>
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
                                    <AlertDialogTitle>Delete Maintenance</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this maintenance record?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleMaintenanceDelete(maintenance.id)}>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for your fleet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Utilization Rate</span>
                      <span className="text-sm font-medium">{fleetMetrics.utilizationRate}%</span>
                    </div>
                    <Progress value={fleetMetrics.utilizationRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance Rate</span>
                      <span className="text-sm font-medium">{fleetMetrics.complianceRate}%</span>
                    </div>
                    <Progress value={fleetMetrics.complianceRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Safety Score</span>
                      <span className="text-sm font-medium">{fleetMetrics.safetyScore}%</span>
                    </div>
                    <Progress value={fleetMetrics.safetyScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Fleet operational costs breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4" />
                      <span>Total Fuel Costs</span>
                    </div>
                    <span className="font-medium">${vehicles.reduce((sum, v) => sum + v.fuelCost, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      <span>Total Maintenance</span>
                    </div>
                    <span className="font-medium">${fleetMetrics.totalMaintenanceCost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Fleet Value</span>
                    </div>
                    <span className="font-medium">${vehicles.reduce((sum, v) => sum + v.currentValue, 0).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Automation</CardTitle>
                  <CardDescription>Configure automated fleet management features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Auto Dispatch</Label>
                      <p className="text-sm text-muted-foreground">Automatically assign loads to available vehicles</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.autoDispatch} 
                      onCheckedChange={(checked) => handleSettingChange('autoDispatch', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Route Optimization</Label>
                      <p className="text-sm text-muted-foreground">AI-powered route planning and optimization</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.routeOptimization} 
                      onCheckedChange={(checked) => handleSettingChange('routeOptimization', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Predictive Maintenance</Label>
                      <p className="text-sm text-muted-foreground">AI-driven maintenance scheduling</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.predictiveMaintenance} 
                      onCheckedChange={(checked) => handleSettingChange('predictiveMaintenance', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoring & Tracking</CardTitle>
                  <CardDescription>Vehicle monitoring and tracking settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">GPS Tracking</Label>
                      <p className="text-sm text-muted-foreground">Real-time vehicle location tracking</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.gpsTracking} 
                      onCheckedChange={(checked) => handleSettingChange('gpsTracking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">ELD Monitoring</Label>
                      <p className="text-sm text-muted-foreground">Electronic Logging Device compliance monitoring</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.eldMonitoring} 
                      onCheckedChange={(checked) => handleSettingChange('eldMonitoring', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Telematics</Label>
                      <p className="text-sm text-muted-foreground">Advanced vehicle telematics and diagnostics</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.telematics} 
                      onCheckedChange={(checked) => handleSettingChange('telematics', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Geofencing</Label>
                      <p className="text-sm text-muted-foreground">Set geographic boundaries and alerts</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.geofencing} 
                      onCheckedChange={(checked) => handleSettingChange('geofencing', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Driver Management</CardTitle>
                  <CardDescription>Driver monitoring and performance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Driver Scoring</Label>
                      <p className="text-sm text-muted-foreground">Track and score driver performance</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.driverScoring} 
                      onCheckedChange={(checked) => handleSettingChange('driverScoring', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Speed Monitoring</Label>
                      <p className="text-sm text-muted-foreground">Monitor vehicle speed compliance</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.speedMonitoring} 
                      onCheckedChange={(checked) => handleSettingChange('speedMonitoring', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Harsh Driving Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alerts for harsh braking, acceleration, and cornering</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.harshDrivingAlerts} 
                      onCheckedChange={(checked) => handleSettingChange('harshDrivingAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Idle Time Tracking</Label>
                      <p className="text-sm text-muted-foreground">Monitor and optimize vehicle idle time</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.idleTimeTracking} 
                      onCheckedChange={(checked) => handleSettingChange('idleTimeTracking', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Features</CardTitle>
                  <CardDescription>Extra fleet management capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Fuel Tracking</Label>
                      <p className="text-sm text-muted-foreground">Monitor fuel consumption and efficiency</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.fuelTracking} 
                      onCheckedChange={(checked) => handleSettingChange('fuelTracking', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Automated maintenance scheduling and alerts</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.maintenanceAlerts} 
                      onCheckedChange={(checked) => handleSettingChange('maintenanceAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Document Scanning</Label>
                      <p className="text-sm text-muted-foreground">Automatic document processing and filing</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.documentScanning} 
                      onCheckedChange={(checked) => handleSettingChange('documentScanning', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Compliance Checks</Label>
                      <p className="text-sm text-muted-foreground">Automated compliance monitoring and reporting</p>
                    </div>
                    <Switch 
                      checked={fleetSettings.complianceChecks} 
                      onCheckedChange={(checked) => handleSettingChange('complianceChecks', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Overview</CardTitle>
                  <CardDescription>Fleet compliance status and requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>DOT Inspections</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600">98% Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Insurance Coverage</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600">100% Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ELD Compliance</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600">95% Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Driver Qualifications</span>
                    <Badge className="bg-amber-500/10 text-amber-600">2 Expiring Soon</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals</CardTitle>
                  <CardDescription>Documents and certifications requiring renewal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vehicle.id} Insurance</p>
                        <p className="text-sm text-muted-foreground">{vehicle.insuranceExpiry}</p>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Due Soon
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Vehicle Dialog */}
        <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Vehicle</DialogTitle>
              <DialogDescription>Update vehicle information and settings</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Make</Label>
                <Input 
                  value={vehicleForm.make || ''} 
                  onChange={(e) => setVehicleForm(prev => ({ ...prev, make: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input 
                  value={vehicleForm.model || ''} 
                  onChange={(e) => setVehicleForm(prev => ({ ...prev, model: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input 
                  type="number"
                  value={vehicleForm.year || ''} 
                  onChange={(e) => setVehicleForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={vehicleForm.status} onValueChange={(value) => setVehicleForm(prev => ({ ...prev, status: value as unknown }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="out_of_service">Out of Service</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current Driver</Label>
                <Input 
                  value={vehicleForm.currentDriver || ''} 
                  onChange={(e) => setVehicleForm(prev => ({ ...prev, currentDriver: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={vehicleForm.location || ''} 
                  onChange={(e) => setVehicleForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVehicleDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleVehicleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Maintenance Dialog */}
        <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Maintenance</DialogTitle>
              <DialogDescription>Update maintenance record details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={maintenanceForm.type} onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preventive">Preventive</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={maintenanceForm.priority} onValueChange={(value) => setMaintenanceForm(prev => ({ ...prev, priority: value as unknown }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Input 
                  value={maintenanceForm.description || ''} 
                  onChange={(e) => setMaintenanceForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Scheduled Date</Label>
                <Input 
                  type="date"
                  value={maintenanceForm.scheduledDate || ''} 
                  onChange={(e) => setMaintenanceForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated Cost</Label>
                <Input 
                  type="number"
                  value={maintenanceForm.estimatedCost || ''} 
                  onChange={(e) => setMaintenanceForm(prev => ({ ...prev, estimatedCost: parseFloat(e.target.value) }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleMaintenanceSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CarrierLayout>
  );
};

export default FleetSettingsPage;