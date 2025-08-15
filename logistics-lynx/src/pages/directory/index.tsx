import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const DirectoryPortal = () => {
  return (
    <PortalScaffold 
      title="Directory Portal"
      portalKey="directory"
      description="Business directory and contact management portal"
      features={[
        "Business Directory",
        "Contact Management",
        "Network Building",
        "Search & Discovery",
        "Company Profiles",
        "Industry Connections"
      ]}
    />
  );
};

export default DirectoryPortal;
