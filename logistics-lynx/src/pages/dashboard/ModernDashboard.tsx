/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { LayoutGrid, TrendingUp, Users, Package, Truck, DollarSign, BarChart3, Clock, CheckCircle, Activity, Target, ArrowUpRight, Building, FileText, Globe, Shield, Zap, Plus, Search, RotateCcw, Brain, Sparkles, AlertTriangle, MapPin, Calendar, Star } from 'lucide-react';
const ModernDashboard = () => {
  const {
    selectedRole
  } = useAuth();
  const getDashboardConfig = () => {
    const configs = {
      super_admin: {
        title: 'Global Command Center',
        subtitle: 'Complete oversight of all TMS operations and autonomous agents',
        primaryColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-violet-500',
        stats: [{
          title: 'Active Agents',
          value: '170',
          change: '+5 today',
          icon: Brain,
          description: 'AI agents working autonomously',
          trend: 'up'
        }, {
          title: 'System Health',
          value: '99.8%',
          change: '+0.3%',
          icon: Activity,
          description: 'Overall system performance',
          trend: 'up'
        }, {
          title: 'Active Portals',
          value: '6/6',
          change: '100%',
          icon: Globe,
          description: 'All portals operational',
          trend: 'stable'
        }, {
          title: 'Daily Tasks',
          value: '2,847',
          change: '+23.7%',
          icon: CheckCircle,
          description: 'Completed autonomously',
          trend: 'up'
        }]
      },
      carrier_admin: {
        title: 'Fleet Command Center',
        subtitle: 'Real-time fleet management and autonomous dispatch',
        primaryColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-cyan-500',
        stats: [{
          title: 'Active Vehicles',
          value: '127',
          change: '+8 this week',
          icon: Truck,
          description: 'Vehicles on the road',
          trend: 'up'
        }, {
          title: 'Fleet Utilization',
          value: '94.5%',
          change: '+5.3%',
          icon: TrendingUp,
          description: 'Asset efficiency rate',
          trend: 'up'
        }, {
          title: 'Avg Fuel MPG',
          value: '12.3',
          change: '+7.8%',
          icon: Zap,
          description: 'Fleet fuel efficiency',
          trend: 'up'
        }, {
          title: 'Daily Revenue',
          value: '$24,850',
          change: '+15.2%',
          icon: DollarSign,
          description: 'Revenue generated today',
          trend: 'up'
        }]
      },
      freight_broker_admin: {
        title: 'Brokerage Operations Hub',
        subtitle: 'AI-powered load matching and freight coordination',
        primaryColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-green-500',
        stats: [{
          title: 'Active Loads',
          value: '89',
          change: '+18.4%',
          icon: Package,
          description: 'Loads awaiting carriers',
          trend: 'up'
        }, {
          title: 'Match Rate',
          value: '96.7%',
          change: '+2.1%',
          icon: Target,
          description: 'Successful load matches',
          trend: 'up'
        }, {
          title: 'Avg Margin',
          value: '15.8%',
          change: '+3.2%',
          icon: TrendingUp,
          description: 'Profit margin per load',
          trend: 'up'
        }, {
          title: 'Daily Revenue',
          value: '$67,420',
          change: '+22.1%',
          icon: DollarSign,
          description: 'Brokerage revenue today',
          trend: 'up'
        }]
      },
      shipper_admin: {
        title: 'Shipping Operations Center',
        subtitle: 'End-to-end shipment management with AI optimization',
        primaryColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        gradientFrom: 'from-orange-500',
        gradientTo: 'to-amber-500',
        stats: [{
          title: 'Daily Shipments',
          value: '156',
          change: '+11.3%',
          icon: Package,
          description: 'Shipments processed today',
          trend: 'up'
        }, {
          title: 'On-Time Rate',
          value: '98.2%',
          change: '+1.7%',
          icon: Clock,
          description: 'Delivery performance',
          trend: 'up'
        }, {
          title: 'Cost Savings',
          value: '$8,950',
          change: '+25.4%',
          icon: DollarSign,
          description: 'AI optimization savings',
          trend: 'up'
        }, {
          title: 'Customer Score',
          value: '4.9/5',
          change: '+0.2',
          icon: Star,
          description: 'Customer satisfaction',
          trend: 'up'
        }]
      },
      carrier_driver: {
        title: 'Driver Command Center',
        subtitle: 'Your personalized driving dashboard and logistics hub',
        primaryColor: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        gradientFrom: 'from-pink-500',
        gradientTo: 'to-rose-500',
        stats: [{
          title: 'Hours Driven',
          value: '7.5/11',
          change: 'On Track',
          icon: Clock,
          description: 'Hours of service today',
          trend: 'stable'
        }, {
          title: 'Miles Today',
          value: '387',
          change: '+45 vs avg',
          icon: MapPin,
          description: 'Distance covered',
          trend: 'up'
        }, {
          title: 'Fuel Efficiency',
          value: '8.9 MPG',
          change: '+0.7',
          icon: Zap,
          description: 'Current fuel economy',
          trend: 'up'
        }, {
          title: 'Safety Score',
          value: '98%',
          change: '+2%',
          icon: Shield,
          description: 'Driving safety rating',
          trend: 'up'
        }]
      },
      owner_operator: {
        title: 'Business Operations Hub',
        subtitle: 'Independent trucking business management center',
        primaryColor: 'text-violet-600',
        bgColor: 'bg-violet-50',
        borderColor: 'border-violet-200',
        gradientFrom: 'from-violet-500',
        gradientTo: 'to-purple-500',
        stats: [{
          title: 'Weekly Revenue',
          value: '$4,750',
          change: '+18.2%',
          icon: DollarSign,
          description: 'Gross revenue this week',
          trend: 'up'
        }, {
          title: 'Load Efficiency',
          value: '94.8%',
          change: '+3.1%',
          icon: Target,
          description: 'Load acceptance rate',
          trend: 'up'
        }, {
          title: 'Fuel Costs',
          value: '$892',
          change: '-12.5%',
          icon: TrendingUp,
          description: 'Weekly fuel expenses',
          trend: 'down'
        }, {
          title: 'Profit Margin',
          value: '23.4%',
          change: '+5.7%',
          icon: BarChart3,
          description: 'Net profit margin',
          trend: 'up'
        }]
      }
    };
    return configs[selectedRole as keyof typeof configs] || configs.super_admin;
  };
  const config = getDashboardConfig();
  const quickActions = [{
    title: 'Create Shipment',
    icon: Package,
    description: 'Start new shipment order',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  }, {
    title: 'Find Loads',
    icon: Target,
    description: 'Browse load board',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  }, {
    title: 'Generate Reports',
    icon: BarChart3,
    description: 'Create analytics report',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  }, {
    title: 'Manage Fleet',
    icon: Truck,
    description: 'Fleet overview',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  }, {
    title: 'Financial Review',
    icon: DollarSign,
    description: 'Financial dashboard',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  }, {
    title: 'AI Insights',
    icon: Brain,
    description: 'View AI recommendations',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200'
  }];
  const recentActivities = [{
    title: 'AI Agent optimized route for Shipment #SH-2024-001',
    time: '2 min ago',
    type: 'success',
    icon: CheckCircle
  }, {
    title: 'New high-value load posted to load board',
    time: '8 min ago',
    type: 'info',
    icon: Package
  }, {
    title: 'Driver check-in: John Smith - Dallas, TX',
    time: '15 min ago',
    type: 'info',
    icon: MapPin
  }, {
    title: 'AI scheduled maintenance for Vehicle TRK-127',
    time: '22 min ago',
    type: 'warning',
    icon: AlertTriangle
  }, {
    title: 'Rate optimization completed for Chicago route',
    time: '28 min ago',
    type: 'success',
    icon: TrendingUp
  }];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
            <LayoutGrid className={`h-6 w-6 ${config.primaryColor}`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{config.title}</h1>
            <p className="text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {config.stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${config.primaryColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                <span className={stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className={`h-5 w-5 ${config.primaryColor}`} />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className={`h-auto p-4 justify-start ${action.bg} ${action.border} hover:${action.bg}`}
              >
                <div className="flex items-center gap-3">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className={`h-5 w-5 ${config.primaryColor}`} />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-1 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100 text-green-600' :
                  activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <activity.icon className="h-3 w-3" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ModernDashboard;