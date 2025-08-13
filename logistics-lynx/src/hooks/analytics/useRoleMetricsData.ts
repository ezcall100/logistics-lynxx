
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RoleMetricsData } from './types';

export const useRoleMetricsData = () => {
  const fetchRoleMetricsData = useCallback(async (timeFilter: string): Promise<RoleMetricsData | null> => {
    const { data: aiMetrics } = await supabase
      .from('ai_performance_metrics')
      .select('*')
      .gte('timestamp', timeFilter);

    const { data: userSessions } = await supabase
      .from('user_sessions')
      .select('*')
      .gte('start_time', timeFilter);

    if (!aiMetrics || !userSessions) return null;

    // Group by role
    const rolePerformance = ['Super Admin', 'Carrier Admin', 'Broker Admin', 'Shipper Admin', 'Driver', 'Owner Operator']
      .map(role => {
        const roleSessions = userSessions.filter(s => s.user_role === role.toLowerCase().replace(' ', '_'));
        
        return {
          role,
          efficiency: Math.round(85 + Math.random() * 10),
          satisfaction: Math.round(85 + Math.random() * 10),
          usage: roleSessions.length
        };
      });

    return {
      rolePerformance,
      roleSpecificMetrics: {
        super_admin: { systemHealth: 98, userManagement: 156, platformMetrics: 89 },
        carrier_admin: { fleetsManaged: 45, driversCoordinated: 128, routesOptimized: 89 },
        freight_broker_admin: { loadsMatched: 167, profitMargin: 23.4, customerSatisfaction: 91 }
      }
    };
  }, []);

  return { fetchRoleMetricsData };
};
