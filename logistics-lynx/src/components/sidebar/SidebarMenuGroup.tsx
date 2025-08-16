/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuItem, MenuItemWithSubMenu } from '@/lib/types/menu';

interface SidebarMenuGroupProps {
  item: MenuItem | MenuItemWithSubMenu;
  isOpen: boolean;
  onTrackActivity?: (path: string, action: string) => void;
}

export const SidebarMenuGroup = ({ item, isOpen, onTrackActivity }: SidebarMenuGroupProps) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubMenu = 'subMenu' in item && item.subMenu && item.subMenu.length > 0;
  const IconComponent = item.icon;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (onTrackActivity) {
      onTrackActivity(item.title, 'menu_expand');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isGroupActive = () => {
    if ('path' in item && item.path && isActive(item.path)) return true;
    if (hasSubMenu) {
      return (item as MenuItemWithSubMenu).subMenu.some(subItem => isActive(subItem.path));
    }
    return false;
  };

  if (hasSubMenu) {
    return (
      <div className="mb-1">
        <button
          className={cn(
            "sidebar-link group w-full",
            isGroupActive() ? "font-medium bg-sidebar-accent/40 text-sidebar-accent-foreground" : "",
            isExpanded ? "bg-sidebar-accent/20" : ""
          )}
          onClick={toggleExpanded}
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
          <div className="space-y-1 pt-1 pl-2 border-l-2 border-border/30 ml-4 transition-all duration-300 ease-in-out animate-fade-in">
            {(item as MenuItemWithSubMenu).subMenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={cn(
                  "sidebar-link group text-sm",
                  isActive(subItem.path) 
                    ? "active bg-primary/10 text-primary border-l-2 border-primary shadow-sm font-medium" 
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                )}
                onClick={() => onTrackActivity?.(subItem.path, 'submenu_click')}
              >
                {subItem.icon && (
                  <subItem.icon className="h-3 w-3 shrink-0 transition-colors group-hover:text-primary" />
                )}
                <span className="truncate">
                  {subItem.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Single menu item without submenu
  return (
    <Link
      to={(item as MenuItem).path}
      className={cn(
        "sidebar-link group",
        isActive((item as MenuItem).path) 
          ? "active bg-primary/10 text-primary border-l-4 border-primary shadow-sm font-medium" 
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
      )}
      onClick={() => onTrackActivity?.((item as MenuItem).path, 'menu_click')}
    >
      {IconComponent && (
        <IconComponent className="h-4 w-4 shrink-0 transition-colors group-hover:text-primary" />
      )}
      {isOpen && (
        <span className="truncate font-medium text-sm">
          {item.title}
        </span>
      )}
    </Link>
  );
};
