import React, { useState } from 'react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Wallet, TrendingUp, Calculator, BarChart3, DollarSign, Edit, Trash2, Download, Upload, CreditCard, Building2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BankingPage = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Mock data for bank accounts
  const bankAccounts = [
    {
      id: 1,
      name: 'Primary Business Checking',
      bank: 'Chase Bank',
      accountNumber: '****1234',
      routingNumber: '021000021',
      balance: 85230.50,
      type: 'Checking',
      status: 'Active',
      lastReconciled: '2024-01-15'
    },
    {
      id: 2,
      name: 'Savings Account',
      bank: 'Bank of America',
      accountNumber: '****5678',
      routingNumber: '026009593',
      balance: 45000.00,
      type: 'Savings',
      status: 'Active',
      lastReconciled: '2024-01-10'
    },
    {
      id: 3,
      name: 'Payroll Account',
      bank: 'Wells Fargo',
      accountNumber: '****9012',
      routingNumber: '121000248',
      balance: 15000.00,
      type: 'Checking',
      status: 'Active',
      lastReconciled: '2024-01-12'
    }
  ];

  // Mock data for transactions
  const recentTransactions = [
    {
      id: 1,
      date: '2024-01-20',
      description: 'Invoice Payment - ABC Corp',
      amount: 12500.00,
      type: 'Credit',
      account: 'Primary Business Checking',
      category: 'Revenue',
      status: 'Cleared'
    },
    {
      id: 2,
      date: '2024-01-19',
      description: 'Fuel Purchase - Shell',
      amount: -450.75,
      type: 'Debit',
      account: 'Primary Business Checking',
      category: 'Fuel',
      status: 'Cleared'
    },
    {
      id: 3,
      date: '2024-01-18',
      description: 'Equipment Lease Payment',
      amount: -2800.00,
      type: 'Debit',
      account: 'Primary Business Checking',
      category: 'Equipment',
      status: 'Cleared'
    },
    {
      id: 4,
      date: '2024-01-17',
      description: 'Driver Payroll',
      amount: -8500.00,
      type: 'Debit',
      account: 'Payroll Account',
      category: 'Payroll',
      status: 'Pending'
    }
  ];

  const handleAddAccount = () => {
    toast({
      title: "Account Added",
      description: "New bank account has been successfully added.",
    });
    setIsAddAccountDialogOpen(false);
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setIsEditAccountDialogOpen(true);
  };

  const handleDeleteAccount = (accountId) => {
    toast({
      title: "Account Deleted",
      description: "Bank account has been removed from the system.",
      variant: "destructive",
    });
  };

  const handleReconcileAccount = (accountId) => {
    toast({
      title: "Reconciliation Started",
      description: "Bank reconciliation process has been initiated.",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { variant: 'default', icon: CheckCircle },
      'Pending': { variant: 'secondary', icon: Clock },
      'Inactive': { variant: 'destructive', icon: AlertCircle },
      'Cleared': { variant: 'default', icon: CheckCircle },
    };
    
    const config = statusConfig[status] || { variant: 'secondary', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <CarrierLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Banking</h1>
            <p className="text-muted-foreground">Manage bank accounts and financial transactions</p>
          </div>
          <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Bank Account</DialogTitle>
                <DialogDescription>
                  Connect a new bank account to your business profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="Primary Business Checking" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Chase Bank" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" placeholder="021000021" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="money-market">Money Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialBalance">Initial Balance</Label>
                    <Input id="initialBalance" placeholder="0.00" type="number" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAccountDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAccount}>Add Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$145,230</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Accounts</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">3</div>
              <p className="text-xs text-muted-foreground">Bank accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Monthly Cash Flow</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$23,890</div>
              <p className="text-xs text-muted-foreground">Net positive</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Unreconciled</CardTitle>
              <Calculator className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">1</div>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Banking Management</CardTitle>
            <CardDescription>Manage all banking and financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
                <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
              </TabsList>

              <TabsContent value="accounts" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Bank Accounts</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Reconciled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              {account.bank}
                            </div>
                          </TableCell>
                          <TableCell>{account.type}</TableCell>
                          <TableCell>{account.accountNumber}</TableCell>
                          <TableCell className="font-mono">
                            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{getStatusBadge(account.status)}</TableCell>
                          <TableCell>{account.lastReconciled}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReconcileAccount(account.id)}
                              >
                                <Calculator className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditAccount(account)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteAccount(account.id)}
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
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Recent Transactions</h3>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Accounts</SelectItem>
                        <SelectItem value="checking">Checking Only</SelectItem>
                        <SelectItem value="savings">Savings Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>{transaction.account}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell className={`text-right font-mono ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="reconciliation" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Bank Reconciliation</h3>
                  <Button>
                    <Calculator className="h-4 w-4 mr-2" />
                    Start Reconciliation
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bankAccounts.map((account) => (
                    <Card key={account.id} className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="text-lg text-card-foreground">{account.name}</CardTitle>
                        <CardDescription>{account.bank}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Current Balance:</span>
                          <span className="font-mono text-card-foreground">
                            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Reconciled:</span>
                          <span className="text-sm text-card-foreground">{account.lastReconciled}</span>
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleReconcileAccount(account.id)}
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          Reconcile Account
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cash-flow" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Cash Flow Analysis</h3>
                  <div className="flex gap-2">
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">7 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="90days">90 Days</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Cash Inflow</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">$45,670</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Cash Outflow</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">$21,780</div>
                      <p className="text-xs text-muted-foreground">-5% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Net Cash Flow</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">$23,890</div>
                      <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </CarrierLayout>
  );
};

export default BankingPage;