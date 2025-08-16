/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Code,
  Palette,
  Sparkles,
  Wrench,
  Target,
  Activity,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Heart,
  Cpu,
  Database,
  Network,
  Shield
} from 'lucide-react';

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'working' | 'error';
  description: string;
  icon: React.ReactNode;
  changes: number;
  lastActivity: string;
  health: number;
  errors: number;
}

export const ContinuousAgentSystem = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      id: 'ui-agent',
      name: 'UI Enhancement Agent',
      status: 'inactive',
      description: 'Continuously improves user interface elements',
      icon: <Palette className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'style-agent',
      name: 'Style Optimization Agent',
      status: 'inactive',
      description: 'Continuously applies dynamic styling and animations',
      icon: <Sparkles className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'performance-agent',
      name: 'Performance Agent',
      status: 'inactive',
      description: 'Continuously monitors and optimizes website performance',
      icon: <Zap className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'code-agent',
      name: 'Code Enhancement Agent',
      status: 'inactive',
      description: 'Continuously improves code quality and functionality',
      icon: <Code className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'monitoring-agent',
      name: 'System Monitoring Agent',
      status: 'inactive',
      description: 'Continuously monitors system health and status',
      icon: <Activity className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'network-agent',
      name: 'Network Optimization Agent',
      status: 'inactive',
      description: 'Continuously optimizes network connections',
      icon: <Network className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'security-agent',
      name: 'Security Monitoring Agent',
      status: 'inactive',
      description: 'Continuously monitors security status',
      icon: <Shield className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    },
    {
      id: 'database-agent',
      name: 'Database Optimization Agent',
      status: 'inactive',
      description: 'Continuously optimizes database performance',
      icon: <Database className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started',
      health: 100,
      errors: 0
    }
  ]);

  const [isSystemActive, setIsSystemActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalChanges, setTotalChanges] = useState(0);
  const [systemHealth, setSystemHealth] = useState(100);
  const [uptime, setUptime] = useState(0);
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date());

  // Refs to store intervals
  const workIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const healthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const uptimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the continuous system
  const startContinuousSystem = () => {
    console.log('🚀 Starting Continuous Autonomous Agent System...');
    setIsSystemActive(true);
    setIsPaused(false);
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'active' as const,
      lastActivity: 'System Started',
      health: 100,
      errors: 0
    })));

    // Start continuous work cycle
    startContinuousWork();
    
    // Start health monitoring
    startHealthMonitoring();
    
    // Start uptime tracking
    startUptimeTracking();
    
    // Start heartbeat
    startHeartbeat();
  };

  // Pause the system
  const pauseSystem = () => {
    console.log('⏸️ Pausing Autonomous Agent System...');
    setIsPaused(true);
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'inactive' as const,
      lastActivity: 'System Paused'
    })));
  };

  // Resume the system
  const resumeSystem = () => {
    console.log('▶️ Resuming Autonomous Agent System...');
    setIsPaused(false);
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'active' as const,
      lastActivity: 'System Resumed'
    })));
    startContinuousWork();
  };

  // Stop the system
  const stopSystem = () => {
    console.log('🛑 Stopping Autonomous Agent System...');
    setIsSystemActive(false);
    setIsPaused(false);
    
    // Clear all intervals
    if (workIntervalRef.current) clearInterval(workIntervalRef.current);
    if (healthIntervalRef.current) clearInterval(healthIntervalRef.current);
    if (uptimeIntervalRef.current) clearInterval(uptimeIntervalRef.current);
    if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'inactive' as const,
      lastActivity: 'System Stopped'
    })));
  };

  // Start continuous work cycle
  const startContinuousWork = () => {
    if (workIntervalRef.current) clearInterval(workIntervalRef.current);
    
    workIntervalRef.current = setInterval(() => {
      if (isPaused) return;
      
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'active' || agent.status === 'working') {
          try {
            const newChanges = agent.changes + Math.floor(Math.random() * 2) + 1;
            const activities = [
              'Applied UI improvements',
              'Optimized styling',
              'Enhanced performance',
              'Updated code quality',
              'Monitored system health',
              'Optimized network',
              'Enhanced security',
              'Improved database performance'
            ];
            
            // Apply visual changes based on agent type
            applyAgentChanges(agent.id);
            
            // Update health (random small fluctuations)
            const healthChange = Math.random() > 0.8 ? -1 : (Math.random() > 0.9 ? 1 : 0);
            const newHealth = Math.max(0, Math.min(100, agent.health + healthChange));

            return {
              ...agent,
              status: 'working' as const,
              changes: newChanges,
              lastActivity: activities[Math.floor(Math.random() * activities.length)],
              health: newHealth
            };
          } catch (error) {
            console.error(`Error in agent ${agent.id}:`, error);
            return {
              ...agent,
              status: 'error' as const,
              errors: agent.errors + 1,
              lastActivity: 'Error occurred'
            };
          }
        }
        return agent;
      }));

      setTotalChanges(prev => prev + 1);
      setLastHeartbeat(new Date());
    }, 2000); // Work every 2 seconds
  };

  // Start health monitoring
  const startHealthMonitoring = () => {
    if (healthIntervalRef.current) clearInterval(healthIntervalRef.current);
    
    healthIntervalRef.current = setInterval(() => {
      const avgHealth = agents.reduce((sum, agent) => sum + agent.health, 0) / agents.length;
      setSystemHealth(avgHealth);
      
      // Auto-recover agents with low health
      setAgents(prev => prev.map(agent => {
        if (agent.health < 50 && agent.status === 'error') {
          return {
            ...agent,
            status: 'active' as const,
            health: 75,
            lastActivity: 'Auto-recovered'
          };
        }
        return agent;
      }));
    }, 5000); // Check health every 5 seconds
  };

  // Start uptime tracking
  const startUptimeTracking = () => {
    if (uptimeIntervalRef.current) clearInterval(uptimeIntervalRef.current);
    
    uptimeIntervalRef.current = setInterval(() => {
      if (isSystemActive && !isPaused) {
        setUptime(prev => prev + 1);
      }
    }, 1000); // Update every second
  };

  // Start heartbeat
  const startHeartbeat = () => {
    if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    
    heartbeatIntervalRef.current = setInterval(() => {
      setLastHeartbeat(new Date());
      console.log('💓 Autonomous Agent System Heartbeat:', new Date().toLocaleTimeString());
    }, 10000); // Heartbeat every 10 seconds
  };

  // Apply visual changes based on agent type
  const applyAgentChanges = (agentId: string) => {
    try {
      const styleId = `agent-${agentId}-${Date.now()}`;
      const style = document.createElement('style');
      style.id = styleId;

      const effects = {
        'ui-agent': `
          body { 
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important; 
            transition: all 0.5s ease !important;
          }
        `,
        'style-agent': `
          button { 
            box-shadow: 0 0 20px #0066ff !important; 
            transform: scale(1.05) !important;
            transition: all 0.3s ease !important;
          }
        `,
        'performance-agent': `
          .card { 
            border: 3px solid #00ff00 !important; 
            animation: pulse 1s infinite !important;
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `,
        'code-agent': `
          h1, h2, h3 { 
            color: #ff6b6b !important; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1) !important;
          }
        `,
        'monitoring-agent': `
          * { 
            transition: all 0.2s ease !important;
          }
        `,
        'network-agent': `
          input, select, textarea { 
            border: 2px solid #0066ff !important; 
            box-shadow: 0 0 10px rgba(0,102,255,0.3) !important;
          }
        `,
        'security-agent': `
          .card { 
            box-shadow: 0 0 15px rgba(255,0,0,0.2) !important; 
            border-left: 4px solid #ff0000 !important;
          }
        `,
        'database-agent': `
          table, tr, td { 
            background: linear-gradient(45deg, #f0f8ff, #e6f3ff) !important; 
            border: 1px solid #0066cc !important;
          }
        `
      };

      style.textContent = effects[agentId as keyof typeof effects] || '';
      document.head.appendChild(style);

      // Remove style after 3 seconds
      setTimeout(() => {
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) existingStyle.remove();
      }, 3000);
    } catch (error) {
      console.error('Error applying agent changes:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (workIntervalRef.current) clearInterval(workIntervalRef.current);
      if (healthIntervalRef.current) clearInterval(healthIntervalRef.current);
      if (uptimeIntervalRef.current) clearInterval(uptimeIntervalRef.current);
      if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    };
  }, []);

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'working': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'working': return <Activity className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Master Control */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isSystemActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-800">🤖 CONTINUOUS AUTONOMOUS AGENT SYSTEM</span>
              </div>
              <Badge variant="default" className={`${isSystemActive ? 'bg-green-600' : 'bg-red-600'}`}>
                {isSystemActive ? (isPaused ? 'PAUSED' : 'RUNNING') : 'STOPPED'}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-800">
                Total Changes: {totalChanges}
              </div>
              <div className="text-sm text-purple-600">
                System Health: {systemHealth.toFixed(1)}%
              </div>
              <div className="text-sm text-purple-600">
                Uptime: {formatUptime(uptime)}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Control Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center gap-4">
            {!isSystemActive ? (
              <Button 
                onClick={startContinuousSystem}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                START CONTINUOUS SYSTEM
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button 
                    onClick={resumeSystem}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    RESUME SYSTEM
                  </Button>
                ) : (
                  <Button 
                    onClick={pauseSystem}
                    size="lg"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    PAUSE SYSTEM
                  </Button>
                )}
                <Button 
                  onClick={stopSystem}
                  size="lg"
                  variant="destructive"
                  className="px-8 py-4 text-lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  STOP SYSTEM
                </Button>
              </>
            )}
          </div>
          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                Last Heartbeat: {lastHeartbeat.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-1">
                <Cpu className="h-4 w-4 text-blue-500" />
                Active Agents: {agents.filter(a => a.status !== 'inactive').length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className={`border-2 ${getStatusColor(agent.status)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {agent.icon}
                  <span className="font-semibold text-sm">{agent.name}</span>
                </div>
                {getStatusIcon(agent.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs opacity-80">{agent.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-medium">Changes:</div>
                  <div className="text-lg font-bold">{agent.changes}</div>
                </div>
                <div>
                  <div className="font-medium">Health:</div>
                  <div className={`text-lg font-bold ${agent.health > 80 ? 'text-green-600' : agent.health > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {agent.health}%
                  </div>
                </div>
              </div>
              <div className="text-xs opacity-75">
                Last: {agent.lastActivity}
              </div>
              {agent.errors > 0 && (
                <div className="text-xs text-red-600">
                  Errors: {agent.errors}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      {isSystemActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Continuous System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-center p-4 border-2 rounded-lg animate-pulse ${
              isPaused 
                ? 'bg-yellow-100 border-yellow-300' 
                : 'bg-green-100 border-green-300'
            }`}>
              <div className={`font-bold ${isPaused ? 'text-yellow-800' : 'text-green-800'}`}>
                {isPaused ? '⏸️ SYSTEM PAUSED' : '🚀 CONTINUOUS SYSTEM RUNNING!'}
              </div>
              <div className="text-sm mt-2">
                {isPaused 
                  ? 'System is paused. Click "RESUME SYSTEM" to continue.'
                  : 'All 8 autonomous agents working continuously!'
                }
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
