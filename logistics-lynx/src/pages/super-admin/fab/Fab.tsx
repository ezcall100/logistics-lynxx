import React from 'react';
import { ResponsiveCard } from '../../../components/ui';

const Fab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">⚡ FAB Management</h1>
      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Floating Action Buttons</h2>
          <p className="text-gray-600 mb-4">Configure and manage floating action buttons.</p>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default Fab;
