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
import { Plus, Search, Filter, DollarSign, Clock, Package, Truck, MapPin, Settings, Edit, Trash2 } from 'lucide-react';

const AccessorialRates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const accessorialServices = [
    { id: 1, service: 'Detention Time', category: 'Time-based', rate: 75, unit: 'per hour', minCharge: 150, description: 'Waiting time after grace period' },
    { id: 2, service: 'Fuel Surcharge', category: 'Fuel', rate: 15, unit: 'percentage', minCharge: 0, description: 'Weekly fuel price adjustment' },
    { id: 3, service: 'Stop-off Charge', category: 'Pickup/Delivery', rate: 125, unit: 'per stop', minCharge: 125, description: 'Additional pickup or delivery' },
    { id: 4, service: 'Layover', category: 'Time-based', rate: 200, unit: 'per day', minCharge: 200, description: 'Overnight stay required' },
    { id: 5, service: 'Lumper Service', category: 'Labor', rate: 350, unit: 'flat rate', minCharge: 350, description: 'Third-party loading/unloading' },
    { id: 6, service: 'Redelivery', category: 'Pickup/Delivery', rate: 150, unit: 'flat rate', minCharge: 150, description: 'Failed delivery attempt' },
    { id: 7, service: 'Inside Delivery', category: 'Special Handling', rate: 95, unit: 'per hour', minCharge: 190, description: 'Delivery beyond dock door' },
    { id: 8, service: 'Hazmat Handling', category: 'Special Handling', rate: 250, unit: 'flat rate', minCharge: 250, description: 'Hazardous materials surcharge' },
  ];

  const categories = ['Time-based', 'Fuel', 'Pickup/Delivery', 'Labor', 'Special Handling'];

  const filteredServices = accessorialServices.filter(service => {
    const matchesSearch = service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryIcons = {
    'Time-based': Clock,
    'Fuel': Truck,
    'Pickup/Delivery': MapPin,
    'Labor': Package,
    'Special Handling': Settings,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Plus className="h-8 w-8 text-purple-600" />
              Accessorial Rates Management
            </h1>
            <p className="text-muted-foreground">Manage additional service charges and fees</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Accessorial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Accessorial Service</DialogTitle>
                <DialogDescription>Define a new additional service charge</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Service Name" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Rate ($)" type="number" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per hour">Per Hour</SelectItem>
                    <SelectItem value="per day">Per Day</SelectItem>
                    <SelectItem value="per stop">Per Stop</SelectItem>
                    <SelectItem value="flat rate">Flat Rate</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="per mile">Per Mile</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Minimum Charge ($)" type="number" />
                <Input placeholder="Description" />
                <Button className="w-full">Save Accessorial</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accessorialServices.length}</div>
              <p className="text-xs text-muted-foreground">Active accessorial services</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$168</div>
              <p className="text-xs text-muted-foreground">Average service charge</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$48,250</div>
              <p className="text-xs text-muted-foreground">From accessorial charges</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Used</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Detention</div>
              <p className="text-xs text-muted-foreground">45% of all charges</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Accessorial Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
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

        {/* Services by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const categoryServices = filteredServices.filter(service => service.category === category);
            const IconComponent = categoryIcons[category];
            
            if (categoryServices.length === 0) return null;
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {category}
                  </CardTitle>
                  <CardDescription>{categoryServices.length} services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryServices.map(service => (
                      <div key={service.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{service.service}</h4>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-green-600">
                            ${service.rate} {service.unit}
                          </span>
                          {service.minCharge > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Min: ${service.minCharge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Accessorial Services</CardTitle>
            <CardDescription>Complete list of additional service charges</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Min Charge</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{service.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {service.rate}
                      </div>
                    </TableCell>
                    <TableCell>{service.unit}</TableCell>
                    <TableCell>
                      {service.minCharge > 0 ? `$${service.minCharge}` : 'None'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Apply</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AccessorialRates;