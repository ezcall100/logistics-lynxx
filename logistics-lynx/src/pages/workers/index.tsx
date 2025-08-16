/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const WorkersPortal = () => {
  return (
    <PortalScaffold 
      title="Workers Portal"
      portalKey="workers"
      description="Worker management and operations portal"
      features={[
        "Worker Management",
        "Scheduling",
        "Performance Tracking",
        "Payroll Integration",
        "Time Tracking",
        "Worker Analytics"
      ]}
    />
  );
};

export default WorkersPortal;
