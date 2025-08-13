import React from 'react';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Calendar, DollarSign } from 'lucide-react';

const QuotesPage = () => {
  const quotes = [
    {
      id: 'QT-001',
      customer: 'Acme Corp',
      amount: 15000,
      status: 'pending',
      validUntil: '2024-02-15',
      createdAt: '2024-01-15'
    },
    {
      id: 'QT-002',
      customer: 'TechFlow Solutions',
      amount: 8500,
      status: 'accepted',
      validUntil: '2024-02-20',
      createdAt: '2024-01-18'
    },
    {
      id: 'QT-003',
      customer: 'Global Logistics',
      amount: 12000,
      status: 'expired',
      validUntil: '2024-01-30',
      createdAt: '2024-01-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <UltraModernLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quotes</h1>
            <p className="text-muted-foreground">Manage customer quotes and proposals</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search quotes..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-6">
          {quotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">{quote.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{quote.customer}</p>
                </div>
                <Badge className={getStatusColor(quote.status)}>
                  {quote.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">${quote.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Valid until {quote.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created {quote.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Duplicate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UltraModernLayout>
  );
};

export default QuotesPage;