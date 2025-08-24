import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  featureFlag?: string | null;
  requireCompanyAccess?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [], 
  featureFlag = null,
  requireCompanyAccess = true
}) => {
  const { isAuthenticated, user, session } = useAuth();
  const isFeatureEnabled = useFeatureFlag(featureFlag);

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has a valid session
  if (!session?.user) {
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

  // Check company access for RLS protection
  if (requireCompanyAccess && !user?.company_id) {
    console.warn('User does not have company access - RLS protection required');
    return <Navigate to="/portal-selection" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
