import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
  Eye,
  TrendingUp,
  MapPin,
  Truck,
  Brain,
  AlertTriangle,
  Calendar,
  Zap,
  BarChart3,
  Users,
  Route,
  CheckCircle,
  XCircle,
  Timer,
  Search,
  Star,
  Activity,
  Layers,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { mockQuotes } from '@/components/quotes/data/mockQuotes';
import { calculateMargin, generateMarketIntelligence, generateAIRecommendations } from '@/components/quotes/utils/marginAnalysis';

interface QuoteFilters {
  searchTerm: string;
  status: string;
  loadType: string;
  aiConfidence: string;
  dateRange: string;
  marginRange: string;
  customerType: string;
}

interface NewQuoteData {
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate: string;
  loadType: string;
  weight: string;
  dimensions: string;
  specialRequirements: string;
  proposedRate: string;
  carrierRate: string;
  priority: string;
  autoQuote: boolean;
}

const QuotesPage = () => {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [filters, setFilters] = useState<QuoteFilters>({
    searchTerm: '',
    status: 'all',
    loadType: 'all',
    aiConfidence: 'all',
    dateRange: 'all',
    marginRange: 'all',
    customerType: 'all'
  });

  const [newQuote, setNewQuote] = useState<NewQuoteData>({
    customerName: '',
    contactPerson: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    deliveryDate: '',
    loadType: 'Dry Van',
    weight: '',
    dimensions: '',
    specialRequirements: '',
    proposedRate: '',
    carrierRate: '',
    priority: 'medium',
    autoQuote: true
  });

  // Live dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    approvedQuotes: quotes.filter(q => q.status === 'approved').length,
    totalValue: quotes.reduce((sum, q) => sum + q.amount, 0),
    avgMargin: Math.round(quotes.reduce((sum, q) => sum + (q.aiConfidence * 0.2), 0) / quotes.length),
    conversionRate: Math.round((quotes.filter(q => q.status === 'approved').length / quotes.length) * 100),
    avgResponseTime: '2.3',
    activeNegotiations: 12
  });

  // Market Intelligence Data
  const [marketData, setMarketData] = useState({
    trendingRoutes: [
      { route: 'LA → Phoenix', demand: 'High', rate: '$2,850', change: '+12%' },
      { route: 'Chicago → Dallas', demand: 'Medium', rate: '$3,200', change: '+8%' },
      { route: 'Atlanta → Miami', demand: 'Low', rate: '$1,950', change: '-5%' }
    ],
    rateAlerts: [
      { type: 'increase', message: 'Refrigerated rates up 15% in Southeast', severity: 'high' },
      { type: 'decrease', message: 'Dry van rates declining in Midwest', severity: 'medium' }
    ],
    competitorActivity: [
      { competitor: 'FreightMax Pro', action: 'Aggressive pricing on West Coast routes', impact: 'medium' },
      { competitor: 'LogiCorp Solutions', action: 'New refrigerated fleet deployment', impact: 'low' }
    ]
  });

  const handleQuoteToggle = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'approve':
        toast.success(`${selectedQuotes.length} quotes approved`);
        break;
      case 'decline':
        toast.success(`${selectedQuotes.length} quotes declined`);
        break;
      case 'export':
        toast.success(`${selectedQuotes.length} quotes exported`);
        break;
    }
    setSelectedQuotes([]);
  };

  const generateAIQuote = async () => {
    if (!newQuote.pickupAddress || !newQuote.deliveryAddress || !newQuote.weight) {
      toast.error('Please fill in pickup address, delivery address, and weight for AI quote generation');
      return;
    }

    toast.loading('Generating AI-powered quote...', { id: 'ai-quote' });
    
    // Simulate AI processing
    setTimeout(() => {
      const baseRate = parseFloat(newQuote.weight.replace(/[^0-9.]/g, '')) * 0.08;
      const loadTypeMultiplier = newQuote.loadType === 'Refrigerated' ? 1.3 : newQuote.loadType === 'Flatbed' ? 1.15 : 1.0;
      const aiGeneratedRate = Math.round(baseRate * loadTypeMultiplier * (0.9 + Math.random() * 0.2));
      
      setNewQuote(prev => ({
        ...prev,
        proposedRate: aiGeneratedRate.toString(),
        carrierRate: Math.round(aiGeneratedRate * 0.82).toString()
      }));
      
      toast.success('AI quote generated successfully!', { id: 'ai-quote' });
    }, 2000);
  };

  const createQuote = () => {
    if (!newQuote.customerName || !newQuote.proposedRate) {
      toast.error('Please fill in required fields');
      return;
    }

    const quote = {
      id: (quotes.length + 1).toString(),
      quoteNumber: `QT-2024-${String(quotes.length + 1).padStart(3, '0')}`,
      customer: newQuote.customerName,
      origin: newQuote.pickupAddress.split(',')[0] || newQuote.pickupAddress,
      destination: newQuote.deliveryAddress.split(',')[0] || newQuote.deliveryAddress,
      loadType: newQuote.loadType,
      weight: newQuote.weight,
      date: new Date().toISOString().split('T')[0],
      expiryDate: newQuote.deliveryDate,
      amount: parseFloat(newQuote.proposedRate),
      status: 'pending' as const,
      aiConfidence: 85 + Math.floor(Math.random() * 15)
    };

    setQuotes(prev => [quote, ...prev]);
    setIsNewQuoteOpen(false);
    setNewQuote({
      customerName: '',
      contactPerson: '',
      email: '',
      phone: '',
      pickupAddress: '',
      deliveryAddress: '',
      pickupDate: '',
      deliveryDate: '',
      loadType: 'Dry Van',
      weight: '',
      dimensions: '',
      specialRequirements: '',
      proposedRate: '',
      carrierRate: '',
      priority: 'medium',
      autoQuote: true
    });
    
    toast.success(`Quote ${quote.quoteNumber} created successfully!`);
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         quote.quoteNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         quote.origin.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         quote.destination.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || quote.status === filters.status;
    const matchesLoadType = filters.loadType === 'all' || quote.loadType === filters.loadType;
    const matchesConfidence = filters.aiConfidence === 'all' || 
      (filters.aiConfidence === 'high' && quote.aiConfidence >= 90) ||
      (filters.aiConfidence === 'medium' && quote.aiConfidence >= 70 && quote.aiConfidence < 90) ||
      (filters.aiConfidence === 'low' && quote.aiConfidence < 70);
    
    return matchesSearch && matchesStatus && matchesLoadType && matchesConfidence;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'approved': return 'default';
      case 'declined': return 'destructive';
      case 'expired': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Timer className="h-3 w-3" />;
      case 'approved': return <CheckCircle className="h-3 w-3" />;
      case 'declined': return <XCircle className="h-3 w-3" />;
      case 'expired': return <AlertTriangle className="h-3 w-3" />;
      default: return <Timer className="h-3 w-3" />;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-green-100 text-green-800">High Confidence</Badge>;
    if (confidence >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Medium Confidence</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low Confidence</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Header with Live Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Freight Quote Center</h1>
          <p className="text-muted-foreground text-lg">
            AI-powered quoting with real-time market intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Market Data</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Create New Freight Quote
                </DialogTitle>
                <DialogDescription>
                  Generate competitive quotes with AI-powered market intelligence
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Customer Name *</Label>
                      <Input
                        id="customerName"
                        value={newQuote.customerName}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, customerName: e.target.value }))}
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={newQuote.contactPerson}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, contactPerson: e.target.value }))}
                        placeholder="Primary contact name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newQuote.email}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="contact@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newQuote.phone}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Shipment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pickupAddress">Pickup Address *</Label>
                      <Input
                        id="pickupAddress"
                        value={newQuote.pickupAddress}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, pickupAddress: e.target.value }))}
                        placeholder="Full pickup address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                      <Input
                        id="deliveryAddress"
                        value={newQuote.deliveryAddress}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                        placeholder="Full delivery address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={newQuote.pickupDate}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, pickupDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryDate">Delivery Date</Label>
                        <Input
                          id="deliveryDate"
                          type="date"
                          value={newQuote.deliveryDate}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, deliveryDate: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Load Specifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Load Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="loadType">Equipment Type</Label>
                      <Select value={newQuote.loadType} onValueChange={(value) => setNewQuote(prev => ({ ...prev, loadType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dry Van">Dry Van</SelectItem>
                          <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                          <SelectItem value="Flatbed">Flatbed</SelectItem>
                          <SelectItem value="Step Deck">Step Deck</SelectItem>
                          <SelectItem value="Box Truck">Box Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="weight">Weight *</Label>
                        <Input
                          id="weight"
                          value={newQuote.weight}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, weight: e.target.value }))}
                          placeholder="e.g., 35,000 lbs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dimensions">Dimensions</Label>
                        <Input
                          id="dimensions"
                          value={newQuote.dimensions}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, dimensions: e.target.value }))}
                          placeholder="L x W x H"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={newQuote.specialRequirements}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, specialRequirements: e.target.value }))}
                        placeholder="Hazmat, temperature control, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing & AI */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI-Powered Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newQuote.autoQuote}
                          onCheckedChange={(checked) => setNewQuote(prev => ({ ...prev, autoQuote: checked }))}
                        />
                        <span className="text-sm font-medium">Auto-Generate Quote</span>
                      </div>
                      <Button onClick={generateAIQuote} size="sm" className="bg-blue-600">
                        <Brain className="h-3 w-3 mr-1" />
                        Generate
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="proposedRate">Customer Rate *</Label>
                        <Input
                          id="proposedRate"
                          value={newQuote.proposedRate}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, proposedRate: e.target.value }))}
                          placeholder="$0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="carrierRate">Carrier Cost</Label>
                        <Input
                          id="carrierRate"
                          value={newQuote.carrierRate}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, carrierRate: e.target.value }))}
                          placeholder="$0.00"
                        />
                      </div>
                    </div>

                    {newQuote.proposedRate && newQuote.carrierRate && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium text-green-800">Profit Analysis</div>
                        <div className="text-lg font-bold text-green-600">
                          ${(parseFloat(newQuote.proposedRate) - parseFloat(newQuote.carrierRate)).toFixed(2)} margin
                        </div>
                        <div className="text-sm text-green-600">
                          {(((parseFloat(newQuote.proposedRate) - parseFloat(newQuote.carrierRate)) / parseFloat(newQuote.carrierRate)) * 100).toFixed(1)}% profit margin
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select value={newQuote.priority} onValueChange={(value) => setNewQuote(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setIsNewQuoteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createQuote} className="bg-green-600 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Create Quote
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Live Dashboard Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{dashboardStats.pendingQuotes}</span> pending
            </p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(dashboardStats.totalValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              Avg margin {dashboardStats.avgMargin}%
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.avgResponseTime}h</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.activeNegotiations} active negotiations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Smart Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div className="xl:col-span-2">
              <Label>Search Quotes</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Customer, quote #, route..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Equipment</Label>
              <Select value={filters.loadType} onValueChange={(value) => setFilters(prev => ({ ...prev, loadType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Dry Van">Dry Van</SelectItem>
                  <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="Flatbed">Flatbed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>AI Confidence</Label>
              <Select value={filters.aiConfidence} onValueChange={(value) => setFilters(prev => ({ ...prev, aiConfidence: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High (90%+)</SelectItem>
                  <SelectItem value="medium">Medium (70-89%)</SelectItem>
                  <SelectItem value="low">Low (&lt;70%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date Range</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Actions</Label>
              <div className="flex gap-2">
                {selectedQuotes.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                    Export ({selectedQuotes.length})
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setFilters({
                  searchTerm: '',
                  status: 'all',
                  loadType: 'all',
                  aiConfidence: 'all',
                  dateRange: 'all',
                  marginRange: 'all',
                  customerType: 'all'
                })}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <Tabs defaultValue="quotes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quotes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Quotes Pipeline
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Intel
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-4">
          {/* Quote Grid/List View */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Quotes ({filteredQuotes.length})</CardTitle>
                <div className="flex items-center gap-2">
                  {selectedQuotes.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('approve')}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve ({selectedQuotes.length})
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('decline')}>
                        <XCircle className="h-3 w-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveView(activeView === 'grid' ? 'list' : 'grid')}
                  >
                    {activeView === 'grid' ? <Layers className="h-3 w-3" /> : <BarChart3 className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={activeView === 'grid' ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
                {filteredQuotes.map((quote) => (
                  <Card key={quote.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedQuotes.includes(quote.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`} onClick={() => handleQuoteToggle(quote.id)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(quote.status)} className="flex items-center gap-1">
                            {getStatusIcon(quote.status)}
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </Badge>
                          {getConfidenceBadge(quote.aiConfidence)}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">${quote.amount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{quote.quoteNumber}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="font-semibold">{quote.customer}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {quote.origin} → {quote.destination}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          {quote.loadType}
                        </div>
                        <div>{quote.weight}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Expires: {quote.expiryDate}</span>
                        <span>AI: {quote.aiConfidence}%</span>
                      </div>

                      <div className="flex items-center gap-1 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Trending Routes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Routes
                </CardTitle>
                <CardDescription>Live market demand and pricing trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.trendingRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{route.route}</div>
                        <div className="text-sm text-muted-foreground">Demand: {route.demand}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{route.rate}</div>
                        <div className={`text-sm ${route.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {route.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rate Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Market Alerts
                </CardTitle>
                <CardDescription>Real-time pricing and market changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.rateAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                          alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                        <div>
                          <div className="font-medium">{alert.message}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitor Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Competitor Intelligence
              </CardTitle>
              <CardDescription>Monitor competitor pricing and market positioning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.competitorActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{activity.competitor}</div>
                        <div className="text-sm text-muted-foreground">{activity.action}</div>
                      </div>
                    </div>
                    <Badge variant={
                      activity.impact === 'high' ? 'destructive' : 
                      activity.impact === 'medium' ? 'outline' : 
                      'secondary'
                    }>
                      {activity.impact.charAt(0).toUpperCase() + activity.impact.slice(1)} Impact
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quote Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Win Rate</span>
                    <span className="font-bold">{dashboardStats.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Response Time</span>
                    <span className="font-bold">{dashboardStats.avgResponseTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Quote Value</span>
                    <span className="font-bold">${(dashboardStats.totalValue / dashboardStats.totalQuotes).toFixed(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Pipeline</span>
                    <span className="font-bold">${(dashboardStats.totalValue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Value</span>
                    <span className="font-bold">${(dashboardStats.totalValue * 0.6 / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Close</span>
                    <span className="font-bold">${(dashboardStats.totalValue * 0.4 / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Avg Confidence</span>
                    <span className="font-bold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Generated</span>
                    <span className="font-bold">64%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy Rate</span>
                    <span className="font-bold">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote Templates</CardTitle>
              <CardDescription>Pre-configured templates for common shipping scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Standard Dry Van', description: 'General freight, 48ft dry van', rate: '$2.50/mile' },
                  { name: 'Refrigerated Express', description: 'Temperature-controlled urgent delivery', rate: '$3.20/mile' },
                  { name: 'Flatbed Heavy', description: 'Construction equipment, oversized', rate: '$3.80/mile' },
                  { name: 'LTL Consolidation', description: 'Less-than-truckload groupage', rate: '$1.85/mile' },
                  { name: 'Expedited Service', description: 'Same-day or next-day delivery', rate: '$4.50/mile' },
                  { name: 'Hazmat Transport', description: 'Dangerous goods certified', rate: '$4.00/mile' }
                ].map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{template.rate}</span>
                        <Button size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuotesPage;