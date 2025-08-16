/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Receipt, Users, FileText, AlertTriangle, DollarSign } from 'lucide-react';

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState('bills');

  return (
    <UltraModernLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Expenses</h1>
            <p className="text-muted-foreground">Track and manage business expenses</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$67,890</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">$12,450 total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Vendors</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Management</CardTitle>
            <CardDescription>Manage all expense-related activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="bills">Bills</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
                <TabsTrigger value="expense-reports">Expense Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="bills" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Bill Management</h3>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    View All Bills
                  </Button>
                </div>
                <p className="text-muted-foreground">Track vendor bills and payment schedules.</p>
              </TabsContent>

              <TabsContent value="vendors" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Vendor Management</h3>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Vendors
                  </Button>
                </div>
                <p className="text-muted-foreground">Maintain vendor information and relationships.</p>
              </TabsContent>

              <TabsContent value="purchase-orders" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Purchase Orders</h3>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create PO
                  </Button>
                </div>
                <p className="text-muted-foreground">Create and track purchase orders.</p>
              </TabsContent>

              <TabsContent value="expense-reports" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Expense Reports</h3>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
                <p className="text-muted-foreground">Employee expense reports and reimbursements.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </UltraModernLayout>
  );
};

export default ExpensesPage;