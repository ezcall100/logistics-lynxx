import React, { useState } from 'react';
import { Fuel, DollarSign, TrendingUp, TrendingDown, MapPin, Calendar, Plus, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface FuelRecord {
  id: string;
  date: string;
  location: string;
  station: string;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  mileage: number;
  mpg: number;
  fuelType: string;
  receiptNumber?: string;
  paymentMethod: string;
  notes: string;
}

interface FuelStats {
  totalGallons: number;
  totalCost: number;
  avgPricePerGallon: number;
  avgMPG: number;
  costPerMile: number;
  thisMonth: number;
  lastMonth: number;
}

const FuelCostsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [newFuelRecord, setNewFuelRecord] = useState({
    location: '',
    station: '',
    gallons: '',
    pricePerGallon: '',
    paymentMethod: '',
    notes: ''
  });

  // Mock fuel records
  const fuelRecords: FuelRecord[] = [
    {
      id: 'FR001',
      date: '2024-01-26',
      location: 'Phoenix, AZ',
      station: 'TA Travel Center',
      gallons: 180.5,
      pricePerGallon: 3.89,
      totalCost: 702.15,
      mileage: 145280,
      mpg: 6.8,
      fuelType: 'Diesel',
      receiptNumber: 'TA2024001',
      paymentMethod: 'Fleet Card',
      notes: 'Good fuel quality, clean station'
    },
    {
      id: 'FR002',
      date: '2024-01-24',
      location: 'Las Vegas, NV',
      station: 'Pilot Flying J',
      gallons: 165.2,
      pricePerGallon: 3.95,
      totalCost: 652.54,
      mileage: 144100,
      mpg: 7.1,
      fuelType: 'Diesel',
      receiptNumber: 'PFJ2024045',
      paymentMethod: 'Fleet Card',
      notes: 'Premium diesel, good location'
    },
    {
      id: 'FR003',
      date: '2024-01-22',
      location: 'Bakersfield, CA',
      station: 'Loves Travel Stop',
      gallons: 172.8,
      pricePerGallon: 4.12,
      totalCost: 711.94,
      mileage: 142920,
      mpg: 6.9,
      fuelType: 'Diesel',
      receiptNumber: 'LTS2024032',
      paymentMethod: 'Fleet Card',
      notes: 'Higher price but convenient location'
    },
    {
      id: 'FR004',
      date: '2024-01-20',
      location: 'Sacramento, CA',
      station: 'Shell',
      gallons: 158.4,
      pricePerGallon: 4.25,
      totalCost: 673.20,
      mileage: 141740,
      mpg: 7.2,
      fuelType: 'Diesel',
      receiptNumber: 'SHL2024018',
      paymentMethod: 'Credit Card',
      notes: 'Clean facilities, good service'
    },
    {
      id: 'FR005',
      date: '2024-01-18',
      location: 'Reno, NV',
      station: 'Chevron',
      gallons: 179.6,
      pricePerGallon: 3.87,
      totalCost: 695.05,
      mileage: 140560,
      mpg: 6.7,
      fuelType: 'Diesel',
      receiptNumber: 'CHV2024025',
      paymentMethod: 'Fleet Card',
      notes: 'Mountain driving affected MPG'
    }
  ];

  // Mock chart data
  const fuelTrendData = [
    { date: '2024-01-01', price: 3.85, gallons: 175, mpg: 6.9 },
    { date: '2024-01-08', price: 3.92, gallons: 168, mpg: 7.1 },
    { date: '2024-01-15', price: 4.05, gallons: 172, mpg: 6.8 },
    { date: '2024-01-22', price: 4.12, gallons: 165, mpg: 7.0 },
    { date: '2024-01-26', price: 3.89, gallons: 181, mpg: 6.8 }
  ];

  const locationData = [
    { location: 'Phoenix, AZ', cost: 702.15, visits: 3 },
    { location: 'Las Vegas, NV', cost: 652.54, visits: 2 },
    { location: 'Bakersfield, CA', cost: 711.94, visits: 2 },
    { location: 'Sacramento, CA', cost: 673.20, visits: 1 },
    { location: 'Reno, NV', cost: 695.05, visits: 1 }
  ];

  const calculateStats = (): FuelStats => {
    const totalGallons = fuelRecords.reduce((sum, record) => sum + record.gallons, 0);
    const totalCost = fuelRecords.reduce((sum, record) => sum + record.totalCost, 0);
    const avgMPG = fuelRecords.reduce((sum, record) => sum + record.mpg, 0) / fuelRecords.length;
    
    return {
      totalGallons,
      totalCost,
      avgPricePerGallon: totalCost / totalGallons,
      avgMPG,
      costPerMile: totalCost / (fuelRecords[0]?.mileage - fuelRecords[fuelRecords.length - 1]?.mileage || 1),
      thisMonth: totalCost,
      lastMonth: totalCost * 0.92 // Mock last month data
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleAddFuelRecord = () => {
    if (!newFuelRecord.location || !newFuelRecord.gallons || !newFuelRecord.pricePerGallon) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('Fuel record added successfully');
    setNewFuelRecord({
      location: '',
      station: '',
      gallons: '',
      pricePerGallon: '',
      paymentMethod: '',
      notes: ''
    });
    // Mock API call would go here
  };

  const getMonthlyChange = () => {
    const change = ((stats.thisMonth - stats.lastMonth) / stats.lastMonth) * 100;
    return {
      value: Math.abs(change),
      isIncrease: change > 0,
      icon: change > 0 ? TrendingUp : TrendingDown,
      color: change > 0 ? 'text-red-600' : 'text-green-600'
    };
  };

  const monthlyChange = getMonthlyChange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fuel & Costs</h1>
            <p className="text-muted-foreground">Track fuel expenses and analyze consumption patterns</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fuel Record
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Fuel Record</DialogTitle>
                  <DialogDescription>Record a new fuel purchase</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={newFuelRecord.location}
                      onChange={(e) => setNewFuelRecord({...newFuelRecord, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="station">Station</Label>
                    <Input
                      id="station"
                      placeholder="Station name"
                      value={newFuelRecord.station}
                      onChange={(e) => setNewFuelRecord({...newFuelRecord, station: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gallons">Gallons *</Label>
                    <Input
                      id="gallons"
                      type="number"
                      placeholder="0.0"
                      value={newFuelRecord.gallons}
                      onChange={(e) => setNewFuelRecord({...newFuelRecord, gallons: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerGallon">Price per Gallon *</Label>
                    <Input
                      id="pricePerGallon"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newFuelRecord.pricePerGallon}
                      onChange={(e) => setNewFuelRecord({...newFuelRecord, pricePerGallon: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={newFuelRecord.paymentMethod} onValueChange={(value) => setNewFuelRecord({...newFuelRecord, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fleet_card">Fleet Card</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      placeholder="Additional notes"
                      value={newFuelRecord.notes}
                      onChange={(e) => setNewFuelRecord({...newFuelRecord, notes: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleAddFuelRecord}>Add Record</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fuel Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalCost)}</div>
              <div className={`flex items-center text-xs ${monthlyChange.color}`}>
                <monthlyChange.icon className="h-3 w-3 mr-1" />
                {monthlyChange.value.toFixed(1)}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Price/Gallon</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.avgPricePerGallon)}</div>
              <p className="text-xs text-muted-foreground">Current period average</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average MPG</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgMPG.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Miles per gallon</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost per Mile</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.costPerMile)}</div>
              <p className="text-xs text-muted-foreground">Fuel cost efficiency</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analysis */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Fuel Trends</TabsTrigger>
            <TabsTrigger value="locations">Top Locations</TabsTrigger>
            <TabsTrigger value="records">Fuel Records</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Price Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fuelTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: unknown, name) => [
                          name === 'price' ? formatCurrency(value) : value,
                          name === 'price' ? 'Price/Gallon' : name
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>MPG Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fuelTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: unknown) => [value.toFixed(1), 'MPG']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mpg" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Costs by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip formatter={(value: unknown) => formatCurrency(value)} />
                    <Bar dataKey="cost" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Fuel Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fuelRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Fuel className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{record.station}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{record.location}</span>
                            <Calendar className="h-3 w-3 ml-2" />
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(record.totalCost)}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.gallons.toFixed(1)} gal @ {formatCurrency(record.pricePerGallon)}/gal
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {record.mpg.toFixed(1)} MPG
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FuelCostsPage;