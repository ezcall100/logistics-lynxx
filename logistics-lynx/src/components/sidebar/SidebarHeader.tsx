/* eslint-disable @typescript-eslint/no-explicit-any */

import { Brain, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarHeaderProps {
  isOpen: boolean;
  isLearning: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader = ({ isOpen, isLearning, toggleSidebar }: SidebarHeaderProps) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-16 items-center justify-between border-b border-border/60 px-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-lg ring-2 ring-primary/20">
          <Sparkles className="h-5 w-5" />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight">
              LogiPortal
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </span>
              {isLearning && (
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3 text-blue-500 animate-pulse" />
                  <span className="text-xs text-blue-500">Learning</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 rounded-lg"
      >
        {isMobile ? (
          <X className="h-4 w-4" />
        ) : isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
