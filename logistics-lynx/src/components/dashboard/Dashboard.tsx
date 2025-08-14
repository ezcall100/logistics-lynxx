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
        
        {/* Live Modification Indicator - Added by Autonomous Agent */}
        <Card className="border-orange-200 bg-orange-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              🔄 Live Website Updates Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-600 mb-2">
              This website is being updated in real-time by autonomous agents
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Live Updates: 53</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Last Update: 9:01:21 AM</span>
              </div>
            </div>
          </CardContent>
        </Card></div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Badge variant="secondary">Live</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Badge variant="secondary">Monthly</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Carriers</CardTitle>
              <Badge variant="secondary">Online</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Badge variant="default" className="bg-green-500">Healthy</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portal Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="default" 
                className="h-16 flex-col"
                onClick={() => navigate('/broker')}
              >
                <span className="text-lg">Broker</span>
                <span className="text-xs">Freight Management</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/carrier')}
              >
                <span className="text-lg">Carrier</span>
                <span className="text-xs">Fleet Operations</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/driver')}
              >
                <span className="text-lg">Driver</span>
                <span className="text-xs">Mobile Interface</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/shipper')}
              >
                <span className="text-lg">Shipper</span>
                <span className="text-xs">Booking & Tracking</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/admin')}
              >
                <span className="text-lg">Admin</span>
                <span className="text-xs">System Management</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/super-admin')}
              >
                <span className="text-lg">Super Admin</span>
                <span className="text-xs">Full System Control</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/analytics')}
              >
                <span className="text-lg">Analytics</span>
                <span className="text-xs">Data Insights</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/autonomous')}
              >
                <span className="text-lg">Autonomous</span>
                <span className="text-xs">AI Management</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/factoring')}
              >
                <span className="text-lg">Factoring</span>
                <span className="text-xs">Financial Services</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => navigate('/owner-operator')}
              >
                <span className="text-lg">Owner-Operator</span>
                <span className="text-xs">Business Management</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Agent Monitor */}
        <div className="mt-8">
          <RealTimeAgentMonitor />
        </div>

        {/* Website Builder Monitor */}
        <div className="mt-8">
          <WebsiteBuilderMonitor />
        </div>

        {/* Live Page Updater */}
        <div className="mt-8">
          <LivePageUpdater />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;