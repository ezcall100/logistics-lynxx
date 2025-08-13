import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Clock, 
  AlertTriangle,
  Thermometer,
  Fuel,
  Route,
  Activity,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ShipmentTracking = () => {
  const mockTrackingData = [
    {
      id: 'TMS-2024-089',
      driver: 'Mike Rodriguez',
      vehicle: 'Truck #145',
      customer: 'Walmart Inc.',
      route: 'Chicago, IL → Atlanta, GA',
      currentLocation: 'Macon, GA - I-75 Mile 171',
      coordinates: { lat: 32.8407, lng: -83.6324 },
      progress: 75,
      eta: '2024-01-17 14:30',
      speed: 65,
      fuel: 78,
      temperature: 72,
      lastUpdate: '2 min ago',
      status: 'On Schedule',
      alerts: ['Traffic delay ahead', 'Weather watch']
    },
    {
      id: 'TMS-2024-092',
      driver: 'Jennifer Lee',
      vehicle: 'Truck #089',
      customer: 'Amazon Logistics',
      route: 'Seattle, WA → Denver, CO',
      currentLocation: 'Spokane, WA - I-90 Mile 281',
      coordinates: { lat: 47.6587, lng: -117.4260 },
      progress: 25,
      eta: '2024-01-19 16:00',
      speed: 68,
      fuel: 65,
      temperature: 68,
      lastUpdate: '5 min ago',
      status: 'On Schedule',
      alerts: ['Weather watch']
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Tracking</h2>
          <p className="text-muted-foreground">Real-time shipment location and status monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Fleet View
          </Button>
          <Button>
            <Navigation className="h-4 w-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>

      {/* Live Map Placeholder */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Live Fleet Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-border/50 overflow-hidden">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full mx-auto w-fit">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Interactive Fleet Map</p>
                  <p className="text-sm text-muted-foreground">Real-time GPS tracking integration</p>
                </div>
              </div>
            </div>
            
            {/* Truck Icons Overlay */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">{mockTrackingData.length} Active Vehicles</span>
              </div>
            </div>

            {/* Mock truck positions */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="p-2 bg-blue-500 rounded-full shadow-lg">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs bg-card/90 px-2 py-1 rounded text-foreground">TMS-2024-089</span>
              </div>
            </div>

            <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
              <div className="p-2 bg-green-500 rounded-full shadow-lg">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs bg-card/90 px-2 py-1 rounded text-foreground">TMS-2024-092</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTrackingData.map((shipment) => (
          <Card key={shipment.id} className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{shipment.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{shipment.customer}</p>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                  {shipment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Driver & Vehicle Info */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{shipment.driver}</p>
                  <p className="text-sm text-muted-foreground">{shipment.vehicle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Route Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Route Progress</span>
                  <span className="text-sm font-medium text-foreground">{shipment.progress}%</span>
                </div>
                <Progress value={shipment.progress} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{shipment.route}</span>
                  <span className="font-medium text-foreground">ETA: {shipment.eta}</span>
                </div>
              </div>

              {/* Current Location */}
              <div className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">Current Location</span>
                </div>
                <p className="text-sm text-muted-foreground">{shipment.currentLocation}</p>
                <p className="text-xs text-muted-foreground mt-1">Last updated: {shipment.lastUpdate}</p>
              </div>

              {/* Vehicle Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Navigation className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-foreground">{shipment.speed}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">MPH</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Fuel className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">{shipment.fuel}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Fuel</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-foreground">{shipment.temperature}°F</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Temp</p>
                </div>
              </div>

              {/* Alerts */}
              {shipment.alerts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-foreground">Active Alerts</span>
                  </div>
                  <div className="space-y-1">
                    {shipment.alerts.map((alert, index) => (
                      <div key={index} className="p-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded border border-amber-500/20">
                        <p className="text-sm text-amber-700 dark:text-amber-300">{alert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button size="sm" className="flex-1">
                  <Route className="h-4 w-4 mr-2" />
                  View Route
                </Button>
                <Button size="sm" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Update ETA
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTracking;