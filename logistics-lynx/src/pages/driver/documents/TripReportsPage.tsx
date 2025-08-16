/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Edit, Plus, Search, MapPin, Clock, Fuel, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface TripReport {
  id: string;
  tripNumber: string;
  date: string;
  status: 'completed' | 'in-progress' | 'delayed' | 'cancelled';
  origin: string;
  destination: string;
  startTime: string;
  endTime: string;
  totalMiles: number;
  fuelUsed: number;
  loadNumber: string;
  issues: string[];
  notes: string;
}

const tripReports: TripReport[] = [
  {
    id: 'TR001',
    tripNumber: 'TRP-2024-001',
    date: '2024-01-19',
    status: 'completed',
    origin: 'Denver, CO',
    destination: 'Phoenix, AZ',
    startTime: '06:00',
    endTime: '18:30',
    totalMiles: 587,
    fuelUsed: 94.3,
    loadNumber: 'LD-789123',
    issues: [],
    notes: 'Smooth delivery, no issues encountered'
  },
  {
    id: 'TR002',
    tripNumber: 'TRP-2024-002',
    date: '2024-01-18',
    status: 'delayed',
    origin: 'Kansas City, MO',
    destination: 'Denver, CO',
    startTime: '05:30',
    endTime: '20:15',
    totalMiles: 523,
    fuelUsed: 87.2,
    loadNumber: 'LD-789124',
    issues: ['Traffic delays', 'Weather conditions'],
    notes: 'Delayed due to snow storm, arrived 3 hours late'
  },
  {
    id: 'TR003',
    tripNumber: 'TRP-2024-003',
    date: '2024-01-17',
    status: 'completed',
    origin: 'Chicago, IL',
    destination: 'Kansas City, MO',
    startTime: '07:00',
    endTime: '17:45',
    totalMiles: 412,
    fuelUsed: 68.9,
    loadNumber: 'LD-789125',
    issues: [],
    notes: 'On-time delivery, customer satisfied'
  }
];

const TripReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [editingReport, setEditingReport] = useState<TripReport | null>(null);
  const [viewingReport, setViewingReport] = useState<TripReport | null>(null);

  const form = useForm({
    defaultValues: {
      tripNumber: 'TRP-2024-004',
      date: '2024-01-20',
      origin: 'Phoenix, AZ',
      destination: 'Los Angeles, CA',
      startTime: '06:00',
      endTime: '14:30',
      totalMiles: '385',
      fuelUsed: '62.4',
      loadNumber: 'LD-789126',
      status: 'completed',
      issues: '',
      notes: 'Successful delivery with no complications'
    }
  });

  const editForm = useForm({
    defaultValues: {
      tripNumber: '',
      date: '',
      origin: '',
      destination: '',
      startTime: '',
      endTime: '',
      totalMiles: '',
      fuelUsed: '',
      loadNumber: '',
      status: '',
      issues: '',
      notes: ''
    }
  });

  const handleCreateReport = (data: unknown) => {
    console.log('Creating trip report:', data);
    toast.success('Trip report created successfully');
    setIsCreatingReport(false);
    form.reset();
  };

  const handleEditReport = (data: unknown) => {
    console.log('Editing trip report:', data);
    toast.success('Trip report updated successfully');
    setEditingReport(null);
    editForm.reset();
  };

  const handleDeleteReport = (id: string) => {
    console.log('Deleting report:', id);
    toast.success('Trip report deleted successfully');
  };

  const handleExportReport = (id: string) => {
    console.log('Exporting report:', id);
    toast.success('Trip report exported successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case 'delayed':
        return <Badge variant="destructive">Delayed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredReports = tripReports.filter(report => {
    const matchesSearch = report.tripNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.loadNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Trip Reports</h1>
          <p className="text-muted-foreground">Manage and track your trip documentation</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleExportReport('all')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isCreatingReport} onOpenChange={setIsCreatingReport}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Trip Report</DialogTitle>
                <DialogDescription>Document your trip details and outcomes</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateReport)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tripNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trip Number</FormLabel>
                          <FormControl>
                            <Input placeholder="TRP-2024-XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Origin</FormLabel>
                          <FormControl>
                            <Input placeholder="Starting location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination</FormLabel>
                          <FormControl>
                            <Input placeholder="Ending location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalMiles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Miles</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fuelUsed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Used (gallons)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="0.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loadNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Load Number</FormLabel>
                          <FormControl>
                            <Input placeholder="LD-XXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="delayed">Delayed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="issues"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issues/Delays</FormLabel>
                        <FormControl>
                          <Input placeholder="Any issues encountered (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Additional trip notes..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsCreatingReport(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Report</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Used</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,127</div>
            <p className="text-xs text-muted-foreground">gallons</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">91.7%</div>
            <p className="text-xs text-muted-foreground">11 of 12 trips</p>
          </CardContent>
        </Card>
      </div>

      {/* Trip Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Reports</CardTitle>
          <CardDescription>View and manage your trip documentation</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by trip number, location, or load..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Miles</TableHead>
                <TableHead>Load</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.tripNumber}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.origin}</div>
                      <div className="text-muted-foreground">→ {report.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{report.startTime} - {report.endTime}</div>
                    </div>
                  </TableCell>
                  <TableCell>{report.totalMiles} mi</TableCell>
                  <TableCell>{report.loadNumber}</TableCell>
                  <TableCell>
                    {report.issues.length > 0 ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {report.issues.length}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setViewingReport(report)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingReport(report);
                          editForm.reset({
                            tripNumber: report.tripNumber,
                            date: report.date,
                            origin: report.origin,
                            destination: report.destination,
                            startTime: report.startTime,
                            endTime: report.endTime,
                            totalMiles: report.totalMiles.toString(),
                            fuelUsed: report.fuelUsed.toString(),
                            loadNumber: report.loadNumber,
                            status: report.status,
                            issues: report.issues.join(', '),
                            notes: report.notes
                          });
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExportReport(report.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Report Dialog */}
      <Dialog open={viewingReport !== null} onOpenChange={() => setViewingReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Trip Report Details</DialogTitle>
            <DialogDescription>{viewingReport?.tripNumber}</DialogDescription>
          </DialogHeader>
          {viewingReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <p className="text-sm font-medium">{viewingReport.date}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingReport.status)}</div>
                </div>
                <div>
                  <Label>Origin</Label>
                  <p className="text-sm font-medium">{viewingReport.origin}</p>
                </div>
                <div>
                  <Label>Destination</Label>
                  <p className="text-sm font-medium">{viewingReport.destination}</p>
                </div>
                <div>
                  <Label>Start Time</Label>
                  <p className="text-sm font-medium">{viewingReport.startTime}</p>
                </div>
                <div>
                  <Label>End Time</Label>
                  <p className="text-sm font-medium">{viewingReport.endTime}</p>
                </div>
                <div>
                  <Label>Total Miles</Label>
                  <p className="text-sm font-medium">{viewingReport.totalMiles} mi</p>
                </div>
                <div>
                  <Label>Fuel Used</Label>
                  <p className="text-sm font-medium">{viewingReport.fuelUsed} gal</p>
                </div>
                <div>
                  <Label>Load Number</Label>
                  <p className="text-sm font-medium">{viewingReport.loadNumber}</p>
                </div>
                <div>
                  <Label>Issues</Label>
                  <p className="text-sm font-medium">
                    {viewingReport.issues.length > 0 ? viewingReport.issues.join(', ') : 'None'}
                  </p>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{viewingReport.notes}</p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setViewingReport(null)}>
                  Close
                </Button>
                <Button onClick={() => handleExportReport(viewingReport.id)}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Report Dialog */}
      <Dialog open={editingReport !== null} onOpenChange={() => setEditingReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trip Report</DialogTitle>
            <DialogDescription>Update trip details and outcomes</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditReport)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="tripNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Number</FormLabel>
                      <FormControl>
                        <Input placeholder="TRP-2024-XXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input placeholder="Starting location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="Ending location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="totalMiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Miles</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="fuelUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Used (gallons)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="loadNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Load Number</FormLabel>
                      <FormControl>
                        <Input placeholder="LD-XXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="issues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issues/Delays</FormLabel>
                    <FormControl>
                      <Input placeholder="Any issues encountered (comma separated)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional trip notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingReport(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Report</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripReportsPage;