import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface DashboardPageProps {
  systemStats: {
    users: number;
    portals: number;
    health: number;
    security: string;
    uptime: string;
    responseTime: string;
  };
  notifications: Array<{
    id: number;
    type: string;
    message: string;
    time: string;
  }>;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ systemStats, notifications }) => {
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
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">System Health</p>
                <p className="text-lg font-semibold text-green-600">{systemStats.health}%</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">🛡️</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Security Score</p>
                <p className="text-lg font-semibold text-orange-600">{systemStats.security}</p>
                <p className="text-xs text-green-600">No vulnerabilities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{quickStats.activeSessions}</div>
              <p className="text-sm text-slate-600">Active Sessions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{quickStats.pendingApprovals}</div>
              <p className="text-sm text-slate-600">Pending Approvals</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{quickStats.systemAlerts}</div>
              <p className="text-sm text-slate-600">System Alerts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{quickStats.apiRequests.toLocaleString()}</div>
              <p className="text-sm text-slate-600">API Requests (24h)</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="h-20 flex-col bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span className="text-xl mb-1">🔒</span>
            <span className="text-sm font-medium">Security Audit</span>
            <span className="text-xs opacity-90">System Security</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
          >
            <span className="text-xl mb-1">💾</span>
            <span className="text-sm font-medium">Database Backup</span>
            <span className="text-xs opacity-90">Data Protection</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
          >
            <span className="text-xl mb-1">🔄</span>
            <span className="text-sm font-medium">System Update</span>
            <span className="text-xs opacity-90">Version Control</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
          >
            <span className="text-xl mb-1">🔌</span>
            <span className="text-sm font-medium">API Management</span>
            <span className="text-xs opacity-90">Integration Control</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col bg-gradient-to-br from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
          >
            <span className="text-xl mb-1">📝</span>
            <span className="text-sm font-medium">Log Analysis</span>
            <span className="text-xs opacity-90">System Monitoring</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
          >
            <span className="text-xl mb-1">🚨</span>
            <span className="text-sm font-medium">Emergency Mode</span>
            <span className="text-xs opacity-90">Crisis Management</span>
          </Button>
        </div>
      </motion.div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'security' ? 'bg-green-500' :
                  activity.type === 'system' ? 'bg-purple-500' :
                  activity.type === 'access' ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">System Notifications</h2>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  notification.type === 'warning' ? 'bg-yellow-500' : 
                  notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-slate-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold mb-4">System Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{systemStats.uptime}</div>
            <p className="text-sm text-slate-600">Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{systemStats.responseTime}</div>
            <p className="text-sm text-slate-600">Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">250+</div>
            <p className="text-sm text-slate-600">Active Agents</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
