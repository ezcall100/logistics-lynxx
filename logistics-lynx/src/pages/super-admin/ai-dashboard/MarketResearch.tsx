/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Search, 
  Brain, 
  Globe,
  Users,
  DollarSign,
  Target,
  Eye,
  RefreshCw,
  Download,
  Building2
} from 'lucide-react';

const MarketResearch = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  const researchMetrics = [
    { label: 'Market Intelligence Reports', value: '156', trend: 'up', change: '+12%' },
    { label: 'Competitor Analysis', value: '43', trend: 'up', change: '+8%' },
    { label: 'Demand Forecasts', value: '28', trend: 'down', change: '-3%' },
    { label: 'Research Agents Active', value: '50', trend: 'stable', change: '0%' },
  ];

  const recentInsights = [
    {
      id: 1,
      type: 'pricing_trends',
      title: 'Freight Rates Increase in Q4',
      summary: 'Analysis shows 15% increase in freight rates across major lanes due to capacity constraints.',
      confidence: 92,
      source: 'DAT Load Board Data',
      date: '2024-01-20',
    },
    {
      id: 2,
      type: 'technology_analysis',
      title: 'ELD Adoption Reaches 98%',
      summary: 'Electronic Logging Device adoption has reached near-universal compliance in the trucking industry.',
      confidence: 88,
      source: 'FMCSA Reports',
      date: '2024-01-19',
    },
    {
      id: 3,
      type: 'competitor_features',
      title: 'Competitor TMS Features Analysis',
      summary: 'New AI-powered route optimization features being implemented by top 3 competitors.',
      confidence: 85,
      source: 'Product Research',
      date: '2024-01-18',
    },
  ];

  const marketSegments = [
    { name: 'FTL (Full Truckload)', share: 38.5, growth: '+3.2%', value: '$125.8B', forecast: 'stable' },
    { name: 'LTL (Less Than Truckload)', share: 28.3, growth: '+5.8%', value: '$92.4B', forecast: 'growing' },
    { name: 'Drayage', share: 12.7, growth: '+8.9%', value: '$41.5B', forecast: 'strong' },
    { name: 'Intermodal', share: 9.2, growth: '+7.4%', value: '$30.1B', forecast: 'strong' },
    { name: 'Last Mile', share: 4.8, growth: '+15.2%', value: '$15.7B', forecast: 'explosive' },
    { name: 'Air Freight', share: 3.1, growth: '+2.1%', value: '$10.1B', forecast: 'moderate' },
    { name: 'Auto Transport', share: 2.2, growth: '+6.3%', value: '$7.2B', forecast: 'growing' },
    { name: 'Specialized Transport', share: 1.2, growth: '+4.7%', value: '$3.9B', forecast: 'stable' }
  ];

  const competitorData = [
    { name: 'Competitor A', marketShare: 25, rating: 4.2, features: 45 },
    { name: 'Competitor B', marketShare: 18, rating: 3.8, features: 38 },
    { name: 'Competitor C', marketShare: 15, rating: 4.0, features: 42 },
    { name: 'Competitor D', marketShare: 12, rating: 3.5, features: 35 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-green-100 text-green-800">High Confidence</Badge>;
    if (confidence >= 75) return <Badge className="bg-yellow-100 text-yellow-800">Medium Confidence</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low Confidence</Badge>;
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Research</h1>
          <p className="text-muted-foreground">
            AI-powered market intelligence and competitive analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline" 
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Research Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {researchMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              {getTrendIcon(metric.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="forecasts">Market Forecasts</TabsTrigger>
          <TabsTrigger value="agents">Research Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Market Insights</CardTitle>
                <CardDescription>Latest intelligence gathered by research agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInsights.map((insight) => (
                    <div key={insight.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        {getConfidenceBadge(insight.confidence)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Source: {insight.source}</span>
                        <span>{insight.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Segments</CardTitle>
                <CardDescription>Growth trends by transportation segment - Comprehensive analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketSegments.map((segment, index) => {
                    const getForecastColor = (forecast: string) => {
                      switch (forecast) {
                        case 'explosive': return 'text-green-600 bg-green-50';
                        case 'strong': return 'text-blue-600 bg-blue-50';
                        case 'growing': return 'text-purple-600 bg-purple-50';
                        case 'moderate': return 'text-orange-600 bg-orange-50';
                        default: return 'text-gray-600 bg-gray-50';
                      }
                    };

                    const getTrendIcon = (growth: string) => {
                      const value = parseFloat(growth.replace('%', '').replace('+', ''));
                      if (value >= 10) return <TrendingUp className="h-4 w-4 text-green-500" />;
                      if (value >= 5) return <TrendingUp className="h-4 w-4 text-blue-500" />;
                      if (value >= 0) return <TrendingUp className="h-4 w-4 text-gray-500" />;
                      return <TrendingDown className="h-4 w-4 text-red-500" />;
                    };

                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm">{segment.name}</p>
                            <Badge className={`text-xs px-2 py-0.5 ${getForecastColor(segment.forecast)}`}>
                              {segment.forecast}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <span>{segment.share}% market share</span>
                            <span>{segment.value} market value</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-sm font-bold text-green-600">{segment.growth}</span>
                            <p className="text-xs text-muted-foreground">YoY Growth</p>
                          </div>
                          {getTrendIcon(segment.growth)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Summary insights */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Insights</h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Last Mile delivery showing explosive growth (+15.2%) driven by e-commerce</li>
                    <li>• Drayage segment benefiting from port congestion and inland transportation needs</li>
                    <li>• Traditional FTL remains largest but growth slowing due to market maturation</li>
                    <li>• Auto Transport recovering with strong demand in consumer vehicle shipping</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Landscape</CardTitle>
              <CardDescription>Analysis of key competitors in the TMS market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorData.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{competitor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {competitor.marketShare}% market share
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Rating: {competitor.rating}/5.0</p>
                        <p className="text-xs text-muted-foreground">{competitor.features} features</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Forecasts</CardTitle>
              <CardDescription>Predictive analytics and market predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Demand Forecast</h4>
                  </div>
                  <p className="text-2xl font-bold mb-1">+18%</p>
                  <p className="text-sm text-muted-foreground">Expected growth in Q2 2024</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Pricing Trends</h4>
                  </div>
                  <p className="text-2xl font-bold mb-1">+8.5%</p>
                  <p className="text-sm text-muted-foreground">Average rate increase expected</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <h4 className="font-medium">Capacity</h4>
                  </div>
                  <p className="text-2xl font-bold mb-1">-5%</p>
                  <p className="text-sm text-muted-foreground">Capacity tightening forecast</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-5 w-5 text-orange-500" />
                    <h4 className="font-medium">Market Size</h4>
                  </div>
                  <p className="text-2xl font-bold mb-1">$15.2B</p>
                  <p className="text-sm text-muted-foreground">Projected 2024 TMS market</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Agents</CardTitle>
              <CardDescription>AI agents conducting market research and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Market Intelligence Agent', type: 'market_intelligence', status: 'active', reports: 12 },
                  { name: 'Competitive Analysis Agent', type: 'competitive_analysis', status: 'researching', reports: 8 },
                  { name: 'Demand Forecasting Agent', type: 'demand_forecasting', status: 'analyzing', reports: 6 },
                  { name: 'Technology Trends Agent', type: 'technology_analysis', status: 'active', reports: 15 },
                  { name: 'Pricing Analytics Agent', type: 'pricing_trends', status: 'reporting', reports: 10 },
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{agent.reports} reports</p>
                        <p className="text-xs text-muted-foreground">this month</p>
                      </div>
                      <Badge variant="outline" className="capitalize">{agent.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default MarketResearch;