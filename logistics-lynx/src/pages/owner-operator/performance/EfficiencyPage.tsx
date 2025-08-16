/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge, TrendingUp, TrendingDown, Fuel, Clock, Route, Zap, Target, BarChart3, Download, Filter, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

interface EfficiencyMetric {
  id: string;
  date: string;
  loadNumber: string;
  route: string;
  plannedMiles: number;
  actualMiles: number;
  mileageEfficiency: number;
  plannedTime: number; // hours
  actualTime: number; // hours
  timeEfficiency: number;
  fuelUsed: number; // gallons
  mpg: number;
  fuelEfficiency: number;
  emptyMiles: number;
  loadedMiles: number;
  utilizationRate: number;
  idleTime: number; // hours
  drivingTime: number; // hours
  overallScore: number;
  category: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

const mockEfficiencyData: EfficiencyMetric[] = [
  {
    id: 'eff-001',
    date: '2024-07-19',
    loadNumber: 'LD-456789',
    route: 'Chicago, IL → Atlanta, GA',
    plannedMiles: 583,
    actualMiles: 595,
    mileageEfficiency: 97.98,
    plannedTime: 10.5,
    actualTime: 11.2,
    timeEfficiency: 93.75,
    fuelUsed: 97.2,
    mpg: 6.12,
    fuelEfficiency: 95.8,
    emptyMiles: 12,
    loadedMiles: 583,
    utilizationRate: 98.0,
    idleTime: 1.5,
    drivingTime: 9.7,
    overallScore: 92.4,
    category: 'excellent'
  },
  {
    id: 'eff-002',
    date: '2024-07-18',
    loadNumber: 'LD-456788',
    route: 'Atlanta, GA → Miami, FL',
    plannedMiles: 462,
    actualMiles: 478,
    mileageEfficiency: 96.65,
    plannedTime: 8.0,
    actualTime: 8.5,
    timeEfficiency: 94.12,
    fuelUsed: 71.5,
    mpg: 6.69,
    fuelEfficiency: 98.2,
    emptyMiles: 16,
    loadedMiles: 462,
    utilizationRate: 96.7,
    idleTime: 0.8,
    drivingTime: 7.7,
    overallScore: 94.6,
    category: 'excellent'
  },
  {
    id: 'eff-003',
    date: '2024-07-17',
    loadNumber: 'LD-456787',
    route: 'Miami, FL → Houston, TX',
    plannedMiles: 673,
    actualMiles: 702,
    mileageEfficiency: 95.87,
    plannedTime: 12.0,
    actualTime: 14.0,
    timeEfficiency: 85.71,
    fuelUsed: 108.7,
    mpg: 6.46,
    fuelEfficiency: 94.1,
    emptyMiles: 29,
    loadedMiles: 673,
    utilizationRate: 95.9,
    idleTime: 2.8,
    drivingTime: 11.2,
    overallScore: 87.9,
    category: 'good'
  },
  {
    id: 'eff-004',
    date: '2024-07-16',
    loadNumber: 'LD-456786',
    route: 'Houston, TX → Denver, CO',
    plannedMiles: 518,
    actualMiles: 534,
    mileageEfficiency: 97.00,
    plannedTime: 9.5,
    actualTime: 10.8,
    timeEfficiency: 87.96,
    fuelUsed: 89.3,
    mpg: 5.98,
    fuelEfficiency: 91.3,
    emptyMiles: 16,
    loadedMiles: 518,
    utilizationRate: 97.0,
    idleTime: 2.2,
    drivingTime: 8.6,
    overallScore: 89.1,
    category: 'good'
  },
  {
    id: 'eff-005',
    date: '2024-07-15',
    loadNumber: 'LD-456785',
    route: 'Denver, CO → Chicago, IL',
    plannedMiles: 587,
    actualMiles: 612,
    mileageEfficiency: 95.92,
    plannedTime: 10.8,
    actualTime: 12.5,
    timeEfficiency: 86.40,
    fuelUsed: 98.8,
    mpg: 6.19,
    fuelEfficiency: 93.7,
    emptyMiles: 25,
    loadedMiles: 587,
    utilizationRate: 95.9,
    idleTime: 3.1,
    drivingTime: 9.4,
    overallScore: 86.2,
    category: 'good'
  }
];

interface KPITarget {
  metric: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on_track' | 'behind' | 'ahead';
}

const mockKPITargets: KPITarget[] = [
  { metric: 'Overall Efficiency Score', current: 90.0, target: 85.0, unit: '%', trend: 'up', status: 'ahead' },
  { metric: 'Fuel Efficiency (MPG)', current: 6.29, target: 6.50, unit: 'mpg', trend: 'down', status: 'behind' },
  { metric: 'Route Optimization', current: 96.7, target: 95.0, unit: '%', trend: 'up', status: 'ahead' },
  { metric: 'Time Utilization', current: 89.6, target: 90.0, unit: '%', trend: 'stable', status: 'on_track' },
  { metric: 'Asset Utilization', current: 96.7, target: 95.0, unit: '%', trend: 'up', status: 'ahead' },
  { metric: 'Idle Time Reduction', current: 2.08, target: 2.50, unit: 'hrs', trend: 'up', status: 'ahead' }
];

const EfficiencyPage: React.FC = () => {
  const [efficiencyData, setEfficiencyData] = useState<EfficiencyMetric[]>(mockEfficiencyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('this_month');
  const [selectedMetric, setSelectedMetric] = useState<EfficiencyMetric | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredData = efficiencyData.filter(metric => {
    const matchesSearch = metric.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || metric.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'excellent':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Excellent</Badge>;
      case 'good':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Good</Badge>;
      case 'average':
        return <Badge variant="secondary">Average</Badge>;
      case 'needs_improvement':
        return <Badge variant="destructive">Needs Improvement</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Ahead</Badge>;
      case 'on_track':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">On Track</Badge>;
      case 'behind':
        return <Badge variant="destructive">Behind</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Target className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const handleDownloadReport = () => {
    toast.success('Efficiency report downloaded successfully');
  };

  const handleViewDetails = (metric: EfficiencyMetric) => {
    setSelectedMetric(metric);
  };

  const handleOptimizationSuggestion = (id: string) => {
    toast.success('Optimization suggestions generated');
  };

  // Calculate summary statistics
  const avgOverallScore = filteredData.length > 0 ? filteredData.reduce((sum, m) => sum + m.overallScore, 0) / filteredData.length : 0;
  const avgMPG = filteredData.length > 0 ? filteredData.reduce((sum, m) => sum + m.mpg, 0) / filteredData.length : 0;
  const avgUtilization = filteredData.length > 0 ? filteredData.reduce((sum, m) => sum + m.utilizationRate, 0) / filteredData.length : 0;
  const avgIdleTime = filteredData.length > 0 ? filteredData.reduce((sum, m) => sum + m.idleTime, 0) / filteredData.length : 0;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Efficiency Dashboard</h1>
        <p className="text-muted-foreground">Monitor and optimize your operational efficiency metrics</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="targets">KPI Targets</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <p className="text-2xl font-bold text-foreground">{avgOverallScore.toFixed(1)}%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.2% vs last month
                    </p>
                  </div>
                  <Gauge className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fuel Efficiency</p>
                    <p className="text-2xl font-bold text-foreground">{avgMPG.toFixed(2)} MPG</p>
                    <p className="text-xs text-red-600 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -0.3 vs target
                    </p>
                  </div>
                  <Fuel className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asset Utilization</p>
                    <p className="text-2xl font-bold text-foreground">{avgUtilization.toFixed(1)}%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Above target
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Idle Time</p>
                    <p className="text-2xl font-bold text-foreground">{avgIdleTime.toFixed(1)}h</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Below target
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredData.filter(d => d.category === 'excellent').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Excellent Performance</div>
                  <div className="text-xs text-muted-foreground">
                    ({((filteredData.filter(d => d.category === 'excellent').length / filteredData.length) * 100).toFixed(1)}%)
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredData.filter(d => d.category === 'good').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Good Performance</div>
                  <div className="text-xs text-muted-foreground">
                    ({((filteredData.filter(d => d.category === 'good').length / filteredData.length) * 100).toFixed(1)}%)
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {filteredData.filter(d => d.category === 'average').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Performance</div>
                  <div className="text-xs text-muted-foreground">
                    ({((filteredData.filter(d => d.category === 'average').length / filteredData.length) * 100).toFixed(1)}%)
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {filteredData.filter(d => d.category === 'needs_improvement').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Needs Improvement</div>
                  <div className="text-xs text-muted-foreground">
                    ({((filteredData.filter(d => d.category === 'needs_improvement').length / filteredData.length) * 100).toFixed(1)}%)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by load number or route..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleDownloadReport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Efficiency Metrics</CardTitle>
              <CardDescription>Comprehensive efficiency analysis by load</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Load #</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Miles Efficiency</TableHead>
                      <TableHead>Time Efficiency</TableHead>
                      <TableHead>Fuel MPG</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Overall Score</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((metric) => (
                      <TableRow key={metric.id}>
                        <TableCell className="font-medium">{metric.date}</TableCell>
                        <TableCell>{metric.loadNumber}</TableCell>
                        <TableCell>
                          <div className="text-sm">{metric.route}</div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${metric.mileageEfficiency >= 97 ? 'text-green-600' : metric.mileageEfficiency >= 95 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {metric.mileageEfficiency.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${metric.timeEfficiency >= 90 ? 'text-green-600' : metric.timeEfficiency >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {metric.timeEfficiency.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${metric.mpg >= 6.5 ? 'text-green-600' : metric.mpg >= 6.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {metric.mpg.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${metric.utilizationRate >= 97 ? 'text-green-600' : metric.utilizationRate >= 95 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {metric.utilizationRate.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`text-lg font-bold ${metric.overallScore >= 90 ? 'text-green-600' : metric.overallScore >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {metric.overallScore.toFixed(1)}
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(metric.category)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(metric)}
                            >
                              Details
                            </Button>
                            {metric.category === 'needs_improvement' && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleOptimizationSuggestion(metric.id)}
                              >
                                Optimize
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-6">
          {/* KPI Targets Table */}
          <Card>
            <CardHeader>
              <CardTitle>KPI Targets & Performance</CardTitle>
              <CardDescription>Track your progress against efficiency targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKPITargets.map((kpi, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-semibold">{kpi.metric}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <div>
                                  <span className="text-sm text-muted-foreground">Current: </span>
                                  <span className="font-semibold">{kpi.current.toFixed(kpi.unit === 'mpg' ? 2 : 1)} {kpi.unit}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">Target: </span>
                                  <span className="font-semibold">{kpi.target.toFixed(kpi.unit === 'mpg' ? 2 : 1)} {kpi.unit}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getTrendIcon(kpi.trend)}
                                  {getStatusBadge(kpi.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${kpi.status === 'ahead' ? 'text-green-600' : kpi.status === 'on_track' ? 'text-blue-600' : 'text-red-600'}`}>
                            {kpi.status === 'ahead' ? '+' : kpi.status === 'behind' ? '-' : ''}
                            {Math.abs(kpi.current - kpi.target).toFixed(kpi.unit === 'mpg' ? 2 : 1)} {kpi.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">vs target</div>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${kpi.status === 'ahead' ? 'bg-green-600' : kpi.status === 'on_track' ? 'bg-blue-600' : 'bg-red-600'}`}
                            style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          {/* Optimization Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Fuel Efficiency Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Speed Optimization</h4>
                      <p className="text-sm text-yellow-700">Maintain 60-65 mph to improve MPG by 0.5-0.8</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Route Planning</h4>
                      <p className="text-sm text-blue-700">Use traffic-aware routing to avoid congestion</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Maintenance Schedule</h4>
                      <p className="text-sm text-green-700">Regular maintenance can improve efficiency by 5-10%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Management Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Idle Time Reduction</h4>
                      <p className="text-sm text-yellow-700">Target less than 2 hours idle time per day</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-start gap-3">
                    <Route className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Load Planning</h4>
                      <p className="text-sm text-blue-700">Schedule back-hauls to minimize empty miles</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Delivery Windows</h4>
                      <p className="text-sm text-green-700">Optimize delivery timing to avoid wait times</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Action Items</CardTitle>
              <CardDescription>Prioritized improvements based on your efficiency data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold">High Priority: Improve Fuel Efficiency</div>
                      <div className="text-sm text-muted-foreground">Current MPG is 0.3 below target</div>
                    </div>
                  </div>
                  <Button variant="default" size="sm">
                    Take Action
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Medium Priority: Reduce Idle Time</div>
                      <div className="text-sm text-muted-foreground">Average 2.1 hours per day vs 2.0 target</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Low Priority: Route Optimization</div>
                      <div className="text-sm text-muted-foreground">Currently performing above target</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    On Track
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed View Dialog */}
      <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMetric && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Efficiency Analysis: {selectedMetric.loadNumber}
                </DialogTitle>
                <DialogDescription>
                  Detailed efficiency breakdown and performance analysis
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${selectedMetric.overallScore >= 90 ? 'text-green-600' : selectedMetric.overallScore >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {selectedMetric.overallScore.toFixed(1)}
                      </div>
                      <div className="text-muted-foreground">Overall Efficiency Score</div>
                      <div className="mt-2">{getCategoryBadge(selectedMetric.category)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mileage Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Planned Miles:</span>
                          <span className="font-semibold">{selectedMetric.plannedMiles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Actual Miles:</span>
                          <span className="font-semibold">{selectedMetric.actualMiles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span className={`font-semibold ${selectedMetric.mileageEfficiency >= 97 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {selectedMetric.mileageEfficiency.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Planned Time:</span>
                          <span className="font-semibold">{selectedMetric.plannedTime.toFixed(1)}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Actual Time:</span>
                          <span className="font-semibold">{selectedMetric.actualTime.toFixed(1)}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span className={`font-semibold ${selectedMetric.timeEfficiency >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {selectedMetric.timeEfficiency.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Fuel Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Fuel Used:</span>
                          <span className="font-semibold">{selectedMetric.fuelUsed.toFixed(1)} gal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MPG:</span>
                          <span className="font-semibold">{selectedMetric.mpg.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span className={`font-semibold ${selectedMetric.fuelEfficiency >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {selectedMetric.fuelEfficiency.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Utilization Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asset Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Loaded Miles</div>
                        <div className="font-semibold">{selectedMetric.loadedMiles}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Empty Miles</div>
                        <div className="font-semibold">{selectedMetric.emptyMiles}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Utilization Rate</div>
                        <div className={`font-semibold ${selectedMetric.utilizationRate >= 97 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {selectedMetric.utilizationRate.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Idle Time</div>
                        <div className="font-semibold">{selectedMetric.idleTime.toFixed(1)}h</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EfficiencyPage;