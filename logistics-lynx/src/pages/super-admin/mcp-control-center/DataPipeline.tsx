import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { GitBranch } from 'lucide-react';

interface DataPipelineProps {}

const DataPipeline: React.FC<DataPipelineProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Data Pipeline
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Data ingestion, processing, quality monitoring
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Data Pipeline</CardTitle>
          <CardDescription>Data ingestion, processing, quality monitoring</CardDescription>
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
              <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Pipeline
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Data ingestion, processing, quality monitoring
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Data Ingestion</Badge>
                <Badge variant="outline">Data Processing</Badge>
                <Badge variant="outline">Quality Monitoring</Badge>
              </div>
              <Button className="mt-6">
                Configure Data Pipeline
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPipeline;
