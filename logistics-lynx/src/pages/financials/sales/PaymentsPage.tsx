import React from 'react';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, CreditCard, DollarSign, Calendar } from 'lucide-react';

const PaymentsPage = () => {
  const payments = [
    {
      id: 'PAY-001',
      customer: 'Acme Corp',
      amount: 15000,
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-01-20',
      invoiceId: 'INV-001'
    },
    {
      id: 'PAY-002',
      customer: 'TechFlow Solutions',
      amount: 8500,
      method: 'Credit Card',
      status: 'pending',
      date: '2024-01-22',
      invoiceId: 'INV-002'
    },
    {
      id: 'PAY-003',
      customer: 'Global Logistics',
      amount: 12000,
      method: 'Check',
      status: 'failed',
      date: '2024-01-18',
      invoiceId: 'INV-003'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <UltraModernLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground">Track and manage customer payments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-10" />
              </div>
            </div>

            <div className="grid gap-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle className="text-lg">{payment.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{payment.customer}</p>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${payment.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{payment.method}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{payment.date}</span>
                      </div>
                      <div className="text-sm">
                        Invoice: <span className="font-medium">{payment.invoiceId}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Refund</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Completed payments will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Pending payments will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="failed">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Failed payments will be shown here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UltraModernLayout>
  );
};

export default PaymentsPage;