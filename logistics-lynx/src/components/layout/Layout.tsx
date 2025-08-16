/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import EnhancedDriverSidebar from '@/components/driver/EnhancedDriverSidebar';
import ModernSidebar from './ModernSidebar';
import UltraModernHeader from './UltraModernHeader';
import DriverHeader from '@/components/driver/DriverHeader';
import FloatingActionButton from '../shared/FloatingActionButton';
import DriverFloatingActionButton from '@/components/driver/DriverFloatingActionButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, selectedRole } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // DEBUG: Log when Layout component renders
  console.log('🔍 MAIN Layout rendering for route:', location.pathname, 'selectedRole:', selectedRole);

  // Check if we're in the driver portal
  const isDriverPortal = location.pathname.startsWith('/driver');

  // Auto-close sidebar on mobile when route changes
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="glass-ultra flex flex-col items-center gap-6 p-12 rounded-3xl shadow-premium max-w-md mx-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 animate-pulse"></div>
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Loading TMS Portal
            </h3>
            <p className="text-muted-foreground font-medium">
              {isDriverPortal ? 'Initializing Driver Dashboard...' : 'Initializing your autonomous workspace...'}
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Driver Portal Layout
  if (isDriverPortal) {
    return (
      <div className={cn(
        "flex min-h-screen w-full bg-gradient-to-br from-background via-background/98 to-red-500/5 overflow-hidden transition-all duration-300",
        sidebarCollapsed && !isMobile ? "ml-0" : ""
      )}>
        {/* Enhanced Driver Sidebar */}
        <EnhancedDriverSidebar 
          isOpen={sidebarOpen} 
          onClose={isMobile ? closeSidebar : undefined}
          isCollapsed={sidebarCollapsed && !isMobile}
          onToggleCollapse={toggleSidebarCollapse}
        />
        
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {/* Driver Header */}
          <DriverHeader toggleSidebar={toggleSidebar} isMobile={isMobile} />
          
          <main className="flex-1 overflow-auto bg-gradient-to-br from-transparent via-background/50 to-red-500/5 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--driver-primary))_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 w-full max-w-none">
              <div className="animate-fade-in w-full max-w-none">
                {children}
              </div>
            </div>
          </main>
        </div>
        
        {/* Driver Floating Action Button */}
        <DriverFloatingActionButton />
      </div>
    );
  }

  // Default Layout for other portals
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background/98 to-primary/5 overflow-hidden">
        {/* Ultra-Modern Sidebar */}
        <ModernSidebar />
      
      {/* Mobile Backdrop with glassmorphism */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <UltraModernHeader toggleSidebar={toggleSidebar} isMobile={isMobile} />
        
        <main className="flex-1 overflow-auto bg-gradient-to-br from-transparent via-background/50 to-primary/5 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)]"></div>
          
          <div className="container mx-auto p-6 lg:p-8 max-w-full relative z-10">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      <FloatingActionButton />
      </div>
    </SidebarProvider>
  );
};

export default Layout;