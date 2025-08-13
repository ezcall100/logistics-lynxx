import { useQuery } from "@tanstack/react-query";

export function useFlag(key: string, fallback = false) {
  return useQuery({
    queryKey: ["flag", key],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/flags/${encodeURIComponent(key)}`);
        if (!res.ok) return fallback;
        const { value } = await res.json();
        return Boolean(value);
      } catch (error) {
        console.warn(`Failed to fetch flag ${key}:`, error);
        return fallback;
      }
    },
    initialData: fallback,
    staleTime: 30_000, // 30 seconds
    retry: 2,
  });
}

// Portal-specific flag hooks
export function usePortalEnabled(portalName: string) {
  return useFlag(`portal.${portalName}.enabled`, false);
}

// Predefined portal checks
export function useCarrierAdminEnabled() {
  return usePortalEnabled('carrier-admin');
}

export function useBrokerAdminEnabled() {
  return usePortalEnabled('broker-admin');
}

export function useShipperAdminEnabled() {
  return usePortalEnabled('shipper-admin');
}

export function useFreightBrokerEnabled() {
  return usePortalEnabled('freight-broker');
}

export function useCarrierDispatchEnabled() {
  return usePortalEnabled('carrier-dispatch');
}

// Helper to check if any deprecated portal is enabled
export function useAnyDeprecatedPortalEnabled() {
  const carrierAdmin = useCarrierAdminEnabled();
  const brokerAdmin = useBrokerAdminEnabled();
  const shipperAdmin = useShipperAdminEnabled();
  const freightBroker = useFreightBrokerEnabled();
  const carrierDispatch = useCarrierDispatchEnabled();

  return carrierAdmin.data || brokerAdmin.data || shipperAdmin.data || 
         freightBroker.data || carrierDispatch.data;
}
