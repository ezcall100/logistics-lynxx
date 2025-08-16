/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAutonomousAI } from '@/hooks/useAutonomousAI';
import { Brain, Truck, Route, DollarSign, Wrench, Zap } from 'lucide-react';

interface AutonomousDecision {
  type: string;
  result: {
    processed?: number;
    assignments?: Array<{
      shipment_id: string;
      assignment: Record<string, unknown>;
      delivery_prediction: Record<string, unknown>;  
    }>;
    vehicles_needing_maintenance?: Array<{
      vehicle_id: string;
      needs_maintenance: boolean;
      urgency: string;
      recommended_date: string;
    }>;
  };
  timestamp: string;
}

export const AutonomousControl = () => {
  const [autonomousMode, setAutonomousMode] = useState(true);
  const [lastDecisions, setLastDecisions] = useState<AutonomousDecision[]>([]);
  const { callAutonomousAI, loading } = useAutonomousAI();

  const runAutonomousOperations = useCallback(async () => {
    try {
      // Run autonomous dispatch
      const dispatchResult = await callAutonomousAI('autonomous_dispatch');
      
      // Run predictive maintenance
      const maintenanceResult = await callAutonomousAI('predictive_maintenance');
      
      setLastDecisions(prev => [
        ...prev.slice(-4), // Keep last 4 decisions
        {
          type: 'dispatch',
          result: dispatchResult,
          timestamp: new Date().toISOString()
        },
        {
          type: 'maintenance',
          result: maintenanceResult,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Autonomous operations failed:', error);
    }
  }, [callAutonomousAI]);

  useEffect(() => {
    if (autonomousMode) {
      // Start autonomous operations
      const interval = setInterval(() => {
        runAutonomousOperations();
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autonomousMode, runAutonomousOperations]);

  const manualActions = [
    {
      title: 'Optimize All Routes',
      description: 'AI will optimize all active routes for fuel efficiency',
      icon: Route,
      action: 'optimize_all_routes'
    },
    {
      title: 'Dynamic Pricing Update',
      description: 'Recalculate optimal pricing for all pending shipments',
      icon: DollarSign,
      action: 'update_all_pricing'
    },
    {
      title: 'Emergency Dispatch',
      description: 'Immediately assign all urgent shipments',
      icon: Zap,
      action: 'emergency_dispatch'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Autonomous AI Control Center
              </CardTitle>
              <CardDescription>
                Fully autonomous TMS operations powered by OpenAI
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="autonomous-mode" className="text-sm font-medium">
                Autonomous Mode
              </label>
              <Switch
                id="autonomous-mode"
                checked={autonomousMode}
                onCheckedChange={setAutonomousMode}
              />
              <Badge variant={autonomousMode ? "default" : "secondary"}>
                {autonomousMode ? "ACTIVE" : "MANUAL"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {manualActions.map((action) => (
              <Card key={action.action} className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <action.icon className="h-4 w-4" />
                    <h4 className="font-medium">{action.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {action.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => callAutonomousAI(action.action)}
                    disabled={loading}
                    className="w-full"
                  >
                    Execute
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent AI Decisions</CardTitle>
          <CardDescription>
            Latest autonomous decisions made by the AI system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lastDecisions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No recent decisions. Enable autonomous mode to see AI activity.
              </p>
            ) : (
              lastDecisions.map((decision, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Brain className="h-4 w-4" />
                    <div>
                      <p className="font-medium capitalize">{decision.type} Decision</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(decision.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    AI Generated
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
