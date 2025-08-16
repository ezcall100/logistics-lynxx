/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PerformanceMetrics {
  cpu_usage: number;
  memory_usage: number;
  response_time_ms: number;
  throughput_per_second: number;
  error_rate: number;
  ai_decision_latency: number;
}

interface OptimizationAction {
  id: string;
  type: 'scale_up' | 'scale_down' | 'cache_optimize' | 'algorithm_switch' | 'resource_rebalance';
  description: string;
  trigger_condition: string;
  impact_score: number;
  timestamp: string;
  success: boolean;
}

interface PerformanceThresholds {
  cpu_warning: number;
  cpu_critical: number;
  memory_warning: number;
  memory_critical: number;
  response_time_warning: number;
  response_time_critical: number;
  error_rate_warning: number;
  error_rate_critical: number;
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu_usage: 45,
    memory_usage: 62,
    response_time_ms: 150,
    throughput_per_second: 85,
    error_rate: 2.1,
    ai_decision_latency: 89
  });

  const [thresholds, setThresholds] = useState<PerformanceThresholds>({
    cpu_warning: 70,
    cpu_critical: 85,
    memory_warning: 75,
    memory_critical: 90,
    response_time_warning: 200,
    response_time_critical: 500,
    error_rate_warning: 5,
    error_rate_critical: 10
  });

  const [optimizationActions, setOptimizationActions] = useState<OptimizationAction[]>([]);
  const [optimizationActive, setOptimizationActive] = useState(true);
  const [systemHealth, setSystemHealth] = useState<'optimal' | 'warning' | 'critical'>('optimal');
  const { toast } = useToast();

  const generateOptimizationAction = useCallback((metrics: PerformanceMetrics): OptimizationAction | null => {
    const now = new Date().toISOString();
    
    // CPU optimization
    if (metrics.cpu_usage > thresholds.cpu_critical) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'scale_up',
        description: 'Scaling up CPU resources due to critical load',
        trigger_condition: `CPU usage: ${metrics.cpu_usage}% > ${thresholds.cpu_critical}%`,
        impact_score: 8.5,
        timestamp: now,
        success: Math.random() > 0.1 // 90% success rate
      };
    }

    // Memory optimization
    if (metrics.memory_usage > thresholds.memory_critical) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'resource_rebalance',
        description: 'Rebalancing memory allocation and clearing unused caches',
        trigger_condition: `Memory usage: ${metrics.memory_usage}% > ${thresholds.memory_critical}%`,
        impact_score: 7.8,
        timestamp: now,
        success: Math.random() > 0.15 // 85% success rate
      };
    }

    // Response time optimization
    if (metrics.response_time_ms > thresholds.response_time_critical) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'algorithm_switch',
        description: 'Switching to faster algorithm variant for improved response times',
        trigger_condition: `Response time: ${metrics.response_time_ms}ms > ${thresholds.response_time_critical}ms`,
        impact_score: 6.9,
        timestamp: now,
        success: Math.random() > 0.2 // 80% success rate
      };
    }

    // Cache optimization for moderate performance issues
    if (metrics.response_time_ms > thresholds.response_time_warning || 
        metrics.ai_decision_latency > 120) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'cache_optimize',
        description: 'Optimizing cache strategy and preloading frequently accessed data',
        trigger_condition: `Response time or AI latency above warning thresholds`,
        impact_score: 5.2,
        timestamp: now,
        success: Math.random() > 0.25 // 75% success rate
      };
    }

    // Scale down if system is over-provisioned
    if (metrics.cpu_usage < 20 && metrics.memory_usage < 30 && metrics.response_time_ms < 50) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'scale_down',
        description: 'Scaling down resources to optimize cost efficiency',
        trigger_condition: 'System under-utilized for extended period',
        impact_score: 4.1,
        timestamp: now,
        success: Math.random() > 0.1 // 90% success rate
      };
    }

    return null;
  }, [thresholds]);

  const executeOptimization = useCallback(async (action: OptimizationAction): Promise<boolean> => {
    try {
      console.log(`Executing optimization: ${action.description}`);
      
      // Simulate optimization execution time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      if (action.success) {
        // Apply performance improvements based on action type
        setMetrics(prev => {
          const improvement = action.impact_score / 10;
          
          switch (action.type) {
            case 'scale_up':
              return {
                ...prev,
                cpu_usage: Math.max(10, prev.cpu_usage - improvement * 15),
                response_time_ms: Math.max(50, prev.response_time_ms - improvement * 30)
              };
            case 'resource_rebalance':
              return {
                ...prev,
                memory_usage: Math.max(20, prev.memory_usage - improvement * 20),
                cpu_usage: Math.max(10, prev.cpu_usage - improvement * 10)
              };
            case 'algorithm_switch':
              return {
                ...prev,
                response_time_ms: Math.max(50, prev.response_time_ms - improvement * 40),
                ai_decision_latency: Math.max(30, prev.ai_decision_latency - improvement * 25)
              };
            case 'cache_optimize':
              return {
                ...prev,
                response_time_ms: Math.max(50, prev.response_time_ms - improvement * 20),
                throughput_per_second: Math.min(150, prev.throughput_per_second + improvement * 10)
              };
            case 'scale_down':
              return {
                ...prev,
                cpu_usage: Math.min(100, prev.cpu_usage + improvement * 5),
                memory_usage: Math.min(100, prev.memory_usage + improvement * 5)
              };
            default:
              return prev;
          }
        });

        toast({
          title: "Autonomous Optimization",
          description: action.description,
        });
      }

      setOptimizationActions(prev => [
        { ...action, success: action.success },
        ...prev.slice(0, 19) // Keep last 20 actions
      ]);

      return action.success;
    } catch (error) {
      console.error('Optimization execution failed:', error);
      return false;
    }
  }, [toast]);

  const calculateSystemHealth = useCallback((metrics: PerformanceMetrics): 'optimal' | 'warning' | 'critical' => {
    const criticalConditions = [
      metrics.cpu_usage > thresholds.cpu_critical,
      metrics.memory_usage > thresholds.memory_critical,
      metrics.response_time_ms > thresholds.response_time_critical,
      metrics.error_rate > thresholds.error_rate_critical
    ];

    const warningConditions = [
      metrics.cpu_usage > thresholds.cpu_warning,
      metrics.memory_usage > thresholds.memory_warning,
      metrics.response_time_ms > thresholds.response_time_warning,
      metrics.error_rate > thresholds.error_rate_warning
    ];

    if (criticalConditions.some(condition => condition)) {
      return 'critical';
    } else if (warningConditions.some(condition => condition)) {
      return 'warning';
    } else {
      return 'optimal';
    }
  }, [thresholds]);

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu_usage: Math.max(5, Math.min(100, prev.cpu_usage + (Math.random() - 0.5) * 10)),
        memory_usage: Math.max(10, Math.min(100, prev.memory_usage + (Math.random() - 0.5) * 8)),
        response_time_ms: Math.max(30, Math.min(1000, prev.response_time_ms + (Math.random() - 0.5) * 50)),
        throughput_per_second: Math.max(10, Math.min(200, prev.throughput_per_second + (Math.random() - 0.5) * 15)),
        error_rate: Math.max(0, Math.min(20, prev.error_rate + (Math.random() - 0.5) * 2)),
        ai_decision_latency: Math.max(20, Math.min(300, prev.ai_decision_latency + (Math.random() - 0.5) * 20))
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Autonomous optimization logic
  useEffect(() => {
    if (!optimizationActive) return;

    const health = calculateSystemHealth(metrics);
    setSystemHealth(health);

    // Attempt optimization if system is not optimal
    if (health !== 'optimal') {
      const action = generateOptimizationAction(metrics);
      if (action) {
        // Execute optimization after a brief delay
        setTimeout(() => executeOptimization(action), 1000);
      }
    }
  }, [metrics, optimizationActive, executeOptimization, calculateSystemHealth, generateOptimizationAction]);

  const getOptimizationStats = () => {
    const total = optimizationActions.length;
    const successful = optimizationActions.filter(action => action.success).length;
    const byType = optimizationActions.reduce((acc, action) => {
      acc[action.type] = (acc[action.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total_optimizations: total,
      successful_optimizations: successful,
      success_rate: total > 0 ? (successful / total) * 100 : 0,
      optimizations_by_type: byType,
      avg_impact_score: total > 0 
        ? optimizationActions.reduce((sum, action) => sum + action.impact_score, 0) / total 
        : 0
    };
  };

  return {
    metrics,
    thresholds,
    setThresholds,
    optimizationActions,
    optimizationActive,
    setOptimizationActive,
    systemHealth,
    getOptimizationStats,
    executeOptimization
  };
};
