import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Route,
  Package,
  Truck,
  FileText,
  MessageSquare,
  BarChart3,
  DollarSign,
  Settings,
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Shield,
  Calendar,
  PieChart,
  TrendingUp,
  Fuel,
  Wrench,
  Users,
  Star,
  Timer,
  Archive,
  History,
  Target,
  Activity,
  Battery,
  Zap,
  HelpCircle,
  Bell,
  Gauge,
  Map,
  Compass,
  Radio,
  Camera,
  Headphones,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Heart,
  Award,
  BookOpen,
  Briefcase,
  Globe,
  Monitor,
  CreditCard,
  Building,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Enhanced driver menu data
const driverMenuData = {
  main: [
    { 
      title: "Dashboard", 
      url: "/driver", 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      title: "Active Route", 
      url: "/driver/routes/active", 
      icon: Navigation,
      badge: { text: "LIVE", color: "bg-green-500" }
    },
    { 
      title: "Current Load", 
      url: "/driver/loads/current", 
      icon: Package,
      badge: { text: "73%", color: "bg-blue-500" }
    }
  ],
  
  routes: [
    { title: "Route Planner", url: "/driver/routes/planner", icon: Map },
    { title: "Route History", url: "/driver/routes/history", icon: History },
    { title: "Route Optimizer", url: "/driver/routes/optimizer", icon: Target },
    { title: "Navigation", url: "/driver/routes/navigation", icon: Compass }
  ],

  loads: [
    { title: "Available Loads", url: "/driver/loads/available", icon: Search },
    { title: "Booked Loads", url: "/driver/loads/booked", icon: CheckCircle },
    { title: "In Transit", url: "/driver/loads/in-transit", icon: Truck },
    { title: "Delivered", url: "/driver/loads/delivered", icon: Archive },
    { title: "Load History", url: "/driver/loads/history", icon: Clock }
  ],

  vehicle: [
    { title: "Vehicle Status", url: "/driver/vehicle/status", icon: Gauge },
    { title: "Fuel Management", url: "/driver/vehicle/fuel", icon: Fuel },
    { title: "Maintenance Log", url: "/driver/vehicle/maintenance", icon: Wrench },
    { title: "Diagnostics", url: "/driver/vehicle/diagnostics", icon: Activity },
    { title: "Inspections", url: "/driver/vehicle/inspections", icon: Shield }
  ],

  communication: [
    { 
      title: "Dispatch Chat", 
      url: "/driver/communication/dispatch", 
      icon: MessageSquare,
      badge: { text: "3", color: "bg-red-500" }
    },
    { title: "Customer Contact", url: "/driver/communication/customer", icon: Phone },
    { title: "Emergency", url: "/driver/communication/emergency", icon: AlertTriangle },
    { title: "Driver Network", url: "/driver/communication/network", icon: Users }
  ],

  documents: [
    { title: "HOS Logs", url: "/driver/documents/hos", icon: Clock },
    { title: "Trip Reports", url: "/driver/documents/reports", icon: FileText },
    { title: "Receipts", url: "/driver/documents/receipts", icon: CreditCard },
    { title: "BOL/POD", url: "/driver/documents/bol", icon: Archive },
    { title: "Digital Forms", url: "/driver/documents/forms", icon: Download }
  ],

  performance: [
    { title: "Earnings", url: "/driver/performance/earnings", icon: DollarSign },
    { title: "Efficiency", url: "/driver/performance/efficiency", icon: TrendingUp },
    { title: "Safety Score", url: "/driver/performance/safety", icon: Shield },
    { title: "Metrics", url: "/driver/performance/metrics", icon: BarChart3 }
  ],

  tools: [
    { title: "Truck Stops", url: "/driver/tools/truck-stops", icon: Building },
    { title: "Repair Shops", url: "/driver/tools/repair", icon: Wrench },
    { title: "Fuel Prices", url: "/driver/services/fuel-prices", icon: Fuel },
    { title: "Weather", url: "/driver/services/weather", icon: Globe },
    { title: "Traffic", url: "/driver/tools/traffic", icon: MapPin }
  ]
};

// Driver status data
const driverStatus = {
  name: "Sarah Martinez",
  id: "DRV-2024",
  status: "On Route",
  hoursRemaining: "7h 45m",
  nextBreak: "1h 45m",
  todayEarnings: "$428.50",
  todayMiles: 387,
  safetyScore: 98,
  efficiency: 94,
  fuelLevel: 82,
  nextDelivery: "14:30"
};

export function ModernDriverSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState(['main', 'routes', 'loads']);
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: unknown[]) => items.some(item => isActive(item.url));

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  return (
    <Sidebar className={cn("transition-all duration-300 border-r border-border/50", collapsed ? "w-16" : "w-80")}>
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Driver Hub
              </h2>
              <p className="text-xs text-muted-foreground">Professional Portal</p>
            </div>
          </div>
        )}
        <SidebarTrigger className="h-8 w-8" />
      </div>

      <SidebarContent className="space-y-4 p-4">
        {/* Driver Status Card */}
        {!collapsed && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/60">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">{driverStatus.name}</p>
                    <p className="text-xs text-blue-600/70 dark:text-blue-300/70">{driverStatus.id}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                    {driverStatus.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-blue-600/70 dark:text-blue-300/70">HOS Left</p>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">{driverStatus.hoursRemaining}</p>
                  </div>
                  <div>
                    <p className="text-blue-600/70 dark:text-blue-300/70">Next Break</p>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">{driverStatus.nextBreak}</p>
                  </div>
                  <div>
                    <p className="text-blue-600/70 dark:text-blue-300/70">Today</p>
                    <p className="font-semibold text-green-700 dark:text-green-400">{driverStatus.todayEarnings}</p>
                  </div>
                  <div>
                    <p className="text-blue-600/70 dark:text-blue-300/70">Safety</p>
                    <p className="font-semibold text-purple-700 dark:text-purple-400">{driverStatus.safetyScore}%</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-600/70 dark:text-blue-300/70">Fuel Level</span>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">{driverStatus.fuelLevel}%</span>
                  </div>
                  <Progress value={driverStatus.fuelLevel} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "•••" : "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950/30 dark:to-red-950/30 text-orange-700 dark:text-orange-400 border-l-4 border-orange-500"
                            : "hover:bg-muted/60 hover:scale-[1.02]"
                        )
                      }
                    >
                      <item.icon className={cn("w-5 h-5", isActive(item.url) ? "text-orange-500" : "text-muted-foreground")} />
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge className={cn("text-xs text-white border-0", item.badge.color)}>
                              {item.badge.text}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Route Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "R" : "Route Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-blue-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Load Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "L" : "Load Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.loads.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-green-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Vehicle & Fleet */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "V" : "Vehicle & Fleet"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.vehicle.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-purple-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Communication */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "C" : "Communication"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.communication.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-red-500" : "text-muted-foreground")} />
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge className={cn("text-xs text-white border-0", item.badge.color)}>
                              {item.badge.text}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Documents & Compliance */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "D" : "Documents"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.documents.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-amber-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Performance & Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "P" : "Performance"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.performance.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-emerald-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools & Services */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {collapsed ? "T" : "Tools & Services"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverMenuData.tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400"
                            : "hover:bg-muted/60"
                        )
                      }
                    >
                      <item.icon className={cn("w-4 h-4", isActive(item.url) ? "text-indigo-500" : "text-muted-foreground")} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Emergency Contact - Always Visible */}
        {!collapsed && (
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200/60 mt-auto">
            <CardContent className="p-3 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">Emergency</span>
                </div>
                <div className="text-lg font-bold text-red-700 dark:text-red-400">1-800-DRIVER</div>
                <div className="text-xs text-red-600/70 dark:text-red-300/70">24/7 Support</div>
              </div>
            </CardContent>
          </Card>
        )}
      </SidebarContent>
    </Sidebar>
  );
}