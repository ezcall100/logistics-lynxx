import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  UserPlus,
  UserMinus,
  Shield,
  Lock,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedInput,
  EnhancedModal,
  EnhancedTable,
  EnhancedSearch,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

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
}

interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
  avatar: string;
}

const UserGroups: React.FC = () => {
  console.log('👥 UserGroups component is rendering!');
  const [mode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock data for groups
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
      joinApproval: true
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
      permissions: ['content.create', 'analytics.view', 'social.manage'],
      isPrivate: false,
      joinApproval: false
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
      permissions: ['leads.view', 'crm.access', 'reports.view'],
      isPrivate: true,
      joinApproval: true
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
      permissions: ['tickets.view', 'knowledge.access', 'chat.access'],
      isPrivate: false,
      joinApproval: false
    },
    {
      id: '5',
      name: 'Executive Team',
      description: 'Senior management and executives',
      memberCount: 5,
      maxMembers: 8,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-11',
      createdBy: 'Admin',
      category: 'Management',
      color: 'red',
      icon: '👔',
      permissions: ['all.access', 'reports.view', 'analytics.view'],
      isPrivate: true,
      joinApproval: true
    },
    {
      id: '6',
      name: 'QA Team',
      description: 'Quality assurance and testing team',
      memberCount: 4,
      maxMembers: 6,
      status: 'active',
      createdAt: '2024-01-06',
      updatedAt: '2024-01-10',
      createdBy: 'Admin',
      category: 'Development',
      color: 'yellow',
      icon: '🔍',
      permissions: ['testing.access', 'bugs.report', 'quality.view'],
      isPrivate: false,
      joinApproval: true
    }
  ];

  // Mock data for group members
  const mockMembers: GroupMember[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Lead Developer',
      joinedAt: '2024-01-01',
      status: 'active',
      avatar: '👨‍💻'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Senior Developer',
      joinedAt: '2024-01-02',
      status: 'active',
      avatar: '👩‍💻'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Developer',
      joinedAt: '2024-01-03',
      status: 'active',
      avatar: '👨‍💻'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups(mockGroups);
      setGroupMembers(mockMembers);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'archived': return 'neutral';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return 'blue';
      case 'Marketing': return 'green';
      case 'Sales': return 'purple';
      case 'Support': return 'orange';
      case 'Management': return 'red';
      default: return 'default';
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const groupColumns = [
    {
      key: 'name',
      title: 'Group',
      sortable: true,
      render: (_: any, row: UserGroup) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${stableStyles.surface[mode]}`}>
            {row.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                {row.name}
              </div>
              {row.isPrivate && (
                <Lock className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
              {row.description}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      render: (_: any, row: UserGroup) => (
        <EnhancedBadge
          variant={getCategoryColor(row.category) as any}
          
          mode={mode}
        >
          {row.category}
        </EnhancedBadge>
      )
    },
    {
      key: 'members',
      title: 'Members',
      sortable: true,
      render: (_: any, row: UserGroup) => (
        <div className={`text-center ${stableStyles.textPrimary[mode]}`}>
          <div className="font-semibold">{row.memberCount}/{row.maxMembers}</div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {Math.round((row.memberCount / row.maxMembers) * 100)}% full
          </div>
        </div>
      )
    },
    {
      key: 'permissions',
      title: 'Permissions',
      sortable: false,
      render: (_: any, row: UserGroup) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.slice(0, 2).map((perm, index) => (
            <EnhancedBadge
              key={index}
              variant="default"
              
              mode={mode}
            >
              {perm}
            </EnhancedBadge>
          ))}
          {row.permissions.length > 2 && (
            <EnhancedBadge
              variant="default"
              
              mode={mode}
            >
              +{row.permissions.length - 2}
            </EnhancedBadge>
          )}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (_: any, row: UserGroup) => (
        <EnhancedBadge
          variant={getStatusColor(row.status) as any}
          
          mode={mode}
        >
          {row.status}
        </EnhancedBadge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      render: (_: any, row: UserGroup) => (
        <div className="flex space-x-2">
          <EnhancedButton
            variant="ghost"
            
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setSelectedGroup(row);
              setShowMembersModal(true);
            }}
          />
          <EnhancedButton
            variant="ghost"
            
            icon={<Edit className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setSelectedGroup(row);
              setShowEditModal(true);
            }}
          />
          <EnhancedButton
            variant="ghost"
            
            icon={<Trash2 className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setSelectedGroup(row);
              setShowDeleteModal(true);
            }}
          />
        </div>
      )
    }
  ];

  const metrics = {
    totalGroups: groups.length,
    activeGroups: groups.filter(g => g.status === 'active').length,
    totalMembers: groups.reduce((sum, group) => sum + group.memberCount, 0),
    avgMembersPerGroup: Math.round(groups.reduce((sum, group) => sum + group.memberCount, 0) / groups.length)
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              User Groups
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Organize users into groups for better management and collaboration
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Groups
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              
              icon={<Upload className="w-4 h-4" />}
              mode={mode}
            >
              Import Groups
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              
              icon={<Plus className="w-4 h-4" />}
              mode={mode}
              onClick={() => setShowCreateModal(true)}
            >
              Create Group
            </EnhancedButton>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Total Groups</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalGroups}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Active Groups</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.activeGroups}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Total Members</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalMembers}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Avg Members/Group</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.avgMembersPerGroup}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* Filters and */}
        <EnhancedCard mode={mode}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <EnhancedSearch
                placeholder="groups..."
                value={searchTerm}
                onChange={setSearchTerm}
                mode={mode}
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Categories</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Management">Management</option>
              </select>
              <EnhancedButton
                variant="ghost"
                
                icon={<RefreshCw className="w-4 h-4" />}
                mode={mode}
              >
                Refresh
              </EnhancedButton>
            </div>
          </div>
        </EnhancedCard>

        {/* Groups Table */}
        <EnhancedCard mode={mode}>
          <EnhancedTable
            data={filteredGroups}
            columns={groupColumns}
            loading={loading}
            mode={mode}
            
          />
        </EnhancedCard>
      </div>

      {/* Create Group Modal */}
      <EnhancedModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Group"
        mode={mode}
      >
        <div className="space-y-4">
          <EnhancedInput
            placeholder="Enter group name"
            mode={mode}
          />
          <EnhancedInput
            placeholder="Enter group description"
            mode={mode}
            multiline
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <EnhancedInput
              placeholder="20"
              type="number"
              mode={mode}
            />
            <select className={`px-4 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>Private Group</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>Require Approval</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="default"
            onClick={() => setShowCreateModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="primary"
            onClick={() => setShowCreateModal(false)}
            mode={mode}
          >
            Create Group
          </EnhancedButton>
        </div>
      </EnhancedModal>

      {/* Edit Group Modal */}
      <EnhancedModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Group"
        mode={mode}
      >
        {selectedGroup && (
          <div className="space-y-4">
            <EnhancedInput
              placeholder="Group Name"
              value={selectedGroup.name}
              mode={mode}
            />
            <EnhancedInput
              placeholder="Description"
              value={selectedGroup.description}
              mode={mode}
              multiline
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <EnhancedInput
                placeholder="Max Members"
                type="number"
                value={selectedGroup.maxMembers.toString()}
                mode={mode}
              />
              <select
                value={selectedGroup.category}
                className={`px-4 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedGroup.isPrivate}
                />
                <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>Private Group</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedGroup.joinApproval}
                />
                <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>Require Approval</span>
              </label>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="default"
            onClick={() => setShowEditModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="primary"
            onClick={() => setShowEditModal(false)}
            mode={mode}
          >
            Changes
          </EnhancedButton>
        </div>
      </EnhancedModal>

      {/* Delete Group Modal */}
      <EnhancedModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Group"
        mode={mode}
      >
        <div className="space-y-4">
          <p className={`${stableStyles.textSecondary[mode]}`}>
            Are you sure you want to delete the group "{selectedGroup?.name}"? This action cannot be undone.
          </p>
          <div className={`p-4 rounded-lg ${stableStyles.surface[mode]}`}>
            <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
              This group currently has {selectedGroup?.memberCount} members.
              All members will be removed from this group.
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="default"
            onClick={() => setShowDeleteModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="danger"
            onClick={() => setShowDeleteModal(false)}
            mode={mode}
          >
            Delete Group
          </EnhancedButton>
        </div>
      </EnhancedModal>

      {/* Group Members Modal */}
      <EnhancedModal
        isOpen={showMembersModal}
        onClose={() => setShowMembersModal(false)}
        title={`${selectedGroup?.name} - Members`}
        mode={mode}
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
              {selectedGroup?.memberCount} members
            </p>
            <EnhancedButton
              variant="primary"
              
              icon={<UserPlus className="w-4 h-4" />}
              mode={mode}
            >
              Add Member
            </EnhancedButton>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {groupMembers.map(member => (
              <div key={member.id} className={`flex items-center justify-between p-3 rounded-lg ${stableStyles.surface[mode]}`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{member.avatar}</div>
                  <div>
                    <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                      {member.name}
                    </div>
                    <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      {member.email} • {member.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <EnhancedBadge
                    variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}
                    
                    mode={mode}
                  >
                    {member.status}
                  </EnhancedBadge>
                  <EnhancedButton
                    variant="ghost"
                    
                    icon={<UserMinus className="w-4 h-4" />}
                    mode={mode}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="default"
            onClick={() => setShowMembersModal(false)}
            mode={mode}
          >
            Close
          </EnhancedButton>
        </div>
      </EnhancedModal>
    </div>
  );
};

export default UserGroups;
