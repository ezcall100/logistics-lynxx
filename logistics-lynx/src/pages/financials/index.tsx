import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const FinancialsPortal = () => {
  return (
    <PortalScaffold 
      title="Financials Portal"
      portalKey="financials"
      description="Financial management and accounting portal"
      features={[
        "Accounting",
        "Financial Reports",
        "Budget Management",
        "Tax Compliance",
        "Revenue Tracking",
        "Expense Management"
      ]}
    />
  );
};

export default FinancialsPortal;
