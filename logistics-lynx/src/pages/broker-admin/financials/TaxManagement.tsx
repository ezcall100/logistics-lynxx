/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText,
  Calculator,
  Calendar,
  DollarSign,
  Building,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Shield
} from 'lucide-react';

const TaxManagement = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('Q1_2024');

  const taxSummary = {
    quarterlyTax: 45680,
    annualProjected: 182720,
    paidToDate: 136040,
    nextPaymentDue: 45680,
    nextDueDate: "2024-04-15"
  };

  const taxCategories = [
    {
      category: "Federal Income Tax",
      quarterly: 32450,
      annual: 129800,
      rate: 21,
      status: "current"
    },
    {
      category: "State Income Tax", 
      quarterly: 8120,
      annual: 32480,
      rate: 5.25,
      status: "current"
    },
    {
      category: "Payroll Tax (Employer)",
      quarterly: 3890,
      annual: 15560,
      rate: 7.65,
      status: "current"
    },
    {
      category: "Unemployment Tax",
      quarterly: 1220,
      annual: 4880,
      rate: 0.6,
      status: "current"
    }
  ];

  const taxPayments = [
    {
      id: "TAX-2024-001",
      type: "Federal Quarterly",
      period: "Q4 2023",
      amount: 31250,
      dueDate: "2024-01-15",
      paidDate: "2024-01-12",
      status: "paid",
      reference: "EFTPS-20240112-001"
    },
    {
      id: "TAX-2024-002",
      type: "State Quarterly",
      period: "Q4 2023", 
      amount: 7890,
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      status: "paid",
      reference: "STATE-20240114-001"
    },
    {
      id: "TAX-2024-003",
      type: "Federal Quarterly",
      period: "Q1 2024",
      amount: 32450,
      dueDate: "2024-04-15",
      paidDate: null,
      status: "pending",
      reference: null
    },
    {
      id: "TAX-2024-004",
      type: "State Quarterly",
      period: "Q1 2024",
      amount: 8120,
      dueDate: "2024-04-15", 
      paidDate: null,
      status: "pending",
      reference: null
    }
  ];

  const taxDocuments = [
    {
      id: "DOC-2024-001",
      name: "Form 941 - Q4 2023",
      type: "Quarterly Payroll Tax",
      dateGenerated: "2024-01-10",
      dueDate: "2024-01-31",
      status: "filed",
      size: "245 KB"
    },
    {
      id: "DOC-2024-002", 
      name: "Form 1120 - 2023",
      type: "Corporate Tax Return",
      dateGenerated: "2024-02-01",
      dueDate: "2024-03-15",
      status: "draft",
      size: "1.2 MB"
    },
    {
      id: "DOC-2024-003",
      name: "1099-NEC Forms",
      type: "Non-Employee Compensation",
      dateGenerated: "2024-01-25",
      dueDate: "2024-01-31",
      status: "filed",
      size: "890 KB"
    }
  ];

  const taxDeductions = [
    {
      category: "Vehicle & Equipment",
      amount: 45680,
      percentage: 32.1,
      details: "Truck maintenance, fuel, depreciation"
    },
    {
      category: "Office Expenses",
      amount: 18920,
      percentage: 13.3,
      details: "Rent, utilities, supplies"
    },
    {
      category: "Professional Services",
      amount: 12450,
      percentage: 8.7,
      details: "Legal, accounting, consulting"
    },
    {
      category: "Insurance",
      amount: 28750,
      percentage: 20.2,
      details: "General liability, cargo, errors & omissions"
    },
    {
      category: "Technology",
      amount: 8950,
      percentage: 6.3,
      details: "Software subscriptions, hardware"
    },
    {
      category: "Marketing & Advertising",
      amount: 6890,
      percentage: 4.8,
      details: "Website, digital marketing, trade shows"
    },
    {
      category: "Other Business Expenses",
      amount: 20640,
      percentage: 14.5,
      details: "Meals, travel, training"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { variant: "default" as const, icon: CheckCircle },
      pending: { variant: "secondary" as const, icon: Clock },
      overdue: { variant: "destructive" as const, icon: AlertTriangle },
      filed: { variant: "default" as const, icon: CheckCircle },
      draft: { variant: "secondary" as const, icon: Clock },
      current: { variant: "default" as const, icon: CheckCircle }
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tax Management</h1>
          <p className="text-muted-foreground">Track tax obligations, payments, and compliance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Tax Calculator
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quarterly Tax Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(taxSummary.quarterlyTax)}</div>
            <p className="text-xs text-muted-foreground">Q1 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annual Projected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(taxSummary.annualProjected)}</div>
            <p className="text-xs text-muted-foreground">2024 estimate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(taxSummary.paidToDate)}</div>
            <p className="text-xs text-muted-foreground">YTD payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(taxSummary.nextPaymentDue)}</div>
            <p className="text-xs text-muted-foreground">Due {taxSummary.nextDueDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Effective Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">28.4%</div>
            <p className="text-xs text-muted-foreground">Combined rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tax Overview</TabsTrigger>
          <TabsTrigger value="payments">Tax Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Categories & Rates</CardTitle>
              <CardDescription>Breakdown of tax obligations by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tax Category</TableHead>
                    <TableHead>Quarterly Amount</TableHead>
                    <TableHead>Annual Projection</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxCategories.map((tax) => (
                    <TableRow key={tax.category}>
                      <TableCell className="font-medium">{tax.category}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(tax.quarterly)}</TableCell>
                      <TableCell>{formatCurrency(tax.annual)}</TableCell>
                      <TableCell>{formatPercentage(tax.rate)}</TableCell>
                      <TableCell>{getStatusBadge(tax.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Payment History</CardTitle>
              <CardDescription>Track all tax payments and due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{payment.paidDate || '-'}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {payment.status === 'pending' && (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Tax Documents</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </div>
              <CardDescription>Tax forms, returns, and compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.dateGenerated}</TableCell>
                      <TableCell>{doc.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          {doc.status === 'draft' && (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Deductions Analysis</CardTitle>
              <CardDescription>Business expense categories and deduction breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDeductions.map((deduction) => (
                  <div key={deduction.category} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{deduction.category}</h4>
                        <p className="text-sm text-muted-foreground">{deduction.details}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{formatCurrency(deduction.amount)}</div>
                        <div className="text-sm text-muted-foreground">{formatPercentage(deduction.percentage)} of total</div>
                      </div>
                    </div>
                    <Progress value={deduction.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Business Deductions</span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(taxDeductions.reduce((sum, deduction) => sum + deduction.amount, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxManagement;