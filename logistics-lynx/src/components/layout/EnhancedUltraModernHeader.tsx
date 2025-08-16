/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User, 
  Home,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  Filter,
  Star,
  ChevronDown,
  Languages,
  Users,
  Building,
  CreditCard,
  FileText,
  UserCog,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
} from '@/components/ui/dropdown-menu';

interface EnhancedUltraModernHeaderProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

const EnhancedUltraModernHeader: React.FC<EnhancedUltraModernHeaderProps> = ({ 
  toggleSidebar, 
  isMobile = false,
  sidebarOpen = true 
}) => {
  const { user, selectedRole } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getRoleConfig = () => {
    const configs = {
      super_admin: { 
        badge: 'Super Admin',
        bgColor: 'bg-blue-50/80 text-blue-700 border-blue-200/60'
      },
      carrier_admin: { 
        badge: 'Carrier Admin',
        bgColor: 'bg-slate-50/80 text-slate-700 border-slate-200/60'
      },
      freight_broker_admin: { 
        badge: 'Broker Admin',
        bgColor: 'bg-blue-50/80 text-blue-700 border-blue-200/60'
      },
      shipper_admin: { 
        badge: 'Shipper Admin',
        bgColor: 'bg-neutral-50/80 text-neutral-700 border-neutral-200/60'
      },
      carrier_driver: { 
        badge: 'Driver',
        bgColor: 'bg-blue-50/80 text-blue-700 border-blue-200/60'
      },
      owner_operator: { 
        badge: 'Owner Operator',
        bgColor: 'bg-slate-50/80 text-slate-700 border-slate-200/60'
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };

  const roleConfig = getRoleConfig();

  const recentNotifications = [
    {
      id: 1,
      title: 'Route Optimization Complete',
      message: 'Saved 15% on fuel costs for Route #R-4821',
      time: '2 min ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'High Priority Load Available',
      message: 'Premium load from Chicago to Miami - $4,500',
      time: '5 min ago',
      type: 'warning',
      icon: TrendingUp,
      unread: true
    },
    {
      id: 3,
      title: 'Driver Check-in Required',
      message: 'John Smith needs to complete daily check-in',
      time: '12 min ago',
      type: 'info',
      icon: Clock,
      unread: false
    },
    {
      id: 4,
      title: 'Maintenance Alert',
      message: 'Vehicle TRK-127 scheduled for service tomorrow',
      time: '1 hour ago',
      type: 'info',
      icon: Settings,
      unread: false
    }
  ];

  const systemMetrics = [
    { label: 'AI Agents', value: '250', status: 'active', color: 'text-emerald-600' },
    { label: 'System Health', value: '99.8%', status: 'optimal', color: 'text-blue-600' },
    { label: 'Active Users', value: '1,247', status: 'online', color: 'text-purple-600' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Clean Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-neutral-600" />
          </Button>

          {/* Clean Search */}
          <div className="hidden md:flex relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search TMS system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-10 h-10 rounded-lg border-neutral-200 bg-neutral-50/50 focus:bg-white transition-colors duration-200 text-sm font-medium"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              >
                <Languages className="h-4 w-4 text-neutral-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-neutral-200 shadow-lg">
              <DropdownMenuLabel className="text-sm font-medium text-neutral-700">Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">🇪🇸 Spanish</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">🇫🇷 French</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">🇩🇪 German</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clean Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors duration-200 relative"
              >
                <Bell className="h-4 w-4 text-neutral-600" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                    {notifications > 9 ? '9+' : notifications}
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white border border-neutral-200 shadow-lg">
              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900">Notifications</h3>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">{notifications} New</Badge>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-neutral-50 border-b border-neutral-100 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">New shipment assigned</p>
                      <p className="text-xs text-neutral-500">Shipment #SH-2024-001 ready for pickup</p>
                      <p className="text-xs text-neutral-400 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-neutral-50 border-b border-neutral-100 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-green-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">Route optimization complete</p>
                      <p className="text-xs text-neutral-500">Saved 15% on Route #R-4821</p>
                      <p className="text-xs text-neutral-400 mt-1">5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-neutral-100">
                <Button variant="outline" className="w-full text-sm" size="sm">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              >
                <Settings className="h-4 w-4 text-neutral-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-neutral-200 shadow-lg">
              <DropdownMenuLabel className="text-sm font-medium text-neutral-700">Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Settings className="h-4 w-4 mr-2" />
                  General Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Building className="h-4 w-4 mr-2" />
                  Company Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payroll Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <UserCog className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates & Documents
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  <Star className="h-4 w-4 mr-2" />
                  My Subscription
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clean User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 px-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200 flex items-center gap-2"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium text-neutral-900">{user?.name || 'User'}</span>
                  <span className="text-xs text-neutral-500">{roleConfig.badge}</span>
                </div>
                <ChevronDown className="h-3 w-3 text-neutral-400 hidden lg:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-neutral-200 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
                  <Badge variant="outline" className={`text-xs mt-1 ${roleConfig.bgColor}`}>
                    {roleConfig.badge}
                  </Badge>
                </div>
              </div>
              
              <Card className="glass-subtle border-border/30 mb-4">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <Button variant="outline" size="sm" className="w-full">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-3 p-3">
                  <User className="h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-3">
                  <Settings className="h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-3">
                  <Shield className="h-4 w-4" />
                  Security
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-3">
                  <Activity className="h-4 w-4" />
                  Activity Log
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-3 p-3 text-red-600 focus:text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Enhanced Mobile Search */}
      {isMobile && isSearchFocused && (
        <div className="px-6 pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 glass-subtle border-border/50"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedUltraModernHeader;