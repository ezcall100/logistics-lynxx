/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const TMSAdminPortal = () => {
  return (
    <PortalScaffold 
      title="TMS Admin Portal"
      portalKey="tmsAdmin"
      description="Transportation Management System administration portal"
      features={[
        "TMS Configuration",
        "Workflow Management",
        "System Integration",
        "Performance Monitoring",
        "Data Management",
        "System Health"
      ]}
    />
  );
};

export default TMSAdminPortal;
