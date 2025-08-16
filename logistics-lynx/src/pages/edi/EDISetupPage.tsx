/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { EDISetup } from '@/components/edi/EDISetup';

const EDISetupPage: React.FC = () => {
  return (
    <Layout>
      <EDISetup />
    </Layout>
  );
};

export default EDISetupPage;
