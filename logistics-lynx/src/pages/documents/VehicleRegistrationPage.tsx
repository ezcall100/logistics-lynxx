/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Car, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const vehicleRegistrationData = [
  {
    id: 'VEH-001',
    vehicleNumber: 'TRK-001',
    make: 'Freightliner',
    model: 'Cascadia',
    year: '2022',
    vin: '1FUJGHDV8NLAB1234',
    licensePlate: 'CMV-123-TX',
    registrationExpiry: '2024-08-15',
    state: 'Texas',
    status: 'active',
    ifta: 'IFTA-TX-12345',
    iftaExpiry: '2024-12-31',
    permitType: 'Commercial',
    daysToExpiry: 165,
    vehicleType: 'truck'
  },
  {
    id: 'VEH-002',
    vehicleNumber: 'TRL-001',
    make: 'Great Dane',
    model: 'Everest',
    year: '2021',
    vin: '1GRAA0622MF123456',
    licensePlate: 'TRL-456-TX',
    registrationExpiry: '2024-04-20',
    state: 'Texas',
    status: 'active',
    ifta: null,
    iftaExpiry: null,
    permitType: 'Trailer',
    daysToExpiry: 50,
    vehicleType: 'trailer'
  },
  {
    id: 'VEH-003',
    vehicleNumber: 'TRK-002',
    make: 'Peterbilt',
    model: '579',
    year: '2023',
    vin: '1XP5DB9X1ND123456',
    licensePlate: 'CMV-789-CA',
    registrationExpiry: '2024-03-15',
    state: 'California',
    status: 'expired',
    ifta: 'IFTA-CA-67890',
    iftaExpiry: '2024-12-31',
    permitType: 'Commercial',
    daysToExpiry: -15,
    vehicleType: 'truck'
  },
  {
    id: 'VEH-004',
    vehicleNumber: 'VAN-001',
    make: 'Ford',
    model: 'Transit',
    year: '2022',
    vin: '1FTBW2CM1NKA12345',
    licensePlate: 'VAN-321-FL',
    registrationExpiry: '2024-12-31',
    state: 'Florida',
    status: 'active',
    ifta: null,
    iftaExpiry: null,
    permitType: 'Commercial Van',
    daysToExpiry: 315,
    vehicleType: 'van'
  }
];

const permitsData = [
  {
    id: 'PRM-001',
    vehicleNumber: 'TRK-001',
    permitType: 'Oversize Load',
    issuingState: 'Texas',
    issueDate: '2024-02-01',
    expiryDate: '2024-05-01',
    permitNumber: 'OS-TX-2024-001',
    cost: '$125.00',
    status: 'active',
    daysToExpiry: 60
  },
  {
    id: 'PRM-002',
    vehicleNumber: 'TRK-002',
    permitType: 'Fuel Tax',
    issuingState: 'California',
    issueDate: '2024-01-01',
    expiryDate: '2024-12-31',
    permitNumber: 'FT-CA-2024-002',
    cost: '$250.00',
    status: 'active',
    daysToExpiry: 315
  },
  {
    id: 'PRM-003',
    vehicleNumber: 'TRL-001',
    permitType: 'Trip Permit',
    issuingState: 'Nevada',
    issueDate: '2024-02-10',
    expiryDate: '2024-02-20',
    permitNumber: 'TP-NV-2024-003',
    cost: '$35.00',
    status: 'expired',
    daysToExpiry: -10
  }
];

