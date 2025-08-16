/* eslint-disable @typescript-eslint/no-explicit-any */

import { BookOpen, HelpCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarFooterProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SidebarFooter = ({ isOpen, isDarkMode, onToggleDarkMode }: SidebarFooterProps) => {
  return (
    <div className="p-3 bg-gradient-to-t from-card/50 to-transparent">
      <div className="grid grid-cols-3 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-full flex flex-col gap-1 hover:bg-accent/60 transition-all duration-200 rounded-xl"
              >
                <BookOpen className="h-4 w-4" />
                {isOpen && <span className="text-xs font-medium">Learn</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
              <p>Learn</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-full flex flex-col gap-1 hover:bg-accent/60 transition-all duration-200 rounded-xl"
              >
                <HelpCircle className="h-4 w-4" />
                {isOpen && <span className="text-xs font-medium">Help</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-full flex flex-col gap-1 hover:bg-accent/60 transition-all duration-200 rounded-xl"
                onClick={onToggleDarkMode}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-4 w-4" />
                    {isOpen && <span className="text-xs font-medium">Light</span>}
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    {isOpen && <span className="text-xs font-medium">Dark</span>}
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
              <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
