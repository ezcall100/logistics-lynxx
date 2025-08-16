import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  Fuel, 
  Calculator, 
  Target, 
  Plus, 
  Filter, 
  Search, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Truck,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Rate {
  id: string;
  rateType: 'buy' | 'sell';
  category: 'base' | 'fuel_surcharge' | 'accessorial';
  name: string;
  amount: number;
  unit: string;
  transportMode: string;
  origin: string;
  destination: string;
  effectiveDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'pending';
  margin?: number;
  target?: number;
  description?: string;
  conditions?: string[];
}

const mockRates: Rate[] = [
  {
    id: 'BUY001',
    rateType: 'buy',
    category: 'base',
    name: 'FTL Dry Van Rate',
    amount: 2.85,
    unit: '$/mile',
    transportMode: 'FTL',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-06-30',
    status: 'active',
    margin: 0.45,
    target: 3.30,
    description: 'Standard dry van freight rate for Chicago to Atlanta corridor',
    conditions: ['Minimum 48hr notice', 'No hazmat', 'Standard loading dock']
  },
  {
    id: 'SELL001',
    rateType: 'sell',
    category: 'base',
    name: 'FTL Reefer Rate',
    amount: 3.75,
    unit: '$/mile',
    transportMode: 'FTL',
    origin: 'Miami, FL',
    destination: 'New York, NY',
    effectiveDate: '2024-01-15',
    expiryDate: '2024-07-15',
    status: 'active',
    margin: 0.65,
    target: 4.40,
    description: 'Temperature-controlled freight rate for produce shipments',
    conditions: ['Temperature monitoring required', '24hr max transit', 'Reefer certified driver']
  },
  {
    id: 'FUEL001',
    rateType: 'buy',
    category: 'fuel_surcharge',
    name: 'National Fuel Surcharge',
    amount: 0.42,
    unit: '$/mile',
    transportMode: 'All',
    origin: 'National',
    destination: 'National',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'active',
    description: 'DOE-based fuel surcharge calculation',
    conditions: ['Updated weekly', 'Based on DOE average']
  },
  {
    id: 'ACC001',
    rateType: 'sell',
    category: 'accessorial',
    name: 'Detention Rate',
    amount: 75,
    unit: '$/hour',
    transportMode: 'All',
    origin: 'All',
    destination: 'All',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'active',
    description: 'Detention charges after 2 hour free time',
    conditions: ['2 hour free time', 'Proof required', 'Pre-approved only']
  },
  {
    id: 'LTL001',
    rateType: 'buy',
    category: 'base',
    name: 'LTL Standard Rate',
    amount: 185,
    unit: '$/shipment',
    transportMode: 'LTL',
    origin: 'California',
    destination: 'Texas',
    effectiveDate: '2024-02-01',
    expiryDate: '2024-08-01',
    status: 'active',
    margin: 35,
    target: 220,
    description: 'LTL shipments under 10,000 lbs',
    conditions: ['Palletized freight only', 'Standard liability']
  },
  {
    id: 'INT001',
    rateType: 'sell',
    category: 'base',
    name: 'Intermodal Rate',
    amount: 1850,
    unit: '$/container',
    transportMode: 'Intermodal',
    origin: 'Port of LA',
    destination: 'Chicago Ramp',
    effectiveDate: '2024-01-10',
    expiryDate: '2024-06-10',
    status: 'active',
    margin: 285,
    target: 2135,
    description: '53ft container intermodal service',
    conditions: ['Container provided', 'Rail schedule dependent', 'Drayage included']
  }
];

const transportModes = ['All', 'FTL', 'LTL', 'Intermodal', 'Expedited', 'White Glove', 'Flatbed', 'Tanker'];
const rateCategories = [
  { value: 'base', label: 'Base Rates', icon: DollarSign },
  { value: 'fuel_surcharge', label: 'Fuel Surcharge', icon: Fuel },
  { value: 'accessorial', label: 'Accessorial', icon: Calculator }
];

const RatesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Determine initial tab based on URL path or search params
  const getInitialTab = useCallback(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) return tabParam;
    
    const path = location.pathname;
    if (path.includes('/buy')) return 'buy';
    if (path.includes('/sell')) return 'sell';
    if (path.includes('/fuel')) return 'fuel';
    if (path.includes('/accessorial')) return 'accessorial';
    if (path.includes('/margin')) return 'margin';
    if (path.includes('/target')) return 'target';
    
    return 'all';
  }, []);
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [selectedMode, setSelectedMode] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname, searchParams, getInitialTab]);

  // Form state for creating/editing rates
  const [formData, setFormData] = useState({
    rateType: 'buy' as 'buy' | 'sell',
    category: 'base' as 'base' | 'fuel_surcharge' | 'accessorial',
    name: '',
    amount: '',
    unit: '$/mile',
    transportMode: 'FTL',
    origin: '',
    destination: '',
    effectiveDate: '',
    expiryDate: '',
    description: '',
    conditions: ''
  });

  const filteredRates = mockRates.filter(rate => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'buy' && rate.rateType === 'buy') ||
      (activeTab === 'sell' && rate.rateType === 'sell') ||
      (activeTab === 'fuel' && rate.category === 'fuel_surcharge') ||
      (activeTab === 'accessorial' && rate.category === 'accessorial') ||
      (activeTab === 'margin' && rate.margin) ||
      (activeTab === 'target' && rate.target);
    
    const matchesMode = selectedMode === 'All' || rate.transportMode === selectedMode || rate.transportMode === 'All';
    const matchesSearch = rate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rate.category === selectedCategory;

    return matchesTab && matchesMode && matchesSearch && matchesCategory;
  });

  const handleCreateRate = () => {
    console.log('Creating rate:', formData);
    setIsCreateDialogOpen(false);
    // Reset form
    setFormData({
      rateType: 'buy',
      category: 'base',
      name: '',
      amount: '',
      unit: '$/mile',
      transportMode: 'FTL',
      origin: '',
      destination: '',
      effectiveDate: '',
      expiryDate: '',
      description: '',
      conditions: ''
    });
  };

  const handleEditRate = (rate: Rate) => {
    setSelectedRate(rate);
    setFormData({
      rateType: rate.rateType,
      category: rate.category,
      name: rate.name,
      amount: rate.amount.toString(),
      unit: rate.unit,
      transportMode: rate.transportMode,
      origin: rate.origin,
      destination: rate.destination,
      effectiveDate: rate.effectiveDate,
      expiryDate: rate.expiryDate,
      description: rate.description || '',
      conditions: rate.conditions?.join(', ') || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateRate = () => {
    console.log('Updating rate:', selectedRate?.id, formData);
    setIsEditDialogOpen(false);
    setSelectedRate(null);
  };

  const handleDeleteRate = (rateId: string) => {
    console.log('Deleting rate:', rateId);
  };

  const handleDuplicateRate = (rate: Rate) => {
    setFormData({
      rateType: rate.rateType,
      category: rate.category,
      name: `${rate.name} (Copy)`,
      amount: rate.amount.toString(),
      unit: rate.unit,
      transportMode: rate.transportMode,
      origin: rate.origin,
      destination: rate.destination,
      effectiveDate: '',
      expiryDate: '',
      description: rate.description || '',
      conditions: rate.conditions?.join(', ') || ''
    });
    setIsCreateDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline'
    };
    return <Badge variant={variants[status as keyof typeof variants] as unknown}>{status}</Badge>;
  };

  const getRateTypeIcon = (type: string, category: string) => {
    if (category === 'fuel_surcharge') return <Fuel className="h-4 w-4" />;
    if (category === 'accessorial') return <Calculator className="h-4 w-4" />;
    if (type === 'buy') return <TrendingUp className="h-4 w-4 text-red-500" />;
    return <DollarSign className="h-4 w-4 text-green-500" />;
  };

  const stats = {
    totalRates: mockRates.length,
    activeRates: mockRates.filter(r => r.status === 'active').length,
    avgMargin: mockRates.filter(r => r.margin).reduce((acc, r) => acc + (r.margin || 0), 0) / mockRates.filter(r => r.margin).length,
    topTransportMode: 'FTL'
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rate Management</h1>
          <p className="text-muted-foreground">Manage buy rates, sell rates, fuel surcharges, and accessorial charges</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Rate</DialogTitle>
                <DialogDescription>
                  Set up a new rate for your transportation services
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rateType">Rate Type</Label>
                      <Select value={formData.rateType} onValueChange={(value: 'buy' | 'sell') => setFormData({...formData, rateType: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy Rate</SelectItem>
                          <SelectItem value="sell">Sell Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value: 'base' | 'fuel_surcharge' | 'accessorial') => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base">Base Rate</SelectItem>
                          <SelectItem value="fuel_surcharge">Fuel Surcharge</SelectItem>
                          <SelectItem value="accessorial">Accessorial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Rate Name</Label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., FTL Dry Van Rate"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input 
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$/mile">$/mile</SelectItem>
                          <SelectItem value="$/hour">$/hour</SelectItem>
                          <SelectItem value="$/shipment">$/shipment</SelectItem>
                          <SelectItem value="$/container">$/container</SelectItem>
                          <SelectItem value="$/cwt">$/cwt</SelectItem>
                          <SelectItem value="%">Percentage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="transportMode">Transport Mode</Label>
                      <Select value={formData.transportMode} onValueChange={(value) => setFormData({...formData, transportMode: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {transportModes.filter(mode => mode !== 'All').map(mode => (
                            <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origin</Label>
                      <Input 
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                        placeholder="e.g., Chicago, IL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input 
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        placeholder="e.g., Atlanta, GA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input 
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input 
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Rate description and notes"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="conditions">Conditions (comma-separated)</Label>
                    <Textarea 
                      value={formData.conditions}
                      onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                      placeholder="e.g., Minimum 48hr notice, No hazmat, Standard loading dock"
                      rows={2}
                    />
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRate}>
                  Create Rate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rates</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRates}</div>
            <p className="text-xs text-muted-foreground">
              Across all transport modes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rates</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRates}</div>
            <p className="text-xs text-muted-foreground">
              Currently in use
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgMargin.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per mile margin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Mode</CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topTransportMode}</div>
            <p className="text-xs text-muted-foreground">
              Most active mode
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rates, origins, destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Transport Mode" />
              </SelectTrigger>
              <SelectContent>
                {transportModes.map(mode => (
                  <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Rate Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {rateCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rate Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All Rates</TabsTrigger>
          <TabsTrigger value="buy">Buy Rates</TabsTrigger>
          <TabsTrigger value="sell">Sell Rates</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Surcharge</TabsTrigger>
          <TabsTrigger value="accessorial">Accessorial</TabsTrigger>
          <TabsTrigger value="margin">Margin Rates</TabsTrigger>
          <TabsTrigger value="target">Target Rates</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Rate Overview ({filteredRates.length} rates)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Rate Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRateTypeIcon(rate.rateType, rate.category)}
                            <div>
                              <div className="font-medium capitalize">{rate.rateType}</div>
                              <div className="text-xs text-muted-foreground capitalize">
                                {rate.category.replace('_', ' ')}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{rate.name}</div>
                            <div className="text-xs text-muted-foreground">{rate.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${rate.amount.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{rate.unit}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">
                              {rate.origin} → {rate.destination}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {rate.transportMode}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(rate.status)}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(rate.effectiveDate).toLocaleDateString()}
                            </div>
                            <div className="text-muted-foreground">
                              to {new Date(rate.expiryDate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {rate.margin ? (
                            <div>
                              <div className="font-medium text-green-600">
                                +${rate.margin.toFixed(2)}
                              </div>
                              {rate.target && (
                                <div className="text-xs text-muted-foreground">
                                  Target: ${rate.target.toFixed(2)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRate(rate)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicateRate(rate)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRate(rate.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Rate Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Rate</DialogTitle>
            <DialogDescription>
              Update the rate information
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rateType">Rate Type</Label>
                  <Select value={formData.rateType} onValueChange={(value: 'buy' | 'sell') => setFormData({...formData, rateType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy Rate</SelectItem>
                      <SelectItem value="sell">Sell Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: 'base' | 'fuel_surcharge' | 'accessorial') => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base Rate</SelectItem>
                      <SelectItem value="fuel_surcharge">Fuel Surcharge</SelectItem>
                      <SelectItem value="accessorial">Accessorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="name">Rate Name</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., FTL Dry Van Rate"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$/mile">$/mile</SelectItem>
                      <SelectItem value="$/hour">$/hour</SelectItem>
                      <SelectItem value="$/shipment">$/shipment</SelectItem>
                      <SelectItem value="$/container">$/container</SelectItem>
                      <SelectItem value="$/cwt">$/cwt</SelectItem>
                      <SelectItem value="%">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transportMode">Transport Mode</Label>
                  <Select value={formData.transportMode} onValueChange={(value) => setFormData({...formData, transportMode: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.filter(mode => mode !== 'All').map(mode => (
                        <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input 
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    placeholder="e.g., Chicago, IL"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input 
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    placeholder="e.g., Atlanta, GA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input 
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Rate description and notes"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="conditions">Conditions (comma-separated)</Label>
                <Textarea 
                  value={formData.conditions}
                  onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                  placeholder="e.g., Minimum 48hr notice, No hazmat, Standard loading dock"
                  rows={2}
                />
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRate}>
              Update Rate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatesPage;