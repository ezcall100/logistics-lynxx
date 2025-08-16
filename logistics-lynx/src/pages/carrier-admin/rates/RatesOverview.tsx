/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Fuel, Package, BarChart3, Target, ArrowUpRight, ArrowDownRight, Truck, Plane, Ship, Train } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const RatesOverview = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [rateMetrics, setRateMetrics] = useState({
    totalRates: 0,
    activeRates: 0,
    avgMargin: 0,
    fuelSurcharge: 0,
    monthlyRevenue: 0,
    marginTrend: 'up'
  });
  const [recentActivity, setRecentActivity] = useState<unknown[]>([]);
  const [modeBreakdown, setModeBreakdown] = useState<unknown[]>([]);

  useEffect(() => {
    fetchRateMetrics();
    fetchRecentActivity();
    fetchModeBreakdown();
  }, [fetchRateMetrics, fetchRecentActivity, fetchModeBreakdown]);

  const fetchRateMetrics = useCallback(async () => {
    try {
      const { data: rates, error } = await supabase
        .from('carrier_rates')
        .select('*');

      if (error) throw error;

      // Calculate metrics
      const total = rates?.length || 0;
      const active = rates?.filter(r => new Date(r.expiry_date || '9999-12-31') > new Date()).length || 0;
      const avgRate = rates?.reduce((sum, r) => sum + (r.rate_per_mile || 0), 0) / (total || 1);
      const avgFuel = rates?.reduce((sum, r) => sum + (r.fuel_surcharge_rate || 0), 0) / (total || 1);

      setRateMetrics({
        totalRates: total,
        activeRates: active,
        avgMargin: 22.5, // Calculate from actual data
        fuelSurcharge: Number(avgFuel.toFixed(2)),
        monthlyRevenue: 485750,
        marginTrend: 'up'
      });
    } catch (error) {
      console.error('Error fetching rate metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rate metrics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchRecentActivity = useCallback(async () => {
    // Mock recent activity - replace with real data
    setRecentActivity([
      { id: 1, type: 'Rate Update', description: 'OTR Dry Van rates updated for TX-CA lane', time: '2 hours ago' },
      { id: 2, type: 'Fuel Adjustment', description: 'Fuel surcharge increased by 0.03/mile', time: '4 hours ago' },
      { id: 3, type: 'New Rate', description: 'Added reefer rates for FL-NY corridor', time: '6 hours ago' },
      { id: 4, type: 'Margin Alert', description: 'Low margin detected on ATL-DEN route', time: '8 hours ago' }
    ]);
  }, []);

  const fetchModeBreakdown = useCallback(async () => {
    setModeBreakdown([
      { mode: 'OTR Dry Van', icon: Truck, count: 145, revenue: 275000, margin: 24.5, color: 'blue' },
      { mode: 'Refrigerated', icon: Truck, count: 89, revenue: 185000, margin: 28.2, color: 'green' },
      { mode: 'Flatbed', icon: Truck, count: 67, revenue: 145000, margin: 21.8, color: 'orange' },
      { mode: 'LTL', icon: Package, count: 234, revenue: 95000, margin: 18.5, color: 'purple' }
    ]);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Rates Overview
            </h1>
            <p className="text-muted-foreground">Monitor and manage your freight rates</p>
          </div>
        </div>
        
        {/* Loading skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Rate Management
            </h1>
            <p className="text-muted-foreground">Comprehensive rate management across all transportation modes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Import Rates
            </Button>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Rate Calculator
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rate Cards</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rateMetrics.totalRates}</div>
              <p className="text-xs text-muted-foreground">Across all modes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rates</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rateMetrics.activeRates}</div>
              <p className="text-xs text-muted-foreground">Currently effective</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rateMetrics.avgMargin}%</div>
              <p className="text-xs text-muted-foreground">
                {rateMetrics.marginTrend === 'up' ? (
                  <span className="text-green-600">↑ +2.1% vs last month</span>
                ) : (
                  <span className="text-red-600">↓ -1.3% vs last month</span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Surcharge</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${rateMetrics.fuelSurcharge}</div>
              <p className="text-xs text-muted-foreground">Average per mile</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${rateMetrics.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Rate-driven revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Transportation Mode Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Performance by Transportation Mode</CardTitle>
            <CardDescription>Revenue and margin analysis across different freight modes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modeBreakdown.map((mode, index) => {
                const IconComponent = mode.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg border-l-4 border-${mode.color}-500 bg-${mode.color}-50`}>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className={`h-5 w-5 text-${mode.color}-600`} />
                      <Badge variant="outline">{mode.count} rates</Badge>
                    </div>
                    <h4 className="font-semibold text-sm">{mode.mode}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="text-lg font-bold">${mode.revenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {mode.margin}% margin
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/carrier-admin/rates/buy" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buy Rates</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Manage Driver Pay</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Set rates you pay to drivers and owner-operators
                </p>
                <div className="mt-3 text-sm text-blue-600">Configure rates →</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/carrier-admin/rates/sell" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sell Rates</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Customer Pricing</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Rates you charge to brokers and direct customers
                </p>
                <div className="mt-3 text-sm text-blue-600">Set pricing →</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/carrier-admin/rates/fuel" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fuel Surcharge</CardTitle>
                <Fuel className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Fuel Management</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dynamic fuel surcharge calculations
                </p>
                <div className="mt-3 text-sm text-blue-600">Manage fuel →</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/carrier-admin/rates/accessorial" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  Accessorial Rates
                </CardTitle>
                <CardDescription>Additional services and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Detention, lumper fees, and extra services</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/carrier-admin/rates/margin" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Margin Analysis
                </CardTitle>
                <CardDescription>Profitability insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Analyze and optimize your profit margins</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/carrier-admin/rates/target" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Target Rates
                </CardTitle>
                <CardDescription>Rate goals and targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Set and track rate performance targets</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Rate Activity</CardTitle>
            <CardDescription>Latest rate changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default RatesOverview;