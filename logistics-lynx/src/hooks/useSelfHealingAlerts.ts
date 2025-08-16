
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAlerts } from '@/hooks/useAlerts';
import type { Alert } from '@/types/alerts';

interface HealingStrategy {
  name: string;
  description: string;
  applicable_categories: string[];
  success_rate: number;
  execution_time_ms: number;
}

interface HealingAttempt {
  alert_id: string;
  strategy_name: string;
  attempt_time: string;
  success: boolean;
  details: string;
}

const HEALING_STRATEGIES: HealingStrategy[] = [
  {
    name: 'retry_operation',
    description: 'Retry the failed operation with exponential backoff',
    applicable_categories: ['system_error', 'performance'],
    success_rate: 0.75,
    execution_time_ms: 5000
  },
  {
    name: 'fallback_algorithm',
    description: 'Switch to alternative algorithm or method',
    applicable_categories: ['ai_confidence', 'system_error'],
    success_rate: 0.85,
    execution_time_ms: 3000
  },
  {
    name: 'resource_reallocation',
    description: 'Reallocate system resources to resolve bottlenecks',
    applicable_categories: ['performance'],
    success_rate: 0.80,
    execution_time_ms: 8000
  },
  {
    name: 'parameter_adjustment',
    description: 'Automatically adjust system parameters',
    applicable_categories: ['ai_confidence', 'performance'],
    success_rate: 0.70,
    execution_time_ms: 2000
  },
  {
    name: 'cache_refresh',
    description: 'Clear and refresh system caches',
    applicable_categories: ['system_error', 'performance'],
    success_rate: 0.65,
    execution_time_ms: 1500
  }
];

export const useSelfHealingAlerts = () => {
  const [healingAttempts, setHealingAttempts] = useState<HealingAttempt[]>([]);
  const [healingActive, setHealingActive] = useState(true);
  const [healingStats, setHealingStats] = useState({
    total_attempts: 0,
    successful_healings: 0,
    failed_healings: 0,
    success_rate: 0,
    avg_healing_time: 0
  });
  const { toast } = useToast();
  const { alerts, updateAlert } = useAlerts();

  const selectBestStrategy = (alert: Alert): HealingStrategy | null => {
    const applicableStrategies = HEALING_STRATEGIES.filter(strategy =>
      strategy.applicable_categories.includes(alert.category)
    );

    if (applicableStrategies.length === 0) return null;

    // Sort by success rate and select the best one
    return applicableStrategies.sort((a, b) => b.success_rate - a.success_rate)[0];
  };

  const executeHealingStrategy = useCallback(async (alert: Alert, strategy: HealingStrategy): Promise<boolean> => {
    const startTime = Date.now();
    
    try {
      // Simulate healing strategy execution
      await new Promise(resolve => setTimeout(resolve, strategy.execution_time_ms));
      
      // Simulate success/failure based on strategy success rate
      const success = Math.random() < strategy.success_rate;
      
      const attempt: HealingAttempt = {
        alert_id: alert.id,
        strategy_name: strategy.name,
        attempt_time: new Date().toISOString(),
        success,
        details: success 
          ? `Successfully resolved using ${strategy.description}`
          : `Failed to resolve: ${strategy.description} did not work`
      };

      setHealingAttempts(prev => [attempt, ...prev.slice(0, 49)]); // Keep last 50

      if (success) {
        // Mark alert as resolved
        await updateAlert(alert.id, {
          status: 'resolved',
          resolved_at: new Date().toISOString()
        });

        toast({
          title: "Self-Healing Success",
          description: `Automatically resolved: ${alert.title}`,
        });
      }

      // Update stats
      setHealingStats(prev => {
        const newTotal = prev.total_attempts + 1;
        const newSuccessful = prev.successful_healings + (success ? 1 : 0);
        const newFailed = prev.failed_healings + (success ? 0 : 1);
        const newSuccessRate = newTotal > 0 ? (newSuccessful / newTotal) * 100 : 0;
        const executionTime = Date.now() - startTime;
        const newAvgTime = (prev.avg_healing_time * prev.total_attempts + executionTime) / newTotal;

        return {
          total_attempts: newTotal,
          successful_healings: newSuccessful,
          failed_healings: newFailed,
          success_rate: newSuccessRate,
          avg_healing_time: newAvgTime
        };
      });

      return success;
    } catch (error) {
      console.error('Healing strategy execution failed:', error);
      return false;
    }
  }, [toast, updateAlert]);

  const attemptSelfHealing = useCallback(async (alert: Alert): Promise<boolean> => {
    if (!healingActive) return false;

    const strategy = selectBestStrategy(alert);
    if (!strategy) {
      console.log(`No applicable healing strategy for alert: ${alert.title}`);
      return false;
    }

    console.log(`Attempting self-healing for alert ${alert.id} using strategy: ${strategy.name}`);
    
    // Update alert to show healing in progress
    await updateAlert(alert.id, {
      status: 'acknowledged',
      acknowledged_by: 'Self-Healing AI',
      acknowledged_at: new Date().toISOString()
    });

    return executeHealingStrategy(alert, strategy);
  }, [healingActive, updateAlert, executeHealingStrategy]);

  // Monitor alerts and attempt healing
  useEffect(() => {
    if (!healingActive) return;

    const activeAlerts = alerts.filter(alert => 
      alert.status === 'active' && 
      (alert.severity === 'high' || alert.severity === 'critical')
    );

    // Process each active alert
    activeAlerts.forEach(alert => {
      // Check if we haven't already attempted healing for this alert
      const existingAttempt = healingAttempts.find(attempt => 
        attempt.alert_id === alert.id
      );

      if (!existingAttempt) {
        // Attempt healing after a short delay to avoid overwhelming the system
        setTimeout(() => attemptSelfHealing(alert), Math.random() * 5000);
      }
    });
  }, [alerts, healingActive, attemptSelfHealing, healingAttempts]);

  const getStrategyStats = () => {
    const strategyPerformance = HEALING_STRATEGIES.map(strategy => {
      const attempts = healingAttempts.filter(attempt => 
        attempt.strategy_name === strategy.name
      );
      const successful = attempts.filter(attempt => attempt.success).length;
      
      return {
        ...strategy,
        actual_attempts: attempts.length,
        actual_success_rate: attempts.length > 0 ? (successful / attempts.length) * 100 : 0
      };
    });

    return strategyPerformance;
  };

  return {
    healingActive,
    setHealingActive,
    healingStats,
    healingAttempts,
    attemptSelfHealing,
    getStrategyStats
  };
};
