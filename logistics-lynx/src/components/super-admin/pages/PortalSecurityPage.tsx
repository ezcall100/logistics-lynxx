import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, AlertTriangle, CheckCircle, Lock, Unlock,
  Users, Activity, Eye, EyeOff, RefreshCw,
  AlertCircle, ShieldCheck, ShieldX, Clock, Calendar,
  TrendingUp, TrendingDown, Minus, Target
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  portalId: string;
  portalName: string;
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'data_access' | 'system_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  source: string;
  status: 'active' | 'resolved' | 'investigating';
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}

interface SecurityMetrics {
  portalId: string;
  portalName: string;
  securityScore: number;
  totalEvents: number;
  criticalEvents: number;
  failedLogins: number;
  suspiciousActivities: number;
  lastScan: string;
  vulnerabilities: number;
  complianceScore: number;
}

const PortalSecurityPage = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    setLoading(true);
    try {
      // Mock security events data
      const mockEvents: SecurityEvent[] = [
        {
          id: 'event-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          type: 'failed_login',
          severity: 'medium',
          description: 'Multiple failed login attempts detected',
          timestamp: '2024-01-15T10:45:00Z',
          source: '192.168.1.100',
          status: 'active',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'New York, US'
        },
        {
          id: 'event-002',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          type: 'suspicious_activity',
          severity: 'high',
          description: 'Unusual data access pattern detected',
          timestamp: '2024-01-15T10:30:00Z',
          source: 'Internal',
          status: 'investigating',
          ipAddress: '10.0.0.50',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          location: 'San Francisco, US'
        },
        {
          id: 'event-003',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          type: 'system_alert',
          severity: 'low',
          description: 'Security scan completed successfully',
          timestamp: '2024-01-15T10:15:00Z',
          source: 'System',
          status: 'resolved'
        }
      ];

      const mockMetrics: SecurityMetrics[] = [
        {
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          securityScore: 85,
          totalEvents: 12,
          criticalEvents: 1,
          failedLogins: 8,
          suspiciousActivities: 3,
          lastScan: '2024-01-15T10:00:00Z',
          vulnerabilities: 2,
          complianceScore: 92
        },
        {
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          securityScore: 78,
          totalEvents: 8,
          criticalEvents: 2,
          failedLogins: 5,
          suspiciousActivities: 1,
          lastScan: '2024-01-15T09:30:00Z',
          vulnerabilities: 4,
          complianceScore: 88
        },
        {
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          securityScore: 92,
          totalEvents: 5,
          criticalEvents: 0,
          failedLogins: 3,
          suspiciousActivities: 2,
          lastScan: '2024-01-15T10:00:00Z',
          vulnerabilities: 1,
          complianceScore: 95
        }
      ];

      setSecurityEvents(mockEvents);
      setSecurityMetrics(mockMetrics);
      if (mockMetrics.length > 0) {
        setSelectedPortal(mockMetrics[0].portalId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load security data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const selectedPortalMetrics = securityMetrics.find(m => m.portalId === selectedPortal);
  const selectedPortalEvents = securityEvents.filter(e => e.portalId === selectedPortal);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Security...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Security</h1>
          <p className="text-muted-foreground">
            Security monitoring and threat detection for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Run Security Scan
          </Button>
          <Button onClick={loadSecurityData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="flex gap-2">
        {securityMetrics.map((portal) => (
          <Button
            key={portal.portalId}
            variant={selectedPortal === portal.portalId ? "default" : "outline"}
            onClick={() => setSelectedPortal(portal.portalId)}
          >
            {portal.portalName}
          </Button>
        ))}
      </div>

      {selectedPortalMetrics && (
        <>
          {/* Security Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSecurityScoreColor(selectedPortalMetrics.securityScore)}`}>
                  {selectedPortalMetrics.securityScore}/100
                </div>
                <Progress value={selectedPortalMetrics.securityScore} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedPortalMetrics.securityScore >= 90 ? 'Excellent' : 
                   selectedPortalMetrics.securityScore >= 70 ? 'Good' : 'Needs attention'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {selectedPortalEvents.filter(e => e.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPortalMetrics.totalEvents} total events today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                <ShieldX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {selectedPortalMetrics.vulnerabilities}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPortalMetrics.vulnerabilities === 0 ? 'No vulnerabilities found' : 'Requires attention'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {selectedPortalMetrics.complianceScore}%
                </div>
                <Progress value={selectedPortalMetrics.complianceScore} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Regulatory compliance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Security Details */}
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events">Security Events</TabsTrigger>
              <TabsTrigger value="metrics">Security Metrics</TabsTrigger>
              <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Security Events</CardTitle>
                  <CardDescription>
                    Latest security events and alerts for {selectedPortalMetrics.portalName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPortalEvents.length > 0 ? (
                      selectedPortalEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${getSeverityColor(event.severity)} text-white`}>
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium">{event.description}</div>
                              <div className="text-sm text-muted-foreground">
                                {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {event.source}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Badge className={`${getSeverityColor(event.severity)} text-white`}>
                              {event.severity}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="text-muted-foreground">No security events detected</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Breakdown</CardTitle>
                    <CardDescription>Security events by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Failed Logins</span>
                        <span className="font-medium text-red-600">{selectedPortalMetrics.failedLogins}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Suspicious Activities</span>
                        <span className="font-medium text-orange-600">{selectedPortalMetrics.suspiciousActivities}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Critical Events</span>
                        <span className="font-medium text-red-600">{selectedPortalMetrics.criticalEvents}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Timeline</CardTitle>
                    <CardDescription>Recent security activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted rounded">
                      <div className="text-center">
                        <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Security Timeline Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="threats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Analysis</CardTitle>
                  <CardDescription>Current threats and risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">Low</div>
                        <div className="text-sm text-muted-foreground">Risk Level</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-muted-foreground">Monitoring</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">Active</div>
                        <div className="text-sm text-muted-foreground">Protection</div>
                      </div>
                    </div>
                    
                    <div className="h-64 flex items-center justify-center bg-muted rounded">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Threat Analysis Dashboard</p>
                      </div>
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

export default PortalSecurityPage;
