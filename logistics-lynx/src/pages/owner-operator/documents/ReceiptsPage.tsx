import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Receipt, Plus, Edit, Download, Search, Filter, Upload, DollarSign, Calendar, FileText, Tag, Trash2, Eye } from 'lucide-react';
import { toast } from "sonner";

interface ReceiptEntry {
  id: string;
  receiptNumber: string;
  date: string;
  vendor: string;
  category: 'fuel' | 'maintenance' | 'tolls' | 'food' | 'lodging' | 'supplies' | 'insurance' | 'permits' | 'other';
  amount: number;
  description: string;
  tripNumber?: string;
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'check' | 'company_card';
  taxAmount?: number;
  isBusinessExpense: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  submittedDate: string;
  approvedBy?: string;
  receiptImageUrl?: string;
  notes?: string;
  mileage?: number;
  location: string;
}

const mockReceipts: ReceiptEntry[] = [
  {
    id: 'rcpt-001',
    receiptNumber: 'RCP-2024-001',
    date: '2024-07-19',
    vendor: 'Shell Gas Station',
    category: 'fuel',
    amount: 438.40,
    description: 'Diesel fuel - 97.2 gallons',
    tripNumber: 'TR-2024-001',
    paymentMethod: 'company_card',
    taxAmount: 28.50,
    isBusinessExpense: true,
    status: 'approved',
    submittedDate: '2024-07-19',
    approvedBy: 'Operations Manager',
    location: 'Chicago, IL',
    mileage: 45832
  },
  {
    id: 'rcpt-002',
    receiptNumber: 'RCP-2024-002',
    date: '2024-07-18',
    vendor: 'Truck Stop Diner',
    category: 'food',
    amount: 24.95,
    description: 'Lunch meal',
    tripNumber: 'TR-2024-001',
    paymentMethod: 'credit_card',
    taxAmount: 2.12,
    isBusinessExpense: true,
    status: 'pending',
    submittedDate: '2024-07-19',
    location: 'Atlanta, GA'
  },
  {
    id: 'rcpt-003',
    receiptNumber: 'RCP-2024-003',
    date: '2024-07-17',
    vendor: 'Express Maintenance',
    category: 'maintenance',
    amount: 156.78,
    description: 'Oil change and filter replacement',
    paymentMethod: 'company_card',
    taxAmount: 12.54,
    isBusinessExpense: true,
    status: 'approved',
    submittedDate: '2024-07-17',
    approvedBy: 'Fleet Manager',
    location: 'Miami, FL',
    notes: 'Regular scheduled maintenance'
  },
  {
    id: 'rcpt-004',
    receiptNumber: 'RCP-2024-004',
    date: '2024-07-16',
    vendor: 'Highway Tolls',
    category: 'tolls',
    amount: 45.75,
    description: 'Toll charges - I-80 and I-65',
    tripNumber: 'TR-2024-001',
    paymentMethod: 'cash',
    isBusinessExpense: true,
    status: 'reimbursed',
    submittedDate: '2024-07-16',
    approvedBy: 'Accounting',
    location: 'Various toll stations'
  },
  {
    id: 'rcpt-005',
    receiptNumber: 'RCP-2024-005',
    date: '2024-07-15',
    vendor: 'Comfort Inn',
    category: 'lodging',
    amount: 89.99,
    description: 'Overnight stay - mandatory rest period',
    tripNumber: 'TR-2023-089',
    paymentMethod: 'company_card',
    taxAmount: 14.40,
    isBusinessExpense: true,
    status: 'approved',
    submittedDate: '2024-07-15',
    approvedBy: 'Operations Manager',
    location: 'Houston, TX'
  }
];

