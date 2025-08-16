/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSelfHealingAlerts } from '@/hooks/useSelfHealingAlerts';
import { Shield, Activity, CheckCircle, XCircle, Clock, Wrench } from 'lucide-react';

const SelfHealingDashboard = () => {
  const {
    healingActive,
    setHealingActive,
    healingStats,
    healingAttempts,
    getStrategyStats
  } = useSelfHealingAlerts();

  const strategyStats = getStrategyStats();

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <CardTitle>Self-Healing Alert Resolution</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={healingActive ? "default" : "outline"}
                size="sm"
                onClick={() => setHealingActive(!healingActive)}
              >
                {healingActive ? "Active" : "Inactive"}
              </Button>
              <Badge variant={healingActive ? "default" : "secondary"}>
                {healingActive ? "AUTO-HEALING" : "MANUAL"}
              </Badge>
            </div>
          </div>
          <CardDescription>
            Autonomous alert resolution system that attempts to fix issues before human intervention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Total Attempts</span>
              </div>
              <div className="text-2xl font-bold">{healingStats.total_attempts}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {healingStats.success_rate.toFixed(1)}%
              </div>
              <Progress value={healingStats.success_rate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Avg Healing Time</span>
              </div>
              <div className="text-2xl font-bold">{(healingStats.avg_healing_time / 1000).toFixed(1)}s</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span className="text-sm font-medium">Active Strategies</span>
              </div>
              <div className="text-2xl font-bold">{strategyStats.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Healing Strategy Performance</CardTitle>
          <CardDescription>Performance metrics for each autonomous healing strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategyStats.map(strategy => (
              <div key={strategy.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium capitalize">
                    {strategy.name.replace('_', ' ')}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {strategy.description}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">
                      Expected: {(strategy.success_rate * 100).toFixed(0)}%
                    </Badge>
                    <Badge variant={strategy.actual_success_rate > strategy.success_rate * 100 ? "default" : "secondary"}>
                      Actual: {strategy.actual_success_rate.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium">
                    {strategy.actual_attempts} attempts
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {strategy.execution_time_ms}ms avg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Healing Attempts</CardTitle>
          <CardDescription>Latest autonomous healing actions and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healingAttempts.slice(0, 10).map((attempt, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {getStatusIcon(attempt.success)}
                  <div>
                    <div className="font-medium capitalize">
                      {attempt.strategy_name.replace('_', ' ')}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {attempt.details}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {new Date(attempt.attempt_time).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {healingAttempts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No healing attempts yet. System is monitoring for issues to resolve.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfHealingDashboard;
