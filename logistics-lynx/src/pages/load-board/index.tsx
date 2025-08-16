import React from 'react';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { LoadBoardPortal } from '../components/loadBoard/LoadBoardPortal';

const LoadBoardPage = () => {
  return (
    <ProtectedRoute 
      requiredRoles={['broker_admin', 'carrier_user', 'owner', 'admin']}
      featureFlag="portal.loadBoard.enabled"
    >
      <LoadBoardPortal />
    </ProtectedRoute>
  );
};

export default LoadBoardPage;