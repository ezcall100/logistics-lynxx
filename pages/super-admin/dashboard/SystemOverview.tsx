import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { LayoutDashboard } from 'lucide-react';

interface SystemOverviewProps {}

const SystemOverview: React.FC<SystemOverviewProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            System Overview
          </h1>
        </div>
        <p className="text-gray-600">
          Real-time system health, uptime, performance metrics
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Real-time system health, uptime, performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <LayoutDashboard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                System Overview
              </h3>
              <p className="text-gray-600 mt-2">
                Real-time system health, uptime, performance metrics
              </p>
              <div className="mt-4 space-y-2 flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Realtime Metrics</Badge>
                <Badge variant="outline">System Health</Badge>
                <Badge variant="outline">Performance Charts</Badge>
              </div>
              <Button className="mt-6" variant="default">
                Configure System Overview
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
