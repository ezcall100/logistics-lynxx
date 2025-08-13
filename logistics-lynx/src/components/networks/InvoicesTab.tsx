
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Edit, Trash2, Receipt, DollarSign, Calendar, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  currency: string;
  paymentTerms: string;
  description: string;
  notes: string;
  lineItems: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerId: '1',
    customerName: 'Acme Corporation',
    issueDate: '2024-06-01',
    dueDate: '2024-06-30',
    status: 'paid',
    subtotal: 5000.00,
    taxAmount: 500.00,
    totalAmount: 5500.00,
    paidAmount: 5500.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Monthly logistics services',
    notes: 'Thank you for your business!',
    lineItems: [
      {
        id: '1',
        description: 'Transportation Services - Chicago to NYC',
        quantity: 10,
        unitPrice: 450.00,
        amount: 4500.00
      },
      {
        id: '2',
        description: 'Fuel Surcharge',
        quantity: 1,
        unitPrice: 500.00,
        amount: 500.00
      }
    ]
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerId: '2',
    customerName: 'Global Logistics Inc',
    issueDate: '2024-06-10',
    dueDate: '2024-07-10',
    status: 'sent',
    subtotal: 3200.00,
    taxAmount: 320.00,
    totalAmount: 3520.00,
    paidAmount: 0.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Warehouse storage and handling',
    notes: 'Payment due within 30 days',
    lineItems: [
      {
        id: '1',
        description: 'Warehouse Storage - June 2024',
        quantity: 1,
        unitPrice: 2000.00,
        amount: 2000.00
      },
      {
        id: '2',
        description: 'Handling Services',
        quantity: 24,
        unitPrice: 50.00,
        amount: 1200.00
      }
    ]
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customerId: '4',
    customerName: 'MegaStore Chain',
    issueDate: '2024-05-15',
    dueDate: '2024-06-14',
    status: 'overdue',
    subtotal: 8500.00,
    taxAmount: 850.00,
    totalAmount: 9350.00,
    paidAmount: 0.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Multi-location delivery services',
    notes: 'OVERDUE: Please remit payment immediately',
    lineItems: [
      {
        id: '1',
        description: 'Multi-drop Delivery Service',
        quantity: 25,
        unitPrice: 340.00,
        amount: 8500.00
      }
    ]
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    customerId: '3',
    customerName: 'TechStart Solutions',
    issueDate: '2024-06-15',
    dueDate: '2024-07-15',
    status: 'draft',
    subtotal: 1200.00,
    taxAmount: 120.00,
    totalAmount: 1320.00,
    paidAmount: 0.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Express delivery service',
    notes: 'Draft - Review before sending',
    lineItems: [
      {
        id: '1',
        description: 'Express Delivery - Same Day',
        quantity: 4,
        unitPrice: 300.00,
        amount: 1200.00
      }
    ]
  }
];

const InvoicesTab = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Invoice, 'id' | 'invoiceNumber' | 'lineItems'>>({
    customerId: '',
    customerName: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'draft',
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    paidAmount: 0,
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: '',
    notes: ''
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      customerId: '',
      customerName: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'draft',
      subtotal: 0,
      taxAmount: 0,
      totalAmount: 0,
      paidAmount: 0,
      currency: 'USD',
      paymentTerms: 'Net 30',
      description: '',
      notes: ''
    });
    setEditingInvoice(null);
  };

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const existingNumbers = invoices
      .filter(inv => inv.invoiceNumber.startsWith(`INV-${year}-`))
      .map(inv => parseInt(inv.invoiceNumber.split('-')[2]))
      .sort((a, b) => b - a);
    
    const nextNumber = existingNumbers.length > 0 ? existingNumbers[0] + 1 : 1;
    return `INV-${year}-${nextNumber.toString().padStart(3, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInvoice) {
      setInvoices(prev => prev.map(invoice =>
        invoice.id === editingInvoice.id
          ? { ...invoice, ...formData }
          : invoice
      ));
      toast({
        title: "Invoice Updated",
        description: "Invoice has been successfully updated.",
      });
    } else {
      const newInvoice: Invoice = {
        ...formData,
        id: Date.now().toString(),
        invoiceNumber: generateInvoiceNumber(),
        lineItems: []
      };
      setInvoices(prev => [...prev, newInvoice]);
      toast({
        title: "Invoice Created",
        description: "New invoice has been successfully created.",
      });
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      status: invoice.status,
      subtotal: invoice.subtotal,
      taxAmount: invoice.taxAmount,
      totalAmount: invoice.totalAmount,
      paidAmount: invoice.paidAmount,
      currency: invoice.currency,
      paymentTerms: invoice.paymentTerms,
      description: invoice.description,
      notes: invoice.notes
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (invoiceId: string) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId));
    toast({
      title: "Invoice Deleted",
      description: "Invoice has been removed from the system.",
      variant: "destructive",
    });
  };

  const handleStatusChange = (invoiceId: string, newStatus: Invoice['status']) => {
    setInvoices(prev => prev.map(invoice =>
      invoice.id === invoiceId
        ? { ...invoice, status: newStatus }
        : invoice
    ));
    toast({
      title: "Status Updated",
      description: `Invoice status changed to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const calculateDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTotalStats = () => {
    const total = filteredInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
    const paid = filteredInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    const outstanding = total - paid;
    
    return { total, paid, outstanding };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
                <p className="text-2xl font-bold">${stats.total.toLocaleString()}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">${stats.paid.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">${stats.outstanding.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
              </DialogTitle>
              <DialogDescription>
                {editingInvoice
                  ? 'Update invoice information below.'
                  : 'Enter invoice details to create a new invoice.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    required
                    placeholder="Customer name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of services"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subtotal">Subtotal ($)</Label>
                  <Input
                    id="subtotal"
                    type="number"
                    step="0.01"
                    value={formData.subtotal}
                    onChange={(e) => {
                      const subtotal = parseFloat(e.target.value) || 0;
                      const taxAmount = subtotal * 0.1; // 10% tax
                      const totalAmount = subtotal + taxAmount;
                      setFormData(prev => ({ 
                        ...prev, 
                        subtotal, 
                        taxAmount, 
                        totalAmount 
                      }));
                    }}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="taxAmount">Tax Amount ($)</Label>
                  <Input
                    id="taxAmount"
                    type="number"
                    step="0.01"
                    value={formData.taxAmount}
                    onChange={(e) => {
                      const taxAmount = parseFloat(e.target.value) || 0;
                      const totalAmount = formData.subtotal + taxAmount;
                      setFormData(prev => ({ 
                        ...prev, 
                        taxAmount, 
                        totalAmount 
                      }));
                    }}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalAmount">Total Amount ($)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    value={formData.totalAmount}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or payment instructions"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
          <CardDescription>
            Manage your invoices and track payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const balance = invoice.totalAmount - invoice.paidAmount;
                  const isOverdue = invoice.status === 'overdue';
                  const daysOverdue = isOverdue ? calculateDaysOverdue(invoice.dueDate) : 0;
                  
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="font-medium">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-muted-foreground">{invoice.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{invoice.customerName}</div>
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                          {isOverdue && (
                            <div className="text-xs text-red-600">
                              {daysOverdue} days overdue
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={invoice.status}
                          onValueChange={(value: Invoice['status']) => handleStatusChange(invoice.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${invoice.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{invoice.currency}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          ${invoice.paidAmount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${balance.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(invoice)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast({ title: "Preview", description: "Invoice preview would open here" })}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast({ title: "Download", description: "Invoice PDF would download here" })}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesTab;
