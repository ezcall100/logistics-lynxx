/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  status: 'active' | 'inactive';
}

interface ChartOfAccountsTabProps {
  searchTerm: string;
}

export function ChartOfAccountsTab({ searchTerm }: ChartOfAccountsTabProps) {
  const [accounts] = useState<Account[]>([
    { id: '1', code: '1000', name: 'Cash and Cash Equivalents', type: 'asset', balance: 45890, status: 'active' },
    { id: '2', code: '1200', name: 'Accounts Receivable', type: 'asset', balance: 28750, status: 'active' },
    { id: '3', code: '1500', name: 'Fleet Vehicles', type: 'asset', balance: 450000, status: 'active' },
    { id: '4', code: '2000', name: 'Accounts Payable', type: 'liability', balance: 15600, status: 'active' },
    { id: '5', code: '3000', name: 'Owner Equity', type: 'equity', balance: 125000, status: 'active' },
    { id: '6', code: '4000', name: 'Transportation Revenue', type: 'revenue', balance: 235000, status: 'active' },
    { id: '7', code: '5000', name: 'Fuel Expense', type: 'expense', balance: 45000, status: 'active' }
  ]);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    const colors = {
      asset: 'bg-blue-100 text-blue-800',
      liability: 'bg-red-100 text-red-800',
      equity: 'bg-green-100 text-green-800',
      revenue: 'bg-purple-100 text-purple-800',
      expense: 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chart of Accounts</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono">{account.code}</TableCell>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{getTypeBadge(account.type)}</TableCell>
                  <TableCell>${account.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
  );
}
