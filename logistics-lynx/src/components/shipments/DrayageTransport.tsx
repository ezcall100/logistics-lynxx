/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Anchor, Ship, Truck, MapPin, Clock, DollarSign, Search, Plus, Eye, Edit, Navigation, Container } from 'lucide-react';

const DrayageTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const drayageShipments = [
    {
      id: "DRY-2024-001",
      containerNumber: "MSCU-789012-4",
      origin: "Port of Los Angeles",
      destination: "Carson Warehouse",
      customer: "Pacific Imports LLC",
      drayageCompany: "Port City Drayage",
      driver: "Carlos Martinez",
      truckNumber: "DRY-101",
      status: "In Transit",
      serviceType: "Port to Door",
      containerType: "40' GP",
      weight: "38,500 lbs",
      rate: "$425",
      pickupDate: "2024-01-24",
      deliveryDate: "2024-01-24",
      commodity: "Import Electronics",
      currentLocation: "I-405 Southbound",
      specialRequirements: ["Overweight Permit"],
      portFees: "$85",
      demurrage: "$0",
      distance: "18 miles",
      vessel: "MSC Diana",
      berth: "Berth 147"
    },
    {
      id: "DRY-2024-002",
      containerNumber: "UACU-445566-7",
      origin: "Long Beach Terminal",
      destination: "Downtown LA",
      customer: "Metro Distribution Co",
      drayageCompany: "Harbor Trucking",
      driver: "Maria Rodriguez",
      truckNumber: "DRY-205",
      status: "Loading",
      serviceType: "Port Pickup",
      containerType: "20' GP",
      weight: "28,200 lbs",
      rate: "$385",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-25",
      commodity: "Import Textiles",
      currentLocation: "Terminal Island",
      specialRequirements: ["Appointment Required"],
      portFees: "$65",
      demurrage: "$120",
      distance: "22 miles",
      vessel: "OOCL Tokyo",
      berth: "Berth 100"
    },
    {
      id: "DRY-2024-003",
      containerNumber: "TCLU-223344-9",
      origin: "Customer Facility",
      destination: "Port of Long Beach",
      customer: "Export Solutions Inc",
      drayageCompany: "Coastal Drayage",
      driver: "James Kim",
      truckNumber: "DRY-308",
      status: "Delivered",
      serviceType: "Door to Port",
      containerType: "40' HC",
      weight: "45,000 lbs",
      rate: "$450",
      pickupDate: "2024-01-23",
      deliveryDate: "2024-01-23",
      commodity: "Export Machinery",
      currentLocation: "Port of Long Beach",
      specialRequirements: ["Hazmat Certified"],
      portFees: "$95",
      demurrage: "$0",
      distance: "15 miles",
      vessel: "Maersk Seoul",
      berth: "Berth 76"
    },
    {
      id: "DRY-2024-004",
      containerNumber: "GESU-667788-2",
      origin: "Rail Yard ICTF",
      destination: "Riverside Warehouse",
      customer: "Inland Empire Logistics",
      drayageCompany: "Intermodal Express",
      driver: "Robert Chen",
      truckNumber: "DRY-412",
      status: "Scheduled",
      serviceType: "Rail to Door",
      containerType: "53' Container",
      weight: "48,000 lbs",
      rate: "$520",
      pickupDate: "2024-01-26",
      deliveryDate: "2024-01-26",
      commodity: "Consumer Goods",
      currentLocation: "ICTF Terminal",
      specialRequirements: ["Weekend Delivery"],
      portFees: "$0",
      demurrage: "$0",
      distance: "45 miles",
      vessel: "N/A",
      berth: "Rail Terminal"
    },
    {
      id: "DRY-2024-005",
      containerNumber: "TEMU-556677-1",
      origin: "Port of Oakland",
      destination: "San Francisco Warehouse",
      customer: "Bay Area Imports",
      drayageCompany: "Golden Gate Drayage",
      driver: "Lisa Thompson",
      truckNumber: "DRY-515",
      status: "Delayed",
      serviceType: "Port to Door",
      containerType: "40' RF",
      weight: "42,800 lbs",
      rate: "$580",
      pickupDate: "2024-01-24",
      deliveryDate: "2024-01-25",
      commodity: "Refrigerated Foods",
      currentLocation: "Oakland Bay Bridge",
      specialRequirements: ["Temperature Controlled", "TWIC Required"],
      portFees: "$105",
      demurrage: "$180",
      distance: "25 miles",
      vessel: "CMA CGM Marco Polo",
      berth: "Berth 58"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Loading': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Port to Door': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Door to Port': return 'bg-green-50 text-green-700 border-green-200';
      case 'Port Pickup': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Rail to Door': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredShipments = drayageShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-orange-900 flex items-center space-x-3">
              <Anchor className="h-7 w-7 text-orange-600" />
              <span>Drayage Operations</span>
            </h2>
            <p className="text-orange-700 mt-1">Short-distance container transport to/from ports and terminals</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                New Drayage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Drayage Move</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pacific">Pacific Imports LLC</SelectItem>
                      <SelectItem value="metro">Metro Distribution Co</SelectItem>
                      <SelectItem value="export">Export Solutions Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drayageCompany">Drayage Company</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drayage provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="port">Port City Drayage</SelectItem>
                      <SelectItem value="harbor">Harbor Trucking</SelectItem>
                      <SelectItem value="coastal">Coastal Drayage</SelectItem>
                      <SelectItem value="intermodal">Intermodal Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Drayage service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="porttodoor">Port to Door</SelectItem>
                      <SelectItem value="doortoport">Door to Port</SelectItem>
                      <SelectItem value="portpickup">Port Pickup</SelectItem>
                      <SelectItem value="railtodoor">Rail to Door</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="containerNumber">Container Number</Label>
                  <Input id="containerNumber" placeholder="e.g., MSCU-123456-7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="containerType">Container Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Container type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20gp">20' GP</SelectItem>
                      <SelectItem value="40gp">40' GP</SelectItem>
                      <SelectItem value="40hc">40' HC</SelectItem>
                      <SelectItem value="53ft">53' Container</SelectItem>
                      <SelectItem value="40rf">40' RF</SelectItem>
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
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" placeholder="Container weight" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Drayage rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Drayage Move</Button>
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
                  placeholder="Search by container number, customer, or driver..."
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

      {/* Enhanced Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Drayage Moves ({filteredShipments.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Port Status</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Move Details</th>
                  <th className="text-left p-3 font-semibold">Route & Schedule</th>
                  <th className="text-left p-3 font-semibold">Driver & Equipment</th>
                  <th className="text-left p-3 font-semibold">Container Info</th>
                  <th className="text-left p-3 font-semibold">Port/Terminal Info</th>
                  <th className="text-left p-3 font-semibold">Costs</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-orange-900">{shipment.id}</div>
                        <div className="text-sm text-muted-foreground">{shipment.containerNumber}</div>
                        <div className="text-sm font-medium">{shipment.customer}</div>
                        <div className="text-xs text-muted-foreground">{shipment.drayageCompany}</div>
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
                        <div className="text-xs text-muted-foreground">{shipment.distance}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium flex items-center">
                          <Truck className="h-3 w-3 mr-1 text-orange-600" />
                          {shipment.driver}
                        </div>
                        <div className="text-sm text-muted-foreground">{shipment.truckNumber}</div>
                        <Badge className={getServiceTypeColor(shipment.serviceType)} variant="outline">
                          {shipment.serviceType}
                        </Badge>
                        <div className="text-xs text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        <div><strong>Type:</strong> {shipment.containerType}</div>
                        <div><strong>Weight:</strong> {shipment.weight}</div>
                        <div className="text-xs font-medium">{shipment.commodity}</div>
                        {shipment.specialRequirements.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {shipment.specialRequirements.map((req, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        {shipment.vessel !== "N/A" && (
                          <div className="flex items-center">
                            <Ship className="h-3 w-3 mr-1 text-blue-600" />
                            <span>{shipment.vessel}</span>
                          </div>
                        )}
                        <div><strong>Berth:</strong> {shipment.berth}</div>
                        {shipment.portFees !== "$0" && (
                          <div className="text-xs">Port Fees: {shipment.portFees}</div>
                        )}
                        {shipment.demurrage !== "$0" && (
                          <div className="text-xs text-red-600">Demurrage: {shipment.demurrage}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{shipment.rate}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '')) / parseInt(shipment.distance.replace(/[^\d]/g, ''))).toFixed(2)}/mile
                        </div>
                        {(shipment.portFees !== "$0" || shipment.demurrage !== "$0") && (
                          <div className="text-xs">
                            <div>+Fees: {shipment.portFees}</div>
                            {shipment.demurrage !== "$0" && (
                              <div className="text-red-600">+Demurrage: {shipment.demurrage}</div>
                            )}
                          </div>
                        )}
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
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-800 flex items-center">
              <Container className="h-4 w-4 mr-2" />
              Active Drayage Moves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">124</div>
            <div className="text-xs text-orange-700">+18 from yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Drayage Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">$58K</div>
            <div className="text-xs text-green-700">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Avg Rate/Mile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">$18.50</div>
            <div className="text-xs text-blue-700">Port drayage</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-800 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Avg Turn Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">3.2</div>
            <div className="text-xs text-amber-700">Hours at terminal</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrayageTransport;