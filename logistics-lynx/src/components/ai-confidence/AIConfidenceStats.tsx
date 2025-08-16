/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import type { AIConfidenceStats } from '@/types/ai-confidence';

interface AIConfidenceStatsProps {
  stats: AIConfidenceStats;
}

const AIConfidenceStats = ({ stats }: AIConfidenceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Decisions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_decisions}</div>
          <p className="text-xs text-muted-foreground">
            AI decisions logged
          </p>
        </CardContent>
      </Card>

      {/* Average Confidence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(stats.avg_confidence * 100)}%
          </div>
          <Progress value={stats.avg_confidence * 100} className="mt-2" />
        </CardContent>
      </Card>

      {/* Flagged for Review */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged for Review</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.flagged_count}</div>
          <p className="text-xs text-muted-foreground">
            Require manual review
          </p>
        </CardContent>
      </Card>

      {/* Low Confidence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Confidence</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.low_confidence_count}</div>
          <p className="text-xs text-muted-foreground">
            Below 80% threshold
          </p>
        </CardContent>
      </Card>

      {/* Decision Type Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Decision Types</CardTitle>
          <CardDescription>Distribution of AI decisions by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.by_decision_type).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20">
                    <Progress 
                      value={(count / stats.total_decisions) * 100} 
                      className="h-2"
                    />
                  </div>
                  <Badge variant="outline">{count}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confidence Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Confidence Distribution</CardTitle>
          <CardDescription>Breakdown of decisions by confidence level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">High Confidence (≥80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress 
                    value={(stats.confidence_distribution.high / stats.total_decisions) * 100} 
                    className="h-2"
                  />
                </div>
                <Badge variant="default">{stats.confidence_distribution.high}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Medium Confidence (60-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress 
                    value={(stats.confidence_distribution.medium / stats.total_decisions) * 100} 
                    className="h-2"
                  />
                </div>
                <Badge variant="secondary">{stats.confidence_distribution.medium}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Low Confidence (&lt;60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress 
                    value={(stats.confidence_distribution.low / stats.total_decisions) * 100} 
                    className="h-2"
                  />
                </div>
                <Badge variant="destructive">{stats.confidence_distribution.low}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConfidenceStats;
