import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import TransBotLogo from '../../ui/TransBotLogo';

// Icons
import { 
  Brain, Shield, Users, Settings, Database, Globe, Activity, 
  BarChart3, Lock, Search, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Server, Network, Zap, Eye, EyeOff, RefreshCw,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  LogOut, Sun, Moon, ChevronDown, ChevronLeft, ChevronRight,
  Home, Building2, Phone, Mail, MapPin, Calendar, DollarSign,
  Truck, Package, Car, Briefcase, Calculator, FileText,
  ShieldCheck, Key, Fingerprint, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  ExternalLink, Copy, Share2, Maximize2, Minimize2, Menu,
  Code, Bug, Palette, LayoutDashboard, GitBranch, Cloud,
  Database as DatabaseIcon, Shield as ShieldIcon, Activity as ActivityIcon
} from 'lucide-react';

// Real data models
interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  uptime: string;
  lastBackup: string;
}

interface AgentStatus {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'qa' | 'design' | 'devops' | 'database' | 'security' | 'performance';
  status: 'active' | 'idle' | 'error' | 'offline';
  uptime: string;
  tasks: number;
  performance: number;
  lastActivity: string;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar?: string;
}

// Mock API functions
const mockAPI = {
  getSystemMetrics: (): Promise<SystemMetrics> => 
    Promise.resolve({
      cpu: 68,
      memory: 72,
      storage: 45,
      network: 89,
      uptime: '15 days, 7 hours, 32 minutes',
      lastBackup: '2 hours ago'
    }),

  getAgentStatus: (): Promise<AgentStatus[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Frontend Developer Agent',
        type: 'frontend',
        status: 'active',
        uptime: '12 days',
        tasks: 15,
        performance: 95,
        lastActivity: '2 minutes ago'
      },
      {
        id: '2',
        name: 'Backend API Agent',
        type: 'backend',
        status: 'active',
        uptime: '8 days',
        tasks: 23,
        performance: 88,
        lastActivity: '1 minute ago'
      },
      {
        id: '3',
        name: 'QA Testing Agent',
        type: 'qa',
        status: 'active',
        uptime: '5 days',
        tasks: 8,
        performance: 92,
        lastActivity: '5 minutes ago'
      },
      {
        id: '4',
        name: 'UI/UX Designer Agent',
        type: 'design',
        status: 'idle',
        uptime: '3 days',
        tasks: 0,
        performance: 100,
        lastActivity: '1 hour ago'
      },
      {
        id: '5',
        name: 'DevOps Agent',
        type: 'devops',
        status: 'active',
        uptime: '20 days',
        tasks: 12,
        performance: 97,
        lastActivity: '30 seconds ago'
      },
      {
        id: '6',
        name: 'Database Optimizer',
        type: 'database',
        status: 'active',
        uptime: '25 days',
        tasks: 6,
        performance: 89,
        lastActivity: '10 minutes ago'
      },
      {
        id: '7',
        name: 'Security Scanner',
        type: 'security',
        status: 'active',
        uptime: '18 days',
        tasks: 4,
        performance: 94,
        lastActivity: '15 minutes ago'
      },
      {
        id: '8',
        name: 'Performance Monitor',
        type: 'performance',
        status: 'active',
        uptime: '22 days',
        tasks: 19,
        performance: 91,
        lastActivity: '1 minute ago'
      }
    ]),

  getSystemAlerts: (): Promise<SystemAlert[]> => 
    Promise.resolve([
      {
        id: '1',
        type: 'info',
        title: 'System Optimization',
        message: 'Autonomous system optimization in progress',
        timestamp: '2 minutes ago',
        severity: 'low',
        resolved: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Memory usage has reached 85% threshold',
        timestamp: '5 minutes ago',
        severity: 'medium',
        resolved: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Backup Completed',
        message: 'System backup completed successfully',
        timestamp: '10 minutes ago',
        severity: 'low',
        resolved: true
      },
      {
        id: '4',
        type: 'error',
        title: 'Database Connection',
        message: 'Temporary database connection issue detected',
        timestamp: '15 minutes ago',
        severity: 'high',
        resolved: false
      }
    ]),

  getUsers: (): Promise<User[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@transbot.ai',
        role: 'Super Admin',
        status: 'active',
        lastLogin: '2 minutes ago',
        avatar: '/avatars/john.jpg'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@transbot.ai',
        role: 'System Admin',
        status: 'active',
        lastLogin: '1 hour ago',
        avatar: '/avatars/sarah.jpg'
      },
      {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@transbot.ai',
        role: 'Developer',
        status: 'active',
        lastLogin: '3 hours ago',
        avatar: '/avatars/mike.jpg'
      },
      {
        id: '4',
        name: 'Lisa Wilson',
        email: 'lisa.wilson@transbot.ai',
        role: 'QA Engineer',
        status: 'inactive',
        lastLogin: '2 days ago',
        avatar: '/avatars/lisa.jpg'
      }
    ])
};

const DashboardPage = () => {
  const { toast } = useToast();
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Form states
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active' as const
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [metrics, agentData, alertData, userData] = await Promise.all([
          mockAPI.getSystemMetrics(),
          mockAPI.getAgentStatus(),
          mockAPI.getSystemAlerts(),
          mockAPI.getUsers()
        ]);

        setSystemMetrics(metrics);
        setAgents(agentData);
        setAlerts(alertData);
        setUsers(userData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
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
  const handleAddUser = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        lastLogin: 'Never'
      };

      setUsers(prev => [...prev, user]);
      setShowAddUserDialog(false);
      setNewUser({ name: '', email: '', role: '', status: 'active' });

      toast({
        title: "Success",
        description: "User added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== userId));
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const handleToggleAgent = async (agentId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === 'active' ? 'idle' : 'active' }
          : agent
      ));

      toast({
        title: "Success",
        description: "Agent status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update agent status",
        variant: "destructive"
      });
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true }
          : alert
      ));

      toast({
        title: "Success",
        description: "Alert resolved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve alert",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Super Admin Command Center
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              Autonomous TMS System Control & Monitoring
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-4 h-4 mr-1" />
              System Operational
            </Badge>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TransBotLogo size="md" animated={true} />
              <div>
                <CardTitle className="text-xl">System Overview</CardTitle>
                <CardDescription>Real-time system metrics and performance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {systemMetrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">CPU Usage</span>
                    <span className="text-sm font-bold text-slate-800">{systemMetrics.cpu}%</span>
                  </div>
                  <Progress value={systemMetrics.cpu} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Memory Usage</span>
                    <span className="text-sm font-bold text-slate-800">{systemMetrics.memory}%</span>
                  </div>
                  <Progress value={systemMetrics.memory} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Storage</span>
                    <span className="text-sm font-bold text-slate-800">{systemMetrics.storage}%</span>
                  </div>
                  <Progress value={systemMetrics.storage} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Network</span>
                    <span className="text-sm font-bold text-slate-800">{systemMetrics.network}%</span>
                  </div>
                  <Progress value={systemMetrics.network} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="agents">Autonomous Agents</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Autonomous Agents Tab */}
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Autonomous Agents Status</CardTitle>
                    <CardDescription>Monitor and control all AI agents</CardDescription>
                  </div>
                  <Badge variant="outline">{agents.filter(a => a.status === 'active').length} Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agents.map((agent) => (
                    <Card key={agent.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                            <div>
                              <CardTitle className="text-lg">{agent.name}</CardTitle>
                              <CardDescription>Uptime: {agent.uptime}</CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleAgent(agent.id)}
                          >
                            {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tasks:</span>
                            <span className="font-medium">{agent.tasks}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Performance:</span>
                            <span className="font-medium">{agent.performance}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Last Activity:</span>
                            <span className="font-medium">{agent.lastActivity}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Monitor system notifications and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {alert.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                             alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                             alert.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                             <Info className="w-4 h-4 text-blue-600" />}
                            <span className="capitalize">{alert.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{alert.title}</TableCell>
                        <TableCell>{alert.message}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant={alert.resolved ? "secondary" : "default"}>
                            {alert.resolved ? "Resolved" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!alert.resolved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage system users and permissions</CardDescription>
                  </div>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account with appropriate permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Super Admin">Super Admin</SelectItem>
                              <SelectItem value="System Admin">System Admin</SelectItem>
                              <SelectItem value="Developer">Developer</SelectItem>
                              <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select value={newUser.status} onValueChange={(value: 'active' | 'inactive') => setNewUser(prev => ({ ...prev, status: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email || !newUser.role}>
                          Add User
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
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agents.filter(a => a.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">
                    {agents.length} total agents
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    {systemMetrics?.uptime}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alerts.filter(a => !a.resolved).length}</div>
                  <p className="text-xs text-muted-foreground">
                    {alerts.length} total alerts
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>System performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Performance charts would be rendered here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;
