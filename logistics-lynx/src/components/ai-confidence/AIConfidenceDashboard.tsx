/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAIConfidenceLogs } from '@/hooks/useAIConfidenceLogs';
import { Brain, CheckCircle, XCircle, Flag, BarChart3, Activity } from 'lucide-react';

interface ConfidenceStats {
  averageConfidence: number;
  highConfidenceCount: number;
  lowConfidenceCount: number;
  flaggedCount: number;
  totalLogs: number;
  successRate: number;
}

const AIConfidenceDashboard = () => {
  const { logs } = useAIConfidenceLogs();
  const [isLearning, setIsLearning] = useState(true);

  const getStats = useCallback(() => {
    const totalLogs = logs.length;
    const highConfidenceCount = logs.filter(log => log.confidence_score > 0.8).length;
    const lowConfidenceCount = logs.filter(log => log.confidence_score <= 0.5).length;
    const flaggedCount = logs.filter(log => log.flagged_for_review).length;
    const averageConfidence = totalLogs > 0
      ? logs.reduce((sum, log) => sum + log.confidence_score, 0) / totalLogs
      : 0;
    const successCount = logs.filter(log => log.confidence_score > 0.8 && !log.flagged_for_review).length;
    const successRate = totalLogs > 0 ? (successCount / totalLogs) * 100 : 0;

    return {
      averageConfidence,
      highConfidenceCount,
      lowConfidenceCount,
      flaggedCount,
      totalLogs,
      successRate
    };
  }, [logs]);

  const stats = useMemo(() => getStats(), [getStats]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <CardTitle>AI Confidence Overview</CardTitle>
            </div>
            <Badge variant={isLearning ? "default" : "secondary"}>
              {isLearning ? "LEARNING" : "STATIC"}
            </Badge>
          </div>
          <CardDescription>
            Real-time insights into AI decision confidence and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">Avg. Confidence</span>
              </div>
              <div className="text-2xl font-bold">{(stats.averageConfidence * 100).toFixed(1)}%</div>
              <Progress value={stats.averageConfidence * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">High Confidence</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{stats.highConfidenceCount}</div>
              <div className="text-xs text-muted-foreground">(&gt;80% confidence)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Low Confidence</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{stats.lowConfidenceCount}</div>
              <div className="text-xs text-muted-foreground">(&lt;50% confidence)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Flagged for Review</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{stats.flaggedCount}</div>
              <div className="text-xs text-muted-foreground">Manual review needed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Decision Log</CardTitle>
          <CardDescription>
            Detailed log of all AI decisions with confidence scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No AI decisions logged yet.
              </p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4" />
                    <div>
                      <p className="font-medium capitalize">{log.decision_type.replace('_', ' ')} Decision</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={log.confidence_score > 0.8 ? "default" : "outline"}>
                    {log.confidence_score.toFixed(2)} Confidence
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConfidenceDashboard;
