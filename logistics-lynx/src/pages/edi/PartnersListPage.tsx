
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PartnersList } from '@/components/edi/PartnersList';

const PartnersListPage: React.FC = () => {
  return (
    <Layout>
      <PartnersList />
    </Layout>
  );
};

export default PartnersListPage;
