import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fuel, TrendingUp, TrendingDown, Plus, Settings, BarChart3, Calendar, RefreshCw, AlertTriangle } from 'lucide-react';

const FuelSurcharge = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentFuelPrices = [
    { region: 'National Average', price: 3.85, change: 0.12, trend: 'up' },
    { region: 'West Coast', price: 4.45, change: 0.18, trend: 'up' },
    { region: 'East Coast', price: 3.72, change: 0.08, trend: 'up' },
    { region: 'Midwest', price: 3.58, change: 0.05, trend: 'up' },
    { region: 'South', price: 3.41, change: 0.15, trend: 'up' },
  ];

  const surchargeRates = [
    { id: 1, customer: 'Amazon Logistics', baseRate: 1.20, currentRate: 3.85, surcharge: 15.8, status: 'active' },
    { id: 2, customer: 'Walmart Supply Chain', baseRate: 1.25, currentRate: 3.85, surcharge: 14.2, status: 'active' },
    { id: 3, customer: 'Home Depot', baseRate: 1.30, currentRate: 3.85, surcharge: 12.5, status: 'active' },
    { id: 4, customer: 'Target Corp', baseRate: 1.35, currentRate: 3.85, surcharge: 11.8, status: 'pending' },
  ];

  const historicalData = [
    { week: 'Week 1', price: 3.45, surcharge: 12.5 },
    { week: 'Week 2', price: 3.58, surcharge: 13.2 },
    { week: 'Week 3', price: 3.72, surcharge: 14.1 },
    { week: 'Week 4', price: 3.85, surcharge: 15.8 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Fuel className="h-8 w-8 text-orange-600" />
              Fuel Surcharge Management
            </h1>
            <p className="text-muted-foreground">Monitor fuel prices and manage surcharge calculations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Prices
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Fuel Surcharge Configuration</DialogTitle>
                  <DialogDescription>Set up automatic fuel surcharge calculations</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Base Fuel Price ($)" type="number" step="0.01" />
                  <Input placeholder="Surcharge Percentage (%)" type="number" step="0.1" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Update Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full">Save Configuration</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Fuel Price Alert */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Fuel Price Alert</p>
                <p className="text-sm text-orange-700">National average fuel price increased by $0.12 this week. Consider updating surcharge rates.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Fuel Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Current Fuel Prices</CardTitle>
            <CardDescription>Real-time fuel prices by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {currentFuelPrices.map((region, index) => (
                <Card key={index} className="bg-gradient-to-br from-orange-50 to-orange-100">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">{region.region}</p>
                      <p className="text-2xl font-bold text-orange-600">${region.price}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {region.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-red-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        )}
                        <span className={`text-xs ${region.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                          ${region.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="current">Current Surcharges</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="history">Historical Data</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Fuel Surcharges</CardTitle>
                <CardDescription>Current surcharge rates applied to customer contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Base Rate</TableHead>
                      <TableHead>Current Fuel Price</TableHead>
                      <TableHead>Surcharge %</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surchargeRates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell className="font-medium">{rate.customer}</TableCell>
                        <TableCell>${rate.baseRate}</TableCell>
                        <TableCell>${rate.currentRate}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {rate.surcharge}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                            {rate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Apply</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Surcharge Calculator</CardTitle>
                <CardDescription>Calculate surcharge based on current fuel prices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Base Fuel Price ($)</label>
                      <Input placeholder="1.25" type="number" step="0.01" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Current Fuel Price ($)</label>
                      <Input placeholder="3.85" type="number" step="0.01" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Miles per Gallon</label>
                      <Input placeholder="6.5" type="number" step="0.1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Trip Distance (miles)</label>
                      <Input placeholder="1250" type="number" />
                    </div>
                    <Button className="w-full">Calculate Surcharge</Button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Calculation Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Price Difference:</span>
                        <span className="font-medium">$2.60</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gallons Used:</span>
                        <span className="font-medium">192.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Cost:</span>
                        <span className="font-medium">$500.00</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total Surcharge:</span>
                          <span className="font-bold text-orange-600">$500.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Fuel Data</CardTitle>
                <CardDescription>Fuel price trends and surcharge history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Average Fuel Price</TableHead>
                      <TableHead>Average Surcharge</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicalData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.week}</TableCell>
                        <TableCell>${data.price}</TableCell>
                        <TableCell>{data.surcharge}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-red-500" />
                            <span className="text-red-500 text-sm">+0.13</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FuelSurcharge;