/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Eye,
  Calendar,
  Users,
  FileText
} from 'lucide-react';

const MonitoringAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const performanceMetrics = [
    {
      title: "Transaction Volume",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: FileText,
      description: "Total EDI transactions"
    },
    {
      title: "Average Processing Time",
      value: "1.2s",
      change: "-0.3s",
      trend: "down",
      icon: Clock,
      description: "Per transaction"
    },
    {
      title: "Success Rate",
      value: "98.7%",
      change: "+0.8%",
      trend: "up",
      icon: CheckCircle,
      description: "Successful transactions"
    },
    {
      title: "Data Throughput",
      value: "45.2 MB",
      change: "+8.1%",
      trend: "up",
      icon: BarChart3,
      description: "Total data processed"
    }
  ];

  const transactionVolume = [
    { time: "00:00", volume: 45, success: 44, failed: 1 },
    { time: "04:00", volume: 32, success: 31, failed: 1 },
    { time: "08:00", volume: 189, success: 186, failed: 3 },
    { time: "12:00", volume: 267, success: 263, failed: 4 },
    { time: "16:00", volume: 198, success: 195, failed: 3 },
    { time: "20:00", volume: 156, success: 154, failed: 2 }
  ];

  const partnerPerformance = [
    { name: "ABC Logistics", transactions: 547, successRate: 99.2, avgTime: "0.8s", status: "excellent" },
    { name: "MegaHaul Corp", transactions: 423, successRate: 98.9, avgTime: "1.1s", status: "good" },
    { name: "FastTruck Express", transactions: 689, successRate: 99.7, avgTime: "0.6s", status: "excellent" },
    { name: "QuickShip LLC", transactions: 234, successRate: 97.5, avgTime: "1.8s", status: "warning" },
    { name: "TruckMaster Inc", transactions: 156, successRate: 94.8, avgTime: "2.3s", status: "needs_attention" }
  ];

  const errorAnalysis = [
    { type: "Mapping Error", count: 23, percentage: 37.1, trend: "up" },
    { type: "Validation Failed", count: 18, percentage: 29.0, trend: "down" },
    { type: "Connection Timeout", count: 12, percentage: 19.4, trend: "stable" },
    { type: "Format Invalid", count: 9, percentage: 14.5, trend: "down" }
  ];

  const realtimeAlerts = [
    { time: "14:32", type: "Warning", message: "High processing time detected for EDI 210", severity: "medium" },
    { time: "14:28", type: "Error", message: "Connection failed to QuickShip LLC", severity: "high" },
    { time: "14:25", type: "Info", message: "Daily backup completed successfully", severity: "low" },
    { time: "14:22", type: "Warning", message: "Unusual transaction volume spike", severity: "medium" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return <Badge variant="default">Excellent</Badge>;
      case 'good': return <Badge variant="secondary">Good</Badge>;
      case 'warning': return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'needs_attention': return <Badge variant="destructive">Needs Attention</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Monitoring & Analytics</h1>
          <p className="text-muted-foreground">
            Real-time performance monitoring and analytics dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`text-${metric.trend === 'up' ? 'green' : 'red'}-600`}>
                  {metric.change}
                </span>
                <span>{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transaction Volume Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Transaction Volume Trends
            </CardTitle>
            <CardDescription>EDI transaction volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Successful</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Failed</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {transactionVolume.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-sm text-muted-foreground">{data.time}</div>
                    <div className="flex-1">
                      <div className="flex h-6 bg-muted rounded">
                        <div 
                          className="bg-primary rounded-l"
                          style={{ width: `${(data.success / data.volume) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-red-500 rounded-r"
                          style={{ width: `${(data.failed / data.volume) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm text-right">{data.volume}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Real-time Alerts
            </CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeAlerts.map((alert, index) => (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getSeverityColor(alert.severity)}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="partners" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="partners">Partner Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Partner Performance</CardTitle>
              <CardDescription>Performance metrics by trading partner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {partnerPerformance.map((partner, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">Trading Partner</div>
                      </div>
                      <div>
                        <div className="font-medium">{partner.transactions.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Transactions</div>
                      </div>
                      <div>
                        <div className="font-medium">{partner.successRate}%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div>
                        <div className="font-medium">{partner.avgTime}</div>
                        <div className="text-sm text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(partner.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Analysis</CardTitle>
              <CardDescription>Breakdown of EDI processing errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorAnalysis.map((error, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{error.type}</div>
                      <div className="text-sm text-muted-foreground">{error.count} occurrences</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{error.percentage}%</div>
                      <div className={`text-xs ${
                        error.trend === 'up' ? 'text-red-600' : 
                        error.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {error.trend === 'up' ? '↑' : error.trend === 'down' ? '↓' : '→'} {error.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Disk Usage</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">156</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Connection Pool</span>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Connections</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringAnalytics;