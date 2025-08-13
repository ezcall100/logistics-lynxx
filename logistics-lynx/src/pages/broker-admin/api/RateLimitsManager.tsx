import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  AlertTriangle, 
  Clock, 
  Globe, 
  Lock, 
  Plus, 
  RefreshCw, 
  Shield, 
  TrendingUp, 
  Zap 
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface RateLimit {
  id: string;
  name: string;
  endpoint: string;
  limit: number;
  window: string;
  current: number;
  resetTime: string;
  status: 'ok' | 'warning' | 'exceeded';
  clientType: 'api_key' | 'ip_address' | 'user';
  clientId: string;
  tier: 'basic' | 'premium' | 'enterprise';
}

interface RateLimitRule {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  tier: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  enabled: boolean;
  description: string;
}

const RateLimitsManager: React.FC = () => {
  const [showNewRuleDialog, setShowNewRuleDialog] = useState(false);

  const [rateLimits] = useState<RateLimit[]>([
    {
      id: '1',
      name: 'Load API - Basic Tier',
      endpoint: '/api/v1/loads',
      limit: 1000,
      window: '1 hour',
      current: 756,
      resetTime: '2024-01-15T11:00:00Z',
      status: 'warning',
      clientType: 'api_key',
      clientId: 'sk_prod_1234...cdef',
      tier: 'basic'
    },
    {
      id: '2',
      name: 'Tracking API - Premium',
      endpoint: '/api/v1/tracking',
      limit: 5000,
      window: '1 hour',
      current: 1234,
      resetTime: '2024-01-15T11:00:00Z',
      status: 'ok',
      clientType: 'api_key',
      clientId: 'sk_premium_5678...90ab',
      tier: 'premium'
    },
    {
      id: '3',
      name: 'Quote Generation',
      endpoint: '/api/v1/quotes',
      limit: 500,
      window: '1 hour',
      current: 489,
      resetTime: '2024-01-15T11:00:00Z',
      status: 'warning',
      clientType: 'user',
      clientId: 'user_12345',
      tier: 'basic'
    },
    {
      id: '4',
      name: 'Bulk Operations',
      endpoint: '/api/v1/bulk/*',
      limit: 100,
      window: '1 hour',
      current: 67,
      resetTime: '2024-01-15T11:00:00Z',
      status: 'ok',
      clientType: 'api_key',
      clientId: 'sk_enterprise_abcd...ef12',
      tier: 'enterprise'
    },
    {
      id: '5',
      name: 'IP Rate Limit',
      endpoint: 'All endpoints',
      limit: 10000,
      window: '1 hour',
      current: 10000,
      resetTime: '2024-01-15T11:00:00Z',
      status: 'exceeded',
      clientType: 'ip_address',
      clientId: '192.168.1.100',
      tier: 'basic'
    }
  ]);

  const [rateLimitRules] = useState<RateLimitRule[]>([
    {
      id: '1',
      name: 'Basic Tier - Load Operations',
      endpoint: '/api/v1/loads',
      method: 'GET',
      tier: 'basic',
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 100,
      enabled: true,
      description: 'Standard rate limits for load-related API calls'
    },
    {
      id: '2',
      name: 'Premium Tier - All Operations',
      endpoint: '/api/v1/*',
      method: 'ALL',
      tier: 'premium',
      requestsPerMinute: 300,
      requestsPerHour: 5000,
      requestsPerDay: 50000,
      burstLimit: 500,
      enabled: true,
      description: 'Enhanced limits for premium customers'
    },
    {
      id: '3',
      name: 'Write Operations Limit',
      endpoint: '/api/v1/*',
      method: 'POST,PUT,DELETE',
      tier: 'basic',
      requestsPerMinute: 20,
      requestsPerHour: 200,
      requestsPerDay: 1000,
      burstLimit: 50,
      enabled: true,
      description: 'Stricter limits for data modification operations'
    },
    {
      id: '4',
      name: 'Enterprise Bulk Operations',
      endpoint: '/api/v1/bulk/*',
      method: 'ALL',
      tier: 'enterprise',
      requestsPerMinute: 10,
      requestsPerHour: 100,
      requestsPerDay: 500,
      burstLimit: 20,
      enabled: true,
      description: 'Controlled limits for bulk data operations'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: unknown, icon: React.ReactNode }> = {
      ok: { variant: "default", icon: <Shield className="h-3 w-3" /> },
      warning: { variant: "secondary", icon: <AlertTriangle className="h-3 w-3" /> },
      exceeded: { variant: "destructive", icon: <Lock className="h-3 w-3" /> }
    };
    const config = variants[status] || variants.ok;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const colors: Record<string, string> = {
      basic: 'bg-gray-100 text-gray-800',
      premium: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[tier]}>{tier.toUpperCase()}</Badge>;
  };

  const calculateUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalRequests = rateLimits.reduce((sum, limit) => sum + limit.current, 0);
  const exceededLimits = rateLimits.filter(limit => limit.status === 'exceeded').length;
  const warningLimits = rateLimits.filter(limit => limit.status === 'warning').length;

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rate Limits Manager</h1>
          <p className="text-muted-foreground">
            Monitor and configure API rate limiting policies and usage quotas
          </p>
        </div>
        <Dialog open={showNewRuleDialog} onOpenChange={setShowNewRuleDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Rate Limit Rule</DialogTitle>
              <DialogDescription>
                Define a new rate limiting rule for API endpoints.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" placeholder="e.g., Basic Tier Load Limits" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="endpoint">Endpoint Pattern</Label>
                  <Input id="endpoint" placeholder="/api/v1/loads" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">HTTP Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Methods</SelectItem>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="perMinute">Per Minute</Label>
                  <Input id="perMinute" type="number" placeholder="60" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="perHour">Per Hour</Label>
                  <Input id="perHour" type="number" placeholder="1000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="perDay">Per Day</Label>
                  <Input id="perDay" type="number" placeholder="10000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="burstLimit">Burst Limit</Label>
                  <Input id="burstLimit" type="number" placeholder="100" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewRuleDialog(false)}>
                Create Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exceeded Limits</CardTitle>
            <Lock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{exceededLimits}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningLimits}</div>
            <p className="text-xs text-muted-foreground">
              Near limit
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(rateLimits.reduce((sum, limit) => sum + calculateUsagePercentage(limit.current, limit.limit), 0) / rateLimits.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all limits
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">Current Usage</TabsTrigger>
          <TabsTrigger value="rules">Rate Limit Rules</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {rateLimits.map((limit) => {
              const usagePercentage = calculateUsagePercentage(limit.current, limit.limit);
              return (
                <Card key={limit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <CardTitle className="text-lg">{limit.name}</CardTitle>
                          <CardDescription className="font-mono">
                            {limit.endpoint}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTierBadge(limit.tier)}
                        {getStatusBadge(limit.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Usage</span>
                          <span className="text-sm text-muted-foreground">
                            {limit.current.toLocaleString()} / {limit.limit.toLocaleString()} ({limit.window})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getUsageColor(usagePercentage)}`}
                            style={{ width: `${usagePercentage}%` }}
                          />
                        </div>
                        <div className="text-right mt-1">
                          <span className={`text-sm font-semibold ${
                            usagePercentage >= 90 ? 'text-red-600' : 
                            usagePercentage >= 75 ? 'text-yellow-600' : 
                            'text-green-600'
                          }`}>
                            {usagePercentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Client Type:</span>
                          <span className="ml-2 font-medium capitalize">{limit.clientType.replace('_', ' ')}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Client ID:</span>
                          <span className="ml-2 font-mono text-xs">{limit.clientId}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Resets:</span>
                          <span className="ml-2 font-medium">
                            {new Date(limit.resetTime).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {limit.status === 'exceeded' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-red-800">
                              Rate limit exceeded - Requests are being throttled
                            </span>
                            <Button size="sm" variant="outline">
                              Increase Limit
                            </Button>
                          </div>
                        </div>
                      )}

                      {limit.status === 'warning' && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-800">
                              Approaching rate limit - Consider optimizing usage
                            </span>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {rateLimitRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <CardDescription>
                        {rule.endpoint} • {rule.method}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTierBadge(rule.tier)}
                      <Switch checked={rule.enabled} />
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 border rounded">
                        <div className="text-2xl font-bold">{rule.requestsPerMinute}</div>
                        <div className="text-sm text-muted-foreground">Per Minute</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-2xl font-bold">{rule.requestsPerHour.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Per Hour</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-2xl font-bold">{rule.requestsPerDay.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Per Day</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-2xl font-bold">{rule.burstLimit}</div>
                        <div className="text-sm text-muted-foreground">Burst Limit</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={`ml-2 ${rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {rule.enabled ? 'Active' : 'Disabled'}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applies to:</span>
                        <span className="ml-2 font-medium">{rule.tier} tier customers</span>
                      </div>
                    </div>
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
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>API usage patterns over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  [Usage Trend Chart Would Go Here]
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Rate Limited Endpoints</CardTitle>
                <CardDescription>Endpoints hitting limits most frequently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/loads</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={85} className="w-20" />
                    <span className="text-sm">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/quotes</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={78} className="w-20" />
                    <span className="text-sm">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">/api/v1/tracking</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-20" />
                    <span className="text-sm">45%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limit Violations</CardTitle>
              <CardDescription>Recent violations and blocked requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-mono text-sm">/api/v1/loads</div>
                    <div className="text-xs text-muted-foreground">IP: 192.168.1.100</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">234 blocked requests</div>
                    <div className="text-xs text-muted-foreground">Last 1 hour</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-mono text-sm">/api/v1/quotes</div>
                    <div className="text-xs text-muted-foreground">API Key: sk_prod_1234...cdef</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">45 blocked requests</div>
                    <div className="text-xs text-muted-foreground">Last 1 hour</div>
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

export default RateLimitsManager;