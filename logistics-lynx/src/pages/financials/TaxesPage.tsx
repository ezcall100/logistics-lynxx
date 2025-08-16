/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  FileText,
  Calculator,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Receipt,
  Building
} from 'lucide-react';

// Mock data
const taxFilingsData = [
  { id: 'TAX-001', type: 'Quarterly 941', quarter: 'Q4 2023', dueDate: '2024-01-31', status: 'filed', amount: 2500, filedDate: '2024-01-28' },
  { id: 'TAX-002', type: 'Annual 1120', year: '2023', dueDate: '2024-03-15', status: 'pending', amount: 8500, filedDate: null },
  { id: 'TAX-003', type: 'State Sales Tax', month: 'December 2023', dueDate: '2024-01-20', status: 'overdue', amount: 1200, filedDate: null },
  { id: 'TAX-004', type: 'Fuel Tax', quarter: 'Q4 2023', dueDate: '2024-01-31', status: 'filed', amount: 3200, filedDate: '2024-01-30' },
];

const taxPaymentsData = [
  { id: 'PAY-001', filing: 'TAX-001', amount: 2500, method: 'ACH', date: '2024-01-28', status: 'completed', confirmation: 'ACH123456' },
  { id: 'PAY-002', filing: 'TAX-004', amount: 3200, method: 'Wire Transfer', date: '2024-01-30', status: 'completed', confirmation: 'WIRE789012' },
  { id: 'PAY-003', filing: 'TAX-003', amount: 1200, method: 'Check', date: '2024-01-22', status: 'pending', confirmation: 'CHK345678' },
];

const taxFormsData = [
  { id: 'FORM-001', type: '941', description: 'Employers Quarterly Federal Tax Return', quarter: 'Q4 2023', status: 'completed', downloadUrl: '#' },
  { id: 'FORM-002', type: '1120', description: 'U.S. Corporation Income Tax Return', year: '2023', status: 'draft', downloadUrl: null },
  { id: 'FORM-003', type: '2290', description: 'Heavy Highway Vehicle Use Tax Return', year: '2024', status: 'completed', downloadUrl: '#' },
  { id: 'FORM-004', type: 'State Sales', description: 'State Sales Tax Return', month: 'December 2023', status: 'overdue', downloadUrl: null },
];

const taxSettingsData = [
  { id: 'SET-001', jurisdiction: 'Federal', taxType: 'Income Tax', rate: '21%', frequency: 'Annual', status: 'active' },
  { id: 'SET-002', jurisdiction: 'Federal', taxType: 'Payroll Tax', rate: '15.3%', frequency: 'Quarterly', status: 'active' },
  { id: 'SET-003', jurisdiction: 'California', taxType: 'State Income Tax', rate: '8.84%', frequency: 'Annual', status: 'active' },
  { id: 'SET-004', jurisdiction: 'California', taxType: 'Sales Tax', rate: '7.25%', frequency: 'Monthly', status: 'active' },
  { id: 'SET-005', jurisdiction: 'Federal', taxType: 'Fuel Tax', rate: '$0.244/gal', frequency: 'Quarterly', status: 'active' },
];

const TaxesPage = () => {
  const [activeTab, setActiveTab] = useState('filings');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      filed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      pending: { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
      overdue: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' },
      completed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      draft: { variant: 'outline' as const, icon: FileText, color: 'text-gray-600' },
      active: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const CreateTaxFilingForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="taxType">Tax Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select tax type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="941">Quarterly 941</SelectItem>
              <SelectItem value="1120">Annual 1120</SelectItem>
              <SelectItem value="sales">State Sales Tax</SelectItem>
              <SelectItem value="fuel">Fuel Tax</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="period">Tax Period</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
              <SelectItem value="2024">Year 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" />
        </div>
        <div>
          <Label htmlFor="amount">Tax Amount</Label>
          <Input id="amount" placeholder="0.00" type="number" />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Filing</Button>
      </div>
    </div>
  );

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Taxes</h1>
          <p className="text-muted-foreground">
            Manage tax filings, payments, forms, and settings
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Tax Filing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tax Filing</DialogTitle>
            </DialogHeader>
            <CreateTaxFilingForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,400</div>
            <p className="text-xs text-muted-foreground">
              This year to date
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Due within 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15</div>
            <p className="text-xs text-muted-foreground">
              Annual 1120 filing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="filings" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Tax Filings
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Forms
          </TabsTrigger>
          <TabsTrigger value="settings">Tax Settings</TabsTrigger>
        </TabsList>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tax filings, forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Tax Filings Tab */}
        <TabsContent value="filings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Filings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filing ID</TableHead>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxFilingsData.map((filing) => (
                    <TableRow key={filing.id}>
                      <TableCell className="font-medium">{filing.id}</TableCell>
                      <TableCell>{filing.type}</TableCell>
                      <TableCell>{filing.quarter || filing.year || filing.month}</TableCell>
                      <TableCell>{filing.dueDate}</TableCell>
                      <TableCell>${filing.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(filing.status)}</TableCell>
                      <TableCell>{filing.filedDate || '-'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>File Return</DropdownMenuItem>
                            <DropdownMenuItem>Make Payment</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Tax Filing</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confirmation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxPaymentsData.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.filing}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.confirmation}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Receipt</DropdownMenuItem>
                            <DropdownMenuItem>Download Confirmation</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Forms Tab */}
        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form ID</TableHead>
                    <TableHead>Form Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxFormsData.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.id}</TableCell>
                      <TableCell>{form.type}</TableCell>
                      <TableCell>{form.description}</TableCell>
                      <TableCell>{form.quarter || form.year || form.month}</TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Form</DropdownMenuItem>
                            <DropdownMenuItem>Edit Form</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Submit Form</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxSettingsData.map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell className="font-medium">{setting.jurisdiction}</TableCell>
                      <TableCell>{setting.taxType}</TableCell>
                      <TableCell>{setting.rate}</TableCell>
                      <TableCell>{setting.frequency}</TableCell>
                      <TableCell>{getStatusBadge(setting.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxesPage;