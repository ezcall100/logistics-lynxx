import React, { useState } from 'react';
import { 
  TrendingUp, BarChart3, PieChart, Activity, Target, DollarSign,
  Users, Truck, Building2, MapPin, Calendar, Download, Filter,
  ArrowUp, ArrowDown, Minus, Globe, Package, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NetworkAnalytics = () => {
  const [timeRange, setTimeRange] = useState('last_30_days');
  const [metric, setMetric] = useState('revenue');

  const networkMetrics = {
    totalRevenue: 2850000,
    revenueGrowth: 15.2,
    totalEntities: 917,
    entitiesGrowth: 8.7,
    avgPerformance: 87.5,
    performanceChange: 2.1,
    networkEfficiency: 92.3,
    efficiencyChange: -0.8
  };

  const entityBreakdown = [
    { name: 'Customers', count: 248, revenue: 1650000, growth: 12.5, color: 'bg-blue-500' },
    { name: 'Carriers', count: 156, revenue: 850000, growth: 18.2, color: 'bg-green-500' },
    { name: 'Vendors', count: 89, revenue: 250000, growth: 6.8, color: 'bg-purple-500' },
    { name: 'Partners', count: 67, revenue: 100000, growth: 25.1, color: 'bg-orange-500' },
  ];

  const performanceMetrics = [
    { category: 'Customer Satisfaction', score: 4.8, target: 4.5, trend: 'up' },
    { category: 'Carrier On-Time Rate', score: 94.2, target: 95.0, trend: 'down' },
    { category: 'Vendor Compliance', score: 98.1, target: 97.0, trend: 'up' },
    { category: 'Network Utilization', score: 87.5, target: 85.0, trend: 'up' },
  ];

  const topPerformers = [
    { name: 'Global Logistics Inc.', type: 'Customer', score: 98.5, revenue: 450000 },
    { name: 'Swift Transport LLC', type: 'Carrier', score: 97.2, revenue: 280000 },
    { name: 'TechLogistics Co.', type: 'Vendor', score: 96.8, revenue: 75000 },
    { name: 'Strategic Alliance Partners', type: 'Partner', score: 95.9, revenue: 120000 },
  ];

  const getTrendIcon = (trend: string, value?: number) => {
    if (trend === 'up' || (value && value > 0)) {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'down' || (value && value < 0)) {
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Customer': return <Users className="w-4 h-4" />;
      case 'Carrier': return <Truck className="w-4 h-4" />;
      case 'Vendor': return <Building2 className="w-4 h-4" />;
      case 'Partner': return <Star className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Network Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into network performance and growth
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${networkMetrics.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon('up', networkMetrics.revenueGrowth)}
              <span className="text-green-600">+{networkMetrics.revenueGrowth}%</span>
              <span>from last period</span>
            </div>
            <Progress value={networkMetrics.revenueGrowth * 4} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Entities</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics.totalEntities}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon('up', networkMetrics.entitiesGrowth)}
              <span className="text-blue-600">+{networkMetrics.entitiesGrowth}%</span>
              <span>network growth</span>
            </div>
            <Progress value={networkMetrics.entitiesGrowth * 8} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics.avgPerformance}%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon('up', networkMetrics.performanceChange)}
              <span className="text-purple-600">+{networkMetrics.performanceChange}%</span>
              <span>performance boost</span>
            </div>
            <Progress value={networkMetrics.avgPerformance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkMetrics.networkEfficiency}%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon('down', networkMetrics.efficiencyChange)}
              <span className="text-red-600">{networkMetrics.efficiencyChange}%</span>
              <span>slight decrease</span>
            </div>
            <Progress value={networkMetrics.networkEfficiency} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entities">Entity Breakdown</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="entities" className="space-y-6">
          {/* Entity Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Network Entity Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {entityBreakdown.map((entity) => (
                  <div key={entity.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{entity.name}</span>
                      <Badge variant="outline" className={`${entity.color.replace('bg-', 'text-')} border-current`}>
                        {entity.count}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">
                        ${entity.revenue.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon('up', entity.growth)}
                        <span className="text-green-600">+{entity.growth}%</span>
                        <span className="text-muted-foreground">growth</span>
                      </div>
                      <Progress value={entity.growth * 3} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{metric.category}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={metric.score} className="h-2" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{metric.score}%</div>
                          <div className="text-xs text-muted-foreground">
                            Target: {metric.target}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Performing Network Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{performer.name}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {getEntityIcon(performer.type)}
                          <span>{performer.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{performer.score}% Score</div>
                      <div className="text-sm text-muted-foreground">
                        ${performer.revenue.toLocaleString()} Revenue
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Trends Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Network Growth Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trends Chart Coming Soon</h3>
                <p className="text-muted-foreground">
                  Interactive charts showing network growth patterns, seasonal trends, and predictive analytics will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkAnalytics;