/**
 * App Shell Layout
 * Unified layout component for all portals with consistent structure
 */

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

// Import layout components
import ModernLayout from './ModernLayout';
import AutonomousLayout from './AutonomousLayout';
import UltraModernLayout from './UltraModernLayout';
import Layout from './Layout';

// Import dashboard components
import ModernDashboard from '@/pages/dashboard/ModernDashboard';
import AutonomousDashboard from '@/pages/dashboard/AutonomousDashboard';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isAuthenticated, isLoading, selectedRole } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Determine which layout to use based on route and role
  const getLayoutType = () => {
    const path = location.pathname;
    
    // Check if we're on a portal route
    if (path.startsWith('/rates') || path.startsWith('/directory')) {
      return 'modern'; // Use modern layout for portals
    }
    
    // Check if we're on dashboard routes
    if (path === '/' || path === '/dashboard') {
      return 'autonomous'; // Use autonomous layout for main dashboard
    }
    
    // Default to modern layout
    return 'modern';
  };

  const layoutType = getLayoutType();

  // Show loading while determining auth state
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
    return null; // This will be handled by the router
  }

  // Render appropriate layout
  switch (layoutType) {
    case 'autonomous':
      return (
        <AutonomousLayout>
          <AutonomousDashboard />
        </AutonomousLayout>
      );
    
    case 'modern':
    default:
      return (
        <ModernLayout>
          {children}
        </ModernLayout>
      );
  }
};

export default AppShell;
