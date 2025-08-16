/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  DollarSign, 
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  Download,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PayrollPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Payroll data
  const payrollStats = {
    totalEmployees: 48,
    monthlyPayroll: 245600,
    taxLiability: 58400,
    benefitsCost: 42300,
    pendingApprovals: 5,
    nextPayDate: '2024-07-15'
  };

  const employees = [
    { id: 1, name: 'John Smith', role: 'Driver', rate: 28.50, hours: 45, gross: 1282.50, status: 'approved' },
    { id: 2, name: 'Sarah Johnson', role: 'Dispatcher', rate: 24.00, hours: 40, gross: 960.00, status: 'pending' },
    { id: 3, name: 'Mike Davis', role: 'Driver', rate: 30.00, hours: 48, gross: 1440.00, status: 'approved' },
    { id: 4, name: 'Lisa Wilson', role: 'Mechanic', rate: 32.00, hours: 40, gross: 1280.00, status: 'approved' },
    { id: 5, name: 'Robert Brown', role: 'Driver', rate: 29.00, hours: 42, gross: 1218.00, status: 'pending' }
  ];

  const taxWithholdings = [
    { type: 'Federal Income Tax', amount: 28650, percentage: 12.3 },
    { type: 'State Income Tax', amount: 12400, percentage: 5.3 },
    { type: 'Social Security', amount: 10890, percentage: 4.7 },
    { type: 'Medicare', amount: 3560, percentage: 1.5 },
    { type: 'Unemployment', amount: 2900, percentage: 1.2 }
  ];

  const benefits = [
    { name: 'Health Insurance', enrolled: 42, cost: 24500, status: 'active' },
    { name: 'Dental Insurance', enrolled: 38, cost: 5200, status: 'active' },
    { name: '401(k) Plan', enrolled: 35, cost: 8900, status: 'active' },
    { name: 'Life Insurance', enrolled: 45, cost: 3700, status: 'active' }
  ];

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Processing Started",
      description: "Payroll for 48 employees is being processed. You'll receive a notification when complete.",
    });
  };

  const handleApproveTimesheet = (employeeId: number) => {
    toast({
      title: "Timesheet Approved",
      description: `Timesheet approved and ready for payroll processing.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee payroll, benefits, and tax withholdings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={handleRunPayroll}>
            <Play className="h-4 w-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Payroll Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <Badge variant="outline">{payrollStats.pendingApprovals} Pending</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Total Employees</h3>
              <p className="text-2xl font-bold">{payrollStats.totalEmployees}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-50">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant="default">+8.2%</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Monthly Payroll</h3>
              <p className="text-2xl font-bold">${payrollStats.monthlyPayroll.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-50">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <Badge variant="secondary">Due Soon</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Tax Liability</h3>
              <p className="text-2xl font-bold">${payrollStats.taxLiability.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-50">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant="outline">+5.1%</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Benefits Cost</h3>
              <p className="text-2xl font-bold">${payrollStats.benefitsCost.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
          <TabsTrigger value="taxes">Tax Withholdings</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Payroll</CardTitle>
              <CardDescription>Current payroll period: July 1-15, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-50">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role} • ${employee.rate}/hr</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${employee.gross.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{employee.hours} hours</p>
                      </div>
                      {getStatusBadge(employee.status)}
                      {employee.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleApproveTimesheet(employee.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timesheets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timesheet Approvals</CardTitle>
              <CardDescription>Review and approve employee timesheets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.filter(emp => emp.status === 'pending').map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-yellow-50">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">Submitted: July 14, 2024 • {employee.hours} hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Review</Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveTimesheet(employee.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Withholdings</CardTitle>
              <CardDescription>Current period tax calculations and withholdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxWithholdings.map((tax, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-orange-50">
                        <FileText className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{tax.type}</p>
                        <p className="text-sm text-muted-foreground">{tax.percentage}% of gross pay</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${tax.amount.toLocaleString()}</p>
                      <Progress value={tax.percentage * 8} className="w-24 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Benefits</CardTitle>
              <CardDescription>Benefits enrollment and costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-purple-50">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{benefit.name}</p>
                        <p className="text-sm text-muted-foreground">{benefit.enrolled} employees enrolled</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${benefit.cost.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Monthly cost</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payroll Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex flex-col items-center justify-center gap-2"
          onClick={handleRunPayroll}
        >
          <Play className="h-5 w-5" />
          <span className="text-sm">Process Payroll</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
          <Download className="h-5 w-5" />
          <span className="text-sm">Export Reports</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="text-sm">Tax Documents</span>
        </Button>
      </div>
    </div>
  );
};

export default PayrollPage;