
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import type { AIConfidenceStats } from '@/types/ai-confidence';

interface RealtimeConfidenceMonitorProps {
  stats: AIConfidenceStats;
}

const RealtimeConfidenceMonitor = ({ stats }: RealtimeConfidenceMonitorProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle>Real-time AI Confidence Monitor</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Avg Confidence: {Math.round(stats.avg_confidence * 100)}%
            </span>
            <Progress value={stats.avg_confidence * 100} className="w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">High Confidence</p>
              <p className="text-2xl font-bold text-green-600">{stats.confidence_distribution.high}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Medium Confidence</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.confidence_distribution.medium}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm font-medium">Low Confidence</p>
              <p className="text-2xl font-bold text-red-600">{stats.confidence_distribution.low}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeConfidenceMonitor;
