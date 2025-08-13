import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock,
  DollarSign, 
  CreditCard,
  Building,
  Users,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const ReconciliationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for reconciliation
  const reconciliationStats = {
    bankReconciled: 95,
    creditCardReconciled: 88,
    vendorReconciled: 92,
    customerReconciled: 96
  };

  const bankTransactions = [
    { id: 1, date: '2024-06-30', description: 'Customer Payment - ABC Logistics', amount: 15750, status: 'matched', type: 'credit' },
    { id: 2, date: '2024-06-30', description: 'Fuel Purchase - Shell Station', amount: -892, status: 'matched', type: 'debit' },
    { id: 3, date: '2024-06-29', description: 'Insurance Payment', amount: -2400, status: 'unmatched', type: 'debit' },
    { id: 4, date: '2024-06-29', description: 'Customer Payment - XYZ Corp', amount: 8950, status: 'matched', type: 'credit' },
    { id: 5, date: '2024-06-28', description: 'Maintenance Expense', amount: -1250, status: 'pending', type: 'debit' }
  ];

  const creditCardTransactions = [
    { id: 1, date: '2024-06-30', description: 'Office Supplies - Staples', amount: 156.78, status: 'matched', merchant: 'Staples' },
    { id: 2, date: '2024-06-29', description: 'Fuel - Pilot Travel Center', amount: 345.50, status: 'matched', merchant: 'Pilot' },
    { id: 3, date: '2024-06-29', description: 'Meals - Highway Diner', amount: 45.60, status: 'unmatched', merchant: 'Highway Diner' },
    { id: 4, date: '2024-06-28', description: 'Parts - AutoZone', amount: 89.99, status: 'matched', merchant: 'AutoZone' },
    { id: 5, date: '2024-06-28', description: 'Fuel - Flying J', amount: 298.75, status: 'pending', merchant: 'Flying J' }
  ];

  const vendorPayments = [
    { id: 1, vendor: 'Premium Fuel Co.', invoice: 'INV-2024-001', amount: 12450, dueDate: '2024-07-15', status: 'reconciled' },
    { id: 2, vendor: 'Maintenance Plus', invoice: 'INV-2024-002', amount: 3750, dueDate: '2024-07-20', status: 'pending' },
    { id: 3, vendor: 'Insurance Partners', invoice: 'INV-2024-003', amount: 8900, dueDate: '2024-07-10', status: 'reconciled' },
    { id: 4, vendor: 'Equipment Rental LLC', invoice: 'INV-2024-004', amount: 2200, dueDate: '2024-07-25', status: 'discrepancy' },
    { id: 5, vendor: 'Tech Solutions Inc', invoice: 'INV-2024-005', amount: 1650, dueDate: '2024-07-18', status: 'reconciled' }
  ];

  const customerPayments = [
    { id: 1, customer: 'ABC Logistics', invoice: 'INV-C-001', amount: 15750, received: 15750, status: 'reconciled' },
    { id: 2, customer: 'XYZ Transport', invoice: 'INV-C-002', amount: 8950, received: 8950, status: 'reconciled' },
    { id: 3, customer: 'Global Shipping', invoice: 'INV-C-003', amount: 12300, received: 12100, status: 'discrepancy' },
    { id: 4, customer: 'Quick Haul Co', invoice: 'INV-C-004', amount: 6750, received: 0, status: 'pending' },
    { id: 5, customer: 'Metro Freight', invoice: 'INV-C-005', amount: 9875, received: 9875, status: 'reconciled' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
      case 'reconciled':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'unmatched':
      case 'discrepancy':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
      case 'reconciled':
        return <Badge variant="default" className="bg-green-100 text-green-800">Reconciled</Badge>;
      case 'unmatched':
      case 'discrepancy':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Discrepancy</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending</Badge>;
      default:
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reconciliation</h1>
          <p className="text-muted-foreground">Bank, credit card, vendor, and customer payment reconciliation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Reconciliation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{reconciliationStats.bankReconciled}%</p>
                <p className="text-sm text-muted-foreground">Bank Reconciled</p>
              </div>
            </div>
            <Progress value={reconciliationStats.bankReconciled} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-50">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{reconciliationStats.creditCardReconciled}%</p>
                <p className="text-sm text-muted-foreground">Credit Cards</p>
              </div>
            </div>
            <Progress value={reconciliationStats.creditCardReconciled} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-50">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{reconciliationStats.vendorReconciled}%</p>
                <p className="text-sm text-muted-foreground">Vendor Payments</p>
              </div>
            </div>
            <Progress value={reconciliationStats.vendorReconciled} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-50">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{reconciliationStats.customerReconciled}%</p>
                <p className="text-sm text-muted-foreground">Customer Payments</p>
              </div>
            </div>
            <Progress value={reconciliationStats.customerReconciled} className="mt-4 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bank" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bank">Bank Reconciliation</TabsTrigger>
          <TabsTrigger value="credit-card">Credit Cards</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Payments</TabsTrigger>
          <TabsTrigger value="customer">Customer Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="bank" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bank Reconciliation</CardTitle>
              <CardDescription>Match bank transactions with accounting records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      {getStatusBadge(transaction.status)}
                      <Button variant="ghost" size="sm">Match</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit-card" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Reconciliation</CardTitle>
              <CardDescription>Reconcile credit card transactions with expense records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditCardTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date} • {transaction.merchant}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold text-red-600">
                        -${transaction.amount}
                      </div>
                      {getStatusBadge(transaction.status)}
                      <Button variant="ghost" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Payment Reconciliation</CardTitle>
              <CardDescription>Track and reconcile vendor payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <div>
                          <p className="font-medium">{payment.vendor}</p>
                          <p className="text-sm text-muted-foreground">{payment.invoice} • Due: {payment.dueDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold">${payment.amount.toLocaleString()}</div>
                      {getStatusBadge(payment.status)}
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Payment Reconciliation</CardTitle>
              <CardDescription>Track and reconcile customer payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <div>
                          <p className="font-medium">{payment.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.invoice} • Expected: ${payment.amount.toLocaleString()} • Received: ${payment.received.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">${payment.received.toLocaleString()}</div>
                        {payment.amount !== payment.received && (
                          <div className="text-sm text-red-600">
                            Diff: ${(payment.amount - payment.received).toLocaleString()}
                          </div>
                        )}
                      </div>
                      {getStatusBadge(payment.status)}
                      <Button variant="ghost" size="sm">Reconcile</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReconciliationPage;