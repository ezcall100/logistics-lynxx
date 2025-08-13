import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Calendar as CalendarIcon,
  FileText,
  DollarSign,
  Users,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CustomerStatements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // Sample customer statements data
  const statements = [
    {
      id: '1',
      statementNumber: 'STMT-2024-001',
      customer: 'ABC Logistics Corp',
      customerId: 'CUST-001',
      statementDate: '2024-01-31',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-31',
      totalAmount: 15750.00,
      balanceDue: 8250.00,
      status: 'sent',
      sentDate: '2024-02-01',
      dueDate: '2024-02-15',
      paymentTerms: 'NET 15',
      method: 'email',
      invoiceCount: 5,
      paidAmount: 7500.00
    },
    {
      id: '2',
      statementNumber: 'STMT-2024-002',
      customer: 'Global Shipping Ltd',
      customerId: 'CUST-002',
      statementDate: '2024-01-31',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-31',
      totalAmount: 22400.00,
      balanceDue: 22400.00,
      status: 'draft',
      sentDate: null,
      dueDate: '2024-02-15',
      paymentTerms: 'NET 15',
      method: 'email',
      invoiceCount: 8,
      paidAmount: 0
    },
    {
      id: '3',
      statementNumber: 'STMT-2024-003',
      customer: 'Express Freight Co',
      customerId: 'CUST-003',
      statementDate: '2024-01-31',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-31',
      totalAmount: 8900.00,
      balanceDue: 0,
      status: 'paid',
      sentDate: '2024-02-01',
      dueDate: '2024-02-15',
      paymentTerms: 'NET 15',
      method: 'email',
      invoiceCount: 3,
      paidAmount: 8900.00
    },
    {
      id: '4',
      statementNumber: 'STMT-2024-004',
      customer: 'Metro Transport Inc',
      customerId: 'CUST-004',
      statementDate: '2024-01-31',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-31',
      totalAmount: 31200.00,
      balanceDue: 15600.00,
      status: 'overdue',
      sentDate: '2024-02-01',
      dueDate: '2024-02-15',
      paymentTerms: 'NET 15',
      method: 'email',
      invoiceCount: 12,
      paidAmount: 15600.00
    },
    {
      id: '5',
      statementNumber: 'STMT-2024-005',
      customer: 'Nationwide Logistics',
      customerId: 'CUST-005',
      statementDate: '2024-01-31',
      periodStart: '2024-01-01',
      periodEnd: '2024-01-31',
      totalAmount: 18650.00,
      balanceDue: 18650.00,
      status: 'sent',
      sentDate: '2024-02-01',
      dueDate: '2024-02-15',
      paymentTerms: 'NET 15',
      method: 'email',
      invoiceCount: 7,
      paidAmount: 0
    },
  ];

  // Sample customers for dropdown
  const customers = [
    { id: 'CUST-001', name: 'ABC Logistics Corp' },
    { id: 'CUST-002', name: 'Global Shipping Ltd' },
    { id: 'CUST-003', name: 'Express Freight Co' },
    { id: 'CUST-004', name: 'Metro Transport Inc' },
    { id: 'CUST-005', name: 'Nationwide Logistics' },
  ];

  const statusOptions = ['all', 'draft', 'sent', 'paid', 'overdue'];

  const filteredStatements = statements.filter(statement => {
    const matchesSearch = statement.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.statementNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || statement.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800"><Clock className="h-3 w-3 mr-1" />Draft</Badge>;
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800"><Send className="h-3 w-3 mr-1" />Sent</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleGenerateStatement = () => {
    toast({
      title: "Statement Generated",
      description: "Customer statement has been generated successfully.",
    });
    setIsGenerateDialogOpen(false);
  };

  const handleSendStatement = (statementId: string) => {
    toast({
      title: "Statement Sent",
      description: "Statement has been sent to the customer via email.",
    });
  };

  // Calculate summary statistics
  const totalStatements = statements.length;
  const totalAmountDue = statements.reduce((sum, stmt) => sum + stmt.balanceDue, 0);
  const overdue = statements.filter(stmt => stmt.status === 'overdue').length;
  const sentCount = statements.filter(stmt => stmt.status === 'sent').length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Customer Statements</h1>
            <p className="text-muted-foreground">
              Generate and manage customer account statements
            </p>
          </div>
          <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate Statement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Customer Statement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Period Start</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Period End</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label htmlFor="method">Delivery Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="mail">Physical Mail</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGenerateStatement} className="w-full">
                  Generate Statement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Statements</p>
                  <p className="text-lg font-bold">
                    {totalStatements}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount Due</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatCurrency(totalAmountDue)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-red-100">
                  <DollarSign className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sent</p>
                  <p className="text-lg font-bold">
                    {sentCount}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <Mail className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-lg font-bold text-red-600">
                    {overdue}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-orange-100">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Statement History</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search statements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Statement #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Balance Due</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStatements.map((statement) => (
                  <TableRow key={statement.id}>
                    <TableCell className="font-mono font-medium">
                      {statement.statementNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{statement.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {statement.invoiceCount} invoices
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(statement.periodStart), 'MMM dd')} - {format(new Date(statement.periodEnd), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(statement.totalAmount)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${statement.balanceDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(statement.balanceDue)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(statement.dueDate), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {statement.paymentTerms}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(statement.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {statement.status === 'draft' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => handleSendStatement(statement.id)}
                          >
                            <Send className="h-4 w-4" />
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

export default CustomerStatements;