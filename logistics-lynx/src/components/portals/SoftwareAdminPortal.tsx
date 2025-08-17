/**
 * Modern Software Admin Portal
 * Comprehensive system administration with autonomous agent monitoring
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/ui/dashboard-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedTable } from '@/components/ui/enhanced-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Search,
  Cpu,
  HardDrive,
  Network,
  Wifi,
  Shield as ShieldIcon,
  Key,
  Database as DatabaseIcon,
  Cloud,
  Monitor,
  Smartphone,
  Tablet,
  Globe as GlobeIcon,
  Server as ServerIcon,
  Activity as ActivityIcon,
  AlertCircle,
  CheckSquare,
  FileX,
  Archive,
  Copy,
  ExternalLink,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  X,
  Info,
  HelpCircle,
  Settings as SettingsIcon,
  User,
  LogOut,
  Sun,
  Moon,
  Search as SearchIcon
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
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkUsage: number;
  autonomousAgents: number;
  activeAgents: number;
  failedAgents: number;
  systemAlerts: number;
  securityScore: number;
  complianceScore: number;
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
  permissions: string[];
  department: string;
  location: string;
  phone: string;
  isActive: boolean;
  loginCount: number;
  lastActivity: string;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  resolved: boolean;
  assignedTo?: string;
}

interface AutonomousAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  health: number;
  uptime: number;
  lastActivity: string;
  tasksCompleted: number;
  tasksFailed: number;
  performance: number;
  memoryUsage: number;
  cpuUsage: number;
  version: string;
  location: string;
}

const SoftwareAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedAlerts, setSelectedAlerts] = useState<SystemAlert[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<AutonomousAgent[]>([]);

  // Mock data
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
    completedReviews: 1247,
    revenue: 2450000,
    growthRate: 12.5,
    cpuUsage: 45.2,
    memoryUsage: 67.8,
    diskUsage: 34.1,
    networkUsage: 23.4,
    autonomousAgents: 250,
    activeAgents: 248,
    failedAgents: 2,
    systemAlerts: 5,
    securityScore: 95.8,
    complianceScore: 98.2,
  };

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'System Administrator',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-01-15',
      avatar: '/avatars/john.jpg',
      permissions: ['admin', 'user_management', 'system_config'],
      department: 'IT',
      location: 'New York',
      phone: '+1-555-0123',
      isActive: true,
      loginCount: 156,
      lastActivity: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Security Manager',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2023-03-20',
      avatar: '/avatars/sarah.jpg',
      permissions: ['security', 'compliance', 'audit'],
      department: 'Security',
      location: 'Los Angeles',
      phone: '+1-555-0124',
      isActive: true,
      loginCount: 89,
      lastActivity: '2024-01-15T09:15:00Z',
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'Database Administrator',
      status: 'inactive',
      lastLogin: '2024-01-10T16:45:00Z',
      createdAt: '2023-06-10',
      avatar: '/avatars/mike.jpg',
      permissions: ['database', 'backup', 'maintenance'],
      department: 'IT',
      location: 'Chicago',
      phone: '+1-555-0125',
      isActive: false,
      loginCount: 234,
      lastActivity: '2024-01-10T16:45:00Z',
    },
  ];

  const mockAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage has exceeded 80% for the last 10 minutes',
      timestamp: '2024-01-15T10:25:00Z',
      severity: 'medium',
      category: 'Performance',
      resolved: false,
      assignedTo: 'John Smith',
    },
    {
      id: '2',
      type: 'error',
      title: 'Database Connection Failed',
      message: 'Unable to establish connection to primary database',
      timestamp: '2024-01-15T09:45:00Z',
      severity: 'high',
      category: 'Database',
      resolved: false,
      assignedTo: 'Mike Davis',
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update Available',
      message: 'New system update v2.1.5 is available for installation',
      timestamp: '2024-01-15T08:30:00Z',
      severity: 'low',
      category: 'Updates',
      resolved: true,
    },
  ];

  const mockAgents: AutonomousAgent[] = [
    {
      id: '1',
      name: 'Shipment Management Agent',
      type: 'Core TMS',
      status: 'active',
      health: 98,
      uptime: 99.9,
      lastActivity: '2024-01-15T10:30:00Z',
      tasksCompleted: 1247,
      tasksFailed: 3,
      performance: 95.2,
      memoryUsage: 45.6,
      cpuUsage: 23.4,
      version: '2.1.4',
      location: 'US-East-1',
    },
    {
      id: '2',
      name: 'Route Optimization Agent',
      type: 'AI/ML',
      status: 'active',
      health: 97,
      uptime: 99.8,
      lastActivity: '2024-01-15T10:29:00Z',
      tasksCompleted: 892,
      tasksFailed: 1,
      performance: 94.8,
      memoryUsage: 67.2,
      cpuUsage: 34.1,
      version: '2.1.4',
      location: 'US-West-2',
    },
    {
      id: '3',
      name: 'Financial Management Agent',
      type: 'Core TMS',
      status: 'error',
      health: 45,
      uptime: 85.2,
      lastActivity: '2024-01-15T09:15:00Z',
      tasksCompleted: 567,
      tasksFailed: 23,
      performance: 67.3,
      memoryUsage: 89.1,
      cpuUsage: 78.9,
      version: '2.1.3',
      location: 'US-Central-1',
    },
  ];

  // Navigation items
  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users, badge: 3 },
    { id: 'security', label: 'Security', icon: Shield, badge: 2 },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'system', label: 'System', icon: Server },
    { id: 'agents', label: 'Autonomous Agents', icon: Activity, badge: 1 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 5 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // User table columns
  const userColumns = [
    {
      key: 'name',
      header: 'User',
      accessor: (user: User) => user.name,
      sortable: true,
      filterable: true,
      render: (value: string, user: User) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-secondary-900">{user.name}</div>
            <div className="text-sm text-secondary-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (user: User) => user.role,
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge variant="outline" className="bg-secondary-50">
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (user: User) => user.status,
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge
          variant={value === 'active' ? 'default' : 'secondary'}
          className={value === 'active' ? 'bg-success-100 text-success-800' : 'bg-secondary-100 text-secondary-800'}
        >
          {value === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
          {value}
        </Badge>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      accessor: (user: User) => user.department,
      sortable: true,
      filterable: true,
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      accessor: (user: User) => user.lastLogin,
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'loginCount',
      header: 'Login Count',
      accessor: (user: User) => user.loginCount,
      sortable: true,
      align: 'center' as const,
    },
  ];

  // Alert table columns
  const alertColumns = [
    {
      key: 'type',
      header: 'Type',
      accessor: (alert: SystemAlert) => alert.type,
      sortable: true,
      filterable: true,
      render: (value: string, alert: SystemAlert) => {
        const icons = {
          info: Info,
          warning: AlertTriangle,
          error: X,
          success: CheckCircle,
        };
        const Icon = icons[value as keyof typeof icons];
        return (
          <div className="flex items-center space-x-2">
            <Icon className={`w-4 h-4 ${
              value === 'info' ? 'text-blue-500' :
              value === 'warning' ? 'text-yellow-500' :
              value === 'error' ? 'text-red-500' :
              'text-green-500'
            }`} />
            <span className="capitalize">{value}</span>
          </div>
        );
      },
    },
    {
      key: 'title',
      header: 'Title',
      accessor: (alert: SystemAlert) => alert.title,
      sortable: true,
      filterable: true,
    },
    {
      key: 'severity',
      header: 'Severity',
      accessor: (alert: SystemAlert) => alert.severity,
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge
          variant={
            value === 'critical' ? 'destructive' :
            value === 'high' ? 'default' :
            value === 'medium' ? 'secondary' :
            'outline'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (alert: SystemAlert) => alert.category,
      sortable: true,
      filterable: true,
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      accessor: (alert: SystemAlert) => alert.timestamp,
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      key: 'resolved',
      header: 'Status',
      accessor: (alert: SystemAlert) => alert.resolved,
      sortable: true,
      filterable: true,
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Resolved' : 'Open'}
        </Badge>
      ),
    },
  ];

  // Agent table columns
  const agentColumns = [
    {
      key: 'name',
      header: 'Agent',
      accessor: (agent: AutonomousAgent) => agent.name,
      sortable: true,
      filterable: true,
      render: (value: string, agent: AutonomousAgent) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-secondary-900">{agent.name}</div>
            <div className="text-sm text-secondary-500">{agent.type}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (agent: AutonomousAgent) => agent.status,
      sortable: true,
      filterable: true,
      render: (value: string, agent: AutonomousAgent) => (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            value === 'active' ? 'bg-success-500' :
            value === 'inactive' ? 'bg-secondary-400' :
            value === 'error' ? 'bg-error-500' :
            'bg-warning-500'
          }`} />
          <Badge
            variant={
              value === 'active' ? 'default' :
              value === 'error' ? 'destructive' :
              'secondary'
            }
          >
            {value}
          </Badge>
        </div>
      ),
    },
    {
      key: 'health',
      header: 'Health',
      accessor: (agent: AutonomousAgent) => agent.health,
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Progress value={value} className="w-16 h-2" />
          <span className="text-sm font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: 'performance',
      header: 'Performance',
      accessor: (agent: AutonomousAgent) => agent.performance,
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Progress value={value} className="w-16 h-2" />
          <span className="text-sm font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: 'tasksCompleted',
      header: 'Tasks Completed',
      accessor: (agent: AutonomousAgent) => agent.tasksCompleted,
      sortable: true,
      align: 'center' as const,
    },
    {
      key: 'uptime',
      header: 'Uptime',
      accessor: (agent: AutonomousAgent) => agent.uptime,
      sortable: true,
      render: (value: number) => `${value}%`,
    },
  ];

  return (
    <DashboardLayout
      navigation={navigation}
      title="Software Admin Portal"
      subtitle="System administration and autonomous agent monitoring"
      user={{
        name: 'Admin User',
        email: 'admin@tms.com',
        role: 'System Administrator',
      }}
      notifications={5}
      onNavigationChange={(item) => setActiveTab(item.id)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* System Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <EnhancedCard
                  variant="gradient"
                  gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={<Users className="w-6 h-6 text-white" />}
                  header={
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Total Users</h3>
                      <p className="text-blue-100">Active system users</p>
                    </div>
                  }
                >
                  <div className="text-white">
                    <div className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+{systemStats.growthRate}% this month</span>
                    </div>
                  </div>
                </EnhancedCard>

                <EnhancedCard
                  variant="gradient"
                  gradient="bg-gradient-to-br from-green-500 to-green-600"
                  icon={<Activity className="w-6 h-6 text-white" />}
                  header={
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">System Health</h3>
                      <p className="text-green-100">Overall system status</p>
                    </div>
                  }
                >
                  <div className="text-white">
                    <div className="text-3xl font-bold">{systemStats.systemHealth}%</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">All systems operational</span>
                    </div>
                  </div>
                </EnhancedCard>

                <EnhancedCard
                  variant="gradient"
                  gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                  icon={<Shield className="w-6 h-6 text-white" />}
                  header={
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Security Score</h3>
                      <p className="text-purple-100">System security rating</p>
                    </div>
                  }
                >
                  <div className="text-white">
                    <div className="text-3xl font-bold">{systemStats.securityScore}%</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">High security level</span>
                    </div>
                  </div>
                </EnhancedCard>

                <EnhancedCard
                  variant="gradient"
                  gradient="bg-gradient-to-br from-orange-500 to-orange-600"
                  icon={<DollarSign className="w-6 h-6 text-white" />}
                  header={
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">Revenue</h3>
                      <p className="text-orange-100">Monthly revenue</p>
                    </div>
                  }
                >
                  <div className="text-white">
                    <div className="text-3xl font-bold">${(systemStats.revenue / 1000000).toFixed(1)}M</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+{systemStats.growthRate}% growth</span>
                    </div>
                  </div>
                </EnhancedCard>
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EnhancedCard
                  title="System Performance"
                  subtitle="Real-time system metrics"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-secondary-600">{systemStats.cpuUsage}%</span>
                    </div>
                    <Progress value={systemStats.cpuUsage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-secondary-600">{systemStats.memoryUsage}%</span>
                    </div>
                    <Progress value={systemStats.memoryUsage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm text-secondary-600">{systemStats.diskUsage}%</span>
                    </div>
                    <Progress value={systemStats.diskUsage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network Usage</span>
                      <span className="text-sm text-secondary-600">{systemStats.networkUsage}%</span>
                    </div>
                    <Progress value={systemStats.networkUsage} className="h-2" />
                  </div>
                </EnhancedCard>

                <EnhancedCard
                  title="Autonomous Agents"
                  subtitle="Agent status and performance"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Agents</span>
                      <span className="text-sm text-success-600">{systemStats.activeAgents}/{systemStats.autonomousAgents}</span>
                    </div>
                    <Progress value={(systemStats.activeAgents / systemStats.autonomousAgents) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Failed Agents</span>
                      <span className="text-sm text-error-600">{systemStats.failedAgents}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Uptime</span>
                      <span className="text-sm text-success-600">{systemStats.uptime}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Sessions</span>
                      <span className="text-sm text-secondary-600">{systemStats.activeSessions}</span>
                    </div>
                  </div>
                </EnhancedCard>
              </div>

              {/* Recent Activity */}
              <EnhancedCard
                title="Recent System Activity"
                subtitle="Latest system events and alerts"
              >
                <div className="space-y-4">
                  {mockAlerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary-50">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.type === 'error' ? 'bg-error-500' :
                        alert.type === 'warning' ? 'bg-warning-500' :
                        alert.type === 'success' ? 'bg-success-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium text-secondary-900">{alert.title}</div>
                        <div className="text-sm text-secondary-600">{alert.message}</div>
                      </div>
                      <div className="text-sm text-secondary-500">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </EnhancedCard>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <EnhancedCard
                title="User Management"
                subtitle="Manage system users and permissions"
                actions={
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                }
              >
                <EnhancedTable
                  data={mockUsers}
                  columns={userColumns}
                  selectable
                  onSelectionChange={setSelectedUsers}
                  onExport={() => console.log('Export users')}
                  onRefresh={() => console.log('Refresh users')}
                />
              </EnhancedCard>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <EnhancedCard
                title="System Alerts"
                subtitle="Monitor and manage system alerts"
                actions={
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Alert
                    </Button>
                  </div>
                }
              >
                <EnhancedTable
                  data={mockAlerts}
                  columns={alertColumns}
                  selectable
                  onSelectionChange={setSelectedAlerts}
                  onExport={() => console.log('Export alerts')}
                  onRefresh={() => console.log('Refresh alerts')}
                />
              </EnhancedCard>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-6">
              <EnhancedCard
                title="Autonomous Agents"
                subtitle="Monitor and manage autonomous agents"
                actions={
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Deploy Agent
                    </Button>
                  </div>
                }
              >
                <EnhancedTable
                  data={mockAgents}
                  columns={agentColumns}
                  selectable
                  onSelectionChange={setSelectedAgents}
                  onExport={() => console.log('Export agents')}
                  onRefresh={() => console.log('Refresh agents')}
                />
              </EnhancedCard>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <EnhancedCard title="System Settings" subtitle="Configure system preferences">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">System Name</label>
                        <input
                          type="text"
                          defaultValue="TMS Autonomous System"
                          className="mt-1 w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Timezone</label>
                        <select className="mt-1 w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option>UTC</option>
                          <option>EST</option>
                          <option>PST</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-secondary-600">Require 2FA for all users</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Session Timeout</h4>
                          <p className="text-sm text-secondary-600">Auto-logout after inactivity</p>
                        </div>
                        <select className="px-3 py-2 border border-secondary-300 rounded-lg">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </EnhancedCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default SoftwareAdminPortal;