const ReceiptsPage: React.FC = () => {
  const [receipts, setReceipts] = useState<ReceiptEntry[]>(mockReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingReceipt, setIsAddingReceipt] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<ReceiptEntry | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptEntry | null>(null);

  const [newReceipt, setNewReceipt] = useState({
    receiptNumber: '',
    date: new Date().toISOString().split('T')[0],
    vendor: '',
    category: 'fuel' as const,
    amount: 0,
    description: '',
    tripNumber: '',
    paymentMethod: 'company_card' as const,
    taxAmount: 0,
    isBusinessExpense: true,
    status: 'pending' as const,
    location: '',
    notes: '',
    mileage: 0
  });

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || receipt.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'reimbursed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Reimbursed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      fuel: 'bg-orange-100 text-orange-800',
      maintenance: 'bg-purple-100 text-purple-800',
      tolls: 'bg-blue-100 text-blue-800',
      food: 'bg-green-100 text-green-800',
      lodging: 'bg-indigo-100 text-indigo-800',
      supplies: 'bg-yellow-100 text-yellow-800',
      insurance: 'bg-red-100 text-red-800',
      permits: 'bg-gray-100 text-gray-800',
      other: 'bg-slate-100 text-slate-800'
    };

    return (
      <Badge variant="secondary" className={colors[category] || colors.other}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  const handleAddReceipt = () => {
    if (!newReceipt.vendor || !newReceipt.description || newReceipt.amount <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const receipt: ReceiptEntry = {
      id: `rcpt-${Date.now()}`,
      receiptNumber: newReceipt.receiptNumber || `RCP-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0],
      ...newReceipt
    };

    setReceipts([receipt, ...receipts]);
    setIsAddingReceipt(false);
    resetNewReceipt();
    toast.success('Receipt added successfully');
  };

  const resetNewReceipt = () => {
    setNewReceipt({
      receiptNumber: '',
      date: new Date().toISOString().split('T')[0],
      vendor: '',
      category: 'fuel',
      amount: 0,
      description: '',
      tripNumber: '',
      paymentMethod: 'company_card',
      taxAmount: 0,
      isBusinessExpense: true,
      status: 'pending',
      location: '',
      notes: '',
      mileage: 0
    });
  };

  const handleUpdateStatus = (id: string, status: ReceiptEntry['status']) => {
    setReceipts(receipts =>
      receipts.map(receipt =>
        receipt.id === id ? { ...receipt, status } : receipt
      )
    );
    toast.success('Receipt status updated successfully');
  };

  const handleDeleteReceipt = (id: string) => {
    setReceipts(receipts => receipts.filter(receipt => receipt.id !== id));
    toast.success('Receipt deleted successfully');
  };

  const handleDownloadReceipt = (id: string) => {
    toast.success('Receipt downloaded successfully');
  };

  // Calculate summary statistics
  const totalExpenses = receipts.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0);
  const pendingExpenses = receipts.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0);
  const reimbursedAmount = receipts.filter(r => r.status === 'reimbursed').reduce((sum, r) => sum + r.amount, 0);
  const thisMonthExpenses = receipts.filter(r => {
    const receiptDate = new Date(r.date);
    const currentDate = new Date();
    return receiptDate.getMonth() === currentDate.getMonth() && 
           receiptDate.getFullYear() === currentDate.getFullYear();
  }).reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Receipts & Expenses</h1>
        <p className="text-muted-foreground">Track and manage business expenses and receipt documentation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Approved</p>
                <p className="text-2xl font-bold text-green-600">${totalExpenses.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingExpenses.toFixed(2)}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reimbursed</p>
                <p className="text-2xl font-bold text-blue-600">${reimbursedAmount.toFixed(2)}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">${thisMonthExpenses.toFixed(2)}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by vendor, description, or receipt number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="tolls">Tolls</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="lodging">Lodging</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="permits">Permits</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="reimbursed">Reimbursed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddingReceipt(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Receipts</CardTitle>
          <CardDescription>Detailed expense tracking and receipt management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.receiptNumber}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.vendor}</TableCell>
                    <TableCell>{getCategoryBadge(receipt.category)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{receipt.description}</TableCell>
                    <TableCell className="font-semibold">${receipt.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReceipt(receipt)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(receipt.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReceipt(receipt.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Receipt Dialog */}
      <Dialog open={isAddingReceipt} onOpenChange={setIsAddingReceipt}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Receipt</DialogTitle>
            <DialogDescription>
              Record a new expense receipt with all relevant details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receiptNumber">Receipt Number</Label>
              <Input
                id="receiptNumber"
                value={newReceipt.receiptNumber}
                onChange={(e) => setNewReceipt({ ...newReceipt, receiptNumber: e.target.value })}
                placeholder="Auto-generated if empty"
              />
            </div>
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={newReceipt.date}
                onChange={(e) => setNewReceipt({ ...newReceipt, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="vendor">Vendor *</Label>
              <Input
                id="vendor"
                value={newReceipt.vendor}
                onChange={(e) => setNewReceipt({ ...newReceipt, vendor: e.target.value })}
                placeholder="Shell Gas Station"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={newReceipt.category} onValueChange={(value: unknown) => setNewReceipt({ ...newReceipt, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fuel">Fuel</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="tolls">Tolls</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="lodging">Lodging</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="permits">Permits</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={newReceipt.amount}
                onChange={(e) => setNewReceipt({ ...newReceipt, amount: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="taxAmount">Tax Amount</Label>
              <Input
                id="taxAmount"
                type="number"
                step="0.01"
                value={newReceipt.taxAmount}
                onChange={(e) => setNewReceipt({ ...newReceipt, taxAmount: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={newReceipt.paymentMethod} onValueChange={(value: unknown) => setNewReceipt({ ...newReceipt, paymentMethod: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company_card">Company Card</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newReceipt.location}
                onChange={(e) => setNewReceipt({ ...newReceipt, location: e.target.value })}
                placeholder="Chicago, IL"
              />
            </div>
            <div>
              <Label htmlFor="tripNumber">Trip Number</Label>
              <Input
                id="tripNumber"
                value={newReceipt.tripNumber}
                onChange={(e) => setNewReceipt({ ...newReceipt, tripNumber: e.target.value })}
                placeholder="TR-2024-XXX"
              />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                value={newReceipt.mileage}
                onChange={(e) => setNewReceipt({ ...newReceipt, mileage: Number(e.target.value) })}
                placeholder="Current odometer reading"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newReceipt.description}
                onChange={(e) => setNewReceipt({ ...newReceipt, description: e.target.value })}
                placeholder="Detailed description of the expense..."
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={newReceipt.notes}
                onChange={(e) => setNewReceipt({ ...newReceipt, notes: e.target.value })}
                placeholder="Any additional notes or comments..."
                rows={2}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddingReceipt(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReceipt}>
              Add Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Receipt Dialog */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedReceipt && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Receipt Details: {selectedReceipt.receiptNumber}
                </DialogTitle>
                <DialogDescription>
                  Complete expense receipt information and status
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-semibold">{selectedReceipt.date}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Vendor</div>
                      <div className="font-semibold">{selectedReceipt.vendor}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Amount</div>
                      <div className="font-semibold text-lg">${selectedReceipt.amount.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Category and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-2">Category</div>
                      {getCategoryBadge(selectedReceipt.category)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-2">Status</div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(selectedReceipt.status)}
                        {selectedReceipt.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdateStatus(selectedReceipt.id, 'approved')}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(selectedReceipt.id, 'rejected')}>
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expense Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Description</div>
                        <div className="font-semibold">{selectedReceipt.description}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Payment Method</div>
                        <div className="font-semibold">{selectedReceipt.paymentMethod.replace('_', ' ').toUpperCase()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-semibold">{selectedReceipt.location}</div>
                      </div>
                      {selectedReceipt.taxAmount && (
                        <div>
                          <div className="text-sm text-muted-foreground">Tax Amount</div>
                          <div className="font-semibold">${selectedReceipt.taxAmount.toFixed(2)}</div>
                        </div>
                      )}
                      {selectedReceipt.tripNumber && (
                        <div>
                          <div className="text-sm text-muted-foreground">Trip Number</div>
                          <div className="font-semibold">{selectedReceipt.tripNumber}</div>
                        </div>
                      )}
                      {selectedReceipt.mileage && (
                        <div>
                          <div className="text-sm text-muted-foreground">Mileage</div>
                          <div className="font-semibold">{selectedReceipt.mileage.toLocaleString()} miles</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedReceipt.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Additional Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 bg-muted rounded-lg">{selectedReceipt.notes}</div>
                    </CardContent>
                  </Card>
                )}

                {/* Approval Info */}
                {selectedReceipt.approvedBy && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Approval Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Approved By</div>
                          <div className="font-semibold">{selectedReceipt.approvedBy}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Submitted Date</div>
                          <div className="font-semibold">{selectedReceipt.submittedDate}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceiptsPage;