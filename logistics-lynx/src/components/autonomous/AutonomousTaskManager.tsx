/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface AutonomousTask {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'paused' | 'completed' | 'error';
  progress: number;
  priority: 'high' | 'medium' | 'low';
  estimatedCompletion: string;
  agentsAssigned: number;
  category: 'portal_completion' | 'ui_optimization' | 'load_board' | 'onboarding' | 'monitoring';
}

export const AutonomousTaskManager = () => {
  const [tasks, setTasks] = useState<AutonomousTask[]>([]);
  const [systemStatus, setSystemStatus] = useState<'active' | 'paused' | 'maintenance'>('active');
  const { toast } = useToast();

  useEffect(() => {
    // Initialize autonomous tasks
    const initialTasks: AutonomousTask[] = [
      {
        id: '1',
        name: 'Super Admin Portal Completion',
        description: 'Complete user management, settings, and API key management features',
        status: 'running',
        progress: 85,
        priority: 'high',
        estimatedCompletion: '2 hours',
        agentsAssigned: 15,
        category: 'portal_completion'
      },
      {
        id: '2',
        name: 'Carrier Admin Fleet Management',
        description: 'Implement driver assignment, vehicle tracking, and compliance monitoring',
        status: 'running',
        progress: 70,
        priority: 'high',
        estimatedCompletion: '4 hours',
        agentsAssigned: 20,
        category: 'portal_completion'
      },
      {
        id: '3',
        name: 'Driver Mobile Optimization',
        description: 'Enhance mobile responsiveness and implement HOS tracking',
        status: 'running',
        progress: 60,
        priority: 'high',
        estimatedCompletion: '3 hours',
        agentsAssigned: 12,
        category: 'ui_optimization'
      },
      {
        id: '4',
        name: 'Load Board AI Matching',
        description: 'Implement AI-powered load-to-carrier matching algorithms',
        status: 'paused',
        progress: 45,
        priority: 'medium',
        estimatedCompletion: '6 hours',
        agentsAssigned: 25,
        category: 'load_board'
      },
      {
        id: '5',
        name: 'Onboarding Flow Creation',
        description: 'Build step-by-step onboarding for all user roles',
        status: 'paused',
        progress: 30,
        priority: 'medium',
        estimatedCompletion: '5 hours',
        agentsAssigned: 10,
        category: 'onboarding'
      },
      {
        id: '6',
        name: 'System Health Monitoring',
        description: 'Implement real-time monitoring and self-healing capabilities',
        status: 'running',
        progress: 75,
        priority: 'high',
        estimatedCompletion: '2 hours',
        agentsAssigned: 8,
        category: 'monitoring'
      }
    ];

    setTasks(initialTasks);
    loadSystemStatus();
  }, []);

  const loadSystemStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('autonomous_agent_configs')
        .select('is_active')
        .limit(1);

      if (!error && data && data.length > 0) {
        setSystemStatus(data[0].is_active ? 'active' : 'paused');
      }
    } catch (error) {
      console.error('Error loading system status:', error);
    }
  };

  const toggleTask = async (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'running' ? 'paused' : 'running' }
          : task
      )
    );

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: `Task ${task.status === 'running' ? 'Paused' : 'Started'}`,
        description: `${task.name} is now ${task.status === 'running' ? 'paused' : 'running'}`,
      });

      // Log agent activity
      await supabase.from('agent_memory').insert({
        agent_id: `autonomous-task-${taskId}`,
        goal: `${task.status === 'running' ? 'Pause' : 'Start'} task: ${task.name}`,
        context: { task_id: taskId, action: task.status === 'running' ? 'pause' : 'start' },
        prompt: `User ${task.status === 'running' ? 'paused' : 'started'} autonomous task`,
        response: `Task ${task.name} ${task.status === 'running' ? 'paused' : 'started'} successfully`,
        action_taken: `Task status changed to ${task.status === 'running' ? 'paused' : 'running'}`,
        confidence: 1.0,
        outcome: 'success'
      });
    }
  };

  const toggleSystemStatus = async () => {
    const newStatus = systemStatus === 'active' ? 'paused' : 'active';
    setSystemStatus(newStatus);

    toast({
      title: `Autonomous System ${newStatus === 'active' ? 'Activated' : 'Paused'}`,
      description: `All autonomous agents are now ${newStatus}`,
      variant: newStatus === 'active' ? 'default' : 'destructive'
    });

    // Update system status in database
    try {
      await supabase
        .from('autonomous_agent_configs')
        .update({ is_active: newStatus === 'active' })
        .eq('agent_id', 'system');
    } catch (error) {
      console.error('Error updating system status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 text-green-500" />;
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'portal_completion': return 'bg-blue-100 text-blue-800';
      case 'ui_optimization': return 'bg-purple-100 text-purple-800';
      case 'load_board': return 'bg-green-100 text-green-800';
      case 'onboarding': return 'bg-orange-100 text-orange-800';
      case 'monitoring': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runningTasks = tasks.filter(t => t.status === 'running').length;
  const totalAgents = tasks.reduce((sum, task) => sum + task.agentsAssigned, 0);
  const avgProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Autonomous Task Manager</h2>
          <p className="text-muted-foreground">
            Control and monitor your 250+ autonomous agents
          </p>
        </div>
        <Button
          onClick={toggleSystemStatus}
          size="lg"
          variant={systemStatus === 'active' ? 'destructive' : 'default'}
          className="flex items-center gap-2"
        >
          {systemStatus === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {systemStatus === 'active' ? 'Pause System' : 'Start System'}
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                systemStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="font-semibold capitalize">{systemStatus}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningTasks}/{tasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getCategoryColor(task.category)}>
                    {task.category.replace('_', ' ')}
                  </Badge>
                  <Button
                    onClick={() => toggleTask(task.id)}
                    size="sm"
                    variant="outline"
                    disabled={systemStatus !== 'active'}
                  >
                    {task.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Agents Assigned:</span>
                    <span className="ml-2 font-medium">{task.agentsAssigned}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Completion:</span>
                    <span className="ml-2 font-medium">{task.estimatedCompletion}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
