import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  RefreshCw, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Server, 
  Database, 
  Network, 
  HardDrive, 
  Cpu, 
  Memory, 
  BarChart3, 
  Target,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ScalingRule {
  id: string;
  name: string;
  resourceType: 'cpu' | 'memory' | 'network' | 'storage' | 'database' | 'api';
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  action: 'scale_up' | 'scale_down' | 'scale_out' | 'scale_in';
  target: number;
  cooldown: number;
  status: 'active' | 'inactive' | 'triggered';
  lastTriggered?: string;
  triggerCount: number;
  description: string;
}

interface ScalingEvent {
  id: string;
  timestamp: string;
  ruleId: string;
  ruleName: string;
  resourceType: string;
  action: string;
  currentValue: number;
  threshold: number;
  targetValue: number;
  status: 'success' | 'failed' | 'in_progress';
  duration: number;
  cost: number;
  description: string;
}

interface ResourceMetrics {
  id: string;
  name: string;
  type: 'cpu' | 'memory' | 'network' | 'storage' | 'database' | 'api';
  currentUsage: number;
  capacity: number;
  utilization: number;
  status: 'normal' | 'warning' | 'critical' | 'scaling';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  scalingHistory: Array<{
    timestamp: string;
    action: string;
    value: number;
  }>;
}

interface ScalingPolicy {
  id: string;
  name: string;
  description: string;
  resourceType: string;
  minInstances: number;
  maxInstances: number;
  targetUtilization: number;
  scaleUpCooldown: number;
  scaleDownCooldown: number;
  status: 'active' | 'inactive';
  rules: string[];
  costOptimization: boolean;
  predictiveScaling: boolean;
}

const AutoScaling: React.FC = () => {
  const [scalingRules, setScalingRules] = useState<ScalingRule[]>([]);
  const [scalingEvents, setScalingEvents] = useState<ScalingEvent[]>([]);
  const [resourceMetrics, setResourceMetrics] = useState<ResourceMetrics[]>([]);
  const [scalingPolicies, setScalingPolicies] = useState<ScalingPolicy[]>([]);
  const [isCreateRuleDialogOpen, setIsCreateRuleDialogOpen] = useState(false);
  const [isCreatePolicyDialogOpen, setIsCreatePolicyDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceMetrics | null>(null);
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(true);
  const [predictiveScalingEnabled, setPredictiveScalingEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [newRule, setNewRule] = useState({
    name: '',
    resourceType: 'cpu' as ScalingRule['resourceType'],
    metric: 'utilization',
    threshold: 80,
    operator: 'gte' as ScalingRule['operator'],
    action: 'scale_up' as ScalingRule['action'],
    target: 1,
    cooldown: 300,
    description: ''
  });

  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: '',
    resourceType: 'cpu',
    minInstances: 1,
    maxInstances: 10,
    targetUtilization: 70,
    scaleUpCooldown: 300,
    scaleDownCooldown: 600,
    costOptimization: true,
    predictiveScaling: true
  });

  // Initialize with realistic data
  useEffect(() => {
    const initialScalingRules: ScalingRule[] = [
      {
        id: 'rule-001',
        name: 'CPU High Utilization Scale Up',
        resourceType: 'cpu',
        metric: 'utilization',
        threshold: 80,
        operator: 'gte',
        action: 'scale_up',
        target: 1,
        cooldown: 300,
        status: 'active',
        triggerCount: 12,
        description: 'Scale up when CPU utilization exceeds 80%'
      },
      {
        id: 'rule-002',
        name: 'Memory Low Utilization Scale Down',
        resourceType: 'memory',
        metric: 'utilization',
        threshold: 30,
        operator: 'lte',
        action: 'scale_down',
        target: 1,
        cooldown: 600,
        status: 'active',
        triggerCount: 5,
        description: 'Scale down when memory utilization is below 30%'
      },
      {
        id: 'rule-003',
        name: 'API Response Time Scale Out',
        resourceType: 'api',
        metric: 'response_time',
        threshold: 500,
        operator: 'gt',
        action: 'scale_out',
        target: 2,
        cooldown: 180,
        status: 'triggered',
        lastTriggered: new Date(Date.now() - 120000).toISOString(),
        triggerCount: 8,
        description: 'Scale out when API response time exceeds 500ms'
      },
      {
        id: 'rule-004',
        name: 'Database Connection Pool Scale Up',
        resourceType: 'database',
        metric: 'connection_usage',
        threshold: 85,
        operator: 'gte',
        action: 'scale_up',
        target: 1,
        cooldown: 240,
        status: 'active',
        triggerCount: 3,
        description: 'Scale up database when connection pool usage is high'
      }
    ];

    const initialScalingEvents: ScalingEvent[] = [
      {
        id: 'event-001',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        ruleId: 'rule-003',
        ruleName: 'API Response Time Scale Out',
        resourceType: 'api',
        action: 'scale_out',
        currentValue: 650,
        threshold: 500,
        targetValue: 2,
        status: 'success',
        duration: 45,
        cost: 12.50,
        description: 'Successfully scaled out API instances due to high response time'
      },
      {
        id: 'event-002',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        ruleId: 'rule-001',
        ruleName: 'CPU High Utilization Scale Up',
        resourceType: 'cpu',
        action: 'scale_up',
        currentValue: 85,
        threshold: 80,
        targetValue: 1,
        status: 'success',
        duration: 30,
        cost: 8.75,
        description: 'Successfully scaled up CPU resources due to high utilization'
      },
      {
        id: 'event-003',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ruleId: 'rule-002',
        ruleName: 'Memory Low Utilization Scale Down',
        resourceType: 'memory',
        action: 'scale_down',
        currentValue: 25,
        threshold: 30,
        targetValue: 1,
        status: 'success',
        duration: 20,
        cost: -5.25,
        description: 'Successfully scaled down memory resources due to low utilization'
      }
    ];

    const initialResourceMetrics: ResourceMetrics[] = [
      {
        id: 'cpu-001',
        name: 'CPU Cluster',
        type: 'cpu',
        currentUsage: 75,
        capacity: 100,
        utilization: 75,
        status: 'normal',
        trend: 'up',
        lastUpdated: new Date().toISOString(),
        scalingHistory: [
          { timestamp: new Date(Date.now() - 1800000).toISOString(), action: 'scale_up', value: 85 },
          { timestamp: new Date(Date.now() - 7200000).toISOString(), action: 'scale_down', value: 45 }
        ]
      },
      {
        id: 'memory-001',
        name: 'Memory Pool',
        type: 'memory',
        currentUsage: 45,
        capacity: 64,
        utilization: 70,
        status: 'normal',
        trend: 'stable',
        lastUpdated: new Date().toISOString(),
        scalingHistory: [
          { timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'scale_down', value: 25 },
          { timestamp: new Date(Date.now() - 14400000).toISOString(), action: 'scale_up', value: 55 }
        ]
      },
      {
        id: 'api-001',
        name: 'API Gateway',
        type: 'api',
        currentUsage: 8,
        capacity: 10,
        utilization: 80,
        status: 'scaling',
        trend: 'up',
        lastUpdated: new Date().toISOString(),
        scalingHistory: [
          { timestamp: new Date(Date.now() - 300000).toISOString(), action: 'scale_out', value: 6 },
          { timestamp: new Date(Date.now() - 1800000).toISOString(), action: 'scale_in', value: 4 }
        ]
      },
      {
        id: 'db-001',
        name: 'Database Cluster',
        type: 'database',
        currentUsage: 12,
        capacity: 20,
        utilization: 60,
        status: 'normal',
        trend: 'stable',
        lastUpdated: new Date().toISOString(),
        scalingHistory: [
          { timestamp: new Date(Date.now() - 7200000).toISOString(), action: 'scale_up', value: 15 },
          { timestamp: new Date(Date.now() - 28800000).toISOString(), action: 'scale_down', value: 8 }
        ]
      }
    ];

    const initialScalingPolicies: ScalingPolicy[] = [
      {
        id: 'policy-001',
        name: 'Production Auto Scaling',
        description: 'Auto scaling policy for production workloads',
        resourceType: 'cpu',
        minInstances: 2,
        maxInstances: 20,
        targetUtilization: 70,
        scaleUpCooldown: 300,
        scaleDownCooldown: 600,
        status: 'active',
        rules: ['rule-001', 'rule-002'],
        costOptimization: true,
        predictiveScaling: true
      },
      {
        id: 'policy-002',
        name: 'API Performance Scaling',
        description: 'Scaling policy focused on API performance',
        resourceType: 'api',
        minInstances: 3,
        maxInstances: 15,
        targetUtilization: 75,
        scaleUpCooldown: 180,
        scaleDownCooldown: 900,
        status: 'active',
        rules: ['rule-003'],
        costOptimization: true,
        predictiveScaling: false
      }
    ];

    setScalingRules(initialScalingRules);
    setScalingEvents(initialScalingEvents);
    setResourceMetrics(initialResourceMetrics);
    setScalingPolicies(initialScalingPolicies);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoScalingEnabled) return;

    const interval = setInterval(() => {
      setResourceMetrics(prev => prev.map(resource => ({
        ...resource,
        currentUsage: Math.max(0, Math.min(resource.capacity, resource.currentUsage + (Math.random() - 0.5) * 5)),
        lastUpdated: new Date().toISOString()
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [autoScalingEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'scaling': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'triggered': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: ResourceMetrics['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getResourceIcon = (type: ResourceMetrics['type']) => {
    switch (type) {
      case 'cpu': return <Cpu className="w-4 h-4" />;
      case 'memory': return <Memory className="w-4 h-4" />;
      case 'network': return <Network className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'api': return <Server className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const handleCreateRule = async () => {
    setLoading(true);
    try {
      const newRuleData: ScalingRule = {
        id: `rule-${Date.now()}`,
        name: newRule.name,
        resourceType: newRule.resourceType,
        metric: newRule.metric,
        threshold: newRule.threshold,
        operator: newRule.operator,
        action: newRule.action,
        target: newRule.target,
        cooldown: newRule.cooldown,
        status: 'active',
        triggerCount: 0,
        description: newRule.description
      };

      setScalingRules(prev => [...prev, newRuleData]);
      setIsCreateRuleDialogOpen(false);
      setNewRule({
        name: '',
        resourceType: 'cpu',
        metric: 'utilization',
        threshold: 80,
        operator: 'gte',
        action: 'scale_up',
        target: 1,
        cooldown: 300,
        description: ''
      });
      
      toast({
        title: "Scaling Rule Created",
        description: `Successfully created scaling rule: ${newRule.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create scaling rule",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePolicy = async () => {
    setLoading(true);
    try {
      const newPolicyData: ScalingPolicy = {
        id: `policy-${Date.now()}`,
        name: newPolicy.name,
        description: newPolicy.description,
        resourceType: newPolicy.resourceType,
        minInstances: newPolicy.minInstances,
        maxInstances: newPolicy.maxInstances,
        targetUtilization: newPolicy.targetUtilization,
        scaleUpCooldown: newPolicy.scaleUpCooldown,
        scaleDownCooldown: newPolicy.scaleDownCooldown,
        status: 'active',
        rules: [],
        costOptimization: newPolicy.costOptimization,
        predictiveScaling: newPolicy.predictiveScaling
      };

      setScalingPolicies(prev => [...prev, newPolicyData]);
      setIsCreatePolicyDialogOpen(false);
      setNewPolicy({
        name: '',
        description: '',
        resourceType: 'cpu',
        minInstances: 1,
        maxInstances: 10,
        targetUtilization: 70,
        scaleUpCooldown: 300,
        scaleDownCooldown: 600,
        costOptimization: true,
        predictiveScaling: true
      });
      
      toast({
        title: "Scaling Policy Created",
        description: `Successfully created scaling policy: ${newPolicy.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create scaling policy",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRule = async (ruleId: string, currentStatus: ScalingRule['status']) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      setScalingRules(prev => prev.map(rule => 
        rule.id === ruleId ? { ...rule, status: newStatus } : rule
      ));
      
      toast({
        title: "Rule Status Updated",
        description: `Scaling rule status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const systemMetrics = {
    totalResources: resourceMetrics.length,
    scalingResources: resourceMetrics.filter(r => r.status === 'scaling').length,
    activeRules: scalingRules.filter(r => r.status === 'active').length,
    totalEvents: scalingEvents.length,
    averageUtilization: Math.round(resourceMetrics.reduce((sum, r) => sum + r.utilization, 0) / resourceMetrics.length),
    costSavings: scalingEvents.reduce((sum, e) => sum + (e.cost < 0 ? Math.abs(e.cost) : 0), 0)
  };

  const utilizationData = resourceMetrics.map(resource => ({
    name: resource.name,
    utilization: resource.utilization,
    currentUsage: resource.currentUsage,
    capacity: resource.capacity
  }));

  const scalingHistoryData = resourceMetrics.flatMap(resource => 
    resource.scalingHistory.map(history => ({
      timestamp: history.timestamp,
      resource: resource.name,
      action: history.action,
      value: history.value
    }))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auto Scaling</h1>
          <p className="text-muted-foreground">
            Intelligent infrastructure scaling and resource management
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoScalingEnabled}
              onCheckedChange={setAutoScalingEnabled}
            />
            <Label>Auto Scaling</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={predictiveScalingEnabled}
              onCheckedChange={setPredictiveScalingEnabled}
            />
            <Label>Predictive Scaling</Label>
          </div>
          <Dialog open={isCreateRuleDialogOpen} onOpenChange={setIsCreateRuleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Scaling Rule</DialogTitle>
                <DialogDescription>
                  Configure a new auto-scaling rule for resource management.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    value={newRule.name}
                    onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter rule name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resource-type">Resource Type</Label>
                  <Select value={newRule.resourceType} onValueChange={(value: ScalingRule['resourceType']) => setNewRule(prev => ({ ...prev, resourceType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpu">CPU</SelectItem>
                      <SelectItem value="memory">Memory</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="threshold">Threshold (%)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newRule.threshold}
                    onChange={(e) => setNewRule(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                    placeholder="Enter threshold"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="action">Action</Label>
                  <Select value={newRule.action} onValueChange={(value: ScalingRule['action']) => setNewRule(prev => ({ ...prev, action: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scale_up">Scale Up</SelectItem>
                      <SelectItem value="scale_down">Scale Down</SelectItem>
                      <SelectItem value="scale_out">Scale Out</SelectItem>
                      <SelectItem value="scale_in">Scale In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newRule.description}
                    onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateRuleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRule} disabled={loading || !newRule.name}>
                  {loading ? 'Creating...' : 'Create Rule'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              Monitored resources
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scaling Resources</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.scalingResources}</div>
            <p className="text-xs text-muted-foreground">
              Currently scaling
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.averageUtilization}%</div>
            <p className="text-xs text-muted-foreground">
              Across all resources
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${systemMetrics.costSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="rules">Scaling Rules</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="events">Scaling Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Monitoring</CardTitle>
              <CardDescription>
                Real-time resource utilization and scaling status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resourceMetrics.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getResourceIcon(resource.type)}
                        </div>
                        <h3 className="font-medium text-sm">{resource.name}</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(resource.trend)}
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {resource.utilization}%
                    </div>
                    <Progress value={resource.utilization} className="mb-2" />
                    <div className="text-xs text-muted-foreground">
                      {resource.currentUsage} / {resource.capacity} units
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Updated: {new Date(resource.lastUpdated).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scaling Rules</CardTitle>
              <CardDescription>
                Configured auto-scaling rules and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Triggers</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scalingRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{rule.name}</div>
                            <div className="text-sm text-muted-foreground">{rule.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {rule.resourceType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {rule.metric} {rule.operator} {rule.threshold}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {rule.action.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(rule.status)}>
                            {rule.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {rule.triggerCount} times
                            {rule.lastTriggered && (
                              <div className="text-xs text-muted-foreground">
                                Last: {new Date(rule.lastTriggered).toLocaleTimeString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleRule(rule.id, rule.status)}
                              disabled={loading}
                            >
                              {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
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

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scaling Policies</CardTitle>
                  <CardDescription>
                    Comprehensive scaling policies and configurations
                  </CardDescription>
                </div>
                <Dialog open={isCreatePolicyDialogOpen} onOpenChange={setIsCreatePolicyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Policy
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Scaling Policy</DialogTitle>
                      <DialogDescription>
                        Configure a new scaling policy for resource management.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="policy-name">Policy Name</Label>
                        <Input
                          id="policy-name"
                          value={newPolicy.name}
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter policy name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="policy-description">Description</Label>
                        <Input
                          id="policy-description"
                          value={newPolicy.description}
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter description"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="min-instances">Min Instances</Label>
                        <Input
                          id="min-instances"
                          type="number"
                          value={newPolicy.minInstances}
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, minInstances: parseInt(e.target.value) }))}
                          placeholder="Enter min instances"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="max-instances">Max Instances</Label>
                        <Input
                          id="max-instances"
                          type="number"
                          value={newPolicy.maxInstances}
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, maxInstances: parseInt(e.target.value) }))}
                          placeholder="Enter max instances"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="target-utilization">Target Utilization (%)</Label>
                        <Input
                          id="target-utilization"
                          type="number"
                          value={newPolicy.targetUtilization}
                          onChange={(e) => setNewPolicy(prev => ({ ...prev, targetUtilization: parseInt(e.target.value) }))}
                          placeholder="Enter target utilization"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreatePolicyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePolicy} disabled={loading || !newPolicy.name}>
                        {loading ? 'Creating...' : 'Create Policy'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scalingPolicies.map((policy) => (
                  <div key={policy.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.description}</p>
                      </div>
                      <Badge className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Min Instances:</span>
                        <span className="ml-1 font-medium">{policy.minInstances}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Instances:</span>
                        <span className="ml-1 font-medium">{policy.maxInstances}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target Utilization:</span>
                        <span className="ml-1 font-medium">{policy.targetUtilization}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rules:</span>
                        <span className="ml-1 font-medium">{policy.rules.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      {policy.costOptimization && (
                        <Badge variant="outline">Cost Optimization</Badge>
                      )}
                      {policy.predictiveScaling && (
                        <Badge variant="outline">Predictive Scaling</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scaling Events</CardTitle>
              <CardDescription>
                History of scaling events and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scalingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{event.ruleName}</span>
                        <Badge variant={event.status === 'success' ? 'default' : event.status === 'failed' ? 'destructive' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Value:</span>
                        <span className="ml-1 font-medium">{event.currentValue}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Threshold:</span>
                        <span className="ml-1 font-medium">{event.threshold}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="ml-1 font-medium">{event.duration}s</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <span className={`ml-1 font-medium ${event.cost < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${event.cost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>
                  Current utilization across all resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                    <Bar dataKey="utilization" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scaling History</CardTitle>
                <CardDescription>
                  Recent scaling actions by resource
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scalingHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value, name) => [value, name]}
                    />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scaling Events by Status</CardTitle>
                <CardDescription>
                  Distribution of scaling event outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Success', value: scalingEvents.filter(e => e.status === 'success').length, color: '#10b981' },
                        { name: 'Failed', value: scalingEvents.filter(e => e.status === 'failed').length, color: '#ef4444' },
                        { name: 'In Progress', value: scalingEvents.filter(e => e.status === 'in_progress').length, color: '#f59e0b' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {scalingEvents.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.status === 'success' ? '#10b981' : entry.status === 'failed' ? '#ef4444' : '#f59e0b'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>
                  Scaling costs and savings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={scalingEvents.map(event => ({
                    timestamp: event.timestamp,
                    cost: event.cost,
                    cumulative: scalingEvents
                      .filter(e => new Date(e.timestamp) <= new Date(event.timestamp))
                      .reduce((sum, e) => sum + e.cost, 0)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value, name) => [`$${value}`, name]}
                    />
                    <Area type="monotone" dataKey="cost" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="cumulative" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutoScaling;
