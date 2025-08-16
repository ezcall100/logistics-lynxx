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
import { Printer, Plus, Search, Filter, DollarSign, Calendar, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const CheckPrinting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewCheckForm, setShowNewCheckForm] = useState(false);

  // Sample data for checks
  const [checks] = useState([
    {
      id: "CHK-001",
      checkNumber: "001001",
      payee: "ABC Transportation LLC",
      amount: 2850.00,
      date: "2024-01-15",
      memo: "Payment for Load #L-2024-001",
      status: "printed",
      account: "Operating Account",
      category: "Carrier Payments"
    },
    {
      id: "CHK-002", 
      checkNumber: "001002",
      payee: "FastTrack Logistics",
      amount: 1250.75,
      date: "2024-01-16",
      memo: "Payment for Load #L-2024-002",
      status: "pending",
      account: "Operating Account",
      category: "Carrier Payments"
    },
    {
      id: "CHK-003",
      checkNumber: "001003",
      payee: "Office Supply Co",
      amount: 324.50,
      date: "2024-01-17",
      memo: "Office supplies and equipment",
      status: "void",
      account: "Operating Account",
      category: "Office Expenses"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      printed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      void: { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-600" }
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

  const filteredChecks = checks.filter(check =>
    check.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    check.checkNumber.includes(searchTerm) ||
    check.memo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPendingAmount = checks
    .filter(check => check.status === 'pending')
    .reduce((sum, check) => sum + check.amount, 0);

  const totalPrintedAmount = checks
    .filter(check => check.status === 'printed')
    .reduce((sum, check) => sum + check.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Check Printing</h1>
            <p className="text-muted-foreground">Manage and print checks for payments</p>
          </div>
          <Button onClick={() => setShowNewCheckForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Check
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Checks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checks.filter(c => c.status === 'pending').length}</div>
              <p className="text-xs text-muted-foreground">
                ${totalPendingAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Printed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checks.filter(c => c.status === 'printed').length}</div>
              <p className="text-xs text-muted-foreground">
                ${totalPrintedAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Check Number</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">001004</div>
              <p className="text-xs text-muted-foreground">
                Ready to print
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$85,432.18</div>
              <p className="text-xs text-muted-foreground">
                Operating Account
              </p>
            </CardContent>
          </Card>
        </div>

        {/* New Check Form */}
        {showNewCheckForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Check</CardTitle>
              <CardDescription>Enter check details for printing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payee">Payee</Label>
                  <Input id="payee" placeholder="Enter payee name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operating">Operating Account</SelectItem>
                      <SelectItem value="payroll">Payroll Account</SelectItem>
                      <SelectItem value="escrow">Escrow Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="memo">Memo</Label>
                  <Textarea id="memo" placeholder="Enter memo or description" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Check
                </Button>
                <Button variant="outline" onClick={() => setShowNewCheckForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Check History</CardTitle>
            <CardDescription>View and manage printed checks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by payee, check number, or memo..."
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
                  <TableHead>Check #</TableHead>
                  <TableHead>Payee</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Memo</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecks.map((check) => (
                  <TableRow key={check.id}>
                    <TableCell className="font-medium">{check.checkNumber}</TableCell>
                    <TableCell>{check.payee}</TableCell>
                    <TableCell>${check.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(check.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(check.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{check.memo}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {check.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            <Printer className="w-4 h-4" />
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

export default CheckPrinting;