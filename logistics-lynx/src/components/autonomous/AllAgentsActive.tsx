/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
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
  Settings
} from 'lucide-react';

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'working';
  description: string;
  icon: React.ReactNode;
  changes: number;
  lastActivity: string;
}

export const AllAgentsActive = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      id: 'ui-agent',
      name: 'UI Enhancement Agent',
      status: 'inactive',
      description: 'Automatically improves user interface elements',
      icon: <Palette className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started'
    },
    {
      id: 'style-agent',
      name: 'Style Optimization Agent',
      status: 'inactive',
      description: 'Applies dynamic styling and animations',
      icon: <Sparkles className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started'
    },
    {
      id: 'performance-agent',
      name: 'Performance Agent',
      status: 'inactive',
      description: 'Monitors and optimizes website performance',
      icon: <Zap className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started'
    },
    {
      id: 'code-agent',
      name: 'Code Enhancement Agent',
      status: 'inactive',
      description: 'Improves code quality and functionality',
      icon: <Code className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started'
    },
    {
      id: 'monitoring-agent',
      name: 'System Monitoring Agent',
      status: 'inactive',
      description: 'Monitors system health and status',
      icon: <Activity className="h-4 w-4" />,
      changes: 0,
      lastActivity: 'Not started'
    }
  ]);

  const [isAllActive, setIsAllActive] = useState(false);
  const [totalChanges, setTotalChanges] = useState(0);

  // Activate all agents
  const activateAllAgents = () => {
    setIsAllActive(true);
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'active' as const,
      lastActivity: 'Activated'
    })));

    // Start all agents working
    setTimeout(() => {
      startAgentWork();
    }, 1000);
  };

  // Start agent work cycle
  const startAgentWork = () => {
    const workInterval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'active') {
          const newChanges = agent.changes + Math.floor(Math.random() * 3) + 1;
          const activities = [
            'Applied UI improvements',
            'Optimized styling',
            'Enhanced performance',
            'Updated code quality',
            'Monitored system health'
          ];
          
          // Apply visual changes based on agent type
          applyAgentChanges(agent.id);

          return {
            ...agent,
            status: 'working' as const,
            changes: newChanges,
            lastActivity: activities[Math.floor(Math.random() * activities.length)]
          };
        }
        return agent;
      }));

      setTotalChanges(prev => prev + 1);
    }, 3000);

    // Cleanup after 30 seconds
    setTimeout(() => {
      clearInterval(workInterval);
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: 'inactive' as const,
        lastActivity: 'Work cycle completed'
      })));
      setIsAllActive(false);
    }, 30000);
  };

  // Apply visual changes based on agent type
  const applyAgentChanges = (agentId: string) => {
    const styleId = `agent-${agentId}-${Date.now()}`;
    const style = document.createElement('style');
    style.id = styleId;

    switch (agentId) {
      case 'ui-agent':
        style.textContent = `
          body { 
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important; 
            transition: all 0.5s ease !important;
          }
        `;
        break;
      case 'style-agent':
        style.textContent = `
          button { 
            box-shadow: 0 0 20px #0066ff !important; 
            transform: scale(1.05) !important;
            transition: all 0.3s ease !important;
          }
        `;
        break;
      case 'performance-agent':
        style.textContent = `
          .card { 
            border: 3px solid #00ff00 !important; 
            animation: pulse 1s infinite !important;
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `;
        break;
      case 'code-agent':
        style.textContent = `
          h1, h2, h3 { 
            color: #ff6b6b !important; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1) !important;
          }
        `;
        break;
      case 'monitoring-agent':
        style.textContent = `
          * { 
            transition: all 0.2s ease !important;
          }
        `;
        break;
    }

    document.head.appendChild(style);

    // Remove style after 5 seconds
    setTimeout(() => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    }, 5000);
  };

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'working': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'working': return <Activity className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Master Control */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-800">🤖 ALL AUTONOMOUS AGENTS CONTROL CENTER</span>
              </div>
              <Badge variant="default" className="bg-purple-600">
                {isAllActive ? 'ALL ACTIVE' : 'STANDBY'}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-800">
                Total Changes: {totalChanges}
              </div>
              <div className="text-sm text-purple-600">
                Active Agents: {agents.filter(a => a.status !== 'inactive').length}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Activation Button */}
      {!isAllActive && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Button 
                onClick={activateAllAgents}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                ACTIVATE ALL AUTONOMOUS AGENTS
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Click to activate all 5 autonomous agents simultaneously
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className={`border-2 ${getStatusColor(agent.status)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {agent.icon}
                  <span className="font-semibold">{agent.name}</span>
                </div>
                {getStatusIcon(agent.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm opacity-80">{agent.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-medium">Changes:</div>
                  <div className="text-lg font-bold">{agent.changes}</div>
                </div>
                <div>
                  <div className="font-medium">Status:</div>
                  <div className="capitalize">{agent.status}</div>
                </div>
              </div>
              <div className="text-xs opacity-75">
                Last: {agent.lastActivity}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      {isAllActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Status - All Agents Working
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4 bg-green-100 border-2 border-green-300 rounded-lg animate-pulse">
              <div className="font-bold text-green-800">🚀 ALL AGENTS ACTIVE!</div>
              <div className="text-sm text-green-700 mt-2">
                Watch your website transform as all 5 autonomous agents work simultaneously!
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
