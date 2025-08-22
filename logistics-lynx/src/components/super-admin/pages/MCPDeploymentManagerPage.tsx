import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Rocket, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Shield, Users, Activity,
  Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  HardDrive, Cloud, Archive, RotateCcw, ShieldCheck,
  AlertTriangle, Info, Play, Pause,
  Settings, BarChart3, Timer, Terminal,
  Bug, Network,
  GitBranch, GitCommit, GitPullRequest, GitMerge,
  Package, Layers, Target, ArrowUpDown
} from 'lucide-react';

const MCPDeploymentManagerPage = () => {
  const [activeTab, setActiveTab] = useState('deployments');
  const [deployments, setDeployments] = useState([
    {
      id: 1,
      name: 'Frontend v2.1.0',
      environment: 'production',
      status: 'deploying',
      service: 'frontend-service',
      version: 'v2.1.0',
      timestamp: '2024-01-15 14:30:25',
      progress: 75,
      commit: 'abc123def456'
    },
    {
      id: 2,
      name: 'API Gateway v1.8.2',
      environment: 'staging',
      status: 'success',
      service: 'api-gateway',
      version: 'v1.8.2',
      timestamp: '2024-01-15 14:15:10',
      progress: 100,
      commit: 'def456ghi789'
    },
    {
      id: 3,
      name: 'Database Migration v2.0.1',
      environment: 'production',
      status: 'failed',
      service: 'database-service',
      version: 'v2.0.1',
      timestamp: '2024-01-15 14:00:15',
      progress: 45,
      commit: 'ghi789jkl012'
    },
    {
      id: 4,
      name: 'Security Service v1.5.3',
      environment: 'development',
      status: 'pending',
      service: 'security-service',
      version: 'v1.5.3',
      timestamp: '2024-01-15 13:45:30',
      progress: 0,
      commit: 'jkl012mno345'
    }
  ]);

  const [pipelines, setPipelines] = useState([
    {
      id: 1,
      name: 'Frontend CI/CD',
      status: 'active',
      stages: ['build', 'test', 'deploy'],
      lastRun: '2024-01-15 14:30:25',
      successRate: 95.2
    },
    {
      id: 2,
      name: 'Backend CI/CD',
      status: 'active',
      stages: ['build', 'test', 'security-scan', 'deploy'],
      lastRun: '2024-01-15 14:15:10',
      successRate: 92.8
    },
    {
      id: 3,
      name: 'Database Migration',
      status: 'active',
      stages: ['backup', 'migrate', 'verify'],
      lastRun: '2024-01-15 14:00:15',
      successRate: 88.5
    }
  ]);

  const [releases, setReleases] = useState([
    {
      id: 1,
      name: 'Release v2.1.0',
      version: 'v2.1.0',
      status: 'in-progress',
      environment: 'production',
      releaseDate: '2024-01-15',
      description: 'Major feature release with new UI components',
      changes: ['New dashboard design', 'Performance improvements', 'Bug fixes']
    },
    {
      id: 2,
      name: 'Release v2.0.5',
      version: 'v2.0.5',
      status: 'completed',
      environment: 'production',
      releaseDate: '2024-01-10',
      description: 'Hotfix release for critical security issues',
      changes: ['Security patches', 'Minor bug fixes']
    },
    {
      id: 3,
      name: 'Release v2.0.0',
      version: 'v2.0.0',
      status: 'completed',
      environment: 'production',
      releaseDate: '2024-01-01',
      description: 'Major version release with new architecture',
      changes: ['New microservices architecture', 'API improvements', 'Database optimization']
    }
  ]);

  const [deploymentSettings, setDeploymentSettings] = useState({
    autoDeploy: false,
    rollbackEnabled: true,
    healthCheckTimeout: 300,
    maxDeploymentTime: 1800,
    parallelDeployments: 2,
    blueGreenDeployment: true,
    canaryDeployment: false
  });

  const handleDeploymentStart = (deploymentId: number) => {
    setDeployments(prev => prev.map(deployment => 
      deployment.id === deploymentId 
        ? { ...deployment, status: 'deploying', progress: 0 }
        : deployment
    ));
  };

  const handleDeploymentRollback = (deploymentId: number) => {
    setDeployments(prev => prev.map(deployment => 
      deployment.id === deploymentId 
        ? { ...deployment, status: 'rolling-back', progress: 0 }
        : deployment
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'deploying': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'failed': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'rolling-back': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'deploying': return <Activity className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rolling-back': return <RotateCcw className="w-4 h-4" />;
      default: return <Rocket className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Deployment Manager
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage deployments, CI/CD pipelines, and release processes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Deployment
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Deployments</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">2</p>
              </div>
              <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Successful</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">1</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Failed</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Pipelines</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">3</p>
              </div>
              <GitBranch className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-6">
          {/* Deployment List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Active Deployments
              </CardTitle>
              <CardDescription>
                Monitor and manage current deployments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <motion.div
                    key={deployment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(deployment.status)}>
                          {getStatusIcon(deployment.status)}
                          <span className="ml-1">{deployment.status.toUpperCase()}</span>
                        </Badge>
                        <h4 className="font-medium">{deployment.name}</h4>
                        <Badge variant="outline">{deployment.environment}</Badge>
                        <Badge variant="outline">{deployment.service}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {deployment.status === 'pending' && (
                          <Button size="sm" variant="outline" onClick={() => handleDeploymentStart(deployment.id)}>
                            <Play className="w-3 h-3 mr-1" />
                            Start
                          </Button>
                        )}
                        {deployment.status === 'failed' && (
                          <Button size="sm" variant="outline" onClick={() => handleDeploymentRollback(deployment.id)}>
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Rollback
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="text-sm font-medium">{deployment.progress}%</span>
                      </div>
                      <Progress value={deployment.progress} className="w-full" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Version</p>
                        <p className="font-medium">{deployment.version}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Commit</p>
                        <p className="font-mono text-xs">{deployment.commit}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Timestamp</p>
                        <p className="font-medium">{deployment.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Deployment
              </CardTitle>
              <CardDescription>
                Deploy a new version to an environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deploymentName">Deployment Name</Label>
                  <Input id="deploymentName" placeholder="Enter deployment name" />
                </div>
                <div>
                  <Label htmlFor="deploymentService">Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend-service">Frontend Service</SelectItem>
                      <SelectItem value="api-gateway">API Gateway</SelectItem>
                      <SelectItem value="database-service">Database Service</SelectItem>
                      <SelectItem value="security-service">Security Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deploymentEnvironment">Environment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deploymentVersion">Version</Label>
                  <Input id="deploymentVersion" placeholder="v1.0.0" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="deploymentDescription">Description</Label>
                  <Textarea
                    id="deploymentDescription"
                    placeholder="Enter deployment description"
                    rows={2}
                  />
                </div>
              </div>
              <Button className="mt-4">
                <Rocket className="w-4 h-4 mr-2" />
                Create Deployment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-6">
          {/* CI/CD Pipelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                CI/CD Pipelines
              </CardTitle>
              <CardDescription>
                Manage continuous integration and deployment pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelines.map((pipeline) => (
                  <motion.div
                    key={pipeline.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant={pipeline.status === 'active' ? 'default' : 'secondary'}>
                          {pipeline.status}
                        </Badge>
                        <h4 className="font-medium">{pipeline.name}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Run
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Stages</p>
                        <p className="font-medium">{pipeline.stages.join(' → ')}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Last Run</p>
                        <p className="font-medium">{pipeline.lastRun}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Success Rate</p>
                        <p className="font-medium">{pipeline.successRate}%</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-600 dark:text-slate-400">Health</span>
                        </div>
                        <Progress value={pipeline.successRate} className="w-full" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Pipeline Configuration
              </CardTitle>
              <CardDescription>
                Configure pipeline settings and triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pipelineName">Pipeline Name</Label>
                    <Input id="pipelineName" placeholder="Enter pipeline name" />
                  </div>
                  <div>
                    <Label htmlFor="pipelineTrigger">Trigger</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push">Push to main</SelectItem>
                        <SelectItem value="pr">Pull Request</SelectItem>
                        <SelectItem value="tag">Tag</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="pipelineStages">Pipeline Stages</Label>
                  <Textarea
                    id="pipelineStages"
                    placeholder="Enter pipeline stages (one per line)"
                    rows={3}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Pipeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="releases" className="space-y-6">
          {/* Release Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Release Management
              </CardTitle>
              <CardDescription>
                Manage software releases and versioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {releases.map((release) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(release.status)}>
                          {getStatusIcon(release.status)}
                          <span className="ml-1">{release.status.toUpperCase()}</span>
                        </Badge>
                        <h4 className="font-medium">{release.name}</h4>
                        <Badge variant="outline">{release.version}</Badge>
                        <Badge variant="outline">{release.environment}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {release.description}
                      </p>
                      <div className="space-y-1">
                        {release.changes.map((change, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span>{change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Release Date: {release.releaseDate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Release */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Release
              </CardTitle>
              <CardDescription>
                Create a new software release
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="releaseName">Release Name</Label>
                    <Input id="releaseName" placeholder="Enter release name" />
                  </div>
                  <div>
                    <Label htmlFor="releaseVersion">Version</Label>
                    <Input id="releaseVersion" placeholder="v1.0.0" />
                  </div>
                  <div>
                    <Label htmlFor="releaseEnvironment">Environment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <Input id="releaseDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="releaseDescription">Description</Label>
                  <Textarea
                    id="releaseDescription"
                    placeholder="Enter release description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="releaseChanges">Changes</Label>
                  <Textarea
                    id="releaseChanges"
                    placeholder="Enter changes (one per line)"
                    rows={3}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Release
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Deployment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Deployment Settings
              </CardTitle>
              <CardDescription>
                Configure deployment behavior and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="healthCheckTimeout">Health Check Timeout (seconds)</Label>
                  <Input
                    id="healthCheckTimeout"
                    type="number"
                    value={deploymentSettings.healthCheckTimeout}
                    onChange={(e) => setDeploymentSettings(prev => ({ ...prev, healthCheckTimeout: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxDeploymentTime">Max Deployment Time (seconds)</Label>
                  <Input
                    id="maxDeploymentTime"
                    type="number"
                    value={deploymentSettings.maxDeploymentTime}
                    onChange={(e) => setDeploymentSettings(prev => ({ ...prev, maxDeploymentTime: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="parallelDeployments">Parallel Deployments</Label>
                  <Input
                    id="parallelDeployments"
                    type="number"
                    value={deploymentSettings.parallelDeployments}
                    onChange={(e) => setDeploymentSettings(prev => ({ ...prev, parallelDeployments: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoDeploy">Auto Deploy</Label>
                  <Switch
                    id="autoDeploy"
                    checked={deploymentSettings.autoDeploy}
                    onCheckedChange={(checked) => setDeploymentSettings(prev => ({ ...prev, autoDeploy: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rollbackEnabled">Enable Rollback</Label>
                  <Switch
                    id="rollbackEnabled"
                    checked={deploymentSettings.rollbackEnabled}
                    onCheckedChange={(checked) => setDeploymentSettings(prev => ({ ...prev, rollbackEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="blueGreenDeployment">Blue-Green Deployment</Label>
                  <Switch
                    id="blueGreenDeployment"
                    checked={deploymentSettings.blueGreenDeployment}
                    onCheckedChange={(checked) => setDeploymentSettings(prev => ({ ...prev, blueGreenDeployment: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="canaryDeployment">Canary Deployment</Label>
                  <Switch
                    id="canaryDeployment"
                    checked={deploymentSettings.canaryDeployment}
                    onCheckedChange={(checked) => setDeploymentSettings(prev => ({ ...prev, canaryDeployment: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Environment Configuration
              </CardTitle>
              <CardDescription>
                Configure deployment environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Development', url: 'https://dev.transbot.ai', status: 'active' },
                  { name: 'Staging', url: 'https://staging.transbot.ai', status: 'active' },
                  { name: 'Production', url: 'https://transbot.ai', status: 'active' }
                ].map((env, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        env.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{env.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{env.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPDeploymentManagerPage;
