/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ShipmentList } from '@/components/shipments/ShipmentList';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  TrendingUp,
  Activity,
  Brain,
  Target,
  Globe,
  Sparkles,
  BarChart3,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';

const ModernShipmentsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState('');
  
  // Determine which component to render based on current route
  const getCurrentSection = () => {
    if (currentPath.includes('/shipments/new')) return 'new';
    if (currentPath.includes('/shipments/assigned')) return 'assigned';
    if (currentPath.includes('/shipments/pending')) return 'pending';
    if (currentPath.includes('/shipments/in-transit')) return 'in-transit';
    if (currentPath.includes('/shipments/delivered')) return 'delivered';
    return 'all';
  };

  const currentSection = getCurrentSection();
  
  const getSectionTitle = () => {
    const titles = {
      all: 'All Shipments',
      new: 'New Shipments',
      assigned: 'Assigned Shipments',
      pending: 'Pending Shipments',
      'in-transit': 'In Transit Shipments',
      delivered: 'Delivered Shipments'
    };
    return titles[currentSection] || 'AI-Powered Shipments';
  };

  // Mock data for dashboard stats
  const shipmentStats = [
    {
      title: 'Total Shipments',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      title: 'In Transit',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: Truck,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-500/10 to-green-500/10'
    },
    {
      title: 'Pending',
      value: '23',
      change: '-15.3%',
      trend: 'down',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-500/10 to-orange-500/10'
    },
    {
      title: 'Delivered',
      value: '2,668',
      change: '+9.7%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-500/10 to-purple-500/10'
    }
  ];

  const aiInsights = [
    {
      title: 'Route Optimization',
      description: 'AI suggests 15% faster routes for current shipments',
      impact: 'Save 2.5 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Predictive Delays',
      description: '3 shipments at risk of delay due to weather patterns',
      impact: 'Proactive alerts sent',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Fuel Efficiency',
      description: 'Smart routing reduces fuel consumption by 12%',
      impact: '$2,847 saved',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200'
    }
  ];

  return (
    <UltraModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        {/* Ultra-Modern Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-border/60 sticky top-0 z-50">
          <div className="container-responsive py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-600 via-purple-600 to-violet-600 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Package className="h-8 w-8 text-white relative z-10" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                    {getSectionTitle()}
                  </h1>
                  <p className="text-muted-foreground text-lg font-medium mt-2">
                    Intelligent logistics management with real-time optimization
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 font-semibold">
                      <Zap className="h-3 w-3 mr-2" />
                      AI Active
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 font-semibold">
                      <Brain className="h-3 w-3 mr-2" />
                      Auto-Optimization
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shipments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80 h-11 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all duration-200"
                  />
                </div>
                <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  New Shipment
                </Button>
              </div>
            </div>

            {/* Modern Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {shipmentStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                          <div className="flex items-center gap-2">
                            {stat.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Activity className="h-4 w-4 text-amber-600" />
                            )}
                            <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="container-responsive py-8">
          <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-200/30 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-indigo-800">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl">AI Intelligence Dashboard</span>
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-indigo-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${insight.bgColor} backdrop-blur-sm`}>
                    <h4 className={`font-semibold ${insight.color} mb-2`}>{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">{insight.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background transition-all duration-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Shipment Content */}
          <div className="space-y-6">
            <ShipmentList />
          </div>
        </div>
      </div>
    </UltraModernLayout>
  );
};

export default ModernShipmentsPage;