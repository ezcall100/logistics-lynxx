import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] || process.env['SUPABASE_URL'];
const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || process.env['SUPABASE_ANON_KEY'];

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Feature flag cache (in-memory for performance)
const featureFlagCache = new Map<string, { value: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Get feature flag value with caching
async function getFeatureFlag(key: string, defaultValue: any = null): Promise<any> {
  const now = Date.now();
  const cached = featureFlagCache.get(key);
  
  // Return cached value if still valid
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.value;
  }

  // If no Supabase, return default
  if (!supabase) {
    return defaultValue;
  }

  try {
    // Try to get from database
    const { data, error } = await supabase
      .from('feature_flags')
      .select('value, enabled')
      .eq('key', key)
      .single();

    if (error || !data) {
      // Fallback to environment variable
      const envValue = process.env[`FEATURE_FLAG_${key.toUpperCase()}`];
      const value = envValue ? JSON.parse(envValue) : defaultValue;
      
      // Cache the result
      featureFlagCache.set(key, { value, timestamp: now });
      return value;
    }

    const value = data.enabled ? data.value : false;
    
    // Cache the result
    featureFlagCache.set(key, { value, timestamp: now });
    return value;

  } catch (error) {
    console.error(`Error getting feature flag ${key}:`, error);
    return defaultValue;
  }
}

// Set feature flag value
async function setFeatureFlag(key: string, value: any, enabled: boolean = true): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('feature_flags')
      .upsert({
        key,
        value,
        enabled,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error(`Error setting feature flag ${key}:`, error);
      return false;
    }

    // Clear cache
    featureFlagCache.delete(key);
    return true;

  } catch (error) {
    console.error(`Error setting feature flag ${key}:`, error);
    return false;
  }
}

// Maps feature flag endpoint
export async function mapsEnabled(req: Request, res: Response) {
  try {
    const enabled = await getFeatureFlag('maps.enabled', true);
    
    res.status(200).json({
      success: true,
      enabled,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get maps feature flag',
      enabled: false, // Default to disabled on error
    });
  }
}

// Set maps feature flag (admin only)
export async function setMapsEnabled(req: Request, res: Response) {
  try {
    const { enabled, reason } = req.body;

    // Validate input
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'enabled must be a boolean',
      });
    }

    // Set the feature flag
    const success = await setFeatureFlag('maps.enabled', enabled, enabled);

    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to set maps feature flag',
      });
    }

    // Log the change for audit purposes
    console.log(`Maps feature flag ${enabled ? 'enabled' : 'disabled'} by ${req.ip} at ${new Date().toISOString()}. Reason: ${reason || 'No reason provided'}`);

    res.status(200).json({
      success: true,
      enabled,
      message: `Maps feature ${enabled ? 'enabled' : 'disabled'} successfully`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to set maps feature flag',
    });
  }
}

// Get all feature flags (admin only)
export async function getAllFeatureFlags(req: Request, res: Response) {
  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        error: 'Feature flag service unavailable',
      });
    }

    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .order('key');

    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to get feature flags',
      });
    }

    res.status(200).json({
      success: true,
      flags: data || [],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get feature flags',
    });
  }
}

// Health check for feature flags
export async function featureFlagsHealth(req: Request, res: Response) {
  try {
    const mapsEnabled = await getFeatureFlag('maps.enabled', true);
    
    res.status(200).json({
      success: true,
      message: 'Feature flags service is healthy',
      maps: {
        enabled: mapsEnabled,
        cacheSize: featureFlagCache.size,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Feature flags service is unhealthy',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
