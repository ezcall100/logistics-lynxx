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
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  FolderOpen,
  DollarSign,
  TrendingUp,
  Building,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChartOfAccounts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    code: '',
    name: '',
    type: '',
    category: '',
    description: '',
    parentAccount: '',
    status: 'active'
  });

  // Sample account data
  const accounts = [
    { id: '1', code: '1000', name: 'Cash - Operating Account', type: 'Asset', category: 'Current Assets', balance: 125000, status: 'active', parentAccount: null },
    { id: '2', code: '1010', name: 'Petty Cash', type: 'Asset', category: 'Current Assets', balance: 500, status: 'active', parentAccount: '1000' },
    { id: '3', code: '1200', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets', balance: 87500, status: 'active', parentAccount: null },
    { id: '4', code: '1210', name: 'Allowance for Doubtful Accounts', type: 'Asset', category: 'Current Assets', balance: -2500, status: 'active', parentAccount: '1200' },
    { id: '5', code: '1500', name: 'Equipment', type: 'Asset', category: 'Fixed Assets', balance: 45000, status: 'active', parentAccount: null },
    { id: '6', code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities', balance: 32000, status: 'active', parentAccount: null },
    { id: '7', code: '2100', name: 'Accrued Expenses', type: 'Liability', category: 'Current Liabilities', balance: 8500, status: 'active', parentAccount: null },
    { id: '8', code: '3000', name: 'Owner\'s Equity', type: 'Equity', category: 'Equity', balance: 180000, status: 'active', parentAccount: null },
    { id: '9', code: '4000', name: 'Freight Revenue', type: 'Revenue', category: 'Operating Revenue', balance: 450000, status: 'active', parentAccount: null },
    { id: '10', code: '4100', name: 'Broker Commission Income', type: 'Revenue', category: 'Operating Revenue', balance: 75000, status: 'active', parentAccount: null },
    { id: '11', code: '5000', name: 'Carrier Payments', type: 'Expense', category: 'Operating Expenses', balance: 320000, status: 'active', parentAccount: null },
    { id: '12', code: '5100', name: 'Office Rent', type: 'Expense', category: 'Operating Expenses', balance: 24000, status: 'active', parentAccount: null },
    { id: '13', code: '5200', name: 'Insurance Expense', type: 'Expense', category: 'Operating Expenses', balance: 15000, status: 'active', parentAccount: null },
  ];

  const accountTypes = ['all', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.code.includes(searchTerm);
    const matchesType = selectedType === 'all' || account.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Asset': return <Building className="h-4 w-4" />;
      case 'Liability': return <CreditCard className="h-4 w-4" />;
      case 'Equity': return <TrendingUp className="h-4 w-4" />;
      case 'Revenue': return <DollarSign className="h-4 w-4" />;
      case 'Expense': return <FolderOpen className="h-4 w-4" />;
      default: return <FolderOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Asset': return 'bg-blue-100 text-blue-800';
      case 'Liability': return 'bg-red-100 text-red-800';
      case 'Equity': return 'bg-purple-100 text-purple-800';
      case 'Revenue': return 'bg-green-100 text-green-800';
      case 'Expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const handleAddAccount = () => {
    toast({
      title: "Account Added",
      description: `Account "${newAccount.name}" has been created successfully.`,
    });
    setIsAddDialogOpen(false);
    setNewAccount({
      code: '',
      name: '',
      type: '',
      category: '',
      description: '',
      parentAccount: '',
      status: 'active'
    });
  };

  // Calculate totals by type
  const totals = accounts.reduce((acc, account) => {
    if (!acc[account.type]) acc[account.type] = 0;
    acc[account.type] += Math.abs(account.balance);
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Chart of Accounts</h1>
            <p className="text-muted-foreground">
            Manage your company's account structure and financial organization
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Account Code</Label>
                    <Input
                      id="code"
                      value={newAccount.code}
                      onChange={(e) => setNewAccount({...newAccount, code: e.target.value})}
                      placeholder="e.g., 1300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Account Type</Label>
                    <Select value={newAccount.type} onValueChange={(value) => setNewAccount({...newAccount, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asset">Asset</SelectItem>
                        <SelectItem value="Liability">Liability</SelectItem>
                        <SelectItem value="Equity">Equity</SelectItem>
                        <SelectItem value="Revenue">Revenue</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                    placeholder="Enter account name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newAccount.category}
                    onChange={(e) => setNewAccount({...newAccount, category: e.target.value})}
                    placeholder="e.g., Current Assets"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAccount.description}
                    onChange={(e) => setNewAccount({...newAccount, description: e.target.value})}
                    placeholder="Account description (optional)"
                  />
                </div>
                <Button onClick={handleAddAccount} className="w-full">
                  Create Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {accountTypes.slice(1).map((type) => (
            <Card key={type}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{type}</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(totals[type] || 0)}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${getTypeColor(type)}`}>
                    {getTypeIcon(type)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Account List</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono font-medium">{account.code}</TableCell>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTypeColor(account.type)}>
                        {getTypeIcon(account.type)}
                        <span className="ml-1">{account.type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{account.category}</TableCell>
                    <TableCell className={`text-right font-medium ${account.balance < 0 ? 'text-red-600' : account.type === 'Revenue' ? 'text-green-600' : ''}`}>
                      {formatCurrency(account.balance)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default ChartOfAccounts;