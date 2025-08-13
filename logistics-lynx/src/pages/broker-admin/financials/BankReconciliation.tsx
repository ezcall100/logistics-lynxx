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
import {
  Upload,
  Download,
  Check,
  X,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BankReconciliation = () => {
  const { toast } = useToast();
  const [selectedAccount, setSelectedAccount] = useState('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Sample bank accounts
  const bankAccounts = [
    { id: 'main', name: 'Main Operating Account', number: '****1234', balance: 124300 },
    { id: 'payroll', name: 'Payroll Account', number: '****5678', balance: 45000 },
    { id: 'escrow', name: 'Escrow Account', number: '****9012', balance: 15500 },
  ];

  // Sample reconciliation data
  const reconciliationData = {
    bookBalance: 124300,
    bankBalance: 123850,
    difference: -450,
    lastReconciled: '2024-01-10',
    pendingItems: 3,
    reconciledItems: 127
  };

  // Sample transactions
  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Customer Payment - INV-001',
      bookAmount: 5500.00,
      bankAmount: 5500.00,
      status: 'matched',
      type: 'deposit',
      reference: 'REC-001'
    },
    {
      id: '2',
      date: '2024-01-16',
      description: 'Carrier Payment - ACH',
      bookAmount: -4200.00,
      bankAmount: -4200.00,
      status: 'matched',
      type: 'withdrawal',
      reference: 'PAY-001'
    },
    {
      id: '3',
      date: '2024-01-17',
      description: 'Office Rent Payment',
      bookAmount: -2000.00,
      bankAmount: -2000.00,
      status: 'matched',
      type: 'withdrawal',
      reference: 'EXP-001'
    },
    {
      id: '4',
      date: '2024-01-18',
      description: 'Bank Service Fee',
      bookAmount: 0,
      bankAmount: -25.00,
      status: 'bank_only',
      type: 'withdrawal',
      reference: 'BSF-001'
    },
    {
      id: '5',
      date: '2024-01-19',
      description: 'Pending Customer Payment',
      bookAmount: 3200.00,
      bankAmount: 0,
      status: 'book_only',
      type: 'deposit',
      reference: 'REC-002'
    },
    {
      id: '6',
      date: '2024-01-20',
      description: 'Insurance Premium',
      bookAmount: -1250.00,
      bankAmount: -1250.00,
      status: 'matched',
      type: 'withdrawal',
      reference: 'INS-001'
    },
    {
      id: '7',
      date: '2024-01-21',
      description: 'Interest Income',
      bookAmount: 0,
      bankAmount: 15.50,
      status: 'bank_only',
      type: 'deposit',
      reference: 'INT-001'
    },
    {
      id: '8',
      date: '2024-01-22',
      description: 'Outstanding Check #1001',
      bookAmount: -875.00,
      bankAmount: 0,
      status: 'book_only',
      type: 'withdrawal',
      reference: 'CHK-1001'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Matched</Badge>;
      case 'bank_only':
        return <Badge className="bg-blue-100 text-blue-800"><AlertCircle className="h-3 w-3 mr-1" />Bank Only</Badge>;
      case 'book_only':
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />Book Only</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const handleUploadStatement = () => {
    toast({
      title: "Statement Uploaded",
      description: "Bank statement has been uploaded and processed successfully.",
    });
    setIsUploadDialogOpen(false);
  };

  const handleReconcile = () => {
    toast({
      title: "Reconciliation Complete",
      description: "Bank reconciliation has been completed and saved.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Bank Reconciliation</h1>
            <p className="text-muted-foreground">
              Reconcile your bank statements with book records
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Statement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Bank Statement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account">Bank Account</Label>
                    <Select defaultValue="main">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bankAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="file">Statement File</Label>
                    <Input id="file" type="file" accept=".csv,.xlsx,.pdf" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Supported formats: CSV, Excel, PDF
                    </p>
                  </div>
                  <Button onClick={handleUploadStatement} className="w-full">
                    Upload and Process
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleReconcile}>
              <Check className="h-4 w-4 mr-2" />
              Complete Reconciliation
            </Button>
          </div>
        </div>

        {/* Account Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Bank Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{account.name} ({account.number})</span>
                      <span className="font-medium">{formatCurrency(account.balance)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Reconciliation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Book Balance</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(reconciliationData.bookBalance)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bank Balance</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(reconciliationData.bankBalance)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Difference</p>
                  <p className={`text-lg font-bold ${reconciliationData.difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {reconciliationData.difference === 0 ? '0.00' : formatCurrency(reconciliationData.difference)}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${reconciliationData.difference === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {reconciliationData.difference === 0 ? 
                    <CheckCircle className="h-4 w-4 text-green-600" /> : 
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Items</p>
                  <p className="text-lg font-bold">
                    {reconciliationData.pendingItems}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-orange-100">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Reconciliation Items</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
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
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Book Amount</TableHead>
                  <TableHead className="text-right">Bank Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.bookAmount > 0 ? 'text-green-600' : transaction.bookAmount < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {transaction.bookAmount === 0 ? '-' : 
                       transaction.bookAmount > 0 ? 
                       `+${formatCurrency(transaction.bookAmount)}` : 
                       `-${formatCurrency(Math.abs(transaction.bookAmount))}`}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${transaction.bankAmount > 0 ? 'text-green-600' : transaction.bankAmount < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {transaction.bankAmount === 0 ? '-' : 
                       transaction.bankAmount > 0 ? 
                       `+${formatCurrency(transaction.bankAmount)}` : 
                       `-${formatCurrency(Math.abs(transaction.bankAmount))}`}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {transaction.status !== 'matched' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
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

export default BankReconciliation;