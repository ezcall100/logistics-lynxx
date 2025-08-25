import type { Request, Response } from 'express';
import { trace } from '@opentelemetry/api';

// OTEL tracer for observability
const tracer = trace.getTracer('google-maps-api');

interface MapsApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  errorCode?: string;
}

// Helper function to make Google Maps API calls with OTEL tracing
async function callGoogleMapsApi(
  endpoint: string,
  params: Record<string, string>,
  spanName: string
): Promise<MapsApiResponse> {
  return tracer.startActiveSpan(spanName, async (span) => {
    try {
      const key = process.env['GOOGLE_MAPS_API_KEY'];
      if (!key) {
        span.setStatus({ code: 1, message: 'Server key missing' });
        span.end();
        return { 
          success: false, 
          error: 'Server key missing',
          errorCode: 'CONFIGURATION_ERROR'
        };
      }

      // Add API key to params
      params.key = key;

      // Build URL
      const url = new URL(`https://maps.googleapis.com/maps/api/${endpoint}/json`);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      // Add span attributes for observability
      span.setAttributes({
        'maps.api.endpoint': endpoint,
        'maps.api.params': JSON.stringify(params),
        'maps.api.url': url.toString(),
      });

      // Make the API call
      const response = await fetch(url.toString());
      const data = await response.json();

      // Check for Google Maps API errors
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        span.setStatus({ code: 1, message: `Google Maps API error: ${data.status}` });
        span.setAttributes({
          'maps.api.error': data.status,
          'maps.api.error_message': data.error_message || 'Unknown error',
        });
        span.end();
        return {
          success: false,
          error: data.error_message || `Google Maps API error: ${data.status}`,
          errorCode: data.status,
        };
      }

      span.setStatus({ code: 0 });
      span.end();
      return { success: true, data };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      span.setStatus({ code: 1, message: errorMessage });
      span.setAttributes({
        'maps.api.error': 'NETWORK_ERROR',
        'maps.api.error_message': errorMessage,
      });
      span.end();
      return {
        success: false,
        error: errorMessage,
        errorCode: 'NETWORK_ERROR',
      };
    }
  });
}

// Directions API endpoint
export async function directions(req: Request, res: Response) {
  const { origin, destination, waypoints, travelMode, avoid } = req.query;

  // Validate required parameters
  if (!origin || !destination) {
    return res.status(400).json({
      success: false,
      error: 'origin & destination required',
      errorCode: 'MISSING_PARAMETERS',
    });
  }

  // Build parameters
  const params: Record<string, string> = {
    origin: String(origin),
    destination: String(destination),
  };

  if (waypoints) {
    params.waypoints = String(waypoints);
  }

  if (travelMode) {
    params.mode = String(travelMode);
  }

  if (avoid) {
    params.avoid = String(avoid);
  }

  // Add span attributes for request context
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttributes({
      'maps.request.origin': String(origin),
      'maps.request.destination': String(destination),
      'maps.request.travel_mode': String(travelMode || 'driving'),
      'maps.request.has_waypoints': !!waypoints,
    });
  }

  const result = await callGoogleMapsApi('directions', params, 'google-maps-directions');

  if (result.success) {
    res.status(200).json(result);
  } else {
    // Map Google Maps error codes to appropriate HTTP status codes
    const statusCode = result.errorCode === 'OVER_QUERY_LIMIT' ? 429 : 500;
    res.status(statusCode).json(result);
  }
}

// Geocoding API endpoint
export async function geocode(req: Request, res: Response) {
  const { address, latlng, components } = req.query;

  // Validate parameters (either address or latlng must be provided)
  if (!address && !latlng) {
    return res.status(400).json({
      success: false,
      error: 'address or latlng required',
      errorCode: 'MISSING_PARAMETERS',
    });
  }

  // Build parameters
  const params: Record<string, string> = {};

  if (address) {
    params.address = String(address);
  }

  if (latlng) {
    params.latlng = String(latlng);
  }

  if (components) {
    params.components = String(components);
  }

  // Add span attributes for request context
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttributes({
      'maps.request.address': address ? String(address) : undefined,
      'maps.request.latlng': latlng ? String(latlng) : undefined,
      'maps.request.has_components': !!components,
    });
  }

  const result = await callGoogleMapsApi('geocode', params, 'google-maps-geocode');

  if (result.success) {
    res.status(200).json(result);
  } else {
    const statusCode = result.errorCode === 'OVER_QUERY_LIMIT' ? 429 : 500;
    res.status(statusCode).json(result);
  }
}

// Distance Matrix API endpoint
export async function distanceMatrix(req: Request, res: Response) {
  const { origins, destinations, mode, avoid } = req.query;

  // Validate required parameters
  if (!origins || !destinations) {
    return res.status(400).json({
      success: false,
      error: 'origins & destinations required',
      errorCode: 'MISSING_PARAMETERS',
    });
  }

  // Build parameters
  const params: Record<string, string> = {
    origins: String(origins),
    destinations: String(destinations),
  };

  if (mode) {
    params.mode = String(mode);
  }

  if (avoid) {
    params.avoid = String(avoid);
  }

  // Add span attributes for request context
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttributes({
      'maps.request.origins': String(origins),
      'maps.request.destinations': String(destinations),
      'maps.request.mode': String(mode || 'driving'),
    });
  }

  const result = await callGoogleMapsApi('distancematrix', params, 'google-maps-distance-matrix');

  if (result.success) {
    res.status(200).json(result);
  } else {
    const statusCode = result.errorCode === 'OVER_QUERY_LIMIT' ? 429 : 500;
    res.status(statusCode).json(result);
  }
}

// Places API endpoint
export async function placesSearch(req: Request, res: Response) {
  const { query, location, radius, type } = req.query;

  // Validate required parameters
  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'query required',
      errorCode: 'MISSING_PARAMETERS',
    });
  }

  // Build parameters
  const params: Record<string, string> = {
    query: String(query),
  };

  if (location) {
    params.location = String(location);
  }

  if (radius) {
    params.radius = String(radius);
  }

  if (type) {
    params.type = String(type);
  }

  // Add span attributes for request context
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttributes({
      'maps.request.query': String(query),
      'maps.request.location': location ? String(location) : undefined,
      'maps.request.radius': radius ? String(radius) : undefined,
      'maps.request.type': type ? String(type) : undefined,
    });
  }

  const result = await callGoogleMapsApi('place/textsearch', params, 'google-maps-places-search');

  if (result.success) {
    res.status(200).json(result);
  } else {
    const statusCode = result.errorCode === 'OVER_QUERY_LIMIT' ? 429 : 500;
    res.status(statusCode).json(result);
  }
}

// Health check endpoint
export async function mapsHealth(req: Request, res: Response) {
  const key = process.env['GOOGLE_MAPS_API_KEY'];
  
  if (!key) {
    return res.status(503).json({
      success: false,
      error: 'Google Maps API key not configured',
      errorCode: 'CONFIGURATION_ERROR',
    });
  }

  // Test with a simple geocoding request
  const result = await callGoogleMapsApi('geocode', { address: 'San Francisco, CA' }, 'google-maps-health-check');

  if (result.success) {
    res.status(200).json({
      success: true,
      message: 'Google Maps API is healthy',
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(503).json({
      success: false,
      error: 'Google Maps API health check failed',
      errorCode: result.errorCode,
      details: result.error,
    });
  }
}
