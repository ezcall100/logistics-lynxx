import React, { useState } from 'react';
import BrokerSidebar from './BrokerSidebar';
import BrokerHeader from './BrokerHeader';
import { cn } from '@/lib/utils';

interface BrokerLayoutProps {
  children?: React.ReactNode;
}

const BrokerLayout: React.FC<BrokerLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // DEBUG: Log when BrokerLayout renders
  console.log('🏢 BROKER Layout rendering');

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BrokerHeader 
        onMenuToggle={handleMenuToggle}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex">
        {/* Sidebar */}
        <BrokerSidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleMenuToggle}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out pt-16",
          sidebarCollapsed ? "ml-16" : "ml-72"
        )}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrokerLayout;