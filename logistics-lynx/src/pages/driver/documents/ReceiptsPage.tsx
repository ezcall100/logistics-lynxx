/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Receipt, Upload, Download, Edit, Plus, Search, Eye, Trash2, DollarSign, Calendar, FileText, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ReceiptRecord {
  id: string;
  receiptNumber: string;
  date: string;
  vendor: string;
  category: 'fuel' | 'maintenance' | 'tolls' | 'meals' | 'lodging' | 'other';
  amount: number;
  taxAmount: number;
  description: string;
  paymentMethod: string;
  location: string;
  imageUrl?: string;
  reimbursable: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'submitted';
  submittedDate?: string;
  notes: string;
}

const receipts: ReceiptRecord[] = [
  {
    id: 'RC001',
    receiptNumber: 'RCP-2024-001',
    date: '2024-01-19',
    vendor: 'Pilot Flying J',
    category: 'fuel',
    amount: 287.45,
    taxAmount: 23.15,
    description: 'Fuel purchase - Diesel',
    paymentMethod: 'Fleet Card',
    location: 'Denver, CO',
    imageUrl: '/receipt-001.jpg',
    reimbursable: false,
    status: 'approved',
    submittedDate: '2024-01-19',
    notes: 'Full tank refuel'
  },
  {
    id: 'RC002',
    receiptNumber: 'RCP-2024-002',
    date: '2024-01-18',
    vendor: 'TA Travel Centers',
    category: 'meals',
    amount: 28.75,
    taxAmount: 2.30,
    description: 'Dinner - Driver meal',
    paymentMethod: 'Personal Card',
    location: 'Kansas City, MO',
    imageUrl: '/receipt-002.jpg',
    reimbursable: true,
    status: 'pending',
    notes: 'Business meal during mandatory rest'
  },
  {
    id: 'RC003',
    receiptNumber: 'RCP-2024-003',
    date: '2024-01-17',
    vendor: 'Love\'s Travel Stops',
    category: 'maintenance',
    amount: 156.89,
    taxAmount: 12.55,
    description: 'Oil change and filter replacement',
    paymentMethod: 'Company Credit',
    location: 'Chicago, IL',
    imageUrl: '/receipt-003.jpg',
    reimbursable: false,
    status: 'submitted',
    submittedDate: '2024-01-17',
    notes: 'Scheduled maintenance'
  }
];

const ReceiptsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddingReceipt, setIsAddingReceipt] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<ReceiptRecord | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<ReceiptRecord | null>(null);

  const form = useForm({
    defaultValues: {
      receiptNumber: 'RCP-2024-004',
      date: '2024-01-20',
      vendor: 'Speedway',
      category: 'fuel',
      amount: '195.67',
      taxAmount: '15.65',
      description: 'Fuel purchase - Diesel',
      paymentMethod: 'Fleet Card',
      location: 'Phoenix, AZ',
      reimbursable: 'false',
      notes: 'Fuel stop en route to delivery'
    }
  });

  const editForm = useForm({
    defaultValues: {
      receiptNumber: '',
      date: '',
      vendor: '',
      category: '',
      amount: '',
      taxAmount: '',
      description: '',
      paymentMethod: '',
      location: '',
      reimbursable: '',
      notes: ''
    }
  });

  const handleAddReceipt = (data: unknown) => {
    console.log('Adding receipt:', data);
    toast.success('Receipt added successfully');
    setIsAddingReceipt(false);
    form.reset();
  };

  const handleEditReceipt = (data: unknown) => {
    console.log('Editing receipt:', data);
    toast.success('Receipt updated successfully');
    setEditingReceipt(null);
    editForm.reset();
  };

  const handleDeleteReceipt = (id: string) => {
    console.log('Deleting receipt:', id);
    toast.success('Receipt deleted successfully');
  };

  const handleUploadImage = () => {
    console.log('Uploading receipt image');
    toast.success('Receipt image uploaded successfully');
  };

  const handleSubmitForReimbursement = (id: string) => {
    console.log('Submitting receipt for reimbursement:', id);
    toast.success('Receipt submitted for reimbursement');
  };

  const handleExportReceipts = () => {
    console.log('Exporting receipts');
    toast.success('Receipts exported successfully');
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      fuel: 'bg-blue-500',
      maintenance: 'bg-orange-500',
      tolls: 'bg-purple-500',
      meals: 'bg-green-500',
      lodging: 'bg-indigo-500',
      other: 'bg-gray-500'
    };
    return (
      <Badge variant="outline" className={`${categoryColors[category as keyof typeof categoryColors]} text-white`}>
        {category}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'submitted':
        return <Badge variant="default" className="bg-blue-500">Submitted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || receipt.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || receipt.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const reimbursableAmount = filteredReceipts
    .filter(receipt => receipt.reimbursable && receipt.status !== 'rejected')
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Receipts</h1>
          <p className="text-muted-foreground">Track and manage your expense receipts</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportReceipts} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleUploadImage} variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Scan Receipt
          </Button>
          <Dialog open={isAddingReceipt} onOpenChange={setIsAddingReceipt}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Receipt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Receipt</DialogTitle>
                <DialogDescription>Record a new expense receipt</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddReceipt)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="receiptNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receipt Number</FormLabel>
                          <FormControl>
                            <Input placeholder="RCP-2024-XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vendor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vendor</FormLabel>
                          <FormControl>
                            <Input placeholder="Business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fuel">Fuel</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="tolls">Tolls</SelectItem>
                              <SelectItem value="meals">Meals</SelectItem>
                              <SelectItem value="lodging">Lodging</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="taxAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Amount</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Fleet Card">Fleet Card</SelectItem>
                              <SelectItem value="Company Credit">Company Credit</SelectItem>
                              <SelectItem value="Personal Card">Personal Card</SelectItem>
                              <SelectItem value="Cash">Cash</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of expense" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reimbursable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reimbursable</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Is this reimbursable?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Additional notes..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop receipt image or click to upload
                    </p>
                    <Button type="button" variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddingReceipt(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Receipt</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReceipts.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reimbursable</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${reimbursableAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Pending/approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReceipts.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>
      </div>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Receipt Records</CardTitle>
          <CardDescription>View and manage your expense receipts</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by vendor, description, or receipt number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fuel">Fuel</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="tolls">Tolls</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="lodging">Lodging</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Receipts Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reimbursable</TableHead>
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
                  <TableCell className="font-medium">${receipt.amount.toFixed(2)}</TableCell>
                  <TableCell>{receipt.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                  <TableCell>
                    <Badge variant={receipt.reimbursable ? 'default' : 'outline'}>
                      {receipt.reimbursable ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setViewingReceipt(receipt)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingReceipt(receipt);
                          editForm.reset({
                            receiptNumber: receipt.receiptNumber,
                            date: receipt.date,
                            vendor: receipt.vendor,
                            category: receipt.category,
                            amount: receipt.amount.toString(),
                            taxAmount: receipt.taxAmount.toString(),
                            description: receipt.description,
                            paymentMethod: receipt.paymentMethod,
                            location: receipt.location,
                            reimbursable: receipt.reimbursable.toString(),
                            notes: receipt.notes
                          });
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {receipt.reimbursable && receipt.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleSubmitForReimbursement(receipt.id)}
                        >
                          Submit
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteReceipt(receipt.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Receipt Dialog */}
      <Dialog open={viewingReceipt !== null} onOpenChange={() => setViewingReceipt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Receipt Details</DialogTitle>
            <DialogDescription>{viewingReceipt?.receiptNumber}</DialogDescription>
          </DialogHeader>
          {viewingReceipt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <p className="text-sm font-medium">{viewingReceipt.date}</p>
                </div>
                <div>
                  <Label>Vendor</Label>
                  <p className="text-sm font-medium">{viewingReceipt.vendor}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <div className="mt-1">{getCategoryBadge(viewingReceipt.category)}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingReceipt.status)}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <p className="text-sm font-medium">${viewingReceipt.amount.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Tax Amount</Label>
                  <p className="text-sm font-medium">${viewingReceipt.taxAmount.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <p className="text-sm font-medium">{viewingReceipt.paymentMethod}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm font-medium">{viewingReceipt.location}</p>
                </div>
                <div>
                  <Label>Reimbursable</Label>
                  <Badge variant={viewingReceipt.reimbursable ? 'default' : 'outline'}>
                    {viewingReceipt.reimbursable ? 'Yes' : 'No'}
                  </Badge>
                </div>
                {viewingReceipt.submittedDate && (
                  <div>
                    <Label>Submitted Date</Label>
                    <p className="text-sm font-medium">{viewingReceipt.submittedDate}</p>
                  </div>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{viewingReceipt.description}</p>
              </div>
              <div>
                <Label>Notes</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{viewingReceipt.notes}</p>
              </div>
              {viewingReceipt.imageUrl && (
                <div>
                  <Label>Receipt Image</Label>
                  <div className="mt-2 border rounded-lg p-4 text-center bg-muted">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Receipt image available</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Eye className="w-4 h-4 mr-2" />
                      View Image
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setViewingReceipt(null)}>
                  Close
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Receipt Dialog */}
      <Dialog open={editingReceipt !== null} onOpenChange={() => setEditingReceipt(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Receipt</DialogTitle>
            <DialogDescription>Update receipt information</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditReceipt)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="receiptNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receipt Number</FormLabel>
                      <FormControl>
                        <Input placeholder="RCP-2024-XXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor</FormLabel>
                      <FormControl>
                        <Input placeholder="Business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fuel">Fuel</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="tolls">Tolls</SelectItem>
                          <SelectItem value="meals">Meals</SelectItem>
                          <SelectItem value="lodging">Lodging</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="taxAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Amount</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fleet Card">Fleet Card</SelectItem>
                          <SelectItem value="Company Credit">Company Credit</SelectItem>
                          <SelectItem value="Personal Card">Personal Card</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of expense" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="reimbursable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reimbursable</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Is this reimbursable?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingReceipt(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Receipt</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceiptsPage;