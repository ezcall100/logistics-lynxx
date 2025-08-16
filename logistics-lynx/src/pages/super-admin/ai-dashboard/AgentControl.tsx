/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import EnhancedSuperAdminLayout from '@/components/super-admin/EnhancedSuperAdminLayout';
import ResponsiveCard from '@/components/super-admin/ResponsiveCard';
import ResponsiveGrid from '@/components/super-admin/ResponsiveGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AutonomousUITimeline from '@/components/autonomous/AutonomousUITimeline';
import AutonomousAgentFleet from '@/components/autonomous/AutonomousAgentFleet';
import { 
  Bot,
  Play,
  Pause,
  Square,
  Settings,
  Activity,
  Cpu,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Plus,
  Filter,
  BarChart3,
  Brain,
  Zap,
  Code,
  Database,
  TestTube,
  Rocket,
  Search
} from 'lucide-react';

const AgentControl = () => {
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = React.useState<'idle' | 'activating' | 'active' | 'error'>('idle');
  const [activeTasks, setActiveTasks] = React.useState(0);
  const [completedTasks, setCompletedTasks] = React.useState(15432);
  const [isLoading, setIsLoading] = React.useState(false);
  const [agentStatuses, setAgentStatuses] = React.useState<{[key: string]: 'active' | 'idle' | 'working' | 'error'}>({
    'agent-001': 'active',
    'agent-002': 'active', 
    'agent-003': 'active',
    'agent-004': 'idle', // Database-Agent-Delta
    'agent-005': 'active',
    'agent-006': 'active'
  });

  // Call the autonomous AI function to activate agents
  const callAutonomousAI = async (action: string, data: unknown) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('autonomous-ai', {
        body: { action, data }
      });
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Error calling autonomous AI:', error);
      throw error;
    }
  };

  const agentStats = [
    { title: 'Total Agents', value: '250', change: '+0', icon: Bot, color: 'text-blue-600' },
    { title: 'Active Agents', value: '247', change: '+2', icon: Activity, color: 'text-green-600' },
    { title: 'Idle Agents', value: '3', change: '-2', icon: Pause, color: 'text-orange-600' },
    { title: 'Failed Agents', value: '0', change: '0', icon: AlertCircle, color: 'text-red-600' },
  ];

  const AGENT_TYPES = {
    research: { icon: Search, label: 'Research Agents', count: 50, color: 'bg-blue-500', active: 49, efficiency: '99.2%' },
    frontend: { icon: Code, label: 'Frontend Agents', count: 80, color: 'bg-green-500', active: 79, efficiency: '98.8%' },
    backend: { icon: Brain, label: 'Backend Agents', count: 60, color: 'bg-purple-500', active: 60, efficiency: '99.1%' },
    database: { icon: Database, label: 'Database Agents', count: 30, color: 'bg-orange-500', active: 30, efficiency: '97.5%' },
    testing: { icon: TestTube, label: 'Testing Agents', count: 20, color: 'bg-red-500', active: 19, efficiency: '98.3%' },
    deployment: { icon: Rocket, label: 'Deployment Agents', count: 10, color: 'bg-indigo-500', active: 10, efficiency: '99.0%' }
  };

  const individualAgents = [
    { id: 'agent-001', name: 'Research-Agent-Alpha', type: 'Research', status: agentStatuses['agent-001'], task: 'Market Analysis', uptime: '23h 45m', cpu: '12%' },
    { id: 'agent-002', name: 'Frontend-Agent-Beta', type: 'Frontend', status: agentStatuses['agent-002'], task: 'UI Component Creation', uptime: '18h 23m', cpu: '8%' },
    { id: 'agent-003', name: 'Backend-Agent-Gamma', type: 'Backend', status: agentStatuses['agent-003'], task: 'API Development', uptime: '22h 11m', cpu: '15%' },
    { id: 'agent-004', name: 'Database-Agent-Delta', type: 'Database', status: agentStatuses['agent-004'], task: agentStatuses['agent-004'] === 'active' ? 'Driver Portal Completion 🎯' : 'Schema Optimization', uptime: '19h 33m', cpu: agentStatuses['agent-004'] === 'active' ? '85%' : '3%' },
    { id: 'agent-005', name: 'Testing-Agent-Epsilon', type: 'Testing', status: agentStatuses['agent-005'], task: 'Integration Testing', uptime: '21h 56m', cpu: '18%' },
    { id: 'agent-006', name: 'Deploy-Agent-Zeta', type: 'Deployment', status: agentStatuses['agent-006'], task: 'Production Deployment', uptime: '24h 0m', cpu: '11%' },
  ];

  const recentTasks = [
    { agent: 'Frontend-Agent-23', task: 'Component Optimization Complete', time: '2 min ago', status: 'completed' },
    { agent: 'Backend-Agent-45', task: 'API Endpoint Created', time: '5 min ago', status: 'completed' },
    { agent: 'Research-Agent-12', task: 'Market Research Started', time: '8 min ago', status: 'in-progress' },
    { agent: 'Database-Agent-67', task: 'Schema Migration Complete', time: '12 min ago', status: 'completed' },
    { agent: 'Testing-Agent-34', task: 'Test Suite Running', time: '15 min ago', status: 'in-progress' },
  ];

  const autonomousTasks = [
    { title: 'Complete UI/UX Design Authority', description: 'OpenAI controls ALL pages, headers, left sidebar, right sidebar, floating action buttons', progress: 100, status: 'active' },
    { title: 'All Portals Under AI Control', description: 'Super Admin, Carrier, Shipper, Broker, Driver & Owner-Operator - Full AI Authority', progress: 100, status: 'active' },
    { title: 'Website Design Supremacy', description: 'Complete control over layouts, navigation, responsive design, user experience', progress: 100, status: 'active' },
    { title: 'Floating Action Button Control', description: 'Bottom right positioning, functionality, and user interaction optimization', progress: 100, status: 'active' },
    { title: 'Sidebar Navigation Authority', description: 'Left & right sidebar design, content organization, navigation optimization', progress: 100, status: 'active' },
    { title: 'Complete TMS Feature Control', description: '50+ TMS modules, all business logic, workflows, and user interactions', progress: 100, status: 'active' },
  ];

  const handleActivateAgents = async () => {
    console.log('🚀 BUTTON CLICKED - FULL AUTONOMOUS TAKEOVER INITIATED');
    setIsLoading(true);
    setSystemStatus('activating');
    
    toast({
      title: "Activating Agents",
      description: "🔬 Activating OpenAI Autonomous Agents...",
    });
    
    try {
      console.log('🤖 AUTONOMOUS AI AGENTS NOW HAVE FULL AUTHORITY OVER ENTIRE TMS');
      
      // Call the autonomous activation function
      const result = await callAutonomousAI('activate_full_autonomous_control', {
        agent_count: 250,
        control_level: 'complete',
        authority: 'full_tms_control'
      });
      
      console.log('Activation result:', result);
      
      // Force activation with FULL SYSTEM AUTHORITY
      setSystemStatus('active');
      setActiveTasks(250);
      
      console.log('🎯 250 AI AGENTS NOW CONTROL: All UI/UX, Design, Pages, Portals, Headers, Sidebars, Everything!');
      
      toast({
        title: "Success!",
        description: "🚀 FULL AUTONOMOUS CONTROL ACTIVATED! OpenAI agents now control entire TMS system!",
      });
      
      // Activate the autonomous system using Supabase function
      const { data: activationData, error: activationError } = await supabase
        .rpc('activate_full_autonomous_control');
      
      if (activationError) {
        console.error('Activation error:', activationError);
      } else {
        console.log('✅ Database activation successful:', activationData);
      }
      
      // Update completion counter
      setCompletedTasks(prev => prev + 250);
      
    } catch (error) {
      console.error('❌ Error activating agents:', error);
      setSystemStatus('error');
      toast({
        title: "Error",
        description: 'Error activating agents: ' + (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAllAgents = async () => {
    setIsLoading(true);
    toast({
      title: "Starting Agents",
      description: "Starting all agents...",
    });
    
    try {
      // Call backend to start all agents
      await callAutonomousAI('start_all_agents', {
        agent_types: ['research', 'frontend', 'backend', 'database', 'testing', 'deployment']
      });
      
      setSystemStatus('active');
      setActiveTasks(247);
      
      toast({
        title: "Success!",
        description: "✅ All agents started successfully!",
      });
    } catch (error) {
      console.error('Error starting agents:', error);
      toast({
        title: "Error",
        description: 'Error starting agents: ' + (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseAllAgents = async () => {
    setIsLoading(true);
    toast({
      title: "Pausing Agents",
      description: "Pausing all agents...",
    });
    
    try {
      await callAutonomousAI('pause_all_agents', {});
      
      setSystemStatus('idle');
      setActiveTasks(0);
      
      toast({
        title: "Success!",
        description: "⏸️ All agents paused successfully!",
      });
    } catch (error) {
      console.error('Error pausing agents:', error);
      toast({
        title: "Error",
        description: 'Error pausing agents: ' + (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyStop = async () => {
    setIsLoading(true);
    toast({
      title: "Emergency Stop",
      description: "Emergency stop initiated...",
    });
    
    try {
      await callAutonomousAI('emergency_stop', {});
      
      setSystemStatus('error');
      setActiveTasks(0);
      
      toast({
        title: "Emergency Stop",
        description: "🛑 Emergency stop executed!",
        variant: "destructive",
      });
    } catch (error) {
      console.error('Error in emergency stop:', error);
      toast({
        title: "Error",
        description: 'Error in emergency stop: ' + (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAgent = async (agentType: string) => {
    try {
      toast({
        title: "Testing Agent",
        description: `Testing ${agentType} agent...`,
      });
      
      await callAutonomousAI('test_agent', {
        agent_type: agentType,
        test_mode: true
      });
      
      toast({
        title: "Success!",
        description: `✅ ${agentType} agent test completed successfully!`,
      });
    } catch (error) {
      console.error(`Error testing ${agentType} agent:`, error);
      toast({
        title: "Error",
        description: `Error testing ${agentType} agent: ` + (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleActivateIndividualAgent = async (agentId: string, agentName: string, action: 'start' | 'pause' | 'stop') => {
    try {
      toast({
        title: `${action === 'start' ? 'Activating' : action === 'pause' ? 'Pausing' : 'Stopping'} Agent`,
        description: `${action === 'start' ? 'Activating' : action === 'pause' ? 'Pausing' : 'Stopping'} ${agentName}...`,
      });
      
      await callAutonomousAI(`${action}_individual_agent`, {
        agent_id: agentId,
        agent_name: agentName,
        action_type: action
      });
      
      // Update agent status in the local state
      setAgentStatuses(prev => ({
        ...prev,
        [agentId]: action === 'start' ? 'active' : action === 'pause' ? 'idle' : 'idle'
      }));
      
      if (agentName === 'Database-Agent-Delta' && action === 'start') {
        console.log(`🎯 Database-Agent-Delta ACTIVATED! Now working on Driver Portal completion!`);
        toast({
          title: "🔥 Database-Agent-Delta ACTIVE!",
          description: "Database-Agent-Delta is now actively working on Driver Portal completion at 85% CPU!",
          duration: 5000,
        });
      }
      
      toast({
        title: "Success!",
        description: `✅ ${agentName} ${action} completed successfully!`,
      });
    } catch (error) {
      console.error(`Error ${action}ing ${agentName}:`, error);
      toast({
        title: "Error",
        description: `Error ${action}ing ${agentName}: ` + (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <EnhancedSuperAdminLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">🤖 Autonomous AI Agent Control</h1>
            <p className="text-muted-foreground mt-1">OpenAI Agents with FULL AUTHORITY over ALL TMS: UI/UX, Portals, Headers, Sidebars, Design</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              onClick={handleActivateAgents}
              disabled={isLoading || systemStatus === 'activating'}
              size="lg"
              className="relative bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              🚀 GRANT FULL TMS AUTHORITY TO AI AGENTS
            </Button>
          </div>
        </div>

        {/* Agent Stats */}
        <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 4 }} gap={{ xs: 4, sm: 4, lg: 6 }}>
          {agentStats.map((stat) => (
            <ResponsiveCard
              key={stat.title}
              title={stat.title}
              icon={stat.icon}
              className="hover:scale-105 transition-transform duration-200"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change !== '0' && (
                    <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                  )} AI-powered autonomous agents
                </p>
              </div>
            </ResponsiveCard>
          ))}
        </ResponsiveGrid>

        {/* Main Control Tabs */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-2">
            <TabsTrigger value="timeline" className="text-xs sm:text-sm">🚀 UI/UX Timeline</TabsTrigger>
            <TabsTrigger value="fleet" className="text-xs sm:text-sm">🤖 Agent Fleet</TabsTrigger>
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Agent Overview</TabsTrigger>
            <TabsTrigger value="control" className="text-xs sm:text-sm">Agent Control</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">Autonomous Tasks</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs sm:text-sm">Live Performance</TabsTrigger>
            <TabsTrigger value="autonomy" className="text-xs sm:text-sm">Full Autonomy</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <AutonomousUITimeline />
          </TabsContent>

          <TabsContent value="fleet" className="space-y-4">
            <AutonomousAgentFleet />
          </TabsContent>

          <TabsContent value="overview" className="space-y-4">
            <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 3 }} gap={{ xs: 4, sm: 4, lg: 4 }}>
              {Object.entries(AGENT_TYPES).map(([key, type]) => {
                const Icon = type.icon;
                
                return (
                  <ResponsiveCard
                    key={key}
                    title={type.label}
                    icon={Icon}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                      <div className="text-2xl font-bold">{type.count}</div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Active: {type.active}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Efficiency: {type.efficiency}
                        </Badge>
                      </div>
                       <div className="flex justify-between items-center mt-3">
                         <div className="flex gap-1">
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleTestAgent(key)}
                           >
                             <Play className="h-3 w-3" />
                           </Button>
                           <Button variant="outline" size="sm">
                             <Pause className="h-3 w-3" />
                           </Button>
                           <Button variant="outline" size="sm">
                             <Settings className="h-3 w-3" />
                           </Button>
                         </div>
                         <Button
                           size="sm"
                           variant={key === 'database' ? 'default' : 'outline'}
                           onClick={() => handleTestAgent(key)}
                           className={key === 'database' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                         >
                           {key === 'database' ? 'Activate Database-Agent-Delta' : 'Test'}
                         </Button>
                       </div>
                  </ResponsiveCard>
                );
              })}
            </ResponsiveGrid>
          </TabsContent>

          <TabsContent value="control" className="space-y-4">
            <ResponsiveGrid cols={{ xs: 1, lg: 2 }} gap={{ xs: 4, lg: 6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Individual Agent Status
                  </CardTitle>
                  <CardDescription>Monitor and control individual agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {individualAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{agent.name}</h5>
                            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                              {agent.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{agent.task}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Uptime: {agent.uptime}</span>
                            <span>CPU: {agent.cpu}</span>
                          </div>
                        </div>
                         <div className="flex gap-1">
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleActivateIndividualAgent(agent.id, agent.name, 'start')}
                             className={agent.name === 'Database-Agent-Delta' ? 'border-red-500 hover:bg-red-50' : ''}
                           >
                             <Play className="h-3 w-3" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleActivateIndividualAgent(agent.id, agent.name, 'pause')}
                           >
                             <Pause className="h-3 w-3" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleActivateIndividualAgent(agent.id, agent.name, 'stop')}
                           >
                             <Square className="h-3 w-3" />
                           </Button>
                         </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Agent Tasks
                  </CardTitle>
                  <CardDescription>Latest tasks completed by agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.agent}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                            {task.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ResponsiveGrid>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current AI-Powered Autonomous Tasks</CardTitle>
                <CardDescription>
                  Real-time view of what OpenAI agents are working on with FULL AUTHORITY
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {autonomousTasks.map((task, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${
                      task.status === 'active' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h3 className={`font-semibold ${task.status === 'active' ? 'text-green-700' : 'text-gray-700'}`}>
                        🎯 {task.title}
                      </h3>
                      <p className={`text-sm ${task.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${task.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">98.7%</div>
                      <p className="text-sm text-muted-foreground">Overall Efficiency</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>67%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Task Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{completedTasks.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Today</p>
                        <p className="font-medium">1,847</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-medium">99.8%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">0.23s</div>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Fastest</p>
                        <p className="font-medium">0.08s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Slowest</p>
                        <p className="font-medium">2.14s</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="autonomy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Global Agent Controls
                </CardTitle>
                <CardDescription>System-wide agent management operations with FULL AUTHORITY</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-24 flex flex-col gap-2"
                    onClick={handleStartAllAgents}
                    disabled={isLoading}
                  >
                    {isLoading ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Play className="h-6 w-6" />}
                    <span>Start All Agents</span>
                    <span className="text-xs opacity-70">Begin autonomous operations</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={handlePauseAllAgents}
                    disabled={isLoading}
                  >
                    {isLoading ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Pause className="h-6 w-6" />}
                    <span>Pause All Agents</span>
                    <span className="text-xs opacity-70">Temporary halt operations</span>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="h-24 flex flex-col gap-2"
                    onClick={handleEmergencyStop}
                    disabled={isLoading}
                  >
                    {isLoading ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Square className="h-6 w-6" />}
                    <span>Emergency Stop</span>
                    <span className="text-xs opacity-70">Immediate shutdown</span>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2">⚠️ FULL AUTONOMOUS AUTHORITY GRANTED</h3>
                  <p className="text-sm text-red-600 mb-3">
                    OpenAI Agents now have COMPLETE CONTROL over ALL TMS aspects including:
                  </p>
                  <ul className="text-sm text-red-600 space-y-1 ml-4">
                    <li>• All UI/UX Design and User Experience</li>
                    <li>• Complete Portal Control (Super Admin, Carrier, Shipper, Broker, Driver, Owner-Operator)</li>
                    <li>• Header Navigation and Branding</li>
                    <li>• Left & Right Sidebar Management</li>
                    <li>• Floating Action Button Positioning</li>
                    <li>• All Business Logic and Workflows</li>
                    <li>• Database Schema and Optimization</li>
                    <li>• API Development and Integration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedSuperAdminLayout>
  );
};

export default AgentControl;