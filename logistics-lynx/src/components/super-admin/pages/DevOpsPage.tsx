import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  GitBranch, LayoutDashboard, FileText, CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Zap, Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Database, Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, BarChart3, ActivitySquare
} from 'lucide-react';

// Real data models
interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'cancelled' | 'pending';
  branch: string;
  commit: string;
  trigger: 'push' | 'pull_request' | 'manual' | 'scheduled';
  startTime: string;
  endTime?: string;
  duration?: string;
  stages: PipelineStage[];
  environment: string;
  triggeredBy: string;
}

interface PipelineStage {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'skipped' | 'pending';
  duration: string;
  logs: string[];
}

interface Deployment {
  id: string;
  name: string;
  environment: 'development' | 'staging' | 'production';
  status: 'deploying' | 'success' | 'failed' | 'rolled_back';
  version: string;
  commit: string;
  deployedAt: string;
  deployedBy: string;
  rollbackVersion?: string;
  healthCheck: 'healthy' | 'unhealthy' | 'degraded';
  uptime: string;
  responseTime: number;
}

interface Infrastructure {
  id: string;
  name: string;
  type: 'server' | 'database' | 'load_balancer' | 'cache' | 'storage';
  status: 'running' | 'stopped' | 'maintenance' | 'error';
  region: string;
  instanceType: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  cost: number;
  lastUpdated: string;
}

interface Automation {
  id: string;
  name: string;
  type: 'backup' | 'scaling' | 'monitoring' | 'security' | 'cleanup';
  status: 'active' | 'inactive' | 'error';
  schedule: string;
  lastRun: string;
  nextRun: string;
  successRate: number;
  description: string;
}

// Mock API functions
const mockAPI = {
  getPipelines: (): Promise<Pipeline[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Main CI/CD Pipeline',
        status: 'success',
        branch: 'main',
        commit: 'a1b2c3d',
        trigger: 'push',
        startTime: '2 hours ago',
        endTime: '1 hour 55 minutes ago',
        duration: '5m 30s',
        environment: 'production',
        triggeredBy: 'GitHub Webhook',
        stages: [
          { id: '1', name: 'Build', status: 'success', duration: '2m 15s', logs: ['Building application...', 'Build completed successfully'] },
          { id: '2', name: 'Test', status: 'success', duration: '1m 45s', logs: ['Running tests...', 'All tests passed'] },
          { id: '3', name: 'Deploy', status: 'success', duration: '1m 30s', logs: ['Deploying to production...', 'Deployment successful'] }
        ]
      },
      {
        id: '2',
        name: 'Feature Branch Pipeline',
        status: 'running',
        branch: 'feature/user-management',
        commit: 'e4f5g6h',
        trigger: 'pull_request',
        startTime: '10 minutes ago',
        environment: 'staging',
        triggeredBy: 'Manual Trigger',
        stages: [
          { id: '1', name: 'Build', status: 'success', duration: '2m 10s', logs: ['Building application...', 'Build completed successfully'] },
          { id: '2', name: 'Test', status: 'running', duration: '1m 20s', logs: ['Running tests...', 'Currently executing...'] },
          { id: '3', name: 'Deploy', status: 'pending', duration: '0s', logs: [] }
        ]
      },
      {
        id: '3',
        name: 'Hotfix Pipeline',
        status: 'failed',
        branch: 'hotfix/security-patch',
        commit: 'i7j8k9l',
        trigger: 'push',
        startTime: '30 minutes ago',
        endTime: '25 minutes ago',
        duration: '5m 12s',
        environment: 'production',
        triggeredBy: 'GitHub Webhook',
        stages: [
          { id: '1', name: 'Build', status: 'success', duration: '2m 30s', logs: ['Building application...', 'Build completed successfully'] },
          { id: '2', name: 'Test', status: 'failed', duration: '2m 42s', logs: ['Running tests...', 'Test failed: Security vulnerability detected'] },
          { id: '3', name: 'Deploy', status: 'skipped', duration: '0s', logs: [] }
        ]
      }
    ]),

  getDeployments: (): Promise<Deployment[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Trans Bot AI v2.1.0',
        environment: 'production',
        status: 'success',
        version: '2.1.0',
        commit: 'a1b2c3d',
        deployedAt: '2 hours ago',
        deployedBy: 'CI/CD Pipeline',
        healthCheck: 'healthy',
        uptime: '99.9%',
        responseTime: 45
      },
      {
        id: '2',
        name: 'Trans Bot AI v2.0.5',
        environment: 'staging',
        status: 'deploying',
        version: '2.0.5',
        commit: 'e4f5g6h',
        deployedAt: '10 minutes ago',
        deployedBy: 'Manual Deployment',
        healthCheck: 'degraded',
        uptime: '98.5%',
        responseTime: 120
      },
      {
        id: '3',
        name: 'Trans Bot AI v2.0.4',
        environment: 'production',
        status: 'rolled_back',
        version: '2.0.4',
        commit: 'i7j8k9l',
        deployedAt: '1 day ago',
        deployedBy: 'CI/CD Pipeline',
        rollbackVersion: '2.0.3',
        healthCheck: 'healthy',
        uptime: '99.8%',
        responseTime: 52
      }
    ]),

  getInfrastructure: (): Promise<Infrastructure[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Web Server Cluster',
        type: 'server',
        status: 'running',
        region: 'us-east-1',
        instanceType: 't3.large',
        cpu: 75,
        memory: 60,
        disk: 45,
        network: 80,
        cost: 120.50,
        lastUpdated: '5 minutes ago'
      },
      {
        id: '2',
        name: 'Database Cluster',
        type: 'database',
        status: 'running',
        region: 'us-east-1',
        instanceType: 'r5.xlarge',
        cpu: 45,
        memory: 70,
        disk: 85,
        network: 30,
        cost: 450.75,
        lastUpdated: '2 minutes ago'
      },
      {
        id: '3',
        name: 'Load Balancer',
        type: 'load_balancer',
        status: 'running',
        region: 'us-east-1',
        instanceType: 'nlb',
        cpu: 25,
        memory: 40,
        disk: 10,
        network: 95,
        cost: 85.25,
        lastUpdated: '1 minute ago'
      },
      {
        id: '4',
        name: 'Redis Cache',
        type: 'cache',
        status: 'maintenance',
        region: 'us-east-1',
        instanceType: 'cache.t3.micro',
        cpu: 15,
        memory: 80,
        disk: 5,
        network: 20,
        cost: 25.00,
        lastUpdated: '10 minutes ago'
      }
    ]),

  getAutomations: (): Promise<Automation[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Database Backup',
        type: 'backup',
        status: 'active',
        schedule: 'Daily at 2:00 AM',
        lastRun: '1 day ago',
        nextRun: 'Tomorrow at 2:00 AM',
        successRate: 98,
        description: 'Automated database backup to S3'
      },
      {
        id: '2',
        name: 'Auto Scaling',
        type: 'scaling',
        status: 'active',
        schedule: 'Continuous',
        lastRun: '5 minutes ago',
        nextRun: 'Continuous',
        successRate: 95,
        description: 'Auto-scaling based on CPU and memory usage'
      },
      {
        id: '3',
        name: 'Security Scan',
        type: 'security',
        status: 'active',
        schedule: 'Weekly on Sunday',
        lastRun: '3 days ago',
        nextRun: 'Sunday at 3:00 AM',
        successRate: 92,
        description: 'Automated security vulnerability scanning'
      },
      {
        id: '4',
        name: 'Log Cleanup',
        type: 'cleanup',
        status: 'inactive',
        schedule: 'Daily at 1:00 AM',
        lastRun: '2 days ago',
        nextRun: 'Tomorrow at 1:00 AM',
        successRate: 100,
        description: 'Clean up old log files'
      }
    ])
};

const DevOpsPage = () => {
  const { toast } = useToast();
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [infrastructure, setInfrastructure] = useState<Infrastructure[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [newDeployment, setNewDeployment] = useState({
    name: '',
    environment: 'staging' as const,
    version: '',
    description: ''
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [pipelinesData, deploymentsData, infrastructureData, automationsData] = await Promise.all([
          mockAPI.getPipelines(),
          mockAPI.getDeployments(),
          mockAPI.getInfrastructure(),
          mockAPI.getAutomations()
        ]);

        setPipelines(pipelinesData);
        setDeployments(deploymentsData);
        setInfrastructure(infrastructureData);
        setAutomations(automationsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load DevOps data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [toast]);

  // Action handlers
  const handleDeploy = async () => {
    try {
      const deployment: Deployment = {
        id: Date.now().toString(),
        name: newDeployment.name,
        environment: newDeployment.environment,
        status: 'deploying',
        version: newDeployment.version,
        commit: 'manual-deploy',
        deployedAt: 'Just now',
        deployedBy: 'Manual Deployment',
        healthCheck: 'degraded',
        uptime: '0%',
        responseTime: 0
      };

      setDeployments(prev => [deployment, ...prev]);
      setShowDeployDialog(false);
      setNewDeployment({
        name: '',
        environment: 'staging',
        version: '',
        description: ''
      });

      toast({
        title: "Success",
        description: "Deployment started successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start deployment",
        variant: "destructive"
      });
    }
  };

  const handleRollback = async (deploymentId: string) => {
    try {
      setDeployments(prev => prev.map(deployment => 
        deployment.id === deploymentId 
          ? { ...deployment, status: 'rolled_back' as const }
          : deployment
      ));

      toast({
        title: "Success",
        description: "Rollback initiated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate rollback",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      case 'deploying': return 'bg-blue-500';
      case 'rolled_back': return 'bg-orange-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'stopped': return 'bg-gray-500';
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'bg-red-100 text-red-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'development': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthCheckColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'unhealthy': return 'bg-red-100 text-red-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'server': return 'bg-blue-100 text-blue-800';
      case 'database': return 'bg-green-100 text-green-800';
      case 'load_balancer': return 'bg-purple-100 text-purple-800';
      case 'cache': return 'bg-orange-100 text-orange-800';
      case 'storage': return 'bg-pink-100 text-pink-800';
      case 'backup': return 'bg-indigo-100 text-indigo-800';
      case 'scaling': return 'bg-teal-100 text-teal-800';
      case 'monitoring': return 'bg-cyan-100 text-cyan-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'cleanup': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              DevOps Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              CI/CD pipeline management, deployment monitoring, and infrastructure automation
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
              <Rocket className="w-4 h-4 mr-1" />
              DevOps Active
            </Badge>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Pipelines</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pipelines.filter(p => p.status === 'running').length}</div>
              <p className="text-xs text-muted-foreground">
                {pipelines.filter(p => p.status === 'success').length} successful today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deployments</CardTitle>
              <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deployments.length}</div>
              <p className="text-xs text-muted-foreground">
                {deployments.filter(d => d.status === 'success').length} successful
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Infrastructure</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{infrastructure.length}</div>
              <p className="text-xs text-muted-foreground">
                {infrastructure.filter(i => i.status === 'running').length} running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automations</CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{automations.filter(a => a.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">
                Active automations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pipelines" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          {/* Pipelines Tab */}
          <TabsContent value="pipelines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>CI/CD Pipelines</CardTitle>
                <CardDescription>Monitor and manage continuous integration and deployment pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pipeline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Triggered By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pipelines.map((pipeline) => (
                      <TableRow key={pipeline.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{pipeline.name}</div>
                            <div className="text-sm text-muted-foreground font-mono">{pipeline.commit}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(pipeline.status)}`} />
                            <span className="capitalize">{pipeline.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {pipeline.branch}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {pipeline.trigger.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getEnvironmentColor(pipeline.environment)}>
                            {pipeline.environment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{pipeline.duration || 'Running...'}</div>
                            <div className="text-muted-foreground">{pipeline.startTime}</div>
                          </div>
                        </TableCell>
                        <TableCell>{pipeline.triggeredBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                                                         {pipeline.status === 'running' && (
                               <Button variant="ghost" size="sm">
                                 <Pause className="w-4 h-4" />
                               </Button>
                             )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployments Tab */}
          <TabsContent value="deployments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Deployments</CardTitle>
                    <CardDescription>Monitor application deployments across environments</CardDescription>
                  </div>
                  <Dialog open={showDeployDialog} onOpenChange={setShowDeployDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Rocket className="w-4 h-4 mr-2" />
                        Deploy
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>New Deployment</DialogTitle>
                        <DialogDescription>
                          Deploy a new version to the selected environment.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Deployment Name</Label>
                          <Input
                            id="name"
                            value={newDeployment.name}
                            onChange={(e) => setNewDeployment(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter deployment name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="environment">Environment</Label>
                          <Select value={newDeployment.environment} onValueChange={(value: 'development' | 'staging' | 'production') => setNewDeployment(prev => ({ ...prev, environment: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="development">Development</SelectItem>
                              <SelectItem value="staging">Staging</SelectItem>
                              <SelectItem value="production">Production</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="version">Version</Label>
                          <Input
                            id="version"
                            value={newDeployment.version}
                            onChange={(e) => setNewDeployment(prev => ({ ...prev, version: e.target.value }))}
                            placeholder="Enter version (e.g., 2.1.0)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newDeployment.description}
                            onChange={(e) => setNewDeployment(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter deployment description"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeployDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleDeploy} disabled={!newDeployment.name || !newDeployment.version}>
                          Deploy
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deployment</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Health Check</TableHead>
                      <TableHead>Uptime</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deployments.map((deployment) => (
                      <TableRow key={deployment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{deployment.name}</div>
                            <div className="text-sm text-muted-foreground">Deployed by {deployment.deployedBy}</div>
                            <div className="text-sm text-muted-foreground">{deployment.deployedAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getEnvironmentColor(deployment.environment)}>
                            {deployment.environment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(deployment.status)}`} />
                            <span className="capitalize">{deployment.status.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{deployment.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getHealthCheckColor(deployment.healthCheck)}>
                            {deployment.healthCheck}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{deployment.uptime}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{deployment.responseTime}ms</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {deployment.status === 'success' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRollback(deployment.id)}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure</CardTitle>
                <CardDescription>Monitor infrastructure resources and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>CPU</TableHead>
                      <TableHead>Memory</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {infrastructure.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{resource.name}</div>
                            <div className="text-sm text-muted-foreground">{resource.instanceType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(resource.status)}`} />
                            <span className="capitalize">{resource.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{resource.region}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{resource.cpu}%</span>
                            </div>
                            <Progress value={resource.cpu} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{resource.memory}%</span>
                            </div>
                            <Progress value={resource.memory} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{resource.network}%</span>
                            </div>
                            <Progress value={resource.network} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">${resource.cost.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">per month</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Workflows</CardTitle>
                <CardDescription>Manage automated processes and scheduled tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Automation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automations.map((automation) => (
                      <TableRow key={automation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{automation.name}</div>
                            <div className="text-sm text-muted-foreground">{automation.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(automation.type)}>
                            {automation.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(automation.status)}`} />
                            <span className="capitalize">{automation.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{automation.schedule}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{automation.successRate}%</span>
                            </div>
                            <Progress value={automation.successRate} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{automation.lastRun}</TableCell>
                        <TableCell>{automation.nextRun}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default DevOpsPage;
