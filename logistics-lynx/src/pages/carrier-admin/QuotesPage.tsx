/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, Filter, FileText, DollarSign, Clock, CheckCircle, XCircle, Eye, Edit, Trash2, Download, Send, Copy, TrendingUp, Calendar, User, Building, Truck, Package, Ship, Car, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  contactName: string;
  contactEmail: string;
  transportMode: string;
  equipmentType: string;
  origin: string;
  destination: string;
  distance: string;
  commodity: string;
  weight: string;
  dimensions: string;
  pickupDate: string;
  deliveryDate: string;
  baseRate: number;
  fuelSurcharge: number;
  accessorials: string[];
  totalAmount: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
  createdBy: string;
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      quoteNumber: 'QT-2024-001',
      customer: 'Walmart Inc.',
      contactName: 'John Smith',
      contactEmail: 'john.smith@walmart.com',
      transportMode: 'truckload',
      equipmentType: 'Dry Van',
      origin: 'Chicago, IL',
      destination: 'Houston, TX',
      distance: '1,092 mi',
      commodity: 'General Merchandise',
      weight: '45,000 lbs',
      dimensions: '53\' x 8.5\' x 9\'',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-27',
      baseRate: 3115,
      fuelSurcharge: 187,
      accessorials: ['Detention', 'Fuel Surcharge'],
      totalAmount: 3302,
      validUntil: '2024-01-30',
      status: 'sent',
      createdAt: '2024-01-15',
      createdBy: 'Sarah Johnson',
      notes: 'High priority customer, expedited service required',
      priority: 'high'
    },
    {
      id: '2',
      quoteNumber: 'QT-2024-002',
      customer: 'Target Corp.',
      contactName: 'Mike Davis',
      contactEmail: 'mike.davis@target.com',
      transportMode: 'truckload',
      equipmentType: 'Reefer',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      distance: '372 mi',
      commodity: 'Frozen Foods',
      weight: '42,000 lbs',
      dimensions: '53\' x 8.5\' x 9\'',
      pickupDate: '2024-01-28',
      deliveryDate: '2024-01-29',
      baseRate: 874,
      fuelSurcharge: 56,
      accessorials: ['Temperature Control', 'Fuel Surcharge'],
      totalAmount: 930,
      validUntil: '2024-02-01',
      status: 'accepted',
      createdAt: '2024-01-16',
      createdBy: 'Tom Wilson',
      notes: 'Temperature maintained at -10°F throughout transit',
      priority: 'medium'
    },
    {
      id: '3',
      quoteNumber: 'QT-2024-003',
      customer: 'Home Depot',
      contactName: 'Lisa Chen',
      contactEmail: 'lisa.chen@homedepot.com',
      transportMode: 'truckload',
      equipmentType: 'Flatbed',
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      distance: '662 mi',
      commodity: 'Building Materials',
      weight: '48,000 lbs',
      dimensions: '53\' x 8.5\' x 4\'',
      pickupDate: '2024-01-30',
      deliveryDate: '2024-01-31',
      baseRate: 1821,
      fuelSurcharge: 79,
      accessorials: ['Tarping', 'Securement', 'Fuel Surcharge'],
      totalAmount: 1900,
      validUntil: '2024-02-05',
      status: 'draft',
      createdAt: '2024-01-17',
      createdBy: 'Sarah Johnson',
      notes: 'Requires special securement and tarping',
      priority: 'medium'
    },
    {
      id: '4',
      quoteNumber: 'QT-2024-004',
      customer: 'Amazon Logistics',
      contactName: 'David Brown',
      contactEmail: 'david.brown@amazon.com',
      transportMode: 'ltl',
      equipmentType: 'Standard',
      origin: 'New York, NY',
      destination: 'Boston, MA',
      distance: '215 mi',
      commodity: 'Electronics',
      weight: '5,500 lbs',
      dimensions: '8 pallets',
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-27',
      baseRate: 1237,
      fuelSurcharge: 154,
      accessorials: ['Liftgate', 'Residential', 'Fuel Surcharge'],
      totalAmount: 1391,
      validUntil: '2024-01-28',
      status: 'expired',
      createdAt: '2024-01-10',
      createdBy: 'Tom Wilson',
      notes: 'Residential delivery with liftgate required',
      priority: 'low'
    },
    {
      id: '5',
      quoteNumber: 'QT-2024-005',
      customer: 'Costco Wholesale',
      contactName: 'Jennifer Lee',
      contactEmail: 'jennifer.lee@costco.com',
      transportMode: 'intermodal',
      equipmentType: '53\' Container',
      origin: 'Seattle, WA',
      destination: 'Chicago, IL',
      distance: '2,064 mi',
      commodity: 'Retail Goods',
      weight: '44,000 lbs',
      dimensions: '53\' x 8.5\' x 9\'',
      pickupDate: '2024-02-01',
      deliveryDate: '2024-02-08',
      baseRate: 4650,
      fuelSurcharge: 232,
      accessorials: ['Drayage', 'Chassis', 'Fuel Surcharge'],
      totalAmount: 4882,
      validUntil: '2024-02-10',
      status: 'sent',
      createdAt: '2024-01-18',
      createdBy: 'Sarah Johnson',
      notes: 'Intermodal rail service, 7-day transit time',
      priority: 'medium'
    },
    {
      id: '6',
      quoteNumber: 'QT-2024-006',
      customer: 'Tesla Motors',
      contactName: 'Robert Kim',
      contactEmail: 'robert.kim@tesla.com',
      transportMode: 'auto',
      equipmentType: 'Car Carrier',
      origin: 'Detroit, MI',
      destination: 'Los Angeles, CA',
      distance: '2,311 mi',
      commodity: 'Vehicles',
      weight: '35 units',
      dimensions: '9-car carrier',
      pickupDate: '2024-02-05',
      deliveryDate: '2024-02-12',
      baseRate: 54775,
      fuelSurcharge: 2739,
      accessorials: ['Loading', 'Inspection', 'Fuel Surcharge'],
      totalAmount: 57514,
      validUntil: '2024-02-15',
      status: 'declined',
      createdAt: '2024-01-12',
      createdBy: 'Tom Wilson',
      notes: 'Premium vehicle transport with enclosed protection',
      priority: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transportModeFilter, setTransportModeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [deleteQuoteId, setDeleteQuoteId] = useState<string | null>(null);

  const transportationModes = [
    { id: 'truckload', name: 'Truckload', icon: Truck, color: 'bg-blue-500' },
    { id: 'ltl', name: 'LTL', icon: Package, color: 'bg-green-500' },
    { id: 'intermodal', name: 'Intermodal', icon: Ship, color: 'bg-purple-500' },
    { id: 'auto', name: 'Auto Transport', icon: Car, color: 'bg-red-500' },
    { id: 'other', name: 'Other', icon: MoreHorizontal, color: 'bg-gray-500' }
  ];

  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote => {
      const matchesSearch = 
        quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      const matchesTransportMode = transportModeFilter === 'all' || quote.transportMode === transportModeFilter;
      const matchesPriority = priorityFilter === 'all' || quote.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesTransportMode && matchesPriority;
    });
  }, [quotes, searchTerm, statusFilter, transportModeFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(quote => quote.id !== id));
    setDeleteQuoteId(null);
    toast.success('Quote deleted successfully');
  };

  const handleDuplicateQuote = (quote: Quote) => {
    const newQuote: Quote = {
      ...quote,
      id: Math.random().toString(36).substr(2, 9),
      quoteNumber: `QT-2024-${String(quotes.length + 1).padStart(3, '0')}`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setQuotes(prev => [newQuote, ...prev]);
    toast.success('Quote duplicated successfully');
  };

  const handleSendQuote = (quote: Quote) => {
    setQuotes(prev => prev.map(q => 
      q.id === quote.id 
        ? { ...q, status: 'sent' as const }
        : q
    ));
    toast.success('Quote sent to customer');
  };

  const stats = useMemo(() => {
    const totalQuotes = quotes.length;
    const sentQuotes = quotes.filter(q => q.status === 'sent').length;
    const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
    const totalValue = quotes.reduce((sum, q) => sum + q.totalAmount, 0);
    const acceptanceRate = sentQuotes > 0 ? ((acceptedQuotes / sentQuotes) * 100).toFixed(1) : '0';

    return { totalQuotes, sentQuotes, acceptedQuotes, totalValue, acceptanceRate };
  }, [quotes]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">
            Manage customer quotes and pricing across all transportation modes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Quotes</p>
                <p className="text-2xl font-bold">{stats.totalQuotes}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold">{stats.sentQuotes}</p>
              </div>
              <Send className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">{stats.acceptedQuotes}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accept Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.acceptanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transportation Mode Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {transportationModes.map((mode) => (
          <Card 
            key={mode.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setTransportModeFilter(mode.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`${mode.color} p-2 rounded-lg`}>
                  <mode.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{mode.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {quotes.filter(q => q.transportMode === mode.id).length} quotes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={transportModeFilter} onValueChange={setTransportModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Transportation Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                {transportationModes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quotes ({filteredQuotes.length})
          </CardTitle>
          <CardDescription>
            Customer quotes and pricing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No quotes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || transportModeFilter !== 'all' || priorityFilter !== 'all'
                  ? "Try adjusting your search criteria or filters"
                  : "Get started by creating your first quote"
                }
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Quote
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-medium">{quote.quoteNumber}</div>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </Badge>
                        <Badge className={getPriorityColor(quote.priority)}>
                          {quote.priority.charAt(0).toUpperCase() + quote.priority.slice(1)}
                        </Badge>
                        <Badge variant="outline">{quote.equipmentType}</Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {quote.customer}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {quote.contactName}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>{quote.origin} → {quote.destination}</span>
                          <span>{quote.distance}</span>
                          <span>{quote.commodity}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Pickup: {new Date(quote.pickupDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Valid until: {new Date(quote.validUntil).toLocaleDateString()}
                          </span>
                        </div>
                        {quote.accessorials.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {quote.accessorials.map((accessorial, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {accessorial}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap xl:flex-nowrap items-center gap-4 xl:gap-6">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
                        <div className="font-semibold text-lg">${quote.totalAmount.toLocaleString()}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateQuote(quote)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {quote.status === 'draft' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendQuote(quote)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDeleteQuoteId(quote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteQuoteId} onOpenChange={() => setDeleteQuoteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quote? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteQuoteId && handleDeleteQuote(deleteQuoteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuotesPage;