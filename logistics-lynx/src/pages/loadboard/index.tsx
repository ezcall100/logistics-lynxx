import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const LoadBoardPortal = () => {
  return (
    <PortalScaffold 
      title="Load Board Portal"
      portalKey="loadBoard"
      description="Load board and freight matching portal"
      features={[
        "Load Posting",
        "Freight Matching",
        "Rate Negotiation",
        "Load Tracking",
        "Carrier Directory",
        "Market Analytics"
      ]}
    />
  );
};

export default LoadBoardPortal;
