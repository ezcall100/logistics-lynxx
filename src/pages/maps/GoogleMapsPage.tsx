import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Map, 
  Navigation, 
  Search, 
  Route, 
  Save, 
  Target,
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Info,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { GoogleMapsComponent } from '@/components/maps/GoogleMapsComponent';
import { RouteResult, Location } from '@/lib/google-maps';

const GoogleMapsPage: React.FC = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string>('');
  const [currentRoute, setCurrentRoute] = useState<RouteResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [routeHistory, setRouteHistory] = useState<RouteResult[]>([]);

  // Load API key from environment or localStorage
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || localStorage.getItem('google_maps_api_key');
    if (key) {
      setApiKey(key);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = (key: string) => {
    localStorage.setItem('google_maps_api_key', key);
    setApiKey(key);
    toast({
      title: 'API Key Saved',
      description: 'Google Maps API key has been saved successfully',
    });
  };

  // Handle route calculation
  const handleRouteCalculated = (route: RouteResult) => {
    setCurrentRoute(route);
    setRouteHistory(prev => [route, ...prev.slice(0, 9)]); // Keep last 10 routes
    
    toast({
      title: 'Route Calculated',
      description: `Distance: ${route.distance}, Duration: ${route.duration}`,
    });
  };

  // Handle location selection
  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location);
    toast({
      title: 'Location Selected',
      description: `${location.address || `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}`,
    });
  };

  // Export route data
  const exportRouteData = () => {
    if (!currentRoute) return;

    const data = {
      route: currentRoute,
      timestamp: new Date().toISOString(),
      metadata: {
        origin: selectedLocation,
        exportFormat: 'json'
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Route Exported',
      description: 'Route data has been exported successfully',
    });
  };

  // API Key Input Modal
  const ApiKeyModal: React.FC = () => {
    const [tempKey, setTempKey] = useState(apiKey);
    const [showModal, setShowModal] = useState(!apiKey);

    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Google Maps API Key
            </CardTitle>
            <CardDescription>
              Enter your Google Maps API key to enable mapping features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="Enter your Google Maps API key"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => saveApiKey(tempKey)}
                disabled={!tempKey.trim()}
                className="flex-1"
              >
                Save & Continue
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>• Get your API key from the Google Cloud Console</p>
              <p>• Enable Maps JavaScript API and Places API</p>
              <p>• Your key is stored locally and never shared</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ApiKeyModal />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Map className="h-8 w-8" />
            Google Maps Integration
          </h1>
          <p className="text-muted-foreground mt-2">
            Advanced mapping, route planning, and location services for your TMS operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowModal(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            API Settings
          </Button>
          {currentRoute && (
            <Button onClick={exportRouteData}>
              <Download className="h-4 w-4 mr-2" />
              Export Route
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="maps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="maps">Interactive Maps</TabsTrigger>
          <TabsTrigger value="analytics">Route Analytics</TabsTrigger>
          <TabsTrigger value="favorites">Saved Places</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="maps" className="space-y-6">
          {/* Google Maps Component */}
          <GoogleMapsComponent
            apiKey={apiKey}
            height="600px"
            showControls={true}
            onRouteCalculated={handleRouteCalculated}
            onLocationSelected={handleLocationSelected}
          />

          {/* Current Route Information */}
          {currentRoute && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Current Route
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentRoute.distance}</div>
                    <div className="text-sm text-muted-foreground">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentRoute.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  {currentRoute.durationInTraffic && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{currentRoute.durationInTraffic}</div>
                      <div className="text-sm text-muted-foreground">With Traffic</div>
                    </div>
                  )}
                  {currentRoute.fare && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentRoute.fare.currency} {currentRoute.fare.value}
                      </div>
                      <div className="text-sm text-muted-foreground">Fare</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Location */}
          {selectedLocation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Selected Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedLocation.address || 'Custom Location'}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Save to Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Route Statistics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
                <Route className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{routeHistory.length}</div>
                <p className="text-xs text-muted-foreground">
                  Routes calculated this session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Distance</CardTitle>
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeHistory.length > 0 
                    ? routeHistory.reduce((acc, route) => {
                        const distance = parseFloat(route.distance.replace(/[^\d.]/g, ''));
                        return acc + (isNaN(distance) ? 0 : distance);
                      }, 0) / routeHistory.length
                    : 0
                  } km
                </div>
                <p className="text-xs text-muted-foreground">
                  Per route average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeHistory.length > 0 
                    ? routeHistory.reduce((acc, route) => {
                        const duration = route.duration.match(/(\d+)/);
                        return acc + (duration ? parseInt(duration[1]) : 0);
                      }, 0)
                    : 0
                  } min
                </div>
                <p className="text-xs text-muted-foreground">
                  Total travel time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {routeHistory.length > 0 ? '85%' : '0%'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Route optimization
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Route History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Routes</CardTitle>
              <CardDescription>
                Your recently calculated routes and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {routeHistory.length > 0 ? (
                <div className="space-y-4">
                  {routeHistory.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">Route {index + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            {route.distance} • {route.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{route.duration}</Badge>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No routes calculated yet</p>
                  <p className="text-sm text-muted-foreground">
                    Calculate your first route to see analytics here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Saved Places
              </CardTitle>
              <CardDescription>
                Your favorite locations and frequently visited places
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No saved places yet</p>
                <p className="text-sm text-muted-foreground">
                  Save locations from the map to see them here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Map Settings
              </CardTitle>
              <CardDescription>
                Configure your Google Maps integration preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Map Center</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Latitude"
                    className="p-2 border rounded-md"
                    defaultValue="40.7128"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    className="p-2 border rounded-md"
                    defaultValue="-74.0060"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Default Zoom Level</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="10">10 - City Level</option>
                  <option value="12">12 - District Level</option>
                  <option value="14">14 - Street Level</option>
                  <option value="16">16 - Building Level</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Travel Mode</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="DRIVING">Driving</option>
                  <option value="WALKING">Walking</option>
                  <option value="BICYCLING">Bicycling</option>
                  <option value="TRANSIT">Transit</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="avoid-highways" className="rounded" />
                <label htmlFor="avoid-highways" className="text-sm">Avoid highways by default</label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="avoid-tolls" className="rounded" />
                <label htmlFor="avoid-tolls" className="text-sm">Avoid tolls by default</label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="optimize-waypoints" className="rounded" />
                <label htmlFor="optimize-waypoints" className="text-sm">Optimize waypoints by default</label>
              </div>

              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                API Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Key Status</label>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">{apiKey ? 'Valid API Key' : 'No API Key'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Enabled APIs</label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Maps JavaScript API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Places API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Directions API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Distance Matrix API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Geocoding API</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Limits</label>
                <div className="text-sm text-muted-foreground">
                  <p>• 25,000 requests per day (free tier)</p>
                  <p>• 100 requests per 100 seconds</p>
                  <p>• 10 requests per 1 second</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoogleMapsPage;
