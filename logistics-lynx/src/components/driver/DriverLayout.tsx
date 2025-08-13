import React, { useState, useEffect } from 'react';
import DriverHeader from './DriverHeader';
import DriverSidebar from './DriverSidebar';
import DriverFloatingActionButton from './DriverFloatingActionButton';
import { cn } from '@/lib/utils';

interface DriverLayoutProps {
  children?: React.ReactNode;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start collapsed on mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Auto-open on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50">
        <DriverHeader 
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
          isMobile={isMobile}
        />
      </div>

      {/* Main layout container - Full Width */}
      <div className="flex flex-1 min-h-0 w-full max-w-none">
        {/* Enhanced Sidebar */}
        <DriverSidebar 
          isOpen={sidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />

        {/* Main Content - Absolute Full Width */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background/95 to-muted/10 w-full max-w-none">
          <div className="min-h-full w-full max-w-none">
            <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Enhanced Floating Action Button */}
      <DriverFloatingActionButton />
    </div>
  );
};

export default DriverLayout;