/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronDown, 
  ChevronRight, 
  X,
  LayoutDashboard,
  Package,
  MapPin,
  Truck,
  MessageSquare,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  Phone,
  ShieldAlert,
  Clock,
  Navigation,
  Fuel,
  Battery,
  Signal,
  Star,
  Award,
  Target,
  Zap,
  Bell,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface DriverSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const EnhancedDriverSidebar: React.FC<DriverSidebarProps> = ({ 
  isOpen, 
  onClose, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Dashboard', 'Active Loads']);
  const [quickStats, setQuickStats] = useState({
    hoursRemaining: 8.5,
    nextDeliveryETA: '14:45',
    fuelLevel: 78,
    safetyScore: 98.5,
    currentSpeed: 65,
    batteryLevel: 92,
    signalStrength: 4
  });

  // Enhanced navigation structure with better organization
  const navigationSections = [
    {
      title: 'Main Hub',
      items: [
        {
          title: 'Command Center',
          icon: LayoutDashboard,
          path: '/driver/dashboard',
          description: 'Real-time overview',
          notifications: 0
        }
      ]
    },
    {
      title: 'Active Operations',
      items: [
        {
          title: 'Live Route',
          icon: Navigation,
          path: '/driver/routes/active',
          description: 'Current navigation',
          notifications: 1,
          subMenu: [
            { title: 'Active Route', icon: MapPin, path: '/driver/routes/active' },
            { title: 'Route Optimizer', icon: Target, path: '/driver/routes/optimizer' },
            { title: 'Route History', icon: Clock, path: '/driver/routes/history' }
          ]
        },
        {
          title: 'Current Loads',
          icon: Package,
          path: '/driver/loads/current',
          description: 'Shipment tracking',
          notifications: 2,
          subMenu: [
            { title: 'Active Shipments', icon: Package, path: '/driver/loads/current' },
            { title: 'Delivery Status', icon: Truck, path: '/driver/loads/delivery' },
            { title: 'Load Documents', icon: FileText, path: '/driver/loads/documents' }
          ]
        }
      ]
    },
    {
      title: 'Vehicle & Fleet',
      items: [
        {
          title: 'Vehicle Hub',
          icon: Truck,
          path: '/driver/vehicle/status',
          description: 'Health monitoring',
          notifications: 0,
          subMenu: [
            { title: 'System Status', icon: Truck, path: '/driver/vehicle/status' },
            { title: 'Maintenance', icon: Settings, path: '/driver/vehicle/maintenance' },
            { title: 'Fuel & Efficiency', icon: Fuel, path: '/driver/vehicle/fuel' }
          ]
        }
      ]
    },
    {
      title: 'Communication',
      items: [
        {
          title: 'Connect Hub',
          icon: MessageSquare,
          path: '/driver/communication/dispatch',
          description: 'Messages & calls',
          notifications: 3,
          subMenu: [
            { title: 'Dispatch Center', icon: MessageSquare, path: '/driver/communication/dispatch' },
            { title: 'Customer Contact', icon: Phone, path: '/driver/communication/customer' },
            { title: 'Emergency Line', icon: ShieldAlert, path: '/driver/communication/emergency' }
          ]
        }
      ]
    },
    {
      title: 'Professional Tools',
      items: [
        {
          title: 'Driver Services',
          icon: Settings,
          path: '/driver/services/truck-stops',
          description: 'Support tools',
          notifications: 0,
          subMenu: [
            { title: 'Truck Stops', icon: MapPin, path: '/driver/services/truck-stops' },
            { title: 'Repair Network', icon: Settings, path: '/driver/services/repair' },
            { title: 'Fuel Finder', icon: Fuel, path: '/driver/services/fuel-prices' },
            { title: 'Weather Intel', icon: BarChart3, path: '/driver/services/weather' }
          ]
        },
        {
          title: 'Performance',
          icon: Award,
          path: '/driver/performance/earnings',
          description: 'Analytics & scores',
          notifications: 0,
          subMenu: [
            { title: 'Earnings Dashboard', icon: DollarSign, path: '/driver/performance/earnings' },
            { title: 'Efficiency Metrics', icon: BarChart3, path: '/driver/performance/efficiency' },
            { title: 'Safety Rating', icon: Star, path: '/driver/performance/safety' }
          ]
        },
        {
          title: 'Settlement',
          icon: DollarSign,
          path: '/driver/settlement/earnings',
          description: 'Pay & benefits',
          notifications: 0,
          subMenu: [
            { title: 'Pay Overview', icon: DollarSign, path: '/driver/settlement/earnings' },
            { title: 'Time Tracking', icon: Clock, path: '/driver/settlement/timesheets' },
            { title: 'Payroll Reports', icon: FileText, path: '/driver/settlement/payroll' },
            { title: 'Benefits Portal', icon: Award, path: '/driver/settlement/benefits' }
          ]
        }
      ]
    }
  ];

  const toggleSubmenu = (menuTitle: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuTitle) 
        ? prev.filter(item => item !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const hasActiveChild = (subMenu: unknown[]) => {
    return subMenu?.some(item => isActiveRoute(item.path));
  };

  // Auto-collapse expanded menus when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenus([]);
    }
  }, [isCollapsed]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-20" : "w-80",
        "glass-ultra border-r border-border/30 shadow-premium overflow-hidden"
      )}>
        
        {/* Header Section */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-border/30",
          isCollapsed ? "px-2" : "px-6"
        )}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-0.5">
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">Driver Portal</h2>
                <p className="text-xs text-muted-foreground">Professional Command Center</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            {onToggleCollapse && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleCollapse}
                className="hidden lg:flex glass-subtle hover:glass"
              >
                {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden glass-subtle">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Driver Status Card */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border/30">
            <div className="glass-subtle p-4 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/avatars/driver.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Sarah Martinez</h3>
                  <p className="text-xs text-muted-foreground">CDL-A Professional</p>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-700 border-green-200 animate-pulse">
                  <Signal className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HOS:</span>
                    <span className="font-medium text-primary">{quickStats.hoursRemaining}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="font-medium text-blue-600">{quickStats.nextDeliveryETA}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fuel:</span>
                    <span className="font-medium text-green-600">{quickStats.fuelLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="font-medium text-yellow-600">{quickStats.safetyScore}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">HOS Progress</span>
                  <span className="font-medium">{Math.round((quickStats.hoursRemaining / 11) * 100)}%</span>
                </div>
                <Progress value={(quickStats.hoursRemaining / 11) * 100} className="h-1.5" />
              </div>
            </div>
          </div>
        )}

        {/* Quick System Status - Collapsed View */}
        {isCollapsed && (
          <div className="p-2">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className={`w-3 h-3 rounded-full ${quickStats.fuelLevel > 25 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                {quickStats.hoursRemaining}h
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                </div>
              )}
              
              {section.items.map((item, itemIndex) => {
                const hasSubmenu = item.subMenu && item.subMenu.length > 0;
                const isExpanded = expandedMenus.includes(item.title);
                const isActive = hasSubmenu ? hasActiveChild(item.subMenu!) : isActiveRoute(item.path!);
                const IconComponent = item.icon;

                return (
                  <div key={itemIndex} className="space-y-1">
                    {/* Main Menu Item */}
                    {hasSubmenu ? (
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between h-auto transition-all duration-200 hover:shadow-md",
                          isCollapsed ? "p-2" : "p-3",
                          "group relative overflow-hidden",
                          isActive && "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 text-red-700 dark:text-red-400 shadow-lg"
                        )}
                        onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                      >
                        <div className={cn(
                          "flex items-center",
                          isCollapsed ? "justify-center" : "space-x-3"
                        )}>
                          <div className="relative">
                            <IconComponent className={cn(
                              "w-5 h-5 transition-colors",
                              isActive ? "text-red-500" : "text-muted-foreground"
                            )} />
                            {item.notifications > 0 && (
                              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 animate-bounce">
                                {item.notifications}
                              </Badge>
                            )}
                          </div>
                          
                          {!isCollapsed && (
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          )}
                        </div>
                        
                        {!isCollapsed && hasSubmenu && (
                          <div className="flex items-center">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </Button>
                    ) : (
                      <NavLink to={item.path!} className="block">
                        {({ isActive: linkIsActive }) => (
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start h-auto transition-all duration-200 hover:shadow-md",
                              isCollapsed ? "p-2" : "p-3",
                              "group relative overflow-hidden",
                              linkIsActive && "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 text-red-700 dark:text-red-400 shadow-lg"
                            )}
                          >
                            <div className={cn(
                              "flex items-center",
                              isCollapsed ? "justify-center" : "space-x-3"
                            )}>
                              <div className="relative">
                                <IconComponent className={cn(
                                  "w-5 h-5 transition-colors",
                                  linkIsActive ? "text-red-500" : "text-muted-foreground"
                                )} />
                                {item.notifications > 0 && (
                                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 animate-bounce">
                                    {item.notifications}
                                  </Badge>
                                )}
                              </div>
                              
                              {!isCollapsed && (
                                <div className="flex-1 text-left">
                                  <div className="font-medium text-sm">{item.title}</div>
                                  <div className="text-xs text-muted-foreground">{item.description}</div>
                                </div>
                              )}
                            </div>
                          </Button>
                        )}
                      </NavLink>
                    )}

                    {/* Submenu Items */}
                    {hasSubmenu && isExpanded && !isCollapsed && (
                      <div className="ml-6 space-y-1 border-l-2 border-red-200 dark:border-red-800 pl-4 animate-scale-in">
                        {item.subMenu!.map((subItem, subIndex) => {
                          const SubIconComponent = subItem.icon;
                          return (
                            <NavLink
                              key={subIndex}
                              to={subItem.path}
                              className="block"
                            >
                              {({ isActive: subIsActive }) => (
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start h-auto p-2.5 transition-all duration-200",
                                    "text-sm font-normal hover:bg-muted/60 hover:scale-[1.02] hover:shadow-sm",
                                    subIsActive && "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-medium shadow-sm"
                                  )}
                                >
                                  <SubIconComponent className={cn(
                                    "w-4 h-4 mr-3 transition-colors",
                                    subIsActive ? "text-red-500" : "text-muted-foreground"
                                  )} />
                                  <span>{subItem.title}</span>
                                </Button>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border/30">
            <div className="glass-subtle p-3 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-medium">Emergency Hotline</div>
                  <div className="font-bold text-red-600 text-sm">1-800-DRIVER</div>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-700 text-xs animate-pulse">
                  24/7
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Professional support available anytime
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Emergency Button */}
        {isCollapsed && (
          <div className="p-2 border-t border-border/30">
            <Button variant="destructive" size="sm" className="w-full p-2">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default EnhancedDriverSidebar;