import React from 'react';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Receipt, DollarSign, Calendar, Building2 } from 'lucide-react';

const BillsPage = () => {
  const bills = [
    {
      id: 'BILL-001',
      vendor: 'Office Supplies Inc',
      amount: 2500,
      status: 'unpaid',
      dueDate: '2024-02-15',
      issueDate: '2024-01-15',
      category: 'Office Supplies'
    },
    {
      id: 'BILL-002',
      vendor: 'Utility Company',
      amount: 1200,
      status: 'paid',
      dueDate: '2024-01-30',
      issueDate: '2024-01-01',
      category: 'Utilities'
    },
    {
      id: 'BILL-003',
      vendor: 'Freight Services Co',
      amount: 8500,
      status: 'overdue',
      dueDate: '2024-01-25',
      issueDate: '2024-01-05',
      category: 'Transportation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <UltraModernLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bills</h1>
            <p className="text-muted-foreground">Manage vendor bills and expenses</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Bill
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bills</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search bills..." className="pl-10" />
              </div>
            </div>

            <div className="grid gap-4">
              {bills.map((bill) => (
                <Card key={bill.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle className="text-lg">{bill.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{bill.vendor}</p>
                    </div>
                    <Badge className={getStatusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${bill.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Due: {bill.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{bill.category}</span>
                      </div>
                      <div className="text-sm">
                        Issued: <span className="font-medium">{bill.issueDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Pay</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unpaid">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Unpaid bills will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="overdue">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Overdue bills will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Paid bills will be shown here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UltraModernLayout>
  );
};

export default BillsPage;