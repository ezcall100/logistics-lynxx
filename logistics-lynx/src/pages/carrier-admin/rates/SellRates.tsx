/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Search, Plus, Filter, MapPin, Calendar, Edit, Trash2, DollarSign, Target, Truck, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SellRates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sellRates, setSellRates] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  const transportModes = ['OTR Dry Van', 'Refrigerated', 'Flatbed', 'Tanker', 'LTL', 'Expedited'];
  const customerTypes = ['Freight Brokers', 'Direct Shippers', 'Logistics Companies', '3PL Partners'];

  useEffect(() => {
    fetchSellRates();
  }, [fetchSellRates]);

  const fetchSellRates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('carrier_rates')
        .select(`
          *,
          companies (name)
        `)
        .eq('rate_type', 'sell');

      if (error) throw error;

      // Calculate sell rates based on buy rates with margin
      const { data: buyRates } = await supabase
        .from('carrier_rates')
        .select('*')
        .eq('rate_type', 'buy');

      const formattedRates = data?.map(rate => {
        const buyRate = buyRates?.find(br => 
          br.origin_zone === rate.origin_zone && 
          br.destination_zone === rate.destination_zone
        );
        const margin = 0.25; // 25% margin
        const calculatedSellRate = buyRate ? (buyRate.rate_per_mile || 0) * (1 + margin) : (rate.rate_per_mile || 0);

        return {
          id: rate.id,
          origin: rate.origin_zone?.split(',')[0] || 'Unknown',
          destination: rate.destination_zone?.split(',')[0] || 'Unknown',
          mode: rate.equipment_type || 'OTR Dry Van',
          customer: rate.companies?.name || 'Broker Network',
          buyRate: buyRate?.rate_per_mile || 0,
          sellRate: calculatedSellRate,
          margin: buyRate ? ((calculatedSellRate - buyRate.rate_per_mile) / buyRate.rate_per_mile * 100) : 25,
          totalRate: calculatedSellRate * 1000, // Assuming 1000 miles
          validUntil: rate.expiry_date || '2024-12-31',
          status: new Date(rate.expiry_date || '9999-12-31') > new Date() ? 'active' : 'expired',
          autoAdjust: true,
          fuelSurcharge: rate.fuel_surcharge_rate || 0
        };
      }) || [];

      setSellRates(formattedRates);
    } catch (error) {
      console.error('Error fetching sell rates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sell rates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleCreateRate = async () => {
    toast({
      title: "Success",
      description: "Sell rate created successfully",
    });
    setIsCreateDialogOpen(false);
  };

  const filteredRates = sellRates.filter(rate => {
    const matchesSearch = 
      rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = selectedMode === 'all' || rate.mode === selectedMode;
    const matchesCustomer = selectedCustomer === 'all' || rate.customer.includes(selectedCustomer);
    
    return matchesSearch && matchesMode && matchesCustomer;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Loading sell rates...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              Sell Rates
            </h1>
            <p className="text-muted-foreground">Manage rates you charge to brokers and direct customers</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Sell Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Sell Rate</DialogTitle>
                <DialogDescription>Set pricing for customers and brokers</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origin</Label>
                      <Input id="origin" placeholder="Dallas, TX" />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="Los Angeles, CA" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mode">Transportation Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportModes.map(mode => (
                            <SelectItem key={mode} value={mode.toLowerCase().replace(' ', '-')}>{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="customer">Customer Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer type" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerTypes.map(type => (
                            <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">Rate Calculation</h4>
                    <div className="text-sm text-muted-foreground mb-3">
                      Sell Rate = Buy Rate + Margin + Fuel Surcharge + Accessorials
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="buyRate">Buy Rate ($/mi)</Label>
                        <Input id="buyRate" type="number" placeholder="2.25" step="0.01" />
                      </div>
                      <div>
                        <Label htmlFor="margin">Margin (%)</Label>
                        <Input id="margin" type="number" placeholder="25" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sellRate">Sell Rate ($/mi)</Label>
                      <Input id="sellRate" type="number" placeholder="2.81" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="fuelSurcharge">Fuel Surcharge ($/mi)</Label>
                      <Input id="fuelSurcharge" type="number" placeholder="0.35" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="accessorial">Accessorial (%)</Label>
                      <Input id="accessorial" type="number" placeholder="5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalSellRate">Total Sell Rate ($/mi)</Label>
                      <Input id="totalSellRate" type="number" placeholder="3.16" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="minimumRate">Minimum Rate ($)</Label>
                      <Input id="minimumRate" type="number" placeholder="750" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoAdjust">Auto-adjust with market rates</Label>
                        <p className="text-sm text-muted-foreground">Automatically update rates based on market conditions</p>
                      </div>
                      <Switch id="autoAdjust" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dynamicFuel">Dynamic fuel surcharge</Label>
                        <p className="text-sm text-muted-foreground">Update fuel surcharge based on current fuel prices</p>
                      </div>
                      <Switch id="dynamicFuel" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input id="effectiveDate" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleCreateRate} className="w-32">Create Rate</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sell Rates</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellRates.length}</div>
              <p className="text-xs text-muted-foreground">Customer pricing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Margin</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sellRates.length > 0 ? (sellRates.reduce((sum, rate) => sum + rate.margin, 0) / sellRates.length).toFixed(1) : '0.0'}%
              </div>
              <p className="text-xs text-muted-foreground">Profit margin</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$485,750</div>
              <p className="text-xs text-muted-foreground">Customer payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sellRates.filter(rate => rate.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Current rates</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Sell Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by route or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedMode} onValueChange={setSelectedMode}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  {transportModes.map(mode => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Customers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  {customerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sell Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer & Broker Sell Rates</CardTitle>
            <CardDescription>Pricing for freight transportation services</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Buy Rate</TableHead>
                  <TableHead>Sell Rate</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Total Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{rate.origin} → {rate.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3 text-blue-600" />
                        <span className="text-sm">{rate.mode}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{rate.customer}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-red-600">${rate.buyRate.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-semibold text-green-600">${rate.sellRate.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.margin >= 20 ? 'default' : 'secondary'}>
                        {rate.margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-semibold">{rate.totalRate.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                          {rate.status}
                        </Badge>
                        {rate.autoAdjust && (
                          <Badge variant="outline" className="text-xs">Auto</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Rate Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Margin Routes</CardTitle>
              <CardDescription>Highest profitability routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sellRates
                  .sort((a, b) => b.margin - a.margin)
                  .slice(0, 5)
                  .map((rate) => (
                    <div key={rate.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium">{rate.origin} → {rate.destination}</span>
                        <div className="text-xs text-muted-foreground">{rate.mode}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{rate.margin.toFixed(1)}%</Badge>
                        <div className="text-xs text-muted-foreground">${rate.totalRate.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Distribution</CardTitle>
              <CardDescription>Revenue by customer type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerTypes.map((type) => {
                  const rates = sellRates.filter(rate => rate.customer.includes(type.split(' ')[0]));
                  const revenue = rates.reduce((sum, rate) => sum + rate.totalRate, 0);
                  const percentage = (rates.length / sellRates.length) * 100;
                  return (
                    <div key={type} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{type}</span>
                        <div className="text-xs text-muted-foreground">${revenue.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{rates.length}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default SellRates;