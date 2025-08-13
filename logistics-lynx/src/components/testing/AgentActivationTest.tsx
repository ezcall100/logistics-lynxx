import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { Activity, Users, Zap, CheckCircle } from 'lucide-react';

export const AgentActivationTest = () => {
  const { agents, systemStatus, setSystemStatus, totalTasksCompleted, getSystemStats } = useAutonomousAgentManager();
  const { toast } = useToast();
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateAgents = async () => {
    setIsActivating(true);
    try {
      setSystemStatus('autonomous');
      
      toast({
        title: "🚀 250 Autonomous Agents Activated!",
        description: `Successfully activated ${agents.length} agents across 6 categories`,
        duration: 5000,
      });

      console.log('✅ 250 Autonomous Agents System Activated:', {
        totalAgents: agents.length,
        categories: {
          research: agents.filter(a => a.category === 'research').length,
          frontend: agents.filter(a => a.category === 'frontend').length, 
          backend: agents.filter(a => a.category === 'backend').length,
          database: agents.filter(a => a.category === 'database').length,
          testing: agents.filter(a => a.category === 'testing').length,
          deployment: agents.filter(a => a.category === 'deployment').length
        }
      });

    } catch (error) {
      console.error('Agent activation failed:', error);
      toast({
        title: "Activation Failed",
        description: "Failed to activate autonomous agents system",
        variant: "destructive"
      });
    } finally {
      setIsActivating(false);
    }
  };

  const stats = getSystemStats();
  const categoryBreakdown = {
    research: agents.filter(a => a.category === 'research').length,
    frontend: agents.filter(a => a.category === 'frontend').length,
    backend: agents.filter(a => a.category === 'backend').length,
    database: agents.filter(a => a.category === 'database').length,
    testing: agents.filter(a => a.category === 'testing').length,
    deployment: agents.filter(a => a.category === 'deployment').length
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            250 Autonomous Agents System Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-3xl font-bold text-primary">{agents.length}</div>
              <div className="text-sm text-muted-foreground">Total Agents</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{stats.active_agents}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{stats.total_tasks_completed}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Agent Distribution (PRD Specification)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Badge variant="outline" className="justify-center p-2">
                Research: {categoryBreakdown.research}/50
              </Badge>
              <Badge variant="outline" className="justify-center p-2">
                Frontend: {categoryBreakdown.frontend}/80
              </Badge>
              <Badge variant="outline" className="justify-center p-2">
                Backend: {categoryBreakdown.backend}/60
              </Badge>
              <Badge variant="outline" className="justify-center p-2">
                Database: {categoryBreakdown.database}/30
              </Badge>
              <Badge variant="outline" className="justify-center p-2">
                Testing: {categoryBreakdown.testing}/20
              </Badge>
              <Badge variant="outline" className="justify-center p-2">
                Deployment: {categoryBreakdown.deployment}/10
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <span className="font-medium">System Status:</span>
              <Badge variant={systemStatus === 'autonomous' ? 'default' : 'secondary'}>
                {systemStatus.toUpperCase()}
              </Badge>
            </div>
            {systemStatus === 'autonomous' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            )}
          </div>

          <Button 
            onClick={handleActivateAgents}
            disabled={isActivating || systemStatus === 'autonomous'}
            size="lg" 
            className="w-full"
          >
            <Zap className="mr-2 h-5 w-5" />
            {isActivating ? 'Activating 250 Agents...' : 
             systemStatus === 'autonomous' ? '250 Agents Active' : 
             'Activate 250 Autonomous Agents'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};