import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Settings, 
  User, 
  LogOut,
  HelpCircle,
  MessageSquare,
  Activity,
  ChevronDown,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/components/theme-provider';
import { EnterpriseSidebar } from '@/components/sidebar/EnterpriseSidebar';
import { enterpriseSidebarConfig, superAdminSidebarConfig, getPortalSidebarConfig } from '@/components/sidebar/EnterpriseSidebarConfig';

interface SidebarConfig {
  title: string;
  items: Array<{
    title: string;
    path: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string;
  }>;
}

interface EnterpriseLayoutProps {
  className?: string;
  showSidebar?: boolean;
  sidebarConfig?: SidebarConfig[];
  portalType?: string;
}

export const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({
  className,
  showSidebar = true,
  sidebarConfig,
  portalType
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New load available', message: 'A new load has been posted in your area', time: '2 min ago', unread: true },
    { id: 2, title: 'System update', message: 'System maintenance scheduled for tonight', time: '1 hour ago', unread: true },
    { id: 3, title: 'Payment received', message: 'Payment of $2,450 has been processed', time: '3 hours ago', unread: false }
  ]);

  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  // Determine which sidebar config to use
  const getSidebarConfig = () => {
    if (sidebarConfig) return sidebarConfig;
    if (portalType) return getPortalSidebarConfig(portalType);
    if (location.pathname.startsWith('/super-admin')) return superAdminSidebarConfig;
    return enterpriseSidebarConfig;
  };

  const currentConfig = getSidebarConfig();

  // Get current page title from location
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    
    // Find the current item in the sidebar config
    for (const section of currentConfig) {
      for (const item of section.items) {
        if (item.path === path) {
          return item.title;
        }
      }
    }
    
    // Fallback to path-based title
    return path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard';
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <EnterpriseSidebar
            sections={currentConfig}
            defaultCollapsed={false}
            onToggleCollapse={setSidebarCollapsed}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <div className="hidden md:block">
            <EnterpriseSidebar
              sections={currentConfig}
              defaultCollapsed={sidebarCollapsed}
              onToggleCollapse={setSidebarCollapsed}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between">
            {/* Left side - Mobile menu and breadcrumb */}
            <div className="flex items-center gap-4">
              {showSidebar && (
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              )}
              
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground">
                  {getCurrentPageTitle()}
                </h1>
                <Badge variant="secondary" className="text-xs">
                  {portalType || 'Admin'}
                </Badge>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search anything..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* Right side - Actions and user menu */}
            <div className="flex items-center gap-2">
              {/* Global Search (Mobile) */}
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Search className="h-4 w-4" />
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                  <Separator />
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-3">
                        <div className="flex items-start gap-3 w-full">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            notification.unread ? "bg-primary" : "bg-muted"
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <Separator />
                  <DropdownMenuItem className="justify-center">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Toggle theme
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLayout;
