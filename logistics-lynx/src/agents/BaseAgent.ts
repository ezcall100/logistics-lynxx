import { supabaseAdmin, supabaseRealtime, AGENT_TABLES } from '@/lib/supabase-agents'

export abstract class BaseAgent {
  protected agentId: string
  protected agentType: string
  protected agentName: string
  protected capabilities: string[]
  protected isRunning: boolean = false
  private heartbeatInterval?: NodeJS.Timeout
  private realtimeChannels: any[] = []

  constructor(
    agentId: string,
    agentType: string,
    agentName: string,
    capabilities: string[] = []
  ) {
    this.agentId = agentId
    this.agentType = agentType
    this.agentName = agentName
    this.capabilities = capabilities
  }

  // Register agent with Supabase
  async register(): Promise<void> {
    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.REGISTRY)
      .upsert({
        agent_id: this.agentId,
        name: this.agentName,
        type: this.agentType,
        status: 'active',
        capabilities: this.capabilities,
        configuration: this.getConfiguration(),
        last_heartbeat: new Date().toISOString()
      })

    if (error) {
      throw new Error(`Failed to register agent: ${error.message}`)
    }

    console.log(`Agent ${this.agentId} registered successfully`)
  }

  // Start the agent
  async start(): Promise<void> {
    this.isRunning = true
    await this.register()
    await this.startHeartbeat()
    await this.startRealtimeListener()
    await this.logEvent('agent_started', { status: 'active' })
    
    console.log(`Agent ${this.agentId} started`)
  }

  // Stop the agent
  async stop(): Promise<void> {
    this.isRunning = false
    
    // Clear intervals and channels
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
    
    this.realtimeChannels.forEach(channel => {
      supabaseRealtime.removeChannel(channel)
    })
    this.realtimeChannels = []
    
    await this.updateStatus('inactive')
    await this.logEvent('agent_stopped', { status: 'inactive' })
    
    console.log(`Agent ${this.agentId} stopped`)
  }

  // Update agent status
  async updateStatus(status: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.REGISTRY)
      .update({ 
        status,
        last_heartbeat: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('agent_id', this.agentId)

    if (error) {
      console.error(`Failed to update status: ${error.message}`)
    }
  }

  // Send heartbeat
  async sendHeartbeat(): Promise<void> {
    if (!this.isRunning) return

    await this.updateStatus('active')
  }

  // Start heartbeat loop
  private async startHeartbeat(): Promise<void> {
    this.heartbeatInterval = setInterval(async () => {
      await this.sendHeartbeat()
    }, 30000) // Every 30 seconds
  }

  // Log agent event
  async logEvent(eventType: string, eventData: any, severity: string = 'info'): Promise<void> {
    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.EVENTS)
      .insert({
        agent_id: this.agentId,
        event_type: eventType,
        event_data: eventData,
        severity
      })

    if (error) {
      console.error(`Failed to log event: ${error.message}`)
    }
  }

  // Log agent decision
  async logDecision(
    decisionType: string,
    context: any,
    decision: any,
    confidence: number,
    reasoning: string
  ): Promise<void> {
    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.DECISIONS)
      .insert({
        agent_id: this.agentId,
        decision_type: decisionType,
        context,
        decision,
        confidence,
        reasoning
      })

    if (error) {
      console.error(`Failed to log decision: ${error.message}`)
    }
  }

  // Create task
  async createTask(
    taskType: string,
    payload: any,
    priority: number = 0
  ): Promise<string> {
    const { data, error } = await supabaseAdmin
      .from(AGENT_TABLES.TASKS)
      .insert({
        agent_id: this.agentId,
        task_type: taskType,
        status: 'pending',
        priority,
        payload
      })
      .select('id')
      .single()

    if (error) {
      throw new Error(`Failed to create task: ${error.message}`)
    }

    return data.id
  }

  // Get pending tasks
  async getPendingTasks(): Promise<any[]> {
    const { data, error } = await supabaseAdmin
      .from(AGENT_TABLES.TASKS)
      .select('*')
      .eq('agent_id', this.agentId)
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })

    if (error) {
      console.error(`Failed to get tasks: ${error.message}`)
      return []
    }

    return data || []
  }

  // Update task status
  async updateTaskStatus(
    taskId: string,
    status: string,
    result?: any,
    errorMessage?: string
  ): Promise<void> {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString()
      updateData.result = result
    } else if (status === 'failed') {
      updateData.completed_at = new Date().toISOString()
      updateData.error_message = errorMessage
    } else if (status === 'running') {
      updateData.started_at = new Date().toISOString()
    }

    const { error } = await supabaseAdmin
      .from(AGENT_TABLES.TASKS)
      .update(updateData)
      .eq('id', taskId)

    if (error) {
      console.error(`Failed to update task: ${error.message}`)
    }
  }

  // Start real-time listener
  private async startRealtimeListener(): Promise<void> {
    // Listen for new tasks
    const taskChannel = supabaseRealtime
      .channel(`agent-tasks-${this.agentId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: AGENT_TABLES.TASKS,
          filter: `agent_id=eq.${this.agentId}`
        },
        (payload) => {
          this.handleNewTask(payload.new)
        }
      )
      .subscribe()

    // Listen for configuration updates
    const configChannel = supabaseRealtime
      .channel(`agent-config-${this.agentId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: AGENT_TABLES.REGISTRY,
          filter: `agent_id=eq.${this.agentId}`
        },
        (payload) => {
          this.handleConfigurationUpdate(payload.new)
        }
      )
      .subscribe()

    this.realtimeChannels.push(taskChannel, configChannel)
    console.log(`Real-time listeners started for agent ${this.agentId}`)
  }

  // Get agent metrics
  async getMetrics(): Promise<any> {
    const { data: tasks, error: tasksError } = await supabaseAdmin
      .from(AGENT_TABLES.TASKS)
      .select('status, created_at, completed_at')
      .eq('agent_id', this.agentId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (tasksError) {
      console.error(`Failed to get task metrics: ${tasksError.message}`)
      return {}
    }

    const totalTasks = tasks?.length || 0
    const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0
    const failedTasks = tasks?.filter(t => t.status === 'failed').length || 0
    const pendingTasks = tasks?.filter(t => t.status === 'pending').length || 0

    return {
      totalTasks,
      completedTasks,
      failedTasks,
      pendingTasks,
      successRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    }
  }

  // Handle new task (to be implemented by subclasses)
  protected abstract handleNewTask(task: any): void

  // Handle configuration update (to be implemented by subclasses)
  protected abstract handleConfigurationUpdate(config: any): void

  // Get agent configuration (to be implemented by subclasses)
  protected abstract getConfiguration(): any

  // Main agent loop (to be implemented by subclasses)
  protected abstract run(): Promise<void>
}
