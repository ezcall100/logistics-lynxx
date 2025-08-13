import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  UserPlus,
  Search,
  Edit3,
  Trash2,
  DollarSign,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2
} from 'lucide-react';

const PayrollEmployeesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const employees = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '(555) 123-4567',
      position: 'Driver',
      department: 'Operations',
      employeeId: 'EMP001',
      hireDate: '2023-03-15',
      status: 'active',
      payType: 'hourly',
      payRate: 22.50,
      address: '123 Main St, City, State 12345',
      benefits: ['Health Insurance', 'Dental', '401k'],
      taxInfo: {
        filingStatus: 'Single',
        allowances: 2,
        additionalWithholding: 0
      }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '(555) 234-5678',
      position: 'Dispatcher',
      department: 'Operations',
      employeeId: 'EMP002',
      hireDate: '2023-01-10',
      status: 'active',
      payType: 'hourly',
      payRate: 18.00,
      address: '456 Oak Ave, City, State 12345',
      benefits: ['Health Insurance', '401k'],
      taxInfo: {
        filingStatus: 'Married',
        allowances: 3,
        additionalWithholding: 50
      }
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      phone: '(555) 345-6789',
      position: 'Mechanic',
      department: 'Maintenance',
      employeeId: 'EMP003',
      hireDate: '2022-11-20',
      status: 'active',
      payType: 'hourly',
      payRate: 25.00,
      address: '789 Pine St, City, State 12345',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k'],
      taxInfo: {
        filingStatus: 'Married',
        allowances: 4,
        additionalWithholding: 100
      }
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      phone: '(555) 456-7890',
      position: 'Office Manager',
      department: 'Administration',
      employeeId: 'EMP004',
      hireDate: '2023-05-08',
      status: 'active',
      payType: 'salary',
      payRate: 45000,
      address: '321 Elm Dr, City, State 12345',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'Life Insurance'],
      taxInfo: {
        filingStatus: 'Single',
        allowances: 1,
        additionalWithholding: 0
      }
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      phone: '(555) 567-8901',
      position: 'Driver',
      department: 'Operations',
      employeeId: 'EMP005',
      hireDate: '2023-02-14',
      status: 'inactive',
      payType: 'hourly',
      payRate: 23.00,
      address: '654 Maple Ln, City, State 12345',
      benefits: ['Health Insurance'],
      taxInfo: {
        filingStatus: 'Single',
        allowances: 1,
        additionalWithholding: 25
      }
    }
  ];

  const formatCurrency = (amount: number, isHourly = false) => {
    if (isHourly) {
      return `$${amount.toFixed(2)}/hr`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteEmployee = (employeeId: string) => {
    toast({
      title: "Employee removed",
      description: "Employee has been removed from payroll system.",
    });
  };

  return (
    <UltraModernLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll Employees</h1>
            <p className="text-muted-foreground">Manage employee information and payroll details</p>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="payroll">Payroll</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter full address" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="employment" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input id="employeeId" placeholder="Enter employee ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hireDate">Hire Date</Label>
                      <Input id="hireDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="driver">Driver</SelectItem>
                          <SelectItem value="dispatcher">Dispatcher</SelectItem>
                          <SelectItem value="mechanic">Mechanic</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="payroll" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payType">Pay Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pay type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payRate">Pay Rate</Label>
                      <Input id="payRate" type="number" placeholder="Enter pay rate" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filingStatus">Tax Filing Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select filing status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="head-of-household">Head of Household</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowances">Tax Allowances</Label>
                      <Input id="allowances" type="number" placeholder="Number of allowances" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Select Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="health" />
                        <Label htmlFor="health">Health Insurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dental" />
                        <Label htmlFor="dental">Dental Insurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="vision" />
                        <Label htmlFor="vision">Vision Insurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="401k" />
                        <Label htmlFor="401k">401(k) Plan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="life" />
                        <Label htmlFor="life">Life Insurance</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setIsAddEmployeeOpen(false);
                      toast({
                        title: "Employee added",
                        description: "New employee has been added to the payroll system.",
                      });
                    }}>
                      Add Employee
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{employees.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {employees.filter(emp => emp.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Avg Hourly Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                ${(employees.filter(emp => emp.payType === 'hourly').reduce((sum, emp) => sum + emp.payRate, 0) / employees.filter(emp => emp.payType === 'hourly').length).toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">
                {new Set(employees.map(emp => emp.department)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Directory
              </CardTitle>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-[300px]"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Employee</th>
                    <th className="text-left p-3 font-medium">Position</th>
                    <th className="text-left p-3 font-medium">Department</th>
                    <th className="text-center p-3 font-medium">Hire Date</th>
                    <th className="text-right p-3 font-medium">Pay Rate</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {employee.email}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-sm text-muted-foreground">ID: {employee.employeeId}</div>
                      </td>
                      <td className="p-3 text-muted-foreground">{employee.department}</td>
                      <td className="p-3 text-center text-muted-foreground">{formatDate(employee.hireDate)}</td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(employee.payRate, employee.payType === 'hourly')}
                        <div className="text-xs text-muted-foreground capitalize">{employee.payType}</div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </UltraModernLayout>
  );
};

export default PayrollEmployeesPage;