
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Menu,
  Users,
  Building,
  CreditCard,
  FileText,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

interface SuperAdminHeaderProps {
  onMenuClick: () => void;
}

const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(12);

  const handleSettingsNavigation = (settingType: string) => {
    navigate(`/super-admin/settings?tab=${settingType}`);
  };

  return (
    <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/90 backdrop-blur-sm" />
      
      {/* Left Section */}
      <div className="flex items-center gap-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden hover:bg-primary/10 hover:scale-105 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Enhanced Search */}
        <div className="relative w-64 sm:w-80 lg:w-96 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search across all portals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-muted hover:bg-muted/40 focus:bg-background/90 backdrop-blur-sm transition-all duration-200 group-focus-within:border-primary/50"
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Enhanced Notifications */}
        <Button variant="ghost" size="sm" className="relative hover:bg-primary/10 hover:scale-105 transition-all duration-200 group">
          <Bell className="h-5 w-5 group-hover:animate-pulse" />
          {notifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse shadow-lg"
            >
              {notifications > 99 ? '99+' : notifications}
            </Badge>
          )}
        </Button>

        {/* Enhanced Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:scale-105 transition-all duration-200 group">
              <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold">Settings</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('users')}
            >
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              User Management
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('general')}
            >
              <Settings className="mr-2 h-4 w-4 text-purple-500" />
              General Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('company')}
            >
              <Building className="mr-2 h-4 w-4 text-green-500" />
              Company Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('payroll')}
            >
              <CreditCard className="mr-2 h-4 w-4 text-orange-500" />
              Payroll Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('general')}
            >
              <User className="mr-2 h-4 w-4 text-pink-500" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('templates')}
            >
              <FileText className="mr-2 h-4 w-4 text-indigo-500" />
              Template & Documents
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('general')}
            >
              <Crown className="mr-2 h-4 w-4 text-yellow-500" />
              My Subscription
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Enhanced Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-200 group">
              <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-200">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'SA'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="flex flex-col p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-t-md">
              <span className="font-medium text-lg">{user?.name || 'Super Admin'}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
              <Badge variant="secondary" className="mt-2 w-fit bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-primary border-primary/20">
                🤖 Super Admin
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="hover:bg-primary/10 transition-colors duration-200">
              <User className="mr-2 h-4 w-4 text-blue-500" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSettingsNavigation('general')}
            >
              <Settings className="mr-2 h-4 w-4 text-purple-500" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={logout} className="text-destructive hover:bg-destructive/10 transition-colors duration-200">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default SuperAdminHeader;
