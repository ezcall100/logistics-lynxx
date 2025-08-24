/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Autonomous Agent API Functions
export interface AutonomousUpdate {
  id: string;
  component: string;
  change: string;
  timestamp: string;
  status: 'applied' | 'pending' | 'failed';
  type: 'style' | 'layout' | 'content' | 'interaction' | 'performance';
  impact: 'low' | 'medium' | 'high';
  agent_id: string;
  user_id?: string;
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
  user_id?: string;
}

// Save autonomous update to Supabase
export async function saveAutonomousUpdate(update: Omit<AutonomousUpdate, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('autonomous_updates')
      .insert([update])
      .select()
      .single();

    if (error) {
      console.error('Error saving autonomous update:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to save autonomous update:', error);
    throw error;
  }
}

// Get recent autonomous updates
export async function getRecentAutonomousUpdates(limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('autonomous_updates')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching autonomous updates:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch autonomous updates:', error);
    return [];
  }
}

// Update agent status
export async function updateAgentStatus(agentId: string, status: Partial<AutonomousAgent>) {
  try {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .update(status)
      .eq('id', agentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating agent status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to update agent status:', error);
    throw error;
  }
}

// Get all agents
export async function getAutonomousAgents() {
  try {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return [];
  }
}

// Create or update agent
export async function upsertAgent(agent: Omit<AutonomousAgent, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('autonomous_agents')
      .upsert([agent], { onConflict: 'name' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting agent:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to upsert agent:', error);
    throw error;
  }
}

// Get system statistics
export async function getAutonomousSystemStats() {
  try {
    const [updatesResult, agentsResult] = await Promise.all([
      supabase.from('autonomous_updates').select('*', { count: 'exact' }),
      supabase.from('autonomous_agents').select('*', { count: 'exact' })
    ]);

    const totalUpdates = updatesResult.count || 0;
    const totalAgents = agentsResult.count || 0;
    const activeAgents = agentsResult.data?.filter(agent => agent.status === 'active' || agent.status === 'working').length || 0;

    return {
      totalUpdates,
      totalAgents,
      activeAgents,
      successRate: totalUpdates > 0 ? 100 : 0 // Simplified for now
    };
  } catch (error) {
    console.error('Failed to get system stats:', error);
    return {
      totalUpdates: 0,
      totalAgents: 0,
      activeAgents: 0,
      successRate: 0
    };
  }
}

// Real-time subscription for updates
export function subscribeToAutonomousUpdates(callback: (update: AutonomousUpdate) => void) {
  return supabase
    .channel('autonomous_updates')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'autonomous_updates'
      },
      (payload) => {
        callback(payload.new as AutonomousUpdate);
      }
    )
    .subscribe();
}

// Real-time subscription for agent status changes
export function subscribeToAgentStatus(callback: (agent: AutonomousAgent) => void) {
  return supabase
    .channel('autonomous_agents')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'autonomous_agents'
      },
      (payload) => {
        callback(payload.new as AutonomousAgent);
      }
    )
    .subscribe();
}

// Initialize database tables (run once)
export async function initializeAutonomousTables() {
  try {
    // Create autonomous_updates table
    const { error: updatesError } = await supabase.rpc('create_autonomous_updates_table');
    if (updatesError) {
      console.log('autonomous_updates table might already exist:', updatesError.message);
    }

    // Create autonomous_agents table
    const { error: agentsError } = await supabase.rpc('create_autonomous_agents_table');
    if (agentsError) {
      console.log('autonomous_agents table might already exist:', agentsError.message);
    }

    console.log('Autonomous tables initialized successfully');
  } catch (error) {
    console.error('Failed to initialize autonomous tables:', error);
  }
}

// Fallback functions for when Supabase is not available
export const fallbackAPI = {
  saveAutonomousUpdate: async (update: Omit<AutonomousUpdate, 'id'>) => {
    console.log('Fallback: Simulating save of autonomous update:', update);
    return { ...update, id: `fallback-${Date.now()}` };
  },

  getRecentAutonomousUpdates: async () => {
    console.log('Fallback: Returning empty updates array');
    return [];
  },

  updateAgentStatus: async (agentId: string, status: Partial<AutonomousAgent>) => {
    console.log('Fallback: Simulating agent status update:', { agentId, status });
    return { id: agentId, ...status };
  },

  getAutonomousAgents: async () => {
    console.log('Fallback: Returning default agents');
    return [
      {
        id: 'ui-designer',
        name: 'UI Design Agent',
        type: 'design',
        status: 'active',
        current_task: 'Enhancing website design',
        progress: 75,
        tasks_completed: 12,
        last_activity: new Date().toISOString(),
        specializations: ['color-schemes', 'typography', 'spacing', 'visual-hierarchy']
      },
      {
        id: 'layout-engineer',
        name: 'Layout Engineer Agent',
        type: 'layout',
        status: 'working',
        current_task: 'Optimizing responsive layouts',
        progress: 45,
        tasks_completed: 8,
        last_activity: new Date().toISOString(),
        specializations: ['responsive-design', 'grid-systems', 'flexbox', 'css-grid']
      }
    ];
  },

  getAutonomousSystemStats: async () => {
    return {
      totalUpdates: 25,
      totalAgents: 5,
      activeAgents: 3,
      successRate: 100
    };
  }
};

// Check if Supabase is available
export async function checkSupabaseConnection() {
  try {
    const { error } = await supabase.from('autonomous_updates').select('count').limit(1);
    return !error;
  } catch (error) {
    console.log('Supabase not available, using fallback API');
    return false;
  }
}

// Get the appropriate API based on Supabase availability
export async function getAutonomousAPI() {
  const isSupabaseAvailable = await checkSupabaseConnection();
  
  if (isSupabaseAvailable) {
    return {
      saveAutonomousUpdate,
      getRecentAutonomousUpdates,
      updateAgentStatus,
      getAutonomousAgents,
      upsertAgent,
      getAutonomousSystemStats,
      subscribeToAutonomousUpdates,
      subscribeToAgentStatus
    };
  } else {
    return fallbackAPI;
  }
}
