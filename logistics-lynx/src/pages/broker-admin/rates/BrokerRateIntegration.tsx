import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  ArrowUpDown, 
  Search, 
  Plus, 
  Filter, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Truck, 
  Building, 
  RefreshCw as Sync, 
  CheckCircle, 
  Clock, 
  BarChart3,
  AlertTriangle,
  Percent,
  Settings
} from 'lucide-react';

interface BrokerRate {
  id: string;
  broker_rate_id: string;
  carrier_rate_id?: string;
  carrier_id?: string;
  customer_id?: string;
  rate_type: 'buy' | 'sell';
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  equipment_type: string;
  carrier_rate?: number;
  broker_rate: number;
  margin_amount: number;
  margin_percentage: number;
  fuel_surcharge_rate: number;
  effective_date: string;
  expiry_date?: string;
  status: 'active' | 'inactive' | 'expired';
  auto_margin_enabled: boolean;
  min_margin_percentage: number;
  max_margin_percentage: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface IntegrationSettings {
  id: string;
  carrier_id: string;
  broker_id: string;
  auto_sync_enabled: boolean;
  default_margin_percentage: number;
  min_margin_percentage: number;
  max_margin_percentage: number;
  auto_approval_threshold: number;
  integration_status: 'active' | 'inactive' | 'pending';
  sync_frequency: 'real_time' | 'hourly' | 'daily';
  last_sync?: string;
  settings: unknown;
}

const BrokerRateIntegration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRateType, setSelectedRateType] = useState<'all' | 'buy' | 'sell'>('all');
  const [brokerRates, setBrokerRates] = useState<BrokerRate[]>([]);
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [marginSettings, setMarginSettings] = useState({
    defaultMargin: 15,
    minMargin: 10,
    maxMargin: 30,
    autoSync: true
  });
  const { toast } = useToast();

  // Fetch broker rates and integration settings
  useEffect(() => {
    fetchBrokerRates();
    fetchIntegrationSettings();
  }, []);

  const fetchBrokerRates = async () => {
    try {
      const { data, error } = await supabase
        .from('broker_rates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBrokerRates((data || []) as BrokerRate[]);
    } catch (error) {
      console.error('Error fetching broker rates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch broker rates",
        variant: "destructive"
      });
    }
  };

  const fetchIntegrationSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('rate_integration_settings')
        .select('*')
        .eq('integration_status', 'active');

      if (error) throw error;
      setIntegrationSettings((data || []) as IntegrationSettings[]);
    } catch (error) {
      console.error('Error fetching integration settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBrokerRate = async (rateData: Partial<BrokerRate>) => {
    try {
      const { data, error } = await supabase
        .from('broker_rates')
        .insert([{
          broker_rate_id: `BR-${Date.now()}`,
          rate_type: rateData.rate_type!,
          origin_city: rateData.origin_city!,
          origin_state: rateData.origin_state!,
          destination_city: rateData.destination_city!,
          destination_state: rateData.destination_state!,
          equipment_type: rateData.equipment_type!,
          carrier_rate: rateData.carrier_rate || 0,
          broker_rate: rateData.broker_rate!,
          margin_amount: rateData.broker_rate! - (rateData.carrier_rate || 0),
          margin_percentage: rateData.carrier_rate ? 
            ((rateData.broker_rate! - rateData.carrier_rate) / rateData.carrier_rate) * 100 : 0,
          fuel_surcharge_rate: rateData.fuel_surcharge_rate || 0,
          effective_date: rateData.effective_date!,
          expiry_date: rateData.expiry_date,
          status: 'active',
          auto_margin_enabled: true,
          min_margin_percentage: rateData.min_margin_percentage || 10,
          max_margin_percentage: rateData.max_margin_percentage || 30
        }])
        .select()
        .single();

      if (error) throw error;

      setBrokerRates(prev => [data as BrokerRate, ...prev]);
      toast({
        title: "Success",
        description: "Broker rate created successfully"
      });
    } catch (error) {
      console.error('Error creating broker rate:', error);
      toast({
        title: "Error",
        description: "Failed to create broker rate",
        variant: "destructive"
      });
    }
  };

  const updateMarginSettings = async (newSettings: typeof marginSettings) => {
    try {
      // Update existing integration settings
      for (const setting of integrationSettings) {
        const { error } = await supabase
          .from('rate_integration_settings')
          .update({
            default_margin_percentage: newSettings.defaultMargin,
            min_margin_percentage: newSettings.minMargin,
            max_margin_percentage: newSettings.maxMargin,
            auto_sync_enabled: newSettings.autoSync
          })
          .eq('id', setting.id);

        if (error) throw error;
      }

      setMarginSettings(newSettings);
      toast({
        title: "Success",
        description: "Margin settings updated successfully"
      });
    } catch (error) {
      console.error('Error updating margin settings:', error);
      toast({
        title: "Error",
        description: "Failed to update margin settings",
        variant: "destructive"
      });
    }
  };

  const filteredRates = brokerRates.filter(rate => {
    const matchesSearch = 
      rate.origin_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.destination_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.equipment_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedRateType === 'all' || rate.rate_type === selectedRateType;
    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const totalRates = brokerRates.length;
  const activeRates = brokerRates.filter(rate => rate.status === 'active').length;
  const averageMargin = brokerRates.length > 0 ? 
    brokerRates.reduce((sum, rate) => sum + rate.margin_percentage, 0) / brokerRates.length : 0;
  const totalRevenue = brokerRates.reduce((sum, rate) => sum + rate.margin_amount, 0);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading broker integration...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ArrowUpDown className="h-8 w-8 text-indigo-600" />
              Broker Rate Integration
            </h1>
            <p className="text-muted-foreground">Manage carrier-broker rate integration and margin calculations</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Margin Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Margin Configuration</DialogTitle>
                  <DialogDescription>Configure automatic margin calculations for broker rates</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Margin: {marginSettings.defaultMargin}%</label>
                    <Slider 
                      value={[marginSettings.defaultMargin]} 
                      onValueChange={([value]) => setMarginSettings(prev => ({...prev, defaultMargin: value}))}
                      max={50}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Min Margin: {marginSettings.minMargin}%</label>
                      <Slider 
                        value={[marginSettings.minMargin]} 
                        onValueChange={([value]) => setMarginSettings(prev => ({...prev, minMargin: value}))}
                        max={25}
                        min={1}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Margin: {marginSettings.maxMargin}%</label>
                      <Slider 
                        value={[marginSettings.maxMargin]} 
                        onValueChange={([value]) => setMarginSettings(prev => ({...prev, maxMargin: value}))}
                        max={100}
                        min={10}
                        step={1}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-sync enabled</label>
                    <Switch 
                      checked={marginSettings.autoSync} 
                      onCheckedChange={(checked) => setMarginSettings(prev => ({...prev, autoSync: checked}))}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => updateMarginSettings(marginSettings)}
                  >
                    Save Margin Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Broker Rate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Broker Rate</DialogTitle>
                  <DialogDescription>Create a new buy or sell rate with automatic margin calculation</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const carrierRate = Number(formData.get('carrier_rate'));
                  const marginPercent = Number(formData.get('margin_percentage') || marginSettings.defaultMargin);
                  const brokerRate = carrierRate * (1 + marginPercent / 100);
                  
                  createBrokerRate({
                    rate_type: formData.get('rate_type') as 'buy' | 'sell',
                    origin_city: formData.get('origin_city') as string,
                    origin_state: formData.get('origin_state') as string,
                    destination_city: formData.get('destination_city') as string,
                    destination_state: formData.get('destination_state') as string,
                    equipment_type: formData.get('equipment_type') as string,
                    carrier_rate: carrierRate,
                    broker_rate: Math.round(brokerRate * 100) / 100,
                    margin_percentage: marginPercent,
                    fuel_surcharge_rate: Number(formData.get('fuel_surcharge_rate') || 0),
                    effective_date: formData.get('effective_date') as string,
                    expiry_date: formData.get('expiry_date') as string || undefined,
                    status: 'active',
                    auto_margin_enabled: true,
                    min_margin_percentage: marginSettings.minMargin,
                    max_margin_percentage: marginSettings.maxMargin
                  });
                }}>
                  <div className="space-y-4">
                    <Select name="rate_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buy Rate</SelectItem>
                        <SelectItem value="sell">Sell Rate</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="origin_city" placeholder="Origin City" required />
                      <Input name="origin_state" placeholder="State" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="destination_city" placeholder="Destination City" required />
                      <Input name="destination_state" placeholder="State" required />
                    </div>
                    <Select name="equipment_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Equipment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dry Van">Dry Van</SelectItem>
                        <SelectItem value="Reefer">Reefer</SelectItem>
                        <SelectItem value="Flatbed">Flatbed</SelectItem>
                        <SelectItem value="Step Deck">Step Deck</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input name="carrier_rate" placeholder="Carrier Rate ($)" type="number" step="0.01" required />
                    <Input name="margin_percentage" placeholder={`Margin % (default: ${marginSettings.defaultMargin}%)`} type="number" step="0.1" />
                    <Input name="fuel_surcharge_rate" placeholder="Fuel Surcharge %" type="number" step="0.1" />
                    <Input name="effective_date" placeholder="Effective Date" type="date" required />
                    <Input name="expiry_date" placeholder="Expiry Date" type="date" />
                    <Button type="submit" className="w-full">Create Rate</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rates</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRates}</div>
              <p className="text-xs text-muted-foreground">{activeRates} active rates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMargin.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Across all rates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Margin Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From margin calculations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Integration Status</CardTitle>
              <Sync className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">{integrationSettings.length} integrations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by origin, destination, or equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRateType} onValueChange={(value) => setSelectedRateType(value as unknown)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Rate Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="buy">Buy Rates</SelectItem>
                  <SelectItem value="sell">Sell Rates</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Broker Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Integrated Broker Rates</CardTitle>
            <CardDescription>Carrier rates with automatic broker margin calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Carrier Rate</TableHead>
                  <TableHead>Broker Rate</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Margin $</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <Badge variant={rate.rate_type === 'buy' ? 'default' : 'secondary'}>
                        {rate.rate_type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{rate.origin_city}, {rate.origin_state} → {rate.destination_city}, {rate.destination_state}</span>
                      </div>
                    </TableCell>
                    <TableCell>{rate.equipment_type}</TableCell>
                    <TableCell>
                      {rate.carrier_rate ? (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {rate.carrier_rate.toLocaleString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="font-medium text-green-600">{rate.broker_rate.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {rate.margin_percentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">+${rate.margin_amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {rate.expiry_date ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(rate.expiry_date).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No expiry</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">
                          <Sync className="h-3 w-3 mr-1" />
                          Sync
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BrokerRateIntegration;