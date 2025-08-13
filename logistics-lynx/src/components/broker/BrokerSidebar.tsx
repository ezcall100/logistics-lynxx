import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { BROKER_ADMIN_MENU, BROKER_BOTTOM_ITEMS, MenuItem } from '@/lib/menus/broker-admin-menu';
import { useTheme } from 'next-themes';

interface BrokerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const BrokerSidebar: React.FC<BrokerSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.path && isActive(item.path)) return true;
    if (item.subMenu) {
      return item.subMenu.some(subItem => isActive(subItem.path || ''));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const itemIsActive = isParentActive(item);

    if (hasSubMenu) {
      return (
        <Collapsible
          key={item.title}
          open={isExpanded}
          onOpenChange={() => toggleExpanded(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal h-10 px-3",
                collapsed ? "px-2" : "px-3",
                itemIsActive && "bg-accent text-accent-foreground",
                level > 0 && `ml-${level * 4}`
              )}
            >
              {item.icon && (
                <item.icon className={cn(
                  "h-4 w-4 shrink-0",
                  collapsed ? "mr-0" : "mr-2"
                )} />
              )}
              {!collapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.subMenu?.map(subItem => {
              // Check if this subItem has its own subMenu (nested)
              if (subItem.subMenu && subItem.subMenu.length > 0) {
                return renderMenuItem(subItem, level + 1);
              }
              
              // Regular menu item
              return (
                <NavLink
                  key={subItem.path || subItem.title}
                  to={subItem.path || '#'}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      collapsed ? "px-2" : "px-3",
                      level === 0 ? "ml-6" : `ml-${(level + 2) * 3}`,
                      isActive && "bg-accent text-accent-foreground font-medium"
                    )
                  }
                >
                  {subItem.icon && (
                    <subItem.icon className="h-4 w-4 shrink-0" />
                  )}
                  {!collapsed && <span className="truncate">{subItem.title}</span>}
                </NavLink>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.path || item.title}
        to={item.path || '#'}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed ? "px-2" : "px-3",
            isActive && "bg-accent text-accent-foreground font-medium",
            level > 0 && `ml-${level * 4}`
          )
        }
      >
        {item.icon && (
          <item.icon className={cn(
            "h-4 w-4 shrink-0",
            collapsed ? "mr-0" : "mr-2"
          )} />
        )}
        {!collapsed && <span className="truncate">{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <div className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-72"
    )}>
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-4">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Broker Admin</h2>
          )}
        </div>

        <Separator />

        {/* Main Menu */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {BROKER_ADMIN_MENU.items.map(item => renderMenuItem(item))}
          </div>
        </ScrollArea>

        <Separator />

        {/* Bottom Items */}
        <div className="p-3 space-y-1">
          {BROKER_BOTTOM_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-accent text-accent-foreground font-medium"
                )
              }
            >
              <item.icon className={cn(
                "h-4 w-4 shrink-0",
                collapsed ? "mr-0" : "mr-2"
              )} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          ))}
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              collapsed ? "px-2" : "px-3"
            )}
          >
            {theme === 'dark' ? (
              <div className="flex items-center">
                <div className="h-4 w-4 shrink-0 mr-2">🌞</div>
                {!collapsed && <span>Light Mode</span>}
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-4 w-4 shrink-0 mr-2">🌙</div>
                {!collapsed && <span>Dark Mode</span>}
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrokerSidebar;