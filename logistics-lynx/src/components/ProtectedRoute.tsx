
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredFlag?: string;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredFlag, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, isLoading, selectedRole, user } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check feature flag (for now, default to true - can be enhanced with feature flag service)
  const featureEnabled = true; // TODO: Implement feature flag checking
  if (requiredFlag && !featureEnabled) {
    console.log(`ProtectedRoute: Feature flag ${requiredFlag} disabled, redirecting to portal selection`);
    return <Navigate to="/portal-selection" replace />;
  }

  // Check role access
  if (allowedRoles.length > 0 && selectedRole && !allowedRoles.includes(selectedRole)) {
    console.log(`ProtectedRoute: Role ${selectedRole} not allowed, redirecting to portal selection`);
    return <Navigate to="/portal-selection" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
