import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FABAnalytics = () => {
  const [analytics] = useState({
    totalClicks: 1247,
    successRate: 89,
    avgResponseTime: 2.3,
    activeActions: 15,
    topActions: [
      { name: 'Create Order', clicks: 245, success: 98 },
      { name: 'Add Shipment', clicks: 189, success: 95 },
      { name: 'New Contact', clicks: 156, success: 92 },
      { name: 'Quick Report', clicks: 134, success: 88 }
    ]
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track performance and usage metrics for your floating action buttons
          </p>
        </div>
        <Button variant="outline">
          Export Data
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Key Metrics
            </CardTitle>
            <CardDescription>
              Overview of FAB performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analytics.totalClicks}</div>
                <div className="text-sm text-blue-600">Total Clicks</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analytics.successRate}%</div>
                <div className="text-sm text-green-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analytics.avgResponseTime}s</div>
                <div className="text-sm text-purple-600">Avg Response</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{analytics.activeActions}</div>
                <div className="text-sm text-orange-600">Active Actions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ⭐
              </div>
              Top Performing Actions
            </CardTitle>
            <CardDescription>
              Most frequently used and successful FAB actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{action.name}</h4>
                      <p className="text-sm text-gray-600">{action.clicks} total clicks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{action.success}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {action.success >= 95 ? 'Excellent' : 
                       action.success >= 90 ? 'Good' : 'Fair'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                📈
              </div>
              Usage Trends
            </CardTitle>
            <CardDescription>
              FAB usage patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    📅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Daily Usage</h4>
                    <p className="text-sm text-gray-600">Average clicks per day</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">156</div>
                  <div className="text-sm text-green-600">+12% from last week</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    🕐
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Peak Hours</h4>
                    <p className="text-sm text-gray-600">Most active time periods</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">2-4 PM</div>
                  <div className="text-sm text-gray-600">Business hours</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Device Usage</h4>
                    <p className="text-sm text-gray-600">Usage by device type</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">Desktop</div>
                  <div className="text-sm text-gray-600">67% of total usage</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                💡
              </div>
              Performance Insights
            </CardTitle>
            <CardDescription>
              Recommendations for improving FAB performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">High Success Rate</h4>
                  <p className="text-sm text-gray-600">
                    Your FAB actions have an excellent 89% success rate, indicating good user experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Fast Response Time</h4>
                  <p className="text-sm text-gray-600">
                    Average response time of 2.3 seconds is within optimal range for user satisfaction.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Usage Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Consider adding more actions during peak hours (2-4 PM) to capitalize on high usage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FABAnalytics;
