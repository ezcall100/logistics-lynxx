# Google Maps Integration

## Overview

The Google Maps Integration provides comprehensive mapping, routing, and location services for your TMS application. This integration includes route planning, geocoding, places search, distance calculations, and interactive map visualization.

## Features

### 🗺️ Interactive Mapping
- **Interactive Google Maps**: Full-featured map with zoom, pan, and street view
- **Custom Markers**: Visual markers for locations, routes, and waypoints
- **Info Windows**: Detailed information popups for locations
- **Route Visualization**: Draw routes with polylines and optimized paths

### 🚗 Route Planning
- **Multi-point Routing**: Plan routes with origin, destination, and waypoints
- **Travel Modes**: Support for driving, walking, bicycling, and transit
- **Route Optimization**: Automatic waypoint optimization for efficiency
- **Traffic Integration**: Real-time traffic data and duration estimates
- **Route Options**: Avoid highways, tolls, and ferries

### 📍 Location Services
- **Geocoding**: Convert addresses to coordinates
- **Reverse Geocoding**: Convert coordinates to addresses
- **Places Search**: Find businesses, landmarks, and points of interest
- **Current Location**: Get user's current GPS location
- **Location Caching**: Cache frequently used locations

### 📊 Analytics & Data
- **Route Statistics**: Track distance, duration, and efficiency
- **Usage Analytics**: Monitor API usage and performance
- **Data Export**: Export routes and location data
- **Historical Data**: Store and retrieve route history

## Setup

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API
   - Geocoding API

3. **Create API Key**:
   - Go to "Credentials" in the Google Cloud Console
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

4. **Restrict API Key** (Recommended):
   - Click on the API key to edit
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain(s) to the allowed referrers
   - Under "API restrictions", select "Restrict key"
   - Select the APIs you enabled above

### 2. Environment Configuration

Add your Google Maps API key to your environment variables:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 3. Database Migration

Run the Google Maps integration migration:

```bash
npm run setup:google-maps
```

This will create the necessary database tables and functions.

## Usage

### Basic Map Component

```tsx
import { GoogleMapsComponent } from '@/components/maps/GoogleMapsComponent';

function MyPage() {
  return (
    <GoogleMapsComponent
      apiKey="your_api_key"
      height="600px"
      showControls={true}
      onRouteCalculated={(route) => console.log('Route:', route)}
      onLocationSelected={(location) => console.log('Location:', location)}
    />
  );
}
```

### Programmatic Usage

```typescript
import { getGoogleMapsService } from '@/lib/google-maps';

// Initialize the service
const googleMapsService = getGoogleMapsService('your_api_key');
await googleMapsService.initialize({
  apiKey: 'your_api_key',
  libraries: ['places', 'geometry'],
  region: 'US',
  language: 'en'
});

// Geocode an address
const results = await googleMapsService.geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
console.log('Coordinates:', results[0].location);

// Get directions
const route = await googleMapsService.getDirections({
  origin: { lat: 37.7749, lng: -122.4194 },
  destination: { lat: 34.0522, lng: -118.2437 },
  travelMode: 'DRIVING'
});
console.log('Route:', route);
```

### Route Planning

```typescript
// Plan a route with waypoints
const route = await googleMapsService.getDirections({
  origin: { lat: 40.7128, lng: -74.0060 }, // New York
  destination: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  waypoints: [
    { lat: 39.9526, lng: -75.1652 }, // Philadelphia
    { lat: 38.9072, lng: -77.0369 }  // Washington DC
  ],
  optimizeWaypoints: true,
  travelMode: 'DRIVING',
  avoidHighways: false,
  avoidTolls: true
});

console.log('Distance:', route.distance);
console.log('Duration:', route.duration);
console.log('Optimized waypoint order:', route.waypointOrder);
```

### Places Search

```typescript
// Search for restaurants near a location
const places = await googleMapsService.searchPlaces('restaurants', {
  location: { lat: 40.7128, lng: -74.0060 },
  radius: 5000, // 5km
  type: 'restaurant',
  maxResults: 20
});

places.forEach(place => {
  console.log(`${place.name}: ${place.formattedAddress}`);
  console.log(`Rating: ${place.rating} ⭐`);
});
```

### Distance Matrix

```typescript
// Calculate distances between multiple origins and destinations
const distances = await googleMapsService.getDistanceMatrix(
  [
    { lat: 40.7128, lng: -74.0060 }, // New York
    { lat: 34.0522, lng: -118.2437 }  // Los Angeles
  ],
  [
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 41.8781, lng: -87.6298 }   // Chicago
  ],
  {
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: true
  }
);

distances.forEach(result => {
  console.log(`${result.origin.lat},${result.origin.lng} to ${result.destination.lat},${result.destination.lng}: ${result.distance} (${result.duration})`);
});
```

## Database Schema

### Routes Table

