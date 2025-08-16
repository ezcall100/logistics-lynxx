/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const AdminPortal = () => {
  return (
    <PortalScaffold 
      title="Admin Portal"
      portalKey="admin"
      description="System administration and user management portal"
      features={[
        "User Management",
        "System Configuration", 
        "Access Control",
        "Audit Logs",
        "Role Management",
        "Security Settings"
      ]}
    />
  );
};

export default AdminPortal;
