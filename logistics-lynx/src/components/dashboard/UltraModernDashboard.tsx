import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  ChevronRight
} from 'lucide-react';

const UltraModernDashboard = () => {
  const { selectedRole } = useAuth();

  const getDashboardConfig = () => {
    const configs = {
      super_admin: {
        title: 'AI Command Center',
        subtitle: 'Orchestrating 250 autonomous agents across all portals',
        theme: 'from-purple-500/10 to-violet-500/10',
        accentColor: 'text-purple-600',
        bgGradient: 'from-purple-500 to-violet-500',
        stats: [
          { title: 'Active Agents', value: '250', change: '+12.5%', icon: Brain, trend: 'up' },
          { title: 'System Health', value: '99.8%', change: '+0.3%', icon: Activity, trend: 'up' },
          { title: 'Portals Online', value: '6/6', change: '100%', icon: Globe, trend: 'stable' },
          { title: 'Tasks Completed', value: '1,847', change: '+23.7%', icon: CheckCircle, trend: 'up' }
        ]
      },
      carrier_admin: {
        title: 'Fleet Command Center',
        subtitle: 'AI-powered fleet management and optimization',
        theme: 'from-blue-500/10 to-cyan-500/10',
        accentColor: 'text-blue-600',
        bgGradient: 'from-blue-500 to-cyan-500',
        stats: [
          { title: 'Active Vehicles', value: '127', change: '+8.2%', icon: Truck, trend: 'up' },
          { title: 'Fleet Utilization', value: '94.5%', change: '+5.3%', icon: TrendingUp, trend: 'up' },
          { title: 'Fuel Efficiency', value: '12.3 MPG', change: '+7.8%', icon: Zap, trend: 'up' },
          { title: 'Revenue Today', value: '$24,850', change: '+15.2%', icon: DollarSign, trend: 'up' }
        ]
      },
      freight_broker_admin: {
        title: 'Brokerage Hub',
        subtitle: 'Smart load matching and rate optimization',
        theme: 'from-emerald-500/10 to-green-500/10',
        accentColor: 'text-emerald-600',
        bgGradient: 'from-emerald-500 to-green-500',
        stats: [
          { title: 'Active Loads', value: '89', change: '+18.4%', icon: Package, trend: 'up' },
          { title: 'Match Rate', value: '96.7%', change: '+2.1%', icon: Target, trend: 'up' },
          { title: 'Avg Margin', value: '15.8%', change: '+3.2%', icon: TrendingUp, trend: 'up' },
          { title: 'Revenue Today', value: '$67,420', change: '+22.1%', icon: DollarSign, trend: 'up' }
        ]
      },
      shipper_admin: {
        title: 'Shipping Operations',
        subtitle: 'Streamlined logistics and shipment tracking',
        theme: 'from-orange-500/10 to-amber-500/10',
        accentColor: 'text-orange-600',
        bgGradient: 'from-orange-500 to-amber-500',
        stats: [
          { title: 'Shipments Today', value: '156', change: '+11.3%', icon: Package, trend: 'up' },
          { title: 'On-Time Rate', value: '98.2%', change: '+1.7%', icon: Clock, trend: 'up' },
          { title: 'Cost Savings', value: '$8,950', change: '+25.4%', icon: DollarSign, trend: 'up' },
          { title: 'Customer Score', value: '4.9/5', change: '+0.2', icon: Users, trend: 'up' }
        ]
      },
      carrier_driver: {
        title: 'Driver Dashboard',
        subtitle: 'Your personalized driving command center',
        theme: 'from-pink-500/10 to-rose-500/10',
        accentColor: 'text-pink-600',
        bgGradient: 'from-pink-500 to-rose-500',
        stats: [
          { title: 'Hours Driven', value: '7.5/11', change: 'On Track', icon: Clock, trend: 'stable' },
          { title: 'Miles Today', value: '387', change: '+45 vs avg', icon: TrendingUp, trend: 'up' },
          { title: 'Fuel Efficiency', value: '8.9 MPG', change: '+0.7', icon: Zap, trend: 'up' },
          { title: 'Safety Score', value: '98%', change: '+2%', icon: CheckCircle, trend: 'up' }
        ]
      },
      owner_operator: {
        title: 'Business Hub',
        subtitle: 'Your independent trucking business center',
        theme: 'from-violet-500/10 to-purple-500/10',
        accentColor: 'text-violet-600',
        bgGradient: 'from-violet-500 to-purple-500',
        stats: [
          { title: 'Weekly Revenue', value: '$4,750', change: '+18.2%', icon: DollarSign, trend: 'up' },
          { title: 'Load Efficiency', value: '94.8%', change: '+3.1%', icon: Target, trend: 'up' },
          { title: 'Fuel Costs', value: '$892', change: '-12.5%', icon: TrendingUp, trend: 'down' },
          { title: 'Profit Margin', value: '23.4%', change: '+5.7%', icon: BarChart3, trend: 'up' }
        ]
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };

  const config = getDashboardConfig();

  const aiInsights = [
    {
      title: 'Route Optimization',
      description: 'AI identified 15% more efficient routes for current shipments',
      impact: '+$2,847 daily savings',
      confidence: 94,
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Demand Prediction',
      description: 'High demand forecast for East Coast routes next week',
      impact: 'Adjust pricing +8%',
      confidence: 87,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Fuel Optimization',
      description: 'Smart routing reduces fuel consumption across fleet',
      impact: '12% fuel savings',
      confidence: 91,
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const recentActivities = [
    { title: 'System Optimization Complete', time: '2 min ago', type: 'success' },
    { title: 'New Load Matched Automatically', time: '5 min ago', type: 'info' },
    { title: 'Fleet Maintenance Alert', time: '12 min ago', type: 'warning' },
    { title: 'Driver Performance Updated', time: '18 min ago', type: 'success' },
    { title: 'Route Optimization Applied', time: '25 min ago', type: 'info' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <div className={`glass-ultra border-b border-border/30 mb-8`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`h-20 w-20 bg-gradient-to-br ${config.bgGradient} rounded-3xl flex items-center justify-center shadow-premium relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <Brain className="h-10 w-10 text-white relative z-10" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-2">
                  {config.title}
                </h1>
                <p className="text-lg text-muted-foreground font-medium">{config.subtitle}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-2" />
                    AI Active
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    <Activity className="h-3 w-3 mr-2" />
                    Real-time
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button className={`h-12 px-6 rounded-2xl bg-gradient-to-r ${config.bgGradient} hover:shadow-lg transition-all duration-300 group`}>
                <Settings className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Quick Actions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="glass-subtle border-border/30 hover:glass-ultra transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center gap-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        ) : stat.trend === 'down' ? (
                          <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                        ) : (
                          <Activity className="h-4 w-4 text-blue-600" />
                        )}
                        <span className={`text-sm font-semibold ${
                          stat.trend === 'up' ? 'text-emerald-600' : 
                          stat.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${config.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Insights */}
        <Card className="glass-ultra border-border/30 shadow-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className={`h-12 w-12 bg-gradient-to-br ${config.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Brain className="h-6 w-6 text-white" />
              </div>
              AI Intelligence Dashboard
              <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse ml-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div key={index} className={`glass-subtle p-6 rounded-2xl border border-border/30 hover:glass-ultra transition-all duration-300 group`}>
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 ${insight.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-6 w-6 ${insight.color}`} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className={`font-bold ${insight.color}`}>{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-emerald-600">{insight.impact}</span>
                            <span className="text-muted-foreground">{insight.confidence}% confidence</span>
                          </div>
                          <Progress value={insight.confidence} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 glass-ultra border-border/30 shadow-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5" />
                Real-time Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center glass-subtle rounded-xl">
                <div className="text-center space-y-4">
                  <div className={`h-16 w-16 bg-gradient-to-br ${config.bgGradient} rounded-full flex items-center justify-center mx-auto`}>
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Interactive Charts</h3>
                    <p className="text-muted-foreground">Real-time data visualization coming soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="glass-ultra border-border/30 shadow-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="h-5 w-5" />
                Live Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 glass-subtle rounded-xl hover:glass-ultra transition-all duration-200">
                    <div className={`h-3 w-3 rounded-full ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    } animate-pulse`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UltraModernDashboard;