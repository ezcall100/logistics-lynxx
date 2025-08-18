import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DashboardPage: React.FC = () => {
  const [systemStats] = useState({
    users: 2847,
    portals: 7,
    health: 99.9,
    security: 'A+',
    uptime: '99.9%',
    responseTime: '45ms'
  });

  const [notifications] = useState([
    { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago' },
    { id: 3, type: 'success', message: 'New user registration approved', time: '10 min ago' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'john.doe@company.com', time: '2 min ago', type: 'user' },
    { id: 2, action: 'Security scan completed', user: 'System', time: '5 min ago', type: 'security' },
    { id: 3, action: 'Database backup completed', user: 'System', time: '15 min ago', type: 'system' },
    { id: 4, action: 'Portal access granted', user: 'admin@company.com', time: '1 hour ago', type: 'access' },
    { id: 5, action: 'System update deployed', user: 'System', time: '2 hours ago', type: 'update' }
  ]);

  const [quickStats, setQuickStats] = useState({
    activeSessions: 1247,
    pendingApprovals: 23,
    systemAlerts: 3,
    apiRequests: 15420
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome to Super Admin Portal</h1>
        <p className="text-purple-100 text-sm lg:text-base">
          Complete system control with full administrative authority. All systems operational.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white">System Online</Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">Security: A+</Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">Uptime: 99.9%</Badge>
        </div>
      </motion.div>

      {/* System Health Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">👥</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-lg font-semibold text-purple-600">{systemStats.users.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">🌐</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Portals</p>
                <p className="text-lg font-semibold text-blue-600">{systemStats.portals}/{systemStats.portals}</p>
                <p className="text-xs text-green-600">All operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">💚</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">System Health</p>
                <p className="text-lg font-semibold text-green-600">{systemStats.health}%</p>
                <p className="text-xs text-green-600">Optimal performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">🔒</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Security Score</p>
                <p className="text-lg font-semibold text-orange-600">{systemStats.security}</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                Quick Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{quickStats.activeSessions.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Active Sessions</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{quickStats.pendingApprovals}</p>
                  <p className="text-sm text-slate-600">Pending Approvals</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{quickStats.systemAlerts}</p>
                  <p className="text-sm text-slate-600">System Alerts</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{quickStats.apiRequests.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">API Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🕒</span>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'security' ? 'bg-green-500' :
                      activity.type === 'system' ? 'bg-purple-500' :
                      activity.type === 'access' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🔔</span>
              System Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                  notification.type === 'info' ? 'bg-blue-50 border border-blue-200' :
                  notification.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                  notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'info' ? 'bg-blue-500' :
                    notification.type === 'warning' ? 'bg-orange-500' :
                    notification.type === 'success' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-slate-500">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">Dismiss</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
