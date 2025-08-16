/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { APILogs } from '@/components/api/APILogs';

const APILogsPage: React.FC = () => {
  return (
    <Layout>
      <APILogs />
    </Layout>
  );
};

export default APILogsPage;
