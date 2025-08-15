import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const EDIPortal = () => {
  return (
    <PortalScaffold 
      title="EDI Portal"
      portalKey="edi"
      description="Electronic Data Interchange management portal"
      features={[
        "EDI Integration",
        "Data Mapping",
        "Transaction Monitoring",
        "Compliance",
        "Error Handling",
        "Document Management"
      ]}
    />
  );
};

export default EDIPortal;
