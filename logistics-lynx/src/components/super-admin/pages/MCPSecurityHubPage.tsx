import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Lock, 
  Eye, EyeOff, Key, Fingerprint, Wifi, Server, 
  Activity, RefreshCw, Zap, Target, Users, Settings,
  Database, Globe, Code, Bell, Clock, TrendingUp
} from 'lucide-react';

// Mock security data
const mockSecurityData = {
  overall: {
    score: 94,
    status: 'secure',
    threats: 0,
    vulnerabilities: 2,
    lastScan: '2 hours ago'
  },
  threats: {
    active: 0,
    blocked: 1247,
    suspicious: 3,
    total: 1250
  },
  vulnerabilities: [
    {
      id: 1,
      severity: 'medium',
      title: 'Outdated SSL Certificate',
      description: 'SSL certificate expires in 30 days',
      affected: 'Web Server',
      status: 'open',
      discovered: '2 days ago'
    },
    {
      id: 2,
      severity: 'low',
      title: 'Weak Password Policy',
      description: 'Password policy needs strengthening',
      affected: 'User Authentication',
      status: 'open',
      discovered: '1 week ago'
    }
  ],
  firewall: {
    status: 'active',
    rules: 156,
    blocked: 89,
    allowed: 67,
    lastUpdate: '1 hour ago'
  },
  encryption: {
    ssl: 'enabled',
    database: 'enabled',
    files: 'enabled',
    keys: 24,
    lastRotation: '1 week ago'
  },
  access: {
    activeUsers: 47,
    failedLogins: 12,
    suspiciousActivity: 2,
    lastReview: '1 day ago'
  },
  monitoring: {
    realTime: true,
    alerts: true,
    logging: true,
    retention: '90 days'
  }
};

const MCPSecurityHubPage = () => {
  const [securityData, setSecurityData] = useState(mockSecurityData);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSecurityAction = (action: string) => {
    console.log(`Performing security action: ${action}`);
    // Here you would implement actual security control logic
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Security Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive security monitoring and threat management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(securityData.overall.status)}`} />
            <span>{securityData.overall.status}</span>
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Run Scan
          </Button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{securityData.overall.score}</p>
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-red-100">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{securityData.threats.active}</p>
                <p className="text-sm font-medium text-muted-foreground">Active Threats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{securityData.vulnerabilities.length}</p>
                <p className="text-sm font-medium text-muted-foreground">Vulnerabilities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{securityData.threats.blocked}</p>
                <p className="text-sm font-medium text-muted-foreground">Threats Blocked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Security Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="firewall">Firewall</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Current security posture and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Security Score</span>
                    <span className="text-lg font-bold">{securityData.overall.score}/100</span>
                  </div>
                  <Progress value={securityData.overall.score} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Threat Detection Rate</span>
                    <span className="text-lg font-bold">
                      {Math.round((securityData.threats.blocked / securityData.threats.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(securityData.threats.blocked / securityData.threats.total) * 100} 
                    className="h-3" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Vulnerability Coverage</span>
                    <span className="text-lg font-bold">
                      {Math.round(((securityData.vulnerabilities.length - 2) / securityData.vulnerabilities.length) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((securityData.vulnerabilities.length - 2) / securityData.vulnerabilities.length) * 100} 
                    className="h-3" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Encryption Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Encryption Status</CardTitle>
                <CardDescription>Data encryption and key management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">SSL/TLS</span>
                    </div>
                    <Badge variant={securityData.encryption.ssl === 'enabled' ? 'default' : 'secondary'}>
                      {securityData.encryption.ssl}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span className="text-sm">Database Encryption</span>
                    </div>
                    <Badge variant={securityData.encryption.database === 'enabled' ? 'default' : 'secondary'}>
                      {securityData.encryption.database}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4" />
                      <span className="text-sm">File Encryption</span>
                    </div>
                    <Badge variant={securityData.encryption.files === 'enabled' ? 'default' : 'secondary'}>
                      {securityData.encryption.files}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Keys</span>
                      <span className="font-medium">{securityData.encryption.keys}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Rotation</span>
                      <span className="font-medium">{securityData.encryption.lastRotation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Threat Intelligence</CardTitle>
              <CardDescription>Real-time threat monitoring and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{securityData.threats.blocked}</div>
                  <div className="text-sm text-muted-foreground">Threats Blocked</div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{securityData.threats.active}</div>
                  <div className="text-sm text-muted-foreground">Active Threats</div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{securityData.threats.suspicious}</div>
                  <div className="text-sm text-muted-foreground">Suspicious Activities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Vulnerability Management</CardTitle>
              <CardDescription>Security vulnerabilities and remediation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityData.vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge className={getSeverityColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                      <div>
                        <div className="font-medium">{vuln.title}</div>
                        <div className="text-sm text-muted-foreground">{vuln.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Affected: {vuln.affected} • Discovered: {vuln.discovered}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={vuln.status === 'open' ? 'secondary' : 'default'}>
                        {vuln.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Remediate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firewall" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Firewall Configuration</CardTitle>
              <CardDescription>Network firewall rules and traffic monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firewall Status</span>
                    <Badge variant={securityData.firewall.status === 'active' ? 'default' : 'secondary'}>
                      {securityData.firewall.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Rules</span>
                      <span className="font-medium">{securityData.firewall.rules}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blocked Requests</span>
                      <span className="font-medium">{securityData.firewall.blocked}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allowed Requests</span>
                      <span className="font-medium">{securityData.firewall.allowed}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm font-medium">Recent Activity</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Last Update</span>
                      <span>{securityData.firewall.lastUpdate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Block Rate</span>
                      <span>{Math.round((securityData.firewall.blocked / (securityData.firewall.blocked + securityData.firewall.allowed)) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>User access monitoring and authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Users</span>
                    <span className="font-medium">{securityData.access.activeUsers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Failed Logins</span>
                    <span className="font-medium">{securityData.access.failedLogins}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Suspicious Activity</span>
                    <span className="font-medium">{securityData.access.suspiciousActivity}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm font-medium">Security Monitoring</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Monitoring</span>
                      <Switch checked={securityData.monitoring.realTime} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Alerts</span>
                      <Switch checked={securityData.monitoring.alerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Activity Logging</span>
                      <Switch checked={securityData.monitoring.logging} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPSecurityHubPage;
