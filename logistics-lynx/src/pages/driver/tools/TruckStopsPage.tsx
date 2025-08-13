import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Star, Phone, Clock, Fuel, Utensils, Bed, Wifi, Bath } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TruckStop {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  distance: number;
  rating: number;
  amenities: string[];
  fuelPrice: number;
  phone: string;
  hours: string;
  coordinates: [number, number];
  parkingSpaces: number;
  availableSpaces: number;
}

const truckStops: TruckStop[] = [
  {
    id: 'TS001',
    name: 'Pilot Flying J #543',
    brand: 'Pilot Flying J',
    address: '1250 W 6th Ave',
    city: 'Denver',
    state: 'CO',
    distance: 2.3,
    rating: 4.2,
    amenities: ['fuel', 'restaurant', 'parking', 'shower', 'wifi', 'laundry'],
    fuelPrice: 3.89,
    phone: '(303) 555-0123',
    hours: '24/7',
    coordinates: [-104.9903, 39.7392],
    parkingSpaces: 85,
    availableSpaces: 23
  },
  {
    id: 'TS002',
    name: 'Love\'s Travel Stop #289',
    brand: 'Love\'s',
    address: '8101 N Pecos St',
    city: 'Denver',
    state: 'CO',
    distance: 5.1,
    rating: 4.5,
    amenities: ['fuel', 'restaurant', 'parking', 'shower', 'wifi', 'atm'],
    fuelPrice: 3.92,
    phone: '(303) 555-0456',
    hours: '24/7',
    coordinates: [-105.0178, 39.8481],
    parkingSpaces: 120,
    availableSpaces: 47
  },
  {
    id: 'TS003',
    name: 'TA Travel Center #203',
    brand: 'TravelCenters',
    address: '4555 Quebec St',
    city: 'Denver',
    state: 'CO',
    distance: 7.8,
    rating: 4.0,
    amenities: ['fuel', 'restaurant', 'parking', 'shower', 'wifi', 'repair'],
    fuelPrice: 3.85,
    phone: '(303) 555-0789',
    hours: '24/7',
    coordinates: [-104.9053, 39.7817],
    parkingSpaces: 95,
    availableSpaces: 31
  }
];

const TruckStopsPage = () => {
  const [searchLocation, setSearchLocation] = useState('Denver, CO');
  const [sortBy, setSortBy] = useState('distance');
  const [filterAmenity, setFilterAmenity] = useState('all');

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'fuel': return <Fuel className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'parking': return <MapPin className="w-4 h-4" />;
      case 'shower': return <Bath className="w-4 h-4" />;
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'laundry': return <Bed className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const sortedStops = [...truckStops].sort((a, b) => {
    switch (sortBy) {
      case 'distance': return a.distance - b.distance;
      case 'rating': return b.rating - a.rating;
      case 'price': return a.fuelPrice - b.fuelPrice;
      default: return 0;
    }
  });

  const filteredStops = sortedStops.filter(stop => 
    filterAmenity === 'all' || stop.amenities.includes(filterAmenity)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Truck Stops</h1>
          <p className="text-muted-foreground">Find nearby truck stops and amenities</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Truck Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State or ZIP"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Fuel Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amenity">Filter by Amenity</Label>
              <Select value={filterAmenity} onValueChange={setFilterAmenity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Amenities</SelectItem>
                  <SelectItem value="fuel">Fuel</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="shower">Showers</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="wifi">WiFi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Truck Stops List */}
      <div className="grid gap-4">
        {filteredStops.map((stop) => (
          <Card key={stop.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{stop.name}</h3>
                      <p className="text-muted-foreground">{stop.address}, {stop.city}, {stop.state}</p>
                    </div>
                    <Badge variant="secondary">{stop.distance} mi</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(stop.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm ml-1">{stop.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{stop.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{stop.hours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stop.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 lg:text-right">
                  <div>
                    <div className="text-2xl font-bold text-green-600">${stop.fuelPrice}</div>
                    <div className="text-sm text-muted-foreground">per gallon</div>
                  </div>
                  
                  <div>
                    <div className={`text-lg font-semibold ${getAvailabilityColor(stop.availableSpaces, stop.parkingSpaces)}`}>
                      {stop.availableSpaces} spaces
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {stop.parkingSpaces} available
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Button size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Nearest Stop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStops[0]?.distance} mi</div>
            <p className="text-sm text-muted-foreground">{filteredStops[0]?.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Best Fuel Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${Math.min(...filteredStops.map(s => s.fuelPrice))}
            </div>
            <p className="text-sm text-muted-foreground">per gallon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Available Spots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredStops.reduce((sum, stop) => sum + stop.availableSpaces, 0)}
            </div>
            <p className="text-sm text-muted-foreground">parking spaces</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckStopsPage;