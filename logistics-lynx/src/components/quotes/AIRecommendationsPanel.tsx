
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

interface AIRecommendationsPanelProps {
  recommendations: string[];
  confidenceScore: number;
  onApplyRecommendation?: (recommendation: string) => void;
}

export const AIRecommendationsPanel: React.FC<AIRecommendationsPanelProps> = ({
  recommendations,
  confidenceScore,
  onApplyRecommendation
}) => {
  const getConfidenceBadge = () => {
    let color = 'bg-red-100 text-red-800';
    let label = 'Low Confidence';
    
    if (confidenceScore >= 90) {
      color = 'bg-green-100 text-green-800';
      label = 'High Confidence';
    } else if (confidenceScore >= 75) {
      color = 'bg-yellow-100 text-yellow-800';
      label = 'Medium Confidence';
    }
    
    return (
      <Badge className={color}>
        {label} ({confidenceScore}%)
      </Badge>
    );
  };

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes('increase') || recommendation.includes('premium')) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (recommendation.includes('monitor') || recommendation.includes('analyze')) {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
    return <Lightbulb className="h-4 w-4 text-blue-600" />;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          {getConfidenceBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No specific recommendations at this time. All metrics appear optimal.
          </div>
        ) : (
          recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              {getRecommendationIcon(recommendation)}
              <div className="flex-1">
                <p className="text-sm">{recommendation}</p>
                {onApplyRecommendation && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => onApplyRecommendation(recommendation)}
                  >
                    Apply Suggestion
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
