import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { EnhancedLayout } from './layout/EnhancedLayout';
import { useAuth } from '../contexts/AuthContext';

const SuperAdmin: React.FC = () => {
  console.log('🔍 SuperAdmin component rendering...');
  const location = useLocation();
  const { user } = useAuth();
  
  console.log('🔍 SuperAdmin: Current location:', location.pathname);
  console.log('🔍 SuperAdmin: User data:', user);

  if (!user) {
    console.error('🔍 SuperAdmin: No user data available');
    return null;
  }

  return (
    <EnhancedLayout user={user}>
      <Outlet />
    </EnhancedLayout>
  );
};

export default SuperAdmin;
