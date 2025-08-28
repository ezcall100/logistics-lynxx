import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
const FABOverview = () => {
  const [fabStats] = useState({
    totalActions: 24,
    activeActions: 18,
    customActions: 8,
    usageCount: 156
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Overview</h1>
          <p className="text-gray-600 mt-2">
            Manage your Floating Action Button configurations and actions
          </p>
        </div>
        <Button>
          Create New Action
        </Button>
      </div>

      <div className="grid gap-6">
        {/* FAB Statistics */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              FAB Statistics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Overview of your FAB usage and configurations
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{fabStats.totalActions}</div>
                <div className="text-sm text-blue-600">Total Actions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{fabStats.activeActions}</div>
                <div className="text-sm text-green-600">Active Actions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{fabStats.customActions}</div>
                <div className="text-sm text-purple-600">Custom Actions</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{fabStats.usageCount}</div>
                <div className="text-sm text-orange-600">Total Usage</div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Quick Actions */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              Quick Actions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Most frequently used FAB actions
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📝</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Create Order</h4>
                    <p className="text-sm text-gray-600">Used 45 times</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">🚚</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Add Shipment</h4>
                    <p className="text-sm text-gray-600">Used 32 times</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">👤</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">New Contact</h4>
                    <p className="text-sm text-gray-600">Used 28 times</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quick Report</h4>
                    <p className="text-sm text-gray-600">Used 22 times</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">🔔</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Send Alert</h4>
                    <p className="text-sm text-gray-600">Used 18 times</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">⚙️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Settings</h4>
                    <p className="text-sm text-gray-600">Used 11 times</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Recent Activity */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                📋
              </div>
              Recent FAB Activity
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your recent FAB action usage
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {[
                { action: 'Create Order', time: '2 minutes ago', user: 'John Doe' },
                { action: 'Add Shipment', time: '5 minutes ago', user: 'Jane Smith' },
                { action: 'New Contact', time: '12 minutes ago', user: 'John Doe' },
                { action: 'Quick Report', time: '1 hour ago', user: 'Mike Johnson' },
                { action: 'Send Alert', time: '2 hours ago', user: 'Sarah Wilson' }
              ].map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default FABOverview;
