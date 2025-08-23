import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Layout } from 'lucide-react';

interface DashboardBuilderProps {}

const DashboardBuilder: React.FC<DashboardBuilderProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Builder
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Custom dashboard creation, widget library, layout designer
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Builder</CardTitle>
          <CardDescription>Custom dashboard creation, widget library, layout designer</CardDescription>
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
              <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Dashboard Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Custom dashboard creation, widget library, layout designer
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Dashboard Builder</Badge>
                <Badge variant="outline">Widget Library</Badge>
                <Badge variant="outline">Layout Designer</Badge>
              </div>
              <Button className="mt-6">
                Configure Dashboard Builder
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBuilder;
