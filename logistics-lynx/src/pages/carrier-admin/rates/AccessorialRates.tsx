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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus, DollarSign, Clock, MapPin, Truck, Edit, Trash2, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AccessorialRates = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for accessorial services
  const accessorialServices = [
    {
      id: 1,
      name: 'Detention Time',
      description: 'Waiting time at pickup/delivery',
      category: 'Time-based',
      rateType: 'hourly',
      rate: 65.00,
      unit: 'per hour',
      minimumCharge: 2,
      status: 'active',
      popularity: 'high'
    },
    {
      id: 2,
      name: 'Layover',
      description: 'Driver rest period between loads',
      category: 'Time-based',
      rateType: 'daily',
      rate: 150.00,
      unit: 'per day',
      minimumCharge: 1,
      status: 'active',
      popularity: 'medium'
    },
    {
      id: 3,
      name: 'Fuel Surcharge',
      description: 'Additional fuel cost coverage',
      category: 'Fuel-related',
      rateType: 'percentage',
      rate: 28.5,
      unit: 'percentage',
      minimumCharge: 0,
      status: 'active',
      popularity: 'high'
    },
    {
      id: 4,
      name: 'Inside Delivery',
      description: 'Delivery inside building',
      category: 'Special Handling',
      rateType: 'flat',
      rate: 75.00,
      unit: 'per stop',
      minimumCharge: 1,
      status: 'active',
      popularity: 'medium'
    },
    {
      id: 5,
      name: 'Liftgate Service',
      description: 'Hydraulic lift assistance',
      category: 'Equipment',
      rateType: 'flat',
      rate: 45.00,
      unit: 'per stop',
      minimumCharge: 1,
      status: 'active',
      popularity: 'high'
    },
    {
      id: 6,
      name: 'Residential Delivery',
      description: 'Delivery to residential address',
      category: 'Location-based',
      rateType: 'flat',
      rate: 35.00,
      unit: 'per stop',
      minimumCharge: 1,
      status: 'active',
      popularity: 'medium'
    }
  ];

  const revenueMetrics = [
    { service: 'Detention Time', revenue: 12450, loads: 45, avgRate: 276.67 },
    { service: 'Liftgate Service', revenue: 8900, loads: 198, avgRate: 44.95 },
    { service: 'Inside Delivery', revenue: 6750, loads: 90, avgRate: 75.00 },
    { service: 'Layover', revenue: 4500, loads: 30, avgRate: 150.00 }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high': return <Star className="h-4 w-4 text-yellow-500 fill-current" />;
      case 'medium': return <Star className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Time-based': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Location-based': return <MapPin className="h-4 w-4 text-green-600" />;
      case 'Equipment': return <Truck className="h-4 w-4 text-purple-600" />;
      case 'Special Handling': return <Package className="h-4 w-4 text-orange-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8 text-purple-600" />
              Accessorial Rates
            </h1>
            <p className="text-muted-foreground">Manage additional services and fees</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Accessorial Service</DialogTitle>
                <DialogDescription>Add a new accessorial service with pricing</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input id="serviceName" placeholder="e.g., Detention Time" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time-based">Time-based</SelectItem>
                      <SelectItem value="location-based">Location-based</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="special-handling">Special Handling</SelectItem>
                      <SelectItem value="fuel-related">Fuel-related</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rateType">Rate Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">Flat Rate</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="per-mile">Per Mile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rate">Rate ($)</Label>
                    <Input id="rate" placeholder="65.00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Brief description of the service" />
                </div>
                <Button className="w-full">Create Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$32,600</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Services Used</p>
                  <p className="text-2xl font-bold">363</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Per Load</p>
                  <p className="text-2xl font-bold">$89.81</p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Service</p>
                  <p className="text-lg font-semibold">Detention Time</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="services">All Services</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessorial Services</CardTitle>
                <CardDescription>Manage additional services and their rates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Popularity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessorialServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(service.category)}
                            <span className="text-sm">{service.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {service.rateType === 'percentage' ? `${service.rate}%` : `$${service.rate}`}
                          </span>
                        </TableCell>
                        <TableCell>{service.unit}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getPopularityIcon(service.popularity)}
                            <span className="text-sm capitalize">{service.popularity}</span>
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
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>Performance metrics for each accessorial service</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Total Revenue</TableHead>
                      <TableHead>Loads</TableHead>
                      <TableHead>Avg Rate</TableHead>
                      <TableHead>Revenue %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueMetrics.map((metric, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{metric.service}</TableCell>
                        <TableCell>${metric.revenue.toLocaleString()}</TableCell>
                        <TableCell>{metric.loads}</TableCell>
                        <TableCell>${metric.avgRate.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(metric.revenue / 32600) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{((metric.revenue / 32600) * 100).toFixed(1)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessorial Settings</CardTitle>
                <CardDescription>Configure default settings for accessorial services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="autoApply">Auto-apply Common Services</Label>
                    <Select defaultValue="detention">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="detention">Detention Only</SelectItem>
                        <SelectItem value="all">All Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="billing">Billing Frequency</Label>
                    <Select defaultValue="load">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="load">Per Load</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="requireApproval" defaultChecked />
                    <Label htmlFor="requireApproval">Require approval for charges over $100</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="customerNotify" defaultChecked />
                    <Label htmlFor="customerNotify">Notify customers of additional charges</Label>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default AccessorialRates;