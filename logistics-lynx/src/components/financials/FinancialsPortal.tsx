/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, DollarSign, CreditCard, FileText, TrendingUp, TrendingDown, Calendar, User, Building, Truck, Package, Receipt, Wallet, BarChart3, PieChart, Download, Upload, Plus, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for Financials
interface Invoice {
  id: string;
  number: string;
  customer: string;
  amount: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  issueDate: string;
  description: string;
  items: InvoiceItem[];
  totalTax: string;
  totalAmount: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: string;
  method: 'credit_card' | 'bank_transfer' | 'check' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  reference: string;
  customer: string;
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  receipt: string;
  submittedBy: string;
}

interface FinancialReport {
  id: string;
  name: string;
  type: 'revenue' | 'expense' | 'profit' | 'cash_flow';
  period: string;
  data: unknown;
  generatedDate: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    number: 'INV-2024-001',
    customer: 'TechCorp Logistics',
    amount: '$4,250.00',
    status: 'paid',
    dueDate: '2024-01-15',
    issueDate: '2024-01-01',
    description: 'Freight services - Electronics shipment LA to NYC',
    items: [
      {
        id: '1',
        description: 'Freight charges',
        quantity: 1,
        unitPrice: '$3,800.00',
        total: '$3,800.00'
      },
      {
        id: '2',
        description: 'Fuel surcharge',
        quantity: 1,
        unitPrice: '$350.00',
        total: '$350.00'
      },
      {
        id: '3',
        description: 'Insurance',
        quantity: 1,
        unitPrice: '$100.00',
        total: '$100.00'
      }
    ],
    totalTax: '$0.00',
    totalAmount: '$4,250.00'
  },
  {
    id: 'INV-002',
    number: 'INV-2024-002',
    customer: 'Fresh Foods Co',
    amount: '$2,850.00',
    status: 'sent',
    dueDate: '2024-01-25',
    issueDate: '2024-01-10',
    description: 'Refrigerated transport - Miami to Atlanta',
    items: [
      {
        id: '1',
        description: 'Refrigerated freight',
        quantity: 1,
        unitPrice: '$2,500.00',
        total: '$2,500.00'
      },
      {
        id: '2',
        description: 'Temperature monitoring',
        quantity: 1,
        unitPrice: '$200.00',
        total: '$200.00'
      },
      {
        id: '3',
        description: 'Delivery fee',
        quantity: 1,
        unitPrice: '$150.00',
        total: '$150.00'
      }
    ],
    totalTax: '$0.00',
    totalAmount: '$2,850.00'
  }
];

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-001',
    amount: '$4,250.00',
    method: 'bank_transfer',
    status: 'completed',
    date: '2024-01-12',
    reference: 'TRX-123456789',
    customer: 'TechCorp Logistics'
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-003',
    amount: '$1,800.00',
    method: 'credit_card',
    status: 'pending',
    date: '2024-01-15',
    reference: 'CC-987654321',
    customer: 'AutoParts Express'
  }
];

const mockExpenses: Expense[] = [
  {
    id: 'EXP-001',
    category: 'Fuel',
    description: 'Diesel fuel for fleet vehicles',
    amount: '$1,250.00',
    date: '2024-01-10',
    status: 'approved',
    receipt: 'fuel_receipt_001.pdf',
    submittedBy: 'John Driver'
  },
  {
    id: 'EXP-002',
    category: 'Maintenance',
    description: 'Truck maintenance and repairs',
    amount: '$850.00',
    date: '2024-01-12',
    status: 'pending',
    receipt: 'maintenance_receipt_002.pdf',
    submittedBy: 'Mike Mechanic'
  }
];

const mockReports: FinancialReport[] = [
  {
    id: 'REP-001',
    name: 'Monthly Revenue Report',
    type: 'revenue',
    period: 'January 2024',
    data: { totalRevenue: '$125,000', growth: '+12%' },
    generatedDate: '2024-01-31'
  },
  {
    id: 'REP-002',
    name: 'Expense Analysis',
    type: 'expense',
    period: 'January 2024',
    data: { totalExpenses: '$45,000', categories: ['Fuel', 'Maintenance', 'Insurance'] },
    generatedDate: '2024-01-31'
  }
];

export const FinancialsPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [reports, setReports] = useState<FinancialReport[]>(mockReports);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateInvoiceDialog, setShowCreateInvoiceDialog] = useState(false);
  const [showProcessPaymentDialog, setShowProcessPaymentDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter invoices based on search and filters
  useEffect(() => {
    const filtered = invoices.filter(invoice => {
      const matchesSearch = 
        invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredInvoices(filtered);
  }, [invoices, searchQuery, statusFilter]);

  const handleCreateInvoice = () => {
    toast({
      title: 'Invoice Created',
      description: 'New invoice has been successfully created.',
      variant: 'default'
    });
    setShowCreateInvoiceDialog(false);
  };

  const handleProcessPayment = () => {
    toast({
      title: 'Payment Processed',
      description: 'Payment has been successfully processed.',
      variant: 'default'
    });
    setShowProcessPaymentDialog(false);
  };

  const getRoleSpecificActions = () => {
    switch (currentRole) {
      case 'freight_broker_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowCreateInvoiceDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
            <Button onClick={() => setShowProcessPaymentDialog(true)} variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
          </div>
        );
      case 'carrier_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowCreateInvoiceDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
            <Button variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              Fleet Expenses
            </Button>
          </div>
        );
      case 'shipper_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowProcessPaymentDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Shipping Costs
            </Button>
          </div>
        );
      case 'factoring_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowProcessPaymentDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
            <Button variant="outline">
              <Building className="h-4 w-4 mr-2" />
              Client Accounts
            </Button>
          </div>
        );
      default:
        return (
          <Button onClick={() => setShowCreateInvoiceDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpenseStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotalRevenue = () => {
    return invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);
  };

  const calculateOutstandingAmount = () => {
    return invoices
      .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);
  };

  const calculateTotalExpenses = () => {
    return expenses
      .filter(exp => exp.status === 'approved')
      .reduce((sum, exp) => sum + parseFloat(exp.amount.replace('$', '').replace(',', '')), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">💰 Financials Portal</h1>
              <p className="text-gray-600">Financial management, invoicing, and payment processing</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {roleInfo.name}
              </Badge>
              {getRoleSpecificActions()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${calculateTotalRevenue().toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" /> +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">${calculateOutstandingAmount().toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <AlertCircle className="inline h-3 w-3 text-orange-500" /> 5 invoices pending
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${calculateTotalExpenses().toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingDown className="inline h-3 w-3 text-red-500" /> -8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">${(calculateTotalRevenue() - calculateTotalExpenses()).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-blue-500" /> +15% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{invoice.number}</p>
                          <p className="text-sm text-gray-600">{invoice.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{payment.reference}</p>
                          <p className="text-sm text-gray-600">{payment.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{payment.amount}</p>
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoices Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{invoice.number}</CardTitle>
                        <p className="text-sm text-gray-600">{invoice.customer}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          <Badge variant="outline">{invoice.amount}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{invoice.description}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Due: {invoice.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Issued: {invoice.issueDate}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {payments.map((payment) => (
                <Card key={payment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{payment.reference}</CardTitle>
                        <p className="text-sm text-gray-600">{payment.customer}</p>
                      </div>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="text-lg font-bold text-green-600">{payment.amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Method:</span>
                        <span className="text-sm">{payment.method.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="text-sm">{payment.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Invoice:</span>
                        <span className="text-sm">{payment.invoiceId}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{expense.category}</CardTitle>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                      </div>
                      <Badge className={getExpenseStatusColor(expense.status)}>
                        {expense.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="text-lg font-bold text-red-600">{expense.amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="text-sm">{expense.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Submitted By:</span>
                        <span className="text-sm">{expense.submittedBy}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-1" />
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <p className="text-sm text-gray-600">{report.period}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Type:</span>
                        <Badge variant="outline">{report.type.replace('_', ' ')}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Generated:</span>
                        <span className="text-sm">{report.generatedDate}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invoice Details Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedInvoice?.number}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Customer</h4>
                  <p className="text-sm text-gray-600">{selectedInvoice.customer}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Issue Date</h4>
                  <p className="text-sm text-gray-600">{selectedInvoice.issueDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Due Date</h4>
                  <p className="text-sm text-gray-600">{selectedInvoice.dueDate}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-gray-600">{selectedInvoice.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Items</h4>
                <div className="mt-2 space-y-2">
                  {selectedInvoice.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.description}</span>
                      <span>{item.total}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>{selectedInvoice.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={showCreateInvoiceDialog} onOpenChange={setShowCreateInvoiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techcorp">TechCorp Logistics</SelectItem>
                    <SelectItem value="freshfoods">Fresh Foods Co</SelectItem>
                    <SelectItem value="autoparts">AutoParts Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Invoice description..." />
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input placeholder="$0.00" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateInvoiceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvoice}>
                Create Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Payment Dialog */}
      <Dialog open={showProcessPaymentDialog} onOpenChange={setShowProcessPaymentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Invoice</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue').map(invoice => (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        {invoice.number} - {invoice.amount}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input placeholder="$0.00" />
            </div>
            <div>
              <label className="text-sm font-medium">Reference</label>
              <Input placeholder="Payment reference..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProcessPaymentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleProcessPayment}>
                Process Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialsPortal;
