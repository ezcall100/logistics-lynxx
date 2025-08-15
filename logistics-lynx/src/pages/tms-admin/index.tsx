import React from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { TMSAdminPortal } from '../components/tmsAdmin/TMSAdminPortal';

const TMSAdminPage = () => {
  return (
    <ProtectedRoute 
      requiredRoles={['owner', 'admin']}
      featureFlag="portal.tmsAdmin.enabled"
    >
      <TMSAdminPortal />
    </ProtectedRoute>
  );
};

export default TMSAdminPage;