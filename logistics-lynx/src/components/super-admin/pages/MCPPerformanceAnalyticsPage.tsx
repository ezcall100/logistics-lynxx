import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, TrendingDown, Activity, Cpu, Memory, HardDrive, 
  Wifi, Clock, Zap, Target, BarChart3, LineChart, PieChart,
  AlertTriangle, CheckCircle, XCircle, RefreshCw, Settings,
  Download, Upload, Database, Server, Globe, Users
} from 'lucide-react';

// Mock performance data
const mockPerformanceData = {
  overview: {
    score: 92.5,
    status: 'excellent',
    trend: 'up',
    lastUpdate: '2 minutes ago'
  },
  metrics: {
    responseTime: {
      current: 45,
      average: 52,
      trend: 'down',
      target: 50
    },
    throughput: {
      current: 2400,
      average: 2200,
      trend: 'up',
      target: 2000
    },
    errorRate: {
      current: 0.02,
      average: 0.05,
      trend: 'down',
      target: 0.1
    },
    availability: {
      current: 99.9,
      average: 99.8,
      trend: 'up',
      target: 99.5
    }
  },
  trends: {
    hourly: [85, 87, 89, 91, 88, 92, 94, 93, 95, 92, 90, 88],
    daily: [89, 91, 88, 93, 95, 92, 90, 94, 96, 93, 91, 89],
    weekly: [87, 89, 92, 94, 96, 93, 91]
  },
  bottlenecks: [
    {
      id: 1,
      type: 'database',
      severity: 'medium',
      description: 'Slow query execution on user table',
      impact: '15% performance degradation',
      recommendation: 'Optimize database indexes'
    },
    {
      id: 2,
      type: 'network',
      severity: 'low',
      description: 'High latency on external API calls',
      impact: '5% response time increase',
      recommendation: 'Implement connection pooling'
    }
  ],
  recommendations: [
    {
      id: 1,
      priority: 'high',
      title: 'Database Optimization',
      description: 'Implement query caching to reduce database load',
      impact: '20% performance improvement',
      effort: 'medium'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'CDN Implementation',
      description: 'Deploy content delivery network for static assets',
      impact: '15% faster loading times',
      effort: 'low'
    }
  ]
};

const MCPPerformanceAnalyticsPage = () => {
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [timeRange, setTimeRange] = useState('24h');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Performance Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive performance monitoring and optimization insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{performanceData.overview.score}</p>
                <p className="text-sm font-medium text-muted-foreground">Performance Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{performanceData.metrics.responseTime.current}ms</p>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{performanceData.metrics.throughput.current}</p>
                <p className="text-sm font-medium text-muted-foreground">Req/s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{performanceData.metrics.availability.current}%</p>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{performanceData.metrics.responseTime.current}ms</span>
                      {getTrendIcon(performanceData.metrics.responseTime.trend)}
                    </div>
                  </div>
                  <Progress 
                    value={(performanceData.metrics.responseTime.current / performanceData.metrics.responseTime.target) * 100} 
                    className="h-3" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Throughput</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{performanceData.metrics.throughput.current}</span>
                      {getTrendIcon(performanceData.metrics.throughput.trend)}
                    </div>
                  </div>
                  <Progress 
                    value={(performanceData.metrics.throughput.current / performanceData.metrics.throughput.target) * 100} 
                    className="h-3" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{performanceData.metrics.errorRate.current}%</span>
                      {getTrendIcon(performanceData.metrics.errorRate.trend)}
                    </div>
                  </div>
                  <Progress 
                    value={(performanceData.metrics.errorRate.current / performanceData.metrics.errorRate.target) * 100} 
                    className="h-3" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system performance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4" />
                      <span className="text-sm">CPU Usage</span>
                    </div>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Memory className="w-4 h-4" />
                      <span className="text-sm">Memory Usage</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4" />
                      <span className="text-sm">Storage Usage</span>
                    </div>
                    <span className="font-medium">32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4" />
                      <span className="text-sm">Network Usage</span>
                    </div>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
                <CardDescription>Detailed response time metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{performanceData.metrics.responseTime.current}ms</div>
                    <div className="text-sm text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{performanceData.metrics.responseTime.average}ms</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Target</span>
                    <span className="font-medium">{performanceData.metrics.responseTime.target}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trend</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(performanceData.metrics.responseTime.trend)}
                      <span className="text-sm">Improving</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Throughput Analysis</CardTitle>
                <CardDescription>Request throughput metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{performanceData.metrics.throughput.current}</div>
                    <div className="text-sm text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{performanceData.metrics.throughput.average}</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Target</span>
                    <span className="font-medium">{performanceData.metrics.throughput.target}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trend</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(performanceData.metrics.throughput.trend)}
                      <span className="text-sm">Increasing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance Bottlenecks</CardTitle>
              <CardDescription>Identified performance issues and their impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.bottlenecks.map((bottleneck) => (
                  <div key={bottleneck.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge className={getSeverityColor(bottleneck.severity)}>
                        {bottleneck.severity}
                      </Badge>
                      <div>
                        <div className="font-medium">{bottleneck.description}</div>
                        <div className="text-sm text-muted-foreground">{bottleneck.impact}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Recommendation: {bottleneck.recommendation}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
              <CardDescription>Suggested improvements for better performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                      <div>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">{rec.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Impact: {rec.impact} • Effort: {rec.effort}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        Implement
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
  );
};

export default MCPPerformanceAnalyticsPage;
