import React from 'react';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { TMSAdminPortal } from '../../components/tms-admin/TMSAdminPortal';

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