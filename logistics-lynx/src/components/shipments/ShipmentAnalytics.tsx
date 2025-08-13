import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target,
  Users,
  Truck,
  Route,
  Activity,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ShipmentAnalytics = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
          <p className="text-muted-foreground">Performance insights and operational metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-green-500">$2.4M</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">+15.3%</span>
                </div>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Shipments</p>
                <p className="text-3xl font-bold text-blue-500">1,247</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-500">+8.7%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Truck className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                <p className="text-3xl font-bold text-purple-500">94.8%</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-500">+2.1%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Target className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Margin</p>
                <p className="text-3xl font-bold text-orange-500">18.6%</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-500">+0.8%</span>
                </div>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Revenue Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Revenue Chart Placeholder</p>
                <p className="text-xs text-muted-foreground">Chart.js / Recharts integration</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-lg font-bold text-foreground">$284.5K</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Last Month</p>
                <p className="text-lg font-bold text-foreground">$263.2K</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-lg font-bold text-green-500">+8.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                <span className="text-sm font-medium text-foreground">94.8%</span>
              </div>
              <Progress value={94.8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                <span className="text-sm font-medium text-foreground">4.7/5.0</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Fleet Utilization</span>
                <span className="text-sm font-medium text-foreground">87.3%</span>
              </div>
              <Progress value={87.3} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                <span className="text-sm font-medium text-foreground">6.8 MPG</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transport Mode Performance */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="h-5 w-5 text-primary" />
              <span>Transport Modes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Full Truckload</p>
                  <p className="text-sm text-muted-foreground">687 shipments</p>
                </div>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                  55%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">LTL</p>
                  <p className="text-sm text-muted-foreground">342 shipments</p>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                  27%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Intermodal</p>
                  <p className="text-sm text-muted-foreground">218 shipments</p>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-500">
                  18%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Top Customers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Walmart Inc.</p>
                  <p className="text-sm text-muted-foreground">$487K revenue</p>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                  #1
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Amazon Logistics</p>
                  <p className="text-sm text-muted-foreground">$356K revenue</p>
                </div>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                  #2
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Target Corporation</p>
                  <p className="text-sm text-muted-foreground">$298K revenue</p>
                </div>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-500">
                  #3
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Performance */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Fleet Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg">
                <p className="text-2xl font-bold text-blue-500">45</p>
                <p className="text-xs text-muted-foreground">Active Trucks</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                <p className="text-2xl font-bold text-green-500">87%</p>
                <p className="text-xs text-muted-foreground">Utilization</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Miles Driven</span>
                  <span className="text-foreground">124,567</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Fuel Costs</span>
                  <span className="text-foreground">$47,823</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Maintenance</span>
                  <span className="text-foreground">$12,456</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Regional Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Top Performing Routes</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded">
                  <span className="text-sm text-foreground">Chicago → Atlanta</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-500">+23%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded">
                  <span className="text-sm text-foreground">LA → Phoenix</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">+18%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded">
                  <span className="text-sm text-foreground">Seattle → Denver</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-500">+15%</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Volume by Region</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Southeast</span>
                  <span className="text-sm font-medium text-foreground">342 loads</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Southwest</span>
                  <span className="text-sm font-medium text-foreground">298 loads</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Northwest</span>
                  <span className="text-sm font-medium text-foreground">187 loads</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Delivery Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">On-Time %</span>
                    <span className="text-foreground">94.8%</span>
                  </div>
                  <Progress value={94.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Early %</span>
                    <span className="text-foreground">12.4%</span>
                  </div>
                  <Progress value={12.4} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Late %</span>
                    <span className="text-foreground">5.2%</span>
                  </div>
                  <Progress value={5.2} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentAnalytics;