import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { canAccessPortal } from '../../services/authService';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
  portal: string;
  fallbackPath?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  requiredRole,
  portal,
  fallbackPath = '/access-denied'
}) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no user data, show loading or redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has access to this portal
  const userRole = user.role || 'super_admin'; // Default to super_admin for demo
  const hasAccess = canAccessPortal(userRole, portal);

  if (!hasAccess) {
    console.warn(`Access denied: User role ${userRole} cannot access portal ${portal}`);
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

// Specific portal route guards
export const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="super_admin" portal="super-admin">
    {children}
  </RoleBasedRoute>
);

export const CarrierRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="carrier_admin" portal="carrier">
    {children}
  </RoleBasedRoute>
);

export const BrokerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="freight_broker_admin" portal="broker">
    {children}
  </RoleBasedRoute>
);

export const ShipperRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="shipper_admin" portal="shipper">
    {children}
  </RoleBasedRoute>
);

export const DriverRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="carrier_driver" portal="driver">
    {children}
  </RoleBasedRoute>
);

export const OwnerOperatorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleBasedRoute requiredRole="owner_operator" portal="owner-operator">
    {children}
  </RoleBasedRoute>
);
