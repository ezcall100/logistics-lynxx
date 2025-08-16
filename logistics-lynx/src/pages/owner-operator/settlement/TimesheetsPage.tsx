/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Clock, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Search,
  MapPin,
  Truck,
  FileText,
  AlertCircle,
  CheckCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface TimesheetEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  breakTime: number;
  workHours: number;
  overtime: number;
  location: string;
  activityType: 'driving' | 'loading' | 'unloading' | 'rest' | 'maintenance' | 'inspection';
  notes: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  loadNumber?: string;
}

interface WeeklySummary {
  weekOf: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  totalPay: number;
  status: 'incomplete' | 'submitted' | 'approved';
}

const TimesheetsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<TimesheetEntry>>({
    date: new Date().toISOString().split('T')[0],
    startTime: '06:00',
    endTime: '18:00',
    breakTime: 1,
    location: '',
    activityType: 'driving',
    notes: '',
    loadNumber: ''
  });

  // Mock data for timesheet entries
  const timesheetEntries: TimesheetEntry[] = [
    {
      id: '1',
      date: '2024-01-15',
      startTime: '06:00',
      endTime: '18:30',
      totalHours: 12.5,
      breakTime: 1,
      workHours: 11.5,
      overtime: 3.5,
      location: 'Dallas, TX to Houston, TX',
      activityType: 'driving',
      notes: 'Long haul delivery, weather delay',
      status: 'approved',
      loadNumber: 'LD-2024-001'
    },
    {
      id: '2',
      date: '2024-01-16',
      startTime: '07:00',
      endTime: '16:00',
      totalHours: 9,
      breakTime: 1,
      workHours: 8,
      overtime: 0,
      location: 'Houston, TX',
      activityType: 'loading',
      notes: 'Loading at warehouse, equipment issue',
      status: 'submitted',
      loadNumber: 'LD-2024-002'
    },
    {
      id: '3',
      date: '2024-01-17',
      startTime: '05:30',
      endTime: '19:00',
      totalHours: 13.5,
      breakTime: 1.5,
      workHours: 12,
      overtime: 4,
      location: 'Houston, TX to Austin, TX',
      activityType: 'driving',
      notes: 'Express delivery, customer satisfaction',
      status: 'approved',
      loadNumber: 'LD-2024-003'
    },
    {
      id: '4',
      date: '2024-01-18',
      startTime: '08:00',
      endTime: '14:00',
      totalHours: 6,
      breakTime: 0.5,
      workHours: 5.5,
      overtime: 0,
      location: 'Austin, TX',
      activityType: 'maintenance',
      notes: 'Routine truck maintenance and inspection',
      status: 'draft'
    },
    {
      id: '5',
      date: '2024-01-19',
      startTime: '06:30',
      endTime: '17:30',
      totalHours: 11,
      breakTime: 1,
      workHours: 10,
      overtime: 2,
      location: 'Austin, TX to San Antonio, TX',
      activityType: 'driving',
      notes: 'Standard delivery route',
      status: 'submitted',
      loadNumber: 'LD-2024-004'
    }
  ];

  // Mock data for weekly summary
  const weeklySummary: WeeklySummary = {
    weekOf: 'January 15-21, 2024',
    totalHours: 52,
    regularHours: 40,
    overtimeHours: 12,
    totalPay: 2340.00,
    status: 'submitted'
  };

  const filteredEntries = timesheetEntries.filter(entry => {
    const matchesSearch = entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.activityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.loadNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      submitted: 'outline',
      approved: 'default',
      rejected: 'destructive'
    } as const;
    
    const icons = {
      draft: <Edit className="w-3 h-3" />,
      submitted: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      rejected: <AlertCircle className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      driving: <Truck className="w-4 h-4" />,
      loading: <FileText className="w-4 h-4" />,
      unloading: <FileText className="w-4 h-4" />,
      rest: <Clock className="w-4 h-4" />,
      maintenance: <Truck className="w-4 h-4" />,
      inspection: <CheckCircle className="w-4 h-4" />
    };

    return icons[type as keyof typeof icons] || <Clock className="w-4 h-4" />;
  };

  const calculateWorkHours = (start: string, end: string, breakTime: number) => {
    const startDate = new Date(`2024-01-01 ${start}:00`);
    const endDate = new Date(`2024-01-01 ${end}:00`);
    const totalHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const workHours = totalHours - breakTime;
    const overtime = Math.max(0, workHours - 8);
    return { totalHours, workHours, overtime };
  };

  const handleAddEntry = () => {
    if (!newEntry.startTime || !newEntry.endTime || !newEntry.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { totalHours, workHours, overtime } = calculateWorkHours(
      newEntry.startTime!, 
      newEntry.endTime!, 
      newEntry.breakTime || 0
    );

    const entry: TimesheetEntry = {
      id: Date.now().toString(),
      date: newEntry.date!,
      startTime: newEntry.startTime!,
      endTime: newEntry.endTime!,
      totalHours,
      breakTime: newEntry.breakTime || 0,
      workHours,
      overtime,
      location: newEntry.location!,
      activityType: newEntry.activityType as TimesheetEntry['activityType'],
      notes: newEntry.notes || '',
      status: 'draft',
      loadNumber: newEntry.loadNumber
    };

    toast.success('Timesheet entry added successfully');
    setIsAddDialogOpen(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      startTime: '06:00',
      endTime: '18:00',
      breakTime: 1,
      location: '',
      activityType: 'driving',
      notes: '',
      loadNumber: ''
    });
  };

  const handleEditEntry = (entry: TimesheetEntry) => {
    setEditingEntry(entry);
  };

  const handleDeleteEntry = (entryId: string) => {
    toast.success('Timesheet entry deleted successfully');
  };

  const handleSubmitTimesheet = () => {
    toast.success('Weekly timesheet submitted for approval');
  };

  const handleExportTimesheet = () => {
    toast.success('Timesheet exported successfully');
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timesheets</h1>
          <p className="text-muted-foreground">Track your work hours and submit timesheets</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleExportTimesheet} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Timesheet Entry</DialogTitle>
                <DialogDescription>Record your work hours and activities</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity">Activity</Label>
                    <Select 
                      value={newEntry.activityType} 
                      onValueChange={(value) => setNewEntry({ ...newEntry, activityType: value as TimesheetEntry['activityType'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="driving">Driving</SelectItem>
                        <SelectItem value="loading">Loading</SelectItem>
                        <SelectItem value="unloading">Unloading</SelectItem>
                        <SelectItem value="rest">Rest</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={newEntry.startTime}
                      onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={newEntry.endTime}
                      onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="break-time">Break (hrs)</Label>
                    <Input
                      id="break-time"
                      type="number"
                      step="0.5"
                      min="0"
                      value={newEntry.breakTime}
                      onChange={(e) => setNewEntry({ ...newEntry, breakTime: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location/Route</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Dallas, TX to Houston, TX"
                    value={newEntry.location}
                    onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="load-number">Load Number (Optional)</Label>
                  <Input
                    id="load-number"
                    placeholder="e.g., LD-2024-001"
                    value={newEntry.loadNumber}
                    onChange={(e) => setNewEntry({ ...newEntry, loadNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes or comments..."
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Summary
          </CardTitle>
          <CardDescription>{weeklySummary.weekOf}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{weeklySummary.totalHours}</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{weeklySummary.regularHours}</div>
              <div className="text-sm text-muted-foreground">Regular Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{weeklySummary.overtimeHours}</div>
              <div className="text-sm text-muted-foreground">Overtime Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${weeklySummary.totalPay.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Estimated Pay</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2">
              Status: {getStatusBadge(weeklySummary.status)}
            </div>
            <Button onClick={handleSubmitTimesheet} disabled={weeklySummary.status === 'submitted'}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Timesheet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Timesheet Entries</CardTitle>
          <CardDescription>View and manage your daily time entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by location, activity, or load number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="week-filter">Week</Label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Week</SelectItem>
                  <SelectItem value="previous">Previous Week</SelectItem>
                  <SelectItem value="two-weeks-ago">2 Weeks Ago</SelectItem>
                  <SelectItem value="three-weeks-ago">3 Weeks Ago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timesheet Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Load #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActivityIcon(entry.activityType)}
                        {entry.activityType.charAt(0).toUpperCase() + entry.activityType.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>{entry.startTime} - {entry.endTime}</TableCell>
                    <TableCell>{entry.workHours.toFixed(1)}h</TableCell>
                    <TableCell>{entry.overtime > 0 ? `${entry.overtime.toFixed(1)}h` : '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {entry.location}
                      </div>
                    </TableCell>
                    <TableCell>{entry.loadNumber || '-'}</TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditEntry(entry)}
                          disabled={entry.status === 'approved'}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEntry(entry.id)}
                          disabled={entry.status === 'approved'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No timesheet entries found</h3>
              <p className="text-muted-foreground">Start by adding your first timesheet entry.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimesheetsPage;