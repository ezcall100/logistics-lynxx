/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

export class AgentCommunicationService {
  static async sendPortalUpdate(portalId: string, update: any) {
    try {
      const { data, error } = await supabase
        .from('portal_updates')
        .insert({
          portal_id: portalId,
          update_data: update,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending portal update:', error);
      throw error;
    }
  }

  static async getPortalUpdates(portalId: string) {
    try {
      const { data, error } = await supabase
        .from('portal_updates')
        .select('*')
        .eq('portal_id', portalId)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting portal updates:', error);
      throw error;
    }
  }

  static async notifyAgents(portalId: string, message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    try {
      const { data, error } = await supabase
        .from('agent_notifications')
        .insert({
          portal_id: portalId,
          message,
          priority,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error notifying agents:', error);
      throw error;
    }
  }
}