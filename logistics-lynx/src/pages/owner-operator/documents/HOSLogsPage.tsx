/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Filter, Plus, Edit, Download, Search, Play, Pause, Square, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

interface HOSEntry {
  id: string;
  date: string;
  driverName: string;
  vehicleNumber: string;
  onDutyTime: string;
  offDutyTime: string;
  drivingTime: string;
  sleeperTime: string;
  status: 'compliant' | 'violation' | 'pending';
  totalMiles: number;
  violations?: string[];
  certificationStatus: 'certified' | 'pending' | 'expired';
}

const mockHOSData: HOSEntry[] = [
  {
    id: 'hos-001',
    date: '2024-07-19',
    driverName: 'John Mitchell',
    vehicleNumber: 'TRK-001',
    onDutyTime: '06:00',
    offDutyTime: '18:00',
    drivingTime: '10:15',
    sleeperTime: '8:00',
    status: 'compliant',
    totalMiles: 534,
    certificationStatus: 'certified'
  },
  {
    id: 'hos-002',
    date: '2024-07-18',
    driverName: 'John Mitchell',
    vehicleNumber: 'TRK-001',
    onDutyTime: '05:30',
    offDutyTime: '19:30',
    drivingTime: '11:45',
    sleeperTime: '8:30',
    status: 'violation',
    totalMiles: 612,
    violations: ['Exceeded 11-hour driving limit by 0:45'],
    certificationStatus: 'certified'
  },
  {
    id: 'hos-003',
    date: '2024-07-17',
    driverName: 'John Mitchell',
    vehicleNumber: 'TRK-001',
    onDutyTime: '07:00',
    offDutyTime: '17:00',
    drivingTime: '8:30',
    sleeperTime: '10:00',
    status: 'compliant',
    totalMiles: 445,
    certificationStatus: 'certified'
  },
  {
    id: 'hos-004',
    date: '2024-07-16',
    driverName: 'John Mitchell',
    vehicleNumber: 'TRK-001',
    onDutyTime: '06:15',
    offDutyTime: '18:45',
    drivingTime: '9:45',
    sleeperTime: '9:30',
    status: 'pending',
    totalMiles: 398,
    certificationStatus: 'pending'
  }
];

interface TimeEntry {
  time: string;
  status: 'on-duty' | 'driving' | 'sleeper' | 'off-duty';
  location: string;
  notes?: string;
}

