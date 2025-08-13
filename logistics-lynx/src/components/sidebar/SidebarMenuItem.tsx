
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Brain, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  Star 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MenuItem {
  title: string;
  path: string;
  icon: string | LucideIcon;
  subMenu?: MenuItem[];
  aiInsights?: {
    isRecommended?: boolean;
    recommendation?: string;
    frequency?: number;
    isContextual?: boolean;
  };
}

const getIconComponent = (iconName: string | LucideIcon): LucideIcon => {
  // If it's already a component, return it
  if (typeof iconName === 'function') {
    return iconName;
  }
  
  // If it's a string, map it to the appropriate component
  const iconMap: Record<string, LucideIcon> = {
    "AlertTriangle": AlertTriangle,
    "AlertCircle": AlertCircle,
    "Clock": Clock,
    "TrendingUp": TrendingUp,
    "Star": Star,
    "Zap": Zap
  };
  
  return iconMap[iconName] || Star; // Default to Star if not found
};

interface SidebarMenuItemProps {
  item: MenuItem;
  depth?: number;
  isOpen: boolean;
  toggleSidebar: () => void;
  onTrackActivity: (path: string, action: string) => void;
}

export const SidebarMenuItem = ({ 
  item, 
  depth = 0, 
  isOpen, 
  toggleSidebar, 
  onTrackActivity 
}: SidebarMenuItemProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isExpanded = expandedItems[item.title] || false;
  const IconComponent = getIconComponent(item.icon);
  const aiInsights = item.aiInsights || {};

  return (
    <div className={cn("animate-fade-in", depth > 0 ? "ml-2" : "")}>
      {hasSubMenu ? (
        <div className="mb-1">
          <button
            className={cn(
              "sidebar-link group w-full relative",
              isExpanded ? "font-medium bg-sidebar-accent/40 text-sidebar-accent-foreground" : ""
            )}
            onClick={() => toggleExpand(item.title)}
          >
            <span className="flex items-center flex-1 min-w-0">
              {IconComponent && (
                <IconComponent className="h-4 w-4 shrink-0 transition-colors group-hover:text-primary" />
              )}
              {isOpen && (
                <span className="truncate font-medium text-sm">
                  {item.title}
                </span>
              )}
            </span>
            
            {/* AI Insights Indicators */}
            {isOpen && aiInsights.isRecommended && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-blue-100 text-blue-700">
                <Brain className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
            
            {isOpen && aiInsights.frequency && aiInsights.frequency > 5 && (
              <Badge variant="outline" className="ml-1 h-5 px-1.5 text-xs">
                <TrendingUp className="h-3 w-3" />
              </Badge>
            )}
            
            {isOpen && (
              <span className="ml-auto transition-all duration-300 group-hover:scale-110">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
            )}
          </button>
          
          {isExpanded && isOpen && (
            <div className="space-y-1 pt-1 pl-2 border-l-2 border-border/30 ml-4 transition-all duration-300 ease-in-out">
              {item.subMenu?.map((subItem: MenuItem) => (
                <SidebarMenuItem
                  key={subItem.title}
                  item={subItem}
                  depth={depth + 1}
                  isOpen={isOpen}
                  toggleSidebar={toggleSidebar}
                  onTrackActivity={onTrackActivity}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          to={item.path}
          className={cn(
            "sidebar-link group relative",
            isActive(item.path) 
              ? "active bg-primary/10 text-primary border-l-4 border-primary shadow-sm" 
              : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
          )}
          onClick={() => {
            if (isMobile) {
              toggleSidebar();
            }
            onTrackActivity(item.path, 'click');
          }}
        >
          {IconComponent && (
            <IconComponent className="h-4 w-4 shrink-0 transition-colors group-hover:text-primary" />
          )}
          {isOpen && (
            <>
              <span className="truncate font-medium text-sm flex-1">
                {item.title}
              </span>
              
              <TooltipProvider>
                <div className="flex items-center gap-1 ml-2">
                  {aiInsights.isRecommended && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-blue-100 text-blue-700">
                          <Brain className="h-3 w-3" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{aiInsights.recommendation}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {aiInsights.frequency && aiInsights.frequency > 5 && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="h-5 px-1.5 text-xs">
                          <TrendingUp className="h-3 w-3" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Used {aiInsights.frequency} times recently</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {aiInsights.isContextual && (
                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                      <Zap className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </TooltipProvider>
            </>
          )}
        </Link>
      )}
    </div>
  );
};
