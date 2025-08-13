import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModernDriverSidebar } from './ModernDriverSidebar';
import ModernDriverHeader from './ModernDriverHeader';
import DriverFloatingActionButton from './DriverFloatingActionButton';
import { CodingAssistant } from '@/components/coding-assistant/CodingAssistant';
import { useCodingAssistant } from '@/hooks/useCodingAssistant';
import { cn } from '@/lib/utils';

interface ModernDriverLayoutProps {
  children?: React.ReactNode;
}

const ModernDriverLayout: React.FC<ModernDriverLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const codingAssistant = useCodingAssistant();
  
  console.log('ModernDriverLayout rendering with children:', !!children);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        {/* Enhanced Header */}
        <ModernDriverHeader onToggleSidebar={handleToggleSidebar} />

        <div className="flex min-h-[calc(100vh-theme(spacing.16))] w-full">
          {/* Modern Sidebar */}
          <ModernDriverSidebar />

          {/* Main Content */}
          <main className="flex-1 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 opacity-40" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
            
            {/* Content Container with full width */}
            <div className="relative h-full w-full">
              <div className="w-full px-4 lg:px-8 xl:px-12 py-3 space-y-4">
                {/* Enhanced Driver Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-2">🚛 Active Load Status</h3>
                    <div className="text-2xl font-bold text-primary">En Route</div>
                    <p className="text-sm text-muted-foreground">Dallas, TX → Phoenix, AZ</p>
                    <div className="mt-2 bg-primary/10 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">65% Complete - ETA: 4:30 PM</p>
                  </div>

                  <div className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-2">⏰ HOS Remaining</h3>
                    <div className="text-2xl font-bold text-orange-500">6h 42m</div>
                    <p className="text-sm text-muted-foreground">Drive time available</p>
                    <div className="mt-2 bg-orange-500/10 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-[67%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Daily limit: 11 hours</p>
                  </div>

                  <div className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-2">💰 Today's Earnings</h3>
                    <div className="text-2xl font-bold text-green-500">$487.50</div>
                    <p className="text-sm text-muted-foreground">+12% from yesterday</p>
                    <div className="mt-2 bg-green-500/10 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[82%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Target: $600/day</p>
                  </div>
                </div>

                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Enhanced Floating Action Button */}
        <DriverFloatingActionButton 
          onOpenCodingAssistant={codingAssistant.toggleAssistant}
        />
        
        {/* Coding Assistant */}
        {codingAssistant.isOpen && (
          <CodingAssistant
            userRole="driver"
            currentContext="Driver Portal - Transportation Management System"
            onMinimize={codingAssistant.minimizeAssistant}
            onClose={codingAssistant.closeAssistant}
            isMinimized={codingAssistant.isMinimized}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default ModernDriverLayout;