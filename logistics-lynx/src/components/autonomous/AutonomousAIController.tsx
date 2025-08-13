"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Bot, 
  Zap, 
  Cpu, 
  Rocket, 
  Brain, 
  Target,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';

interface AutonomousAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'working';
  progress: number;
  lastAction: string;
  performance: number;
}

export default function AutonomousAIController() {
  const [agents, setAgents] = useState<AutonomousAgent[]>([]);
  const [isActivating, setIsActivating] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'idle' | 'active' | 'working'>('idle');
  const [activeTask, setActiveTask] = useState<string | null>(null);

  useEffect(() => {
    initializeAgents();
  }, []);

  const initializeAgents = () => {
    const agentTypes = [
      { name: 'UI Optimizer', type: 'frontend', icon: '🎨', performance: 95 },
      { name: 'Route Enhancer', type: 'navigation', icon: '🗺️', performance: 92 },
      { name: 'Data Analyzer', type: 'analytics', icon: '📊', performance: 98 },
      { name: 'Performance Monitor', type: 'system', icon: '⚡', performance: 89 },
      { name: 'Security Auditor', type: 'security', icon: '🔒', performance: 94 },
    ];

    const initializedAgents = agentTypes.map((agent, index) => ({
      id: `agent-${index + 1}`,
      name: agent.name,
      type: agent.type,
      status: 'idle' as const,
      progress: 0,
      lastAction: 'Initialized',
      performance: agent.performance
    }));

    setAgents(initializedAgents);
  };

  const activateAutonomousRedesign = async () => {
    setIsActivating(true);
    setSystemStatus('working');
    setActiveTask('Redesigning Active Route Page');
    
    try {
      console.log('🤖 Activating Autonomous AI for Active Route Page Redesign');
      
      // Update agents to working status
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: 'working' as const,
        progress: Math.floor(Math.random() * 60) + 20
      })));

      // Call the autonomous AI edge function
      const { data, error } = await supabase.functions.invoke('autonomous-ai', {
        body: {
          action: 'redesign_active_route_page',
          data: {
            current_page: '/driver/routes/active',
            improvements_needed: [
              'Real-time GPS integration',
              'Enhanced earnings calculator',
              'Voice control features',
              'Offline functionality',
              'Emergency contact system'
            ],
            target_enhancements: {
              'ui_performance': 'Optimize for mobile truck drivers',
              'user_experience': 'Streamline driver workflow',
              'functionality': 'Add AI-powered features',
              'accessibility': 'Voice controls and large touch targets'
            }
          }
        }
      });

      if (error) {
        console.error('❌ Autonomous AI Error:', error);
        toast.error('Autonomous AI system encountered an error');
      } else {
        console.log('✅ Autonomous AI Response:', data);
        
        // Simulate progressive updates
        setTimeout(() => {
          setAgents(prev => prev.map(agent => ({
            ...agent,
            progress: Math.floor(Math.random() * 40) + 60,
            lastAction: `Enhanced ${agent.type} components`
          })));
        }, 2000);

        setTimeout(() => {
          setAgents(prev => prev.map(agent => ({
            ...agent,
            status: 'active' as const,
            progress: 100,
            lastAction: 'Redesign completed successfully'
          })));
          
          setSystemStatus('active');
          setActiveTask(null);
          toast.success('🎉 Active Route Page has been autonomously redesigned!');
        }, 5000);
      }
    } catch (error) {
      console.error('🚨 Error activating autonomous AI:', error);
      toast.error('Failed to activate autonomous redesign');
      setSystemStatus('idle');
    } finally {
      setIsActivating(false);
    }
  };

  const triggerFeatureEnhancement = async (feature: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('autonomous-ai', {
        body: {
          action: 'enhance_driver_features',
          data: {
            feature_focus: feature,
            enhancement_level: 'advanced',
            ai_integration: true
          }
        }
      });

      if (error) {
        toast.error(`Failed to enhance ${feature}`);
      } else {
        toast.success(`✨ ${feature} has been autonomously enhanced!`);
        console.log('🚀 Feature Enhancement Result:', data);
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      toast.error('Enhancement failed');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'working':
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-100 text-green-700',
      'working': 'bg-blue-100 text-blue-700 animate-pulse',
      'idle': 'bg-gray-100 text-gray-700'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Bot className="w-10 h-10 text-blue-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Autonomous AI Controller
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          250 AI agents working 24/7 to enhance your TMS system autonomously
        </p>
      </div>

      {/* System Status */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-500" />
            System Status
            {getStatusBadge(systemStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold">AI Agents Active</p>
              <p className="text-2xl font-bold text-blue-600">
                {agents.filter(a => a.status === 'active').length}/5
              </p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">98.7%</p>
            </div>
            <div className="text-center">
              <Rocket className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold">Performance</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(agents.reduce((sum, a) => sum + a.performance, 0) / agents.length)}%
              </p>
            </div>
          </div>
          
          {activeTask && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-700">Current Task: {activeTask}</p>
              <Progress value={60} className="mt-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Primary Action */}
      <div className="text-center">
        <Button
          onClick={activateAutonomousRedesign}
          disabled={isActivating || systemStatus === 'working'}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
        >
          {isActivating ? (
            <>
              <Activity className="w-6 h-6 mr-3 animate-spin" />
              Activating AI Agents...
            </>
          ) : (
            <>
              <Bot className="w-6 h-6 mr-3" />
              Redesign Active Route Page with AI
            </>
          )}
        </Button>
      </div>

      {/* Agent Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {getStatusIcon(agent.status)}
                  {agent.name}
                </span>
                {getStatusBadge(agent.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{agent.progress}%</span>
                </div>
                <Progress value={agent.progress} className="h-2" />
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Last Action:</p>
                <p className="text-sm font-medium">{agent.lastAction}</p>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Performance:</span>
                <span className="font-semibold text-green-600">{agent.performance}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick AI Enhancements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              'GPS Integration',
              'Voice Controls',
              'Earnings Calculator',
              'Emergency System'
            ].map((feature) => (
              <Button
                key={feature}
                variant="outline"
                onClick={() => triggerFeatureEnhancement(feature)}
                className="h-auto py-3 px-4 flex flex-col items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                <span className="text-sm">{feature}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}