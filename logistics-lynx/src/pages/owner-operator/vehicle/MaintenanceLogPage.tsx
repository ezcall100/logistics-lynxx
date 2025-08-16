/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Wrench, Calendar, DollarSign, FileText, Plus, Search, Filter, Edit, Trash2, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection' | 'preventive';
  category: string;
  description: string;
  cost: number;
  mileage: number;
  servicedBy: string;
  location: string;
  partsUsed: string[];
  laborHours: number;
  status: 'completed' | 'in_progress' | 'scheduled' | 'overdue';
  nextDue: string;
  nextMileage: number;
  invoiceNumber?: string;
  warrantyInfo?: string;
  notes: string;
}

interface ScheduledMaintenance {
  id: string;
  type: string;
  description: string;
  dueDate: string;
  dueMileage: number;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  estimatedHours: number;
  location?: string;
  status: 'upcoming' | 'overdue' | 'scheduled';
}

const MaintenanceLogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  const [newMaintenanceForm, setNewMaintenanceForm] = useState({
    type: '',
    category: '',
    description: '',
    cost: '',
    servicedBy: '',
    location: '',
    notes: ''
  });

  // Mock maintenance records
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: 'MR001',
      date: '2024-01-20',
      type: 'routine',
      category: 'Oil Change',
      description: 'Full synthetic oil change with filter replacement',
      cost: 285.50,
      mileage: 145000,
      servicedBy: 'Quick Lube Express',
      location: 'Phoenix, AZ',
      partsUsed: ['Oil Filter', '15W-40 Synthetic Oil (12qt)'],
      laborHours: 1.5,
      status: 'completed',
      nextDue: '2024-04-20',
      nextMileage: 155000,
      invoiceNumber: 'INV-2024-001',
      warrantyInfo: '90 days / 10,000 miles',
      notes: 'All fluids checked and topped off. No leaks detected.'
    },
    {
      id: 'MR002',
      date: '2024-01-15',
      type: 'repair',
      category: 'Brake System',
      description: 'Front brake pad replacement and rotor resurfacing',
      cost: 845.75,
      mileage: 144800,
      servicedBy: 'TruckPro Service Center',
      location: 'Tucson, AZ',
      partsUsed: ['Front Brake Pads', 'Brake Fluid'],
      laborHours: 4.0,
      status: 'completed',
      nextDue: '2025-01-15',
      nextMileage: 184800,
      invoiceNumber: 'INV-2024-002',
      warrantyInfo: '1 year / 40,000 miles',
      notes: 'Brake system inspected. Rear brakes still in good condition.'
    },
    {
      id: 'MR003',
      date: '2024-01-10',
      type: 'inspection',
      category: 'DOT Inspection',
      description: 'Annual DOT safety inspection',
      cost: 125.00,
      mileage: 144500,
      servicedBy: 'Certified Inspection Station',
      location: 'Albuquerque, NM',
      partsUsed: [],
      laborHours: 2.0,
      status: 'completed',
      nextDue: '2025-01-10',
      nextMileage: 0,
      invoiceNumber: 'INV-2024-003',
      notes: 'Passed inspection. Minor light adjustment performed.'
    },
    {
      id: 'MR004',
      date: '2023-12-05',
      type: 'preventive',
      category: 'Tire Rotation',
      description: 'Tire rotation and pressure check',
      cost: 150.00,
      mileage: 142000,
      servicedBy: 'Big Rig Tire Service',
      location: 'Las Vegas, NV',
      partsUsed: [],
      laborHours: 1.0,
      status: 'completed',
      nextDue: '2024-03-05',
      nextMileage: 152000,
      invoiceNumber: 'INV-2023-045',
      notes: 'All tires in good condition. Pressure adjusted to specifications.'
    },
    {
      id: 'MR005',
      date: '2024-02-01',
      type: 'routine',
      category: 'Air Filter',
      description: 'Engine air filter replacement',
      cost: 0,
      mileage: 145280,
      servicedBy: 'Self Service',
      location: 'Phoenix, AZ',
      partsUsed: ['Engine Air Filter'],
      laborHours: 0.5,
      status: 'in_progress',
      nextDue: '2024-08-01',
      nextMileage: 165280,
      notes: 'Filter purchased, installation in progress.'
    }
  ];

  // Mock scheduled maintenance
  const scheduledMaintenance: ScheduledMaintenance[] = [
    {
      id: 'SM001',
      type: 'Transmission Service',
      description: 'Transmission fluid and filter change',
      dueDate: '2024-02-15',
      dueMileage: 150000,
      priority: 'high',
      estimatedCost: 450,
      estimatedHours: 3,
      location: 'TruckPro Service Center',
      status: 'upcoming'
    },
    {
      id: 'SM002',
      type: 'Differential Service',
      description: 'Rear differential oil change',
      dueDate: '2024-03-01',
      dueMileage: 155000,
      priority: 'medium',
      estimatedCost: 180,
      estimatedHours: 1.5,
      status: 'upcoming'
    },
    {
      id: 'SM003',
      type: 'Coolant Flush',
      description: 'Engine coolant system flush and refill',
      dueDate: '2024-01-25',
      dueMileage: 146000,
      priority: 'high',
      estimatedCost: 320,
      estimatedHours: 2,
      status: 'overdue'
    }
  ];

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.servicedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Scheduled</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleAddMaintenance = () => {
    if (!newMaintenanceForm.description || !newMaintenanceForm.category) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('Maintenance record added successfully');
    setNewMaintenanceForm({
      type: '',
      category: '',
      description: '',
      cost: '',
      servicedBy: '',
      location: '',
      notes: ''
    });
    // Mock API call would go here
  };

  const handleEditRecord = (record: MaintenanceRecord) => {
    toast.success(`Editing maintenance record ${record.id}`);
    // Mock edit functionality
  };

  const handleDeleteRecord = (recordId: string) => {
    toast.success(`Maintenance record ${recordId} deleted`);
    // Mock delete functionality
  };

  const handleScheduleMaintenance = (maintenanceId: string) => {
    toast.success(`Maintenance ${maintenanceId} scheduled`);
    // Mock scheduling functionality
  };

  const getTotalCost = () => {
    return filteredRecords.reduce((sum, record) => sum + record.cost, 0);
  };

  const getAvgCost = () => {
    return filteredRecords.length > 0 ? getTotalCost() / filteredRecords.length : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Maintenance Log</h1>
            <p className="text-muted-foreground">Track vehicle maintenance history and schedule upcoming services</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="hover-scale">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Maintenance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Maintenance Record</DialogTitle>
                  <DialogDescription>Record a new maintenance activity</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newMaintenanceForm.type} onValueChange={(value) => setNewMaintenanceForm({...newMaintenanceForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="preventive">Preventive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Oil Change"
                      value={newMaintenanceForm.category}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, category: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of maintenance performed"
                      value={newMaintenanceForm.description}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost</Label>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="0.00"
                      value={newMaintenanceForm.cost}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, cost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="servicedBy">Serviced By</Label>
                    <Input
                      id="servicedBy"
                      placeholder="Service provider name"
                      value={newMaintenanceForm.servicedBy}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, servicedBy: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Service location"
                      value={newMaintenanceForm.location}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, location: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes"
                      value={newMaintenanceForm.notes}
                      onChange={(e) => setNewMaintenanceForm({...newMaintenanceForm, notes: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleAddMaintenance}>Add Record</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredRecords.length}</div>
              <p className="text-xs text-muted-foreground">Maintenance entries</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getTotalCost())}</div>
              <p className="text-xs text-muted-foreground">All maintenance</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Cost</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getAvgCost())}</div>
              <p className="text-xs text-muted-foreground">Per service</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {scheduledMaintenance.filter(s => s.status === 'upcoming').length}
              </div>
              <p className="text-xs text-muted-foreground">Services due</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Maintenance History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search maintenance records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="preventive">Preventive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Records Table */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History ({filteredRecords.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Mileage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id} className="hover:bg-muted/50">
                          <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">{record.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{record.category}</div>
                              <div className="text-sm text-muted-foreground">{record.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {record.cost > 0 ? formatCurrency(record.cost) : 'Self Service'}
                          </TableCell>
                          <TableCell>{record.mileage.toLocaleString()} mi</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              {getStatusBadge(record.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Maintenance Record - {selectedRecord?.category}</DialogTitle>
                                    <DialogDescription>Detailed maintenance information</DialogDescription>
                                  </DialogHeader>
                                  {selectedRecord && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Service Date</Label>
                                        <p className="text-sm">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label>Mileage</Label>
                                        <p className="text-sm">{selectedRecord.mileage.toLocaleString()} miles</p>
                                      </div>
                                      <div>
                                        <Label>Serviced By</Label>
                                        <p className="text-sm">{selectedRecord.servicedBy}</p>
                                      </div>
                                      <div>
                                        <Label>Location</Label>
                                        <p className="text-sm">{selectedRecord.location}</p>
                                      </div>
                                      <div>
                                        <Label>Labor Hours</Label>
                                        <p className="text-sm">{selectedRecord.laborHours} hours</p>
                                      </div>
                                      <div>
                                        <Label>Invoice Number</Label>
                                        <p className="text-sm">{selectedRecord.invoiceNumber || 'N/A'}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <Label>Parts Used</Label>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {selectedRecord.partsUsed.map((part, index) => (
                                            <Badge key={index} variant="outline">{part}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="col-span-2">
                                        <Label>Warranty</Label>
                                        <p className="text-sm">{selectedRecord.warrantyInfo || 'No warranty'}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <Label>Notes</Label>
                                        <p className="text-sm">{selectedRecord.notes}</p>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm" onClick={() => handleEditRecord(record)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteRecord(record.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledMaintenance.map((maintenance) => (
                    <div key={maintenance.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{maintenance.type}</h4>
                          {getPriorityBadge(maintenance.priority)}
                          <Badge variant={maintenance.status === 'overdue' ? 'destructive' : 'outline'}>
                            {maintenance.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{maintenance.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Due Date:</span>
                            <p className="font-medium">{new Date(maintenance.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Due Mileage:</span>
                            <p className="font-medium">{maintenance.dueMileage.toLocaleString()} mi</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <p className="font-medium">{formatCurrency(maintenance.estimatedCost)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Time:</span>
                            <p className="font-medium">{maintenance.estimatedHours} hours</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" onClick={() => handleScheduleMaintenance(maintenance.id)}>
                          Schedule
                        </Button>
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

export default MaintenanceLogPage;