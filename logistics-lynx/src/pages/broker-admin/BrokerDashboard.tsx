/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Truck, 
  DollarSign, 
  Target,
  Plus,
  Eye,
  Search,
  FileText,
  Users,
  Activity,
  Clock,
  Star,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Gauge
} from 'lucide-react';

const BrokerDashboard: React.FC = () => {
  // Modern metrics focused on broker operations
  const metrics = [
    {
      title: "Active Revenue",
      value: "$2.4M",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      description: "This month"
    },
    {
      title: "Load Volume",
      value: "1,247",
      change: "+12.5%",
      trend: "up", 
      icon: Package,
      color: "text-blue-600",
      description: "Active shipments"
    },
    {
      title: "Avg Margin",
      value: "15.8%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-purple-600", 
      description: "Profit margin"
    },
    {
      title: "Carrier Score",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-amber-600",
      description: "Network rating"
    }
  ];

  const quickActions = [
    { title: "Post New Load", icon: Plus, path: "/broker-admin/loads/post", color: "bg-emerald-500" },
    { title: "Find Carrier", icon: Search, path: "/broker-admin/carriers", color: "bg-blue-500" },
    { title: "Create Quote", icon: FileText, path: "/broker-admin/crm/quotes/new", color: "bg-purple-500" },
    { title: "Track Shipment", icon: Eye, path: "/broker-admin/tracking", color: "bg-orange-500" }
  ];

  const recentActivity = [
    { id: 1, type: "load_posted", message: "New load posted to Chicago", time: "2 min ago", status: "success" },
    { id: 2, type: "quote_sent", message: "Quote sent to Walmart Corp", time: "5 min ago", status: "pending" },
    { id: 3, type: "carrier_assigned", message: "Carrier assigned to Load #12847", time: "8 min ago", status: "success" },
    { id: 4, type: "payment_received", message: "Payment received from Amazon", time: "12 min ago", status: "success" },
    { id: 5, type: "delivery_completed", message: "Shipment delivered to Dallas", time: "15 min ago", status: "success" }
  ];

  const topLoads = [
    { id: "LD-12847", route: "LA → NY", carrier: "Express Freight", margin: "$2,400", status: "in_transit" },
    { id: "LD-12848", route: "ATL → CHI", carrier: "Quick Transport", margin: "$1,850", status: "delivered" },
    { id: "LD-12849", route: "DAL → MIA", carrier: "Fast Line", margin: "$3,200", status: "pending" },
    { id: "LD-12850", route: "SEA → DEN", carrier: "Mountain Express", margin: "$2,100", status: "in_transit" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in_transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'load_posted': return <Plus className="h-4 w-4 text-emerald-600" />;
      case 'quote_sent': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'carrier_assigned': return <Truck className="h-4 w-4 text-purple-600" />;
      case 'payment_received': return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'delivery_completed': return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Broker Command Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time freight operations and business intelligence
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
              <Plus className="h-4 w-4 mr-2" />
              Post Load
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="h-6">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Most frequently used operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:scale-105 transition-transform"
                  onClick={() => window.location.href = action.path}
                >
                  <div className={`h-8 w-8 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Loads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Top Performing Loads
              </CardTitle>
              <CardDescription>
                Highest margin shipments this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLoads.map((load) => (
                  <div key={load.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{load.id}</p>
                        <p className="text-sm text-muted-foreground">{load.route}</p>
                        <p className="text-xs text-muted-foreground">{load.carrier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">{load.margin}</p>
                      <Badge className={getStatusColor(load.status)} variant="outline">
                        {load.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Activity Feed
              </CardTitle>
              <CardDescription>
                Real-time business operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default BrokerDashboard;