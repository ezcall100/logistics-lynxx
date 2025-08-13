
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
import { Check, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReconciliationItem {
  id: string;
  account: string;
  statementDate: string;
  statementBalance: number;
  bookBalance: number;
  difference: number;
  status: 'pending' | 'reconciled' | 'discrepancy';
}

interface ReconciliationTabProps {
  searchTerm: string;
}

export function ReconciliationTab({ searchTerm }: ReconciliationTabProps) {
  const { toast } = useToast();
  const [reconciliations] = useState<ReconciliationItem[]>([
    {
      id: '1',
      account: 'Checking Account - Main',
      statementDate: '2024-01-31',
      statementBalance: 45890,
      bookBalance: 45890,
      difference: 0,
      status: 'reconciled'
    },
    {
      id: '2',
      account: 'Savings Account',
      statementDate: '2024-01-31',
      statementBalance: 125000,
      bookBalance: 124750,
      difference: 250,
      status: 'discrepancy'
    },
    {
      id: '3',
      account: 'Credit Card - Fleet',
      statementDate: '2024-01-31',
      statementBalance: -8950,
      bookBalance: -8950,
      difference: 0,
      status: 'pending'
    }
  ]);

  const filteredReconciliations = reconciliations.filter(reconciliation =>
    reconciliation.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reconciled':
        return <Badge className="bg-green-100 text-green-800">Reconciled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'discrepancy':
        return <Badge className="bg-red-100 text-red-800">Discrepancy</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleReconcile = (id: string) => {
    toast({
      title: "Account Reconciled",
      description: "Account has been successfully reconciled.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reconciliation</h2>
        <Button>Start New Reconciliation</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Reconciliation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Statement Date</TableHead>
                <TableHead>Statement Balance</TableHead>
                <TableHead>Book Balance</TableHead>
                <TableHead>Difference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReconciliations.map((reconciliation) => (
                <TableRow key={reconciliation.id}>
                  <TableCell className="font-medium">{reconciliation.account}</TableCell>
                  <TableCell>{new Date(reconciliation.statementDate).toLocaleDateString()}</TableCell>
                  <TableCell>${reconciliation.statementBalance.toLocaleString()}</TableCell>
                  <TableCell>${reconciliation.bookBalance.toLocaleString()}</TableCell>
                  <TableCell className={reconciliation.difference !== 0 ? "text-red-600 font-medium" : "text-green-600"}>
                    {reconciliation.difference !== 0 ? `$${Math.abs(reconciliation.difference).toLocaleString()}` : '$0'}
                  </TableCell>
                  <TableCell>{getStatusBadge(reconciliation.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {reconciliation.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReconcile(reconciliation.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {reconciliation.status === 'discrepancy' && (
                        <Button variant="ghost" size="sm">
                          <AlertTriangle className="h-4 w-4" />
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
