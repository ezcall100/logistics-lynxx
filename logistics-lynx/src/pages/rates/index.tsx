/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const RatesPortal = () => {
  return (
    <PortalScaffold 
      title="Rates Portal"
      portalKey="rates"
      description="Rate management and pricing optimization portal"
      features={[
        "Rate Management",
        "Pricing Optimization",
        "Market Analysis",
        "Rate Negotiation",
        "Price History",
        "Competitive Analysis"
      ]}
    />
  );
};

export default RatesPortal;
