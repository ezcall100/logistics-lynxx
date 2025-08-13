import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Truck, Ship, Plane, Train, Plus, Search, Filter, TrendingUp, DollarSign, Users, MapPin, Calendar, BarChart3, Settings, Eye, Edit, Trash2, Download, Upload, RefreshCw } from 'lucide-react';

const RatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [isCreateRateOpen, setIsCreateRateOpen] = useState(false);

  const transportModes = [
    { id: 'truck', name: 'Truck/LTL', icon: Truck, color: 'bg-blue-500' },
    { id: 'ocean', name: 'Ocean Freight', icon: Ship, color: 'bg-cyan-500' },
    { id: 'air', name: 'Air Freight', icon: Plane, color: 'bg-purple-500' },
    { id: 'rail', name: 'Rail Freight', icon: Train, color: 'bg-green-500' },
  ];

  const rateData = [
    { id: 1, origin: 'Los Angeles, CA', destination: 'New York, NY', mode: 'truck', rate: 3250, distance: 2790, carrier: 'ABC Logistics', validUntil: '2024-03-15', status: 'active' },
    { id: 2, origin: 'Chicago, IL', destination: 'Miami, FL', mode: 'truck', rate: 2100, distance: 1377, carrier: 'Express Carriers', validUntil: '2024-03-20', status: 'active' },
    { id: 3, origin: 'Seattle, WA', destination: 'Houston, TX', mode: 'rail', rate: 1850, distance: 2348, carrier: 'Rail Solutions', validUntil: '2024-03-25', status: 'pending' },
    { id: 4, origin: 'Los Angeles, CA', destination: 'Shanghai, CN', mode: 'ocean', rate: 4500, distance: 6500, carrier: 'Ocean Express', validUntil: '2024-04-01', status: 'active' },
  ];

  const carrierRates = [
    { id: 1, carrier: 'ABC Logistics', totalRates: 145, avgRate: 2850, lastUpdate: '2024-01-15', status: 'active', rating: 4.8 },
    { id: 2, carrier: 'Express Carriers', totalRates: 89, avgRate: 2100, lastUpdate: '2024-01-14', status: 'active', rating: 4.6 },
    { id: 3, carrier: 'Owner Op - John Smith', totalRates: 12, avgRate: 3100, lastUpdate: '2024-01-13', status: 'active', rating: 4.9 },
    { id: 4, carrier: 'Rail Solutions', totalRates: 67, avgRate: 1950, lastUpdate: '2024-01-12', status: 'active', rating: 4.7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'expired': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getModeIcon = (mode: string) => {
    const modeObj = transportModes.find(m => m.id === mode);
    if (!modeObj) return Truck;
    return modeObj.icon;
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Rates Management</h1>
            <p className="text-muted-foreground">
              Comprehensive freight rate management across all transportation modes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Rates
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isCreateRateOpen} onOpenChange={setIsCreateRateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Rate</DialogTitle>
                  <DialogDescription>
                    Add a new freight rate with carrier details and pricing
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Origin</label>
                      <Input placeholder="Origin city, state" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Destination</label>
                      <Input placeholder="Destination city, state" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Transportation Mode</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportModes.map(mode => (
                            <SelectItem key={mode.id} value={mode.id}>
                              {mode.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Rate ($)</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Valid Until</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Carrier/Provider</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">ABC Logistics</SelectItem>
                        <SelectItem value="express">Express Carriers</SelectItem>
                        <SelectItem value="owner">Owner Operator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateRateOpen(false)}>Cancel</Button>
                  <Button>Create Rate</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Rates</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Carriers</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+5 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rate/Mile</p>
                  <p className="text-2xl font-bold">$2.45</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+0.12 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner Operators</p>
                  <p className="text-2xl font-bold">34</p>
                </div>
                <Truck className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">+3 new partnerships</p>
            </CardContent>
          </Card>
        </div>

        {/* Transportation Modes */}
        <Card>
          <CardHeader>
            <CardTitle>Transportation Modes</CardTitle>
            <CardDescription>Quick access to different freight modes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transportModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Card key={mode.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-lg ${mode.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="font-medium">{mode.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {mode.id === 'truck' ? '856 rates' : 
                         mode.id === 'ocean' ? '245 rates' :
                         mode.id === 'air' ? '123 rates' : '67 rates'}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="rates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rates">All Rates</TabsTrigger>
            <TabsTrigger value="carriers">Carrier Rates</TabsTrigger>
            <TabsTrigger value="analytics">Rate Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search origin, destination, or carrier..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Modes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modes</SelectItem>
                      {transportModes.map(mode => (
                        <SelectItem key={mode.id} value={mode.id}>
                          {mode.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rates Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Rates</CardTitle>
                <CardDescription>All active and pending freight rates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rateData.map((rate) => {
                      const ModeIcon = getModeIcon(rate.mode);
                      return (
                        <TableRow key={rate.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{rate.origin}</div>
                              <div className="text-sm text-muted-foreground">to {rate.destination}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ModeIcon className="h-4 w-4" />
                              <span className="capitalize">{rate.mode}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${rate.rate.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              ${(rate.rate / rate.distance).toFixed(2)}/mi
                            </div>
                          </TableCell>
                          <TableCell>{rate.distance.toLocaleString()} mi</TableCell>
                          <TableCell>{rate.carrier}</TableCell>
                          <TableCell>{rate.validUntil}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(rate.status)}>
                              {rate.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carriers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carrier Rate Management</CardTitle>
                <CardDescription>Manage rates from carriers and owner operators</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Carrier Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Total Rates</TableHead>
                      <TableHead>Avg Rate</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carrierRates.map((carrier) => (
                      <TableRow key={carrier.id}>
                        <TableCell className="font-medium">{carrier.carrier}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {carrier.carrier.includes('Owner Op') ? 'Owner Operator' : 'Carrier'}
                          </Badge>
                        </TableCell>
                        <TableCell>{carrier.totalRates}</TableCell>
                        <TableCell>${carrier.avgRate.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{carrier.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    i < Math.floor(carrier.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{carrier.lastUpdate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(carrier.status)}>
                            {carrier.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rate Trends</CardTitle>
                  <CardDescription>Average rates over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Rate trends visualization
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mode Distribution</CardTitle>
                  <CardDescription>Rates by transportation mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Mode distribution
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

export default RatesManagement;