```sql
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  origin JSONB NOT NULL,
  destination JSONB NOT NULL,
  waypoints JSONB,
  distance TEXT,
  duration TEXT,
  duration_in_traffic TEXT,
  polyline TEXT,
  bounds JSONB,
  travel_mode TEXT DEFAULT 'DRIVING',
  avoid_highways BOOLEAN DEFAULT false,
  avoid_tolls BOOLEAN DEFAULT false,
  avoid_ferries BOOLEAN DEFAULT false,
  optimize_waypoints BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Locations Table

```sql
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  place_id TEXT,
  types TEXT[],
  rating DECIMAL(3, 2),
  formatted_address TEXT,
  phone_number TEXT,
  website TEXT,
  opening_hours JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Saved Places Table

```sql
CREATE TABLE public.saved_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Reference

### GoogleMapsService Class

#### Constructor
```typescript
constructor(apiKey: string)
```

#### Methods

##### initialize(config: GoogleMapsConfig)
Initialize the Google Maps API and services.

```typescript
await googleMapsService.initialize({
  apiKey: 'your_api_key',
  libraries: ['places', 'geometry'],
  region: 'US',
  language: 'en'
});
```

##### initializeMap(element: HTMLElement, options: MapOptions)
Initialize a map instance on the specified element.

```typescript
const map = googleMapsService.initializeMap(mapElement, {
  zoom: 10,
  center: { lat: 40.7128, lng: -74.0060 },
  mapTypeId: google.maps.MapTypeId.ROADMAP
});
```

##### geocodeAddress(address: string)
Convert an address to coordinates.

```typescript
const results = await googleMapsService.geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
```

##### reverseGeocode(location: Location)
Convert coordinates to an address.

```typescript
const results = await googleMapsService.reverseGeocode({ lat: 37.7749, lng: -122.4194 });
```

##### getDirections(route: Route)
Get directions between two or more points.

```typescript
const route = await googleMapsService.getDirections({
  origin: { lat: 40.7128, lng: -74.0060 },
  destination: { lat: 34.0522, lng: -118.2437 },
  travelMode: 'DRIVING'
});
```

##### searchPlaces(query: string, options: PlacesSearchOptions)
Search for places using the Places API.

```typescript
const places = await googleMapsService.searchPlaces('restaurants', {
  location: { lat: 40.7128, lng: -74.0060 },
  radius: 5000,
  type: 'restaurant'
});
```

##### getDistanceMatrix(origins: Location[], destinations: Location[], options: DistanceMatrixOptions)
Calculate distances between multiple origins and destinations.

```typescript
const distances = await googleMapsService.getDistanceMatrix(
  [origin1, origin2],
  [destination1, destination2],
  { travelMode: 'DRIVING' }
);
```

##### getCurrentLocation()
Get the user's current GPS location.

```typescript
const location = await googleMapsService.getCurrentLocation();
```

##### createMarker(location: Location, options?: MarkerOptions)
Create a marker on the map.

```typescript
const marker = googleMapsService.createMarker(location, {
  title: 'My Location',
  icon: customIcon
});
```

##### drawRoute(routeResult: RouteResult, options?: PolylineOptions)
Draw a route on the map.

```typescript
const polyline = googleMapsService.drawRoute(routeResult, {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 4
});
```

### Database Functions

#### get_cached_distance_matrix()
Get cached distance matrix results.

```sql
SELECT * FROM public.get_cached_distance_matrix(
  '{"lat": 40.7128, "lng": -74.0060}'::jsonb,
  '{"lat": 34.0522, "lng": -118.2437}'::jsonb,
  'DRIVING'
);
```

#### get_nearby_locations()
Find locations within a specified radius.

```sql
SELECT * FROM public.get_nearby_locations(
  40.7128, -74.0060, 10.0, 50
);
```

#### get_favorite_places()
Get user's favorite places.

```sql
SELECT * FROM public.get_favorite_places('user_uuid');
```

#### get_route_statistics()
Get route statistics for a user.

```sql
SELECT * FROM public.get_route_statistics('user_uuid', 30);
```

## Configuration

### Environment Variables

```bash
# Required
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_REGION=US
NEXT_PUBLIC_GOOGLE_MAPS_LANGUAGE=en
```

### Map Settings

```typescript
const mapSettings = {
  defaultCenter: { lat: 40.7128, lng: -74.0060 },
  defaultZoom: 10,
  preferredTravelMode: 'DRIVING',
  avoidHighways: false,
  avoidTolls: false,
  optimizeWaypoints: true
};
```

## Security

### API Key Security
- Store API keys in environment variables
- Restrict API keys to specific domains
- Enable API restrictions in Google Cloud Console
- Monitor API usage for unusual activity

### Row Level Security (RLS)
All tables have RLS policies enabled:
- Users can only access their own data
- Organization-based data isolation
- Secure access to cached data

### Rate Limiting
- Implement client-side rate limiting
- Monitor API quota usage
- Cache frequently requested data
- Use distance matrix for bulk calculations

## Performance Optimization

### Caching Strategy
- **Geocoding Cache**: 30-day cache for address lookups
- **Distance Matrix Cache**: 24-hour cache for route calculations
- **Places Cache**: 7-day cache for place searches

### Database Indexes
- Spatial indexes on location coordinates
- Composite indexes for efficient queries
- Partial indexes for active data

### API Usage Optimization
- Batch distance matrix requests
- Use nearby search for location-based queries
- Implement request debouncing
- Cache static map tiles

## Error Handling

### Common Errors

```typescript
try {
  const route = await googleMapsService.getDirections(routeRequest);
} catch (error) {
  if (error.message.includes('ZERO_RESULTS')) {
    console.log('No route found');
  } else if (error.message.includes('OVER_QUERY_LIMIT')) {
    console.log('API quota exceeded');
  } else if (error.message.includes('REQUEST_DENIED')) {
    console.log('API key invalid or restricted');
  }
}
```

### Error Recovery
- Implement exponential backoff for rate limits
- Fallback to cached data when API fails
- Graceful degradation for unsupported features
- User-friendly error messages

## Monitoring & Analytics

### Usage Metrics
- API request counts by endpoint
- Response times and error rates
- Cache hit/miss ratios
- User engagement metrics

### Performance Monitoring
- Map load times
- Route calculation performance
- Database query performance
- Memory usage optimization

### Cost Optimization
- Monitor API usage costs
- Implement usage quotas
- Optimize request patterns
- Use appropriate API tiers

## Troubleshooting

### Common Issues

#### 1. Map Not Loading
- Check API key validity
- Verify API restrictions
- Check browser console for errors
- Ensure HTTPS for production

#### 2. Geocoding Failures
- Verify address format
- Check API quota limits
- Review API restrictions
- Test with known addresses

#### 3. Route Calculation Errors
- Validate coordinates
- Check travel mode support
- Verify waypoint limits
- Review API restrictions

#### 4. Performance Issues
- Implement caching
- Optimize database queries
- Reduce API calls
- Use appropriate zoom levels

### Debug Commands

```sql
-- Check API usage
SELECT COUNT(*) FROM public.distance_matrix_cache WHERE cached_at > NOW() - INTERVAL '1 day';

-- View recent routes
SELECT * FROM public.routes ORDER BY created_at DESC LIMIT 10;

-- Check cache efficiency
SELECT 
  COUNT(*) as total_requests,
  COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as cached_requests
FROM public.geocoding_cache;
```

## Best Practices

### 1. API Usage
- Implement proper error handling
- Use appropriate rate limiting
- Cache frequently requested data
- Monitor usage quotas

### 2. User Experience
- Provide loading states
- Show meaningful error messages
- Implement progressive enhancement
- Optimize for mobile devices

### 3. Performance
- Use efficient database queries
- Implement proper caching
- Optimize map rendering
- Minimize API calls

### 4. Security
- Secure API key storage
- Implement proper access controls
- Validate user inputs
- Monitor for abuse

## Examples

### Complete Route Planning Example

```tsx
import React, { useState } from 'react';
import { GoogleMapsComponent } from '@/components/maps/GoogleMapsComponent';
import { RouteResult, Location } from '@/lib/google-maps';

function RoutePlanningPage() {
  const [currentRoute, setCurrentRoute] = useState<RouteResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleRouteCalculated = (route: RouteResult) => {
    setCurrentRoute(route);
    console.log('Route calculated:', route);
  };

  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location);
    console.log('Location selected:', location);
  };

  return (
    <div>
      <GoogleMapsComponent
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        height="600px"
        showControls={true}
        onRouteCalculated={handleRouteCalculated}
        onLocationSelected={handleLocationSelected}
      />
      
      {currentRoute && (
        <div>
          <h3>Route Information</h3>
          <p>Distance: {currentRoute.distance}</p>
          <p>Duration: {currentRoute.duration}</p>
        </div>
      )}
    </div>
  );
}
```

### Custom Map Implementation

```tsx
import React, { useEffect, useRef } from 'react';
import { getGoogleMapsService } from '@/lib/google-maps';

function CustomMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapsService = getGoogleMapsService(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

  useEffect(() => {
    const initializeMap = async () => {
      await googleMapsService.initialize({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ['places', 'geometry']
      });

      if (mapRef.current) {
        googleMapsService.initializeMap(mapRef.current, {
          zoom: 12,
          center: { lat: 40.7128, lng: -74.0060 }
        });
      }
    };

    initializeMap();
  }, []);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
}
```

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Google Maps API documentation
3. Check browser console for errors
4. Verify API key and restrictions
5. Monitor API usage quotas

## License

This integration uses the Google Maps JavaScript API, which is subject to Google's Terms of Service and usage policies.
