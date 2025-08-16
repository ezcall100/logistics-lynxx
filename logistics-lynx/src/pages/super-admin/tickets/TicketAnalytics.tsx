/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  Ticket
} from 'lucide-react';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const TicketAnalytics: React.FC = () => {
  const analyticsData = {
    overview: {
      totalTickets: 2847,
      resolvedTickets: 2387,
      avgResolutionTime: 4.2,
      customerSatisfaction: 94.5,
      firstResponseTime: 1.8,
      reopenRate: 3.2
    },
    trends: {
      thisMonth: {
        created: 234,
        resolved: 198,
        change: '+12%'
      },
      lastMonth: {
        created: 209,
        resolved: 187,
        change: '+8%'
      }
    },
    categoryBreakdown: [
      { name: 'Technical Issues', count: 145, percentage: 38.2, avgResolution: 6.2, trend: '+5%' },
      { name: 'Access & Auth', count: 89, percentage: 23.5, avgResolution: 2.1, trend: '-3%' },
      { name: 'Data Sync', count: 67, percentage: 17.7, avgResolution: 8.7, trend: '+15%' },
      { name: 'Feature Requests', count: 45, percentage: 11.9, avgResolution: 72, trend: '+8%' },
      { name: 'Billing', count: 32, percentage: 8.4, avgResolution: 4.5, trend: '-12%' }
    ],
    priorityDistribution: [
      { priority: 'High', count: 45, percentage: 11.9, avgResolution: 3.2 },
      { priority: 'Medium', count: 167, percentage: 44.1, avgResolution: 6.8 },
      { priority: 'Low', count: 167, percentage: 44.0, avgResolution: 24.5 }
    ],
    statusDistribution: [
      { status: 'Open', count: 234, percentage: 8.2, color: 'bg-red-500' },
      { status: 'In Progress', count: 156, percentage: 5.5, color: 'bg-blue-500' },
      { status: 'Resolved', count: 2387, percentage: 83.8, color: 'bg-green-500' },
      { status: 'Closed', count: 70, percentage: 2.5, color: 'bg-gray-500' }
    ],
    agentPerformance: [
      { name: 'John Doe', resolved: 145, pending: 8, rating: 4.8, avgResolution: 3.2 },
      { name: 'Sarah Smith', resolved: 132, pending: 6, rating: 4.9, avgResolution: 2.8 },
      { name: 'Mike Johnson', resolved: 128, pending: 12, rating: 4.7, avgResolution: 4.1 },
      { name: 'Lisa Chen', resolved: 119, pending: 4, rating: 4.9, avgResolution: 3.6 },
      { name: 'David Brown', resolved: 98, pending: 15, rating: 4.6, avgResolution: 5.2 }
    ],
    slaMetrics: {
      firstResponse: { target: 2, actual: 1.8, compliance: 94.5 },
      resolution: { target: 8, actual: 4.2, compliance: 89.3 },
      escalation: { target: 24, actual: 18.6, compliance: 92.1 }
    },
    weeklyTrends: [
      { week: 'Week 1', created: 58, resolved: 52 },
      { week: 'Week 2', created: 62, resolved: 59 },
      { week: 'Week 3', created: 67, resolved: 64 },
      { week: 'Week 4', created: 71, resolved: 68 }
    ]
  };

  const getTrendIcon = (trend: string) => {
    return trend.startsWith('+') ? 
      <TrendingUp className="h-3 w-3 text-green-600" /> : 
      <TrendingDown className="h-3 w-3 text-red-600" />;
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ticket Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights for ticket management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <CRMStatsCard
          title="Total Tickets"
          value={analyticsData.overview.totalTickets.toLocaleString()}
          description={`${analyticsData.trends.thisMonth.change} from last month`}
          icon={Ticket}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Resolution Rate"
          value={`${((analyticsData.overview.resolvedTickets / analyticsData.overview.totalTickets) * 100).toFixed(1)}%`}
          description="Tickets resolved successfully"
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Avg Resolution Time"
          value={`${analyticsData.overview.avgResolutionTime}h`}
          description="Average time to resolve"
          icon={Clock}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="First Response"
          value={`${analyticsData.overview.firstResponseTime}h`}
          description="Average first response time"
          icon={Target}
          iconColor="text-orange-600"
        />
        <CRMStatsCard
          title="Customer Satisfaction"
          value={`${analyticsData.overview.customerSatisfaction}%`}
          description="Customer satisfaction score"
          icon={Users}
          iconColor="text-indigo-600"
        />
        <CRMStatsCard
          title="Reopen Rate"
          value={`${analyticsData.overview.reopenRate}%`}
          description="Tickets reopened after closure"
          icon={AlertTriangle}
          iconColor="text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ticket Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.categoryBreakdown.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(category.trend)}
                      <span className={`text-xs ${getTrendColor(category.trend)}`}>
                        {category.trend}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{category.count} tickets ({category.percentage}%)</span>
                    <span>Avg: {category.avgResolution}h</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.statusDistribution.map((status) => (
                <div key={status.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                    <span className="text-sm font-medium">{status.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {status.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            SLA Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">First Response Time</span>
                <span className="text-sm text-muted-foreground">
                  {analyticsData.slaMetrics.firstResponse.actual}h / {analyticsData.slaMetrics.firstResponse.target}h
                </span>
              </div>
              <Progress value={analyticsData.slaMetrics.firstResponse.compliance} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {analyticsData.slaMetrics.firstResponse.compliance}% compliance
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resolution Time</span>
                <span className="text-sm text-muted-foreground">
                  {analyticsData.slaMetrics.resolution.actual}h / {analyticsData.slaMetrics.resolution.target}h
                </span>
              </div>
              <Progress value={analyticsData.slaMetrics.resolution.compliance} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {analyticsData.slaMetrics.resolution.compliance}% compliance
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Escalation Time</span>
                <span className="text-sm text-muted-foreground">
                  {analyticsData.slaMetrics.escalation.actual}h / {analyticsData.slaMetrics.escalation.target}h
                </span>
              </div>
              <Progress value={analyticsData.slaMetrics.escalation.compliance} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {analyticsData.slaMetrics.escalation.compliance}% compliance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Agent Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.agentPerformance.map((agent, index) => (
              <div key={agent.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {agent.resolved} resolved • {agent.pending} pending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-muted-foreground">Rating</div>
                    <div className="font-semibold">{agent.rating}/5.0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Avg Time</div>
                    <div className="font-semibold">{agent.avgResolution}h</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {analyticsData.weeklyTrends.map((week) => (
              <div key={week.week} className="text-center space-y-2">
                <div className="text-sm font-medium">{week.week}</div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Created</div>
                  <div className="text-lg font-bold text-blue-600">{week.created}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Resolved</div>
                  <div className="text-lg font-bold text-green-600">{week.resolved}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default TicketAnalytics;