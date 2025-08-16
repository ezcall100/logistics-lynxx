/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Percent, Target, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MarginAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for margin analysis
  const marginMetrics = {
    overallMargin: 28.5,
    targetMargin: 25.0,
    marginTrend: 2.3,
    costBreakdown: {
      fuel: 32.5,
      driver: 28.0,
      maintenance: 12.5,
      insurance: 8.0,
      other: 19.0
    }
  };

  const routeMargins = [
    {
      id: 1,
      route: 'Los Angeles, CA → New York, NY',
      equipment: 'Dry Van',
      revenue: 3200,
      costs: 2240,
      margin: 30.0,
      marginDollar: 960,
      loads: 12,
      avgMiles: 2800,
      status: 'excellent',
      trend: 'improving'
    },
    {
      id: 2,
      route: 'Chicago, IL → Miami, FL',
      equipment: 'Reefer',
      revenue: 2100,
      costs: 1554,
      margin: 26.0,
      marginDollar: 546,
      loads: 8,
      avgMiles: 1200,
      status: 'good',
      trend: 'stable'
    },
    {
      id: 3,
      route: 'Dallas, TX → Seattle, WA',
      equipment: 'Flatbed',
      revenue: 2600,
      costs: 1820,
      margin: 30.0,
      marginDollar: 780,
      loads: 6,
      avgMiles: 1800,
      status: 'excellent',
      trend: 'improving'
    },
    {
      id: 4,
      route: 'Atlanta, GA → Denver, CO',
      equipment: 'Dry Van',
      revenue: 2300,
      costs: 1725,
      margin: 25.0,
      marginDollar: 575,
      loads: 10,
      avgMiles: 1400,
      status: 'average',
      trend: 'declining'
    },
    {
      id: 5,
      route: 'Phoenix, AZ → Houston, TX',
      equipment: 'Dry Van',
      revenue: 1850,
      costs: 1443,
      margin: 22.0,
      marginDollar: 407,
      loads: 15,
      avgMiles: 1100,
      status: 'below_average',
      trend: 'stable'
    }
  ];

  const customerMargins = [
    { customer: 'Walmart', margin: 32.5, revenue: 45600, loads: 28 },
    { customer: 'Amazon', margin: 28.0, revenue: 38200, loads: 22 },
    { customer: 'Target', margin: 31.2, revenue: 29800, loads: 18 },
    { customer: 'Home Depot', margin: 26.8, revenue: 22400, loads: 15 },
    { customer: 'FedEx', margin: 24.5, revenue: 18600, loads: 12 }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const getMarginStatus = (margin: number) => {
    if (margin >= 30) return { label: 'Excellent', color: 'text-green-600 bg-green-50' };
    if (margin >= 25) return { label: 'Good', color: 'text-blue-600 bg-blue-50' };
    if (margin >= 20) return { label: 'Average', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Below Average', color: 'text-red-600 bg-red-50' };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Margin Analysis
            </h1>
            <p className="text-muted-foreground">Analyze profitability and optimize pricing strategies</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Margin</p>
                  <p className="text-2xl font-bold">{marginMetrics.overallMargin}%</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+{marginMetrics.marginTrend}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target Margin</p>
                  <p className="text-2xl font-bold">{marginMetrics.targetMargin}%</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Route</p>
                  <p className="text-lg font-semibold">30.0%</p>
                </div>
                <div className="text-green-600">
                  <span className="text-sm">LA → NY</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Worst Route</p>
                  <p className="text-lg font-semibold">22.0%</p>
                </div>
                <div className="text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">PHX → HOU</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="routes">By Routes</TabsTrigger>
            <TabsTrigger value="customers">By Customers</TabsTrigger>
            <TabsTrigger value="equipment">By Equipment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>Distribution of operational costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(marginMetrics.costBreakdown).map(([category, percentage]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="capitalize font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Margin Optimization Tips</CardTitle>
                  <CardDescription>Recommendations to improve profitability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium">Increase Phoenix → Houston rates</p>
                        <p className="text-sm text-muted-foreground">Margin is 3% below target</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">Negotiate fuel surcharge</p>
                        <p className="text-sm text-muted-foreground">32.5% of costs - highest category</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium">Focus on LA → NY route</p>
                        <p className="text-sm text-muted-foreground">Highest margin route - expand capacity</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Route Margin Analysis</CardTitle>
                <CardDescription>Profitability breakdown by route</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Margin %</TableHead>
                      <TableHead>Margin $</TableHead>
                      <TableHead>Loads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routeMargins.map((route) => {
                      const status = getMarginStatus(route.margin);
                      return (
                        <TableRow key={route.id}>
                          <TableCell className="font-medium">{route.route}</TableCell>
                          <TableCell>{route.equipment}</TableCell>
                          <TableCell>${route.revenue.toLocaleString()}</TableCell>
                          <TableCell>${route.costs.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">{route.margin}%</TableCell>
                          <TableCell className="font-medium text-green-600">${route.marginDollar}</TableCell>
                          <TableCell>{route.loads}</TableCell>
                          <TableCell>
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getTrendIcon(route.trend)}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Margin Analysis</CardTitle>
                <CardDescription>Profitability by customer</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Margin %</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Loads</TableHead>
                      <TableHead>Avg per Load</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerMargins.map((customer, index) => {
                      const status = getMarginStatus(customer.margin);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{customer.customer}</TableCell>
                          <TableCell className="font-medium">{customer.margin}%</TableCell>
                          <TableCell>${customer.revenue.toLocaleString()}</TableCell>
                          <TableCell>{customer.loads}</TableCell>
                          <TableCell>${(customer.revenue / customer.loads).toFixed(0)}</TableCell>
                          <TableCell>
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Type Analysis</CardTitle>
                <CardDescription>Margin performance by equipment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Dry Van</h4>
                    <p className="text-2xl font-bold text-blue-600">27.5%</p>
                    <p className="text-sm text-muted-foreground">Avg Margin</p>
                    <p className="text-sm">37 loads this month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Reefer</h4>
                    <p className="text-2xl font-bold text-green-600">29.2%</p>
                    <p className="text-sm text-muted-foreground">Avg Margin</p>
                    <p className="text-sm">8 loads this month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Flatbed</h4>
                    <p className="text-2xl font-bold text-purple-600">30.0%</p>
                    <p className="text-sm text-muted-foreground">Avg Margin</p>
                    <p className="text-sm">6 loads this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default MarginAnalysis;