import React, { useState } from 'react';
import { MapPin, Star, Navigation, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FuelStation {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  distance: number;
  dieselPrice: number;
  gasPrice: number;
  amenities: string[];
  rating: number;
  lastUpdated: string;
  isFavorite: boolean;
}

const FuelPricesPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedRadius, setSelectedRadius] = useState('25');

  // Mock data for fuel stations
  const fuelStations: FuelStation[] = [
    {
      id: '1',
      name: 'Love\'s Travel Stop',
      brand: 'Loves',
      address: '1234 Highway 80',
      city: 'Dallas',
      state: 'TX',
      distance: 2.3,
      dieselPrice: 3.89,
      gasPrice: 3.45,
      amenities: ['Shower', 'Restaurant', 'Laundry', 'ATM', 'Parking'],
      rating: 4.5,
      lastUpdated: '2 min ago',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Pilot Flying J',
      brand: 'Pilot',
      address: '5678 Interstate 35',
      city: 'Fort Worth',
      state: 'TX',
      distance: 5.7,
      dieselPrice: 3.92,
      gasPrice: 3.48,
      amenities: ['Shower', 'Restaurant', 'ATM', 'Parking'],
      rating: 4.2,
      lastUpdated: '5 min ago',
      isFavorite: false
    },
    {
      id: '3',
      name: 'TA Travel Center',
      brand: 'TravelCenters',
      address: '9012 US Route 287',
      city: 'Arlington',
      state: 'TX',
      distance: 8.1,
      dieselPrice: 3.85,
      gasPrice: 3.42,
      amenities: ['Shower', 'Restaurant', 'Laundry', 'ATM', 'Parking', 'Mechanic'],
      rating: 4.3,
      lastUpdated: '3 min ago',
      isFavorite: false
    }
  ];

  const averagePrice = fuelStations.reduce((sum, station) => sum + station.dieselPrice, 0) / fuelStations.length;
  const lowestPrice = Math.min(...fuelStations.map(station => station.dieselPrice));
  const highestPrice = Math.max(...fuelStations.map(station => station.dieselPrice));

  const handleGetDirections = (stationId: string) => {
    console.log(`Getting directions to station ${stationId}`);
  };

  const handleAddFavorite = (stationId: string) => {
    console.log(`Adding station ${stationId} to favorites`);
  };

  const handleRefreshPrices = () => {
    console.log('Refreshing fuel prices...');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuel Prices</h1>
          <p className="text-muted-foreground">Find the best diesel prices near you</p>
        </div>
        <Button onClick={handleRefreshPrices} variant="outline" className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input 
                placeholder="Enter city, state or ZIP code"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Brand</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="All brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="loves">Love's</SelectItem>
                  <SelectItem value="pilot">Pilot Flying J</SelectItem>
                  <SelectItem value="ta">TA Travel Centers</SelectItem>
                  <SelectItem value="shell">Shell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Radius</label>
              <Select value={selectedRadius} onValueChange={setSelectedRadius}>
                <SelectTrigger>
                  <SelectValue placeholder="25 miles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50 miles</SelectItem>
                  <SelectItem value="100">100 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Price</p>
                <p className="text-2xl font-bold">${averagePrice.toFixed(3)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lowest Price</p>
                <p className="text-2xl font-bold text-green-600">${lowestPrice.toFixed(3)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Highest Price</p>
                <p className="text-2xl font-bold text-red-600">${highestPrice.toFixed(3)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fuel Stations */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Fuel Stations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Station</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Diesel Price</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fuelStations.map((station) => (
                    <TableRow key={station.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {station.name}
                            {station.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {station.address}, {station.city}, {station.state}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{station.distance} mi</TableCell>
                      <TableCell>
                        <span className="font-bold text-lg">${station.dieselPrice.toFixed(3)}</span>
                        <div className="text-xs text-muted-foreground">{station.lastUpdated}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {station.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {station.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{station.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{station.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleGetDirections(station.id)}
                          >
                            <Navigation className="h-4 w-4 mr-1" />
                            Directions
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleAddFavorite(station.id)}
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
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">Map integration will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Favorite Stations</h3>
                <p className="text-muted-foreground">Stations you've marked as favorites will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FuelPricesPage;