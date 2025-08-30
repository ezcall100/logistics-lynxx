import React from 'react';
import { Outlet } from 'react-router-dom';
import { EnhancedLayout } from '../../components/layout/EnhancedLayout';

const OwnerOperatorPortal: React.FC = () => {
  return (
    <EnhancedLayout>
      <Outlet />
    </EnhancedLayout>
  );
};

export default OwnerOperatorPortal;
