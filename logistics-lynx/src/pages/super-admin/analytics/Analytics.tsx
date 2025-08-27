import React from 'react';
import { ResponsiveCard } from '../../../components/ui';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">📈 Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600">+12% from last month</p>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-600">892</p>
            <p className="text-sm text-gray-600">+8% from last hour</p>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$45,678</p>
            <p className="text-sm text-gray-600">+15% from last week</p>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Health</h3>
            <p className="text-3xl font-bold text-orange-600">98%</p>
            <p className="text-sm text-gray-600">All systems operational</p>
          </div>
        </ResponsiveCard>
      </div>

      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <p className="text-gray-600 mb-4">
            Comprehensive analytics and insights for the TransBot AI system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Performance Metrics</h4>
              <p className="text-sm text-blue-700">Real-time system performance tracking</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Usage Analytics</h4>
              <p className="text-sm text-green-700">User behavior and engagement data</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Business Intelligence</h4>
              <p className="text-sm text-purple-700">Revenue and growth analytics</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default Analytics;
