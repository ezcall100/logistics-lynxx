import React, { useState, useEffect } from 'react';
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
import { Fuel, Plus, TrendingUp, TrendingDown, AlertCircle, DollarSign, BarChart3, Calendar, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FuelSurcharge = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for fuel surcharge
  const fuelData = {
    currentPrice: 3.85,
    baseFuelPrice: 1.25,
    currentSurcharge: 28.5,
    weeklyChange: 0.12,
    monthlyChange: -0.23
  };

  const surchargeRates = [
    {
      id: 1,
      equipment: 'Dry Van',
      baseFuelPrice: 1.25,
      currentFuelPrice: 3.85,
      surchargePercent: 28.5,
      perMile: 0.42,
      effectiveDate: '2024-01-15',
      nextUpdate: '2024-01-22',
      status: 'active'
    },
    {
      id: 2,
      equipment: 'Reefer',
      baseFuelPrice: 1.25,
      currentFuelPrice: 3.85,
      surchargePercent: 32.0,
      perMile: 0.48,
      effectiveDate: '2024-01-15',
      nextUpdate: '2024-01-22',
      status: 'active'
    },
    {
      id: 3,
      equipment: 'Flatbed',
      baseFuelPrice: 1.25,
      currentFuelPrice: 3.85,
      surchargePercent: 30.2,
      perMile: 0.45,
      effectiveDate: '2024-01-15',
      nextUpdate: '2024-01-22',
      status: 'active'
    }
  ];

  const fuelHistory = [
    { date: '2024-01-15', price: 3.85, surcharge: 28.5, change: 0.03 },
    { date: '2024-01-08', price: 3.82, surcharge: 28.2, change: -0.05 },
    { date: '2024-01-01', price: 3.87, surcharge: 28.7, change: 0.02 },
    { date: '2023-12-25', price: 3.85, surcharge: 28.5, change: 0.08 }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Fuel className="h-8 w-8 text-orange-600" />
              Fuel Surcharge
            </h1>
            <p className="text-muted-foreground">Manage fuel surcharge rates and calculations</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Surcharge Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Fuel Surcharge Rule</DialogTitle>
                <DialogDescription>Set up new fuel surcharge parameters</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="equipment">Equipment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry-van">Dry Van</SelectItem>
                      <SelectItem value="reefer">Reefer</SelectItem>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="basePrice">Base Fuel Price ($)</Label>
                  <Input id="basePrice" placeholder="1.25" />
                </div>
                <div>
                  <Label htmlFor="surchargeRate">Surcharge Rate (%)</Label>
                  <Input id="surchargeRate" placeholder="28.5" />
                </div>
                <Button className="w-full">Create Rule</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Fuel Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Fuel Price</p>
                  <p className="text-2xl font-bold">${fuelData.currentPrice}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+${fuelData.weeklyChange}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Base Price</p>
                  <p className="text-2xl font-bold">${fuelData.baseFuelPrice}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Surcharge</p>
                  <p className="text-2xl font-bold">{fuelData.currentSurcharge}%</p>
                </div>
                <div className="flex items-center text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">{fuelData.monthlyChange}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Update</p>
                  <p className="text-lg font-semibold">Jan 22, 2024</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="current">Current Rates</TabsTrigger>
            <TabsTrigger value="history">Price History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Fuel Surcharge Rates</CardTitle>
                <CardDescription>Current surcharge rates by equipment type</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Surcharge %</TableHead>
                      <TableHead>Per Mile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surchargeRates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell className="font-medium">{rate.equipment}</TableCell>
                        <TableCell>${rate.baseFuelPrice}</TableCell>
                        <TableCell>${rate.currentFuelPrice}</TableCell>
                        <TableCell>{rate.surchargePercent}%</TableCell>
                        <TableCell>${rate.perMile}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(rate.status)}>
                            {rate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Price History</CardTitle>
                <CardDescription>Historical fuel prices and surcharge rates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Fuel Price</TableHead>
                      <TableHead>Surcharge %</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelHistory.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>${entry.price}</TableCell>
                        <TableCell>{entry.surcharge}%</TableCell>
                        <TableCell>
                          <div className={`flex items-center ${entry.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            ${Math.abs(entry.change).toFixed(2)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Surcharge Settings</CardTitle>
                <CardDescription>Configure fuel surcharge calculation parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="autoUpdate">Auto Update Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dataSource">Fuel Price Source</Label>
                    <Select defaultValue="eia">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eia">EIA (Energy Information Administration)</SelectItem>
                        <SelectItem value="dot">DOT National Average</SelectItem>
                        <SelectItem value="manual">Manual Entry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications" />
                  <Label htmlFor="notifications">Send notifications when fuel surcharge changes by more than 2%</Label>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default FuelSurcharge;