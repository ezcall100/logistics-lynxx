import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface SLOMetric {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ConversionMetric {
  stage: string;
  rate: number;
  volume: number;
  trend: 'up' | 'down' | 'stable';
}

interface BusinessHealth {
  mrr: number;
  mrrGrowth: number;
  churnRate: number;
  trialConversion: number;
  activeUsers: number;
  systemUptime: number;
}

const ExecutiveDashboard: React.FC = () => {
  const [sloMetrics, setSloMetrics] = useState<SLOMetric[]>([
    {
      name: 'Agent Success Rate',
      current: 98.5,
      target: 98.0,
      unit: '%',
      status: 'healthy',
      trend: 'up'
    },
    {
      name: 'Quote Response Time',
      current: 450,
      target: 500,
      unit: 'ms',
      status: 'healthy',
      trend: 'up'
    },
    {
      name: 'System Uptime',
      current: 99.95,
      target: 99.9,
      unit: '%',
      status: 'healthy',
      trend: 'stable'
    },
    {
      name: 'API Error Rate',
      current: 0.8,
      target: 1.0,
      unit: '%',
      status: 'warning',
      trend: 'down'
    }
  ]);

  const [conversionMetrics, setConversionMetrics] = useState<ConversionMetric[]>([
    {
      stage: 'Lead → Trial',
      rate: 15.2,
      volume: 1247,
      trend: 'up'
    },
    {
      stage: 'Trial → Paid',
      rate: 22.1,
      volume: 276,
      trend: 'up'
    },
    {
      stage: 'Quote → Book',
      rate: 28.5,
      volume: 892,
      trend: 'stable'
    },
    {
      stage: 'Retention (30d)',
      rate: 94.8,
      volume: 1247,
      trend: 'up'
    }
  ]);

  const [businessHealth, setBusinessHealth] = useState<BusinessHealth>({
    mrr: 125000,
    mrrGrowth: 14.2,
    churnRate: 3.2,
    trialConversion: 22.1,
    activeUsers: 2847,
    systemUptime: 99.95
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update SLO metrics with realistic variations
      setSloMetrics(prev => prev.map(metric => ({
        ...metric,
        current: metric.current + (Math.random() - 0.5) * 0.2,
        status: metric.current >= metric.target ? 'healthy' : 
                metric.current >= metric.target * 0.95 ? 'warning' : 'critical'
      })));

      // Check for critical alerts
      const criticalMetrics = sloMetrics.filter(m => m.status === 'critical');
      if (criticalMetrics.length > 0) {
        setAlerts(prev => [
          ...prev,
          `Critical: ${criticalMetrics[0].name} below target (${criticalMetrics[0].current}${criticalMetrics[0].unit})`
        ]);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [sloMetrics]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Real-time business health and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live</span>
          </Badge>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {alerts[alerts.length - 1]}
          </AlertDescription>
        </Alert>
      )}

      {/* Business Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(businessHealth.mrr)}</div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+{businessHealth.mrrGrowth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessHealth.activeUsers.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Conversion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessHealth.trialConversion}%</div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessHealth.systemUptime}%</div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span>Healthy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLO Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Service Level Objectives (SLOs)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sloMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.current.toFixed(1)}{metric.unit}</span>
                    <span className="text-gray-500">Target: {metric.target}{metric.unit}</span>
                  </div>
                  <Progress 
                    value={(metric.current / metric.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Conversion Funnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionMetrics.map((metric, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {metric.rate}%
                </div>
                <div className="text-sm text-gray-600">{metric.stage}</div>
                <div className="text-xs text-gray-500">
                  {metric.volume.toLocaleString()} users
                </div>
                <div className="flex justify-center">
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>View Alerts</span>
              </div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Performance Report</span>
              </div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Growth Analysis</span>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;
