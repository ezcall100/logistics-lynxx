import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Rocket, Settings, Play, Pause, RotateCcw, CheckCircle, 
  AlertTriangle, Clock, Calendar, GitBranch, Server, 
  Database, Globe, Code, Terminal, Activity, TrendingUp,
  Plus, Edit, Trash2, Download, Upload, Eye, EyeOff,
  RefreshCw, Save, XCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface Deployment {
  id: string;
  name: string;
  environment: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  commitHash: string;
  branch: string;
  triggeredBy: string;
}

interface Pipeline {
  id: string;
  name: string;
  environment: string;
  status: 'active' | 'inactive' | 'error';
  lastRun: string;
  nextRun?: string;
  successRate: number;
  stages: string[];
}

interface Environment {
  id: string;
  name: string;
  type: 'production' | 'staging' | 'development';
  status: 'healthy' | 'warning' | 'error';
  url: string;
  lastDeployment: string;
  version: string;
}

const MCPDeploymentManagerPage: React.FC = () => {
  const { toast } = useToast();
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      name: 'Frontend v2.1.0',
      environment: 'production',
      status: 'running',
      progress: 65,
      startTime: '2024-01-15 14:30:00',
      commitHash: 'a1b2c3d4',
      branch: 'main',
      triggeredBy: 'john.doe@company.com'
    },
    {
      id: '2',
      name: 'API v1.5.2',
      environment: 'staging',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15 13:15:00',
      endTime: '2024-01-15 13:25:00',
      duration: '10m 30s',
      commitHash: 'e5f6g7h8',
      branch: 'develop',
      triggeredBy: 'jane.smith@company.com'
    },
    {
      id: '3',
      name: 'Database Migration',
      environment: 'production',
      status: 'failed',
      progress: 45,
      startTime: '2024-01-15 12:00:00',
      endTime: '2024-01-15 12:05:00',
      duration: '5m 15s',
      commitHash: 'i9j0k1l2',
      branch: 'main',
      triggeredBy: 'admin@company.com'
    }
  ]);

  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Frontend CI/CD',
      environment: 'production',
      status: 'active',
      lastRun: '2024-01-15 14:30:00',
      nextRun: '2024-01-15 16:30:00',
      successRate: 95,
      stages: ['Build', 'Test', 'Deploy']
    },
    {
      id: '2',
      name: 'API Pipeline',
      environment: 'staging',
      status: 'active',
      lastRun: '2024-01-15 13:15:00',
      successRate: 88,
      stages: ['Build', 'Test', 'Security Scan', 'Deploy']
    }
  ]);

  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: '1',
      name: 'Production',
      type: 'production',
      status: 'healthy',
      url: 'https://app.company.com',
      lastDeployment: '2024-01-15 14:30:00',
      version: 'v2.1.0'
    },
    {
      id: '2',
      name: 'Staging',
      type: 'staging',
      status: 'healthy',
      url: 'https://staging.company.com',
      lastDeployment: '2024-01-15 13:15:00',
      version: 'v1.5.2'
    },
    {
      id: '3',
      name: 'Development',
      type: 'development',
      status: 'warning',
      url: 'https://dev.company.com',
      lastDeployment: '2024-01-15 10:00:00',
      version: 'v1.5.1'
    }
  ]);

  // Dialog states
  const [newDeploymentDialog, setNewDeploymentDialog] = useState(false);
  const [newPipelineDialog, setNewPipelineDialog] = useState(false);
  const [environmentConfigDialog, setEnvironmentConfigDialog] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  const [deploymentConfig, setDeploymentConfig] = useState({
    name: '',
    environment: '',
    branch: '',
    commitHash: '',
    description: ''
  });
  const [pipelineConfig, setPipelineConfig] = useState({
    name: '',
    environment: '',
    stages: [] as string[],
    autoDeploy: false,
    schedule: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEnvironmentStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleNewDeployment = () => {
    if (!deploymentConfig.name || !deploymentConfig.environment) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newDeployment: Deployment = {
      id: Date.now().toString(),
      name: deploymentConfig.name,
      environment: deploymentConfig.environment,
      status: 'pending',
      progress: 0,
      startTime: new Date().toISOString(),
      commitHash: deploymentConfig.commitHash || 'latest',
      branch: deploymentConfig.branch || 'main',
      triggeredBy: 'current-user@company.com'
    };

    setDeployments([newDeployment, ...deployments]);
    setNewDeploymentDialog(false);
    setDeploymentConfig({ name: '', environment: '', branch: '', commitHash: '', description: '' });
    
    toast({
      title: "Deployment Created",
      description: `Deployment "${deploymentConfig.name}" has been queued.`,
    });
  };

  const handleNewPipeline = () => {
    if (!pipelineConfig.name || !pipelineConfig.environment) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newPipeline: Pipeline = {
      id: Date.now().toString(),
      name: pipelineConfig.name,
      environment: pipelineConfig.environment,
      status: 'active',
      lastRun: new Date().toISOString(),
      successRate: 100,
      stages: pipelineConfig.stages
    };

    setPipelines([newPipeline, ...pipelines]);
    setNewPipelineDialog(false);
    setPipelineConfig({ name: '', environment: '', stages: [], autoDeploy: false, schedule: '' });
    
    toast({
      title: "Pipeline Created",
      description: `Pipeline "${pipelineConfig.name}" has been created.`,
    });
  };

  const handleEnvironmentConfig = () => {
    if (!selectedEnvironment) return;
    
    toast({
      title: "Configuration Updated",
      description: `Environment "${selectedEnvironment.name}" configuration has been updated.`,
    });
    setEnvironmentConfigDialog(false);
    setSelectedEnvironment(null);
  };

  return (
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
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Deployment Manager
                  </h1>
                  <p className="text-lg text-blue-100 mt-2">
                    MCP Deployment Management & CI/CD Pipeline Control
                  </p>
                </div>
              </div>
              
              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Deployments Active</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium">Pipelines Running</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm font-medium">Environments Healthy</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setNewDeploymentDialog(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Deployment
              </Button>
              <Button
                variant="outline"
                onClick={() => setNewPipelineDialog(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <GitBranch className="h-4 w-4 mr-2" />
                New Pipeline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        <Tabs defaultValue="deployments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            <TabsTrigger value="environments">Environments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Deployments Tab */}
          <TabsContent value="deployments" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-blue-600" />
                  <span>Active Deployments</span>
                </CardTitle>
                <CardDescription>Monitor and manage system deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deployments.map((deployment) => (
                    <div
                      key={deployment.id}
                      className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Rocket className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{deployment.name}</h3>
                            <p className="text-sm text-slate-500">
                              {deployment.environment} • {deployment.branch} • {deployment.commitHash}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(deployment.status)}>
                            {deployment.status.toUpperCase()}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {deployment.status === 'running' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{deployment.progress}%</span>
                          </div>
                          <Progress value={deployment.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Started:</span>
                            <p className="font-medium">{deployment.startTime}</p>
                          </div>
                          {deployment.endTime && (
                            <div>
                              <span className="text-slate-500">Ended:</span>
                              <p className="font-medium">{deployment.endTime}</p>
                            </div>
                          )}
                          {deployment.duration && (
                            <div>
                              <span className="text-slate-500">Duration:</span>
                              <p className="font-medium">{deployment.duration}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-slate-500">Triggered by:</span>
                            <p className="font-medium">{deployment.triggeredBy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pipelines Tab */}
          <TabsContent value="pipelines" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-green-600" />
                  <span>CI/CD Pipelines</span>
                </CardTitle>
                <CardDescription>Manage continuous integration and deployment pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pipeline</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pipelines.map((pipeline) => (
                      <TableRow key={pipeline.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{pipeline.name}</p>
                            <p className="text-sm text-slate-500">{pipeline.stages.join(' → ')}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{pipeline.environment}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={pipeline.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {pipeline.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{pipeline.lastRun}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={pipeline.successRate} className="w-20 h-2" />
                            <span className="text-sm">{pipeline.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
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

          {/* Environments Tab */}
          <TabsContent value="environments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {environments.map((environment) => (
                <Card key={environment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          environment.type === 'production' ? 'bg-red-100' :
                          environment.type === 'staging' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <Server className={`w-5 h-5 ${
                            environment.type === 'production' ? 'text-red-600' :
                            environment.type === 'staging' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{environment.name}</CardTitle>
                          <CardDescription>{environment.type}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getEnvironmentStatusColor(environment.status)}>
                        {environment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">URL:</span>
                        <a href={environment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {environment.url}
                        </a>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Version:</span>
                        <span className="font-medium">{environment.version}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Last Deploy:</span>
                        <span className="font-medium">{environment.lastDeployment}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedEnvironment(environment);
                          setEnvironmentConfigDialog(true);
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span>Deployment Settings</span>
                </CardTitle>
                <CardDescription>Configure deployment strategies and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Deployment Strategy</Label>
                    <Select defaultValue="blue-green">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue-green">Blue-Green Deployment</SelectItem>
                        <SelectItem value="canary">Canary Deployment</SelectItem>
                        <SelectItem value="rolling">Rolling Update</SelectItem>
                        <SelectItem value="recreate">Recreate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Auto-rollback</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-rollback" defaultChecked />
                      <Label htmlFor="auto-rollback">Enable automatic rollback on failure</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Health Check Timeout</Label>
                    <Input type="number" defaultValue={300} placeholder="Seconds" />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Concurrent Deployments</Label>
                    <Input type="number" defaultValue={2} placeholder="Max concurrent" />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Deployment Dialog */}
      <Dialog open={newDeploymentDialog} onOpenChange={setNewDeploymentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Create New Deployment</span>
            </DialogTitle>
            <DialogDescription>
              Configure and launch a new deployment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deployment Name *</Label>
                <Input 
                  value={deploymentConfig.name}
                  onChange={(e) => setDeploymentConfig({...deploymentConfig, name: e.target.value})}
                  placeholder="e.g., Frontend v2.1.0"
                />
              </div>
              <div className="space-y-2">
                <Label>Environment *</Label>
                <Select 
                  value={deploymentConfig.environment}
                  onValueChange={(value) => setDeploymentConfig({...deploymentConfig, environment: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Branch</Label>
                <Input 
                  value={deploymentConfig.branch}
                  onChange={(e) => setDeploymentConfig({...deploymentConfig, branch: e.target.value})}
                  placeholder="e.g., main"
                />
              </div>
              <div className="space-y-2">
                <Label>Commit Hash</Label>
                <Input 
                  value={deploymentConfig.commitHash}
                  onChange={(e) => setDeploymentConfig({...deploymentConfig, commitHash: e.target.value})}
                  placeholder="e.g., a1b2c3d4"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={deploymentConfig.description}
                onChange={(e) => setDeploymentConfig({...deploymentConfig, description: e.target.value})}
                placeholder="Describe the changes in this deployment..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewDeploymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewDeployment}>
              Create Deployment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Pipeline Dialog */}
      <Dialog open={newPipelineDialog} onOpenChange={setNewPipelineDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>Create New Pipeline</span>
            </DialogTitle>
            <DialogDescription>
              Set up a new CI/CD pipeline
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pipeline Name *</Label>
                <Input 
                  value={pipelineConfig.name}
                  onChange={(e) => setPipelineConfig({...pipelineConfig, name: e.target.value})}
                  placeholder="e.g., Frontend CI/CD"
                />
              </div>
              <div className="space-y-2">
                <Label>Environment *</Label>
                <Select 
                  value={pipelineConfig.environment}
                  onValueChange={(value) => setPipelineConfig({...pipelineConfig, environment: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pipeline Stages</Label>
              <div className="space-y-2">
                {['Build', 'Test', 'Security Scan', 'Deploy'].map((stage) => (
                  <div key={stage} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={stage}
                      checked={pipelineConfig.stages.includes(stage)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPipelineConfig({
                            ...pipelineConfig,
                            stages: [...pipelineConfig.stages, stage]
                          });
                        } else {
                          setPipelineConfig({
                            ...pipelineConfig,
                            stages: pipelineConfig.stages.filter(s => s !== stage)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={stage}>{stage}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-deploy"
                  checked={pipelineConfig.autoDeploy}
                  onCheckedChange={(checked) => setPipelineConfig({...pipelineConfig, autoDeploy: checked})}
                />
                <Label htmlFor="auto-deploy">Enable automatic deployment</Label>
              </div>
              {pipelineConfig.autoDeploy && (
                <div className="space-y-2">
                  <Label>Schedule (Cron Expression)</Label>
                  <Input 
                    value={pipelineConfig.schedule}
                    onChange={(e) => setPipelineConfig({...pipelineConfig, schedule: e.target.value})}
                    placeholder="e.g., 0 2 * * * (daily at 2 AM)"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPipelineDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewPipeline}>
              Create Pipeline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Environment Configuration Dialog */}
      <Dialog open={environmentConfigDialog} onOpenChange={setEnvironmentConfigDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Environment Configuration - {selectedEnvironment?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Configure environment settings and parameters
            </DialogDescription>
          </DialogHeader>
          {selectedEnvironment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Environment Name</Label>
                  <Input value={selectedEnvironment.name} readOnly className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Environment Type</Label>
                  <Input value={selectedEnvironment.type} readOnly className="bg-slate-50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Base URL</Label>
                <Input value={selectedEnvironment.url} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Health Check Interval (seconds)</Label>
                  <Input type="number" defaultValue={30} />
                </div>
                <div className="space-y-2">
                  <Label>Timeout (seconds)</Label>
                  <Input type="number" defaultValue={300} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Environment Variables</Label>
                <Textarea 
                  placeholder="KEY1=value1&#10;KEY2=value2&#10;KEY3=value3"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnvironmentConfigDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnvironmentConfig}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MCPDeploymentManagerPage;
