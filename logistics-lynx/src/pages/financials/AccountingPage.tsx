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
  MoreHorizontal,
  Calculator,
  BookOpen,
  BarChart3,
  CheckCircle,
  TrendingUp,
  DollarSign,
  PieChart,
  Building,
  Landmark
} from 'lucide-react';

// Mock data
const transactionsData = [
  { id: 'TXN-001', date: '2024-01-15', description: 'Fuel Purchase - ABC Logistics', account: 'Fuel Expense', debit: 2500, credit: 0, type: 'expense' },
  { id: 'TXN-002', date: '2024-01-15', description: 'Customer Payment - XYZ Transport', account: 'Accounts Receivable', debit: 0, credit: 8750, type: 'income' },
  { id: 'TXN-003', date: '2024-01-14', description: 'Vehicle Maintenance', account: 'Maintenance Expense', debit: 1200, credit: 0, type: 'expense' },
  { id: 'TXN-004', date: '2024-01-14', description: 'Bank Transfer', account: 'Checking Account', debit: 5000, credit: 0, type: 'transfer' },
  { id: 'TXN-005', date: '2024-01-13', description: 'Insurance Payment', account: 'Insurance Expense', debit: 3500, credit: 0, type: 'expense' },
];

const chartOfAccountsData = [
  { id: 'ACC-001', code: '1000', name: 'Checking Account', type: 'Asset', balance: 45000, status: 'active' },
  { id: 'ACC-002', code: '1100', name: 'Accounts Receivable', type: 'Asset', balance: 23500, status: 'active' },
  { id: 'ACC-003', code: '1500', name: 'Vehicles', type: 'Asset', balance: 125000, status: 'active' },
  { id: 'ACC-004', code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 8500, status: 'active' },
  { id: 'ACC-005', code: '3000', name: 'Owner Equity', type: 'Equity', balance: 75000, status: 'active' },
  { id: 'ACC-006', code: '4000', name: 'Transportation Revenue', type: 'Revenue', balance: 52000, status: 'active' },
  { id: 'ACC-007', code: '5000', name: 'Fuel Expense', type: 'Expense', balance: 15000, status: 'active' },
  { id: 'ACC-008', code: '5100', name: 'Maintenance Expense', type: 'Expense', balance: 8500, status: 'active' },
];

const journalEntriesData = [
  { id: 'JE-001', date: '2024-01-15', reference: 'INV-001', description: 'Customer Invoice Payment', totalDebit: 8750, totalCredit: 8750, status: 'posted' },
  { id: 'JE-002', date: '2024-01-14', reference: 'BILL-003', description: 'Fuel Purchase Entry', totalDebit: 2500, totalCredit: 2500, status: 'posted' },
  { id: 'JE-003', date: '2024-01-13', reference: 'ADJ-001', description: 'Month End Adjustments', totalDebit: 1200, totalCredit: 1200, status: 'draft' },
];

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('transaction');

  const getAccountTypeBadge = (type: string) => {
    const typeConfig = {
      Asset: { variant: 'default' as const, color: 'text-green-600' },
      Liability: { variant: 'destructive' as const, color: 'text-red-600' },
      Equity: { variant: 'secondary' as const, color: 'text-blue-600' },
      Revenue: { variant: 'default' as const, color: 'text-green-600' },
      Expense: { variant: 'outline' as const, color: 'text-orange-600' },
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {type}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      posted: { variant: 'default' as const, icon: CheckCircle },
      draft: { variant: 'outline' as const, icon: BookOpen },
      active: { variant: 'default' as const, icon: CheckCircle },
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

  const CreateTransactionForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" />
        </div>
        <div>
          <Label htmlFor="reference">Reference</Label>
          <Input id="reference" placeholder="Reference number" />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" placeholder="Transaction description" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="account">Account</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000">1000 - Checking Account</SelectItem>
              <SelectItem value="1100">1100 - Accounts Receivable</SelectItem>
              <SelectItem value="5000">5000 - Fuel Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="debit">Debit</Label>
          <Input id="debit" placeholder="0.00" type="number" />
        </div>
        <div>
          <Label htmlFor="credit">Credit</Label>
          <Input id="credit" placeholder="0.00" type="number" />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Transaction</Button>
      </div>
    </div>
  );

  const CreateAccountForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="accountCode">Account Code</Label>
          <Input id="accountCode" placeholder="e.g. 1000" />
        </div>
        <div>
          <Label htmlFor="accountName">Account Name</Label>
          <Input id="accountName" placeholder="Account name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="accountType">Account Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asset">Asset</SelectItem>
              <SelectItem value="liability">Liability</SelectItem>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="openingBalance">Opening Balance</Label>
          <Input id="openingBalance" placeholder="0.00" type="number" />
        </div>
      </div>
      <div>
        <Label htmlFor="accountDescription">Description</Label>
        <Textarea id="accountDescription" placeholder="Account description..." />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Account</Button>
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
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-muted-foreground">
            Manage transactions, chart of accounts, and journal entries
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openCreateDialog('transaction')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {dialogType === 'transaction' ? 'Create New Transaction' : 'Create New Account'}
              </DialogTitle>
            </DialogHeader>
            {dialogType === 'transaction' ? <CreateTransactionForm /> : <CreateAccountForm />}
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$193,500</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600" /> +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,500</div>
            <p className="text-xs text-muted-foreground">
              Current month profit
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Active chart accounts
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Journal Entries
          </TabsTrigger>
          <TabsTrigger value="overview">Financial Overview</TabsTrigger>
        </TabsList>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions, accounts..."
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

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>${transaction.debit.toLocaleString()}</TableCell>
                      <TableCell>${transaction.credit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
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

        {/* Chart of Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <div className="flex justify-between items-center">
            <Card className="flex-1 mr-4">
              <CardHeader>
                <CardTitle>Chart of Accounts</CardTitle>
              </CardHeader>
            </Card>
            <Button onClick={() => openCreateDialog('account')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
          </div>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartOfAccountsData.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.code}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{getAccountTypeBadge(account.type)}</TableCell>
                      <TableCell>${account.balance.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(account.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Transactions</DropdownMenuItem>
                            <DropdownMenuItem>Edit Account</DropdownMenuItem>
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

        {/* Journal Entries Tab */}
        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Total Debit</TableHead>
                    <TableHead>Total Credit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntriesData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>${entry.totalDebit.toLocaleString()}</TableCell>
                      <TableCell>${entry.totalCredit.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border shadow-md">
                            <DropdownMenuItem>View Entry</DropdownMenuItem>
                            <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                            <DropdownMenuItem>Post Entry</DropdownMenuItem>
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

        {/* Financial Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Account Balance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Assets</span>
                    <span className="text-sm font-bold text-green-600">$193,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Liabilities</span>
                    <span className="text-sm font-bold text-red-600">$8,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Owner's Equity</span>
                    <span className="text-sm font-bold text-blue-600">$75,000</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Net Worth</span>
                      <span className="text-lg font-bold">$185,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5" />
                  Trial Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Trial Balance Report</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate a detailed trial balance for account verification.
                  </p>
                  <Button>Generate Trial Balance</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountingPage;