/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import EnhancedModernSidebar from './EnhancedModernSidebar';
import EnhancedUltraModernHeader from './EnhancedUltraModernHeader';
import { FloatingActionButton } from './FloatingActionButton';
import { BottomNavigation } from './BottomNavigation';

interface ResponsiveTMSLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveTMSLayout: React.FC<ResponsiveTMSLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Auto-collapse sidebar on mobile/tablet
      if (mobile || tablet) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col">
      {/* Header - Fixed at top */}
      <EnhancedUltraModernHeader 
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex flex-1 relative">
        {/* Sidebar - Responsive behavior */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          ${isMobile && sidebarOpen ? 'w-80' : ''}
        `}>
          <EnhancedModernSidebar 
            isCollapsed={!sidebarOpen}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Responsive margins */}
        <main className={`
          flex-1 overflow-auto
          ${!isMobile && sidebarOpen ? 'ml-0' : ''}
          transition-all duration-300 ease-in-out
          pb-20 md:pb-6
        `}>
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Action Button - Hidden on mobile */}
      <div className="hidden md:block">
        <FloatingActionButton />
      </div>

      {/* Bottom Navigation - Mobile only */}
      {isMobile && (
        <BottomNavigation />
      )}
    </div>
  );
};