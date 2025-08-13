import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import EnhancedModernSidebar from './EnhancedModernSidebar';
import EnhancedUltraModernHeader from './EnhancedUltraModernHeader';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import BottomNavigationIcons from './BottomNavigationIcons';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EnhancedModernLayoutProps {
  children: React.ReactNode;
}

const EnhancedModernLayout: React.FC<EnhancedModernLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-primary/3 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)
          `
        }} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Enhanced Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transition-all duration-500 ease-out",
          sidebarOpen ? "w-80" : "w-20",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}>
          <EnhancedModernSidebar 
            isCollapsed={!sidebarOpen}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-out",
          sidebarOpen ? "lg:ml-80" : "lg:ml-20"
        )}>
          {/* Enhanced Header */}
          <EnhancedUltraModernHeader 
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
            sidebarOpen={sidebarOpen}
          />

          {/* Content Container */}
          <main className="flex-1 relative">
            <div className="h-full overflow-auto">
              <div className="min-h-full">
                {children}
              </div>
            </div>

            {/* Sidebar Toggle Button */}
            {!isMobile && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "fixed top-1/2 -translate-y-1/2 z-40 h-12 w-8 rounded-r-xl rounded-l-none",
                  "glass-ultra border-l-0 shadow-premium transition-all duration-300",
                  "hover:w-10 hover:shadow-lg group",
                  sidebarOpen ? "left-80" : "left-20"
                )}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                )}
              </Button>
            )}

            {/* Floating Action Button */}
            <FloatingActionButton />

            {/* Bottom Navigation */}
            <BottomNavigationIcons />
          </main>
        </div>
      </div>

      {/* Enhanced Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 || 0}%` 
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedModernLayout;