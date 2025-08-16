/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DollarSign, Users, Calendar, Calculator, FileText, CreditCard, Receipt, TrendingUp, AlertTriangle, CheckCircle, Download, Upload, Settings, Plus, Edit, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PayrollManagementPage = () => {
  const [payrollStatus, setPayrollStatus] = useState('processing');

  const payrollSummary = [
    { metric: 'Total Employees', value: '37', change: '+2', trend: 'up' },
    { metric: 'Total Payroll', value: '$145,280', change: '+5.2%', trend: 'up' },
    { metric: 'Pending Approvals', value: '8', change: '-3', trend: 'down' },
    { metric: 'Next Pay Date', value: 'Jan 31', change: '5 days', trend: 'neutral' }
  ];

  const employees = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Fleet Manager',
      employeeId: 'EMP001',
      department: 'Operations',
      payType: 'Salary',
      basePay: 75000,
      overtime: 1250,
      bonuses: 2000,
      deductions: 890,
      netPay: 8640,
      status: 'approved',
      hoursWorked: 160,
      payPeriod: '01/01 - 01/15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Dispatcher',
      employeeId: 'EMP002',
      department: 'Dispatch',
      payType: 'Hourly',
      basePay: 25,
      overtime: 875,
      bonuses: 500,
      deductions: 456,
      netPay: 3570,
      status: 'pending',
      hoursWorked: 168,
      payPeriod: '01/01 - 01/15'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      position: 'Driver',
      employeeId: 'DR001',
      department: 'Transportation',
      payType: 'Per Mile',
      basePay: 0.65,
      overtime: 0,
      bonuses: 750,
      deductions: 234,
      netPay: 4820,
      status: 'approved',
      hoursWorked: 172,
      payPeriod: '01/01 - 01/15'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      position: 'Accountant',
      employeeId: 'EMP003',
      department: 'Finance',
      payType: 'Salary',
      basePay: 65000,
      overtime: 0,
      bonuses: 1000,
      deductions: 678,
      netPay: 5950,
      status: 'review',
      hoursWorked: 160,
      payPeriod: '01/01 - 01/15'
    }
  ];

  const payrollHistory = [
    {
      id: 1,
      payPeriod: '12/16/2023 - 12/31/2023',
      totalAmount: '$142,580',
      employeeCount: 35,
      status: 'completed',
      processedDate: '2024-01-02',
      processedBy: 'Admin System'
    },
    {
      id: 2,
      payPeriod: '12/01/2023 - 12/15/2023',
      totalAmount: '$138,920',
      employeeCount: 35,
      status: 'completed',
      processedDate: '2023-12-18',
      processedBy: 'HR Manager'
    },
    {
      id: 3,
      payPeriod: '11/16/2023 - 11/30/2023',
      totalAmount: '$141,360',
      employeeCount: 34,
      status: 'completed',
      processedDate: '2023-12-04',
      processedBy: 'HR Manager'
    }
  ];

  const taxSettings = [
    { name: 'Federal Income Tax', rate: '22%', amount: '$28,456', status: 'current' },
    { name: 'State Income Tax', rate: '6.5%', amount: '$8,234', status: 'current' },
    { name: 'Social Security', rate: '6.2%', amount: '$7,890', status: 'current' },
    { name: 'Medicare', rate: '1.45%', amount: '$1,845', status: 'current' },
    { name: 'Unemployment Tax', rate: '0.6%', amount: '$720', status: 'current' }
  ];

  const benefitsDeductions = [
    { name: 'Health Insurance', type: 'Medical', employeeContrib: '$150', companyContrib: '$350', total: '$500' },
    { name: 'Dental Insurance', type: 'Medical', employeeContrib: '$25', companyContrib: '$75', total: '$100' },
    { name: '401(k) Plan', type: 'Retirement', employeeContrib: '$200', companyContrib: '$100', total: '$300' },
    { name: 'Life Insurance', type: 'Insurance', employeeContrib: '$15', companyContrib: '$35', total: '$50' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'review': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'completed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'processing': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee compensation, benefits, and payroll processing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Payroll
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {payrollSummary.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-3 w-3 ${getTrendColor(item.trend)}`} />
                    <span className={`text-xs ${getTrendColor(item.trend)}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="current">Current Period</TabsTrigger>
          <TabsTrigger value="employees">Employee Pay</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
          <TabsTrigger value="taxes">Taxes & Benefits</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Payroll Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Pay Period (January 1-15, 2024)</CardTitle>
                <Badge className={getStatusColor(payrollStatus)}>
                  {payrollStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Gross Pay</span>
                    <span className="font-medium">$165,840</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Deductions</span>
                    <span className="font-medium">$34,560</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Net Pay</span>
                    <span className="font-medium text-emerald-600">$131,280</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Employees Paid</span>
                    <span className="font-medium">29/37</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pending Approvals</span>
                    <span className="font-medium text-yellow-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pay Date</span>
                    <span className="font-medium">January 31, 2024</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Payroll Progress</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Pending Payroll
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time & Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Hours</span>
                    <span className="font-medium">5,920</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Regular Hours</span>
                    <span className="font-medium">5,480</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Overtime Hours</span>
                    <span className="font-medium">440</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Timesheet
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Direct Deposits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Setup Complete</span>
                    <span className="font-medium">35/37</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Setup</span>
                    <span className="font-medium text-yellow-600">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Time</span>
                    <span className="font-medium">1-2 days</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Accounts
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tax Compliance</span>
                    <span className="font-medium text-emerald-600">✓ Current</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Labor Law</span>
                    <span className="font-medium text-emerald-600">✓ Compliant</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Filing</span>
                    <span className="font-medium">Feb 15</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Requirements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Employee Payroll Details</h3>
            <Dialog>
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
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Employee ID</Label>
                    <Input placeholder="Enter employee ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input placeholder="Enter position" />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="dispatch">Dispatch</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pay Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="per-mile">Per Mile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Base Pay</Label>
                    <Input placeholder="Enter base pay amount" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Employee</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Pay Type</TableHead>
                    <TableHead>Hours/Miles</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.position}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{employee.payType}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{employee.hoursWorked}h</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${(employee.basePay + employee.overtime + employee.bonuses).toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600">${employee.deductions}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-emerald-600">${employee.netPay.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Receipt className="h-4 w-4" />
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

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Payroll History</h3>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export History
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Processed By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{record.payPeriod}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-emerald-600">{record.totalAmount}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{record.employeeCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.processedDate}</TableCell>
                      <TableCell>{record.processedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="taxes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Withholdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxSettings.map((tax, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{tax.name}</p>
                        <p className="text-sm text-muted-foreground">Rate: {tax.rate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tax.amount}</p>
                        <Badge className={`${getStatusColor(tax.status)} text-xs`}>
                          {tax.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits & Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefitsDeductions.map((benefit, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{benefit.name}</p>
                        <Badge variant="outline">{benefit.type}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Employee:</span>
                          <p className="font-medium">{benefit.employeeContrib}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Company:</span>
                          <p className="font-medium">{benefit.companyContrib}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>
                          <p className="font-medium">{benefit.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pay Period</Label>
                  <Select defaultValue="bi-weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pay Day</Label>
                  <Select defaultValue="friday">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto-approve Timesheets</Label>
                    <p className="text-xs text-muted-foreground">Automatically approve regular timesheets</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Direct Deposit</Label>
                    <p className="text-xs text-muted-foreground">Enable direct deposit payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Payroll Reminders</Label>
                    <p className="text-xs text-muted-foreground">Send payroll processing reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Employee Notifications</Label>
                    <p className="text-xs text-muted-foreground">Notify employees of pay stubs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Tax Alerts</Label>
                    <p className="text-xs text-muted-foreground">Alert for tax filing deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input defaultValue="payroll@company.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollManagementPage;