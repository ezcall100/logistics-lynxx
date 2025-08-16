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
import { Eye, Edit, Trash2, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Bill {
  id: string;
  vendor: string;
  billNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  billDate: string;
  description: string;
}

interface BillsTabProps {
  searchTerm: string;
}

export function BillsTab({ searchTerm }: BillsTabProps) {
  const { toast } = useToast();
  const [bills] = useState<Bill[]>([
    {
      id: '1',
      vendor: 'Fuel Express',
      billNumber: 'BILL-2024-001',
      amount: 8500,
      status: 'paid',
      dueDate: '2024-01-15',
      billDate: '2024-01-01',
      description: 'Fuel purchase - December 2023'
    },
    {
      id: '2',
      vendor: 'Maintenance Pro',
      billNumber: 'BILL-2024-002',
      amount: 3200,
      status: 'pending',
      dueDate: '2024-01-25',
      billDate: '2024-01-10',
      description: 'Vehicle maintenance services'
    },
    {
      id: '3',
      vendor: 'Insurance Co.',
      billNumber: 'BILL-2024-003',
      amount: 12000,
      status: 'overdue',
      dueDate: '2024-01-05',
      billDate: '2023-12-20',
      description: 'Commercial vehicle insurance'
    }
  ]);

  const filteredBills = bills.filter(bill =>
    bill.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handlePayBill = (bill: Bill) => {
    toast({
      title: "Payment Processed",
      description: `Payment for ${bill.billNumber} has been processed.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bills</h2>
        <Button>Add New Bill</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill #</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bill Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.billNumber}</TableCell>
                  <TableCell>{bill.vendor}</TableCell>
                  <TableCell>${bill.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(bill.status)}</TableCell>
                  <TableCell>{new Date(bill.billDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handlePayBill(bill)}
                      >
                        <CreditCard className="h-4 w-4" />
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
