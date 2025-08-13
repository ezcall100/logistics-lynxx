import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Zap, 
  AlertTriangle,
  Target,
  BarChart3,
  Users,
  Truck,
  Package
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'alert' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  timestamp: string;
  action_required?: boolean;
  data?: Record<string, unknown>;
}

const AIInsightsPanel = () => {
  const { selectedRole } = useAuth();

  // Mock AI insights based on role
  const getAIInsights = (): AIInsight[] => {
    const baseInsights: AIInsight[] = [];

    switch (selectedRole) {
      case 'super_admin':
        baseInsights.push(
          {
            id: '1',
            type: 'optimization',
            title: 'System Performance Optimization',
            description: 'Database queries can be optimized to reduce load time by 40%',
            impact: 'high',
            confidence: 92,
            timestamp: '2023-10-01T12:00:00Z',
            action_required: true
          },
          {
            id: '2',
            type: 'prediction',
            title: 'User Growth Forecast',
            description: 'Expect 25% increase in active users next month',
            impact: 'medium',
            confidence: 78,
            timestamp: '2023-10-02T12:00:00Z',
            action_required: false
          }
        );
        break;

      case 'carrier_admin':
        baseInsights.push(
          {
            id: '3',
            type: 'recommendation',
            title: 'Route Optimization',
            description: 'AI suggests consolidating 3 routes to save $2,400/week in fuel costs',
            impact: 'high',
            confidence: 89,
            timestamp: '2023-10-03T12:00:00Z',
            action_required: true
          },
          {
            id: '4',
            type: 'alert',
            title: 'Maintenance Prediction',
            description: 'Vehicle #1247 requires maintenance within 2 days',
            impact: 'medium',
            confidence: 85,
            timestamp: '2023-10-04T12:00:00Z',
            action_required: true
          }
        );
        break;

      case 'freight_broker_admin':
        baseInsights.push(
          {
            id: '5',
            type: 'optimization',
            title: 'Load Matching Efficiency',
            description: 'AI matching algorithm improved by 15% this week',
            impact: 'high',
            confidence: 94,
            timestamp: '2023-10-05T12:00:00Z',
            action_required: false
          },
          {
            id: '6',
            type: 'recommendation',
            title: 'Market Rate Adjustment',
            description: 'Rates for Chicago-Miami route should increase by 8%',
            impact: 'medium',
            confidence: 76,
            timestamp: '2023-10-06T12:00:00Z',
            action_required: true
          }
        );
        break;

      case 'carrier_driver':
        baseInsights.push(
          {
            id: '7',
            type: 'recommendation',
            title: 'Optimal Delivery Time',
            description: 'Leave 30 minutes earlier to avoid traffic and save 45 minutes',
            impact: 'medium',
            confidence: 88,
            timestamp: '2023-10-07T12:00:00Z',
            action_required: true
          },
          {
            id: '8',
            type: 'alert',
            title: 'Weather Advisory',
            description: 'Heavy rain expected on your route in 3 hours',
            impact: 'medium',
            confidence: 92,
            timestamp: '2023-10-08T12:00:00Z',
            action_required: true
          }
        );
        break;

      default:
        baseInsights.push(
          {
            id: '9',
            type: 'optimization',
            title: 'Workflow Enhancement',
            description: 'AI detected opportunity to streamline current process',
            impact: 'medium',
            confidence: 82,
            timestamp: '2023-10-09T12:00:00Z',
            action_required: true
          }
        );
    }

    return baseInsights;
  };

  const insights = getAIInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return <Target className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'optimization':
        return <Zap className="h-4 w-4" />;
      case 'prediction':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApplyInsight = (insight: AIInsight) => {
    // Apply insight logic here
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-blue-500" />
          AI Insights
          <Badge variant="secondary" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 pb-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {insight.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getImpactColor(insight.impact)}`}
                      >
                        {insight.impact}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Confidence: {insight.confidence}%
                        </span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                      </div>
                      
                      {insight.action_required && (
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Act on this
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
