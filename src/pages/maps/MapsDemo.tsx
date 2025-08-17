import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { MapsProvider, useMapsReady, useMapsError } from '@/components/maps/MapsProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Navigation, Search, Route, AlertTriangle } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '60vh'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

// Main Maps Demo Component
function MapsDemoContent() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const isMapsReady = useMapsReady();
  const { hasError, errorMessage } = useMapsError();

  // Handle route calculation
  const calculateRoute = useCallback(async () => {
    if (!origin || !destination) {
      alert('Please enter both origin and destination');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/maps/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
      const result = await response.json();

      if (result.success && result.data) {
        setDirections(result.data);
      } else {
        alert(`Error: ${result.error || 'Failed to calculate route'}`);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Failed to calculate route. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [origin, destination]);

  // Handle location search
  const searchLocations = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/maps/places?query=${encodeURIComponent(searchQuery)}`);
      const result = await response.json();

      if (result.success && result.data?.results) {
        setSearchResults(result.data.results);
      } else {
        setSearchResults([]);
        console.warn('No search results found');
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Handle map click
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  }, []);

  // Handle location selection from search
  const handleLocationSelect = useCallback((place: any) => {
    const location = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    };
    setSelectedLocation(location);
    setSearchResults([]);
    setSearchQuery(place.formatted_address);
  }, []);

  if (!isMapsReady) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-2">Maps Error</p>
          <p className="text-gray-600 text-sm">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">🗺️ Google Maps Demo</h1>
          <p className="text-gray-600">Production-ready mapping integration with route planning and location search</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Maps Ready
        </Badge>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="route" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="route" className="flex items-center gap-2">
            <Route className="h-4 w-4" />
            Route Planning
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Location Search
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Interactive Map
          </TabsTrigger>
        </TabsList>

        {/* Route Planning Tab */}
        <TabsContent value="route" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Calculate Route
              </CardTitle>
              <CardDescription>
                Get directions between two locations with real-time traffic data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Origin</label>
                  <Input
                    placeholder="Enter starting location"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Destination</label>
                  <Input
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={calculateRoute} 
                disabled={isLoading || !origin || !destination}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Calculating Route...
                  </>
                ) : (
                  <>
                    <Route className="h-4 w-4 mr-2" />
                    Calculate Route
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Route Results */}
          {directions && (
            <Card>
              <CardHeader>
                <CardTitle>Route Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Distance:</span>
                    <p>{directions.routes[0]?.legs[0]?.distance?.text}</p>
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>
                    <p>{directions.routes[0]?.legs[0]?.duration?.text}</p>
                  </div>
                  <div>
                    <span className="font-medium">Steps:</span>
                    <p>{directions.routes[0]?.legs[0]?.steps?.length || 0} steps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Location Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Locations
              </CardTitle>
              <CardDescription>
                Find places, businesses, and points of interest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchLocations()}
                />
                <Button onClick={searchLocations} disabled={isLoading || !searchQuery.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Search Results</h3>
                  {searchResults.map((place, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => handleLocationSelect(place)}
                    >
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-600">{place.formatted_address}</div>
                      {place.rating && (
                        <div className="text-sm text-gray-500">Rating: {place.rating} ⭐</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Map Tab */}
        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Map
              </CardTitle>
              <CardDescription>
                Click on the map to place markers and explore locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation || center}
                zoom={selectedLocation ? 15 : 10}
                onClick={handleMapClick}
              >
                {selectedLocation && (
                  <Marker
                    position={selectedLocation}
                    title="Selected Location"
                  />
                )}
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: '#3B82F6',
                        strokeWeight: 5,
                      },
                    }}
                  />
                )}
              </GoogleMap>

              {selectedLocation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900">Selected Location</div>
                  <div className="text-sm text-blue-700">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Information */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">API Status:</span>
              <p className="text-green-600">✅ Connected</p>
            </div>
            <div>
              <span className="font-medium">Feature Flag:</span>
              <p className="text-green-600">✅ Enabled</p>
            </div>
            <div>
              <span className="font-medium">Response Time:</span>
              <p className="text-gray-600">&lt; 2.5s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Wrapper component with MapsProvider
export default function MapsDemo() {
  return (
    <MapsProvider
      fallback={
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <p className="text-yellow-600 font-medium mb-2">Maps Temporarily Unavailable</p>
            <p className="text-gray-600 text-sm">Mapping features are currently disabled for maintenance.</p>
          </div>
        </div>
      }
    >
      <MapsDemoContent />
    </MapsProvider>
  );
}
