import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Link, 
  Unlink, 
  RefreshCw, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Users,
  Truck,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const CarrierRateIntegration = () => {
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('');

  const integrations = [
    {
      id: 1,
      carrierName: 'ABC Logistics',
      carrierType: 'Large Fleet',
      apiStatus: 'connected',
      lastSync: '2024-01-15 10:30',
      ratesReceived: 145,
      autoUpdate: true,
      syncFrequency: 'real-time',
      connectionHealth: 98,
      avgResponseTime: '250ms'
    },
    {
      id: 2,
      carrierName: 'Express Carriers',
      carrierType: 'Regional',
      apiStatus: 'connected',
      lastSync: '2024-01-15 09:45',
      ratesReceived: 89,
      autoUpdate: true,
      syncFrequency: 'hourly',
      connectionHealth: 95,
      avgResponseTime: '180ms'
    },
    {
      id: 3,
      carrierName: 'Owner Op Network',
      carrierType: 'Owner Operators',
      apiStatus: 'pending',
      lastSync: 'Never',
      ratesReceived: 0,
      autoUpdate: false,
      syncFrequency: 'manual',
      connectionHealth: 0,
      avgResponseTime: 'N/A'
    },
    {
      id: 4,
      carrierName: 'Swift Transportation',
      carrierType: 'Large Fleet',
      apiStatus: 'error',
      lastSync: '2024-01-14 16:20',
      ratesReceived: 203,
      autoUpdate: false,
      syncFrequency: 'daily',
      connectionHealth: 45,
      avgResponseTime: '850ms'
    }
  ];

  const carrierPortals = [
    {
      id: 1,
      name: 'ABC Logistics Portal',
      url: 'https://rates.abclogistics.com',
      status: 'active',
      lastAccess: '2024-01-15',
      ratesShared: 145,
      portalType: 'API + Portal'
    },
    {
      id: 2,
      name: 'Express Carrier Hub',
      url: 'https://hub.expresscarriers.com',
      status: 'active',
      lastAccess: '2024-01-15',
      ratesShared: 89,
      portalType: 'Portal Only'
    },
    {
      id: 3,
      name: 'Owner Operator Network',
      url: 'https://network.ownerops.com',
      status: 'maintenance',
      lastAccess: '2024-01-13',
      ratesShared: 34,
      portalType: 'Integrated Platform'
    }
  ];

  const ownerOperators = [
    {
      id: 1,
      name: 'John Smith Trucking',
      location: 'Dallas, TX',
      vehicleType: 'Dry Van',
      fleetSize: 1,
      rating: 4.9,
      totalLoads: 156,
      avgRate: 3100,
      lastActive: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Maria Rodriguez Transport',
      location: 'Phoenix, AZ',
      vehicleType: 'Flatbed',
      fleetSize: 2,
      rating: 4.7,
      totalLoads: 89,
      avgRate: 3350,
      lastActive: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Johnson Hauling',
      location: 'Atlanta, GA',
      vehicleType: 'Refrigerated',
      fleetSize: 1,
      rating: 4.8,
      totalLoads: 203,
      avgRate: 3800,
      lastActive: '2024-01-12',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'error':
      case 'maintenance':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
      case 'maintenance':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Carrier Rate Integration</h1>
            <p className="text-muted-foreground">
              Manage carrier connections, owner operators, and rate synchronization
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
            <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Carrier Integration</DialogTitle>
                  <DialogDescription>
                    Connect with a new carrier or owner operator for rate sharing
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Carrier Name</label>
                      <Input placeholder="Enter carrier name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Carrier Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="large-fleet">Large Fleet</SelectItem>
                          <SelectItem value="regional">Regional Carrier</SelectItem>
                          <SelectItem value="owner-operator">Owner Operator</SelectItem>
                          <SelectItem value="specialized">Specialized</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Endpoint</label>
                    <Input placeholder="https://api.carrier.com/rates" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">API Key</label>
                      <Input type="password" placeholder="Enter API key" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Sync Frequency</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-time">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddIntegrationOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Test & Connect</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Connected Carriers</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Link className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+2 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner Operators</p>
                  <p className="text-2xl font-bold">34</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+5 new partnerships</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rates Synced Today</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <RefreshCw className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Real-time updates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Connection Health</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrations">API Integrations</TabsTrigger>
            <TabsTrigger value="portals">Carrier Portals</TabsTrigger>
            <TabsTrigger value="owner-ops">Owner Operators</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Integrations</CardTitle>
                <CardDescription>Manage carrier API connections and rate synchronization</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Rates</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Auto Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {integrations.map((integration) => (
                      <TableRow key={integration.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{integration.carrierName}</div>
                            <div className="text-sm text-muted-foreground">{integration.carrierType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {integration.carrierType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(integration.apiStatus)}
                            <Badge variant="outline" className={getStatusColor(integration.apiStatus)}>
                              {integration.apiStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{integration.lastSync}</div>
                            <div className="text-xs text-muted-foreground">{integration.syncFrequency}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{integration.ratesReceived}</div>
                          <div className="text-sm text-muted-foreground">rates</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{integration.connectionHealth}%</span>
                            </div>
                            <Progress value={integration.connectionHealth} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {integration.avgResponseTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch checked={integration.autoUpdate} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
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

          <TabsContent value="portals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carrier Portals</CardTitle>
                <CardDescription>Integrated carrier portals and dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Portal Name</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Access</TableHead>
                      <TableHead>Rates Shared</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carrierPortals.map((portal) => (
                      <TableRow key={portal.id}>
                        <TableCell className="font-medium">{portal.name}</TableCell>
                        <TableCell>
                          <a href={portal.url} className="text-blue-600 hover:underline text-sm">
                            {portal.url}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(portal.status)}
                            <Badge variant="outline" className={getStatusColor(portal.status)}>
                              {portal.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{portal.portalType}</Badge>
                        </TableCell>
                        <TableCell>{portal.lastAccess}</TableCell>
                        <TableCell>{portal.ratesShared}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Link className="h-4 w-4" />
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

          <TabsContent value="owner-ops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Owner Operators</CardTitle>
                <CardDescription>Small carriers and independent owner operators</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Fleet Size</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Total Loads</TableHead>
                      <TableHead>Avg Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ownerOperators.map((op) => (
                      <TableRow key={op.id}>
                        <TableCell className="font-medium">{op.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {op.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            {op.vehicleType}
                          </div>
                        </TableCell>
                        <TableCell>{op.fleetSize} truck{op.fleetSize > 1 ? 's' : ''}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{op.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < Math.floor(op.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{op.totalLoads}</TableCell>
                        <TableCell>${op.avgRate.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(op.status)}>
                            {op.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <DollarSign className="h-4 w-4" />
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default CarrierRateIntegration;