const HOSLogsPage: React.FC = () => {
  const [hosEntries, setHosEntries] = useState<HOSEntry[]>(mockHOSData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<HOSEntry | null>(null);
  const [currentStatus, setCurrentStatus] = useState<'on-duty' | 'driving' | 'sleeper' | 'off-duty'>('off-duty');
  
  // Mock current day time entries
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { time: '06:00', status: 'on-duty', location: 'Home Terminal - Chicago, IL', notes: 'Pre-trip inspection' },
    { time: '07:30', status: 'driving', location: 'I-80 W, IL', notes: 'Departed for Milwaukee' },
    { time: '11:30', status: 'off-duty', location: 'Truck Stop - Milwaukee, WI', notes: '30-min break' },
    { time: '12:00', status: 'driving', location: 'I-94 W, WI' },
    { time: '16:00', status: 'off-duty', location: 'Delivery Location - Minneapolis, MN', notes: 'Unloading freight' }
  ]);

  const [newTimeEntry, setNewTimeEntry] = useState({
    time: new Date().toTimeString().slice(0, 5),
    status: 'off-duty' as 'on-duty' | 'driving' | 'sleeper' | 'off-duty',
    location: '',
    notes: ''
  });

  const filteredEntries = hosEntries.filter(entry => {
    const matchesSearch = entry.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.date.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Compliant</Badge>;
      case 'violation':
        return <Badge variant="destructive">Violation</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusButtonVariant = (status: string) => {
    switch (status) {
      case 'on-duty':
        return 'default';
      case 'driving':
        return 'default';
      case 'sleeper':
        return 'secondary';
      case 'off-duty':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleAddTimeEntry = () => {
    if (!newTimeEntry.location.trim()) {
      toast.error('Please enter a location');
      return;
    }

    const entry: TimeEntry = {
      time: newTimeEntry.time,
      status: newTimeEntry.status,
      location: newTimeEntry.location,
      notes: newTimeEntry.notes || undefined
    };

    setTimeEntries([...timeEntries, entry]);
    setCurrentStatus(newTimeEntry.status);
    setNewTimeEntry({
      time: new Date().toTimeString().slice(0, 5),
      status: 'off-duty',
      location: '',
      notes: ''
    });
    toast.success('Time entry added successfully');
  };

  const handleStatusChange = (status: 'on-duty' | 'driving' | 'sleeper' | 'off-duty') => {
    setCurrentStatus(status);
    setNewTimeEntry({ ...newTimeEntry, status });
  };

  const handleCertifyLog = (id: string) => {
    setHosEntries(entries =>
      entries.map(entry =>
        entry.id === id ? { ...entry, certificationStatus: 'certified' as const } : entry
      )
    );
    toast.success('HOS log certified successfully');
  };

  const handleDownloadLog = (id: string) => {
    toast.success('HOS log downloaded successfully');
  };

  const handleEditEntry = (entry: HOSEntry) => {
    setEditingEntry(entry);
  };

  const currentHours = {
    onDuty: '4:30',
    driving: '3:45',
    remaining: '7:15',
    sleeper: '0:00'
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">HOS Logs</h1>
        <p className="text-muted-foreground">Hours of Service tracking and compliance management</p>
      </div>

      {/* Current Status Dashboard */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Current Day Status
          </CardTitle>
          <CardDescription>Real-time HOS tracking for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{currentHours.onDuty}</div>
              <div className="text-sm text-muted-foreground">On Duty</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{currentHours.driving}</div>
              <div className="text-sm text-muted-foreground">Driving</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentHours.remaining}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">{currentHours.sleeper}</div>
              <div className="text-sm text-muted-foreground">Sleeper</div>
            </div>
          </div>

          {/* Status Change Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={currentStatus === 'off-duty' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('off-duty')}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Off Duty
            </Button>
            <Button
              variant={currentStatus === 'on-duty' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('on-duty')}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              On Duty
            </Button>
            <Button
              variant={currentStatus === 'driving' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('driving')}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Driving
            </Button>
            <Button
              variant={currentStatus === 'sleeper' ? 'default' : 'outline'}
              onClick={() => handleStatusChange('sleeper')}
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Sleeper Berth
            </Button>
          </div>

          {/* Quick Time Entry */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newTimeEntry.time}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, time: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={newTimeEntry.location}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Additional notes"
                value={newTimeEntry.notes}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, notes: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddTimeEntry} className="w-full">
                Add Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Time Entries */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Today's Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeEntries.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-foreground">{entry.time}</div>
                  <Badge variant={getStatusButtonVariant(entry.status) as unknown}>
                    {entry.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <div className="text-muted-foreground">{entry.location}</div>
                </div>
                {entry.notes && (
                  <div className="text-sm text-muted-foreground italic">{entry.notes}</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by driver, vehicle, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="violation">Violation</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddingEntry(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add HOS Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* HOS Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>HOS Log History</CardTitle>
          <CardDescription>Complete hours of service records and compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>On Duty</TableHead>
                  <TableHead>Driving</TableHead>
                  <TableHead>Sleeper</TableHead>
                  <TableHead>Miles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.date}</TableCell>
                    <TableCell>{entry.driverName}</TableCell>
                    <TableCell>{entry.vehicleNumber}</TableCell>
                    <TableCell>{entry.onDutyTime} - {entry.offDutyTime}</TableCell>
                    <TableCell>{entry.drivingTime}</TableCell>
                    <TableCell>{entry.sleeperTime}</TableCell>
                    <TableCell>{entry.totalMiles}</TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={entry.certificationStatus === 'certified' ? 'default' : 'secondary'}
                        className={entry.certificationStatus === 'certified' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                      >
                        {entry.certificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEntry(entry)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadLog(entry.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {entry.certificationStatus !== 'certified' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleCertifyLog(entry.id)}
                          >
                            Certify
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Violations Details */}
      {filteredEntries.some(entry => entry.violations) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-red-600">Violations & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEntries
                .filter(entry => entry.violations)
                .map((entry) => (
                  <div key={entry.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-red-800">
                        {entry.date} - {entry.driverName} ({entry.vehicleNumber})
                      </div>
                      <Badge variant="destructive">Violation</Badge>
                    </div>
                    <ul className="list-disc list-inside text-red-700">
                      {entry.violations!.map((violation, index) => (
                        <li key={index}>{violation}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HOSLogsPage;