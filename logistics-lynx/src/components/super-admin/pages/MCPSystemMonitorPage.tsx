import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, Cpu, Memory, HardDrive, Wifi, Server, 
  AlertTriangle, CheckCircle, XCircle, RefreshCw, 
  TrendingUp, TrendingDown, Clock, Zap, Shield,
  Database, Globe, Code, Users, Settings
} from 'lucide-react';

// Mock system data
const mockSystemData = {
  overall: {
    health: 98.5,
    status: 'operational',
    uptime: '99.9%',
    lastUpdate: '2 seconds ago'
  },
  resources: {
    cpu: {
      usage: 67,
      cores: 16,
      temperature: 45,
      load: [23, 45, 67, 89, 56, 78, 34, 12]
    },
    memory: {
      used: 12.8,
      total: 32,
      usage: 40,
      available: 19.2
    },
    storage: {
      used: 856,
      total: 2000,
      usage: 42.8,
      available: 1144
    },
    network: {
      incoming: 45.6,
      outgoing: 23.4,
      bandwidth: 1000,
      connections: 1247
    }
  },
  services: [
    { name: 'Web Server', status: 'operational', health: 99, response: 45 },
    { name: 'Database', status: 'operational', health: 97, response: 12 },
    { name: 'API Gateway', status: 'operational', health: 98, response: 23 },
    { name: 'Authentication', status: 'operational', health: 100, response: 8 },
    { name: 'File Storage', status: 'operational', health: 96, response: 67 },
    { name: 'Email Service', status: 'operational', health: 95, response: 34 }
  ],
  alerts: [
    { id: 1, level: 'info', message: 'System optimization completed', time: '5 min ago' },
    { id: 2, level: 'warning', message: 'High memory usage detected', time: '2 min ago' },
    { id: 3, level: 'success', message: 'Backup completed successfully', time: '10 min ago' }
  ],
  performance: {
    responseTime: 45,
    throughput: 2400,
    errorRate: 0.02,
    availability: 99.9
  }
};

const MCPSystemMonitorPage = () => {
  const [systemData, setSystemData] = useState(mockSystemData);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        overall: {
          ...prev.overall,
          lastUpdate: 'Just now'
        },
        resources: {
          ...prev.resources,
          cpu: {
            ...prev.resources.cpu,
            usage: Math.floor(Math.random() * 30) + 50,
            temperature: Math.floor(Math.random() * 20) + 40
          }
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP System Monitor
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time system monitoring and performance analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(systemData.overall.status)}`} />
            <span>{systemData.overall.status}</span>
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{systemData.overall.health}%</p>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
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
                <p className="text-3xl font-bold">{systemData.overall.uptime}</p>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
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
                <p className="text-3xl font-bold">{systemData.performance.responseTime}ms</p>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{systemData.performance.throughput}</p>
                <p className="text-sm font-medium text-muted-foreground">Req/s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Monitoring Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-lg font-bold">{systemData.resources.cpu.usage}%</span>
                  </div>
                  <Progress value={systemData.resources.cpu.usage} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-lg font-bold">{systemData.resources.memory.usage}%</span>
                  </div>
                  <Progress value={systemData.resources.memory.usage} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-lg font-bold">{systemData.resources.storage.usage}%</span>
                  </div>
                  <Progress value={systemData.resources.storage.usage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Network Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Network Activity</CardTitle>
                <CardDescription>Network traffic and connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {systemData.resources.network.incoming} MB/s
                    </div>
                    <div className="text-sm text-muted-foreground">Incoming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {systemData.resources.network.outgoing} MB/s
                    </div>
                    <div className="text-sm text-muted-foreground">Outgoing</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="font-medium">{systemData.resources.network.connections}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bandwidth Used</span>
                    <span className="font-medium">
                      {Math.round((systemData.resources.network.incoming + systemData.resources.network.outgoing) / systemData.resources.network.bandwidth * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CPU Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5" />
                  <span>CPU Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.cpu.cores}</div>
                    <div className="text-sm text-muted-foreground">CPU Cores</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.cpu.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Load</span>
                    <span className="font-medium">{systemData.resources.cpu.usage}%</span>
                  </div>
                  <Progress value={systemData.resources.cpu.usage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Memory Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Memory className="w-5 h-5" />
                  <span>Memory Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.memory.used} GB</div>
                    <div className="text-sm text-muted-foreground">Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.memory.available} GB</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Memory</span>
                    <span className="font-medium">{systemData.resources.memory.total} GB</span>
                  </div>
                  <Progress value={systemData.resources.memory.usage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Storage Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5" />
                  <span>Storage Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.storage.used} GB</div>
                    <div className="text-sm text-muted-foreground">Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.storage.available} GB</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Storage</span>
                    <span className="font-medium">{systemData.resources.storage.total} GB</span>
                  </div>
                  <Progress value={systemData.resources.storage.usage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Network Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5" />
                  <span>Network Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.network.bandwidth} MB/s</div>
                    <div className="text-sm text-muted-foreground">Bandwidth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemData.resources.network.connections}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Traffic (In/Out)</span>
                    <span className="font-medium">
                      {systemData.resources.network.incoming}/{systemData.resources.network.outgoing} MB/s
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Real-time status of all system services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemData.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Response: {service.response}ms
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">{service.health}%</div>
                        <div className="text-sm text-muted-foreground">Health</div>
                      </div>
                      <Badge variant={service.status === 'operational' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full ${getAlertColor(alert.level)}`}>
                      {alert.level === 'success' && <CheckCircle className="w-4 h-4" />}
                      {alert.level === 'warning' && <AlertTriangle className="w-4 h-4" />}
                      {alert.level === 'error' && <XCircle className="w-4 h-4" />}
                      {alert.level === 'info' && <Activity className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm text-muted-foreground">{alert.time}</div>
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

export default MCPSystemMonitorPage;
