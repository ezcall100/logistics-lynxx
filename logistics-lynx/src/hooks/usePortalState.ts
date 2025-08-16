/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePortalState = (portalId: string) => {
  const [portalState, setPortalState] = useState({
    isAutonomous: true,
    agentStatus: {},
    lastActivity: null,
    performance: {
      uptime: 0,
      successRate: 0,
      tasksCompleted: 0
    }
  });

  useEffect(() => {
    const fetchPortalState = async () => {
      try {
        const { data, error } = await supabase
          .from('portal_states')
          .select('*')
          .eq('portal_id', portalId)
          .single();

        if (data) {
          setPortalState(data.state);
        }
      } catch (error) {
        console.error('Error fetching portal state:', error);
      }
    };

    fetchPortalState();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('portal_state_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'portal_states',
        filter: `portal_id=eq.${portalId}`
      }, (payload) => {
        if (payload.new) {
          setPortalState(payload.new.state);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [portalId]);

  return portalState;
};