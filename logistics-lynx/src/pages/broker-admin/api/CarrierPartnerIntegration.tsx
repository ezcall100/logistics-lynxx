/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Link, 
  Link2,
  Plus, 
  RefreshCw, 
  Settings, 
  Truck, 
  User,
  XCircle 
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CarrierPartner {
  id: string;
  carrierName: string;
  businessName?: string; // For owner operators
  operatorName?: string; // For owner operators
  mcNumber: string;
  dotNumber: string;
  status: 'connected' | 'active' | 'pending' | 'failed' | 'inactive' | 'suspended';
  partnerType: 'large_carrier' | 'owner_operator';
  integrationMode: 'api' | 'edi' | 'manual' | 'direct' | 'platform';
  connectionDate: string;
  lastSync?: string;
  lastActivity: string;
  totalLoads: number;
  activeLoads: number;
  completedLoads?: number;
  totalRevenue: number;
  rating?: number;
  syncFrequency?: string;
  fleetSize: number;
  equipmentType: string[];
  preferredLanes: string[];
  dataExchange: {
    loads: boolean;
    tracking: boolean;
    rates?: boolean;
    financial?: boolean;
    documents: boolean;
  };
  apiEndpoint?: string;
  webhookUrl?: string;
  apiAccess: boolean;
}

