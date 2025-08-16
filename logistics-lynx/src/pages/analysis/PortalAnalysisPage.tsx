/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { PortalAnalysis } from '@/components/analysis/PortalAnalysis';

const PortalAnalysisPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <PortalAnalysis />
      </div>
    </Layout>
  );
};

export default PortalAnalysisPage;
