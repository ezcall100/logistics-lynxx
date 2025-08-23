import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { DollarSign } from 'lucide-react';

interface RevenueMetricsProps {}

const RevenueMetrics: React.FC<RevenueMetricsProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Revenue Metrics
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          MRR, ARR, subscription analytics, financial KPIs
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Metrics</CardTitle>
          <CardDescription>MRR, ARR, subscription analytics, financial KPIs</CardDescription>
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
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Metrics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                MRR, ARR, subscription analytics, financial KPIs
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Revenue Charts</Badge>
                <Badge variant="outline">Subscription Metrics</Badge>
                <Badge variant="outline">Financial Kpis</Badge>
              </div>
              <Button className="mt-6">
                Configure Revenue Metrics
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueMetrics;
