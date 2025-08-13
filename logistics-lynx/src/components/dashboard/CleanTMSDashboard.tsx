import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import { LayoutGrid, TrendingUp, Users, Package, Truck, DollarSign, BarChart3, Clock, CheckCircle, Activity, Target, ArrowUpRight, Building, FileText, Globe, Shield, Zap, Plus, Search, RotateCcw } from 'lucide-react';
const CleanTMSDashboard = () => {
  const {
    selectedRole
  } = useAuth();
  const getDashboardConfig = () => {
    const configs = {
      super_admin: {
        title: 'Administrative Control Center',
        subtitle: 'Complete oversight of all TMS operations and user management',
        primaryColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        stats: [{
          title: 'Total Users',
          value: '1,247',
          change: '+12.5%',
          icon: Users,
          description: 'Active system users'
        }, {
          title: 'System Health',
          value: '99.8%',
          change: '+0.3%',
          icon: Activity,
          description: 'Overall system performance'
        }, {
          title: 'Active Portals',
          value: '6',
          change: '100%',
          icon: Globe,
          description: 'All portals operational'
        }, {
          title: 'Daily Tasks',
          value: '1,847',
          change: '+23.7%',
          icon: CheckCircle,
          description: 'Completed today'
        }]
      },
      carrier_admin: {
        title: 'Fleet Management Portal',
        subtitle: 'Comprehensive fleet operations and driver coordination',
        primaryColor: 'text-slate-600',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200',
        stats: [{
          title: 'Active Vehicles',
          value: '127',
          change: '+8.2%',
          icon: Truck,
          description: 'Vehicles on the road'
        }, {
          title: 'Fleet Utilization',
          value: '94.5%',
          change: '+5.3%',
          icon: TrendingUp,
          description: 'Asset efficiency rate'
        }, {
          title: 'Avg Fuel MPG',
          value: '12.3',
          change: '+7.8%',
          icon: Zap,
          description: 'Fleet fuel efficiency'
        }, {
          title: 'Daily Revenue',
          value: '$24,850',
          change: '+15.2%',
          icon: DollarSign,
          description: 'Revenue generated today'
        }]
      },
      freight_broker_admin: {
        title: 'Brokerage Operations',
        subtitle: 'Load matching and freight coordination platform',
        primaryColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        stats: [{
          title: 'Active Loads',
          value: '89',
          change: '+18.4%',
          icon: Package,
          description: 'Loads awaiting carriers'
        }, {
          title: 'Match Rate',
          value: '96.7%',
          change: '+2.1%',
          icon: Target,
          description: 'Successful load matches'
        }, {
          title: 'Avg Margin',
          value: '15.8%',
          change: '+3.2%',
          icon: TrendingUp,
          description: 'Profit margin per load'
        }, {
          title: 'Daily Revenue',
          value: '$67,420',
          change: '+22.1%',
          icon: DollarSign,
          description: 'Brokerage revenue today'
        }]
      },
      shipper_admin: {
        title: 'Shipping Operations Center',
        subtitle: 'End-to-end shipment management and tracking',
        primaryColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        stats: [{
          title: 'Daily Shipments',
          value: '156',
          change: '+11.3%',
          icon: Package,
          description: 'Shipments processed today'
        }, {
          title: 'On-Time Rate',
          value: '98.2%',
          change: '+1.7%',
          icon: Clock,
          description: 'Delivery performance'
        }, {
          title: 'Cost Savings',
          value: '$8,950',
          change: '+25.4%',
          icon: DollarSign,
          description: 'Optimization savings'
        }, {
          title: 'Customer Score',
          value: '4.9/5',
          change: '+0.2',
          icon: Users,
          description: 'Customer satisfaction'
        }]
      },
      carrier_driver: {
        title: 'Driver Operations',
        subtitle: 'Your daily driving dashboard and logistics hub',
        primaryColor: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        stats: [{
          title: 'Hours Driven',
          value: '7.5/11',
          change: 'On Track',
          icon: Clock,
          description: 'Hours of service today'
        }, {
          title: 'Miles Today',
          value: '387',
          change: '+45 vs avg',
          icon: TrendingUp,
          description: 'Distance covered'
        }, {
          title: 'Fuel Efficiency',
          value: '8.9 MPG',
          change: '+0.7',
          icon: Zap,
          description: 'Current fuel economy'
        }, {
          title: 'Safety Score',
          value: '98%',
          change: '+2%',
          icon: Shield,
          description: 'Driving safety rating'
        }]
      },
      owner_operator: {
        title: 'Business Operations Hub',
        subtitle: 'Independent trucking business management center',
        primaryColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        stats: [{
          title: 'Weekly Revenue',
          value: '$4,750',
          change: '+18.2%',
          icon: DollarSign,
          description: 'Gross revenue this week'
        }, {
          title: 'Load Efficiency',
          value: '94.8%',
          change: '+3.1%',
          icon: Target,
          description: 'Load acceptance rate'
        }, {
          title: 'Fuel Costs',
          value: '$892',
          change: '-12.5%',
          icon: TrendingUp,
          description: 'Weekly fuel expenses'
        }, {
          title: 'Profit Margin',
          value: '23.4%',
          change: '+5.7%',
          icon: BarChart3,
          description: 'Net profit margin'
        }]
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };
  const config = getDashboardConfig();
  const quickActions = [{
    title: 'Create New Shipment',
    icon: Package,
    description: 'Start new shipment order'
  }, {
    title: 'Find Available Loads',
    icon: Target,
    description: 'Browse load board'
  }, {
    title: 'Generate Reports',
    icon: BarChart3,
    description: 'Create analytics report'
  }, {
    title: 'Manage Users',
    icon: Users,
    description: 'User administration'
  }, {
    title: 'View Fleet Status',
    icon: Truck,
    description: 'Fleet overview'
  }, {
    title: 'Financial Summary',
    icon: DollarSign,
    description: 'Financial dashboard'
  }];
  const recentActivities = [{
    title: 'Shipment #SH-2024-001 delivered successfully',
    time: '5 min ago',
    type: 'success'
  }, {
    title: 'New load posted to load board',
    time: '12 min ago',
    type: 'info'
  }, {
    title: 'Driver check-in: John Smith - Dallas, TX',
    time: '18 min ago',
    type: 'info'
  }, {
    title: 'Vehicle maintenance scheduled: TRK-127',
    time: '25 min ago',
    type: 'warning'
  }, {
    title: 'Rate quote generated for Chicago route',
    time: '32 min ago',
    type: 'info'
  }, {
    title: 'Customer invoice processed: INV-2024-156',
    time: '1 hour ago',
    type: 'success'
  }];
  return <div className="min-h-screen bg-neutral-50/50">
      {/* Welcome Section - Responsive */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-2" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}>
                {config.title}
              </h1>
              <p className="text-sm md:text-base text-neutral-600 font-medium">{config.subtitle}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant="outline" className="bg-emerald-50/80 text-emerald-700 border-emerald-200/60 font-medium text-xs">
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5" />
                  Live
                </Badge>
                <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/60 font-medium text-xs">
                  <Clock className="h-3 w-3 mr-1.5" />
                  Real-time
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <Button variant="outline" className="h-8 md:h-9 px-3 md:px-4 bg-white/80 border-neutral-200 hover:bg-neutral-50 font-medium text-xs md:text-sm">
                <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Reports</span>
              </Button>
              <Button className="h-8 md:h-9 px-3 md:px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs md:text-sm">
                <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">New Task</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-4 md:space-y-6">
        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {config.stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isPositive = stat.change.includes('+') || stat.change.includes('On Track');
          const isNegative = stat.change.includes('-');
          return <Card key={index} className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/90">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider truncate" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
                  }}>{stat.title}</p>
                      <p className="text-lg md:text-xl font-semibold text-neutral-900 truncate" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                  }}>{stat.value}</p>
                      <p className="text-xs text-neutral-600 font-medium line-clamp-2">{stat.description}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-blue-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-neutral-400 hidden sm:inline">vs last</span>
                      </div>
                    </div>
                    <div className={`h-8 w-8 md:h-10 md:w-10 ${config.bgColor} rounded-lg md:rounded-xl flex items-center justify-center ${config.borderColor} border shrink-0`}>
                      <IconComponent className={`h-4 w-4 md:h-5 md:w-5 ${config.primaryColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-neutral-900" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}>Quick Actions</CardTitle>
              <p className="text-sm text-neutral-600 font-medium">Frequently used operations</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickActions.slice(0, 6).map((action, index) => {
                const ActionIcon = action.icon;
                return <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-white/60 border-neutral-200/60 hover:bg-white hover:border-neutral-300 transition-all duration-200 hover:shadow-sm">
                      <div className={`h-8 w-8 ${config.bgColor} rounded-lg flex items-center justify-center ${config.borderColor} border`}>
                        <ActionIcon className={`h-4 w-4 ${config.primaryColor}`} />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-neutral-900" style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
                    }}>{action.title}</div>
                        <div className="text-xs text-neutral-500 mt-0.5 font-medium">{action.description}</div>
                      </div>
                    </Button>;
              })}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-neutral-900" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}>System Health</CardTitle>
              <p className="text-sm text-neutral-600 font-medium">Real-time monitoring</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Performance</span>
                  <span className="text-sm font-semibold text-emerald-600">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2 bg-neutral-100" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Server Load</span>
                  <span className="text-sm font-semibold text-blue-600">23%</span>
                </div>
                <Progress value={23} className="h-2 bg-neutral-100" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Database</span>
                  <span className="text-sm font-semibold text-emerald-600">Optimal</span>
                </div>
                <Progress value={95} className="h-2 bg-neutral-100" />
              </div>

              <div className="pt-3 border-t border-neutral-200/60">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-2 bg-neutral-50/80 rounded-lg">
                    <div className="text-base font-semibold text-neutral-900">24/7</div>
                    <div className="text-xs text-neutral-500 font-medium">Support</div>
                  </div>
                  <div className="p-2 bg-neutral-50/80 rounded-lg">
                    <div className="text-base font-semibold text-neutral-900">99.9%</div>
                    <div className="text-xs text-neutral-500 font-medium">Uptime</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm">
          
          
        </Card>
      </div>
    </div>;
};
export default CleanTMSDashboard;