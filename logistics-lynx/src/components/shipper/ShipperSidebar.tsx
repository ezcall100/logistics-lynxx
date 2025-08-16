/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator, 
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronRight, 
  ChevronDown, 
  Settings, 
  User, 
  Bell, 
  LogOut, 
  Globe,
  Search,
  Plus,
  Package,
  Truck,
  BarChart3,
  Calculator,
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  FileText,
  Shield,
  Zap,
  Activity,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Network,
  Crown,
  UserCircle,
  UserPlus,
  FolderOpen,
  Calendar,
  Upload,
  Repeat,
  ShoppingCart,
  Receipt,
  Building2,
  BookOpen,
  PlayCircle,
  Scale,
  Landmark,
  Banknote,
  LineChart,
  Key,
  Code,
  Layers,
  FileEdit,
  Handshake,
  ClipboardX,
  X,
  Store,
  ShieldCheck,
  Route,
  Eye,
  Gauge,
  CreditCard,
  PackageSearch,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { SHIPPER_ADMIN_MENU } from '@/lib/menus/shipper-admin-menu';

interface ShipperSidebarProps {
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const ShipperSidebar: React.FC<ShipperSidebarProps> = ({
  collapsed,
  isOpen,
  onToggle,
  onClose,
  isMobile = false
}) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpanded = (itemTitle: string) => {
    if (collapsed && !isMobile) return;
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(title => title !== itemTitle) 
        : [...prev, itemTitle]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Filter menu items based on search
  const filteredMenuItems = SHIPPER_ADMIN_MENU.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subMenu?.some(subItem => 
      subItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderMenuItem = (item: unknown, level = 0) => {
    const hasChildren = item.subMenu && item.subMenu.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const itemIsActive = item.path ? isActive(item.path) : 
      item.subMenu && item.subMenu.some((child: unknown) => isActive(child.path));
    const IconComponent = item.icon;

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={!collapsed && isExpanded} onOpenChange={() => toggleExpanded(item.title)}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full h-12 px-4 text-left font-medium transition-all duration-200 hover:bg-accent/80 group rounded-xl",
                collapsed ? "justify-center px-2" : "justify-start px-4",
                itemIsActive && "bg-accent text-accent-foreground shadow-sm border border-border/30 bg-orange-500/10",
                level > 0 && !collapsed && "ml-4"
              )}
              title={collapsed ? item.title : undefined}
            >
              <div className="flex items-center w-full gap-3">
                <div className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                  itemIsActive 
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg" 
                    : "bg-gradient-to-br from-muted to-muted/80",
                  "group-hover:scale-110 group-hover:shadow-md"
                )}>
                  <IconComponent className={cn(
                    "h-4 w-4",
                    itemIsActive ? "text-white" : "text-muted-foreground"
                  )} />
                </div>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate text-sm font-semibold">{item.title}</span>
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </>
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent className="space-y-1 overflow-hidden">
              <div className="ml-8 space-y-1 border-l-2 border-border/30 pl-4 py-2">
                {item.subMenu?.map((subItem: unknown) => renderMenuItem(subItem, level + 1))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.title}
        to={item.path}
        className={({ isActive: navIsActive }) => cn(
          "flex items-center h-11 px-4 text-sm font-medium transition-all duration-200 hover:bg-accent/80 rounded-xl mx-1 group",
          collapsed ? "justify-center px-2" : "justify-start px-4",
          navIsActive && "bg-accent text-accent-foreground shadow-sm border border-border/30 bg-orange-500/10",
          level > 0 && !collapsed && "ml-4"
        )}
        title={collapsed ? item.title : undefined}
        onClick={handleItemClick}
      >
        <div className="flex items-center gap-3 w-full">
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0",
            isActive(item.path) 
              ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-md" 
              : "bg-gradient-to-br from-muted to-muted/80",
            "group-hover:scale-105 group-hover:shadow-sm"
          )}>
            <item.icon className={cn(
              "h-4 w-4",
              isActive(item.path) ? "text-white" : "text-muted-foreground"
            )} />
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span className="truncate text-sm font-medium">{item.title}</span>
            </div>
          )}
        </div>
      </NavLink>
    );
  };

  // Quick Actions for collapsed state
  const quickActions = [
    { icon: Plus, label: 'New Shipment', path: '/shipper-admin/shipments/new', color: 'bg-blue-500' },
    { icon: Calculator, label: 'Quick Quote', path: '/shipper-admin/quotes/new', color: 'bg-purple-500' },
    { icon: Truck, label: 'Find Carrier', path: '/shipper-admin/networks/carriers', color: 'bg-green-500' },
    { icon: MapPin, label: 'Track', path: '/shipper-admin/shipments/in-transit', color: 'bg-amber-500' },
  ];

  return (
    <>
      <div className={cn(
        "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] bg-card/95 backdrop-blur-xl border-r border-border/60 transition-all duration-300 ease-out shadow-2xl",
        // Desktop
        !isMobile && (collapsed ? "w-20" : "w-80"),
        // Mobile
        isMobile && (isOpen ? "w-80" : "w-0 opacity-0 pointer-events-none"),
        "flex flex-col overflow-hidden"
      )}>
        {/* Search Bar - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-4 border-b border-border/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border/60 rounded-lg focus:bg-background focus:border-orange-300 transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Quick Actions - Only show when collapsed */}
        {collapsed && !isMobile && (
          <div className="p-3 border-b border-border/30">
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <NavLink
                  key={action.label}
                  to={action.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-200 hover:scale-110 group",
                    isActive ? "bg-orange-500 text-white shadow-md" : "bg-muted/50 hover:bg-muted"
                  )}
                  title={action.label}
                  onClick={handleItemClick}
                >
                  <action.icon className="h-4 w-4" />
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {filteredMenuItems.map(item => renderMenuItem(item))}
          </div>
        </ScrollArea>

        {/* User Profile & Settings */}
        <div className="p-4 border-t border-border/50 bg-muted/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full h-14 p-0 hover:bg-accent transition-all duration-200",
                  collapsed ? "justify-center" : "justify-start px-3"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-10 w-10 border-2 border-orange-200">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold">
                      {user?.name?.slice(0, 2).toUpperCase() || 'SA'}
                    </AvatarFallback>
                  </Avatar>
                  {(!collapsed || isMobile) && (
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {user?.name || 'Shipper Admin'}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {user?.email || 'admin@shipper.com'}
                      </div>
                    </div>
                  )}
                  {(!collapsed || isMobile) && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 p-0 bg-card/95 backdrop-blur-xl border border-border/60 shadow-2xl" 
              side={isMobile ? "top" : "right"}
            >
              <DropdownMenuLabel className="p-4 pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-lg">
                      {user?.name?.slice(0, 2).toUpperCase() || 'SA'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{user?.name || 'Shipper Admin'}</div>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Profile Section */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <User className="mr-3 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <Bell className="mr-3 h-4 w-4" />
                  Notifications
                  <Badge variant="secondary" className="ml-auto text-xs">3</Badge>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Mega Settings Menu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="p-3 cursor-pointer">
                  <Settings className="mr-3 h-4 w-4" />
                  System Settings
                  <ChevronRight className="ml-auto h-4 w-4" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-64 p-2">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Shield className="mr-3 h-4 w-4" />
                      Security & Privacy
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Globe className="mr-3 h-4 w-4" />
                      Language & Region
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Zap className="mr-3 h-4 w-4" />
                      Performance
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Activity className="mr-3 h-4 w-4" />
                      Activity Log
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Code className="mr-3 h-4 w-4" />
                      API Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <FileText className="mr-3 h-4 w-4" />
                      Documentation
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <MessageSquare className="mr-3 h-4 w-4" />
                      Support
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              
              {/* Theme Toggle */}
              <DropdownMenuItem 
                className="p-3 cursor-pointer" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Globe className="mr-3 h-4 w-4" />
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {/* Sign Out */}
              <DropdownMenuItem 
                className="p-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" 
                onClick={signOut}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default ShipperSidebar;
