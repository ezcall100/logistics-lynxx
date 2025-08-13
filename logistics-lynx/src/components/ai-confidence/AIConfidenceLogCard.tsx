
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Flag, CheckCircle, AlertTriangle, Clock, Eye } from 'lucide-react';
import type { AIConfidenceLog } from '@/types/ai-confidence';

interface AIConfidenceLogCardProps {
  log: AIConfidenceLog;
  onFlagForReview: (id: string, flag: boolean) => Promise<void>;
  onMarkAsReviewed: (id: string, reviewedBy: string) => Promise<void>;
}

const AIConfidenceLogCard = ({ log, onFlagForReview, onMarkAsReviewed }: AIConfidenceLogCardProps) => {
  const confidencePercentage = Math.round(log.confidence_score * 100);
  
  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadgeVariant = (score: number) => {
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'destructive';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="h-4 w-4" />;
    if (score >= 0.6) return <Clock className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <Card className={`transition-all hover:shadow-md ${
      log.flagged_for_review ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <h3 className="font-semibold capitalize">
                  {log.decision_type.replace('_', ' ')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </div>
              {log.flagged_for_review && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <Flag className="h-3 w-3 mr-1" />
                  Flagged
                </Badge>
              )}
              {log.reviewed_by && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Eye className="h-3 w-3 mr-1" />
                  Reviewed
                </Badge>
              )}
            </div>

            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getConfidenceIcon(log.confidence_score)}
                  <span className="text-sm font-medium">Confidence Score</span>
                </div>
                <Badge variant={getConfidenceBadgeVariant(log.confidence_score)}>
                  {confidencePercentage}%
                </Badge>
              </div>
              <Progress 
                value={confidencePercentage} 
                className="h-2"
              />
            </div>

            {/* Reasoning */}
            {log.reasoning && (
              <div className="space-y-1">
                <p className="text-sm font-medium">AI Reasoning:</p>
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {log.reasoning}
                </p>
              </div>
            )}

            {/* Decision Data Preview */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Decision Data:</p>
              <div className="text-xs bg-muted p-2 rounded font-mono">
                {JSON.stringify(log.decision_data, null, 2).substring(0, 150)}
                {JSON.stringify(log.decision_data).length > 150 && '...'}
              </div>
            </div>

            {/* Review Information */}
            {log.reviewed_by && (
              <div className="text-sm text-muted-foreground">
                Reviewed by {log.reviewed_by} on {' '}
                {log.reviewed_at && new Date(log.reviewed_at).toLocaleString()}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {!log.reviewed_by && (
              <>
                <Button
                  size="sm"
                  variant={log.flagged_for_review ? "secondary" : "outline"}
                  onClick={() => onFlagForReview(log.id, !log.flagged_for_review)}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  {log.flagged_for_review ? 'Unflag' : 'Flag'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onMarkAsReviewed(log.id, 'Current User')}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Reviewed
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConfidenceLogCard;
