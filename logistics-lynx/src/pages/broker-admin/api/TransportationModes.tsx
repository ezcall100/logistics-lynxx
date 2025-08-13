import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Anchor, 
  Plane, 
  Ship, 
  Train, 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Settings
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TransportationMode {
  id: string;
  name: string;
  type: 'trucking' | 'rail' | 'ocean' | 'air' | 'intermodal';
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'maintenance';
  avgTransitTime: string;
  costPerMile: number;
  capacityUtilization: number;
  activeRoutes: number;
  totalShipments: number;
  revenue: number;
  apiEndpoints: string[];
  integrations: string[];
  supportedCargoTypes: string[];
  description: string;
}

const TransportationModes: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<TransportationMode | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);

  const [transportationModes] = useState<TransportationMode[]>([
    {
      id: '1',
      name: 'Over-the-Road (OTR)',
      type: 'trucking',
      icon: <Truck className="h-8 w-8" />,
      status: 'active',
      avgTransitTime: '2-5 days',
      costPerMile: 2.85,
      capacityUtilization: 87,
      activeRoutes: 245,
      totalShipments: 3421,
      revenue: 2850000,
      apiEndpoints: ['/api/v1/trucking/otr', '/api/v1/tracking/trucks'],
      integrations: ['ELD Systems', 'GPS Tracking', 'Load Boards'],
      supportedCargoTypes: ['Dry Goods', 'Refrigerated', 'Hazmat'],
      description: 'Long-haul trucking for cross-country freight movement'
    },
    {
      id: '2',
      name: 'Less Than Truckload (LTL)',
      type: 'trucking',
      icon: <Package className="h-8 w-8" />,
      status: 'active',
      avgTransitTime: '3-7 days',
      costPerMile: 1.95,
      capacityUtilization: 92,
      activeRoutes: 156,
      totalShipments: 8934,
      revenue: 1650000,
      apiEndpoints: ['/api/v1/trucking/ltl', '/api/v1/consolidation'],
      integrations: ['Hub Networks', 'Consolidation Centers', 'Terminal Management'],
      supportedCargoTypes: ['General Freight', 'Palletized Goods'],
      description: 'Consolidated shipping for smaller freight quantities'
    },
    {
      id: '3',
      name: 'Rail Freight',
      type: 'rail',
      icon: <Train className="h-8 w-8" />,
      status: 'active',
      avgTransitTime: '5-10 days',
      costPerMile: 0.65,
      capacityUtilization: 78,
      activeRoutes: 45,
      totalShipments: 1234,
      revenue: 890000,
      apiEndpoints: ['/api/v1/rail/freight', '/api/v1/rail/tracking'],
      integrations: ['Class I Railroads', 'Intermodal Yards', 'Rail Scheduling'],
      supportedCargoTypes: ['Bulk Commodities', 'Containers', 'Automotive'],
      description: 'Long-distance freight transport via railway networks'
    },
    {
      id: '4',
      name: 'Ocean Freight',
      type: 'ocean',
      icon: <Ship className="h-8 w-8" />,
      status: 'active',
      avgTransitTime: '15-30 days',
      costPerMile: 0.15,
      capacityUtilization: 85,
      activeRoutes: 28,
      totalShipments: 567,
      revenue: 1200000,
      apiEndpoints: ['/api/v1/ocean/freight', '/api/v1/vessels/tracking'],
      integrations: ['Port Management', 'Customs Systems', 'Container Tracking'],
      supportedCargoTypes: ['Containers', 'Bulk Cargo', 'Break Bulk'],
      description: 'International shipping via ocean vessels and containers'
    },
    {
      id: '5',
      name: 'Air Freight',
      type: 'air',
      icon: <Plane className="h-8 w-8" />,
      status: 'active',
      avgTransitTime: '1-3 days',
      costPerMile: 8.50,
      capacityUtilization: 68,
      activeRoutes: 89,
      totalShipments: 2156,
      revenue: 3400000,
      apiEndpoints: ['/api/v1/air/freight', '/api/v1/flights/tracking'],
      integrations: ['Airport Systems', 'Cargo Airlines', 'Flight Scheduling'],
      supportedCargoTypes: ['Express Packages', 'High-Value Goods', 'Perishables'],
      description: 'Fast delivery via commercial and cargo aircraft'
    },
    {
      id: '6',
      name: 'Intermodal',
      type: 'intermodal',
      icon: <Anchor className="h-8 w-8" />,
      status: 'maintenance',
      avgTransitTime: '7-14 days',
      costPerMile: 1.25,
      capacityUtilization: 82,
      activeRoutes: 67,
      totalShipments: 1789,
      revenue: 1950000,
      apiEndpoints: ['/api/v1/intermodal', '/api/v1/containers/tracking'],
      integrations: ['Rail Yards', 'Port Terminals', 'Truck Drayage'],
      supportedCargoTypes: ['Containers', 'Trailers', 'Mixed Cargo'],
      description: 'Multi-modal transport combining truck, rail, and ocean'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, unknown> = {
      active: "default",
      inactive: "secondary",
      maintenance: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status.toUpperCase()}</Badge>;
  };

  const getModeColor = (type: string) => {
    const colors: Record<string, string> = {
      trucking: 'bg-blue-100 border-blue-200',
      rail: 'bg-green-100 border-green-200',
      ocean: 'bg-cyan-100 border-cyan-200',
      air: 'bg-purple-100 border-purple-200',
      intermodal: 'bg-orange-100 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 border-gray-200';
  };

  const activeModes = transportationModes.filter(mode => mode.status === 'active');
  const totalRevenue = activeModes.reduce((sum, mode) => sum + mode.revenue, 0);
  const totalShipments = activeModes.reduce((sum, mode) => sum + mode.totalShipments, 0);
  const avgUtilization = activeModes.reduce((sum, mode) => sum + mode.capacityUtilization, 0) / activeModes.length;

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportation Modes</h1>
          <p className="text-muted-foreground">
            Manage and optimize multi-modal transportation options and integrations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
            <DialogTrigger asChild>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configure Mode
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configure Transportation Mode</DialogTitle>
                <DialogDescription>
                  Set up API integrations and parameters for a transportation mode.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="modeName">Mode Name</Label>
                  <Input id="modeName" placeholder="e.g., Regional LTL" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="modeType">Mode Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trucking">Trucking</SelectItem>
                        <SelectItem value="rail">Rail</SelectItem>
                        <SelectItem value="ocean">Ocean</SelectItem>
                        <SelectItem value="air">Air</SelectItem>
                        <SelectItem value="intermodal">Intermodal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="transitTime">Avg Transit Time</Label>
                    <Input id="transitTime" placeholder="3-5 days" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="costPerMile">Cost per Mile ($)</Label>
                    <Input id="costPerMile" type="number" placeholder="2.50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="utilization">Target Utilization (%)</Label>
                    <Input id="utilization" type="number" placeholder="85" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <Input id="apiEndpoint" placeholder="/api/v1/transportation/mode" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe this transportation mode..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setShowConfigDialog(false)}>
                  Save Configuration
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Modes</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeModes.length}</div>
            <p className="text-xs text-muted-foreground">
              Out of {transportationModes.length} total
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
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShipments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All modes combined
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Capacity utilization
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Mode Overview</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="integrations">API Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6">
            {transportationModes.map((mode) => (
              <Card key={mode.id} className={`${getModeColor(mode.type)} transition-all hover:shadow-md`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg">
                        {mode.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{mode.name}</CardTitle>
                        <CardDescription className="text-base">
                          {mode.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(mode.status)}
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Transit Time</p>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{mode.avgTransitTime}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cost/Mile</p>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${mode.costPerMile}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Utilization</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={mode.capacityUtilization} className="flex-1" />
                        <span className="text-sm font-medium">{mode.capacityUtilization}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                      <span className="text-lg font-bold">{mode.activeRoutes}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Shipments</p>
                      <span className="text-lg font-bold">{mode.totalShipments.toLocaleString()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <span className="text-lg font-bold">${(mode.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Supported Cargo Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {mode.supportedCargoTypes.map((type, index) => (
                          <Badge key={index} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">System Integrations</h4>
                      <div className="flex flex-wrap gap-2">
                        {mode.integrations.map((integration, index) => (
                          <Badge key={index} variant="secondary">{integration}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">API Endpoints</h4>
                      <div className="space-y-1">
                        {mode.apiEndpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Badge variant="outline" className="font-mono text-xs">{endpoint}</Badge>
                            <Button variant="ghost" size="sm">
                              Test
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {mode.status === 'maintenance' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-yellow-800">
                          Mode is under maintenance - Limited functionality available
                        </span>
                        <Button size="sm" variant="outline">
                          View Status
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Mode</CardTitle>
                <CardDescription>Revenue distribution across transportation modes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportationModes
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((mode) => (
                      <div key={mode.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {mode.icon}
                          <span className="text-sm font-medium">{mode.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(mode.revenue / totalRevenue) * 100} 
                            className="w-20" 
                          />
                          <span className="text-sm font-semibold w-16 text-right">
                            ${(mode.revenue / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Capacity Utilization</CardTitle>
                <CardDescription>Current utilization rates by mode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportationModes
                    .sort((a, b) => b.capacityUtilization - a.capacityUtilization)
                    .map((mode) => (
                      <div key={mode.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {mode.icon}
                          <span className="text-sm font-medium">{mode.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={mode.capacityUtilization} className="w-20" />
                          <span className="text-sm font-semibold w-12 text-right">
                            {mode.capacityUtilization}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Integration Status</CardTitle>
              <CardDescription>
                Monitor API health and integration status for each transportation mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transportationModes.map((mode) => (
                  <div key={mode.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {mode.icon}
                        <h4 className="font-medium">{mode.name}</h4>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="space-y-2">
                      {mode.apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="font-mono">{endpoint}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">200ms</Badge>
                            <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransportationModes;