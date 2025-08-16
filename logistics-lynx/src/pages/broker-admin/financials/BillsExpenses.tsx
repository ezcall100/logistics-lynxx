/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, DollarSign, Calendar, FileText, CheckCircle, Clock, AlertTriangle, Receipt, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";

const BillsExpenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewBillForm, setShowNewBillForm] = useState(false);

  // Sample data for bills and expenses
  const [bills] = useState([
    {
      id: "BILL-001",
      vendor: "Fuel Stop Network",
      amount: 1250.00,
      dueDate: "2024-01-25",
      category: "Fuel",
      status: "pending",
      billDate: "2024-01-15",
      invoiceNumber: "INV-2024-001",
      description: "Fuel purchases for fleet"
    },
    {
      id: "BILL-002",
      vendor: "Insurance Group LLC",
      amount: 3500.00,
      dueDate: "2024-01-30",
      category: "Insurance",
      status: "approved",
      billDate: "2024-01-10",
      invoiceNumber: "POL-789123",
      description: "Monthly liability insurance premium"
    },
    {
      id: "BILL-003",
      vendor: "Office Depot",
      amount: 450.75,
      dueDate: "2024-01-20",
      category: "Office Supplies",
      status: "paid",
      billDate: "2024-01-05",
      invoiceNumber: "OD-456789",
      description: "Office supplies and equipment"
    },
    {
      id: "BILL-004",
      vendor: "Maintenance Pro",
      amount: 850.00,
      dueDate: "2024-01-28",
      category: "Vehicle Maintenance",
      status: "overdue",
      billDate: "2024-01-01",
      invoiceNumber: "MP-2024-015",
      description: "Truck maintenance and repairs"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock },
      approved: { variant: "default" as const, icon: CheckCircle },
      paid: { variant: "default" as const, icon: CheckCircle },
      overdue: { variant: "destructive" as const, icon: AlertTriangle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredBills = bills.filter(bill =>
    bill.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.invoiceNumber.includes(searchTerm)
  );

  const totalPending = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalOverdue = bills
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalPaid = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bills & Expenses</h1>
            <p className="text-muted-foreground">Track and manage vendor bills and business expenses</p>
          </div>
          <Button onClick={() => setShowNewBillForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Bill
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.filter(b => b.status === 'pending').length}</div>
              <p className="text-xs text-muted-foreground">
                ${totalPending.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{bills.filter(b => b.status === 'overdue').length}</div>
              <p className="text-xs text-muted-foreground">
                ${totalOverdue.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.filter(b => b.status === 'paid').length}</div>
              <p className="text-xs text-muted-foreground">
                ${totalPaid.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalPending + totalOverdue + totalPaid).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* New Bill Form */}
        {showNewBillForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Bill</CardTitle>
              <CardDescription>Enter bill details and upload receipt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input id="vendor" placeholder="Enter vendor name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billDate">Bill Date</Label>
                  <Input id="billDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fuel">Fuel</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="maintenance">Vehicle Maintenance</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input id="invoiceNumber" placeholder="Enter invoice number" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter bill description" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="receipt">Upload Receipt</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Upload receipt or invoice (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>Save Bill</Button>
                <Button variant="outline" onClick={() => setShowNewBillForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bills Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bills & Expenses</CardTitle>
            <CardDescription>Manage vendor bills and business expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by vendor, category, or invoice number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.vendor}</TableCell>
                    <TableCell>${bill.amount.toLocaleString()}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(bill.status)}</TableCell>
                    <TableCell>{bill.invoiceNumber}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {bill.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            <Receipt className="w-4 h-4" />
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
      </div>
    </Layout>
  );
};

export default BillsExpenses;