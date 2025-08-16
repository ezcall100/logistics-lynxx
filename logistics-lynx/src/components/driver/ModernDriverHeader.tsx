/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Fuel, 
  Thermometer, 
  Navigation, 
  Bell, 
  Settings, 
  User, 
  Phone, 
  MessageCircle, 
  Shield,
  Zap,
  Target,
  AlertCircle,
  Battery,
  Signal,
  TrendingUp,
  Package,
  Activity,
  Wifi,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Gauge,
  Radio,
  RefreshCw,
  Truck,
  BarChart3,
  DollarSign,
  Star,
  Route as RouteIcon,
  Timer,
  CheckCircle,
  Fuel as FuelIcon,
  Navigation2,
  Calendar,
  FileText,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ModernDriverHeaderProps {
  onToggleSidebar?: () => void;
}

const ModernDriverHeader: React.FC<ModernDriverHeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced driver data simulation
  const driverData = {
    name: "Sarah Martinez",
    id: "DRV-2024",
    avatar: "/api/placeholder/48/48",
    status: "In Transit",
    currentLocation: "I-95, Mile 147, Virginia",
    nextDestination: "Washington DC Distribution Center",
    eta: "14:30",
    etaStatus: "on-time", // early, on-time, delayed
    hoursRemaining: "7h 45m",
    fuelLevel: 82,
    temperature: "68°F",
    weather: "Partly Cloudy",
    currentSpeed: "65 MPH",
    speedLimit: "70 MPH",
    batteryLevel: 94,
    signalStrength: 4,
    notifications: 7,
    urgentAlerts: 1,
    loadProgress: 73,
    milesCompleted: 387,
    milesRemaining: 142,
    todayEarnings: "$428.50",
    todayMiles: 387,
    avgMpg: "7.8 MPG",
    safetyScore: 98,
    efficiency: 94,
    nextBreak: "1h 45m",
    vehicleNumber: "TRK-1247",
    trailerNumber: "TRL-0956"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'early': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'on-time': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'delayed': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        
        {/* Top Status Bar with full width */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b border-border/20">
          <div className="w-full px-4 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-medium">{formatTime(currentTime)}</span>
                  <span className="hidden md:inline text-xs">•</span>
                  <span className="hidden md:inline text-xs">{formatDate(currentTime)}</span>
                </div>
                
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Wifi className={`w-4 h-4 ${driverData.signalStrength >= 3 ? 'text-green-500' : 'text-yellow-500'}`} />
                    <span className="text-xs font-medium">{driverData.signalStrength}/5 Signal</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Battery className={`w-4 h-4 ${driverData.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-xs font-medium">{driverData.batteryLevel}% Battery</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium">{driverData.temperature}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/10 text-green-600 border-green-200 text-xs">
                  System Optimal
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-6 w-6 p-0"
                >
                  {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header with full width */}
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between py-4">
            
            {/* Left Section - Brand & Menu */}
            <div className="flex items-center space-x-4">
              {onToggleSidebar && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onToggleSidebar}
                  className="lg:hidden p-2"
                >
                  <Package className="w-5 h-5" />
                </Button>
              )}
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                      <Truck className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    Driver Hub
                  </h1>
                  <p className="text-sm text-muted-foreground">Professional Transport Portal</p>
                </div>
              </div>
            </div>

            {/* Center Section - Search & Driver Info */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="space-y-3">
                {/* Search Bar */}
                <div className="relative">
                  {showSearch ? (
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search routes, loads, documents, contacts..."
                          className="pl-10 bg-muted/40 border-border/60 focus:border-primary/60"
                          autoFocus
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSearch(false)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setShowSearch(true)}
                      className="w-full justify-start text-muted-foreground bg-muted/20 border-border/60 hover:bg-muted/40"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      <span>Quick search...</span>
                    </Button>
                  )}
                </div>

                {/* Driver Status Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200/60">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600/80">Status</p>
                          <p className="text-sm font-semibold text-blue-700">{driverData.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 border-green-200/60">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <Timer className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600/80">HOS Left</p>
                          <p className="text-sm font-semibold text-green-700">{driverData.hoursRemaining}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200/60">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-orange-600/80">Today</p>
                          <p className="text-sm font-semibold text-orange-700">{driverData.todayEarnings}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200/60">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-purple-600/80">Safety</p>
                          <p className="text-sm font-semibold text-purple-700">{driverData.safetyScore}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Section - Controls & Profile */}
            <div className="flex items-center space-x-3">
              
              {/* Fuel Status */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-3 bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-900/30 border-amber-200/60">
                    <div className="flex items-center space-x-3">
                      <FuelIcon className={`w-5 h-5 ${driverData.fuelLevel > 25 ? 'text-amber-600' : 'text-red-500 animate-pulse'}`} />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-amber-700">{driverData.fuelLevel}%</span>
                          <div className="w-12 h-2 bg-amber-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 rounded-full ${
                                driverData.fuelLevel > 50 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                driverData.fuelLevel > 25 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                'bg-gradient-to-r from-red-400 to-red-500'
                              }`}
                              style={{ width: `${driverData.fuelLevel}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-amber-600/80">{driverData.avgMpg}</p>
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fuel Level: {driverData.fuelLevel}% • Efficiency: {driverData.avgMpg}</p>
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="relative h-12 w-12 p-0"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className={`w-5 h-5 ${driverData.notifications > 0 ? 'text-orange-500' : ''}`} />
                      {driverData.notifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                          {driverData.notifications}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{driverData.notifications} notifications</p>
                  </TooltipContent>
                </Tooltip>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <Card className="absolute right-0 top-14 w-80 z-50 shadow-xl border bg-background/95 backdrop-blur">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Notifications</h3>
                        <Badge className="bg-red-100 text-red-700 text-xs">{driverData.notifications}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <p className="text-sm font-medium text-red-800">Route Update</p>
                          <p className="text-xs text-red-600">Traffic incident ahead - alternate route suggested</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <p className="text-sm font-medium text-blue-800">Delivery Confirmation</p>
                          <p className="text-xs text-blue-600">Customer signed for delivery #DL-2024-1247</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <p className="text-sm font-medium text-yellow-800">Maintenance Reminder</p>
                          <p className="text-xs text-yellow-600">Oil change due in 500 miles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Driver Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={driverData.avatar} alt={driverData.name} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold">
                        {driverData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{driverData.name}</p>
                      <p className="text-xs text-muted-foreground">{driverData.id}</p>
                      <p className="text-xs text-muted-foreground">{driverData.vehicleNumber} • {driverData.trailerNumber}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/driver/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/driver/documents')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Documents</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/driver/communication/emergency')}>
                    <Phone className="mr-2 h-4 w-4 text-red-500" />
                    <span>Emergency</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Enhanced Info Bar */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50 border-t border-border/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 py-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Current Location</p>
                  <p className="font-medium truncate">{driverData.currentLocation}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Navigation2 className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Next Stop</p>
                  <p className="font-medium truncate">{driverData.nextDestination}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-medium">{driverData.eta}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <RouteIcon className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={driverData.loadProgress} className="w-16 h-2" />
                    <span className="text-xs font-medium">{driverData.loadProgress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Miles Today</p>
                  <p className="font-medium">{driverData.todayMiles}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                  <p className="font-medium">{driverData.efficiency}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default ModernDriverHeader;