import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  Users, 
  Trash2, 
  Lock,
  Brain,
  AlertTriangle,
  Search,
  RefreshCw
} from 'lucide-react';
import AddGroupForm from './forms/AddGroupForm';
import EditGroupForm from './forms/EditGroupForm';
import ViewGroupForm from './forms/ViewGroupForm';

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

interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  category: string;
  color: string;
  icon: string;
  permissions: string[];
  isPrivate: boolean;
  joinApproval: boolean;
  mcpAgentId?: string;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAudit: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';
  riskScore: number;
  activityLevel: 'high' | 'medium' | 'low';
  engagementScore: number;
}

// Mock MCP Agent Data
const mockMCPAgents: MCPAgent[] = [
  {
    id: 'agent-group-001',
    name: 'Group Management Agent Alpha',
    type: 'group_management',
    status: 'online',
    confidenceScore: 0.95,
    tasksCompleted: 723,
    responseTime: 9,
    lastActivity: '2024-01-15 14:30:00',
    uptime: 99.9,
    performance: 97,
    health: 94
  },
  {
    id: 'agent-group-002',
    name: 'Member Analytics Agent Beta',
    type: 'member_analytics',
    status: 'online',
    confidenceScore: 0.93,
    tasksCompleted: 456,
    responseTime: 11,
    lastActivity: '2024-01-15 14:29:45',
    uptime: 99.8,
    performance: 95,
    health: 91
  },
  {
    id: 'agent-group-003',
    name: 'Collaboration Monitor Agent Gamma',
    type: 'collaboration_monitor',
    status: 'busy',
    confidenceScore: 0.87,
    tasksCompleted: 334,
    responseTime: 14,
    lastActivity: '2024-01-15 14:28:30',
    uptime: 99.7,
    performance: 88,
    health: 86
  }
];



const mockAlerts: SystemAlert[] = [
  {
    id: 'alert-group-001',
    type: 'warning',
    title: 'Group Member Limit Approaching',
    message: 'Development Team group is at 75% capacity',
    timestamp: '2024-01-15 14:25:00',
    severity: 'medium',
    status: 'active',
    mcpAgentId: 'agent-group-001',
    category: 'user'
  },
  {
    id: 'alert-group-002',
    type: 'success',
    title: 'Group Collaboration Analysis Complete',
    message: 'All groups show healthy collaboration patterns',
    timestamp: '2024-01-15 14:20:00',
    severity: 'low',
    status: 'acknowledged',
    mcpAgentId: 'agent-group-003',
    category: 'performance'
  }
];

const UserGroups: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('👥 UserGroups component is rendering with MCP integration!');

  // Enhanced mock data for groups with MCP integration
  const mockGroups: UserGroup[] = [
    {
      id: '1',
      name: 'Development Team',
      description: 'Core development team members',
      memberCount: 15,
      maxMembers: 20,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      createdBy: 'Admin',
      category: 'Development',
      color: 'blue',
      icon: '💻',
      permissions: ['code.access', 'deploy.access', 'testing.access'],
      isPrivate: false,
      joinApproval: true,
      mcpAgentId: 'agent-group-001',
      securityLevel: 'high',
      lastAudit: '2024-01-10',
      complianceStatus: 'compliant',
      riskScore: 65,
      activityLevel: 'high',
      engagementScore: 92
    },
    {
      id: '2',
      name: 'Marketing Team',
      description: 'Marketing and communications team',
      memberCount: 8,
      maxMembers: 12,
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-14',
      createdBy: 'Admin',
      category: 'Marketing',
      color: 'green',
      icon: '📢',
      permissions: ['content.create', 'analytics.view', 'campaign.manage'],
      isPrivate: false,
      joinApproval: false,
      mcpAgentId: 'agent-group-002',
      securityLevel: 'medium',
      lastAudit: '2024-01-12',
      complianceStatus: 'compliant',
      riskScore: 45,
      activityLevel: 'medium',
      engagementScore: 78
    },
    {
      id: '3',
      name: 'Sales Team',
      description: 'Sales and customer success team',
      memberCount: 12,
      maxMembers: 15,
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13',
      createdBy: 'Admin',
      category: 'Sales',
      color: 'purple',
      icon: '💰',
      permissions: ['leads.view', 'deals.manage', 'reports.view'],
      isPrivate: true,
      joinApproval: true,
      mcpAgentId: 'agent-group-003',
      securityLevel: 'critical',
      lastAudit: '2024-01-08',
      complianceStatus: 'pending',
      riskScore: 85,
      activityLevel: 'high',
      engagementScore: 89
    },
    {
      id: '4',
      name: 'Support Team',
      description: 'Customer support and help desk',
      memberCount: 6,
      maxMembers: 10,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-12',
      createdBy: 'Admin',
      category: 'Support',
      color: 'orange',
      icon: '🎧',
      permissions: ['tickets.view', 'tickets.resolve', 'knowledge.access'],
      isPrivate: false,
      joinApproval: false,
      mcpAgentId: 'agent-group-001',
      securityLevel: 'medium',
      lastAudit: '2024-01-05',
      complianceStatus: 'compliant',
      riskScore: 35,
      activityLevel: 'medium',
      engagementScore: 76
    }
  ];

  useEffect(() => {
    // Simulate MCP agent data loading
    const loadData = async () => {
      setLoading(true);
      
      // Simulate MCP agent data fetching
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGroups(mockGroups);
      setAgents(mockMCPAgents);
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

  const getActivityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  // CRUD Handlers
  const handleAddGroup = (groupData: any) => {
    console.log('🔧 MCP Agent: Adding new group with enhanced collaboration monitoring');
    const newGroup: UserGroup = {
      ...groupData,
      id: Date.now().toString(),
      mcpAgentId: 'agent-group-001',
      securityLevel: 'medium' as const,
      lastAudit: new Date().toISOString().split('T')[0],
      complianceStatus: 'pending',
      riskScore: Math.floor(Math.random() * 50) + 10,
      activityLevel: 'medium',
      engagementScore: Math.floor(Math.random() * 30) + 70
    };
    setGroups([...groups, newGroup]);
    setViewMode('list');
  };

  const handleEditGroup = (groupData: any) => {
    console.log('🔧 MCP Agent: Updating group with collaboration analytics');
    setGroups(groups.map(group => 
      group.id === groupData.id 
        ? { ...groupData, updatedAt: new Date().toISOString().split('T')[0] }
        : group
    ));
    setViewMode('list');
  };

  const handleDeleteGroup = (groupId: string) => {
    console.log('🔧 MCP Agent: Deleting group with member safety validation');
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const handleViewGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setViewMode('view');
  };

  const handleEditGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId);
    setViewMode('edit');
  };

  const handleAddGroupClick = () => {
    setViewMode('add');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedGroupId('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading UserGroups with MCP integration...</p>
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
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Groups
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
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-slate-600/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddGroupClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Add Group</span>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          User group management and organization with MCP agent integration
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

        {/* Groups Content */}
        {viewMode === 'list' && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Group Management</h2>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groups.map((group) => (
                <div key={group.id} className="bg-gray-50/50 dark:bg-slate-700/50 rounded-lg p-6 border border-gray-200/50 dark:border-slate-600/50 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{group.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {group.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityLevelColor(group.securityLevel)}`}>
                        {group.securityLevel}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(group.complianceStatus)}`}>
                        {group.complianceStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Members:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{group.memberCount}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{group.riskScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Activity:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityLevelColor(group.activityLevel)}`}>
                        {group.activityLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Engagement:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{group.engagementScore}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">MCP Agent:</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-slate-600/50">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewGroup(group.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditGroupClick(group.id)}
                        className="p-2 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
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
          <AddGroupForm onSave={handleAddGroup} onCancel={handleBackToList} />
        )}

        {viewMode === 'edit' && (
                    <EditGroupForm 
            groupId={selectedGroupId}
            onSave={handleEditGroup} 
            onCancel={handleBackToList}
            onDelete={handleDeleteGroup}
          />
        )}

        {viewMode === 'view' && (
                    <ViewGroupForm 
            groupId={selectedGroupId}
            onEdit={handleEditGroupClick}
            onDelete={handleDeleteGroup}
            onBack={handleBackToList} 
          />
        )}
      </div>
    </div>
  );
};

export default UserGroups;
