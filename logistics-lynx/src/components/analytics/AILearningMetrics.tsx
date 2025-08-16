/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Brain, TrendingUp, Target, Zap, AlertCircle } from 'lucide-react';

interface LearningTrend {
  timestamp: string;
  accuracy: number;
  confidence: number;
}

interface PredictionAccuracy {
  type: string;
  accuracy: number;
  count: number;
  avgConfidence: number;
}

interface AdaptationMetrics {
  overallProgress: number;
  patternRecognition: number;
  adaptationSpeed: number;
  currentAccuracy: number;
  bestAccuracy: number;
  averageAccuracy: number;
  improvement: number;
}

interface RecentInsight {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  confidence: number;
}

interface AILearningData {
  learningTrends: LearningTrend[];
  predictionAccuracy: PredictionAccuracy[];
  adaptationMetrics: AdaptationMetrics;
  decisionTypes: PredictionAccuracy[];
  recentInsights: RecentInsight[];
}

interface AILearningMetricsProps {
  data: AILearningData;
  timeRange: string;
  role: string;
}

const AILearningMetrics: React.FC<AILearningMetricsProps> = ({ data, timeRange, role }) => {
  const learningTrends = data?.learningTrends || [];
  const predictionAccuracy = data?.predictionAccuracy || [];
  const adaptationMetrics = data?.adaptationMetrics || {
    overallProgress: 0,
    patternRecognition: 0,
    adaptationSpeed: 0,
    currentAccuracy: 0,
    bestAccuracy: 0,
    averageAccuracy: 0,
    improvement: 0
  };
  const decisionTypes = data?.decisionTypes || [];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-blue-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLevel = (score: number) => {
    if (score >= 0.9) return { label: 'Excellent', color: 'bg-green-500' };
    if (score >= 0.8) return { label: 'Good', color: 'bg-blue-500' };
    if (score >= 0.7) return { label: 'Fair', color: 'bg-yellow-500' };
    return { label: 'Poor', color: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      {/* AI Learning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Learning</span>
                  <span className="text-sm text-muted-foreground">{adaptationMetrics.overallProgress}%</span>
                </div>
                <Progress value={adaptationMetrics.overallProgress} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pattern Recognition</span>
                  <span className="text-sm text-muted-foreground">{adaptationMetrics.patternRecognition}%</span>
                </div>
                <Progress value={adaptationMetrics.patternRecognition} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Adaptation Speed</span>
                  <span className="text-sm text-muted-foreground">{adaptationMetrics.adaptationSpeed}%</span>
                </div>
                <Progress value={adaptationMetrics.adaptationSpeed} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Prediction Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAccuracyColor(adaptationMetrics.currentAccuracy)}`}>
                {adaptationMetrics.currentAccuracy}%
              </div>
              <div className="text-sm text-muted-foreground mb-4">Current Accuracy</div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Best Performance</span>
                  <span className="text-sm font-medium">{adaptationMetrics.bestAccuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Performance</span>
                  <span className="text-sm font-medium">{adaptationMetrics.averageAccuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Improvement</span>
                  <span className="text-sm font-medium text-green-600">+{adaptationMetrics.improvement}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {decisionTypes.slice(0, 4).map((decision: PredictionAccuracy, index: number) => {
                const confidence = getConfidenceLevel(decision.avgConfidence || 0);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium capitalize">
                        {decision.type?.replace('_', ' ') || 'Unknown'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {decision.count || 0} decisions
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${confidence.color}`} />
                      <Badge variant="outline" className="text-xs">
                        {confidence.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Learning Trends Over Time
          </CardTitle>
          <CardDescription>
            AI learning effectiveness and adaptation rate over the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="accuracy" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                  name="Accuracy %"
                />
                <Area 
                  type="monotone" 
                  dataKey="confidence" 
                  stackId="2" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6}
                  name="Confidence %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Accuracy by Decision Type */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Type Performance</CardTitle>
          <CardDescription>
            Accuracy breakdown by different AI decision types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decisionTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Recent AI Insights
          </CardTitle>
          <CardDescription>
            Latest AI learning observations and adaptations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(data?.recentInsights || []).slice(0, 5).map((insight: RecentInsight, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.type === 'improvement' ? 'bg-green-500' :
                  insight.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{insight.title}</div>
                  <div className="text-sm text-muted-foreground">{insight.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(insight.timestamp).toLocaleString()}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AILearningMetrics;
