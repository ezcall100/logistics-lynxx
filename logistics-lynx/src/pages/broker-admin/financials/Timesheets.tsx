import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Plus,
  Search,
  Filter,
  Download,
  Clock,
  Calendar as CalendarIcon,
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  Edit,
  Eye,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Timesheets = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newTimesheet, setNewTimesheet] = useState({
    employeeId: '',
    date: '',
    hoursWorked: '',
    overtimeHours: '',
    projectCode: '',
    description: '',
    hourlyRate: ''
  });

  // Sample timesheets data
  const timesheets = [
    {
      id: '1',
      employeeId: 'EMP-001',
      employeeName: 'John Smith',
      department: 'Operations',
      weekOf: '2024-01-15',
      hoursWorked: 40.0,
      overtimeHours: 5.0,
      totalHours: 45.0,
      hourlyRate: 25.00,
      overtimeRate: 37.50,
      regularPay: 1000.00,
      overtimePay: 187.50,
      totalPay: 1187.50,
      status: 'approved',
      submittedDate: '2024-01-19',
      approvedDate: '2024-01-20',
      approvedBy: 'Sarah Johnson',
      projectCodes: ['PROJ-001', 'PROJ-003']
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      employeeName: 'Maria Garcia',
      department: 'Customer Service',
      weekOf: '2024-01-15',
      hoursWorked: 40.0,
      overtimeHours: 0,
      totalHours: 40.0,
      hourlyRate: 22.00,
      overtimeRate: 33.00,
      regularPay: 880.00,
      overtimePay: 0,
      totalPay: 880.00,
      status: 'pending',
      submittedDate: '2024-01-19',
      approvedDate: null,
      approvedBy: null,
      projectCodes: ['PROJ-002']
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      employeeName: 'David Wilson',
      department: 'Dispatch',
      weekOf: '2024-01-15',
      hoursWorked: 38.5,
      overtimeHours: 0,
      totalHours: 38.5,
      hourlyRate: 28.00,
      overtimeRate: 42.00,
      regularPay: 1078.00,
      overtimePay: 0,
      totalPay: 1078.00,
      status: 'approved',
      submittedDate: '2024-01-19',
      approvedDate: '2024-01-20',
      approvedBy: 'Sarah Johnson',
      projectCodes: ['PROJ-001', 'PROJ-004']
    },
    {
      id: '4',
      employeeId: 'EMP-004',
      employeeName: 'Lisa Chen',
      department: 'Administration',
      weekOf: '2024-01-15',
      hoursWorked: 40.0,
      overtimeHours: 2.5,
      totalHours: 42.5,
      hourlyRate: 26.00,
      overtimeRate: 39.00,
      regularPay: 1040.00,
      overtimePay: 97.50,
      totalPay: 1137.50,
      status: 'rejected',
      submittedDate: '2024-01-19',
      approvedDate: null,
      approvedBy: null,
      projectCodes: ['PROJ-002', 'PROJ-005']
    },
    {
      id: '5',
      employeeId: 'EMP-005',
      employeeName: 'Robert Brown',
      department: 'Operations',
      weekOf: '2024-01-15',
      hoursWorked: 40.0,
      overtimeHours: 8.0,
      totalHours: 48.0,
      hourlyRate: 30.00,
      overtimeRate: 45.00,
      regularPay: 1200.00,
      overtimePay: 360.00,
      totalPay: 1560.00,
      status: 'pending',
      submittedDate: '2024-01-19',
      approvedDate: null,
      approvedBy: null,
      projectCodes: ['PROJ-001', 'PROJ-003', 'PROJ-006']
    },
  ];

  // Sample employees for dropdown
  const employees = [
    { id: 'EMP-001', name: 'John Smith', department: 'Operations' },
    { id: 'EMP-002', name: 'Maria Garcia', department: 'Customer Service' },
    { id: 'EMP-003', name: 'David Wilson', department: 'Dispatch' },
    { id: 'EMP-004', name: 'Lisa Chen', department: 'Administration' },
    { id: 'EMP-005', name: 'Robert Brown', department: 'Operations' },
  ];

  const statusOptions = ['all', 'pending', 'approved', 'rejected'];

  const filteredTimesheets = timesheets.filter(timesheet => {
    const matchesSearch = timesheet.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         timesheet.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || timesheet.status === selectedStatus;
    const matchesEmployee = selectedEmployee === 'all' || timesheet.employeeId === selectedEmployee;
    return matchesSearch && matchesStatus && matchesEmployee;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleAddTimesheet = () => {
    toast({
      title: "Timesheet Added",
      description: "Timesheet entry has been created successfully.",
    });
    setIsAddDialogOpen(false);
    setNewTimesheet({
      employeeId: '',
      date: '',
      hoursWorked: '',
      overtimeHours: '',
      projectCode: '',
      description: '',
      hourlyRate: ''
    });
  };

  const handleApproveTimesheet = (timesheetId: string) => {
    toast({
      title: "Timesheet Approved",
      description: "Timesheet has been approved and processed for payroll.",
    });
  };

  // Calculate summary statistics
  const totalHours = timesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  const totalPay = timesheets.reduce((sum, ts) => sum + ts.totalPay, 0);
  const pendingCount = timesheets.filter(ts => ts.status === 'pending').length;
  const totalEmployees = new Set(timesheets.map(ts => ts.employeeId)).size;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Timesheets</h1>
            <p className="text-muted-foreground">
              Track and manage employee work hours and time entries
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Timesheet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Timesheet Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="employee">Employee</Label>
                  <Select value={newTimesheet.employeeId} onValueChange={(value) => setNewTimesheet({...newTimesheet, employeeId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hoursWorked">Regular Hours</Label>
                    <Input
                      id="hoursWorked"
                      type="number"
                      step="0.25"
                      value={newTimesheet.hoursWorked}
                      onChange={(e) => setNewTimesheet({...newTimesheet, hoursWorked: e.target.value})}
                      placeholder="8.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="overtimeHours">Overtime Hours</Label>
                    <Input
                      id="overtimeHours"
                      type="number"
                      step="0.25"
                      value={newTimesheet.overtimeHours}
                      onChange={(e) => setNewTimesheet({...newTimesheet, overtimeHours: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="projectCode">Project Code</Label>
                  <Input
                    id="projectCode"
                    value={newTimesheet.projectCode}
                    onChange={(e) => setNewTimesheet({...newTimesheet, projectCode: e.target.value})}
                    placeholder="e.g., PROJ-001"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTimesheet.description}
                    onChange={(e) => setNewTimesheet({...newTimesheet, description: e.target.value})}
                    placeholder="Work description..."
                  />
                </div>
                <Button onClick={handleAddTimesheet} className="w-full">
                  Add Timesheet Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <p className="text-lg font-bold">
                    {totalHours.toFixed(1)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(totalPay)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {pendingCount}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                  <p className="text-lg font-bold">
                    {totalEmployees}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Timesheet Records</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search timesheets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-48">
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Week Of</TableHead>
                  <TableHead className="text-right">Regular Hours</TableHead>
                  <TableHead className="text-right">Overtime</TableHead>
                  <TableHead className="text-right">Total Hours</TableHead>
                  <TableHead className="text-right">Total Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{timesheet.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{timesheet.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(timesheet.weekOf), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {timesheet.hoursWorked.toFixed(1)}h
                    </TableCell>
                    <TableCell className="text-right font-medium text-orange-600">
                      {timesheet.overtimeHours > 0 ? `${timesheet.overtimeHours.toFixed(1)}h` : '-'}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {timesheet.totalHours.toFixed(1)}h
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(timesheet.totalPay)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(timesheet.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {timesheet.approvedBy || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {timesheet.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleApproveTimesheet(timesheet.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Timesheets;