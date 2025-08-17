/**
 * Software Admin Portal
 * Comprehensive system administration and management interface
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Settings, 
  Users, 
  Shield, 
  BarChart3, 
  Database, 
  Server, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Globe,
  Lock,
  Unlock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Bell,
  UserCheck,
  FileCheck,
  Truck,
  Building2,
  Package,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Star,
  Zap,
  Target,
  Award,
  DollarSign,
  PieChart,
  LineChart,
  BarChart,
  Grid3X3,
  List,
  Filter,
  Search
} from 'lucide-react';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalCarriers: number;
  totalBrokers: number;
  totalShippers: number;
  systemHealth: number;
  uptime: number;
  activeSessions: number;
  pendingReviews: number;
  completedReviews: number;
  revenue: number;
  growthRate: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  avatar: string;
}

const SoftwareAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const systemStats: SystemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalCarriers: 456,
    totalBrokers: 234,
    totalShippers: 557,
    systemHealth: 98.5,
    uptime: 99.9,
    activeSessions: 156,
    pendingReviews: 23,
    completedReviews: 189,
    revenue: 1250000,
    growthRate: 15.3
  };

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Software Admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2023-06-15',
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Broker Admin',
      status: 'active',
      lastLogin: '2024-01-15 13:45',
      createdAt: '2023-08-22',
      avatar: 'SJ'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'Carrier Admin',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15',
      createdAt: '2023-09-10',
      avatar: 'MW'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100"><Clock className="h-3 w-3 mr-1" />Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Software Admin':
        return <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-100"><Shield className="h-3 w-3 mr-1" />Software Admin</Badge>;
      case 'Broker Admin':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Building2 className="h-3 w-3 mr-1" />Broker Admin</Badge>;
      case 'Carrier Admin':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><Truck className="h-3 w-3 mr-1" />Carrier Admin</Badge>;
      case 'Shipper':
        return <Badge variant="default" className="bg-orange-100 text-orange-800 hover:bg-orange-100"><Package className="h-3 w-3 mr-1" />Shipper</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="h-8 w-8 text-purple-600 mr-3" />
                Software Admin Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Complete system administration and management interface
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                  <p className="text-purple-200 text-sm">+{systemStats.growthRate}% this month</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">System Health</p>
                  <p className="text-3xl font-bold">{systemStats.systemHealth}%</p>
                  <p className="text-green-200 text-sm">Excellent performance</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Uptime</p>
                  <p className="text-3xl font-bold">{systemStats.uptime}%</p>
                  <p className="text-blue-200 text-sm">Last 30 days</p>
                </div>
                <Server className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Revenue</p>
                  <p className="text-3xl font-bold">${(systemStats.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-orange-200 text-sm">+{systemStats.growthRate}% growth</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Distribution */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>User Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm font-medium">Carriers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{systemStats.totalCarriers}</span>
                        <span className="text-sm text-gray-500">({((systemStats.totalCarriers / systemStats.totalUsers) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm font-medium">Brokers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{systemStats.totalBrokers}</span>
                        <span className="text-sm text-gray-500">({((systemStats.totalBrokers / systemStats.totalUsers) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm font-medium">Shippers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{systemStats.totalShippers}</span>
                        <span className="text-sm text-gray-500">({((systemStats.totalShippers / systemStats.totalUsers) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Performance */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>System Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Memory Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Storage Usage</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Network</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Recent System Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">System backup completed successfully</p>
                      <p className="text-xs text-green-600">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">New carrier registration: ABC Trucking Co.</p>
                      <p className="text-xs text-blue-600">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">High memory usage detected</p>
                      <p className="text-xs text-yellow-600">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>User Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">User</TableHead>
                      <TableHead className="font-semibold text-gray-700">Role</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Last Login</TableHead>
                      <TableHead className="font-semibold text-gray-700">Created</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900">{user.lastLogin}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">{user.createdAt}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                              <Trash2 className="h-4 w-4" />
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
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Revenue Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${(systemStats.revenue / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+{systemStats.growthRate}% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>User Growth</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {systemStats.totalUsers.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-blue-600">+{systemStats.growthRate}% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Server className="h-5 w-5 text-blue-600" />
                  <span>System Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Server Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Web Server</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">File Storage</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Response Time</span>
                          <span>245ms</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Error Rate</span>
                          <span>0.02%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Security Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Authentication</h3>
                    <p className="text-sm text-gray-600">Multi-factor enabled</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Encryption</h3>
                    <p className="text-sm text-gray-600">AES-256 enabled</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Monitoring</h3>
                    <p className="text-sm text-gray-600">24/7 active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span>System Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">System Name</label>
                        <Input defaultValue="Logistics Lynx TMS" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Timezone</label>
                        <Select defaultValue="utc">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time</SelectItem>
                            <SelectItem value="pst">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Require 2FA for all users</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Session Timeout</p>
                          <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SoftwareAdminPortal;
