
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ModernLayout from '@/components/layout/ModernLayout';
import ModernDashboard from './ModernDashboard';

const Dashboard = () => {
  const { selectedRole, setSelectedRole } = useAuth();
  const location = useLocation();

  // Map routes to roles (excluding shipper-admin which has its own layout)
  const routeToRoleMap: Record<string, string> = {
    '/super-admin': 'super_admin',
    '/carrier-admin': 'carrier_admin', 
    '/broker-admin': 'freight_broker_admin',
    '/driver': 'carrier_driver',
    '/owner-operator': 'owner_operator',
    '/dashboard': selectedRole || 'super_admin' // Default to current role or super_admin
  };

  // Update role based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const roleForRoute = routeToRoleMap[currentPath];
    
    if (roleForRoute && roleForRoute !== selectedRole) {
      setSelectedRole(roleForRoute as unknown);
    }
  }, [location.pathname, selectedRole, setSelectedRole]);

  return (
    <ModernLayout>
      <ModernDashboard />
    </ModernLayout>
  );
};

export default Dashboard;
