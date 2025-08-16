/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Truck, MapPin, Clock, DollarSign, Search, Plus, Edit, Trash2, Eye, Navigation } from 'lucide-react';

const GroundTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const groundShipments = [
    {
      id: "GT-2024-001",
      loadNumber: "LD-789012",
      origin: "Los Angeles, CA",
      destination: "Denver, CO",
      driver: "John Rodriguez",
      truckNumber: "TRK-001",
      trailer: "TRL-456",
      status: "In Transit",
      distance: "1,016 miles",
      eta: "2024-01-25 14:30",
      rate: "$2,450",
      commodity: "Electronics",
      weight: "45,000 lbs",
      currentLocation: "Flagstaff, AZ"
    },
    {
      id: "GT-2024-002",
      loadNumber: "LD-789013",
      origin: "Chicago, IL",
      destination: "Atlanta, GA",
      driver: "Sarah Johnson",
      truckNumber: "TRK-002",
      trailer: "TRL-457",
      status: "Loading",
      distance: "716 miles",
      eta: "2024-01-26 09:15",
      rate: "$1,850",
      commodity: "Food Products",
      weight: "48,500 lbs",
      currentLocation: "Chicago, IL"
    },
    {
      id: "GT-2024-003",
      loadNumber: "LD-789014",
      origin: "Dallas, TX",
      destination: "Phoenix, AZ",
      driver: "Mike Chen",
      truckNumber: "TRK-003",
      trailer: "TRL-458",
      status: "Delivered",
      distance: "887 miles",
      eta: "2024-01-23 16:45",
      rate: "$2,100",
      commodity: "Automotive Parts",
      weight: "42,000 lbs",
      currentLocation: "Phoenix, AZ"
    },
    {
      id: "GT-2024-004",
      loadNumber: "LD-789015",
      origin: "Miami, FL",
      destination: "New York, NY",
      driver: "Lisa Williams",
      truckNumber: "TRK-004",
      trailer: "TRL-459",
      status: "Dispatched",
      distance: "1,280 miles",
      eta: "2024-01-27 11:00",
      rate: "$3,200",
      commodity: "Textiles",
      weight: "38,500 lbs",
      currentLocation: "Jacksonville, FL"
    },
    {
      id: "GT-2024-005",
      loadNumber: "LD-789016",
      origin: "Seattle, WA",
      destination: "Las Vegas, NV",
      driver: "David Brown",
      truckNumber: "TRK-005",
      trailer: "TRL-460",
      status: "Pending",
      distance: "872 miles",
      eta: "2024-01-28 08:30",
      rate: "$2,680",
      commodity: "Consumer Goods",
      weight: "44,200 lbs",
      currentLocation: "Seattle, WA"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Loading': return 'bg-orange-100 text-orange-800';
      case 'Dispatched': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShipments = groundShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Truck className="h-8 w-8 text-primary" />
            <span>Ground Transport</span>
          </h1>
          <p className="text-muted-foreground">Manage trucking and ground transportation shipments</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                <Plus className="h-4 w-4 mr-2" />
                New Ground Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Ground Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Pickup location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Delivery location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Driver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Rodriguez</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="truck">Truck Number</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trk001">TRK-001</SelectItem>
                      <SelectItem value="trk002">TRK-002</SelectItem>
                      <SelectItem value="trk003">TRK-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Type of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" placeholder="Load weight" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Transportation rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Shipment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by shipment ID, driver, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="dispatched">Dispatched</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ground Transport Shipments ({filteredShipments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Shipment</th>
                  <th className="text-left p-2">Route</th>
                  <th className="text-left p-2">Driver & Truck</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Details</th>
                  <th className="text-left p-2">Rate</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <div className="font-semibold">{shipment.id}</div>
                        <div className="text-sm text-muted-foreground">{shipment.loadNumber}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-green-500" />
                          <span className="text-sm">{shipment.origin}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-red-500" />
                          <span className="text-sm">{shipment.destination}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{shipment.distance}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{shipment.driver}</div>
                        <div className="text-sm text-muted-foreground">
                          {shipment.truckNumber} / {shipment.trailer}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        ETA: {shipment.eta}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-sm">
                        <div>{shipment.commodity}</div>
                        <div className="text-muted-foreground">{shipment.weight}</div>
                        <div className="text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-semibold text-green-600">{shipment.rate}</div>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Navigation className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-xs text-muted-foreground">Ground shipments</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <div className="text-xs text-muted-foreground">Miles per load</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs text-muted-foreground">Delivery performance</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroundTransport;