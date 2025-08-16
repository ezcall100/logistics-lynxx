/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { MarketResearchDashboard } from '@/components/autonomous/MarketResearchDashboard';

const MarketResearchPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
        <MarketResearchDashboard />
      </div>
    </Layout>
  );
};

export default MarketResearchPage;
