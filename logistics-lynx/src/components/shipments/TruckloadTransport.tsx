import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Truck, MapPin, Clock, DollarSign, Search, Plus, Eye, Edit, Navigation, Package, Users, Calendar } from 'lucide-react';

const TruckloadTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const truckloadShipments = [
    {
      id: "TL-2024-001",
      loadNumber: "TL-789012",
      origin: "Los Angeles, CA",
      destination: "Dallas, TX",
      customer: "Global Manufacturing Inc",
      driver: "Mike Rodriguez",
      truckNumber: "TRK-101",
      trailer: "TRL-501",
      status: "In Transit",
      loadType: "Dry Van",
      weight: "48,000 lbs",
      miles: "1,435",
      rate: "$3,250",
      margin: "18%",
      pickupDate: "2024-01-24",
      deliveryDate: "2024-01-26",
      commodity: "Consumer Electronics",
      currentLocation: "Amarillo, TX",
      temperature: "Ambient",
      hazmat: false
    },
    {
      id: "TL-2024-002",
      loadNumber: "TL-789013",
      origin: "Chicago, IL",
      destination: "Atlanta, GA",
      customer: "Southern Distribution LLC",
      driver: "Sarah Johnson",
      truckNumber: "TRK-102",
      trailer: "TRL-502",
      status: "Loading",
      loadType: "Reefer",
      weight: "47,500 lbs",
      miles: "716",
      rate: "$2,890",
      margin: "22%",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-27",
      commodity: "Frozen Foods",
      currentLocation: "Chicago, IL",
      temperature: "-10°F",
      hazmat: false
    },
    {
      id: "TL-2024-003",
      loadNumber: "TL-789014",
      origin: "Houston, TX",
      destination: "Phoenix, AZ",
      customer: "Southwest Logistics Corp",
      driver: "David Chen",
      truckNumber: "TRK-103",
      trailer: "TRL-503",
      status: "Delivered",
      loadType: "Flatbed",
      weight: "45,200 lbs",
      miles: "1,187",
      rate: "$3,680",
      margin: "25%",
      pickupDate: "2024-01-22",
      deliveryDate: "2024-01-24",
      commodity: "Steel Coils",
      currentLocation: "Phoenix, AZ",
      temperature: "Ambient",
      hazmat: false
    },
    {
      id: "TL-2024-004",
      loadNumber: "TL-789015",
      origin: "Seattle, WA",
      destination: "Denver, CO",
      customer: "Mountain View Trading",
      driver: "Lisa Williams",
      truckNumber: "TRK-104",
      trailer: "TRL-504",
      status: "Dispatched",
      loadType: "Dry Van",
      weight: "44,800 lbs",
      miles: "1,318",
      rate: "$3,150",
      margin: "20%",
      pickupDate: "2024-01-26",
      deliveryDate: "2024-01-28",
      commodity: "Retail Goods",
      currentLocation: "Seattle, WA",
      temperature: "Ambient",
      hazmat: false
    },
    {
      id: "TL-2024-005",
      loadNumber: "TL-789016",
      origin: "Miami, FL",
      destination: "New York, NY",
      customer: "East Coast Express Inc",
      driver: "Robert Martinez",
      truckNumber: "TRK-105",
      trailer: "TRL-505",
      status: "Delayed",
      loadType: "Hazmat",
      weight: "42,000 lbs",
      miles: "1,286",
      rate: "$4,200",
      margin: "15%",
      pickupDate: "2024-01-23",
      deliveryDate: "2024-01-26",
      commodity: "Chemical Products",
      currentLocation: "Jacksonville, FL",
      temperature: "Ambient",
      hazmat: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Loading': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Dispatched': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLoadTypeColor = (loadType: string) => {
    switch (loadType) {
      case 'Dry Van': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Reefer': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Flatbed': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hazmat': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredShipments = truckloadShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 flex items-center space-x-3">
              <Truck className="h-7 w-7 text-blue-600" />
              <span>Truckload (TL) Operations</span>
            </h2>
            <p className="text-blue-700 mt-1">Full truckload freight transportation management</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                New Truckload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Truckload Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global Manufacturing Inc</SelectItem>
                      <SelectItem value="southern">Southern Distribution LLC</SelectItem>
                      <SelectItem value="southwest">Southwest Logistics Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Pickup Location</Label>
                  <Input id="origin" placeholder="Origin city, state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Delivery Location</Label>
                  <Input id="destination" placeholder="Destination city, state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loadType">Load Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Equipment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dryvan">Dry Van</SelectItem>
                      <SelectItem value="reefer">Reefer</SelectItem>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                      <SelectItem value="stepdeck">Step Deck</SelectItem>
                      <SelectItem value="hazmat">Hazmat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" placeholder="e.g., 45000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input id="commodity" placeholder="Type of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input id="pickupDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input id="deliveryDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($)</Label>
                  <Input id="rate" placeholder="Total rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Truckload</Button>
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
                  placeholder="Search by load ID, driver, customer, or location..."
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
                <SelectItem value="dispatched">Dispatched</SelectItem>
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
            <span>Truckload Shipments ({filteredShipments.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Bulk Actions</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Load Details</th>
                  <th className="text-left p-3 font-semibold">Route & Schedule</th>
                  <th className="text-left p-3 font-semibold">Equipment & Driver</th>
                  <th className="text-left p-3 font-semibold">Load Info</th>
                  <th className="text-left p-3 font-semibold">Financials</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-blue-900">{shipment.id}</div>
                        <div className="text-sm text-muted-foreground">{shipment.loadNumber}</div>
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
                        <div className="text-xs text-muted-foreground">{shipment.miles} miles</div>
                        <div className="text-xs">
                          <div>Pickup: {shipment.pickupDate}</div>
                          <div>Delivery: {shipment.deliveryDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <Badge className={getLoadTypeColor(shipment.loadType)} variant="outline">
                          {shipment.loadType}
                        </Badge>
                        <div className="text-sm font-medium">{shipment.driver}</div>
                        <div className="text-xs text-muted-foreground">
                          {shipment.truckNumber} / {shipment.trailer}
                        </div>
                        {shipment.hazmat && (
                          <Badge variant="destructive" className="text-xs">HAZMAT</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        <div><strong>Weight:</strong> {shipment.weight}</div>
                        <div><strong>Commodity:</strong> {shipment.commodity}</div>
                        <div><strong>Temp:</strong> {shipment.temperature}</div>
                        <div className="text-xs text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{shipment.rate}</div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Margin: </span>
                          <span className={`font-medium ${parseInt(shipment.margin) > 20 ? 'text-green-600' : parseInt(shipment.margin) > 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {shipment.margin}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '').replace(',', '')) / parseInt(shipment.miles)).toFixed(2)}/mile
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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Active TL Loads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">247</div>
            <div className="text-xs text-blue-700">+12 from yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              TL Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">$685K</div>
            <div className="text-xs text-green-700">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Avg Rate/Mile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">$2.45</div>
            <div className="text-xs text-purple-700">+$0.12 vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-800 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              On-Time Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">94.2%</div>
            <div className="text-xs text-amber-700">Above target</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckloadTransport;