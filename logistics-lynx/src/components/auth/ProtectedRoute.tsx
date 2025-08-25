import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  roles?: string[];
  permissions?: string[];
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles = [],
  permissions = [],
  fallbackPath = '/login'
}) => {
  const { user, isLoading, hasRole, hasPermissions } = useAuth();
  const location = useLocation();

  console.log('🔍 ProtectedRoute: Checking access...', {
    user: user?.role,
    roles,
    permissions,
    isAuthenticated: user?.isAuthenticated,
    currentPath: location.pathname,
    isLoading
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking session...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user || !user.isAuthenticated) {
    console.log('🔍 ProtectedRoute: User not authenticated, redirecting to login');
    return (
      <Navigate 
        to={fallbackPath} 
        replace 
        state={{ from: location.pathname + location.search }} 
      />
    );
  }

  // Check role-based access
  if (roles.length > 0 && !roles.some(role => hasRole(role))) {
    console.log('🔍 ProtectedRoute: Insufficient role', {
      userRole: user.role,
      requiredRoles: roles
    });
    return <Navigate to="/unauthorized" replace />;
  }

  // Check specific permissions
  if (permissions.length > 0 && !hasPermissions(permissions)) {
    console.log('🔍 ProtectedRoute: Insufficient permissions', {
      userPermissions: user.permissions,
      requiredPermissions: permissions
    });
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('🔍 ProtectedRoute: Access granted');
  return <Outlet />;
};

// Higher-order component for easier usage (legacy support)
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  roles?: string[],
  permissions?: string[]
) => {
  return (props: P) => (
    <ProtectedRoute roles={roles} permissions={permissions}>
      <Component {...props} />
    </ProtectedRoute>
  );
};
