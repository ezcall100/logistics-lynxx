import { createClient } from '@supabase/supabase-js';

// Google Maps API Types
export interface GoogleMapsConfig {
  apiKey: string;
  libraries?: string[];
  region?: string;
  language?: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  placeId?: string;
}

export interface Route {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
  optimizeWaypoints?: boolean;
  travelMode?: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  avoidFerries?: boolean;
}

export interface RouteResult {
  distance: string;
  duration: string;
  durationInTraffic?: string;
  polyline: string;
  bounds: {
    northeast: Location;
    southwest: Location;
  };
  waypointOrder?: number[];
  fare?: {
    currency: string;
    value: number;
  };
}

export interface GeocodingResult {
  location: Location;
  formattedAddress: string;
  placeId: string;
  types: string[];
  components: {
    street_number?: string;
    route?: string;
    locality?: string;
    administrative_area_level_1?: string;
    country?: string;
    postal_code?: string;
  };
}

export interface PlacesSearchResult {
  placeId: string;
  name: string;
  location: Location;
  rating?: number;
  types: string[];
  photos?: string[];
  formattedAddress: string;
  phoneNumber?: string;
  website?: string;
  openingHours?: {
    openNow: boolean;
    periods?: any[];
    weekdayText?: string[];
  };
}

export interface DistanceMatrixResult {
  origin: Location;
  destination: Location;
  distance: string;
  duration: string;
  durationInTraffic?: string;
  status: string;
}

class GoogleMapsService {
  private apiKey: string;
  private supabase: any;
  private map: google.maps.Map | null = null;
  private directionsService: google.maps.DirectionsService | null = null;
  private geocoder: google.maps.Geocoder | null = null;
  private placesService: google.maps.places.PlacesService | null = null;
  private distanceMatrixService: google.maps.DistanceMatrixService | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // Initialize Google Maps API
  async initialize(config: GoogleMapsConfig): Promise<void> {
    try {
      // Load Google Maps API script
      await this.loadGoogleMapsScript(config);
      
      // Initialize services
      this.directionsService = new google.maps.DirectionsService();
      this.geocoder = new google.maps.Geocoder();
      this.distanceMatrixService = new google.maps.DistanceMatrixService();
      
      console.log('✅ Google Maps API initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Google Maps API:', error);
      throw error;
    }
  }

  private loadGoogleMapsScript(config: GoogleMapsConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=${config.libraries?.join(',') || 'places,geometry'}&region=${config.region || 'US'}&language=${config.language || 'en'}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Maps API'));
      
      document.head.appendChild(script);
    });
  }

  // Initialize map instance
  initializeMap(element: HTMLElement, options: google.maps.MapOptions): google.maps.Map {
    this.map = new google.maps.Map(element, {
      zoom: 10,
      center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      ...options
    });

    // Initialize Places service if map is available
    if (this.map) {
      this.placesService = new google.maps.places.PlacesService(this.map);
    }

    return this.map;
  }

  // Geocoding: Convert address to coordinates
  async geocodeAddress(address: string): Promise<GeocodingResult[]> {
    if (!this.geocoder) {
      throw new Error('Google Maps API not initialized');
    }

    return new Promise((resolve, reject) => {
      this.geocoder!.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const geocodingResults: GeocodingResult[] = results.map(result => ({
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              address: result.formatted_address,
              placeId: result.place_id
            },
            formattedAddress: result.formatted_address,
            placeId: result.place_id,
            types: result.types,
            components: this.extractAddressComponents(result.address_components)
          }));
          resolve(geocodingResults);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }

  // Reverse geocoding: Convert coordinates to address
  async reverseGeocode(location: Location): Promise<GeocodingResult[]> {
    if (!this.geocoder) {
      throw new Error('Google Maps API not initialized');
    }

    return new Promise((resolve, reject) => {
      this.geocoder!.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const geocodingResults: GeocodingResult[] = results.map(result => ({
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              address: result.formatted_address,
              placeId: result.place_id
            },
            formattedAddress: result.formatted_address,
            placeId: result.place_id,
            types: result.types,
            components: this.extractAddressComponents(result.address_components)
          }));
          resolve(geocodingResults);
        } else {
          reject(new Error(`Reverse geocoding failed: ${status}`));
        }
      });
    });
  }

  // Get directions between two points
  async getDirections(route: Route): Promise<RouteResult> {
    if (!this.directionsService) {
      throw new Error('Google Maps API not initialized');
    }

    const request: google.maps.DirectionsRequest = {
      origin: route.origin,
      destination: route.destination,
      waypoints: route.waypoints?.map(wp => ({ location: wp, stopover: true })),
      optimizeWaypoints: route.optimizeWaypoints || false,
      travelMode: google.maps.TravelMode[route.travelMode || 'DRIVING'],
      avoidHighways: route.avoidHighways || false,
      avoidTolls: route.avoidTolls || false,
      avoidFerries: route.avoidFerries || false,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.BEST_GUESS
      }
    };

    return new Promise((resolve, reject) => {
      this.directionsService!.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const route = result.routes[0];
          const leg = route.legs[0];
          
          const routeResult: RouteResult = {
            distance: leg.distance?.text || '',
            duration: leg.duration?.text || '',
            durationInTraffic: leg.duration_in_traffic?.text,
            polyline: route.overview_polyline,
            bounds: {
              northeast: {
                lat: route.bounds?.getNorthEast().lat() || 0,
                lng: route.bounds?.getNorthEast().lng() || 0
              },
              southwest: {
                lat: route.bounds?.getSouthWest().lat() || 0,
                lng: route.bounds?.getSouthWest().lng() || 0
              }
            },
            waypointOrder: route.waypoint_order,
            fare: route.fare ? {
              currency: route.fare.currency,
              value: route.fare.value
            } : undefined
          };
          resolve(routeResult);
        } else {
          reject(new Error(`Directions failed: ${status}`));
        }
      });
    });
  }

  // Search for places
  async searchPlaces(query: string, options: {
    location?: Location;
    radius?: number;
    type?: string;
    maxResults?: number;
  } = {}): Promise<PlacesSearchResult[]> {
    if (!this.placesService) {
      throw new Error('Google Maps API not initialized');
    }

    const request: google.maps.places.PlaceSearchRequest = {
      query,
      location: options.location,
      radius: options.radius || 50000,
      type: options.type as any,
      maxResults: options.maxResults || 20
    };

    return new Promise((resolve, reject) => {
      this.placesService!.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const placesResults: PlacesSearchResult[] = results.map(place => ({
            placeId: place.place_id,
            name: place.name,
            location: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0
            },
            rating: place.rating,
            types: place.types || [],
            formattedAddress: place.formatted_address,
            openingHours: place.opening_hours ? {
              openNow: place.opening_hours.open_now,
              periods: place.opening_hours.periods,
              weekdayText: place.opening_hours.weekday_text
            } : undefined
          }));
          resolve(placesResults);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  }

  // Get distance matrix
  async getDistanceMatrix(origins: Location[], destinations: Location[], options: {
    travelMode?: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';
    avoidHighways?: boolean;
    avoidTolls?: boolean;
    avoidFerries?: boolean;
  } = {}): Promise<DistanceMatrixResult[]> {
    if (!this.distanceMatrixService) {
      throw new Error('Google Maps API not initialized');
    }

    const request: google.maps.DistanceMatrixRequest = {
      origins: origins,
      destinations: destinations,
      travelMode: google.maps.TravelMode[options.travelMode || 'DRIVING'],
      avoidHighways: options.avoidHighways || false,
      avoidTolls: options.avoidTolls || false,
      avoidFerries: options.avoidFerries || false,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.BEST_GUESS
      }
    };

    return new Promise((resolve, reject) => {
      this.distanceMatrixService!.getDistanceMatrix(request, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          const results: DistanceMatrixResult[] = [];
          
          response.rows.forEach((row, i) => {
            row.elements.forEach((element, j) => {
              if (element.status === google.maps.DistanceMatrixElementStatus.OK) {
                results.push({
                  origin: origins[i],
                  destination: destinations[j],
                  distance: element.distance?.text || '',
                  duration: element.duration?.text || '',
                  durationInTraffic: element.duration_in_traffic?.text,
                  status: element.status
                });
              }
            });
          });
          
          resolve(results);
        } else {
          reject(new Error(`Distance matrix failed: ${status}`));
        }
      });
    });
  }

  // Calculate distance between two points
  calculateDistance(point1: Location, point2: Location): number {
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(point1.lat, point1.lng),
      new google.maps.LatLng(point2.lat, point2.lng)
    );
  }

  // Get optimized route for multiple destinations
  async getOptimizedRoute(origin: Location, destinations: Location[]): Promise<{
    route: RouteResult;
    optimizedOrder: number[];
  }> {
    const route: Route = {
      origin,
      destination: destinations[destinations.length - 1],
      waypoints: destinations.slice(0, -1),
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    };

    const routeResult = await this.getDirections(route);
    
    return {
      route: routeResult,
      optimizedOrder: routeResult.waypointOrder || []
    };
  }

  // Save route to database
  async saveRoute(route: Route, routeResult: RouteResult, metadata?: any): Promise<string> {
    const { data, error } = await this.supabase
      .from('routes')
      .insert({
        origin: route.origin,
        destination: route.destination,
        waypoints: route.waypoints,
        distance: routeResult.distance,
        duration: routeResult.duration,
        polyline: routeResult.polyline,
        bounds: routeResult.bounds,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save route: ${error.message}`);
    }

    return data.id;
  }

  // Get saved routes
  async getSavedRoutes(limit: number = 10): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('routes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to get saved routes: ${error.message}`);
    }

    return data || [];
  }

  // Extract address components from Google Maps result
  private extractAddressComponents(components: google.maps.GeocoderAddressComponent[]): any {
    const result: any = {};
    
    components.forEach(component => {
      const type = component.types[0];
      result[type] = component.long_name;
    });
    
    return result;
  }

  // Get current location
  getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error(`Geolocation failed: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  // Create marker on map
  createMarker(location: Location, options?: google.maps.MarkerOptions): google.maps.Marker {
    if (!this.map) {
      throw new Error('Map not initialized');
    }

    return new google.maps.Marker({
      position: location,
      map: this.map,
      ...options
    });
  }

  // Create info window
  createInfoWindow(content: string, options?: google.maps.InfoWindowOptions): google.maps.InfoWindow {
    return new google.maps.InfoWindow({
      content,
      ...options
    });
  }

  // Draw route on map
  drawRoute(routeResult: RouteResult, options?: google.maps.PolylineOptions): google.maps.Polyline {
    if (!this.map) {
      throw new Error('Map not initialized');
    }

    const path = google.maps.geometry.encoding.decodePath(routeResult.polyline);
    
    return new google.maps.Polyline({
      path,
      map: this.map,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      ...options
    });
  }

  // Clear map
  clearMap(): void {
    if (this.map) {
      // Clear all overlays
      this.map.setZoom(10);
      this.map.setCenter({ lat: 40.7128, lng: -74.0060 });
    }
  }

  // Get map instance
  getMap(): google.maps.Map | null {
    return this.map;
  }

  // Destroy map instance
  destroyMap(): void {
    if (this.map) {
      // Clear all event listeners and overlays
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }
  }
}

// Export singleton instance
let googleMapsInstance: GoogleMapsService | null = null;

export const getGoogleMapsService = (apiKey?: string): GoogleMapsService => {
  if (!googleMapsInstance) {
    if (!apiKey) {
      throw new Error('Google Maps API key is required');
    }
    googleMapsInstance = new GoogleMapsService(apiKey);
  }
  return googleMapsInstance;
};

export default GoogleMapsService;
