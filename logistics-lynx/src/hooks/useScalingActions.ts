
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ResourceMetrics } from './useResourceManager';
import { DemandForecast } from './useDemandForecast';

export interface ScalingAction {
  id: string;
  type: 'scale_up' | 'scale_down' | 'optimize';
  trigger: string;
  timestamp: string;
  previous_resources: ResourceMetrics;
  new_resources: ResourceMetrics;
  predicted_savings: number;
  actual_impact: number;
  success: boolean;
}

export const useScalingActions = () => {
  const [scalingActions, setScalingActions] = useState<ScalingAction[]>([]);
  const [scalingStats, setScalingStats] = useState({
    total_actions: 0,
    cost_savings: 0,
    performance_improvements: 0,
    prediction_accuracy: 0
  });
  const { toast } = useToast();

  const executeScalingAction = async (
    forecast: DemandForecast,
    currentResources: ResourceMetrics,
    optimalResources: ResourceMetrics,
    setCurrentResources: (resources: ResourceMetrics) => void
  ): Promise<boolean> => {
    const resourceDiff = {
      cpu: Math.abs(optimalResources.cpu_cores - currentResources.cpu_cores),
      memory: Math.abs(optimalResources.memory_gb - currentResources.memory_gb),
      cost: Math.abs(optimalResources.cost_per_hour - currentResources.cost_per_hour)
    };

    // Only scale if there's a significant difference
    if (resourceDiff.cpu < 2 && resourceDiff.memory < 8 && resourceDiff.cost < 0.5) {
      return false;
    }

    const action: ScalingAction = {
      id: Math.random().toString(36).substr(2, 9),
      type: forecast.recommendation === 'scale_up' ? 'scale_up' : 
            forecast.recommendation === 'scale_down' ? 'scale_down' : 'optimize',
      trigger: `Predicted load: ${(forecast.predicted_load * 100).toFixed(1)}%`,
      timestamp: new Date().toISOString(),
      previous_resources: { ...currentResources },
      new_resources: optimalResources,
      predicted_savings: currentResources.cost_per_hour - optimalResources.cost_per_hour,
      actual_impact: 0,
      success: Math.random() > 0.1 // 90% success rate
    };

    // Simulate scaling execution time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    if (action.success) {
      setCurrentResources(optimalResources);
      action.actual_impact = Math.random() * 20 + 10; // 10-30% improvement
      
      toast({
        title: "Autonomous Scaling",
        description: `Successfully ${action.type.replace('_', ' ')} - ${action.trigger}`,
      });
    }

    setScalingActions(prev => [action, ...prev.slice(0, 19)]); // Keep last 20

    // Update stats
    setScalingStats(prev => ({
      total_actions: prev.total_actions + 1,
      cost_savings: prev.cost_savings + Math.max(0, action.predicted_savings),
      performance_improvements: prev.performance_improvements + action.actual_impact,
      prediction_accuracy: (prev.prediction_accuracy * prev.total_actions + forecast.confidence * 100) / (prev.total_actions + 1)
    }));

    return action.success;
  };

  return {
    scalingActions,
    scalingStats,
    executeScalingAction
  };
};
