import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, DollarSign, Users, Clock, FileText, Plus, Download, Upload, Calculator, Heart, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PayrollRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  payPeriod: string;
  hoursWorked: number;
  hourlyRate: number;
  overtime: number;
  commission: number;
  grossPay: number;
  taxes: number;
  deductions: number;
  netPay: number;
  status: 'draft' | 'processed' | 'paid';
}

interface BenefitPlan {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'retirement' | 'life' | 'disability';
  provider: string;
  monthlyPremium: number;
  employerContribution: number;
  employeeContribution: number;
  coverage: string;
  enrolledEmployees: number;
  totalEmployees: number;
}

interface TimeEntry {
  id: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  overtimeHours: number;
  status: 'approved' | 'pending' | 'rejected';
}

const payrollData: PayrollRecord[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP001',
    department: 'Operations',
    payPeriod: '2024-01-01 to 2024-01-15',
    hoursWorked: 80,
    hourlyRate: 35,
    overtime: 5,
    commission: 2500,
    grossPay: 3327.50,
    taxes: 832,
    deductions: 245,
    netPay: 2250.50,
    status: 'paid'
  },
  {
    id: '2',
    employeeName: 'Mike Rodriguez',
    employeeId: 'EMP002',
    department: 'Sales',
    payPeriod: '2024-01-01 to 2024-01-15',
    hoursWorked: 80,
    hourlyRate: 28,
    overtime: 8,
    commission: 8500,
    grossPay: 10940,
    taxes: 2735,
    deductions: 320,
    netPay: 7885,
    status: 'processed'
  },
  {
    id: '3',
    employeeName: 'Lisa Chen',
    employeeId: 'EMP003',
    department: 'Customer Service',
    payPeriod: '2024-01-01 to 2024-01-15',
    hoursWorked: 80,
    hourlyRate: 24,
    overtime: 2,
    commission: 0,
    grossPay: 2004,
    taxes: 501,
    deductions: 180,
    netPay: 1323,
    status: 'draft'
  }
];

const benefitPlans: BenefitPlan[] = [
  {
    id: '1',
    name: 'Premium Health Plan',
    type: 'health',
    provider: 'Blue Cross Blue Shield',
    monthlyPremium: 650,
    employerContribution: 520,
    employeeContribution: 130,
    coverage: 'Individual + Family',
    enrolledEmployees: 45,
    totalEmployees: 89
  },
  {
    id: '2',
    name: 'Basic Dental Plan',
    type: 'dental',
    provider: 'Delta Dental',
    monthlyPremium: 85,
    employerContribution: 60,
    employeeContribution: 25,
    coverage: 'Individual',
    enrolledEmployees: 78,
    totalEmployees: 89
  },
  {
    id: '3',
    name: '401(k) Retirement Plan',
    type: 'retirement',
    provider: 'Fidelity',
    monthlyPremium: 0,
    employerContribution: 0,
    employeeContribution: 0,
    coverage: '6% match',
    enrolledEmployees: 67,
    totalEmployees: 89
  },
  {
    id: '4',
    name: 'Life Insurance',
    type: 'life',
    provider: 'MetLife',
    monthlyPremium: 45,
    employerContribution: 45,
    employeeContribution: 0,
    coverage: '2x Annual Salary',
    enrolledEmployees: 89,
    totalEmployees: 89
  }
];

const timeEntries: TimeEntry[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    date: '2024-01-15',
    clockIn: '08:00',
    clockOut: '17:30',
    totalHours: 8.5,
    overtimeHours: 0.5,
    status: 'approved'
  },
  {
    id: '2',
    employeeName: 'Mike Rodriguez',
    date: '2024-01-15',
    clockIn: '07:30',
    clockOut: '18:00',
    totalHours: 9.5,
    overtimeHours: 1.5,
    status: 'pending'
  },
  {
    id: '3',
    employeeName: 'Lisa Chen',
    date: '2024-01-15',
    clockIn: '09:00',
    clockOut: '17:00',
    totalHours: 8,
    overtimeHours: 0,
    status: 'approved'
  }
];

