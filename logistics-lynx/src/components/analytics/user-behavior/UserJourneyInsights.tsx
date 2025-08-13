
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CommonPath, DropoffPoint } from './types';

interface UserJourneyInsightsProps {
  commonPaths: CommonPath[];
  dropoffPoints: DropoffPoint[];
}

export const UserJourneyInsights: React.FC<UserJourneyInsightsProps> = ({ commonPaths, dropoffPoints }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Journey Insights</CardTitle>
        <CardDescription>
          Common user paths and behavior patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Most Common Paths</h4>
            <div className="space-y-2">
              {commonPaths.slice(0, 5).map((path, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="text-sm">{path.route}</div>
                  <Badge variant="outline">{path.frequency}%</Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Drop-off Points</h4>
            <div className="space-y-2">
              {dropoffPoints.slice(0, 5).map((point, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="text-sm">{point.page}</div>
                  <Badge variant="outline" className="text-red-600">{point.dropoffRate}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
