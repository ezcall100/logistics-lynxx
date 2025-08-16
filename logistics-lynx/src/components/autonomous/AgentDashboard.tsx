import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase-agents'
import { 
  initializeAgents, 
  createAgentTask, 
  getSystemHealth,
  getAgentTasks,
  getAgentEvents,
  optimizeRoute,
  matchLoad,
  calculatePricing,
  assessRisk,
  planCapacity
} from '@/lib/agent-integration'

export const AgentDashboard: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [taskForm, setTaskForm] = useState({
    agentType: 'decision',
    taskType: 'route_optimization',
    payload: {},
    priority: 0
  })

  const initializeSystem = useCallback(async () => {
    try {
      await initializeAgents()
      await loadData()
    } catch (error) {
      console.error('Failed to initialize agents:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      const [agentsData, tasksData, eventsData, healthData] = await Promise.all([
        supabase.from('agent_registry').select('*').order('created_at', { ascending: false }),
        supabase.from('agent_tasks').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('agent_events').select('*').order('created_at', { ascending: false }).limit(50),
        getSystemHealth()
      ])

      setAgents(agentsData.data || [])
      setTasks(tasksData.data || [])
      setEvents(eventsData.data || [])
      setHealth(healthData)
    } catch (error) {
      console.error('Failed to load agent data:', error)
    }
  }, [])

  useEffect(() => {
    initializeSystem()
    const interval = setInterval(loadData, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [initializeSystem, loadData])

  const createTask = async () => {
    try {
      const taskId = await createAgentTask(
        taskForm.agentType,
        taskForm.taskType,
        taskForm.payload,
        taskForm.priority
      )
      
      console.log(`Task created: ${taskId}`)
      await loadData() // Refresh data
      
      // Reset form
      setTaskForm({
        agentType: 'decision',
        taskType: 'route_optimization',
        payload: {},
        priority: 0
      })
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const createSampleTask = async (type: string) => {
    try {
      let taskId: string
      
      switch (type) {
        case 'route_optimization':
          taskId = await optimizeRoute(
            'New York, NY',
            'Los Angeles, CA',
            { weight: 5000, type: 'electronics', fragile: false },
            { max_time: 72, max_cost: 5000 }
          )
          break
          
        case 'load_matching':
          taskId = await matchLoad(
            { origin: 'Chicago, IL', destination: 'Miami, FL', weight: 3000, equipment_type: 'dry_van' },
            [
              { id: 'carrier1', location: 'Chicago, IL', capacity: 5000, equipment: ['dry_van'] },
              { id: 'carrier2', location: 'Detroit, MI', capacity: 4000, equipment: ['dry_van', 'reefer'] }
            ],
            { preferred_carriers: ['carrier1'], max_cost: 3000 }
          )
          break
          
        case 'pricing':
          taskId = await calculatePricing(
            2500,
            { demand_factor: 1.2, average_price: 2800 },
            { current: 3.50, trend: 'increasing' },
            1200,
            { weight: 4000, type: 'general', fragile: false }
          )
          break
          
        case 'risk_assessment':
          taskId = await assessRisk(
            { origin: 'Seattle, WA', destination: 'Portland, OR', distance: 175 },
            { weight: 2000, type: 'perishable', fragile: true },
            { severity: 0.3, conditions: ['rain', 'wind'] },
            { congestion_level: 0.2, incidents: 0 },
            { incident_rate: 0.05, avg_delay: 15 }
          )
          break
          
        case 'capacity_planning':
          taskId = await planCapacity(
            { base: 100, growth_rate: 0.15, seasonal_factor: 1.1 },
            80,
            '3_months'
          )
          break
          
        default:
          throw new Error(`Unknown task type: ${type}`)
      }
      
      console.log(`Sample task created: ${taskId}`)
      await loadData()
    } catch (error) {
      console.error('Failed to create sample task:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'inactive':
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
    }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800'
      case 'down':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Initializing autonomous agents...</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Autonomous Agents Dashboard</h1>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(health?.status || 'unknown')}`}>
          System: {health?.status || 'Unknown'}
        </div>
              </div>

      {/* System Health Overview */}
      {health && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{health.overall_metrics.total_tasks}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{health.overall_metrics.completed_tasks}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{health.overall_metrics.failed_tasks}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{health.overall_metrics.success_rate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                          </div>
                                  </div>
      )}

      {/* Agent Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Agent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{agent.name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </span>
                                  </div>
              <p className="text-sm text-gray-600 mb-2">{agent.type}</p>
              <p className="text-xs text-gray-500">
                Last heartbeat: {new Date(agent.last_heartbeat).toLocaleString()}
              </p>
              {agent.capabilities && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Capabilities:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {agent.capabilities.map((cap: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {cap}
                      </span>
                    ))}
                                  </div>
                                    </div>
                                  )}
                                </div>
          ))}
        </div>
      </div>

      {/* Create Task Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={taskForm.agentType}
            onChange={(e) => setTaskForm({ ...taskForm, agentType: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="decision">Decision Agent</option>
          </select>
          
          <select
            value={taskForm.taskType}
            onChange={(e) => setTaskForm({ ...taskForm, taskType: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="route_optimization">Route Optimization</option>
            <option value="load_matching">Load Matching</option>
            <option value="pricing">Pricing</option>
            <option value="risk_assessment">Risk Assessment</option>
            <option value="capacity_planning">Capacity Planning</option>
          </select>
          
          <input
            type="number"
            placeholder="Priority"
            value={taskForm.priority}
            onChange={(e) => setTaskForm({ ...taskForm, priority: parseInt(e.target.value) || 0 })}
            className="border rounded px-3 py-2"
          />
          
          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Task
          </button>
              </div>

        {/* Sample Task Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => createSampleTask('route_optimization')}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Sample Route
          </button>
          <button
            onClick={() => createSampleTask('load_matching')}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Sample Load Match
          </button>
          <button
            onClick={() => createSampleTask('pricing')}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Sample Pricing
          </button>
          <button
            onClick={() => createSampleTask('risk_assessment')}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Sample Risk
          </button>
          <button
            onClick={() => createSampleTask('capacity_planning')}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Sample Capacity
          </button>
                </div>
                          </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Agent</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Task Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Priority</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{task.agent_id}</td>
                  <td className="px-4 py-2 text-sm">{task.task_type}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{task.priority}</td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => console.log('Task details:', task)}
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

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        <div className="space-y-2">
          {events.slice(0, 10).map(event => (
            <div key={event.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <span className="font-medium">{event.agent_id}</span>
                <span className="text-gray-600 ml-2">- {event.event_type}</span>
                </div>
              <span className="text-sm text-gray-500">
                {new Date(event.created_at).toLocaleString()}
              </span>
                          </div>
          ))}
        </div>
      </div>
    </div>
  )
}
