import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth/useAuth";

interface Entitlement {
  plan_id: string;
  status: 'active' | 'trial' | 'past_due' | 'canceled' | 'suspended';
  trial_ends_at?: string;
}

interface Plan {
  id: string;
  name: string;
  features: Record<string, boolean>;
  limits: Record<string, number>;
}

export function useEntitlement() {
  const { user } = useAuth();

  const { data: entitlement, isLoading: entitlementLoading } = useQuery({
    queryKey: ["entitlement", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const response = await fetch("/api/entitlement");
      if (!response.ok) throw new Error("Failed to fetch entitlement");
      
      return response.json() as Entitlement;
    },
    enabled: !!user,
  });

  const { data: plan, isLoading: planLoading } = useQuery({
    queryKey: ["plan", entitlement?.plan_id],
    queryFn: async () => {
      if (!entitlement?.plan_id) return null;
      
      const response = await fetch(`/api/plans/${entitlement.plan_id}`);
      if (!response.ok) throw new Error("Failed to fetch plan");
      
      return response.json() as Plan;
    },
    enabled: !!entitlement?.plan_id,
  });

  const hasFeature = (feature: string): boolean => {
    if (!entitlement || !plan) return false;
    if (entitlement.status !== 'active' && entitlement.status !== 'trial') return false;
    
    return plan.features[feature] === true;
  };

  const getLimit = (limit: string): number => {
    if (!plan) return 0;
    return plan.limits[limit] || 0;
  };

  const isTrial = (): boolean => {
    return entitlement?.status === 'trial';
  };

  const isActive = (): boolean => {
    return entitlement?.status === 'active' || entitlement?.status === 'trial';
  };

  const getTrialDaysLeft = (): number => {
    if (!entitlement?.trial_ends_at) return 0;
    
    const trialEnd = new Date(entitlement.trial_ends_at);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  return {
    entitlement,
    plan,
    isLoading: entitlementLoading || planLoading,
    hasFeature,
    getLimit,
    isTrial,
    isActive,
    getTrialDaysLeft,
  };
}

// Predefined feature checks
export function useRatesFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('rates');
}

export function useDirectoryFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('directory');
}

export function useAnalyticsFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('analytics');
}

export function useEDIFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('edi');
}

export function useFactoringFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('factoring');
}

export function useMarketplaceFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('marketplace');
}

export function useAutonomousFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('autonomous');
}

export function useBulkRatingFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('bulk_rating');
}

export function useSSOFeature() {
  const { hasFeature } = useEntitlement();
  return hasFeature('sso');
}
