
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemHealthData {
  performance: Array<{
    timestamp: string;
    cpu: number;
    memory: number;
    network: number;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: string;
    timestamp: string;
  }>;
}

interface SystemHealthMonitorProps {
  data: SystemHealthData;
  timeRange: string;
}

const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({ data, timeRange }) => {
  const performance = data?.performance || [];
  const alerts = data?.alerts || [];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'error':
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
      case 'critical':
        return 'bg-red-500 text-white';
      case 'medium':
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'low':
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* System Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-500" />
              CPU Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Usage</span>
                <span className="text-lg font-bold">
                  {performance.length > 0 ? Math.round(performance[performance.length - 1]?.cpu || 0) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(performance.reduce((acc: number, p) => acc + (p.cpu || 0), 0) / performance.length) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Peak</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(Math.max(...performance.map((p) => p.cpu || 0))) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-500" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Usage</span>
                <span className="text-lg font-bold">
                  {performance.length > 0 ? Math.round(performance[performance.length - 1]?.memory || 0) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(performance.reduce((acc: number, p) => acc + (p.memory || 0), 0) / performance.length) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Peak</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(Math.max(...performance.map((p) => p.memory || 0))) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="h-5 w-5 text-purple-500" />
              Network Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Load</span>
                <span className="text-lg font-bold">
                  {performance.length > 0 ? Math.round(performance[performance.length - 1]?.network || 0) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(performance.reduce((acc: number, p) => acc + (p.network || 0), 0) / performance.length) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Peak</span>
                <span className="text-sm font-medium">
                  {performance.length > 0 ? Math.round(Math.max(...performance.map((p) => p.network || 0))) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Performance Over Time
          </CardTitle>
          <CardDescription>
            Real-time monitoring of CPU, memory, and network performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Memory %"
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Network %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Usage Distribution</CardTitle>
          <CardDescription>
            Resource consumption patterns and utilization trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="CPU"
                />
                <Area 
                  type="monotone" 
                  dataKey="memory" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  name="Memory"
                />
                <Area 
                  type="monotone" 
                  dataKey="network" 
                  stackId="1" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6}
                  name="Network"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Alerts & Notifications
          </CardTitle>
          <CardDescription>
            Recent system alerts, warnings, and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert, index: number) => (
                <Alert key={index} variant={getAlertVariant(alert.type)}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription className="font-medium">
                        {alert.message}
                      </AlertDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity?.toUpperCase() || 'UNKNOWN'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-medium">All Systems Operational</p>
                <p className="text-sm">No alerts or warnings at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthMonitor;
