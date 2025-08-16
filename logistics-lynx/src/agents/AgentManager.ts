/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin, AGENT_TABLES } from '@/lib/supabase-agents'
import { TMSDecisionAgent } from './TMSDecisionAgent'

export class AgentManager {
  private agents: Map<string, any> = new Map()
  private isRunning: boolean = false
  private monitoringInterval?: NodeJS.Timeout

  constructor() {
    this.initializeAgents()
  }

  private initializeAgents(): void {
    // Initialize TMS Decision Agent
    const decisionAgent = new TMSDecisionAgent()
    this.agents.set(decisionAgent.agentId, decisionAgent)

    // Add more agents as needed
    // const routingAgent = new RoutingAgent()
    // this.agents.set(routingAgent.agentId, routingAgent)
    
    // const pricingAgent = new PricingAgent()
    // this.agents.set(pricingAgent.agentId, pricingAgent)
    
    // const monitoringAgent = new MonitoringAgent()
    // this.agents.set(monitoringAgent.agentId, monitoringAgent)

    console.log(`Initialized ${this.agents.size} agents`)
  }

  async start(): Promise<void> {
    if (this.isRunning) return

    this.isRunning = true
    console.log('Starting Agent Manager...')

    // Start all agents
    for (const [agentId, agent] of this.agents) {
      try {
        await agent.start()
        console.log(`Agent ${agentId} started successfully`)
      } catch (error) {
        console.error(`Failed to start agent ${agentId}: ${error}`)
      }
    }

    // Start monitoring
    this.startMonitoring()
    
    console.log('Agent Manager started successfully')
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return

    this.isRunning = false
    console.log('Stopping Agent Manager...')

    // Stop monitoring
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
    }

    // Stop all agents
    for (const [agentId, agent] of this.agents) {
      try {
        await agent.stop()
        console.log(`Agent ${agentId} stopped successfully`)
      } catch (error) {
        console.error(`Failed to stop agent ${agentId}: ${error}`)
      }
    }
    
