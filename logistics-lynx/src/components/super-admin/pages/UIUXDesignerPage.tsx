import React, { useState, useEffect } from 'react';
// MCP Sync Test - Super Admin UI Verification
// Phase 2 Deployment: Autonomous Monitoring Active
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
  Palette, LayoutDashboard, FileText, CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Zap, Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Database, Server, Brush, Layers, Type, Image, Grid,
  Smartphone, Monitor, Tablet, PaletteIcon
} from 'lucide-react';

// Real data models
interface DesignComponent {
  id: string;
  name: string;
  category: 'button' | 'form' | 'card' | 'modal' | 'navigation' | 'layout' | 'typography' | 'icon';
  status: 'draft' | 'review' | 'approved' | 'implemented' | 'deprecated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  designer: string;
  lastUpdated: string;
  description: string;
  figmaLink?: string;
  usageCount: number;
  accessibilityScore: number;
  responsive: boolean;
  darkMode: boolean;
}

interface DesignToken {
  id: string;
  name: string;
  category: 'color' | 'typography' | 'spacing' | 'border' | 'shadow' | 'animation';
  value: string;
  description: string;
  usage: number;
  lastUpdated: string;
  deprecated: boolean;
  replacement?: string;
}

interface DesignSystem {
  id: string;
  name: string;
  version: string;
  description: string;
  status: 'active' | 'beta' | 'deprecated';
  components: number;
  tokens: number;
  lastRelease: string;
  documentationUrl: string;
  figmaUrl: string;
  coverage: number;
}

interface DesignReview {
  id: string;
  componentId: string;
  reviewer: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  comments: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  designScore: number;
  accessibilityScore: number;
  usabilityScore: number;
}

// Mock API functions
const mockAPI = {
  getDesignComponents: (): Promise<DesignComponent[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Primary Button',
        category: 'button',
        status: 'implemented',
        priority: 'high',
        designer: 'Sarah Johnson',
        lastUpdated: '2 hours ago',
        description: 'Main call-to-action button with hover and focus states',
        figmaLink: 'https://figma.com/file/abc123',
        usageCount: 45,
        accessibilityScore: 95,
        responsive: true,
        darkMode: true
      },
      {
        id: '2',
        name: 'User Profile Card',
        category: 'card',
        status: 'review',
        priority: 'medium',
        designer: 'Mike Davis',
        lastUpdated: '1 hour ago',
        description: 'Card component for displaying user information',
        figmaLink: 'https://figma.com/file/def456',
        usageCount: 12,
        accessibilityScore: 88,
        responsive: true,
        darkMode: false
      },
      {
        id: '3',
        name: 'Navigation Header',
        category: 'navigation',
        status: 'approved',
        priority: 'critical',
        designer: 'Lisa Wilson',
        lastUpdated: '30 minutes ago',
        description: 'Main navigation component with mobile menu',
        figmaLink: 'https://figma.com/file/ghi789',
        usageCount: 8,
        accessibilityScore: 92,
        responsive: true,
        darkMode: true
      },
      {
        id: '4',
        name: 'Form Input',
        category: 'form',
        status: 'draft',
        priority: 'high',
        designer: 'John Smith',
        lastUpdated: '3 hours ago',
        description: 'Standard form input with validation states',
        usageCount: 0,
        accessibilityScore: 85,
        responsive: true,
        darkMode: true
      }
    ]),

  getDesignTokens: (): Promise<DesignToken[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'primary-color',
        category: 'color',
        value: '#3B82F6',
        description: 'Primary brand color for buttons and links',
        usage: 23,
        lastUpdated: '1 day ago',
        deprecated: false
      },
      {
        id: '2',
        name: 'heading-font',
        category: 'typography',
        value: 'Inter, sans-serif',
        description: 'Font family for headings',
        usage: 15,
        lastUpdated: '2 days ago',
        deprecated: false
      },
      {
        id: '3',
        name: 'spacing-md',
        category: 'spacing',
        value: '1rem',
        description: 'Medium spacing unit',
        usage: 34,
        lastUpdated: '3 days ago',
        deprecated: false
      },
      {
        id: '4',
        name: 'old-primary',
        category: 'color',
        value: '#1E40AF',
        description: 'Deprecated primary color',
        usage: 5,
        lastUpdated: '1 week ago',
        deprecated: true,
        replacement: 'primary-color'
      }
    ]),

  getDesignSystems: (): Promise<DesignSystem[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Trans Bot Design System',
        version: '2.1.0',
        description: 'Main design system for Trans Bot AI platform',
        status: 'active',
        components: 45,
        tokens: 120,
        lastRelease: '1 week ago',
        documentationUrl: 'https://design.transbot.ai',
        figmaUrl: 'https://figma.com/team/transbot',
        coverage: 85
      },
      {
        id: '2',
        name: 'Mobile Design System',
        version: '1.0.0',
        description: 'Mobile-specific design system',
        status: 'beta',
        components: 28,
        tokens: 85,
        lastRelease: '2 weeks ago',
        documentationUrl: 'https://mobile.design.transbot.ai',
        figmaUrl: 'https://figma.com/team/transbot-mobile',
        coverage: 65
      }
    ]),

  getDesignReviews: (): Promise<DesignReview[]> => 
    Promise.resolve([
      {
        id: '1',
        componentId: '2',
        reviewer: 'Alex Chen',
        status: 'changes-requested',
        comments: 'Please improve contrast ratio for better accessibility',
        timestamp: '1 hour ago',
        priority: 'medium',
        designScore: 85,
        accessibilityScore: 70,
        usabilityScore: 90
      },
      {
        id: '2',
        componentId: '3',
        reviewer: 'Maria Garcia',
        status: 'approved',
        comments: 'Excellent implementation! Great accessibility features.',
        timestamp: '30 minutes ago',
        priority: 'high',
        designScore: 95,
        accessibilityScore: 92,
        usabilityScore: 88
      },
      {
        id: '3',
        componentId: '4',
        reviewer: 'David Kim',
        status: 'pending',
        comments: 'Waiting for accessibility audit results',
        timestamp: '2 hours ago',
        priority: 'high',
        designScore: 0,
        accessibilityScore: 0,
        usabilityScore: 0
      }
    ])
};

const UIUXDesignerPage = () => {
  const { toast } = useToast();
  const [designComponents, setDesignComponents] = useState<DesignComponent[]>([]);
  const [designTokens, setDesignTokens] = useState<DesignToken[]>([]);
  const [designSystems, setDesignSystems] = useState<DesignSystem[]>([]);
  const [designReviews, setDesignReviews] = useState<DesignReview[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showAddComponentDialog, setShowAddComponentDialog] = useState(false);
  const [newComponent, setNewComponent] = useState({
    name: '',
    category: 'button' as const,
    priority: 'medium' as const,
    designer: '',
    description: ''
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [componentsData, tokensData, systemsData, reviewsData] = await Promise.all([
          mockAPI.getDesignComponents(),
          mockAPI.getDesignTokens(),
          mockAPI.getDesignSystems(),
          mockAPI.getDesignReviews()
        ]);

        setDesignComponents(componentsData);
        setDesignTokens(tokensData);
        setDesignSystems(systemsData);
        setDesignReviews(reviewsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load design data",
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
      const component: DesignComponent = {
        id: Date.now().toString(),
        name: newComponent.name,
        category: newComponent.category,
        status: 'draft',
        priority: newComponent.priority,
        designer: newComponent.designer,
        lastUpdated: 'Just now',
        description: newComponent.description,
        usageCount: 0,
        accessibilityScore: 0,
        responsive: true,
        darkMode: true
      };

      setDesignComponents(prev => [...prev, component]);
      setShowAddComponentDialog(false);
      setNewComponent({
        name: '',
        category: 'button',
        priority: 'medium',
        designer: '',
        description: ''
      });

      toast({
        title: "Success",
        description: "Design component added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add design component",
        variant: "destructive"
      });
    }
  };

  const handleUpdateComponentStatus = async (componentId: string, status: DesignComponent['status']) => {
    try {
      setDesignComponents(prev => prev.map(comp => 
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-500';
      case 'approved': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'button': return 'bg-blue-100 text-blue-800';
      case 'form': return 'bg-green-100 text-green-800';
      case 'card': return 'bg-purple-100 text-purple-800';
      case 'modal': return 'bg-orange-100 text-orange-800';
      case 'navigation': return 'bg-pink-100 text-pink-800';
      case 'layout': return 'bg-indigo-100 text-indigo-800';
      case 'typography': return 'bg-teal-100 text-teal-800';
      case 'icon': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              UI/UX Designer Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              Design system management, component library, and design workflow
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-pink-200">
              <Palette className="w-4 h-4 mr-1" />
              Design Active
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
              <CardTitle className="text-sm font-medium">Design Components</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designComponents.length}</div>
              <p className="text-xs text-muted-foreground">
                {designComponents.filter(c => c.status === 'implemented').length} implemented
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Design Tokens</CardTitle>
              <PaletteIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designTokens.length}</div>
              <p className="text-xs text-muted-foreground">
                {designTokens.filter(t => !t.deprecated).length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Design Systems</CardTitle>
              <Grid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designSystems.length}</div>
              <p className="text-xs text-muted-foreground">
                {designSystems.filter(s => s.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designReviews.filter(r => r.status === 'pending').length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
            <TabsTrigger value="systems">Design Systems</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Design Components</CardTitle>
                    <CardDescription>Manage design components and their status</CardDescription>
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
                        <DialogTitle>Add New Design Component</DialogTitle>
                        <DialogDescription>
                          Create a new design component with specifications.
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
                          <Label htmlFor="category">Category</Label>
                          <Select value={newComponent.category} onValueChange={(value: 'button' | 'form' | 'card' | 'modal' | 'navigation' | 'layout' | 'typography' | 'icon') => setNewComponent(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="button">Button</SelectItem>
                              <SelectItem value="form">Form</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="modal">Modal</SelectItem>
                              <SelectItem value="navigation">Navigation</SelectItem>
                              <SelectItem value="layout">Layout</SelectItem>
                              <SelectItem value="typography">Typography</SelectItem>
                              <SelectItem value="icon">Icon</SelectItem>
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
                          <Label htmlFor="designer">Designer</Label>
                          <Input
                            id="designer"
                            value={newComponent.designer}
                            onChange={(e) => setNewComponent(prev => ({ ...prev, designer: e.target.value }))}
                            placeholder="Enter designer name"
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
                        <Button onClick={handleAddComponent} disabled={!newComponent.name || !newComponent.designer}>
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
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Designer</TableHead>
                      <TableHead>Accessibility</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designComponents.map((component) => (
                      <TableRow key={component.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{component.name}</div>
                            <div className="text-sm text-muted-foreground">{component.description}</div>
                            {component.figmaLink && (
                              <div className="text-sm text-blue-600 mt-1">
                                <ExternalLink className="w-3 h-3 inline mr-1" />
                                Figma Link
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(component.category)}>
                            {component.category}
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
                        <TableCell>{component.designer}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{component.accessibilityScore}%</div>
                            <div className="text-muted-foreground">
                              {component.responsive && <Smartphone className="w-3 h-3 inline mr-1" />}
                              {component.darkMode && <Eye className="w-3 h-3 inline" />}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{component.usageCount}</div>
                          <div className="text-muted-foreground">Last: {component.lastUpdated}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Select value={component.status} onValueChange={(value: DesignComponent['status']) => handleUpdateComponentStatus(component.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="implemented">Implemented</SelectItem>
                                <SelectItem value="deprecated">Deprecated</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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

          {/* Design Tokens Tab */}
          <TabsContent value="tokens" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Design Tokens</CardTitle>
                <CardDescription>Manage design tokens and their usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designTokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-muted-foreground">{token.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {token.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {token.category === 'color' && (
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: token.value }}
                              />
                            )}
                            <span className="font-mono text-sm">{token.value}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{token.usage}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={token.deprecated ? 'destructive' : 'default'}>
                            {token.deprecated ? 'Deprecated' : 'Active'}
                          </Badge>
                          {token.deprecated && token.replacement && (
                            <div className="text-xs text-muted-foreground mt-1">
                              → {token.replacement}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{token.lastUpdated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Systems Tab */}
          <TabsContent value="systems" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Design Systems</CardTitle>
                <CardDescription>Manage design systems and their coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Components</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Coverage</TableHead>
                      <TableHead>Last Release</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designSystems.map((system) => (
                      <TableRow key={system.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{system.name}</div>
                            <div className="text-sm text-muted-foreground">{system.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{system.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            system.status === 'active' ? 'default' :
                            system.status === 'beta' ? 'secondary' : 'destructive'
                          }>
                            {system.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{system.components}</TableCell>
                        <TableCell>{system.tokens}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{system.coverage}%</span>
                            </div>
                            <Progress value={system.coverage} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{system.lastRelease}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Design Reviews</CardTitle>
                <CardDescription>Track design review status and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Design Score</TableHead>
                      <TableHead>Accessibility</TableHead>
                      <TableHead>Usability</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {designComponents.find(c => c.id === review.componentId)?.name || 'Unknown'}
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
                          <div className="text-sm font-medium">{review.designScore}%</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{review.accessibilityScore}%</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{review.usabilityScore}%</div>
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
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default UIUXDesignerPage;
