/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Receipt, Send, Eye, Download } from 'lucide-react';

const InvoicingPage = () => {
  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'ABC Logistics',
      amount: 2400,
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'sent',
      loadNumber: 'LD001234'
    },
    {
      id: 'INV-2024-002',
      customer: 'XYZ Distribution',
      amount: 1850,
      issueDate: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'paid',
      loadNumber: 'LD001235'
    },
    {
      id: 'INV-2024-003',
      customer: 'Quick Freight Co.',
      amount: 3200,
      issueDate: '2024-01-20',
      dueDate: '2024-02-19',
      status: 'draft',
      loadNumber: 'LD001236'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'sent': return 'secondary';
      case 'overdue': return 'destructive';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoicing</h1>
          <p className="text-muted-foreground">Create and manage your invoices</p>
        </div>
        <Button>
          <Receipt className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,250</div>
            <p className="text-xs text-muted-foreground">3 unpaid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">8 invoices issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Payment Time</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">2 days faster</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">+1.2% this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Manage your invoice status and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.customer} • Load: {invoice.loadNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Issued: {invoice.issueDate} • Due: {invoice.dueDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">${invoice.amount.toLocaleString()}</p>
                    <Badge variant={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === 'draft' && (
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common invoicing tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <Receipt className="h-4 w-4 mr-2" />
              Create Quick Invoice
            </Button>
            <Button className="w-full" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Send Payment Reminder
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Invoices (PDF)
            </Button>
            <Button className="w-full" variant="outline">
              View Invoice Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>Configure your invoicing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Default Payment Terms</h4>
              <p className="text-sm text-muted-foreground">NET 30 days</p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Late Fee</h4>
              <p className="text-sm text-muted-foreground">2% after 30 days</p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Auto-Reminders</h4>
              <p className="text-sm text-muted-foreground">5 days before due date</p>
            </div>

            <Button variant="outline" className="w-full">
              Update Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicingPage;