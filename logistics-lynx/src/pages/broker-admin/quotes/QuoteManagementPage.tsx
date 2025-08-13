import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Copy, 
  Trash2,
  Clock,
  CheckCircle,
  TrendingDown,
  FileCheck,
  Timer,
  Activity,
  ArrowUpDown,
  Calendar,
  MapPin,
  Truck,
  DollarSign
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const QuoteManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for quotes
  const quotes = {
    active: [
      {
        id: 'Q-2024-001',
        customer: 'ABC Logistics',
        origin: 'Chicago, IL',
        destination: 'Dallas, TX',
        commodity: 'Electronics',
        weight: '45,000 lbs',
        equipment: 'Dry Van',
        amount: '$2,850',
        margin: '18%',
        status: 'Customer Review',
        created: '2024-01-15',
        expires: '2024-01-22',
        salesperson: 'John Smith'
      },
      {
        id: 'Q-2024-002',
        customer: 'XYZ Manufacturing',
        origin: 'Los Angeles, CA',
        destination: 'Phoenix, AZ',
        commodity: 'Auto Parts',
        weight: '38,500 lbs',
        equipment: 'Flatbed',
        amount: '$1,950',
        margin: '22%',
        status: 'Awaiting Approval',
        created: '2024-01-16',
        expires: '2024-01-23',
        salesperson: 'Sarah Johnson'
      }
    ],
    pending: [
      {
        id: 'Q-2024-003',
        customer: 'Global Freight Co',
        origin: 'Atlanta, GA',
        destination: 'Miami, FL',
        commodity: 'Food Products',
        weight: '42,000 lbs',
        equipment: 'Refrigerated',
        amount: '$2,200',
        margin: '15%',
        status: 'Pending Review',
        created: '2024-01-17',
        expires: '2024-01-24',
        salesperson: 'Mike Davis'
      }
    ],
    won: [
      {
        id: 'Q-2024-004',
        customer: 'Tech Solutions Inc',
        origin: 'Seattle, WA',
        destination: 'Denver, CO',
        commodity: 'Computer Equipment',
        weight: '35,000 lbs',
        equipment: 'Dry Van',
        amount: '$3,200',
        margin: '25%',
        status: 'Accepted',
        created: '2024-01-10',
        expires: '2024-01-17',
        salesperson: 'Lisa Wilson'
      }
    ],
    lost: [
      {
        id: 'Q-2024-005',
        customer: 'Heavy Industries LLC',
        origin: 'Houston, TX',
        destination: 'New Orleans, LA',
        commodity: 'Steel Products',
        weight: '48,000 lbs',
        equipment: 'Flatbed',
        amount: '$1,800',
        margin: '12%',
        status: 'Declined',
        created: '2024-01-12',
        expires: '2024-01-19',
        salesperson: 'Tom Brown'
      }
    ],
    drafts: [
      {
        id: 'Q-2024-006',
        customer: 'Retail Chain Corp',
        origin: 'New York, NY',
        destination: 'Boston, MA',
        commodity: 'Consumer Goods',
        weight: '40,000 lbs',
        equipment: 'Dry Van',
        amount: '$1,650',
        margin: '20%',
        status: 'Draft',
        created: '2024-01-18',
        expires: '2024-01-25',
        salesperson: 'Emma Taylor'
      }
    ],
    expired: [
      {
        id: 'Q-2024-007',
        customer: 'Construction Materials Inc',
        origin: 'Phoenix, AZ',
        destination: 'Las Vegas, NV',
        commodity: 'Building Materials',
        weight: '46,000 lbs',
        equipment: 'Flatbed',
        amount: '$2,100',
        margin: '16%',
        status: 'Expired',
        created: '2024-01-05',
        expires: '2024-01-12',
        salesperson: 'Ryan Miller'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'customer review': return 'bg-blue-100 text-blue-800';
      case 'awaiting approval': return 'bg-yellow-100 text-yellow-800';
      case 'pending review': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'customer review': return <Eye className="h-3 w-3" />;
      case 'awaiting approval': return <Clock className="h-3 w-3" />;
      case 'pending review': return <Clock className="h-3 w-3" />;
      case 'accepted': return <CheckCircle className="h-3 w-3" />;
      case 'declined': return <TrendingDown className="h-3 w-3" />;
      case 'draft': return <FileCheck className="h-3 w-3" />;
      case 'expired': return <Timer className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'active': return quotes.active;
      case 'pending': return quotes.pending;
      case 'won': return quotes.won;
      case 'lost': return quotes.lost;
      case 'drafts': return quotes.drafts;
      case 'expired': return quotes.expired;
      default: return [];
    }
  };

  const filteredQuotes = getTabData().filter(quote =>
    quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Management</h1>
          <p className="text-muted-foreground">
            Manage and track all your freight quotes in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            Create Quote
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search quotes by ID, customer, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quote Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Active ({quotes.active.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({quotes.pending.length})
          </TabsTrigger>
          <TabsTrigger value="won" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Won ({quotes.won.length})
          </TabsTrigger>
          <TabsTrigger value="lost" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Lost ({quotes.lost.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Drafts ({quotes.drafts.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Expired ({quotes.expired.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(activeTab)}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Quotes
              </CardTitle>
              <CardDescription>
                {filteredQuotes.length} quotes found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* Quote Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{quote.id}</h3>
                            <Badge className={`${getStatusColor(quote.status)} flex items-center gap-1`}>
                              {getStatusIcon(quote.status)}
                              {quote.status}
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
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Quote
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Quote Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Customer</p>
                            <p className="font-medium">{quote.customer}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Route</p>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{quote.origin}</span>
                              <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                              <MapPin className="h-4 w-4 text-red-600" />
                              <span className="text-sm">{quote.destination}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Commodity</p>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{quote.commodity}</span>
                              <span className="text-sm text-muted-foreground">({quote.weight})</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Equipment</p>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              <span className="font-medium">{quote.equipment}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quote Financials & Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Quote Amount</p>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-bold text-lg">{quote.amount}</span>
                              <Badge variant="outline" className="text-green-600">
                                {quote.margin} margin
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Salesperson</p>
                            <p className="font-medium">{quote.salesperson}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Created</p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{quote.created}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Expires</p>
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4" />
                              <span className="text-sm">{quote.expires}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredQuotes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No quotes found matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default QuoteManagementPage;