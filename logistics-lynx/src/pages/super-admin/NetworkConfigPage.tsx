import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Network, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Wifi,
  WifiOff,
  Shield,
  Globe,
  Server,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react';

const NetworkConfigPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [networkStats, setNetworkStats] = useState({
    totalConnections: 1247,
    activeConnections: 892,
    bandwidthUsed: 45.2,
    bandwidthTotal: 100,
    latency: 12.5,
    packetLoss: 0.02,
    uptime: 99.98
  });

  const [endpoints, setEndpoints] = useState([
    { id: 1, name: 'API Gateway', url: 'https://api.transbot.ai', status: 'healthy', latency: '8ms', requests: 1247 },
    { id: 2, name: 'WebSocket Server', url: 'wss://ws.transbot.ai', status: 'healthy', latency: '12ms', requests: 892 },
    { id: 3, name: 'File Storage', url: 'https://storage.transbot.ai', status: 'warning', latency: '45ms', requests: 234 },
    { id: 4, name: 'Analytics API', url: 'https://analytics.transbot.ai', status: 'healthy', latency: '15ms', requests: 567 },
    { id: 5, name: 'Payment Gateway', url: 'https://payments.transbot.ai', status: 'healthy', latency: '22ms', requests: 123 }
  ]);

  const [firewallRules, setFirewallRules] = useState([
    { id: 1, name: 'Allow HTTPS Traffic', protocol: 'HTTPS', port: '443', action: 'allow', status: 'active' },
    { id: 2, name: 'Block Suspicious IPs', protocol: 'ALL', port: 'ALL', action: 'block', status: 'active' },
    { id: 3, name: 'Rate Limiting', protocol: 'HTTP', port: '80', action: 'limit', status: 'active' },
    { id: 4, name: 'Database Access', protocol: 'TCP', port: '5432', action: 'allow', status: 'inactive' }
  ]);

  const [sslCertificates, setSslCertificates] = useState([
    { domain: 'transbot.ai', issuer: 'Let\'s Encrypt', expires: '2024-03-15', status: 'valid' },
    { domain: 'api.transbot.ai', issuer: 'DigiCert', expires: '2024-06-20', status: 'valid' },
    { domain: 'admin.transbot.ai', issuer: 'Let\'s Encrypt', expires: '2024-02-28', status: 'expiring' }
  ]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddEndpoint = () => {
    // Add endpoint logic
    console.log('Adding new endpoint...');
  };

  const handleAddFirewallRule = () => {
    // Add firewall rule logic
    console.log('Adding new firewall rule...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Network Configuration</h1>
          <p className="text-muted-foreground">Manage network settings and monitor connectivity</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleAddEndpoint} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Endpoint
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.totalConnections}</div>
            <p className="text-xs text-muted-foreground">Active network connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.bandwidthUsed}%</div>
            <p className="text-xs text-muted-foreground">
              {networkStats.bandwidthUsed} GB of {networkStats.bandwidthTotal} GB
            </p>
            <Progress value={networkStats.bandwidthUsed} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.latency}ms</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.uptime}%</div>
            <p className="text-xs text-muted-foreground">System availability</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="firewall">Firewall Rules</TabsTrigger>
          <TabsTrigger value="ssl">SSL Certificates</TabsTrigger>
          <TabsTrigger value="monitoring">Network Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Monitor API endpoint health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Requests/min</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell className="font-medium">{endpoint.name}</TableCell>
                      <TableCell className="font-mono text-sm">{endpoint.url}</TableCell>
                      <TableCell>
                        <Badge variant={endpoint.status === 'healthy' ? 'default' : 'destructive'}>
                          {endpoint.status === 'healthy' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {endpoint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{endpoint.latency}</TableCell>
                      <TableCell>{endpoint.requests.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Activity className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
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

        <TabsContent value="firewall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firewall Rules</CardTitle>
              <CardDescription>Manage network security and access control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Switch id="firewall-enabled" defaultChecked />
                  <Label htmlFor="firewall-enabled">Firewall Enabled</Label>
                </div>
                <Button onClick={handleAddFirewallRule} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Port</TableHead>
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
                      <TableCell>
                        <Badge variant={rule.action === 'allow' ? 'default' : 'destructive'}>
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="ssl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificates</CardTitle>
              <CardDescription>Monitor SSL certificate status and expiration</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sslCertificates.map((cert) => (
                    <TableRow key={cert.domain}>
                      <TableCell className="font-medium">{cert.domain}</TableCell>
                      <TableCell>{cert.issuer}</TableCell>
                      <TableCell>{cert.expires}</TableCell>
                      <TableCell>
                        <Badge variant={cert.status === 'valid' ? 'default' : 'destructive'}>
                          {cert.status === 'valid' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-3 w-3" />
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
          <Card>
            <CardHeader>
              <CardTitle>Network Monitoring</CardTitle>
              <CardDescription>Real-time network performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Bandwidth Usage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Download</span>
                      <span>45.2 MB/s</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Upload</span>
                      <span>12.8 MB/s</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Connection Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Connections</span>
                      <Badge variant="default">{networkStats.activeConnections}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Packet Loss</span>
                      <Badge variant="secondary">{networkStats.packetLoss}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Latency</span>
                      <Badge variant="outline">{networkStats.latency}ms</Badge>
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

export default NetworkConfigPage;
