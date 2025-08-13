import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Menu,
  Truck,
  Navigation,
  DollarSign,
  Clock,
  Wifi,
  Battery,
  Signal,
  MapPin,
  AlertTriangle,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface OwnerOperatorHeaderProps {
  onMenuToggle: () => void;
  isSidebarCollapsed: boolean;
}

const OwnerOperatorHeader: React.FC<OwnerOperatorHeaderProps> = ({ 
  onMenuToggle, 
  isSidebarCollapsed 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time status data
  const statusData = {
    currentLoad: "Load #OO-8847",
    nextDelivery: "Chicago, IL",
    eta: "2h 45m",
    revenue: "$2,847",
    hoursRemaining: 7.5,
    fuelLevel: 68,
    batteryLevel: 89,
    signalStrength: 4,
    isOnline: true,
    lastUpdate: "2 min ago"
  };

  const notifications = [
    { id: 1, type: 'urgent', message: 'Load ready for pickup in 30 minutes' },
    { id: 2, type: 'info', message: 'Fuel stop recommended in 150 miles' },
    { id: 3, type: 'payment', message: 'Payment of $2,847 processed' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/owner-operator/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/owner-operator/dashboard')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              OwnerOp Pro
            </span>
          </div>

          {/* Real-time Status Indicators */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                {statusData.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Navigation className="h-3 w-3" />
              <span>ETA: {statusData.eta}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>{statusData.revenue}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{statusData.hoursRemaining}h left</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search loads, routes, documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-muted/50 focus:bg-background transition-colors"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* System Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1">
              <Battery className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">{statusData.batteryLevel}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">{statusData.signalStrength}/5</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">Connected</span>
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-start gap-2 p-3">
                  {notification.type === 'urgent' && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                  {notification.type === 'info' && <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />}
                  {notification.type === 'payment' && <DollarSign className="h-4 w-4 text-green-500 mt-0.5" />}
                  <span className="text-sm">{notification.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/owner-operator/settings?tab=profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/owner-operator/settings?tab=payment')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/owner-operator/settings?tab=notifications')}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-violet-500 text-white">OO</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Smith</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Owner-Operator #12847
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    MC-987654
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/owner-operator/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/owner-operator/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search loads, routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </form>
      </div>
    </header>
  );
};

export default OwnerOperatorHeader;