export default function VehicleRegistrationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('registration');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleTypeColor = (type: string) => {
    switch (type) {
      case 'truck': return 'bg-blue-100 text-blue-800';
      case 'trailer': return 'bg-orange-100 text-orange-800';
      case 'van': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck': return <Truck className="h-4 w-4" />;
      case 'trailer': return <Car className="h-4 w-4" />;
      case 'van': return <Car className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const getExpiryWarning = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return { color: 'text-red-600', message: 'Expired' };
    if (daysToExpiry <= 30) return { color: 'text-red-600', message: `${daysToExpiry} days` };
    if (daysToExpiry <= 90) return { color: 'text-yellow-600', message: `${daysToExpiry} days` };
    return { color: 'text-green-600', message: `${daysToExpiry} days` };
  };

  const totalVehicles = vehicleRegistrationData.length;
  const activeVehicles = vehicleRegistrationData.filter(v => v.status === 'active').length;
  const expiredVehicles = vehicleRegistrationData.filter(v => v.status === 'expired').length;
  const expiringVehicles = vehicleRegistrationData.filter(v => v.daysToExpiry <= 30 && v.daysToExpiry > 0).length;
  const totalPermits = permitsData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Registration</h1>
          <p className="text-muted-foreground">Manage vehicle registrations, permits, and compliance documents</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Register Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Vehicle</DialogTitle>
                <DialogDescription>Add a new vehicle and its registration details</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input id="vehicleNumber" placeholder="TRK-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="trailer">Trailer</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="Freightliner" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="Cascadia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" placeholder="2024" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input id="vin" placeholder="1FUJGHDV8NLAB1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input id="licensePlate" placeholder="CMV-123-TX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Registration State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="florida">Florida</SelectItem>
                      <SelectItem value="nevada">Nevada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationExpiry">Registration Expiry</Label>
                  <Input id="registrationExpiry" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifta">IFTA Number (if applicable)</Label>
                  <Input id="ifta" placeholder="IFTA-TX-12345" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional vehicle information" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoReminder" />
                  <Label htmlFor="autoReminder">Enable renewal reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Register Vehicle</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold">{totalVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{expiringVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold">{expiredVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Permits</p>
                <p className="text-2xl font-bold">{totalPermits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="registration">Vehicle Registration</TabsTrigger>
          <TabsTrigger value="permits">Permits & Licenses</TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Vehicle Registration Table */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Registrations</CardTitle>
              <CardDescription>All vehicle registrations and compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle ID</TableHead>
                    <TableHead>Vehicle Details</TableHead>
                    <TableHead>VIN</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Registration State</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>IFTA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleRegistrationData.map((vehicle) => {
                    const expiryWarning = getExpiryWarning(vehicle.daysToExpiry);
                    return (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getVehicleIcon(vehicle.vehicleType)}
                            <div>
                              <div className="font-medium">{vehicle.vehicleNumber}</div>
                              <div className="text-sm text-gray-500">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                              <Badge className={getVehicleTypeColor(vehicle.vehicleType)}>
                                {vehicle.vehicleType}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                        <TableCell>{vehicle.licensePlate}</TableCell>
                        <TableCell>{vehicle.state}</TableCell>
                        <TableCell>{vehicle.registrationExpiry}</TableCell>
                        <TableCell className={expiryWarning.color}>
                          {expiryWarning.message}
                        </TableCell>
                        <TableCell>
                          {vehicle.ifta ? (
                            <div className="text-sm">
                              <div>{vehicle.ifta}</div>
                              <div className="text-gray-500">Exp: {vehicle.iftaExpiry}</div>
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="permits" className="space-y-4">
          {/* Permits Table */}
          <Card>
            <CardHeader>
              <CardTitle>Permits & Licenses</CardTitle>
              <CardDescription>Special permits and operating licenses for fleet vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Permit Type</TableHead>
                    <TableHead>Permit Number</TableHead>
                    <TableHead>Issuing State</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permitsData.map((permit) => {
                    const expiryWarning = getExpiryWarning(permit.daysToExpiry);
                    return (
                      <TableRow key={permit.id}>
                        <TableCell className="font-medium">{permit.id}</TableCell>
                        <TableCell>{permit.vehicleNumber}</TableCell>
                        <TableCell>{permit.permitType}</TableCell>
                        <TableCell className="font-mono text-sm">{permit.permitNumber}</TableCell>
                        <TableCell>{permit.issuingState}</TableCell>
                        <TableCell>{permit.issueDate}</TableCell>
                        <TableCell>{permit.expiryDate}</TableCell>
                        <TableCell className={expiryWarning.color}>
                          {expiryWarning.message}
                        </TableCell>
                        <TableCell className="font-semibold">{permit.cost}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(permit.status)}>
                            {permit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
      </Tabs>
    </div>
  );
}