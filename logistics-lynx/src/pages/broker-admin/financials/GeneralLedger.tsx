/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Search,
  Filter,
  Download,
  CalendarIcon,
  BookOpen,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const GeneralLedger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // Sample ledger entries
  const ledgerEntries = [
    {
      id: '1',
      date: '2024-01-15',
      reference: 'INV-2024-001',
      description: 'Freight services for Shipment #SH001',
      account: 'Freight Revenue',
      accountCode: '4000',
      debit: 0,
      credit: 5500.00,
      balance: 5500.00,
      type: 'Revenue'
    },
    {
      id: '2',
      date: '2024-01-15',
      reference: 'INV-2024-001',
      description: 'Carrier payment for Shipment #SH001',
      account: 'Carrier Payments',
      accountCode: '5000',
      debit: 4200.00,
      credit: 0,
      balance: 4200.00,
      type: 'Expense'
    },
    {
      id: '3',
      date: '2024-01-16',
      reference: 'REC-001',
      description: 'Payment received from customer',
      account: 'Cash - Operating Account',
      accountCode: '1000',
      debit: 5500.00,
      credit: 0,
      balance: 130500.00,
      type: 'Asset'
    },
    {
      id: '4',
      date: '2024-01-16',
      reference: 'REC-001',
      description: 'Payment received from customer',
      account: 'Accounts Receivable',
      accountCode: '1200',
      debit: 0,
      credit: 5500.00,
      balance: 82000.00,
      type: 'Asset'
    },
    {
      id: '5',
      date: '2024-01-17',
      reference: 'EXP-001',
      description: 'Office rent payment',
      account: 'Office Rent',
      accountCode: '5100',
      debit: 2000.00,
      credit: 0,
      balance: 26000.00,
      type: 'Expense'
    },
    {
      id: '6',
      date: '2024-01-17',
      reference: 'EXP-001',
      description: 'Office rent payment',
      account: 'Cash - Operating Account',
      accountCode: '1000',
      debit: 0,
      credit: 2000.00,
      balance: 128500.00,
      type: 'Asset'
    },
    {
      id: '7',
      date: '2024-01-18',
      reference: 'INV-2024-002',
      description: 'Broker commission earned',
      account: 'Broker Commission Income',
      accountCode: '4100',
      debit: 0,
      credit: 750.00,
      balance: 75750.00,
      type: 'Revenue'
    },
    {
      id: '8',
      date: '2024-01-19',
      reference: 'PAY-001',
      description: 'Carrier payment via ACH',
      account: 'Cash - Operating Account',
      accountCode: '1000',
      debit: 0,
      credit: 4200.00,
      balance: 124300.00,
      type: 'Asset'
    },
  ];

  const accounts = [
    { code: '1000', name: 'Cash - Operating Account' },
    { code: '1200', name: 'Accounts Receivable' },
    { code: '4000', name: 'Freight Revenue' },
    { code: '4100', name: 'Broker Commission Income' },
    { code: '5000', name: 'Carrier Payments' },
    { code: '5100', name: 'Office Rent' },
  ];

  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.account.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = selectedAccount === 'all' || entry.accountCode === selectedAccount;
    return matchesSearch && matchesAccount;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getEntryTypeColor = (type: string) => {
    switch (type) {
      case 'Asset': return 'bg-blue-100 text-blue-800';
      case 'Revenue': return 'bg-green-100 text-green-800';
      case 'Expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate totals
  const totalDebits = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">General Ledger</h1>
            <p className="text-muted-foreground">
              View all financial transactions and account activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Trial Balance
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Debits</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatCurrency(totalDebits)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-red-100">
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(totalCredits)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <ArrowDownRight className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Difference</p>
                  <p className={`text-lg font-bold ${totalCredits - totalDebits >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(totalCredits - totalDebits))}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Entries</p>
                  <p className="text-lg font-bold">
                    {filteredEntries.length}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Ledger Entries</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    {accounts.map((account) => (
                      <SelectItem key={account.code} value={account.code}>
                        {account.code} - {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-32">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      From
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-32">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      To
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
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {format(new Date(entry.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{entry.reference}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.account}</div>
                        <div className="text-sm text-muted-foreground">{entry.accountCode}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-red-600">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(entry.balance)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getEntryTypeColor(entry.type)}>
                        {entry.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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

export default GeneralLedger;