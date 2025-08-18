import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedSidebar from './EnhancedSidebar';
import { getSidebarConfig } from './EnhancedSidebarConfig';
import type { EnhancedSidebarItem } from './EnhancedSidebar';

interface EnhancedSidebarLayoutProps {
  className?: string;
  showMobileMenu?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
  onItemClick?: (item: EnhancedSidebarItem) => void;
}

export const EnhancedSidebarLayout: React.FC<EnhancedSidebarLayoutProps> = ({
  className,
  showMobileMenu = true,
  onSidebarToggle,
  onItemClick
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get sidebar configuration based on user role
  const sidebarConfig = getSidebarConfig(user?.role);

  // Handle sidebar collapse
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    onSidebarToggle?.(collapsed);
  };

  // Handle item click
  const handleItemClick = (item: EnhancedSidebarItem) => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    onItemClick?.(item);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className={cn("flex h-screen bg-background", className)}>
        {/* Enhanced Sidebar */}
        <EnhancedSidebar
          sections={sidebarConfig}
          defaultCollapsed={sidebarCollapsed}
          showSearch={true}
          showFavorites={true}
          showRecent={true}
          showThemeToggle={true}
          showUserProfile={true}
          onItemClick={handleItemClick}
          onToggleCollapse={handleSidebarToggle}
        />

        {/* Main Content Area */}
        <main
          className={cn(
            "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-16" : "ml-60"
          )}
        >
          {/* Top Bar */}
          <header className="h-16 border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Add any top bar actions here */}
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <EnhancedSidebar
                sections={sidebarConfig}
                defaultCollapsed={false}
                showSearch={true}
                showFavorites={true}
                showRecent={true}
                showThemeToggle={true}
                showUserProfile={true}
                onItemClick={handleItemClick}
                onToggleCollapse={handleSidebarToggle}
              />
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-semibold text-foreground">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Add any mobile header actions here */}
        </div>
      </header>

      {/* Mobile Content */}
      <main className="flex-1 flex flex-col overflow-hidden pt-16">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function to get page title from pathname
const getPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return 'Dashboard';
  
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  // Convert kebab-case or snake_case to Title Case
  const title = lastSegment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return title;
};

export default EnhancedSidebarLayout;
