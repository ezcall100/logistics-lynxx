/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Settings, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, DollarSign, User, Car, Wrench } from 'lucide-react';
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

const maintenanceRecordsData = [
  {
    id: 'MNT-001',
    workOrder: 'WO-2024-001',
    vehicle: 'TRK-001',
    maintenanceType: 'Preventive',
    serviceType: 'Oil Change',
    date: '2024-02-15',
    mileage: 125000,
    nextDue: 130000,
    cost: '$285.50',
    technician: 'Tom Anderson',
    vendor: 'Main Service Center',
    status: 'completed',
    priority: 'routine',
    partsUsed: ['Oil Filter', 'Engine Oil (15W-40)']
  },
  {
    id: 'MNT-002',
    workOrder: 'WO-2024-002',
    vehicle: 'TRK-002',
    maintenanceType: 'Corrective',
    serviceType: 'Brake Repair',
    date: '2024-02-18',
    mileage: 89000,
    nextDue: null,
    cost: '$1,250.00',
    technician: 'Mike Johnson',
    vendor: 'Brake Specialists Inc',
    status: 'in-progress',
    priority: 'high',
    partsUsed: ['Brake Pads', 'Brake Rotors', 'Brake Fluid']
  },
  {
    id: 'MNT-003',
    workOrder: 'WO-2024-003',
    vehicle: 'TRL-001',
    maintenanceType: 'Inspection',
    serviceType: 'DOT Inspection',
    date: '2024-02-20',
    mileage: 45000,
    nextDue: null,
    cost: '$150.00',
    technician: 'Sarah Wilson',
    vendor: 'Certified Inspection LLC',
    status: 'scheduled',
    priority: 'medium',
    partsUsed: []
  },
  {
    id: 'MNT-004',
    workOrder: 'WO-2024-004',
    vehicle: 'TRK-003',
    maintenanceType: 'Emergency',
    serviceType: 'Engine Repair',
    date: '2024-02-12',
    mileage: 156000,
    nextDue: null,
    cost: '$3,850.00',
    technician: 'Robert Davis',
    vendor: 'Emergency Repair Services',
    status: 'completed',
    priority: 'critical',
    partsUsed: ['Turbocharger', 'Gaskets', 'Engine Oil', 'Coolant']
  }
];

const scheduleData = [
  {
    id: 'SCH-001',
    vehicle: 'TRK-001',
    serviceType: 'Tire Rotation',
    scheduledDate: '2024-03-01',
    currentMileage: 125000,
    serviceMileage: 128000,
    estimatedCost: '$80.00',
    vendor: 'Tire Pro Center',
    status: 'scheduled',
    priority: 'routine'
  },
  {
    id: 'SCH-002',
    vehicle: 'TRK-002',
    serviceType: 'Transmission Service',
    scheduledDate: '2024-02-25',
    currentMileage: 89000,
    serviceMileage: 90000,
    estimatedCost: '$450.00',
    vendor: 'Transmission Experts',
    status: 'overdue',
    priority: 'high'
  },
  {
    id: 'SCH-003',
    vehicle: 'TRL-001',
    serviceType: 'Brake Inspection',
    scheduledDate: '2024-03-15',
    currentMileage: 45000,
    serviceMileage: 50000,
    estimatedCost: '$125.00',
    vendor: 'Main Service Center',
    status: 'scheduled',
    priority: 'medium'
  }
];

export default function MaintenanceRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('records');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case 'Preventive': return 'bg-green-100 text-green-800';
      case 'Corrective': return 'bg-orange-100 text-orange-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Inspection': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'routine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRecords = maintenanceRecordsData.length;
  const completedRecords = maintenanceRecordsData.filter(r => r.status === 'completed').length;
  const inProgressRecords = maintenanceRecordsData.filter(r => r.status === 'in-progress').length;
  const scheduledServices = scheduleData.length;
  const overdueServices = scheduleData.filter(s => s.status === 'overdue').length;
  const totalCost = maintenanceRecordsData
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + parseFloat(r.cost.replace('$', '').replace(',', '')), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Records</h1>
          <p className="text-muted-foreground">Track vehicle maintenance, repairs, and service schedules</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Service Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Maintenance Record</DialogTitle>
                <DialogDescription>Record a new maintenance service or repair</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workOrder">Work Order Number</Label>
                  <Input id="workOrder" placeholder="WO-2024-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trk-001">TRK-001</SelectItem>
                      <SelectItem value="trk-002">TRK-002</SelectItem>
                      <SelectItem value="trl-001">TRL-001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceType">Maintenance Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="corrective">Corrective</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Input id="serviceType" placeholder="Oil Change" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Service Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Current Mileage</Label>
                  <Input id="mileage" type="number" placeholder="125000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Total Cost</Label>
                  <Input id="cost" placeholder="$285.50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Service Vendor</Label>
                  <Input id="vendor" placeholder="Main Service Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technician">Technician</Label>
                  <Input id="technician" placeholder="Tom Anderson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="routine">Routine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Service Description</Label>
                  <Textarea id="description" placeholder="Detailed description of work performed" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="partsUsed">Parts Used</Label>
                  <Textarea id="partsUsed" placeholder="List of parts and materials used (comma separated)" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="scheduleNext" />
                  <Label htmlFor="scheduleNext">Schedule next service automatically</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Add Record</Button>
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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{totalRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{scheduledServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="records">Maintenance Records</TabsTrigger>
          <TabsTrigger value="schedule">Service Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search maintenance records..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Maintenance Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
              <CardDescription>Complete history of vehicle maintenance and repairs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Work Order</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecordsData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.workOrder}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          {record.vehicle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getMaintenanceTypeColor(record.maintenanceType)}>
                          {record.maintenanceType}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.serviceType}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.mileage.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{record.cost}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {record.technician}
                        </div>
                      </TableCell>
                      <TableCell>{record.vendor}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(record.priority)}>
                          {record.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
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
                            <FileText className="h-4 w-4" />
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

        <TabsContent value="schedule" className="space-y-4">
          {/* Service Schedule Table */}
          <Card>
            <CardHeader>
              <CardTitle>Service Schedule</CardTitle>
              <CardDescription>Upcoming and scheduled maintenance services</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Schedule ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Current Mileage</TableHead>
                    <TableHead>Service Mileage</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          {schedule.vehicle}
                        </div>
                      </TableCell>
                      <TableCell>{schedule.serviceType}</TableCell>
                      <TableCell>{schedule.scheduledDate}</TableCell>
                      <TableCell>{schedule.currentMileage.toLocaleString()}</TableCell>
                      <TableCell>{schedule.serviceMileage.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{schedule.estimatedCost}</TableCell>
                      <TableCell>{schedule.vendor}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(schedule.priority)}>
                          {schedule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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
    </div>
  );
}