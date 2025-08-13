
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAutonomousSidebar } from '@/hooks/useAutonomousSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SidebarHeader } from '@/components/sidebar/SidebarHeader';
import { AIRecommendationsSection } from '@/components/sidebar/AIRecommendationsSection';
import { SidebarMenuItem } from '@/components/sidebar/SidebarMenuItem';
import { SidebarFooter } from '@/components/sidebar/SidebarFooter';
import { LayoutDashboard } from 'lucide-react';

interface AutonomousSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AutonomousSidebar = ({ isOpen, toggleSidebar }: AutonomousSidebarProps) => {
  const isMobile = useIsMobile();
  const { sidebarState, trackUserActivity, isLearning, refreshRecommendations } = useAutonomousSidebar();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-card/80 backdrop-blur-xl border-r border-border/60 transition-all duration-300 ease-in-out z-50 shadow-2xl",
        isOpen ? "w-80" : "w-16",
        isMobile && isOpen && "fixed inset-y-0 left-0 w-80",
        isMobile && !isOpen && "hidden"
      )}
    >
      {/* Header */}
      <SidebarHeader 
        isOpen={isOpen}
        isLearning={isLearning}
        toggleSidebar={toggleSidebar}
      />

      {/* AI Recommendations Section */}
      {isOpen && (
        <AIRecommendationsSection
          recommendations={sidebarState.recommendations}
          showRecommendations={showRecommendations}
          onHideRecommendations={() => setShowRecommendations(false)}
          onRefreshRecommendations={refreshRecommendations}
          onTrackActivity={trackUserActivity}
        />
      )}
      
      {/* Navigation Menu */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {/* Quick Actions */}
          {sidebarState.adaptiveMenu?.quickActions && sidebarState.adaptiveMenu.quickActions.length > 0 && (
            <>
              <div className="px-2 py-1">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </h4>
              </div>
              {sidebarState.adaptiveMenu.quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="sidebar-link group bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300"
                  onClick={() => trackUserActivity(action.path, 'quick_action')}
                >
                  <span className="truncate font-medium text-sm">
                    {action.title}
                  </span>
                </Link>
              ))}
              <Separator className="my-2" />
            </>
          )}
          
          {/* Main Menu */}
          {sidebarState.adaptiveMenu && sidebarState.adaptiveMenu.items.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={{
                title: item.label,
                path: item.path || '#',
                icon: LayoutDashboard, // Default icon since AdaptiveMenuItem doesn't have icon
                aiInsights: item.aiInsights
              }}
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              onTrackActivity={trackUserActivity}
            />
          ))}
        </div>
      </ScrollArea>
      
      <Separator className="mx-3" />
      
      {/* Footer Actions */}
      <SidebarFooter 
        isOpen={isOpen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default AutonomousSidebar;
