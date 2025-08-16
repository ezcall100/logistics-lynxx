/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Truck, MapPin, Clock, DollarSign, Search, Plus, Eye, Edit, Navigation, Shield, Users } from 'lucide-react';

const AutoTransport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const autoShipments = [
    {
      id: "AUTO-2024-001",
      loadNumber: "AT-789012",
      origin: "Detroit, MI",
      destination: "Miami, FL",
      customer: "Sunshine Auto Dealers",
      carrier: "United Auto Transport",
      driver: "Mike Thompson",
      truckNumber: "CAR-101",
      trailerNumber: "AHT-501",
      status: "In Transit",
      trailerType: "Open Carrier",
      vehicleCount: 8,
      totalValue: "$280,000",
      rate: "$2,850",
      pickupDate: "2024-01-22",
      deliveryDate: "2024-01-26",
      currentLocation: "Atlanta, GA",
      distance: "1,186 miles",
      vehicles: [
        { vin: "1HGBH41JXMN109186", year: "2024", make: "Honda", model: "Accord", color: "White", value: "$32,000" },
        { vin: "1FTFW1ET5DFC12345", year: "2024", make: "Ford", model: "F-150", color: "Blue", value: "$45,000" },
        { vin: "WBAJA7C58KWW12345", year: "2023", make: "BMW", model: "X3", color: "Black", value: "$52,000" },
        { vin: "1G6AB5RA8D0123456", year: "2024", make: "Cadillac", model: "CT5", color: "Red", value: "$48,000" }
      ],
      insuranceCoverage: "$100,000",
      specialInstructions: "Handle with care, luxury vehicles"
    },
    {
      id: "AUTO-2024-002",
      loadNumber: "AT-789013",
      origin: "Los Angeles, CA",
      destination: "Seattle, WA",
      customer: "Pacific Northwest Motors",
      carrier: "West Coast Auto Lines",
      driver: "Sarah Johnson",
      truckNumber: "CAR-205",
      trailerNumber: "AHT-602",
      status: "Loading",
      trailerType: "Enclosed Carrier",
      vehicleCount: 6,
      totalValue: "$420,000",
      rate: "$3,680",
      pickupDate: "2024-01-25",
      deliveryDate: "2024-01-28",
      currentLocation: "Los Angeles Terminal",
      distance: "1,135 miles",
      vehicles: [
        { vin: "WP0AA2A99KS123456", year: "2024", make: "Porsche", model: "911", color: "Silver", value: "$120,000" },
        { vin: "WDDWJ7EB9KA123456", year: "2024", make: "Mercedes", model: "S-Class", color: "Black", value: "$110,000" },
        { vin: "WBAWV1C58KV123456", year: "2023", make: "BMW", model: "M3", color: "White", value: "$85,000" }
      ],
      insuranceCoverage: "$150,000",
      specialInstructions: "Enclosed transport required for luxury vehicles"
    },
    {
      id: "AUTO-2024-003",
      loadNumber: "AT-789014",
      origin: "Houston, TX",
      destination: "Denver, CO",
      customer: "Mountain View Auto Sales",
      carrier: "Central Auto Freight",
      driver: "David Martinez",
      truckNumber: "CAR-308",
      trailerNumber: "AHT-703",
      status: "Delivered",
      trailerType: "Open Carrier",
      vehicleCount: 9,
      totalValue: "$225,000",
      rate: "$2,450",
      pickupDate: "2024-01-20",
      deliveryDate: "2024-01-23",
      currentLocation: "Denver, CO",
      distance: "879 miles",
      vehicles: [
        { vin: "1HGCV1F30KA123456", year: "2023", make: "Honda", model: "Civic", color: "Blue", value: "$25,000" },
        { vin: "3VWD07AJ9KM123456", year: "2023", make: "Volkswagen", model: "Jetta", color: "Gray", value: "$28,000" },
        { vin: "KNMAT2MV8KP123456", year: "2024", make: "Kia", model: "Forte", color: "Red", value: "$24,000" }
      ],
      insuranceCoverage: "$75,000",
      specialInstructions: "Standard delivery, inspect for damage"
    },
    {
      id: "AUTO-2024-004",
      loadNumber: "AT-789015",
      origin: "Phoenix, AZ",
      destination: "Las Vegas, NV",
      customer: "Desert Auto Group",
      carrier: "Southwest Auto Haul",
      driver: "Lisa Chen",
      truckNumber: "CAR-412",
      trailerNumber: "AHT-804",
      status: "Pickup Scheduled",
      trailerType: "Open Carrier",
      vehicleCount: 7,
      totalValue: "$190,000",
      rate: "$1,850",
      pickupDate: "2024-01-26",
      deliveryDate: "2024-01-27",
      currentLocation: "Phoenix Terminal",
      distance: "295 miles",
      vehicles: [
        { vin: "2HKRM4H76NH123456", year: "2024", make: "Honda", model: "Pilot", color: "White", value: "$38,000" },
        { vin: "1FTEW1E58KK123456", year: "2023", make: "Ford", model: "Explorer", color: "Black", value: "$42,000" },
        { vin: "5NPE34AF8KH123456", year: "2024", make: "Hyundai", model: "Tucson", color: "Silver", value: "$32,000" }
      ],
      insuranceCoverage: "$65,000",
      specialInstructions: "Same day delivery requested"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Loading': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Pickup Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrailerTypeColor = (trailerType: string) => {
    switch (trailerType) {
      case 'Enclosed Carrier': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Open Carrier': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredShipments = autoShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status.toLowerCase().replace(' ', '') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-red-900 flex items-center space-x-3">
              <Car className="h-7 w-7 text-red-600" />
              <span>Auto Transport</span>
            </h2>
            <p className="text-red-700 mt-1">Vehicle shipping and automotive logistics management</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
                <Plus className="h-4 w-4 mr-2" />
                New Auto Transport
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Auto Transport Load</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunshine">Sunshine Auto Dealers</SelectItem>
                      <SelectItem value="pacific">Pacific Northwest Motors</SelectItem>
                      <SelectItem value="mountain">Mountain View Auto Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrier">Auto Transport Carrier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="united">United Auto Transport</SelectItem>
                      <SelectItem value="west">West Coast Auto Lines</SelectItem>
                      <SelectItem value="central">Central Auto Freight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trailerType">Trailer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Carrier type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open Carrier</SelectItem>
                      <SelectItem value="enclosed">Enclosed Carrier</SelectItem>
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
                  <Label htmlFor="vehicleCount">Number of Vehicles</Label>
                  <Input id="vehicleCount" type="number" placeholder="Vehicle count" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalValue">Total Vehicle Value</Label>
                  <Input id="totalValue" placeholder="Total insurance value" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input id="pickupDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Transport Rate ($)</Label>
                  <Input id="rate" placeholder="Total transport rate" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Auto Transport</Button>
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
                  placeholder="Search by load ID, customer, driver, or carrier..."
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
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="intransit">In Transit</SelectItem>
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
            <span>Auto Transport Loads ({filteredShipments.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Vehicle Manifest</Button>
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
                  <th className="text-left p-3 font-semibold">Carrier & Driver</th>
                  <th className="text-left p-3 font-semibold">Vehicle Information</th>
                  <th className="text-left p-3 font-semibold">Insurance & Value</th>
                  <th className="text-left p-3 font-semibold">Rate</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-red-900">{shipment.id}</div>
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
                        <div className="text-xs">
                          <div>Pickup: {shipment.pickupDate}</div>
                          <div>Delivery: {shipment.deliveryDate}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{shipment.distance}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{shipment.carrier}</div>
                        <div className="text-sm flex items-center">
                          <Users className="h-3 w-3 mr-1 text-blue-600" />
                          {shipment.driver}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {shipment.truckNumber} / {shipment.trailerNumber}
                        </div>
                        <Badge className={getTrailerTypeColor(shipment.trailerType)} variant="outline">
                          {shipment.trailerType}
                        </Badge>
                        <div className="text-xs text-muted-foreground">@ {shipment.currentLocation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Car className="h-3 w-3 mr-1 text-red-600" />
                          <strong>{shipment.vehicleCount} vehicles</strong>
                        </div>
                        <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                          {shipment.vehicles.slice(0, 3).map((vehicle, index) => (
                            <div key={index} className="text-xs">
                              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.color})
                            </div>
                          ))}
                          {shipment.vehicles.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{shipment.vehicles.length - 3} more vehicles
                            </div>
                          )}
                        </div>
                        {shipment.specialInstructions && (
                          <div className="text-xs text-amber-700 bg-amber-50 p-1 rounded">
                            {shipment.specialInstructions}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-blue-600">{shipment.totalValue}</div>
                        <div className="text-xs flex items-center">
                          <Shield className="h-3 w-3 mr-1 text-green-600" />
                          <span>Coverage: {shipment.insuranceCoverage}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseInt(shipment.totalValue.replace(/[^\d]/g, '')) / shipment.vehicleCount).toLocaleString()}/vehicle avg
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{shipment.rate}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '').replace(',', '')) / parseInt(shipment.distance.replace(/[^\d]/g, ''))).toFixed(2)}/mile
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(parseFloat(shipment.rate.replace('$', '').replace(',', '')) / shipment.vehicleCount).toFixed(0)}/vehicle
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
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-800 flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Active Auto Loads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">67</div>
            <div className="text-xs text-red-700">+4 from yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Auto Transport Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">$185K</div>
            <div className="text-xs text-green-700">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Vehicles Transported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">542</div>
            <div className="text-xs text-blue-700">This month</div>
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
            <div className="text-2xl font-bold text-amber-900">4.5</div>
            <div className="text-xs text-amber-700">Days delivery</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoTransport;