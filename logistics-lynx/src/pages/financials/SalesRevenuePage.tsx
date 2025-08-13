import React, { useState } from 'react';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Calendar, CreditCard, Receipt, TrendingUp, DollarSign } from 'lucide-react';

const SalesRevenuePage = () => {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <UltraModernLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sales & Revenue</h1>
            <p className="text-muted-foreground">Manage invoices, payments, and revenue streams</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$245,890</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,230</div>
              <p className="text-xs text-muted-foreground">23 invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$198,450</div>
              <p className="text-xs text-muted-foreground">89 payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <Receipt className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,340</div>
              <p className="text-xs text-muted-foreground">5 invoices</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Management</CardTitle>
            <CardDescription>Manage all revenue-related activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="recurring">Recurring</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
                <TabsTrigger value="statements">Statements</TabsTrigger>
              </TabsList>

              <TabsContent value="invoices" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Invoice Management</h3>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Invoices
                  </Button>
                </div>
                <p className="text-muted-foreground">Create, edit, and track customer invoices.</p>
              </TabsContent>

              <TabsContent value="recurring" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Recurring Invoices</h3>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Recurring
                  </Button>
                </div>
                <p className="text-muted-foreground">Set up and manage automated recurring invoices.</p>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Payment Tracking</h3>
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>
                <p className="text-muted-foreground">Track and record customer payments.</p>
              </TabsContent>

              <TabsContent value="quotes" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Quote Management</h3>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Quote
                  </Button>
                </div>
                <p className="text-muted-foreground">Create and send quotes to potential customers.</p>
              </TabsContent>

              <TabsContent value="statements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Statements</h3>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </div>
                <p className="text-muted-foreground">Generate customer account statements.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </UltraModernLayout>
  );
};

export default SalesRevenuePage;