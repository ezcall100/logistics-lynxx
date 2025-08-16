/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Repeat, DollarSign, Clock } from 'lucide-react';

const RecurringInvoicesPage = () => {
  return (
    <Layout>
      <div className="container-responsive space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Recurring Invoices</h1>
            <p className="text-muted-foreground">Automate recurring billing cycles</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Recurring Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
              <Repeat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Recurring billing setups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,450</div>
              <p className="text-xs text-muted-foreground">From recurring invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Invoices due tomorrow</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Invoice Templates</CardTitle>
            <CardDescription>Manage automated billing schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Recurring invoice management interface will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RecurringInvoicesPage;