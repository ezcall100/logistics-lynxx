import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const MarketplacePortal = () => {
  return (
    <PortalScaffold 
      title="Marketplace Portal"
      portalKey="marketplace"
      description="Freight marketplace and trading platform portal"
      features={[
        "Marketplace Trading",
        "Auction System",
        "Price Discovery",
        "Transaction History",
        "Market Analytics",
        "Trading Tools"
      ]}
    />
  );
};

export default MarketplacePortal;
