/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import ModernSidebar from './ModernSidebar';
import UltraModernHeader from './UltraModernHeader';
import FloatingActionButton from '../shared/FloatingActionButton';

interface UltraModernLayoutProps {
  children: React.ReactNode;
}

const UltraModernLayout: React.FC<UltraModernLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, selectedRole } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Auto-close sidebar on mobile when route changes
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

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
            <p className="text-muted-foreground font-medium">Initializing your autonomous workspace...</p>
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

  return (
    <SidebarProvider>
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

export default UltraModernLayout;