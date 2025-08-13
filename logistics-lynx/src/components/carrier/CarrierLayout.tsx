import React, { useState } from 'react';
import CarrierSidebar from './CarrierSidebar';
import CarrierHeader from './CarrierHeader';
import CarrierFloatingActionButton from './CarrierFloatingActionButton';
import { cn } from '@/lib/utils';

interface CarrierLayoutProps {
  children?: React.ReactNode;
}

const CarrierLayout: React.FC<CarrierLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // DEBUG: Log when CarrierLayout renders
  console.log('🚛 CARRIER Layout rendering');

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <CarrierHeader 
        onMenuToggle={handleMenuToggle}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex">
        {/* Sidebar */}
        <CarrierSidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleMenuToggle}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out pt-16",
          sidebarCollapsed ? "ml-16" : "ml-72"
        )}>
          <div className="container-fluid min-h-[calc(100vh-4rem)] p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <CarrierFloatingActionButton />
    </div>
  );
};

export default CarrierLayout;