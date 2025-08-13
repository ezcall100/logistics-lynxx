import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ship, Anchor, Globe, Calendar, Search, Plus, Eye, FileText, MapPin } from 'lucide-react';

const OceanFreight = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const oceanShipments = [
    {
      id: "OF-2024-001",
      bookingNumber: "BKG-789012",
      vessel: "MSC Diana",
      voyage: "024E",
      originPort: "Long Beach, CA",
      destinationPort: "Shanghai, China",
      shipper: "Global Exports Inc",
      consignee: "Asia Trading Co",
      status: "In Transit",
      containerType: "40' HC",
      containerCount: 12,
      etd: "2024-01-15",
      eta: "2024-02-02",
      rate: "$145,800",
      commodity: "Electronics",
      weight: "240 MT",
      carrierLine: "MSC"
    },
    {
      id: "OF-2024-002",
      bookingNumber: "BKG-789013",
      vessel: "COSCO Galaxy",
      voyage: "156W",
      originPort: "Seattle, WA",
      destinationPort: "Hamburg, Germany",
      shipper: "Pacific Trade",
      consignee: "European Distributors",
      status: "Loading",
      containerType: "20' GP",
      containerCount: 8,
      etd: "2024-01-28",
      eta: "2024-02-18",
      rate: "$89,600",
      commodity: "Machinery",
      weight: "160 MT",
      carrierLine: "COSCO"
    },
    {
      id: "OF-2024-003",
      bookingNumber: "BKG-789014",
      vessel: "Maersk Seoul",
      voyage: "301S",
      originPort: "Miami, FL",
      destinationPort: "Santos, Brazil",
      shipper: "Americas Shipping",
      consignee: "Brazil Imports Ltd",
      status: "Delivered",
      containerType: "40' RF",
      containerCount: 6,
      etd: "2024-01-08",
      eta: "2024-01-22",
      rate: "$67,200",
      commodity: "Food Products",
      weight: "144 MT",
      carrierLine: "Maersk"
    },
    {
      id: "OF-2024-004",
      bookingNumber: "BKG-789015",
      vessel: "OOCL Tokyo",
      voyage: "088E",
      originPort: "Oakland, CA",
      destinationPort: "Tokyo, Japan",
      shipper: "West Coast Traders",
      consignee: "Tokyo Distribution",
      status: "Booked",
      containerType: "45' HC",
      containerCount: 4,
      etd: "2024-02-05",
      eta: "2024-02-20",
      rate: "$52,800",
      commodity: "Automotive Parts",
      weight: "96 MT",
      carrierLine: "OOCL"
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

  const filteredShipments = oceanShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.originPort.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destinationPort.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Ship className="h-8 w-8 text-cyan-600" />
            <span>Ocean Freight</span>
          </h1>
          <p className="text-muted-foreground">Manage international ocean freight shipments</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500">
                <Plus className="h-4 w-4 mr-2" />
                New Ocean Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Ocean Freight Booking</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originPort">Origin Port</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="la">Long Beach, CA</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
                      <SelectItem value="miami">Miami, FL</SelectItem>
                      <SelectItem value="oakland">Oakland, CA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destPort">Destination Port</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shanghai">Shanghai, China</SelectItem>
                      <SelectItem value="hamburg">Hamburg, Germany</SelectItem>
                      <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                      <SelectItem value="santos">Santos, Brazil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">Shipping Line</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msc">MSC</SelectItem>
                      <SelectItem value="cosco">COSCO</SelectItem>
                      <SelectItem value="maersk">Maersk</SelectItem>
                      <SelectItem value="oocl">OOCL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="containerType">Container Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select container type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20gp">20' GP</SelectItem>
                      <SelectItem value="40gp">40' GP</SelectItem>
                      <SelectItem value="40hc">40' HC</SelectItem>
                      <SelectItem value="45hc">45' HC</SelectItem>
                      <SelectItem value="20rf">20' RF</SelectItem>
                      <SelectItem value="40rf">40' RF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="containers">Number of Containers</Label>
                  <Input id="containers" placeholder="e.g., 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Type of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (MT)</Label>
                  <Input id="weight" placeholder="Total weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Ocean freight rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Booking</Button>
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
                  placeholder="Search by booking, vessel, or port..."
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

      {/* Ocean Shipments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredShipments.map((shipment) => (
          <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{shipment.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{shipment.bookingNumber}</p>
                </div>
                <Badge className={getStatusColor(shipment.status)}>
                  {shipment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vessel Info */}
              <div className="flex items-center space-x-2">
                <Ship className="h-4 w-4 text-cyan-600" />
                <span className="font-medium">{shipment.vessel}</span>
                <span className="text-muted-foreground">Voyage {shipment.voyage}</span>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Anchor className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{shipment.originPort}</span>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{shipment.destinationPort}</span>
                </div>
              </div>

              {/* Container Info */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Containers:</span>
                    <span className="ml-1 font-medium">{shipment.containerCount}x {shipment.containerType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-1 font-medium">{shipment.weight}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commodity:</span>
                    <span className="ml-1 font-medium">{shipment.commodity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Carrier:</span>
                    <span className="ml-1 font-medium">{shipment.carrierLine}</span>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">ETD</div>
                  <div className="font-medium">{shipment.etd}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">ETA</div>
                  <div className="font-medium">{shipment.eta}</div>
                </div>
              </div>

              {/* Rate */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">{shipment.rate}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Docs
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
            <CardTitle className="text-sm">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="text-xs text-muted-foreground">Ocean shipments</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total TEU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340</div>
            <div className="text-xs text-muted-foreground">Container units</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ocean Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.1M</div>
            <div className="text-xs text-muted-foreground">This quarter</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground">Days ocean transit</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OceanFreight;