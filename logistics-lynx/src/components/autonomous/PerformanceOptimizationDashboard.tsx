
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { 
  Cpu, 
  MemoryStick, 
  Clock, 
  TrendingUp, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

const PerformanceOptimizationDashboard = () => {
  const {
    metrics,
    optimizationActions,
    optimizationActive,
    setOptimizationActive,
    systemHealth,
    getOptimizationStats
  } = usePerformanceOptimization();

  const stats = getOptimizationStats();

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'optimal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'optimal': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getProgressColor = (value: number, warning: number, critical: number) => {
    if (value >= critical) return 'bg-red-500';
    if (value >= warning) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <CardTitle>Autonomous Performance Optimization</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getHealthIcon(systemHealth)}
                <span className={`font-medium ${getHealthColor(systemHealth)}`}>
                  {systemHealth.toUpperCase()}
                </span>
              </div>
              <Button
                variant={optimizationActive ? "default" : "outline"}
                size="sm"
                onClick={() => setOptimizationActive(!optimizationActive)}
              >
                {optimizationActive ? "Active" : "Inactive"}
              </Button>
            </div>
          </div>
          <CardDescription>
            Real-time system monitoring with autonomous performance optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="text-sm font-medium">CPU Usage</span>
              </div>
              <div className="text-2xl font-bold">{metrics.cpu_usage.toFixed(1)}%</div>
              <Progress 
                value={metrics.cpu_usage} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4" />
                <span className="text-sm font-medium">Memory</span>
              </div>
              <div className="text-2xl font-bold">{metrics.memory_usage.toFixed(1)}%</div>
              <Progress 
                value={metrics.memory_usage} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Response Time</span>
              </div>
              <div className="text-2xl font-bold">{metrics.response_time_ms}ms</div>
              <Progress 
                value={Math.min(100, (metrics.response_time_ms / 500) * 100)} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Throughput</span>
              </div>
              <div className="text-2xl font-bold">{metrics.throughput_per_second}/s</div>
              <Progress 
                value={(metrics.throughput_per_second / 150) * 100} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Error Rate</span>
              </div>
              <div className="text-2xl font-bold">{metrics.error_rate.toFixed(1)}%</div>
              <Progress 
                value={Math.min(100, (metrics.error_rate / 20) * 100)} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">AI Latency</span>
              </div>
              <div className="text-2xl font-bold">{metrics.ai_decision_latency}ms</div>
              <Progress 
                value={Math.min(100, (metrics.ai_decision_latency / 300) * 100)} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Statistics</CardTitle>
          <CardDescription>Performance improvement metrics and autonomous actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Total Optimizations</span>
              <div className="text-2xl font-bold">{stats.total_optimizations}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Success Rate</span>
              <div className="text-2xl font-bold text-green-600">
                {stats.success_rate.toFixed(1)}%
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Avg Impact Score</span>
              <div className="text-2xl font-bold">{stats.avg_impact_score.toFixed(1)}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Active Strategies</span>
              <div className="text-2xl font-bold">{Object.keys(stats.optimizations_by_type).length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Optimization Actions</CardTitle>
          <CardDescription>Latest autonomous performance improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {optimizationActions.slice(0, 10).map((action) => (
              <div key={action.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${action.success ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <div className="font-medium capitalize">
                      {action.type.replace('_', ' ')}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Trigger: {action.trigger_condition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Impact: {action.impact_score.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(action.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {optimizationActions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No optimizations yet. System is monitoring performance metrics.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOptimizationDashboard;
