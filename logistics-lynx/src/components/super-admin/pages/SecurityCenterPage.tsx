import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  Wifi,
  HardDrive,
  Cpu,
  HardDriveIcon,
  WifiOff,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Settings,
  Bell,
  User,
  Users,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';

interface SecurityThreat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'brute_force' | 'ddos' | 'malware' | 'phishing' | 'suspicious_activity';
  source: string;
  target: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  description: string;
  ipAddress: string;
  location: string;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change';
  user: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  details: string;
  risk: 'low' | 'medium' | 'high';
}

interface FirewallRule {
  id: string;
  name: string;
  protocol: string;
  port: string;
  source: string;
  destination: string;
  action: 'allow' | 'deny' | 'block';
  status: 'active' | 'inactive';
  priority: number;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'secure' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const SecurityCenterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'maximum'>('high');
  
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: '1',
      severity: 'high',
      type: 'brute_force',
      source: '192.168.1.100',
      target: 'admin@transbot.ai',
      timestamp: '2024-01-15 14:30:00',
      status: 'active',
      description: 'Multiple failed login attempts detected',
      ipAddress: '192.168.1.100',
      location: 'New York, US'
    },
    {
      id: '2',
      severity: 'medium',
      type: 'suspicious_activity',
      source: '10.0.0.50',
      target: 'api.transbot.ai',
      timestamp: '2024-01-15 14:25:00',
      status: 'investigating',
      description: 'Unusual API request pattern detected',
      ipAddress: '10.0.0.50',
      location: 'London, UK'
    },
    {
      id: '3',
      severity: 'low',
      type: 'phishing',
      source: 'phishing@malicious.com',
      target: 'user@transbot.ai',
      timestamp: '2024-01-15 14:20:00',
      status: 'resolved',
      description: 'Phishing email blocked',
      ipAddress: '185.220.101.45',
      location: 'Unknown'
    }
  ]);

  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'failed_login',
      user: 'admin@transbot.ai',
      ipAddress: '192.168.1.100',
      location: 'New York, US',
      timestamp: '2024-01-15 14:30:00',
      details: 'Failed login attempt with incorrect password',
      risk: 'high'
    },
    {
      id: '2',
      type: 'login',
      user: 'user@transbot.ai',
      ipAddress: '10.0.0.50',
      location: 'London, UK',
      timestamp: '2024-01-15 14:25:00',
      details: 'Successful login with 2FA',
      risk: 'low'
    },
    {
      id: '3',
      type: 'permission_change',
      user: 'admin@transbot.ai',
      ipAddress: '192.168.1.1',
      location: 'New York, US',
      timestamp: '2024-01-15 14:20:00',
      details: 'User permissions updated for user@transbot.ai',
      risk: 'medium'
    }
  ]);

  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([
    {
      id: '1',
      name: 'Allow HTTPS Traffic',
      protocol: 'HTTPS',
      port: '443',
      source: '0.0.0.0/0',
      destination: 'any',
      action: 'allow',
      status: 'active',
      priority: 1
    },
    {
      id: '2',
      name: 'Block Suspicious IPs',
      protocol: 'ALL',
      port: 'ALL',
      source: '185.220.101.0/24',
      destination: 'any',
      action: 'block',
      status: 'active',
      priority: 2
    },
    {
      id: '3',
      name: 'Rate Limiting',
      protocol: 'HTTP',
      port: '80',
      source: '0.0.0.0/0',
      destination: 'any',
      action: 'deny',
      status: 'active',
      priority: 3
    }
  ]);

  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([
    {
      id: 'threats_blocked',
      name: 'Threats Blocked',
      value: 1247,
      unit: 'today',
      status: 'secure',
      trend: 'up'
    },
    {
      id: 'failed_attempts',
      name: 'Failed Login Attempts',
      value: 23,
      unit: 'today',
      status: 'warning',
      trend: 'down'
    },
    {
      id: 'active_threats',
      name: 'Active Threats',
      value: 2,
      unit: 'current',
      status: 'warning',
      trend: 'stable'
    },
    {
      id: 'security_score',
      name: 'Security Score',
      value: 92,
      unit: '/100',
      status: 'secure',
      trend: 'up'
    }
  ]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThreatAction = (threatId: string, action: 'block' | 'investigate' | 'resolve') => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, status: action === 'resolve' ? 'resolved' : 'investigating' }
        : threat
    ));
  };

  const handleFirewallRuleToggle = (ruleId: string) => {
    setFirewallRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Security Center</h1>
          <p className="text-muted-foreground">
            Comprehensive security monitoring and threat management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh">Auto Refresh</Label>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Security Level Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">SECURE</div>
              <p className="text-sm text-muted-foreground">
                All security systems operational
              </p>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              Level {securityLevel.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className={`w-2 h-2 rounded-full ${
                metric.status === 'secure' ? 'bg-green-500' :
                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} 
                {metric.trend === 'up' ? 'Increasing' : metric.trend === 'down' ? 'Decreasing' : 'Stable'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="threats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="threats">Active Threats</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="firewall">Firewall Rules</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Security Threats</CardTitle>
              <CardDescription>
                Real-time threat detection and response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Threat</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {threats.map((threat) => (
                    <TableRow key={threat.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{threat.type.replace('_', ' ').toUpperCase()}</div>
                          <div className="text-sm text-muted-foreground">{threat.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          threat.severity === 'critical' ? 'destructive' :
                          threat.severity === 'high' ? 'default' :
                          threat.severity === 'medium' ? 'secondary' : 'outline'
                        }>
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(threat.severity)} mr-2`} />
                          {threat.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{threat.ipAddress}</div>
                          <div className="text-sm text-muted-foreground">{threat.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>{threat.target}</TableCell>
                      <TableCell>
                        <Badge variant={
                          threat.status === 'active' ? 'destructive' :
                          threat.status === 'investigating' ? 'secondary' : 'default'
                        }>
                          {threat.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleThreatAction(threat.id, 'block')}
                          >
                            Block
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleThreatAction(threat.id, 'investigate')}
                          >
                            Investigate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Events Log</CardTitle>
              <CardDescription>
                Recent security events and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.type.replace('_', ' ').toUpperCase()}</div>
                          <div className="text-sm text-muted-foreground">{event.details}</div>
                        </div>
                      </TableCell>
                      <TableCell>{event.user}</TableCell>
                      <TableCell>{event.ipAddress}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Badge variant={
                          event.risk === 'high' ? 'destructive' :
                          event.risk === 'medium' ? 'secondary' : 'outline'
                        }>
                          {event.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firewall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firewall Rules</CardTitle>
              <CardDescription>
                Network security rules and access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {firewallRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.protocol}</TableCell>
                      <TableCell>{rule.port}</TableCell>
                      <TableCell>{rule.source}</TableCell>
                      <TableCell>
                        <Badge variant={
                          rule.action === 'allow' ? 'default' : 'destructive'
                        }>
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          rule.status === 'active' ? 'default' : 'secondary'
                        }>
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Switch
                            checked={rule.status === 'active'}
                            onCheckedChange={() => handleFirewallRuleToggle(rule.id)}
                          />
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Security Monitoring</CardTitle>
                <CardDescription>Live security metrics and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Connections</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Blocked Requests</span>
                    <span className="font-bold text-red-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Failed Logins</span>
                    <span className="font-bold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Security Score</span>
                    <span className="font-bold text-green-600">92/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Recent security notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High Severity Threat</AlertTitle>
                    <AlertDescription>
                      Brute force attack detected from IP 192.168.1.100
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Security Update</AlertTitle>
                    <AlertDescription>
                      Firewall rules updated successfully
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCenterPage;
