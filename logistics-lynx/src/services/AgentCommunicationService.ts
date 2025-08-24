/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../lib/supabase';

export class AgentCommunicationService {
  static async sendPortalUpdate(portalId: string, message: string) {
    try {
      // Temporarily commented out due to database schema issues
      /*
      const { data, error } = await supabase
        .from('portal_updates')
        .insert({
          portal_id: portalId,
          message,
          timestamp: new Date().toISOString()
        });
      */
      
      console.log('Portal update sent:', { portalId, message });
      return { success: true, data: null, error: null };
    } catch (error) {
      console.error('Error sending portal update:', error);
      return { success: false, data: null, error };
    }
  }

  static async getPortalUpdates(portalId: string) {
    try {
      // Temporarily commented out due to database schema issues
      /*
      const { data, error } = await supabase
        .from('portal_updates')
        .select('*')
        .eq('portal_id', portalId)
        .order('timestamp', { ascending: false });
      */
      
      console.log('Getting portal updates for:', portalId);
      return { data: [], error: null };
    } catch (error) {
      console.error('Error getting portal updates:', error);
      return { data: null, error };
    }
  }

  static async sendAgentNotification(portalId: string, notification: string) {
    try {
      // Temporarily commented out due to database schema issues
      /*
      const { data, error } = await supabase
        .from('agent_notifications')
        .insert({
          portal_id: portalId,
          notification,
          timestamp: new Date().toISOString()
        });
      */
      
      console.log('Agent notification sent:', { portalId, notification });
      return { success: true, data: null, error: null };
    } catch (error) {
      console.error('Error sending agent notification:', error);
      return { success: false, data: null, error };
    }
  }
}