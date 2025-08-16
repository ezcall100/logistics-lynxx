/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegionConfig {
  id: string;
  name: string;
  url: string;
  healthEndpoint: string;
  isActive: boolean;
  isHealthy: boolean;
  lastHealthCheck: Date | null;
}

export interface MultiRegionConfig {
  primary: RegionConfig;
  secondary: RegionConfig;
  activeRegion: string;
  healthCheckInterval: number; // milliseconds
  failoverThreshold: number; // consecutive failures before failover
}

// Default configuration
export const defaultMultiRegionConfig: MultiRegionConfig = {
  primary: {
    id: 'primary',
    name: 'Primary Region',
    url: process.env.PRIMARY_REGION_URL || 'https://api.transbotai.com',
    healthEndpoint: '/functions/v1/health',
    isActive: true,
    isHealthy: true,
    lastHealthCheck: null
  },
  secondary: {
    id: 'secondary',
    name: 'Secondary Region',
    url: process.env.SECONDARY_REGION_URL || 'https://api-secondary.transbotai.com',
    healthEndpoint: '/functions/v1/health',
    isActive: false,
    isHealthy: true,
    lastHealthCheck: null
  },
  activeRegion: 'primary',
  healthCheckInterval: 30000, // 30 seconds
  failoverThreshold: 3
};

class MultiRegionManager {
  private config: MultiRegionConfig;
  private healthCheckTimer: NodeJS.Timeout | null = null;
  private failureCount: { [regionId: string]: number } = {};

  constructor(config: MultiRegionConfig = defaultMultiRegionConfig) {
    this.config = config;
    this.failureCount = {
      [config.primary.id]: 0,
      [config.secondary.id]: 0
    };
  }

  async startHealthMonitoring(): Promise<void> {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }

    // Initial health check
    await this.performHealthCheck();

    // Start periodic health checks
    this.healthCheckTimer = setInterval(async () => {
      await this.performHealthCheck();
    }, this.config.healthCheckInterval);
  }

  stopHealthMonitoring(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = null;
    }
  }

  private async performHealthCheck(): Promise<void> {
    const regions = [this.config.primary, this.config.secondary];
    
    for (const region of regions) {
      try {
        const response = await fetch(`${region.url}${region.healthEndpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'TransBotAI-HealthCheck/1.0'
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });

        if (response.ok) {
          const healthData = await response.json();
          region.isHealthy = healthData.status === 'healthy';
          this.failureCount[region.id] = 0;
        } else {
          region.isHealthy = false;
          this.failureCount[region.id]++;
        }
      } catch (error) {
        console.error(`Health check failed for ${region.id}:`, error);
        region.isHealthy = false;
        this.failureCount[region.id]++;
      }

      region.lastHealthCheck = new Date();
    }

    // Check if failover is needed
    await this.checkFailover();
  }

  private async checkFailover(): Promise<void> {
    const currentRegion = this.getCurrentRegion();
    
    if (!currentRegion.isHealthy && this.failureCount[currentRegion.id] >= this.config.failoverThreshold) {
      const otherRegion = currentRegion.id === this.config.primary.id ? this.config.secondary : this.config.primary;
      
      if (otherRegion.isHealthy) {
        console.warn(`Initiating failover from ${currentRegion.id} to ${otherRegion.id}`);
        await this.failover(otherRegion.id);
      } else {
        console.error('Both regions are unhealthy - cannot failover');
      }
    }
  }

  private async failover(targetRegionId: string): Promise<void> {
    this.config.activeRegion = targetRegionId;
    
    // Update region active states
    this.config.primary.isActive = targetRegionId === this.config.primary.id;
    this.config.secondary.isActive = targetRegionId === this.config.secondary.id;

    // Reset failure counts
    this.failureCount[this.config.primary.id] = 0;
    this.failureCount[this.config.secondary.id] = 0;

    // Log the failover
    console.log(`Failover completed to ${targetRegionId}`);
    
    // TODO: Send alert to ops team
    await this.sendFailoverAlert(targetRegionId);
  }

  private async sendFailoverAlert(targetRegionId: string): Promise<void> {
    // TODO: Implement Slack/email alert
    console.log(`ALERT: Failover to ${targetRegionId} at ${new Date().toISOString()}`);
  }

  getCurrentRegion(): RegionConfig {
    return this.config.activeRegion === this.config.primary.id 
      ? this.config.primary 
      : this.config.secondary;
  }

  getRegionUrl(regionId?: string): string {
    const region = regionId 
      ? (regionId === this.config.primary.id ? this.config.primary : this.config.secondary)
      : this.getCurrentRegion();
    
    return region.url;
  }

  isRegionHealthy(regionId: string): boolean {
    const region = regionId === this.config.primary.id ? this.config.primary : this.config.secondary;
    return region.isHealthy;
  }

  getHealthStatus(): {
    activeRegion: string;
    regions: { [key: string]: { healthy: boolean; lastCheck: Date | null } };
  } {
    return {
      activeRegion: this.config.activeRegion,
      regions: {
        [this.config.primary.id]: {
          healthy: this.config.primary.isHealthy,
          lastCheck: this.config.primary.lastHealthCheck
        },
        [this.config.secondary.id]: {
          healthy: this.config.secondary.isHealthy,
          lastCheck: this.config.secondary.lastHealthCheck
        }
      }
    };
  }

  // Manual failover for testing
  async manualFailover(targetRegionId: string): Promise<void> {
    if (targetRegionId !== this.config.primary.id && targetRegionId !== this.config.secondary.id) {
      throw new Error(`Invalid region ID: ${targetRegionId}`);
    }
    
    await this.failover(targetRegionId);
  }
}

// Singleton instance
let multiRegionManager: MultiRegionManager | null = null;

export function getMultiRegionManager(): MultiRegionManager {
  if (!multiRegionManager) {
    multiRegionManager = new MultiRegionManager();
  }
  return multiRegionManager;
}

export function initializeMultiRegion(): Promise<void> {
  const manager = getMultiRegionManager();
  return manager.startHealthMonitoring();
}

// Feature flag for region routing
export function getRegionRoutingConfig() {
  const manager = getMultiRegionManager();
  const currentRegion = manager.getCurrentRegion();
  
  return {
    activeRegion: currentRegion.id,
    regionUrl: currentRegion.url,
    isHealthy: currentRegion.isHealthy,
    healthStatus: manager.getHealthStatus()
  };
}

// Router middleware helper
export function createRegionRouter() {
  return async (req: Request): Promise<Response> => {
    const manager = getMultiRegionManager();
    const currentRegion = manager.getCurrentRegion();
    
    // If current region is unhealthy, try to failover
    if (!currentRegion.isHealthy) {
      const otherRegion = currentRegion.id === manager['config'].primary.id 
        ? manager['config'].secondary 
        : manager['config'].primary;
      
      if (otherRegion.isHealthy) {
        await manager.manualFailover(otherRegion.id);
      }
    }
    
    // Route to healthy region
    const targetUrl = manager.getRegionUrl();
    
    // Clone the request and update the URL
    const url = new URL(req.url);
    const targetUrlObj = new URL(targetUrl);
    url.hostname = targetUrlObj.hostname;
    url.protocol = targetUrlObj.protocol;
    
    const newRequest = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: req.body
    });
    
    return fetch(newRequest);
  };
}
