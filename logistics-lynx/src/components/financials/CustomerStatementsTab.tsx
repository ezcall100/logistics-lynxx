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
import { Send, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerStatement {
  id: string;
  customer: string;
  period: string;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: 'sent' | 'pending' | 'viewed';
  sentDate: string;
}

interface CustomerStatementsTabProps {
  searchTerm: string;
}

export function CustomerStatementsTab({ searchTerm }: CustomerStatementsTabProps) {
  const { toast } = useToast();
  const [statements] = useState<CustomerStatement[]>([
    {
      id: '1',
      customer: 'ABC Logistics',
      period: 'January 2024',
      totalAmount: 45000,
      paidAmount: 30000,
      outstandingAmount: 15000,
      status: 'sent',
      sentDate: '2024-01-31'
    },
    {
      id: '2',
      customer: 'Global Shipping Co.',
      period: 'January 2024',
      totalAmount: 32000,
      paidAmount: 32000,
      outstandingAmount: 0,
      status: 'viewed',
      sentDate: '2024-01-31'
    },
    {
      id: '3',
      customer: 'Fast Delivery Inc.',
      period: 'January 2024',
      totalAmount: 18500,
      paidAmount: 12000,
      outstandingAmount: 6500,
      status: 'pending',
      sentDate: ''
    }
  ]);

  const filteredStatements = statements.filter(statement =>
    statement.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    statement.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800">Sent</Badge>;
      case 'viewed':
        return <Badge className="bg-green-100 text-green-800">Viewed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSendStatement = (statement: CustomerStatement) => {
    toast({
      title: "Statement Sent",
      description: `Statement for ${statement.customer} has been sent.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Statements</h2>
        <Button>
          Generate All Statements
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statement List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell className="font-medium">{statement.customer}</TableCell>
                  <TableCell>{statement.period}</TableCell>
                  <TableCell>${statement.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>${statement.paidAmount.toLocaleString()}</TableCell>
                  <TableCell className={statement.outstandingAmount > 0 ? "text-red-600" : "text-green-600"}>
                    ${statement.outstandingAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(statement.status)}</TableCell>
                  <TableCell>
                    {statement.sentDate ? new Date(statement.sentDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSendStatement(statement)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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
