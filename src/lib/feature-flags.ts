/**
 * 🚩 Trans Bot AI - Feature Flags Configuration
 * Controls canary rollout of features for production deployment
 */

export interface FeatureFlag {
  enabled: boolean;
  canaryTenants: string[];
  rolloutPercentage: number;
  description: string;
  lastUpdated: string;
}

export interface FeatureFlags {
  rates: FeatureFlag;
  directory: FeatureFlag;
  autonomousAgents: FeatureFlag;
  aiLoadMatching: FeatureFlag;
  realTimeNotifications: FeatureFlag;
}

// Default feature flags configuration
const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  rates: {
    enabled: false,
    canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2'],
    rolloutPercentage: 0,
    description: 'AI-powered rate quoting and contract management',
    lastUpdated: new Date().toISOString()
  },
  directory: {
    enabled: false,
    canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2'],
    rolloutPercentage: 0,
    description: 'Carrier directory with COI validation and compliance tracking',
    lastUpdated: new Date().toISOString()
  },
  autonomousAgents: {
    enabled: true, // Core feature, always enabled
    canaryTenants: ['00000000-0000-4000-8000-000000000001', 'transbotai-demo', 'partner-1'], // Added canary tenant for Day-0
    rolloutPercentage: 100,
    description: 'Autonomous AI agents for load matching and task automation',
    lastUpdated: new Date().toISOString()
  },
  aiLoadMatching: {
    enabled: true, // Core feature, always enabled
    canaryTenants: ['00000000-0000-4000-8000-000000000001', 'transbotai-demo', 'partner-1'], // Added canary tenant for Day-0
    rolloutPercentage: 100,
    description: 'AI-powered load matching and carrier recommendations',
    lastUpdated: new Date().toISOString()
  },
  realTimeNotifications: {
    enabled: true, // Core feature, always enabled
    canaryTenants: ['00000000-0000-4000-8000-000000000001', 'transbotai-demo', 'partner-1'], // Added canary tenant for Day-0
    rolloutPercentage: 100,
    description: 'Real-time notifications and alerts',
    lastUpdated: new Date().toISOString()
  }
};

// Environment-specific overrides
const ENVIRONMENT_OVERRIDES: Record<string, Partial<FeatureFlags>> = {
  development: {
    rates: {
      enabled: true,
      canaryTenants: ['*'],
      rolloutPercentage: 100,
      description: 'AI-powered rate quoting and contract management',
      lastUpdated: new Date().toISOString()
    },
    directory: {
      enabled: true,
      canaryTenants: ['*'],
      rolloutPercentage: 100,
      description: 'Carrier directory with COI validation and compliance tracking',
      lastUpdated: new Date().toISOString()
    }
  },
  staging: {
    rates: {
      enabled: true,
      canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2', 'partner-3'],
      rolloutPercentage: 50,
      description: 'AI-powered rate quoting and contract management',
      lastUpdated: new Date().toISOString()
    },
    directory: {
      enabled: true,
      canaryTenants: ['transbotai-demo', 'partner-1', 'partner-2', 'partner-3'],
      rolloutPercentage: 50,
      description: 'Carrier directory with COI validation and compliance tracking',
      lastUpdated: new Date().toISOString()
    }
  },
  production: {
    // Production uses default configuration (features disabled for canary rollout)
  }
};

/**
 * Get current environment
 */
function getEnvironment(): string {
  return process.env['NODE_ENV'] || 'development';
}

/**
 * Get feature flags for current environment
 */
export function getFeatureFlags(): FeatureFlags {
  const env = getEnvironment();
  const overrides = ENVIRONMENT_OVERRIDES[env] || {};
  
  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...overrides
  };
}

/**
 * Check if a feature is enabled for a specific tenant
 */
export function isFeatureEnabled(
  featureName: keyof FeatureFlags,
  tenantId?: string
): boolean {
  const flags = getFeatureFlags();
  const feature = flags[featureName];
  
  if (!feature) {
    console.warn(`Feature flag not found: ${featureName}`);
    return false;
  }
  
  // If feature is globally disabled, return false
  if (!feature.enabled) {
    return false;
  }
  
  // If no tenant ID provided, check global rollout percentage
  if (!tenantId) {
    return Math.random() * 100 < feature.rolloutPercentage;
  }
  
  // Check if tenant is in canary list
  if (feature.canaryTenants.includes('*') || feature.canaryTenants.includes(tenantId)) {
    return true;
  }
  
  // Check rollout percentage for non-canary tenants
  return Math.random() * 100 < feature.rolloutPercentage;
}

/**
 * Get feature flag status for a specific tenant
 */
export function getFeatureStatus(
  featureName: keyof FeatureFlags,
  tenantId?: string
): {
  enabled: boolean;
  reason: string;
  canary: boolean;
  rolloutPercentage: number;
} {
  const flags = getFeatureFlags();
  const feature = flags[featureName];
  
  if (!feature) {
    return {
      enabled: false,
      reason: 'Feature flag not found',
      canary: false,
      rolloutPercentage: 0
    };
  }
  
  const isCanary = tenantId ? feature.canaryTenants.includes(tenantId) : false;
  const enabled = isFeatureEnabled(featureName, tenantId);
  
  let reason = '';
  if (!feature.enabled) {
    reason = 'Feature globally disabled';
  } else if (isCanary) {
    reason = 'Tenant in canary list';
  } else if (feature.rolloutPercentage > 0) {
    reason = `Rollout percentage: ${feature.rolloutPercentage}%`;
  } else {
    reason = 'Feature not rolled out yet';
  }
  
  return {
    enabled,
    reason,
    canary: isCanary,
    rolloutPercentage: feature.rolloutPercentage
  };
}

/**
 * Update feature flag configuration
 */
export function updateFeatureFlag(
  featureName: keyof FeatureFlags,
  updates: Partial<FeatureFlag>
): void {
  const env = getEnvironment();
  
  if (!ENVIRONMENT_OVERRIDES[env]) {
    ENVIRONMENT_OVERRIDES[env] = {};
  }
  
  if (!ENVIRONMENT_OVERRIDES[env][featureName]) {
    ENVIRONMENT_OVERRIDES[env][featureName] = { ...DEFAULT_FEATURE_FLAGS[featureName] };
  }
  
  ENVIRONMENT_OVERRIDES[env][featureName] = {
    ...ENVIRONMENT_OVERRIDES[env][featureName],
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  
  console.log(`Feature flag updated: ${featureName}`, ENVIRONMENT_OVERRIDES[env][featureName]);
}

/**
 * Get all feature flags status for a tenant
 */
export function getAllFeatureStatus(tenantId?: string): Record<keyof FeatureFlags, any> {
  const flags = getFeatureFlags();
  const status: Record<string, any> = {};
  
  Object.keys(flags).forEach((featureName) => {
    status[featureName] = getFeatureStatus(featureName as keyof FeatureFlags, tenantId);
  });
  
  return status;
}

/**
 * React hook for feature flags (for use in components)
 */
export function useFeatureFlag(featureName: keyof FeatureFlags, tenantId?: string) {
  // This would be implemented with React's useState and useEffect
  // For now, return the synchronous version
  return {
    enabled: isFeatureEnabled(featureName, tenantId),
    status: getFeatureStatus(featureName, tenantId)
  };
}

/**
 * Feature flag components for conditional rendering
 */
export function FeatureFlag({
  name,
  tenantId,
  children,
  fallback = null
}: {
  name: keyof FeatureFlags;
  tenantId?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { enabled } = useFeatureFlag(name, tenantId);
  
  if (enabled) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}

/**
 * Canary rollout utilities
 */
export const CanaryRollout = {
  /**
   * Add tenant to canary list
   */
  addTenant(featureName: keyof FeatureFlags, tenantId: string): void {
    const flags = getFeatureFlags();
    const feature = flags[featureName];
    
    if (feature && !feature.canaryTenants.includes(tenantId)) {
      updateFeatureFlag(featureName, {
        canaryTenants: [...feature.canaryTenants, tenantId]
      });
    }
  },
  
  /**
   * Remove tenant from canary list
   */
  removeTenant(featureName: keyof FeatureFlags, tenantId: string): void {
    const flags = getFeatureFlags();
    const feature = flags[featureName];
    
    if (feature) {
      updateFeatureFlag(featureName, {
        canaryTenants: feature.canaryTenants.filter(id => id !== tenantId)
      });
    }
  },
  
  /**
   * Update rollout percentage
   */
  updateRolloutPercentage(featureName: keyof FeatureFlags, percentage: number): void {
    updateFeatureFlag(featureName, {
      rolloutPercentage: Math.max(0, Math.min(100, percentage))
    });
  },
  
  /**
   * Enable feature globally
   */
  enableFeature(featureName: keyof FeatureFlags): void {
    updateFeatureFlag(featureName, {
      enabled: true,
      rolloutPercentage: 100
    });
  },
  
  /**
   * Disable feature globally
   */
  disableFeature(featureName: keyof FeatureFlags): void {
    updateFeatureFlag(featureName, {
      enabled: false,
      rolloutPercentage: 0
    });
  }
};

/**
 * Monitoring and analytics for feature flags
 */
export const FeatureFlagAnalytics = {
  /**
   * Track feature flag usage
   */
  trackUsage(featureName: keyof FeatureFlags, tenantId?: string, action?: string): void {
    const status = getFeatureStatus(featureName, tenantId);
    
    // Send analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feature_flag_usage', {
        feature_name: featureName,
        tenant_id: tenantId,
        enabled: status.enabled,
        canary: status.canary,
        rollout_percentage: status.rolloutPercentage,
        action: action || 'view'
      });
    }
    
    // Log for debugging
    console.log(`Feature flag usage: ${featureName}`, {
      tenantId,
      enabled: status.enabled,
      canary: status.canary,
      action
    });
  },
  
  /**
   * Get feature flag metrics
   */
  getMetrics(): Record<string, any> {
    const flags = getFeatureFlags();
    const metrics: Record<string, any> = {};
    
    Object.keys(flags).forEach((featureName) => {
      const feature = flags[featureName as keyof FeatureFlags];
      metrics[featureName] = {
        enabled: feature.enabled,
        canaryTenants: feature.canaryTenants.length,
        rolloutPercentage: feature.rolloutPercentage,
        lastUpdated: feature.lastUpdated
      };
    });
    
    return metrics;
  }
};

// Export default configuration
export default getFeatureFlags;
