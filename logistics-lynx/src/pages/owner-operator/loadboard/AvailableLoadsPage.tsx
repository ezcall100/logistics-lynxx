import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, DollarSign, Truck, Clock, Star, Eye } from 'lucide-react';

interface Load {
  id: string;
  brokerName: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  rate: number;
  miles: number;
  ratePerMile: number;
  weight: string;
  equipment: string;
  status: 'available' | 'pending' | 'booked';
  rating: number;
  urgent: boolean;
}

const AvailableLoadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const availableLoads: Load[] = [
    {
      id: 'LD001',
      brokerName: 'TruckStop Logistics',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-17',
      rate: 1850,
      miles: 240,
      ratePerMile: 7.71,
      weight: '45,000 lbs',
      equipment: 'Dry Van',
      status: 'available',
      rating: 4.8,
      urgent: false
    },
    {
      id: 'LD002',
      brokerName: 'Express Freight Co',
      origin: 'Austin, TX',
      destination: 'San Antonio, TX',
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-16',
      rate: 980,
      miles: 80,
      ratePerMile: 12.25,
      weight: '28,500 lbs',
      equipment: 'Refrigerated',
      status: 'available',
      rating: 4.2,
      urgent: true
    },
    {
      id: 'LD003',
      brokerName: 'National Transport',
      origin: 'El Paso, TX',
      destination: 'Phoenix, AZ',
      pickupDate: '2024-01-17',
      deliveryDate: '2024-01-18',
      rate: 2100,
      miles: 430,
      ratePerMile: 4.88,
      weight: '48,000 lbs',
      equipment: 'Flatbed',
      status: 'available',
      rating: 4.5,
      urgent: false
    },
    {
      id: 'LD004',
      brokerName: 'Prime Logistics',
      origin: 'Fort Worth, TX',
      destination: 'Oklahoma City, OK',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      rate: 1650,
      miles: 200,
      ratePerMile: 8.25,
      weight: '42,000 lbs',
      equipment: 'Dry Van',
      status: 'available',
      rating: 4.7,
      urgent: false
    }
  ];

  const handleBookLoad = (loadId: string) => {
    console.log('Booking load:', loadId);
  };

  const handleViewDetails = (loadId: string) => {
    console.log('Viewing load details:', loadId);
  };

  const handleAddToFavorites = (loadId: string) => {
    console.log('Adding to favorites:', loadId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Loads</h1>
          <p className="text-muted-foreground">Find and book loads that match your route</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {availableLoads.length} Loads Available
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search origin/destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger>
                <SelectValue placeholder="Equipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Equipment</SelectItem>
                <SelectItem value="dry-van">Dry Van</SelectItem>
                <SelectItem value="refrigerated">Refrigerated</SelectItem>
                <SelectItem value="flatbed">Flatbed</SelectItem>
                <SelectItem value="step-deck">Step Deck</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Rate range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rates</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="3000+">$3,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Loads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Load Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Load ID</TableHead>
                <TableHead>Broker</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableLoads.map((load) => (
                <TableRow key={load.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{load.id}</span>
                      {load.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{load.brokerName}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(load.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{load.rating}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>{load.origin}</div>
                        <div className="text-muted-foreground">→ {load.destination}</div>
                        <div className="text-xs text-muted-foreground">{load.miles} miles</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>Pickup: {load.pickupDate}</div>
                        <div className="text-muted-foreground">Delivery: {load.deliveryDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-bold text-lg">${load.rate.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${load.ratePerMile.toFixed(2)}/mile
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">{load.equipment}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{load.weight}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleBookLoad(load.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Book Load
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(load.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAddToFavorites(load.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailableLoadsPage;