/* eslint-disable @typescript-eslint/no-explicit-any */
interface Region {
  id: string;
  name: string;
  url: string;
  isHealthy: boolean;
}

interface Config {
  failoverThreshold: number;
  healthCheckInterval: number;
}

class FeatureFlagService {
  private regions: Region[] = [
    {
      id: 'primary',
      name: 'Primary Region',
      url: process.env['PRIMARY_REGION_URL'] || 'https://api.transbotai.com',
      isHealthy: true
    },
    {
      id: 'secondary',
      name: 'Secondary Region',
      url: process.env['SECONDARY_REGION_URL'] || 'https://api-secondary.transbotai.com',
      isHealthy: true
    }
  ];

  private config: Config = {
    failoverThreshold: 3,
    healthCheckInterval: 30000
  };

  private failureCount: Record<string, number> = {};

  constructor() {
    this.initializeFailureCount();
  }

  private initializeFailureCount(): void {
    this.regions.forEach(region => {
      this.failureCount[region.id] = 0;
    });
  }

  async getFeatureFlag(key: string): Promise<boolean> {
    const currentRegion = this.getCurrentRegion();
    
    try {
      const response = await fetch(`${currentRegion.url}/api/feature-flags/${key}`);
      if (response.ok) {
        const data = await response.json();
        return data.enabled;
      }
    } catch (error) {
      this.recordFailure(currentRegion.id);
      return this.getFallbackValue(key);
    }
    
    return false;
  }

  private getCurrentRegion(): Region {
    const healthyRegion = this.regions.find(region => region.isHealthy);
    if (healthyRegion) {
      return healthyRegion;
    }
    
    // If no healthy region, try to find one with fewer failures
    const regionWithLeastFailures = this.regions.reduce((prev, current) => {
      const prevFailures = this.failureCount[prev.id] || 0;
      const currentFailures = this.failureCount[current.id] || 0;
      return currentFailures < prevFailures ? current : prev;
    });
    
    return regionWithLeastFailures;
  }

  private recordFailure(regionId: string): void {
    if (this.failureCount[regionId] !== undefined) {
      this.failureCount[regionId]++;
    }
    
    // Mark region as unhealthy if failure threshold exceeded
    if (this.failureCount[regionId] && this.failureCount[regionId] >= this.config.failoverThreshold) {
      const region = this.regions.find(r => r.id === regionId);
      if (region) {
        region.isHealthy = false;
      }
    }
  }

  private getFallbackValue(key: string): boolean {
    // Default fallback values for critical features
    const fallbackValues: Record<string, boolean> = {
      'autonomous_mode': true,
      'ai_assistance': true,
      'real_time_updates': false
    };
    
    return fallbackValues[key] || false;
  }

  async checkRegionHealth(regionId: string): Promise<boolean> {
    const region = this.regions.find(r => r.id === regionId);
    if (!region) return false;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${region.url}/health`, { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      const isHealthy = response.ok;
      
      if (isHealthy && this.failureCount[regionId] !== undefined) {
        this.failureCount[regionId] = 0;
        region.isHealthy = true;
      }
      
      return isHealthy;
    } catch (error) {
      this.recordFailure(regionId);
      return false;
    }
  }
}

export const featureFlagService = new FeatureFlagService();
