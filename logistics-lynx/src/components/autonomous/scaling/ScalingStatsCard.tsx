/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Activity, TrendingUp, Target } from 'lucide-react';

interface ScalingStatsCardProps {
  scalingStats: {
    total_actions: number;
    cost_savings: number;
    performance_improvements: number;
    prediction_accuracy: number;
  };
  scalingActive: boolean;
  setScalingActive: (active: boolean) => void;
}

const ScalingStatsCard = ({ scalingStats, scalingActive, setScalingActive }: ScalingStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            <CardTitle>Predictive Autonomous Scaling</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={scalingActive ? "default" : "outline"}
              size="sm"
              onClick={() => setScalingActive(!scalingActive)}
            >
              {scalingActive ? "Active" : "Inactive"}
            </Button>
            <Badge variant={scalingActive ? "default" : "secondary"}>
              {scalingActive ? "AUTO-SCALING" : "MANUAL"}
            </Badge>
          </div>
        </div>
        <CardDescription>
          AI-powered demand forecasting with autonomous resource scaling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Cost Savings</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${scalingStats.cost_savings.toFixed(2)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Total Actions</span>
            </div>
            <div className="text-2xl font-bold">{scalingStats.total_actions}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Performance Gain</span>
            </div>
            <div className="text-2xl font-bold">
              {scalingStats.performance_improvements.toFixed(1)}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Prediction Accuracy</span>
            </div>
            <div className="text-2xl font-bold">
              {scalingStats.prediction_accuracy.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScalingStatsCard;
