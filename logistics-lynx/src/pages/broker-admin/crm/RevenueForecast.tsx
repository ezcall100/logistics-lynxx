import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  LineChart as LineChartIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  Gauge
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const RevenueForecast: React.FC = () => {
  const [forecastPeriod, setForecastPeriod] = useState('12m');
  const [confidenceLevel, setConfidenceLevel] = useState('95');

  // Current performance metrics
  const currentMetrics = [
    {
      title: "Current Month Revenue",
      value: "$1.2M",
      change: "+15.3%",
      trend: "up",
      target: "$1.1M",
      icon: DollarSign
    },
    {
      title: "Forecasted Next Month",
      value: "$1.35M",
      change: "+12.5%",
      trend: "up",
      confidence: "87%",
      icon: Target
    },
    {
      title: "Quarter Projection",
      value: "$3.8M",
      change: "+18.7%",
      trend: "up",
      variance: "±5%",
      icon: BarChart3
    },
    {
      title: "Annual Forecast",
      value: "$14.2M",
      change: "+22.4%",
      trend: "up",
      accuracy: "92%",
      icon: LineChartIcon
    }
  ];

  // Revenue forecast data
  const forecastData = [
    { period: 'Jan 2024', actual: 950000, forecast: 950000, upper: 950000, lower: 950000, historical: 850000 },
    { period: 'Feb 2024', actual: 1080000, forecast: 1080000, upper: 1080000, lower: 1080000, historical: 920000 },
    { period: 'Mar 2024', actual: 1200000, forecast: 1200000, upper: 1200000, lower: 1200000, historical: 980000 },
    { period: 'Apr 2024', actual: null, forecast: 1350000, upper: 1485000, lower: 1215000, historical: 1100000 },
    { period: 'May 2024', actual: null, forecast: 1420000, upper: 1562000, lower: 1278000, historical: 1180000 },
    { period: 'Jun 2024', actual: null, forecast: 1480000, upper: 1628000, lower: 1332000, historical: 1250000 },
    { period: 'Jul 2024', actual: null, forecast: 1520000, upper: 1672000, lower: 1368000, historical: 1300000 },
    { period: 'Aug 2024', actual: null, forecast: 1580000, upper: 1738000, lower: 1422000, historical: 1380000 },
    { period: 'Sep 2024', actual: null, forecast: 1640000, upper: 1804000, lower: 1476000, historical: 1450000 },
    { period: 'Oct 2024', actual: null, forecast: 1700000, upper: 1870000, lower: 1530000, historical: 1520000 },
    { period: 'Nov 2024', actual: null, forecast: 1750000, upper: 1925000, lower: 1575000, historical: 1580000 },
    { period: 'Dec 2024', actual: null, forecast: 1820000, upper: 2002000, lower: 1638000, historical: 1650000 }
  ];

  // Pipeline contribution analysis
  const pipelineContribution = [
    { stage: 'Closed Won', amount: 1200000, probability: 100, contribution: 1200000 },
    { stage: 'Negotiation', amount: 650000, probability: 85, contribution: 552500 },
    { stage: 'Proposal', amount: 890000, probability: 65, contribution: 578500 },
    { stage: 'Qualified', amount: 720000, probability: 45, contribution: 324000 },
    { stage: 'Prospecting', amount: 580000, probability: 25, contribution: 145000 }
  ];

  // Scenario analysis
  const scenarios = [
    {
      name: "Optimistic",
      probability: "20%",
      revenue: "$16.8M",
      growth: "+31.2%",
      factors: ["Market expansion", "New partnerships", "Economic upturn"],
      color: "text-green-600 bg-green-50"
    },
    {
      name: "Most Likely",
      probability: "60%",
      revenue: "$14.2M",
      growth: "+22.4%",
      factors: ["Steady growth", "Current trends", "Normal market conditions"],
      color: "text-blue-600 bg-blue-50"
    },
    {
      name: "Conservative",
      probability: "20%",
      revenue: "$11.8M",
      growth: "+8.7%",
      factors: ["Market challenges", "Increased competition", "Economic headwinds"],
      color: "text-orange-600 bg-orange-50"
    }
  ];

  // Key assumptions
  const keyAssumptions = [
    {
      assumption: "Market Growth Rate",
      value: "6.5%",
      impact: "High",
      confidence: "85%",
      lastUpdated: "2 days ago"
    },
    {
      assumption: "Customer Retention",
      value: "92%",
      impact: "High",
      confidence: "90%",
      lastUpdated: "1 week ago"
    },
    {
      assumption: "Average Deal Size",
      value: "$85,000",
      impact: "Medium",
      confidence: "88%",
      lastUpdated: "3 days ago"
    },
    {
      assumption: "Sales Cycle Length",
      value: "32 days",
      impact: "Medium",
      confidence: "92%",
      lastUpdated: "1 day ago"
    }
  ];

  // Forecast accuracy metrics
  const accuracyMetrics = [
    { metric: "Overall Accuracy", value: "89.2%", trend: "+2.1%", icon: Target },
    { metric: "30-Day Accuracy", value: "94.5%", trend: "+1.8%", icon: Calendar },
    { metric: "90-Day Accuracy", value: "86.7%", trend: "+3.2%", icon: Clock },
    { metric: "Model Confidence", value: "92.1%", trend: "+0.5%", icon: Brain }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Forecast</h1>
          <p className="text-muted-foreground">
            AI-powered predictive analytics and revenue projections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="12m">12 months</SelectItem>
              <SelectItem value="18m">18 months</SelectItem>
              <SelectItem value="24m">24 months</SelectItem>
            </SelectContent>
          </Select>
          <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80">80% Confidence</SelectItem>
              <SelectItem value="90">90% Confidence</SelectItem>
              <SelectItem value="95">95% Confidence</SelectItem>
              <SelectItem value="99">99% Confidence</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>
                {metric.confidence && (
                  <span className="ml-2 text-blue-600">
                    {metric.confidence} confidence
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            Revenue Forecast with Confidence Intervals
          </CardTitle>
          <CardDescription>
            Projected revenue with upper and lower bounds based on {confidenceLevel}% confidence level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value, name) => [
                  `$${(Number(value) / 1000000).toFixed(2)}M`, 
                  String(name).charAt(0).toUpperCase() + String(name).slice(1)
                ]} 
              />
              <ReferenceLine x="Mar 2024" stroke="#ef4444" strokeDasharray="2 2" label="Current" />
              
              {/* Confidence band */}
              <Area
                dataKey="upper"
                stroke="none"
                fill="#3B82F6"
                fillOpacity={0.1}
                name="Upper Bound"
              />
              <Area
                dataKey="lower"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
                name="Lower Bound"
              />
              
              {/* Historical data */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Historical"
                dot={false}
              />
              
              {/* Actual data */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={3}
                name="Actual"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
              
              {/* Forecast data */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Forecast"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs for detailed analysis */}
      <Tabs defaultValue="scenarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Impact</TabsTrigger>
          <TabsTrigger value="assumptions">Key Assumptions</TabsTrigger>
          <TabsTrigger value="accuracy">Forecast Accuracy</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <Card key={index} className={scenario.color}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {scenario.name}
                    <Badge variant="secondary">{scenario.probability}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold">{scenario.revenue}</p>
                    <p className="text-sm font-medium">{scenario.growth} growth</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Key Factors:</p>
                    <ul className="text-sm space-y-1">
                      {scenario.factors.map((factor, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-current rounded-full" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Contribution to Forecast</CardTitle>
              <CardDescription>
                Revenue contribution by pipeline stage with probability weighting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineContribution.map((stage, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{stage.stage}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {stage.probability}% probability
                        </span>
                        <span className="font-bold">
                          ${(stage.contribution / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>Pipeline Value: ${(stage.amount / 1000).toFixed(0)}K</span>
                      <span>→</span>
                      <span>Expected: ${(stage.contribution / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress value={stage.probability} className="h-2" />
                  </div>
                ))}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Weighted Pipeline</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${(pipelineContribution.reduce((sum, stage) => sum + stage.contribution, 0) / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assumptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Assumptions</CardTitle>
              <CardDescription>
                Key assumptions driving the revenue forecast model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyAssumptions.map((assumption, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{assumption.assumption}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getImpactColor(assumption.impact)} variant="outline">
                          {assumption.impact} Impact
                        </Badge>
                        <span className="text-lg font-bold">{assumption.value}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Confidence: {assumption.confidence}</span>
                      <span>Last updated: {assumption.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {accuracyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.metric}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-600">{metric.trend}</span>
                    <span className="ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>
                Historical accuracy of revenue forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Forecast vs Actual (Last 6 months)</span>
                    <span className="text-sm text-green-600 font-medium">+3.2% accuracy improvement</span>
                  </div>
                  <Progress value={89} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    Model accuracy has improved by 3.2% over the last 6 months through continuous learning
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence Calibration</span>
                    <span className="text-sm text-blue-600 font-medium">Well calibrated</span>
                  </div>
                  <Progress value={92} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    95% of actual results fall within predicted confidence intervals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueForecast;