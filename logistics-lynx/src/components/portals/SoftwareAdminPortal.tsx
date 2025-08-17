import React from 'react';

export default function SoftwareAdminPortal() {
  console.log('SoftwareAdminPortal component loaded successfully!');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Software Admin Portal</h1>
              <p className="text-slate-600 mt-2">Full autonomous agent authority enabled</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Agents</p>
                <p className="text-2xl font-bold text-blue-600">250+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">⚡</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Response Time</p>
                <p className="text-2xl font-bold text-purple-600">~150ms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Alerts</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Access</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-blue-600">👥</span>
                <span className="font-medium">Relationships</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-green-600">🛟</span>
                <span className="font-medium">Service Desk</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-purple-600">🌐</span>
                <span className="font-medium">Networks</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <span className="text-orange-600">👷</span>
                <span className="font-medium">Workforce</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Services</span>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Autonomous Agents</span>
                <span className="text-sm font-medium text-green-600">250+ Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Real-time Updates</span>
                <span className="text-sm font-medium text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New support ticket created</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Autonomous agent completed task</p>
                <p className="text-xs text-slate-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-slate-500">15 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
