
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserActivityOverview } from './user-behavior/UserActivityOverview';
import { FeatureUsageCharts } from './user-behavior/FeatureUsageCharts';
import { UserJourneyInsights } from './user-behavior/UserJourneyInsights';
import { SessionActivityTimeline } from './user-behavior/SessionActivityTimeline';
import { UserBehaviorData } from './user-behavior/types';

interface UserBehaviorTrackingProps {
  data: UserBehaviorData;
  timeRange: string;
  role: string;
}

const UserBehaviorTracking: React.FC<UserBehaviorTrackingProps> = ({ data, timeRange, role }) => {
  // Provide default values to prevent undefined errors
  const navigationPatterns = data?.navigationPatterns || [];
  const sessionMetrics = data?.sessionMetrics || {
    activeUsers: 0,
    userGrowth: 0,
    avgSessionDuration: 0,
    sessionTrend: 'stable',
    totalInteractions: 0,
    interactionIncrease: 0,
    avgPageViews: 0,
    navigationDepth: 'standard'
  };
  const featureUsage = data?.featureUsage || [];
  const heatmapData = data?.heatmapData || [];
  const commonPaths = data?.commonPaths || [];
  const dropoffPoints = data?.dropoffPoints || [];
  const sessionTimeline = data?.sessionTimeline || [];

  return (
    <div className="space-y-6">
      {/* User Activity Overview */}
      <UserActivityOverview sessionMetrics={sessionMetrics} />

      {/* Navigation Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Navigation Patterns
          </CardTitle>
          <CardDescription>
            User navigation flow and page transition patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={navigationPatterns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="pageViews" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Page Views"
                />
                <Line 
                  type="monotone" 
                  dataKey="uniqueViews" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Unique Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage Distribution */}
      <FeatureUsageCharts 
        featureUsage={featureUsage}
        heatmapData={heatmapData}
      />

      {/* User Journey Analysis */}
      <UserJourneyInsights 
        commonPaths={commonPaths}
        dropoffPoints={dropoffPoints}
      />

      {/* Session Activity Timeline */}
      <SessionActivityTimeline sessionTimeline={sessionTimeline} />
    </div>
  );
};

export default UserBehaviorTracking;
