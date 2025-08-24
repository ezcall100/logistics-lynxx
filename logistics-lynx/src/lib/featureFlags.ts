/* eslint-disable @typescript-eslint/no-explicit-any */
interface Flag {
  key: FeatureKey;
  enabled: boolean;
  tenants?: string[];
}

type FeatureKey = 'autonomous_mode' | 'ai_assistance' | 'real_time_updates' | 'advanced_analytics';

class FeatureFlagManager {
  private flags: Flag[] = [];

  setFeatureFlag(feature: FeatureKey, enabled: boolean, tenants?: string[]): void {
    const flagIndex = this.flags.findIndex(f => f.key === feature);
    
    if (flagIndex !== -1) {
      this.flags[flagIndex] = { key: feature, enabled, tenants };
    } else {
      this.flags.push({ key: feature, enabled, tenants });
    }
  }

  getFeatureFlag(feature: FeatureKey): boolean {
    const flag = this.flags.find(f => f.key === feature);
    return flag?.enabled ?? false;
  }

  getAllFlags(): Flag[] {
    return [...this.flags];
  }
}

export const featureFlagManager = new FeatureFlagManager();
