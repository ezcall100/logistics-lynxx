/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// Feature flags configuration
const rawFlags = (import.meta.env.VITE_FLAGS || '').split(',').map(s => s.trim()).filter(Boolean);

// Environment-based flags
const envFlags = {
  development: ['debug_mode', 'dev_tools', 'mock_data'],
  staging: ['beta_features', 'new_ui'],
  production: ['autonomous_v1', 'advanced_analytics'],
};

// Get current environment
const currentEnv = import.meta.env.VITE_APP_ENV || 'development';

// Combine environment flags with explicit flags
const allFlags = new Set([
  ...rawFlags,
  ...(envFlags[currentEnv as keyof typeof envFlags] || []),
]);

/**
 * Check if a feature flag is enabled
 * @param flag - The feature flag name
 * @returns boolean indicating if the flag is enabled
 */
export const hasFlag = (flag: string): boolean => {
  return allFlags.has(flag);
};

/**
 * Get all enabled feature flags
 * @returns Array of enabled feature flags
 */
export const getEnabledFlags = (): string[] => {
  return Array.from(allFlags);
};

/**
 * Check if multiple flags are enabled (AND logic)
 * @param flags - Array of feature flags to check
 * @returns boolean indicating if all flags are enabled
 */
export const hasAllFlags = (flags: string[]): boolean => {
  return flags.every(flag => hasFlag(flag));
};

/**
 * Check if any of the flags are enabled (OR logic)
 * @param flags - Array of feature flags to check
 * @returns boolean indicating if any flag is enabled
 */
export const hasAnyFlag = (flags: string[]): boolean => {
  return flags.some(flag => hasFlag(flag));
};

/**
 * Feature flag wrapper for React components
 * @param Component - The component to conditionally render
 * @param flag - The feature flag to check
 * @param fallback - Optional fallback component when flag is disabled
 */
export function withFeatureFlag<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  flag: string,
  fallback?: React.ComponentType<T>
) {
  return (props: T) => {
    if (hasFlag(flag)) {
      return <Component {...props} />;
    }
    
    if (fallback) {
      return React.createElement(fallback, props);
    }
    
    return null;
  };
}

// Common feature flags
export const FEATURE_FLAGS = {
  // Autonomous features
  AUTONOMOUS_V1: 'autonomous_v1',
  AUTONOMOUS_V2: 'autonomous_v2',
  AI_INSIGHTS: 'ai_insights',
  
  // UI/UX features
  NEW_UI: 'new_ui',
  DARK_MODE: 'dark_mode',
  ADVANCED_CHARTS: 'advanced_charts',
  
  // Analytics features
  ADVANCED_ANALYTICS: 'advanced_analytics',
  REAL_TIME_DASHBOARD: 'real_time_dashboard',
  PREDICTIVE_MODELS: 'predictive_models',
  
  // Development features
  DEBUG_MODE: 'debug_mode',
  DEV_TOOLS: 'dev_tools',
  MOCK_DATA: 'mock_data',
  
  // Beta features
  BETA_FEATURES: 'beta_features',
  EXPERIMENTAL_PORTALS: 'experimental_portals',
  
  // Performance features
  LAZY_LOADING: 'lazy_loading',
  VIRTUALIZATION: 'virtualization',
  CACHE_OPTIMIZATION: 'cache_optimization',
} as const;

// Type-safe feature flag checking
export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

/**
 * Type-safe feature flag checker
 * @param flag - The feature flag to check
 * @returns boolean indicating if the flag is enabled
 */
export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  return hasFlag(flag);
};

// Log enabled flags in development
if (import.meta.env.DEV) {
  console.log('🚩 Enabled feature flags:', getEnabledFlags());
}
