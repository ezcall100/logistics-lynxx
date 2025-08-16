/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plane, Clock, Thermometer, Search, Plus, Eye, FileText, MapPin } from 'lucide-react';

const AirFreight = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const airShipments = [
    {
      id: "AF-2024-001",
      awbNumber: "020-12345678",
      airline: "Lufthansa Cargo",
      flightNumber: "LH8405",
      origin: "LAX - Los Angeles",
      destination: "FRA - Frankfurt",
      shipper: "Tech Components Inc",
      consignee: "European Electronics",
      status: "In Transit",
      cargoType: "Electronics",
      weight: "2,450 kg",
      dimensions: "120x80x150 cm",
      pieces: 15,
      rate: "$18,500",
      etd: "2024-01-24 22:30",
      eta: "2024-01-25 16:45",
      temperature: "Ambient",
      priority: "Standard"
    },
    {
      id: "AF-2024-002",
      awbNumber: "180-98765432",
      airline: "Korean Air Cargo",
      flightNumber: "KE8732",
      origin: "ORD - Chicago",
      destination: "ICN - Seoul",
      shipper: "Pharma Global",
      consignee: "Asia Medical Supply",
      status: "Loading",
      cargoType: "Pharmaceuticals",
      weight: "890 kg",
      dimensions: "80x60x100 cm",
      pieces: 8,
      rate: "$24,800",
      etd: "2024-01-25 01:15",
      eta: "2024-01-26 05:30",
      temperature: "2-8°C",
      priority: "Expedited"
    },
    {
      id: "AF-2024-003",
      awbNumber: "074-55667788",
      airline: "Emirates SkyCargo",
      flightNumber: "EK9821",
      origin: "JFK - New York",
      destination: "DXB - Dubai",
      shipper: "Fashion Forward",
      consignee: "Middle East Fashion",
      status: "Delivered",
      cargoType: "Textiles",
      weight: "1,200 kg",
      dimensions: "100x70x120 cm",
      pieces: 12,
      rate: "$15,600",
      etd: "2024-01-22 23:45",
      eta: "2024-01-23 18:20",
      temperature: "Ambient",
      priority: "Standard"
    },
    {
      id: "AF-2024-004",
      awbNumber: "014-33445566",
      airline: "Singapore Airlines Cargo",
      flightNumber: "SQ7412",
      origin: "SEA - Seattle",
      destination: "SIN - Singapore",
      shipper: "Marine Equipment Co",
      consignee: "Asia Marine Parts",
      status: "Booked",
      cargoType: "Machinery",
      weight: "3,200 kg",
      dimensions: "150x100x180 cm",
      pieces: 6,
      rate: "$28,900",
      etd: "2024-01-26 14:20",
      eta: "2024-01-27 22:15",
      temperature: "Ambient",
      priority: "Express"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Loading': return 'bg-orange-100 text-orange-800';
      case 'Booked': return 'bg-purple-100 text-purple-800';
      case 'Customs': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Express': return 'bg-red-100 text-red-800';
      case 'Expedited': return 'bg-orange-100 text-orange-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShipments = airShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Plane className="h-8 w-8 text-indigo-600" />
            <span>Air Freight</span>
          </h1>
          <p className="text-muted-foreground">Manage time-critical air cargo shipments</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-indigo-500">
                <Plus className="h-4 w-4 mr-2" />
                New Air Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Air Freight Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originAirport">Origin Airport</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lax">LAX - Los Angeles</SelectItem>
                      <SelectItem value="ord">ORD - Chicago</SelectItem>
                      <SelectItem value="jfk">JFK - New York</SelectItem>
                      <SelectItem value="sea">SEA - Seattle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destAirport">Destination Airport</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fra">FRA - Frankfurt</SelectItem>
                      <SelectItem value="icn">ICN - Seoul</SelectItem>
                      <SelectItem value="dxb">DXB - Dubai</SelectItem>
                      <SelectItem value="sin">SIN - Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="airline">Airline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select airline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lh">Lufthansa Cargo</SelectItem>
                      <SelectItem value="ke">Korean Air Cargo</SelectItem>
                      <SelectItem value="ek">Emirates SkyCargo</SelectItem>
                      <SelectItem value="sq">Singapore Airlines Cargo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cargo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Cargo</SelectItem>
                      <SelectItem value="pharma">Pharmaceuticals</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="perishable">Perishables</SelectItem>
                      <SelectItem value="dangerous">Dangerous Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" placeholder="Total weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieces">Number of Pieces</Label>
                  <Input id="pieces" placeholder="Total pieces" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="expedited">Expedited</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Air freight rate" />
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
                  placeholder="Search by AWB, airline, or airport..."
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
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="customs">Customs</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Air Shipments Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredShipments.map((shipment) => (
          <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{shipment.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">AWB: {shipment.awbNumber}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getStatusColor(shipment.status)}>
                    {shipment.status}
                  </Badge>
                  <Badge className={getPriorityColor(shipment.priority)}>
                    {shipment.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Flight Info */}
              <div className="flex items-center space-x-2">
                <Plane className="h-4 w-4 text-indigo-600" />
                <span className="font-medium">{shipment.airline}</span>
                <span className="text-muted-foreground">Flight {shipment.flightNumber}</span>
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
              </div>

              {/* Cargo Details */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-1 font-medium">{shipment.weight}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pieces:</span>
                    <span className="ml-1 font-medium">{shipment.pieces}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-1 font-medium">{shipment.cargoType}</span>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="h-3 w-3 text-blue-500 mr-1" />
                    <span className="text-muted-foreground">Temp:</span>
                    <span className="ml-1 font-medium">{shipment.temperature}</span>
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
                    AWB
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
            <CardTitle className="text-sm">Active Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="text-xs text-muted-foreground">Air shipments</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48.2</div>
            <div className="text-xs text-muted-foreground">Metric tons</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Air Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$687K</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="text-xs text-muted-foreground">Hours flight time</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AirFreight;