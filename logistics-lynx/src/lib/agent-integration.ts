/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function getAgentMetrics(agentId?: string): Promise<any> {
  if (!agentManager) {
    return {}
  }

  return await agentManager.getAgentMetrics(agentId)
}

export async function getSystemHealth(): Promise<any> {
  if (!agentManager) {
    return {
      status: 'not_initialized',
      agents: {},
      overall_metrics: {
        total_tasks: 0,
        completed_tasks: 0,
        failed_tasks: 0,
        success_rate: 0
      },
      timestamp: new Date().toISOString()
    }
  }

  return await agentManager.getSystemHealth()
}

export async function restartAgent(agentId: string): Promise<void> {
  if (!agentManager) {
    throw new Error('Agent manager not initialized')
  }

  return await agentManager.restartAgent(agentId)
}

export async function updateAgentConfiguration(
  agentId: string,
  configuration: any
): Promise<void> {
  if (!agentManager) {
    throw new Error('Agent manager not initialized')
  }

  return await agentManager.updateAgentConfiguration(agentId, configuration)
}

export async function getAgentEvents(agentId?: string, limit: number = 50): Promise<any[]> {
  if (!agentManager) {
    return []
  }

  return await agentManager.getAgentEvents(agentId, limit)
}

export async function getAgentDecisions(agentId?: string, limit: number = 50): Promise<any[]> {
  if (!agentManager) {
    return []
  }

  return await agentManager.getAgentDecisions(agentId, limit)
}

export function getAvailableAgentTypes(): string[] {
  if (!agentManager) {
    return []
  }

  return agentManager.getAvailableAgentTypes()
}

// Convenience functions for common TMS tasks
export async function optimizeRoute(
  origin: string,
  destination: string,
  cargo: any,
  constraints: any = {}
): Promise<string> {
  return await createAgentTask(
    'decision',
    'route_optimization',
    { origin, destination, cargo, constraints },
    1
  )
}

export async function matchLoad(
  load: any,
  carriers: any[],
  preferences: any = {}
): Promise<string> {
  return await createAgentTask(
    'decision',
    'load_matching',
    { load, carriers, preferences },
    2
  )
}

export async function calculatePricing(
  basePrice: number,
  marketConditions: any,
  fuelPrices: any,
  distance: number,
  cargo: any
): Promise<string> {
  return await createAgentTask(
    'decision',
    'pricing',
    { base_price: basePrice, market_conditions: marketConditions, fuel_prices: fuelPrices, distance, cargo },
    1
  )
}

export async function assessRisk(
  route: any,
  cargo: any,
  weather: any,
  traffic: any,
  historicalData: any
): Promise<string> {
  return await createAgentTask(
    'decision',
    'risk_assessment',
    { route, cargo, weather, traffic, historical_data: historicalData },
    3
  )
}

export async function planCapacity(
  demandForecast: any,
  currentCapacity: number,
  timePeriod: string
): Promise<string> {
  return await createAgentTask(
    'decision',
    'capacity_planning',
    { demand_forecast: demandForecast, current_capacity: currentCapacity, time_period: timePeriod },
    2
  )
}

// Task monitoring functions
export async function waitForTaskCompletion(taskId: string, timeoutMs: number = 300000): Promise<any> {
  if (!agentManager) {
    throw new Error('Agent manager not initialized')
  }

  const startTime = Date.now()
  
  while (Date.now() - startTime < timeoutMs) {
    const tasks = await agentManager.getAgentTasks()
    const task = tasks.find(t => t.id === taskId)
    
    if (task) {
      if (task.status === 'completed') {
        return task.result
      } else if (task.status === 'failed') {
        throw new Error(`Task failed: ${task.error_message}`)
      }
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  throw new Error(`Task timeout after ${timeoutMs}ms`)
}

export async function getTaskStatus(taskId: string): Promise<any> {
  if (!agentManager) {
    return null
  }

  const tasks = await agentManager.getAgentTasks()
  return tasks.find(t => t.id === taskId) || null
}

// Batch operations
export async function createBatchTasks(
  tasks: Array<{
    agentType: string
    taskType: string
    payload: any
    priority?: number
  }>
): Promise<string[]> {
  const taskIds: string[] = []
  
  for (const task of tasks) {
    const taskId = await createAgentTask(
      task.agentType,
      task.taskType,
      task.payload,
      task.priority || 0
    )
    taskIds.push(taskId)
  }
  
  return taskIds
}

export async function waitForBatchCompletion(
  taskIds: string[],
  timeoutMs: number = 600000
): Promise<any[]> {
  const results: any[] = []
  
  for (const taskId of taskIds) {
    try {
      const result = await waitForTaskCompletion(taskId, timeoutMs)
      results.push({ taskId, status: 'completed', result })
    } catch (error) {
      results.push({ taskId, status: 'failed', error: error.message })
    }
  }
  
  return results
}

// Agent management utilities
export function isAgentManagerInitialized(): boolean {
  return agentManager !== null
}

export function getAgentManager(): AgentManager | null {
  return agentManager
}

// Error handling utilities
export class AgentError extends Error {
  constructor(
    message: string,
    public agentId?: string,
    public taskId?: string,
    public errorCode?: string
  ) {
    super(message)
    this.name = 'AgentError'
  }
}

export function handleAgentError(error: any): AgentError {
  if (error instanceof AgentError) {
    return error
  }
  
  return new AgentError(
    error.message || 'Unknown agent error',
    undefined,
    undefined,
    'UNKNOWN_ERROR'
  )
}
