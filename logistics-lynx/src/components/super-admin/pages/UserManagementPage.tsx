import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Users, UserPlus, UserCheck, UserX, Shield, Settings, 
  Search, Filter, Download, Upload, Edit, Trash2, Eye,
  MoreHorizontal, Plus, RefreshCw, AlertTriangle, CheckCircle,
  Clock, Ban, Crown, Star, Zap, Activity, TrendingUp,
  Mail, Phone, MapPin, Calendar, Building2, Globe,
  Lock, Unlock, Key, EyeOff, Eye as VisibilityIcon,
  User as UserIcon, Shield as ShieldIcon, Settings as SettingsIcon,
  Users as UsersIcon, UserPlus as UserPlusIcon, UserCheck as UserCheckIcon,
  UserX as UserXIcon, Shield as SecurityIcon, Settings as ConfigIcon,
  Search as SearchIcon, Filter as FilterIcon, Download as DownloadIcon,
  Upload as UploadIcon, Edit as EditIcon, Trash2 as DeleteIcon,
  Eye as ViewIcon, MoreHorizontal as MoreIcon, Plus as AddIcon,
  RefreshCw as RefreshIcon, AlertTriangle as WarningIcon,
  CheckCircle as SuccessIcon, Clock as TimeIcon, Ban as BanIcon,
  Crown as AdminIcon, Star as PremiumIcon, Zap as ActiveIcon,
  Activity as ActivityIcon, TrendingUp as GrowthIcon,
  Mail as EmailIcon, Phone as PhoneIcon, MapPin as LocationIcon,
  Calendar as DateIcon, Building2 as CompanyIcon, Globe as GlobalIcon,
  Lock as LockIcon, Unlock as UnlockIcon, Key as KeyIcon,
  EyeOff as HiddenIcon
} from 'lucide-react';

// Import MCP Design System
import '../../styles/mcp-design-system.css';

const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all-users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Enhanced mock user data
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-12-19 14:30:00',
      joinDate: '2024-01-15',
      avatar: '/api/avatar/john-smith',
      department: 'Engineering',
      location: 'New York',
      permissions: ['read', 'write', 'admin'],
      activityScore: 95,
      securityLevel: 'high'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2024-12-19 13:45:00',
      joinDate: '2024-02-20',
      avatar: '/api/avatar/sarah-johnson',
      department: 'Marketing',
      location: 'Los Angeles',
      permissions: ['read', 'write'],
      activityScore: 88,
      securityLevel: 'medium'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'User',
      status: 'pending',
      lastLogin: '2024-12-18 16:20:00',
      joinDate: '2024-03-10',
      avatar: '/api/avatar/mike-wilson',
      department: 'Sales',
      location: 'Chicago',
      permissions: ['read'],
      activityScore: 72,
      securityLevel: 'low'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-12-19 15:10:00',
      joinDate: '2023-11-05',
      avatar: '/api/avatar/emily-davis',
      department: 'IT',
      location: 'San Francisco',
      permissions: ['read', 'write', 'admin', 'super_admin'],
      activityScore: 98,
      securityLevel: 'maximum'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'User',
      status: 'suspended',
      lastLogin: '2024-12-15 09:30:00',
      joinDate: '2024-04-12',
      avatar: '/api/avatar/david-brown',
      department: 'HR',
      location: 'Boston',
      permissions: ['read'],
      activityScore: 45,
      securityLevel: 'low'
    }
  ];

  const stats = {
    totalUsers: 2847,
    activeUsers: 2654,
    pendingUsers: 23,
    suspendedUsers: 170,
    newThisMonth: 156,
    growthRate: 5.2,
    averageActivity: 87,
    securityScore: 94
  };

  const roles = [
    { id: 'super_admin', name: 'Super Admin', count: 3, color: 'bg-red-100 text-red-800' },
    { id: 'admin', name: 'Admin', count: 12, color: 'bg-orange-100 text-orange-800' },
    { id: 'manager', name: 'Manager', count: 45, color: 'bg-blue-100 text-blue-800' },
    { id: 'user', name: 'User', count: 2787, color: 'bg-green-100 text-green-800' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'super admin': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'admin': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'user': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'maximum': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleBulkAction = async (action: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSelectedUsers([]);
    setShowBulkActions(false);
    setLoading(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <TooltipProvider>
      <div className="p-6 space-y-8">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      User Management
                    </h1>
                    <p className="text-lg text-blue-100 mt-2">
                      Manage users, roles, permissions, and access control
                    </p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{stats.totalUsers.toLocaleString()} Total Users</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">{stats.activeUsers.toLocaleString()} Active</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm font-medium">{stats.pendingUsers} Pending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => setShowAddUserDialog(true)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add User
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Users</p>
                  <p className="text-xs text-green-600 font-medium">+{stats.growthRate}% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/50">
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.pendingUsers}</p>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Pending Approval</p>
                  <p className="text-xs text-yellow-600 font-medium">Requires action</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/50">
                  <UserX className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.suspendedUsers}</p>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Suspended Users</p>
                  <p className="text-xs text-red-600 font-medium">Needs review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.newThisMonth}</p>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">New This Month</p>
                  <p className="text-xs text-blue-600 font-medium">Growing rapidly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="all-users" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>All Users</span>
                </TabsTrigger>
                <TabsTrigger value="active-users" className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Active</span>
                </TabsTrigger>
                <TabsTrigger value="pending-users" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Pending</span>
                </TabsTrigger>
                <TabsTrigger value="suspended-users" className="flex items-center space-x-2">
                  <UserX className="w-4 h-4" />
                  <span>Suspended</span>
                </TabsTrigger>
                <TabsTrigger value="roles" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Roles</span>
                </TabsTrigger>
                <TabsTrigger value="permissions" className="flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>Permissions</span>
                </TabsTrigger>
              </TabsList>

              {/* All Users Tab */}
              <TabsContent value="all-users" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="super admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Bulk Actions */}
                {showBulkActions && (
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{selectedUsers.length} users selected</span>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])}>
                        Clear Selection
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('suspend')}>
                        <UserX className="w-4 h-4 mr-2" />
                        Suspend
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}

                {/* Users Table */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>User List</span>
                      <Badge variant="secondary">{filteredUsers.length} users</Badge>
                    </CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers(filteredUsers.map(u => u.id));
                                  setShowBulkActions(true);
                                } else {
                                  setSelectedUsers([]);
                                  setShowBulkActions(false);
                                }
                              }}
                            />
                          </TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead>Security</TableHead>
                          <TableHead className="w-12">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers([...selectedUsers, user.id]);
                                    setShowBulkActions(true);
                                  } else {
                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                    if (selectedUsers.length === 1) setShowBulkActions(false);
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{user.department}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={user.activityScore} className="w-16 h-2" />
                                <span className="text-sm font-medium">{user.activityScore}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getSecurityLevelColor(user.securityLevel)}>
                                {user.securityLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit User</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>More Actions</TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Active Users Tab */}
              <TabsContent value="active-users" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      <span>Active Users</span>
                    </CardTitle>
                    <CardDescription>Users with active accounts and recent activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {users.filter(u => u.status === 'active').map((user) => (
                        <div key={user.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                              <Badge className={`text-xs mt-1 ${getRoleColor(user.role)}`}>
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Activity Score</span>
                              <span className="font-medium">{user.activityScore}%</span>
                            </div>
                            <Progress value={user.activityScore} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Roles Tab */}
              <TabsContent value="roles" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Role Management</span>
                    </CardTitle>
                    <CardDescription>Configure user roles and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {roles.map((role) => (
                        <div key={role.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={role.color}>
                              {role.name}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-2xl font-bold">{role.count.toLocaleString()}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">users</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="w-5 h-5 text-purple-600" />
                      <span>Permission Management</span>
                    </CardTitle>
                    <CardDescription>Configure system permissions and access control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Read Access</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">View data and reports</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Write Access</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Create and edit data</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Admin Access</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">System administration</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Super Admin</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Full system control</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Add User Dialog */}
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Enter department" className="mt-1" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                Cancel
              </Button>
              <Button>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default UserManagementPage;
