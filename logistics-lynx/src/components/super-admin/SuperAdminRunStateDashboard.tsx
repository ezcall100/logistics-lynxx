/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';

interface SystemStatus {
  killSwitch: boolean;
  mode: 'OFF' | 'PARTIAL' | 'FULL';
  uptime: number;
  successRate: number;
  p95ResponseTime: number;
  concurrentAgents: number;
  pagesPerHour: number;
  dlqDepth: number;
  replaySuccess: number;
  quarantineCount: number;
  backupStatus: string;
  replicationLag: number;
  failoverReadiness: string;
}

const SuperAdminRunStateDashboard = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    killSwitch: false,
    mode: 'FULL',
    uptime: 99.97,
    successRate: 98.5,
    p95ResponseTime: 1.8,
    concurrentAgents: 187,
    pagesPerHour: 847,
    dlqDepth: 12,
    replaySuccess: 94.2,
    quarantineCount: 3,
    backupStatus: 'HEALTHY',
    replicationLag: 0.3,
    failoverReadiness: 'READY'
  });

  const [isEmergencyStop, setIsEmergencyStop] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        uptime: prev.uptime + (Math.random() - 0.5) * 0.01,
        successRate: prev.successRate + (Math.random() - 0.5) * 0.2,
        p95ResponseTime: prev.p95ResponseTime + (Math.random() - 0.5) * 0.1,
        concurrentAgents: Math.max(0, Math.min(250, prev.concurrentAgents + Math.floor((Math.random() - 0.5) * 10))),
        pagesPerHour: Math.max(0, Math.min(1000, prev.pagesPerHour + Math.floor((Math.random() - 0.5) * 50))),
        dlqDepth: Math.max(0, Math.min(100, prev.dlqDepth + Math.floor((Math.random() - 0.5) * 5))),
        replaySuccess: prev.replaySuccess + (Math.random() - 0.5) * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyStop = () => {
    setIsEmergencyStop(true);
    setSystemStatus(prev => ({ ...prev, killSwitch: true, mode: 'OFF' }));
    
    // Simulate emergency stop
    setTimeout(() => {
      alert('🚨 EMERGENCY STOP ACTIVATED - All autonomous operations halted immediately!');
    }, 100);
  };

  const handleEmergencyResume = () => {
    setIsEmergencyStop(false);
    setSystemStatus(prev => ({ ...prev, killSwitch: false, mode: 'FULL' }));
  };

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-green-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return <Badge className="bg-green-100 text-green-800">HEALTHY</Badge>;
    if (value >= thresholds.warning) return <Badge className="bg-yellow-100 text-yellow-800">WARNING</Badge>;
    return <Badge className="bg-red-100 text-red-800">CRITICAL</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Super Admin Run State Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Real-time oversight of autonomous platform operations
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Live Updates Active</span>
            </div>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="mb-8">
          <Alert className={isEmergencyStop ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <AlertDescription className="flex items-center justify-between">
              <span className="font-semibold">
                {isEmergencyStop ? "🚨 EMERGENCY STOP ACTIVE" : "✅ System Running Normally"}
              </span>
              <div className="flex gap-2">
                {!isEmergencyStop ? (
                  <Button 
                    onClick={handleEmergencyStop}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    🔴 EMERGENCY STOP
                  </Button>
                ) : (
                  <Button 
                    onClick={handleEmergencyResume}
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    🟢 RESUME OPERATIONS
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Dashboard Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Kill Switch Tile */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                🚨 Kill Switch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Status:</span>
                  <Badge className={systemStatus.killSwitch ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                    {systemStatus.killSwitch ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Mode:</span>
                  <span className="text-sm font-medium">{systemStatus.mode}</span>
                </div>
                <div className="text-xs text-red-600 mt-2">
                  Emergency stop halts all autonomous operations immediately
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mode Tile */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                🎯 Autonomous Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Current Mode:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {systemStatus.mode}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Agents Active:</span>
                  <span className="text-sm font-medium">{systemStatus.concurrentAgents}/250</span>
                </div>
                <Progress value={(systemStatus.concurrentAgents / 250) * 100} className="h-2" />
                <div className="text-xs text-green-600 mt-2">
                  Full mode enables complete autonomous operation
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SLOs Tile */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                📊 SLOs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">Uptime:</span>
                  <span className={`text-sm font-medium ${getStatusColor(systemStatus.uptime, { warning: 99.9, critical: 99.95 })}`}>
                    {systemStatus.uptime.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">Success Rate:</span>
                  <span className={`text-sm font-medium ${getStatusColor(systemStatus.successRate, { warning: 97, critical: 98 })}`}>
                    {systemStatus.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">P95 Response:</span>
                  <span className={`text-sm font-medium ${getStatusColor(systemStatus.p95ResponseTime, { warning: 2.0, critical: 2.5 })}`}>
                    {systemStatus.p95ResponseTime.toFixed(1)}s
                  </span>
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  Service Level Objectives monitoring
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budgets Tile */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                💰 Budgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600">Concurrent Agents:</span>
                  <span className="text-sm font-medium">{systemStatus.concurrentAgents}/250</span>
                </div>
                <Progress value={(systemStatus.concurrentAgents / 250) * 100} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600">Pages/Hour:</span>
                  <span className="text-sm font-medium">{systemStatus.pagesPerHour}/1000</span>
                </div>
                <Progress value={(systemStatus.pagesPerHour / 1000) * 100} className="h-2" />
                <div className="text-xs text-orange-600 mt-2">
                  Resource utilization and rate limits
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replay Tile */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                🔄 Replay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">DLQ Depth:</span>
                  <span className="text-sm font-medium">{systemStatus.dlqDepth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">Replay Success:</span>
                  <span className={`text-sm font-medium ${getStatusColor(systemStatus.replaySuccess, { warning: 90, critical: 95 })}`}>
                    {systemStatus.replaySuccess.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">Quarantine:</span>
                  <span className="text-sm font-medium">{systemStatus.quarantineCount}</span>
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Dead letter queue and replay management
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DR Posture Tile */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                🛡️ DR Posture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-600">Backup Status:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {systemStatus.backupStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-600">Replication Lag:</span>
                  <span className="text-sm font-medium">{systemStatus.replicationLag}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-600">Failover:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {systemStatus.failoverReadiness}
                  </Badge>
                </div>
                <div className="text-xs text-yellow-600 mt-2">
                  Disaster recovery readiness
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  📊 View Detailed Metrics
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  🔍 Open Trace
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📋 System Logs
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  ⚙️ Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Summary */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>System Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Autonomous Agents</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Active:</span>
                      <span className="font-medium">{systemStatus.concurrentAgents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max:</span>
                      <span className="font-medium">250</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization:</span>
                      <span className="font-medium">{((systemStatus.concurrentAgents / 250) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">{systemStatus.uptime.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium">{systemStatus.successRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>P95 Response:</span>
                      <span className="font-medium">{systemStatus.p95ResponseTime.toFixed(1)}s</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Operations</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Pages/Hour:</span>
                      <span className="font-medium">{systemStatus.pagesPerHour}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DLQ Depth:</span>
                      <span className="font-medium">{systemStatus.dlqDepth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quarantine:</span>
                      <span className="font-medium">{systemStatus.quarantineCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminRunStateDashboard;
