/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RealTimeAgentMonitor } from '../autonomous/RealTimeAgentMonitor';
import { WebsiteBuilderMonitor } from '../autonomous/WebsiteBuilderMonitor';
import { LivePageUpdater } from '../autonomous/LivePageUpdater';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TMS Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your Transportation Management System
          </p>
        </div>

        {/* Live Update Indicator - Added by Autonomous Agent */}
        <Card className="border-green-200 bg-green-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              🔄 Live Website Updates Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 mb-2">
              This website is being updated in real-time by autonomous agents
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates: Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Last Update: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-700">
              🔥 This indicator was added by autonomous agent at {new Date().toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/shipments')}
                className="w-full justify-start"
              >
                📦 Manage Shipments
              </Button>
              <Button 
                onClick={() => navigate('/routes')}
                className="w-full justify-start"
              >
                🗺️ View Routes
              </Button>
              <Button 
                onClick={() => navigate('/analytics')}
                className="w-full justify-start"
              >
                📊 Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Autonomous Agents</span>
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">System Health</span>
                  <Badge variant="default" className="bg-blue-100 text-blue-700">
                    Optimal
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Live Updates</span>
                  <Badge variant="default" className="bg-purple-100 text-purple-700">
                    Enabled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Autonomous System Monitors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RealTimeAgentMonitor />
          <WebsiteBuilderMonitor />
          <LivePageUpdater />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;