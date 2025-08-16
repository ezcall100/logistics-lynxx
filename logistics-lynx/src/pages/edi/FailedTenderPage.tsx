/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { FailedTender } from '@/components/edi/FailedTender';

const FailedTenderPage: React.FC = () => {
  return (
    <Layout>
      <FailedTender />
    </Layout>
  );
};

export default FailedTenderPage;
