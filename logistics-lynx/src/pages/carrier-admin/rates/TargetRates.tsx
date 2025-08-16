/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, TrendingUp, AlertTriangle, CheckCircle, MapPin, Calendar, Edit, Trash2, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TargetRates = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false); // For now, keeping static data
  }, []);

  const targetRates = [
    {
      id: 1,
      route: 'Los Angeles, CA → New York, NY',
      equipment: 'Dry Van',
      targetRate: 3500,
      currentRate: 3200,
      achievement: 91.4,
      targetMargin: 30,
      currentMargin: 33.3,
      loads: 12,
      period: 'Q1 2024',
      status: 'below_target',
      trend: 'improving',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      route: 'Chicago, IL → Miami, FL',
      equipment: 'Reefer',
      targetRate: 2200,
      currentRate: 2100,
      achievement: 95.5,
      targetMargin: 25,
      currentMargin: 27.3,
      loads: 8,
      period: 'Q1 2024',
      status: 'near_target',
      trend: 'stable',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      route: 'Dallas, TX → Seattle, WA',
      equipment: 'Flatbed',
      targetRate: 2500,
      currentRate: 2600,
      achievement: 104.0,
      targetMargin: 28,
      currentMargin: 33.3,
      loads: 6,
      period: 'Q1 2024',
      status: 'exceeding',
      trend: 'improving',
      lastUpdated: '2024-01-12'
    },
    {
      id: 4,
      route: 'Atlanta, GA → Denver, CO',
      equipment: 'Dry Van',
      targetRate: 2400,
      currentRate: 2300,
      achievement: 95.8,
      targetMargin: 30,
      currentMargin: 31.4,
      loads: 10,
      period: 'Q1 2024',
      status: 'near_target',
      trend: 'declining',
      lastUpdated: '2024-01-14'
    },
    {
      id: 5,
      route: 'Phoenix, AZ → Houston, TX',
      equipment: 'Dry Van',
      targetRate: 2000,
      currentRate: 1850,
      achievement: 92.5,
      targetMargin: 25,
      currentMargin: 23.3,
      loads: 15,
      period: 'Q1 2024',
      status: 'below_target',
      trend: 'stable',
      lastUpdated: '2024-01-08'
    }
  ];

  const equipment = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Lowboy'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding': return 'text-green-600 bg-green-50';
      case 'near_target': return 'text-yellow-600 bg-yellow-50';
      case 'below_target': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeding': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'near_target': return <Target className="h-4 w-4 text-yellow-600" />;
      case 'below_target': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'declining': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      case 'stable': return <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>;
      default: return null;
    }
  };

  const overallAchievement = targetRates.reduce((sum, rate) => sum + rate.achievement, 0) / targetRates.length;
  const exceedingTargets = targetRates.filter(rate => rate.status === 'exceeding').length;
  const belowTargets = targetRates.filter(rate => rate.status === 'below_target').length;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="h-8 w-8 text-purple-600" />
              Target Rates
            </h1>
            <p className="text-muted-foreground">Set and track rate targets for routes and equipment</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Set Target
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Rate Target</DialogTitle>
                <DialogDescription>Set a new rate target for a specific route and equipment type</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="targetRoute">Route</Label>
                  <Input id="targetRoute" placeholder="e.g., Los Angeles, CA → New York, NY" />
                </div>
                <div>
                  <Label htmlFor="targetEquipment">Equipment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.map(eq => (
                        <SelectItem key={eq} value={eq.toLowerCase().replace(' ', '-')}>{eq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetRate">Target Rate ($)</Label>
                    <Input id="targetRate" placeholder="3500" />
                  </div>
                  <div>
                    <Label htmlFor="targetMargin">Target Margin (%)</Label>
                    <Input id="targetMargin" placeholder="30" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Select defaultValue="quarter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="quarter">Quarterly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create Target</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Achievement</p>
                  <p className="text-2xl font-bold">{overallAchievement.toFixed(1)}%</p>
                </div>
                <div className="flex items-center">
                  <Progress value={overallAchievement} className="w-12 mr-2" />
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Exceeding Targets</p>
                  <p className="text-2xl font-bold text-green-600">{exceedingTargets}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Below Targets</p>
                  <p className="text-2xl font-bold text-red-600">{belowTargets}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Targets</p>
                  <p className="text-2xl font-bold">{targetRates.length}</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Targets Performance</CardTitle>
            <CardDescription>Track performance against set rate targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Target Rate</TableHead>
                  <TableHead>Current Rate</TableHead>
                  <TableHead>Achievement</TableHead>
                  <TableHead>Target Margin</TableHead>
                  <TableHead>Current Margin</TableHead>
                  <TableHead>Loads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targetRates.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{target.route}</span>
                      </div>
                    </TableCell>
                    <TableCell>{target.equipment}</TableCell>
                    <TableCell className="font-medium">${target.targetRate.toLocaleString()}</TableCell>
                    <TableCell>${target.currentRate.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={target.achievement} className="w-16" />
                        <span className="text-sm font-medium">{target.achievement}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{target.targetMargin}%</TableCell>
                    <TableCell className="font-medium">{target.currentMargin}%</TableCell>
                    <TableCell>{target.loads}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(target.status)}
                        <Badge className={getStatusColor(target.status)}>
                          {target.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTrendIcon(target.trend)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
};

export default TargetRates;