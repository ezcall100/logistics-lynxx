import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, User, Menu, Truck, Package, Globe, Shield, Zap, Activity, TrendingUp, Users2, MessageSquare, Star, HelpCircle, Monitor, Database, Wifi, WifiOff, CheckCircle, AlertTriangle, XCircle, Clock, FileText, PieChart, BarChart3, Headphones, Lock, Eye, EyeOff, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { useNavigate } from 'react-router-dom';
import transBotLogo from '@/assets/transbot-logo.png';

interface CarrierHeaderProps {
  onMenuToggle: () => void;
  isSidebarCollapsed: boolean;
}

const CarrierHeader: React.FC<CarrierHeaderProps> = ({ onMenuToggle, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  
  // System status simulation
  const systemStatus = {
    database: 'healthy',
    api: 'healthy', 
    tracking: 'warning',
    payments: 'healthy'
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Menu Toggle and Logo */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <img 
              src={transBotLogo} 
              alt="Trans Bot" 
              className="h-8 w-8 Record<string, unknown>-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-primary">Trans Bot</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Carrier Portal</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md w-full ml-6 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shipments, loads, customers..."
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Right Section - Quick Actions and Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Status Indicators */}
          <div className="hidden lg:flex items-center gap-2 mr-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary">
              <Activity className="h-3 w-3" />
              <span className="text-xs font-medium">Live</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-medium">+15%</span>
            </div>
          </div>

          {/* Quick Actions */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-foreground hover:bg-accent/70 rounded-xl transition-all duration-200"
            onClick={() => navigate('/carrier-admin/communication')}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>

          {/* System Status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-accent/70 rounded-xl transition-all duration-200">
                <Monitor className="h-4 w-4" />
                <div className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
              <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
                <Monitor className="h-4 w-4" />
                System Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="text-sm">Database</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">API Services</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm">Tracking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-600">Degraded</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Payments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600">Healthy</span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help & Support */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:bg-accent/70 rounded-xl transition-all duration-200">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
              <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/help/documentation')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-blue-500/10">
                    <FileText className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="font-medium">Documentation</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/help/tutorials')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-purple-500/10">
                    <PieChart className="h-3 w-3 text-purple-600" />
                  </div>
                  <span className="font-medium">Video Tutorials</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-emerald-500/10">
                    <Headphones className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="font-medium">Live Support</span>
                  <Badge variant="secondary" className="ml-auto text-xs">Online</Badge>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-accent/70 rounded-xl transition-all duration-200">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] font-bold">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
              <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
                <Bell className="h-4 w-4" />
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/50 rounded-lg">
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New shipment assigned</p>
                    <p className="text-xs text-muted-foreground">Load #TB-2024-001 ready for pickup</p>
                    <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/50 rounded-lg">
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Users2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Driver check-in</p>
                    <p className="text-xs text-muted-foreground">John Smith checked in at Chicago terminal</p>
                    <p className="text-xs text-muted-foreground mt-1">5 mins ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/50 rounded-lg">
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment processed</p>
                    <p className="text-xs text-muted-foreground">Invoice #INV-2024-045 paid</p>
                    <p className="text-xs text-muted-foreground mt-1">15 mins ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advanced Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:bg-accent/70 rounded-xl transition-all duration-200">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
              <DropdownMenuLabel className="flex items-center gap-2 font-semibold">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Quick Settings */}
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span className="text-sm font-medium">Dark Mode</span>
                  </div>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span className="text-sm font-medium">Sound Notifications</span>
                  </div>
                  <Switch 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {focusMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="text-sm font-medium">Focus Mode</span>
                  </div>
                  <Switch 
                    checked={focusMode} 
                    onCheckedChange={setFocusMode}
                  />
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              {/* Settings Categories */}
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/settings/user-management')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-primary/10">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">User Management</span>
                    <p className="text-xs text-muted-foreground">Manage users, roles, permissions</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/settings/fleet')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-purple-500/10">
                    <Truck className="h-3 w-3 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Fleet Settings</span>
                    <p className="text-xs text-muted-foreground">Configure vehicles, drivers, routes</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/settings/compliance')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-emerald-500/10">
                    <Shield className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Compliance Center</span>
                    <p className="text-xs text-muted-foreground">DOT, safety, insurance settings</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/settings/integrations')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-blue-500/10">
                    <Zap className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Integration Hub</span>
                    <p className="text-xs text-muted-foreground">API keys, webhooks, EDI setup</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-lg cursor-pointer p-3" onClick={() => navigate('/carrier-admin/settings/security')}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-1 rounded-lg bg-red-500/10">
                    <Lock className="h-3 w-3 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Security Settings</span>
                    <p className="text-xs text-muted-foreground">2FA, access logs, audit trails</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'CA'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || 'Carrier Admin'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'carrier@example.com'}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/carrier-admin/settings/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default CarrierHeader;