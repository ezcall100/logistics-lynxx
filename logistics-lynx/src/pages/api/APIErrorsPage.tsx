/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Layout from '@/components/layout/Layout';
import { APIErrors } from '@/components/api/APIErrors';

const APIErrorsPage: React.FC = () => {
  return (
    <Layout>
      <APIErrors />
    </Layout>
  );
};

export default APIErrorsPage;
