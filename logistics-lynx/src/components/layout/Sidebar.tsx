
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  HelpCircle, 
  Moon, 
  Sun,
  Sparkles,
  X,
  Brain,
  Home,
  Settings,
  BarChart3,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Users,
  FileText,
  ShieldCheck,
  Zap,
  Activity,
  Navigation,
  Fuel,
  Wrench,
  DollarSign,
  Target,
  Building2,
  Phone,
  AlertCircle,
  Clock,
  CheckCircle,
  TrendingUp,
  PieChart,
  Monitor,
  Database,
  UserCheck,
  Network,
  Cpu,
  Shield,
  Globe,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { selectedRole, user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  // Enhanced menu configuration for all roles
  const getMenuForRole = () => {
    const menus = {
      super_admin: {
        theme: 'from-purple-600/10 to-violet-600/10',
        borderColor: 'border-purple-200/30',
        accentColor: 'text-purple-600',
        items: [
          { id: 'dashboard', label: 'Command Center', icon: Monitor, path: '/dashboard' },
          { id: 'rates', label: 'Rates Portal', icon: DollarSign, path: '/rates' },
          { id: 'directory', label: 'Directory Portal', icon: Building2, path: '/directory' },
          { id: 'edi', label: 'EDI Intelligence', icon: Database, path: '/edi', 
            subItems: [
              { id: 'edi-dashboard', label: 'EDI Dashboard', icon: Activity, path: '/edi/dashboard' },
              { id: 'edi-setup', label: 'Setup & Config', icon: Settings, path: '/edi/setup' },
              { id: 'edi-matching', label: 'Message Matching', icon: Layers, path: '/edi/matching' },
              { id: 'failed-tenders', label: 'Failed Tenders', icon: AlertCircle, path: '/edi/failed-tender' },
              { id: 'failed-invoices', label: 'Failed Invoices', icon: FileText, path: '/edi/failed-invoices' },
              { id: 'partners', label: 'Trading Partners', icon: Network, path: '/edi/partners' }
            ]
          },
          { id: 'users', label: 'Global Users', icon: UserCheck, path: '/settings' },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart3, path: '/analytics' },
          { id: 'autonomous', label: 'AI Orchestration', icon: Brain, path: '/autonomous-system' },
          { id: 'alerts', label: 'System Alerts', icon: Shield, path: '/alerts' },
          { id: 'api', label: 'API Management', icon: Cpu, 
            subItems: [
              { id: 'api-dashboard', label: 'API Overview', icon: Monitor, path: '/api/dashboard' },
              { id: 'api-keys', label: 'API Keys', icon: ShieldCheck, path: '/api/keys' },
              { id: 'api-logs', label: 'Request Logs', icon: FileText, path: '/api/logs' },
              { id: 'api-errors', label: 'Error Analysis', icon: AlertCircle, path: '/api/errors' }
            ]
          }
        ]
      },
      carrier_admin: {
        theme: 'from-blue-600/10 to-cyan-600/10',
        borderColor: 'border-blue-200/30',
        accentColor: 'text-blue-600',
        items: [
          { id: 'dashboard', label: 'Fleet Control', icon: Truck, path: '/dashboard' },
          { id: 'rates', label: 'Rates Portal', icon: DollarSign, path: '/rates' },
          { id: 'directory', label: 'Directory Portal', icon: Building2, path: '/directory' },
          { id: 'assets', label: 'Fleet Management', icon: Package, 
            subItems: [
              { id: 'trucks', label: 'Trucks', icon: Truck, path: '/assets?tab=trucks' },
              { id: 'trailers', label: 'Trailers', icon: Package, path: '/assets?tab=trailers' },
              { id: 'units', label: 'Units', icon: Layers, path: '/assets?tab=units' },
              { id: 'fuel-audit', label: 'Fuel Audit', icon: Fuel, path: '/assets?tab=fuel-audit' },
              { id: 'compliance', label: 'Compliance', icon: ShieldCheck, path: '/assets?tab=compliance' },
              { id: 'fleet-tracker', label: 'Fleet Tracker', icon: Navigation, path: '/assets?tab=fleet-tracker' }
            ]
          },
          { id: 'shipments', label: 'Load Management', icon: Package, path: '/shipments' },
          { id: 'workers', label: 'Driver Network', icon: Users, path: '/workers' },
          { id: 'financials', label: 'Financial Hub', icon: CreditCard, path: '/financials' },
          { id: 'analytics', label: 'Performance Intel', icon: BarChart3, path: '/analytics' }
        ]
      },
      freight_broker_admin: {
        theme: 'from-emerald-600/10 to-green-600/10',
        borderColor: 'border-emerald-200/30',
        accentColor: 'text-emerald-600',
        items: [
          { id: 'dashboard', label: 'Broker Hub', icon: Building2, path: '/dashboard' },
          { id: 'rates', label: 'Rates Portal', icon: DollarSign, path: '/rates' },
          { id: 'directory', label: 'Directory Portal', icon: Building2, path: '/directory' },
          { id: 'loadboard', label: 'Load Marketplace', icon: Package, path: '/loadboard' },
          { id: 'quotes', label: 'Rate Intelligence', icon: DollarSign, path: '/quotes' },
          { id: 'shipments', label: 'Shipment Flow', icon: MapPin, path: '/shipments' },
          { id: 'networks', label: 'Network Partners', icon: Network, 
            subItems: [
              { id: 'customers', label: 'Customers', icon: Users, path: '/networks?tab=customers' },
              { id: 'vendors', label: 'Vendors', icon: Building2, path: '/networks?tab=vendors' },
              { id: 'locations', label: 'Locations', icon: MapPin, path: '/networks?tab=locations' },
              { id: 'terminals', label: 'Terminals', icon: Layers, path: '/networks?tab=terminals' }
            ]
          },
          { id: 'crm', label: 'Customer Relations', icon: Users, path: '/crm' },
          { id: 'analytics', label: 'Market Analytics', icon: BarChart3, path: '/analytics' }
        ]
      },
      // shipper_admin: Removed to prevent conflicts with ShipperSidebar component
      // shipper_admin uses dedicated ShipperSidebar component with SHIPPER_ADMIN_MENU
      carrier_driver: {
        theme: 'from-cyan-600/10 to-blue-600/10',
        borderColor: 'border-cyan-200/30',
        accentColor: 'text-cyan-600',
        items: [
          { id: 'dashboard', label: 'Driver Hub', icon: Navigation, path: '/dashboard' },
          { id: 'routes', label: 'My Routes', icon: MapPin, path: '/routes' },
          { id: 'logs', label: 'HOS Logs', icon: Clock, path: '/logs' },
          { id: 'inspection', label: 'Vehicle Check', icon: CheckCircle, path: '/inspection' },
          { id: 'fuel', label: 'Fuel Reports', icon: Fuel, path: '/fuel' },
          { id: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/maintenance' },
          { id: 'support', label: 'Dispatch Support', icon: Phone, path: '/support' }
        ]
      },
      owner_operator: {
        theme: 'from-amber-600/10 to-orange-600/10',
        borderColor: 'border-amber-200/30',
        accentColor: 'text-amber-600',
        items: [
          { id: 'dashboard', label: 'Business Hub', icon: Target, path: '/dashboard' },
          { id: 'loads', label: 'Load Opportunities', icon: Package, path: '/loads' },
          { id: 'financials', label: 'Business Finance', icon: DollarSign, path: '/financials' },
          { id: 'maintenance', label: 'Fleet Maintenance', icon: Wrench, path: '/maintenance' },
          { id: 'fuel', label: 'Fuel Management', icon: Fuel, path: '/fuel' },
          { id: 'analytics', label: 'Business Intel', icon: PieChart, path: '/analytics' },
          { id: 'tax', label: 'Tax Management', icon: FileText, path: '/tax' }
        ]
      }
    };
    
    return menus[selectedRole] || menus.super_admin;
  };

  const currentMenu = getMenuForRole();
  
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Save sidebar state to localStorage
    localStorage.setItem('sidebarOpen', isOpen.toString());
  }, [isOpen]);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState && !isMobile) {
      // Only apply saved state on desktop
      const shouldBeOpen = savedState === 'true';
      if (shouldBeOpen !== isOpen) {
        toggleSidebar();
      }
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const isActive = (path: string) => location.pathname === path;
  
  const toggleSubmenu = (itemId: string) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };

  const trackUserActivity = (path: string, action: string) => {
    console.log(`User activity: ${action} on ${path}`);
  };

  const renderMenuItem = (item: unknown) => {
    const hasSubmenu = item.subItems && item.subItems.length > 0;
    const isSubmenuOpen = activeSubmenu === item.id;
    const ItemIcon = item.icon;

    if (hasSubmenu) {
      return (
        <div key={item.id} className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-11 px-3 transition-all duration-300 hover:scale-[1.02]",
              "hover:bg-gradient-to-r hover:from-accent/60 hover:to-accent/40 hover:shadow-md",
              "group relative overflow-hidden rounded-xl",
              isSubmenuOpen && "bg-gradient-to-r from-accent/40 to-accent/20 shadow-sm"
            )}
            onClick={() => toggleSubmenu(item.id)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  "bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10",
                  isSubmenuOpen && "from-primary/20 to-primary/10"
                )}>
                  <ItemIcon className={cn("h-4 w-4 transition-colors", currentMenu.accentColor)} />
                </div>
                {isOpen && (
                  <span className="font-medium text-sm transition-colors group-hover:text-foreground">
                    {item.label}
                  </span>
                )}
              </div>
              {isOpen && (
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isSubmenuOpen && "rotate-90"
                )} />
              )}
            </div>
          </Button>
          
          {isSubmenuOpen && isOpen && (
            <div className="space-y-1 pl-3 ml-3 border-l-2 border-border/30 animate-fade-in">
              {item.subItems.map((subItem: unknown) => {
                const SubIcon = subItem.icon;
                return (
                  <Link
                    key={subItem.id}
                    to={subItem.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      "hover:bg-gradient-to-r hover:from-accent/40 hover:to-accent/20 hover:scale-[1.02]",
                      "group relative overflow-hidden",
                      isActive(subItem.path) && "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm border border-primary/20"
                    )}
                    onClick={() => trackUserActivity(subItem.path, 'submenu_click')}
                  >
                    <div className="h-6 w-6 rounded-md flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <SubIcon className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">{subItem.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]",
          "hover:bg-gradient-to-r hover:from-accent/60 hover:to-accent/40 hover:shadow-md",
          "group relative overflow-hidden",
          isActive(item.path) && "bg-gradient-to-r from-primary/15 to-primary/8 text-primary shadow-lg border border-primary/20"
        )}
        onClick={() => trackUserActivity(item.path, 'menu_click')}
      >
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
          "bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10",
          isActive(item.path) && "from-primary/25 to-primary/15 shadow-sm"
        )}>
          <ItemIcon className={cn(
            "h-4 w-4 transition-colors", 
            isActive(item.path) ? "text-primary" : currentMenu.accentColor
          )} />
        </div>
        {isOpen && (
          <span className={cn(
            "font-medium text-sm transition-colors group-hover:text-foreground",
            isActive(item.path) && "font-semibold"
          )}>
            {item.label}
          </span>
        )}
      </Link>
    );
  };
  
  return (
    <div
      className={cn(
        "flex h-screen flex-col transition-all duration-300 ease-in-out z-50 relative",
        "bg-gradient-to-b from-background/95 via-background/90 to-background/95",
        "backdrop-blur-xl border-r shadow-2xl",
        currentMenu.borderColor,
        isOpen ? "w-80" : "w-16",
        isMobile && isOpen && "fixed inset-y-0 left-0 w-80",
        isMobile && !isOpen && "hidden"
      )}
    >
      {/* Enhanced Header with Theme */}
      <div className={cn(
        "flex h-16 items-center justify-between border-b px-4 relative overflow-hidden",
        "bg-gradient-to-r", currentMenu.theme, currentMenu.borderColor
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Sparkles className="h-5 w-5 text-white relative z-10" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse" />
          </div>
          
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent tracking-tight">
                LogiPortal
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-xs font-medium", currentMenu.accentColor, "border-current/30 bg-current/5")}>
                  {selectedRole?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3 text-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-500 font-medium">AI Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-200 relative z-10"
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
      
      {/* User Info Section (when open) */}
      {isOpen && (
        <div className={cn(
          "px-4 py-3 border-b relative overflow-hidden",
          "bg-gradient-to-r", currentMenu.theme, currentMenu.borderColor
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">Online • Active</p>
            </div>
            <div className="h-2 w-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
      
      {/* Enhanced Navigation Menu */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {currentMenu.items.map(renderMenuItem)}
        </div>
      </ScrollArea>
      
      <Separator className="mx-3 opacity-30" />
      
      {/* Enhanced Footer Actions */}
      <div className={cn(
        "p-3 relative overflow-hidden",
        "bg-gradient-to-t", currentMenu.theme
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
        <div className="grid grid-cols-3 gap-2 relative z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 w-full flex flex-col gap-1 hover:bg-white/10 hover:scale-105 transition-all duration-200 rounded-xl"
                >
                  <BookOpen className="h-4 w-4" />
                  {isOpen && <span className="text-xs font-medium">Learn</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
                <p>Learn & Documentation</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 w-full flex flex-col gap-1 hover:bg-white/10 hover:scale-105 transition-all duration-200 rounded-xl"
                >
                  <HelpCircle className="h-4 w-4" />
                  {isOpen && <span className="text-xs font-medium">Help</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={isOpen ? "hidden" : ""}>
                <p>Help & Support</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 w-full flex flex-col gap-1 hover:bg-white/10 hover:scale-105 transition-all duration-200 rounded-xl"
                  onClick={toggleDarkMode}
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
        
        {/* Status Indicator */}
        {isOpen && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">System Status</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                <span className="text-green-500 font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
