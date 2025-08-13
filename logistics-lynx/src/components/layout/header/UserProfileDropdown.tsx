
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RoleIndicator from '../RoleIndicator';

const UserProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleSettingsNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 pl-2 pr-3 hover:bg-accent/70 transition-all duration-200 rounded-xl gap-2"
        >
          <Avatar className="h-7 w-7 ring-2 ring-background shadow-md">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-blue-600 text-primary-foreground font-semibold">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold truncate max-w-24">
              {user?.name || 'User'}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-24">
              {user?.email}
            </span>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-lg">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground font-semibold">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold leading-none truncate">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Mobile Role Indicator */}
        <div className="lg:hidden px-2 py-1">
          <RoleIndicator />
        </div>
        <DropdownMenuSeparator className="lg:hidden" />
        
        <DropdownMenuItem className="rounded-lg cursor-pointer">
          <User className="mr-3 h-4 w-4" />
          <span className="font-medium">Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/account')}
        >
          <Settings className="mr-3 h-4 w-4" />
          <span className="font-medium">Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="rounded-lg text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
