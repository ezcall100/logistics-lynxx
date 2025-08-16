/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, Plus, Search, Filter, DollarSign, MapPin, Calendar, BarChart3, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const TargetRates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLane, setSelectedLane] = useState('all');

  const targetRates = [
    { 
      id: 1, 
      lane: 'Los Angeles, CA → New York, NY', 
      currentRate: 3500, 
      targetRate: 3750, 
      variance: 250, 
      achievement: 93.3,
      status: 'close',
      lastUpdate: '2024-03-15',
      volume: 125
    },
    { 
      id: 2, 
      lane: 'Chicago, IL → Miami, FL', 
      currentRate: 2400, 
      targetRate: 2200, 
      variance: 200, 
      achievement: 109.1,
      status: 'achieved',
      lastUpdate: '2024-03-18',
      volume: 98
    },
    { 
      id: 3, 
      lane: 'Dallas, TX → Seattle, WA', 
      currentRate: 2800, 
      targetRate: 3000, 
      variance: -200, 
      achievement: 93.3,
      status: 'below',
      lastUpdate: '2024-03-20',
      volume: 76
    },
    { 
      id: 4, 
      lane: 'Atlanta, GA → Denver, CO', 
      currentRate: 2350, 
      targetRate: 2500, 
      variance: -150, 
      achievement: 94.0,
      status: 'close',
      lastUpdate: '2024-03-22',
      volume: 89
    },
  ];

  const marketTargets = [
    { 
      id: 1, 
      equipment: 'Dry Van', 
      avgTarget: 2850, 
      currentAvg: 2720, 
      variance: -130, 
      achievement: 95.4,
      volume: 388 
    },
    { 
      id: 2, 
      equipment: 'Reefer', 
      avgTarget: 3200, 
      currentAvg: 3350, 
      variance: 150, 
      achievement: 104.7,
      volume: 156 
    },
    { 
      id: 3, 
      equipment: 'Flatbed', 
      avgTarget: 3100, 
      currentAvg: 2980, 
      variance: -120, 
      achievement: 96.1,
      volume: 89 
    },
    { 
      id: 4, 
      equipment: 'Step Deck', 
      avgTarget: 3500, 
      currentAvg: 3650, 
      variance: 150, 
      achievement: 104.3,
      volume: 45 
    },
  ];

  const lanes = ['Los Angeles, CA → New York, NY', 'Chicago, IL → Miami, FL', 'Dallas, TX → Seattle, WA', 'Atlanta, GA → Denver, CO'];

  const filteredRates = targetRates.filter(rate => {
    const matchesSearch = rate.lane.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLane = selectedLane === 'all' || rate.lane === selectedLane;
    return matchesSearch && matchesLane;
  });

  const getStatusBadge = (status: string, achievement: number) => {
    if (status === 'achieved' || achievement >= 100) {
      return <Badge className="bg-green-100 text-green-800">Achieved</Badge>;
    } else if (status === 'close' || achievement >= 95) {
      return <Badge className="bg-yellow-100 text-yellow-800">Close</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Below Target</Badge>;
    }
  };

  const getStatusIcon = (status: string, achievement: number) => {
    if (status === 'achieved' || achievement >= 100) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status === 'close' || achievement >= 95) {
      return <Target className="h-4 w-4 text-yellow-500" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="h-8 w-8 text-indigo-600" />
              Target Rates Management
            </h1>
            <p className="text-muted-foreground">Set and track target rates for optimal pricing strategy</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Set Target Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Set Target Rate</DialogTitle>
                <DialogDescription>Define target rate for a specific lane or market</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Origin City, State" />
                <Input placeholder="Destination City, State" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Equipment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-van">Dry Van</SelectItem>
                    <SelectItem value="reefer">Reefer</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="step-deck">Step Deck</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Target Rate ($)" type="number" />
                <Input placeholder="Target Date" type="date" />
                <Button className="w-full">Set Target</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Targets Set</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Active target rates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">74%</div>
              <p className="text-xs text-muted-foreground">Targets achieved this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Achievement</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">97.5%</div>
              <p className="text-xs text-muted-foreground">Of target rates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$68,400</div>
              <p className="text-xs text-muted-foreground">Additional revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="lanes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lanes">Lane Targets</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Targets</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="lanes" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Lane Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search lanes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedLane} onValueChange={setSelectedLane}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="All Lanes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Lanes</SelectItem>
                      {lanes.map(lane => (
                        <SelectItem key={lane} value={lane}>{lane}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lane Targets Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lane Target Performance</CardTitle>
                <CardDescription>Track target rate achievement by shipping lane</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lane</TableHead>
                      <TableHead>Current Rate</TableHead>
                      <TableHead>Target Rate</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {rate.lane}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {rate.currentRate.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {rate.targetRate.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className={rate.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {rate.variance >= 0 ? '+' : ''}${rate.variance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(rate.status, rate.achievement)}
                            <span className="font-medium">{rate.achievement}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{rate.volume} loads</TableCell>
                        <TableCell>
                          {getStatusBadge(rate.status, rate.achievement)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Analyze</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Type Targets</CardTitle>
                <CardDescription>Target rate performance by equipment type</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment Type</TableHead>
                      <TableHead>Target Rate</TableHead>
                      <TableHead>Current Avg</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketTargets.map((target) => (
                      <TableRow key={target.id}>
                        <TableCell className="font-medium">{target.equipment}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            ${target.avgTarget.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${target.currentAvg.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className={target.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {target.variance >= 0 ? '+' : ''}${target.variance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon('', target.achievement)}
                            <span className="font-medium">{target.achievement}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{target.volume} loads</TableCell>
                        <TableCell>
                          {getStatusBadge('', target.achievement)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Target Achievement Trends</CardTitle>
                  <CardDescription>Weekly target achievement rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Week 1</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '72%'}}></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Week 2</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Week 3</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded bg-green-50">
                      <span className="font-medium">Current Week</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '91%'}}></div>
                        </div>
                        <span className="text-sm font-bold">91%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Lanes</CardTitle>
                  <CardDescription>Lanes exceeding target rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div>
                        <p className="font-medium text-sm">Chicago → Miami</p>
                        <p className="text-xs text-muted-foreground">109.1% achievement</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+$200</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div>
                        <p className="font-medium text-sm">Houston → Phoenix</p>
                        <p className="text-xs text-muted-foreground">106.5% achievement</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+$120</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div>
                        <p className="font-medium text-sm">Tampa → Nashville</p>
                        <p className="text-xs text-muted-foreground">104.2% achievement</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+$85</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TargetRates;