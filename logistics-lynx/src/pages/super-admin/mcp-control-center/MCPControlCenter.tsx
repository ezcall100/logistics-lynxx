import React from 'react';
import { ResponsiveCard, EnhancedButton } from '../../../components/ui';

const MCPControlCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">🤖 MCP Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Agents</h3>
            <p className="text-3xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-600">All agents operational</p>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Tasks Completed</h3>
            <p className="text-3xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600">Today's completed tasks</p>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Load</h3>
            <p className="text-3xl font-bold text-orange-600">67%</p>
            <p className="text-sm text-gray-600">Optimal performance</p>
          </div>
        </ResponsiveCard>
      </div>

      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Management</h2>
          <p className="text-gray-600 mb-4">
            Monitor and control MCP agents across the system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Agent Status</h4>
              <p className="text-sm text-green-700">All agents running normally</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Task Queue</h4>
              <p className="text-sm text-blue-700">45 tasks pending</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default MCPControlCenter;
