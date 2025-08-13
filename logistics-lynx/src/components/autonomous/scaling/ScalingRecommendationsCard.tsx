
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Recommendation {
  predicted_load: number;
  recommendation: string;
}

interface ScalingRecommendationsCardProps {
  recommendations: {
    immediate: Recommendation | null;
    next_hour: Recommendation | null;
    cost_projection: number;
  };
}

const ScalingRecommendationsCard = ({ recommendations }: ScalingRecommendationsCardProps) => {
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
        <CardTitle>Scaling Recommendations</CardTitle>
        <CardDescription>AI-generated scaling suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.immediate && (
            <div className="p-3 border rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Immediate</span>
                <div className="flex items-center gap-1">
                  {getRecommendationIcon(recommendations.immediate.recommendation)}
                  <span className={`text-sm font-medium ${getRecommendationColor(recommendations.immediate.recommendation)}`}>
                    {recommendations.immediate.recommendation.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Load: {(recommendations.immediate.predicted_load * 100).toFixed(1)}%
              </div>
              <Progress 
                value={recommendations.immediate.predicted_load * 100} 
                className="mt-2 h-2"
              />
            </div>
          )}
          
          {recommendations.next_hour && (
            <div className="p-3 border rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Next Hour</span>
                <div className="flex items-center gap-1">
                  {getRecommendationIcon(recommendations.next_hour.recommendation)}
                  <span className={`text-sm font-medium ${getRecommendationColor(recommendations.next_hour.recommendation)}`}>
                    {recommendations.next_hour.recommendation.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Load: {(recommendations.next_hour.predicted_load * 100).toFixed(1)}%
              </div>
              <Progress 
                value={recommendations.next_hour.predicted_load * 100} 
                className="mt-2 h-2"
              />
            </div>
          )}

          <div className="p-3 bg-muted rounded">
            <div className="text-sm font-medium mb-1">24-Hour Cost Projection</div>
            <div className="text-2xl font-bold text-green-600">
              ${recommendations.cost_projection.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScalingRecommendationsCard;
