import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export const useEntitlement = (featureKey: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['entitlement', featureKey, user?.company_id],
    queryFn: async () => {
      const response = await fetch(`/api/entitlements/${featureKey}`);
      return response.json();
    },
    enabled: !!user?.company_id
  });
};

export const useLimit = (featureKey: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['limit', featureKey, user?.company_id],
    queryFn: async () => {
      const response = await fetch(`/api/limits/${featureKey}`);
      return response.json();
    },
    enabled: !!user?.company_id
  });
};

export const usePlan = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['plan', user?.company_id],
    queryFn: async () => {
      const response = await fetch('/api/entitlements/plan');
      return response.json();
    },
    enabled: !!user?.company_id
  });
};
