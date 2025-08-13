import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign, Building2 } from 'lucide-react';

const ActiveContractsPage = () => {
  const contracts = [
    {
      id: '1',
      customer: 'ABC Logistics',
      contractType: 'Dedicated Lane',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      rate: '$2.50/mile',
      status: 'active'
    },
    {
      id: '2',
      customer: 'XYZ Distribution',
      contractType: 'Volume Commitment',
      startDate: '2024-02-15',
      endDate: '2024-08-15',
      rate: '$2,800/load',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Active Contracts</h1>
        <p className="text-muted-foreground">Manage your current business contracts and agreements</p>
      </div>

      <div className="grid gap-4">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {contract.customer}
                </CardTitle>
                <Badge variant="secondary">{contract.status}</Badge>
              </div>
              <CardDescription>Contract Type: {contract.contractType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{contract.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{contract.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Rate</p>
                    <p className="text-sm text-muted-foreground">{contract.rate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Button variant="outline" size="sm">View Contract</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveContractsPage;