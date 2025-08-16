/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  CreditCard,
  Building,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Send,
  Banknote,
  Smartphone,
  Globe
} from 'lucide-react';

const PaymentProcessing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payments = [
    {
      id: "PAY-2024-001",
      invoiceId: "INV-2024-001",
      customer: "Global Logistics Corp",
      amount: 45250,
      paymentDate: "2024-02-01",
      method: "ACH",
      status: "completed",
      reference: "ACH-20240201-001",
      processingFee: 25.50
    },
    {
      id: "PAY-2024-002",
      invoiceId: "INV-2024-003",
      customer: "Prime Transport",
      amount: 58920,
      paymentDate: "2024-02-01",
      method: "wire",
      status: "processing",
      reference: "WIRE-20240201-001",
      processingFee: 45.00
    },
    {
      id: "PAY-2024-003",
      invoiceId: "INV-2024-002",
      customer: "FastTrack Shipping",
      amount: 32180,
      paymentDate: "2024-01-30",
      method: "credit_card",
      status: "completed",
      reference: "CC-20240130-001",
      processingFee: 965.40
    },
    {
      id: "PAY-2024-004",
      invoiceId: "INV-2024-005",
      customer: "Express Carriers",
      amount: 67340,
      paymentDate: "2024-01-28",
      method: "check",
      status: "pending",
      reference: "CHK-20240128-001",
      processingFee: 0
    }
  ];

  const paymentMethods = [
    {
      type: "ACH",
      name: "Bank Transfer (ACH)",
      processingFee: "0.5%",
      processingTime: "1-3 business days",
      enabled: true,
      icon: Banknote
    },
    {
      type: "wire",
      name: "Wire Transfer",
      processingFee: "$45.00",
      processingTime: "Same day",
      enabled: true,
      icon: Globe
    },
    {
      type: "credit_card",
      name: "Credit Card",
      processingFee: "2.9% + $0.30",
      processingTime: "Instant",
      enabled: true,
      icon: CreditCard
    },
    {
      type: "check",
      name: "Paper Check",
      processingFee: "Free",
      processingTime: "3-5 business days",
      enabled: true,
      icon: Building
    }
  ];

  const paymentReconciliation = [
    {
      date: "2024-02-01",
      deposited: 103170,
      fees: 70.50,
      netAmount: 103099.50,
      transactionCount: 3,
      status: "reconciled"
    },
    {
      date: "2024-01-31", 
      deposited: 89450,
      fees: 125.30,
      netAmount: 89324.70,
      transactionCount: 4,
      status: "reconciled"
    },
    {
      date: "2024-01-30",
      deposited: 156780,
      fees: 235.80,
      netAmount: 156544.20,
      transactionCount: 7,
      status: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { variant: "default" as const, icon: CheckCircle },
      processing: { variant: "secondary" as const, icon: Clock },
      pending: { variant: "secondary" as const, icon: Clock },
      failed: { variant: "destructive" as const, icon: AlertTriangle },
      reconciled: { variant: "default" as const, icon: CheckCircle }
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getMethodBadge = (method: string) => {
    const colors = {
      ACH: "bg-blue-100 text-blue-800",
      wire: "bg-green-100 text-green-800", 
      credit_card: "bg-purple-100 text-purple-800",
      check: "bg-gray-100 text-gray-800"
    };
    return (
      <Badge className={colors[method as keyof typeof colors]}>
        {method.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const filteredPayments = payments.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Processing</h1>
          <p className="text-muted-foreground">Process and track customer payments and collections</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Payments
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$104,170</div>
            <p className="text-xs text-muted-foreground">3 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$58,920</div>
            <p className="text-xs text-muted-foreground">1 payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$1,035.90</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$348,968</div>
            <p className="text-xs text-muted-foreground">After fees</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-6">
          {/* Payments Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payment Transactions</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{payment.invoiceId}</span>
                      </TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="font-semibold">${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{getMethodBadge(payment.method)}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell className="text-red-600">${payment.processingFee.toFixed(2)}</TableCell>
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

        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Configuration</CardTitle>
              <CardDescription>Configure and manage available payment processing options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.type} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <method.icon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-foreground">{method.name}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Fee: {method.processingFee}</span>
                          <span>Processing: {method.processingTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={method.enabled ? "default" : "secondary"}>
                        {method.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bank Reconciliation</CardTitle>
              <CardDescription>Daily payment reconciliation and deposit tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Gross Deposited</TableHead>
                    <TableHead>Processing Fees</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentReconciliation.map((recon, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{recon.date}</TableCell>
                      <TableCell className="font-semibold">${recon.deposited.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">${recon.fees.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold text-green-600">${recon.netAmount.toLocaleString()}</TableCell>
                      <TableCell>{recon.transactionCount}</TableCell>
                      <TableCell>{getStatusBadge(recon.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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

export default PaymentProcessing;