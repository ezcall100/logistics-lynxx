import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Globe, 
  Plus, 
  RefreshCw, 
  Send, 
  Settings, 
  Webhook, 
  XCircle 
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'failed';
  events: string[];
  secret: string;
  lastTriggered: string;
  totalCalls: number;
  successRate: number;
  avgResponseTime: number;
  retryAttempts: number;
  description: string;
  headers: Record<string, string>;
  timeout: number;
}

interface WebhookLog {
  id: string;
  webhookId: string;
  event: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  responseCode: number;
  responseTime: number;
  payload: unknown;
  error?: string;
}

const WebhooksManager: React.FC = () => {
  const { toast } = useToast();
  const [showNewWebhookDialog, setShowNewWebhookDialog] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookEndpoint | null>(null);

  const [webhookEndpoints] = useState<WebhookEndpoint[]>([
    {
      id: '1',
      name: 'Load Status Updates',
      url: 'https://partner.example.com/webhooks/load-status',
      status: 'active',
      events: ['load.created', 'load.updated', 'load.delivered'],
      secret: 'whsec_1234567890abcdef',
      lastTriggered: '2024-01-15T10:30:00Z',
      totalCalls: 12547,
      successRate: 98.5,
      avgResponseTime: 245,
      retryAttempts: 3,
      description: 'Notify partner system of load status changes',
      headers: { 'Authorization': 'Bearer token123', 'Content-Type': 'application/json' },
      timeout: 30
    },
    {
      id: '2',
      name: 'Invoice Generation',
      url: 'https://accounting.example.com/api/webhooks/invoices',
      status: 'active',
      events: ['load.delivered', 'invoice.created'],
      secret: 'whsec_abcdef1234567890',
      lastTriggered: '2024-01-15T09:15:00Z',
      totalCalls: 3421,
      successRate: 99.2,
      avgResponseTime: 189,
      retryAttempts: 3,
      description: 'Automatically generate invoices when loads are delivered',
      headers: { 'X-API-Key': 'key789', 'Content-Type': 'application/json' },
      timeout: 30
    },
    {
      id: '3',
      name: 'Carrier Notifications',
      url: 'https://carrier-portal.example.com/notifications',
      status: 'failed',
      events: ['load.assigned', 'load.pickup', 'load.delivery'],
      secret: 'whsec_fedcba0987654321',
      lastTriggered: '2024-01-14T16:45:00Z',
      totalCalls: 8934,
      successRate: 87.3,
      avgResponseTime: 567,
      retryAttempts: 5,
      description: 'Send real-time notifications to carrier systems',
      headers: { 'Authorization': 'Bearer carrier456', 'Content-Type': 'application/json' },
      timeout: 45
    },
    {
      id: '4',
      name: 'Customer Tracking',
      url: 'https://customer.example.com/tracking/webhook',
      status: 'inactive',
      events: ['tracking.updated', 'delivery.confirmed'],
      secret: 'whsec_987654321fedcba',
      lastTriggered: '2024-01-10T12:00:00Z',
      totalCalls: 5678,
      successRate: 95.8,
      avgResponseTime: 123,
      retryAttempts: 2,
      description: 'Provide real-time tracking updates to customers',
      headers: { 'X-Customer-Key': 'cust123', 'Content-Type': 'application/json' },
      timeout: 20
    }
  ]);

  const [webhookLogs] = useState<WebhookLog[]>([
    {
      id: '1',
      webhookId: '1',
      event: 'load.delivered',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'success',
      responseCode: 200,
      responseTime: 234,
      payload: { loadId: 'L12345', status: 'delivered', timestamp: '2024-01-15T10:30:00Z' }
    },
    {
      id: '2',
      webhookId: '2',
      event: 'invoice.created',
      timestamp: '2024-01-15T10:25:00Z',
      status: 'success',
      responseCode: 201,
      responseTime: 156,
      payload: { invoiceId: 'INV-5678', loadId: 'L12345', amount: 2500 }
    },
    {
      id: '3',
      webhookId: '3',
      event: 'load.assigned',
      timestamp: '2024-01-15T10:20:00Z',
      status: 'failed',
      responseCode: 500,
      responseTime: 1200,
      payload: { loadId: 'L67890', carrierId: 'C123' },
      error: 'Internal server error'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: unknown, icon: React.ReactNode }> = {
      active: { variant: "default", icon: <CheckCircle className="h-3 w-3" /> },
      inactive: { variant: "secondary", icon: <Clock className="h-3 w-3" /> },
      failed: { variant: "destructive", icon: <XCircle className="h-3 w-3" /> }
    };
    const config = variants[status] || variants.inactive;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getLogStatusBadge = (status: string) => {
    const variants: Record<string, unknown> = {
      success: "default",
      failed: "destructive",
      pending: "secondary"
    };
    return <Badge variant={variants[status] || "outline"}>{status.toUpperCase()}</Badge>;
  };

  const testWebhook = (webhookId: string) => {
    toast({
      title: "Testing Webhook",
      description: "Sending test payload to webhook endpoint...",
    });
  };

  const activeWebhooks = webhookEndpoints.filter(w => w.status === 'active');
  const totalCalls = webhookEndpoints.reduce((sum, w) => sum + w.totalCalls, 0);
  const avgSuccessRate = webhookEndpoints.reduce((sum, w) => sum + w.successRate, 0) / webhookEndpoints.length;

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhooks Manager</h1>
          <p className="text-muted-foreground">
            Configure and monitor webhook endpoints for real-time event notifications
          </p>
        </div>
        <Dialog open={showNewWebhookDialog} onOpenChange={setShowNewWebhookDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Webhook</DialogTitle>
              <DialogDescription>
                Configure a new webhook endpoint to receive real-time event notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="webhookName">Webhook Name</Label>
                <Input id="webhookName" placeholder="e.g., Load Status Updates" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="webhookUrl">Endpoint URL</Label>
                <Input id="webhookUrl" placeholder="https://your-domain.com/webhook" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="events">Events to Subscribe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="load.created">Load Created</SelectItem>
                    <SelectItem value="load.updated">Load Updated</SelectItem>
                    <SelectItem value="load.delivered">Load Delivered</SelectItem>
                    <SelectItem value="invoice.created">Invoice Created</SelectItem>
                    <SelectItem value="tracking.updated">Tracking Updated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input id="timeout" type="number" placeholder="30" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="retries">Retry Attempts</Label>
                  <Input id="retries" type="number" placeholder="3" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secret">Webhook Secret</Label>
                <Input id="secret" placeholder="whsec_..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the purpose of this webhook..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewWebhookDialog(false)}>
                Create Webhook
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Webhooks</CardTitle>
            <Webhook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWebhooks.length}</div>
            <p className="text-xs text-muted-foreground">
              Out of {webhookEndpoints.length} total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time webhook calls
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average across all webhooks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Today</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList>
          <TabsTrigger value="endpoints">Webhook Endpoints</TabsTrigger>
          <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
          <TabsTrigger value="events">Event Types</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="grid gap-4">
            {webhookEndpoints.map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Webhook className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-lg">{webhook.name}</CardTitle>
                        <CardDescription className="font-mono text-sm">
                          {webhook.url}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(webhook.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => testWebhook(webhook.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Test Webhook
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry Failed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
                      <p className="text-lg font-bold">{webhook.totalCalls.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <p className="text-lg font-bold">{webhook.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                      <p className="text-lg font-bold">{webhook.avgResponseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Retry Attempts</p>
                      <p className="text-lg font-bold">{webhook.retryAttempts}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Triggered</p>
                      <p className="text-sm">
                        {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Subscribed Events</h4>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event, index) => (
                          <Badge key={index} variant="outline">{event}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Configuration</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Timeout:</span>
                          <span className="ml-2 font-medium">{webhook.timeout}s</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Secret:</span>
                          <span className="ml-2 font-mono">{webhook.secret.substring(0, 12)}...</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Active:</span>
                          <Switch className="ml-2" checked={webhook.status === 'active'} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{webhook.description}</p>
                    </div>
                  </div>

                  {webhook.status === 'failed' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-800">
                          Webhook is failing - Last error: Connection timeout
                        </span>
                        <Button size="sm" variant="outline">
                          Retry Now
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Webhook Deliveries</CardTitle>
              <CardDescription>
                View recent webhook delivery attempts and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhookLogs.map((log) => {
                  const webhook = webhookEndpoints.find(w => w.id === log.webhookId);
                  return (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{log.event}</Badge>
                          {getLogStatusBadge(log.status)}
                          <span className="text-sm font-medium">{webhook?.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="block font-medium">Response Code</span>
                          <span className={log.responseCode >= 200 && log.responseCode < 300 ? 'text-green-600' : 'text-red-600'}>
                            {log.responseCode}
                          </span>
                        </div>
                        <div>
                          <span className="block font-medium">Response Time</span>
                          <span className={log.responseTime > 1000 ? 'text-red-600' : 'text-green-600'}>
                            {log.responseTime}ms
                          </span>
                        </div>
                        <div>
                          <span className="block font-medium">Webhook URL</span>
                          <span className="font-mono">{webhook?.url}</span>
                        </div>
                        <div>
                          <span className="block font-medium">Payload Size</span>
                          <span>{JSON.stringify(log.payload).length} bytes</span>
                        </div>
                      </div>
                      {log.error && (
                        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                          <strong>Error:</strong> {log.error}
                        </div>
                      )}
                      <div className="mt-3">
                        <details className="text-xs">
                          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                            View Payload
                          </summary>
                          <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </details>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Event Types</CardTitle>
              <CardDescription>
                Configure which events trigger webhook notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Load Events</h4>
                  <div className="space-y-2">
                    {[
                      { event: 'load.created', description: 'When a new load is created' },
                      { event: 'load.updated', description: 'When load details are modified' },
                      { event: 'load.assigned', description: 'When a load is assigned to a carrier' },
                      { event: 'load.pickup', description: 'When pickup is confirmed' },
                      { event: 'load.delivered', description: 'When delivery is completed' }
                    ].map((item) => (
                      <div key={item.event} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-mono text-sm">{item.event}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Invoice Events</h4>
                  <div className="space-y-2">
                    {[
                      { event: 'invoice.created', description: 'When an invoice is generated' },
                      { event: 'invoice.sent', description: 'When an invoice is sent to customer' },
                      { event: 'invoice.paid', description: 'When payment is received' }
                    ].map((item) => (
                      <div key={item.event} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-mono text-sm">{item.event}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tracking Events</h4>
                  <div className="space-y-2">
                    {[
                      { event: 'tracking.updated', description: 'When tracking information is updated' },
                      { event: 'delivery.confirmed', description: 'When delivery is confirmed by recipient' }
                    ].map((item) => (
                      <div key={item.event} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-mono text-sm">{item.event}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
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

export default WebhooksManager;