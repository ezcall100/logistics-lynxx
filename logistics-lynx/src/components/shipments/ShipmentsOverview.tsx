import React from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const ShipmentsOverview = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Shipments</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Truck className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">247</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+12% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Today</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$284.5K</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+8.2% from yesterday</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Delivery</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">94.8%</div>
            <div className="mt-2">
              <Progress value={94.8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Margin</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">18.6%</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+0.8% improvement</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>Shipment Status Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-500">67</div>
                <div className="text-sm text-muted-foreground">In Transit</div>
                <Badge variant="secondary" className="mt-2 bg-blue-500/20 text-blue-500 border-blue-500/30">
                  Active
                </Badge>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-500/20">
                <div className="text-2xl font-bold text-amber-500">43</div>
                <div className="text-sm text-muted-foreground">Pending</div>
                <Badge variant="secondary" className="mt-2 bg-amber-500/20 text-amber-500 border-amber-500/30">
                  Waiting
                </Badge>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                <div className="text-2xl font-bold text-green-500">128</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
                <Badge variant="secondary" className="mt-2 bg-green-500/20 text-green-500 border-green-500/30">
                  Complete
                </Badge>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl border border-red-500/20">
                <div className="text-2xl font-bold text-red-500">9</div>
                <div className="text-sm text-muted-foreground">Issues</div>
                <Badge variant="secondary" className="mt-2 bg-red-500/20 text-red-500 border-red-500/30">
                  Alert
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Urgent Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-lg border border-red-500/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Late Pickup</p>
                  <p className="text-xs text-muted-foreground">TMS-2024-045</p>
                </div>
                <Button size="sm" variant="destructive">
                  Action
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-lg border border-amber-500/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Missing POD</p>
                  <p className="text-xs text-muted-foreground">TMS-2024-037</p>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Carrier Request</p>
                  <p className="text-xs text-muted-foreground">Driver Change</p>
                </div>
                <Button size="sm" variant="secondary">
                  Handle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg">
                <div className="p-1 bg-green-500/20 rounded-full">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Shipment TMS-2024-089 delivered</p>
                  <p className="text-xs text-muted-foreground">Amazon Logistics • 2 min ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg">
                <div className="p-1 bg-blue-500/20 rounded-full">
                  <Truck className="h-3 w-3 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Driver assigned to TMS-2024-091</p>
                  <p className="text-xs text-muted-foreground">Mike Rodriguez • 5 min ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg">
                <div className="p-1 bg-purple-500/20 rounded-full">
                  <MapPin className="h-3 w-3 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Route optimized for TMS-2024-087</p>
                  <p className="text-xs text-muted-foreground">AI System • 8 min ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80">
                <Package className="h-5 w-5" />
                <span className="text-xs">New Shipment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-border/50 hover:bg-accent/50">
                <Truck className="h-5 w-5" />
                <span className="text-xs">Assign Driver</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-border/50 hover:bg-accent/50">
                <MapPin className="h-5 w-5" />
                <span className="text-xs">Track Load</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-border/50 hover:bg-accent/50">
                <Activity className="h-5 w-5" />
                <span className="text-xs">Run Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Fleet Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                <span className="text-sm font-medium text-foreground">6.8 MPG</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-green-500">+0.3 MPG vs. last month</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Driver Safety Score</span>
                <span className="text-sm font-medium text-foreground">92.4</span>
              </div>
              <Progress value={92.4} className="h-2" />
              <p className="text-xs text-green-500">+2.1 points improvement</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                <span className="text-sm font-medium text-foreground">4.7/5.0</span>
              </div>
              <Progress value={94} className="h-2" />
              <p className="text-xs text-green-500">+0.2 rating increase</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsOverview;