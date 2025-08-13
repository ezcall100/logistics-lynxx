import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, DollarSign, Calendar, Users, CheckCircle, Clock, AlertTriangle, Calculator, FileText, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRunPayrollForm, setShowRunPayrollForm] = useState(false);

  // Sample payroll data
  const [payrollRuns] = useState([
    {
      id: "PAY-001",
      payPeriod: "Jan 1-15, 2024",
      payDate: "2024-01-16",
      employees: 12,
      grossPay: 28450.00,
      taxes: 4267.50,
      netPay: 24182.50,
      status: "completed"
    },
    {
      id: "PAY-002",
      payPeriod: "Jan 16-31, 2024",
      payDate: "2024-02-01",
      employees: 12,
      grossPay: 29200.00,
      taxes: 4380.00,
      netPay: 24820.00,
      status: "processing"
    },
    {
      id: "PAY-003",
      payPeriod: "Feb 1-15, 2024",
      payDate: "2024-02-16",
      employees: 13,
      grossPay: 31750.00,
      taxes: 4762.50,
      netPay: 26987.50,
      status: "pending"
    }
  ]);

  const [employees] = useState([
    {
      id: "EMP-001",
      name: "John Smith",
      position: "Operations Manager",
      payType: "salary",
      grossPay: 2875.00,
      taxes: 431.25,
      netPay: 2443.75,
      hoursWorked: 80,
      overtime: 0
    },
    {
      id: "EMP-002", 
      name: "Sarah Johnson",
      position: "Freight Broker",
      payType: "salary",
      grossPay: 2083.33,
      taxes: 312.50,
      netPay: 1770.83,
      hoursWorked: 80,
      overtime: 0
    },
    {
      id: "EMP-003",
      name: "Mike Wilson",
      position: "Dispatcher",
      payType: "hourly",
      grossPay: 1480.00,
      taxes: 222.00,
      netPay: 1258.00,
      hoursWorked: 80,
      overtime: 0
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle },
      processing: { variant: "secondary" as const, icon: Clock },
      pending: { variant: "outline" as const, icon: AlertTriangle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const currentPayroll = payrollRuns.find(run => run.status === 'pending');
  const lastCompletedPayroll = payrollRuns.find(run => run.status === 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payroll</h1>
            <p className="text-muted-foreground">Manage employee payroll and compensation</p>
          </div>
          <Button onClick={() => setShowRunPayrollForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Run Payroll
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">
                On current payroll
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payroll</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentPayroll?.grossPay.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Due {currentPayroll && new Date(currentPayroll.payDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Payroll</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${lastCompletedPayroll?.netPay.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Paid {lastCompletedPayroll && new Date(lastCompletedPayroll.payDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Payroll</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$156,420</div>
              <p className="text-xs text-muted-foreground">
                Year to date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Run Payroll Form */}
        {showRunPayrollForm && (
          <Card>
            <CardHeader>
              <CardTitle>Run Payroll</CardTitle>
              <CardDescription>Process payroll for the current pay period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payPeriodStart">Pay Period Start</Label>
                  <Input id="payPeriodStart" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payPeriodEnd">Pay Period End</Label>
                  <Input id="payPeriodEnd" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payDate">Pay Date</Label>
                  <Input id="payDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payrollType">Payroll Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Payroll</SelectItem>
                      <SelectItem value="bonus">Bonus Payroll</SelectItem>
                      <SelectItem value="commission">Commission Payroll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Calculate Payroll</Button>
                <Button variant="outline">Preview</Button>
                <Button variant="outline" onClick={() => setShowRunPayrollForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Payroll Period */}
        {currentPayroll && (
          <Card>
            <CardHeader>
              <CardTitle>Current Pay Period</CardTitle>
              <CardDescription>{currentPayroll.payPeriod}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Taxes</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.hoursWorked}</TableCell>
                      <TableCell>${employee.grossPay.toLocaleString()}</TableCell>
                      <TableCell>${employee.taxes.toLocaleString()}</TableCell>
                      <TableCell>${employee.netPay.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Payroll History */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll History</CardTitle>
            <CardDescription>View completed and pending payroll runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payroll runs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Gross Pay</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRuns.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">{run.payPeriod}</TableCell>
                    <TableCell>{new Date(run.payDate).toLocaleDateString()}</TableCell>
                    <TableCell>{run.employees}</TableCell>
                    <TableCell>${run.grossPay.toLocaleString()}</TableCell>
                    <TableCell>${run.netPay.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(run.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calculator className="w-4 h-4" />
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

export default Payroll;