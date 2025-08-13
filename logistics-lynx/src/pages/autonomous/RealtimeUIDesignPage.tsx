import React from 'react';
import Layout from '@/components/layout/Layout';
import AutonomousUIDesignDashboard from '@/components/autonomous/AutonomousUIDesignDashboard';

const RealtimeUIDesignPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <AutonomousUIDesignDashboard />
      </div>
    </Layout>
  );
};

export default RealtimeUIDesignPage;