
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Brain } from 'lucide-react';
import type { AIConfidenceLog } from '@/types/ai-confidence';

interface LowConfidenceAlertProps {
  lowConfidenceLogs: AIConfidenceLog[];
  onFlagForReview: (id: string, flag: boolean) => Promise<void>;
}

const LowConfidenceAlert = ({ lowConfidenceLogs, onFlagForReview }: LowConfidenceAlertProps) => {
  if (lowConfidenceLogs.length === 0) return null;

  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-amber-700 dark:text-amber-300">
            Low Confidence Decisions Require Review
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {lowConfidenceLogs.slice(0, 3).map(log => (
            <div key={log.id} className="flex items-center justify-between p-2 bg-white dark:bg-amber-900 rounded border">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="font-medium text-sm">
                  {log.decision_type.replace('_', ' ')} - {Math.round(log.confidence_score * 100)}% confidence
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onFlagForReview(log.id, true)}
              >
                Flag for Review
              </Button>
            </div>
          ))}
          {lowConfidenceLogs.length > 3 && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              +{lowConfidenceLogs.length - 3} more low confidence decisions
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowConfidenceAlert;
