/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Package, TrendingUp, DollarSign, Calendar, MapPin, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';

const myPostedLoads = [
  {
    id: 'ML-001',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    pickupDate: '2024-06-20',
    deliveryDate: '2024-06-22',
    rate: '$2,750',
    weight: '45,000 lbs',
    commodity: 'Electronics',
    status: 'active',
    views: 24,
    quotes: 8,
    postedDate: '2024-06-18'
  },
  {
    id: 'ML-002',
    origin: 'Los Angeles, CA',
    destination: 'Seattle, WA',
    pickupDate: '2024-06-21',
    deliveryDate: '2024-06-23',
    rate: '$3,200',
    weight: '38,500 lbs',
    commodity: 'Machinery',
    status: 'booked',
    views: 18,
    quotes: 12,
    postedDate: '2024-06-17'
  },
  {
    id: 'ML-003',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    pickupDate: '2024-06-19',
    deliveryDate: '2024-06-20',
    rate: '$1,850',
    weight: '32,000 lbs',
    commodity: 'Food Products',
    status: 'completed',
    views: 31,
    quotes: 15,
    postedDate: '2024-06-16'
  },
  {
    id: 'ML-004',
    origin: 'Phoenix, AZ',
    destination: 'Denver, CO',
    pickupDate: '2024-06-25',
    deliveryDate: '2024-06-26',
    rate: '$2,100',
    weight: '41,200 lbs',
    commodity: 'Textiles',
    status: 'expired',
    views: 12,
    quotes: 3,
    postedDate: '2024-06-15'
  }
];

const managedLoads = [
  {
    id: 'BL-005',
    loadId: 'LB-123',
    carrier: 'Swift Transportation',
    driver: 'John Smith',
    status: 'in-transit',
    currentLocation: 'Kansas City, MO',
    eta: '2024-06-22 14:30',
    progress: 65
  },
  {
    id: 'BL-006',
    loadId: 'LB-124',
    carrier: 'JB Hunt',
    driver: 'Maria Garcia',
    status: 'delivered',
    currentLocation: 'Houston, TX',
    eta: 'Delivered',
    progress: 100
  }
];

export const MyLoadsTab: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('posted');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEditLoad = (loadId: string) => {
    toast({
      title: "✏️ Edit Load",
      description: `Opening editor for load ${loadId}.`,
    });
  };

  const handleDeleteLoad = (loadId: string) => {
    toast({
      title: "🗑️ Load Deleted",
      description: `Load ${loadId} has been removed from the system.`,
      variant: "destructive"
    });
  };

  const handleRepostLoad = (loadId: string) => {
    toast({
      title: "🔄 Load Reposted",
      description: `Load ${loadId} has been reposted with updated visibility.`,
    });
  };

  const handleViewDetails = (loadId: string) => {
    toast({
      title: "📋 Load Details",
      description: `Viewing detailed information for load ${loadId}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posted</p>
                <p className="text-2xl font-bold text-blue-600">42</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Booked This Month</p>
                <p className="text-2xl font-bold text-purple-600">24</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">$89,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different load views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted/50 rounded-xl border border-border/60">
          <TabsTrigger 
            value="posted" 
            className="h-12 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Posted Loads
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="managed"
            className="h-12 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Managed Loads
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posted" className="space-y-6">
          <Card className="shadow-lg border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                My Posted Loads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Load ID</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myPostedLoads.map((load) => (
                      <TableRow key={load.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{load.id}</div>
                            <div className="text-xs text-muted-foreground">
                              Posted: {load.postedDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3 text-green-600" />
                              {load.origin}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3 text-red-600" />
                              {load.destination}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div>{load.pickupDate}</div>
                            <div className="text-muted-foreground">{load.deliveryDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium text-green-600">{load.rate}</div>
                            <div className="text-muted-foreground">{load.weight}</div>
                            <div className="text-xs text-blue-600">{load.commodity}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {load.views} views
                            </div>
                            <div className="text-muted-foreground">{load.quotes} quotes</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(load.status)}>
                            {load.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(load.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            {load.status === 'active' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditLoad(load.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteLoad(load.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                            {load.status === 'expired' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRepostLoad(load.id)}
                              >
                                <RefreshCw className="h-3 w-3" />
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

        <TabsContent value="managed" className="space-y-6">
          <Card className="shadow-lg border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Managed Loads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Load ID</TableHead>
                      <TableHead>Carrier/Driver</TableHead>
                      <TableHead>Current Location</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managedLoads.map((load) => (
                      <TableRow key={load.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{load.loadId}</div>
                            <div className="text-xs text-muted-foreground">{load.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{load.carrier}</div>
                            <div className="text-sm text-muted-foreground">{load.driver}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-blue-600" />
                            {load.currentLocation}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">{load.progress}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${load.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{load.eta}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(load.status)}>
                            {load.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Track
                            </Button>
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
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
      </Tabs>
    </div>
  );
};
