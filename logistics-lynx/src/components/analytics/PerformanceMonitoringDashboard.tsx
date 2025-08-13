
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Users, 
  Brain, 
  TrendingUp, 
  Clock, 
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PerformanceStats {
  totalSessions: number;
  averageSessionDuration: number;
  taskCompletionRate: number;
  averageFeedbackRating: number;
  aiAccuracyScore: number;
  systemResponseTime: number;
  userSatisfactionScore: number;
  featureUsageStats: Record<string, number>;
}

interface TestingMetric {
  id: string;
  metric: string;
  value: number;
  timestamp: string;
  status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface SupabaseAnalyticsData {
  event_type: string;
  event_data: unknown;
  duration_ms?: number;
  created_at: string;
  timestamp: string;
  user_id: string;
  session_id: string;
  page_path: string;
  feature_name: string;
  user_role: string;
  id: string;
}

interface AIMetric {
  confidence_score?: number;
}

export const PerformanceMonitoringDashboard = () => {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [metrics, setMetrics] = useState<TestingMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadPerformanceData = useCallback(async () => {
    try {
      // Load user analytics data
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('event_type', 'testing_session_end')
        .order('created_at', { ascending: false })
        .limit(100);

      if (analyticsError) throw analyticsError;

      // Load AI performance metrics
      const { data: aiMetrics, error: aiError } = await supabase
        .from('ai_performance_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (aiError) throw aiError;

      // Process the data to generate stats
      const processedStats = processAnalyticsData(analyticsData || [], aiMetrics || []);
      setStats(processedStats);

      // Generate current metrics
      const currentMetrics = generateCurrentMetrics(processedStats);
      setMetrics(currentMetrics);

    } catch (error) {
      console.error('Error loading performance data:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load performance metrics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadPerformanceData();
    const interval = setInterval(loadPerformanceData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [loadPerformanceData]);

  const processAnalyticsData = (analyticsData: SupabaseAnalyticsData[], aiMetrics: AIMetric[]): PerformanceStats => {
    const totalSessions = analyticsData.length;
    
    // Safely extract duration from event_data
    const averageSessionDuration = analyticsData.reduce((sum, session) => {
      const eventData = session.event_data as Record<string, unknown>;
      const durationMinutes = typeof eventData?.duration_minutes === 'number' ? eventData.duration_minutes : 0;
      return sum + durationMinutes;
    }, 0) / Math.max(totalSessions, 1);

    const taskCompletionRate = analyticsData.reduce((sum, session) => {
      const eventData = session.event_data as Record<string, unknown>;
      const completedTasks = typeof eventData?.completed_tasks === 'number' ? eventData.completed_tasks : 0;
      return sum + (completedTasks / 4); // 4 is total tasks
    }, 0) / Math.max(totalSessions, 1) * 100;

    const aiAccuracyScore = aiMetrics.reduce((sum, metric) => {
      return sum + (metric.confidence_score || 0);
    }, 0) / Math.max(aiMetrics.length, 1) * 100;

    return {
      totalSessions,
      averageSessionDuration: Math.round(averageSessionDuration),
      taskCompletionRate: Math.round(taskCompletionRate),
      averageFeedbackRating: 4.2, // Mock data - would come from feedback
      aiAccuracyScore: Math.round(aiAccuracyScore),
      systemResponseTime: 1.2, // Mock data - would come from performance monitoring
      userSatisfactionScore: 85, // Mock data - calculated from feedback
      featureUsageStats: {
        'quote_comparison': 95,
        'margin_analysis': 78,
        'ai_recommendations': 82,
        'pdf_export': 64
      }
    };
  };

  const generateCurrentMetrics = (stats: PerformanceStats): TestingMetric[] => {
    return [
      {
        id: 'session-completion',
        metric: 'Session Completion Rate',
        value: stats.taskCompletionRate,
        timestamp: new Date().toISOString(),
        status: stats.taskCompletionRate >= 80 ? 'excellent' : stats.taskCompletionRate >= 60 ? 'good' : 'needs_improvement',
        trend: 'up'
      },
      {
        id: 'ai-accuracy',
        metric: 'AI Accuracy Score',
        value: stats.aiAccuracyScore,
        timestamp: new Date().toISOString(),
        status: stats.aiAccuracyScore >= 85 ? 'excellent' : stats.aiAccuracyScore >= 70 ? 'good' : 'needs_improvement',
        trend: 'stable'
      },
      {
        id: 'user-satisfaction',
        metric: 'User Satisfaction',
        value: stats.userSatisfactionScore,
        timestamp: new Date().toISOString(),
        status: stats.userSatisfactionScore >= 80 ? 'excellent' : stats.userSatisfactionScore >= 60 ? 'good' : 'needs_improvement',
        trend: 'up'
      },
      {
        id: 'response-time',
        metric: 'System Response Time',
        value: stats.systemResponseTime,
        timestamp: new Date().toISOString(),
        status: stats.systemResponseTime <= 2 ? 'excellent' : stats.systemResponseTime <= 5 ? 'good' : 'needs_improvement',
        trend: 'stable'
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'needs_improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good':
        return <Target className="h-4 w-4 text-blue-600" />;
      case 'needs_improvement':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading performance data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{stats?.totalSessions || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                <p className="text-2xl font-bold">{stats?.averageSessionDuration || 0}min</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Task Completion</p>
                <p className="text-2xl font-bold">{stats?.taskCompletionRate || 0}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
                <p className="text-2xl font-bold">{stats?.aiAccuracyScore || 0}%</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Current Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <h4 className="font-medium">{metric.metric}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {new Date(metric.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats && Object.entries(stats.featureUsageStats).map(([feature, usage]) => (
                <div key={feature} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{feature.replace('_', ' ')}</span>
                    <span>{usage}% usage</span>
                  </div>
                  <Progress value={usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Trend analysis will be available after collecting more data points</p>
                <p className="text-sm">Check back after running more testing sessions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
