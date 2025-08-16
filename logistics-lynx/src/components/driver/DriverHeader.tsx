/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, User, Menu, Package, Globe, Shield, Zap, Activity, TrendingUp, MessageSquare, Star, HelpCircle, AlertTriangle, Clock, FileText, Target, Fuel, Thermometer, Phone, Home, CreditCard, Map, Truck, BarChart3, Calendar, Camera, Download, Eye, Lock, Palette, Smartphone, Wifi, Volume2, BatteryCharging, Moon, Sun, Languages, UserCheck, Mail, Bookmark, History, Award, Coffee, DollarSign, Route, Navigation, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface DriverHeaderProps {
  toggleSidebar?: () => void;
  toggleMobileMenu?: () => void;
  isMobile?: boolean;
}
const DriverHeader: React.FC<DriverHeaderProps> = ({
  toggleSidebar,
  toggleMobileMenu,
  isMobile
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(true);

  // Enhanced driver data
  const driverData = {
    driverName: "Sarah Martinez",
    driverId: "DRV-2024",
    truckNumber: "T-4521",
    status: "On Route",
    notifications: 5,
    urgentNotifications: 2,
    fuelLevel: 78,
    weatherTemp: "72°F",
    currentLocation: "I-75, Mile 234, GA",
    nextDelivery: "Atlanta Distribution Center",
    eta: "14:45",
    safetyScore: 98,
    todayEarnings: "$428.50",
    profileComplete: 95
  };
  const handleLogout = () => {
    toast.success('Logging out...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  const handleSettingClick = (setting: string) => {
    toast.success(`Opening ${setting} settings`);
  };
  const handleQuickAction = (action: string) => {
    toast.success(`${action} activated`);
  };
  return <header className="w-full bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Left Section - Menu and Logo */}
        <div className="flex items-center gap-4">
          {/* Toggle button for both mobile and desktop */}
          {toggleSidebar && <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-10 w-10 p-0">
              <Menu className="w-5 h-5" />
            </Button>}
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Driver Portal
              </h1>
              <p className="text-xs text-muted-foreground">Professional Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center Section - Enhanced Search */}
        <div className="flex-1 max-w-md mx-4 sm:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search loads, routes, documents, tools..." className="pl-10 pr-4 bg-muted/40 border-border/60 focus:bg-background/80 transition-colors" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Enhanced Status Indicators */}
          

          {/* Connection Status */}
          

          {/* Enhanced Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-orange-50 dark:hover:bg-orange-950/30" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="w-4 h-4" />
            {driverData.notifications > 0 && <div className="absolute -top-0.5 -right-0.5 flex items-center justify-center">
                <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-background">
                  {driverData.notifications}
                </Badge>
                {driverData.urgentNotifications > 0 && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>}
              </div>}
          </Button>

          {/* Enhanced Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 z-50 bg-background/95 backdrop-blur-md border border-border/50 shadow-xl" align="end" sideOffset={8}>
              <DropdownMenuLabel className="pb-3">
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">Driver Settings</span>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Quick Settings
                </DropdownMenuLabel>
                
                <DropdownMenuItem className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span>Dark Mode</span>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4" />
                    <span>Online Mode</span>
                  </div>
                  <Switch checked={isOnlineMode} onCheckedChange={setIsOnlineMode} />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  App Preferences
                </DropdownMenuLabel>
                
                <DropdownMenuItem onClick={() => navigate('/driver/settings/vehicle')}>
                  <Truck className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Vehicle Settings</div>
                    <div className="text-xs text-muted-foreground">Truck preferences & maintenance</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/settings/navigation')}>
                  <Navigation className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Navigation & Routes</div>
                    <div className="text-xs text-muted-foreground">GPS settings & route preferences</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/settings/notifications')}>
                  <Bell className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Notifications</div>
                    <div className="text-xs text-muted-foreground">Alerts, sounds & push notifications</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/settings/communication')}>
                  <MessageSquare className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Communication</div>
                    <div className="text-xs text-muted-foreground">Dispatch, chat & emergency contacts</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-3 h-4 w-4" />
                    <span>Theme & Display</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="z-50 bg-background/95 backdrop-blur-md border border-border/50">
                    <DropdownMenuItem onClick={() => handleSettingClick('Color Theme')}>
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      Default Blue
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingClick('Color Theme')}>
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      Safety Green
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSettingClick('Color Theme')}>
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      Truck Orange
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuItem onClick={() => handleSettingClick('Language')}>
                  <Languages className="mr-3 h-4 w-4" />
                  <span>Language & Region</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleSettingClick('Privacy')}>
                  <Lock className="mr-3 h-4 w-4" />
                  <span>Privacy & Security</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => navigate('/driver/settings')} className="text-blue-600 font-medium">
                <Settings className="mr-3 h-4 w-4" />
                Advanced Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Enhanced Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                <Avatar className="h-8 w-8 border-2 border-orange-200 dark:border-orange-800">
                  <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold text-sm">
                    SM
                  </AvatarFallback>
                </Avatar>
                {driverData.profileComplete < 100 && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full border border-background flex items-center justify-center">
                    <span className="text-xs text-white">!</span>
                  </div>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 z-50 bg-background/95 backdrop-blur-md border border-border/50 shadow-xl" align="end" sideOffset={8}>
              <DropdownMenuLabel className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-orange-200">
                    <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{driverData.driverName}</div>
                    <div className="text-sm text-muted-foreground">{driverData.driverId} • {driverData.truckNumber}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {driverData.safetyScore}% Safety
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Profile {driverData.profileComplete}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Current Trip
                </DropdownMenuLabel>
                
                <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 mx-2 rounded-lg border border-blue-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Next Delivery</span>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">ETA {driverData.eta}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{driverData.nextDelivery}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Today: {driverData.todayEarnings}</div>
                </div>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </DropdownMenuLabel>
                
                <DropdownMenuItem onClick={() => handleQuickAction('Navigation')}>
                  <MapPin className="mr-3 h-4 w-4 text-blue-500" />
                  <span>Start Navigation</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleQuickAction('Break Timer')}>
                  <Coffee className="mr-3 h-4 w-4 text-yellow-600" />
                  <span>Start Break Timer</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleQuickAction('Emergency Call')}>
                  <Phone className="mr-3 h-4 w-4 text-red-500" />
                  <span>Emergency Contact</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Account & Profile
                </DropdownMenuLabel>
                
                <DropdownMenuItem onClick={() => navigate('/driver/profile')}>
                  <UserCheck className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">My Profile</div>
                    <div className="text-xs text-muted-foreground">Personal info & credentials</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/profile/performance')}>
                  <BarChart3 className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Performance Dashboard</div>
                    <div className="text-xs text-muted-foreground">Earnings, safety, efficiency metrics</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/profile/documents')}>
                  <FileText className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Documents & Logs</div>
                    <div className="text-xs text-muted-foreground">HOS, BOL, receipts, certifications</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/driver/profile/earnings')}>
                  <DollarSign className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">Earnings & Payments</div>
                    <div className="text-xs text-muted-foreground">Pay statements, bonuses, deductions</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <History className="mr-3 h-4 w-4" />
                    <span>Recent Activity</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="z-50 bg-background/95 backdrop-blur-md border border-border/50">
                    <DropdownMenuItem>
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Load delivery completed
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Route updated
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      Break reminder sent
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuItem onClick={() => navigate('/driver/help')}>
                  <HelpCircle className="mr-3 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleQuickAction('Feedback')}>
                  <MessageSquare className="mr-3 h-4 w-4" />
                  <span>Send Feedback</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Enhanced Notifications Panel */}
      {showNotifications && <div className="absolute right-4 sm:right-6 top-16 w-80 sm:w-96 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800 dark:text-orange-200">Notifications</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-700 text-xs">{driverData.notifications} total</Badge>
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)} className="h-6 w-6 p-0">
                  ×
                </Button>
              </div>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <div className="p-4 space-y-3">
              {/* Urgent Notifications */}
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">Route Alert</span>
                      <Badge className="bg-red-100 text-red-700 text-xs">URGENT</Badge>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">Traffic incident ahead - estimated 45min delay</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">I-75 Mile 267 • 5 minutes ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">HOS Reminder</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Break required in 2 hours 15 minutes</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">DOT Compliance • 10 minutes ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Dispatch Message</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">New route optimization available - saves 30 min</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">From Operations • 15 minutes ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">Bonus Earned</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">On-time delivery bonus: +$85.50</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Load #DL-2024-1247 • 1 hour ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Achievement</span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">50 consecutive safe deliveries milestone!</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Safety Department • 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border/50 bg-muted/30">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('Mark All Read')}>
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/driver/notifications')}>
                View All Notifications
              </Button>
            </div>
          </div>
        </div>}
    </header>;
};
export default DriverHeader;