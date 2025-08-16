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
import { Package, Truck, Shield, DollarSign, Weight, Edit, Trash2, Plus, Save, AlertTriangle, CheckCircle, Clock, Scale, Thermometer, Calendar } from 'lucide-react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { toast } from 'sonner';

interface FreightClass {
  id: string;
  class: string;
  description: string;
  density: string;
  examples: string;
  baseRate: number;
  multiplier: number;
}

interface FreightRate {
  id: string;
  origin: string;
  destination: string;
  freightClass: string;
  baseRate: number;
  fuelSurcharge: number;
  accessorial: number;
  totalRate: number;
  effectiveDate: string;
  expiryDate: string;
  carrier: string;
}

const FreightSettingsPage = () => {
  const [freightClasses] = useState<FreightClass[]>([
    { id: '1', class: '50', description: 'Clean freight', density: '50+ lbs/ft³', examples: 'Nuts, bolts, cement blocks', baseRate: 1.2, multiplier: 1.0 },
    { id: '2', class: '55', description: 'Clean freight', density: '35-50 lbs/ft³', examples: 'Bricks, mortar', baseRate: 1.25, multiplier: 1.1 },
    { id: '3', class: '60', description: 'Clean freight', density: '30-35 lbs/ft³', examples: 'Steel, machinery', baseRate: 1.3, multiplier: 1.2 },
    { id: '4', class: '65', description: 'Clean freight', density: '22.5-30 lbs/ft³', examples: 'Car accessories, books', baseRate: 1.4, multiplier: 1.3 },
    { id: '5', class: '70', description: 'Clean freight', density: '15-22.5 lbs/ft³', examples: 'Food, automobiles', baseRate: 1.5, multiplier: 1.4 },
    { id: '6', class: '77.5', description: 'Clean freight', density: '13.5-15 lbs/ft³', examples: 'Tires, batteries', baseRate: 1.75, multiplier: 1.5 },
    { id: '7', class: '85', description: 'Clean freight', density: '12-13.5 lbs/ft³', examples: 'Crated machinery', baseRate: 2.0, multiplier: 1.6 },
    { id: '8', class: '92.5', description: 'Clean freight', density: '10.5-12 lbs/ft³', examples: 'Computers, monitors', baseRate: 2.25, multiplier: 1.7 },
    { id: '9', class: '100', description: 'Clean freight', density: '9-10.5 lbs/ft³', examples: 'Boat covers, wine cases', baseRate: 2.5, multiplier: 1.8 },
    { id: '10', class: '110', description: 'Clean freight', density: '8-9 lbs/ft³', examples: 'Cabinets, framed art', baseRate: 2.75, multiplier: 1.9 },
    { id: '11', class: '125', description: 'Clean freight', density: '7-8 lbs/ft³', examples: 'Small appliances', baseRate: 3.0, multiplier: 2.0 },
    { id: '12', class: '150', description: 'Clean freight', density: '6-7 lbs/ft³', examples: 'Auto sheet metal', baseRate: 3.5, multiplier: 2.2 },
    { id: '13', class: '175', description: 'Clean freight', density: '5-6 lbs/ft³', examples: 'Clothing, furniture', baseRate: 4.0, multiplier: 2.4 },
    { id: '14', class: '200', description: 'Clean freight', density: '4-5 lbs/ft³', examples: 'Auto parts, mattresses', baseRate: 4.5, multiplier: 2.6 },
    { id: '15', class: '250', description: 'Clean freight', density: '3-4 lbs/ft³', examples: 'Bamboo furniture', baseRate: 5.5, multiplier: 3.0 },
    { id: '16', class: '300', description: 'Clean freight', density: '2-3 lbs/ft³', examples: 'Assembly kits', baseRate: 6.5, multiplier: 3.5 },
    { id: '17', class: '400', description: 'Clean freight', density: '1-2 lbs/ft³', examples: 'Deer antlers', baseRate: 8.0, multiplier: 4.0 },
    { id: '18', class: '500', description: 'Clean freight', density: '<1 lb/ft³', examples: 'Bags, ping pong balls', baseRate: 10.0, multiplier: 5.0 }
  ]);

  const [freightRates, setFreightRates] = useState<FreightRate[]>([
    {
      id: 'FR-001',
      origin: 'Dallas, TX',
      destination: 'Los Angeles, CA',
      freightClass: '85',
      baseRate: 2.50,
      fuelSurcharge: 0.35,
      accessorial: 0.15,
      totalRate: 3.00,
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      carrier: 'Primary Logistics'
    },
    {
      id: 'FR-002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      freightClass: '100',
      baseRate: 2.75,
      fuelSurcharge: 0.40,
      accessorial: 0.20,
      totalRate: 3.35,
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      carrier: 'Express Freight'
    },
    {
      id: 'FR-003',
      origin: 'New York, NY',
      destination: 'Atlanta, GA',
      freightClass: '125',
      baseRate: 3.25,
      fuelSurcharge: 0.45,
      accessorial: 0.25,
      totalRate: 3.95,
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      carrier: 'Coast to Coast'
    }
  ]);

  const [selectedRate, setSelectedRate] = useState<FreightRate | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<FreightRate>>({});

  const [freightSettings, setFreightSettings] = useState({
    autoClassification: true,
    dimensionalPricing: true,
    hazmatHandling: false,
    temperatureControl: true,
    liftgateService: true,
    appointmentDelivery: false,
    insideDelivery: true,
    whiteGloveService: false
  });

  const handleEditRate = (rate: FreightRate) => {
    setSelectedRate(rate);
    setEditForm(rate);
    setIsEditDialogOpen(true);
  };

  const handleDeleteRate = (rateId: string) => {
    setFreightRates(freightRates.filter(r => r.id !== rateId));
    toast.success('Freight rate deleted successfully');
  };

  const handleSaveRate = () => {
    if (selectedRate && editForm.id) {
      setFreightRates(freightRates.map(r => r.id === editForm.id ? { ...r, ...editForm } as FreightRate : r));
      toast.success('Freight rate updated successfully');
    } else if (editForm.origin && editForm.destination) {
      const newRate: FreightRate = {
        id: `FR-${String(freightRates.length + 1).padStart(3, '0')}`,
        origin: editForm.origin || '',
        destination: editForm.destination || '',
        freightClass: editForm.freightClass || '85',
        baseRate: editForm.baseRate || 2.50,
        fuelSurcharge: editForm.fuelSurcharge || 0.35,
        accessorial: editForm.accessorial || 0.15,
        totalRate: (editForm.baseRate || 2.50) + (editForm.fuelSurcharge || 0.35) + (editForm.accessorial || 0.15),
        effectiveDate: editForm.effectiveDate || new Date().toISOString().split('T')[0],
        expiryDate: editForm.expiryDate || '2024-12-31',
        carrier: editForm.carrier || 'New Carrier'
      };
      setFreightRates([...freightRates, newRate]);
      toast.success('New freight rate added successfully');
    }
    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
    setEditForm({});
    setSelectedRate(null);
  };

  const handleSettingChange = (key: keyof typeof freightSettings, value: boolean) => {
    setFreightSettings(prev => ({ ...prev, [key]: value }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <CarrierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Freight Settings</h1>
            <p className="text-muted-foreground">Manage freight classifications, rates, and pricing models</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Freight Rate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Freight Rate</DialogTitle>
                  <DialogDescription>Configure pricing for a new route and freight class</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Origin</Label>
                    <Input 
                      value={editForm.origin || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, origin: e.target.value }))}
                      placeholder="Dallas, TX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input 
                      value={editForm.destination || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, destination: e.target.value }))}
                      placeholder="Los Angeles, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Freight Class</Label>
                    <Select value={editForm.freightClass} onValueChange={(value) => setEditForm(prev => ({ ...prev, freightClass: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {freightClasses.map((fc) => (
                          <SelectItem key={fc.id} value={fc.class}>{fc.class} - {fc.description}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Carrier</Label>
                    <Input 
                      value={editForm.carrier || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, carrier: e.target.value }))}
                      placeholder="Primary Logistics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Base Rate ($/cwt)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editForm.baseRate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, baseRate: parseFloat(e.target.value) }))}
                      placeholder="2.50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fuel Surcharge ($/cwt)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editForm.fuelSurcharge || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, fuelSurcharge: parseFloat(e.target.value) }))}
                      placeholder="0.35"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Effective Date</Label>
                    <Input 
                      type="date"
                      value={editForm.effectiveDate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input 
                      type="date"
                      value={editForm.expiryDate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveRate}>Add Rate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classes" className="gap-2">
              <Scale className="h-4 w-4" />
              Freight Classes
            </TabsTrigger>
            <TabsTrigger value="rates" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Rate Management
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Package className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="special" className="gap-2">
              <Shield className="h-4 w-4" />
              Special Handling
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  NMFC Freight Classifications
                </CardTitle>
                <CardDescription>National Motor Freight Classification standards and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Density</TableHead>
                      <TableHead>Examples</TableHead>
                      <TableHead>Base Rate</TableHead>
                      <TableHead>Multiplier</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {freightClasses.map((fc) => (
                      <TableRow key={fc.id}>
                        <TableCell className="font-medium">{fc.class}</TableCell>
                        <TableCell>{fc.description}</TableCell>
                        <TableCell>{fc.density}</TableCell>
                        <TableCell className="max-w-xs truncate" title={fc.examples}>{fc.examples}</TableCell>
                        <TableCell>${fc.baseRate.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{fc.multiplier}x</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Freight Rate Management
                </CardTitle>
                <CardDescription>Configure pricing for different routes and freight classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Rate/CWT</p>
                          <p className="text-2xl font-bold">$3.43</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <Truck className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Routes</p>
                          <p className="text-2xl font-bold">{freightRates.length}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Weight className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fuel Surcharge</p>
                          <p className="text-2xl font-bold">15.8%</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rate Updates</p>
                          <p className="text-2xl font-bold">Weekly</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rate ID</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Base Rate</TableHead>
                        <TableHead>Fuel Surcharge</TableHead>
                        <TableHead>Total Rate</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Valid Until</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {freightRates.map((rate) => (
                        <TableRow key={rate.id}>
                          <TableCell className="font-medium">{rate.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{rate.origin}</p>
                              <p className="text-sm text-muted-foreground">→ {rate.destination}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{rate.freightClass}</Badge>
                          </TableCell>
                          <TableCell>${rate.baseRate.toFixed(2)}</TableCell>
                          <TableCell>${rate.fuelSurcharge.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">${rate.totalRate.toFixed(2)}</TableCell>
                          <TableCell>{rate.carrier}</TableCell>
                          <TableCell>{rate.expiryDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditRate(rate)}>
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
                                    <AlertDialogTitle>Delete Freight Rate</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete the rate for {rate.origin} → {rate.destination}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteRate(rate.id)}>
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
                  <DialogTitle>Edit Freight Rate: {selectedRate?.id}</DialogTitle>
                  <DialogDescription>Update rate information and pricing</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Origin</Label>
                    <Input 
                      value={editForm.origin || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, origin: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input 
                      value={editForm.destination || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, destination: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Base Rate ($/cwt)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editForm.baseRate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, baseRate: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fuel Surcharge ($/cwt)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editForm.fuelSurcharge || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, fuelSurcharge: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Carrier</Label>
                    <Input 
                      value={editForm.carrier || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, carrier: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input 
                      type="date"
                      value={editForm.expiryDate || ''} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveRate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Freight Services & Features
                </CardTitle>
                <CardDescription>Configure available services and automated features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Auto Classification</Label>
                      <p className="text-sm text-muted-foreground">Automatically determine freight class based on density</p>
                    </div>
                    <Switch 
                      checked={freightSettings.autoClassification} 
                      onCheckedChange={(checked) => handleSettingChange('autoClassification', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Dimensional Pricing</Label>
                      <p className="text-sm text-muted-foreground">Use dimensional weight pricing for large, light items</p>
                    </div>
                    <Switch 
                      checked={freightSettings.dimensionalPricing} 
                      onCheckedChange={(checked) => handleSettingChange('dimensionalPricing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Liftgate Service</Label>
                      <p className="text-sm text-muted-foreground">Offer liftgate pickup and delivery options</p>
                    </div>
                    <Switch 
                      checked={freightSettings.liftgateService} 
                      onCheckedChange={(checked) => handleSettingChange('liftgateService', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Inside Delivery</Label>
                      <p className="text-sm text-muted-foreground">Provide inside delivery services</p>
                    </div>
                    <Switch 
                      checked={freightSettings.insideDelivery} 
                      onCheckedChange={(checked) => handleSettingChange('insideDelivery', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Appointment Delivery</Label>
                      <p className="text-sm text-muted-foreground">Schedule specific delivery appointments</p>
                    </div>
                    <Switch 
                      checked={freightSettings.appointmentDelivery} 
                      onCheckedChange={(checked) => handleSettingChange('appointmentDelivery', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">White Glove Service</Label>
                      <p className="text-sm text-muted-foreground">Premium handling and delivery service</p>
                    </div>
                    <Switch 
                      checked={freightSettings.whiteGloveService} 
                      onCheckedChange={(checked) => handleSettingChange('whiteGloveService', checked)}
                    />
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Service Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="special" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Special Handling Requirements
                </CardTitle>
                <CardDescription>Configure handling for hazmat, temperature-controlled, and special freight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-red-500/10">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Hazardous Materials</h3>
                        <p className="text-sm text-muted-foreground">DOT hazmat compliance</p>
                      </div>
                      <Switch 
                        checked={freightSettings.hazmatHandling} 
                        onCheckedChange={(checked) => handleSettingChange('hazmatHandling', checked)}
                        className="ml-auto"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>• DOT certification required</p>
                      <p>• Special placarding</p>
                      <p>• Enhanced documentation</p>
                      <p>• Emergency response procedures</p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Thermometer className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Temperature Control</h3>
                        <p className="text-sm text-muted-foreground">Refrigerated transport</p>
                      </div>
                      <Switch 
                        checked={freightSettings.temperatureControl} 
                        onCheckedChange={(checked) => handleSettingChange('temperatureControl', checked)}
                        className="ml-auto"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>• Refrigerated trailers</p>
                      <p>• Temperature monitoring</p>
                      <p>• Cold chain documentation</p>
                      <p>• Specialized equipment</p>
                    </div>
                  </Card>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Special Handling Rates</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Base Surcharge</TableHead>
                        <TableHead>Per Mile</TableHead>
                        <TableHead>Minimum Charge</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Hazmat Handling</TableCell>
                        <TableCell>$50.00</TableCell>
                        <TableCell>$0.15</TableCell>
                        <TableCell>$100.00</TableCell>
                        <TableCell>
                          <Badge className={freightSettings.hazmatHandling ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
                            {freightSettings.hazmatHandling ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Temperature Control</TableCell>
                        <TableCell>$75.00</TableCell>
                        <TableCell>$0.25</TableCell>
                        <TableCell>$150.00</TableCell>
                        <TableCell>
                          <Badge className={freightSettings.temperatureControl ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
                            {freightSettings.temperatureControl ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>White Glove Service</TableCell>
                        <TableCell>$100.00</TableCell>
                        <TableCell>$0.50</TableCell>
                        <TableCell>$200.00</TableCell>
                        <TableCell>
                          <Badge className={freightSettings.whiteGloveService ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
                            {freightSettings.whiteGloveService ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CarrierLayout>
  );
};

export default FreightSettingsPage;