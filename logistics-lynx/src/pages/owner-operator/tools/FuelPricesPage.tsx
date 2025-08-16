/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, TrendingUp, TrendingDown, Navigation, Star, RefreshCw } from 'lucide-react';

interface FuelStation {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dieselPrice: number;
  gasolinePrice: number;
  distance: number;
  amenities: string[];
  lastUpdated: string;
  priceChange: number;
  rating: number;
  isOpen: boolean;
}

const FuelPricesPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedRadius, setSelectedRadius] = useState('25');

  const fuelStations: FuelStation[] = [
    {
      id: '1',
      name: 'Flying J Travel Center',
      brand: 'Flying J',
      address: '12050 North Freeway',
      city: 'Houston',
      state: 'TX',
      zip: '77060',
      dieselPrice: 3.89,
      gasolinePrice: 3.12,
      distance: 2.3,
      amenities: ['Restaurant', 'Showers', 'Laundry', 'WiFi', 'Parking'],
      lastUpdated: '5 min ago',
      priceChange: -0.02,
      rating: 4.2,
      isOpen: true
    },
    {
      id: '2',
      name: 'TA Travel Center',
      brand: 'TravelCenters',
      address: '25555 Northwest Freeway',
      city: 'Cypress',
      state: 'TX',
      zip: '77429',
      dieselPrice: 3.92,
      gasolinePrice: 3.15,
      distance: 8.7,
      amenities: ['Restaurant', 'Showers', 'Shop', 'WiFi'],
      lastUpdated: '12 min ago',
      priceChange: 0.01,
      rating: 4.0,
      isOpen: true
    },
    {
      id: '3',
      name: 'Pilot Travel Center',
      brand: 'Pilot',
      address: '9202 Eastex Freeway',
      city: 'Houston',
      state: 'TX',
      zip: '77093',
      dieselPrice: 3.85,
      gasolinePrice: 3.09,
      distance: 5.1,
      amenities: ['Restaurant', 'Showers', 'ATM', 'WiFi', 'Parking'],
      lastUpdated: '8 min ago',
      priceChange: -0.03,
      rating: 4.3,
      isOpen: true
    },
    {
      id: '4',
      name: 'Love\'s Travel Stop',
      brand: 'Loves',
      address: '755 Federal Road',
      city: 'Houston',
      state: 'TX',
      zip: '77015',
      dieselPrice: 3.87,
      gasolinePrice: 3.11,
      distance: 12.5,
      amenities: ['Restaurant', 'Showers', 'Laundry', 'Dog Park'],
      lastUpdated: '15 min ago',
      priceChange: 0.00,
      rating: 4.1,
      isOpen: true
    },
    {
      id: '5',
      name: 'Shell Station',
      brand: 'Shell',
      address: '4510 Spencer Highway',
      city: 'Pasadena',
      state: 'TX',
      zip: '77504',
      dieselPrice: 3.94,
      gasolinePrice: 3.18,
      distance: 15.2,
      amenities: ['Shop', 'ATM'],
      lastUpdated: '22 min ago',
      priceChange: 0.02,
      rating: 3.8,
      isOpen: false
    }
  ];

  const averagePrice = fuelStations.reduce((sum, station) => sum + station.dieselPrice, 0) / fuelStations.length;
  const lowestPrice = Math.min(...fuelStations.map(s => s.dieselPrice));
  const highestPrice = Math.max(...fuelStations.map(s => s.dieselPrice));

  const handleGetDirections = (station: FuelStation) => {
    console.log('Getting directions to:', station.name);
  };

  const handleAddFavorite = (stationId: string) => {
    console.log('Adding to favorites:', stationId);
  };

  const handleRefreshPrices = () => {
    console.log('Refreshing fuel prices...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuel Prices</h1>
          <p className="text-muted-foreground">Find the best fuel prices along your route</p>
        </div>
        <Button onClick={handleRefreshPrices} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="flying-j">Flying J</SelectItem>
                <SelectItem value="pilot">Pilot</SelectItem>
                <SelectItem value="loves">Love's</SelectItem>
                <SelectItem value="ta">TA</SelectItem>
                <SelectItem value="shell">Shell</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRadius} onValueChange={setSelectedRadius}>
              <SelectTrigger>
                <SelectValue placeholder="Search radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Filter className="h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Price Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Diesel Price</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toFixed(3)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">-$0.02</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Price</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${lowestPrice.toFixed(3)}</div>
            <p className="text-xs text-muted-foreground">
              {fuelStations.find(s => s.dieselPrice === lowestPrice)?.name}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${highestPrice.toFixed(3)}</div>
            <p className="text-xs text-muted-foreground">
              {fuelStations.find(s => s.dieselPrice === highestPrice)?.name}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Stations Near You</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Station</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Diesel Price</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fuelStations.map((station) => (
                    <TableRow key={station.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{station.name}</div>
                          <div className="text-sm text-muted-foreground">{station.brand}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(station.rating) 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">{station.rating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <div className="text-sm">
                            <div>{station.address}</div>
                            <div className="text-muted-foreground">{station.city}, {station.state} {station.zip}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">${station.dieselPrice.toFixed(3)}</span>
                          {station.priceChange !== 0 && (
                            <div className={`flex items-center gap-1 ${
                              station.priceChange < 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {station.priceChange < 0 ? 
                                <TrendingDown className="h-3 w-3" /> : 
                                <TrendingUp className="h-3 w-3" />
                              }
                              <span className="text-xs">
                                ${Math.abs(station.priceChange).toFixed(3)}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{station.distance} mi</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={station.isOpen ? "default" : "secondary"}>
                          {station.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {station.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGetDirections(station)}
                            className="gap-1"
                          >
                            <Navigation className="h-3 w-3" />
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
            <CardHeader>
              <CardTitle>Map View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive map view coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Will show fuel stations on an interactive map
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Stations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No favorite stations yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add stations to your favorites for quick access
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FuelPricesPage;