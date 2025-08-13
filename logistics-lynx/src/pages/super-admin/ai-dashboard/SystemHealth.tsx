import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';

const SystemHealth = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [healthData, setHealthData] = useState({
    uptime: 99.9,
    cpuUsage: 34,
    memoryUsage: 2.1,
    activeConnections: 1247
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setHealthData(prev => ({
      ...prev,
      cpuUsage: Math.floor(Math.random() * 50) + 20,
      memoryUsage: Math.random() * 2 + 1.5,
      activeConnections: Math.floor(Math.random() * 500) + 1000
    }));
    setRefreshing(false);
  };
  const systemStats = [
    { title: 'System Uptime', value: '99.98%', status: 'excellent', icon: Activity, color: 'text-green-600' },
    { title: 'CPU Usage', value: '23%', status: 'good', icon: Cpu, color: 'text-blue-600' },
    { title: 'Memory Usage', value: '67%', status: 'warning', icon: HardDrive, color: 'text-orange-600' },
    { title: 'Database Health', value: '98%', status: 'excellent', icon: Database, color: 'text-green-600' },
  ];

  const services = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.99%', response: '12ms', lastCheck: '30s ago' },
    { name: 'Authentication Service', status: 'healthy', uptime: '99.95%', response: '8ms', lastCheck: '45s ago' },
    { name: 'Database Cluster', status: 'healthy', uptime: '99.98%', response: '15ms', lastCheck: '30s ago' },
    { name: 'File Storage', status: 'healthy', uptime: '99.97%', response: '25ms', lastCheck: '1m ago' },
    { name: 'Email Service', status: 'warning', uptime: '98.5%', response: '156ms', lastCheck: '2m ago' },
    { name: 'AI Processing', status: 'healthy', uptime: '99.92%', response: '45ms', lastCheck: '15s ago' },
  ];

  const alerts = [
    { type: 'warning', message: 'High memory usage detected on server-3', time: '5 minutes ago', severity: 'Medium' },
    { type: 'info', message: 'Scheduled maintenance completed successfully', time: '2 hours ago', severity: 'Low' },
    { type: 'error', message: 'Temporary connection timeout to email service', time: '6 hours ago', severity: 'High' },
    { type: 'success', message: 'Database optimization completed', time: '1 day ago', severity: 'Low' },
  ];

  const performanceMetrics = [
    { metric: 'API Response Time', value: '156ms', trend: 'up', change: '+12ms' },
    { metric: 'Database Queries/sec', value: '2,345', trend: 'up', change: '+234' },
    { metric: 'Active Connections', value: '1,847', trend: 'down', change: '-123' },
    { metric: 'Error Rate', value: '0.02%', trend: 'down', change: '-0.01%' },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Health Monitor</h1>
            <p className="text-muted-foreground">Real-time system performance and health monitoring</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              View Alerts
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant={stat.status === 'excellent' ? 'default' : stat.status === 'warning' ? 'destructive' : 'secondary'}>
                    {stat.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Service Status
              </CardTitle>
              <CardDescription>Current status of all system services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' : 
                        service.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">Last check: {service.lastCheck}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{service.uptime}</div>
                      <div className="text-muted-foreground">{service.response}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Latest system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'error' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-orange-500' :
                      alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'} className="text-xs">
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric) => (
                <div key={metric.metric} className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.metric}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">23%</div>
                  <p className="text-sm text-muted-foreground">Average across all servers</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server 1</span>
                    <span>18%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Server 2</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Server 3</span>
                    <span>31%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '31%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">67%</div>
                  <p className="text-sm text-muted-foreground">12.4GB / 18.5GB used</p>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div className="bg-orange-500 h-4 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Available</p>
                    <p className="font-medium">6.1GB</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cached</p>
                    <p className="font-medium">2.3GB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Network I/O
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">234MB/s</div>
                  <p className="text-sm text-muted-foreground">Current throughput</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Inbound</span>
                    <span>156MB/s</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Outbound</span>
                    <span>78MB/s</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SystemHealth;