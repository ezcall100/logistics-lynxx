import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Activity,
  Globe, Download, Calendar, Filter, RefreshCw,
  ArrowUpRight, ArrowDownRight, Minus, Target,
  PieChart, LineChart, BarChart, AreaChart
} from 'lucide-react';

interface PortalAnalytics {
  id: string;
  portalName: string;
  type: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    sessions: number;
    avgSessionDuration: number;
    bounceRate: number;
    conversionRate: number;
    revenue: number;
  };
  trends: {
    users: { date: string; value: number }[];
    sessions: { date: string; value: number }[];
    revenue: { date: string; value: number }[];
  };
  performance: {
    pageViews: number;
    avgLoadTime: number;
    errorRate: number;
    uptime: number;
  };
}

const PortalAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<PortalAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalAnalytics();
  }, [timeRange]);

  const loadPortalAnalytics = async () => {
    setLoading(true);
    try {
      // Mock analytics data
      const mockAnalytics: PortalAnalytics[] = [
        {
          id: 'portal-001',
          portalName: 'Carrier Portal',
          type: 'carrier',
          metrics: {
            totalUsers: 1250,
            activeUsers: 890,
            newUsers: 45,
            sessions: 2150,
            avgSessionDuration: 12.5,
            bounceRate: 23.4,
            conversionRate: 8.7,
            revenue: 125000
          },
          trends: {
            users: [
              { date: '2024-01-09', value: 1200 },
              { date: '2024-01-10', value: 1220 },
              { date: '2024-01-11', value: 1235 },
              { date: '2024-01-12', value: 1240 },
              { date: '2024-01-13', value: 1245 },
              { date: '2024-01-14', value: 1250 },
              { date: '2024-01-15', value: 1250 }
            ],
            sessions: [
              { date: '2024-01-09', value: 2000 },
              { date: '2024-01-10', value: 2050 },
              { date: '2024-01-11', value: 2100 },
              { date: '2024-01-12', value: 2120 },
              { date: '2024-01-13', value: 2140 },
              { date: '2024-01-14', value: 2150 },
              { date: '2024-01-15', value: 2150 }
            ],
            revenue: [
              { date: '2024-01-09', value: 120000 },
              { date: '2024-01-10', value: 121000 },
              { date: '2024-01-11', value: 122500 },
              { date: '2024-01-12', value: 123500 },
              { date: '2024-01-13', value: 124200 },
              { date: '2024-01-14', value: 124800 },
              { date: '2024-01-15', value: 125000 }
            ]
          },
          performance: {
            pageViews: 45000,
            avgLoadTime: 245,
            errorRate: 0.2,
            uptime: 99.8
          }
        },
        {
          id: 'portal-002',
          portalName: 'Broker Portal',
          type: 'broker',
          metrics: {
            totalUsers: 890,
            activeUsers: 650,
            newUsers: 28,
            sessions: 1450,
            avgSessionDuration: 18.2,
            bounceRate: 18.7,
            conversionRate: 12.3,
            revenue: 89000
          },
          trends: {
            users: [
              { date: '2024-01-09', value: 850 },
              { date: '2024-01-10', value: 860 },
              { date: '2024-01-11', value: 870 },
              { date: '2024-01-12', value: 875 },
              { date: '2024-01-13', value: 880 },
              { date: '2024-01-14', value: 885 },
              { date: '2024-01-15', value: 890 }
            ],
            sessions: [
              { date: '2024-01-09', value: 1400 },
              { date: '2024-01-10', value: 1420 },
              { date: '2024-01-11', value: 1430 },
              { date: '2024-01-12', value: 1440 },
              { date: '2024-01-13', value: 1445 },
              { date: '2024-01-14', value: 1450 },
              { date: '2024-01-15', value: 1450 }
            ],
            revenue: [
              { date: '2024-01-09', value: 85000 },
              { date: '2024-01-10', value: 85500 },
              { date: '2024-01-11', value: 86000 },
              { date: '2024-01-12', value: 86500 },
              { date: '2024-01-13', value: 87000 },
              { date: '2024-01-14', value: 88000 },
              { date: '2024-01-15', value: 89000 }
            ]
          },
          performance: {
            pageViews: 32000,
            avgLoadTime: 180,
            errorRate: 0.1,
            uptime: 99.9
          }
        },
        {
          id: 'portal-003',
          portalName: 'Shipper Portal',
          type: 'shipper',
          metrics: {
            totalUsers: 2100,
            activeUsers: 1650,
            newUsers: 78,
            sessions: 3200,
            avgSessionDuration: 15.8,
            bounceRate: 21.2,
            conversionRate: 9.5,
            revenue: 210000
          },
          trends: {
            users: [
              { date: '2024-01-09', value: 2000 },
              { date: '2024-01-10', value: 2020 },
              { date: '2024-01-11', value: 2040 },
              { date: '2024-01-12', value: 2060 },
              { date: '2024-01-13', value: 2080 },
              { date: '2024-01-14', value: 2090 },
              { date: '2024-01-15', value: 2100 }
            ],
            sessions: [
              { date: '2024-01-09', value: 3100 },
              { date: '2024-01-10', value: 3120 },
              { date: '2024-01-11', value: 3140 },
              { date: '2024-01-12', value: 3160 },
              { date: '2024-01-13', value: 3180 },
              { date: '2024-01-14', value: 3190 },
              { date: '2024-01-15', value: 3200 }
            ],
            revenue: [
              { date: '2024-01-09', value: 200000 },
              { date: '2024-01-10', value: 202000 },
              { date: '2024-01-11', value: 204000 },
              { date: '2024-01-12', value: 206000 },
              { date: '2024-01-13', value: 208000 },
              { date: '2024-01-14', value: 209000 },
              { date: '2024-01-15', value: 210000 }
            ]
          },
          performance: {
            pageViews: 68000,
            avgLoadTime: 320,
            errorRate: 0.3,
            uptime: 99.7
          }
        }
      ];

      setAnalytics(mockAnalytics);
      if (mockAnalytics.length > 0) {
        setSelectedPortal(mockAnalytics[0].id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const selectedPortalData = analytics.find(a => a.id === selectedPortal);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={loadPortalAnalytics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="flex gap-2">
        {analytics.map((portal) => (
          <Button
            key={portal.id}
            variant={selectedPortal === portal.id ? "default" : "outline"}
            onClick={() => setSelectedPortal(portal.id)}
          >
            {portal.portalName}
          </Button>
        ))}
      </div>

      {selectedPortalData && (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalData.metrics.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(selectedPortalData.metrics.totalUsers, selectedPortalData.metrics.totalUsers - selectedPortalData.metrics.newUsers)}
                  <span className={getTrendColor(selectedPortalData.metrics.totalUsers, selectedPortalData.metrics.totalUsers - selectedPortalData.metrics.newUsers)}>
                    +{selectedPortalData.metrics.newUsers} new users
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalData.metrics.activeUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(selectedPortalData.metrics.activeUsers, selectedPortalData.metrics.activeUsers - 50)}
                  <span className={getTrendColor(selectedPortalData.metrics.activeUsers, selectedPortalData.metrics.activeUsers - 50)}>
                    {calculateGrowth(selectedPortalData.metrics.activeUsers, selectedPortalData.metrics.activeUsers - 50).toFixed(1)}% from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalData.metrics.sessions.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(selectedPortalData.metrics.sessions, selectedPortalData.metrics.sessions - 100)}
                  <span className={getTrendColor(selectedPortalData.metrics.sessions, selectedPortalData.metrics.sessions - 100)}>
                    {calculateGrowth(selectedPortalData.metrics.sessions, selectedPortalData.metrics.sessions - 100).toFixed(1)}% from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${selectedPortalData.metrics.revenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTrendIcon(selectedPortalData.metrics.revenue, selectedPortalData.metrics.revenue - 5000)}
                  <span className={getTrendColor(selectedPortalData.metrics.revenue, selectedPortalData.metrics.revenue - 5000)}>
                    {calculateGrowth(selectedPortalData.metrics.revenue, selectedPortalData.metrics.revenue - 5000).toFixed(1)}% from last period
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Daily active users over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted rounded">
                      <div className="text-center">
                        <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">User Growth Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Analytics</CardTitle>
                    <CardDescription>Session duration and bounce rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg Session Duration</span>
                        <span className="font-medium">{selectedPortalData.metrics.avgSessionDuration} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bounce Rate</span>
                        <span className="font-medium">{selectedPortalData.metrics.bounceRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Conversion Rate</span>
                        <span className="font-medium">{selectedPortalData.metrics.conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>System performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Page Views</span>
                        <span className="font-medium">{selectedPortalData.performance.pageViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg Load Time</span>
                        <span className="font-medium">{selectedPortalData.performance.avgLoadTime}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Error Rate</span>
                        <span className="font-medium">{selectedPortalData.performance.errorRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="font-medium">{selectedPortalData.performance.uptime}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Load time and error rate trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted rounded">
                      <div className="text-center">
                        <AreaChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Performance Trends Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Detailed engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded">
                    <div className="text-center">
                      <BarChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Engagement Analytics Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Revenue trends and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Revenue Analytics Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PortalAnalyticsPage;
