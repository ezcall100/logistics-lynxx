import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../admin/AdminSidebar';
import FloatingActionButton from '../admin/FloatingActionButton';
import {
  Bell, Search, Plus, Settings, User, ChevronDown,
  Activity, TrendingUp, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';

export default function SoftwareAdminPortal() {
  console.log('SoftwareAdminPortal component loaded successfully!');
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Enhanced Left Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        userRole="admin"
        userEntitlements={['admin.core', 'crm.core', 'tickets.core', 'networks.core', 'workforce.core', 'docs.core', 'financials.core', 'payroll.core', 'api.core', 'marketplace.core', 'reports.core', 'edi.x12']}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              <span className="text-sm font-medium">Trans Bot AI</span>
              <span className="text-slate-400">▼</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Command Palette */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
              <Search size={16} />
              <span>Search...</span>
              <kbd className="text-xs bg-slate-200 px-1 rounded">⌘K</kbd>
            </button>

            {/* Quick Add */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Plus size={16} />
                <span>Quick Add</span>
              </button>
              {showQuickAdd && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Lead</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Contact</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Opportunity</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Ticket</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Invoice</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Load</a>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <Settings size={20} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Admin User</span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Software Admin</h1>
            <p className="text-slate-600">Manage your system, users, and configurations from one central location.</p>
          </div>

          {/* System Health Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">System Status</p>
                  <p className="text-lg font-semibold text-green-600">Healthy</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Uptime</p>
                  <p className="text-lg font-semibold text-blue-600">99.9%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Agents</p>
                  <p className="text-lg font-semibold text-purple-600">250+</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Alerts</p>
                  <p className="text-lg font-semibold text-orange-600">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
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

          {/* Autonomous Agent Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Autonomous Agent Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <TrendingUp size={32} className="text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">250+</p>
                <p className="text-sm text-green-700">Active Agents</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Activity size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">98.5%</p>
                <p className="text-sm text-blue-700">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <Clock size={32} className="text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">~150ms</p>
                <p className="text-sm text-purple-700">Response Time</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        userRole="admin"
        userEntitlements={['admin.core', 'crm.core', 'tickets.core', 'networks.core', 'workforce.core', 'docs.core', 'financials.core', 'payroll.core', 'api.core', 'marketplace.core', 'reports.core', 'edi.x12']}
        isAdmin={true}
      />
    </div>
  );
}
