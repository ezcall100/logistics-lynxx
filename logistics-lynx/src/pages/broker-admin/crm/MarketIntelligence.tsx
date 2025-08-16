/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Globe,
  BarChart3,
  PieChart,
  Target,
  MapPin,
  Truck,
  Building2,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  Info
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const MarketIntelligence: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeframe, setTimeframe] = useState('30d');

  // Market overview data
  const marketOverview = [
    {
      metric: "Total Market Size",
      value: "$847B",
      change: "+5.2%",
      trend: "up",
      description: "Annual freight market value"
    },
    {
      metric: "Your Market Share",
      value: "0.08%",
      change: "+0.02%",
      trend: "up",
      description: "Of total market"
    },
    {
      metric: "Addressable Market",
      value: "$12.4B",
      change: "+8.1%",
      trend: "up",
      description: "Your serviceable market"
    },
    {
      metric: "Growth Rate",
      value: "6.8%",
      change: "+1.2%",
      trend: "up",
      description: "YoY market growth"
    }
  ];

  // Competitor analysis data
  const competitors = [
    {
      name: "FreightTech Corp",
      marketShare: 12.5,
      revenue: "$1.2B",
      growth: 8.3,
      strengths: ["Technology", "Coverage"],
      weaknesses: ["Price", "Service"],
      threat: "High"
    },
    {
      name: "LogiMaster Inc",
      marketShare: 9.8,
      revenue: "$950M",
      growth: 5.2,
      strengths: ["Price", "Reliability"],
      weaknesses: ["Technology", "Scale"],
      threat: "Medium"
    },
    {
      name: "ShipGlobal LLC",
      marketShare: 7.2,
      revenue: "$680M",
      growth: 12.1,
      strengths: ["Innovation", "Customer Service"],
      weaknesses: ["Coverage", "Price"],
      threat: "High"
    },
    {
      name: "CargoConnect",
      marketShare: 6.1,
      revenue: "$580M",
      growth: 3.8,
      strengths: ["Relationships", "Experience"],
      weaknesses: ["Technology", "Growth"],
      threat: "Low"
    }
  ];

  // Market trends data
  const marketTrends = [
    { month: 'Jan', rates: 2.45, volume: 95, demand: 88 },
    { month: 'Feb', rates: 2.52, volume: 98, demand: 92 },
    { month: 'Mar', rates: 2.48, volume: 102, demand: 95 },
    { month: 'Apr', rates: 2.65, volume: 105, demand: 98 },
    { month: 'May', rates: 2.71, volume: 108, demand: 102 },
    { month: 'Jun', rates: 2.68, volume: 110, demand: 105 },
    { month: 'Jul', rates: 2.74, volume: 112, demand: 108 }
  ];

  // Regional analysis data
  const regionalData = [
    { region: 'Northeast', share: 28, growth: 5.2, avgRate: 2.85 },
    { region: 'Southeast', share: 24, growth: 7.8, avgRate: 2.45 },
    { region: 'Midwest', share: 22, growth: 4.1, avgRate: 2.38 },
    { region: 'West', share: 18, growth: 9.5, avgRate: 3.12 },
    { region: 'Southwest', share: 8, growth: 6.3, avgRate: 2.67 }
  ];

  // Lane analysis data
  const topLanes = [
    {
      lane: "Los Angeles, CA → Chicago, IL",
      volume: 1250,
      avgRate: "$3,200",
      competition: "High",
      growth: "+8.5%",
      opportunity: "Medium"
    },
    {
      lane: "Atlanta, GA → New York, NY",
      volume: 980,
      avgRate: "$2,800",
      competition: "Medium",
      growth: "+12.3%",
      opportunity: "High"
    },
    {
      lane: "Houston, TX → Miami, FL",
      volume: 850,
      avgRate: "$2,950",
      competition: "Low",
      growth: "+15.7%",
      opportunity: "High"
    },
    {
      lane: "Seattle, WA → Denver, CO",
      volume: 720,
      avgRate: "$2,650",
      competition: "High",
      growth: "+5.2%",
      opportunity: "Low"
    }
  ];

  // Industry insights
  const industryInsights = [
    {
      title: "E-commerce Growth",
      impact: "High",
      description: "Last-mile delivery demand increasing by 23% annually",
      recommendation: "Expand urban delivery capabilities"
    },
    {
      title: "Fuel Price Volatility",
      impact: "Medium",
      description: "Diesel prices fluctuating 15-20% affecting margins",
      recommendation: "Implement dynamic fuel surcharge pricing"
    },
    {
      title: "Driver Shortage",
      impact: "High",
      description: "Industry-wide shortage affecting capacity and rates",
      recommendation: "Focus on owner-operator partnerships"
    },
    {
      title: "Technology Adoption",
      impact: "Medium",
      description: "IoT and AI transforming logistics operations",
      recommendation: "Invest in predictive analytics and automation"
    }
  ];

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
          <p className="text-muted-foreground">
            Comprehensive market analysis and competitive insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketOverview.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.metric}
              </CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>
                <span className="ml-1">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="lanes">Lane Analysis</TabsTrigger>
          <TabsTrigger value="insights">Industry Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Market Trends Analysis</CardTitle>
                <CardDescription>
                  Rates, volume, and demand trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="rates"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Avg Rates ($/mile)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Volume Index"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="demand"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      name="Demand Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <div className="grid gap-4">
            {competitors.map((competitor, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {competitor.name}
                    </CardTitle>
                    <Badge className={getThreatColor(competitor.threat)} variant="outline">
                      {competitor.threat} Threat
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Market Share</p>
                      <p className="text-xl font-bold">{competitor.marketShare}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-xl font-bold">{competitor.revenue}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className="text-xl font-bold text-green-600">+{competitor.growth}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Strengths</p>
                      <div className="flex gap-1">
                        {competitor.strengths.map((strength, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Weaknesses</p>
                      <div className="flex gap-1">
                        {competitor.weaknesses.map((weakness, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Market Share Progress</p>
                      <Progress value={competitor.marketShare} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Market Analysis</CardTitle>
              <CardDescription>
                Market share and growth by geographic region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {regionalData.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{region.region}</h4>
                        <Badge variant="secondary">{region.share}% share</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Growth Rate</p>
                          <p className="font-medium text-green-600">+{region.growth}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Rate</p>
                          <p className="font-medium">${region.avgRate}/mile</p>
                        </div>
                      </div>
                      <Progress value={region.share * 2} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={regionalData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="share"
                        nameKey="region"
                        label={({ region, share }) => `${region}: ${share}%`}
                      >
                        {regionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 60%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lanes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Freight Lanes Analysis</CardTitle>
              <CardDescription>
                High-volume lanes with growth potential and competition analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLanes.map((lane, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold">{lane.lane}</h4>
                      </div>
                      <Badge className={getOpportunityColor(lane.opportunity)} variant="outline">
                        {lane.opportunity} Opportunity
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Volume</p>
                        <p className="font-medium">{lane.volume.toLocaleString()} loads/month</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Rate</p>
                        <p className="font-medium">{lane.avgRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Competition</p>
                        <p className="font-medium">{lane.competition}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Growth</p>
                        <p className="font-medium text-green-600">{lane.growth}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Market Size</p>
                        <Progress value={Math.random() * 100} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {industryInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      {insight.title}
                    </CardTitle>
                    <Badge variant="outline" className={getImpactColor(insight.impact)}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">
                      💡 Recommendation: {insight.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketIntelligence;