/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Fuel, Clock, Route, TrendingUp, Target, Calendar, Download, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface EfficiencyMetric {
  id: string;
  date: string;
  loadNumber: string;
  route: string;
  totalMiles: number;
  fuelUsed: number;
  mpg: number;
  drivingTime: number;
  avgSpeed: number;
  idleTime: number;
  fuelCost: number;
  efficiency: 'excellent' | 'good' | 'average' | 'poor';
}

const efficiencyData: EfficiencyMetric[] = [
  {
    id: 'EF001',
    date: '2024-01-19',
    loadNumber: 'LD-789123',
    route: 'Denver, CO → Phoenix, AZ',
    totalMiles: 587,
    fuelUsed: 94.3,
    mpg: 6.22,
    drivingTime: 8.5,
    avgSpeed: 69.1,
    idleTime: 0.8,
    fuelCost: 366.47,
    efficiency: 'excellent'
  },
  {
    id: 'EF002',
    date: '2024-01-18',
    loadNumber: 'LD-789124',
    route: 'Kansas City, MO → Denver, CO',
    totalMiles: 523,
    fuelUsed: 87.2,
    mpg: 6.00,
    drivingTime: 9.2,
    avgSpeed: 56.8,
    idleTime: 1.5,
    fuelCost: 338.94,
    efficiency: 'good'
  },
  {
    id: 'EF003',
    date: '2024-01-17',
    loadNumber: 'LD-789125',
    route: 'Chicago, IL → Kansas City, MO',
    totalMiles: 412,
    fuelUsed: 68.9,
    mpg: 5.98,
    drivingTime: 7.8,
    avgSpeed: 52.8,
    idleTime: 2.1,
    fuelCost: 267.86,
    efficiency: 'average'
  },
  {
    id: 'EF004',
    date: '2024-01-16',
    loadNumber: 'LD-789126',
    route: 'Detroit, MI → Chicago, IL',
    totalMiles: 238,
    fuelUsed: 42.7,
    mpg: 5.57,
    drivingTime: 5.5,
    avgSpeed: 43.3,
    idleTime: 1.8,
    fuelCost: 166.05,
    efficiency: 'poor'
  }
];

const EfficiencyPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [efficiencyFilter, setEfficiencyFilter] = useState('all');
  const [isSettingGoals, setIsSettingGoals] = useState(false);

  const form = useForm({
    defaultValues: {
      mpgTarget: '6.5',
      idleTimeTarget: '1.0',
      avgSpeedTarget: '65',
      fuelCostTarget: '300'
    }
  });

  const handleSetGoals = (data: unknown) => {
    console.log('Setting efficiency goals:', data);
    toast.success('Efficiency goals updated successfully');
    setIsSettingGoals(false);
  };

  const getEfficiencyBadge = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-500">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-500">Average</Badge>;
      case 'poor':
        return <Badge className="bg-red-500">Poor</Badge>;
      default:
        return <Badge variant="outline">{efficiency}</Badge>;
    }
  };

  const filteredData = efficiencyData.filter(metric => 
    efficiencyFilter === 'all' || metric.efficiency === efficiencyFilter
  );

  const avgMPG = filteredData.reduce((sum, metric) => sum + metric.mpg, 0) / filteredData.length;
  const avgIdleTime = filteredData.reduce((sum, metric) => sum + metric.idleTime, 0) / filteredData.length;
  const totalFuelCost = filteredData.reduce((sum, metric) => sum + metric.fuelCost, 0);
  const totalMiles = filteredData.reduce((sum, metric) => sum + metric.totalMiles, 0);

  const handleExport = () => {
    console.log('Exporting efficiency data');
    toast.success('Efficiency report exported successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Efficiency</h1>
          <p className="text-muted-foreground">Monitor your fuel efficiency and driving performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isSettingGoals} onOpenChange={setIsSettingGoals}>
            <DialogTrigger asChild>
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Set Goals
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Efficiency Goals</DialogTitle>
                <DialogDescription>Define your performance targets</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSetGoals)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mpgTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MPG Target</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="6.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="idleTimeTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Idle Time (hours)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="1.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avgSpeedTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Average Speed (mph)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="65" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelCostTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Fuel Cost per Trip ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsSettingGoals(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Goals</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average MPG</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgMPG.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Target: 6.5 MPG</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgIdleTime.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">Per trip average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Costs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFuelCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Mile</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalFuelCost / totalMiles).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Fuel cost per mile</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Goals vs Actual</CardTitle>
          <CardDescription>Track your progress against set targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MPG Performance</span>
                  <span>{avgMPG.toFixed(2)} / 6.5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((avgMPG / 6.5) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Idle Time Control</span>
                  <span>{avgIdleTime.toFixed(1)}h / 1.0h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${avgIdleTime <= 1.0 ? 'bg-green-600' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((avgIdleTime / 1.0) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Speed Optimization</span>
                  <span>58.5 / 65 mph</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((58.5 / 65) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fuel Cost Control</span>
                  <span>${(totalFuelCost / filteredData.length).toFixed(0)} / $300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(((totalFuelCost / filteredData.length) / 300) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency History</CardTitle>
          <CardDescription>Detailed performance metrics for each trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div>
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
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
            <div>
              <Label htmlFor="efficiency">Efficiency Rating</Label>
              <Select value={efficiencyFilter} onValueChange={setEfficiencyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Load #</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Miles</TableHead>
                <TableHead>MPG</TableHead>
                <TableHead>Avg Speed</TableHead>
                <TableHead>Idle Time</TableHead>
                <TableHead>Fuel Cost</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell>{metric.date}</TableCell>
                  <TableCell className="font-medium">{metric.loadNumber}</TableCell>
                  <TableCell>{metric.route}</TableCell>
                  <TableCell>{metric.totalMiles}</TableCell>
                  <TableCell className="font-medium">{metric.mpg.toFixed(2)}</TableCell>
                  <TableCell>{metric.avgSpeed.toFixed(1)} mph</TableCell>
                  <TableCell>{metric.idleTime.toFixed(1)}h</TableCell>
                  <TableCell>${metric.fuelCost.toFixed(2)}</TableCell>
                  <TableCell>{getEfficiencyBadge(metric.efficiency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Improvement Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Tips</CardTitle>
          <CardDescription>Recommendations to improve your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Fuel Efficiency</h4>
              <ul className="space-y-2 text-sm">
                <li>• Maintain steady speeds between 55-65 mph</li>
                <li>• Use cruise control on highways</li>
                <li>• Keep tires properly inflated</li>
                <li>• Plan routes to avoid heavy traffic</li>
                <li>• Perform regular engine maintenance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Reduce Idle Time</h4>
              <ul className="space-y-2 text-sm">
                <li>• Turn off engine during breaks over 3 minutes</li>
                <li>• Use APU for climate control when parked</li>
                <li>• Plan stops to minimize waiting time</li>
                <li>• Communicate with dispatch for efficient scheduling</li>
                <li>• Use truck stop reservation systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EfficiencyPage;