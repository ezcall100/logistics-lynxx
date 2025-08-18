import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedSidebar from './EnhancedSidebar';
import { getSidebarConfig } from './EnhancedSidebarConfig';

interface EnhancedSidebarLayoutProps {
  className?: string;
}

const EnhancedSidebarLayout: React.FC<EnhancedSidebarLayoutProps> = ({
  className
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get sidebar configuration based on user role
  const sidebarConfig = getSidebarConfig(user?.role || 'user');

  // Get page title from current route
  const getPageTitle = (pathname: string): string => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'Dashboard';
    
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };

  // Handle sidebar collapse
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <EnhancedSidebar
          sections={sidebarConfig}
          defaultCollapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
          className="sticky top-0 h-screen"
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-80 bg-background border-r border-border">
          <EnhancedSidebar
            sections={sidebarConfig}
            defaultCollapsed={false}
            onToggleCollapse={handleSidebarToggle}
            className="h-full"
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        {/* Mobile Header */}
        {isMobile && (
          <header className="md:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
                className="h-9 w-9 p-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {getPageTitle(location.pathname)}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user?.role?.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
          </header>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <header className="hidden md:flex bg-card border-b border-border px-6 py-4 items-center justify-between sticky top-0 z-40">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {getPageTitle(location.pathname)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Add any header actions here */}
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 bg-background">
          <div className="container-responsive py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedSidebarLayout;
