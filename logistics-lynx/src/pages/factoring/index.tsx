/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const FactoringPortal = () => {
  return (
    <PortalScaffold 
      title="Factoring Portal"
      portalKey="factoring"
      description="Invoice factoring and financial services portal"
      features={[
        "Invoice Factoring",
        "Payment Processing",
        "Financial Reports",
        "Cash Flow Management",
        "Credit Analysis",
        "Payment Tracking"
      ]}
    />
  );
};

export default FactoringPortal;
