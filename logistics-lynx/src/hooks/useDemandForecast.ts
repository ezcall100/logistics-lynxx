/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

export interface DemandForecast {
  timestamp: string;
  predicted_load: number;
  confidence: number;
  factors: string[];
  recommendation: 'scale_up' | 'scale_down' | 'maintain';
}

export const useDemandForecast = () => {
  const [demandForecast, setDemandForecast] = useState<DemandForecast[]>([]);

  const generateDemandForecast = (): DemandForecast[] => {
    const forecasts: DemandForecast[] = [];
    const baseTime = new Date();
    
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
      const hour = timestamp.getHours();
      
      // Simulate demand patterns (higher during business hours)
      let baseLoad = 0.3;
      if (hour >= 8 && hour <= 18) {
        baseLoad = 0.7 + Math.sin((hour - 8) / 10 * Math.PI) * 0.2;
      } else if (hour >= 19 && hour <= 23) {
        baseLoad = 0.5;
      }
      
      // Add some randomness and trends
      const noise = (Math.random() - 0.5) * 0.2;
      const predicted_load = Math.max(0.1, Math.min(1.0, baseLoad + noise));
      
      const confidence = 0.75 + Math.random() * 0.2;
      const factors = [];
      
      if (hour >= 8 && hour <= 18) factors.push('business_hours');
      if (hour >= 12 && hour <= 14) factors.push('lunch_peak');
      if (Math.random() > 0.7) factors.push('seasonal_trend');
      if (predicted_load > 0.8) factors.push('high_demand_predicted');
      
      let recommendation: 'scale_up' | 'scale_down' | 'maintain' = 'maintain';
      if (predicted_load > 0.75) recommendation = 'scale_up';
      else if (predicted_load < 0.4) recommendation = 'scale_down';
      
      forecasts.push({
        timestamp: timestamp.toISOString(),
        predicted_load,
        confidence,
        factors,
        recommendation
      });
    }
    
    return forecasts;
  };

  // Generate forecasts every 10 minutes
  useEffect(() => {
    const generateForecasts = () => {
      setDemandForecast(generateDemandForecast());
    };

    generateForecasts();
    const interval = setInterval(generateForecasts, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const predictResourceNeeds = (hoursAhead: number = 4): DemandForecast | null => {
    const futureForecasts = demandForecast.filter(f => {
      const forecastTime = new Date(f.timestamp);
      const targetTime = new Date(Date.now() + hoursAhead * 60 * 60 * 1000);
      return Math.abs(forecastTime.getTime() - targetTime.getTime()) < 30 * 60 * 1000; // Within 30 minutes
    });

    return futureForecasts.length > 0 ? futureForecasts[0] : null;
  };

  return {
    demandForecast: demandForecast.slice(0, 12), // Show next 12 hours
    predictResourceNeeds
  };
};

export default useDemandForecast;