/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env['SUPABASE_URL']!;
const supabaseAnonKey = process.env['SUPABASE_ANON_KEY']!;
const supabaseServiceKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;

// Client for regular operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for agent operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Real-time client for agent communication
export const supabaseRealtime = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Agent-specific client with enhanced error handling
export const agentSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  },
  realtime: {
    params: {
      eventsPerSecond: 20
    }
  }
})

// Helper function to check if Supabase is properly configured
export function validateSupabaseConfig(): boolean {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.error('Missing Supabase configuration. Please check your environment variables.')
    return false
  }
  return true
}

// Helper function to get agent-specific table names
export const AGENT_TABLES = {
  REGISTRY: 'agent_registry',
  TASKS: 'agent_tasks',
  EVENTS: 'agent_events',
  DECISIONS: 'agent_decisions'
} as const

// Helper function to create agent-specific queries
export function createAgentQuery(table: keyof typeof AGENT_TABLES) {
  return supabaseAdmin.from(AGENT_TABLES[table])
}

// Helper function to subscribe to agent events
export function subscribeToAgentEvents(
  agentId: string,
  callback: (payload: any) => void
) {
  return supabaseRealtime
    .channel(`agent-${agentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: AGENT_TABLES.EVENTS,
        filter: `agent_id=eq.${agentId}`
      },
      callback
    )
    .subscribe()
}

// Helper function to subscribe to agent tasks
export function subscribeToAgentTasks(
  agentId: string,
  callback: (payload: any) => void
) {
  return supabaseRealtime
    .channel(`agent-tasks-${agentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: AGENT_TABLES.TASKS,
        filter: `agent_id=eq.${agentId}`
      },
      callback
    )
    .subscribe()
}
