import React from 'react';
import { ResponsiveCard } from '../../../components/ui';

const AnalyticsReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">📋 Analytics Reports</h1>
      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Report Management</h2>
          <p className="text-gray-600 mb-4">Generate and manage analytics reports.</p>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default AnalyticsReports;
