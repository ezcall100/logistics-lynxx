import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isAuthenticated: boolean;
}

// Mock authentication context - in a real app, this would come from your auth provider
const useAuth = (): { user: User | null; isLoading: boolean } => {
  // For now, we'll simulate a logged-in super admin user
  // In production, this would check localStorage, cookies, or your auth service
  const mockUser: User = {
    id: '1',
    name: 'Admin User',
    email: 'admin@logisticslynx.com',
    role: 'super-admin',
    permissions: [
      'dashboard:read',
      'users:read',
      'users:write',
      'system:admin',
      'security:admin',
      'mcp:admin',
      'analytics:read',
      'settings:admin'
    ],
    isAuthenticated: true
  };

  return {
    user: mockUser,
    isLoading: false
  };
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'super-admin',
  fallbackPath = '/login'
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('🔍 ProtectedRoute: Checking access...', {
    user: user?.role,
    requiredRole,
    isAuthenticated: user?.isAuthenticated,
    currentPath: location.pathname
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user || !user.isAuthenticated) {
    console.log('🔍 ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    console.log('🔍 ProtectedRoute: Insufficient role', {
      userRole: user.role,
      requiredRole
    });
    return <Navigate to="/unauthorized" replace />;
  }

  // Check specific permissions if needed
  const hasRequiredPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => user.permissions.includes(permission));
  };

  // Route-specific permission checks
  const getRequiredPermissions = (pathname: string): string[] => {
    if (pathname.includes('/security/')) {
      return ['security:admin'];
    }
    if (pathname.includes('/system/')) {
      return ['system:admin'];
    }
    if (pathname.includes('/mcp/')) {
      return ['mcp:admin'];
    }
    if (pathname.includes('/users/')) {
      return ['users:read'];
    }
    return ['dashboard:read']; // Default permission
  };

  const requiredPermissions = getRequiredPermissions(location.pathname);
  if (!hasRequiredPermissions(requiredPermissions)) {
    console.log('🔍 ProtectedRoute: Insufficient permissions', {
      userPermissions: user.permissions,
      requiredPermissions
    });
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('🔍 ProtectedRoute: Access granted');
  return <>{children}</>;
};

// Higher-order component for easier usage
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: string
) => {
  return (props: P) => (
    <ProtectedRoute requiredRole={requiredRole}>
      <Component {...props} />
    </ProtectedRoute>
  );
};
