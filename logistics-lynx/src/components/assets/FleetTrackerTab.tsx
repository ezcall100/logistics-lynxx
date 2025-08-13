import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Clock, Fuel, AlertTriangle, Truck, Route, Gauge, Activity, Plus, RefreshCw, Download, Filter, Settings, Zap } from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';

interface FleetTrackerTabProps {
  searchTerm: string;
}

export const FleetTrackerTab = ({ searchTerm }: FleetTrackerTabProps) => {
  const { fleetTracker, loading } = useAssetManagement();
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<unknown>(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredVehicles = fleetTracker.vehicles.filter(vehicle =>
    vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'moving': return 'default';
      case 'idle': return 'secondary';
      case 'stopped': return 'outline';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const getAlertColor = (level: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSubmitTracking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingData = {
      vehicleId: formData.get('vehicleId'),
      driver: formData.get('driver'),
      route: formData.get('route'),
      destination: formData.get('destination'),
      estimatedArrival: formData.get('estimatedArrival')
    };
    console.log('Adding tracking for:', trackingData);
    setIsTrackingOpen(false);
  };

  const movingVehicles = fleetTracker.vehicles.filter(v => v.status === 'moving').length;
  const idleVehicles = fleetTracker.vehicles.filter(v => v.status === 'idle').length;
  const stoppedVehicles = fleetTracker.vehicles.filter(v => v.status === 'stopped').length;
  const avgFuelLevel = fleetTracker.vehicles.length > 0 ? 
    Math.round(fleetTracker.vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / fleetTracker.vehicles.length) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fleet Stats Header */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{fleetTracker.vehicles.length}</div>
            <p className="text-xs text-muted-foreground">Online tracking</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moving</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-success to-success-light rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{movingVehicles}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle/Stopped</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-warning to-warning-light rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{idleVehicles + stoppedVehicles}</div>
            <p className="text-xs text-muted-foreground">Stationary</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fuel</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{avgFuelLevel}%</div>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {fleetTracker.alerts.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Critical Fleet Alerts ({fleetTracker.alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {fleetTracker.alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <Badge variant={getAlertColor(alert.level)}>
                      {alert.level.toUpperCase()}
                    </Badge>
                    <div>
                      <div className="font-medium">{alert.vehicleId}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-Time Tracking</TabsTrigger>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alert Center</TabsTrigger>
        </TabsList>
        
        <TabsContent value="realtime" className="space-y-4">
          {/* Vehicle Status Table */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Real-Time Vehicle Tracking</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Live GPS tracking and status monitoring</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Tracking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add Vehicle Tracking</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitTracking} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleId">Vehicle ID</Label>
                            <Input id="vehicleId" name="vehicleId" placeholder="TRK-015" defaultValue="TRK-015" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="driver">Driver</Label>
                            <Input id="driver" name="driver" placeholder="Driver Name" defaultValue="Alex Johnson" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="route">Route</Label>
                          <Select name="route" defaultValue="I-40-East" required>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I-40-East">I-40 East Corridor</SelectItem>
                              <SelectItem value="I-75-North">I-75 North Route</SelectItem>
                              <SelectItem value="I-10-West">I-10 West Highway</SelectItem>
                              <SelectItem value="Custom">Custom Route</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Input id="destination" name="destination" placeholder="City, State" defaultValue="Jacksonville, FL" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estimatedArrival">Estimated Arrival</Label>
                          <Input id="estimatedArrival" name="estimatedArrival" type="datetime-local" defaultValue="2024-03-20T14:30" required />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsTrackingOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">Start Tracking</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Speed</TableHead>
                    <TableHead>Fuel</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span>{vehicle.vehicleId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{vehicle.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Gauge className="h-3 w-3 text-muted-foreground" />
                          <span>{vehicle.speed} mph</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                vehicle.fuelLevel > 50 ? 'bg-green-500' : 
                                vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            />
                          </div>
                          <span className="text-sm">{vehicle.fuelLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{vehicle.eta}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {vehicle.lastUpdate}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVehicle(vehicle)}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Active Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { route: 'I-40 East Corridor', vehicles: 12, distance: '1,247 mi', eta: '18 hrs' },
                    { route: 'I-75 North Route', vehicles: 8, distance: '892 mi', eta: '14 hrs' },
                    { route: 'I-10 West Highway', vehicles: 15, distance: '1,580 mi', eta: '22 hrs' },
                    { route: 'Regional Distribution', vehicles: 6, distance: '340 mi', eta: '6 hrs' }
                  ].map((route) => (
                    <div key={route.route} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{route.route}</div>
                          <div className="text-sm text-muted-foreground">{route.vehicles} vehicles • {route.distance}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">ETA: {route.eta}</div>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Route Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Optimal Route Usage</span>
                    <span className="font-medium text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Delivery Time</span>
                    <span className="font-medium">16.5 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                    <span className="font-medium">6.8 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">On-Time Performance</span>
                    <span className="font-medium text-success">96%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Fleet Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Miles Today</span>
                    <span className="font-medium">15,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Speed</span>
                    <span className="font-medium">58 mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fleet Utilization</span>
                    <span className="font-medium text-success">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Delivery Efficiency</span>
                    <span className="font-medium text-success">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Safety Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Safety Score</span>
                    <span className="font-medium text-success">98/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Speed Violations</span>
                    <span className="font-medium text-warning">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hard Braking Events</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Idle Time</span>
                    <span className="font-medium">2.3 hrs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fuel Cost Today</span>
                    <span className="font-medium">$3,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cost per Mile</span>
                    <span className="font-medium">$1.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Maintenance Cost</span>
                    <span className="font-medium">$0.15/mi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue/Mile</span>
                    <span className="font-medium text-success">$2.85</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alert Management Center</CardTitle>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Alerts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Fuel Low', vehicle: 'TRK-003', message: 'Fuel level below 20%', time: '2 min ago', severity: 'high' },
                  { type: 'Speed Alert', vehicle: 'TRK-007', message: 'Exceeding speed limit by 10 mph', time: '5 min ago', severity: 'medium' },
                  { type: 'Route Deviation', vehicle: 'TRK-012', message: 'Vehicle off planned route', time: '12 min ago', severity: 'medium' },
                  { type: 'Maintenance Due', vehicle: 'TRK-015', message: 'Scheduled maintenance overdue', time: '1 hr ago', severity: 'low' },
                  { type: 'Driver Break', vehicle: 'TRK-002', message: 'Driver break time exceeded', time: '2 hr ago', severity: 'high' }
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium">{alert.type} - {alert.vehicle}</div>
                        <div className="text-sm text-muted-foreground">{alert.message}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                      <Button variant="outline" size="sm" className="mt-1">
                        Resolve
                      </Button>
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