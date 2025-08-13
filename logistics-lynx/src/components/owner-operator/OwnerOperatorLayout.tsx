import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OwnerOperatorDashboard from '@/pages/owner-operator/OwnerOperatorDashboard';
import OwnerOperatorHeader from './OwnerOperatorHeader';
import OwnerOperatorSidebar from './OwnerOperatorSidebar';
import FloatingActionButton from './FloatingActionButton';
import { cn } from '@/lib/utils';

interface OwnerOperatorLayoutProps {
  children?: React.ReactNode;
}

const OwnerOperatorLayout: React.FC<OwnerOperatorLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <OwnerOperatorHeader 
        onMenuToggle={handleMenuToggle}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex">
        {/* Sidebar */}
        <OwnerOperatorSidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleMenuToggle}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out pt-16",
          sidebarCollapsed ? "ml-16" : "ml-72"
        )}>
          <div className="container-fluid min-h-[calc(100vh-4rem)]">
            {children || <OwnerOperatorDashboard />}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default OwnerOperatorLayout;