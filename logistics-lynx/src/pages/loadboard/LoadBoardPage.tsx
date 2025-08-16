/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { LoadBoard } from '@/components/loadboard/LoadBoard';

const LoadBoardPage: React.FC = () => {
  return (
    <Layout>
      <LoadBoard />
    </Layout>
  );
};

export default LoadBoardPage;
