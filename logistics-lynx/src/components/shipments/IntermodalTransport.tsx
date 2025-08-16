/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Container, Ship, Train, Truck, MapPin, Clock, DollarSign, Search, Plus, Eye, Edit, Navigation, Anchor } from 'lucide-react';

const IntermodalTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const intermodalShipments = [
    {
      id: "IM-2024-001",
      containerNumber: "MSKU-789012-3",
      origin: "Los Angeles, CA",
      destination: "Chicago, IL",
      customer: "Midwest Logistics Corp",
      railCarrier: "BNSF Railway",
      drayman: "Pacific Drayage Co",
      status: "Rail Transit",
      serviceType: "Premium",
      containerType: "53' Container",
      weight: "45,000 lbs",
      rate: "$2,850",
      railPortion: "Los Angeles - Chicago",
      pickupDate: "2024-01-22",
      deliveryDate: "2024-01-28",
      commodity: "Consumer Goods",
      currentLocation: "Barstow Rail Yard",
      segments: [
        { mode: "Drayage", from: "Customer", to: "Rail Yard", status: "Completed" },
        { mode: "Rail", from: "LA Rail Yard", to: "Chicago Rail Yard", status: "In Transit" },
        { mode: "Drayage", from: "Rail Yard", to: "Customer", status: "Pending" }
      ],
      estimatedTransitDays: 6,
      actualTransitDays: 4
    },
    {
      id: "IM-2024-002",
      containerNumber: "UACU-567890-1",
      origin: "Seattle, WA",
      destination: "Memphis, TN",
      customer: "Southern Distribution Inc",
      railCarrier: "Union Pacific",
      drayman: "Northwest Drayage LLC",
      status: "Drayage Pickup",
      serviceType: "Standard",
      containerType: "53' Container",
      weight: "42,800 lbs",
      rate: "$2,680",
      railPortion: "Seattle - Memphis",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-30",
      commodity: "Electronics",
      currentLocation: "Customer Facility",
      segments: [
        { mode: "Drayage", from: "Customer", to: "Rail Yard", status: "In Progress" },
        { mode: "Rail", from: "Seattle Rail Yard", to: "Memphis Rail Yard", status: "Pending" },
        { mode: "Drayage", from: "Rail Yard", to: "Customer", status: "Pending" }
      ],
      estimatedTransitDays: 5,
      actualTransitDays: 0
    },
    {
      id: "IM-2024-003",
      containerNumber: "TCLU-445566-8",
      origin: "Houston, TX",
      destination: "Atlanta, GA",
      customer: "Southeast Trading Co",
      railCarrier: "Kansas City Southern",
      drayman: "Gulf Coast Drayage",
      status: "Delivered",
      serviceType: "Expedited",
      containerType: "53' Container",
      weight: "48,200 lbs",
      rate: "$3,150",
      railPortion: "Houston - Atlanta",
      pickupDate: "2024-01-20",
      deliveryDate: "2024-01-25",
      commodity: "Automotive Parts",
      currentLocation: "Atlanta, GA",
      segments: [
        { mode: "Drayage", from: "Customer", to: "Rail Yard", status: "Completed" },
        { mode: "Rail", from: "Houston Rail Yard", to: "Atlanta Rail Yard", status: "Completed" },
        { mode: "Drayage", from: "Rail Yard", to: "Customer", status: "Completed" }
      ],
      estimatedTransitDays: 5,
      actualTransitDays: 5
    },
    {
      id: "IM-2024-004",
      containerNumber: "GESU-223344-5",
      origin: "Oakland, CA",
      destination: "Dallas, TX",
      customer: "Texas Import Export",
      railCarrier: "BNSF Railway",
      drayman: "Bay Area Drayage",
      status: "Drayage Delivery",
      serviceType: "Standard",
      containerType: "53' Container",
      weight: "46,500 lbs",
      rate: "$2,950",
      railPortion: "Oakland - Dallas",
      pickupDate: "2024-01-23",
      deliveryDate: "2024-01-28",
      commodity: "Machinery",
      currentLocation: "En Route to Customer",
      segments: [
        { mode: "Drayage", from: "Customer", to: "Rail Yard", status: "Completed" },
        { mode: "Rail", from: "Oakland Rail Yard", to: "Dallas Rail Yard", status: "Completed" },
        { mode: "Drayage", from: "Rail Yard", to: "Customer", status: "In Progress" }
      ],
      estimatedTransitDays: 5,
      actualTransitDays: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rail Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Drayage Pickup': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Drayage Delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'At Terminal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Expedited': return 'bg-red-50 text-red-700 border-red-200';
      case 'Premium': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Standard': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSegmentIcon = (mode: string) => {
    switch (mode) {
      case 'Drayage': return Truck;
      case 'Rail': return Train;
      case 'Ocean': return Ship;
      default: return Container;
    }
  };

  const getSegmentColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'In Transit': return 'text-blue-600';
      case 'Pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredShipments = intermodalShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.railCarrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase().replace(' ', '') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-teal-900 flex items-center space-x-3">
              <Container className="h-7 w-7 text-teal-600" />
              <span>Intermodal Transport</span>
            </h2>
            <p className="text-teal-700 mt-1">Multi-mode transportation combining rail and drayage</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                New Intermodal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Intermodal Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midwest">Midwest Logistics Corp</SelectItem>
                      <SelectItem value="southern">Southern Distribution Inc</SelectItem>
                      <SelectItem value="southeast">Southeast Trading Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="railCarrier">Rail Carrier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rail carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bnsf">BNSF Railway</SelectItem>
                      <SelectItem value="up">Union Pacific</SelectItem>
                      <SelectItem value="kcs">Kansas City Southern</SelectItem>
                      <SelectItem value="csx">CSX Transportation</SelectItem>
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
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="expedited">Expedited</SelectItem>
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
                  <Label htmlFor="containerType">Container Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Container size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="53ft">53' Container</SelectItem>
                      <SelectItem value="48ft">48' Container</SelectItem>
                      <SelectItem value="40ft">40' Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" placeholder="Total weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Description of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Total rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Intermodal</Button>
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
                  placeholder="Search by container number, customer, or rail carrier..."
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
                <SelectItem value="drayagepickup">Drayage Pickup</SelectItem>
                <SelectItem value="railtransit">Rail Transit</SelectItem>
                <SelectItem value="atterminal">At Terminal</SelectItem>
                <SelectItem value="drayagedelivery">Drayage Delivery</SelectItem>
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
            <span>Intermodal Shipments ({filteredShipments.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Rail Schedule</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Shipment Details</th>
                  <th className="text-left p-3 font-semibold">Route & Schedule</th>
                  <th className="text-left p-3 font-semibold">Carriers & Service</th>
                  <th className="text-left p-3 font-semibold">Container Info</th>
                  <th className="text-left p-3 font-semibold">Transit Segments</th>
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
                        <div className="font-semibold text-teal-900">{shipment.id}</div>
                        <div className="text-sm text-muted-foreground">{shipment.containerNumber}</div>
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
                        <div className="text-sm font-medium flex items-center">
                          <Train className="h-3 w-3 mr-1 text-blue-600" />
                          {shipment.railCarrier}
                        </div>
                        <div className="text-sm flex items-center">
                          <Truck className="h-3 w-3 mr-1 text-orange-600" />
                          {shipment.drayman}
                        </div>
                        <Badge className={getServiceTypeColor(shipment.serviceType)} variant="outline">
                          {shipment.serviceType}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        <div><strong>Type:</strong> {shipment.containerType}</div>
                        <div><strong>Weight:</strong> {shipment.weight}</div>
                        <div className="text-xs font-medium">{shipment.commodity}</div>
                        <div className="text-xs text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        {shipment.segments.map((segment, index) => {
                          const SegmentIcon = getSegmentIcon(segment.mode);
                          return (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <SegmentIcon className={`h-3 w-3 ${getSegmentColor(segment.status)}`} />
                              <span className={getSegmentColor(segment.status)}>
                                {segment.mode}: {segment.status}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{shipment.rate}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '').replace(',', '')) / parseInt(shipment.weight.replace(/[^\d]/g, '')) * 100).toFixed(2)}/cwt
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
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-800 flex items-center">
              <Container className="h-4 w-4 mr-2" />
              Active Containers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">89</div>
            <div className="text-xs text-teal-700">+5 from yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Intermodal Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">$255K</div>
            <div className="text-xs text-green-700">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 flex items-center">
              <Train className="h-4 w-4 mr-2" />
              Avg Rate/Container
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">$2,920</div>
            <div className="text-xs text-blue-700">Per 53' container</div>
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
            <div className="text-2xl font-bold text-amber-900">5.2</div>
            <div className="text-xs text-amber-700">Days door-to-door</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntermodalTransport;