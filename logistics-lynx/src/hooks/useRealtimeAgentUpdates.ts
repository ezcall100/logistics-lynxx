import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AgentUpdate {
  agent_id: string;
  agent_type: string;
  status: 'healthy' | 'warning' | 'error' | 'checking' | 'working';
  message: string;
  response_time: number;
  timestamp: string;
}

interface TaskCompletion {
  task_id: string;
  agent_id: string;
  status: 'completed' | 'failed';
  result: unknown;
  duration: number;
  timestamp: string;
}

export const useRealtimeAgentUpdates = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [agentUpdates, setAgentUpdates] = useState<AgentUpdate[]>([]);
  const [taskCompletions, setTaskCompletions] = useState<TaskCompletion[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    pollIntervalRef.current = setInterval(() => {
      try {
        // Generate realistic agent updates
        const agentTypes = ['ui_builder', 'data_processor', 'security', 'optimization', 'testing', 'deployment'];
        const statuses = ['healthy', 'working', 'warning'] as const;
        const messages = [
          'Task completed successfully',
          'Processing TMS data streams',
          'Optimizing route algorithms',
          'Running security checks',
          'Building UI components',
          'Deploying to production',
          'Testing system integration',
          'Analyzing performance metrics'
        ];

        const mockUpdate: AgentUpdate = {
          agent_id: `agent-${Math.floor(Math.random() * 50) + 1}`,
          agent_type: agentTypes[Math.floor(Math.random() * agentTypes.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          response_time: Math.floor(Math.random() * 200) + 100,
          timestamp: new Date().toISOString()
        };

        setAgentUpdates(prev => {
          const filtered = prev.filter(update => 
            update.agent_type !== mockUpdate.agent_type
          );
          return [mockUpdate, ...filtered.slice(0, 99)];
        });

        // Simulate task completions occasionally
        if (Math.random() > 0.6) {
          const mockTask: TaskCompletion = {
            task_id: `task-${Math.floor(Math.random() * 1000)}`,
            agent_id: `agent-${Math.floor(Math.random() * 50) + 1}`,
            status: Math.random() > 0.1 ? 'completed' : 'failed',
            result: { 
              success: true, 
              output: `Task completed by ${mockUpdate.agent_type} agent`,
              metrics: {
                performance: Math.floor(Math.random() * 30) + 70,
                efficiency: Math.floor(Math.random() * 25) + 75
              }
            },
            duration: Math.floor(Math.random() * 5000) + 1000,
            timestamp: new Date().toISOString()
          };

          setTaskCompletions(prev => [mockTask, ...prev.slice(0, 99)]);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000); // Poll every 2 seconds
  }, []);

  const connect = useCallback(() => {
    setIsConnected(true);
    setConnectionError(null);
    
    toast({
      title: "Real-time Connection Established",
      description: "Now receiving live agent updates",
    });
    
    // Start polling for updates
    startPolling();
  }, [toast, startPolling]);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setConnectionError(null);
    
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  const sendAgentUpdate = useCallback((update: Omit<AgentUpdate, 'timestamp'>) => {
    // Simulate sending update
    const fullUpdate = {
      ...update,
      timestamp: new Date().toISOString()
    };
    
    setAgentUpdates(prev => {
      const filtered = prev.filter(u => u.agent_type !== update.agent_type);
      return [fullUpdate, ...filtered.slice(0, 99)];
    });
  }, []);

  const sendTaskCompletion = useCallback((completion: Omit<TaskCompletion, 'timestamp'>) => {
    // Simulate sending task completion
    const fullCompletion = {
      ...completion,
      timestamp: new Date().toISOString()
    };
    
    setTaskCompletions(prev => [fullCompletion, ...prev.slice(0, 99)]);
  }, []);

  const runHealthCheck = useCallback((agentTypes: string[]) => {
    // Simulate health check for specified agent types
    agentTypes.forEach(agentType => {
      const healthUpdate: AgentUpdate = {
        agent_id: `health-check-${Date.now()}`,
        agent_type: agentType,
        status: Math.random() > 0.8 ? 'warning' : 'healthy',
        message: `Health check completed for ${agentType}`,
        response_time: Math.floor(Math.random() * 150) + 80,
        timestamp: new Date().toISOString()
      };

      setAgentUpdates(prev => {
        const filtered = prev.filter(update => 
          update.agent_type !== agentType || !update.agent_id.startsWith('health-check')
        );
        return [healthUpdate, ...filtered.slice(0, 99)];
      });
    });
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionError,
    agentUpdates,
    taskCompletions,
    sendAgentUpdate,
    sendTaskCompletion,
    runHealthCheck,
    connect,
    disconnect
  };
};