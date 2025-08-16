/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { OWNER_OPERATOR_MENU } from '@/lib/menus/owner-operator-menu';
import { ChevronDown, ChevronRight, Truck, DollarSign, MapPin, Package, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface OwnerOperatorSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const OwnerOperatorSidebar: React.FC<OwnerOperatorSidebarProps> = ({ 
  collapsed, 
  onToggle 
}) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Dashboard']);

  // Real-time sidebar stats
  const quickStats = {
    activeLoads: 3,
    todayRevenue: 1847,
    milesLeft: 287,
    nextDelivery: '2:45 PM',
    fuelLevel: 68,
    alertsCount: 2
  };

  const toggleMenu = (title: string) => {
    if (collapsed) return;
    
    setExpandedMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isMenuExpanded = (title: string) => expandedMenus.includes(title);

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Quick Stats Section */}
      {!collapsed && (
        <div className="p-4 border-b bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-violet-700 dark:text-violet-300">Live Status</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-black/20 rounded-lg">
                <Package className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Active Loads</div>
                  <div className="text-sm font-bold">{quickStats.activeLoads}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-black/20 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Today</div>
                  <div className="text-sm font-bold">${quickStats.todayRevenue}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-black/20 rounded-lg">
                <MapPin className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Miles Left</div>
                  <div className="text-sm font-bold">{quickStats.milesLeft}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-black/20 rounded-lg">
                <Truck className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Fuel</div>
                  <div className="text-sm font-bold">{quickStats.fuelLevel}%</div>
                </div>
              </div>
            </div>

            {quickStats.alertsCount > 0 && (
              <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-300">
                  {quickStats.alertsCount} urgent alerts
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {OWNER_OPERATOR_MENU.items.map((item) => {
            const hasSubMenu = item.subMenu && item.subMenu.length > 0;
            const isExpanded = isMenuExpanded(item.title);
            const ItemIcon = item.icon;

            return (
              <div key={item.title}>
                {hasSubMenu ? (
                  <Button
                    variant="ghost"
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full justify-start h-10 px-3",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <ItemIcon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="truncate">{item.title}</span>
                          <div className="ml-auto">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Button>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 h-10 px-3 rounded-md text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground font-medium",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <ItemIcon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </NavLink>
                )}

                {/* Sub Menu Items */}
                {hasSubMenu && isExpanded && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1 animate-accordion-down">
                    {item.subMenu!.map((subItem) => {
                      const SubItemIcon = subItem.icon;
                      return (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => cn(
                            "flex items-center gap-3 h-9 px-3 rounded-md text-sm transition-colors",
                            "hover:bg-accent/50 hover:text-accent-foreground",
                            isActive && "bg-accent/70 text-accent-foreground font-medium border-l-2 border-primary"
                          )}
                        >
                          <SubItemIcon className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{subItem.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronRight className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};

export default OwnerOperatorSidebar;