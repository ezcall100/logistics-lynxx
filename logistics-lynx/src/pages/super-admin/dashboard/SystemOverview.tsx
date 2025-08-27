import React from 'react';

const SystemOverview: React.FC = () => {
  console.log('🔍 SystemOverview: Component rendering...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🛰️ Super Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            TransBot AI - Enterprise System Control Center
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">System Health</p>
                <p className="text-3xl font-bold text-green-600">98%</p>
              </div>
              <span className="text-3xl">🏥</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Users</p>
                <p className="text-3xl font-bold text-blue-600">1,247</p>
              </div>
              <span className="text-3xl">👥</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">MCP Agents</p>
                <p className="text-3xl font-bold text-purple-600">24</p>
              </div>
              <span className="text-3xl">🤖</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Response Time</p>
                <p className="text-3xl font-bold text-orange-600">45ms</p>
              </div>
              <span className="text-3xl">⚡</span>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <a href="/super-admin-test/alerts" className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg p-6 border border-red-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚨</span>
              <h3 className="text-xl font-semibold mb-2">System Alerts</h3>
              <p className="text-red-100">Monitor system alerts and notifications</p>
            </div>
          </a>

          <a href="/super-admin-test/revenue" className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg p-6 border border-green-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">💰</span>
              <h3 className="text-xl font-semibold mb-2">Revenue Metrics</h3>
              <p className="text-green-100">Track revenue and financial performance</p>
            </div>
          </a>

          <a href="/super-admin-test/users" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg p-6 border border-blue-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">👥</span>
              <h3 className="text-xl font-semibold mb-2">Active Users</h3>
              <p className="text-blue-100">Monitor user activity and engagement</p>
            </div>
          </a>

          <a href="/super-admin-test/performance" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-lg p-6 border border-cyan-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">📊</span>
              <h3 className="text-xl font-semibold mb-2">Performance Monitor</h3>
              <p className="text-cyan-100">System performance and metrics</p>
            </div>
          </a>

          <a href="/super-admin-test/analytics" className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg p-6 border border-teal-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">📈</span>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-teal-100">Advanced analytics and insights</p>
            </div>
          </a>

          <a href="/super-admin-test/portals" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg p-6 border border-emerald-200 transition-colors">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🌐</span>
              <h3 className="text-xl font-semibold mb-2">Portal Management</h3>
              <p className="text-emerald-100">Manage all portal configurations</p>
            </div>
          </a>
        </div>
                      
        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔄 System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Database: Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">API Server: Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">MCP Agents: Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Security: Enabled</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🔄 Refresh System
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🛠️ Maintenance Mode
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              💾 Create Backup
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              🤖 Restart Agents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;
