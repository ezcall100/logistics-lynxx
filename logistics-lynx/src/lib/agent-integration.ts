/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgentManager } from '@/agents/AgentManager';

const agentManager = new AgentManager();

export async function createAgentTask(agentType: string, taskType: string, payload: any, priority: string) {
  return await agentManager.createTask(agentType, taskType, payload, priority);
}

export async function getAgentStatus(agentId: string) {
  return await agentManager.getAgentStatus(agentId);
}

export async function getAllAgents() {
  return await agentManager.getAllAgents();
}

export async function startAgent(agentId: string) {
  return await agentManager.startAgent(agentId);
}

export async function stopAgent(agentId: string) {
  return await agentManager.stopAgent(agentId);
}

export async function getAgentTasks(agentId: string) {
  return await agentManager.getAgentTasks(agentId);
}

export async function getAgentMetrics(agentId: string) {
  return await agentManager.getAgentMetrics(agentId);
}

export async function getSystemHealth() {
  return await agentManager.getSystemHealth();
}

export async function restartAgent(agentId: string) {
  return await agentManager.restartAgent(agentId);
}

export async function updateAgentConfiguration(agentId: string, configuration: any) {
  return await agentManager.updateAgentConfiguration(agentId, configuration);
}

export async function getAgentEvents(agentId: string, limit: number) {
  return await agentManager.getAgentEvents(agentId, limit);
}

export async function getAgentDecisions(agentId: string, limit: number) {
  return await agentManager.getAgentDecisions(agentId, limit);
}

export async function getAvailableAgentTypes() {
  return await agentManager.getAvailableAgentTypes();
}

// Task management functions
export async function createTask(agentType: string, taskType: string, payload: any, priority: string) {
  try {
    const result = await agentManager.createTask(agentType, taskType, payload, priority);
    return { success: true, taskId: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getTaskStatus(taskId: string) {
  try {
    const tasks = await agentManager.getAgentTasks('all');
    const task = tasks.find((t: any) => t.id === taskId);
    
    if (task) {
      if (task.status === 'completed') {
        return { status: 'completed', result: task.result };
      } else if (task && typeof task === 'object' && 'status' in task && task.status === 'failed') {
        throw new Error(`Task failed: ${(task as any).error_message}`);
      } else if (task && typeof task === 'object' && 'status' in task) {
        return { status: (task as any).status, progress: (task as any).progress || 0 };
      }
    }
    
    return { status: 'not_found' };
  } catch (error) {
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getTaskResult(taskId: string) {
  try {
    const tasks = await agentManager.getAgentTasks('all');
    const task = tasks.find((t: any) => t.id === taskId);
    
    if (task && typeof task === 'object' && 'status' in task && task.status === 'completed') {
      return (task as any).result;
    }
    
    throw new Error('Task not found or not completed');
  } catch (error) {
    throw new Error(`Failed to get task result: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function cancelTask(taskId: string) {
  try {
    // Mock implementation - in real scenario, this would cancel the task
    console.log(`Cancelling task: ${taskId}`);
    return { success: true, message: 'Task cancelled successfully' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function executeBatchTasks(tasks: Array<{ agentType: string; taskType: string; payload: any; priority: string }>) {
  const results: Array<{ taskId: string; status: string; error?: string }> = [];
  
  for (const task of tasks) {
    try {
      const result = await createTask(task.agentType, task.taskType, task.payload, task.priority);
      results.push({ taskId: typeof result === 'string' ? result : (result.taskId || 'unknown'), status: 'created' });
    } catch (error) {
      results.push({ taskId: 'unknown', status: 'failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
  
  return results;
}

export async function getAgentPerformance(agentId: string, timeRange: string) {
  try {
    const metrics = await agentManager.getAgentMetrics(agentId);
    return {
      agentId,
      timeRange,
      metrics: metrics || {},
      success: true
    };
  } catch (error) {
    return {
      agentId,
      timeRange,
      metrics: {},
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getSystemOverview() {
  try {
    const health = await agentManager.getSystemHealth();
    const agents = await agentManager.getAllAgents();
    
    return {
      systemHealth: health,
      totalAgents: agents.length,
      activeAgents: agents.filter((agent: any) => agent.status === 'active').length,
      success: true
    };
  } catch (error) {
    return {
      systemHealth: {},
      totalAgents: 0,
      activeAgents: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
