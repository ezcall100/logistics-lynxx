import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, Users, Truck, Building2, MapPin, Globe, Users2, TrendingUp, 
  BarChart3, Package, DollarSign, Activity, Target, ArrowRight, Plus,
  Star, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const NetworksOverview = () => {
  const networkStats = {
    totalCustomers: 248,
    activeCarriers: 156,
    totalVendors: 89,
    terminals: 45,
    locations: 312,
    partners: 67,
    networkValue: 2850000,
    monthlyGrowth: 12.5
  };

  const recentActivity = [
    { type: 'customer', action: 'New customer onboarded', entity: 'Global Logistics Inc.', time: '2 hours ago', status: 'success' },
    { type: 'carrier', action: 'Carrier contract renewed', entity: 'Swift Transport LLC', time: '4 hours ago', status: 'success' },
    { type: 'vendor', action: 'Vendor audit completed', entity: 'Tech Solutions Co.', time: '6 hours ago', status: 'warning' },
    { type: 'terminal', action: 'New terminal added', entity: 'Chicago Hub Terminal', time: '1 day ago', status: 'success' },
  ];

  const networkModules = [
    {
      title: 'Customers',
      icon: Users,
      description: 'Manage customer accounts, contracts, and relationships',
      count: networkStats.totalCustomers,
      path: '/broker-admin/networks/customers',
      color: 'bg-blue-500',
      growth: '+8 this month'
    },
    {
      title: 'Carriers',
      icon: Truck,
      description: 'Track carrier performance, rates, and capacity',
      count: networkStats.activeCarriers,
      path: '/broker-admin/networks/carriers',
      color: 'bg-green-500',
      growth: '+12 this month'
    },
    {
      title: 'Vendors',
      icon: Building2,
      description: 'Manage vendor partnerships and service agreements',
      count: networkStats.totalVendors,
      path: '/broker-admin/networks/vendors',
      color: 'bg-purple-500',
      growth: '+3 this month'
    },
    {
      title: 'Terminals',
      icon: MapPin,
      description: 'Monitor terminal operations and capacity',
      count: networkStats.terminals,
      path: '/broker-admin/networks/terminals',
      color: 'bg-orange-500',
      growth: '+2 this month'
    },
    {
      title: 'Locations',
      icon: Globe,
      description: 'Manage pickup and delivery locations',
      count: networkStats.locations,
      path: '/broker-admin/networks/locations',
      color: 'bg-teal-500',
      growth: '+15 this month'
    },
    {
      title: 'Partners',
      icon: Users2,
      description: 'Strategic partnerships and collaborations',
      count: networkStats.partners,
      path: '/broker-admin/networks/partners',
      color: 'bg-indigo-500',
      growth: '+5 this month'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-primary" />
            Networks Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive network management for freight brokerage operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Network Entity
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${networkStats.networkValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{networkStats.monthlyGrowth}% from last month
            </p>
            <Progress value={networkStats.monthlyGrowth * 5} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Entities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {networkStats.totalCustomers + networkStats.activeCarriers + networkStats.totalVendors}
            </div>
            <p className="text-xs text-muted-foreground">
              Total network participants
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Health</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Overall network performance
            </p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{networkStats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              Network expansion rate
            </p>
            <Progress value={networkStats.monthlyGrowth * 4} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Network Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {networkModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Link key={module.title} to={module.path}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color} bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 text-white`} style={{color: module.color.replace('bg-', '').replace('-500', '')}} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">{module.count}</div>
                      <Badge variant="secondary" className="text-xs">
                        {module.growth}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Network Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.entity}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <Users className="w-5 h-5" />
                <span className="text-xs">Add Customer</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <Truck className="w-5 h-5" />
                <span className="text-xs">Add Carrier</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <Building2 className="w-5 h-5" />
                <span className="text-xs">Add Vendor</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-xs">Add Location</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2">
                <Package className="w-5 h-5" />
                <span className="text-xs">Bulk Import</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworksOverview;