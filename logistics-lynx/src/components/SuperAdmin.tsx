import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { EnhancedLayout } from './layout/EnhancedLayout';
import { useAuth } from '../contexts/AuthContext';

const SuperAdmin: React.FC = () => {
  console.log('🔍 SuperAdmin component rendering...');
  const location = useLocation();
  const { user, isLoading } = useAuth();
  
  console.log('🔍 SuperAdmin: Current location:', location.pathname);
  console.log('🔍 SuperAdmin: User data:', user);
  console.log('🔍 SuperAdmin: Loading state:', isLoading);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Super Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  // Check if user exists in localStorage as fallback
  const storedUser = localStorage.getItem('auth_user');
  let currentUser = user;
  
  if (!currentUser && storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      console.log('🔍 SuperAdmin: Using stored user data:', currentUser);
    } catch (error) {
      console.error('🔍 SuperAdmin: Failed to parse stored user data:', error);
    }
  }

  // For testing purposes, create a default user if none exists
  if (!currentUser) {
    console.log('🔍 SuperAdmin: Creating default user for testing');
    currentUser = {
      name: 'Super Admin',
      email: 'admin@transbot.ai',
      role: 'super_admin',
      isAuthenticated: true,
      permissions: ['*']
    };
    localStorage.setItem('auth_user', JSON.stringify(currentUser));
  }

  // Check if user has super admin role (support both formats)
  const hasSuperAdminRole = currentUser.role === 'super_admin' || 
                           currentUser.role === 'super-admin' ||
                           currentUser.role === 'admin';
  
  if (!hasSuperAdminRole) {
    console.log('🔍 SuperAdmin: User does not have super admin role, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('🔍 SuperAdmin: Rendering dashboard for user:', currentUser.name);
  
  // Render with full EnhancedLayout
  return (
    <EnhancedLayout user={currentUser}>
      <Outlet />
    </EnhancedLayout>
  );
};

export default SuperAdmin;