    console.log('Agent Manager stopped successfully')
  }

  async createTask(
    agentType: string,
    taskType: string,
    payload: any,
    priority: number = 0
  ): Promise<string> {
    // Find agent by type
    const agent = Array.from(this.agents.values()).find(
      a => a.agentType === agentType
    )

    if (!agent) {
      throw new Error(`No agent found for type: ${agentType}`)
    }

    return await agent.createTask(taskType, payload, priority)
  }

  async getAgentStatus(): Promise<any[]> {
    const { data, error } = await supabaseAdmin
      .from(AGENT_TABLES.REGISTRY)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(`Failed to get agent status: ${error.message}`)
      return []
    }

    return data || []
  }

  async getAgentTasks(agentId?: string): Promise<any[]> {
    let query = supabaseAdmin
      .from(AGENT_TABLES.TASKS)
      .select('*')
      .order('created_at', { ascending: false })

    if (agentId) {
      query = query.eq('agent_id', agentId)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Failed to get agent tasks: ${error.message}`)
      return []
    }

    return data || []
  }

  async getAgentMetrics(agentId?: string): Promise<any> {
    const agents = agentId ? [agentId] : Array.from(this.agents.keys())
    const metrics: any = {}

    for (const id of agents) {
      const agent = this.agents.get(id)
      if (agent) {
        try {
          metrics[id] = await agent.getMetrics()
        } catch (error) {
          console.error(`Failed to get metrics for agent ${id}: ${error}`)
          metrics[id] = {}
        }
      }
    }

    return metrics
  }

  async updateAgentConfiguration(
    agentId: string,
    configuration: any
  ): Promise<void> {
    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.REGISTRY)
      .update({
        configuration,
        updated_at: new Date().toISOString()
      })
      .eq('agent_id', agentId)

    if (error) {
      throw new Error(`Failed to update configuration: ${error.message}`)
    }

    // Update local agent configuration
    const agent = this.agents.get(agentId)
    if (agent && agent.handleConfigurationUpdate) {
      agent.handleConfigurationUpdate({ configuration })
    }
  }

  async restartAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId)
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`)
    }

    try {
      await agent.stop()
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
      await agent.start()
      console.log(`Agent ${agentId} restarted successfully`)
    } catch (error) {
      console.error(`Failed to restart agent ${agentId}: ${error}`)
      throw error
    }
  }

  async getSystemHealth(): Promise<any> {
    const health = {
      status: 'healthy',
      agents: {},
      overall_metrics: {
        total_tasks: 0,
        completed_tasks: 0,
        failed_tasks: 0,
        success_rate: 0
      },
      timestamp: new Date().toISOString()
    }

    let totalTasks = 0
    let completedTasks = 0
    let failedTasks = 0

    // Get health status for each agent
    for (const [agentId, agent] of this.agents) {
      try {
        const metrics = await agent.getMetrics()
        const status = agent.isRunning ? 'active' : 'inactive'
        
        health.agents[agentId] = {
          status,
          metrics,
          last_heartbeat: new Date().toISOString()
        }

        totalTasks += metrics.totalTasks || 0
        completedTasks += metrics.completedTasks || 0
        failedTasks += metrics.failedTasks || 0
      } catch (error) {
        health.agents[agentId] = {
          status: 'error',
          error: error.message,
          last_heartbeat: new Date().toISOString()
        }
        health.status = 'degraded'
      }
    }

    // Calculate overall metrics
    health.overall_metrics = {
      total_tasks: totalTasks,
      completed_tasks: completedTasks,
      failed_tasks: failedTasks,
      success_rate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    }

    // Determine overall system status
    const activeAgents = Object.values(health.agents).filter((a: any) => a.status === 'active').length
    const totalAgents = this.agents.size

    if (activeAgents === 0) {
      health.status = 'down'
    } else if (activeAgents < totalAgents) {
      health.status = 'degraded'
    }

    return health
  }

  async getAgentEvents(agentId?: string, limit: number = 50): Promise<any[]> {
    let query = supabaseAdmin
      .from(AGENT_TABLES.EVENTS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (agentId) {
      query = query.eq('agent_id', agentId)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Failed to get agent events: ${error.message}`)
      return []
    }

    return data || []
  }

  async getAgentDecisions(agentId?: string, limit: number = 50): Promise<any[]> {
    let query = supabaseAdmin
      .from(AGENT_TABLES.DECISIONS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (agentId) {
      query = query.eq('agent_id', agentId)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Failed to get agent decisions: ${error.message}`)
      return []
    }

    return data || []
  }

  async cleanupOldData(daysToKeep: number = 30): Promise<void> {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000).toISOString()

    try {
      // Clean up old events
      const { error: eventsError } = await supabaseAdmin
        .from(AGENT_TABLES.EVENTS)
        .delete()
        .lt('created_at', cutoffDate)

      if (eventsError) {
        console.error(`Failed to cleanup events: ${eventsError.message}`)
      }

      // Clean up old tasks (keep completed/failed for longer)
      const { error: tasksError } = await supabaseAdmin
        .from(AGENT_TABLES.TASKS)
        .delete()
        .lt('created_at', cutoffDate)
        .in('status', ['pending', 'running'])

      if (tasksError) {
        console.error(`Failed to cleanup tasks: ${tasksError.message}`)
      }

      console.log(`Cleaned up data older than ${daysToKeep} days`)
    } catch (error) {
      console.error(`Failed to cleanup old data: ${error}`)
    }
  }

  private startMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      if (!this.isRunning) return

      try {
        const health = await this.getSystemHealth()
        
        // Log system health
        if (health.status !== 'healthy') {
          console.warn(`System health: ${health.status}`, health)
        }

        // Check for agents that need restart
        for (const [agentId, agentData] of Object.entries(health.agents)) {
          const data = agentData as any
          if (data.status === 'error' || data.status === 'inactive') {
            console.warn(`Agent ${agentId} needs attention: ${data.status}`)
          }
        }

      } catch (error) {
        console.error(`Monitoring error: ${error}`)
      }
    }, 60000) // Every minute
  }

  // Get list of available agent types
  getAvailableAgentTypes(): string[] {
    return Array.from(this.agents.values()).map(agent => agent.agentType)
  }

  // Get agent by ID
  getAgent(agentId: string): any {
    return this.agents.get(agentId)
  }

  // Get all agents
  getAllAgents(): Map<string, any> {
    return new Map(this.agents)
  }

  // Add a new agent dynamically
  addAgent(agent: any): void {
    this.agents.set(agent.agentId, agent)
    console.log(`Added agent ${agent.agentId} to manager`)
  }

  // Remove an agent
  removeAgent(agentId: string): boolean {
    const removed = this.agents.delete(agentId)
    if (removed) {
      console.log(`Removed agent ${agentId} from manager`)
    }
    return removed
  }
}
