import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

const ReportsPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate reports and analyze system data</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">📊 Reports</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Reports and analytics interface - generate comprehensive reports and analyze system performance.</p>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800">📊 Comprehensive reporting system available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
