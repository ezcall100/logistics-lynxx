/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  DollarSign, 
  MapPin, 
  Package, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Navigation,
  Fuel,
  Shield,
  BarChart3,
  Calendar,
  Users,
  FileText,
  Star,
  Target,
  Zap,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import EnhancedCard from '@/components/shared/EnhancedCard';
import EnhancedContainer from '@/components/shared/EnhancedContainer';

const OwnerOperatorDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for the dashboard
  const dashboardData = {
    quickStats: {
      activeLoads: 3,
      weeklyRevenue: 12847,
      monthlyRevenue: 52340,
      milesThisWeek: 2847,
      hoursRemaining: 7.5,
      fuelLevel: 68,
      safetyScore: 98.5,
      onTimeDelivery: 96.2
    },
    activeLoads: [
      {
        id: 'OO-8847',
        pickup: 'Chicago, IL',
        delivery: 'Nashville, TN',
        revenue: 2847,
        miles: 387,
        eta: '2h 45m',
        status: 'in-transit',
        priority: 'high'
      },
      {
        id: 'OO-8848',
        pickup: 'Nashville, TN',
        delivery: 'Atlanta, GA',
        revenue: 1650,
        miles: 248,
        eta: '6h 15m',
        status: 'scheduled',
        priority: 'medium'
      }
    ],
    weeklyEarnings: [
      { day: 'Mon', earnings: 2400, miles: 450 },
      { day: 'Tue', earnings: 2100, miles: 380 },
      { day: 'Wed', earnings: 2800, miles: 520 },
      { day: 'Thu', earnings: 1900, miles: 340 },
      { day: 'Fri', earnings: 2647, miles: 487 },
      { day: 'Sat', earnings: 1000, miles: 180 },
      { day: 'Sun', earnings: 0, miles: 0 }
    ],
    expenses: [
      { name: 'Fuel', value: 1200, color: '#ff6b6b' },
      { name: 'Maintenance', value: 450, color: '#4ecdc4' },
      { name: 'Insurance', value: 300, color: '#45b7d1' },
      { name: 'Other', value: 150, color: '#96ceb4' }
    ]
  };

  const alerts = [
    { id: 1, type: 'urgent', message: 'Load pickup in 30 minutes - Chicago Warehouse', time: '10 min ago' },
    { id: 2, type: 'maintenance', message: 'Oil change due in 500 miles', time: '2 hours ago' },
    { id: 3, type: 'payment', message: 'Payment of $2,847 processed successfully', time: '4 hours ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-500';
      case 'scheduled': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300';
    }
  };

  return (
    <EnhancedContainer portal="owner" className="min-h-screen">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-background/80 border border-border/30 p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/5"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Owner-Operator Command Center
            </h1>
            <p className="text-muted-foreground text-responsive-base">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="backdrop-blur-sm bg-background/50 border-primary/30 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            <Button variant="outline" className="gap-2 backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all">
              <Target className="h-4 w-4" />
              Route Optimizer
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Active Loads</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{dashboardData.quickStats.activeLoads}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {dashboardData.quickStats.milesThisWeek} miles this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Weekly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              ${dashboardData.quickStats.weeklyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">HOS Remaining</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {dashboardData.quickStats.hoursRemaining}h
            </div>
            <Progress value={(dashboardData.quickStats.hoursRemaining / 14) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Safety Score</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {dashboardData.quickStats.safetyScore}%
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              Excellent rating
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loads">Active Loads</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Active Loads Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Active Loads
                </CardTitle>
                <CardDescription>Current shipments in progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.activeLoads.map((load) => (
                  <div key={load.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(load.priority)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{load.id}</Badge>
                        <Badge className={getStatusColor(load.status)}>
                          {load.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="text-lg font-bold">${load.revenue.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {load.pickup} → {load.delivery}
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        ETA: {load.eta}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {load.miles} miles
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts & Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start gap-2">
                      {alert.type === 'urgent' && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                      {alert.type === 'maintenance' && <Truck className="h-4 w-4 text-orange-500 mt-0.5" />}
                      {alert.type === 'payment' && <DollarSign className="h-4 w-4 text-green-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Performance
              </CardTitle>
              <CardDescription>Earnings and miles driven this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.weeklyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'earnings' ? `$${value}` : `${value} miles`,
                      name === 'earnings' ? 'Earnings' : 'Miles'
                    ]} />
                    <Bar dataKey="earnings" fill="#8b5cf6" />
                    <Bar dataKey="miles" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loads" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Load Management Center</CardTitle>
                <CardDescription>Manage your active and upcoming loads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.activeLoads.map((load) => (
                    <div key={load.id} className="p-6 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">#{load.id}</Badge>
                          <Badge className={getStatusColor(load.status)}>
                            {load.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`${load.priority === 'high' ? 'border-red-500 text-red-700' : load.priority === 'medium' ? 'border-yellow-500 text-yellow-700' : 'border-green-500 text-green-700'}`}>
                            {load.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${load.revenue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">${(load.revenue / load.miles).toFixed(2)}/mile</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            Pickup Location
                          </div>
                          <div className="pl-6 text-sm text-muted-foreground">{load.pickup}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Delivery Location
                          </div>
                          <div className="pl-6 text-sm text-muted-foreground">{load.delivery}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-orange-500" />
                            ETA
                          </div>
                          <div className="pl-6 text-sm text-muted-foreground">{load.eta}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Documents
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-Time Delivery</span>
                    <span>{dashboardData.quickStats.onTimeDelivery}%</span>
                  </div>
                  <Progress value={dashboardData.quickStats.onTimeDelivery} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Safety Score</span>
                    <span>{dashboardData.quickStats.safetyScore}%</span>
                  </div>
                  <Progress value={dashboardData.quickStats.safetyScore} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Efficiency</span>
                    <span>7.2 MPG</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.expenses}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}`}
                      >
                        {dashboardData.expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Fuel Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold">{dashboardData.quickStats.fuelLevel}%</div>
                  <Progress value={dashboardData.quickStats.fuelLevel} className="h-3" />
                  <p className="text-sm text-muted-foreground">Approximately 420 miles remaining</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehicle Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engine</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Good</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tires</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Check Soon</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Brakes</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Maintenance Due
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Oil Change</div>
                    <div className="text-muted-foreground">500 miles</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">DOT Inspection</div>
                    <div className="text-muted-foreground">45 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  ${dashboardData.quickStats.monthlyRevenue.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  ${(dashboardData.quickStats.monthlyRevenue * 0.65).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  65% profit margin
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">85%</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Industry average: 95%
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </EnhancedContainer>
  );
};

export default OwnerOperatorDashboard;