import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types/auth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  
  return children;
}

export function RequireRoles({ roles, children }: { roles: UserRole[]; children: JSX.Element }) {
  const { selectedRole } = useAuth();
  
  if (!selectedRole) return null;
  
  return roles.includes(selectedRole) ? children : (
    <div className="p-6 text-sm text-red-600">You don't have access to this portal.</div>
  );
}
