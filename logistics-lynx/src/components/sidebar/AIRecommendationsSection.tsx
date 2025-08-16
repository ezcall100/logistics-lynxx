/* eslint-disable @typescript-eslint/no-explicit-any */

import { Brain, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MenuRecommendation {
  itemPath: string;
  title: string;
  reason: string;
  priority: number;
}

interface AIRecommendationsSectionProps {
  recommendations: MenuRecommendation[];
  showRecommendations: boolean;
  onHideRecommendations: () => void;
  onRefreshRecommendations: () => void;
  onTrackActivity: (path: string, action: string) => void;
}

export const AIRecommendationsSection = ({
  recommendations,
  showRecommendations,
  onHideRecommendations,
  onRefreshRecommendations,
  onTrackActivity
}: AIRecommendationsSectionProps) => {
  if (!showRecommendations || recommendations.length === 0) return null;

  return (
    <div className="p-3 border-b border-border/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground flex items-center gap-1">
          <Brain className="h-3 w-3 text-blue-500" />
          AI Recommendations
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onHideRecommendations}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-1">
        {recommendations.slice(0, 3).map((rec, index) => (
          <Link
            key={index}
            to={rec.itemPath}
            className="block p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            onClick={() => onTrackActivity(rec.itemPath, 'recommendation_click')}
          >
            <div className="text-xs font-medium text-foreground">{rec.title}</div>
            <div className="text-xs text-muted-foreground">{rec.reason}</div>
          </Link>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRefreshRecommendations}
        className="w-full mt-2 h-7 text-xs"
      >
        <Brain className="h-3 w-3 mr-1" />
        Refresh
      </Button>
    </div>
  );
};
