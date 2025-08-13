import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText,
  Target,
  DollarSign,
  Clock,
  Plus,
  Filter,
  Download,
  Send,
  Edit,
  Copy,
  Eye
} from 'lucide-react';

const QuoteCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for quotes
  const quotes = [
    {
      id: '1',
      quoteNumber: 'QT-2024-001',
      customer: 'Global Manufacturing Inc',
      contact: 'Sarah Johnson',
      origin: 'Los Angeles, CA',
      destination: 'Houston, TX',
      distance: 1545,
      status: 'sent',
      value: 3250,
      margin: 22,
      validUntil: '2024-02-15'
    },
    {
      id: '2',
      quoteNumber: 'QT-2024-002',
      customer: 'Retail Solutions Corp',
      contact: 'Mike Chen',
      origin: 'Chicago, IL',
      destination: 'Denver, CO',
      distance: 920,
      status: 'pending',
      value: 2850,
      margin: 18,
      validUntil: '2024-02-10'
    },
    {
      id: '3',
      quoteNumber: 'QT-2024-003',
      customer: 'Tech Logistics Pro',
      contact: 'Lisa Rodriguez',
      origin: 'Miami, FL',
      destination: 'Atlanta, GA',
      distance: 650,
      status: 'accepted',
      value: 2100,
      margin: 25,
      validUntil: '2024-02-08'
    }
  ];

  const quoteStatusDistribution = [
    { status: 'Pending', count: 34, percentage: 40 },
    { status: 'Sent', count: 28, percentage: 32 },
    { status: 'Accepted', count: 15, percentage: 18 },
    { status: 'Declined', count: 8, percentage: 9 },
    { status: 'Expired', count: 2, percentage: 1 }
  ];

  const recentQuoteActivity = [
    {
      id: 1,
      action: 'Quote sent to Global Manufacturing Inc',
      quote: 'QT-2024-001 - $3,250',
      time: '2 hours ago'
    },
    {
      id: 2,
      action: 'Quote accepted by Tech Logistics Pro',
      quote: 'QT-2024-003 - $2,100',
      time: '4 hours ago'
    },
    {
      id: 3,
      action: 'Quote declined by Metro Distribution',
      quote: 'QT-2024-004 - $1,950',
      time: 'Yesterday'
    }
  ];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'sent': return 'default';
      case 'accepted': return 'default';
      case 'declined': return 'destructive';
      case 'expired': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Center</h1>
          <p className="text-muted-foreground">
            Integrated quoting system with competitive rate management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Quote Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              +15 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quote Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.2K</div>
            <p className="text-xs text-muted-foreground">
              Per shipment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-muted-foreground">
              Average response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quote Management */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Pipeline</CardTitle>
          <CardDescription>
            Manage quotes and track conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quote Value</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">
                        {quote.quoteNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{quote.customer}</p>
                          <p className="text-sm text-muted-foreground">{quote.contact}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{quote.origin} → {quote.destination}</p>
                          <p className="text-xs text-muted-foreground">{quote.distance} miles</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(quote.status) as unknown}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-primary">
                          ${quote.value.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          quote.margin >= 20 ? 'text-green-600' : 
                          quote.margin >= 15 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {quote.margin}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{quote.validUntil}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Send className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quote Status Distribution</CardTitle>
            <CardDescription>
              Breakdown of quotes by current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quoteStatusDistribution.map((status) => (
                <div key={status.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{status.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{status.count}</div>
                    <div className="text-xs text-muted-foreground">{status.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quote Activity</CardTitle>
            <CardDescription>
              Latest quote submissions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuoteActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.quote}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteCenter;