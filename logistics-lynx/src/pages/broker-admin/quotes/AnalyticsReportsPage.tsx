/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  BarChart, 
  LineChart, 
  PieChart,
  TrendingUp, 
  TrendingDown,
  Target, 
  DollarSign, 
  Users, 
  Clock,
  Download,
  Filter,
  Calendar,
  Gauge,
  Award,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  FileText,
  Share,
  Plus
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const AnalyticsReportsPage = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [dateRange, setDateRange] = useState('30d');

  // Mock analytics data
  const performanceData = {
    totalQuotes: 1247,
    wonQuotes: 834,
    winRate: 67,
    totalRevenue: 2847500,
    avgMargin: 19.5,
    avgResponseTime: 8,
    topSalesperson: 'Sarah Johnson',
    topCustomer: 'ABC Logistics'
  };

  const winRateData = [
    { month: 'Jan', rate: 65, quotes: 120 },
    { month: 'Feb', rate: 68, quotes: 135 },
    { month: 'Mar', rate: 72, quotes: 148 },
    { month: 'Apr', rate: 69, quotes: 156 },
    { month: 'May', rate: 71, quotes: 162 },
    { month: 'Jun', rate: 74, quotes: 171 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 425000, margin: 18.2 },
    { month: 'Feb', revenue: 478000, margin: 19.1 },
    { month: 'Mar', revenue: 523000, margin: 20.5 },
    { month: 'Apr', revenue: 487000, margin: 19.8 },
    { month: 'May', revenue: 534000, margin: 20.2 },
    { month: 'Jun', revenue: 589000, margin: 21.1 }
  ];

  const marginAnalysis = [
    { category: 'Dry Van', avgMargin: 18.5, volume: 45, revenue: 1250000 },
    { category: 'Flatbed', avgMargin: 22.3, volume: 28, revenue: 890000 },
    { category: 'Refrigerated', avgMargin: 16.8, volume: 32, revenue: 1150000 },
    { category: 'Step Deck', avgMargin: 25.1, volume: 15, revenue: 450000 },
    { category: 'LTL', avgMargin: 12.4, volume: 65, revenue: 680000 }
  ];

  const responseMetrics = [
    { timeRange: '0-15 min', count: 567, percentage: 45.5 },
    { timeRange: '15-30 min', count: 423, percentage: 33.9 },
    { timeRange: '30-60 min', count: 187, percentage: 15.0 },
    { timeRange: '1-2 hours', count: 51, percentage: 4.1 },
    { timeRange: '2+ hours', count: 19, percentage: 1.5 }
  ];

  const customReports = [
    {
      id: 1,
      name: 'Monthly Performance Summary',
      description: 'Complete overview of quote performance metrics',
      lastRun: '2024-01-18',
      frequency: 'Monthly',
      type: 'Automated'
    },
    {
      id: 2,
      name: 'Win Rate by Customer',
      description: 'Analysis of quote success rates per customer',
      lastRun: '2024-01-17',
      frequency: 'Weekly',
      type: 'Automated'
    },
    {
      id: 3,
      name: 'Margin Analysis Report',
      description: 'Detailed breakdown of profit margins by equipment type',
      lastRun: '2024-01-16',
      frequency: 'Bi-weekly',
      type: 'Custom'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your quote performance and business metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Share className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="win-rate" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Win Rate
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="margins" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Margins
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Performance Dashboard */}
        <TabsContent value="performance" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.totalQuotes.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.winRate}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  +3.2% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(performanceData.totalRevenue / 1000000).toFixed(1)}M</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  +8.1% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.avgResponseTime}m</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                  -2.1m from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Quote Volume Trend
                </CardTitle>
                <CardDescription>Monthly quote generation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                  <p className="text-muted-foreground">Quote Volume Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Key performance indicators overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Margin</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold">{performanceData.avgMargin}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Quote Accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-5/6 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold">94%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-11/12 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold">4.8/5</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Top Salesperson</p>
                        <p className="font-medium">{performanceData.topSalesperson}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Top Customer</p>
                        <p className="font-medium">{performanceData.topCustomer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Win Rate Analysis */}
        <TabsContent value="win-rate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Win Rate Trend
                </CardTitle>
                <CardDescription>Quote success rate over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                  <p className="text-muted-foreground">Win Rate Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Win Rate by Category
                </CardTitle>
                <CardDescription>Success rates across different quote categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marginAnalysis.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${Math.min(category.avgMargin * 3, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold w-12 text-right">{category.avgMargin}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Performing Quotes
              </CardTitle>
              <CardDescription>Highest converting quotes this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {winRateData.slice(0, 3).map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">Category {data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.quotes} quotes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{data.rate}%</p>
                      <p className="text-sm text-muted-foreground">win rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Analysis */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Forecast
                </CardTitle>
                <CardDescription>Projected revenue based on current pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                  <p className="text-muted-foreground">Revenue Forecast Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Won Quotes</span>
                      <span className="font-medium">$2.1M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pipeline</span>
                      <span className="font-medium">$847K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Projected</span>
                      <span className="font-medium">$1.2M</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total Forecast</span>
                      <span>$4.1M</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Monthly Growth</h4>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">+23.5% vs last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Equipment Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marginAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">${(item.revenue / 1000).toFixed(0)}K</span>
                        <Badge variant="outline">{item.volume}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">$2.85M</p>
                    <p className="text-sm text-muted-foreground">YTD Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">$427K</p>
                    <p className="text-sm text-muted-foreground">Avg Monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">19.5%</p>
                    <p className="text-sm text-muted-foreground">Avg Margin</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">$3,420</p>
                    <p className="text-sm text-muted-foreground">Avg Quote</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Margin Analysis */}
        <TabsContent value="margins" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Margin Distribution
                </CardTitle>
                <CardDescription>Profit margins across equipment types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                  <p className="text-muted-foreground">Margin Distribution Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Margin Performance
                </CardTitle>
                <CardDescription>Detailed margin analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marginAnalysis.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <Badge variant="outline" className={item.avgMargin > 20 ? 'text-green-600' : 'text-yellow-600'}>
                          {item.avgMargin}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span>Volume: {item.volume}%</span>
                        <span>Revenue: ${(item.revenue / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Margin Optimization Opportunities
              </CardTitle>
              <CardDescription>Areas where margins can be improved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">High Opportunity</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    Refrigerated transport margins are 3.2% below industry average
                  </p>
                  <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                    Optimize Pricing
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Medium Opportunity</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    LTL quotes show potential for 2-3% margin improvement
                  </p>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                    Review Rates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Custom Reports
              </CardTitle>
              <CardDescription>
                Generate and schedule custom analytics reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{report.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.type === 'Automated' ? 'default' : 'secondary'}>
                          {report.type}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Last run: {report.lastRun}
                      </span>
                      <span className="text-muted-foreground">
                        Frequency: {report.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Time Analytics
              </CardTitle>
              <CardDescription>Quote response time distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {responseMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.timeRange}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${metric.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{metric.count}</span>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {metric.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReportsPage;