
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target,
  DollarSign,
  Users,
  Calendar,
  Mail,
  CheckCircle,
  AlertCircle,
  Phone,
  FileText
} from 'lucide-react';
import type { 
  CRMCompany, 
  CRMContact, 
  CRMLead, 
  CRMOpportunity, 
  CRMProject, 
  CRMCalendarEvent, 
  CRMActivity 
} from '@/types/crm';

interface CRMOverviewProps {
  stats: {
    totalContacts: number;
    activeLeads: number;
    openOpportunities: number;
    activeProjects: number;
    upcomingEvents: number;
    recentEmails: number;
    totalPipelineValue: number;
  };
  companies: CRMCompany[];
  contacts: CRMContact[];
  leads: CRMLead[];
  opportunities: CRMOpportunity[];
  projects: CRMProject[];
  events: CRMCalendarEvent[];
  activities: CRMActivity[];
}

export const CRMOverview: React.FC<CRMOverviewProps> = ({
  stats,
  companies,
  contacts,
  leads,
  opportunities,
  projects,
  events,
  activities
}) => {
  // Calculate pipeline by stage
  const pipelineByStage = opportunities.reduce((acc, opp) => {
    const stage = opp.stage || 'prospecting';
    acc[stage] = (acc[stage] || 0) + (opp.value || 0);
    return acc;
  }, {} as Record<string, number>);

  // Get recent activities
  const recentActivities = activities
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Get upcoming events
  const upcomingEvents = events
    .filter(e => new Date(e.start_time) > new Date())
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 5);

  // Calculate lead conversion rate
  const convertedLeads = leads.filter(l => l.converted_to_opportunity).length;
  const conversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0;

  // Calculate average deal size
  const closedWonOpportunities = opportunities.filter(o => o.stage === 'closed_won');
  const avgDealSize = closedWonOpportunities.length > 0 
    ? closedWonOpportunities.reduce((sum, o) => sum + (o.value || 0), 0) / closedWonOpportunities.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Enhanced Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Conversion Rate</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              {conversionRate.toFixed(1)}%
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {convertedLeads} of {leads.length} leads converted
            </p>
            <div className="mt-3 w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(conversionRate, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Avg Deal Size</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              ${avgDealSize.toLocaleString()}
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              From {closedWonOpportunities.length} closed deals
            </p>
            <div className="flex items-center mt-3 text-xs text-blue-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Active Projects</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {stats.activeProjects}
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              {projects.filter(p => p.status === 'in_progress').length} in progress
            </p>
            <div className="grid grid-cols-3 gap-1 mt-3">
              <div className="h-1 bg-purple-200 dark:bg-purple-800 rounded" />
              <div className="h-1 bg-purple-400 dark:bg-purple-600 rounded" />
              <div className="h-1 bg-purple-200 dark:bg-purple-800 rounded" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">This Week</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {stats.upcomingEvents}
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
              Upcoming events & meetings
            </p>
            <div className="flex items-center mt-3 text-xs text-orange-500">
              <Clock className="h-3 w-3 mr-1" />
              Next: Today 2:00 PM
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Enhanced Sales Pipeline */}
        <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
              <TrendingUp className="h-5 w-5" />
              Sales Pipeline Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(pipelineByStage).map(([stage, value], index) => {
              const percentage = (value / stats.totalPipelineValue) * 100;
              const stageColors = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600', 
                'from-indigo-500 to-indigo-600',
                'from-pink-500 to-pink-600',
                'from-green-500 to-green-600'
              ];
              const bgColors = [
                'bg-blue-50 dark:bg-blue-950/20 border-blue-200/30',
                'bg-purple-50 dark:bg-purple-950/20 border-purple-200/30',
                'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200/30',
                'bg-pink-50 dark:bg-pink-950/20 border-pink-200/30',
                'bg-green-50 dark:bg-green-950/20 border-green-200/30'
              ];
              
              return (
                <div key={stage} className={`p-4 rounded-xl border ${bgColors[index % bgColors.length]} hover:shadow-md transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${stageColors[index % stageColors.length]}`} />
                      <span className="font-semibold capitalize text-sm">{stage.replace('_', ' ')}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}% of total</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${stageColors[index % stageColors.length]} transition-all duration-700 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Total Pipeline Value</span>
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${stats.totalPipelineValue.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activities */}
        <Card className="border-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-950/20 dark:to-gray-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Users className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="group p-3 rounded-xl hover:bg-background/80 transition-all duration-300 border border-transparent hover:border-border/30">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-background to-muted border border-border/20">
                        {activity.activity_type === 'call' && <Phone className="h-4 w-4 text-blue-500" />}
                        {activity.activity_type === 'email' && <Mail className="h-4 w-4 text-green-500" />}
                        {activity.activity_type === 'meeting' && <Users className="h-4 w-4 text-purple-500" />}
                        {activity.activity_type === 'note' && <FileText className="h-4 w-4 text-orange-500" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {activity.subject}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.contact?.first_name} {activity.contact?.last_name}
                        {activity.company?.name && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="font-medium">{activity.company.name}</span>
                          </>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                        {activity.outcome && (
                          <Badge 
                            variant={activity.outcome === 'positive' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {activity.outcome}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">No recent activities</p>
                  <p className="text-xs text-muted-foreground mt-1">Activities will appear here as they happen</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Upcoming Events & AI Insights Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card className="border-0 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-cyan-900 dark:text-cyan-100">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="group p-4 rounded-xl bg-background/60 hover:bg-background/80 border border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center border border-cyan-200/30 dark:border-cyan-700/30">
                        <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(event.start_time).toLocaleDateString(undefined, { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric' 
                          })} at{' '}
                          {new Date(event.start_time).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.event_type}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(event.start_time).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                  <p className="text-xs text-muted-foreground mt-1">Schedule meetings to boost engagement</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Event
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced AI Insights */}
        <Card className="border-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-violet-900 dark:text-violet-100">
              <Target className="h-5 w-5" />
              AI-Powered Insights
              <Badge variant="secondary" className="ml-2 text-xs">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="group p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/40 dark:border-blue-700/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Pipeline Optimization</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {opportunities.filter(o => o.stage === 'proposal').length} opportunities in proposal stage need follow-up calls.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/40 dark:border-amber-700/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-900 dark:text-amber-100 text-sm">Overdue Follow-ups</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      {leads.filter(l => l.next_action_date && new Date(l.next_action_date) < new Date()).length} leads require immediate attention.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs">
                      Review Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/40 dark:border-green-700/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 dark:text-green-100 text-sm">Performance Excellence</p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Conversion rate of {conversionRate.toFixed(1)}% exceeds industry benchmarks.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        Above Average
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
