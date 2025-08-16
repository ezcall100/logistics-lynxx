/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SessionTimelineItem } from './types';

interface SessionActivityTimelineProps {
  sessionTimeline: SessionTimelineItem[];
}

export const SessionActivityTimeline: React.FC<SessionActivityTimelineProps> = ({ sessionTimeline }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Activity Timeline</CardTitle>
        <CardDescription>
          User activity patterns throughout the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sessionTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sessions" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Active Sessions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
