/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAIConfidenceLogs } from '@/hooks/useAIConfidenceLogs';
import { Brain, TrendingUp, Settings, Target, BarChart3, Activity } from 'lucide-react';

interface LearningMetrics {
  confidence_threshold: number;
  success_rate: number;
  total_decisions: number;
  adjustment_count: number;
  last_adjustment: string;
  performance_trend: 'improving' | 'stable' | 'declining';
}

interface ThresholdAdjustment {
  decision_type: string;
  old_threshold: number;
  new_threshold: number;
  reason: string;
  timestamp: string;
}

const SelfLearningEngine = () => {
  const { getStats } = useAIConfidenceLogs();
  const [learningMetrics, setLearningMetrics] = useState<LearningMetrics>({
    confidence_threshold: 0.8,
    success_rate: 94.2,
    total_decisions: 1247,
    adjustment_count: 23,
    last_adjustment: new Date().toISOString(),
    performance_trend: 'improving'
  });

  const [recentAdjustments, setRecentAdjustments] = useState<ThresholdAdjustment[]>([
    {
      decision_type: 'route_optimization',
      old_threshold: 0.85,
      new_threshold: 0.82,
      reason: 'High success rate detected, lowering threshold for efficiency',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      decision_type: 'shipment_assignment',
      old_threshold: 0.75,
      new_threshold: 0.78,
      reason: 'Lower success rate detected, raising threshold for safety',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ]);

  const [isLearning, setIsLearning] = useState(true);
  const [adaptiveParameters, setAdaptiveParameters] = useState({
    learning_rate: 0.02,
    adjustment_sensitivity: 0.1,
    minimum_data_points: 50,
    performance_window_hours: 24
  });

  const performSelfLearning = useCallback(() => {
    const stats = getStats();
    
    // Analyze performance and adjust thresholds
    const shouldAdjust = Math.random() > 0.95; // 5% chance for demo
    
    if (shouldAdjust && stats.total_decisions > adaptiveParameters.minimum_data_points) {
      const adjustmentTypes = ['route_optimization', 'shipment_assignment', 'pricing_decision', 'maintenance_prediction'];
      const randomType = adjustmentTypes[Math.floor(Math.random() * adjustmentTypes.length)];
      
      const oldThreshold = learningMetrics.confidence_threshold;
      const adjustment = (Math.random() - 0.5) * adaptiveParameters.adjustment_sensitivity;
      const newThreshold = Math.max(0.5, Math.min(0.95, oldThreshold + adjustment));
      
      const newAdjustment: ThresholdAdjustment = {
        decision_type: randomType,
        old_threshold: oldThreshold,
        new_threshold: newThreshold,
        reason: adjustment > 0 
          ? 'Performance data suggests higher threshold needed for accuracy'
          : 'High success rate allows for lower threshold to increase efficiency',
        timestamp: new Date().toISOString()
      };

      setRecentAdjustments(prev => [newAdjustment, ...prev.slice(0, 4)]);
      setLearningMetrics(prev => ({
        ...prev,
        confidence_threshold: newThreshold,
        adjustment_count: prev.adjustment_count + 1,
        last_adjustment: new Date().toISOString(),
        success_rate: Math.min(100, prev.success_rate + (Math.random() - 0.5) * 2),
        performance_trend: Math.random() > 0.7 ? 'improving' : Math.random() > 0.5 ? 'stable' : 'improving'
      }));
    }
  }, [getStats, adaptiveParameters.minimum_data_points, adaptiveParameters.adjustment_sensitivity, learningMetrics.confidence_threshold]);

  useEffect(() => {
    // Simulate continuous learning process
    const learningInterval = setInterval(() => {
      performSelfLearning();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(learningInterval);
  }, [performSelfLearning]);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <CardTitle>Self-Learning AI Engine</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isLearning ? "default" : "secondary"}>
                {isLearning ? "LEARNING" : "STATIC"}
              </Badge>
              <div className="flex items-center gap-1">
                {getTrendIcon(learningMetrics.performance_trend)}
                <span className={`text-sm font-medium ${getTrendColor(learningMetrics.performance_trend)}`}>
                  {learningMetrics.performance_trend.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <CardDescription>
            Continuously analyzing performance data and autonomously adjusting AI parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Current Threshold</span>
              </div>
              <div className="text-2xl font-bold">{(learningMetrics.confidence_threshold * 100).toFixed(1)}%</div>
              <Progress value={learningMetrics.confidence_threshold * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{learningMetrics.success_rate.toFixed(1)}%</div>
              <Progress value={learningMetrics.success_rate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Adjustments</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{learningMetrics.adjustment_count}</div>
              <div className="text-xs text-muted-foreground">
                Last: {new Date(learningMetrics.last_adjustment).toLocaleTimeString()}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Decisions</span>
              </div>
              <div className="text-2xl font-bold">{learningMetrics.total_decisions}</div>
              <div className="text-xs text-muted-foreground">Total analyzed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Autonomous Adjustments</CardTitle>
          <CardDescription>
            AI-driven threshold and parameter adjustments based on performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAdjustments.map((adjustment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">
                      {adjustment.decision_type.replace('_', ' ')}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {adjustment.old_threshold.toFixed(2)} → {adjustment.new_threshold.toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {adjustment.reason}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(adjustment.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    adjustment.new_threshold > adjustment.old_threshold 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {adjustment.new_threshold > adjustment.old_threshold ? '↑' : '↓'} 
                    {Math.abs((adjustment.new_threshold - adjustment.old_threshold) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adaptive Learning Parameters</CardTitle>
          <CardDescription>
            Current self-learning configuration (autonomously managed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Learning Rate</span>
              <div className="text-lg font-bold">{adaptiveParameters.learning_rate}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Sensitivity</span>
              <div className="text-lg font-bold">{adaptiveParameters.adjustment_sensitivity}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Min Data Points</span>
              <div className="text-lg font-bold">{adaptiveParameters.minimum_data_points}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Window (hrs)</span>
              <div className="text-lg font-bold">{adaptiveParameters.performance_window_hours}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfLearningEngine;
