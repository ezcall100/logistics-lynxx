
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
import { FileText, Download, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaxObligation {
  id: string;
  taxType: string;
  period: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'filed' | 'overdue';
  filedDate?: string;
}

interface TaxesTabProps {
  searchTerm: string;
}

export function TaxesTab({ searchTerm }: TaxesTabProps) {
  const { toast } = useToast();
  const [taxes] = useState<TaxObligation[]>([
    {
      id: '1',
      taxType: 'Federal Payroll Tax',
      period: 'Q4 2023',
      amount: 12500,
      dueDate: '2024-01-31',
      status: 'filed',
      filedDate: '2024-01-25'
    },
    {
      id: '2',
      taxType: 'State Payroll Tax',
      period: 'Q4 2023',
      amount: 4200,
      dueDate: '2024-01-31',
      status: 'pending'
    },
    {
      id: '3',
      taxType: 'FUTA Tax',
      period: 'Q4 2023',
      amount: 1850,
      dueDate: '2024-01-31',
      status: 'pending'
    },
    {
      id: '4',
      taxType: 'State Unemployment',
      period: 'Q3 2023',
      amount: 2100,
      dueDate: '2023-10-31',
      status: 'overdue'
    }
  ]);

  const filteredTaxes = taxes.filter(tax =>
    tax.taxType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tax.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'filed':
        return <Badge className="bg-green-100 text-green-800">Filed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleFileTax = (tax: TaxObligation) => {
    toast({
      title: "Tax Filed",
      description: `${tax.taxType} for ${tax.period} has been filed.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Taxes</h2>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Tax Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Obligations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Filed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTaxes.map((tax) => (
                <TableRow key={tax.id}>
                  <TableCell className="font-medium">{tax.taxType}</TableCell>
                  <TableCell>{tax.period}</TableCell>
                  <TableCell>${tax.amount.toLocaleString()}</TableCell>
                  <TableCell className={tax.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                    {new Date(tax.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(tax.status)}</TableCell>
                  <TableCell>
                    {tax.filedDate ? new Date(tax.filedDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {tax.status !== 'filed' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleFileTax(tax)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
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
  );
}
