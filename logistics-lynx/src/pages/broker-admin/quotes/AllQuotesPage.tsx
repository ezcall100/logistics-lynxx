import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  Copy,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  FileText,
  DollarSign,
  TrendingUp,
  Truck,
  Package,
  MapPin,
  Calendar,
  Users,
  Star,
  MoreHorizontal
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  contact: string;
  origin: string;
  destination: string;
  transportMode: string;
  loadType: string;
  weight: string;
  status: 'draft' | 'pending' | 'sent' | 'approved' | 'declined' | 'expired' | 'converted';
  amount: number;
  margin: number;
  aiConfidence: number;
  createdDate: string;
  expiryDate: string;
  lastActivity: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  distance: number;
}

const AllQuotesPage = () => {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transportFilter, setTransportFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const quotes: Quote[] = [
    {
      id: '1',
      quoteNumber: 'QT-2024-1001',
      customer: 'Global Manufacturing Inc',
      contact: 'Sarah Johnson',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      transportMode: 'truckload',
      loadType: 'Dry Van',
      weight: '45,000 lbs',
      status: 'pending',
      amount: 3250,
      margin: 22,
      aiConfidence: 94,
      createdDate: '2024-01-15',
      expiryDate: '2024-02-15',
      lastActivity: '2 hours ago',
      priority: 'high',
      distance: 380
    },
    {
      id: '2',
      quoteNumber: 'QT-2024-1002',
      customer: 'Tech Logistics Corp',
      contact: 'Mike Chen',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      transportMode: 'ltl',
      loadType: 'Refrigerated',
      weight: '12,500 lbs',
      status: 'approved',
      amount: 2850,
      margin: 18,
      aiConfidence: 87,
      createdDate: '2024-01-16',
      expiryDate: '2024-02-16',
      lastActivity: '1 day ago',
      priority: 'medium',
      distance: 925
    },
    {
      id: '3',
      quoteNumber: 'QT-2024-1003',
      customer: 'Retail Solutions Ltd',
      contact: 'Lisa Rodriguez',
      origin: 'Miami, FL',
      destination: 'Atlanta, GA',
      transportMode: 'intermodal',
      loadType: 'Container',
      weight: '38,000 lbs',
      status: 'declined',
      amount: 1950,
      margin: 15,
      aiConfidence: 76,
      createdDate: '2024-01-17',
      expiryDate: '2024-02-17',
      lastActivity: '3 days ago',
      priority: 'low',
      distance: 650
    },
    {
      id: '4',
      quoteNumber: 'QT-2024-1004',
      customer: 'Prime Shipping Co',
      contact: 'David Smith',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      transportMode: 'expedited',
      loadType: 'Flatbed',
      weight: '25,000 lbs',
      status: 'sent',
      amount: 1450,
      margin: 28,
      aiConfidence: 91,
      createdDate: '2024-01-18',
      expiryDate: '2024-02-18',
      lastActivity: '4 hours ago',
      priority: 'urgent',
      distance: 173
    },
    {
      id: '5',
      quoteNumber: 'QT-2024-1005',
      customer: 'Auto Dealers Network',
      contact: 'Jennifer Wilson',
      origin: 'Detroit, MI',
      destination: 'Denver, CO',
      transportMode: 'auto',
      loadType: 'Auto Carrier',
      weight: '15,000 lbs',
      status: 'converted',
      amount: 2200,
      margin: 25,
      aiConfidence: 89,
      createdDate: '2024-01-19',
      expiryDate: '2024-02-19',
      lastActivity: '6 hours ago',
      priority: 'medium',
      distance: 1270
    },
    {
      id: '6',
      quoteNumber: 'QT-2024-1006',
      customer: 'Fresh Foods Distribution',
      contact: 'Robert Taylor',
      origin: 'Fresno, CA',
      destination: 'Las Vegas, NV',
      transportMode: 'truckload',
      loadType: 'Refrigerated',
      weight: '42,000 lbs',
      status: 'expired',
      amount: 1850,
      margin: 12,
      aiConfidence: 82,
      createdDate: '2024-01-10',
      expiryDate: '2024-01-25',
      lastActivity: '2 weeks ago',
      priority: 'medium',
      distance: 425
    }
  ];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesTransport = transportFilter === 'all' || quote.transportMode === transportFilter;
    const matchesPriority = priorityFilter === 'all' || quote.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesTransport && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'pending': return 'outline';
      case 'sent': return 'default';
      case 'approved': return 'default';
      case 'declined': return 'destructive';
      case 'expired': return 'secondary';
      case 'converted': return 'default';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'sent': return <Send className="h-3 w-3" />;
      case 'approved': return <CheckCircle className="h-3 w-3" />;
      case 'declined': return <XCircle className="h-3 w-3" />;
      case 'expired': return <AlertTriangle className="h-3 w-3" />;
      case 'converted': return <Star className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const handleQuoteSelection = (quoteId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuotes(prev => [...prev, quoteId]);
    } else {
      setSelectedQuotes(prev => prev.filter(id => id !== quoteId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuotes(filteredQuotes.map(q => q.id));
    } else {
      setSelectedQuotes([]);
    }
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    approved: quotes.filter(q => q.status === 'approved').length,
    converted: quotes.filter(q => q.status === 'converted').length,
    totalValue: quotes.reduce((sum, q) => sum + q.amount, 0),
    avgMargin: Math.round(quotes.reduce((sum, q) => sum + q.margin, 0) / quotes.length),
    winRate: Math.round((quotes.filter(q => q.status === 'approved' || q.status === 'converted').length / quotes.length) * 100)
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">All Quotes</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive quote management and analytics dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedQuotes.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {selectedQuotes.length} selected
              </Badge>
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Bulk Action
              </Button>
            </div>
          )}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Ready to book</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <Star className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.converted}</div>
            <p className="text-xs text-muted-foreground">Active shipments</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Total potential</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgMargin}%</div>
            <p className="text-xs text-muted-foreground">Profit margin</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.winRate}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <Label className="text-sm font-medium">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Transport Mode</Label>
              <Select value={transportFilter} onValueChange={setTransportFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="truckload">Truckload</SelectItem>
                  <SelectItem value="ltl">LTL</SelectItem>
                  <SelectItem value="intermodal">Intermodal</SelectItem>
                  <SelectItem value="drayage">Drayage</SelectItem>
                  <SelectItem value="auto">Auto Transport</SelectItem>
                  <SelectItem value="expedited">Expedited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTransportFilter('all');
                setPriorityFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quote Pipeline ({filteredQuotes.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm">
                <div className="col-span-1">
                  <Checkbox
                    checked={selectedQuotes.length === filteredQuotes.length}
                    onCheckedChange={handleSelectAll}
                  />
                </div>
                <div className="col-span-2">Quote Details</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Route</div>
                <div className="col-span-1">Transport</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-1">Margin</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {filteredQuotes.map((quote) => (
                  <div key={quote.id} className="grid grid-cols-12 gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="col-span-1 flex items-center">
                      <Checkbox
                        checked={selectedQuotes.includes(quote.id)}
                        onCheckedChange={(checked) => handleQuoteSelection(quote.id, !!checked)}
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <div className="font-semibold">{quote.quoteNumber}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Badge variant={getPriorityColor(quote.priority)} className="text-xs">
                          {quote.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{quote.createdDate}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="font-medium">{quote.customer}</div>
                      <div className="text-sm text-muted-foreground">{quote.contact}</div>
                      <div className="text-xs text-muted-foreground">Last: {quote.lastActivity}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {quote.origin}
                      </div>
                      <div className="text-sm text-muted-foreground">↓ {quote.destination}</div>
                      <div className="text-xs text-muted-foreground">{quote.distance} miles</div>
                    </div>

                    <div className="col-span-1">
                      <div className="text-sm capitalize">{quote.transportMode}</div>
                      <div className="text-xs text-muted-foreground">{quote.loadType}</div>
                      <div className="text-xs text-muted-foreground">{quote.weight}</div>
                    </div>

                    <div className="col-span-1">
                      <Badge variant={getStatusColor(quote.status)} className="flex items-center gap-1">
                        {getStatusIcon(quote.status)}
                        {quote.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        AI: {quote.aiConfidence}%
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="font-bold text-primary">${quote.amount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Expires: {quote.expiryDate}</div>
                    </div>

                    <div className="col-span-1">
                      <div className={`font-semibold ${
                        quote.margin >= 20 ? 'text-green-600' : 
                        quote.margin >= 15 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {quote.margin}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${Math.round(quote.amount * quote.margin / 100)}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Quote
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Send to Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuotes.map((quote) => (
                <Card key={quote.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedQuotes.includes(quote.id)}
                          onCheckedChange={(checked) => handleQuoteSelection(quote.id, !!checked)}
                        />
                        <Badge variant={getPriorityColor(quote.priority)}>
                          {quote.priority}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{quote.quoteNumber}</div>
                      <div className="text-sm text-muted-foreground">{quote.customer}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {quote.origin}
                      </div>
                      <div className="text-sm text-muted-foreground">↓ {quote.destination}</div>
                      <div className="text-xs text-muted-foreground">{quote.distance} miles</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-primary">${quote.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{quote.margin}% margin</div>
                      </div>
                      <Badge variant={getStatusColor(quote.status)} className="flex items-center gap-1">
                        {getStatusIcon(quote.status)}
                        {quote.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{quote.transportMode}</span>
                      <span>AI: {quote.aiConfidence}%</span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllQuotesPage;