import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus, Search, Filter, Star, Phone, Clock, Fuel, Wifi, Utensils, Bed, Car, Navigation, Route, Heart, HeartOff } from 'lucide-react';
import { toast } from "sonner";

interface TruckStop {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance: number; // miles from current location
  rating: number;
  totalReviews: number;
  dieselPrice: number;
  hasShowers: boolean;
  hasParking: boolean;
  hasRestaurant: boolean;
  hasWifi: boolean;
  hasLaundry: boolean;
  hasDogPark: boolean;
  hasWeighStation: boolean;
  operatingHours: string;
  amenities: string[];
  isFavorite: boolean;
  lastUpdated: string;
  parkingSpaces: number;
  availableSpaces: number;
  fuelBrands: string[];
}

const mockTruckStops: TruckStop[] = [
  {
    id: 'ts-001',
    name: 'Travel Centers of America',
    brand: 'TA',
    address: '2850 W 95th St',
    city: 'Evergreen Park',
    state: 'IL',
    zipCode: '60805',
    phone: '(708) 425-9620',
    latitude: 41.7203,
    longitude: -87.7042,
    distance: 2.3,
    rating: 4.2,
    totalReviews: 847,
    dieselPrice: 4.89,
    hasShowers: true,
    hasParking: true,
    hasRestaurant: true,
    hasWifi: true,
    hasLaundry: true,
    hasDogPark: true,
    hasWeighStation: false,
    operatingHours: '24/7',
    amenities: ['Showers', 'Restaurant', 'WiFi', 'Laundry', 'Dog Park', 'ATM', 'Game Room'],
    isFavorite: true,
    lastUpdated: '2024-07-19 14:30',
    parkingSpaces: 125,
    availableSpaces: 23,
    fuelBrands: ['Shell', 'Mobil']
  },
  {
    id: 'ts-002',
    name: "Pilot Flying J",
    brand: 'Pilot',
    address: '13350 S Cicero Ave',
    city: 'Crestwood',
    state: 'IL',
    zipCode: '60445',
    phone: '(708) 371-9051',
    latitude: 41.6467,
    longitude: -87.7394,
    distance: 5.7,
    rating: 4.0,
    totalReviews: 1204,
    dieselPrice: 4.85,
    hasShowers: true,
    hasParking: true,
    hasRestaurant: true,
    hasWifi: true,
    hasLaundry: false,
    hasDogPark: false,
    hasWeighStation: true,
    operatingHours: '24/7',
    amenities: ['Showers', 'Restaurant', 'WiFi', 'Weigh Station', 'ATM', 'Subway'],
    isFavorite: false,
    lastUpdated: '2024-07-19 13:45',
    parkingSpaces: 89,
    availableSpaces: 12,
    fuelBrands: ['BP', 'Marathon']
  },
  {
    id: 'ts-003',
    name: 'Love\'s Travel Stop',
    brand: 'Loves',
    address: '14900 Cicero Ave',
    city: 'Oak Forest',
    state: 'IL',
    zipCode: '60452',
    phone: '(708) 687-9800',
    latitude: 41.6089,
    longitude: -87.7394,
    distance: 8.1,
    rating: 4.3,
    totalReviews: 692,
    dieselPrice: 4.92,
    hasShowers: true,
    hasParking: true,
    hasRestaurant: true,
    hasWifi: true,
    hasLaundry: true,
    hasDogPark: true,
    hasWeighStation: false,
    operatingHours: '24/7',
    amenities: ['Showers', 'Restaurant', 'WiFi', 'Laundry', 'Dog Park', 'ATM', 'McDonald\'s'],
    isFavorite: true,
    lastUpdated: '2024-07-19 15:15',
    parkingSpaces: 156,
    availableSpaces: 34,
    fuelBrands: ['Speedway', 'Shell']
  },
  {
    id: 'ts-004',
    name: 'Petro Stopping Center',
    brand: 'Petro',
    address: '17840 Torrence Ave',
    city: 'Lansing',
    state: 'IL',
    zipCode: '60438',
    phone: '(708) 474-8766',
    latitude: 41.5647,
    longitude: -87.5394,
    distance: 12.4,
    rating: 3.8,
    totalReviews: 423,
    dieselPrice: 4.87,
    hasShowers: true,
    hasParking: true,
    hasRestaurant: true,
    hasWifi: true,
    hasLaundry: false,
    hasDogPark: false,
    hasWeighStation: true,
    operatingHours: '24/7',
    amenities: ['Showers', 'Restaurant', 'WiFi', 'Weigh Station', 'ATM', 'Iron Skillet'],
    isFavorite: false,
    lastUpdated: '2024-07-19 12:20',
    parkingSpaces: 98,
    availableSpaces: 8,
    fuelBrands: ['Petro', 'Shell']
  },
  {
    id: 'ts-005',
    name: 'AMBEST Travel Service Plaza',
    brand: 'AMBEST',
    address: '2501 E 95th St',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60617',
    phone: '(773) 221-1234',
    latitude: 41.7203,
    longitude: -87.5583,
    distance: 15.2,
    rating: 4.1,
    totalReviews: 318,
    dieselPrice: 4.94,
    hasShowers: true,
    hasParking: true,
    hasRestaurant: true,
    hasWifi: true,
    hasLaundry: true,
    hasDogPark: false,
    hasWeighStation: false,
    operatingHours: '24/7',
    amenities: ['Showers', 'Restaurant', 'WiFi', 'Laundry', 'ATM', 'Deli'],
    isFavorite: false,
    lastUpdated: '2024-07-19 14:00',
    parkingSpaces: 72,
    availableSpaces: 15,
    fuelBrands: ['Citgo', 'Marathon']
  }
];

const TruckStopsPage: React.FC = () => {
  const [truckStops, setTruckStops] = useState<TruckStop[]>(mockTruckStops);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [amenityFilter, setAmenityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('distance');
  const [selectedTruckStop, setSelectedTruckStop] = useState<TruckStop | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredTruckStops = truckStops
    .filter(stop => {
      const matchesSearch = stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stop.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = brandFilter === 'all' || stop.brand.toLowerCase() === brandFilter.toLowerCase();
      const matchesAmenity = amenityFilter === 'all' || 
                            (amenityFilter === 'showers' && stop.hasShowers) ||
                            (amenityFilter === 'restaurant' && stop.hasRestaurant) ||
                            (amenityFilter === 'wifi' && stop.hasWifi) ||
                            (amenityFilter === 'laundry' && stop.hasLaundry) ||
                            (amenityFilter === 'dogpark' && stop.hasDogPark) ||
                            (amenityFilter === 'weighstation' && stop.hasWeighStation);
      const matchesFavorites = !showFavoritesOnly || stop.isFavorite;
      
      return matchesSearch && matchesBrand && matchesAmenity && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'price':
          return a.dieselPrice - b.dieselPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleToggleFavorite = (id: string) => {
    setTruckStops(stops =>
      stops.map(stop =>
        stop.id === id ? { ...stop, isFavorite: !stop.isFavorite } : stop
      )
    );
    toast.success('Favorites updated');
  };

  const handleGetDirections = (stop: TruckStop) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`;
    window.open(googleMapsUrl, '_blank');
    toast.success('Opening directions in Google Maps');
  };

  const handleCallLocation = (phone: string) => {
    window.open(`tel:${phone}`);
    toast.success('Initiating call');
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Truck Stops</h1>
        <p className="text-muted-foreground">Find truck stops, fuel prices, and amenities along your route</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nearby Locations</p>
                <p className="text-2xl font-bold text-foreground">{filteredTruckStops.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Diesel Price</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(truckStops.reduce((sum, stop) => sum + stop.dieselPrice, 0) / truckStops.length).toFixed(2)}
                </p>
              </div>
              <Fuel className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold text-foreground">
                  {truckStops.filter(stop => stop.isFavorite).length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Parking</p>
                <p className="text-2xl font-bold text-foreground">
                  {truckStops.reduce((sum, stop) => sum + stop.availableSpaces, 0)}
                </p>
              </div>
              <Car className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, city, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="ta">TA</SelectItem>
                <SelectItem value="pilot">Pilot</SelectItem>
                <SelectItem value="loves">Love's</SelectItem>
                <SelectItem value="petro">Petro</SelectItem>
                <SelectItem value="ambest">AMBEST</SelectItem>
              </SelectContent>
            </Select>
            <Select value={amenityFilter} onValueChange={setAmenityFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by amenity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amenities</SelectItem>
                <SelectItem value="showers">Showers</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="wifi">WiFi</SelectItem>
                <SelectItem value="laundry">Laundry</SelectItem>
                <SelectItem value="dogpark">Dog Park</SelectItem>
                <SelectItem value="weighstation">Weigh Station</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price">Fuel Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
          </Button>
        </CardContent>
      </Card>

      {/* Truck Stops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTruckStops.map((stop) => (
          <Card key={stop.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {stop.name}
                    <Badge variant="outline">{stop.brand}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {stop.address}, {stop.city}, {stop.state} {stop.zipCode}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFavorite(stop.id)}
                >
                  {stop.isFavorite ? (
                    <Heart className="h-4 w-4 text-red-600 fill-current" />
                  ) : (
                    <HeartOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="font-semibold">{stop.distance} miles</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Diesel Price</div>
                  <div className="font-semibold text-green-600">${stop.dieselPrice}/gal</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(stop.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({stop.totalReviews})
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Parking</div>
                  <div className={`font-semibold ${getAvailabilityColor(stop.availableSpaces, stop.parkingSpaces)}`}>
                    {stop.availableSpaces}/{stop.parkingSpaces} available
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Amenities</div>
                <div className="flex flex-wrap gap-1">
                  {stop.hasShowers && <Badge variant="secondary" className="text-xs">Showers</Badge>}
                  {stop.hasRestaurant && <Badge variant="secondary" className="text-xs">Restaurant</Badge>}
                  {stop.hasWifi && <Badge variant="secondary" className="text-xs">WiFi</Badge>}
                  {stop.hasLaundry && <Badge variant="secondary" className="text-xs">Laundry</Badge>}
                  {stop.hasDogPark && <Badge variant="secondary" className="text-xs">Dog Park</Badge>}
                  {stop.hasWeighStation && <Badge variant="secondary" className="text-xs">Weigh Station</Badge>}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{stop.operatingHours}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleGetDirections(stop)}
                  className="flex items-center gap-1"
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCallLocation(stop.phone)}
                  className="flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTruckStop(stop)}
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Dialog */}
      <Dialog open={!!selectedTruckStop} onOpenChange={() => setSelectedTruckStop(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTruckStop && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedTruckStop.name}
                </DialogTitle>
                <DialogDescription>
                  Complete location details and amenities
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Address</div>
                      <div className="font-semibold">
                        {selectedTruckStop.address}<br />
                        {selectedTruckStop.city}, {selectedTruckStop.state} {selectedTruckStop.zipCode}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Contact</div>
                      <div className="font-semibold">{selectedTruckStop.phone}</div>
                      <div className="text-sm text-muted-foreground">{selectedTruckStop.operatingHours}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedTruckStop.distance}</div>
                      <div className="text-sm text-muted-foreground">Miles Away</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-green-600">${selectedTruckStop.dieselPrice}</div>
                      <div className="text-sm text-muted-foreground">Per Gallon</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedTruckStop.rating}</div>
                      <div className="text-sm text-muted-foreground">{selectedTruckStop.totalReviews} Reviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className={`text-2xl font-bold ${getAvailabilityColor(selectedTruckStop.availableSpaces, selectedTruckStop.parkingSpaces)}`}>
                        {selectedTruckStop.availableSpaces}
                      </div>
                      <div className="text-sm text-muted-foreground">Parking Available</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Amenities Detail */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasShowers ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasShowers ? 'text-foreground' : 'text-muted-foreground'}>
                            Showers
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasRestaurant ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasRestaurant ? 'text-foreground' : 'text-muted-foreground'}>
                            Restaurant
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasWifi ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasWifi ? 'text-foreground' : 'text-muted-foreground'}>
                            WiFi
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasLaundry ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasLaundry ? 'text-foreground' : 'text-muted-foreground'}>
                            Laundry
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasDogPark ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasDogPark ? 'text-foreground' : 'text-muted-foreground'}>
                            Dog Park
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasWeighStation ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasWeighStation ? 'text-foreground' : 'text-muted-foreground'}>
                            Weigh Station
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedTruckStop.hasParking ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={selectedTruckStop.hasParking ? 'text-foreground' : 'text-muted-foreground'}>
                            Truck Parking
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Fuel Brands */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Fuel Brands</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedTruckStop.fuelBrands.map((brand, index) => (
                        <Badge key={index} variant="secondary">{brand}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Amenities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedTruckStop.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">{amenity}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleGetDirections(selectedTruckStop)}
                    className="flex items-center gap-2"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCallLocation(selectedTruckStop.phone)}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Location
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleToggleFavorite(selectedTruckStop.id)}
                    className="flex items-center gap-2"
                  >
                    {selectedTruckStop.isFavorite ? (
                      <>
                        <HeartOff className="h-4 w-4" />
                        Remove Favorite
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" />
                        Add Favorite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TruckStopsPage;