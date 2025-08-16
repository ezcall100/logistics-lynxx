/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Users,
  Activity,
  Clock,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AgentActivationPanelProps {
  onActivateAgents: (count: number, autoMode: boolean) => Promise<void>;
  onPauseAgents: () => void;
  onResetAgents: () => void;
  isRunning: boolean;
  activeAgents: number;
  totalAgents: number;
  activationProgress: number;
}

export const AgentActivationPanel: React.FC<AgentActivationPanelProps> = ({
  onActivateAgents,
  onPauseAgents,
  onResetAgents,
  isRunning,
  activeAgents,
  totalAgents,
  activationProgress
}) => {
  const [agentCount, setAgentCount] = useState([250]);
  const [autoMode, setAutoMode] = useState(true);
  const [batchSize, setBatchSize] = useState([25]);
  const { toast } = useToast();

  const handleActivateAll = async () => {
    try {
      await onActivateAgents(agentCount[0], autoMode);
      toast({
        title: "Agent Activation Started",
        description: `Activating ${agentCount[0]} agents in batches of ${batchSize[0]}`,
      });
    } catch (error: unknown) {
      toast({
        title: "Activation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const completionPercentage = totalAgents > 0 ? (activeAgents / totalAgents) * 100 : 0;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              250-Agent Activation Center
            </CardTitle>
            <CardDescription>
              Deploy and manage autonomous agents for 24/7 TMS operations
            </CardDescription>
          </div>
          <Badge variant={isRunning ? "default" : "secondary"} className="text-sm">
            {isRunning ? "ACTIVE" : "STANDBY"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Agent Configuration */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agent Count: {agentCount[0]}
            </Label>
            <Slider
              value={agentCount}
              onValueChange={setAgentCount}
              max={250}
              min={1}
              step={5}
              className="w-full"
              disabled={isRunning}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>250 Agents</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Batch Size: {batchSize[0]}
            </Label>
            <Slider
              value={batchSize}
              onValueChange={setBatchSize}
              max={50}
              min={5}
              step={5}
              className="w-full"
              disabled={isRunning}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5</span>
              <span>50 per batch</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-mode"
              checked={autoMode}
              onCheckedChange={setAutoMode}
              disabled={isRunning}
            />
            <Label htmlFor="auto-mode" className="text-sm">
              24/7 Autonomous Mode (Zero-touch operation)
            </Label>
          </div>
        </div>

        {/* Activation Progress */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Activation Progress</Label>
              <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="text-xs text-muted-foreground">
              {activeAgents} of {totalAgents} agents activated
            </div>
          </div>
        )}

        {/* Agent Status Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{activeAgents}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.max(0, totalAgents - activeAgents)}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(completionPercentage)}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          {!isRunning ? (
            <Button 
              onClick={handleActivateAll} 
              className="flex-1"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Activate {agentCount[0]} Agents
            </Button>
          ) : (
            <Button 
              onClick={onPauseAgents} 
              variant="secondary" 
              className="flex-1"
              size="lg"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause System
            </Button>
          )}
          
          <Button 
            onClick={onResetAgents} 
            variant="outline"
            size="lg"
            disabled={isRunning}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Zero-Touch Info */}
        {autoMode && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
              <Activity className="h-4 w-4" />
              Zero-Touch 24/7 Operation Active
            </div>
            <div className="text-xs text-blue-700">
              System will run continuously without user intervention. Agents will self-manage, recover from errors, and optimize performance automatically.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};