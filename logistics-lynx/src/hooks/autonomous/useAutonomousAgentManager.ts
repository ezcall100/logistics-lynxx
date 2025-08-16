
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

  const executeAgentTask = useCallback(async (agent: AutonomousAgent) => {
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
          actionDescription = 'Enhanced frontend components and user interface';
          
          // Auto-create or update website pages
          if (result?.pages && result.pages.length > 0) {
            for (const page of result.pages) {
              await createOrUpdateWebsitePage(page);
            }
          }
          break;
        case 'backend':
          result = await executeBackendTask();
          actionDescription = 'Improved backend services and API endpoints';
          break;
        case 'database':
          result = await executeDatabaseTask();
          actionDescription = 'Optimized database queries and schema';
          break;
        case 'testing':
          result = await executeTestingTask();
          actionDescription = 'Enhanced test coverage and quality assurance';
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
  }, [toast, seekGPTAssistance, systemHealth, agents, executeRefactoringTask, executeOptimizationTask, executeUIImprovementTask, executeMonitoringTask, executeLearningTask, executeResearchTask, executeFrontendTask, executeBackendTask, executeDatabaseTask, executeTestingTask, executeDeploymentTask, systemStatus]);

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
  }, [agents, systemStatus, executeAgentTask]);

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

  // Website page creation and updating functionality
  const createOrUpdateWebsitePage = async (pageData: {
    name: string;
    path: string;
    component: string;
    content: string;
    type: 'page' | 'component' | 'layout';
  }) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      // Determine the correct file path based on type
      let filePath: string;
      switch (pageData.type) {
        case 'page':
          filePath = `src/pages/${pageData.component}.tsx`;
          break;
        case 'component':
          filePath = `src/components/${pageData.component}.tsx`;
          break;
        case 'layout':
          filePath = `src/components/layout/${pageData.component}.tsx`;
          break;
        default:
          filePath = `src/pages/${pageData.component}.tsx`;
      }
      
      // Ensure the directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(filePath, pageData.content, 'utf8');
      
      // Save to database
      await supabase.from('website_pages').upsert({
        name: pageData.name,
        path: pageData.path,
        component: pageData.component,
        content: pageData.content,
        status: 'active',
        updated_at: new Date().toISOString()
      });
      
      console.log(`✅ Created/Updated website page: ${filePath}`);
      
    } catch (error) {
      console.error(`❌ Error creating/updating website page: ${error}`);
      throw error;
    }
  };

  // Enhanced frontend task execution with page creation
  const executeFrontendTask = async () => {
    try {
      // Generate sample pages that might be missing
      const samplePages = [
        {
          name: 'User Management',
          path: '/admin/users',
          component: 'UserManagement',
          type: 'page' as const,
          content: `import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Edit, Trash2 } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load users data
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and permissions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage all system users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="space-y-2">
              {users.length === 0 && !loading && (
                <p className="text-muted-foreground">No users found</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;`
        },
        {
          name: 'Settings Dashboard',
          path: '/admin/settings',
          component: 'SettingsDashboard',
          type: 'page' as const,
          content: `import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Shield, Database, Bell, Globe } from 'lucide-react';

const SettingsDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
            <CardDescription>Manage security settings and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Database
            </CardTitle>
            <CardDescription>Database configuration and maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsDashboard;`
        }
      ];

      return {
        success: true,
        pages: samplePages,
        message: 'Frontend improvements completed with new pages created'
      };
    } catch (error) {
      console.error('Frontend task execution failed:', error);
      throw error;
    }
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
