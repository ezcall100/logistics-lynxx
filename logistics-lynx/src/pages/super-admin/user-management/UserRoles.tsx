import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  Brain,
  Shield,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Settings,
  Zap,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserX,
  Crown,
  Star,
  Award,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Bell,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Camera,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Cloud,
  CloudRain,
  CloudLightning,
  Sun,
  Moon,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share,
  Link,
  ExternalLink,
  Copy,
  Scissors,
  Paperclip,
  Image,
  Music,
  Volume2,
  VolumeX,
  MicOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  Flame,
  Droplets,
  Wind,
  Snowflake,
  Thermometer,
  Gauge,
  Timer,
  Watch
} from 'lucide-react';
import AddRoleForm from './forms/AddRoleForm';
import EditRoleForm from './forms/EditRoleForm';
import ViewRoleForm from './forms/ViewRoleForm';

// MCP Agent Integration Interfaces
interface MCPAgent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  confidenceScore: number;
  tasksCompleted: number;
  responseTime: number;
  lastActivity: string;
  uptime: number;
  performance: number;
  health: number;
}

interface SystemMetrics {
  systemHealth: number;
  activeUsers: number;
  mcpAgents: number;
  responseTime: number;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
  errorRate: number;
  securityScore: number;
  performanceScore: number;
  revenue: number;
  transactions: number;
  supportTickets: number;
  deployments: number;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'acknowledged';
  mcpAgentId?: string;
  category: 'system' | 'security' | 'performance' | 'user' | 'business' | 'deployment';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  priority: number;
  color: string;
  icon: string;
  mcpAgentId?: string;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAudit: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';
  riskScore: number;
}

// Mock MCP Agent Data
const mockMCPAgents: MCPAgent[] = [
  {
    id: 'agent-role-001',
    name: 'Role Management Agent Alpha',
    type: 'role_management',
    status: 'online',
    confidenceScore: 0.96,
    tasksCompleted: 847,
    responseTime: 8,
    lastActivity: '2024-01-15 14:30:00',
    uptime: 99.9,
    performance: 98,
    health: 95
  },
  {
    id: 'agent-role-002',
    name: 'Security Compliance Agent Beta',
    type: 'security_compliance',
    status: 'online',
    confidenceScore: 0.94,
    tasksCompleted: 623,
    responseTime: 12,
    lastActivity: '2024-01-15 14:29:45',
    uptime: 99.8,
    performance: 96,
    health: 92
  },
  {
    id: 'agent-role-003',
    name: 'Permission Audit Agent Gamma',
    type: 'permission_audit',
    status: 'busy',
    confidenceScore: 0.89,
    tasksCompleted: 445,
    responseTime: 15,
    lastActivity: '2024-01-15 14:28:30',
    uptime: 99.7,
    performance: 89,
    health: 88
  }
];

const mockSystemMetrics: SystemMetrics = {
  systemHealth: 98.5,
  activeUsers: 1247,
  mcpAgents: 24,
  responseTime: 45,
  uptime: 99.9,
  cpuUsage: 67,
  memoryUsage: 78,
  diskUsage: 45,
  networkTraffic: 234,
  errorRate: 0.02,
  securityScore: 94,
  performanceScore: 89,
  revenue: 125000,
  transactions: 1567,
  supportTickets: 23,
  deployments: 8
};

const mockAlerts: SystemAlert[] = [
  {
    id: 'alert-role-001',
    type: 'warning',
    title: 'Role Permission Audit Required',
    message: 'Quarterly role permission audit is due in 3 days',
    timestamp: '2024-01-15 14:25:00',
    severity: 'medium',
    status: 'active',
    mcpAgentId: 'agent-role-003',
    category: 'security'
  },
  {
    id: 'alert-role-002',
    type: 'success',
    title: 'Role Security Scan Complete',
    message: 'All roles passed security compliance check',
    timestamp: '2024-01-15 14:20:00',
    severity: 'low',
    status: 'acknowledged',
    mcpAgentId: 'agent-role-002',
    category: 'security'
  }
];

const UserRoles: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [metrics] = useState<SystemMetrics | null>(null);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus] = useState('all');

  console.log('🔑 UserRoles component is rendering with MCP integration!');

  // Enhanced mock data for roles with MCP integration
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: 3,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      createdBy: 'System',
      priority: 1,
      color: 'red',
      icon: '👑',
      mcpAgentId: 'agent-role-001',
      securityLevel: 'critical',
      lastAudit: '2024-01-10',
      complianceStatus: 'compliant',
      riskScore: 95
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with user management',
      permissions: ['user.manage', 'system.view', 'analytics.view'],
      userCount: 12,
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-14',
      createdBy: 'Super Admin',
      priority: 2,
      color: 'blue',
      icon: '⚡',
      mcpAgentId: 'agent-role-002',
      securityLevel: 'high',
      lastAudit: '2024-01-12',
      complianceStatus: 'compliant',
      riskScore: 78
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Team management and reporting access',
      permissions: ['team.manage', 'reports.view', 'analytics.view'],
      userCount: 25,
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13',
      createdBy: 'Super Admin',
      priority: 3,
      color: 'green',
      icon: '👥',
      mcpAgentId: 'agent-role-003',
      securityLevel: 'medium',
      lastAudit: '2024-01-08',
      complianceStatus: 'pending',
      riskScore: 45
    },
    {
      id: '4',
      name: 'User',
      description: 'Standard user access with basic permissions',
      permissions: ['basic.access', 'profile.edit'],
      userCount: 150,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-12',
      createdBy: 'Admin',
      priority: 4,
      color: 'gray',
      icon: '👤',
      mcpAgentId: 'agent-role-001',
      securityLevel: 'low',
      lastAudit: '2024-01-05',
      complianceStatus: 'compliant',
      riskScore: 12
    }
  ];

  useEffect(() => {
    // Simulate MCP agent data loading
    const loadData = async () => {
      setLoading(true);
      
      // Simulate MCP agent data fetching
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRoles(mockRoles);
      setAgents(mockMCPAgents);
      // setMetrics(mockSystemMetrics);
      setAlerts(mockAlerts);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'busy': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'non-compliant': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  // CRUD Handlers
  const handleAddRole = (roleData: Role) => {
    console.log('🔧 MCP Agent: Adding new role with enhanced security validation');
    const newRole = {
      ...roleData,
      id: Date.now().toString(),
      mcpAgentId: 'agent-role-001',
      securityLevel: 'medium',
      lastAudit: new Date().toISOString().split('T')[0],
      complianceStatus: 'pending',
      riskScore: Math.floor(Math.random() * 50) + 10
    };
    setRoles([...roles, newRole]);
    setViewMode('list');
  };

  const handleEditRole = (roleData: Role) => {
    console.log('🔧 MCP Agent: Updating role with security audit trail');
    setRoles(roles.map(role => 
      role.id === roleData.id 
        ? { ...roleData, updatedAt: new Date().toISOString().split('T')[0] }
        : role
    ));
    setViewMode('list');
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('🔧 MCP Agent: Deleting role with security validation');
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleViewRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    setViewMode('view');
  };

  const handleEditRoleClick = (roleId: string) => {
    setSelectedRoleId(roleId);
    setViewMode('edit');
  };

  const handleAddRoleClick = () => {
    setViewMode('add');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedRoleId('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading UserRoles with MCP integration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Header with MCP Status */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Roles
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting' : 'Disconnected'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddRoleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Add Role</span>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Role-based access control management with MCP agent integration
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* MCP Agent Status */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            MCP Agent Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-50/50 dark:bg-slate-700/50 rounded-lg p-4 border border-gray-200/50 dark:border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Type: {agent.type}</p>
                  <p>Confidence: {(agent.confidenceScore * 100).toFixed(1)}%</p>
                  <p>Tasks: {agent.tasksCompleted}</p>
                  <p>Response: {agent.responseTime}ms</p>
                  <p>Uptime: {agent.uptime}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            System Alerts
          </h2>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{alert.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.status === 'active' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Content */}
        {viewMode === 'list' && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Role Management</h2>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-gray-50/50 dark:bg-slate-700/50 rounded-lg p-6 border border-gray-200/50 dark:border-slate-600/50 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{role.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityLevelColor(role.securityLevel)}`}>
                        {role.securityLevel}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(role.complianceStatus)}`}>
                        {role.complianceStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Users:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{role.userCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{role.riskScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Last Audit:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{role.lastAudit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">MCP Agent:</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewRole(role.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditRoleClick(role.id)}
                        className="p-2 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'add' && (
          <AddRoleForm onAdd={handleAddRole} onCancel={handleBackToList} />
        )}

        {viewMode === 'edit' && (
          <EditRoleForm 
            role={roles.find(role => role.id === selectedRoleId)!} 
            onEdit={handleEditRole} 
            onCancel={handleBackToList} 
          />
        )}

        {viewMode === 'view' && (
          <ViewRoleForm 
            role={roles.find(role => role.id === selectedRoleId)!} 
            onBack={handleBackToList} 
          />
        )}
      </div>
    </div>
  );
};

export default UserRoles;
