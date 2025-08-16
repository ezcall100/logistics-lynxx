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
import { ArrowDownCircle, Truck, Search, Plus, Filter, DollarSign, MapPin, Calendar, Users, BarChart3, TrendingDown } from 'lucide-react';

const BuyRates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('all');

  const buyRates = [
    { id: 1, carrier: 'ABC Logistics', origin: 'Los Angeles, CA', destination: 'New York, NY', rate: 2800, equipment: 'Dry Van', validUntil: '2024-03-15', status: 'active' },
    { id: 2, carrier: 'Express Carriers', origin: 'Chicago, IL', destination: 'Miami, FL', rate: 1850, equipment: 'Reefer', validUntil: '2024-03-20', status: 'active' },
    { id: 3, carrier: 'Reliable Transport', origin: 'Dallas, TX', destination: 'Seattle, WA', rate: 2200, equipment: 'Flatbed', validUntil: '2024-03-25', status: 'pending' },
    { id: 4, carrier: 'Swift Logistics', origin: 'Atlanta, GA', destination: 'Denver, CO', rate: 1950, equipment: 'Dry Van', validUntil: '2024-04-01', status: 'active' },
  ];

  const carriers = ['ABC Logistics', 'Express Carriers', 'Reliable Transport', 'Swift Logistics'];

  const filteredRates = buyRates.filter(rate => {
    const matchesSearch = rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCarrier = selectedCarrier === 'all' || rate.carrier === selectedCarrier;
    return matchesSearch && matchesCarrier;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ArrowDownCircle className="h-8 w-8 text-blue-600" />
              Buy Rates Management
            </h1>
            <p className="text-muted-foreground">Manage and track carrier buy rates for freight procurement</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Buy Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Buy Rate</DialogTitle>
                <DialogDescription>Enter carrier rate information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map(carrier => (
                      <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Origin City, State" />
                <Input placeholder="Destination City, State" />
                <Input placeholder="Rate ($)" type="number" />
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
                <Input placeholder="Valid Until" type="date" />
                <Button className="w-full">Save Buy Rate</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Buy Rates</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,187</div>
              <p className="text-xs text-muted-foreground">-3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carriers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5 new carriers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,280</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Buy Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by origin, destination, or carrier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Carriers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Carriers</SelectItem>
                  {carriers.map(carrier => (
                    <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
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

        {/* Buy Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Current Buy Rates</CardTitle>
            <CardDescription>Carrier rates for freight procurement</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {rate.carrier}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{rate.origin} → {rate.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {rate.rate.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{rate.equipment}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {rate.validUntil}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Use</Button>
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

export default BuyRates;