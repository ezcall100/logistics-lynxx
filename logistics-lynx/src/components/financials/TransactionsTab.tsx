/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Transaction {
  id: string;
  date: string;
  description: string;
  account: string;
  category: string;
  debit: number;
  credit: number;
  status: 'cleared' | 'pending' | 'reconciled';
}

interface TransactionsTabProps {
  searchTerm: string;
}

export function TransactionsTab({ searchTerm }: TransactionsTabProps) {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Payment from ABC Logistics',
      account: 'Checking Account',
      category: 'Revenue',
      debit: 0,
      credit: 15750,
      status: 'cleared'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Fuel purchase - Station ABC',
      account: 'Checking Account',
      category: 'Fuel Expense',
      debit: 450,
      credit: 0,
      status: 'cleared'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Driver salary payment',
      account: 'Checking Account',
      category: 'Payroll',
      debit: 3200,
      credit: 0,
      status: 'pending'
    }
  ]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'cleared':
        return <Badge className="bg-green-100 text-green-800">Cleared</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'reconciled':
        return <Badge className="bg-blue-100 text-blue-800">Reconciled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transactions</h2>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={transaction.debit > 0 ? "text-red-600" : ""}>
                    {transaction.debit > 0 ? `$${transaction.debit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className={transaction.credit > 0 ? "text-green-600" : ""}>
                    {transaction.credit > 0 ? `$${transaction.credit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
