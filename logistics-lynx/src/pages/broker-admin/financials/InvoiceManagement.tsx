/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Send,
  Copy,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building,
  Truck,
  Mail
} from 'lucide-react';

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    {
      id: "INV-2024-001",
      customer: "Global Logistics Corp",
      loadId: "LOAD-2024-156",
      amount: 45250,
      issueDate: "2024-01-16",
      dueDate: "2024-02-15",
      status: "sent",
      paymentStatus: "pending",
      lastSent: "2024-01-16"
    },
    {
      id: "INV-2024-002",
      customer: "FastTrack Shipping",
      loadId: "LOAD-2024-143",
      amount: 32180,
      issueDate: "2024-01-01",
      dueDate: "2024-01-31",
      status: "paid",
      paymentStatus: "paid",
      lastSent: "2024-01-01"
    },
    {
      id: "INV-2024-003",
      customer: "Prime Transport",
      loadId: "LOAD-2024-134",
      amount: 58920,
      issueDate: "2023-12-16",
      dueDate: "2024-01-15",
      status: "sent",
      paymentStatus: "overdue",
      lastSent: "2024-01-10"
    },
    {
      id: "INV-2024-004",
      customer: "Metro Freight",
      loadId: "LOAD-2024-128",
      amount: 21450,
      issueDate: "2024-01-21",
      dueDate: "2024-02-20",
      status: "draft",
      paymentStatus: "draft",
      lastSent: null
    },
    {
      id: "INV-2024-005",
      customer: "Express Carriers",
      loadId: "LOAD-2024-167",
      amount: 67340,
      issueDate: "2023-12-11",
      dueDate: "2024-01-10",
      status: "sent",
      paymentStatus: "overdue",
      lastSent: "2024-01-15"
    }
  ];

  const invoiceTemplates = [
    {
      id: "TEMP-001",
      name: "Standard Freight Invoice",
      description: "Default template for freight services",
      usageCount: 156,
      lastModified: "2024-01-15"
    },
    {
      id: "TEMP-002", 
      name: "Express Delivery Invoice",
      description: "Template for expedited freight services",
      usageCount: 43,
      lastModified: "2024-01-10"
    },
    {
      id: "TEMP-003",
      name: "Long Haul Invoice",
      description: "Template for long distance freight",
      usageCount: 89,
      lastModified: "2024-01-08"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: "secondary" as const, icon: Clock },
      sent: { variant: "default" as const, icon: Mail },
      paid: { variant: "default" as const, icon: CheckCircle },
      pending: { variant: "secondary" as const, icon: Clock },
      overdue: { variant: "destructive" as const, icon: AlertTriangle }
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const filteredInvoices = invoices.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.loadId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
          <p className="text-muted-foreground">Create, send, and track customer invoices</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Invoices
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$225,140</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$151,690</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$126,260</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">$21,450</div>
            <p className="text-xs text-muted-foreground">Unsent invoices</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">All Invoices</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Invoice Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoice List</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Load ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          {invoice.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{invoice.loadId}</span>
                      </TableCell>
                      <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {invoice.status === 'draft' ? (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                          {invoice.status !== 'paid' && (
                            <Button variant="ghost" size="sm">
                              <Send className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Invoice Templates</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>
              <CardDescription>Manage reusable invoice templates for different service types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {invoiceTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-foreground">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Used {template.usageCount} times</span>
                          <span>Modified {template.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recurring Invoices</CardTitle>
              <CardDescription>Set up and manage automated recurring billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p>Recurring invoice features</p>
                <p className="text-sm">Automate billing for regular customers and services</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceManagement;