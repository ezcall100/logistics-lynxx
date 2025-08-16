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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Search, Plus, Filter, MapPin, Calendar, Edit, Trash2, TrendingDown, Truck, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BuyRates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [buyRates, setBuyRates] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  const transportModes = ['OTR Dry Van', 'Refrigerated', 'Flatbed', 'Tanker', 'LTL', 'Expedited'];
  const equipmentTypes = ['53ft Dry Van', '53ft Reefer', '48ft Flatbed', 'Step Deck', 'Lowboy', 'Tanker', 'Box Truck'];

  useEffect(() => {
    fetchBuyRates();
  }, [fetchBuyRates]);

  const fetchBuyRates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('carrier_rates')
        .select(`
          *,
          companies (name)
        `)
        .eq('rate_type', 'buy');

      if (error) throw error;

      const formattedRates = data?.map(rate => ({
        id: rate.id,
        origin: rate.origin_zone?.split(',')[0] || 'Unknown',
        destination: rate.destination_zone?.split(',')[0] || 'Unknown',
        mode: rate.equipment_type || 'OTR Dry Van',
        equipment: rate.equipment_type || '53ft Dry Van',
        ratePerMile: rate.rate_per_mile || 0,
        rate: (rate.rate_per_mile || 0) * 1000, // Assuming 1000 miles average
        mileage: 1000,
        fuelSurcharge: rate.fuel_surcharge_rate || 0,
        validUntil: rate.expiry_date || '2024-12-31',
        status: new Date(rate.expiry_date || '9999-12-31') > new Date() ? 'active' : 'expired',
        company: rate.companies?.name || 'Direct'
      })) || [];

      setBuyRates(formattedRates);
    } catch (error) {
      console.error('Error fetching buy rates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch buy rates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleCreateRate = async () => {
    // Implementation for creating new rate
    toast({
      title: "Success",
      description: "Buy rate created successfully",
    });
    setIsCreateDialogOpen(false);
  };

  const filteredRates = buyRates.filter(rate => {
    const matchesSearch = 
      rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = selectedMode === 'all' || rate.mode === selectedMode;
    const matchesEquipment = selectedEquipment === 'all' || rate.equipment === selectedEquipment;
    
    return matchesSearch && matchesMode && matchesEquipment;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Loading buy rates...</div>
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
              <TrendingDown className="h-8 w-8 text-red-600" />
              Buy Rates
            </h1>
            <p className="text-muted-foreground">Manage rates you pay to drivers and owner-operators</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Buy Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Buy Rate</DialogTitle>
                <DialogDescription>Set a new rate you'll pay to drivers or owner-operators</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="rates">Rate Details</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
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
                      <Label htmlFor="equipment">Equipment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment" />
                        </SelectTrigger>
                        <SelectContent>
                          {equipmentTypes.map(eq => (
                            <SelectItem key={eq} value={eq.toLowerCase().replace(' ', '-')}>{eq}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rates" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ratePerMile">Rate per Mile ($)</Label>
                      <Input id="ratePerMile" type="number" placeholder="2.25" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="fuelSurcharge">Fuel Surcharge ($/mi)</Label>
                      <Input id="fuelSurcharge" type="number" placeholder="0.35" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="minimumRate">Minimum Rate ($)</Label>
                      <Input id="minimumRate" type="number" placeholder="500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mileage">Estimated Mileage</Label>
                      <Input id="mileage" type="number" placeholder="1350" />
                    </div>
                    <div>
                      <Label htmlFor="totalRate">Total Rate ($)</Label>
                      <Input id="totalRate" type="number" placeholder="3037.50" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="conditions" className="space-y-4">
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
                  <div>
                    <Label htmlFor="conditions">Special Conditions</Label>
                    <Input id="conditions" placeholder="Hazmat certified, experience required, etc." />
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
              <CardTitle className="text-sm font-medium">Total Buy Rates</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyRates.length}</div>
              <p className="text-xs text-muted-foreground">Active rate cards</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rate/Mile</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${buyRates.length > 0 ? (buyRates.reduce((sum, rate) => sum + rate.ratePerMile, 0) / buyRates.length).toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">Weighted average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$285,750</div>
              <p className="text-xs text-muted-foreground">Driver payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyRates.filter(rate => rate.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Current routes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Buy Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by origin or destination..."
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
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  {equipmentTypes.map(eq => (
                    <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Buy Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Driver & Owner-Operator Buy Rates</CardTitle>
            <CardDescription>Rates you pay for freight transportation services</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Rate/Mile</TableHead>
                  <TableHead>Fuel Surcharge</TableHead>
                  <TableHead>Total Rate</TableHead>
                  <TableHead>Valid Until</TableHead>
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
                      <Badge variant="outline">{rate.equipment}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-semibold">${rate.ratePerMile.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono">${rate.fuelSurcharge.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-semibold">{rate.rate.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {rate.validUntil}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
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
              <CardTitle>Top Paying Routes</CardTitle>
              <CardDescription>Highest rate per mile routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {buyRates
                  .sort((a, b) => b.ratePerMile - a.ratePerMile)
                  .slice(0, 5)
                  .map((rate) => (
                    <div key={rate.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium">{rate.origin} → {rate.destination}</span>
                        <div className="text-xs text-muted-foreground">{rate.mode}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">${rate.ratePerMile.toFixed(2)}/mi</Badge>
                        <div className="text-xs text-muted-foreground">${rate.rate.toLocaleString()} total</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mode Distribution</CardTitle>
              <CardDescription>Buy rates by transportation mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transportModes.map((mode) => {
                  const count = buyRates.filter(rate => rate.mode === mode).length;
                  const percentage = (count / buyRates.length) * 100;
                  return (
                    <div key={mode} className="flex justify-between items-center">
                      <span className="text-sm">{mode}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{count}</span>
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

export default BuyRates;