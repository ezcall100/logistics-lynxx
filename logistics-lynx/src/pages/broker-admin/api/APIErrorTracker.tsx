/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Bug, RefreshCw, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface APIError {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  errorType: string;
  errorMessage: string;
  count: number;
  firstSeen: string;
  lastSeen: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  affectedUsers: number;
  stackTrace?: string;
}

const APIErrorTracker: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const [apiErrors] = useState<APIError[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:15Z',
      endpoint: '/api/v1/carriers',
      method: 'GET',
      statusCode: 500,
      errorType: 'DatabaseTimeout',
      errorMessage: 'Connection timeout while fetching carrier data',
      count: 47,
      firstSeen: '2024-01-15T08:15:00Z',
      lastSeen: '2024-01-15T10:30:15Z',
      severity: 'high',
      resolved: false,
      affectedUsers: 23,
      stackTrace: 'at CarrierService.getCarriers (carriers.service.js:45:12)\n  at CarrierController.list (carriers.controller.js:28:8)'
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:25:30Z',
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      statusCode: 401,
      errorType: 'AuthenticationError',
      errorMessage: 'Invalid credentials provided',
      count: 156,
      firstSeen: '2024-01-15T09:00:00Z',
      lastSeen: '2024-01-15T10:25:30Z',
      severity: 'medium',
      resolved: false,
      affectedUsers: 89
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:20:45Z',
      endpoint: '/api/v1/loads',
      method: 'POST',
      statusCode: 422,
      errorType: 'ValidationError',
      errorMessage: 'Missing required field: pickup_location',
      count: 12,
      firstSeen: '2024-01-15T10:00:00Z',
      lastSeen: '2024-01-15T10:20:45Z',
      severity: 'low',
      resolved: false,
      affectedUsers: 8
    },
    {
      id: '4',
      timestamp: '2024-01-15T09:45:12Z',
      endpoint: '/api/v1/rates/calculate',
      method: 'POST',
      statusCode: 503,
      errorType: 'ServiceUnavailable',
      errorMessage: 'Rate calculation service temporarily unavailable',
      count: 89,
      firstSeen: '2024-01-15T09:30:00Z',
      lastSeen: '2024-01-15T09:45:12Z',
      severity: 'critical',
      resolved: true,
      affectedUsers: 45
    }
  ]);

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, { variant: unknown, icon: React.ReactNode }> = {
      low: { variant: "secondary", icon: <Bug className="h-3 w-3" /> },
      medium: { variant: "outline", icon: <AlertTriangle className="h-3 w-3" /> },
      high: { variant: "destructive", icon: <AlertTriangle className="h-3 w-3" /> },
      critical: { variant: "destructive", icon: <Zap className="h-3 w-3" /> }
    };
    const config = variants[severity] || variants.low;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (resolved: boolean) => {
    return resolved ? 
      <Badge className="bg-green-100 text-green-800">Resolved</Badge> : 
      <Badge variant="destructive">Active</Badge>;
  };

  const filteredErrors = apiErrors.filter(error => {
    const matchesSeverity = selectedSeverity === 'all' || error.severity === selectedSeverity;
    return matchesSeverity;
  });

  const errorStats = {
    total: apiErrors.length,
    active: apiErrors.filter(e => !e.resolved).length,
    resolved: apiErrors.filter(e => e.resolved).length,
    critical: apiErrors.filter(e => e.severity === 'critical').length
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Error Tracker</h1>
          <p className="text-muted-foreground">
            Monitor, track, and resolve API errors across all endpoints
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorStats.total}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              -12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorStats.active}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
              +3 since last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{errorStats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((errorStats.resolved / errorStats.total) * 100)}% resolution rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <Zap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorStats.critical}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="errors" className="w-full">
        <TabsList>
          <TabsTrigger value="errors">Error List</TabsTrigger>
          <TabsTrigger value="analytics">Error Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alert Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="errors" className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredErrors.map((error) => (
              <Card key={error.id} className={error.resolved ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getSeverityBadge(error.severity)}
                      <Badge variant="outline">{error.method}</Badge>
                      <span className="font-mono text-sm">{error.endpoint}</span>
                      {getStatusBadge(error.resolved)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(error.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <CardDescription className="text-red-600 font-medium">
                    {error.errorMessage}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Error Count</p>
                      <p className="text-2xl font-bold text-red-600">{error.count}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status Code</p>
                      <p className="text-lg font-semibold">{error.statusCode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Error Type</p>
                      <p className="text-sm text-muted-foreground">{error.errorType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Affected Users</p>
                      <p className="text-lg font-semibold">{error.affectedUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((new Date(error.lastSeen).getTime() - new Date(error.firstSeen).getTime()) / (1000 * 60))} minutes
                      </p>
                    </div>
                  </div>
                  
                  {error.stackTrace && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Stack Trace</p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                        {error.stackTrace}
                      </pre>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-4">
                    {!error.resolved && (
                      <>
                        <Button size="sm">
                          Mark as Resolved
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign to Developer
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Trends</CardTitle>
                <CardDescription>Error frequency over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  [Error Trend Chart Would Go Here]
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Error Endpoints</CardTitle>
                <CardDescription>Endpoints with the most errors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/carriers</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={75} className="w-20" />
                    <span className="text-sm">47</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/auth/login</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={60} className="w-20" />
                    <span className="text-sm">156</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/rates/calculate</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={40} className="w-20" />
                    <span className="text-sm">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>
                Configure automatic alerts for API errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Critical Error Alert</h4>
                    <p className="text-sm text-muted-foreground">Triggers when critical errors occur</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">High Error Rate Alert</h4>
                    <p className="text-sm text-muted-foreground">Triggers when error rate exceeds 5%</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Service Downtime Alert</h4>
                    <p className="text-sm text-muted-foreground">Triggers on service unavailability</p>
                  </div>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIErrorTracker;