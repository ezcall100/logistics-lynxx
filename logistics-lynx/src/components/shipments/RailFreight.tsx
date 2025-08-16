/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Train, MapPin, Clock, Fuel, Search, Plus, Eye, FileText, Navigation } from 'lucide-react';

const RailFreight = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const railShipments = [
    {
      id: "RF-2024-001",
      railNumber: "BNSF-789012",
      railroad: "BNSF Railway",
      trainId: "Q-LACHSS1-23",
      origin: "Los Angeles, CA",
      destination: "Chicago, IL",
      shipper: "West Coast Logistics",
      consignee: "Midwest Distribution",
      status: "In Transit",
      carType: "Boxcar",
      carCount: 25,
      commodity: "Consumer Goods",
      weight: "2,250 tons",
      rate: "$65,800",
      etd: "2024-01-20",
      eta: "2024-01-28",
      distance: "2,256 miles",
      currentLocation: "Amarillo, TX"
    },
    {
      id: "RF-2024-002",
      railNumber: "UP-345678",
      railroad: "Union Pacific",
      trainId: "MEWLA-22",
      origin: "Houston, TX",
      destination: "Oakland, CA",
      shipper: "Gulf Coast Traders",
      consignee: "Pacific Imports",
      status: "Loading",
      carType: "Tank Car",
      carCount: 18,
      commodity: "Chemicals",
      weight: "1,980 tons",
      rate: "$58,200",
      etd: "2024-01-25",
      eta: "2024-02-02",
      distance: "1,945 miles",
      currentLocation: "Houston, TX"
    },
    {
      id: "RF-2024-003",
      railNumber: "CSX-567890",
      railroad: "CSX Transportation",
      trainId: "Q410-23",
      origin: "Atlanta, GA",
      destination: "New York, NY",
      shipper: "Southern Freight Co",
      consignee: "Northeast Warehouse",
      status: "Delivered",
      carType: "Flatcar",
      carCount: 12,
      commodity: "Steel Products",
      weight: "1,680 tons",
      rate: "$42,500",
      etd: "2024-01-18",
      eta: "2024-01-22",
      distance: "875 miles",
      currentLocation: "New York, NY"
    },
    {
      id: "RF-2024-004",
      railNumber: "NS-234567",
      railroad: "Norfolk Southern",
      trainId: "24V-23",
      origin: "Detroit, MI",
      destination: "Jacksonville, FL",
      shipper: "Auto Parts Express",
      consignee: "Florida Motors",
      status: "Scheduled",
      carType: "Auto Rack",
      carCount: 8,
      commodity: "Automobiles",
      weight: "1,120 tons",
      rate: "$38,900",
      etd: "2024-01-26",
      eta: "2024-01-30",
      distance: "1,150 miles",
      currentLocation: "Detroit, MI"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Loading': return 'bg-orange-100 text-orange-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCarTypeIcon = (carType: string) => {
    switch (carType) {
      case 'Tank Car': return '🚛';
      case 'Boxcar': return '📦';
      case 'Flatcar': return '🏗️';
      case 'Auto Rack': return '🚗';
      default: return '🚂';
    }
  };

  const filteredShipments = railShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.railroad.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <Train className="h-8 w-8 text-green-600" />
            <span>Rail Freight</span>
          </h1>
          <p className="text-muted-foreground">Manage cost-effective rail transportation</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-green-500">
                <Plus className="h-4 w-4 mr-2" />
                New Rail Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Rail Freight Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originRail">Origin Terminal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="la">Los Angeles, CA</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="atlanta">Atlanta, GA</SelectItem>
                      <SelectItem value="detroit">Detroit, MI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destRail">Destination Terminal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="oakland">Oakland, CA</SelectItem>
                      <SelectItem value="ny">New York, NY</SelectItem>
                      <SelectItem value="jacksonville">Jacksonville, FL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="railroad">Railroad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select railroad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bnsf">BNSF Railway</SelectItem>
                      <SelectItem value="up">Union Pacific</SelectItem>
                      <SelectItem value="csx">CSX Transportation</SelectItem>
                      <SelectItem value="ns">Norfolk Southern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carType">Car Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boxcar">Boxcar</SelectItem>
                      <SelectItem value="tankcar">Tank Car</SelectItem>
                      <SelectItem value="flatcar">Flatcar</SelectItem>
                      <SelectItem value="autorack">Auto Rack</SelectItem>
                      <SelectItem value="hopper">Hopper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carCount">Number of Cars</Label>
                  <Input id="carCount" placeholder="e.g., 20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Type of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (tons)</Label>
                  <Input id="weight" placeholder="Total weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Rail freight rate" />
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
                  placeholder="Search by rail number, railroad, or terminal..."
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rail Shipments Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredShipments.map((shipment) => (
          <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{shipment.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{shipment.railNumber}</p>
                </div>
                <Badge className={getStatusColor(shipment.status)}>
                  {shipment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Train Info */}
              <div className="flex items-center space-x-2">
                <Train className="h-4 w-4 text-green-600" />
                <span className="font-medium">{shipment.railroad}</span>
                <span className="text-muted-foreground">Train {shipment.trainId}</span>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{shipment.origin}</span>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{shipment.destination}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-6">
                  Distance: {shipment.distance}
                </div>
              </div>

              {/* Car Details */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{getCarTypeIcon(shipment.carType)}</span>
                    <div>
                      <span className="text-muted-foreground">Cars:</span>
                      <span className="ml-1 font-medium">{shipment.carCount}x {shipment.carType}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-1 font-medium">{shipment.weight}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Commodity:</span>
                    <span className="ml-1 font-medium">{shipment.commodity}</span>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    ETD
                  </div>
                  <div className="font-medium">{shipment.etd}</div>
                </div>
                <div>
                  <div className="text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    ETA
                  </div>
                  <div className="font-medium">{shipment.eta}</div>
                </div>
              </div>

              {/* Current Location */}
              <div className="flex items-center space-x-2 text-sm">
                <Navigation className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">Current:</span>
                <span className="font-medium">{shipment.currentLocation}</span>
              </div>

              {/* Rate and Actions */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">{shipment.rate}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    BOL
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Rails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="text-xs text-muted-foreground">Rail shipments</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <div className="text-xs text-muted-foreground">Rail cars</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rail Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$205K</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2</div>
            <div className="text-xs text-muted-foreground">Days rail transit</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RailFreight;