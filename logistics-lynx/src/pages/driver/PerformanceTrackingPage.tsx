import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Clock, 
  Fuel, 
  Shield, 
  DollarSign,
  Truck,
  Target,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PerformanceMetrics {
  id: string;
  date: string;
  total_miles: number;
  total_loads: number;
  on_time_deliveries: number;
  late_deliveries: number;
  fuel_efficiency: number;
  safety_score: number;
  earnings_total: number;
  hours_driven: number;
  performance_rating: number;
}

const PerformanceTrackingPage = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('driver_performance')
        .select('*')
        .eq('driver_id', user.user.id)
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      toast({
        title: "Error",
        description: "Failed to load performance data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate aggregated metrics
  const totalMiles = metrics.reduce((sum, m) => sum + (m.total_miles || 0), 0);
  const totalLoads = metrics.reduce((sum, m) => sum + (m.total_loads || 0), 0);
  const totalEarnings = metrics.reduce((sum, m) => sum + (m.earnings_total || 0), 0);
  const onTimeDeliveries = metrics.reduce((sum, m) => sum + (m.on_time_deliveries || 0), 0);
  const lateDeliveries = metrics.reduce((sum, m) => sum + (m.late_deliveries || 0), 0);
  const totalDeliveries = onTimeDeliveries + lateDeliveries;
  const onTimePercentage = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0;
  const avgSafetyScore = metrics.length > 0 ? metrics.reduce((sum, m) => sum + (m.safety_score || 0), 0) / metrics.length : 0;
  const avgFuelEfficiency = metrics.length > 0 ? metrics.reduce((sum, m) => sum + (m.fuel_efficiency || 0), 0) / metrics.length : 0;
  const avgPerformanceRating = metrics.length > 0 ? metrics.reduce((sum, m) => sum + (m.performance_rating || 0), 0) / metrics.length : 0;

  const performanceStats = [
    {
      title: "Total Miles Driven",
      value: totalMiles.toLocaleString(),
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+2.5%",
      trend: "up"
    },
    {
      title: "Loads Completed",
      value: totalLoads.toString(),
      icon: Target,
      color: "text-green-600", 
      bgColor: "bg-green-50",
      change: "+8.1%",
      trend: "up"
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "+12.3%",
      trend: "up"
    },
    {
      title: "On-Time Delivery",
      value: `${onTimePercentage.toFixed(1)}%`,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+1.2%",
      trend: "up"
    },
    {
      title: "Safety Score",
      value: `${avgSafetyScore.toFixed(1)}/100`,
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "-0.3%",
      trend: "down"
    },
    {
      title: "Fuel Efficiency",
      value: `${avgFuelEfficiency.toFixed(1)} MPG`,
      icon: Fuel,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3.4%",
      trend: "up"
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Tracking</h1>
          <p className="text-muted-foreground">Monitor your driving performance and earnings</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Star className="w-4 h-4 mr-2" />
          Rating: {avgPerformanceRating.toFixed(1)}/5.0
        </Badge>
      </div>

      {/* Performance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-full`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendIcon className={`w-3 h-3 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Performance Metrics */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Score Breakdown</CardTitle>
                <CardDescription>Your overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-Time Delivery</span>
                    <span>{onTimePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={onTimePercentage} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Safety Score</span>
                    <span>{avgSafetyScore.toFixed(1)}/100</span>
                  </div>
                  <Progress value={avgSafetyScore} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Efficiency</span>
                    <span>{((avgFuelEfficiency / 12) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(avgFuelEfficiency / 12) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Rating</span>
                    <span>{((avgPerformanceRating / 5) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(avgPerformanceRating / 5) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest milestones and awards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Award className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Safety Champion</p>
                      <p className="text-sm text-muted-foreground">30 days without incidents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">On-Time Delivery Pro</p>
                      <p className="text-sm text-muted-foreground">95%+ on-time delivery rate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Fuel className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Fuel Efficiency Expert</p>
                      <p className="text-sm text-muted-foreground">Above average fuel economy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Metrics</CardTitle>
              <CardDescription>Track your safety performance and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{avgSafetyScore.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Safety Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Incidents This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">30</div>
                  <div className="text-sm text-muted-foreground">Days Without Incident</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Monitor your operational efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{avgFuelEfficiency.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">MPG Average</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{onTimePercentage.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{(totalMiles / Math.max(totalLoads, 1)).toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Miles per Load</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Track your earnings and financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${totalEarnings.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">${(totalEarnings / Math.max(totalLoads, 1)).toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Earnings per Load</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">${(totalEarnings / Math.max(totalMiles, 1)).toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Earnings per Mile</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceTrackingPage;