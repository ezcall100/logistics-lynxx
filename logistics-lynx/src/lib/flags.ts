/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

// Mock feature flags to avoid RPC issues
const mockFeatureFlags = {
  'activate_full_autonomous_control': true,
  'assign_driver_to_carrier': true,
  'autonomous_24_7_operation': true,
  'autonomous_realtime_monitoring': true,
  'autonomous_system_operation': true,
  'calculate_broker_margin': true,
  'resolve_feature_flag': true
};

export const getFeatureFlag = async (companyId: string, env: string, key: string, def: boolean = false): Promise<boolean> => {
  try {
    // Use mock data instead of RPC
    return mockFeatureFlags[key as keyof typeof mockFeatureFlags] ?? def;
  } catch (error) {
    console.error('Error getting feature flag:', error);
    return def;
  }
};

export const resolveFeatureFlag = async (companyId: string, env: string, key: string) => {
  try {
    // Use mock data instead of RPC
    return mockFeatureFlags[key as keyof typeof mockFeatureFlags] ?? false;
  } catch (error) {
    console.error('Error resolving feature flag:', error);
    return false;
  }
};
