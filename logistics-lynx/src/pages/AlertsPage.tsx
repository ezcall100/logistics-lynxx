
import React from 'react';
import Layout from '@/components/layout/Layout';
import AlertDashboard from '@/components/alerts/AlertDashboard';

const AlertsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">System Alerts</h1>
        <AlertDashboard />
      </div>
    </Layout>
  );
};

export default AlertsPage;
