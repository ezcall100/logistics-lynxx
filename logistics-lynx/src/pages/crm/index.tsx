import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const CRMPortal = () => {
  return (
    <PortalScaffold 
      title="CRM Portal"
      portalKey="crm"
      description="Customer relationship management portal"
      features={[
        "Customer Management",
        "Sales Pipeline",
        "Communication Tracking",
        "Lead Management",
        "Opportunity Tracking",
        "Customer Analytics"
      ]}
    />
  );
};

export default CRMPortal;
