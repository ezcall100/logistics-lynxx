import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, MapPin, Clock, DollarSign, Search, Plus, Eye, Edit, Navigation, Boxes, Warehouse } from 'lucide-react';

const LTLTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const ltlShipments = [
    {
      id: "LTL-2024-001",
      proNumber: "PRO-445612",
      origin: "Los Angeles, CA",
      destination: "Denver, CO",
      customer: "Metro Supply Co",
      carrier: "FedEx Freight",
      status: "In Transit",
      serviceType: "Standard",
      pieces: 15,
      weight: "2,450 lbs",
      class: "65",
      rate: "$485",
      dimensions: "48x40x36",
      pickupDate: "2024-01-24",
      deliveryDate: "2024-01-26",
      commodity: "Auto Parts",
      currentLocation: "Salt Lake City, UT",
      specialServices: ["Liftgate", "Inside Delivery"],
      estimatedTransitDays: 2,
      actualTransitDays: 2
    },
    {
      id: "LTL-2024-002",
      proNumber: "PRO-445613",
      origin: "Chicago, IL",
      destination: "Miami, FL",
      customer: "Sunshine Electronics",
      carrier: "XPO Logistics",
      status: "Terminal",
      serviceType: "Expedited",
      pieces: 8,
      weight: "1,280 lbs",
      class: "92.5",
      rate: "$620",
      dimensions: "36x30x24",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-27",
      commodity: "Electronics",
      currentLocation: "Atlanta Terminal",
      specialServices: ["White Glove"],
      estimatedTransitDays: 3,
      actualTransitDays: 2
    },
    {
      id: "LTL-2024-003",
      proNumber: "PRO-445614",
      origin: "Dallas, TX",
      destination: "Phoenix, AZ",
      customer: "Desert Distribution",
      carrier: "Old Dominion",
      status: "Delivered",
      serviceType: "Standard",
      pieces: 25,
      weight: "4,200 lbs",
      class: "70",
      rate: "$680",
      dimensions: "48x42x38",
      pickupDate: "2024-01-22",
      deliveryDate: "2024-01-24",
      commodity: "Furniture",
      currentLocation: "Phoenix, AZ",
      specialServices: ["Residential Delivery"],
      estimatedTransitDays: 2,
      actualTransitDays: 2
    },
    {
      id: "LTL-2024-004",
      proNumber: "PRO-445615",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      customer: "Pacific Northwest Supply",
      carrier: "R+L Carriers",
      status: "Pickup Scheduled",
      serviceType: "Next Day",
      pieces: 5,
      weight: "890 lbs",
      class: "85",
      rate: "$280",
      dimensions: "24x20x18",
      pickupDate: "2024-01-26",
      deliveryDate: "2024-01-27",
      commodity: "Medical Equipment",
      currentLocation: "Seattle, WA",
      specialServices: ["Temperature Controlled"],
      estimatedTransitDays: 1,
      actualTransitDays: 0
    },
    {
      id: "LTL-2024-005",
      proNumber: "PRO-445616",
      origin: "Boston, MA",
      destination: "New York, NY",
      customer: "Northeast Trading",
      carrier: "Estes Express",
      status: "Delayed",
      serviceType: "Standard",
      pieces: 12,
      weight: "1,850 lbs",
      class: "77.5",
      rate: "$385",
      dimensions: "40x32x28",
      pickupDate: "2024-01-23",
      deliveryDate: "2024-01-25",
      commodity: "Machinery Parts",
      currentLocation: "Hartford Terminal",
      specialServices: ["Hazmat"],
      estimatedTransitDays: 2,
      actualTransitDays: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Terminal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Pickup Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Next Day': return 'bg-red-50 text-red-700 border-red-200';
      case 'Expedited': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Standard': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredShipments = ltlShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.proNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase().replace(' ', '') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 flex items-center space-x-3">
              <Boxes className="h-7 w-7 text-purple-600" />
              <span>Less Than Truckload (LTL)</span>
            </h2>
            <p className="text-purple-700 mt-1">Small freight and consolidated shipment management</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                New LTL Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New LTL Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro Supply Co</SelectItem>
                      <SelectItem value="sunshine">Sunshine Electronics</SelectItem>
                      <SelectItem value="desert">Desert Distribution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">LTL Carrier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedex">FedEx Freight</SelectItem>
                      <SelectItem value="xpo">XPO Logistics</SelectItem>
                      <SelectItem value="od">Old Dominion</SelectItem>
                      <SelectItem value="rl">R+L Carriers</SelectItem>
                      <SelectItem value="estes">Estes Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Service level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="expedited">Expedited</SelectItem>
                      <SelectItem value="nextday">Next Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Pickup location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Delivery location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieces">Pieces</Label>
                  <Input id="pieces" type="number" placeholder="Number of pieces" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" placeholder="Total weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Freight Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="NMFC class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="55">55</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="65">65</SelectItem>
                      <SelectItem value="70">70</SelectItem>
                      <SelectItem value="77.5">77.5</SelectItem>
                      <SelectItem value="85">85</SelectItem>
                      <SelectItem value="92.5">92.5</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Description of goods" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create LTL Shipment</Button>
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
                  placeholder="Search by LTL ID, PRO number, customer, or carrier..."
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
                <SelectItem value="pickupscheduled">Pickup Scheduled</SelectItem>
                <SelectItem value="intransit">In Transit</SelectItem>
                <SelectItem value="terminal">At Terminal</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>LTL Shipments ({filteredShipments.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Rate Quote</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Shipment Details</th>
                  <th className="text-left p-3 font-semibold">Route & Transit</th>
                  <th className="text-left p-3 font-semibold">Carrier & Service</th>
                  <th className="text-left p-3 font-semibold">Freight Details</th>
                  <th className="text-left p-3 font-semibold">Special Services</th>
                  <th className="text-left p-3 font-semibold">Cost</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-purple-900">{shipment.id}</div>
                        <div className="text-sm text-muted-foreground">{shipment.proNumber}</div>
                        <div className="text-sm font-medium">{shipment.customer}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-green-500" />
                          <span className="text-sm">{shipment.origin}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-red-500" />
                          <span className="text-sm">{shipment.destination}</span>
                        </div>
                        <div className="text-xs">
                          <div>Pickup: {shipment.pickupDate}</div>
                          <div>Delivery: {shipment.deliveryDate}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Transit: {shipment.actualTransitDays || shipment.estimatedTransitDays} days
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{shipment.carrier}</div>
                        <Badge className={getServiceTypeColor(shipment.serviceType)} variant="outline">
                          {shipment.serviceType}
                        </Badge>
                        <div className="text-xs text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        <div><strong>Pieces:</strong> {shipment.pieces}</div>
                        <div><strong>Weight:</strong> {shipment.weight}</div>
                        <div><strong>Class:</strong> {shipment.class}</div>
                        <div><strong>Dims:</strong> {shipment.dimensions}</div>
                        <div className="text-xs font-medium">{shipment.commodity}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {shipment.specialServices.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{shipment.rate}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '')) / parseInt(shipment.weight.replace(/[^\d]/g, '')) * 100).toFixed(2)}/cwt
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(shipment.status)} variant="outline">
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Navigation className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
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

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800 flex items-center">
              <Boxes className="h-4 w-4 mr-2" />
              Active LTL Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">156</div>
            <div className="text-xs text-purple-700">+8 from yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              LTL Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">$128K</div>
            <div className="text-xs text-green-700">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 flex items-center">
              <Warehouse className="h-4 w-4 mr-2" />
              Avg Rate/CWT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">$18.50</div>
            <div className="text-xs text-blue-700">Per hundredweight</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-800 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Avg Transit Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">2.3</div>
            <div className="text-xs text-amber-700">Days</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LTLTransport;