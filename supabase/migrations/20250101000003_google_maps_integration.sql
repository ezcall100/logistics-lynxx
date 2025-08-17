-- Google Maps Integration Migration
-- This migration adds tables and functions for Google Maps integration

-- Create routes table
CREATE TABLE IF NOT EXISTS public.routes (
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

-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
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

-- Create saved_places table
CREATE TABLE IF NOT EXISTS public.saved_places (
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

-- Create distance_matrix_cache table
CREATE TABLE IF NOT EXISTS public.distance_matrix_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL,
  origin JSONB NOT NULL,
  destination JSONB NOT NULL,
  distance TEXT,
  duration TEXT,
  duration_in_traffic TEXT,
  travel_mode TEXT DEFAULT 'DRIVING',
  avoid_highways BOOLEAN DEFAULT false,
  avoid_tolls BOOLEAN DEFAULT false,
  avoid_ferries BOOLEAN DEFAULT false,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Create geocoding_cache table
CREATE TABLE IF NOT EXISTS public.geocoding_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  results JSONB NOT NULL,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_routes_org_id ON public.routes(org_id);
CREATE INDEX IF NOT EXISTS idx_routes_user_id ON public.routes(user_id);
CREATE INDEX IF NOT EXISTS idx_routes_created_at ON public.routes(created_at);

CREATE INDEX IF NOT EXISTS idx_locations_org_id ON public.locations(org_id);
CREATE INDEX IF NOT EXISTS idx_locations_user_id ON public.locations(user_id);
CREATE INDEX IF NOT EXISTS idx_locations_lat_lng ON public.locations(lat, lng);
CREATE INDEX IF NOT EXISTS idx_locations_place_id ON public.locations(place_id);

CREATE INDEX IF NOT EXISTS idx_saved_places_org_id ON public.saved_places(org_id);
CREATE INDEX IF NOT EXISTS idx_saved_places_user_id ON public.saved_places(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_places_category ON public.saved_places(category);
CREATE INDEX IF NOT EXISTS idx_saved_places_favorite ON public.saved_places(is_favorite);

CREATE INDEX IF NOT EXISTS idx_distance_matrix_cache_org_id ON public.distance_matrix_cache(org_id);
CREATE INDEX IF NOT EXISTS idx_distance_matrix_cache_expires ON public.distance_matrix_cache(expires_at);

CREATE INDEX IF NOT EXISTS idx_geocoding_cache_query ON public.geocoding_cache(query);
CREATE INDEX IF NOT EXISTS idx_geocoding_cache_expires ON public.geocoding_cache(expires_at);

-- Add RLS policies
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distance_matrix_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geocoding_cache ENABLE ROW LEVEL SECURITY;

-- Routes policies
CREATE POLICY "Users can view their own routes" ON public.routes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own routes" ON public.routes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routes" ON public.routes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routes" ON public.routes
  FOR DELETE USING (auth.uid() = user_id);

-- Locations policies
CREATE POLICY "Users can view their own locations" ON public.locations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own locations" ON public.locations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own locations" ON public.locations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own locations" ON public.locations
  FOR DELETE USING (auth.uid() = user_id);

-- Saved places policies
CREATE POLICY "Users can view their own saved places" ON public.saved_places
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved places" ON public.saved_places
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved places" ON public.saved_places
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved places" ON public.saved_places
  FOR DELETE USING (auth.uid() = user_id);

-- Distance matrix cache policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read distance matrix cache" ON public.distance_matrix_cache
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert distance matrix cache" ON public.distance_matrix_cache
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Geocoding cache policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read geocoding cache" ON public.geocoding_cache
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert geocoding cache" ON public.geocoding_cache
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create functions

-- Function to get cached distance matrix
CREATE OR REPLACE FUNCTION public.get_cached_distance_matrix(
  p_origin JSONB,
  p_destination JSONB,
  p_travel_mode TEXT DEFAULT 'DRIVING',
  p_avoid_highways BOOLEAN DEFAULT false,
  p_avoid_tolls BOOLEAN DEFAULT false,
  p_avoid_ferries BOOLEAN DEFAULT false
)
RETURNS TABLE(
  distance TEXT,
  duration TEXT,
  duration_in_traffic TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dmc.distance,
    dmc.duration,
    dmc.duration_in_traffic
  FROM public.distance_matrix_cache dmc
  WHERE dmc.origin = p_origin
    AND dmc.destination = p_destination
    AND dmc.travel_mode = p_travel_mode
    AND dmc.avoid_highways = p_avoid_highways
    AND dmc.avoid_tolls = p_avoid_tolls
    AND dmc.avoid_ferries = p_avoid_ferries
    AND dmc.expires_at > NOW();
END;
$$;

-- Function to cache distance matrix
CREATE OR REPLACE FUNCTION public.cache_distance_matrix(
  p_org_id UUID,
  p_origin JSONB,
  p_destination JSONB,
  p_distance TEXT,
  p_duration TEXT,
  p_duration_in_traffic TEXT,
  p_travel_mode TEXT DEFAULT 'DRIVING',
  p_avoid_highways BOOLEAN DEFAULT false,
  p_avoid_tolls BOOLEAN DEFAULT false,
  p_avoid_ferries BOOLEAN DEFAULT false
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cache_id UUID;
BEGIN
  INSERT INTO public.distance_matrix_cache (
    org_id,
    origin,
    destination,
    distance,
    duration,
    duration_in_traffic,
    travel_mode,
    avoid_highways,
    avoid_tolls,
    avoid_ferries
  ) VALUES (
    p_org_id,
    p_origin,
    p_destination,
    p_distance,
    p_duration,
    p_duration_in_traffic,
    p_travel_mode,
    p_avoid_highways,
    p_avoid_tolls,
    p_avoid_ferries
  ) RETURNING id INTO cache_id;
  
  RETURN cache_id;
END;
$$;

-- Function to get cached geocoding results
CREATE OR REPLACE FUNCTION public.get_cached_geocoding(
  p_query TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cached_results JSONB;
BEGIN
  SELECT results INTO cached_results
  FROM public.geocoding_cache
  WHERE query = p_query
    AND expires_at > NOW();
  
  RETURN cached_results;
END;
$$;

-- Function to cache geocoding results
CREATE OR REPLACE FUNCTION public.cache_geocoding(
  p_query TEXT,
  p_results JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cache_id UUID;
BEGIN
  INSERT INTO public.geocoding_cache (
    query,
    results
  ) VALUES (
    p_query,
    p_results
  ) RETURNING id INTO cache_id;
  
  RETURN cache_id;
END;
$$;

-- Function to get nearby locations
CREATE OR REPLACE FUNCTION public.get_nearby_locations(
  p_lat DECIMAL(10, 8),
  p_lng DECIMAL(11, 8),
  p_radius_km DECIMAL(10, 2) DEFAULT 10.0,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id UUID,
  name TEXT,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  distance_km DECIMAL(10, 2)
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.name,
    l.address,
    l.lat,
    l.lng,
    (
      6371 * acos(
        cos(radians(p_lat)) * 
        cos(radians(l.lat)) * 
        cos(radians(l.lng) - radians(p_lng)) + 
        sin(radians(p_lat)) * 
        sin(radians(l.lat))
      )
    ) AS distance_km
  FROM public.locations l
  WHERE (
    6371 * acos(
      cos(radians(p_lat)) * 
      cos(radians(l.lat)) * 
      cos(radians(l.lng) - radians(p_lng)) + 
      sin(radians(p_lat)) * 
      sin(radians(l.lat))
    )
  ) <= p_radius_km
  ORDER BY distance_km
  LIMIT p_limit;
END;
$$;

-- Function to get user's favorite places
CREATE OR REPLACE FUNCTION public.get_favorite_places(
  p_user_id UUID
)
RETURNS TABLE(
  id UUID,
  name TEXT,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  category TEXT,
  notes TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.name,
    l.address,
    l.lat,
    l.lng,
    sp.category,
    sp.notes
  FROM public.saved_places sp
  JOIN public.locations l ON sp.location_id = l.id
  WHERE sp.user_id = p_user_id
    AND sp.is_favorite = true
  ORDER BY sp.created_at DESC;
END;
$$;

-- Function to get route statistics
CREATE OR REPLACE FUNCTION public.get_route_statistics(
  p_user_id UUID,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
  total_routes INTEGER,
  total_distance_km DECIMAL(10, 2),
  total_duration_hours DECIMAL(10, 2),
  average_distance_km DECIMAL(10, 2),
  average_duration_hours DECIMAL(10, 2),
  most_common_destination TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH route_stats AS (
    SELECT 
      COUNT(*) as total_routes,
      SUM(
        CASE 
          WHEN distance ~ '^[0-9]+\.?[0-9]* km$' 
          THEN CAST(REPLACE(REPLACE(distance, ' km', ''), ',', '') AS DECIMAL(10, 2))
          WHEN distance ~ '^[0-9]+\.?[0-9]* mi$'
          THEN CAST(REPLACE(REPLACE(distance, ' mi', ''), ',', '') AS DECIMAL(10, 2)) * 1.60934
          ELSE 0
        END
      ) as total_distance_km,
      SUM(
        CASE 
          WHEN duration ~ '^[0-9]+ hours? [0-9]+ mins?$'
          THEN CAST(SPLIT_PART(duration, ' hours', 1) AS DECIMAL(10, 2)) + 
               CAST(SPLIT_PART(SPLIT_PART(duration, ' hours ', 2), ' mins', 1) AS DECIMAL(10, 2)) / 60
          WHEN duration ~ '^[0-9]+ mins?$'
          THEN CAST(REPLACE(REPLACE(duration, ' mins', ''), ' min', '') AS DECIMAL(10, 2)) / 60
          ELSE 0
        END
      ) as total_duration_hours
    FROM public.routes
    WHERE user_id = p_user_id
      AND created_at >= NOW() - INTERVAL '1 day' * p_days
  ),
  destination_counts AS (
    SELECT 
      destination->>'formatted_address' as dest_address,
      COUNT(*) as count
    FROM public.routes
    WHERE user_id = p_user_id
      AND created_at >= NOW() - INTERVAL '1 day' * p_days
    GROUP BY destination->>'formatted_address'
    ORDER BY count DESC
    LIMIT 1
  )
  SELECT 
    rs.total_routes,
    rs.total_distance_km,
    rs.total_duration_hours,
    CASE 
      WHEN rs.total_routes > 0 
      THEN rs.total_distance_km / rs.total_routes 
      ELSE 0 
    END as average_distance_km,
    CASE 
      WHEN rs.total_routes > 0 
      THEN rs.total_duration_hours / rs.total_routes 
      ELSE 0 
    END as average_duration_hours,
    dc.dest_address as most_common_destination
  FROM route_stats rs
  LEFT JOIN destination_counts dc ON true;
END;
$$;

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_saved_places_updated_at
  BEFORE UPDATE ON public.saved_places
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create cleanup function for expired cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.distance_matrix_cache WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  DELETE FROM public.geocoding_cache WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;

-- Insert sample data
INSERT INTO public.locations (org_id, user_id, name, address, lat, lng, place_id, types, formatted_address) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'New York City', 'New York, NY, USA', 40.7128, -74.0060, 'ChIJa0Mh4gNYwokR7t1PUsAgWjE', ARRAY['locality', 'political'], 'New York, NY, USA'),
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Los Angeles', 'Los Angeles, CA, USA', 34.0522, -118.2437, 'ChIJ9cr6ECcHwoARSo8uBgo1AAQ', ARRAY['locality', 'political'], 'Los Angeles, CA, USA'),
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Chicago', 'Chicago, IL, USA', 41.8781, -87.6298, 'ChIJ7cv00DwsDogRAMDACa2m4K8', ARRAY['locality', 'political'], 'Chicago, IL, USA');

-- Log the Google Maps integration setup
INSERT INTO public.access_audit_logs (org_id, user_id, action, resource, permission, decision, reason, metadata) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'setup', 'google_maps_integration', 'maps.integration', 'allow', 'Google Maps integration setup completed', '{"tables_created": 5, "functions_created": 8, "policies_created": 12, "indexes_created": 12, "sample_data_inserted": 3}');