const PayrollBenefits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [isRunPayrollOpen, setIsRunPayrollOpen] = useState(false);
  const { toast } = useToast();

  const filteredPayroll = payrollData.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Processing Started",
      description: "Payroll is being processed and will be completed shortly."
    });
    setIsRunPayrollOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge className="bg-green-500">Paid</Badge>;
      case 'processed': return <Badge className="bg-blue-500">Processed</Badge>;
      case 'draft': return <Badge variant="secondary">Draft</Badge>;
      case 'approved': return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending': return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case 'health': return <Heart className="h-4 w-4" />;
      case 'dental': return <Shield className="h-4 w-4" />;
      case 'vision': return <Shield className="h-4 w-4" />;
      case 'retirement': return <DollarSign className="h-4 w-4" />;
      case 'life': return <Shield className="h-4 w-4" />;
      case 'disability': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const totalGrossPay = payrollData.reduce((sum, record) => sum + record.grossPay, 0);
  const totalNetPay = payrollData.reduce((sum, record) => sum + record.netPay, 0);
  const totalTaxes = payrollData.reduce((sum, record) => sum + record.taxes, 0);
  const totalDeductions = payrollData.reduce((sum, record) => sum + record.deductions, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll & Benefits</h1>
          <p className="text-muted-foreground">Manage payroll processing, timesheets, and employee benefits</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isRunPayrollOpen} onOpenChange={setIsRunPayrollOpen}>
            <DialogTrigger asChild>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Run Payroll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Run Payroll</DialogTitle>
                <DialogDescription>Process payroll for the current pay period</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Pay Period</Label>
                    <Select defaultValue="current">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Period (Jan 1-15)</SelectItem>
                        <SelectItem value="previous">Previous Period (Dec 16-31)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Employees</Label>
                    <div className="p-2 bg-muted rounded text-sm">89 employees</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Gross Pay</Label>
                    <div className="text-lg font-semibold">${totalGrossPay.toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <Label>Total Net Pay</Label>
                    <div className="text-lg font-semibold">${totalNetPay.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRunPayrollOpen(false)}>Cancel</Button>
                <Button onClick={handleRunPayroll}>Process Payroll</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross Pay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalGrossPay.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current pay period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Net Pay</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalNetPay.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">After taxes & deductions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Benefits Enrolled</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Employee participation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payroll">Payroll Records</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select pay period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Period</SelectItem>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payroll Records */}
          <div className="space-y-4">
            {filteredPayroll.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{record.employeeName}</h3>
                          <p className="text-muted-foreground">{record.employeeId} • {record.department}</p>
                          <p className="text-sm text-muted-foreground">{record.payPeriod}</p>
                        </div>
                        {getStatusBadge(record.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Hours Worked</p>
                          <p className="text-lg font-semibold">{record.hoursWorked}h</p>
                          {record.overtime > 0 && (
                            <p className="text-xs text-yellow-600">+{record.overtime}h OT</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Gross Pay</p>
                          <p className="text-lg font-semibold">${record.grossPay.toLocaleString()}</p>
                          {record.commission > 0 && (
                            <p className="text-xs text-green-600">+${record.commission.toLocaleString()} commission</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Deductions</p>
                          <p className="text-lg font-semibold">${(record.taxes + record.deductions).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            ${record.taxes} taxes, ${record.deductions} benefits
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Net Pay</p>
                          <p className="text-lg font-semibold text-green-600">${record.netPay.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timesheets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Time Tracking</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Hours
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{entry.employeeName}</h4>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Clock In</p>
                        <p className="font-medium">{entry.clockIn}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Clock Out</p>
                        <p className="font-medium">{entry.clockOut}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                        <p className="font-medium">{entry.totalHours}h</p>
                        {entry.overtimeHours > 0 && (
                          <p className="text-xs text-yellow-600">+{entry.overtimeHours}h OT</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(entry.status)}
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Benefits Administration</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit Plan
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefitPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getBenefitIcon(plan.type)}
                      <div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <CardDescription>{plan.provider}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{plan.type}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Coverage</span>
                      <span className="text-sm font-medium">{plan.coverage}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Premium</span>
                      <span className="text-sm font-medium">${plan.monthlyPremium}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employer Contribution</span>
                      <span className="text-sm font-medium">${plan.employerContribution}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employee Contribution</span>
                      <span className="text-sm font-medium">${plan.employeeContribution}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Enrollment</span>
                      <span className="text-sm font-medium">
                        {plan.enrolledEmployees}/{plan.totalEmployees} employees
                      </span>
                    </div>
                    <Progress 
                      value={(plan.enrolledEmployees / plan.totalEmployees) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit Plan</Button>
                    <Button variant="outline" size="sm" className="flex-1">View Enrollees</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Summary Report</CardTitle>
                <CardDescription>Generate comprehensive payroll reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Quarter</SelectItem>
                      <SelectItem value="previous">Previous Quarter</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Benefits Utilization Report</CardTitle>
                <CardDescription>Analyze benefits enrollment and costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Benefit Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select benefit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Benefits</SelectItem>
                      <SelectItem value="health">Health Insurance</SelectItem>
                      <SelectItem value="dental">Dental Insurance</SelectItem>
                      <SelectItem value="retirement">Retirement Plans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollBenefits;