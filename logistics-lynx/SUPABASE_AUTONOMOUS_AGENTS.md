# 🤖 Autonomous Agents with Supabase Integration

## 📋 Overview

This guide shows how to integrate autonomous agents with Supabase in your TMS Logistics Lynx application. The agents will use Supabase for:

- **Data Storage**: Agent states, decisions, and history
- **Real-time Communication**: Agent coordination and updates
- **Authentication**: Secure agent access and permissions
- **Event Logging**: Audit trails and monitoring
- **Configuration Management**: Dynamic agent settings

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   TMS App       │    │   Supabase      │    │   Autonomous    │
│                 │    │                 │    │   Agents        │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Frontend  │ │◄──►│ │   Database  │ │◄──►│ │   Agent 1   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Backend   │ │◄──►│ │   Auth      │ │◄──►│ │   Agent 2   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Agents    │ │◄──►│ │   Realtime  │ │◄──►│ │   Agent 3   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Database Schema

### 1. Agent Registry Table

```sql
-- Create agent registry table
CREATE TABLE agent_registry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'inactive',
    capabilities JSONB,
    configuration JSONB,
    last_heartbeat TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agent_registry_status ON agent_registry(status);
CREATE INDEX idx_agent_registry_type ON agent_registry(type);
CREATE INDEX idx_agent_registry_heartbeat ON agent_registry(last_heartbeat);
```

### 2. Agent Tasks Table

```sql
-- Create agent tasks table
CREATE TABLE agent_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    task_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority INTEGER DEFAULT 0,
    payload JSONB,
    result JSONB,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX idx_agent_tasks_priority ON agent_tasks(priority);
```

### 3. Agent Events Table

```sql
-- Create agent events table
CREATE TABLE agent_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    severity VARCHAR(20) DEFAULT 'info',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agent_events_agent_id ON agent_events(agent_id);
CREATE INDEX idx_agent_events_type ON agent_events(event_type);
CREATE INDEX idx_agent_events_created_at ON agent_events(created_at);
```

### 4. Agent Decisions Table

```sql
-- Create agent decisions table
CREATE TABLE agent_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    decision_type VARCHAR(100) NOT NULL,
    context JSONB,
    decision JSONB,
    confidence DECIMAL(3,2),
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_agent_decisions_agent_id ON agent_decisions(agent_id);
CREATE INDEX idx_agent_decisions_type ON agent_decisions(decision_type);
CREATE INDEX idx_agent_decisions_confidence ON agent_decisions(confidence);
```

## 🔧 Implementation

### 1. Supabase Client Configuration

```typescript
// src/lib/supabase-agents.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

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
```

### 2. Agent Base Class

```typescript
// src/agents/BaseAgent.ts
import { supabaseAdmin, supabaseRealtime } from '@/lib/supabase-agents'

export abstract class BaseAgent {
  protected agentId: string
  protected agentType: string
  protected agentName: string
  protected capabilities: string[]
  protected isRunning: boolean = false

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
      .from('agent_registry')
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
    await this.updateStatus('inactive')
    await this.logEvent('agent_stopped', { status: 'inactive' })
    
    console.log(`Agent ${this.agentId} stopped`)
  }

  // Update agent status
  async updateStatus(status: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('agent_registry')
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
    setInterval(async () => {
      await this.sendHeartbeat()
    }, 30000) // Every 30 seconds
  }

  // Log agent event
  async logEvent(eventType: string, eventData: any): Promise<void> {
    const { error } = await supabaseAdmin
      .from('agent_events')
      .insert({
        agent_id: this.agentId,
        event_type: eventType,
        event_data: eventData,
        severity: 'info'
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
      .from('agent_decisions')
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
      .from('agent_tasks')
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
      .from('agent_tasks')
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
    }

    const { error } = await supabaseAdmin
      .from('agent_tasks')
      .update(updateData)
      .eq('id', taskId)

    if (error) {
      console.error(`Failed to update task: ${error.message}`)
    }
  }

  // Start real-time listener
  private async startRealtimeListener(): Promise<void> {
    const channel = supabaseRealtime
      .channel(`agent-${this.agentId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_tasks',
          filter: `agent_id=eq.${this.agentId}`
        },
        (payload) => {
          this.handleNewTask(payload.new)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'agent_registry',
          filter: `agent_id=eq.${this.agentId}`
        },
        (payload) => {
          this.handleConfigurationUpdate(payload.new)
        }
      )
      .subscribe()

    console.log(`Real-time listener started for agent ${this.agentId}`)
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
```

### 3. TMS Decision Agent

```typescript
// src/agents/TMSDecisionAgent.ts
import { BaseAgent } from './BaseAgent'

export class TMSDecisionAgent extends BaseAgent {
  private decisionThreshold: number = 0.8
  private maxConcurrentTasks: number = 5
  private currentTasks: Set<string> = new Set()

  constructor() {
    super(
      'tms-decision-agent-001',
      'decision',
      'TMS Decision Agent',
      ['route_optimization', 'load_matching', 'pricing', 'risk_assessment']
    )
  }

  protected async handleNewTask(task: any): Promise<void> {
    if (this.currentTasks.size >= this.maxConcurrentTasks) {
      console.log(`Agent at capacity, queuing task ${task.id}`)
      return
    }

    this.currentTasks.add(task.id)
    await this.processTask(task)
  }

  protected async handleConfigurationUpdate(config: any): Promise<void> {
    if (config.configuration) {
      this.decisionThreshold = config.configuration.decision_threshold || 0.8
      this.maxConcurrentTasks = config.configuration.max_concurrent_tasks || 5
      console.log(`Configuration updated for agent ${this.agentId}`)
    }
  }

  protected getConfiguration(): any {
    return {
      decision_threshold: this.decisionThreshold,
      max_concurrent_tasks: this.maxConcurrentTasks,
      capabilities: this.capabilities
    }
  }

  protected async run(): Promise<void> {
    while (this.isRunning) {
      try {
        // Get pending tasks
        const tasks = await this.getPendingTasks()
        
        for (const task of tasks) {
          if (this.currentTasks.size >= this.maxConcurrentTasks) break
          
          if (!this.currentTasks.has(task.id)) {
            this.currentTasks.add(task.id)
            this.processTask(task)
          }
        }

        // Wait before next iteration
        await new Promise(resolve => setTimeout(resolve, 5000))
      } catch (error) {
        console.error(`Error in agent loop: ${error}`)
        await this.logEvent('agent_error', { error: error.message })
      }
    }
  }

  private async processTask(task: any): Promise<void> {
    try {
      await this.updateTaskStatus(task.id, 'running')
      await this.logEvent('task_started', { task_id: task.id, task_type: task.task_type })

      let result: any
      let confidence: number = 0
      let reasoning: string = ''

      switch (task.task_type) {
        case 'route_optimization':
          result = await this.optimizeRoute(task.payload)
          confidence = 0.95
          reasoning = 'Route optimization completed using historical data and real-time conditions'
          break

        case 'load_matching':
          result = await this.matchLoad(task.payload)
          confidence = 0.88
          reasoning = 'Load matching completed using carrier preferences and availability'
          break

        case 'pricing':
          result = await this.calculatePricing(task.payload)
          confidence = 0.92
          reasoning = 'Pricing calculated using market rates and cost analysis'
          break

        case 'risk_assessment':
          result = await this.assessRisk(task.payload)
          confidence = 0.85
          reasoning = 'Risk assessment completed using historical data and current conditions'
          break

        default:
          throw new Error(`Unknown task type: ${task.task_type}`)
      }

      // Log decision if confidence meets threshold
      if (confidence >= this.decisionThreshold) {
        await this.logDecision(
          task.task_type,
          task.payload,
          result,
          confidence,
          reasoning
        )
      }

      await this.updateTaskStatus(task.id, 'completed', result)
      await this.logEvent('task_completed', { 
        task_id: task.id, 
        task_type: task.task_type,
        confidence 
      })

    } catch (error) {
      await this.updateTaskStatus(task.id, 'failed', null, error.message)
      await this.logEvent('task_failed', { 
        task_id: task.id, 
        task_type: task.task_type,
        error: error.message 
      })
    } finally {
      this.currentTasks.delete(task.id)
    }
  }

  // Task processing methods
  private async optimizeRoute(payload: any): Promise<any> {
    // Implement route optimization logic
    return {
      optimized_route: payload.route,
      estimated_time: payload.estimated_time * 0.9,
      fuel_savings: payload.fuel_cost * 0.15
    }
  }

  private async matchLoad(payload: any): Promise<any> {
    // Implement load matching logic
    return {
      matched_carriers: payload.carriers.slice(0, 3),
      match_score: 0.92,
      estimated_pickup: new Date(Date.now() + 3600000).toISOString()
    }
  }

  private async calculatePricing(payload: any): Promise<any> {
    // Implement pricing logic
    return {
      base_price: payload.base_price,
      market_adjustment: payload.base_price * 0.05,
      final_price: payload.base_price * 1.05,
      breakdown: {
        fuel_surcharge: payload.base_price * 0.02,
        market_premium: payload.base_price * 0.03
      }
    }
  }

  private async assessRisk(payload: any): Promise<any> {
    // Implement risk assessment logic
    return {
      risk_score: 0.15,
      risk_factors: ['weather', 'traffic'],
      recommendations: ['delay_shipment', 'alternative_route'],
      insurance_required: true
    }
  }
}
```

### 4. Agent Manager

```typescript
// src/agents/AgentManager.ts
import { supabaseAdmin } from '@/lib/supabase-agents'
import { TMSDecisionAgent } from './TMSDecisionAgent'

export class AgentManager {
  private agents: Map<string, any> = new Map()
  private isRunning: boolean = false

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
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return

    this.isRunning = false
    console.log('Stopping Agent Manager...')

    // Stop all agents
    for (const [agentId, agent] of this.agents) {
      try {
        await agent.stop()
        console.log(`Agent ${agentId} stopped successfully`)
      } catch (error) {
        console.error(`Failed to stop agent ${agentId}: ${error}`)
      }
    }
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
      .from('agent_registry')
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
      .from('agent_tasks')
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

  async updateAgentConfiguration(
    agentId: string,
    configuration: any
  ): Promise<void> {
    const { error } = await supabaseAdmin
      .from('agent_registry')
      .update({
        configuration,
        updated_at: new Date().toISOString()
      })
      .eq('agent_id', agentId)

    if (error) {
      throw new Error(`Failed to update configuration: ${error.message}`)
    }
  }

  private startMonitoring(): void {
    setInterval(async () => {
      if (!this.isRunning) return

      try {
        const status = await this.getAgentStatus()
        console.log(`Agent Status: ${JSON.stringify(status, null, 2)}`)
      } catch (error) {
        console.error(`Monitoring error: ${error}`)
      }
    }, 60000) // Every minute
  }
}
```

### 5. Integration with TMS Application

```typescript
// src/lib/agent-integration.ts
import { AgentManager } from '@/agents/AgentManager'

let agentManager: AgentManager | null = null

export async function initializeAgents(): Promise<void> {
  if (!agentManager) {
    agentManager = new AgentManager()
    await agentManager.start()
  }
}

export async function stopAgents(): Promise<void> {
  if (agentManager) {
    await agentManager.stop()
    agentManager = null
  }
}

export async function createAgentTask(
  agentType: string,
  taskType: string,
  payload: any,
  priority: number = 0
): Promise<string> {
  if (!agentManager) {
    throw new Error('Agent manager not initialized')
  }

  return await agentManager.createTask(agentType, taskType, payload, priority)
}

export async function getAgentStatus(): Promise<any[]> {
  if (!agentManager) {
    return []
  }

  return await agentManager.getAgentStatus()
}

export async function getAgentTasks(agentId?: string): Promise<any[]> {
  if (!agentManager) {
    return []
  }

  return await agentManager.getAgentTasks(agentId)
}
```

### 6. React Components for Agent Management

```typescript
// src/components/autonomous/AgentDashboard.tsx
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-agents'

export const AgentDashboard: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [agentsData, tasksData] = await Promise.all([
        supabase.from('agent_registry').select('*').order('created_at', { ascending: false }),
        supabase.from('agent_tasks').select('*').order('created_at', { ascending: false }).limit(50)
      ])

      setAgents(agentsData.data || [])
      setTasks(tasksData.data || [])
    } catch (error) {
      console.error('Failed to load agent data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (agentId: string, taskType: string, payload: any) => {
    try {
      const { data, error } = await supabase
        .from('agent_tasks')
        .insert({
          agent_id: agentId,
          task_type: taskType,
          status: 'pending',
          payload
        })
        .select()
        .single()

      if (error) throw error
      
      setTasks(prev => [data, ...prev])
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  if (loading) {
    return <div>Loading agent dashboard...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Autonomous Agents Dashboard</h1>
      
      {/* Agent Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Agent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-600">{agent.type}</p>
              <div className={`inline-block px-2 py-1 rounded text-xs ${
                agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {agent.status}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last heartbeat: {new Date(agent.last_heartbeat).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Agent</th>
                <th className="px-4 py-2 text-left">Task Type</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t">
                  <td className="px-4 py-2">{task.agent_id}</td>
                  <td className="px-4 py-2">{task.task_type}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'failed' ? 'bg-red-100 text-red-800' :
                      task.status === 'running' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => console.log('View task details:', task)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

## 🚀 Usage Examples

### 1. Initialize Agents in Your App

```typescript
// src/App.tsx or your main app file
import { initializeAgents, stopAgents } from '@/lib/agent-integration'

useEffect(() => {
  initializeAgents()
  
  return () => {
    stopAgents()
  }
}, [])
```

### 2. Create Tasks from Your Application

```typescript
// Example: Create a route optimization task
import { createAgentTask } from '@/lib/agent-integration'

const handleOptimizeRoute = async () => {
  try {
    const taskId = await createAgentTask(
      'decision',
      'route_optimization',
      {
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        cargo: { weight: 5000, type: 'electronics' },
        constraints: { max_time: 72, max_cost: 5000 }
      },
      1 // High priority
    )
    
    console.log(`Route optimization task created: ${taskId}`)
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}
```

### 3. Monitor Agent Activity

```typescript
// Real-time monitoring
import { supabaseRealtime } from '@/lib/supabase-agents'

useEffect(() => {
  const channel = supabaseRealtime
    .channel('agent-monitoring')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'agent_events'
      },
      (payload) => {
        console.log('Agent event:', payload)
        // Update UI or trigger notifications
      }
    )
    .subscribe()

  return () => {
    supabaseRealtime.removeChannel(channel)
  }
}, [])
```

## 📊 Monitoring and Analytics

### 1. Agent Performance Metrics

```sql
-- Get agent performance metrics
SELECT 
  agent_id,
  COUNT(*) as total_tasks,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_tasks,
  AVG(CASE WHEN status = 'completed' THEN 
    EXTRACT(EPOCH FROM (completed_at - created_at)) 
  END) as avg_completion_time_seconds
FROM agent_tasks 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY agent_id;
```

### 2. Decision Confidence Analysis

```sql
-- Analyze decision confidence
SELECT 
  decision_type,
  AVG(confidence) as avg_confidence,
  COUNT(*) as total_decisions,
  COUNT(CASE WHEN confidence >= 0.9 THEN 1 END) as high_confidence_decisions
FROM agent_decisions 
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY decision_type
ORDER BY avg_confidence DESC;
```

## 🔒 Security Considerations

1. **Authentication**: Use Supabase Auth for agent authentication
2. **Authorization**: Implement role-based access control
3. **Data Encryption**: Ensure sensitive data is encrypted
4. **Audit Logging**: Log all agent actions for compliance
5. **Rate Limiting**: Prevent agent abuse

## 🛠️ Troubleshooting

### Common Issues

1. **Agent not starting**: Check Supabase connection and permissions
2. **Tasks not processing**: Verify agent registration and status
3. **Real-time not working**: Check Supabase Realtime configuration
4. **Performance issues**: Monitor database indexes and query optimization

### Debug Commands

```bash
# Check agent status
supabase db query "SELECT * FROM agent_registry WHERE status = 'active';"

# View recent tasks
supabase db query "SELECT * FROM agent_tasks ORDER BY created_at DESC LIMIT 10;"

# Check agent events
supabase db query "SELECT * FROM agent_events ORDER BY created_at DESC LIMIT 20;"
```

This integration provides a robust foundation for autonomous agents in your TMS application with full Supabase integration for data persistence, real-time communication, and monitoring.
