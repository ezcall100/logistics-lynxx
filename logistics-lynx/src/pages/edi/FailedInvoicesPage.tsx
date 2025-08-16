/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { FailedInvoices } from '@/components/edi/FailedInvoices';

const FailedInvoicesPage: React.FC = () => {
  return (
    <Layout>
      <FailedInvoices />
    </Layout>
  );
};

export default FailedInvoicesPage;
