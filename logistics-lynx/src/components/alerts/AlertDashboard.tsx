/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  source: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

interface AlertStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const AlertDashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        // Simulate fetching alerts from an API or database
        const mockAlerts: Alert[] = [
          {
            id: '1',
            title: 'High CPU Usage',
            message: 'CPU usage is consistently above 90%',
            severity: 'high',
            category: 'performance',
            source: 'server-monitoring',
            created_at: new Date().toISOString(),
            metadata: { server: 'web-01' }
          },
          {
            id: '2',
            title: 'Failed Login Attempt',
            message: 'Multiple failed login attempts detected',
            severity: 'medium',
            category: 'security',
            source: 'authentication-service',
            created_at: new Date().toISOString(),
            metadata: { ip_address: '192.168.1.100' }
          },
          {
            id: '3',
            title: 'Low Disk Space',
            message: 'Disk space is running low on /var/log',
            severity: 'low',
            category: 'storage',
            source: 'disk-monitoring',
            created_at: new Date().toISOString(),
            metadata: { partition: '/var/log', usage: '85%' }
          },
          {
            id: '4',
            title: 'Critical Error in Payment Gateway',
            message: 'Payment gateway is experiencing critical errors',
            severity: 'critical',
            category: 'payment',
            source: 'payment-gateway',
            created_at: new Date().toISOString(),
            metadata: { error_code: '500', error_message: 'Internal Server Error' }
          },
          {
            id: '5',
            title: 'Service Restarted',
            message: 'Critical service automatically restarted',
            severity: 'medium',
            category: 'system',
            source: 'auto-restart',
            created_at: new Date().toISOString(),
            metadata: { service_name: 'database', restart_count: 3 }
          }
        ];

        setAlerts(mockAlerts);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertStats = useCallback(() => {
    const stats: AlertStats = {
      total: alerts.length,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    alerts.forEach(alert => {
      switch (alert.severity) {
        case 'critical':
          stats.critical++;
          break;
        case 'high':
          stats.high++;
          break;
        case 'medium':
          stats.medium++;
          break;
        case 'low':
          stats.low++;
          break;
      }
    });

    return stats;
  }, [alerts]);

  const alertStats = useMemo(() => getAlertStats(), [getAlertStats]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>
            Real-time alerts and notifications for critical system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading alerts...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">{alertStats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Alerts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className={`text-2xl font-bold ${getSeverityColor('critical')}`}>
                    {alertStats.critical}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className={`text-2xl font-bold ${getSeverityColor('high')}`}>
                    {alertStats.high}
                  </div>
                  <div className="text-sm text-muted-foreground">High</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className={`text-2xl font-bold ${getSeverityColor('medium')}`}>
                    {alertStats.medium}
                  </div>
                  <div className="text-sm text-muted-foreground">Medium</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            List of recent system alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading alerts...</p>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {alert.source}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertDashboard;
