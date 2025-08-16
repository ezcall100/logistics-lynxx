/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Wifi, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Zap,
  Brain
} from 'lucide-react';

interface LiveUpdate {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  agentType: string;
  updateNumber: number;
}

export const SimpleLiveUpdate = () => {
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);
  const [updateCounter, setUpdateCounter] = useState(3);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Generate live updates immediately
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdateTime(now);
      setUpdateCounter(prev => prev + 1);

      // Create new live update
      const agentTypes = ['UI Builder', 'Data Processor', 'Security Agent', 'Optimization Agent', 'Testing Agent', 'Deployment Agent'];
      const activities = [
        'Enhanced user interface components',
        'Optimized database queries',
        'Improved system performance',
        'Updated security protocols',
        'Completed automated testing',
        'Deployed new features',
        'Analyzed user behavior patterns',
        'Optimized route algorithms',
        'Enhanced mobile responsiveness',
        'Improved API response times',
        'Fixed authentication system',
        'Updated navigation components',
        'Enhanced form validation',
        'Optimized image loading',
        'Improved error handling'
      ];

      const newUpdate: LiveUpdate = {
        id: `update-${Date.now()}`,
        title: `${agentTypes[Math.floor(Math.random() * agentTypes.length)]} Activity`,
        description: activities[Math.floor(Math.random() * activities.length)],
        timestamp: now,
        status: Math.random() > 0.8 ? 'warning' : 'success',
        agentType: agentTypes[Math.floor(Math.random() * agentTypes.length)],
        updateNumber: updateCounter + 1
      };

      setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [updateCounter]);

  const getStatusIcon = (status: LiveUpdate['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: LiveUpdate['status']) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      {/* Live Status Header */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Live Update Active</span>
              </div>
              <Badge variant="default" className="bg-green-600">
                SIMULATION MODE
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-800">
                Last Update: {formatTime(lastUpdateTime)}
              </div>
              <div className="text-sm text-green-600">
                Update#{updateCounter}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Updates Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Autonomous Agent Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveUpdates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2" />
              <p>Initializing autonomous agents...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {liveUpdates.map((update) => (
                <div
                  key={update.id}
                  className={`p-3 rounded-lg border ${getStatusColor(update.status)} transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(update.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{update.title}</span>
                          <Badge variant="outline" className="text-xs">
                            Update#{update.updateNumber}
                          </Badge>
                        </div>
                        <p className="text-sm opacity-90">{update.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs opacity-75">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(update.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            {update.agentType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-muted-foreground">Active Agents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{liveUpdates.length}</div>
                <div className="text-xs text-muted-foreground">Live Updates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <div>
                <div className="text-2xl font-bold">{updateCounter}</div>
                <div className="text-xs text-muted-foreground">Tasks Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
