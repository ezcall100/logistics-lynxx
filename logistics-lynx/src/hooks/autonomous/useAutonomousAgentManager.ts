
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { AutonomousAgent, SystemStats } from '@/types/autonomous-agents';
import { useAgentInitializer } from './useAgentInitializer';
import { useAgentTasks } from './useAgentTasks';
import { useGPTAssistance } from './useGPTAssistance';
import { calculateNextRun } from '@/utils/agentUtils';

export const useAutonomousAgentManager = () => {
  const [agents, setAgents] = useState<AutonomousAgent[]>([]);
  const [systemStatus, setSystemStatus] = useState<'autonomous' | 'manual' | 'maintenance'>('autonomous');
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const { toast } = useToast();
  const { systemHealth } = usePerformanceOptimization();
  const { initializeAgents } = useAgentInitializer();
  const { seekGPTAssistance } = useGPTAssistance();
  const {
    executeRefactoringTask,
    executeOptimizationTask,
    executeUIImprovementTask,
    executeMonitoringTask,
    executeLearningTask,
    executeResearchTask,
    executeFrontendTask,
    executeBackendTask,
    executeDatabaseTask,
    executeTestingTask,
    executeDeploymentTask
  } = useAgentTasks();

  const executeAgentTask = async (agent: AutonomousAgent) => {
    setAgents(prev => prev.map(a => 
      a.id === agent.id ? { ...a, status: 'working' as const } : a
    ));

    try {
      let result;
      let actionDescription = '';

      switch (agent.type) {
        case 'refactoring':
          result = await executeRefactoringTask();
          actionDescription = 'Refactored code modules for better maintainability';
          break;
        case 'optimization':
          result = await executeOptimizationTask();
          actionDescription = 'Optimized system performance and resource allocation';
          break;
        case 'ui_improvement':
          result = await executeUIImprovementTask();
          actionDescription = 'Enhanced UI/UX based on user behavior analysis';
          break;
        case 'monitoring':
          result = await executeMonitoringTask();
          actionDescription = 'Monitored system health and generated alerts';
          
          // Auto-create alerts for issues found
          if (result?.alerts && result.alerts.length > 0) {
            for (const alert of result.alerts) {
              await supabase.from('alerts').insert({
                title: alert.title,
                message: alert.message,
                severity: alert.severity,
                category: 'system_health',
                source: 'autonomous_monitoring_agent'
              });
            }
          }
          break;
        case 'learning':
          result = await executeLearningTask();
          actionDescription = 'Updated AI learning models and thresholds';
          break;
        case 'research':
          result = await executeResearchTask();
          actionDescription = 'Conducted market research and competitive analysis';
          break;
        case 'frontend':
          result = await executeFrontendTask();
          actionDescription = 'Optimized frontend components and user experience';
          break;
        case 'backend':
          result = await executeBackendTask();
          actionDescription = 'Enhanced backend APIs and server performance';
          break;
        case 'database':
          result = await executeDatabaseTask();
          actionDescription = 'Database-Agent-Delta: Driver Portal schema optimization and real-time sync implementation';
          
          // Priority focus on Driver Portal completion
          if (result?.driver_portal_focus) {
            actionDescription = `Database-Agent-Delta: Completed ${result.driver_portal_focus.completed_features.length} Driver Portal features - ${result.driver_portal_focus.current_task}`;
          }
          break;
        case 'testing':
          result = await executeTestingTask();
          actionDescription = 'Executed comprehensive testing suites and quality checks';
          break;
        case 'deployment':
          result = await executeDeploymentTask();
          actionDescription = 'Enhanced deployment pipelines and infrastructure';
          break;
      }

      // Update agent status and stats
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? {
          ...a,
          status: 'active' as const,
          lastAction: actionDescription,
          tasksCompleted: a.tasksCompleted + 1,
          successRate: Math.min(100, a.successRate + 0.1),
          nextScheduledRun: calculateNextRun(agent.type)
        } : a
      ));

      setTotalTasksCompleted(prev => prev + 1);

      // Log successful autonomous action
      await supabase.from('agent_memory').insert({
        agent_id: agent.id,
        goal: `Autonomous ${agent.type} task`,
        context: { task_type: agent.type, system_status: systemStatus },
        prompt: `Execute ${agent.type} task autonomously`,
        response: JSON.stringify(result),
        action_taken: actionDescription,
        confidence: 0.95,
        outcome: 'success'
      });

      toast({
        title: "Autonomous Action Completed",
        description: `${agent.name}: ${actionDescription}`,
      });

    } catch (error: unknown) {
      console.error(`Agent ${agent.id} task failed:`, error);
      
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? {
          ...a,
          status: 'error' as const,
          lastAction: `Error: ${error.message}`,
          successRate: Math.max(0, a.successRate - 1),
          nextScheduledRun: calculateNextRun(agent.type, true)
        } : a
      ));

      // Try to get GPT assistance for complex problems
      await seekGPTAssistance(agent, error, systemHealth, agents);
    }
  };

  // Autonomous agent scheduler
  useEffect(() => {
    if (systemStatus !== 'autonomous') return;

    const interval = setInterval(() => {
      agents.forEach(agent => {
        if (agent.status === 'active' && new Date(agent.nextScheduledRun) <= new Date()) {
          executeAgentTask(agent);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [agents, systemStatus]);

  // Initialize agents on mount
  useEffect(() => {
    setAgents(initializeAgents());
  }, [initializeAgents]);

  const getSystemStats = (): SystemStats => {
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const averageSuccessRate = agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length;
    const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);

    return {
      active_agents: activeAgents,
      total_agents: agents.length,
      average_success_rate: Math.round(averageSuccessRate),
      total_tasks_completed: totalTasks,
      system_status: systemStatus,
      uptime_hours: Math.round((Date.now() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60))
    };
  };

  return {
    agents,
    systemStatus,
    setSystemStatus,
    totalTasksCompleted,
    executeAgentTask,
    getSystemStats,
    initializeAgents: () => setAgents(initializeAgents())
  };
};
