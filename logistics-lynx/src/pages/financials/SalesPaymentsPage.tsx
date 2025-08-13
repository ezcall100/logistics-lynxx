import React, { useState } from 'react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Receipt, DollarSign, FileText, CreditCard, History, Clock, CheckCircle, AlertCircle, Download, Edit, Trash2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SalesPaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false);

  // Mock data for invoices
  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'ABC Logistics Inc.',
      amount: 15750.00,
      dueDate: '2024-02-15',
      issueDate: '2024-01-15',
      status: 'Paid',
      paymentMethod: 'Wire Transfer'
    },
    {
      id: 'INV-2024-002',
      customer: 'XYZ Shipping Corp',
      amount: 8250.50,
      dueDate: '2024-02-20',
      issueDate: '2024-01-20',
      status: 'Pending',
      paymentMethod: 'ACH'
    },
    {
      id: 'INV-2024-003',
      customer: 'Global Freight Solutions',
      amount: 22100.75,
      dueDate: '2024-02-10',
      issueDate: '2024-01-10',
      status: 'Overdue',
      paymentMethod: 'Check'
    }
  ];

  // Mock data for recurring invoices
  const recurringInvoices = [
    {
      id: 'REC-001',
      customer: 'Monthly Logistics Partners',
      amount: 5500.00,
      frequency: 'Monthly',
      nextDue: '2024-02-01',
      status: 'Active'
    },
    {
      id: 'REC-002',
      customer: 'Weekly Transport Co',
      amount: 1200.00,
      frequency: 'Weekly',
      nextDue: '2024-01-28',
      status: 'Active'
    }
  ];

  // Mock data for payments
  const payments = [
    {
      id: 'PAY-001',
      invoice: 'INV-2024-001',
      customer: 'ABC Logistics Inc.',
      amount: 15750.00,
      method: 'Wire Transfer',
      date: '2024-01-25',
      status: 'Cleared'
    },
    {
      id: 'PAY-002',
      invoice: 'INV-2023-998',
      customer: 'Express Delivery LLC',
      amount: 4250.25,
      method: 'Credit Card',
      date: '2024-01-22',
      status: 'Processing'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Paid': { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      'Pending': { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
      'Overdue': { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' },
      'Active': { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      'Cleared': { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      'Processing': { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={`flex items-center gap-1 ${config.color}`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleNewInvoice = () => {
    toast({
      title: "Invoice Created",
      description: "New invoice has been successfully generated.",
    });
    setIsNewInvoiceDialogOpen(false);
  };

  const handleSendInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoiceId} has been sent to the customer.`,
    });
  };

  return (
    <CarrierLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales & Payments</h1>
            <p className="text-muted-foreground">Manage invoices, payments, and customer statements</p>
          </div>
          <Dialog open={isNewInvoiceDialogOpen} onOpenChange={setIsNewInvoiceDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Generate a new invoice for your customer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">ABC Logistics Inc.</SelectItem>
                        <SelectItem value="xyz">XYZ Shipping Corp</SelectItem>
                        <SelectItem value="global">Global Freight Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" type="number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="terms">Payment Terms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Invoice description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewInvoiceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewInvoice}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$46,101</div>
              <p className="text-xs text-muted-foreground">3 pending invoices</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">This Month</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$68,750</div>
              <p className="text-xs text-muted-foreground">12 invoices sent</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$22,101</div>
              <p className="text-xs text-muted-foreground">1 overdue invoice</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Payment Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Sales & Payment Management</CardTitle>
            <CardDescription>Manage all sales transactions and payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="recurring">Recurring</TabsTrigger>
                <TabsTrigger value="statements">Statements</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="methods">Methods</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="invoices" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Invoice Management</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>{invoice.issueDate}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell className="font-mono">
                            ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSendInvoice(invoice.id)}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="recurring" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Recurring Invoices</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recurring
                  </Button>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recurringInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell className="font-mono">
                            ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{invoice.frequency}</TableCell>
                          <TableCell>{invoice.nextDue}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="statements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Customer Statements</h3>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['ABC Logistics Inc.', 'XYZ Shipping Corp', 'Global Freight Solutions'].map((customer, index) => (
                    <Card key={customer} className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">{customer}</CardTitle>
                        <CardDescription>Statement Period: Jan 2024</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Outstanding Balance:</span>
                          <span className="font-mono text-card-foreground">
                            ${[8250.50, 0.00, 22100.75][index].toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Invoiced:</span>
                          <span className="font-mono text-card-foreground">
                            ${[45750.00, 28500.00, 67200.00][index].toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Button className="w-full" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Statement
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Payment Tracking</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.invoice}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell className="font-mono">
                            ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{payment.method}</Badge>
                          </TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="methods" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Payment Methods</h3>
                  <Button variant="outline" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Method
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { method: 'Wire Transfer', count: 15, amount: 285750.00 },
                    { method: 'ACH', count: 8, amount: 125500.00 },
                    { method: 'Credit Card', count: 12, amount: 45250.75 },
                    { method: 'Check', count: 5, amount: 28600.00 }
                  ].map((item) => (
                    <Card key={item.method} className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">{item.method}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Transactions:</span>
                          <span className="font-bold text-card-foreground">{item.count}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Amount:</span>
                          <span className="font-mono text-card-foreground">
                            ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Payment History</h3>
                  <div className="flex gap-2">
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">7 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="90days">90 Days</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Total Received</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">$156,850</div>
                      <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Average Payment Time</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-card-foreground">18 days</div>
                      <p className="text-xs text-muted-foreground">-2 days from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Failed Payments</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <p className="text-xs text-muted-foreground">$3,450 total</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </CarrierLayout>
  );
};

export default SalesPaymentsPage;