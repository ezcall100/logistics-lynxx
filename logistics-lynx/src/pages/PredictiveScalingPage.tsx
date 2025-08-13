
import React from 'react';
import Layout from '@/components/layout/Layout';
import PredictiveScalingDashboard from '@/components/autonomous/PredictiveScalingDashboard';

const PredictiveScalingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Predictive Scaling</h1>
        <PredictiveScalingDashboard />
      </div>
    </Layout>
  );
};

export default PredictiveScalingPage;
