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
  Code, GitBranch, Palette, LayoutDashboard, FileText, 
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Zap, Eye, EyeOff, RefreshCw, Settings, Database,
  ExternalLink, Copy, Share2, Maximize2, Minimize2
} from 'lucide-react';

// Real data models
interface Component {
  id: string;
  name: string;
  type: 'ui' | 'form' | 'table' | 'chart' | 'layout';
  status: 'development' | 'testing' | 'review' | 'completed' | 'deployed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  lastUpdated: string;
  description: string;
}

interface CodeReview {
  id: string;
  componentId: string;
  reviewer: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  comments: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

interface BuildStatus {
  id: string;
  branch: string;
  status: 'building' | 'success' | 'failed' | 'cancelled';
  commit: string;
  timestamp: string;
  duration: string;
  tests: {
    total: number;
    passed: number;
    failed: number;
  };
}

// Mock API functions
const mockAPI = {
  getComponents: (): Promise<Component[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Management Table',
        type: 'table',
        status: 'completed',
        priority: 'high',
        assignedTo: 'John Smith',
        estimatedHours: 8,
        actualHours: 7.5,
        progress: 100,
        lastUpdated: '2 hours ago',
        description: 'Responsive data table with sorting, filtering, and pagination'
      },
      {
        id: '2',
        name: 'Dashboard Analytics',
        type: 'chart',
        status: 'development',
        priority: 'medium',
        assignedTo: 'Sarah Johnson',
        estimatedHours: 12,
        actualHours: 6,
        progress: 50,
        lastUpdated: '1 hour ago',
        description: 'Interactive charts and metrics display'
      },
      {
        id: '3',
        name: 'Login Form',
        type: 'form',
        status: 'testing',
        priority: 'critical',
        assignedTo: 'Mike Davis',
        estimatedHours: 4,
        actualHours: 3.5,
        progress: 87,
        lastUpdated: '30 minutes ago',
        description: 'Authentication form with validation and error handling'
      },
      {
        id: '4',
        name: 'Navigation Header',
        type: 'layout',
        status: 'review',
        priority: 'high',
        assignedTo: 'Lisa Wilson',
        estimatedHours: 6,
        actualHours: 5,
        progress: 83,
        lastUpdated: '45 minutes ago',
        description: 'Responsive navigation with mobile menu'
      }
    ]),

  getCodeReviews: (): Promise<CodeReview[]> => 
    Promise.resolve([
      {
        id: '1',
        componentId: '1',
        reviewer: 'Sarah Johnson',
        status: 'approved',
        comments: 'Great implementation! Code is clean and follows best practices.',
        timestamp: '1 hour ago',
        severity: 'low'
      },
      {
        id: '2',
        componentId: '2',
        reviewer: 'Mike Davis',
        status: 'changes-requested',
        comments: 'Please add error boundaries and improve accessibility.',
        timestamp: '2 hours ago',
        severity: 'medium'
      },
      {
        id: '3',
        componentId: '3',
        reviewer: 'John Smith',
        status: 'pending',
        comments: 'Waiting for security review',
        timestamp: '3 hours ago',
        severity: 'high'
      }
    ]),

  getBuildStatus: (): Promise<BuildStatus[]> => 
    Promise.resolve([
      {
        id: '1',
        branch: 'main',
        status: 'success',
        commit: 'a1b2c3d',
        timestamp: '10 minutes ago',
        duration: '2m 30s',
        tests: { total: 156, passed: 156, failed: 0 }
      },
      {
        id: '2',
        branch: 'feature/user-management',
        status: 'building',
        commit: 'e4f5g6h',
        timestamp: '5 minutes ago',
        duration: '1m 45s',
        tests: { total: 0, passed: 0, failed: 0 }
      },
      {
        id: '3',
        branch: 'feature/dashboard',
        status: 'failed',
        commit: 'i7j8k9l',
        timestamp: '15 minutes ago',
        duration: '3m 12s',
        tests: { total: 142, passed: 138, failed: 4 }
      }
    ])
};

const FrontendDeveloperPage = () => {
  const { toast } = useToast();
  const [components, setComponents] = useState<Component[]>([]);
  const [codeReviews, setCodeReviews] = useState<CodeReview[]>([]);
  const [buildStatus, setBuildStatus] = useState<BuildStatus[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showAddComponentDialog, setShowAddComponentDialog] = useState(false);
  const [newComponent, setNewComponent] = useState({
    name: '',
    type: 'ui' as const,
    priority: 'medium' as const,
    assignedTo: '',
    estimatedHours: 0,
    description: ''
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [componentsData, reviewsData, buildsData] = await Promise.all([
          mockAPI.getComponents(),
          mockAPI.getCodeReviews(),
          mockAPI.getBuildStatus()
        ]);

        setComponents(componentsData);
        setCodeReviews(reviewsData);
        setBuildStatus(buildsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load frontend data",
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
  const handleAddComponent = async () => {
    try {
      const component: Component = {
        id: Date.now().toString(),
        name: newComponent.name,
        type: newComponent.type,
        status: 'development',
        priority: newComponent.priority,
        assignedTo: newComponent.assignedTo,
        estimatedHours: newComponent.estimatedHours,
        actualHours: 0,
        progress: 0,
        lastUpdated: 'Just now',
        description: newComponent.description
      };

      setComponents(prev => [...prev, component]);
      setShowAddComponentDialog(false);
      setNewComponent({
        name: '',
        type: 'ui',
        priority: 'medium',
        assignedTo: '',
        estimatedHours: 0,
        description: ''
      });

      toast({
        title: "Success",
        description: "Component added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add component",
        variant: "destructive"
      });
    }
  };

  const handleUpdateComponentStatus = async (componentId: string, status: Component['status']) => {
    try {
      setComponents(prev => prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, status, lastUpdated: 'Just now' }
          : comp
      ));

      toast({
        title: "Success",
        description: "Component status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update component status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteComponent = async (componentId: string) => {
    try {
      setComponents(prev => prev.filter(comp => comp.id !== componentId));
      
      toast({
        title: "Success",
        description: "Component deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete component",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'development': return 'bg-blue-500';
      case 'testing': return 'bg-yellow-500';
      case 'review': return 'bg-purple-500';
      case 'deployed': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBuildStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'building': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frontend Developer Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              Component development, code reviews, and build management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Code className="w-4 h-4 mr-1" />
              Active Development
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
              <CardTitle className="text-sm font-medium">Total Components</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{components.length}</div>
              <p className="text-xs text-muted-foreground">
                {components.filter(c => c.status === 'completed').length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Development</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{components.filter(c => c.status === 'development').length}</div>
              <p className="text-xs text-muted-foreground">
                Active development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{codeReviews.filter(r => r.status === 'pending').length}</div>
              <p className="text-xs text-muted-foreground">
                Pending reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Build Success Rate</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((buildStatus.filter(b => b.status === 'success').length / buildStatus.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {buildStatus.length} total builds
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="reviews">Code Reviews</TabsTrigger>
            <TabsTrigger value="builds">Build Status</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Component Development</CardTitle>
                    <CardDescription>Manage frontend components and their development status</CardDescription>
                  </div>
                  <Dialog open={showAddComponentDialog} onOpenChange={setShowAddComponentDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Component
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Component</DialogTitle>
                        <DialogDescription>
                          Create a new frontend component with specifications.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Component Name</Label>
                          <Input
                            id="name"
                            value={newComponent.name}
                            onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter component name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Component Type</Label>
                          <Select value={newComponent.type} onValueChange={(value: 'ui' | 'form' | 'table' | 'chart' | 'layout') => setNewComponent(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ui">UI Component</SelectItem>
                              <SelectItem value="form">Form Component</SelectItem>
                              <SelectItem value="table">Table Component</SelectItem>
                              <SelectItem value="chart">Chart Component</SelectItem>
                              <SelectItem value="layout">Layout Component</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select value={newComponent.priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setNewComponent(prev => ({ ...prev, priority: value }))}>
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
                        <div>
                          <Label htmlFor="assignedTo">Assigned To</Label>
                          <Input
                            id="assignedTo"
                            value={newComponent.assignedTo}
                            onChange={(e) => setNewComponent(prev => ({ ...prev, assignedTo: e.target.value }))}
                            placeholder="Enter developer name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="estimatedHours">Estimated Hours</Label>
                          <Input
                            id="estimatedHours"
                            type="number"
                            value={newComponent.estimatedHours}
                            onChange={(e) => setNewComponent(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
                            placeholder="Enter estimated hours"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newComponent.description}
                            onChange={(e) => setNewComponent(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter component description"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddComponentDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddComponent} disabled={!newComponent.name || !newComponent.assignedTo}>
                          Add Component
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
                      <TableHead>Component</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {components.map((component) => (
                      <TableRow key={component.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{component.name}</div>
                            <div className="text-sm text-muted-foreground">{component.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {component.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(component.status)}`} />
                            <span className="capitalize">{component.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(component.priority)}>
                            {component.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{component.assignedTo}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{component.progress}%</span>
                            </div>
                            <Progress value={component.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{component.actualHours}/{component.estimatedHours}h</div>
                            <div className="text-muted-foreground">Last: {component.lastUpdated}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Select value={component.status} onValueChange={(value: Component['status']) => handleUpdateComponentStatus(component.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="testing">Testing</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="deployed">Deployed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComponent(component.id)}
                            >
                              <Trash2 className="w-4 h-4" />
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

          {/* Code Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Reviews</CardTitle>
                <CardDescription>Track code review status and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {codeReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {components.find(c => c.id === review.componentId)?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>{review.reviewer}</TableCell>
                        <TableCell>
                          <Badge variant={
                            review.status === 'approved' ? 'default' :
                            review.status === 'rejected' ? 'destructive' :
                            review.status === 'changes-requested' ? 'secondary' : 'outline'
                          }>
                            {review.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            review.severity === 'high' ? 'bg-red-100 text-red-800' :
                            review.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {review.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.comments}</TableCell>
                        <TableCell>{review.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build Status Tab */}
          <TabsContent value="builds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Build Status</CardTitle>
                <CardDescription>Monitor CI/CD pipeline and build results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Branch</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Commit</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Tests</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buildStatus.map((build) => (
                      <TableRow key={build.id}>
                        <TableCell className="font-medium">{build.branch}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getBuildStatusColor(build.status)}`} />
                            <span className="capitalize">{build.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{build.commit}</TableCell>
                        <TableCell>{build.duration}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{build.tests.passed}/{build.tests.total} passed</div>
                            {build.tests.failed > 0 && (
                              <div className="text-red-600">{build.tests.failed} failed</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{build.timestamp}</TableCell>
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

export default FrontendDeveloperPage;
