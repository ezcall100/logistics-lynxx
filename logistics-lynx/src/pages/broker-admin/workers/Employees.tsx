import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  MoreHorizontal,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock employee data
  const employees = [
    {
      id: 1,
      name: 'Emily Johnson',
      email: 'emily.johnson@freightbroker.com',
      phone: '(555) 201-2001',
      position: 'Senior Dispatcher',
      department: 'Operations',
      manager: 'Sarah Mitchell',
      status: 'active',
      hireDate: '2022-03-15',
      salary: 65000,
      performance: 94,
      location: 'Chicago, IL',
      experience: '5 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO'],
      skills: ['Load Planning', 'Customer Service', 'ELD Systems'],
      avatar: '/avatars/emily-johnson.jpg'
    },
    {
      id: 2,
      name: 'Marcus Williams',
      email: 'marcus.williams@freightbroker.com',
      phone: '(555) 201-2002',
      position: 'Operations Coordinator',
      department: 'Operations',
      manager: 'Sarah Mitchell',
      status: 'active',
      hireDate: '2023-01-20',
      salary: 58000,
      performance: 88,
      location: 'Chicago, IL',
      experience: '3 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO'],
      skills: ['Documentation', 'Carrier Relations', 'Route Optimization'],
      avatar: '/avatars/marcus-williams.jpg'
    },
    {
      id: 3,
      name: 'Rachel Torres',
      email: 'rachel.torres@freightbroker.com',
      phone: '(555) 201-2003',
      position: 'Customer Service Representative',
      department: 'Customer Service',
      manager: 'Lisa Park',
      status: 'active',
      hireDate: '2022-08-10',
      salary: 48000,
      performance: 91,
      location: 'Los Angeles, CA',
      experience: '2 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO'],
      skills: ['Customer Relations', 'Problem Solving', 'CRM Systems'],
      avatar: '/avatars/rachel-torres.jpg'
    },
    {
      id: 4,
      name: 'Kevin Chang',
      email: 'kevin.chang@freightbroker.com',
      phone: '(555) 201-2004',
      position: 'Financial Analyst',
      department: 'Finance',
      manager: 'David Thompson',
      status: 'active',
      hireDate: '2021-11-05',
      salary: 72000,
      performance: 96,
      location: 'New York, NY',
      experience: '4 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO', 'Stock Options'],
      skills: ['Financial Modeling', 'Excel', 'Data Analysis'],
      avatar: '/avatars/kevin-chang.jpg'
    },
    {
      id: 5,
      name: 'Amanda Foster',
      email: 'amanda.foster@freightbroker.com',
      phone: '(555) 201-2005',
      position: 'HR Specialist',
      department: 'Human Resources',
      manager: 'Jennifer Rodriguez',
      status: 'on-leave',
      hireDate: '2020-06-12',
      salary: 55000,
      performance: 89,
      location: 'Austin, TX',
      experience: '6 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO'],
      skills: ['Recruitment', 'Employee Relations', 'HRIS'],
      avatar: '/avatars/amanda-foster.jpg'
    },
    {
      id: 6,
      name: 'James Rodriguez',
      email: 'james.rodriguez@freightbroker.com',
      phone: '(555) 201-2006',
      position: 'Software Developer',
      department: 'Technology',
      manager: 'Jennifer Rodriguez',
      status: 'active',
      hireDate: '2023-02-28',
      salary: 85000,
      performance: 93,
      location: 'Austin, TX',
      experience: '3 years',
      workingHours: 'Full-time',
      benefits: ['Health Insurance', '401k', 'PTO', 'Stock Options'],
      skills: ['React', 'Node.js', 'Database Design'],
      avatar: '/avatars/james-rodriguez.jpg'
    }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'on-leave': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'on-leave': return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case 'inactive': return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Employee Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Managing {employees.length} employees across {departments.length} departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Job title" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" placeholder="Direct manager" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="employee@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input id="salary" type="number" placeholder="65000" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Employee
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Employee Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeEmployees} active
            </p>
            <Progress value={(activeEmployees / employees.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSalary / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Annual salaries</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Company average</p>
            <Progress value={avgPerformance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees by name, position, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Employee Directory ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {employee.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {employee.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.position}</p>
                      <p className="text-sm text-muted-foreground">${employee.salary.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>{employee.manager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={employee.performance} className="w-16" />
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(employee.status)}
                      {getStatusBadge(employee.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Review
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Adjust Salary
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;