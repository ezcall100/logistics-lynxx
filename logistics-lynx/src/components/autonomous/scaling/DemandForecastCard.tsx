/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { DemandForecast } from '@/hooks/useDemandForecast';

interface DemandForecastCardProps {
  demandForecast: DemandForecast[];
}

const DemandForecastCard = ({ demandForecast }: DemandForecastCardProps) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'scale_up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'scale_down': return <TrendingDown className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'scale_up': return 'text-green-600';
      case 'scale_down': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demand Forecast</CardTitle>
        <CardDescription>Predicted system load for the next 12 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {demandForecast.map((forecast, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {new Date(forecast.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div className="text-sm">
                  Load: {(forecast.predicted_load * 100).toFixed(1)}%
                </div>
                <div className="flex items-center gap-1">
                  {getRecommendationIcon(forecast.recommendation)}
                  <span className={`text-xs ${getRecommendationColor(forecast.recommendation)}`}>
                    {forecast.recommendation.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {(forecast.confidence * 100).toFixed(0)}% confidence
                </div>
                <div className="text-xs text-muted-foreground">
                  {forecast.factors.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandForecastCard;
