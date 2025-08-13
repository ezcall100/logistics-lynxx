import React, { useState } from 'react';
import ModernDriverLayout from '@/components/driver/ModernDriverLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Fuel, 
  Route,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const RouteManagement = () => {
  const [selectedRoute, setSelectedRoute] = useState(0);

  const routeOptions = [
    {
      id: 1,
      name: 'Fastest Route',
      distance: '287 miles',
      duration: '4h 32m',
      fuelCost: '$65',
      tolls: '$12',
      traffic: 'Light',
      efficiency: 95,
      waypoints: [
        { name: 'Chicago Distribution Center', address: '1250 W Van Buren St, Chicago, IL', type: 'pickup', status: 'completed' },
        { name: 'Rest Stop - I-94', address: 'Mile Marker 42, Kalamazoo, MI', type: 'break', status: 'upcoming' },
        { name: 'Detroit Warehouse', address: '15800 Northline Rd, Southgate, MI', type: 'delivery', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'Most Efficient',
      distance: '294 miles',
      duration: '4h 45m', 
      fuelCost: '$58',
      tolls: '$8',
      traffic: 'Medium',
      efficiency: 98,
      waypoints: [
        { name: 'Chicago Distribution Center', address: '1250 W Van Buren St, Chicago, IL', type: 'pickup', status: 'completed' },
        { name: 'Fuel Station - I-80', address: 'Exit 87, Gary, IN', type: 'fuel', status: 'upcoming' },
        { name: 'Rest Area - I-94', address: 'Mile Marker 85, Battle Creek, MI', type: 'break', status: 'upcoming' },
        { name: 'Detroit Warehouse', address: '15800 Northline Rd, Southgate, MI', type: 'delivery', status: 'pending' }
      ]
    },
    {
      id: 3,
      name: 'Avoid Traffic',
      distance: '301 miles',
      duration: '4h 28m',
      fuelCost: '$70',
      tolls: '$15',
      traffic: 'Light',
      efficiency: 92,
      waypoints: [
        { name: 'Chicago Distribution Center', address: '1250 W Van Buren St, Chicago, IL', type: 'pickup', status: 'completed' },
        { name: 'Alternate Route - US-31', address: 'Benton Harbor, MI', type: 'route', status: 'upcoming' },
        { name: 'Detroit Warehouse', address: '15800 Northline Rd, Southgate, MI', type: 'delivery', status: 'pending' }
      ]
    }
  ];

  const getWaypointIcon = (type: string) => {
    switch (type) {
      case 'pickup': return <MapPin className="w-4 h-4 text-ai-success" />;
      case 'delivery': return <MapPin className="w-4 h-4 text-ai-info" />;
      case 'fuel': return <Fuel className="w-4 h-4 text-ai-warning" />;
      case 'break': return <Clock className="w-4 h-4 text-ai-accent" />;
      case 'route': return <Route className="w-4 h-4 text-driver" />;
      default: return <MapPin className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-ai-success" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-ai-warning" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-ai-error" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Light': return 'bg-ai-success text-white';
      case 'Medium': return 'bg-ai-warning text-foreground';
      case 'Heavy': return 'bg-ai-error text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ModernDriverLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Header with Gradient */}
        <div className="glass-ultra rounded-2xl p-6 border border-border/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-driver to-ai-primary bg-clip-text text-transparent">
                Route Management
              </h1>
              <p className="text-muted-foreground text-lg">Optimize your routes for efficiency and time</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Real-time optimization</span>
                <span>•</span>
                <span>AI-powered routing</span>
                <span>•</span>
                <span>Live traffic updates</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="btn-premium hover:scale-105 transition-transform">
                <Navigation className="w-4 h-4 mr-2" />
                GPS Navigation
              </Button>
              <Button className="bg-gradient-to-r from-driver to-ai-primary hover:from-driver/90 hover:to-ai-primary/90 btn-premium">
                <Zap className="w-4 h-4 mr-2" />
                Start Route
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Route Input */}
        <Card className="glass border-border/50 card-hover">
          <CardHeader className="bg-gradient-to-r from-ai-primary/5 to-driver/5 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-ai-primary" />
              <span>Route Planning</span>
            </CardTitle>
            <CardDescription>Enter your pickup and delivery locations with AI optimization</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="pickup" className="flex items-center space-x-2">
                  <span>Pickup Location</span>
                  <Badge variant="outline" className="text-xs">COMPLETED</Badge>
                </Label>
                <Input 
                  id="pickup" 
                  value="1250 W Van Buren St, Chicago, IL"
                  readOnly
                  className="bg-gradient-to-r from-ai-success/10 to-transparent border-ai-success/30 focus:border-ai-success"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="delivery" className="flex items-center space-x-2">
                  <span>Delivery Location</span>
                  <Badge variant="outline" className="text-xs">PENDING</Badge>
                </Label>
                <Input 
                  id="delivery" 
                  value="15800 Northline Rd, Southgate, MI"
                  readOnly
                  className="bg-gradient-to-r from-ai-warning/10 to-transparent border-ai-warning/30 focus:border-ai-warning"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" className="btn-premium hover:scale-105 transition-transform">
                <Route className="w-4 h-4 mr-2" />
                Add Waypoint
              </Button>
              <Button variant="outline" className="btn-premium hover:scale-105 transition-transform">
                <Fuel className="w-4 h-4 mr-2" />
                Find Fuel Stops
              </Button>
              <Button className="bg-gradient-to-r from-ai-primary to-ai-accent btn-premium">
                <Navigation className="w-4 h-4 mr-2" />
                Calculate Routes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Route Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Route Options</h2>
            <Badge variant="outline" className="text-sm">AI Optimized</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {routeOptions.map((route, index) => (
              <Card 
                key={route.id} 
                className={`cursor-pointer transition-all duration-300 card-hover glass ${
                  selectedRoute === index 
                    ? 'ring-2 ring-ai-primary border-ai-primary/30 bg-gradient-to-br from-ai-primary/5 to-driver/5' 
                    : 'hover:ring-1 hover:ring-border hover:scale-[1.02]'
                }`}
                onClick={() => setSelectedRoute(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{route.name}</span>
                        {selectedRoute === index && (
                          <CheckCircle className="w-4 h-4 text-ai-primary" />
                        )}
                      </CardTitle>
                      <Badge 
                        variant={route.efficiency >= 95 ? "default" : "outline"}
                        className={route.efficiency >= 95 ? "bg-ai-success text-white" : ""}
                      >
                        {route.efficiency}% Efficient
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Distance</div>
                      <div className="font-bold text-lg text-foreground">{route.distance}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Duration</div>
                      <div className="font-bold text-lg text-foreground">{route.duration}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Fuel Cost</div>
                      <div className="font-bold text-lg text-ai-warning">{route.fuelCost}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Tolls</div>
                      <div className="font-bold text-lg text-ai-info">{route.tolls}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Traffic Conditions</span>
                    <Badge className={getTrafficColor(route.traffic)}>
                      {route.traffic}
                    </Badge>
                  </div>
                  
                  {selectedRoute === index && (
                    <div className="animate-fade-in">
                      <Button className="w-full bg-gradient-to-r from-ai-primary to-ai-accent btn-premium" size="sm">
                        <Navigation className="w-4 h-4 mr-2" />
                        Select This Route
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Route Details */}
        <Card className="glass border-border/50">
          <CardHeader className="bg-gradient-to-r from-ai-primary/5 to-driver/5 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Route className="w-5 h-5 text-ai-primary" />
              <span>Route Details - {routeOptions[selectedRoute].name}</span>
            </CardTitle>
            <CardDescription>Waypoints and stops along your optimized route</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {routeOptions[selectedRoute].waypoints.map((waypoint, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-border/50 bg-gradient-to-r from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                    {/* Connection Line */}
                    {index < routeOptions[selectedRoute].waypoints.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-ai-primary/50 to-muted/30"></div>
                    )}
                    
                    <div className="flex items-center space-x-3 z-10">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-background to-muted border-2 border-ai-primary/30 flex items-center justify-center">
                          {getWaypointIcon(waypoint.type)}
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIcon(waypoint.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground text-lg">{waypoint.name}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {waypoint.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{waypoint.address}</div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={
                          waypoint.status === 'completed' ? 'bg-ai-success text-white' :
                          waypoint.status === 'upcoming' ? 'bg-ai-warning text-foreground' : 'bg-ai-error text-white'
                        }
                      >
                        {waypoint.status}
                      </Badge>
                      
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-ai-primary/10">
                          <Navigation className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-ai-primary/10">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Real-time Updates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Real-time Updates</h2>
            <Badge variant="outline" className="text-sm animate-pulse-soft">LIVE</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-border/50 card-hover">
              <CardHeader className="bg-gradient-to-r from-ai-warning/5 to-ai-error/5 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-ai-warning" />
                  <span>Traffic Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-ai-warning/10 border border-ai-warning/20 hover:bg-ai-warning/15 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-ai-warning mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Construction on I-94</div>
                      <div className="text-sm text-muted-foreground">15 min delay expected</div>
                      <div className="text-xs text-ai-warning font-medium mt-1">Miles 42-47 affected</div>
                    </div>
                    <Badge className="bg-ai-warning text-foreground text-xs">ACTIVE</Badge>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-ai-success/10 border border-ai-success/20 hover:bg-ai-success/15 transition-colors">
                    <CheckCircle className="w-5 h-5 text-ai-success mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Clear traffic ahead</div>
                      <div className="text-sm text-muted-foreground">Normal speeds expected</div>
                      <div className="text-xs text-ai-success font-medium mt-1">Next 50 miles optimal</div>
                    </div>
                    <Badge className="bg-ai-success text-white text-xs">CLEAR</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 card-hover">
              <CardHeader className="bg-gradient-to-r from-ai-info/5 to-ai-success/5 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-ai-info" />
                  <span>Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-ai-success/10 border border-ai-success/20 hover:bg-ai-success/15 transition-colors">
                    <CheckCircle className="w-5 h-5 text-ai-success mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Clear skies</div>
                      <div className="text-sm text-muted-foreground">Good driving conditions</div>
                      <div className="text-xs text-ai-success font-medium mt-1">Visibility: 10+ miles</div>
                    </div>
                    <Badge className="bg-ai-success text-white text-xs">OPTIMAL</Badge>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-ai-warning/10 border border-ai-warning/20 hover:bg-ai-warning/15 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-ai-warning mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Light rain expected</div>
                      <div className="text-sm text-muted-foreground">Around 2:00 PM in Detroit area</div>
                      <div className="text-xs text-ai-warning font-medium mt-1">Reduce speed recommended</div>
                    </div>
                    <Badge className="bg-ai-warning text-foreground text-xs">WATCH</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ModernDriverLayout>
  );
};

export default RouteManagement;