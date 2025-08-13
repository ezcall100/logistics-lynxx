import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, Users, Target, Calendar, Search, Filter } from 'lucide-react';

const MarginAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [searchTerm, setSearchTerm] = useState('');

  const marginData = [
    { id: 1, customer: 'Amazon Logistics', totalRevenue: 145000, totalCost: 108750, margin: 25, profitAmount: 36250, lanes: 45 },
    { id: 2, customer: 'Walmart Supply Chain', totalRevenue: 98500, totalCost: 68950, margin: 30, profitAmount: 29550, lanes: 32 },
    { id: 3, customer: 'Home Depot', totalRevenue: 76200, totalCost: 55826, margin: 27, profitAmount: 20374, lanes: 28 },
    { id: 4, customer: 'Target Corp', totalRevenue: 89400, totalCost: 71520, margin: 20, profitAmount: 17880, lanes: 35 },
    { id: 5, customer: 'FedEx Ground', totalRevenue: 125600, totalCost: 87920, margin: 30, profitAmount: 37680, lanes: 52 },
  ];

  const laneAnalysis = [
    { id: 1, lane: 'LA, CA → NY, NY', volume: 125, avgSellRate: 3500, avgBuyRate: 2800, margin: 20, profit: 87500 },
    { id: 2, lane: 'Chicago, IL → Miami, FL', volume: 98, avgSellRate: 2400, avgBuyRate: 1850, margin: 23, profit: 53900 },
    { id: 3, lane: 'Dallas, TX → Seattle, WA', volume: 76, avgSellRate: 2800, avgBuyRate: 2200, margin: 21, profit: 45600 },
    { id: 4, lane: 'Atlanta, GA → Denver, CO', volume: 89, avgSellRate: 2350, avgBuyRate: 1950, margin: 17, profit: 35600 },
  ];

  const totalRevenue = marginData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalCost = marginData.reduce((sum, item) => sum + item.totalCost, 0);
  const totalProfit = totalRevenue - totalCost;
  const overallMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <PieChart className="h-8 w-8 text-blue-600" />
              Margin Analysis
            </h1>
            <p className="text-muted-foreground">Analyze profitability across customers and lanes</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Margin</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallMargin}%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="customer" className="space-y-6">
          <TabsList>
            <TabsTrigger value="customer">Customer Analysis</TabsTrigger>
            <TabsTrigger value="lane">Lane Analysis</TabsTrigger>
            <TabsTrigger value="trends">Margin Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Margin Analysis</CardTitle>
                <CardDescription>Profitability breakdown by customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin %</TableHead>
                      <TableHead>Lanes</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marginData.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {customer.customer}
                          </div>
                        </TableCell>
                        <TableCell>${customer.totalRevenue.toLocaleString()}</TableCell>
                        <TableCell>${customer.totalCost.toLocaleString()}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${customer.profitAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              customer.margin >= 25 ? 'bg-green-100 text-green-800' :
                              customer.margin >= 20 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {customer.margin}%
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.lanes}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {customer.margin >= 25 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : customer.margin >= 20 ? (
                              <Target className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`text-sm ${
                              customer.margin >= 25 ? 'text-green-600' :
                              customer.margin >= 20 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {customer.margin >= 25 ? 'Excellent' :
                               customer.margin >= 20 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lane" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lane Margin Analysis</CardTitle>
                <CardDescription>Profitability breakdown by shipping lane</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lane</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Avg Sell Rate</TableHead>
                      <TableHead>Avg Buy Rate</TableHead>
                      <TableHead>Margin %</TableHead>
                      <TableHead>Total Profit</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laneAnalysis.map((lane) => (
                      <TableRow key={lane.id}>
                        <TableCell className="font-medium">{lane.lane}</TableCell>
                        <TableCell>{lane.volume} loads</TableCell>
                        <TableCell>${lane.avgSellRate.toLocaleString()}</TableCell>
                        <TableCell>${lane.avgBuyRate.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              lane.margin >= 22 ? 'bg-green-100 text-green-800' :
                              lane.margin >= 18 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {lane.margin}%
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${lane.profit.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {lane.margin >= 22 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : lane.margin >= 18 ? (
                              <Target className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`text-sm ${
                              lane.margin >= 22 ? 'text-green-600' :
                              lane.margin >= 18 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {lane.margin >= 22 ? 'High' :
                               lane.margin >= 18 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Margin Trends</CardTitle>
                  <CardDescription>Margin performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>January 2024</span>
                      <Badge className="bg-green-100 text-green-800">23.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>February 2024</span>
                      <Badge className="bg-green-100 text-green-800">24.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>March 2024</span>
                      <Badge className="bg-green-100 text-green-800">25.8%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Margin Distribution</CardTitle>
                  <CardDescription>Customer margin ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>25%+ Margin</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>20-25% Margin</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>&lt;20% Margin</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-sm">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MarginAnalysis;