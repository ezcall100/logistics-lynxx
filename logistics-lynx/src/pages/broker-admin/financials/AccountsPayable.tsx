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
  Calendar,
  DollarSign,
  Truck,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  CreditCard
} from 'lucide-react';

const AccountsPayable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const payables = [
    {
      id: "BILL-2024-001",
      vendor: "Elite Carriers LLC",
      vendorType: "carrier",
      amount: 28450,
      dueDate: "2024-02-10",
      billDate: "2024-01-26",
      status: "pending",
      loadId: "LOAD-2024-156",
      daysUntilDue: 5
    },
    {
      id: "BILL-2024-002",
      vendor: "FastTrack Logistics",
      vendorType: "carrier", 
      amount: 35680,
      dueDate: "2024-02-08",
      billDate: "2024-01-24",
      status: "approved",
      loadId: "LOAD-2024-143",
      daysUntilDue: 3
    },
    {
      id: "BILL-2024-003",
      vendor: "Office Supplies Co",
      vendorType: "vendor",
      amount: 1250,
      dueDate: "2024-02-15",
      billDate: "2024-01-16",
      status: "pending",
      loadId: null,
      daysUntilDue: 10
    },
    {
      id: "BILL-2024-004",
      vendor: "Prime Transport Inc",
      vendorType: "carrier",
      amount: 42150,
      dueDate: "2024-02-05",
      billDate: "2024-01-22",
      status: "overdue",
      loadId: "LOAD-2024-134",
      daysUntilDue: -1
    },
    {
      id: "BILL-2024-005",
      vendor: "Metro Fuel Services",
      vendorType: "vendor",
      amount: 5680,
      dueDate: "2024-02-12",
      billDate: "2024-01-29",
      status: "approved",
      loadId: null,
      daysUntilDue: 7
    }
  ];

  const paymentQueue = [
    {
      batchId: "BATCH-2024-001",
      paymentDate: "2024-02-05",
      totalAmount: 125680,
      vendorCount: 8,
      status: "ready"
    },
    {
      batchId: "BATCH-2024-002", 
      paymentDate: "2024-02-08",
      totalAmount: 89450,
      vendorCount: 5,
      status: "processing"
    },
    {
      batchId: "BATCH-2024-003",
      paymentDate: "2024-02-12",
      totalAmount: 156780,
      vendorCount: 12,
      status: "scheduled"
    }
  ];

  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
    let icon = Clock;

    switch (status) {
      case "pending":
        variant = "secondary";
        icon = Clock;
        break;
      case "approved":
        variant = "default";
        icon = CheckCircle;
        break;
      case "overdue":
        variant = "destructive";
        icon = AlertTriangle;
        break;
      case "paid":
        variant = "default";
        icon = CheckCircle;
        break;
      case "ready":
        variant = "default";
        icon = CheckCircle;
        break;
      case "processing":
        variant = "secondary";
        icon = Clock;
        break;
      case "scheduled":
        variant = "outline";
        icon = Calendar;
        break;
      default:
        variant = "secondary";
        icon = Clock;
    }

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {React.createElement(icon, { className: "w-3 h-3" })}
        {status}
      </Badge>
    );
  };

  const getVendorIcon = (type: string) => {
    return type === 'carrier' ? Truck : Building;
  };

  const filteredPayables = payables.filter(item =>
    item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts Payable</h1>
          <p className="text-muted-foreground">Manage vendor bills and payment processing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export AP
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Bill
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$113,210</div>
            <p className="text-xs text-muted-foreground">Across 5 bills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$64,130</div>
            <p className="text-xs text-muted-foreground">3 bills due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$42,150</div>
            <p className="text-xs text-muted-foreground">1 bill overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$41,360</div>
            <p className="text-xs text-muted-foreground">Ready for payment</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bills">Outstanding Bills</TabsTrigger>
          <TabsTrigger value="payments">Payment Queue</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-6">
          {/* Bills Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Outstanding Bills</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search bills or vendors..."
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
                    <TableHead>Bill #</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Load ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayables.map((item) => {
                    const VendorIcon = getVendorIcon(item.vendorType);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <VendorIcon className="w-4 h-4 text-muted-foreground" />
                            {item.vendor}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {item.vendorType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">${item.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {item.dueDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.loadId ? (
                            <span className="text-blue-600 font-medium">{item.loadId}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {item.status === 'approved' && (
                              <Button variant="ghost" size="sm">
                                <CreditCard className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing Queue</CardTitle>
              <CardDescription>Scheduled payment batches and processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Vendor Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentQueue.map((batch) => (
                    <TableRow key={batch.batchId}>
                      <TableCell className="font-medium">{batch.batchId}</TableCell>
                      <TableCell>{batch.paymentDate}</TableCell>
                      <TableCell className="font-semibold">${batch.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{batch.vendorCount} vendors</TableCell>
                      <TableCell>{getStatusBadge(batch.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {batch.status === 'ready' && (
                            <Button variant="ghost" size="sm">
                              <CreditCard className="w-4 h-4" />
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

        <TabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
              <CardDescription>Manage vendor information and payment preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Building className="w-12 h-12 mx-auto mb-4" />
                <p>Vendor management and setup features</p>
                <p className="text-sm">Add vendors, configure payment terms, and manage vendor relationships</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountsPayable;