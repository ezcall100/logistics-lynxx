import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { AlertCircle } from 'lucide-react';

interface ErrorTrackingProps {}

const ErrorTracking: React.FC<ErrorTrackingProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Error Tracking
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Application errors, crash reports, error analytics
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Error Tracking</CardTitle>
          <CardDescription>Application errors, crash reports, error analytics</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Error Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Application errors, crash reports, error analytics
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Error Tracking</Badge>
                <Badge variant="outline">Crash Reports</Badge>
                <Badge variant="outline">Error Analytics</Badge>
              </div>
              <Button className="mt-6">
                Configure Error Tracking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorTracking;
