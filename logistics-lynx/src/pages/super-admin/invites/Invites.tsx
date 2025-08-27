import React from 'react';
import { ResponsiveCard, EnhancedButton } from '../../../components/ui';

const Invites: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">📧 Invites Management</h1>
      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Invite System</h2>
          <p className="text-gray-600 mb-4">Manage user invitations and access control.</p>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default Invites;
