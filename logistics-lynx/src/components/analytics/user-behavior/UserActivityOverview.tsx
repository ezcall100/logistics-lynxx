/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MousePointer, Clock, Navigation } from 'lucide-react';
import { SessionMetrics } from './types';

interface UserActivityOverviewProps {
  sessionMetrics?: SessionMetrics;
}

export const UserActivityOverview: React.FC<UserActivityOverviewProps> = ({ sessionMetrics }) => {
  const metrics = sessionMetrics || {
    activeUsers: 0,
    userGrowth: 0,
    avgSessionDuration: 0,
    sessionTrend: 'stable',
    totalInteractions: 0,
    interactionIncrease: 0,
    avgPageViews: 0,
    navigationDepth: 'standard'
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{metrics.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="text-xs text-green-600">+{metrics.userGrowth}% growth</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{formatDuration(metrics.avgSessionDuration)}</div>
              <div className="text-sm text-muted-foreground">Avg Session</div>
              <div className="text-xs text-blue-600">{metrics.sessionTrend}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <MousePointer className="h-8 w-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{metrics.totalInteractions}</div>
              <div className="text-sm text-muted-foreground">Interactions</div>
              <div className="text-xs text-green-600">+{metrics.interactionIncrease}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Navigation className="h-8 w-8 text-orange-500" />
            <div>
              <div className="text-2xl font-bold">{metrics.avgPageViews}</div>
              <div className="text-sm text-muted-foreground">Pages/Session</div>
              <div className="text-xs text-purple-600">{metrics.navigationDepth}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
