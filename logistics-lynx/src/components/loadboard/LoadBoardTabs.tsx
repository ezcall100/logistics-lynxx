/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, MapPin, Calendar, DollarSign, Truck, Filter } from 'lucide-react';
import { LoadBoardFilters } from './LoadBoardFilters';
import { PostLoadForm } from './PostLoadForm';
import { LoadDetailsModal } from './LoadDetailsModal';

interface Load {
  id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  rate: number;
  distance: number;
  equipmentType: string;
  commodity: string;
  status: 'available' | 'booked' | 'in_transit' | 'delivered';
  shipper: string;
  contact: string;
  phone: string;
}

const mockLoads: Load[] = [
  {
    id: 'L001',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    weight: 25000,
    rate: 2800,
    distance: 470,
    equipmentType: 'Dry Van',
    commodity: 'Electronics',
    status: 'available',
    shipper: 'TechCorp Inc.',
    contact: 'John Smith',
    phone: '555-0123'
  },
  {
    id: 'L002',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-17',
    weight: 35000,
    rate: 1500,
    distance: 370,
    equipmentType: 'Flatbed',
    commodity: 'Construction Materials',
    status: 'available',
    shipper: 'BuildRight LLC',
    contact: 'Sarah Johnson',
    phone: '555-0124'
  },
  {
    id: 'L003',
    origin: 'Miami, FL',
    destination: 'New York, NY',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-20',
    weight: 28000,
    rate: 3200,
    distance: 1280,
    equipmentType: 'Refrigerated',
    commodity: 'Fresh Produce',
    status: 'available',
    shipper: 'Fresh Foods Co.',
    contact: 'Mike Davis',
    phone: '555-0125'
  }
];

export const LoadBoardTabs = () => {
  const [activeTab, setActiveTab] = useState('find-loads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [loads, setLoads] = useState<Load[]>(mockLoads);

  const filteredLoads = loads.filter(load =>
    load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    load.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    load.shipper.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'booked':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'delivered':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Load Board</h1>
          <p className="text-muted-foreground">
            Find available loads and manage your shipments
          </p>
        </div>
        {activeTab === 'post-loads' && (
          <Button onClick={() => setIsPostFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Load
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="find-loads">Find Loads</TabsTrigger>
          <TabsTrigger value="post-loads">Post Loads</TabsTrigger>
          <TabsTrigger value="my-loads">My Loads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="find-loads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Loads</CardTitle>
              <CardDescription>Browse and search for available freight loads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by origin, destination, commodity..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <LoadBoardFilters />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Load ID</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoads.map((load) => (
                      <TableRow key={load.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{load.id}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-green-600" />
                              {load.origin}
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-red-600" />
                              {load.destination}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {load.distance} miles
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              Pickup: {new Date(load.pickupDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              Delivery: {new Date(load.deliveryDate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Truck className="h-3 w-3 mr-1" />
                            {load.weight.toLocaleString()} lbs
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center font-semibold text-green-600">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {load.rate.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${(load.rate / load.distance).toFixed(2)}/mile
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{load.equipmentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(load.status)}>
                            {load.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedLoad(load)}
                            >
                              View Details
                            </Button>
                            {load.status === 'available' && (
                              <Button size="sm">
                                Book Load
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

        <TabsContent value="post-loads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Posted Loads</CardTitle>
              <CardDescription>Manage loads you've posted to the board</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No loads posted yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by posting your first load to attract carriers
                </p>
                <Button onClick={() => setIsPostFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Load
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-loads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Loads</CardTitle>
              <CardDescription>Track your booked and active loads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No active loads</h3>
                <p className="text-muted-foreground">
                  Your booked loads will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Loads</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loads.filter(l => l.status === 'available').length}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(loads.reduce((sum, l) => sum + l.rate, 0) / loads.length).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loads.reduce((sum, l) => sum + l.distance, 0).toLocaleString()} mi
                </div>
                <p className="text-xs text-muted-foreground">
                  +8% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rate/Mile</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(loads.reduce((sum, l) => sum + (l.rate / l.distance), 0) / loads.length).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2% from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <LoadDetailsModal
        load={selectedLoad}
        isOpen={!!selectedLoad}
        onClose={() => setSelectedLoad(null)}
      />

      <PostLoadForm
        isOpen={isPostFormOpen}
        onClose={() => setIsPostFormOpen(false)}
        onSubmit={(loadData) => {
          console.log('New load posted:', loadData);
          setIsPostFormOpen(false);
        }}
      />
    </div>
  );
};
