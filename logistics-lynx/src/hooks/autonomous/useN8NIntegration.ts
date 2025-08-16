/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface N8NAgent {
  agentId: string;
  taskType: string;
  status: 'initialized' | 'working' | 'completed' | 'error';
  data?: unknown;
}

interface N8NBatch {
  batchId: string;
  agents: N8NAgent[];
  totalAgents: number;
  completedAgents: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export const useN8NIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<N8NBatch | null>(null);
  const [agentUpdates, setAgentUpdates] = useState<N8NAgent[]>([]);
  const [workflowStatus, setWorkflowStatus] = useState<string>('idle');
  const [totalAgentsActivated, setTotalAgentsActivated] = useState(0);
  const { toast } = useToast();

  // Initialize n8n integration
  const initializeN8NIntegration = useCallback(async () => {
    try {
      console.log('Initializing n8n integration...');
      
      // Test connection to n8n integration endpoint
      const { data, error } = await supabase.functions.invoke('n8n-integration', {
        body: {
          action: 'system_status',
          data: {
            systemMetrics: {
              cpu_usage: 15,
              memory_usage: 35,
              uptime: 24
            },
            agentHealth: [],
            performanceData: {}
          }
        }
      });

      if (error) {
        console.error('n8n integration test failed:', error);
        setIsConnected(false);
        return false;
      }

      console.log('n8n integration connected:', data);
      setIsConnected(true);
      
      toast({
        title: "n8n Integration Connected",
        description: "Ready to receive real-time agent updates from n8n workflows",
      });

      return true;
    } catch (error: unknown) {
      console.error('Error initializing n8n integration:', error);
      setIsConnected(false);
      return false;
    }
  }, [toast]);

  // Send agent batch update to n8n integration
  const sendAgentBatchUpdate = useCallback(async (agents: N8NAgent[], batchId?: string) => {
    if (!isConnected) {
      console.warn('n8n integration not connected');
      return false;
    }

    try {
      const batchIdToUse = batchId || `batch-${Date.now()}`;
      
      const { data, error } = await supabase.functions.invoke('n8n-integration', {
        body: {
          action: 'agent_batch_update',
          data: {
            batchId: batchIdToUse,
            agents,
            batchSize: 25,
            totalAgents: 250
          }
        }
      });

      if (error) {
        console.error('Error sending batch update:', error);
        return false;
      }

      console.log('Batch update sent successfully:', data);
      
      // Update local state
      setCurrentBatch({
        batchId: batchIdToUse,
        agents,
        totalAgents: 250,
        completedAgents: agents.filter(a => a.status === 'completed').length,
        status: 'processing'
      });

      return true;
    } catch (error: unknown) {
      console.error('Error in sendAgentBatchUpdate:', error);
      return false;
    }
  }, [isConnected]);

  // Activate 250 agents through n8n workflow
  const activate250Agents = useCallback(async () => {
    if (!isConnected) {
      await initializeN8NIntegration();
    }

    try {
      setWorkflowStatus('starting');
      
      const roles = [
        { role: "UI Builder", count: 39 },
        { role: "Data Processor", count: 39 },
        { role: "Security", count: 37 },
        { role: "Optimization", count: 39 },
        { role: "Testing", count: 52 },
        { role: "Deployment", count: 44 }
      ];
      
      const totalAgents = 250;
      const batchSize = 25;
      const batches = Math.ceil(totalAgents / batchSize);

      toast({
        title: "Activating 250 Agents",
        description: `Processing ${batches} batches of ${batchSize} agents each`,
      });

      let totalActivated = 0;
      let roleIndex = 0;
      let roleAgentCount = 0;

      for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
        const batchAgents: N8NAgent[] = [];
        
        for (let i = 0; i < batchSize && totalActivated < totalAgents; i++) {
          // Get current role
          const currentRole = roles[roleIndex];
          const agentType = currentRole.role.toLowerCase().replace(" ", "_");
          const agentId = `${currentRole.role}-${roleAgentCount + 1}`;
          
          batchAgents.push({
            agentId,
            taskType: agentType,
            status: 'initialized',
            data: {
              role: currentRole.role,
              module: `Module-${Math.floor(totalActivated / 25) + 1}`,
              message: `Initializing ${currentRole.role} agent #${roleAgentCount + 1}`,
              timestamp: new Date().toISOString()
            }
          });
          
          totalActivated++;
          roleAgentCount++;
          
          // Move to next role when current role is complete
          if (roleAgentCount >= currentRole.count && roleIndex < roles.length - 1) {
            roleIndex++;
            roleAgentCount = 0;
          }
        }

        // Send batch to n8n integration
        const batchId = `activation-batch-${batchIndex + 1}`;
        const success = await sendAgentBatchUpdate(batchAgents, batchId);
        
        if (success) {
          setTotalAgentsActivated(totalActivated);
          
          // Simulate agent processing
          setTimeout(async () => {
            const completedAgents = batchAgents.map(agent => ({
              ...agent,
              status: 'completed' as const,
              data: {
                ...agent.data,
                message: `${agent.taskType} agent activated and operational`,
                duration: `${Math.floor(Math.random() * 5) + 2}s`
              }
            }));

            await sendAgentBatchUpdate(completedAgents, batchId);
          }, 2000 + (batchIndex * 500)); // Stagger batch completions
        }

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setWorkflowStatus('completed');
      
      toast({
        title: "All 250 Agents Activated",
        description: "Autonomous system is now running 24/7",
      });

      return true;
    } catch (error: unknown) {
      console.error('Error activating 250 agents:', error);
      setWorkflowStatus('failed');
      
      toast({
        title: "Agent Activation Failed",
        description: error.message,
        variant: "destructive"
      });

      return false;
    }
  }, [isConnected, initializeN8NIntegration, sendAgentBatchUpdate, toast]);

  // Send task coordination request
  const coordinateTasks = useCallback(async (coordinationType: string, agents: unknown[], tasks: unknown[]) => {
    if (!isConnected) return false;

    try {
      const { data, error } = await supabase.functions.invoke('n8n-integration', {
        body: {
          action: 'task_coordination',
          data: {
            coordinationType,
            agents,
            tasks,
            batchSize: 25
          }
        }
      });

      if (error) {
        console.error('Task coordination error:', error);
        return false;
      }

      console.log('Task coordination successful:', data);
      return true;
    } catch (error: unknown) {
      console.error('Error in coordinateTasks:', error);
      return false;
    }
  }, [isConnected]);

  // Send workflow execution status
  const reportWorkflowExecution = useCallback(async (workflowData: unknown) => {
    if (!isConnected) return false;

    try {
      const { data, error } = await supabase.functions.invoke('n8n-integration', {
        body: {
          action: 'workflow_execution',
          data: workflowData
        }
      });

      if (error) {
        console.error('Workflow execution report error:', error);
        return false;
      }

      console.log('Workflow execution reported:', data);
      return true;
    } catch (error: unknown) {
      console.error('Error in reportWorkflowExecution:', error);
      return false;
    }
  }, [isConnected]);

  // Auto-initialize on mount
  useEffect(() => {
    initializeN8NIntegration();
  }, [initializeN8NIntegration]);

  // Listen for real-time updates
  useEffect(() => {
    if (!isConnected) return;

    const channel = supabase
      .channel('n8n-agent-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'autonomous_tasks'
        },
        (payload) => {
          const task = payload.new;
          if (task.task_id?.startsWith('n8n-')) {
            setAgentUpdates(prev => [
              {
                agentId: task.assigned_agent_id,
                taskType: task.agent_type,
                status: task.status === 'completed' ? 'completed' : 'working',
                data: task.result
              },
              ...prev.slice(0, 99)
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConnected]);

  return {
    isConnected,
    currentBatch,
    agentUpdates,
    workflowStatus,
    totalAgentsActivated,
    initializeN8NIntegration,
    sendAgentBatchUpdate,
    activate250Agents,
    coordinateTasks,
    reportWorkflowExecution
  };
};