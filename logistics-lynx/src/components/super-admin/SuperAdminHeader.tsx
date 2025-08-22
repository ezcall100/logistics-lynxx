/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Crown,
  Plus,
  Activity,
  Shield,
  Zap,
  Globe,
  Database,
  Cpu,
  BarChart3,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  ExternalLink,
  Command,
  Sparkles
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
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface SuperAdminHeaderProps {
  onMenuClick: () => void;
}

const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(12);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSettingsNavigation = (settingType: string) => {
    navigate(`/super-admin/settings?tab=${settingType}`);
  };

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    
    if (pathSegments.length === 1 && pathSegments[0] === 'super-admin') {
      return 'Dashboard';
    }
    
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };

  const quickActions = [
    { label: 'Add User', icon: Plus, action: () => navigate('/super-admin/users/add') },
    { label: 'Create Report', icon: FileText, action: () => navigate('/super-admin/reports/create') },
    { label: 'System Health', icon: Activity, action: () => navigate('/super-admin/health') },
    { label: 'AI Agents', icon: Cpu, action: () => navigate('/super-admin/ai-dashboard') },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 border-b border-border/50 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative shadow-sm"
    >
      {/* Enhanced Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 backdrop-blur-sm" />
      
      {/* Left Section */}
      <div className="flex items-center gap-6 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden hover:bg-primary/10 hover:scale-105 transition-all duration-200 p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page Title */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {getCurrentPageTitle()}
            </h1>
            <p className="text-xs text-muted-foreground">Super Admin Portal</p>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className="relative w-72 sm:w-80 lg:w-96 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search across all portals, users, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 bg-muted/30 border-muted hover:bg-muted/40 focus:bg-background/90 backdrop-blur-sm transition-all duration-200 group-focus-within:border-primary/50 h-10"
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
          
          {/* Search Shortcut */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" />
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Center Section - Quick Actions */}
      <div className="hidden lg:flex items-center gap-2 relative z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10">
              <Plus className="h-4 w-4" />
              Quick Actions
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold">Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            {quickActions.map((action) => (
              <DropdownMenuItem key={action.label} onClick={action.action} className="gap-3">
                <action.icon className="h-4 w-4" />
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hover:bg-primary/10 hover:scale-105 transition-all duration-200 p-2"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Enhanced Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative hover:bg-primary/10 hover:scale-105 transition-all duration-200 p-2">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse shadow-lg"
                >
                  {notifications > 99 ? '99+' : notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications ({notifications})
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="gap-3 p-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System Update Complete</p>
                  <p className="text-xs text-muted-foreground">All systems are now running on the latest version</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 p-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New User Registration</p>
                  <p className="text-xs text-muted-foreground">John Doe has requested admin access</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="text-center text-primary font-medium">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Enhanced Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:scale-105 transition-all duration-200 p-2">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings & Configuration
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3">
                  <Shield className="h-4 w-4" />
                  Security
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('security')}>
                      Access Control
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('firewall')}>
                      Firewall Rules
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('audit')}>
                      Audit Logs
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3">
                  <Database className="h-4 w-4" />
                  System
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('database')}>
                      Database Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('network')}>
                      Network Config
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingsNavigation('monitoring')}>
                      System Monitoring
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={() => navigate('/super-admin/help')} className="gap-3">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-200">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold">
                  {user?.name?.charAt(0) || 'S'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold">User Profile</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <div className="p-2">
              <p className="text-sm font-medium">{user?.name || 'Super Admin'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || 'admin@transbot.com'}</p>
            </div>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={() => navigate('/super-admin/profile')} className="gap-3">
              <User className="h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/super-admin/preferences')} className="gap-3">
              <Settings className="h-4 w-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={logout} className="gap-3 text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default SuperAdminHeader;
