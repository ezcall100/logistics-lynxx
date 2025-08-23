import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Megaphone } from 'lucide-react';

interface MarketingToolsProps {}

const MarketingTools: React.FC<MarketingToolsProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Marketing Tools
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Email campaigns, marketing analytics, lead generation
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Marketing Tools</CardTitle>
          <CardDescription>Email campaigns, marketing analytics, lead generation</CardDescription>
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
              <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Marketing Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Email campaigns, marketing analytics, lead generation
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Email Campaigns</Badge>
                <Badge variant="outline">Marketing Analytics</Badge>
                <Badge variant="outline">Lead Generation</Badge>
              </div>
              <Button className="mt-6">
                Configure Marketing Tools
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingTools;
