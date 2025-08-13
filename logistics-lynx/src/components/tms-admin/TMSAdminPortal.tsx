import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { 
  Users, 
  Settings, 
  Building, 
  DollarSign, 
  User, 
  FileText, 
  CreditCard,
  Globe,
  Sun,
  Moon,
  BookOpen,
  HelpCircle,
  Phone,
  MessageCircle,
  StickyNote,
  Share2,
  Mail,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Bell,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data interfaces
interface TMSUser {
  id: string;
  username: string;
  email: string;
  userType: 'shipper' | 'freight_broker' | 'carrier' | 'driver' | 'admin';
  company: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  dashboardAccess: string[];
  createdAt: string;
  subscription: 'basic' | 'premium' | 'enterprise';
  region: string;
  language: 'en' | 'es' | 'fr' | 'de';
}

interface DashboardConfig {
  id: string;
  name: string;
  userType: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdated: string;
  accessCount: number;
  performance: number;
  features: string[];
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalDashboards: number;
  systemUptime: number;
  averageResponseTime: number;
  storageUsed: number;
  storageLimit: number;
  apiCalls: number;
  errors: number;
}

interface CommunicationTool {
  id: string;
  name: string;
  icon: React.ComponentType<unknown>;
  status: 'online' | 'offline' | 'maintenance';
  unreadCount: number;
}

const mockUsers: TMSUser[] = [
  {
    id: 'USR-001',
    username: 'john_shipper',
    email: 'john@techcorp.com',
    userType: 'shipper',
    company: 'TechCorp Logistics',
    status: 'active',
    lastLogin: '2024-01-15 14:30:00',
    dashboardAccess: ['shipper_dashboard', 'analytics'],
    createdAt: '2024-01-01',
    subscription: 'premium',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'USR-002',
    username: 'sarah_broker',
    email: 'sarah@fastfreight.com',
    userType: 'freight_broker',
    company: 'Fast Freight Inc',
    status: 'active',
    lastLogin: '2024-01-15 13:45:00',
    dashboardAccess: ['broker_dashboard', 'load_board', 'analytics'],
    createdAt: '2024-01-02',
    subscription: 'enterprise',
    region: 'North America',
    language: 'en'
  },
  {
    id: 'USR-003',
    username: 'mike_carrier',
    email: 'mike@globaltrucking.com',
    userType: 'carrier',
    company: 'Global Trucking Co',
    status: 'active',
    lastLogin: '2024-01-15 12:20:00',
    dashboardAccess: ['carrier_dashboard', 'fleet_management'],
    createdAt: '2024-01-03',
    subscription: 'premium',
    region: 'North America',
    language: 'es'
  },
  {
    id: 'USR-004',
    username: 'driver_alex',
    email: 'alex@globaltrucking.com',
    userType: 'driver',
    company: 'Global Trucking Co',
    status: 'active',
    lastLogin: '2024-01-15 11:15:00',
    dashboardAccess: ['driver_dashboard'],
    createdAt: '2024-01-04',
    subscription: 'basic',
    region: 'North America',
    language: 'en'
  }
];

const mockDashboards: DashboardConfig[] = [
  {
    id: 'DASH-001',
    name: 'Shipper Dashboard',
    userType: 'shipper',
    status: 'active',
    lastUpdated: '2024-01-15 10:00:00',
    accessCount: 156,
    performance: 98.5,
    features: ['Booking', 'Tracking', 'Analytics', 'Reports']
  },
  {
    id: 'DASH-002',
    name: 'Broker Dashboard',
    userType: 'freight_broker',
    status: 'active',
    lastUpdated: '2024-01-15 09:30:00',
    accessCount: 89,
    performance: 97.2,
    features: ['Load Board', 'Carrier Management', 'Financials', 'EDI']
  },
  {
    id: 'DASH-003',
    name: 'Carrier Dashboard',
    userType: 'carrier',
    status: 'active',
    lastUpdated: '2024-01-15 08:45:00',
    accessCount: 234,
    performance: 99.1,
    features: ['Fleet Management', 'Dispatch', 'Maintenance', 'Driver Portal']
  },
  {
    id: 'DASH-004',
    name: 'Driver Dashboard',
    userType: 'driver',
    status: 'maintenance',
    lastUpdated: '2024-01-15 07:15:00',
    accessCount: 567,
    performance: 95.8,
    features: ['Load Assignment', 'Route Planning', 'Documentation', 'Communication']
  }
];

const mockSystemMetrics: SystemMetrics = {
  totalUsers: 1247,
  activeUsers: 892,
  totalDashboards: 15,
  systemUptime: 99.97,
  averageResponseTime: 245,
  storageUsed: 2.4,
  storageLimit: 10.0,
  apiCalls: 45678,
  errors: 12
};

const communicationTools: CommunicationTool[] = [
  { id: 'calls', name: 'Calls', icon: Phone, status: 'online', unreadCount: 0 },
  { id: 'chat', name: 'Chat', icon: MessageCircle, status: 'online', unreadCount: 3 },
  { id: 'notes', name: 'Notes', icon: StickyNote, status: 'online', unreadCount: 0 },
  { id: 'social', name: 'Social Media', icon: Share2, status: 'online', unreadCount: 5 },
  { id: 'email', name: 'Email', icon: Mail, status: 'online', unreadCount: 12 }
];

export const TMSAdminPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [users, setUsers] = useState<TMSUser[]>(mockUsers);
  const [dashboards, setDashboards] = useState<DashboardConfig[]>(mockDashboards);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(mockSystemMetrics);
  const [filteredUsers, setFilteredUsers] = useState<TMSUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<TMSUser | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showDashboardDialog, setShowDashboardDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showCommunicationTools, setShowCommunicationTools] = useState(false);

  // Filter users based on search and filters
  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter, userTypeFilter]);

  const handleCreateUser = () => {
    toast({
      title: 'User Created',
      description: 'New user has been successfully created and credentials sent.',
      variant: 'default'
    });
    setShowUserDialog(false);
  };

  const handleUpdateDashboard = () => {
    toast({
      title: 'Dashboard Updated',
      description: 'Dashboard configuration has been successfully updated.',
      variant: 'default'
    });
    setShowDashboardDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'shipper': return '📦';
      case 'freight_broker': return '🤝';
      case 'carrier': return '🚛';
      case 'driver': return '👨‍💼';
      case 'admin': return '👑';
      default: return '👤';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateStoragePercentage = () => {
    return (systemMetrics.storageUsed / systemMetrics.storageLimit) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">🏢 TMS Administration Portal</h1>
                <p className="text-gray-600">Central management hub for Trans Bot AI TMS ecosystem</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                </SelectContent>
              </Select>

              {/* Dark Mode Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center space-x-2"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Notifications */}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="dashboards">Dashboard Config</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{systemMetrics.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 text-green-500" /> +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{systemMetrics.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <CheckCircle className="inline h-3 w-3 text-green-500" /> {((systemMetrics.activeUsers / systemMetrics.totalUsers) * 100).toFixed(1)}% active rate
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{systemMetrics.systemUptime}%</div>
                  <p className="text-xs text-muted-foreground">
                    <Zap className="inline h-3 w-3 text-green-500" /> All systems operational
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{systemMetrics.apiCalls.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 text-blue-500" /> Last 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getUserTypeIcon(user.userType)}</span>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-gray-600">{user.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.lastLogin}</p>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => setShowUserDialog(true)} className="h-auto p-4 flex flex-col items-center space-y-2">
                      <Plus className="h-6 w-6" />
                      <span className="text-sm">Add User</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <Settings className="h-6 w-6" />
                      <span className="text-sm">System Settings</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <RefreshCw className="h-6 w-6" />
                      <span className="text-sm">System Health</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-gray-600">Manage all TMS users and their access permissions</p>
              </div>
              <Button onClick={() => setShowUserDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="shipper">Shipper</SelectItem>
                      <SelectItem value="freight_broker">Freight Broker</SelectItem>
                      <SelectItem value="carrier">Carrier</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getUserTypeIcon(user.userType)}</span>
                        <div>
                          <CardTitle className="text-lg">{user.username}</CardTitle>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Company:</span>
                        <span className="text-sm font-medium">{user.company}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Subscription:</span>
                        <Badge className={getSubscriptionColor(user.subscription)}>
                          {user.subscription}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Login:</span>
                        <span className="text-sm">{user.lastLogin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Language:</span>
                        <span className="text-sm">{user.language.toUpperCase()}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Key className="h-4 w-4 mr-2" />
                          Manage Access
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            {/* Dashboard Configuration Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dashboard Configuration</h2>
                <p className="text-gray-600">Manage and configure user dashboards</p>
              </div>
              <Button onClick={() => setShowDashboardDialog(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Dashboard
              </Button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboards.map((dashboard) => (
                <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                        <p className="text-sm text-gray-600">For {dashboard.userType} users</p>
                      </div>
                      <Badge className={getStatusColor(dashboard.status)}>
                        {dashboard.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Performance:</span>
                        <span className="text-sm font-medium">{dashboard.performance}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Access Count:</span>
                        <span className="text-sm font-medium">{dashboard.accessCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Updated:</span>
                        <span className="text-sm">{dashboard.lastUpdated}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {dashboard.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage user accounts, permissions, and access controls</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>General Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Configure system-wide settings and preferences</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Company Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage company information and branding</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Payroll Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Configure payroll and payment processing</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage your admin account and preferences</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Templates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage document templates and forms</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage system documents and files</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>My Subscription</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">View and manage subscription details</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <BarChart3 className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <LineChart className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <PieChart className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <Activity className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Uptime</span>
                      <span className="text-sm font-medium">{systemMetrics.systemUptime}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Response Time</span>
                      <span className="text-sm font-medium">{systemMetrics.averageResponseTime}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage Used</span>
                      <span className="text-sm font-medium">{systemMetrics.storageUsed}GB / {systemMetrics.storageLimit}GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${calculateStoragePercentage()}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Calls (24h)</span>
                      <span className="text-sm font-medium">{systemMetrics.apiCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Errors (24h)</span>
                      <span className="text-sm font-medium text-red-600">{systemMetrics.errors}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      System Health Check
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Backup System
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore System
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button - Communication Tools */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {showCommunicationTools && (
            <div className="absolute bottom-16 right-0 space-y-2">
              {communicationTools.map((tool) => (
                <Button
                  key={tool.id}
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
                >
                  <tool.icon className="h-5 w-5" />
                  {tool.unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                      {tool.unreadCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          )}
          <Button
            onClick={() => setShowCommunicationTools(!showCommunicationTools)}
            className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Left Menu */}
      <div className="fixed bottom-6 left-6 z-50 space-y-2">
        <Button variant="outline" size="sm" className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50">
          <BookOpen className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm" className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Create User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input placeholder="Enter username" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Enter email" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">User Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipper">Shipper</SelectItem>
                    <SelectItem value="freight_broker">Freight Broker</SelectItem>
                    <SelectItem value="carrier">Carrier</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Enter company name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Subscription</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dashboard Dialog */}
      <Dialog open={showDashboardDialog} onOpenChange={setShowDashboardDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Dashboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Dashboard Name</label>
              <Input placeholder="Enter dashboard name" />
            </div>
            <div>
              <label className="text-sm font-medium">User Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipper">Shipper</SelectItem>
                  <SelectItem value="freight_broker">Freight Broker</SelectItem>
                  <SelectItem value="carrier">Carrier</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Features</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Booking', 'Tracking', 'Analytics', 'Reports', 'Load Board', 'Fleet Management', 'Dispatch', 'Maintenance'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <input type="checkbox" id={feature} />
                    <label htmlFor={feature} className="text-sm">{feature}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDashboardDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateDashboard}>
                Create Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TMSAdminPortal;
