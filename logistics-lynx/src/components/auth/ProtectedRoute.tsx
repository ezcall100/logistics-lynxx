import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export const ProtectedRoute = ({ 
  children, 
  requiredRoles = [], 
  featureFlag = null 
}) => {
  const { isAuthenticated, user } = useAuth();
  const isFeatureEnabled = useFeatureFlag(featureFlag);

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check feature flag
  if (featureFlag && !isFeatureEnabled) {
    return <Navigate to="/portal-selection" replace />;
  }

  // Check role permissions
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      user?.roles?.includes(role)
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/portal-selection" replace />;
    }
  }

  return <>{children}</>;
};