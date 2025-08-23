import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { PieChart } from 'lucide-react';

interface CustomReportsProps {}

const CustomReports: React.FC<CustomReportsProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Custom Reports
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Custom report builder, query interface, visualization tools
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Reports</CardTitle>
          <CardDescription>Custom report builder, query interface, visualization tools</CardDescription>
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
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Custom Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Custom report builder, query interface, visualization tools
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Report Builder</Badge>
                <Badge variant="outline">Query Interface</Badge>
                <Badge variant="outline">Visualization Tools</Badge>
              </div>
              <Button className="mt-6">
                Configure Custom Reports
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomReports;
