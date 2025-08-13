import React from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { 
  Truck, 
  Package, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  BarChart3,
  Activity,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const CarrierDashboard: React.FC = () => {
  console.log('CarrierDashboard component is rendering');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trans Bot Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your intelligent carrier portal</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
            <Plus className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Shipments
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$124,580</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Drivers
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+3</span>
              <span className="ml-1">new drivers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fleet Utilization
            </CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+5%</span>
              <span className="ml-1">efficiency boost</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Shipments */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Shipments
            </CardTitle>
            <CardDescription>
              Track your latest shipment activities with Trans Bot AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: 'TB-2024-001',
                origin: 'Chicago, IL',
                destination: 'Miami, FL',
                status: 'In Transit',
                driver: 'John Smith',
                eta: '2024-01-25',
                statusColor: 'bg-blue-100 text-blue-800'
              },
              {
                id: 'TB-2024-002',
                origin: 'Los Angeles, CA',
                destination: 'Seattle, WA',
                status: 'Delivered',
                driver: 'Sarah Johnson',
                eta: '2024-01-24',
                statusColor: 'bg-green-100 text-green-800'
              },
              {
                id: 'TB-2024-003',
                origin: 'Dallas, TX',
                destination: 'Atlanta, GA',
                status: 'Pending',
                driver: 'Mike Wilson',
                eta: '2024-01-26',
                statusColor: 'bg-yellow-100 text-yellow-800'
              }
            ].map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{shipment.id}</span>
                    <Badge variant="secondary" className={shipment.statusColor}>
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shipment.origin} → {shipment.destination}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Driver: {shipment.driver}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    ETA: {shipment.eta}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights & Alerts */}
        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription>
              Smart recommendations from Trans Bot AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                type: 'warning',
                message: 'Driver license expiring in 30 days - John Smith',
                time: '2 hours ago',
                icon: AlertTriangle,
                color: 'text-yellow-600'
              },
              {
                type: 'info',
                message: 'New high-paying load available on preferred route',
                time: '4 hours ago',
                icon: Activity,
                color: 'text-blue-600'
              },
              {
                type: 'success',
                message: 'Payment received for Invoice #TB-2024-045',
                time: '6 hours ago',
                icon: CheckCircle,
                color: 'text-green-600'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                <alert.icon className={`h-4 w-4 ${alert.color} mt-0.5`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle>Fleet Performance</CardTitle>
            <CardDescription>Real-time fleet utilization and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Trucks Active</span>
                <span>45/52</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On-Time Delivery</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fuel Efficiency</span>
                <span>8.2 MPG</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and growth trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-green-600">$124,580</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Month</p>
                <p className="text-2xl font-bold text-foreground">$115,200</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Growth Rate</span>
                <span className="text-green-600">+8.2%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profit Margin</span>
                <span className="text-green-600">18.5%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            AI-powered shortcuts for efficient workflow management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: 'Create New Quote', 
                icon: DollarSign, 
                color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                description: 'Generate AI-optimized quotes'
              },
              { 
                title: 'Add New Shipment', 
                icon: Package, 
                color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                description: 'Smart route planning'
              },
              { 
                title: 'Find Loads', 
                icon: Truck, 
                color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
                description: 'AI-matched opportunities'
              },
              { 
                title: 'Manage Drivers', 
                icon: Users, 
                color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                description: 'Driver performance insights'
              }
            ].map((action, index) => (
              <div
                key={index}
                className="group flex flex-col gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className={`p-3 rounded-lg ${action.color} text-white transition-all duration-300 group-hover:scale-110 shadow-md`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{action.title}</span>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierDashboard;