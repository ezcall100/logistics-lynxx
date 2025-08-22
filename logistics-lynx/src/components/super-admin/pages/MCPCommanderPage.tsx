import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Command, Settings, Play, Pause, RotateCcw, CheckCircle, 
  AlertTriangle, Clock, Calendar, Server, Database, Globe, 
  Code, Terminal, Activity, TrendingUp, Plus, Edit, Trash2, 
  Download, Upload, Eye, EyeOff, RefreshCw, Save, XCircle, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Copy, Archive,
  Share, Lock, Unlock, Shield, Zap, Target, Award, Trophy,
  Users, Globe2, Cpu, HardDrive, Network, Wifi, ShieldCheck,
  Rocket, Brain, CircuitBoard, Gauge, BarChart3, PieChart
} from 'lucide-react';

// Import MCP Design System
import '@/styles/mcp-design-system.css';
import {
  MCPStatusBadge,
  MCPMetricCard,
  MCPProgressCard,
  MCPActionButton,
  MCPSystemStatus,
  MCPAlertCard,
  MCPDataTable,
  MCPLoadingSkeleton,
  MCPEmptyState
} from '@/components/ui/mcp-components';

interface CommanderTask {
  id: string;
  name: string;
  type: 'deployment' | 'backup' | 'security' | 'maintenance' | 'monitoring';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  progress: number;
  description: string;
  tags: string[];
  estimatedDuration: string;
  actualDuration?: string;
}

interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (selectedIds: string[]) => void;
  variant?: 'default' | 'destructive' | 'outline';
  disabled?: boolean;
}

const MCPCommanderPage: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<CommanderTask[]>([
    {
      id: '1',
      name: 'Database Backup - Production',
      type: 'backup',
      status: 'running',
      priority: 'high',
      assignedTo: 'system-backup',
      createdAt: '2024-01-15 14:00:00',
      startedAt: '2024-01-15 14:05:00',
      progress: 65,
      description: 'Automated daily backup of production database',
      tags: ['backup', 'production', 'database'],
      estimatedDuration: '30m'
    },
    {
      id: '2',
      name: 'Security Scan - All Systems',
      type: 'security',
      status: 'completed',
      priority: 'critical',
      assignedTo: 'security-scanner',
      createdAt: '2024-01-15 13:00:00',
      startedAt: '2024-01-15 13:05:00',
      completedAt: '2024-01-15 13:45:00',
      progress: 100,
      description: 'Comprehensive security vulnerability scan',
      tags: ['security', 'scan', 'vulnerability'],
      estimatedDuration: '45m',
      actualDuration: '40m'
    },
    {
      id: '3',
      name: 'Frontend Deployment - v2.1.0',
      type: 'deployment',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'deployment-bot',
      createdAt: '2024-01-15 14:30:00',
      progress: 0,
      description: 'Deploy new frontend version to staging environment',
      tags: ['deployment', 'frontend', 'staging'],
      estimatedDuration: '15m'
    }
  ]);

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showBulkToolbar, setShowBulkToolbar] = useState(false);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [taskDetailsDialog, setTaskDetailsDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CommanderTask | null>(null);
  const [loading, setLoading] = useState(false);

  // Bulk actions configuration
  const bulkActions: BulkAction[] = [
    {
      id: 'start',
      label: 'Start Selected',
      icon: <Play className="w-4 h-4" />,
      action: (ids) => handleBulkAction('start', ids),
      disabled: selectedTasks.length === 0
    },
    {
      id: 'pause',
      label: 'Pause Selected',
      icon: <Pause className="w-4 h-4" />,
      action: (ids) => handleBulkAction('pause', ids),
      disabled: selectedTasks.length === 0
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: <Trash2 className="w-4 h-4" />,
      action: (ids) => {
        setSelectedTasks(ids);
        setDeleteConfirmDialog(true);
      },
      variant: 'destructive',
      disabled: selectedTasks.length === 0
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: <Download className="w-4 h-4" />,
      action: (ids) => handleBulkAction('export', ids),
      disabled: selectedTasks.length === 0
    }
  ];

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deployment': return <Globe className="w-4 h-4" />;
      case 'backup': return <Database className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'monitoring': return <Activity className="w-4 h-4" />;
      default: return <Command className="w-4 h-4" />;
    }
  };

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(tasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleBulkAction = (action: string, taskIds: string[]) => {
    setLoading(true);
    setTimeout(() => {
      switch (action) {
        case 'start':
          setTasks(prev => prev.map(task => 
            taskIds.includes(task.id) && task.status === 'pending'
              ? { ...task, status: 'running', startedAt: new Date().toISOString() }
              : task
          ));
          toast({
            title: "Tasks Started",
            description: `${taskIds.length} tasks have been started.`,
          });
          break;
        case 'pause':
          setTasks(prev => prev.map(task => 
            taskIds.includes(task.id) && task.status === 'running'
              ? { ...task, status: 'pending' }
              : task
          ));
          toast({
            title: "Tasks Paused",
            description: `${taskIds.length} tasks have been paused.`,
          });
          break;
        case 'export':
          toast({
            title: "Export Started",
            description: `Exporting ${taskIds.length} tasks...`,
          });
          break;
      }
      setSelectedTasks([]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteTasks = () => {
    setLoading(true);
    setTimeout(() => {
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
      setDeleteConfirmDialog(false);
      toast({
        title: "Tasks Deleted",
        description: `${selectedTasks.length} tasks have been deleted.`,
      });
      setLoading(false);
    }, 1000);
  };

  const handleRowAction = (action: string, task: CommanderTask) => {
    switch (action) {
      case 'view':
        setSelectedTask(task);
        setTaskDetailsDialog(true);
        break;
      case 'edit':
        toast({
          title: "Edit Task",
          description: `Editing task: ${task.name}`,
        });
        break;
      case 'delete':
        setSelectedTask(task);
        setSelectedTasks([task.id]);
        setDeleteConfirmDialog(true);
        break;
      case 'duplicate':
        const newTask = {
          ...task,
          id: Date.now().toString(),
          name: `${task.name} (Copy)`,
          status: 'pending' as const,
          createdAt: new Date().toISOString(),
          progress: 0
        };
        setTasks([newTask, ...tasks]);
        toast({
          title: "Task Duplicated",
          description: `Task "${task.name}" has been duplicated.`,
        });
        break;
      case 'archive':
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'cancelled' as const } : t
        ));
        toast({
          title: "Task Archived",
          description: `Task "${task.name}" has been archived.`,
        });
        break;
    }
  };

  // Show bulk toolbar when tasks are selected
  useEffect(() => {
    setShowBulkToolbar(selectedTasks.length > 0);
  }, [selectedTasks]);

  // Calculate metrics
  const metrics = {
    total: tasks.length,
    running: tasks.filter(t => t.status === 'running').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    failed: tasks.filter(t => t.status === 'failed').length,
    critical: tasks.filter(t => t.priority === 'critical').length
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Enhanced Hero Header */}
        <div className="mcp-hero relative overflow-hidden text-white">
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                      <Command className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      MCP Commander
                    </h1>
                    <p className="text-xl text-blue-100 mt-3">
                      Advanced Task Management & Command Center
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Live Status Indicators */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-lg font-medium">Active Tasks: {metrics.running}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-lg font-medium">Completed: {metrics.completed}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span className="text-lg font-medium">Pending: {metrics.pending}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <span className="text-lg font-medium">Critical: {metrics.critical}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MCPActionButton
                  variant="secondary"
                  icon={Plus}
                  onClick={() => toast({ title: "New Task", description: "Creating new task..." })}
                >
                  New Task
                </MCPActionButton>
                <MCPActionButton
                  variant="ghost"
                  icon={RefreshCw}
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                    toast({ title: "Refreshed", description: "Task data updated." });
                  }}
                >
                  Refresh
                </MCPActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bulk Actions Toolbar */}
        {showBulkToolbar && (
          <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-lg">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-700">
                    {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTasks([])}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  {bulkActions.map((action) => (
                    <MCPActionButton
                      key={action.id}
                      variant={action.variant as any}
                      size="sm"
                      onClick={() => action.action(selectedTasks)}
                      disabled={action.disabled}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </MCPActionButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content */}
        <div className="p-8 space-y-8">
          {/* Enhanced Metrics Dashboard */}
          <div className="mcp-card-grid">
            <MCPMetricCard
              title="Total Tasks"
              value={metrics.total}
              icon={Command}
              trend="up"
              change={{ value: 12, type: 'increase', period: 'last week' }}
            />
            <MCPMetricCard
              title="Active Tasks"
              value={metrics.running}
              icon={Activity}
              status="info"
              trend="up"
            />
            <MCPMetricCard
              title="Success Rate"
              value={`${((metrics.completed / metrics.total) * 100).toFixed(1)}%`}
              icon={CheckCircle}
              status="success"
              trend="up"
              change={{ value: 5.2, type: 'increase', period: 'last week' }}
            />
            <MCPMetricCard
              title="Critical Tasks"
              value={metrics.critical}
              icon={AlertTriangle}
              status="error"
              trend="down"
            />
          </div>

          {/* Enhanced Task Management */}
          <Card className="mcp-glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Command className="w-6 h-6 text-primary" />
                    Commander Tasks
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Manage and monitor system tasks and operations
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <MCPActionButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => toast({ title: "New Task", description: "Creating new task..." })}
                  >
                    New Task
                  </MCPActionButton>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <MCPLoadingSkeleton type="table" count={3} />
              ) : tasks.length === 0 ? (
                <MCPEmptyState
                  icon={Command}
                  title="No Tasks Found"
                  description="Create your first task to get started with the MCP Commander."
                  action={{
                    label: "Create Task",
                    onClick: () => toast({ title: "New Task", description: "Creating new task..." })
                  }}
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedTasks.length === tasks.length && tasks.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id} className="group mcp-table-row">
                        <TableCell>
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={(checked) => handleTaskSelection(task.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{task.name}</p>
                            <p className="text-sm text-slate-500">{task.description}</p>
                            <div className="flex space-x-1 mt-1">
                              {task.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(task.type)}
                            <span className="capitalize">{task.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <MCPStatusBadge
                            status={task.status === 'running' ? 'operational' : 
                                   task.status === 'completed' ? 'operational' :
                                   task.status === 'failed' ? 'critical' :
                                   task.status === 'pending' ? 'degraded' : 'offline'}
                            size="sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <MCPProgressCard
                            title=""
                            value={task.progress}
                            max={100}
                            unit="%"
                            showPercentage={false}
                            className="border-0 shadow-none bg-transparent"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{task.assignedTo}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{task.createdAt}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRowAction('view', task)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRowAction('edit', task)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Task</TooltipContent>
                            </Tooltip>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRowAction('duplicate', task)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRowAction('archive', task)}>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleRowAction('delete', task)} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmDialog} onOpenChange={setDeleteConfirmDialog}>
          <DialogContent className="mcp-glass-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmDialog(false)}>
                Cancel
              </Button>
              <MCPActionButton
                variant="destructive"
                loading={loading}
                onClick={handleDeleteTasks}
              >
                Delete
              </MCPActionButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Enhanced Task Details Dialog */}
        <Dialog open={taskDetailsDialog} onOpenChange={setTaskDetailsDialog}>
          <DialogContent className="mcp-glass-card max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedTask && getTypeIcon(selectedTask.type)}
                <span>Task Details - {selectedTask?.name}</span>
              </DialogTitle>
              <DialogDescription>
                Detailed information about this task
              </DialogDescription>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Task ID</Label>
                    <Input value={selectedTask.id} readOnly className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Input value={selectedTask.type} readOnly className="bg-slate-50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <MCPStatusBadge status={selectedTask.status === 'running' ? 'operational' : 
                                           selectedTask.status === 'completed' ? 'operational' :
                                           selectedTask.status === 'failed' ? 'critical' :
                                           selectedTask.status === 'pending' ? 'degraded' : 'offline'} />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedTask.priority)}>
                      {selectedTask.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={selectedTask.description}
                    readOnly
                    rows={3}
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Progress</Label>
                  <MCPProgressCard
                    title=""
                    value={selectedTask.progress}
                    max={100}
                    unit="%"
                    className="border-0 shadow-none bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Created</Label>
                    <Input value={selectedTask.createdAt} readOnly className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Input value={selectedTask.assignedTo} readOnly className="bg-slate-50" />
                  </div>
                </div>
                {selectedTask.startedAt && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Started At</Label>
                      <Input value={selectedTask.startedAt} readOnly className="bg-slate-50" />
                    </div>
                    {selectedTask.completedAt && (
                      <div className="space-y-2">
                        <Label>Completed At</Label>
                        <Input value={selectedTask.completedAt} readOnly className="bg-slate-50" />
                      </div>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    {selectedTask.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setTaskDetailsDialog(false)}>
                Close
              </Button>
              <MCPActionButton
                onClick={() => {
                  if (selectedTask) {
                    handleRowAction('edit', selectedTask);
                    setTaskDetailsDialog(false);
                  }
                }}
              >
                Edit Task
              </MCPActionButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default MCPCommanderPage;
