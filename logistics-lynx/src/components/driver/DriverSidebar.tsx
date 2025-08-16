/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DRIVER_MENU } from '@/lib/menus/driver-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Phone, Shield, Star, Clock, MapPin, Truck, AlertTriangle, CheckCircle, DollarSign, Battery, Fuel, Zap, Gauge, Target, Navigation2, Settings } from 'lucide-react';
interface DriverSidebarProps {
  isOpen: boolean;
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
}
const DriverSidebar: React.FC<DriverSidebarProps> = ({
  isOpen,
  isMobileMenuOpen,
  onClose
}) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['My Routes', 'Loads & Delivery']);
  const toggleSubmenu = (menuTitle: string) => {
    setExpandedMenus(prev => prev.includes(menuTitle) ? prev.filter(item => item !== menuTitle) : [...prev, menuTitle]);
  };
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  const hasActiveChild = (subMenu: unknown[]) => {
    return subMenu?.some(item => isActiveRoute(item.path));
  };
  const showLabels = isOpen || isMobileMenuOpen;
  return <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      <div className={cn("h-full transform transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-r border-border/50 flex-shrink-0 shadow-lg",
    // Desktop behavior
    "hidden lg:block", isOpen ? "lg:w-80" : "lg:w-16",
    // Mobile behavior
    isMobileMenuOpen && "fixed inset-y-0 left-0 z-50 w-80 block lg:hidden")}>
      
      {/* Enhanced Header - Show when expanded */}
      {isOpen || isMobileMenuOpen}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {DRIVER_MENU.items.map((item, index) => {
          const hasSubmenu = item.subMenu && item.subMenu.length > 0;
          const isExpanded = expandedMenus.includes(item.title);
          const isActive = hasSubmenu ? hasActiveChild(item.subMenu!) : isActiveRoute(item.path!);
          const IconComponent = item.icon;
          return <div key={index} className="space-y-1">
              {/* Main Menu Item */}
              {hasSubmenu ? <Button variant="ghost" className={cn("w-full justify-between h-auto p-3 transition-all duration-200", "sidebar-link text-left font-medium", isActive && "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/30 dark:to-orange-950/30 text-red-700 dark:text-red-400 border-l-4 border-red-500", !showLabels && "justify-center px-2")} onClick={() => showLabels && toggleSubmenu(item.title)}>
                  <div className="flex items-center space-x-3">
                    <IconComponent className={cn("w-5 h-5 transition-colors", isActive ? "text-red-500" : "text-muted-foreground")} />
                    {showLabels && <span className="flex-1">{item.title}</span>}
                  </div>
                  {showLabels && <div className="flex items-center space-x-2">
                      {item.title === 'Communication' && <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                          3
                        </Badge>}
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>}
                </Button> : <NavLink to={item.path!} className="block">
                  {({
                isActive: linkIsActive
              }) => <Button variant="ghost" className={cn("w-full justify-start h-auto p-3 transition-all duration-200", "sidebar-link text-left font-medium", linkIsActive && "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/30 dark:to-orange-950/30 text-red-700 dark:text-red-400 border-l-4 border-red-500", !showLabels && "justify-center px-2")}>
                      <IconComponent className={cn("w-5 h-5 transition-colors", linkIsActive ? "text-red-500" : "text-muted-foreground", showLabels && "mr-3")} />
                      {showLabels && <span>{item.title}</span>}
                    </Button>}
                </NavLink>}

              {/* Submenu Items - Only show when expanded and menu is open */}
              {hasSubmenu && isExpanded && showLabels && <div className="ml-4 space-y-1 border-l-2 border-border/30 pl-4 animate-fade-in">
                  {item.subMenu!.map((subItem, subIndex) => {
                const SubIconComponent = subItem.icon;
                return <NavLink key={subIndex} to={subItem.path} className="block">
                        {({
                    isActive: subIsActive
                  }) => <Button variant="ghost" className={cn("w-full justify-start h-auto p-2.5 transition-all duration-200", "text-sm font-normal hover:bg-muted/60 hover:scale-[1.02]", subIsActive && "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-medium")}>
                            <SubIconComponent className={cn("w-4 h-4 mr-3 transition-colors", subIsActive ? "text-red-500" : "text-muted-foreground")} />
                            <span>{subItem.title}</span>
                            {subItem.title === 'Dispatch Chat' && <Badge className="ml-auto h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
                                2
                              </Badge>}
                            {subItem.title === 'Emergency' && <Badge className="ml-auto h-4 px-2 text-xs bg-red-100 text-red-700">
                                24/7
                              </Badge>}
                          </Button>}
                      </NavLink>;
              })}
                </div>}
            </div>;
        })}
      </nav>

      {/* Enhanced Footer - Emergency & Quick Actions */}
      {(isOpen || isMobileMenuOpen) && <div className="p-4 border-t border-border/50 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="space-y-3">
            {/* Emergency Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700 dark:text-red-400">Emergency</span>
              </div>
              <Button size="sm" variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Call Dispatch
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Navigation2 className="w-3 h-3 mr-1" />
                Navigate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              24/7 Emergency: (555) 911-HELP
            </p>
          </div>
        </div>}
    </div>
    </>;
};
export default DriverSidebar;