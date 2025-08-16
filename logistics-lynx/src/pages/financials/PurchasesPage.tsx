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
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  MoreHorizontal,
  ShoppingCart,
  Building2,
  Receipt,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';

// Mock data
const billsData = [
  { id: 'BILL-001', vendor: 'Fuel Express', amount: 2500, status: 'pending', dueDate: '2024-01-20', category: 'Fuel', dateReceived: '2024-01-15' },
  { id: 'BILL-002', vendor: 'Maintenance Plus', amount: 1200, status: 'paid', dueDate: '2024-01-18', category: 'Maintenance', dateReceived: '2024-01-10' },
  { id: 'BILL-003', vendor: 'Insurance Co', amount: 3500, status: 'overdue', dueDate: '2024-01-10', category: 'Insurance', dateReceived: '2024-01-05' },
  { id: 'BILL-004', vendor: 'Parts Supply', amount: 850, status: 'approved', dueDate: '2024-01-25', category: 'Parts', dateReceived: '2024-01-12' },
  { id: 'BILL-005', vendor: 'Office Depot', amount: 320, status: 'paid', dueDate: '2024-01-16', category: 'Office', dateReceived: '2024-01-08' },
];

const vendorsData = [
  { id: 'VEN-001', name: 'Fuel Express', contact: 'John Smith', email: 'john@fuelexpress.com', phone: '555-0123', totalSpent: 25000, status: 'active' },
  { id: 'VEN-002', name: 'Maintenance Plus', contact: 'Sarah Johnson', email: 'sarah@maintenanceplus.com', phone: '555-0124', totalSpent: 18500, status: 'active' },
  { id: 'VEN-003', name: 'Insurance Co', contact: 'Mike Wilson', email: 'mike@insuranceco.com', phone: '555-0125', totalSpent: 42000, status: 'active' },
  { id: 'VEN-004', name: 'Parts Supply', contact: 'Lisa Davis', email: 'lisa@partssupply.com', phone: '555-0126', totalSpent: 12300, status: 'inactive' },
];

const purchaseOrdersData = [
  { id: 'PO-001', vendor: 'Parts Supply', amount: 1500, status: 'pending', orderDate: '2024-01-15', expectedDate: '2024-01-22', items: 5 },
  { id: 'PO-002', vendor: 'Fuel Express', amount: 5000, status: 'delivered', orderDate: '2024-01-10', expectedDate: '2024-01-12', items: 1 },
  { id: 'PO-003', vendor: 'Office Depot', amount: 250, status: 'shipped', orderDate: '2024-01-12', expectedDate: '2024-01-18', items: 8 },
];

const PurchasesPage = () => {
  const [activeTab, setActiveTab] = useState('bills');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('bill');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      pending: { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
      overdue: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' },
      approved: { variant: 'outline' as const, icon: CheckCircle, color: 'text-blue-600' },
      active: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      inactive: { variant: 'secondary' as const, icon: Clock, color: 'text-gray-600' },
      delivered: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      shipped: { variant: 'secondary' as const, icon: Clock, color: 'text-blue-600' },
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

  const CreateBillForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vendor">Vendor</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fuel">Fuel Express</SelectItem>
              <SelectItem value="maintenance">Maintenance Plus</SelectItem>
              <SelectItem value="insurance">Insurance Co</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" placeholder="0.00" type="number" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fuel">Fuel</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="parts">Parts</SelectItem>
              <SelectItem value="office">Office Supplies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Bill description..." />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Bill</Button>
      </div>
    </div>
  );

  const CreateVendorForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vendorName">Vendor Name</Label>
          <Input id="vendorName" placeholder="Company name" />
        </div>
        <div>
          <Label htmlFor="contact">Contact Person</Label>
          <Input id="contact" placeholder="Contact name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="contact@vendor.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="555-0123" />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" placeholder="Vendor address..." />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Vendor</Button>
      </div>
    </div>
  );

  const openCreateDialog = (type: string) => {
    setDialogType(type);
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchases</h1>
          <p className="text-muted-foreground">
            Manage bills, vendors, purchase orders, and payment status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openCreateDialog('vendor')} className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Add Vendor
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openCreateDialog('bill')} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {dialogType === 'bill' ? 'Create New Bill' : 'Add New Vendor'}
                </DialogTitle>
              </DialogHeader>
              {dialogType === 'bill' ? <CreateBillForm /> : <CreateVendorForm />}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,370</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600" /> +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,850</div>
            <p className="text-xs text-muted-foreground">
              3 bills pending payment
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 new vendor this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Payment Time</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-600" /> 3 days faster
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bills" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Bills
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Vendors
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills, vendors..."
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

        {/* Bills Tab */}
        <TabsContent value="bills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billsData.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>{bill.vendor}</TableCell>
                      <TableCell>${bill.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell>{bill.dueDate}</TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Pay Bill</DropdownMenuItem>
                            <DropdownMenuItem>Edit Bill</DropdownMenuItem>
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

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorsData.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.id}</TableCell>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>{vendor.phone}</TableCell>
                      <TableCell>${vendor.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Vendor</DropdownMenuItem>
                            <DropdownMenuItem>View Bills</DropdownMenuItem>
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

        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrdersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.vendor}</TableCell>
                      <TableCell>${order.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.expectedDate}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Track Order</DropdownMenuItem>
                            <DropdownMenuItem>Edit Order</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
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

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Payment History</h3>
                <p className="text-muted-foreground mb-4">
                  View your complete payment history and transaction records.
                </p>
                <Button>View All Payments</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchasesPage;