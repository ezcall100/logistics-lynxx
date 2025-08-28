import { useState, useEffect } from 'react';

import { InviteStatusCard } from '@/components/invites/InviteStatusCard';
import { Plus, Search, Users } from 'lucide-react';

const InviteManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [invitations, setInvitations] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data
    setInvitations([
      {
        id: '1',
        email: 'john.doe@example.com',
        role: 'admin',
        status: 'pending',
        invited_by: { email: 'admin@company.com', name: 'Admin User' },
        invited_at: '2024-01-15T10:00:00Z',
        expires_at: '2024-01-22T10:00:00Z'
      },
      {
        id: '2',
        email: 'jane.smith@example.com',
        role: 'user',
        status: 'accepted',
        invited_by: { email: 'admin@company.com', name: 'Admin User' },
        invited_at: '2024-01-14T15:30:00Z',
        accepted_at: '2024-01-15T09:15:00Z'
      }
    ]);
    setLoading(false);
  }, []);

  const handleInvitationUpdate = (updatedInvitation: any) => {
    setInvitations(prev => 
      prev.map(inv => 
        inv.id === updatedInvitation.id ? updatedInvitation : inv
      )
    );
  };

  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invitation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Invite Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2 inline" />
          Invite User
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search invitations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Invitations List */}
      <div className="space-y-4">
        {filteredInvitations.map((invitation) => (
          <InviteStatusCard
            key={invitation.id}
            invitation={invitation}
            onStatusChange={handleInvitationUpdate}
          />
        ))}
      </div>

      {filteredInvitations.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invitations found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default InviteManagement;
