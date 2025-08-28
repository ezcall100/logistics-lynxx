/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useRealTimeUpdates = () => {
  const { user, selectedRole } = useAuth();

  const setupRealTimeUpdates = useCallback((updateCallback: (update: unknown) => void) => {
    if (!user || !selectedRole) return;

    const channel = supabase
      .channel('autonomous-sidebar')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'shipments',
      }, (payload) => {
        if (selectedRole === 'carrier_admin' || selectedRole === 'freight_broker_admin') {
          updateCallback({
            type: 'new_shipment',
            data: payload.new,
            timestamp: new Date()
          });
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'shipments',
      }, (payload) => {
        updateCallback({
          type: 'shipment_update',
          data: payload.new,
          timestamp: new Date()
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedRole]);

  return { setupRealTimeUpdates };
};

export default useRealTimeUpdates;