/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { AutonomousTaskManager } from '@/components/autonomous/AutonomousTaskManager';

const AutonomousTasksPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <AutonomousTaskManager />
      </div>
    </Layout>
  );
};

export default AutonomousTasksPage;
