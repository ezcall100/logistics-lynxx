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
import { Calendar, Clock, MapPin, Truck, AlertTriangle, FileText, Download, Edit, Plus, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface HOSLog {
  id: string;
  date: string;
  status: 'active' | 'inactive' | 'violation';
  drivingTime: string;
  onDutyTime: string;
  sleepTime: string;
  location: string;
  mileage: number;
  violations: number;
}

interface HOSEntry {
  id: string;
  time: string;
  status: 'driving' | 'on-duty' | 'sleeper' | 'off-duty';
  location: string;
  notes: string;
}

const hosLogs: HOSLog[] = [
  {
    id: 'HOS001',
    date: '2024-01-19',
    status: 'active',
    drivingTime: '8:45',
    onDutyTime: '10:30',
    sleepTime: '10:00',
    location: 'Denver, CO',
    mileage: 487,
    violations: 0
  },
  {
    id: 'HOS002',
    date: '2024-01-18',
    status: 'inactive',
    drivingTime: '11:00',
    onDutyTime: '13:45',
    sleepTime: '8:30',
    location: 'Kansas City, MO',
    mileage: 523,
    violations: 1
  },
  {
    id: 'HOS003',
    date: '2024-01-17',
    status: 'active',
    drivingTime: '9:30',
    onDutyTime: '11:15',
    sleepTime: '10:00',
    location: 'Chicago, IL',
    mileage: 412,
    violations: 0
  }
];

const todayEntries: HOSEntry[] = [
  {
    id: 'E001',
    time: '06:00',
    status: 'on-duty',
    location: 'Denver, CO - Terminal',
    notes: 'Pre-trip inspection'
  },
  {
    id: 'E002',
    time: '07:30',
    status: 'driving',
    location: 'I-25 N, Denver, CO',
    notes: 'En route to delivery'
  },
  {
    id: 'E003',
    time: '14:45',
    status: 'off-duty',
    location: 'Rest Area, Wyoming',
    notes: 'Mandatory break'
  }
];

const HOSLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<HOSEntry | null>(null);

  const form = useForm({
    defaultValues: {
      time: '15:30',
      status: 'driving',
      location: 'I-76 E, Colorado',
      notes: 'Continuing to destination'
    }
  });

  const editForm = useForm({
    defaultValues: {
      time: '',
      status: '',
      location: '',
      notes: ''
    }
  });

  const handleAddEntry = (data: unknown) => {
    console.log('Adding HOS entry:', data);
    toast.success('HOS entry added successfully');
    setIsAddingEntry(false);
    form.reset();
  };

  const handleEditEntry = (data: unknown) => {
    console.log('Editing HOS entry:', data);
    toast.success('HOS entry updated successfully');
    setEditingEntry(null);
    editForm.reset();
  };

  const handleDeleteEntry = (id: string) => {
    console.log('Deleting entry:', id);
    toast.success('HOS entry deleted successfully');
  };

  const handleExport = () => {
    console.log('Exporting HOS logs');
    toast.success('HOS logs exported successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'violation':
        return <Badge variant="destructive">Violation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'driving':
        return 'bg-blue-500';
      case 'on-duty':
        return 'bg-yellow-500';
      case 'sleeper':
        return 'bg-purple-500';
      case 'off-duty':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredLogs = hosLogs.filter(log => {
    const matchesSearch = log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">HOS Logs</h1>
          <p className="text-muted-foreground">Track your hours of service and compliance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add HOS Entry</DialogTitle>
                <DialogDescription>Record a new hours of service entry</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddEntry)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
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
                            <SelectItem value="driving">Driving</SelectItem>
                            <SelectItem value="on-duty">On Duty</SelectItem>
                            <SelectItem value="sleeper">Sleeper Berth</SelectItem>
                            <SelectItem value="off-duty">Off Duty</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
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
                          <Textarea placeholder="Additional notes..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddingEntry(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Entry</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drive Time Today</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6:45</div>
            <p className="text-xs text-muted-foreground">4:15 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8:30</div>
            <p className="text-xs text-muted-foreground">5:30 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Status</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Off Duty</div>
            <p className="text-xs text-muted-foreground">Since 14:45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Entries</CardTitle>
          <CardDescription>January 19, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(entry.status)}`}></div>
                  <div>
                    <div className="font-medium">{entry.time} - {entry.status.replace('-', ' ')}</div>
                    <div className="text-sm text-muted-foreground">{entry.location}</div>
                    <div className="text-xs text-muted-foreground">{entry.notes}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setEditingEntry(entry);
                      editForm.reset({
                        time: entry.time,
                        status: entry.status,
                        location: entry.location,
                        notes: entry.notes
                      });
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Logs */}
      <Card>
        <CardHeader>
          <CardTitle>HOS History</CardTitle>
          <CardDescription>View and manage your hours of service logs</CardDescription>
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
                  placeholder="Search by location or ID..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="violation">Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* HOS Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Drive Time</TableHead>
                <TableHead>On Duty</TableHead>
                <TableHead>Sleep Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Violations</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.date}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>{log.drivingTime}</TableCell>
                  <TableCell>{log.onDutyTime}</TableCell>
                  <TableCell>{log.sleepTime}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.mileage} mi</TableCell>
                  <TableCell>
                    {log.violations > 0 ? (
                      <Badge variant="destructive">{log.violations}</Badge>
                    ) : (
                      <Badge variant="outline">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Entry Dialog */}
      <Dialog open={editingEntry !== null} onOpenChange={() => setEditingEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit HOS Entry</DialogTitle>
            <DialogDescription>Update the hours of service entry</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditEntry)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
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
                        <SelectItem value="driving">Driving</SelectItem>
                        <SelectItem value="on-duty">On Duty</SelectItem>
                        <SelectItem value="sleeper">Sleeper Berth</SelectItem>
                        <SelectItem value="off-duty">Off Duty</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
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
                      <Textarea placeholder="Additional notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingEntry(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Entry</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HOSLogsPage;