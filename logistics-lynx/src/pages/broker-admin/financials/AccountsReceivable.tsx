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
  Mail,
  Phone,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Send
} from 'lucide-react';

const AccountsReceivable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const receivables = [
    {
      id: "INV-2024-001",
      customer: "Global Logistics Corp",
      amount: 45250,
      dueDate: "2024-02-15",
      daysPastDue: 0,
      status: "current",
      invoiceDate: "2024-01-16",
      aging: "0-30"
    },
    {
      id: "INV-2024-002", 
      customer: "FastTrack Shipping",
      amount: 32180,
      dueDate: "2024-01-30",
      daysPastDue: 15,
      status: "overdue",
      invoiceDate: "2024-01-01",
      aging: "31-60"
    },
    {
      id: "INV-2024-003",
      customer: "Prime Transport",
      amount: 58920,
      dueDate: "2024-01-15",
      daysPastDue: 30,
      status: "overdue",
      invoiceDate: "2023-12-16",
      aging: "61-90"
    },
    {
      id: "INV-2024-004",
      customer: "Metro Freight",
      amount: 21450,
      dueDate: "2024-02-20",
      daysPastDue: 0,
      status: "current",
      invoiceDate: "2024-01-21",
      aging: "0-30"
    },
    {
      id: "INV-2024-005",
      customer: "Express Carriers",
      amount: 67340,
      dueDate: "2024-01-10",
      daysPastDue: 45,
      status: "critical",
      invoiceDate: "2023-12-11",
      aging: "90+"
    }
  ];

  const agingSummary = [
    { period: "0-30 Days", amount: 66700, count: 2, percentage: 29.6 },
    { period: "31-60 Days", amount: 32180, count: 1, percentage: 14.3 },
    { period: "61-90 Days", amount: 58920, count: 1, percentage: 26.2 },
    { period: "90+ Days", amount: 67340, count: 1, percentage: 30.0 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      current: { variant: "default" as const, icon: CheckCircle },
      overdue: { variant: "secondary" as const, icon: Clock },
      critical: { variant: "destructive" as const, icon: AlertTriangle }
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const filteredReceivables = receivables.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts Receivable</h1>
          <p className="text-muted-foreground">Manage outstanding customer invoices and collections</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export AR
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$225,140</div>
            <p className="text-xs text-muted-foreground">Across 5 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current (0-30)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$66,700</div>
            <p className="text-xs text-muted-foreground">29.6% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Past Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$158,440</div>
            <p className="text-xs text-muted-foreground">70.4% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical (90+)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$67,340</div>
            <p className="text-xs text-muted-foreground">Immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Outstanding Invoices</TabsTrigger>
          <TabsTrigger value="aging">Aging Report</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Outstanding Invoices</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search invoices or customers..."
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
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Past Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceivables.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.customer}</TableCell>
                      <TableCell className="font-semibold">${item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>
                        <span className={item.daysPastDue > 0 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                          {item.daysPastDue} days
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable Aging Report</CardTitle>
              <CardDescription>Breakdown of receivables by aging periods</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aging Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice Count</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agingSummary.map((period) => (
                    <TableRow key={period.period}>
                      <TableCell className="font-medium">{period.period}</TableCell>
                      <TableCell className="font-semibold">${period.amount.toLocaleString()}</TableCell>
                      <TableCell>{period.count}</TableCell>
                      <TableCell>{period.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collections Management</CardTitle>
              <CardDescription>Track collection activities and follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <p>Collections tracking and automated follow-up features</p>
                <p className="text-sm">Send reminders, track communications, and manage collection workflows</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountsReceivable;