import React, { useState, useEffect } from 'react';
import { useMCPIntegration } from '@/hooks/autonomous/useMCPIntegration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, Shield, Server, Network, Zap, Activity, AlertTriangle, CheckCircle, 
  Play, Pause, RotateCcw, Settings, Eye, EyeOff, Lock, Unlock, 
  Cpu, HardDrive, Wifi, Database, Code, Terminal, 
  Users, Globe, Clock, TrendingUp, TrendingDown, BarChart3,
  Command, TerminalSquare, CircuitBoard, Cogs, Gauge,
  ShieldCheck, Key, Fingerprint, WifiOff, AlertCircle, Info,
  ArrowUpRight, ArrowDownRight, Minus, XCircle, RefreshCw,
  Power, PowerOff, ActivitySquare, Target, Award, Trophy,
  Monitor, Smartphone, Tablet, Wifi as WifiIcon, Signal,
  BarChart4, PieChart, LineChart, ScatterChart
} from 'lucide-react';

interface MCPSystemStatus {
  status: 'operational' | 'degraded' | 'critical' | 'offline';
  uptime: number;
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  activeAgents: number;
  totalAgents: number;
  lastUpdate: string;
}

interface MCPAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  cpu: number;
  memory: number;
  lastActivity: string;
  tasks: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface MCPAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  source: string;
}

const MCPControlCenter: React.FC = () => {
  const {
    systemMetrics,
    agents,
    alerts,
    securityStatus,
    config,
    isConnected,
    isLoading,
    lastUpdate,
    controlAgent,
    acknowledgeAlert,
    updateConfig,
    emergencyShutdown,
    runSecurityScan,
    getActiveAgents,
    getTotalAgents,
    getUnacknowledgedAlerts,
    getSystemHealth
  } = useMCPIntegration();

  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);

  // Get system status based on metrics
  const getSystemStatus = () => {
    const health = getSystemHealth();
    if (health >= 80) return 'operational';
    if (health >= 60) return 'degraded';
    if (health >= 40) return 'critical';
    return 'offline';
  };

  const systemStatus = {
    status: getSystemStatus(),
    uptime: systemMetrics.uptime,
    cpu: systemMetrics.cpu,
    memory: systemMetrics.memory,
    storage: systemMetrics.storage,
    network: systemMetrics.network,
    activeAgents: getActiveAgents(),
    totalAgents: getTotalAgents(),
    lastUpdate: lastUpdate
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'degraded': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'offline': return 'text-slate-600 bg-slate-100 border-slate-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const handleEmergencyShutdown = async () => {
    await emergencyShutdown();
  };

  const handleAgentControl = async (agentId: string, action: 'start' | 'stop' | 'restart') => {
    await controlAgent(agentId, action);
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    await acknowledgeAlert(alertId);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                      <CircuitBoard className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      MCP Control Center
                    </h1>
                    <p className="text-lg text-blue-100 mt-2">
                      Master Control Program - Centralized System Management
                      {isLoading && <span className="ml-2 text-blue-300 animate-pulse">🔄 Updating...</span>}
                    </p>
                  </div>
                </div>
                
                {/* Live Status Indicators */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">System Operational</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">24/7 Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm font-medium">AI Agents Active</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className={`${isConnected ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'} px-4 py-2 border font-medium`}>
                  {isConnected ? '🟢 CONNECTED' : '🔴 DISCONNECTED'}
                </Badge>
                <Badge className={`${getStatusColor(systemStatus.status)} px-4 py-2 border font-medium`}>
                  {systemStatus.status.toUpperCase()}
                </Badge>
                <Button
                  variant={config.emergencyMode ? "destructive" : "outline"}
                  onClick={handleEmergencyShutdown}
                  disabled={config.emergencyMode || !isConnected}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <PowerOff className="h-4 w-4 mr-2" />
                  Emergency Shutdown
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">System Uptime</CardTitle>
                <Server className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{systemStatus.uptime}%</div>
                <p className="text-xs text-slate-500 mt-1">Last 24 hours</p>
                <div className="mt-2">
                  <Progress value={systemStatus.uptime} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Agents</CardTitle>
                <Users className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{systemStatus.activeAgents}/{systemStatus.totalAgents}</div>
                <p className="text-xs text-slate-500 mt-1">Operational agents</p>
                <div className="mt-2">
                  <Progress value={(systemStatus.activeAgents / systemStatus.totalAgents) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{systemStatus.cpu}%</div>
                <p className="text-xs text-slate-500 mt-1">Current load</p>
                <div className="mt-2">
                  <Progress value={systemStatus.cpu} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                 <CardTitle className="text-sm font-medium text-slate-600">Memory Usage</CardTitle>
                 <HardDrive className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{systemStatus.memory}%</div>
                <p className="text-xs text-slate-500 mt-1">RAM utilization</p>
                <div className="mt-2">
                  <Progress value={systemStatus.memory} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Control Panel */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">System Control Panel</CardTitle>
              <CardDescription className="text-slate-600">
                Monitor and control all MCP subsystems and autonomous agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="agents" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Agents
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Alerts
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                {/* System Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* System Performance Graph */}
                  <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span>System Performance</span>
                      </CardTitle>
                      <CardDescription>Real-time system metrics and performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Storage</span>
                            <span className="text-sm text-slate-500">{systemStatus.storage}%</span>
                          </div>
                          <Progress value={systemStatus.storage} className="h-3" />
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <HardDrive className="w-3 h-3" />
                            <span>Disk utilization</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Network</span>
                            <span className="text-sm text-slate-500">{systemStatus.network}%</span>
                          </div>
                          <Progress value={systemStatus.network} className="h-3" />
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <WifiIcon className="w-3 h-3" />
                            <span>Bandwidth usage</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Response Time</span>
                            <span className="text-sm text-slate-500">45ms</span>
                          </div>
                          <Progress value={85} className="h-3" />
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>API latency</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Health Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-green-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span>System Health</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Overall Health</span>
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                              Excellent
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Last Check</span>
                            <span className="text-sm text-slate-500">2 minutes ago</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Auto Recovery</span>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Active
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-purple-600" />
                          <span>Recent Activity</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>System optimization completed</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Security scan initiated</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Agent status updated</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Agent Control Tab */}
                <TabsContent value="agents" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>Agent Management</span>
                      </CardTitle>
                      <CardDescription>Monitor and control all MCP agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        <Table>
                          <TableHeader className="bg-slate-50">
                            <TableRow>
                              <TableHead className="font-semibold">Agent</TableHead>
                              <TableHead className="font-semibold">Type</TableHead>
                              <TableHead className="font-semibold">Status</TableHead>
                              <TableHead className="font-semibold">CPU</TableHead>
                              <TableHead className="font-semibold">Memory</TableHead>
                              <TableHead className="font-semibold">Tasks</TableHead>
                              <TableHead className="font-semibold">Priority</TableHead>
                              <TableHead className="font-semibold">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {agents.map((agent) => (
                              <TableRow key={agent.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {agent.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={agent.status === 'active' ? 'default' : 'secondary'}
                                    className={`${
                                      agent.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                      agent.status === 'idle' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                      agent.status === 'error' ? 'bg-red-100 text-red-800 border-red-200' :
                                      'bg-slate-100 text-slate-800 border-slate-200'
                                    }`}
                                  >
                                    {agent.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm">{agent.cpu}%</span>
                                    <Progress value={agent.cpu} className="w-16 h-2" />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm">{agent.memory}%</span>
                                    <Progress value={agent.memory} className="w-16 h-2" />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {agent.tasks}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(agent.priority)}`} />
                                    <span className="text-xs capitalize">{agent.priority}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleAgentControl(agent.id, 'restart')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <RotateCcw className="h-3 w-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Restart Agent</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => setSelectedAgent(agent)}
                                          className="h-8 w-8 p-0"
                                        >
                                          <Settings className="h-3 w-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Configure Agent</TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Alerts & Monitoring Tab */}
                <TabsContent value="alerts" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span>System Alerts</span>
                      </CardTitle>
                      <CardDescription>Monitor system alerts and notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {alerts.map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                              alert.acknowledged 
                                ? 'bg-slate-50 border-slate-200' 
                                : 'bg-white border-slate-200 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${
                                  alert.type === 'critical' ? 'bg-red-100' :
                                  alert.type === 'warning' ? 'bg-yellow-100' :
                                  alert.type === 'error' ? 'bg-red-100' :
                                  'bg-blue-100'
                                }`}>
                                  {alert.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                                  {alert.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                                  {alert.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900">{alert.message}</p>
                                  <p className="text-sm text-slate-500 mt-1">
                                    {alert.timestamp} • {alert.source}
                                  </p>
                                </div>
                              </div>
                              {!alert.acknowledged && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAcknowledgeAlert(alert.id)}
                                  disabled={!isConnected}
                                  className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                >
                                  Acknowledge
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Center Tab */}
                <TabsContent value="security" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-green-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <Shield className="w-5 h-5 text-emerald-600" />
                              <span>Security Status</span>
                            </CardTitle>
                            <CardDescription>Current security posture and threats</CardDescription>
                          </div>
                          <Button
                            size="sm"
                            onClick={runSecurityScan}
                            disabled={!isConnected || isLoading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            Run Scan
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                          <span className="font-medium">Firewall Status</span>
                          <Badge className={`${securityStatus.firewall ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            {securityStatus.firewall ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                          <span className="font-medium">Intrusion Detection</span>
                          <Badge className={`${securityStatus.intrusionDetection ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            <Eye className="h-3 w-3 mr-1" />
                            {securityStatus.intrusionDetection ? 'Monitoring' : 'Offline'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                          <span className="font-medium">Encryption</span>
                          <Badge className={`${securityStatus.encryption ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            <Lock className="h-3 w-3 mr-1" />
                            {securityStatus.encryption ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                          <span className="font-medium">Access Control</span>
                          <Badge className={`${securityStatus.accessControl ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            <Key className="h-3 w-3 mr-1" />
                            {securityStatus.accessControl ? 'Secure' : 'Compromised'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-blue-600" />
                          <span>Recent Security Events</span>
                        </CardTitle>
                        <CardDescription>Latest security activities and incidents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm p-2 bg-white rounded-lg border border-blue-200">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Security scan completed - No threats detected</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm p-2 bg-white rounded-lg border border-blue-200">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Firewall rules updated successfully</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm p-2 bg-white rounded-lg border border-blue-200">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Access control audit completed</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm p-2 bg-white rounded-lg border border-blue-200">
                            <Info className="h-4 w-4 text-blue-500" />
                            <span>New security policy applied</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* MCP Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-slate-600" />
                        <span>MCP Configuration</span>
                      </CardTitle>
                      <CardDescription>Configure Master Control Program settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label htmlFor="mcp-enabled" className="text-base font-medium">MCP System</Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Enable or disable the Master Control Program
                          </p>
                        </div>
                        <Switch
                          id="mcp-enabled"
                          checked={config.enabled}
                          onCheckedChange={(checked) => updateConfig({ enabled: checked })}
                          disabled={!isConnected}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label htmlFor="auto-recovery" className="text-base font-medium">Auto Recovery</Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Automatically recover from system failures
                          </p>
                        </div>
                        <Switch
                          id="auto-recovery"
                          checked={config.autoRecovery}
                          onCheckedChange={(checked) => updateConfig({ autoRecovery: checked })}
                          disabled={!isConnected}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                        <Label className="text-base font-medium">System Priority</Label>
                        <Select 
                          value={config.systemPriority}
                          onValueChange={(value) => updateConfig({ systemPriority: value as any })}
                          disabled={!isConnected}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="efficiency">Efficiency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                        <Label className="text-base font-medium">Monitoring Interval</Label>
                        <Select 
                          value={config.monitoringInterval.toString()}
                          onValueChange={(value) => updateConfig({ monitoringInterval: parseInt(value) })}
                          disabled={!isConnected}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 second</SelectItem>
                            <SelectItem value="5">5 seconds</SelectItem>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Agent Details Dialog */}
        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Agent Configuration - {selectedAgent?.name}</span>
              </DialogTitle>
              <DialogDescription>
                Configure agent settings and parameters
              </DialogDescription>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Agent ID</Label>
                    <Input value={selectedAgent.id} readOnly className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Type</Label>
                    <Input value={selectedAgent.type} readOnly className="bg-slate-50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CPU Limit (%)</Label>
                    <Input type="number" defaultValue={selectedAgent.cpu} />
                  </div>
                  <div className="space-y-2">
                    <Label>Memory Limit (%)</Label>
                    <Input type="number" defaultValue={selectedAgent.memory} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select defaultValue={selectedAgent.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default MCPControlCenter;