const CarrierPartnerIntegration: React.FC = () => {
  const { toast } = useToast();
  const [showNewPartnerDialog, setShowNewPartnerDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<CarrierPartner | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [carrierPartners] = useState<CarrierPartner[]>([
    // Large Carriers
    {
      id: '1',
      carrierName: 'Swift Transportation',
      mcNumber: 'MC-138450',
      dotNumber: 'DOT-695803',
      status: 'connected',
      partnerType: 'large_carrier',
      integrationMode: 'api',
      connectionDate: '2024-01-01T00:00:00Z',
      lastSync: '2024-01-15T10:30:00Z',
      lastActivity: '2024-01-15T10:30:00Z',
      totalLoads: 1547,
      activeLoads: 23,
      totalRevenue: 2850000,
      fleetSize: 18000,
      syncFrequency: 'real-time',
      equipmentType: ['Dry Van', 'Refrigerated', 'Flatbed'],
      preferredLanes: ['National', 'Cross-Country'],
      dataExchange: {
        loads: true,
        tracking: true,
        rates: true,
        documents: true
      },
      apiEndpoint: 'https://api.swift.com/v2',
      webhookUrl: 'https://our-api.com/webhooks/swift',
      apiAccess: true
    },
    {
      id: '2',
      carrierName: 'J.B. Hunt Transport',
      mcNumber: 'MC-14556',
      dotNumber: 'DOT-390181',
      status: 'connected',
      partnerType: 'large_carrier',
      integrationMode: 'edi',
      connectionDate: '2024-01-03T00:00:00Z',
      lastSync: '2024-01-15T10:15:00Z',
      lastActivity: '2024-01-15T10:15:00Z',
      totalLoads: 2341,
      activeLoads: 45,
      totalRevenue: 3400000,
      fleetSize: 12000,
      syncFrequency: 'hourly',
      equipmentType: ['Intermodal', 'Dedicated', 'Final Mile'],
      preferredLanes: ['Regional', 'Intermodal'],
      dataExchange: {
        loads: true,
        tracking: true,
        rates: false,
        documents: true
      },
      apiAccess: false
    },
    // Owner Operators
    {
      id: '3',
      carrierName: 'Martinez Trucking LLC',
      operatorName: 'John Martinez',
      mcNumber: 'MC-987654',
      dotNumber: 'DOT-456789',
      status: 'active',
      partnerType: 'owner_operator',
      integrationMode: 'direct',
      connectionDate: '2024-01-01T00:00:00Z',
      lastActivity: '2024-01-15T10:30:00Z',
      totalLoads: 47,
      activeLoads: 3,
      completedLoads: 47,
      totalRevenue: 125000,
      rating: 4.8,
      fleetSize: 2,
      equipmentType: ['Dry Van', 'Refrigerated'],
      preferredLanes: ['TX-CA', 'FL-NY'],
      dataExchange: {
        loads: true,
        tracking: true,
        financial: true,
        documents: true
      },
      webhookUrl: 'https://martinez-trucking.com/webhooks/broker',
      apiAccess: true
    },
    {
      id: '4',
      carrierName: 'Johnson Express',
      operatorName: 'Sarah Johnson',
      mcNumber: 'MC-654321',
      dotNumber: 'DOT-123456',
      status: 'active',
      partnerType: 'owner_operator',
      integrationMode: 'platform',
      connectionDate: '2024-01-05T00:00:00Z',
      lastActivity: '2024-01-15T09:45:00Z',
      totalLoads: 32,
      activeLoads: 2,
      completedLoads: 32,
      totalRevenue: 89500,
      rating: 4.6,
      fleetSize: 1,
      equipmentType: ['Flatbed', 'Step Deck'],
      preferredLanes: ['CA-TX', 'WA-OR'],
      dataExchange: {
        loads: true,
        tracking: true,
        financial: false,
        documents: true
      },
      apiAccess: false
    },
    {
      id: '5',
      carrierName: 'Prime Logistics',
      mcNumber: 'MC-789123',
      dotNumber: 'DOT-543210',
      status: 'pending',
      partnerType: 'large_carrier',
      integrationMode: 'api',
      connectionDate: '2024-01-14T00:00:00Z',
      lastActivity: '',
      totalLoads: 0,
      activeLoads: 0,
      totalRevenue: 0,
      fleetSize: 500,
      syncFrequency: 'real-time',
      equipmentType: ['Dry Van'],
      preferredLanes: ['Regional'],
      dataExchange: {
        loads: false,
        tracking: false,
        rates: false,
        documents: false
      },
      apiEndpoint: 'https://api.primelogistics.com/v1',
      apiAccess: false
    },
    {
      id: '6',
      carrierName: 'Wang Logistics',
      operatorName: 'Lisa Wang',
      mcNumber: 'MC-777888',
      dotNumber: 'DOT-999000',
      status: 'suspended',
      partnerType: 'owner_operator',
      integrationMode: 'direct',
      connectionDate: '2023-12-15T00:00:00Z',
      lastActivity: '2024-01-10T14:20:00Z',
      totalLoads: 18,
      activeLoads: 0,
      completedLoads: 18,
      totalRevenue: 45200,
      rating: 3.9,
      fleetSize: 1,
      equipmentType: ['Refrigerated'],
      preferredLanes: ['CA-AZ'],
      dataExchange: {
        loads: true,
        tracking: false,
        financial: true,
        documents: false
      },
      apiAccess: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: unknown, icon: React.ReactNode }> = {
      connected: { variant: "default", icon: <CheckCircle className="h-3 w-3" /> },
      active: { variant: "default", icon: <CheckCircle className="h-3 w-3" /> },
      pending: { variant: "secondary", icon: <Clock className="h-3 w-3" /> },
      failed: { variant: "destructive", icon: <XCircle className="h-3 w-3" /> },
      inactive: { variant: "outline", icon: <Clock className="h-3 w-3" /> },
      suspended: { variant: "destructive", icon: <XCircle className="h-3 w-3" /> }
    };
    const config = variants[status] || variants.inactive;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPartnerTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      large_carrier: 'bg-blue-100 text-blue-800',
      owner_operator: 'bg-green-100 text-green-800'
    };
    return (
      <Badge className={colors[type]}>
        {type === 'large_carrier' ? 'Large Carrier' : 'Owner Operator'}
      </Badge>
    );
  };

  const getIntegrationModeIcon = (mode: string) => {
    const icons: Record<string, React.ReactNode> = {
      api: <Link className="h-4 w-4" />,
      edi: <Activity className="h-4 w-4" />,
      manual: <Settings className="h-4 w-4" />,
      direct: <Link2 className="h-4 w-4" />,
      platform: <Activity className="h-4 w-4" />
    };
    return icons[mode] || icons.manual;
  };

  const getFilteredPartners = () => {
    if (activeTab === 'carriers') {
      return carrierPartners.filter(p => p.partnerType === 'large_carrier');
    } else if (activeTab === 'operators') {
      return carrierPartners.filter(p => p.partnerType === 'owner_operator');
    }
    return carrierPartners;
  };

  const filteredPartners = getFilteredPartners();
  const activePartners = filteredPartners.filter(p => ['connected', 'active'].includes(p.status));
  const totalRevenue = activePartners.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalActiveLoads = activePartners.reduce((sum, p) => sum + p.activeLoads, 0);
  const totalCompletedLoads = activePartners.reduce((sum, p) => sum + (p.completedLoads || p.totalLoads), 0);
  const avgFleetSize = activePartners.reduce((sum, p) => sum + p.fleetSize, 0) / activePartners.length;

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carrier Partner Integration</h1>
          <p className="text-muted-foreground">
            Manage integrations with large carriers and owner-operators
          </p>
        </div>
        <Dialog open={showNewPartnerDialog} onOpenChange={setShowNewPartnerDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Carrier Partner</DialogTitle>
              <DialogDescription>
                Connect with a new carrier or owner-operator partner.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="partnerType">Partner Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="large_carrier">Large Carrier</SelectItem>
                    <SelectItem value="owner_operator">Owner Operator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="carrierName">Company Name</Label>
                <Input id="carrierName" placeholder="e.g., ABC Logistics" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operatorName">Owner/Operator Name (if applicable)</Label>
                <Input id="operatorName" placeholder="e.g., John Smith" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mcNumber">MC Number</Label>
                  <Input id="mcNumber" placeholder="MC-123456" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dotNumber">DOT Number</Label>
                  <Input id="dotNumber" placeholder="DOT-789012" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fleetSize">Fleet Size</Label>
                  <Input id="fleetSize" type="number" placeholder="5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="integrationType">Integration Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">API Integration</SelectItem>
                      <SelectItem value="edi">EDI Integration</SelectItem>
                      <SelectItem value="direct">Direct Connection</SelectItem>
                      <SelectItem value="platform">Platform Integration</SelectItem>
                      <SelectItem value="manual">Manual Process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apiEndpoint">API Endpoint (if applicable)</Label>
                <Input id="apiEndpoint" placeholder="https://api.partner.com/v1" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewPartnerDialog(false)}>
                Create Partnership
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePartners.length}</div>
            <p className="text-xs text-muted-foreground">
              {carrierPartners.filter(p => p.partnerType === 'large_carrier').length} carriers, {carrierPartners.filter(p => p.partnerType === 'owner_operator').length} owner ops
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveLoads}</div>
            <p className="text-xs text-muted-foreground">
              Currently in transit
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fleet Size</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgFleetSize || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Trucks per partner
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Partners</TabsTrigger>
          <TabsTrigger value="carriers">Large Carriers</TabsTrigger>
          <TabsTrigger value="operators">Owner Operators</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getIntegrationModeIcon(partner.integrationMode)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {partner.partnerType === 'owner_operator' ? partner.operatorName : partner.carrierName}
                        </CardTitle>
                        <CardDescription>
                          {partner.partnerType === 'owner_operator' ? partner.carrierName : `Fleet: ${partner.fleetSize.toLocaleString()} trucks`} • {partner.mcNumber} • {partner.dotNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPartnerTypeBadge(partner.partnerType)}
                      {getStatusBadge(partner.status)}
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Integration</p>
                      <p className="text-sm font-semibold capitalize">{partner.integrationMode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Activity</p>
                      <p className="text-sm font-semibold">
                        {partner.lastActivity ? new Date(partner.lastActivity).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                      <span className="text-lg font-bold">{partner.activeLoads}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {partner.partnerType === 'owner_operator' ? 'Completed' : 'Total'} Loads
                      </p>
                      <span className="text-lg font-bold">
                        {partner.partnerType === 'owner_operator' ? partner.completedLoads : partner.totalLoads}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <span className="text-lg font-bold">${(partner.totalRevenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {partner.partnerType === 'owner_operator' ? 'Rating' : 'Fleet Size'}
                      </p>
                      <span className="text-lg font-bold">
                        {partner.partnerType === 'owner_operator' ? 
                          (partner.rating ? `⭐ ${partner.rating}` : 'N/A') : 
                          `${partner.fleetSize} trucks`
                        }
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Equipment Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.equipmentType.map((type, index) => (
                          <Badge key={index} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Preferred Lanes</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.preferredLanes.map((lane, index) => (
                          <Badge key={index} variant="secondary">{lane}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Data Sharing Configuration</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch checked={partner.dataExchange.loads} />
                          <Label className="text-sm">Load Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={partner.dataExchange.tracking} />
                          <Label className="text-sm">Tracking</Label>
                        </div>
                        {partner.dataExchange.rates !== undefined && (
                          <div className="flex items-center space-x-2">
                            <Switch checked={partner.dataExchange.rates} />
                            <Label className="text-sm">Rate Data</Label>
                          </div>
                        )}
                        {partner.dataExchange.financial !== undefined && (
                          <div className="flex items-center space-x-2">
                            <Switch checked={partner.dataExchange.financial} />
                            <Label className="text-sm">Financial</Label>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Switch checked={partner.dataExchange.documents} />
                          <Label className="text-sm">Documents</Label>
                        </div>
                      </div>
                    </div>

                    {partner.apiAccess && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Link2 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800">
                            API access enabled - Real-time data synchronization active
                          </span>
                        </div>
                        {partner.webhookUrl && (
                          <p className="text-xs text-blue-700 mt-1 font-mono">
                            Webhook: {partner.webhookUrl}
                          </p>
                        )}
                      </div>
                    )}

                    {partner.status === 'suspended' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-800">
                            Partnership suspended due to compliance issues
                          </span>
                          <Button size="sm" variant="outline">
                            Review & Reactivate
                          </Button>
                        </div>
                      </div>
                    )}

                    {partner.status === 'pending' && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-yellow-800">
                            Partnership pending - Awaiting integration setup
                          </span>
                          <Button size="sm" variant="outline">
                            Complete Setup
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-4">
          <div className="grid gap-4">
            {carrierPartners.filter(p => p.partnerType === 'large_carrier').map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{partner.carrierName}</CardTitle>
                        <CardDescription>
                          Fleet: {partner.fleetSize.toLocaleString()} trucks • {partner.mcNumber} • {partner.dotNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(partner.status)}
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Integration Mode</p>
                      <p className="text-lg font-semibold capitalize">{partner.integrationMode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                      <p className="text-lg font-bold">{partner.activeLoads}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Loads</p>
                      <p className="text-lg font-bold">{partner.totalLoads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-lg font-bold">${(partner.totalRevenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operators" className="space-y-4">
          <div className="grid gap-4">
            {carrierPartners.filter(p => p.partnerType === 'owner_operator').map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{partner.operatorName}</CardTitle>
                        <CardDescription>
                          {partner.carrierName} • {partner.fleetSize} truck{partner.fleetSize > 1 ? 's' : ''} • {partner.mcNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(partner.status)}
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Connection Type</p>
                      <p className="text-lg font-semibold capitalize">{partner.integrationMode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                      <p className="text-lg font-bold">{partner.activeLoads}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-lg font-bold">{partner.completedLoads}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-lg font-bold">${partner.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rating</p>
                      <p className="text-lg font-bold">{partner.rating ? `⭐ ${partner.rating}` : 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Partner Monitoring</CardTitle>
              <CardDescription>
                Live monitoring of carrier partner health and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activePartners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getPartnerTypeBadge(partner.partnerType)}
                        <h4 className="font-medium">
                          {partner.partnerType === 'owner_operator' ? partner.operatorName : partner.carrierName}
                        </h4>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={85} className="flex-1" />
                          <span className="text-sm font-medium">234ms</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={98} className="flex-1" />
                          <span className="text-sm font-medium">98.5%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data Freshness</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={92} className="flex-1" />
                          <span className="text-sm font-medium">2 min ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Partner Settings</CardTitle>
              <CardDescription>
                Configure global settings for all carrier partnerships
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Owner Operators</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve connections from verified owner operators
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time Data Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable real-time synchronization of load and tracking data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Performance Monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Track and analyze partner performance metrics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Rating Threshold (Owner Operators)</Label>
                  <Select defaultValue="4.0">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3.0">3.0 Stars</SelectItem>
                      <SelectItem value="3.5">3.5 Stars</SelectItem>
                      <SelectItem value="4.0">4.0 Stars</SelectItem>
                      <SelectItem value="4.5">4.5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Sync Frequency (Large Carriers)</Label>
                  <Select defaultValue="hourly">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarrierPartnerIntegration;