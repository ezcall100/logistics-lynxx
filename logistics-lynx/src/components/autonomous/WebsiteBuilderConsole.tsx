import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Truck,
  FileText,
  Search,
  Image,
  Settings,
  Terminal,
  RefreshCw
} from 'lucide-react';

interface BuilderStatus {
  operational: boolean;
  paused: boolean;
  pagesBuilt: number;
  pagesInProgress: number;
  avgBuildMs: number;
  avgSeoScore: number;
  lastBuildAt?: string;
  uptime: number;
}

interface BuilderMetrics {
  pagesBuilt: number;
  pagesInProgress: number;
  avgBuildMs: number;
  avgSeoScore: number;
  totalWords: number;
  totalImages: number;
  eventsLast60s: number;
  buildsLast2m: number;
}

interface LogEvent {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  meta?: any;
}

export default function WebsiteBuilderConsole() {
  const [status, setStatus] = useState<BuilderStatus | null>(null);
  const [metrics, setMetrics] = useState<BuilderMetrics | null>(null);
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageType, setPageType] = useState('home');
  const [priority, setPriority] = useState(5);
  const [seed, setSeed] = useState('demo-001');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const pageTypes = [
    'home', 'about', 'tms-software', 'features', 'pricing', 'contact', 
    'blog', 'solutions', 'resources', 'support', 'careers', 'demo', 'api', 'integrations'
  ];

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/website-builder/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/website-builder/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const pauseBuilder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/website-builder/pause', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await fetchStatus();
        addLog('info', 'Builder paused successfully');
      } else {
        addLog('error', `Failed to pause: ${data.message}`);
      }
    } catch (error) {
      addLog('error', 'Error pausing builder');
    }
    setIsLoading(false);
  };

  const resumeBuilder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/website-builder/resume', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        await fetchStatus();
        addLog('info', 'Builder resumed successfully');
      } else {
        addLog('error', `Failed to resume: ${data.message}`);
      }
    } catch (error) {
      addLog('error', 'Error resuming builder');
    }
    setIsLoading(false);
  };

  const buildPage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/website-builder/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: pageType, priority, seed })
      });
      const data = await response.json();
      if (data.success) {
        addLog('info', `Started building ${pageType} page (ID: ${data.pageId})`);
        await fetchStatus();
        await fetchMetrics();
      } else {
        addLog('error', `Failed to build page: ${data.message}`);
      }
    } catch (error) {
      addLog('error', 'Error building page');
    }
    setIsLoading(false);
  };

  const addLog = (level: 'info' | 'warn' | 'error', message: string, meta?: any) => {
    const newLog: LogEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level,
      message,
      meta
    };
    setLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
  };

  const getStatusColor = (operational: boolean, paused: boolean) => {
    if (!operational) return 'bg-red-500';
    if (paused) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = (operational: boolean, paused: boolean) => {
    if (!operational) return 'STOPPED';
    if (paused) return 'PAUSED';
    return 'RUNNING';
  };

  const formatUptime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  useEffect(() => {
    fetchStatus();
    fetchMetrics();

    const interval = setInterval(() => {
      fetchStatus();
      fetchMetrics();
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6" />
              <span>Trans Bot AI Website Builder Console</span>
            </div>
            <div className="flex items-center space-x-2">
              {status && (
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(status.operational, status.paused)} text-white`}
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  {getStatusText(status.operational, status.paused)}
                </Badge>
              )}
              <Badge variant="outline">
                Last update: {lastUpdate.toLocaleTimeString()}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Pages Built</p>
                <p className="text-2xl font-bold" data-testid="pages-built">
                  {status?.pagesBuilt || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Avg Build Time</p>
                <p className="text-2xl font-bold">
                  {status?.avgBuildMs ? formatDuration(status.avgBuildMs) : '0ms'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Avg SEO Score</p>
                <p className="text-2xl font-bold">
                  {status?.avgSeoScore || 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-2xl font-bold">
                  {status?.uptime ? formatUptime(status.uptime) : '0s'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Builder Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={pauseBuilder}
                disabled={isLoading || !status?.operational || status?.paused}
                variant="outline"
                size="sm"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button
                onClick={resumeBuilder}
                disabled={isLoading || !status?.operational || !status?.paused}
                variant="outline"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <Button
                onClick={() => {
                  fetchStatus();
                  fetchMetrics();
                  addLog('info', 'Manual refresh triggered');
                }}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pageType">Page Type</Label>
              <select
                id="pageType"
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {pageTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority (1-10)</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  max="10"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seed">Seed</Label>
                <Input
                  id="seed"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="demo-001"
                />
              </div>
            </div>

            <Button
              onClick={buildPage}
              disabled={isLoading || !status?.operational || status?.paused}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Build Page
            </Button>
          </CardContent>
        </Card>

        {/* Real-time Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Real-time Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-700">In Progress</p>
                <p className="text-2xl font-bold text-blue-800">
                  {metrics?.pagesInProgress || 0}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-700">Events (60s)</p>
                <p className="text-2xl font-bold text-green-800">
                  {metrics?.eventsLast60s || 0}
                </p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-700">Total Words</p>
                <p className="text-2xl font-bold text-purple-800">
                  {metrics?.totalWords || 0}
                </p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-700">Total Images</p>
                <p className="text-2xl font-bold text-orange-800">
                  {metrics?.totalImages || 0}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SEO Score Progress</span>
                <span>{metrics?.avgSeoScore || 0}%</span>
              </div>
              <Progress 
                value={metrics?.avgSeoScore || 0} 
                className="h-2"
                data-testid="seo-progress"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Build Performance</span>
                <span>{metrics?.avgBuildMs ? formatDuration(metrics.avgBuildMs) : '0ms'}</span>
              </div>
              <Progress 
                value={Math.min(100, (metrics?.avgBuildMs || 0) / 50)} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Live Builder Logs</span>
            <Badge variant="outline">{logs.length} events</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start space-x-3 p-2 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-shrink-0 mt-1">
                    {log.level === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {log.level === 'warn' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {log.level === 'info' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{log.message}</span>
                      <Badge variant="outline" className="text-xs">
                        {log.level.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                    {log.meta && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {JSON.stringify(log.meta)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <div className="flex items-center justify-center space-x-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Trans Bot AI TMS Website Builder</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-blue-500" />
          <span className="text-sm">Real-time TMS Content</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span className="text-sm">Autonomous Operation</span>
        </div>
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-purple-500" />
          <span className="text-sm">Full Control Console</span>
        </div>
      </div>
    </div>
  );
}
