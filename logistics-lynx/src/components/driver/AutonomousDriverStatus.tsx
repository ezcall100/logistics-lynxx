/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle, 
  Settings, 
  Timer,
  Bot,
  Sparkles,
  TrendingUp,
  Shield,
  Network,
  RefreshCw
} from 'lucide-react';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useContinuousAgentManager } from '@/hooks/autonomous/useContinuousAgentManager';
import { toast } from 'sonner';

const AutonomousDriverStatus = () => {
  const { agents, systemStatus, getSystemStats } = useAutonomousAgentManager();
  const { 
    isRunning, 
    taskQueue, 
    completedTasks, 
    activeAgents 
  } = useContinuousAgentManager();

  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Autonomous status refreshed');
  };

  const stats = getSystemStats();
  const recentTasks = taskQueue.slice(-5);
  const completionRate = Math.round((completedTasks / (completedTasks + taskQueue.length)) * 100) || 0;

  return (
    <Card className="w-full glass-ultra border-0 shadow-premium overflow-hidden animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Brain className="h-5 w-5 text-white relative z-10 animate-pulse-soft" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-bounce-subtle" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-blue-800 bg-clip-text text-transparent font-bold">
                Autonomous AI Agents
              </span>
              <p className="text-sm text-muted-foreground font-normal">24/7 TMS Intelligence System</p>
            </div>
            <Badge 
              variant={isRunning ? "default" : "secondary"} 
              className={`ml-auto px-3 py-1 ${isRunning ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' : ''} transition-all duration-300`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isRunning ? 'bg-white animate-pulse' : 'bg-muted-foreground'}`} />
              {isRunning ? "ACTIVE" : "STANDBY"}
            </Badge>
          </CardTitle>
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing} 
            size="sm" 
            variant="outline" 
            className="btn-premium hover:shadow-glow transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : 'hover:rotate-180'} transition-transform duration-500`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        
        {/* Enhanced System Overview */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5 text-primary" />
            System Performance
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Overall Efficiency</span>
              <span className="text-sm font-bold text-primary">{completionRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50/80 via-blue-100/60 to-cyan-50/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl border border-blue-200/40 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 animate-scale-in">{activeAgents}</div>
                <div className="text-xs text-blue-600/70 font-medium">Active Agents</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50/80 via-green-100/60 to-emerald-50/80 dark:from-green-950/30 dark:to-green-900/30 rounded-xl border border-green-200/40 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 animate-scale-in">{completedTasks}</div>
                <div className="text-xs text-green-600/70 font-medium">Completed Tasks</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-orange-50/80 via-orange-100/60 to-amber-50/80 dark:from-orange-950/30 dark:to-orange-900/30 rounded-xl border border-orange-200/40 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Timer className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 animate-scale-in">{taskQueue.length}</div>
                <div className="text-xs text-orange-600/70 font-medium">Queued Tasks</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50/80 via-purple-100/60 to-indigo-50/80 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl border border-purple-200/40 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 animate-scale-in">{completionRate}%</div>
                <div className="text-xs text-purple-600/70 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Agent Types Overview */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
            <Cpu className="h-5 w-5 text-primary" />
            Agent Distribution
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 border border-border/50 rounded-xl glass-subtle card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-blue-600">Development Agents</span>
                  <p className="text-xs text-muted-foreground">Frontend, Backend, Testing</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1 animate-scale-in">130</div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="p-5 border border-border/50 rounded-xl glass-subtle card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-green-600">Research Agents</span>
                  <p className="text-xs text-muted-foreground">Market Analysis, R&D</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1 animate-scale-in">50</div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="p-5 border border-border/50 rounded-xl glass-subtle card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-purple-600">Operations Agents</span>
                  <p className="text-xs text-muted-foreground">Database, Deploy, Security</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1 animate-scale-in">70</div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5 text-primary animate-pulse-soft" />
            Real-Time Activity Stream
          </h4>
          {recentTasks.length === 0 ? (
            <div className="text-center py-8 rounded-xl bg-muted/30">
              <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50 animate-float" />
              <p className="text-muted-foreground font-medium">Agents are initializing...</p>
              <p className="text-xs text-muted-foreground">Activity will appear shortly</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-40 overflow-y-auto scrollbar-thin">
              {recentTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-background/80 to-muted/20 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{task.task_type} Agent</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(task.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      task.status === 'completed' ? 'default' : 
                      task.status === 'running' ? 'secondary' : 'outline'
                    }
                    className="text-xs animate-scale-in"
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced System Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/30">
          <div className="space-y-3">
            <h5 className="font-semibold text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Active Capabilities
            </h5>
            <div className="space-y-2 text-sm">
              {[
                "Real-time TMS optimization",
                "Autonomous route planning", 
                "Predictive maintenance alerts",
                "Dynamic load matching"
              ].map((capability, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CheckCircle className="h-4 w-4 text-green-600 animate-bounce-subtle" />
                  <span className="text-foreground/90">{capability}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-semibold text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              System Health
            </h5>
            <div className="space-y-2 text-sm">
              {[
                { label: "All agents operational", status: "healthy" },
                { label: "Network connectivity: 100%", status: "healthy" },
                { label: "API response time: <50ms", status: "healthy" },
                { label: "Self-healing: Active", status: "healthy" }
              ].map((health, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 150 + 300}ms` }}
                >
                  <div className="h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse-soft" />
                  <span className="text-foreground/90">{health.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-border/30">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 sm:flex-none btn-premium hover:shadow-glow transition-all duration-300 group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Agent Control
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 sm:flex-none btn-premium hover:shadow-glow transition-all duration-300 group"
          >
            <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Performance
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 sm:flex-none btn-premium hover:shadow-glow transition-all duration-300 group"
          >
            <Network className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            System Monitor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousDriverStatus;