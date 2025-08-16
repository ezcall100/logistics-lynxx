/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { useDemandForecast } from './useDemandForecast';
import { useResourceManager } from './useResourceManager';
import { useScalingActions } from './useScalingActions';

export const usePredictiveScaling = () => {
  const [scalingActive, setScalingActive] = useState(true);
  const { demandForecast, predictResourceNeeds } = useDemandForecast();
  const { currentResources, setCurrentResources, calculateOptimalResources } = useResourceManager();
  const { scalingActions, scalingStats, executeScalingAction } = useScalingActions();

  // Execute scaling based on immediate forecasts
  useEffect(() => {
    if (!scalingActive || demandForecast.length === 0) return;

    const currentForecast = demandForecast[0];
    if (currentForecast && currentForecast.recommendation !== 'maintain') {
      const lastAction = scalingActions[0];
      const timeSinceLastAction = lastAction 
        ? Date.now() - new Date(lastAction.timestamp).getTime()
        : Infinity;

      // Only execute if enough time has passed since last action (10 minutes)
      if (timeSinceLastAction > 10 * 60 * 1000) {
        const optimalResources = calculateOptimalResources(currentForecast.predicted_load);
        setTimeout(() => 
          executeScalingAction(currentForecast, currentResources, optimalResources, setCurrentResources), 
          5000
        );
      }
    }
  }, [demandForecast, scalingActive, scalingActions, currentResources, calculateOptimalResources, executeScalingAction, setCurrentResources]);

  const getScalingRecommendations = () => {
    const nextHourForecast = predictResourceNeeds(1);
    const next4HourForecast = predictResourceNeeds(4);
    
    return {
      immediate: demandForecast[0] || null,
      next_hour: nextHourForecast,
      next_4_hours: next4HourForecast,
      cost_projection: demandForecast.slice(0, 24).reduce(
        (total, forecast) => {
          const resources = calculateOptimalResources(forecast.predicted_load);
          return total + resources.cost_per_hour;
        }, 0
      )
    };
  };

  return {
    currentResources,
    demandForecast,
    scalingActions,
    scalingActive,
    setScalingActive,
    scalingStats,
    getScalingRecommendations,
    predictResourceNeeds,
    executeScalingAction: (forecast: Parameters<typeof executeScalingAction>[0]) => 
      executeScalingAction(forecast, currentResources, calculateOptimalResources(forecast.predicted_load), setCurrentResources)
  };
};
