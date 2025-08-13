import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plug, 
  Key, 
  Webhook, 
  Shield, 
  Activity, 
  Plus,
  Copy,
  RotateCcw,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Globe,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiAndEdiSettings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      keyType: 'full',
      scope: ['read', 'write', 'delete'],
      createdBy: 'John Wilson',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-15 10:30 AM',
      expiresAt: '2025-01-15',
      status: 'active',
      requestCount: 15420,
      rateLimit: '1000/hour'
    },
    {
      id: '2',
      name: 'Mobile App Integration',
      keyType: 'limited',
      scope: ['read', 'write'],
      createdBy: 'Sarah Chen',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-15 09:15 AM',
      expiresAt: '2024-07-10',
      status: 'active',
      requestCount: 8765,
      rateLimit: '500/hour'
    },
    {
      id: '3',
      name: 'Partner Integration',
      keyType: 'partner',
      scope: ['read'],
      createdBy: 'Marcus Rodriguez',
      createdAt: '2023-12-01',
      lastUsed: '2024-01-14 04:22 PM',
      expiresAt: '2024-12-01',
      status: 'active',
      requestCount: 3421,
      rateLimit: '200/hour'
    },
    {
      id: '4',
      name: 'Testing Environment',
      keyType: 'testing',
      scope: ['read', 'write'],
      createdBy: 'Jennifer Wu',
      createdAt: '2024-01-08',
      lastUsed: 'Never',
      expiresAt: '2024-04-08',
      status: 'inactive',
      requestCount: 0,
      rateLimit: '100/hour'
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      name: 'Order Processing Webhook',
      url: 'https://api.partner.com/webhooks/orders',
      events: ['order.created', 'order.updated', 'order.completed'],
      status: 'active',
      lastTriggered: '2024-01-15 10:45 AM',
      successRate: 98.5,
      retryPolicy: 'exponential'
    },
    {
      id: '2',
      name: 'Payment Status Updates',
      url: 'https://payments.example.com/notify',
      events: ['payment.succeeded', 'payment.failed'],
      status: 'active',
      lastTriggered: '2024-01-15 09:20 AM',
      successRate: 99.2,
      retryPolicy: 'linear'
    },
    {
      id: '3',
      name: 'User Registration Hook',
      url: 'https://crm.company.com/users/webhook',
      events: ['user.created', 'user.updated'],
      status: 'paused',
      lastTriggered: '2024-01-12 03:15 PM',
      successRate: 85.1,
      retryPolicy: 'none'
    }
  ]);

  const [ediSettings, setEdiSettings] = useState({
    protocol: 'AS2',
    encryption: 'AES-256',
    compression: true,
    acknowledgmentRequired: true,
    retryAttempts: '3',
    timeoutMinutes: '30',
    tradingPartnerCertificates: true
  });

  const [ipRestrictions, setIpRestrictions] = useState([
    { id: '1', name: 'Office Network', ipRange: '192.168.1.0/24', description: 'Main office IP range' },
    { id: '2', name: 'AWS Production', ipRange: '10.0.0.0/16', description: 'Production server IPs' },
    { id: '3', name: 'Development VPN', ipRange: '172.16.0.0/12', description: 'Development team VPN' }
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'API & EDI settings saved',
        description: 'All integration settings have been updated successfully.',
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'inactive': 'secondary',
      'paused': 'outline',
      'expired': 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const getScopeBadges = (scope: string[]) => {
    return scope.map((permission) => (
      <Badge key={permission} variant="secondary" className="text-xs">
        {permission}
      </Badge>
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'API key has been copied to your clipboard.',
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="edi" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            EDI Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Key Management
                </CardTitle>
                <CardDescription>
                  Create and manage API keys for system integrations
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Rate Limit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{key.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Created: {key.createdAt} by {key.createdBy}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last used: {key.lastUsed}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{key.keyType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getScopeBadges(key.scope)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{key.requestCount.toLocaleString()}</p>
                          <p className="text-muted-foreground">requests</p>
                        </div>
                      </TableCell>
                      <TableCell>{key.rateLimit}</TableCell>
                      <TableCell>
                        {getStatusBadge(key.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard('sk_test_4eC39HqLyjWDarjtT1zdp7dc')}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* API Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">27.6K</p>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Key className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Active Keys</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">98.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Rate Limit Hits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhook Configuration
                </CardTitle>
                <CardDescription>
                  Manage webhook endpoints and event subscriptions
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Webhook Name</TableHead>
                    <TableHead>Endpoint URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{webhook.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Last triggered: {webhook.lastTriggered}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{webhook.url}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="secondary" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            webhook.successRate > 95 ? 'bg-green-500' :
                            webhook.successRate > 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          {webhook.successRate}%
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(webhook.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Activity className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        {/* EDI Settings Tab */}
        <TabsContent value="edi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5" />
                EDI Configuration
              </CardTitle>
              <CardDescription>
                Configure Electronic Data Interchange settings and protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Protocol Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="protocol">EDI Protocol</Label>
                    <Select value={ediSettings.protocol} onValueChange={(value) => setEdiSettings(prev => ({ ...prev, protocol: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AS2">AS2</SelectItem>
                        <SelectItem value="SFTP">SFTP</SelectItem>
                        <SelectItem value="HTTPS">HTTPS</SelectItem>
                        <SelectItem value="FTP">FTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="encryption">Encryption Method</Label>
                    <Select value={ediSettings.encryption} onValueChange={(value) => setEdiSettings(prev => ({ ...prev, encryption: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AES-256">AES-256</SelectItem>
                        <SelectItem value="AES-128">AES-128</SelectItem>
                        <SelectItem value="3DES">3DES</SelectItem>
                        <SelectItem value="RSA">RSA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Transmission Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Select value={ediSettings.retryAttempts} onValueChange={(value) => setEdiSettings(prev => ({ ...prev, retryAttempts: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (minutes)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      min="5"
                      max="120"
                      value={ediSettings.timeoutMinutes}
                      onChange={(e) => setEdiSettings(prev => ({ ...prev, timeoutMinutes: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Advanced Options</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Compression</Label>
                      <p className="text-sm text-muted-foreground">
                        Compress EDI documents before transmission
                      </p>
                    </div>
                    <Switch
                      checked={ediSettings.compression}
                      onCheckedChange={(checked) => setEdiSettings(prev => ({ ...prev, compression: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Acknowledgment</Label>
                      <p className="text-sm text-muted-foreground">
                        Require MDN/acknowledgment receipts
                      </p>
                    </div>
                    <Switch
                      checked={ediSettings.acknowledgmentRequired}
                      onCheckedChange={(checked) => setEdiSettings(prev => ({ ...prev, acknowledgmentRequired: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Trading Partner Certificates</Label>
                      <p className="text-sm text-muted-foreground">
                        Validate trading partner certificates
                      </p>
                    </div>
                    <Switch
                      checked={ediSettings.tradingPartnerCertificates}
                      onCheckedChange={(checked) => setEdiSettings(prev => ({ ...prev, tradingPartnerCertificates: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                IP Restrictions
              </CardTitle>
              <CardDescription>
                Restrict API access to specific IP addresses and ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>IP Range</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipRestrictions.map((restriction) => (
                    <TableRow key={restriction.id}>
                      <TableCell className="font-medium">{restriction.name}</TableCell>
                      <TableCell className="font-mono">{restriction.ipRange}</TableCell>
                      <TableCell>{restriction.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add IP Restriction
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Security Settings</CardTitle>
              <CardDescription>
                Configure additional security measures for API access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require HTTPS</Label>
                    <p className="text-sm text-muted-foreground">
                      Force all API requests to use HTTPS
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Request Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all API requests for security auditing
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Webhook Signature Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Verify webhook signatures for security
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable rate limiting to prevent abuse
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            Export Configuration
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiAndEdiSettings;