import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { QuickActions } from './QuickActions';
import ModernDashboard from '@/pages/dashboard/ModernDashboard';

const UnifiedDashboard = () => {
  const { selectedRole } = useAuth();

  return (
    <div className="space-y-6">
      {/* Quick Actions Section */}
      <QuickActions />
      
      {/* Main Dashboard Content */}
      <ModernDashboard />
    </div>
  );
};

export default UnifiedDashboard;
