import React from 'react';
import { ResponsiveCard } from '../../../components/ui';

const CoreTMS: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">🚛 Core TMS</h1>
      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">TMS Core System</h2>
          <p className="text-gray-600 mb-4">Core Transportation Management System controls.</p>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default CoreTMS;
