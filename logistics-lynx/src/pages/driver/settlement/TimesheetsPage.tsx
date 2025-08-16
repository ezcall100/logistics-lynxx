/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Plus, 
  Edit, 
  Save, 
  X, 
  Calendar,
  MapPin,
  Timer,
  CheckCircle,
  AlertCircle,
  Eye,
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
  workType: string;
  location: string;
  description: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  loadId?: string;
  mileage?: number;
}

interface WeeklyTimesheet {
  weekOf: string;
  entries: TimesheetEntry[];
  totalHours: number;
  overtimeHours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedDate?: string;
  approvedDate?: string;
}

const TimesheetsPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('2024-01-08');
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showWeeklyView, setShowWeeklyView] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  // Sample timesheet entries
  const timesheetEntries: TimesheetEntry[] = [
    {
      id: '1',
      date: '2024-01-08',
      startTime: '06:00',
      endTime: '18:30',
      totalHours: 12.5,
      breakTime: 1.0,
      workType: 'Long Haul',
      location: 'Chicago, IL → Atlanta, GA',
      description: 'Delivery of automotive parts',
      status: 'approved',
      loadId: 'LD-2024-0108',
      mileage: 716
    },
    {
      id: '2',
      date: '2024-01-09',
      startTime: '05:30',
      endTime: '17:45',
      totalHours: 12.25,
      breakTime: 1.0,
      workType: 'Long Haul',
      location: 'Atlanta, GA → Miami, FL',
      description: 'Refrigerated food delivery',
      status: 'approved',
      loadId: 'LD-2024-0109',
      mileage: 663
    },
    {
      id: '3',
      date: '2024-01-10',
      startTime: '07:00',
      endTime: '16:00',
      totalHours: 9.0,
      breakTime: 1.0,
      workType: 'Local Delivery',
      location: 'Miami, FL',
      description: 'Multiple local deliveries',
      status: 'submitted',
      loadId: 'LD-2024-0110',
      mileage: 145
    },
    {
      id: '4',
      date: '2024-01-11',
      startTime: '06:30',
      endTime: '19:00',
      totalHours: 12.5,
      breakTime: 1.0,
      workType: 'Long Haul',
      location: 'Miami, FL → Jacksonville, FL',
      description: 'Electronics shipment',
      status: 'draft',
      loadId: 'LD-2024-0111',
      mileage: 347
    }
  ];

  const [newEntry, setNewEntry] = useState<Partial<TimesheetEntry>>({
    date: '',
    startTime: '',
    endTime: '',
    breakTime: 0.5,
    workType: 'Long Haul',
    location: '',
    description: '',
    status: 'draft'
  });

  const weeklyTimesheet: WeeklyTimesheet = {
    weekOf: '2024-01-08',
    entries: timesheetEntries,
    totalHours: timesheetEntries.reduce((sum, entry) => sum + entry.totalHours, 0),
    overtimeHours: Math.max(0, timesheetEntries.reduce((sum, entry) => sum + entry.totalHours, 0) - 40),
    status: 'submitted',
    submittedDate: '2024-01-12'
  };

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.startTime || !newEntry.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const startTime = new Date(`${newEntry.date}T${newEntry.startTime}`);
    const endTime = new Date(`${newEntry.date}T${newEntry.endTime}`);
    const totalHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) - (newEntry.breakTime || 0);

    const entry: TimesheetEntry = {
      id: Date.now().toString(),
      date: newEntry.date!,
      startTime: newEntry.startTime!,
      endTime: newEntry.endTime!,
      totalHours,
      breakTime: newEntry.breakTime || 0,
      workType: newEntry.workType || 'Long Haul',
      location: newEntry.location || '',
      description: newEntry.description || '',
      status: 'draft'
    };

    toast.success('Timesheet entry added successfully');
    setShowAddEntry(false);
    setNewEntry({
      date: '',
      startTime: '',
      endTime: '',
      breakTime: 0.5,
      workType: 'Long Haul',
      location: '',
      description: '',
      status: 'draft'
    });
  };

  const handleEditEntry = (entry: TimesheetEntry) => {
    setEditingEntry({ ...entry });
    toast.info('Edit mode enabled');
  };

  const handleSaveEdit = () => {
    toast.success('Timesheet entry updated successfully');
    setEditingEntry(null);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    toast.info('Changes discarded');
  };

  const handleSubmitWeek = () => {
    toast.success('Weekly timesheet submitted for approval');
  };

  const handleApproveEntry = (entryId: string) => {
    toast.success('Timesheet entry approved');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const calculateTotalHours = (startTime: string, endTime: string, breakTime: number) => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60) - breakTime);
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Timesheets</h1>
          <p className="text-muted-foreground">Track your daily hours and submit for approval</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01-08">Week of Jan 8, 2024</SelectItem>
              <SelectItem value="2024-01-01">Week of Jan 1, 2024</SelectItem>
              <SelectItem value="2023-12-25">Week of Dec 25, 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddEntry(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold text-primary">{weeklyTimesheet.totalHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overtime</p>
                <p className="text-2xl font-bold">{weeklyTimesheet.overtimeHours}h</p>
              </div>
              <Timer className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Worked</p>
                <p className="text-2xl font-bold">{timesheetEntries.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(weeklyTimesheet.status)}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily Entries</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Daily Timesheet Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Time Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timesheetEntries.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-muted/50">
                    {editingEntry?.id === entry.id ? (
                      /* Edit Mode */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          <div>
                            <Label>Date</Label>
                            <Input
                              type="date"
                              value={editingEntry.date}
                              onChange={(e) => setEditingEntry({...editingEntry, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Start Time</Label>
                            <Input
                              type="time"
                              value={editingEntry.startTime}
                              onChange={(e) => setEditingEntry({...editingEntry, startTime: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>End Time</Label>
                            <Input
                              type="time"
                              value={editingEntry.endTime}
                              onChange={(e) => setEditingEntry({...editingEntry, endTime: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Break Time (hours)</Label>
                            <Input
                              type="number"
                              step="0.25"
                              value={editingEntry.breakTime}
                              onChange={(e) => setEditingEntry({...editingEntry, breakTime: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div>
                            <Label>Work Type</Label>
                            <Select 
                              value={editingEntry.workType} 
                              onValueChange={(value) => setEditingEntry({...editingEntry, workType: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Long Haul">Long Haul</SelectItem>
                                <SelectItem value="Local Delivery">Local Delivery</SelectItem>
                                <SelectItem value="Regional">Regional</SelectItem>
                                <SelectItem value="Maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={editingEntry.location}
                              onChange={(e) => setEditingEntry({...editingEntry, location: e.target.value})}
                              placeholder="Origin → Destination"
                            />
                          </div>
                          <div>
                            <Label>Load ID (Optional)</Label>
                            <Input
                              value={editingEntry.loadId || ''}
                              onChange={(e) => setEditingEntry({...editingEntry, loadId: e.target.value})}
                              placeholder="LD-2024-XXXX"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editingEntry.description}
                            onChange={(e) => setEditingEntry({...editingEntry, description: e.target.value})}
                            placeholder="Describe the work performed"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveEdit}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Date</div>
                            <div className="font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Hours</div>
                            <div className="font-medium">{entry.startTime} - {entry.endTime} ({entry.totalHours}h)</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Work Type</div>
                            <div className="font-medium">{entry.workType}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Status</div>
                            <div>{getStatusBadge(entry.status)}</div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <div className="text-sm text-muted-foreground">Location</div>
                            <div className="font-medium flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {entry.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Description</div>
                            <div className="text-sm">{entry.description}</div>
                          </div>
                          {entry.loadId && (
                            <div>
                              <div className="text-sm text-muted-foreground">Load ID</div>
                              <div className="text-sm font-mono">{entry.loadId}</div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          {entry.status === 'draft' && (
                            <Button size="sm" onClick={() => handleEditEntry(entry)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => toast.info('Entry details viewed')}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {weeklyTimesheet.status === 'draft' && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Ready to submit?</h4>
                      <p className="text-sm text-muted-foreground">Submit your timesheet for approval</p>
                    </div>
                    <Button onClick={handleSubmitWeek}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Week
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timesheet Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Time Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Regular Hours:</span>
                      <span className="font-medium">{Math.min(40, weeklyTimesheet.totalHours)}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime Hours:</span>
                      <span className="font-medium">{weeklyTimesheet.overtimeHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Hours:</span>
                      <span className="font-medium">{weeklyTimesheet.totalHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Worked:</span>
                      <span className="font-medium">{timesheetEntries.length}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Work Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Long Haul:</span>
                      <span className="font-medium">
                        {timesheetEntries.filter(e => e.workType === 'Long Haul').reduce((sum, e) => sum + e.totalHours, 0)}h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Delivery:</span>
                      <span className="font-medium">
                        {timesheetEntries.filter(e => e.workType === 'Local Delivery').reduce((sum, e) => sum + e.totalHours, 0)}h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Mileage:</span>
                      <span className="font-medium">
                        {timesheetEntries.reduce((sum, e) => sum + (e.mileage || 0), 0).toLocaleString()} mi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Timesheet Status:</span>
                      <span>{getStatusBadge(weeklyTimesheet.status)}</span>
                    </div>
                    {weeklyTimesheet.submittedDate && (
                      <div className="flex justify-between">
                        <span>Submitted:</span>
                        <span className="font-medium">{new Date(weeklyTimesheet.submittedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {weeklyTimesheet.approvedDate && (
                      <div className="flex justify-between">
                        <span>Approved:</span>
                        <span className="font-medium">{new Date(weeklyTimesheet.approvedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex gap-2">
                  <Button onClick={() => toast.success('Weekly report downloaded')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  {weeklyTimesheet.status === 'draft' && (
                    <Button onClick={handleSubmitWeek}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit for Approval
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Entry Dialog */}
      <Dialog open={showAddEntry} onOpenChange={setShowAddEntry}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Timesheet Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                />
              </div>
              <div>
                <Label>Work Type *</Label>
                <Select 
                  value={newEntry.workType} 
                  onValueChange={(value) => setNewEntry({...newEntry, workType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Long Haul">Long Haul</SelectItem>
                    <SelectItem value="Local Delivery">Local Delivery</SelectItem>
                    <SelectItem value="Regional">Regional</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Start Time *</Label>
                <Input
                  type="time"
                  value={newEntry.startTime}
                  onChange={(e) => setNewEntry({...newEntry, startTime: e.target.value})}
                />
              </div>
              <div>
                <Label>End Time *</Label>
                <Input
                  type="time"
                  value={newEntry.endTime}
                  onChange={(e) => setNewEntry({...newEntry, endTime: e.target.value})}
                />
              </div>
              <div>
                <Label>Break Time (hours)</Label>
                <Input
                  type="number"
                  step="0.25"
                  value={newEntry.breakTime}
                  onChange={(e) => setNewEntry({...newEntry, breakTime: parseFloat(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <Label>Total Hours</Label>
              <div className="text-lg font-semibold text-primary">
                {calculateTotalHours(newEntry.startTime || '', newEntry.endTime || '', newEntry.breakTime || 0)}h
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={newEntry.location}
                onChange={(e) => setNewEntry({...newEntry, location: e.target.value})}
                placeholder="Origin → Destination"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={newEntry.description}
                onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                placeholder="Describe the work performed"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddEntry}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
              <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimesheetsPage;