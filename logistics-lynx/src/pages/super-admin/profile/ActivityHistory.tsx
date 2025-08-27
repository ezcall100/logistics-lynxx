import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
const ActivityHistory = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'login',
      description: 'Successfully logged in from New York, NY',
      timestamp: '2024-01-15 14:30:00',
      status: 'success',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 2,
      type: 'settings',
      description: 'Updated notification preferences',
      timestamp: '2024-01-15 13:45:00',
      status: 'info',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 3,
      type: 'login',
      description: 'Failed login attempt from unknown location',
      timestamp: '2024-01-15 12:15:00',
      status: 'warning',
      ipAddress: '203.0.113.45',
      device: 'Unknown'
    },
    {
      id: 4,
      type: 'profile',
      description: 'Updated personal information',
      timestamp: '2024-01-14 16:20:00',
      status: 'success',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 5,
      type: 'security',
      description: 'Two-factor authentication enabled',
      timestamp: '2024-01-14 10:30:00',
      status: 'success',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return '🔐';
      case 'settings': return '⚙️';
      case 'profile': return '👤';
      case 'security': return '🔒';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity History</h1>
          <p className="text-gray-600 mt-2">
            View your recent account activity and login history
          </p>
        </div>
        <EnhancedButton variant="outline">
          Export Activity Log
      </div>

      <div className="grid gap-6">
        {/* Activity Summary */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Activity Summary
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Overview of your recent account activity
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-green-600">Successful Logins</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-yellow-600">Failed Attempts</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-blue-600">Settings Changes</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-purple-600">Security Updates</div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Recent Activity */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📋
              </div>
              Recent Activity
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your latest account activities and events
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{getTypeIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.timestamp}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>IP: {activity.ipAddress}</span>
                      <span>Device: {activity.device}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
                Load More Activity
            </div>
          </div>
        </ResponsiveCard>

        {/* Security Alerts */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🚨
              </div>
              Security Alerts
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Important security-related activities
            </p>
          </div>
          <div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">⚠️</span>
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Failed login attempt from unknown location
                    </p>
                    <p className="text-xs text-red-600">
                      IP: 203.0.113.45 • 2024-01-15 12:15:00
                    </p>
                  </div>
                </div>
                  Review
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default ActivityHistory;
