import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { Badge } from '../../../components/ui/badge.tsx';
import { DollarSign } from 'lucide-react';

interface FinancialReportsProps {}

const FinancialReports: React.FC<FinancialReportsProps> = () => {
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
            Financial Reports
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Revenue reports, cost analysis, profitability metrics
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>Revenue reports, cost analysis, profitability metrics</CardDescription>
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
                Financial Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Revenue reports, cost analysis, profitability metrics
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Revenue Reports</Badge>
                <Badge variant="outline">Cost Analysis</Badge>
                <Badge variant="outline">Profitability Metrics</Badge>
              </div>
              <Button className="mt-6">
                Configure Financial Reports
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReports;
