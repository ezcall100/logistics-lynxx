import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Users, 
  Package, 
  Truck, 
  DollarSign, 
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Globe,
  Sparkles,
  Target,
  Settings,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Shield,
  Cpu,
  Database,
  Network,
  Gauge,
  Calendar,
  MessageCircle,
  FileText,
  PhoneCall,
  Mail,
  Star,
  Filter,
  Search,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Bookmark,
  Eye,
  MoreHorizontal
} from 'lucide-react';

const EnhancedDashboard = () => {
  const { selectedRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const getDashboardConfig = () => {
    const configs = {
      super_admin: {
        title: 'AI Command Center',
        subtitle: 'Orchestrating 250 autonomous agents across all portals',
        theme: 'from-purple-500/10 to-violet-500/10',
        accentColor: 'text-purple-600',
        bgGradient: 'from-purple-500 to-violet-500',
        primaryIcon: Brain,
        tabs: [
          { id: 'overview', label: 'Overview', icon: Globe },
          { id: 'agents', label: 'AI Agents', icon: Brain },
          { id: 'health', label: 'System Health', icon: Activity },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ],
        stats: [
          { title: 'Active Agents', value: '250', change: '+12.5%', icon: Brain, trend: 'up', description: 'AI agents running 24/7' },
          { title: 'System Health', value: '99.8%', change: '+0.3%', icon: Activity, trend: 'up', description: 'Overall system performance' },
          { title: 'Portals Online', value: '6/6', change: '100%', icon: Globe, trend: 'stable', description: 'All portals operational' },
          { title: 'Tasks Completed', value: '1,847', change: '+23.7%', icon: CheckCircle, trend: 'up', description: 'Tasks completed today' }
        ]
      },
      carrier_admin: {
        title: 'Fleet Command Center',
        subtitle: 'AI-powered fleet management and optimization',
        theme: 'from-blue-500/10 to-cyan-500/10',
        accentColor: 'text-blue-600',
        bgGradient: 'from-blue-500 to-cyan-500',
        primaryIcon: Truck,
        tabs: [
          { id: 'overview', label: 'Fleet Overview', icon: Truck },
          { id: 'shipments', label: 'Shipments', icon: Package },
          { id: 'drivers', label: 'Drivers', icon: Users },
          { id: 'analytics', label: 'Performance', icon: BarChart3 }
        ],
        stats: [
          { title: 'Active Vehicles', value: '127', change: '+8.2%', icon: Truck, trend: 'up', description: 'Vehicles on the road' },
          { title: 'Fleet Utilization', value: '94.5%', change: '+5.3%', icon: TrendingUp, trend: 'up', description: 'Asset efficiency rate' },
          { title: 'Fuel Efficiency', value: '12.3 MPG', change: '+7.8%', icon: Zap, trend: 'up', description: 'Average fleet MPG' },
          { title: 'Revenue Today', value: '$24,850', change: '+15.2%', icon: DollarSign, trend: 'up', description: 'Daily revenue generated' }
        ]
      },
      freight_broker_admin: {
        title: 'Brokerage Hub',
        subtitle: 'Smart load matching and rate optimization',
        theme: 'from-emerald-500/10 to-green-500/10',
        accentColor: 'text-emerald-600',
        bgGradient: 'from-emerald-500 to-green-500',
        primaryIcon: Target,
        tabs: [
          { id: 'overview', label: 'Load Board', icon: Package },
          { id: 'matches', label: 'Matches', icon: Target },
          { id: 'rates', label: 'Rates', icon: DollarSign },
          { id: 'analytics', label: 'Performance', icon: BarChart3 }
        ],
        stats: [
          { title: 'Active Loads', value: '89', change: '+18.4%', icon: Package, trend: 'up', description: 'Loads waiting for carriers' },
          { title: 'Match Rate', value: '96.7%', change: '+2.1%', icon: Target, trend: 'up', description: 'AI matching accuracy' },
          { title: 'Avg Margin', value: '15.8%', change: '+3.2%', icon: TrendingUp, trend: 'up', description: 'Profit margin per load' },
          { title: 'Revenue Today', value: '$67,420', change: '+22.1%', icon: DollarSign, trend: 'up', description: 'Daily brokerage revenue' }
        ]
      },
      shipper_admin: {
        title: 'Shipping Operations',
        subtitle: 'Streamlined logistics and shipment tracking',
        theme: 'from-orange-500/10 to-amber-500/10',
        accentColor: 'text-orange-600',
        bgGradient: 'from-orange-500 to-amber-500',
        primaryIcon: Package,
        tabs: [
          { id: 'overview', label: 'Shipments', icon: Package },
          { id: 'tracking', label: 'Tracking', icon: MapPin },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'analytics', label: 'Reports', icon: BarChart3 }
        ],
        stats: [
          { title: 'Shipments Today', value: '156', change: '+11.3%', icon: Package, trend: 'up', description: 'Shipments processed today' },
          { title: 'On-Time Rate', value: '98.2%', change: '+1.7%', icon: Clock, trend: 'up', description: 'Delivery performance' },
          { title: 'Cost Savings', value: '$8,950', change: '+25.4%', icon: DollarSign, trend: 'up', description: 'AI optimization savings' },
          { title: 'Customer Score', value: '4.9/5', change: '+0.2', icon: Users, trend: 'up', description: 'Customer satisfaction' }
        ]
      },
      carrier_driver: {
        title: 'Driver Dashboard',
        subtitle: 'Your personalized driving command center',
        theme: 'from-pink-500/10 to-rose-500/10',
        accentColor: 'text-pink-600',
        bgGradient: 'from-pink-500 to-rose-500',
        primaryIcon: Truck,
        tabs: [
          { id: 'overview', label: 'Today', icon: Clock },
          { id: 'routes', label: 'Routes', icon: MapPin },
          { id: 'logs', label: 'Logs', icon: FileText },
          { id: 'earnings', label: 'Earnings', icon: DollarSign }
        ],
        stats: [
          { title: 'Hours Driven', value: '7.5/11', change: 'On Track', icon: Clock, trend: 'stable', description: 'Hours of service today' },
          { title: 'Miles Today', value: '387', change: '+45 vs avg', icon: TrendingUp, trend: 'up', description: 'Distance covered' },
          { title: 'Fuel Efficiency', value: '8.9 MPG', change: '+0.7', icon: Zap, trend: 'up', description: 'Current fuel economy' },
          { title: 'Safety Score', value: '98%', change: '+2%', icon: CheckCircle, trend: 'up', description: 'Driving safety rating' }
        ]
      },
      owner_operator: {
        title: 'Business Hub',
        subtitle: 'Your independent trucking business center',
        theme: 'from-violet-500/10 to-purple-500/10',
        accentColor: 'text-violet-600',
        bgGradient: 'from-violet-500 to-purple-500',
        primaryIcon: Star,
        tabs: [
          { id: 'overview', label: 'Business', icon: BarChart3 },
          { id: 'loads', label: 'Load Board', icon: Package },
          { id: 'finances', label: 'Finances', icon: DollarSign },
          { id: 'equipment', label: 'Equipment', icon: Truck }
        ],
        stats: [
          { title: 'Weekly Revenue', value: '$4,750', change: '+18.2%', icon: DollarSign, trend: 'up', description: 'Gross revenue this week' },
          { title: 'Load Efficiency', value: '94.8%', change: '+3.1%', icon: Target, trend: 'up', description: 'Load acceptance rate' },
          { title: 'Fuel Costs', value: '$892', change: '-12.5%', icon: TrendingUp, trend: 'down', description: 'Weekly fuel expenses' },
          { title: 'Profit Margin', value: '23.4%', change: '+5.7%', icon: BarChart3, trend: 'up', description: 'Net profit margin' }
        ]
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };

  const config = getDashboardConfig();
  const PrimaryIcon = config.primaryIcon;

  const quickActions = [
    { title: 'Create Shipment', icon: Package, description: 'New shipment order', color: 'bg-blue-500' },
    { title: 'Find Loads', icon: Target, description: 'Search load board', color: 'bg-emerald-500' },
    { title: 'Track Delivery', icon: MapPin, description: 'Real-time tracking', color: 'bg-orange-500' },
    { title: 'Generate Report', icon: BarChart3, description: 'Analytics report', color: 'bg-purple-500' },
    { title: 'Contact Support', icon: PhoneCall, description: '24/7 assistance', color: 'bg-pink-500' },
    { title: 'Schedule Maintenance', icon: Settings, description: 'Vehicle service', color: 'bg-cyan-500' }
  ];

  const recentActivities = [
    { title: 'AI Route Optimization Applied', time: '2 min ago', type: 'success', icon: Brain, description: 'Saved 15% on fuel costs' },
    { title: 'New Load Matched Automatically', time: '5 min ago', type: 'info', icon: Target, description: 'Load #LB-4891 assigned' },
    { title: 'Fleet Maintenance Alert', time: '12 min ago', type: 'warning', icon: AlertTriangle, description: 'Vehicle #TRK-127 due for service' },
    { title: 'Driver Performance Updated', time: '18 min ago', type: 'success', icon: Users, description: 'Safety score improved to 98%' },
    { title: 'Shipment Delivered On-Time', time: '25 min ago', type: 'success', icon: CheckCircle, description: 'Shipment #SH-9871 completed' },
    { title: 'Rate Quote Generated', time: '32 min ago', type: 'info', icon: DollarSign, description: 'Quote #Q-4567 sent to customer' }
  ];

  const notifications = [
    { title: 'System Update Complete', message: 'All systems running on latest version', type: 'success', time: '10 min ago' },
    { title: 'High Priority Load', message: 'Urgent shipment requires immediate attention', type: 'warning', time: '15 min ago' },
    { title: 'Fuel Price Alert', message: 'Fuel prices increased by 3% in your area', type: 'info', time: '1 hour ago' },
    { title: 'Driver Check-in', message: 'Driver John Smith checked in at Dallas', type: 'info', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Enhanced Hero Section */}
      <div className="glass-ultra border-b border-border/30 mb-8">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className={`relative h-24 w-24 bg-gradient-to-br ${config.bgGradient} rounded-3xl flex items-center justify-center shadow-premium overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <PrimaryIcon className="h-12 w-12 text-white relative z-10" />
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-pulse flex items-center justify-center">
                  <div className="h-3 w-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  {config.title}
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl">{config.subtitle}</p>
                <div className="flex items-center gap-4 mt-4">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 text-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Active
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Real-time
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 text-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-4 glass-subtle px-6 py-4 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">99.8%</div>
                  <div className="text-sm text-muted-foreground">Health</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">250</div>
                  <div className="text-sm text-muted-foreground">Agents</div>
                </div>
              </div>
              <Button className={`h-14 px-8 rounded-2xl bg-gradient-to-r ${config.bgGradient} hover:shadow-lg transition-all duration-300 group text-lg font-semibold`}>
                <Settings className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Quick Actions
                <ArrowUpRight className="h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-10">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {config.stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="glass-subtle border-border/30 hover:glass-ultra transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                        <Badge variant="outline" className="text-xs px-2 py-1">Live</Badge>
                      </div>
                      <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                      <div className="flex items-center gap-3">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                        ) : stat.trend === 'down' ? (
                          <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />
                        ) : (
                          <Activity className="h-5 w-5 text-blue-600" />
                        )}
                        <span className={`text-sm font-bold ${
                          stat.trend === 'up' ? 'text-emerald-600' : 
                          stat.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${config.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Tabs Section */}
        <Card className="glass-ultra border-border/30 shadow-premium">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-4 text-3xl">
                <div className={`h-14 w-14 bg-gradient-to-br ${config.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Brain className="h-7 w-7 text-white" />
                </div>
                Intelligent Dashboard
                <div className="h-4 w-4 bg-emerald-500 rounded-full animate-pulse" />
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="glass-subtle">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="glass-subtle">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 glass-subtle p-2 h-14">
                {config.tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id} 
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 data-[state=active]:glass-ultra data-[state=active]:shadow-lg"
                    >
                      <TabIcon className="h-5 w-5" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Quick Actions */}
                  <Card className="lg:col-span-2 glass-subtle border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Zap className="h-6 w-6" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {quickActions.map((action, index) => {
                          const ActionIcon = action.icon;
                          return (
                            <Button
                              key={index}
                              variant="outline"
                              className="h-auto p-6 flex flex-col items-center gap-4 glass-subtle hover:glass-ultra transition-all duration-300 group"
                            >
                              <div className={`h-12 w-12 ${action.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                                <ActionIcon className="h-6 w-6" />
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-sm">{action.title}</div>
                                <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card className="glass-subtle border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Bell className="h-5 w-5" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {notifications.map((notification, index) => (
                          <div key={index} className="p-4 glass-subtle rounded-xl hover:glass-ultra transition-all duration-200">
                            <div className="flex items-start gap-3">
                              <div className={`h-3 w-3 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-emerald-500' :
                                notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                              } animate-pulse`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Feed */}
                <Card className="glass-subtle border-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Activity className="h-6 w-6" />
                      Live Activity Feed
                      <Badge variant="outline" className="ml-auto">Real-time</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recentActivities.map((activity, index) => {
                        const ActivityIcon = activity.icon;
                        return (
                          <div key={index} className="p-6 glass-subtle rounded-xl hover:glass-ultra transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                                activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                activity.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                              } group-hover:scale-110 transition-transform duration-300`}>
                                <ActivityIcon className="h-6 w-6" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h4 className="font-semibold text-sm text-foreground">{activity.title}</h4>
                                <p className="text-xs text-muted-foreground">{activity.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {config.tabs.slice(1).map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                  <div className="h-96 flex items-center justify-center glass-subtle rounded-2xl">
                    <div className="text-center space-y-6">
                      <div className={`h-20 w-20 bg-gradient-to-br ${config.bgGradient} rounded-full flex items-center justify-center mx-auto`}>
                        <tab.icon className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{tab.label} Dashboard</h3>
                        <p className="text-muted-foreground mt-2">Advanced {tab.label.toLowerCase()} management interface coming soon</p>
                      </div>
                      <Button className="mt-4">
                        Explore {tab.label}
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;