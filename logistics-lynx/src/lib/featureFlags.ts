export type FeatureKey = 'rates' | 'directory' | 'bulk_rating' | 'invite_auto_approve' | 'api_access' | 'white_label';
export type Flag = { key: FeatureKey; enabled: boolean; tenants?: string[] };

export const flags: Flag[] = [
  { key: 'rates', enabled: true },
  { key: 'directory', enabled: true },
  { key: 'bulk_rating', enabled: false, tenants: ['transbotai-demo'] },
  { key: 'invite_auto_approve', enabled: false },
  { key: 'api_access', enabled: true },
  { key: 'white_label', enabled: false }
];

export const isFeatureEnabled = (feature: FeatureKey, tenantId?: string): boolean => {
  const flag = flags.find(f => f.key === feature);
  if (!flag) return false;
  
  if (!flag.enabled) return false;
  if (flag.tenants && tenantId && !flag.tenants.includes(tenantId)) return false;
  
  return true;
};

export const getEnabledFeatures = (tenantId?: string): FeatureKey[] => {
  return flags
    .filter(flag => isFeatureEnabled(flag.key, tenantId))
    .map(flag => flag.key);
};

export const toggleFeature = (feature: FeatureKey, enabled: boolean, tenants?: string[]) => {
  const flagIndex = flags.findIndex(f => f.key === feature);
  if (flagIndex >= 0) {
    flags[flagIndex] = { key: feature, enabled, tenants };
  } else {
    flags.push({ key: feature, enabled, tenants });
  }
};
