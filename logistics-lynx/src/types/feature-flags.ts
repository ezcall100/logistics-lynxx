export interface ResolvedFlag {
  key: string;
  value: boolean;
  reason: string;
  metadata?: Record<string, any>;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description?: string;
  enabled: boolean;
  environment: string;
  created_at: string;
  updated_at: string;
}
