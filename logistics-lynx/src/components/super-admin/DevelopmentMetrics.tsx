import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Bug, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Activity,
  Zap,
  Target,
  BarChart3,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Users,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface DevelopmentMetrics {
  codeQuality: {
    coverage: number;
    complexity: number;
    maintainability: number;
    bugs: number;
  };
  productivity: {
    commitsPerDay: number;
    linesOfCode: number;
    pullRequests: number;
    deployments: number;
  };
  team: {
    activeDevelopers: number;
    codeReviews: number;
    collaboration: number;
  };
  performance: {
    buildTime: number;
    testTime: number;
    deploymentTime: number;
    uptime: number;
  };
}

const DevelopmentMetrics = () => {
  const [metrics, setMetrics] = useState<DevelopmentMetrics>({
    codeQuality: {
      coverage: 94.2,
      complexity: 12.5,
      maintainability: 87.3,
      bugs: 3
    },
    productivity: {
      commitsPerDay: 15.7,
      linesOfCode: 125430,
      pullRequests: 8,
      deployments: 12
    },
    team: {
      activeDevelopers: 6,
      codeReviews: 24,
      collaboration: 92.1
    },
    performance: {
      buildTime: 2.3,
      testTime: 1.8,
      deploymentTime: 4.2,
      uptime: 99.97
    }
  });

  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');

  const getQualityColor = (value: number, type: 'coverage' | 'complexity' | 'maintainability') => {
    if (type === 'coverage' || type === 'maintainability') {
      if (value >= 90) return 'text-green-600';
      if (value >= 80) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value <= 10) return 'text-green-600';
      if (value <= 20) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getQualityIcon = (value: number, type: 'coverage' | 'complexity' | 'maintainability') => {
    if (type === 'coverage' || type === 'maintainability') {
      if (value >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
      if (value >= 80) return <Clock className="h-4 w-4 text-yellow-600" />;
      return <Bug className="h-4 w-4 text-red-600" />;
    } else {
      if (value <= 10) return <CheckCircle className="h-4 w-4 text-green-600" />;
      if (value <= 20) return <Clock className="h-4 w-4 text-yellow-600" />;
      return <Bug className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Development Metrics</h2>
            <p className="text-sm text-muted-foreground">Autonomous development performance insights</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['day', 'week', 'month'] as const).map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Code Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Quality
          </CardTitle>
          <CardDescription>Automated code analysis and quality metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Test Coverage</span>
                {getQualityIcon(metrics.codeQuality.coverage, 'coverage')}
              </div>
              <div className="text-2xl font-bold text-green-600">
                {metrics.codeQuality.coverage}%
              </div>
              <Progress value={metrics.codeQuality.coverage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Complexity</span>
                {getQualityIcon(metrics.codeQuality.complexity, 'complexity')}
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {metrics.codeQuality.complexity}
              </div>
              <Progress value={(metrics.codeQuality.complexity / 30) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maintainability</span>
                {getQualityIcon(metrics.codeQuality.maintainability, 'maintainability')}
              </div>
              <div className="text-2xl font-bold text-green-600">
                {metrics.codeQuality.maintainability}%
              </div>
              <Progress value={metrics.codeQuality.maintainability} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Bugs</span>
                <Bug className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {metrics.codeQuality.bugs}
              </div>
              <div className="text-xs text-muted-foreground">Low priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productivity
            </CardTitle>
            <CardDescription>Development velocity and output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCommit className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Commits/Day</span>
                </div>
                <span className="font-semibold">{metrics.productivity.commitsPerDay}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Lines of Code</span>
                </div>
                <span className="font-semibold">{metrics.productivity.linesOfCode.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Pull Requests</span>
                </div>
                <span className="font-semibold">{metrics.productivity.pullRequests}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Deployments</span>
                </div>
                <span className="font-semibold">{metrics.productivity.deployments}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Collaboration
            </CardTitle>
            <CardDescription>Development team metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Active Developers</span>
                </div>
                <span className="font-semibold">{metrics.team.activeDevelopers}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Code Reviews</span>
                </div>
                <span className="font-semibold">{metrics.team.codeReviews}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Collaboration Score</span>
                </div>
                <span className="font-semibold">{metrics.team.collaboration}%</span>
              </div>
              
              <Progress value={metrics.team.collaboration} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Build, test, and deployment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.performance.buildTime}m</div>
              <div className="text-sm text-muted-foreground">Build Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.performance.testTime}m</div>
              <div className="text-sm text-muted-foreground">Test Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.performance.deploymentTime}m</div>
              <div className="text-sm text-muted-foreground">Deployment</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{metrics.performance.uptime}%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Development Activity
          </CardTitle>
          <CardDescription>Latest autonomous development actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Deployed new AI agent system', time: '2 minutes ago', status: 'success' },
              { action: 'Merged autonomous routing feature', time: '15 minutes ago', status: 'success' },
              { action: 'Fixed port configuration issue', time: '1 hour ago', status: 'success' },
              { action: 'Added comprehensive test suite', time: '3 hours ago', status: 'pending' },
              { action: 'Optimized database queries', time: '5 hours ago', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentMetrics;
