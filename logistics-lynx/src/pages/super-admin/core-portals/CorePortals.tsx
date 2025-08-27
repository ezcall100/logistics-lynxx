import React from 'react';
import { ResponsiveCard } from '../../../components/ui';

const CorePortals: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">🌍 Core Portals</h1>
      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Core Portal System</h2>
          <p className="text-gray-600 mb-4">Core portal management and configuration.</p>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default CorePortals;
