import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import LoadDetailsModal from '@/components/driver/LoadDetailsModal';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Truck, MapPin, Clock, DollarSign, AlertTriangle, CheckCircle, Navigation, Fuel, Phone, FileText, Calendar, Activity, Target, TrendingUp, Settings, Bell, User, Route, Zap, Shield, Star, ArrowRight, PlayCircle, PauseCircle, Timer, TrendingDown, Award, Sparkles, ChevronRight, Eye, BarChart3 } from 'lucide-react';
const DriverDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoadDetailsOpen, setIsLoadDetailsOpen] = useState(false);
  const [autonomousImprovements, setAutonomousImprovements] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    hoursRemaining: 8.5,
    earnings: {
      today: 485,
      week: 2840
    },
    milesThisWeek: 2847,
    location: "Dallas, TX",
    loadProgress: 65,
    fuelLevel: 75,
    nextMaintenance: "2,500 miles"
  });
  const {
    toast
  } = useToast();

  // Autonomous improvements timer - simulates real database updates
  useEffect(() => {
    const improvementTimer = setInterval(() => {
      setAutonomousImprovements(prev => prev + 1);

      // Simulate real-time data updates from autonomous agents
      setRealTimeData(prev => ({
        ...prev,
        hoursRemaining: Math.max(0, prev.hoursRemaining - 0.01),
        earnings: {
          ...prev.earnings,
          today: prev.earnings.today + Math.floor(Math.random() * 5),
          week: prev.earnings.week + Math.floor(Math.random() * 5)
        },
        milesThisWeek: prev.milesThisWeek + Math.floor(Math.random() * 3),
        loadProgress: Math.min(100, prev.loadProgress + Math.random()),
        fuelLevel: Math.max(0, prev.fuelLevel - Math.random() * 0.5)
      }));

      // Show autonomous improvement notifications
      if (autonomousImprovements % 10 === 0) {
        const improvements = ["Route optimization completed - 12 minutes saved", "Fuel efficiency improved by autonomous analysis", "Load tracking accuracy enhanced", "Performance metrics updated with AI insights", "Navigation system optimized for traffic patterns", "HOS calculations refined with machine learning"];
        toast({
          title: "🤖 Autonomous Improvement Applied",
          description: improvements[Math.floor(Math.random() * improvements.length)],
          duration: 3000
        });
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(improvementTimer);
  }, [autonomousImprovements, toast]);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic driver data updated by autonomous agents
  const driverInfo = {
    name: "John Smith",
    id: "DRV-001",
    status: "On Duty",
    location: "Dallas, TX",
    truck: "Truck #47",
    hoursRemaining: 8.5,
    milesThisWeek: 2847,
    earnings: {
      today: 485,
      week: 2840,
      month: 12450
    }
  };
  const currentLoad = {
    id: "LD-2024-001",
    pickup: "Dallas, TX",
    delivery: "Atlanta, GA",
    distance: "925 miles",
    dueDate: "Tomorrow 14:00",
    rate: "$2,450",
    status: "In Transit",
    progress: 65
  };
  const todayTasks = [{
    id: 1,
    type: "pickup",
    location: "Walmart DC - Dallas",
    time: "08:00",
    status: "completed",
    description: "Load pickup complete"
  }, {
    id: 2,
    type: "break",
    location: "Rest Area - Mile 340",
    time: "11:30",
    status: "completed",
    description: "Mandatory 30-min break"
  }, {
    id: 3,
    type: "fuel",
    location: "Flying J - Little Rock",
    time: "15:00",
    status: "upcoming",
    description: "Fuel stop planned"
  }, {
    id: 4,
    type: "delivery",
    location: "Home Depot - Atlanta",
    time: "Tomorrow 13:00",
    status: "upcoming",
    description: "Final delivery"
  }];

  // Dynamic alerts updated by autonomous agents
  const alerts = [{
    type: "success",
    message: `Fuel level at ${Math.round(realTimeData.fuelLevel)}% - Auto-optimized route saves 15 minutes`,
    priority: "low"
  }, {
    type: "info",
    message: "AI Traffic Analysis: Clear route ahead, maintaining optimal speed",
    priority: "low"
  }, {
    type: "warning",
    message: `HOS: ${realTimeData.hoursRemaining.toFixed(1)} hours remaining - Auto-break scheduled`,
    priority: "medium"
  }, {
    type: "success",
    message: "Autonomous Route Optimization: Delivery time improved by 22 minutes",
    priority: "low"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Duty':
        return 'bg-green-100 text-green-800';
      case 'Off Duty':
        return 'bg-gray-100 text-gray-800';
      case 'Driving':
        return 'bg-blue-100 text-blue-800';
      case 'Sleeper':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'pickup':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'delivery':
        return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'fuel':
        return <Fuel className="h-4 w-4 text-orange-600" />;
      case 'break':
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  return <div className="container-responsive space-y-8 animate-fade-in">
      {/* Enhanced Autonomous Banner with Glassmorphism */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 animate-pulse" />
        
      </Card>

      {/* Enhanced Header with Smart Layout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              Driver Hub
            </h1>
            
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-lg text-muted-foreground font-medium">
              Welcome back, <span className="text-foreground font-semibold">{driverInfo.name}</span>
            </p>
            <Separator orientation="vertical" className="hidden sm:block h-5" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
      </div>

      {/* Enhanced Quick Stats with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-100/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-blue-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/5 group-hover:from-blue-400/20 group-hover:to-indigo-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">HOS Remaining</p>
                <p className="text-3xl font-black text-blue-900 dark:text-blue-100">
                  {realTimeData.hoursRemaining.toFixed(1)}<span className="text-lg font-semibold text-blue-600">h</span>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Until mandatory break</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Timer className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-emerald-100/40 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-emerald-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/5 group-hover:from-emerald-400/20 group-hover:to-green-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Today's Earnings</p>
                <p className="text-3xl font-black text-emerald-900 dark:text-emerald-100">
                  ${realTimeData.earnings.today}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+12% vs yesterday</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-50/80 via-violet-50/60 to-purple-100/40 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-purple-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-400/5 group-hover:from-purple-400/20 group-hover:to-violet-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Weekly Miles</p>
                <p className="text-3xl font-black text-purple-900 dark:text-purple-100">
                  {(realTimeData.milesThisWeek / 1000).toFixed(1)}<span className="text-lg font-semibold text-purple-600">K</span>
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Target: 3.2K miles</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Route className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-orange-100/40 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-orange-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/5 group-hover:from-orange-400/20 group-hover:to-amber-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wide">Current Location</p>
                <p className="text-lg font-black text-orange-900 dark:text-orange-100 leading-tight">
                  {driverInfo.location}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Updated 2 min ago</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Active Load with Advanced UI */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/40 dark:from-slate-950/50 dark:via-gray-950/30 dark:to-slate-900/20 backdrop-blur-sm shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-purple-400/5" />
        <CardHeader className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Current Active Load</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">Live tracking and shipment management</CardDescription>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700 px-3 py-1.5 font-semibold shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                {currentLoad.status}
              </Badge>
              <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300 dark:border-green-600 px-3 py-1.5">
                <DollarSign className="w-3 h-3 mr-1" />
                High Value
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Load ID</p>
              <p className="text-lg font-bold text-foreground">{currentLoad.id}</p>
              <Badge variant="outline" className="text-xs w-fit">Priority</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Route</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-foreground leading-tight">{currentLoad.pickup}</p>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <p className="text-lg font-bold text-foreground leading-tight">{currentLoad.delivery}</p>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{currentLoad.distance}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Distance</p>
              <p className="text-lg font-bold text-foreground">{currentLoad.distance}</p>
              <p className="text-xs text-blue-600 font-medium">Optimal route</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Load Rate</p>
              <p className="text-lg font-bold text-emerald-600">{currentLoad.rate}</p>
              <p className="text-xs text-emerald-600 font-medium">Above market avg</p>
            </div>
          </div>
          
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Delivery Progress</span>
                <Badge variant="outline" className="text-xs">Live tracking</Badge>
              </div>
              <span className="text-sm font-bold text-foreground">{Math.round(realTimeData.loadProgress)}%</span>
            </div>
            <div className="relative">
              <Progress value={realTimeData.loadProgress} className="h-3 bg-slate-200 dark:bg-slate-800" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full" />
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground font-medium">
                <Clock className="w-4 h-4 inline mr-1" />
                Due: {currentLoad.dueDate}
              </p>
              <p className="text-emerald-600 font-semibold">On schedule</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="default" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg transition-all duration-200">
              <Navigation className="h-4 w-4 mr-2" />
              Start Navigation
            </Button>
            <Button variant="outline" size="default" className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
              <Phone className="h-4 w-4 mr-2" />
              Contact Dispatcher
            </Button>
            <Button variant="outline" size="default" onClick={() => setIsLoadDetailsOpen(true)} className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 group">
              <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              View Full Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Today's Schedule */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-100/60 dark:from-slate-950/70 dark:via-slate-900/50 dark:to-slate-800/30 backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 to-gray-400/5" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center shadow-md">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">Today's Schedule</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">Your planned activities and stops</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-3">
            {todayTasks.map((task, index) => <div key={task.id} className={cn("group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md", task.status === 'completed' ? "bg-green-50/50 dark:bg-green-950/20 border-green-200/60 dark:border-green-800/40" : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-700/40 hover:bg-slate-100/70 dark:hover:bg-slate-700/50")}>
                <div className="flex items-center gap-4">
                  <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-110", task.status === 'completed' ? "bg-green-100 dark:bg-green-900/50" : "bg-slate-100 dark:bg-slate-800")}>
                    {getTaskIcon(task.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-foreground leading-tight">{task.description}</p>
                    <p className="text-sm text-muted-foreground font-medium">{task.location}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-foreground">{task.time}</p>
                    <Badge variant={task.status === 'completed' ? 'default' : 'outline'} className={cn("text-xs font-semibold", task.status === 'completed' ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700" : "border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300")}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
                {index < todayTasks.length - 1 && <div className="absolute -bottom-0.5 left-14 right-4 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-transparent dark:from-slate-700 dark:via-slate-600 dark:to-transparent" />}
              </div>)}
            <Button variant="outline" className="w-full mt-4 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Alerts & Notifications */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-red-50/40 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-red-950/10 backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-400/5" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center shadow-md">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">Alerts & Intelligence</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">AI-powered insights and notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-3">
            {alerts.map((alert, index) => <div key={index} className={cn("group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md", alert.priority === 'high' && "bg-red-50/50 dark:bg-red-950/20 border-red-200/60 dark:border-red-800/40", alert.priority === 'medium' && "bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200/60 dark:border-yellow-800/40", alert.priority === 'low' && "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-800/40")}>
                <div className="flex items-start gap-3">
                  <div className={cn("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-110", alert.priority === 'high' && "bg-red-100 dark:bg-red-900/50", alert.priority === 'medium' && "bg-yellow-100 dark:bg-yellow-900/50", alert.priority === 'low' && "bg-blue-100 dark:bg-blue-900/50")}>
                    <AlertTriangle className={cn("h-4 w-4", alert.priority === 'high' && "text-red-600 dark:text-red-400", alert.priority === 'medium' && "text-yellow-600 dark:text-yellow-400", alert.priority === 'low' && "text-blue-600 dark:text-blue-400")} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground leading-relaxed">{alert.message}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-xs font-semibold", alert.priority === 'high' && "border-red-300 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300 dark:border-red-600", alert.priority === 'medium' && "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-600", alert.priority === 'low' && "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-600")}>
                    {alert.priority}
                  </Badge>
                </div>
              </div>)}
            
            <div className="pt-3 space-y-2">
              <Button variant="outline" className="w-full border-orange-300 hover:bg-orange-50 dark:border-orange-600 dark:hover:bg-orange-900/20">
                <Bell className="h-4 w-4 mr-2" />
                View All Notifications
              </Button>
              <Button variant="outline" size="sm" className="w-full border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
                <Settings className="h-4 w-4 mr-2" />
                Alert Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Performance Summary */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-indigo-50/40 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-indigo-950/10 backdrop-blur-sm shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 via-purple-400/5 to-indigo-400/5" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Weekly Performance Analytics</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">AI-driven insights and achievements</CardDescription>
              </div>
            </div>
            <Badge className="bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 border-violet-200 dark:border-violet-700 px-3 py-1.5">
              <Star className="w-3 h-3 mr-1" />
              Top Performer
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative text-center p-6 bg-gradient-to-br from-emerald-100/80 to-green-100/60 dark:from-emerald-950/40 dark:to-green-950/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/5 rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-black text-emerald-800 dark:text-emerald-200 mb-1">
                  ${realTimeData.earnings.week.toLocaleString()}
                </p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Weekly Earnings</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-medium mt-1">+15% vs last week</p>
              </div>
            </div>
            
            <div className="group relative text-center p-6 bg-gradient-to-br from-blue-100/80 to-indigo-100/60 dark:from-blue-950/40 dark:to-indigo-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/5 rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-black text-blue-800 dark:text-blue-200 mb-1">94.5%</p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">On-Time Delivery</p>
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mt-1">Industry leading</p>
              </div>
            </div>
            
            <div className="group relative text-center p-6 bg-gradient-to-br from-purple-100/80 to-violet-100/60 dark:from-purple-950/40 dark:to-violet-950/30 rounded-2xl border border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-400/5 rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Fuel className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-black text-purple-800 dark:text-purple-200 mb-1">7.2</p>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">MPG Average</p>
                <p className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium mt-1">Excellent efficiency</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-violet-300 text-violet-700 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                Performance Trending Up
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-600">
                <Shield className="w-3 h-3 mr-1" />
                Safety Certified
              </Badge>
            </div>
            <Button variant="outline" className="border-violet-300 hover:bg-violet-50 dark:border-violet-600 dark:hover:bg-violet-900/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Load Details Modal */}
      <LoadDetailsModal isOpen={isLoadDetailsOpen} onClose={() => setIsLoadDetailsOpen(false)} loadId={currentLoad.id} />
    </div>;
};
export default DriverDashboard;