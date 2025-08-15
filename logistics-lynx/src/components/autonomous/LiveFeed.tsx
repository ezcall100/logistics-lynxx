import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Globe, 
  Building2, 
  Truck, 
  Users, 
  FileText, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

interface LiveOperation {
  id: string;
  timestamp: Date;
  type: 'portal_health' | 'website_build' | 'autonomous_action' | 'system_event' | 'error' | 'success';
  portal?: string;
  action: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  details: string;
  duration?: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface PortalStatus {
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  lastHealthCheck: Date;
  responseTime: number;
  uptime: number;
  activeUsers: number;
}

export default function LiveFeed() {
  const [operations, setOperations] = useState<LiveOperation[]>([]);
  const [portalStatuses, setPortalStatuses] = useState<PortalStatus[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  // Simulate real-time autonomous operations
  useEffect(() => {
    setIsConnected(true);
    
    const portals = [
      { name: 'Super Admin', key: 'superAdmin', icon: Settings },
      { name: 'Admin', key: 'admin', icon: Users },
      { name: 'TMS Admin', key: 'tmsAdmin', icon: Building2 },
      { name: 'Onboarding', key: 'onboarding', icon: Users },
      { name: 'Broker', key: 'broker', icon: Truck },
      { name: 'Shipper', key: 'shipper', icon: Building2 },
      { name: 'Carrier', key: 'carrier', icon: Truck },
      { name: 'Driver', key: 'driver', icon: Users },
      { name: 'Owner Operator', key: 'ownerOperator', icon: Users },
      { name: 'Factoring', key: 'factoring', icon: FileText },
      { name: 'Load Board', key: 'loadBoard', icon: Globe },
      { name: 'CRM', key: 'crm', icon: Users },
      { name: 'Financials', key: 'financials', icon: FileText },
      { name: 'EDI', key: 'edi', icon: FileText },
      { name: 'Marketplace', key: 'marketplace', icon: Globe },
      { name: 'Analytics', key: 'analytics', icon: Activity },
      { name: 'Autonomous', key: 'autonomous', icon: Zap },
      { name: 'Workers', key: 'workers', icon: Settings },
      { name: 'Rates', key: 'rates', icon: FileText },
      { name: 'Directory', key: 'directory', icon: Users }
    ];

    // Initialize portal statuses
    setPortalStatuses(portals.map(portal => ({
      name: portal.name,
      key: portal.key,
      status: 'active' as const,
      lastHealthCheck: new Date(),
      responseTime: Math.random() * 200 + 50,
      uptime: 99.5 + Math.random() * 0.5,
      activeUsers: Math.floor(Math.random() * 50) + 1
    })));

    // Generate real-time operations
    const operationTypes = [
      { type: 'portal_health', actions: ['Health check completed', 'Performance optimized', 'Cache refreshed'] },
      { type: 'website_build', actions: ['Page generated', 'Content updated', 'SEO optimized', 'Image processed'] },
      { type: 'autonomous_action', actions: ['Load matched', 'Rate calculated', 'Route optimized', 'Invoice processed'] },
      { type: 'system_event', actions: ['Backup completed', 'Security scan finished', 'Update deployed'] }
    ];

    const addOperation = () => {
      const operationType = operationTypes[Math.floor(Math.random() * operationTypes.length)];
      const portal = portals[Math.floor(Math.random() * portals.length)];
      const action = operationType.actions[Math.floor(Math.random() * operationType.actions.length)];
      
      const newOperation: LiveOperation = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: operationType.type as string,
        portal: portal.name,
        action,
        status: Math.random() > 0.1 ? 'completed' : 'running',
        details: `Autonomous operation executed successfully for ${portal.name}`,
        duration: Math.floor(Math.random() * 5000) + 100,
        priority: Math.random() > 0.8 ? 'high' : 'medium'
      };

      setOperations(prev => [newOperation, ...prev.slice(0, 99)]); // Keep last 100 operations
    };

    // Add operations every 2-5 seconds
    const operationInterval = setInterval(addOperation, Math.random() * 3000 + 2000);
    
    // Update portal statuses every 10 seconds
    const statusInterval = setInterval(() => {
      setPortalStatuses(prev => prev.map(portal => ({
        ...portal,
        lastHealthCheck: new Date(),
        responseTime: Math.random() * 200 + 50,
        uptime: 99.5 + Math.random() * 0.5,
        activeUsers: Math.floor(Math.random() * 50) + 1,
        status: Math.random() > 0.95 ? 'maintenance' : 'active'
      })));
    }, 10000);

    return () => {
      clearInterval(operationInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'portal_health': return <Activity className="w-4 h-4" />;
      case 'website_build': return <Building2 className="w-4 h-4" />;
      case 'autonomous_action': return <Zap className="w-4 h-4" />;
      case 'system_event': return <Settings className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold">Live Autonomous Operations</h2>
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
          >
            Auto-scroll {autoScroll ? "ON" : "OFF"}
          </Button>
        </div>
      </div>

      {/* Portal Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Portal Health Status (20 Portals)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {portalStatuses.map((portal) => (
              <div key={portal.key} className="flex items-center space-x-2 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(portal.status)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{portal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {portal.responseTime.toFixed(0)}ms • {portal.uptime.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Operations Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Real-Time Operations Feed</span>
            <Badge variant="outline">{operations.length} operations</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {operations.map((operation) => (
                <div
                  key={operation.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(operation.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">
                        {operation.portal && `${operation.portal}: `}
                        {operation.action}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`w-2 h-2 p-0 ${getPriorityColor(operation.priority)}`}
                      />
                      {operation.status === 'running' && (
                        <Badge variant="secondary" className="text-xs">
                          Running
                        </Badge>
                      )}
                    </div>
                    {showDetails && (
                      <div className="mt-1 space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {operation.details}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{operation.timestamp.toLocaleTimeString()}</span>
                          {operation.duration && (
                            <span>Duration: {formatDuration(operation.duration)}</span>
                          )}
                          <span className="capitalize">{operation.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Active Operations</p>
                <p className="text-2xl font-bold">{operations.filter(op => op.status === 'running').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold">
                  {((operations.filter(op => op.status === 'completed').length / operations.length) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Portals Online</p>
                <p className="text-2xl font-bold">
                  {portalStatuses.filter(p => p.status === 'active').length}/20
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
