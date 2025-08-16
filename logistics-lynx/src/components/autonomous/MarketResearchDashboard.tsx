/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useMarketResearchAgents } from '@/hooks/market-research/useMarketResearchAgents';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Target, 
  Brain, 
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const MarketResearchDashboard = () => {
  const {
    agents,
    marketData,
    competitorData,
    forecasts,
    researchActive,
    setResearchActive,
    executeMarketResearch,
    getMarketInsights,
    getActionableRecommendations
  } = useMarketResearchAgents();

  const insights = getMarketInsights();
  const recommendations = getActionableRecommendations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'researching': return 'bg-blue-500';
      case 'analyzing': return 'bg-yellow-500';
      case 'reporting': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'researching': return <Brain className="h-4 w-4" />;
      case 'analyzing': return <BarChart3 className="h-4 w-4" />;
      case 'reporting': return <TrendingUp className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Market Research Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            AI-powered market intelligence and competitive analysis for your TMS platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={researchActive ? "default" : "secondary"}>
            {researchActive ? "Research Active" : "Research Paused"}
          </Badge>
          <Button
            onClick={() => setResearchActive(!researchActive)}
            variant={researchActive ? "outline" : "default"}
          >
            {researchActive ? "Pause Research" : "Resume Research"}
          </Button>
        </div>
      </div>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(agent.status)}
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(agent.status)} text-white border-0`}
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Focus: {agent.focus_areas.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span>{agent.success_rate}%</span>
                  </div>
                  <Progress value={agent.success_rate} className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Research Cycles</span>
                    <p className="font-semibold">{agent.research_completed}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Cycle</span>
                    <p className="font-semibold text-xs">
                      {new Date(agent.next_research_cycle).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => executeMarketResearch(agent)}
                  disabled={agent.status === 'researching'}
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {agent.status === 'researching' ? 'Researching...' : 'Run Research'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Research Insights */}
      <Tabs defaultValue="intelligence" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="intelligence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Intelligence
              </CardTitle>
              <CardDescription>
                Latest market trends and technology insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              {marketData.length > 0 ? (
                <div className="space-y-4">
                  {marketData.slice(-3).map((data, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{data.research_type?.replace('_', ' ').toUpperCase() || 'Unknown Research'}</h4>
                        <Badge variant="outline">{data.market_segment || 'General'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{data.insights?.summary || 'No summary available'}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Confidence: {(data.insights?.confidence_score ? (data.insights.confidence_score * 100).toFixed(0) : 0)}%</span>
                        <span>{new Date(data.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No market intelligence data available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Competitive Analysis
              </CardTitle>
              <CardDescription>
                Competitor feature analysis and market positioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              {competitorData.length > 0 ? (
                <div className="space-y-4">
                  {competitorData.slice(-3).map((competitor, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{competitor.competitor_name}</h4>
                        <Badge variant="outline">{competitor.market_position}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Strengths:</span>
                          <ul className="list-disc list-inside mt-1">
                            {competitor.strengths.slice(0, 2).map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <p className="font-semibold">{competitor.customer_feedback.rating}/5</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No competitive analysis data available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Forecasts
              </CardTitle>
              <CardDescription>
                Demand predictions and market trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {forecasts.length > 0 ? (
                <div className="space-y-4">
                  {forecasts.slice(-3).map((forecast, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{forecast.forecast_type?.replace('_', ' ').toUpperCase() || 'Market Forecast'}</h4>
                        <Badge variant="outline">{forecast.time_horizon?.replace('_', ' ') || 'Medium Term'}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Trend:</span>
                          <p className="font-semibold">{forecast.prediction_data?.current_trend || 'Unknown'}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <p className="font-semibold">{forecast.prediction_data?.confidence_level ? (forecast.prediction_data.confidence_level * 100).toFixed(0) : 0}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No forecast data available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                AI-generated recommendations based on market research
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No recommendations available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
