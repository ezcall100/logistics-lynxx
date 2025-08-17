import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Route, 
  Save, 
  Loader2, 
  Car, 
  Walking, 
  Bike, 
  Train,
  Clock,
  Map,
  Target,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Info,
  AlertCircle
} from 'lucide-react';
import { 
  getGoogleMapsService, 
  Location, 
  Route as RouteType, 
  RouteResult,
  PlacesSearchResult,
  GeocodingResult
} from '@/lib/google-maps';

interface GoogleMapsComponentProps {
  apiKey: string;
  height?: string;
  showControls?: boolean;
  onRouteCalculated?: (route: RouteResult) => void;
  onLocationSelected?: (location: Location) => void;
}

export const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
  apiKey,
  height = '600px',
  showControls = true,
  onRouteCalculated,
  onLocationSelected
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<RouteResult | null>(null);
  const [searchResults, setSearchResults] = useState<PlacesSearchResult[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<any[]>([]);
  
  // Form states
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [waypoints, setWaypoints] = useState<string[]>(['']);
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'>('DRIVING');
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [avoidTolls, setAvoidTolls] = useState(false);
  const [optimizeWaypoints, setOptimizeWaypoints] = useState(false);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('establishment');
  const [searchRadius, setSearchRadius] = useState(50000);

  const googleMapsService = getGoogleMapsService(apiKey);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMaps = async () => {
      try {
        setIsLoading(true);
        await googleMapsService.initialize({
          apiKey,
          libraries: ['places', 'geometry'],
          region: 'US',
          language: 'en'
        });
        setIsInitialized(true);
        toast({
          title: 'Success',
          description: 'Google Maps initialized successfully',
        });
      } catch (error) {
        console.error('Failed to initialize Google Maps:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize Google Maps',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (apiKey && !isInitialized) {
      initializeMaps();
    }
  }, [apiKey, isInitialized, toast]);

  // Initialize map when component mounts
  useEffect(() => {
    if (isInitialized && mapRef.current) {
      try {
        googleMapsService.initializeMap(mapRef.current, {
          zoom: 10,
          center: { lat: 40.7128, lng: -74.0060 },
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true
        });
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    }
  }, [isInitialized]);

  // Get current location
  const getCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const location = await googleMapsService.getCurrentLocation();
      
      // Center map on current location
      const map = googleMapsService.getMap();
      if (map) {
        map.setCenter(location);
        map.setZoom(15);
        
        // Add marker for current location
        googleMapsService.createMarker(location, {
          title: 'Current Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        });
      }
      
      onLocationSelected?.(location);
      toast({
        title: 'Location Found',
        description: `Current location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
      });
    } catch (error) {
      console.error('Failed to get current location:', error);
      toast({
        title: 'Error',
        description: 'Failed to get current location',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [googleMapsService, onLocationSelected, toast]);

  // Geocode address
  const geocodeAddress = useCallback(async (address: string): Promise<Location | null> => {
    try {
      const results = await googleMapsService.geocodeAddress(address);
      if (results.length > 0) {
        return results[0].location;
      }
      return null;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  }, [googleMapsService]);

  // Calculate route
  const calculateRoute = useCallback(async () => {
    if (!originAddress || !destinationAddress) {
      toast({
        title: 'Error',
        description: 'Please enter both origin and destination addresses',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Geocode addresses
      const origin = await geocodeAddress(originAddress);
      const destination = await geocodeAddress(destinationAddress);
      
      if (!origin || !destination) {
        toast({
          title: 'Error',
          description: 'Could not find one or more addresses',
          variant: 'destructive'
        });
        return;
      }

      // Geocode waypoints
      const waypointLocations: Location[] = [];
      for (const waypoint of waypoints) {
        if (waypoint.trim()) {
          const location = await geocodeAddress(waypoint);
          if (location) {
            waypointLocations.push(location);
          }
        }
      }

      // Create route request
      const routeRequest: RouteType = {
        origin,
        destination,
        waypoints: waypointLocations.length > 0 ? waypointLocations : undefined,
        optimizeWaypoints,
        travelMode,
        avoidHighways,
        avoidTolls,
        avoidFerries: false
      };

      // Get directions
      const routeResult = await googleMapsService.getDirections(routeRequest);
      
      // Draw route on map
      googleMapsService.clearMap();
      googleMapsService.drawRoute(routeResult, {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4
      });

      // Add markers
      googleMapsService.createMarker(origin, {
        title: 'Origin',
        label: 'A',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4CAF50" stroke="white" stroke-width="2"/>
              <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">A</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24)
        }
      });

      googleMapsService.createMarker(destination, {
        title: 'Destination',
        label: 'B',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#F44336" stroke="white" stroke-width="2"/>
              <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24)
        }
      });

      // Add waypoint markers
      waypointLocations.forEach((waypoint, index) => {
        googleMapsService.createMarker(waypoint, {
          title: `Waypoint ${index + 1}`,
          label: `${index + 1}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FF9800" stroke="white" stroke-width="2"/>
                <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        });
      });

      setCurrentRoute(routeResult);
      onRouteCalculated?.(routeResult);
      
      toast({
        title: 'Route Calculated',
        description: `Distance: ${routeResult.distance}, Duration: ${routeResult.duration}`,
      });
    } catch (error) {
      console.error('Failed to calculate route:', error);
      toast({
        title: 'Error',
        description: 'Failed to calculate route',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [originAddress, destinationAddress, waypoints, optimizeWaypoints, travelMode, avoidHighways, avoidTolls, geocodeAddress, googleMapsService, onRouteCalculated, toast]);

  // Search places
  const searchPlaces = useCallback(async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a search query',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsLoading(true);
      const results = await googleMapsService.searchPlaces(searchQuery, {
        type: searchType,
        radius: searchRadius,
        maxResults: 20
      });
      
      setSearchResults(results);
      
      // Add markers for search results
      googleMapsService.clearMap();
      results.forEach((place, index) => {
        const marker = googleMapsService.createMarker(place.location, {
          title: place.name,
          label: `${index + 1}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#2196F3" stroke="white" stroke-width="2"/>
                <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        });

        // Add info window
        const infoWindow = googleMapsService.createInfoWindow(`
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">${place.name}</h3>
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">${place.formattedAddress}</p>
            ${place.rating ? `<p style="margin: 0; font-size: 12px;">Rating: ${place.rating} ⭐</p>` : ''}
          </div>
        `);

        marker.addListener('click', () => {
          infoWindow.open(googleMapsService.getMap(), marker);
        });
      });

      toast({
        title: 'Search Complete',
        description: `Found ${results.length} places`,
      });
    } catch (error) {
      console.error('Failed to search places:', error);
      toast({
        title: 'Error',
        description: 'Failed to search places',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, searchType, searchRadius, googleMapsService, toast]);

  // Save route
  const saveRoute = useCallback(async () => {
    if (!currentRoute) {
      toast({
        title: 'Error',
        description: 'No route to save',
        variant: 'destructive'
      });
      return;
    }

    try {
      const routeRequest: RouteType = {
        origin: { lat: 0, lng: 0 }, // Will be filled from current route
        destination: { lat: 0, lng: 0 },
        travelMode: travelMode
      };

      await googleMapsService.saveRoute(routeRequest, currentRoute, {
        name: `Route from ${originAddress} to ${destinationAddress}`,
        createdAt: new Date().toISOString()
      });

      toast({
        title: 'Route Saved',
        description: 'Route has been saved successfully',
      });
    } catch (error) {
      console.error('Failed to save route:', error);
      toast({
        title: 'Error',
        description: 'Failed to save route',
        variant: 'destructive'
      });
    }
  }, [currentRoute, originAddress, destinationAddress, travelMode, googleMapsService, toast]);

  // Load saved routes
  const loadSavedRoutes = useCallback(async () => {
    try {
      const routes = await googleMapsService.getSavedRoutes();
      setSavedRoutes(routes);
    } catch (error) {
      console.error('Failed to load saved routes:', error);
    }
  }, [googleMapsService]);

  // Add waypoint
  const addWaypoint = () => {
    setWaypoints([...waypoints, '']);
  };

  // Remove waypoint
  const removeWaypoint = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  // Update waypoint
  const updateWaypoint = (index: number, value: string) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = value;
    setWaypoints(newWaypoints);
  };

  if (!apiKey) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Google Maps API key is required</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Interactive Map
          </CardTitle>
          <CardDescription>
            Plan routes, search locations, and visualize your logistics operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef}
            style={{ height, width: '100%' }}
            className="rounded-lg border"
          />
        </CardContent>
      </Card>

      {/* Controls */}
      {showControls && (
        <Tabs defaultValue="route" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="route">Route Planning</TabsTrigger>
            <TabsTrigger value="search">Location Search</TabsTrigger>
            <TabsTrigger value="saved">Saved Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="route" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Route Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Origin and Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      placeholder="Enter origin address"
                      value={originAddress}
                      onChange={(e) => setOriginAddress(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Enter destination address"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Waypoints */}
                <div className="space-y-2">
                  <Label>Waypoints</Label>
                  {waypoints.map((waypoint, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Waypoint ${index + 1}`}
                        value={waypoint}
                        onChange={(e) => updateWaypoint(index, e.target.value)}
                      />
                      {waypoints.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeWaypoint(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addWaypoint}
                  >
                    Add Waypoint
                  </Button>
                </div>

                {/* Route Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Travel Mode</Label>
                    <Select value={travelMode} onValueChange={(value: any) => setTravelMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRIVING">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Driving
                          </div>
                        </SelectItem>
                        <SelectItem value="WALKING">
                          <div className="flex items-center gap-2">
                            <Walking className="h-4 w-4" />
                            Walking
                          </div>
                        </SelectItem>
                        <SelectItem value="BICYCLING">
                          <div className="flex items-center gap-2">
                            <Bike className="h-4 w-4" />
                            Bicycling
                          </div>
                        </SelectItem>
                        <SelectItem value="TRANSIT">
                          <div className="flex items-center gap-2">
                            <Train className="h-4 w-4" />
                            Transit
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-waypoints"
                          checked={optimizeWaypoints}
                          onCheckedChange={setOptimizeWaypoints}
                        />
                        <Label htmlFor="optimize-waypoints">Optimize waypoints</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="avoid-highways"
                          checked={avoidHighways}
                          onCheckedChange={setAvoidHighways}
                        />
                        <Label htmlFor="avoid-highways">Avoid highways</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="avoid-tolls"
                          checked={avoidTolls}
                          onCheckedChange={setAvoidTolls}
                        />
                        <Label htmlFor="avoid-tolls">Avoid tolls</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button onClick={calculateRoute} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                    Calculate Route
                  </Button>
                  <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading}>
                    <Target className="h-4 w-4" />
                    Current Location
                  </Button>
                  <Button onClick={saveRoute} variant="outline" disabled={!currentRoute}>
                    <Save className="h-4 w-4" />
                    Save Route
                  </Button>
                </div>

                {/* Route Results */}
                {currentRoute && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Route Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Distance</Label>
                          <p className="font-semibold">{currentRoute.distance}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Duration</Label>
                          <p className="font-semibold">{currentRoute.duration}</p>
                        </div>
                        {currentRoute.durationInTraffic && (
                          <div>
                            <Label className="text-sm text-muted-foreground">Duration (Traffic)</Label>
                            <p className="font-semibold">{currentRoute.durationInTraffic}</p>
                          </div>
                        )}
                        {currentRoute.fare && (
                          <div>
                            <Label className="text-sm text-muted-foreground">Fare</Label>
                            <p className="font-semibold">{currentRoute.fare.currency} {currentRoute.fare.value}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Location Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search-query">Search Query</Label>
                    <Input
                      id="search-query"
                      placeholder="Search for places..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="establishment">Establishment</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="gas_station">Gas Station</SelectItem>
                        <SelectItem value="lodging">Lodging</SelectItem>
                        <SelectItem value="store">Store</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Radius (km)</Label>
                    <Select value={searchRadius.toString()} onValueChange={(value) => setSearchRadius(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5000">5 km</SelectItem>
                        <SelectItem value="10000">10 km</SelectItem>
                        <SelectItem value="25000">25 km</SelectItem>
                        <SelectItem value="50000">50 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={searchPlaces} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Search Places
                </Button>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    <Label>Search Results ({searchResults.length})</Label>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {searchResults.map((place, index) => (
                        <Card key={place.placeId} className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{place.name}</p>
                              <p className="text-sm text-muted-foreground">{place.formattedAddress}</p>
                              {place.rating && (
                                <Badge variant="secondary" className="mt-1">
                                  ⭐ {place.rating}
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onLocationSelected?.(place.location)}
                            >
                              Select
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Saved Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={loadSavedRoutes} variant="outline">
                  <RefreshCw className="h-4 w-4" />
                  Load Saved Routes
                </Button>

                {savedRoutes.length > 0 ? (
                  <div className="space-y-2">
                    {savedRoutes.map((route) => (
                      <Card key={route.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{route.metadata?.name || 'Unnamed Route'}</p>
                            <p className="text-sm text-muted-foreground">
                              Distance: {route.distance} • Duration: {route.duration}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(route.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Load route on map
                              googleMapsService.clearMap();
                              googleMapsService.drawRoute(route, {
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 4
                              });
                            }}
                          >
                            Load
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No saved routes found
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
