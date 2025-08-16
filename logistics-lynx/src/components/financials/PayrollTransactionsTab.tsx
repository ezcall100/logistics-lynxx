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

interface PayrollTransaction {
  id: string;
  payDate: string;
  payPeriod: string;
  employeeName: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: 'processed' | 'pending' | 'failed';
}

interface PayrollTransactionsTabProps {
  searchTerm: string;
}

export function PayrollTransactionsTab({ searchTerm }: PayrollTransactionsTabProps) {
  const [transactions] = useState<PayrollTransaction[]>([
    {
      id: '1',
      payDate: '2024-01-15',
      payPeriod: 'Jan 1-15, 2024',
      employeeName: 'John Smith',
      grossPay: 2100,
      deductions: 485,
      netPay: 1615,
      status: 'processed'
    },
    {
      id: '2',
      payDate: '2024-01-15',
      payPeriod: 'Jan 1-15, 2024',
      employeeName: 'Sarah Johnson',
      grossPay: 1850,
      deductions: 425,
      netPay: 1425,
      status: 'processed'
    },
    {
      id: '3',
      payDate: '2024-01-31',
      payPeriod: 'Jan 16-31, 2024',
      employeeName: 'Mike Wilson',
      grossPay: 2000,
      deductions: 460,
      netPay: 1540,
      status: 'pending'
    }
  ]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.payPeriod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800">Processed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payroll Transactions</h2>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Date</TableHead>
                <TableHead>Pay Period</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.payDate).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.payPeriod}</TableCell>
                  <TableCell className="font-medium">{transaction.employeeName}</TableCell>
                  <TableCell>${transaction.grossPay.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">${transaction.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">${transaction.netPay.toLocaleString()}</TableCell>
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
