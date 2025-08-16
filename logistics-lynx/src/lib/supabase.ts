import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database Types
export interface User {
  id: string;
  email: string;
  role: string;
  portal_access: string[];
  created_at: string;
  updated_at: string;
}

export interface Portal {
  id: string;
  key: string;
  name: string;
  description: string;
  features: string[];
  settings: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Dashboard {
  id: string;
  portal_key: string;
  title: string;
  description: string;
  widgets: any[];
  layout: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutonomousAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'working' | 'error';
  current_task: string;
  progress: number;
  tasks_completed: number;
  last_activity: string;
  specializations: string[];
  portal_key?: string;
  created_at: string;
  updated_at: string;
}

export interface AutonomousUpdate {
  id: string;
  component: string;
  change: string;
  timestamp: string;
  status: 'applied' | 'pending' | 'failed';
  type: 'style' | 'layout' | 'content' | 'interaction' | 'performance';
  impact: 'low' | 'medium' | 'high';
  agent_id: string;
  portal_key?: string;
  created_at: string;
}

export interface WebsitePage {
  id: string;
  portal_key: string;
  path: string;
  title: string;
  content: any;
  metadata: Record<string, any>;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  scope: string;
  enabled: boolean;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Database Operations
export class SupabaseAPI {
  // User Operations
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Portal Operations
  static async getPortals() {
    const { data, error } = await supabase
      .from('portals')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  }

  static async getPortalByKey(key: string) {
    const { data, error } = await supabase
      .from('portals')
      .select('*')
      .eq('key', key)
      .single();
    if (error) throw error;
    return data;
  }

  static async createPortal(portal: Omit<Portal, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('portals')
      .insert([portal])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updatePortal(id: string, updates: Partial<Portal>) {
    const { data, error } = await supabase
      .from('portals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deletePortal(id: string) {
    const { error } = await supabase
      .from('portals')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // Dashboard Operations
  static async getDashboards(portalKey?: string) {
    let query = supabase.from('dashboards').select('*');
    if (portalKey) {
      query = query.eq('portal_key', portalKey);
    }
    const { data, error } = await query.order('title');
    if (error) throw error;
    return data;
  }

  static async getDashboard(id: string) {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createDashboard(dashboard: Omit<Dashboard, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('dashboards')
      .insert([dashboard])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateDashboard(id: string, updates: Partial<Dashboard>) {
    const { data, error } = await supabase
      .from('dashboards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteDashboard(id: string) {
    const { error } = await supabase
      .from('dashboards')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // Autonomous Agent Operations
  static async getAutonomousAgents(portalKey?: string) {
    let query = supabase.from('autonomous_agents').select('*');
    if (portalKey) {
      query = query.eq('portal_key', portalKey);
    }
    const { data, error } = await query.order('name');
    if (error) throw error;
    return data;
  }

  static async getAutonomousAgent(id: string) {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createAutonomousAgent(agent: Omit<AutonomousAgent, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .insert([agent])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateAutonomousAgent(id: string, updates: Partial<AutonomousAgent>) {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteAutonomousAgent(id: string) {
    const { error } = await supabase
      .from('autonomous_agents')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // Autonomous Update Operations
  static async getAutonomousUpdates(portalKey?: string, limit: number = 50) {
    let query = supabase.from('autonomous_updates').select('*');
    if (portalKey) {
      query = query.eq('portal_key', portalKey);
    }
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  }

  static async createAutonomousUpdate(update: Omit<AutonomousUpdate, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('autonomous_updates')
      .insert([update])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Website Page Operations
  static async getWebsitePages(portalKey?: string) {
    let query = supabase.from('website_pages').select('*');
    if (portalKey) {
      query = query.eq('portal_key', portalKey);
    }
    const { data, error } = await query.order('title');
    if (error) throw error;
    return data;
  }

  static async getWebsitePage(id: string) {
    const { data, error } = await supabase
      .from('website_pages')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createWebsitePage(page: Omit<WebsitePage, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('website_pages')
      .insert([page])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateWebsitePage(id: string, updates: Partial<WebsitePage>) {
    const { data, error } = await supabase
      .from('website_pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteWebsitePage(id: string) {
    const { error } = await supabase
      .from('website_pages')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // Feature Flag Operations
  static async getFeatureFlags() {
    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .order('key');
    if (error) throw error;
    return data;
  }

  static async getFeatureFlag(key: string) {
    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .eq('key', key)
      .single();
    if (error) throw error;
    return data;
  }

  static async createFeatureFlag(flag: Omit<FeatureFlag, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('feature_flags')
      .insert([flag])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateFeatureFlag(id: string, updates: Partial<FeatureFlag>) {
    const { data, error } = await supabase
      .from('feature_flags')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteFeatureFlag(id: string) {
    const { error } = await supabase
      .from('feature_flags')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // Real-time Subscriptions
  static subscribeToTable(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table
        },
        callback
      )
      .subscribe();
  }

  // AI Operations
  static async callAIFunction(functionName: string, params: any) {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: params
    });
    if (error) throw error;
    return data;
  }

  // File Storage Operations
  static async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    return data;
  }

  static async getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
    return true;
  }
}

export default SupabaseAPI;
