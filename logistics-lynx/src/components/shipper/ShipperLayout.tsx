
import React, { useState } from 'react';
import ShipperSidebar from './ShipperSidebar';
import ShipperHeader from './ShipperHeader';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ShipperLayoutProps {
  children?: React.ReactNode;
}

const ShipperLayout: React.FC<ShipperLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-orange-500/5 flex flex-col overflow-hidden">
      {/* Header */}
      <ShipperHeader 
        onMenuToggle={handleSidebarToggle}
        isSidebarCollapsed={sidebarCollapsed}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ShipperSidebar 
          collapsed={sidebarCollapsed && !isMobile}
          isOpen={sidebarOpen}
          onToggle={handleSidebarToggle}
          onClose={closeSidebar}
          isMobile={isMobile}
        />

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out bg-gradient-to-br from-transparent via-background/50 to-orange-500/5 relative overflow-auto",
          // Desktop spacing
          !isMobile && (sidebarCollapsed ? "ml-20" : "ml-80"),
          // Mobile: full width when sidebar is closed
          isMobile && "ml-0"
        )}>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--orange-500))_0%,transparent_50%)]" />
          
          <div className="relative z-10 w-full">
            <div className="container mx-auto p-4 lg:p-8 max-w-full animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShipperLayout;
